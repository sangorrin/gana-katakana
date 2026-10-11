/**
 * Stroke order animation helpers for Wikimedia Commons Katakana animation set.
 * Category: https://commons.wikimedia.org/wiki/Category:Katakana_stroke_order_(animated_image_set)
 */

export const KATAKANA_STROKE_COUNTS: Record<string, number> = {
  'ア': 2, 'イ': 2, 'ウ': 3, 'エ': 3, 'オ': 3,
  'カ': 2, 'キ': 3, 'ク': 2, 'ケ': 3, 'コ': 2,
  'サ': 3, 'シ': 3, 'ス': 2, 'セ': 2, 'ソ': 2,
  'タ': 3, 'チ': 3, 'ツ': 3, 'テ': 3, 'ト': 2,
  'ナ': 2, 'ニ': 2, 'ヌ': 2, 'ネ': 4, 'ノ': 1,
  'ハ': 2, 'ヒ': 2, 'フ': 1, 'ヘ': 1, 'ホ': 4,
  'マ': 2, 'ミ': 3, 'ム': 2, 'メ': 2, 'モ': 3,
  'ヤ': 2, 'ユ': 2, 'ヨ': 3,
  'ラ': 2, 'リ': 2, 'ル': 2, 'レ': 1, 'ロ': 3,
  'ワ': 2, 'ヲ': 3, 'ン': 2,
  'ガ': 4, 'ギ': 5, 'グ': 4, 'ゲ': 5, 'ゴ': 4,
  'ザ': 5, 'ジ': 5, 'ズ': 4, 'ゼ': 4, 'ゾ': 4,
  'ダ': 5, 'ヂ': 5, 'ヅ': 5, 'デ': 5, 'ド': 4,
  'バ': 4, 'ビ': 4, 'ブ': 3, 'ベ': 3, 'ボ': 6,
  'パ': 3, 'ピ': 3, 'プ': 2, 'ペ': 2, 'ポ': 5,
  'ァ': 2, 'ィ': 2, 'ゥ': 3, 'ェ': 3, 'ォ': 3,
  'ャ': 2, 'ュ': 2, 'ョ': 3,
};

// Map small kana to canonical Wikimedia Commons base character filenames
export const SMALL_TO_BASE_KANA: Record<string, string> = {
  'ャ': 'ヤ',
  'ュ': 'ユ',
  'ョ': 'ヨ',
  'ァ': 'ア',
  'ィ': 'イ',
  'ゥ': 'ウ',
  'ェ': 'エ',
  'ォ': 'オ',
};

/**
 * Get the canonical Wikimedia Commons animated GIF URL for a Katakana character.
 */
export function getWikimediaGifUrl(char: string): string {
  const baseChar = SMALL_TO_BASE_KANA[char] || char;
  const encoded = encodeURIComponent(baseChar);
  return `https://commons.wikimedia.org/wiki/Special:FilePath/Katakana_${encoded}_stroke_order_animation.gif`;
}

/**
 * Estimate animation duration in milliseconds based on stroke count
 */
export function getAnimationDurationMs(char: string): number {
  const baseChar = SMALL_TO_BASE_KANA[char] || char;
  const strokes = KATAKANA_STROKE_COUNTS[baseChar] || 2;
  return Math.max(1800, strokes * 850 + 600);
}
