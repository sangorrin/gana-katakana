import React, { useState } from 'react';
import { KanaTab, KatakanaItem, CountersState, ExampleWord } from '../types';
import { 
  KATAKANA_BASIC_LIST, 
  DIPTONGOS_LIST, 
  DAKUTEN_LIST, 
  EXTRANJERO_LIST 
} from '../data/katakanaData';
import { getNihongaCellStyle, NIHONGA_PIGMENTS } from '../data/nihongaColors';
import { StrokeOrderViewer } from './StrokeOrderViewer';
import { KawaiiIllustration } from './KawaiiIllustration';
import { soundEngine } from '../utils/audio';
import { ChevronLeft, Volume2, RotateCcw } from 'lucide-react';

interface Props {
  counters: CountersState;
  onUpdateCounter: (id: string, newCount: number) => void;
  onResetCounters?: () => void;
}

export const DetailsMode: React.FC<Props> = ({
  counters,
  onUpdateCounter,
}) => {
  const [activeTab, setActiveTab] = useState<KanaTab>('katakana');
  const [selectedItem, setSelectedItem] = useState<KatakanaItem | null>(null);

  const handleSelectCharacter = (item: KatakanaItem) => {
    const currentCount = counters[item.id] || 0;
    const nextCount = Math.min(5, currentCount + 1);
    onUpdateCounter(item.id, nextCount);
    setSelectedItem(item);
    soundEngine.playKana(item.kana, `detail_enter_${item.id}`);
  };

  const handlePlayWord = (example: ExampleWord) => {
    soundEngine.playKana(example.word, `word_${example.word}`);
  };

  const handleResetCurrentTab = () => {
    if (activeTab === 'katakana') {
      KATAKANA_BASIC_LIST.forEach(item => onUpdateCounter(item.id, 0));
    } else if (activeTab === 'diptongos') {
      DIPTONGOS_LIST.forEach(item => onUpdateCounter(item.id, 0));
    } else if (activeTab === 'dakuten') {
      DAKUTEN_LIST.forEach(item => onUpdateCounter(item.id, 0));
    } else if (activeTab === 'extra') {
      EXTRANJERO_LIST.forEach(item => onUpdateCounter(item.id, 0));
    }
  };

  const renderCell = (item: KatakanaItem | null, rowIndex: number, key: string) => {
    if (!item) {
      return (
        <div
          key={key}
          className="aspect-square rounded-xl border border-dashed border-[#7A6B5B]/15 bg-[#EAE2D2]/30 flex items-center justify-center pointer-events-none"
        >
          <span className="text-[10px] text-[#A69989]/40 select-none">・</span>
        </div>
      );
    }

    const count = counters[item.id] || 0;
    const cellStyle = getNihongaCellStyle(item.rowIndex ?? rowIndex, count);

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleSelectCharacter(item)}
        style={cellStyle.style}
        className="relative aspect-square rounded-xl border p-1 flex flex-col items-center justify-between transition-all duration-150 cursor-pointer active:scale-95 group overflow-hidden hover:brightness-105"
        title={`${item.kana} (${item.romaji})`}
      >
        <span 
          style={{ color: cellStyle.romajiColor }}
          className="text-[10px] font-medium tracking-tight mt-0.5 uppercase"
        >
          {item.romaji}
        </span>

        <span className="font-mincho text-xl sm:text-2xl font-bold leading-none my-auto">
          {item.kana}
        </span>

        <div className="flex items-center gap-0.5 mb-0.5">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className={`w-1 h-1 rounded-full ${
                count >= lvl 
                  ? (count >= 3 ? 'bg-white' : 'bg-[#C53D32]') 
                  : (count >= 3 ? 'bg-white/20' : 'bg-black/15')
              }`}
            />
          ))}
        </div>
      </button>
    );
  };

  if (selectedItem) {
    const count = counters[selectedItem.id] || 0;
    const pigment = NIHONGA_PIGMENTS[selectedItem.rowIndex % NIHONGA_PIGMENTS.length];

    return (
      <div className="space-y-4 pb-6 animate-fadeIn">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#EAE2D2] text-[#2C241E] text-xs font-medium hover:bg-[#DDD3C0] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-[#6B5E52]">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: pigment.baseHex }} 
            />
            <span className="font-mincho font-medium">Nivel {count}/5</span>
          </div>
        </div>

        {/* Character Stroke Order Card (single unified frame, always animated, touching plays sound) */}
        <div className="p-4 bg-[#FAF6EE] rounded-2xl nihonga-border nihonga-shadow flex flex-col items-center">
          <StrokeOrderViewer
            char1={selectedItem.char1}
            char2={selectedItem.char2}
            fullKana={selectedItem.kana}
            romaji={selectedItem.romaji}
            onCharacterTouch={() => {
              const current = counters[selectedItem.id] || 0;
              if (current < 5) onUpdateCounter(selectedItem.id, current + 1);
            }}
          />
        </div>

        {/* Example Words with individualized Kawaii illustrations */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-2.5">
            {selectedItem.examples.map((example, idx) => {
              const parts = example.word.split(example.highlightKana);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePlayWord(example)}
                  className="w-full text-left p-3 bg-washi-card rounded-xl nihonga-border nihonga-shadow flex items-center gap-3.5 transition-all hover:border-[#C53D32]/40 active:scale-[0.99] cursor-pointer group"
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-[#FAF6EE] border border-[#7A6B5B]/15 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                    <KawaiiIllustration iconType={example.iconType} size={48} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mincho text-xl font-bold text-[#2C241E] tracking-wide">
                        {parts.map((part, i) => (
                          <React.Fragment key={i}>
                            <span>{part}</span>
                            {i < parts.length - 1 && (
                              <span className="text-[#C53D32] bg-[#C53D32]/10 px-1 rounded-sm underline decoration-[#C53D32] decoration-2 underline-offset-2">
                                {example.highlightKana}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </span>

                      <div className="w-7 h-7 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#7A6B5B] group-hover:text-[#C53D32] group-hover:bg-[#C53D32]/10 transition-colors">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold text-[#8C5C2C] uppercase tracking-wider">
                        {example.romaji}
                      </span>
                      <span className="text-xs text-[#7A6B5B]">·</span>
                      <span className="text-xs font-medium text-[#2C241E]">
                        {example.spanish}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 4 Tabs Selector: Katakana, Youon, Dakuten, Extra */}
      <div className="flex items-center gap-1 p-1 bg-[#EBE3D5] rounded-xl border border-[#7A6B5B]/25 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('katakana')}
          className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-medium text-center whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'katakana'
              ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs'
              : 'text-[#6B5E52] hover:text-[#2C241E]'
          }`}
        >
          Seion
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diptongos')}
          className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-medium text-center whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'diptongos'
              ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs'
              : 'text-[#6B5E52] hover:text-[#2C241E]'
          }`}
        >
          Youon
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dakuten')}
          className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-medium text-center whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'dakuten'
              ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs'
              : 'text-[#6B5E52] hover:text-[#2C241E]'
          }`}
        >
          Dakuten
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('extra')}
          className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-medium text-center whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'extra'
              ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs'
              : 'text-[#6B5E52] hover:text-[#2C241E]'
          }`}
        >
          Extra
        </button>
      </div>

      {/* Grids */}
      <div className="pb-2">
        {activeTab === 'katakana' && (
          <div className="space-y-2">
            {['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n'].map((rowKey, rowIdx) => {
              let rowCells: (KatakanaItem | null)[] = [];
              if (rowKey === 'ya') {
                const ya = KATAKANA_BASIC_LIST.find(i => i.id === 'ya') || null;
                const yu = KATAKANA_BASIC_LIST.find(i => i.id === 'yu') || null;
                const yo = KATAKANA_BASIC_LIST.find(i => i.id === 'yo') || null;
                rowCells = [ya, null, yu, null, yo];
              } else if (rowKey === 'wa') {
                const wa = KATAKANA_BASIC_LIST.find(i => i.id === 'wa') || null;
                rowCells = [wa, null, null, null, null];
              } else if (rowKey === 'n') {
                const n = KATAKANA_BASIC_LIST.find(i => i.id === 'n') || null;
                rowCells = [n, null, null, null, null];
              } else {
                rowCells = [0, 1, 2, 3, 4].map(col => {
                  return KATAKANA_BASIC_LIST.find(i => i.rowIndex === rowIdx && i.colIndex === col) || null;
                });
              }

              return (
                <div key={rowKey} className="grid grid-cols-5 gap-2">
                  {rowCells.map((cell, colIdx) => renderCell(cell, rowIdx, `${rowKey}_${colIdx}`))}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'diptongos' && (
          <div className="space-y-2">
            {[
              { ids: ['kya', 'kyu', 'kyo'], rowIdx: 1 },
              { ids: ['sha', 'shu', 'sho'], rowIdx: 2 },
              { ids: ['cha', 'chu', 'cho'], rowIdx: 3 },
              { ids: ['nya', 'nyu', 'nyo'], rowIdx: 4 },
              { ids: ['hya', 'hyu', 'hyo'], rowIdx: 5 },
              { ids: ['mya', 'myu', 'myo'], rowIdx: 6 },
              { ids: ['rya', 'ryu', 'ryo'], rowIdx: 8 },
            ].map((grp, gIdx) => (
              <div key={gIdx} className="grid grid-cols-3 gap-2">
                {grp.ids.map((id, colIdx) => {
                  const item = DIPTONGOS_LIST.find(i => i.id === id) || null;
                  return renderCell(item, grp.rowIdx, `${id}_${colIdx}`);
                })}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'dakuten' && (
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {DAKUTEN_LIST.filter(i => !i.char2).map((item) => renderCell(item, item.rowIndex, item.id))}
            </div>

            <div className="pt-2 border-t border-[#7A6B5B]/20">
              <div className="grid grid-cols-3 gap-2">
                {DAKUTEN_LIST.filter(i => i.char2).map((item) => renderCell(item, item.rowIndex, item.id))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'extra' && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {EXTRANJERO_LIST.map((item) => renderCell(item, item.rowIndex, item.id))}
          </div>
        )}
      </div>

      {/* Bottom Section: Reiniciar pestaña */}
      <div className="pt-2 border-t border-[#7A6B5B]/15 flex items-center justify-center">
        <button
          type="button"
          onClick={handleResetCurrentTab}
          className="flex items-center gap-1.5 py-1 px-3 rounded-lg text-xs text-[#8C7A68] hover:text-[#C53D32] hover:bg-[#EAE2D2]/50 transition-colors cursor-pointer"
          title="Reiniciar práctica de esta pestaña"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar pestaña</span>
        </button>
      </div>
    </div>
  );
};
