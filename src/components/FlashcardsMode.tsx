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
  Layers,
  ArrowRight
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

export const FlashcardsMode: React.FC = () => {
  const [deckFilter, setDeckFilter] = useState<'katakana' | 'diptongos' | 'dakuten' | 'extra' | 'words'>('katakana');
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
          categoryName: 'Katakana',
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
            categoryName: 'Palabras',
            fullKana: ex.word,
          });
        });
      });
    }

    return cards;
  }, [deckFilter]);

  const currentCard = deck[currentIndex] || deck[0];

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    if (!isFlipped && currentCard) {
      soundEngine.playKana(currentCard.fullKana, `card_${currentCard.id}`);
    }
  };

  const handleNext = () => {
    if (isFlipped) {
      setIsChangingCard(true);
      setIsFlipped(false);
      setCurrentIndex(prev => (prev + 1) % Math.max(1, deck.length));
      setTimeout(() => {
        setIsChangingCard(false);
      }, 50);
    } else {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, deck.length));
    }
  };

  const handleMastered = () => {
    if (!currentCard) return;
    soundEngine.playChime();
    setMasteredIds(prev => new Set(prev).add(currentCard.id));
    setReviewIds(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleReview = () => {
    if (!currentCard) return;
    setReviewIds(prev => new Set(prev).add(currentCard.id));
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleShuffle = () => {
    if (isFlipped) {
      setIsChangingCard(true);
      setIsFlipped(false);
      setTimeout(() => {
        setIsChangingCard(false);
      }, 50);
    } else {
      setIsFlipped(false);
    }
    soundEngine.playPaperFlip();
    setCurrentIndex(Math.floor(Math.random() * deck.length));
  };

  const handleResetCurrentDeck = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
    const cardIdsInDeck = new Set(deck.map(c => c.id));
    setMasteredIds(prev => {
      const next = new Set(prev);
      cardIdsInDeck.forEach(id => next.delete(id));
      return next;
    });
    setReviewIds(prev => {
      const next = new Set(prev);
      cardIdsInDeck.forEach(id => next.delete(id));
      return next;
    });
  };

  const handlePlayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    soundEngine.playKana(currentCard.fullKana, `card_${currentCard.id}`);
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12 text-[#6B5E52]">
        No hay tarjetas en esta categoría.
      </div>
    );
  }

  const deckMasteredCount = deck.filter(c => masteredIds.has(c.id)).length;
  const deckReviewCount = deck.filter(c => reviewIds.has(c.id)).length;

  const isMastered = masteredIds.has(currentCard.id);
  const isReviewing = reviewIds.has(currentCard.id);

  return (
    <div className="space-y-4 pb-6">
      {/* Category selector: Katakana, Youon, Dakuten, Extra, Palabras */}
      <div className="flex items-center gap-1 p-1 bg-[#EBE3D5] rounded-xl border border-[#7A6B5B]/25 overflow-x-auto">
        <button
          type="button"
          onClick={() => { setDeckFilter('katakana'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            deckFilter === 'katakana' ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs' : 'text-[#6B5E52]'
          }`}
        >
          Katakana
        </button>

        <button
          type="button"
          onClick={() => { setDeckFilter('diptongos'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            deckFilter === 'diptongos' ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs' : 'text-[#6B5E52]'
          }`}
        >
          Youon
        </button>

        <button
          type="button"
          onClick={() => { setDeckFilter('dakuten'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            deckFilter === 'dakuten' ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs' : 'text-[#6B5E52]'
          }`}
        >
          Dakuten
        </button>

        <button
          type="button"
          onClick={() => { setDeckFilter('extra'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            deckFilter === 'extra' ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs' : 'text-[#6B5E52]'
          }`}
        >
          Extra
        </button>

        <button
          type="button"
          onClick={() => { setDeckFilter('words'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            deckFilter === 'words' ? 'bg-[#FAF6EE] text-[#2C241E] font-semibold shadow-xs' : 'text-[#6B5E52]'
          }`}
        >
          Palabras
        </button>
      </div>

      {/* Progress & Deck Status Bar: 1/45 notation, and Reiniciar button */}
      <div className="flex items-center justify-between px-2 text-xs text-[#7A6B5B]">
        <div className="flex items-center gap-1.5 font-bold text-[#2C241E]">
          <Layers className="w-3.5 h-3.5 text-[#C53D32]" />
          <span>{currentIndex + 1}/{deck.length}</span>
        </div>

        <div className="flex items-center gap-2.5">
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
            className="flex items-center gap-1 text-[#8C7A68] hover:text-[#2C241E] transition-colors cursor-pointer"
            title="Mezclar mazo"
          >
            <Shuffle className="w-3 h-3" />
            <span>Mezclar</span>
          </button>
          <button
            type="button"
            onClick={handleResetCurrentDeck}
            className="flex items-center gap-1 text-[#8C7A68] hover:text-[#C53D32] transition-colors cursor-pointer ml-1"
            title="Reiniciar progreso de esta categoría"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full min-h-[300px] flex items-center justify-center py-1">
        <div
          onClick={handleFlip}
          className={`relative w-full max-w-[320px] h-[300px] rounded-2xl ${
            isChangingCard ? 'transition-none' : 'transition-transform duration-500'
          } transform-style-preserve-3d cursor-pointer select-none nihonga-shadow ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 backface-hidden bg-washi rounded-2xl border-2 border-[#7A6B5B]/30 p-6 flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#A69989]">
                {currentCard.categoryName}
              </span>
              <button
                type="button"
                onClick={handlePlayVoice}
                className="w-8 h-8 rounded-full bg-[#EBE3D5] flex items-center justify-center text-[#7A6B5B] hover:text-[#C53D32] transition-colors cursor-pointer"
                title="Escuchar"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="my-auto text-center">
              <span className={`font-mincho font-bold text-[#2C241E] tracking-wider block ${
                currentCard.isWord ? 'text-4xl' : 'text-7xl'
              }`}>
                {currentCard.frontText}
              </span>
              <span className="text-xs text-[#A69989] mt-2 block">
                Toca para girar ↺
              </span>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-[#7A6B5B]">
              <span className="capitalize">{currentCard.categoryName}</span>
              {isMastered && (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Dominado
                </span>
              )}
              {isReviewing && (
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  ⟳ Repasar
                </span>
              )}
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#FAF4E8] rounded-2xl border-2 border-[#C53D32]/40 p-6 flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#C53D32] font-semibold">
                Significado
              </span>
              <button
                type="button"
                onClick={handlePlayVoice}
                className="w-8 h-8 rounded-full bg-[#F2E8D8] flex items-center justify-center text-[#C53D32] cursor-pointer"
                title="Escuchar de nuevo"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="my-auto text-center flex flex-col items-center">
              {currentCard.iconType && (
                <div className="w-16 h-16 mb-2 rounded-xl bg-white/70 p-1 flex items-center justify-center shadow-xs border border-[#7A6B5B]/15">
                  <KawaiiIllustration iconType={currentCard.iconType} size={52} />
                </div>
              )}

              <span className="font-mincho text-3xl font-bold text-[#2C241E]">
                {currentCard.frontText}
              </span>

              <span className="text-base font-semibold text-[#8C5C2C] mt-1 tracking-wider uppercase">
                {currentCard.romaji}
              </span>

              <span className="text-sm font-medium text-[#2C241E] mt-1 px-2.5 py-0.5 bg-white/70 rounded-md border border-[#7A6B5B]/15">
                {currentCard.spanish}
              </span>
            </div>

            <span className="text-[10px] text-[#A69989]">
              Toca para volver al frente ↺
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-3 gap-2.5 max-w-[340px] mx-auto">
        <button
          type="button"
          onClick={handleReview}
          className="py-2.5 px-3 rounded-xl bg-[#EFE8DC] border border-[#B09E8B] text-[#5C4D3E] font-medium text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-[#E5DCCF] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-700" />
          <span>Repasar</span>
        </button>

        <button
          type="button"
          onClick={handleFlip}
          className="py-2.5 px-3 rounded-xl bg-[#FAF6EE] border border-[#7A6B5B]/30 text-[#2C241E] font-medium text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform hover:border-[#7A6B5B] cursor-pointer"
        >
          <RotateCw className="w-4 h-4 text-[#C53D32]" />
          <span>{isFlipped ? 'Frente' : 'Girar'}</span>
        </button>

        <button
          type="button"
          onClick={handleMastered}
          className="py-2.5 px-3 rounded-xl bg-[#2C5E3B] text-white font-medium text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform shadow-xs hover:bg-[#234B2F] cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>¡Lo sé!</span>
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 text-xs text-[#8C7A68] hover:text-[#2C241E] transition-colors cursor-pointer"
        >
          <span>Siguiente</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
