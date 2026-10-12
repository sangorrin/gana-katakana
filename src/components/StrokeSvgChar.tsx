import React from 'react';
import { KATAKANA_SVG_MAP } from '../data/katakanaSvgMap';

interface Props {
  char: string;
  className?: string;
  animKey?: number;
  delayOffsetSeconds?: number;
}

export const StrokeSvgChar: React.FC<Props> = ({ 
  char, 
  className = '', 
  animKey = 0,
  delayOffsetSeconds = 0,
}) => {
  const svgHtml = KATAKANA_SVG_MAP[char];

  if (!svgHtml) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="font-brush text-5xl text-[#2C241E] leading-none select-none">
          {char}
        </span>
      </div>
    );
  }

  return (
    <div
      key={`${char}_${animKey}`}
      className={`relative select-none pointer-events-none ${className}`}
      style={
        delayOffsetSeconds > 0
          ? ({ '--delay-offset': `${delayOffsetSeconds}s` } as React.CSSProperties)
          : undefined
      }
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
};
