import React, { useState } from 'react';
import { KanaTab, KatakanaItem, CountersState } from '../types';
import { 
  KATAKANA_BASIC_LIST, 
  DIPTONGOS_LIST, 
  DAKUTEN_LIST, 
  EXTRANJERO_LIST 
} from '../data/katakanaData';
import { getNihongaCellStyle } from '../data/nihongaColors';
import { soundEngine } from '../utils/audio';
import { RotateCcw } from 'lucide-react';

interface Props {
  counters: CountersState;
  onUpdateCounter: (id: string, newCount: number) => void;
  onResetCounters?: () => void;
}

export const SoundsMode: React.FC<Props> = ({
  counters,
  onUpdateCounter,
}) => {
  const [activeTab, setActiveTab] = useState<KanaTab>('katakana');

  const handlePlaySound = (item: KatakanaItem) => {
    const currentCount = counters[item.id] || 0;
    const nextCount = Math.min(5, currentCount + 1);
    onUpdateCounter(item.id, nextCount);

    soundEngine.playKana(item.kana, `sounds_${item.id}`);
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
        onClick={() => handlePlaySound(item)}
        style={cellStyle.style}
        className="relative aspect-square rounded-xl border p-1 flex flex-col items-center justify-between transition-all duration-150 cursor-pointer active:scale-95 group overflow-hidden"
        title={`${item.kana} (${item.romaji}) - Práctica: ${count}/5`}
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

  const renderKatakanaGrid = () => {
    const rowKeys = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n'];

    return (
      <div className="space-y-2">
        {rowKeys.map((rowKey, rowIdx) => {
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
    );
  };

  const renderDiptongosGrid = () => {
    const rowPrefixes = [
      { ids: ['kya', 'kyu', 'kyo'], rowIdx: 1 },
      { ids: ['sha', 'shu', 'sho'], rowIdx: 2 },
      { ids: ['cha', 'chu', 'cho'], rowIdx: 3 },
      { ids: ['nya', 'nyu', 'nyo'], rowIdx: 4 },
      { ids: ['hya', 'hyu', 'hyo'], rowIdx: 5 },
      { ids: ['mya', 'myu', 'myo'], rowIdx: 6 },
      { ids: ['rya', 'ryu', 'ryo'], rowIdx: 8 },
    ];

    return (
      <div className="space-y-2">
        {rowPrefixes.map((grp, gIdx) => (
          <div key={gIdx} className="grid grid-cols-3 gap-2">
            {grp.ids.map((id, colIdx) => {
              const item = DIPTONGOS_LIST.find(i => i.id === id) || null;
              return renderCell(item, grp.rowIdx, `${id}_${colIdx}`);
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderDakutenGrid = () => {
    const dakutenRows = [
      { ids: ['ga', 'gi', 'gu', 'ge', 'go'], rowIdx: 1 },
      { ids: ['za', 'ji_z', 'zu', 'ze', 'zo'], rowIdx: 2 },
      { ids: ['da', 'ji_d', 'zu_d', 'de', 'do'], rowIdx: 3 },
      { ids: ['ba', 'bi', 'bu', 'be', 'bo'], rowIdx: 5 },
      { ids: ['pa', 'pi', 'pu', 'pe', 'po'], rowIdx: 7 },
    ];

    const diptongoDakutenRows = [
      { ids: ['gya', 'gyu', 'gyo'], rowIdx: 1 },
      { ids: ['ja', 'ju', 'jo'], rowIdx: 2 },
      { ids: ['bya', 'byu', 'byo'], rowIdx: 5 },
      { ids: ['pya', 'pyu', 'pyo'], rowIdx: 7 },
    ];

    return (
      <div className="space-y-3">
        {dakutenRows.map((grp, gIdx) => (
          <div key={gIdx} className="grid grid-cols-5 gap-2">
            {grp.ids.map((id, colIdx) => {
              const item = DAKUTEN_LIST.find(i => i.id === id) || null;
              return renderCell(item, grp.rowIdx, `${id}_${colIdx}`);
            })}
          </div>
        ))}

        <div className="pt-2 border-t border-[#7A6B5B]/20 space-y-2">
          {diptongoDakutenRows.map((grp, gIdx) => (
            <div key={gIdx} className="grid grid-cols-3 gap-2">
              {grp.ids.map((id, colIdx) => {
                const item = DAKUTEN_LIST.find(i => i.id === id) || null;
                return renderCell(item, grp.rowIdx, `${id}_${colIdx}`);
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExtraGrid = () => {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {EXTRANJERO_LIST.map((item) => (
          renderCell(item, item.rowIndex, item.id)
        ))}
      </div>
    );
  };

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

      {/* Tab Content */}
      <div className="pb-2">
        {activeTab === 'katakana' && renderKatakanaGrid()}
        {activeTab === 'diptongos' && renderDiptongosGrid()}
        {activeTab === 'dakuten' && renderDakutenGrid()}
        {activeTab === 'extra' && renderExtraGrid()}
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
