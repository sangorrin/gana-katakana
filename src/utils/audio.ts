/**
 * Audio Sprite Engine for Gana Katakana!
 * Uses 2 master untouched native Japanese audio sprites:
 *   - /audio/sprite_female.mp3 (Pure Google Japanese Voice)
 *   - /audio/sprite_male.mp3 (Pure Voicevox Aoyama Ryusei Japanese Voice)
 * with exact start and duration offsets from /audio/sprite_map.json.
 *
 * Alternates between female and male voice on each tap.
 */

type Gender = 'female' | 'male';
type SpriteEntry = [number, number]; // [startSeconds, durationSeconds]

interface SpriteData {
  female: Record<string, SpriteEntry>;
  male: Record<string, SpriteEntry>;
}

class SoundEngine {
  private globalVoiceCounter: number = 0;
  private audioCtx: AudioContext | null = null;
  private spriteData: SpriteData | null = null;
  private spriteLoadingPromise: Promise<void> | null = null;

  // Decoded Web Audio buffers for instant gapless playback
  private femaleBuffer: AudioBuffer | null = null;
  private maleBuffer: AudioBuffer | null = null;

  // HTMLAudioElement fallbacks
  private femaleAudio: HTMLAudioElement | null = null;
  private maleAudio: HTMLAudioElement | null = null;
  private activeFallbackTimeout: ReturnType<typeof setTimeout> | null = null;

  // Kana character to audio key mapping
  private kanaToIdMap: Record<string, string> = {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    // Dakuon & Handakuon
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ダ': 'da', 'ヂ': 'ji_d', 'ヅ': 'zu_d', 'デ': 'de', 'ド': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    // Youon
    'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
    'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
    'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
    'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
    'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
    'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
    'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
    'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
    'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
    // Extra
    'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo_ex',
    'シェ': 'she', 'チェ': 'che', 'ツェ': 'tse',
    'ツァ': 'tsa', 'ツォ': 'tso',
    'ティ': 'ti', 'トゥ': 'tu',
    'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo',
    'ディ': 'di', 'ドゥ': 'du', 'デュ': 'dyu',
    'ジェ': 'je',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initSprites();
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private textToHex(str: string): string {
    try {
      const bytes = new TextEncoder().encode(str);
      return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return encodeURIComponent(str).replace(/%/g, '');
    }
  }

  private async initSprites() {
    if (this.spriteLoadingPromise) return this.spriteLoadingPromise;

    this.spriteLoadingPromise = (async () => {
      try {
        // 1. Fetch sprite map JSON
        const res = await fetch('/audio/sprite_map.json');
        if (res.ok) {
          this.spriteData = await res.json();
        }

        // 2. Prepare HTMLAudioElement fallback instances
        this.femaleAudio = new Audio('/audio/sprite_female.mp3');
        this.femaleAudio.preload = 'auto';
        this.maleAudio = new Audio('/audio/sprite_male.mp3');
        this.maleAudio.preload = 'auto';

        // 3. Pre-decode Web Audio buffers in background
        const ctx = this.getAudioContext();
        if (ctx) {
          const [femRes, maleRes] = await Promise.all([
            fetch('/audio/sprite_female.mp3'),
            fetch('/audio/sprite_male.mp3')
          ]);
          if (femRes.ok) {
            const femAb = await femRes.arrayBuffer();
            this.femaleBuffer = await ctx.decodeAudioData(femAb);
          }
          if (maleRes.ok) {
            const maleAb = await maleRes.arrayBuffer();
            this.maleBuffer = await ctx.decodeAudioData(maleAb);
          }
        }
      } catch {
        // Failures gracefully fall back to HTMLAudio
      }
    })();

    return this.spriteLoadingPromise;
  }

  /**
   * Find sprite offset [start, duration] for given text and keyId
   */
  private findOffset(gender: Gender, text: string, keyId?: string): SpriteEntry | null {
    if (!this.spriteData) return null;
    const map = this.spriteData[gender];
    if (!map) return null;

    // 1. Exact kana / text match (e.g. "ア", "アイス")
    if (map[text]) return map[text];

    // 2. Exact sound ID from kana map (e.g. "a", "ka")
    const id = this.kanaToIdMap[text];
    if (id && map[id]) return map[id];

    // 3. Direct clean keyId lookup (e.g. "kyo", "shu")
    if (keyId) {
      const clean = keyId.replace(/^(card_|sounds_|details_|word_|kana_)+/, '');
      if (map[clean]) return map[clean];
      if (this.kanaToIdMap[clean] && map[this.kanaToIdMap[clean]]) {
        return map[this.kanaToIdMap[clean]];
      }
    }

    // 4. Hex encoded word key
    const hex = this.textToHex(text);
    if (map[hex]) return map[hex];

    // 5. Prefix match
    for (const [k, entry] of Object.entries(map)) {
      if (text.startsWith(k)) return entry;
    }

    // 6. Cross-gender fallback if specific key missing
    const otherGender = gender === 'male' ? 'female' : 'male';
    if (this.spriteData[otherGender] && this.spriteData[otherGender][text]) {
      return this.spriteData[otherGender][text];
    }

    return null;
  }

  /**
   * Pronounce Katakana or word using audio sprites.
   * Alternates between female and male voice on each tap.
   */
  public playKana(text: string, keyId?: string): Gender {
    const isMale = this.globalVoiceCounter % 2 === 1;
    const gender: Gender = isMale ? 'male' : 'female';
    this.globalVoiceCounter++;

    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    const offset = this.findOffset(gender, text, keyId);

    if (offset) {
      const [start, duration] = offset;
      const buffer = gender === 'female' ? this.femaleBuffer : this.maleBuffer;
      const audio = gender === 'female' ? this.femaleAudio : this.maleAudio;

      if (ctx && buffer) {
        // Fast, gapless Web Audio slice playback
        try {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0, start, duration);
          return gender;
        } catch {
          // Fall through to HTMLAudio
        }
      }

      // HTMLAudioElement Fallback
      if (audio) {
        try {
          if (this.activeFallbackTimeout) {
            clearTimeout(this.activeFallbackTimeout);
          }
          audio.currentTime = start;
          const p = audio.play();
          if (p !== undefined) {
            p.catch(() => {});
          }
          this.activeFallbackTimeout = setTimeout(() => {
            audio.pause();
          }, Math.max(200, duration * 1000 + 40));
        } catch {
          // Playback error safety
        }
      }
    }

    return gender;
  }

  /**
   * Tactile Japanese paper flip sound effect via Web Audio synthesizer
   */
  public playPaperFlip() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      filter.Q.setValueAtTime(3, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

      oscGain.gain.setValueAtTime(0.09, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }

  /**
   * Soft chime for card completion
   */
  public playChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }

  public getVoiceState(): Gender {
    return this.globalVoiceCounter % 2 === 0 ? 'female' : 'male';
  }
}

export const soundEngine = new SoundEngine();
