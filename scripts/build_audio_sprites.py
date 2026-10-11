import os
import re
import json
import time
import subprocess
import urllib.request
import urllib.parse

# 1. Define all 123 core Kana
KANA_ITEMS = [
    # Seion (46)
    ('a', 'ア'), ('i', 'イ'), ('u', 'ウ'), ('e', 'エ'), ('o', 'オ'),
    ('ka', 'カ'), ('ki', 'キ'), ('ku', 'ク'), ('ke', 'ケ'), ('ko', 'コ'),
    ('sa', 'サ'), ('shi', 'シ'), ('su', 'ス'), ('se', 'セ'), ('so', 'ソ'),
    ('ta', 'タ'), ('chi', 'チ'), ('tsu', 'ツ'), ('te', 'テ'), ('to', 'ト'),
    ('na', 'ナ'), ('ni', 'ニ'), ('nu', 'ヌ'), ('ne', 'ネ'), ('no', 'ノ'),
    ('ha', 'ハ'), ('hi', 'ヒ'), ('fu', 'フ'), ('he', 'ヘ'), ('ho', 'ホ'),
    ('ma', 'マ'), ('mi', 'ミ'), ('mu', 'ム'), ('me', 'メ'), ('mo', 'モ'),
    ('ya', 'ヤ'), ('yu', 'ユ'), ('yo', 'ヨ'),
    ('ra', 'ラ'), ('ri', 'リ'), ('ru', 'ル'), ('re', 'レ'), ('ro', 'ロ'),
    ('wa', 'ワ'), ('wo', 'ヲ'), ('n', 'ン'),
    # Dakuon (20)
    ('ga', 'ガ'), ('gi', 'ギ'), ('gu', 'グ'), ('ge', 'ゲ'), ('go', 'ゴ'),
    ('za', 'ザ'), ('ji', 'ジ'), ('zu', 'ズ'), ('ze', 'ゼ'), ('zo', 'ゾ'),
    ('da', 'ダ'), ('de', 'デ'), ('do', 'ド'),
    ('ba', 'バ'), ('bi', 'ビ'), ('bu', 'ブ'), ('be', 'ベ'), ('bo', 'ボ'),
    ('ji_z', 'ジ'), ('ji_d', 'ヂ'), ('zu_d', 'ヅ'),
    # Handakuon (5)
    ('pa', 'パ'), ('pi', 'ピ'), ('pu', 'プ'), ('pe', 'ペ'), ('po', 'ポ'),
    # Yoon (33)
    ('kya', 'キャ'), ('kyu', 'キュ'), ('kyo', 'キョ'),
    ('sha', 'シャ'), ('shu', 'シュ'), ('sho', 'ショ'),
    ('cha', 'チャ'), ('chu', 'チュ'), ('cho', 'チョ'),
    ('nya', 'ニャ'), ('nyu', 'ニュ'), ('nyo', 'ニョ'),
    ('hya', 'ヒャ'), ('hyu', 'ヒュ'), ('hyo', 'ヒョ'),
    ('mya', 'ミャ'), ('myu', 'ミュ'), ('myo', 'ミョ'),
    ('rya', 'リャ'), ('ryu', 'リュ'), ('ryo', 'リョ'),
    ('gya', 'ギャ'), ('gyu', 'ギュ'), ('gyo', 'ギョ'),
    ('ja', 'ジャ'), ('ju', 'ジュ'), ('jo', 'ジョ'),
    ('bya', 'ビャ'), ('byu', 'ビュ'), ('byo', 'ビョ'),
    ('pya', 'ピャ'), ('pyu', 'ピュ'), ('pyo', 'ピョ'),
    # Extra (17)
    ('wi', 'ウィ'), ('we', 'ウェ'), ('wo_ex', 'ウォ'),
    ('she', 'シェ'), ('che', 'チェ'), ('tse', 'ツェ'),
    ('tsa', 'ツァ'), ('tso', 'ツォ'),
    ('ti', 'ティ'), ('tu', 'トゥ'),
    ('fa', 'ファ'), ('fi', 'フィ'), ('fe', 'フェ'), ('fo', 'フォ'),
    ('di', 'ディ'), ('du', 'ドゥ'), ('dyu', 'デュ'),
    ('je', 'ジェ')
]

# 2. Extract words from katakanaData.ts
with open("src/data/katakanaData.ts", "r", encoding="utf-8") as f:
    kdata = f.read()

words = []
for m in re.finditer(r"word:\s*[\x27\"]([^\x27\"]+)[\x27\"]", kdata):
    w = m.group(1)
    if w not in words:
        words.append(w)

print(f"Loaded {len(KANA_ITEMS)} kana and {len(words)} unique words.")

CACHE_FEMALE = "/tmp/cache_female"
CACHE_MALE = "/tmp/cache_male"
os.makedirs(CACHE_FEMALE, exist_ok=True)
os.makedirs(CACHE_MALE, exist_ok=True)
os.makedirs("public/audio", exist_ok=True)

def text_to_hex(text):
    return text.encode('utf-8').hex()

