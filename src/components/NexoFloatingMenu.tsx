import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

/* 
 * =====================================================================
 * CÓDIGO DEL AGENTE IA PRESERVADO (COMENTADO SEGÚN REQUERIMIENTO):
 * import { NexIAChatModal } from './NexIAChatModal';
 * =====================================================================
 */

interface NexoFloatingMenuProps {
  onNavigateToContact?: () => void;
}

export const NexoFloatingMenu: React.FC<NexoFloatingMenuProps> = ({
  onNavigateToContact
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Preservado para reconexión futura si se requiere:
  // const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const whatsappUrl = COMPANY_CONFIG.whatsappUrl;

  return (
    <>
      {/* Floating Center Container (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Popup Card: Asistencia Humana Directa */}
        {isMenuOpen && (
          <div 
            className="mb-4 w-[340px] sm:w-[380px] rounded-3xl p-5 shadow-2xl border border-slate-800 bg-[#121724]/98 backdrop-blur-xl text-slate-100 animate-fadeIn relative overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading tracking-tight flex items-center gap-1.5">
                    Senior Talent Partner
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Atención personalizada en directo
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-3 relative z-10">
              {/* Option 1: Direct WhatsApp Advisor */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left p-3.5 rounded-2xl bg-[#1a2133] hover:bg-[#20293f] border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 group flex items-center gap-3.5 shadow-md hover:scale-[1.01]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#25D366]/40 group-hover:scale-105 transition-transform font-bold">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Chatear por WhatsApp
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold tracking-wide">
                      RESPUESTA INMEDIATA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    Consulta requerimientos, bandas salariales y disponibilidad de terna en 18 días.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* Option 2: Direct Phone Call */}
              <a
                href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`}
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left p-3 rounded-2xl bg-[#1a2133] hover:bg-[#20293f] border border-slate-700/70 hover:border-cyan-400/50 transition-all duration-200 group flex items-center gap-3.5 shadow-md hover:scale-[1.01]"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors block">
                    Llamada Telefónica Directa
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {COMPANY_CONFIG.phoneDisplay} (Madrid &amp; Barcelona)
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* Option 3: Formulario de Requerimiento */}
              {onNavigateToContact && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigateToContact();
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition-all text-xs text-slate-300 hover:text-white flex items-center justify-between"
                >
                  <span>Enviar requerimiento por formulario web</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              )}

              {/* 
               * =====================================================================
               * CÓDIGO DEL BOTÓN DE AGENTE IA COMENTADO (DISPONIBLE PARA REACTIVAR):
               * <button onClick={() => setIsChatModalOpen(true)} ...>
               *   NexIA Chatbot 24/7
               * </button>
               * =====================================================================
               */}
            </div>

            {/* Footer Assurance */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nexo Talentos • Confidencial</span>
              </div>
              <span>Atención Directa</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Direct quick WhatsApp button visible at glance */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-xs font-extrabold shadow-lg hover:shadow-[#25D366]/40 transition-all hover:scale-105"
            title="Abrir WhatsApp directo"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" />
            <span>Consultar por WhatsApp</span>
          </a>

          {/* Trigger button for complete contact card */}
          <button
            id="floating-nexo-hub-trigger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none ${
              isMenuOpen 
                ? 'bg-slate-900 border-2 border-emerald-500 text-white' 
                : 'bg-gradient-to-tr from-[#25D366] via-teal-500 to-cyan-500 text-slate-950'
            }`}
            aria-label={isMenuOpen ? "Cerrar menú de contacto" : "Contactar con consultor de talento por WhatsApp"}
            title="Contactar con un Consultor (WhatsApp directo)"
          >
            {/* Pulsing Aura when closed */}
            {!isMenuOpen && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30" />
            )}

            {/* Active Online Green Dot */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
            </span>

            {/* Icon */}
            <div className="relative flex items-center justify-center">
              {isMenuOpen ? (
                <X className="w-7 h-7 text-emerald-400 rotate-90 animate-fadeIn" />
              ) : (
                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform text-white fill-white" />
              )}
            </div>

            {/* Tooltip on Hover when closed */}
            {!isMenuOpen && (
              <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-slate-950/95 text-emerald-300 text-xs font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-emerald-500/30">
                Chatear con un Consultor (+34 614 143 763)
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 
       * =====================================================================
       * COMPONENTE MODAL DE NEXIA PRESERVADO COMENTADO:
       * <NexIAChatModal
       *   isOpen={isChatModalOpen}
       *   onClose={() => setIsChatModalOpen(false)}
       *   onNavigateToContact={onNavigateToContact}
       * />
       * =====================================================================
       */}
    </>
  );
};

