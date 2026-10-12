import React, { useState, useMemo } from 'react';
import { 
  ALL_KATAKANA_ITEMS, 
  KATAKANA_BASIC_LIST, 
  DIPTONGOS_LIST, 
  DAKUTEN_LIST, 
  EXTRANJERO_LIST 
} from '../data/katakanaData';
import { KawaiiIllustration } from './KawaiiIllustration';
import { soundEngine } from '../utils/audio';
import { 
  RotateCw, 
  Volume2, 
  CheckCircle2, 
  RotateCcw, 
  Shuffle, 
  Layers
} from 'lucide-react';

interface FlashcardItem {
  id: string;
  frontText: string;
  isWord: boolean;
  romaji: string;
  spanish: string;
  iconType?: string;
  categoryName: string;
  fullKana: string;
}

type DeckCategory = 'katakana' | 'diptongos' | 'dakuten' | 'extra' | 'words';

const CATEGORY_TABS: { id: DeckCategory; label: string }[] = [
  { id: 'katakana', label: 'Seion' },
  { id: 'diptongos', label: 'Youon' },
  { id: 'dakuten', label: 'Dakuten' },
  { id: 'extra', label: 'Extra' },
  { id: 'words', label: 'Tango' },
];

export const FlashcardsMode: React.FC = () => {
  const [deckFilter, setDeckFilter] = useState<DeckCategory>('katakana');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isChangingCard, setIsChangingCard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  const deck = useMemo(() => {
    const cards: FlashcardItem[] = [];

    if (deckFilter === 'katakana') {
      KATAKANA_BASIC_LIST.forEach(item => {
        cards.push({
          id: `kana_${item.id}`,
          frontText: item.kana,
          isWord: false,
          romaji: item.romaji,
          spanish: `Sonido "${item.romaji}"`,
          categoryName: 'Seion',
          fullKana: item.kana,
        });
      });
    } else if (deckFilter === 'diptongos') {
      DIPTONGOS_LIST.forEach(item => {
        cards.push({
          id: `kana_${item.id}`,
          frontText: item.kana,
          isWord: false,
          romaji: item.romaji,
          spanish: `Youon "${item.romaji}"`,
          categoryName: 'Youon',
          fullKana: item.kana,
        });
      });
    } else if (deckFilter === 'dakuten') {
      DAKUTEN_LIST.forEach(item => {
        cards.push({
          id: `kana_${item.id}`,
          frontText: item.kana,
          isWord: false,
          romaji: item.romaji,
          spanish: `Dakuten "${item.romaji}"`,
          categoryName: 'Dakuten',
          fullKana: item.kana,
        });
      });
    } else if (deckFilter === 'extra') {
      EXTRANJERO_LIST.forEach(item => {
        cards.push({
          id: `kana_${item.id}`,
          frontText: item.kana,
          isWord: false,
          romaji: item.romaji,
          spanish: `Extra "${item.romaji}"`,
          categoryName: 'Extra',
          fullKana: item.kana,
        });
      });
    } else if (deckFilter === 'words') {
      ALL_KATAKANA_ITEMS.forEach(item => {
        item.examples.forEach((ex, exIdx) => {
          cards.push({
            id: `word_${item.id}_${exIdx}`,
            frontText: ex.word,
            isWord: true,
            romaji: ex.romaji,
            spanish: ex.spanish,
            iconType: ex.iconType,
            categoryName: 'Tango',
            fullKana: ex.word,
          });
        });
      });
    }

    return cards;
  }, [deckFilter]);

  const currentCard = deck[currentIndex] || deck[0];

  const handlePlayVoice = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    soundEngine.playKana(currentCard.fullKana, currentCard.id);
  };

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const willBeFlipped = !isFlipped;
    setIsFlipped(willBeFlipped);
    if (willBeFlipped) {
      soundEngine.playKana(currentCard.fullKana, currentCard.id);
    }
  };

  const handleNext = () => {
    setIsChangingCard(true);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % deck.length);
      setIsChangingCard(false);
    }, 150);
  };

  const handlePrev = () => {
    setIsChangingCard(true);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);
      setIsChangingCard(false);
    }, 150);
  };

  // Botón "¡Lo sé!": reproduce el chime de éxito y avanza a la siguiente tarjeta
  const handleMastered = () => {
    soundEngine.playChime();
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.add(currentCard.id);
      return next;
    });
    setReviewIds(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleReview = () => {
    setReviewIds(prev => {
      const next = new Set(prev);
      next.add(currentCard.id);
      return next;
    });
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleShuffle = () => {
    setIsChangingCard(true);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(Math.floor(Math.random() * deck.length));
      setIsChangingCard(false);
    }, 150);
  };

  const handleResetCurrentDeck = () => {
    const deckCardIds = new Set(deck.map(c => c.id));
    setMasteredIds(prev => {
      const next = new Set(prev);
      deckCardIds.forEach(id => next.delete(id));
      return next;
    });
    setReviewIds(prev => {
      const next = new Set(prev);
      deckCardIds.forEach(id => next.delete(id));
      return next;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const deckMasteredCount = useMemo(() => {
    return deck.filter(c => masteredIds.has(c.id)).length;
  }, [deck, masteredIds]);

  const deckReviewCount = useMemo(() => {
    return deck.filter(c => reviewIds.has(c.id)).length;
  }, [deck, reviewIds]);

  const isMastered = masteredIds.has(currentCard.id);
  const isReviewing = reviewIds.has(currentCard.id);

  // Escala tipográfica dinámica para que las palabras largas nunca se rompan en dos líneas
  const getFrontFontSize = (text: string, isWord: boolean) => {
    if (!isWord) return 'text-6xl sm:text-7xl';
    const len = text.length;
    if (len <= 2) return 'text-4xl sm:text-5xl';
    if (len <= 4) return 'text-3xl sm:text-4xl';
    if (len <= 6) return 'text-2xl sm:text-3xl';
    return 'text-xl sm:text-2xl';
  };

  return (
    <div className="space-y-3.5 pb-4">
      {/* Selector de categorías fluido y perfectamente distribuido de extremo a extremo sin hueco sobrante */}
      <nav className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between p-1 bg-[#EBE3D5] rounded-xl border border-[#7A6B5B]/25 gap-1">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setDeckFilter(tab.id); setCurrentIndex(0); setIsFlipped(false); }}
              className={`flex-1 min-w-0 py-1.5 px-1 rounded-lg text-xs font-medium text-center whitespace-nowrap transition-all cursor-pointer truncate ${
                deckFilter === tab.id
                  ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs border border-[#7A6B5B]/20'
                  : 'text-[#6B5E52] hover:text-[#2C241E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Barra de estado del mazo: Notación 1/45 y botones de acción rápida */}
      <div className="flex items-center justify-between px-1 text-xs text-[#7A6B5B] max-w-sm mx-auto">
        <div className="flex items-center gap-1.5 font-bold text-[#2C241E]">
          <Layers className="w-3.5 h-3.5 text-[#C53D32]" />
          <span>{currentIndex + 1}/{deck.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-emerald-700 font-medium" title="Dominados">
            <CheckCircle2 className="w-3 h-3" />
            <span>{deckMasteredCount}</span>
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium" title="Por repasar">
            <RotateCcw className="w-3 h-3" />
            <span>{deckReviewCount}</span>
          </span>
          <button
            type="button"
            onClick={handleShuffle}
            className="flex items-center gap-0.5 text-[#8C7A68] hover:text-[#2C241E] transition-colors cursor-pointer text-[11px]"
            title="Mezclar mazo"
          >
            <Shuffle className="w-3 h-3" />
            <span>Mezclar</span>
          </button>
          <button
            type="button"
            onClick={handleResetCurrentDeck}
            className="flex items-center gap-0.5 text-[#8C7A68] hover:text-[#C53D32] transition-colors cursor-pointer ml-1 text-[11px]"
            title="Reiniciar progreso"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container: Altura adaptativa y proporciones seguras */}
      <div className="perspective-1000 w-full flex items-center justify-center py-1">
        <div
          onClick={handleFlip}
          className={`relative w-full max-w-[340px] h-[320px] sm:h-[340px] rounded-2xl ${
            isChangingCard ? 'transition-none' : 'transition-transform duration-500'
          } transform-style-preserve-3d cursor-pointer select-none nihonga-shadow ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* CARA FRONTAL DE LA TARJETA */}
          <div className="absolute inset-0 backface-hidden bg-washi rounded-2xl border-2 border-[#7A6B5B]/30 p-3.5 sm:p-4 flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#A69989]">
                {currentCard.categoryName}
              </span>
              <span className="text-[10px] text-[#A69989]/70 font-medium">
                ¿Cómo se lee?
              </span>
            </div>

            <div className="my-auto text-center w-full px-2 flex flex-col items-center justify-center">
              <span className={`font-mincho font-bold text-[#2C241E] whitespace-nowrap block max-w-full overflow-hidden text-ellipsis ${
                getFrontFontSize(currentCard.frontText, currentCard.isWord)
              }`}>
                {currentCard.frontText}
              </span>
              <span className="text-[11px] text-[#A69989] mt-2 block">
                Toca para girar ↺
              </span>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-[#7A6B5B]">
              <span className="capitalize">{currentCard.categoryName}</span>
              {isMastered && (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[10px]">
                  ✓ Dominado
                </span>
              )}
              {isReviewing && (
                <span className="text-amber-700 font-semibold flex items-center gap-1 text-[10px]">
                  ⟳ Repasar
                </span>
              )}
            </div>
          </div>

          {/* CARA TRASERA DE LA TARJETA */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#FAF4E8] rounded-2xl border-2 border-[#C53D32]/40 p-3.5 sm:p-4 flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#C53D32] font-semibold">
                Pronunciación
              </span>
              <button
                type="button"
                onClick={handlePlayVoice}
                className="w-7 h-7 rounded-full bg-[#F2E8D8] flex items-center justify-center text-[#C53D32] cursor-pointer"
                title="Escuchar de nuevo"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="my-auto text-center flex flex-col items-center justify-center w-full py-1">
              {currentCard.iconType && (
                <div className="w-12 h-12 mb-1.5 rounded-xl bg-white/80 p-1 flex items-center justify-center shadow-xs border border-[#7A6B5B]/15 shrink-0">
                  <KawaiiIllustration iconType={currentCard.iconType} size={38} />
                </div>
              )}

              <span className="font-mincho text-2xl sm:text-3xl font-bold text-[#2C241E] whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                {currentCard.frontText}
              </span>

              <span className="text-xs sm:text-sm font-semibold text-[#8C5C2C] mt-0.5 tracking-wider uppercase">
                {currentCard.romaji}
              </span>

              <span className="text-xs font-medium text-[#2C241E] mt-1 px-2.5 py-0.5 bg-white/80 rounded-md border border-[#7A6B5B]/15 max-w-[95%] text-center line-clamp-2">
                {currentCard.spanish}
              </span>
            </div>

            <span className="text-[10px] text-[#A69989]">
              Toca para volver al frente ↺
            </span>
          </div>
        </div>
      </div>

      {/* Controles de acción */}
      <div className="grid grid-cols-3 gap-2 max-w-[340px] mx-auto">
        <button
          type="button"
          onClick={handleReview}
          className="py-2 px-2.5 rounded-xl bg-[#EFE8DC] border border-[#B09E8B] text-[#5C4D3E] font-medium text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform hover:bg-[#E5DCCF] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
          <span>Repasar</span>
        </button>

        <button
          type="button"
          onClick={handleFlip}
          className="py-2 px-2.5 rounded-xl bg-[#FAF6EE] border border-[#7A6B5B]/30 text-[#2C241E] font-medium text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform hover:border-[#7A6B5B] cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#C53D32]" />
          <span>{isFlipped ? 'Frente' : 'Girar'}</span>
        </button>

        <button
          type="button"
          onClick={handleMastered}
          className="py-2 px-2.5 rounded-xl bg-[#2C5E3B] text-white font-medium text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform shadow-xs hover:bg-[#234B2F] cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>¡Lo sé!</span>
        </button>
      </div>

      {/* Navegación anterior / siguiente */}
      <div className="flex items-center justify-between max-w-[340px] mx-auto px-2">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1 text-xs text-[#8C7A68] hover:text-[#2C241E] transition-colors cursor-pointer"
        >
          <span>← Anterior</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 text-xs text-[#8C7A68] hover:text-[#2C241E] transition-colors cursor-pointer"
        >
          <span>Siguiente →</span>
        </button>
      </div>
    </div>
  );
};
