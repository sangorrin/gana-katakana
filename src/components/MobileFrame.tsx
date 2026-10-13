import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

interface Props {
  children: React.ReactNode;
}

export type FrameMode = 'iphone' | 'android' | 'fluid';

export const MobileFrame: React.FC<Props> = ({ children }) => {
  const [frameMode, setFrameMode] = useState<FrameMode>('iphone');

  // En la aplicación nativa (APK de Android, IPA de iOS) o en la web de producción publicada (GitHub Pages),
  // se activa la vista completa para que se adapte de forma fluida y natural a móviles, tablets y ordenadores.
  // El marco de teléfono solo se muestra en el preview de desarrollo (AI Studio).
  const isNative = Capacitor.isNativePlatform();
  const isProduction = import.meta.env.PROD;

  // Parámetro opcional ?simulator=true por si alguien quiere forzar la vista simulador
  const hasSimulatorParam =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('simulator') === 'true';

  if ((isNative || isProduction) && !hasSimulatorParam) {
    return (
      <div className="min-h-screen bg-washi text-[#2C241E] flex flex-col selection:bg-[#E8DCC8] pt-[max(env(safe-area-inset-top),12px)] pb-[max(env(safe-area-inset-bottom),16px)]">
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-1 sm:py-3 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Vista exclusiva para el entorno de desarrollo (preview de AI Studio):
  // Marco interactivo con selector de teléfono móvil
  return (
    <div className="min-h-screen bg-[#1A1816] py-2 sm:py-6 px-1 sm:px-4 flex flex-col items-center justify-start text-[#2C241E]">
      {/* Selector de simulador para previsualización en PC / AI Studio */}
      <div className="hidden sm:flex items-center gap-2 mb-4 p-1.5 bg-[#2B2724] rounded-xl border border-[#453D38] text-xs text-[#C5B9AC] shadow-lg">
        <span className="text-[11px] font-medium px-2 text-[#9E9082]">
          Vista simulador (solo desarrollo):
        </span>

        <button
          type="button"
          onClick={() => setFrameMode('iphone')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium transition-all cursor-pointer ${
            frameMode === 'iphone'
              ? 'bg-[#453D38] text-white shadow-xs'
              : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#C53D32]" />
          <span>iPhone iOS</span>
        </button>

        <button
          type="button"
          onClick={() => setFrameMode('android')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium transition-all cursor-pointer ${
            frameMode === 'android'
              ? 'bg-[#453D38] text-white shadow-xs'
              : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Android</span>
        </button>

        <button
          type="button"
          onClick={() => setFrameMode('fluid')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg font-medium transition-all cursor-pointer ${
            frameMode === 'fluid'
              ? 'bg-[#453D38] text-white shadow-xs'
              : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5 text-amber-400" />
          <span>Vista Completa</span>
        </button>
      </div>

      {/* Chasis simulador de teléfono en escritorio de desarrollo */}
      <div
        className={`w-full transition-all duration-300 ${
          frameMode === 'fluid'
            ? 'max-w-2xl bg-washi rounded-2xl sm:rounded-3xl shadow-2xl border border-[#7A6B5B]/30 overflow-hidden'
            : frameMode === 'iphone'
            ? 'max-w-[420px] rounded-[36px] sm:rounded-[50px] p-2 sm:p-3.5 bg-gradient-to-b from-[#3B3835] via-[#2A2724] to-[#1C1A18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-3 sm:border-4 border-[#524B45]'
            : 'max-w-[420px] rounded-[32px] sm:rounded-[42px] p-2 sm:p-3 bg-gradient-to-b from-[#2E2C2A] via-[#201E1C] to-[#141211] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-3 border-[#4A4540]'
        }`}
      >
        {/* Pantalla del dispositivo */}
        <div
          className={`relative bg-washi overflow-hidden flex flex-col ${
            frameMode === 'fluid'
              ? 'min-h-[85vh]'
              : 'rounded-[28px] sm:rounded-[38px] min-h-[780px] max-h-[880px]'
          }`}
        >
          {/* Barra de estado simulada (solo para modos de maqueta de teléfono) */}
          {frameMode !== 'fluid' && (
            <div className="shrink-0 h-11 px-6 flex items-center justify-between text-xs font-semibold text-[#3D352E] select-none pt-1">
              <span className="text-[12px] font-sans font-bold tracking-tight">
                9:41
              </span>

              {frameMode === 'iphone' ? (
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#181615] border border-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#181615]" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/15" />
              )}

              <div className="flex items-center gap-1.5 text-[11px]">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Contenido de la app */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2">
            {children}
          </div>

          {/* Barra inferior Home Indicator */}
          {frameMode !== 'fluid' && (
            <div className="shrink-0 h-5 sm:h-6 flex items-center justify-center pointer-events-none pb-1">
              <div className="w-32 h-1 bg-[#2C241E]/30 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
