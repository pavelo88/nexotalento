import React from 'react';
import { 
  Briefcase, 
  Building2, 
  Phone, 
  Sparkles, 
  MessageSquare,
  Rocket
} from 'lucide-react';
import { PageRoute } from '../../types';
import { COMPANY_CONFIG } from '../../config/company';
import { trackEvent } from '../../lib/tracking';

interface MobileActionBarProps {
  currentPath: PageRoute;
  onNavigate: (path: PageRoute) => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  currentPath,
  onNavigate
}) => {
  const phoneClean = COMPANY_CONFIG.phone.replace(/\D/g, '') || '34614143763';
  const whatsappUrl = COMPANY_CONFIG.whatsappUrl;

  const triggerHaptic = (ms = 15) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  };

  const navItemsLeft = [
    {
      label: 'Servicios',
      icon: Briefcase,
      action: () => {
        triggerHaptic(12);
        trackEvent({ eventName: 'mobile_dock_services', category: 'MobileNav' });
        onNavigate('/servicios');
      },
      active: currentPath === '/servicios'
    },
    {
      label: 'Sectores',
      icon: Building2,
      action: () => {
        triggerHaptic(12);
        trackEvent({ eventName: 'mobile_dock_sectors', category: 'MobileNav' });
        if (currentPath === '/') {
          const el = document.getElementById('sectores-especializacion');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          onNavigate('/#sectores-especializacion' as PageRoute);
        }
      },
      active: false
    }
  ];

  const navItemsRight = [
    {
      label: 'Vacantes',
      icon: Rocket,
      action: () => {
        triggerHaptic(12);
        trackEvent({ eventName: 'mobile_dock_vacantes', category: 'MobileNav' });
        onNavigate('/vacantes');
      },
      active: currentPath === '/vacantes'
    },
    {
      label: 'WhatsApp',
      icon: MessageSquare,
      action: () => {
        triggerHaptic(15);
        trackEvent({ eventName: 'whatsapp_click', category: 'MobileNav', label: 'MobileDock' });
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      },
      isWhatsApp: true,
      active: false
    }
  ];

  return (
    <nav
      aria-label="Barra de acciones móviles estilo Apple"
      className="fixed inset-x-0 bottom-0 z-50 md:hidden select-none pointer-events-auto"
    >
      <div className="relative">
        
        {/* Apple iOS Drop Shadow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 drop-shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
          <div className="h-full w-full rounded-t-[50%_1.75rem] bg-[#082041]/70 ios-notch-mask" />
        </div>

        {/* Apple Frosted Glass Background with Elliptic Arch & Center Notch */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-[50%_1.75rem] border-t border-white/[0.12] bg-[#082041]/95 backdrop-blur-2xl ios-notch-mask"
        />

        {/* 5-Column Grid */}
        <ul className="relative grid grid-cols-5 items-end px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
          
          {/* Left Item 1: Servicios */}
          <li className="flex h-14 items-end justify-center">
            <button
              onClick={navItemsLeft[0].action}
              className={`flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 cursor-pointer ${
                navItemsLeft[0].active ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className={`h-5 w-5 ${navItemsLeft[0].active ? 'text-cyan-400' : 'text-slate-300'}`} />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{navItemsLeft[0].label}</span>
            </button>
          </li>

          {/* Left Item 2: Sectores */}
          <li className="flex h-14 items-end justify-center">
            <button
              onClick={navItemsLeft[1].action}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
            >
              <Building2 className="h-5 w-5 text-slate-300" />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{navItemsLeft[1].label}</span>
            </button>
          </li>

          {/* Center Column: Notch Floating 24/7 Call Button */}
          <li className="relative flex h-14 justify-center">
            <a
              href={`tel:+${phoneClean}`}
              onClick={() => triggerHaptic(25)}
              aria-label="Llamada directa 24/7 con Consultor de Selección"
              className="group absolute -top-[28px] bottom-0 flex flex-col items-center justify-between pb-1"
            >
              <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-[#00A9A3] to-blue-600 text-slate-950 shadow-[0_4px_20px_rgba(0,169,163,0.5)] ring-2 ring-white/30 transition-transform duration-150 group-active:scale-90">
                <span className="absolute inset-0 rounded-full animate-ping bg-[#00A9A3]/30 pointer-events-none" />
                <Phone className="h-6 w-6 fill-current text-slate-950" aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[10px] font-black leading-none tracking-wider text-cyan-400 uppercase drop-shadow">
                24/7 Call
              </span>
            </a>
          </li>

          {/* Right Item 1: Vacantes */}
          <li className="flex h-14 items-end justify-center">
            <button
              onClick={navItemsRight[0].action}
              className={`flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 cursor-pointer ${
                navItemsRight[0].active ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className={`h-5 w-5 ${navItemsRight[0].active ? 'text-emerald-400' : 'text-slate-300'}`} />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{navItemsRight[0].label}</span>
            </button>
          </li>

          {/* Right Item 2: WhatsApp */}
          <li className="flex h-14 items-end justify-center">
            <button
              onClick={navItemsRight[1].action}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
            >
              <div className="relative">
                <MessageSquare className="h-5 w-5 text-[#25D366] fill-[#25D366]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <span className="text-[10px] font-semibold leading-none tracking-tight text-emerald-400">{navItemsRight[1].label}</span>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};
