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
  Mail
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
    'Hola Nexo Talentos, deseo consultar con un Senior Talent Partner sobre procesos de Headhunting y Selección de Personal directivo en España.'
  )}`;

  const handleNav = (path: PageRoute) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`border-t text-xs relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-slate-950 border-slate-800 text-slate-400'
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      
      {/* Top Banner: Direct Consultant & 18-Day Guarantee */}
      <div className="border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-300 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-xs">
              <strong className="text-white">Atención Ejecutiva Inmediata:</strong> Consultores Sénior disponibles para proyectos en Madrid, Barcelona y toda España.
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

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('/')} className="focus:outline-none text-left">
              <Logo size="md" forceDark={true} />
            </button>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Firma boutique de <strong>Executive Search, Headhunting y Selección de Talento Directivo y Tecnológico</strong> en España. Entregamos tu terna validada en 18 días hábiles con <strong>garantía contractual de 3 a 6 meses</strong> de sustitución.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Sede Madrid:</strong> {COMPANY_CONFIG.addresses.madrid.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Sede Barcelona:</strong> {COMPANY_CONFIG.addresses.barcelona.full}</span>
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

          {/* Col 2: Servicios */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 font-heading">Servicios de Selección</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Executive Search &amp; C-Level
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Headhunting Tech &amp; Digital
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  RPO para Scaleups
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/servicios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Assessment Directivo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/vacantes')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Portal de Vacantes Activas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/guia-salarial')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Estudios Salariales 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atención Directa & Consultoría */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 font-heading">Atención &amp; Contacto</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={COMPANY_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400 font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                  WhatsApp Directo (+34 614 143 763)
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('/contacto')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Solicitar Briefing de Posición
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/calculadora-roi')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Calculadora de Coste de Vacante
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/proceso')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Metodología de Selección en 18 Días
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/testimonios')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  Casos de Éxito de Selección
                </button>
              </li>
              {/* 
               * =====================================================================
               * AGENTES IA COMENTADOS SEGÚN REQUERIMIENTO (PRESERVADOS):
               * <li><button onClick={() => onOpenAIAgent('headhunter')}>Agente Headhunter</button></li>
               * ...
               * =====================================================================
               */}
            </ul>
          </div>

          {/* Col 4: Garantías & Legal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 font-heading">Garantías &amp; Compromiso</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Compromiso 18 Días
                </p>
                <p className="text-[10px] text-slate-400">Terna de finalistas evaluada y validada en 18 días hábiles.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Garantía 3 a 6 Meses
                </p>
                <p className="text-[10px] text-slate-400">Reposición contractual sin coste adicional según nivel de la posición.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & SEO footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Nexo Talentos S.L. Todos los derechos reservados. CIF / NIF B-88492011. Madrid &amp; Barcelona.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Aviso Legal</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Política de Privacidad (RGPD)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Política de Cookies</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Canal Ético &amp; Cumplimiento</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
