import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { NexIAChatModal } from './NexIAChatModal';

interface NexoFloatingMenuProps {
  onNavigateToContact?: () => void;
}

export const NexoFloatingMenu: React.FC<NexoFloatingMenuProps> = ({
  onNavigateToContact
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const whatsappNumber = '34614143763';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola Nexo Talentos, deseo consultar sobre servicios de selección directiva y solicitar una terna en 18 días.'
  )}`;

  const handleOpenChat = () => {
    setIsMenuOpen(false);
    setIsChatModalOpen(true);
  };

  return (
    <>
      {/* Floating Center Container (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Popup Card matching Image 3 Reference */}
        {isMenuOpen && (
          <div 
            className="mb-4 w-[340px] sm:w-[380px] rounded-3xl p-5 shadow-2xl border border-slate-800 bg-[#121724]/98 backdrop-blur-xl text-slate-100 animate-fadeIn relative overflow-hidden"
            style={{
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 169, 163, 0.25)'
            }}
          >
            {/* Ambient Lighting */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00A9A3]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A9A3] to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-950/50">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading tracking-tight">
                    Nexo Talent Specialists
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Elige tu canal de asistencia preferido
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
              {/* Option 1: NexIA AI Agent */}
              <button
                onClick={handleOpenChat}
                className="w-full text-left p-3.5 rounded-2xl bg-[#1a2133] hover:bg-[#20293f] border border-slate-700/70 hover:border-[#00A9A3]/60 transition-all duration-200 group flex items-center gap-3.5 shadow-md hover:scale-[1.01]"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00A9A3] to-cyan-400 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-cyan-950/40 group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      NexIA
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold tracking-wide">
                      24/7 INSTANT
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    Diagnóstico de vacantes, terna en 18 días, presupuestos y consultoría inmediata.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Option 2: Direct WhatsApp Advisor */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left p-3.5 rounded-2xl bg-[#1a2133] hover:bg-[#20293f] border border-slate-700/70 hover:border-[#25D366]/60 transition-all duration-200 group flex items-center gap-3.5 shadow-md hover:scale-[1.01]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#25D366]/40 group-hover:scale-105 transition-transform font-bold">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Direct WhatsApp Advisor
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold tracking-wide">
                      HQ MADRID/BCN
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    Chatea en directo con un Senior Talent Partner (+34 614 143 763).
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            </div>

            {/* Footer Assurance */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nexo Talentos Oficial</span>
              </div>
              <span>Respuesta: &lt; 1 min</span>
            </div>
          </div>
        )}

        {/* Floating Main Circular Trigger Button */}
        <button
          id="floating-nexo-hub-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none ${
            isMenuOpen 
              ? 'bg-slate-900 border-2 border-[#00A9A3] text-white' 
              : 'bg-gradient-to-tr from-[#00A9A3] via-cyan-500 to-blue-600 text-slate-950'
          }`}
          style={{
            boxShadow: '0 10px 30px -5px rgba(0, 169, 163, 0.5), 0 0 25px rgba(0, 169, 163, 0.35)'
          }}
          aria-label={isMenuOpen ? "Cerrar menú de asistencia" : "Abrir Nexo Talent Specialists (IA y WhatsApp)"}
          title="Nexo Talent Specialists (NexIA & WhatsApp)"
        >
          {/* Pulsing Aura when closed */}
          {!isMenuOpen && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A9A3] opacity-30" />
          )}

          {/* Active Online Green Dot */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
          </span>

          {/* Icon */}
          <div className="relative flex items-center justify-center">
            {isMenuOpen ? (
              <X className="w-7 h-7 text-cyan-300 rotate-90 animate-fadeIn" />
            ) : (
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-6 transition-transform text-slate-950" />
            )}
          </div>

          {/* Tooltip on Hover when closed */}
          {!isMenuOpen && (
            <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-slate-950/95 text-cyan-300 text-xs font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-cyan-500/30">
              NexIA &amp; WhatsApp Directo
            </span>
          )}
        </button>
      </div>

      {/* Dedicated NexIA Chat Modal */}
      <NexIAChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        onNavigateToContact={onNavigateToContact}
      />
    </>
  );
};
