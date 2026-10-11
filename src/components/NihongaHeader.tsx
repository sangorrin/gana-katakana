import React from 'react';
import { AppMode } from '../types';
import { Volume2, Info, BookOpen } from 'lucide-react';

interface Props {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const NihongaHeader: React.FC<Props> = ({ currentMode, onSelectMode }) => {
  return (
    <header className="relative pt-3 pb-3 px-3 bg-gradient-to-b from-[#F3ECE0] via-[#FAF6EE] to-[#FAF6EE] border-b border-[#7A6B5B]/20 overflow-hidden">
      {/* Classical Nihonga Screen Background: Authentic Torinoko Washi & Kin'un Gold Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="w-full h-full opacity-35">
          <defs>
            {/* Traditional Gold Leaf Gradient (Kinpaku) */}
            <linearGradient id="headerKinpaku" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C99738" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#E2BD68" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#B28228" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8C6318" stopOpacity="0.15" />
            </linearGradient>
            {/* Mineral Pigment Wash Gradient (Iwa-enogu) */}
            <radialGradient id="mineralWash" cx="30%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#EAD8BE" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#DAC2A3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5ECE0" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Tarashikomi Mineral Mist */}
          <rect width="500" height="120" fill="url(#mineralWash)" />
          {/* Classical Yamato-e / Nihonga scalloped Kin'un Gold Cloud Bands */}
          <path d="M-10,32 C30,12 80,18 120,30 C160,42 200,20 250,15 C310,10 360,35 410,22 C450,12 480,25 510,18 L510,0 L-10,0 Z" fill="url(#headerKinpaku)" />
          <path d="M-10,75 C40,55 90,68 140,60 C190,52 230,75 290,65 C350,55 400,72 460,58 C480,54 500,60 520,55 L520,82 C470,95 410,80 350,92 C290,104 230,88 170,96 C110,104 50,88 -10,95 Z" fill="url(#headerKinpaku)" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Elegant Nihonga Title: Strictly Gana Katakana! */}
        <div className="flex items-center justify-center py-1">
          <span className="font-mincho text-2xl sm:text-3xl font-extrabold tracking-normal text-[#2A221B]">
            Gana Katakana!
          </span>
        </div>

        {/* Mode Menu Selector: Sonidos, Detalles, Flashcards */}
        <nav className="mt-3 w-full max-w-sm">
          <div className="grid grid-cols-3 p-1 bg-[#EBE3D5] rounded-xl border border-[#7A6B5B]/25 shadow-inner">
            <button
              type="button"
              onClick={() => onSelectMode('sounds')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
