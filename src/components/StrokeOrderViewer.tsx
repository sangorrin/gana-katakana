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
    <div className="relative w-full flex flex-col items-center">
      {/* Botón de altavoz ubicado en la esquina superior derecha del contenedor */}
      <button
        type="button"
        onClick={handlePlaySound}
        className="absolute top-0 right-0 sm:right-1 w-9 h-9 rounded-xl bg-white/95 nihonga-border nihonga-shadow flex items-center justify-center text-[#C53D32] hover:bg-[#FAF6EE] hover:border-[#C53D32]/50 active:scale-90 transition-all cursor-pointer shadow-xs group z-20"
        title="Escuchar pronunciación"
        aria-label="Escuchar pronunciación"
      >
        <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>

      {/* Caja de animación de trazos perfectamente centrada */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePlaySound}
          className="relative flex items-center justify-center p-4 bg-white/95 rounded-2xl nihonga-border nihonga-shadow cursor-pointer active:scale-95 transition-transform hover:border-[#C53D32]/50 group"
          title="Toca para escuchar pronunciación y ver orden de trazo"
        >
          {/* Trama de papel washi en el fondo */}
          <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#C89E68_1px,transparent_1px),linear-gradient(to_bottom,#C89E68_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl" />

          {/* Animación vectorial StrokeSVG centrada */}
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
      </div>

      {/* Romaji centrado debajo */}
      <div className="mt-3 flex items-center justify-center">
        <span className="font-mincho text-2xl font-bold tracking-wider text-[#2A2420]">
          {romaji}
        </span>
      </div>
    </div>
  );
};
