/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppMode, CountersState } from './types';
import { MobileFrame } from './components/MobileFrame';
import { NihongaHeader } from './components/NihongaHeader';
import { SoundsMode } from './components/SoundsMode';
import { DetailsMode } from './components/DetailsMode';
import { FlashcardsMode } from './components/FlashcardsMode';
import { LegalModals } from './components/LegalModals';

const STORAGE_KEY_SOUNDS = 'gana_katakana_sounds_counters_v1';
const STORAGE_KEY_DETAILS = 'gana_katakana_details_counters_v1';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('sounds');

  // Independent local counters for Sounds mode (0-5 per character)
  const [soundsCounters, setSoundsCounters] = useState<CountersState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUNDS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Independent local counters for Details mode (0-5 per character)
  const [detailsCounters, setDetailsCounters] = useState<CountersState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DETAILS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save counters to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOUNDS, JSON.stringify(soundsCounters));
    } catch {
      // Ignore storage errors
    }
  }, [soundsCounters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DETAILS, JSON.stringify(detailsCounters));
    } catch {
      // Ignore storage errors
    }
  }, [detailsCounters]);

  const handleUpdateSoundsCounter = (id: string, newCount: number) => {
    setSoundsCounters(prev => ({
      ...prev,
      [id]: newCount,
    }));
  };

  const handleUpdateDetailsCounter = (id: string, newCount: number) => {
    setDetailsCounters(prev => ({
      ...prev,
      [id]: newCount,
    }));
  };

  const handleResetSounds = () => {
    setSoundsCounters({});
  };

  const handleResetDetails = () => {
    setDetailsCounters({});
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        {/* Nihonga Header & Mode navigation */}
        <NihongaHeader
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
        />

        {/* Main Content Area */}
        <main className="flex-1 pt-3 sm:pt-4">
          {currentMode === 'sounds' && (
            <SoundsMode
              counters={soundsCounters}
              onUpdateCounter={handleUpdateSoundsCounter}
              onResetCounters={handleResetSounds}
            />
          )}

          {currentMode === 'details' && (
            <DetailsMode
              counters={detailsCounters}
              onUpdateCounter={handleUpdateDetailsCounter}
              onResetCounters={handleResetDetails}
            />
          )}

          {currentMode === 'flashcards' && (
            <FlashcardsMode />
          )}
        </main>

        {/* Legal Modals & Attribution Footer */}
        <LegalModals />
      </div>
    </MobileFrame>
  );
}
