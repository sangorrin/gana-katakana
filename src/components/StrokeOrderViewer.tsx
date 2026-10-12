import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { StrokeSvgChar } from './StrokeSvgChar';
import { KATAKANA_STROKE_COUNTS } from '../utils/strokeOrder';
import { Volume2 } from 'lucide-react';

interface Props {
  char1: string;
  char2?: string;
  fullKana: string;
  romaji: string;
  onCharacterTouch?: () => void;
}

export const StrokeOrderViewer: React.FC<Props> = ({
  char1,
  char2,
  fullKana,
  romaji,
  onCharacterTouch,
}) => {
  const [animCount, setAnimCount] = useState(0);

  const handlePlaySound = () => {
    soundEngine.playKana(fullKana, `details_${fullKana}`);
    setAnimCount((prev) => prev + 1);
    if (onCharacterTouch) onCharacterTouch();
  };

  // Sequential writing order in Youon:
  // Character 1 finishes all its strokes first, then Character 2 begins.
  const char1Strokes = KATAKANA_STROKE_COUNTS[char1] || 2;
  const char2Delay = char1Strokes * 0.55;

  return (
    <div className="flex flex-col items-center">
      {/* Character Frame: touchable to pronounce and re-animate strokes */}
      <button
        type="button"
        onClick={handlePlaySound}
        className="relative flex items-center justify-center p-4 bg-white/95 rounded-2xl nihonga-border nihonga-shadow cursor-pointer active:scale-95 transition-transform hover:border-[#C53D32]/50 group"
        title="Toca para escuchar pronunciación y ver orden de trazo"
      >
        {/* Paper texture overlay inside frame */}
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#C89E68_1px,transparent_1px),linear-gradient(to_bottom,#C89E68_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl" />

        {/* 
          Local StrokeSVG Vector Animation container:
          In Youon combinations, Character 1 is drawn first, and Character 2 follows sequentially.
        */}
        <div className="relative z-10 flex items-end justify-center leading-none gap-0 p-0 m-0">
          <StrokeSvgChar
            char={char1}
            className={char2 ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-32 h-32 sm:w-36 sm:h-36'}
            animKey={animCount}
            delayOffsetSeconds={0}
          />

          {char2 && (
            <StrokeSvgChar
              char={char2}
              className="w-16 h-16 sm:w-18 sm:h-18"
              animKey={animCount}
              delayOffsetSeconds={char2Delay}
            />
          )}
        </div>
      </button>

      {/* Romaji below with Speaker icon to its right (no male/female indicator) */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="font-mincho text-2xl font-bold tracking-wider text-[#2A2420]">
          {romaji}
        </span>
        <button
          type="button"
          onClick={handlePlaySound}
          className="p-1 rounded-full text-[#C53D32] hover:bg-[#EAE2D2]/60 active:scale-90 transition-transform cursor-pointer"
          title="Escuchar pronunciación"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
