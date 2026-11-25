import React from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Building2,
  Clock,
  MessageSquare,
  Globe,
  Award,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Linkedin
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FooterProps {
  onNavigate?: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer: () => void;
  onOpenConcierge?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAIAgent,
  onOpenCVAnalyzer,
  onOpenConcierge
}) => {
  const { theme } = useTheme();
  const whatsappNumber = '34614143763';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola Nexo Talento, deseo consultar con un Senior Talent Partner sobre procesos de Headhunting y Selección de Personal directivo en España.'
  )}`;

  const handleNav = (path: PageRoute) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`border-t text-xs relative overflow-hidden transition-colors duration-300 ${theme === 'dark'
        ? 'bg-slate-950 border-slate-800 text-slate-400'
        : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}>

      {/* Top Banner: Direct Consultant & 18-Day Guarantee */}
      <div className="border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-300 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-xs">
              <strong className="text-white">Atención Ejecutiva Inmediata:</strong> Consultores Sénior disponibles para proyectos en Madrid y toda España, con cobertura Latam.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultor: +34 614 143 763</span>
            </a>

            {onOpenConcierge && (
              <button
                onClick={onOpenConcierge}
                className="px-3.5 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Asesor Comercial 24/7</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links - 2 Columns on Mobile, clearance pb-28 for Apple Dock */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-28 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">

          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('/')} className="focus:outline-none text-left group">
              <Logo size="sm" showText={true} showSubtitle={true} monochromeWhite={true} forceDark={true} />
            </button>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Sede Madrid:</strong> {COMPANY_CONFIG.addresses.madrid.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Atención Directa:</strong> {COMPANY_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Email Corporativo:</strong> <span>{COMPANY_CONFIG.emailUser}</span><span className="text-cyan-400">&#64;</span><span>{COMPANY_CONFIG.emailDomain}</span></span>
              </div>
            </div>
          </div>

          {/* Links en 2 Columnas Estructuradas en Móvil */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Col 2: Servicios */}
            <div>
              <h3 className="text-white font-bold text-sm mb-3 md:mb-4 font-heading border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">Servicios</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => handleNav('/servicios')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Executive Search</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/servicios')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Headhunting Tech</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/servicios')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">RPO Scaleups</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/servicios')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Assessment Directivo</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/vacantes')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300 font-bold active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">Vacantes Activas</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/jobhunting')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#00E5C9] transition-colors flex items-center gap-1 text-[#00E5C9] font-bold active:scale-95">
                    <Sparkles className="w-3 h-3 text-[#00A896] shrink-0" />
                    <span className="truncate">Impulso laboral</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/guia-salarial')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Guía Salarial 2026</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Atención Directa & Consultoría */}
            <div>
              <h3 className="text-white font-bold text-sm mb-3 md:mb-4 font-heading border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">Consultoría</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={COMPANY_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left p-1.5 md:p-0 rounded-lg bg-emerald-950/40 md:bg-transparent border border-emerald-800/40 md:border-0 hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400 font-bold active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-emerald-400 shrink-0" />
                    <span className="truncate">WhatsApp 24/7</span>
                  </a>
                </li>
                <li>
                  <button onClick={() => handleNav('/contacto')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Briefing de Posición</span>
                  </button>
                </li>
                {/* Calculadora ROI: ruta y código conservados, enlace público oculto. */}
                <li>
                  <button onClick={() => handleNav('/proceso')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Proceso 18 Días</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('/testimonios')} className="w-full text-left p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-cyan-400 transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                    <span className="truncate">Casos de Éxito</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Garantías & Legal */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1 pt-2 md:pt-0">
              <h3 className="text-white font-bold text-sm mb-3 md:mb-4 font-heading">Garantías</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <p className="font-bold text-white flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>18 Días</span>
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">Terna finalista validada.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                  <p className="font-bold text-white flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>3 a 6 Meses</span>
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">Garantía de reposición.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom legal buttons & SinergIA Tech copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col items-center justify-center gap-3 text-center">
          
          {/* Fila 1: Los 3 botones con menos caracteres */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-slate-300">
            <a
              href="https://www.linkedin.com/company/nexotalentos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nexo Talento en LinkedIn"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 active:scale-95 py-1 px-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hover:text-cyan-400 cursor-pointer active:scale-95 transition-colors py-1 px-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50">
              Aviso Legal
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hover:text-cyan-400 cursor-pointer active:scale-95 transition-colors py-1 px-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50">
              Canal Ético
            </span>
          </div>

          {/* Fila 2: Los 2 botones con más caracteres */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-slate-300">
            <span className="hover:text-cyan-400 cursor-pointer active:scale-95 transition-colors py-1 px-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50">
              Política de Privacidad (RGPD)
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hover:text-cyan-400 cursor-pointer active:scale-95 transition-colors py-1 px-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50">
              Política de Cookies
            </span>
          </div>

          {/* Debajo de esto: Todos los derechos reservados de SinergIA Tech */}
          <div className="pt-2 text-[11px] text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} SinergIA Tech. Todos los derechos reservados.</p>
          </div>

        </div>

      </div>
    </footer>
  );
};
