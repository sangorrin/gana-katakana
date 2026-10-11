import React, { useState } from 'react';
import { getWikimediaGifUrl } from '../utils/strokeOrder';
import { soundEngine } from '../utils/audio';
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
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  const handlePlaySound = () => {
    soundEngine.playKana(fullKana, `details_${fullKana}`);
    if (onCharacterTouch) onCharacterTouch();
  };

  const gifUrl1 = getWikimediaGifUrl(char1);
  const gifUrl2 = char2 ? getWikimediaGifUrl(char2) : '';

  return (
    <div className="flex flex-col items-center">
      {/* Character Frame: touchable to pronounce */}
      <button
        type="button"
        onClick={handlePlaySound}
        className="relative flex items-center justify-center p-3 bg-white/95 rounded-2xl nihonga-border nihonga-shadow cursor-pointer active:scale-95 transition-transform hover:border-[#C53D32]/50 group"
        title="Toca para escuchar pronunciación"
      >
        {/* Paper texture overlay inside frame */}
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#C89E68_1px,transparent_1px),linear-gradient(to_bottom,#C89E68_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl" />

        {/* 
          Direct flex container with items-end:
          Both 4:3 GIF images use h-auto and object-bottom with zero vertical letterboxing,
          forcing both bottom borders to align flush on the exact same pixel line.
        */}
        <div className="relative z-10 flex items-end justify-center leading-none gap-0 p-0 m-0">
          {!img1Error ? (
            <img
              src={gifUrl1}
              alt={`Trazo animado de ${char1}`}
              onError={() => setImg1Error(true)}
              className={`${char2 ? 'w-24 sm:w-28' : 'w-32 sm:w-36'} h-auto object-contain object-bottom block m-0 p-0 select-none pointer-events-none`}
            />
          ) : (
            <span className={`${char2 ? 'text-5xl' : 'text-6xl'} font-brush text-[#2C241E] leading-none select-none`}>
              {char1}
            </span>
          )}

          {char2 && (
            !img2Error ? (
              <img
                src={gifUrl2}
                alt={`Trazo animado de ${char2}`}
                onError={() => setImg2Error(true)}
                className="w-16 sm:w-18 h-auto object-contain object-bottom block m-0 p-0 select-none pointer-events-none"
              />
            ) : (
              <span className="text-3xl font-brush text-[#2C241E] leading-none select-none">
                {char2}
              </span>
            )
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