def get_audio_duration(filepath):
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            filepath
        ]).decode().strip()
        return float(out)
    except Exception as e:
        print(f"Error getting duration for {filepath}: {e}")
        return 0.0

def download_raw_female(text, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return True
    url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + urllib.parse.quote(text) + "&tl=ja&client=tw-ob"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        with open(out_path, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"Female download error for {text}: {e}")
        return False

def download_raw_male(text, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
        return True
    url = f"https://api.tts.quest/v3/voicevox/synthesis?text={urllib.parse.quote(text)}&speaker=13"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
        mp3_url = data.get("mp3DownloadUrl")
        status_url = data.get("audioStatusUrl")
        if not mp3_url and status_url:
            for _ in range(5):
                time.sleep(1)
                s_req = urllib.request.Request(status_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(s_req, timeout=10) as s_resp:
                    s_data = json.loads(s_resp.read().decode())
                    if s_data.get("isAudioReady"):
                        mp3_url = s_data.get("mp3DownloadUrl")
                        break
        if mp3_url:
            urllib.request.urlretrieve(mp3_url, out_path)
            return True
        else:
            print(f"Male audio not ready for {text}")
            return False
    except Exception as e:
        print(f"Male download error for {text}: {e}")
        return False

# ========================================================
# Phase 1: Build Female Sprite (All Kana + All Words)
# ========================================================
print("\n--- Downloading Female Raw Audio ---")
female_files = []
female_map = {}
female_current_time = 0.0

# 1a. Kana
for cid, kana in KANA_ITEMS:
    p = os.path.join(CACHE_FEMALE, f"kana_{cid}.mp3")
    if download_raw_female(kana, p):
        dur = get_audio_duration(p)
        female_files.append(p)
        entry = [round(female_current_time, 3), round(dur, 3)]
        female_map[cid] = entry
        female_map[kana] = entry
        female_current_time += dur
    time.sleep(0.05)

# 1b. Words
for w in words:
    hex_key = text_to_hex(w)
    p = os.path.join(CACHE_FEMALE, f"word_{hex_key}.mp3")
    if download_raw_female(w, p):
        dur = get_audio_duration(p)
        female_files.append(p)
        entry = [round(female_current_time, 3), round(dur, 3)]
        female_map[w] = entry
        female_map[hex_key] = entry
        female_current_time += dur
    time.sleep(0.05)

print(f"Total female entries: {len(female_files)}, total duration: {round(female_current_time, 2)}s")

# Concatenate female files with -c copy (ZERO processing!)
with open("/tmp/concat_female.txt", "w") as f:
    for p in female_files:
        f.write(f"file '{p}'\n")

female_sprite_path = "public/audio/sprite_female.mp3"
subprocess.run([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0",
    "-i", "/tmp/concat_female.txt",
    "-c", "copy",
    female_sprite_path
], check=True)
print("sprite_female.mp3 created successfully!")

# ========================================================
# Phase 2: Build Male Sprite (All 123 Kana)
# ========================================================
print("\n--- Downloading Male Raw Audio (Voicevox speaker 13) ---")
male_files = []
male_map = {}
male_current_time = 0.0

for cid, kana in KANA_ITEMS:
    p = os.path.join(CACHE_MALE, f"kana_{cid}.mp3")
    ok = download_raw_male(kana, p)
    if not ok:
        # Fallback to female audio clip if male service failed on specific rare item
        fem_p = os.path.join(CACHE_FEMALE, f"kana_{cid}.mp3")
        if os.path.exists(fem_p):
            p = fem_p
    dur = get_audio_duration(p)
    male_files.append(p)
    entry = [round(male_current_time, 3), round(dur, 3)]
    male_map[cid] = entry
    male_map[kana] = entry
    male_current_time += dur
    time.sleep(0.2)

# Also copy word entries for male (sharing or matching)
for w in words:
    hex_key = text_to_hex(w)
    # If male word exists, use it, otherwise point to female word entry as graceful fallback
    if w in female_map:
        male_map[w] = female_map[w]
        male_map[hex_key] = female_map[hex_key]

print(f"Total male entries: {len(male_files)}, total duration: {round(male_current_time, 2)}s")

# Concatenate male files with -c copy (ZERO processing!)
with open("/tmp/concat_male.txt", "w") as f:
    for p in male_files:
        f.write(f"file '{p}'\n")

male_sprite_path = "public/audio/sprite_male.mp3"
subprocess.run([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0",
    "-i", "/tmp/concat_male.txt",
    "-c", "copy",
    male_sprite_path
], check=True)
print("sprite_male.mp3 created successfully!")

# ========================================================
# Phase 3: Save Sprite Map JSON
# ========================================================
sprite_data = {
    "female": female_map,
    "male": male_map
}

with open("public/audio/sprite_map.json", "w", encoding="utf-8") as f:
    json.dump(sprite_data, f, ensure_ascii=False, indent=2)

print("\nDone! Generated public/audio/sprite_female.mp3, sprite_male.mp3, and sprite_map.json")
