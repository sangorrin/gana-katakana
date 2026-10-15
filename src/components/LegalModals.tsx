import React, { useState } from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';

export const LegalModals: React.FC = () => {
  const [openModal, setOpenModal] = useState<'licenses' | 'terms' | null>(null);

  return (
    <>
      {/* Footer trigger links */}
      <footer className="mt-6 mb-3 pt-3 border-t border-[#7A6B5B]/20 text-center text-[10px] text-[#8C7A68]">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setOpenModal('licenses')}
            className="hover:text-[#C53D32] transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
          >
            Licencias
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => setOpenModal('terms')}
            className="hover:text-[#C53D32] transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
          >
            Términos y Privacidad
          </button>
        </div>
        <p className="mt-1 text-[9px] text-[#A69989]">
          Gana Katakana! © 2026
        </p>
      </footer>

      {/* In-app Modal Dialog (siempre centrado en el viewport visible con fixed) */}
      {openModal && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setOpenModal(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn"
        >
          <div className="relative w-full max-w-[360px] max-h-[85vh] overflow-y-auto bg-[#FAF6EE] rounded-2xl nihonga-border nihonga-shadow p-4 text-[#2C241E] my-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#6B5E52] hover:text-[#C53D32] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {openModal === 'licenses' && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 border-b border-[#7A6B5B]/20 pb-2">
                  <Scale className="w-4 h-4 text-[#C53D32]" />
                  <h3 className="font-mincho text-base font-bold">Licencias y Atribuciones</h3>
                </div>

                <div className="space-y-2.5 text-xs leading-relaxed text-[#5C4F43]">
                  <div>
                    <h4 className="font-bold text-[#2C241E]">1. Código de la Aplicación</h4>
                    <p className="mt-0.5 text-[11px]">
                      Publicado bajo la Licencia de Software Libre MIT para fines educativos y de autoaprendizaje.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#2C241E]">2. Animaciones de Trazos (StrokeSVG)</h4>
                    <p className="mt-0.5 text-[11px]">
                      Los diagramas animados de trazo vectorial proceden del proyecto de código abierto <span className="font-semibold">StrokeSVG</span> (por Kyle Zheng), basados en la tipografía caligráfica <span className="font-semibold">Klee One</span> de Fontworks Inc.
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#7A6B5B]">
                      Licencia: SIL Open Font License 1.1 (OFL) y Licencia MIT.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#2C241E]">3. Tipografías</h4>
                    <p className="mt-0.5 text-[11px]">
                      Klee One, Shippori Mincho y Plus Jakarta Sans bajo licencia abierta SIL Open Font License (OFL).
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setOpenModal(null)}
                    className="py-1 px-4 rounded-lg bg-[#2C241E] text-white text-xs font-medium hover:bg-[#45382E] transition-colors cursor-pointer"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}

            {openModal === 'terms' && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 border-b border-[#7A6B5B]/20 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#274A78]" />
                  <h3 className="font-mincho text-base font-bold">Términos y Privacidad</h3>
                </div>

                <div className="space-y-2.5 text-xs leading-relaxed text-[#5C4F43]">
                  <div>
                    <h4 className="font-bold text-[#2C241E]">1. Aviso Legal</h4>
                    <p className="mt-0.5 text-[11px]">
                      Herramienta didáctica interactiva orientada al aprendizaje del silabario japonés sin fines de lucro comercial.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#2C241E]">2. Privacidad y Datos (RGPD)</h4>
                    <p className="mt-0.5 text-[11px]">
                      La aplicación no requiere registro ni recopila datos personales. El progreso de práctica y contadores se almacenan únicamente de forma local en tu dispositivo (<code>localStorage</code>).
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setOpenModal(null)}
                    className="py-1 px-4 rounded-lg bg-[#2C241E] text-white text-xs font-medium hover:bg-[#45382E] transition-colors cursor-pointer"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
