import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface NexoFloatingMenuProps {
  onNavigateToContact?: () => void;
}

export const NexoFloatingMenu: React.FC<NexoFloatingMenuProps> = () => {
  const whatsappUrl = COMPANY_CONFIG.whatsappUrl;
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-40 hidden md:flex items-center transition-all duration-300 ${
      isFooterVisible
        ? 'opacity-0 pointer-events-none translate-y-3'
        : 'opacity-100 pointer-events-auto translate-y-0'
    }`}>
      {/* Botón flotante único, limpio y minimalista de WhatsApp (Desktop only) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 bg-[#25D366] hover:bg-[#20ba59] text-white"
        aria-label="Contactar directamente por WhatsApp con Nexo Talento"
        title="WhatsApp Consultor Directo (+34 614 143 763)"
      >
        {/* Pulsing Aura */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 pointer-events-none" />

        {/* Active Online Green Dot */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
        </span>

        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform text-white fill-white" />
        </div>

        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-slate-950/95 text-emerald-300 text-xs font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-emerald-500/30">
          WhatsApp Consultor (+34 614 143 763)
        </span>
      </a>
    </div>
  );
};
