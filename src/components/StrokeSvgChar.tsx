import React, { useState, useEffect } from 'react';

const svgCache = new Map<string, string>();

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
  const [svgHtml, setSvgHtml] = useState<string | null>(svgCache.get(char) || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (svgCache.has(char)) {
      setSvgHtml(svgCache.get(char)!);
      return;
    }

    let isMounted = true;
    const url = `/strokes/katakana/${encodeURIComponent(char)}.svg`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((svgText) => {
        // Strip out any redundant xml headers if present, keep pure svg
        const cleaned = svgText.replace(/<\?xml.*?\?>/i, '').trim();
        svgCache.set(char, cleaned);
        if (isMounted) {
          setSvgHtml(cleaned);
          setError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [char]);

  if (error || !svgHtml) {
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
