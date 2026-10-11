export type AppMode = 'sounds' | 'details' | 'flashcards';

export type KanaTab = 'katakana' | 'diptongos' | 'dakuten' | 'extra';

export interface ExampleWord {
  word: string;
  romaji: string;
  spanish: string;
  highlightKana: string;
  iconType: string;
}

export interface KatakanaItem {
  id: string;
  kana: string;          // Main character or combination e.g. "ア", "キャ"
  char1: string;         // First character e.g. "キ"
  char2?: string;        // Optional second small character e.g. "ャ"
  romaji: string;
  category: KanaTab;
  rowIndex: number;      // Determines Nihonga pigment row color
  colIndex?: number;     // 0: a, 1: i, 2: u, 3: e, 4: o
  examples: [ExampleWord, ExampleWord];
}

export interface NihongaColorInfo {
  name: string;
  kanji: string;
  baseHex: string;
  accentHex: string;
  meaning: string;
}

export type CountersState = Record<string, number>;
