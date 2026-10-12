import React from 'react';
import { AppMode } from '../types';
import { Volume2, Info, BookOpen } from 'lucide-react';

interface Props {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const NihongaHeader: React.FC<Props> = ({ currentMode, onSelectMode }) => {
  return (
    <header className="relative pt-3 sm:pt-4 pb-2 px-2 bg-transparent">
      <div className="flex flex-col">
        {/* Título Gana Katakana! alineado a la izquierda con fuente más gruesa */}
        <div className="flex items-center justify-start py-0.5 px-1">
          <h1 className="font-mincho text-base sm:text-lg font-black tracking-normal text-[#2A221B]">
            Gana Katakana!
          </h1>
        </div>

        {/* Mode Menu Selector: Sonidos, Detalles, Flashcards */}
        <nav className="mt-2.5 w-full max-w-sm mx-auto">
          <div className="grid grid-cols-3 p-1 bg-[#EBE3D5] rounded-xl border border-[#7A6B5B]/25 shadow-inner">
            <button
              type="button"
              onClick={() => onSelectMode('sounds')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentMode === 'sounds'
                  ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs border border-[#7A6B5B]/20'
                  : 'text-[#6B5E52] hover:text-[#2C241E]'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${currentMode === 'sounds' ? 'text-[#C53D32]' : ''}`} />
              <span className="truncate">Sonidos</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('details')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentMode === 'details'
                  ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs border border-[#7A6B5B]/20'
                  : 'text-[#6B5E52] hover:text-[#2C241E]'
              }`}
            >
              <Info className={`w-3.5 h-3.5 ${currentMode === 'details' ? 'text-[#C53D32]' : ''}`} />
              <span className="truncate">Detalles</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('flashcards')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentMode === 'flashcards'
                  ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs border border-[#7A6B5B]/20'
                  : 'text-[#6B5E52] hover:text-[#2C241E]'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 ${currentMode === 'flashcards' ? 'text-[#C53D32]' : ''}`} />
              <span className="truncate">Flashcards</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
