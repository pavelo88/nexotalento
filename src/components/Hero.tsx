import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Award, 
  FileSearch,
  MessageSquare,
  Sparkles,
  Users,
  Building2,
  Rocket,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { PageRoute } from '../types';

interface HeroProps {
  onOpenAIAgent: (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer: () => void;
  onNavigate?: (path: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenAIAgent, 
  onOpenCVAnalyzer,
  onNavigate 
}) => {
  const { theme } = useTheme();
  const [mobileTab, setMobileTab] = useState<'empresas' | 'candidatos'>('empresas');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className={`relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-24 overflow-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Grid Pattern */}
      <div className={`absolute inset-0 pointer-events-none ${
        theme === 'dark'
          ? 'bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]'
          : 'bg-[linear-gradient(to_right,#cbd5e130_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e130_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Badge */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm transition-transform hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(6, 182, 212, 0.5)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              Firma de Headhunting &amp; Externalización Estratégica en España
            </span>
            <span className="bg-cyan-500/20 text-cyan-400 dark:text-cyan-300 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-cyan-500/30">
              Edición 2026
            </span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            Gestión del Talento, Executive Search &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              Contratación con Agentes IA
            </span>
          </h1>
          <p className={`mt-2.5 text-xs sm:text-sm max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Garantizamos la máxima precisión en Madrid, Barcelona y toda España. Terna en <strong>18 días hábiles</strong> y <strong>100% blindaje legal (Art. 43 ET)</strong>.
          </p>
        </div>

        {/* Mobile Audience Switcher (Visible on Mobile Only) */}
        <div className="lg:hidden flex items-center justify-center p-1 rounded-2xl border mb-6 max-w-sm mx-auto shadow-sm"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(241, 245, 249, 0.9)',
            borderColor: theme === 'dark' ? 'rgba(51, 65, 85, 0.7)' : 'rgba(203, 213, 225, 0.8)'
          }}
        >
          <button
            onClick={() => setMobileTab('empresas')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'empresas'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Soy Empresa</span>
          </button>
          <button
            onClick={() => setMobileTab('candidatos')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'candidatos'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Soy Candidato</span>
          </button>
        </div>

        {/* DESKTOP SPLIT SCREEN HERO (Bifurcación Inmediata) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= LEFT SIDE: PARA EMPRESAS ================= */}
          <div className={`rounded-3xl border p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden card-spring-hover ${
            mobileTab === 'empresas' ? 'block' : 'hidden lg:flex'
          } ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 border-slate-800 hover:border-cyan-500/50'
              : 'bg-gradient-to-br from-white via-cyan-50/30 to-white border-slate-200 hover:border-cyan-500/60 shadow-lg shadow-cyan-950/5'
          }`}>
            
            {/* Background Accent Pill */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Audience Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 mb-4">
                <Building2 className="w-3.5 h-3.5" />
                <span>Para Empresas, Founders &amp; Comités de Dirección</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mb-3">
                Encuentra Talento Técnico, Directivo &amp; <br /> C-Level
              </h2>

              {/* Persuasive copy */}
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Externalización y Headhunting ético sin riesgos de cesión ilegal. Identificamos al <strong>1% de talento pasivo de alto impacto</strong> con evaluación predictiva y cobertura integral.
              </p>

              {/* Image Showcase: Modern Boardroom & Tech Leaders in Madrid/Barcelona */}
              <div className="relative rounded-2xl overflow-hidden mb-6 border border-cyan-500/20 shadow-md group h-48 sm:h-52 w-full">
                <img 
                  srcSet="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=75 400w, https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=75 600w"
                  sizes="(max-width: 640px) 400px, 600px"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=75" 
                  alt="Equipo Directivo y Headhunting en Madrid"
                  width="600"
                  height="338"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Garantía Total de 12 Meses
                    </span>
                    <span className="bg-cyan-500/90 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-md text-[10px]">
                      Terna en 18 Días
                    </span>
                  </div>
                </div>
              </div>

              {/* Value Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-cyan-700 dark:text-cyan-400">18 Días</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Terna Validada</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-blue-700 dark:text-blue-400">12 Meses</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Garantía Reposición</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">98.4%</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Tasa de Éxito</p>
                </div>
              </div>
            </div>

            {/* CTAs for Companies */}
            <div className={`space-y-2.5 pt-2 border-t ${theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/solicitar-talento');
                  } else {
                    scrollToSection('calculadora-requerimientos');
                  }
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold rounded-2xl shadow-lg btn-spring-press flex items-center justify-center gap-2 text-sm group cursor-pointer"
              >
                <span>Solicitar Requerimiento de Personal</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => onOpenAIAgent('headhunter')}
                  className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl border btn-spring-press flex items-center justify-center gap-1.5 ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Consultar con Headhunter IA</span>
                </button>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('/servicios')}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border btn-spring-press ${
                      theme === 'dark'
                        ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Ver Servicios
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: PARA CANDIDATOS ================= */}
          <div className={`rounded-3xl border p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden card-spring-hover ${
            mobileTab === 'candidatos' ? 'block' : 'hidden lg:flex'
          } ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 border-slate-800 hover:border-emerald-500/50'
              : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-slate-200 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/5'
          }`}>
            
            {/* Background Accent Pill */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Audience Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>Para Candidatos &amp; Directivos en Crecimiento</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mb-3">
                Impulsa tu Carrera Directiva hacia <br /> Puestos de Alto Impacto
              </h2>

              {/* Persuasive copy */}
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Acceso exclusivo a <strong>ofertas confidenciales no publicadas</strong> en España y Europa. Transparencia salarial garantizada (Directiva UE 2023/970) y feedback directo.
              </p>

              {/* Image Showcase: Modern Tech Talent & Executive Strategy */}
              <div className="relative rounded-2xl overflow-hidden mb-6 border border-emerald-500/20 shadow-md group h-48 sm:h-52 w-full">
                <img 
                  srcSet="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&crop=top&q=75 400w, https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&crop=top&q=75 600w"
                  sizes="(max-width: 640px) 400px, 600px"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&crop=top&q=75" 
                  alt="Candidato Profesional de Éxito"
                  width="600"
                  height="338"
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Auditoría Salarial &amp; CV con IA
                    </span>
                    <span className="bg-emerald-500/90 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-md text-[10px]">
                      +24 Vacantes Activas
                    </span>
                  </div>
                </div>
              </div>

              {/* Value Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">100%</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Salarios Públicos</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-teal-700 dark:text-teal-400">&lt;48h</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Feedback Primer Filtro</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-base font-extrabold text-cyan-700 dark:text-cyan-400">+1.850</p>
                  <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Líderes Colocados</p>
                </div>
              </div>
            </div>

            {/* CTAs for Candidates */}
            <div className={`space-y-2.5 pt-2 border-t ${theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/vacantes');
                  } else {
                    scrollToSection('vacantes');
                  }
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold rounded-2xl shadow-lg btn-spring-press flex items-center justify-center gap-2 text-sm group cursor-pointer"
              >
                <span>Explorar Ofertas de Empleo Activas</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={onOpenCVAnalyzer}
                  className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl border btn-spring-press flex items-center justify-center gap-1.5 ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                  }`}
                >
                  <FileSearch className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Auditar mi CV con IA</span>
                </button>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('/guia-salarial')}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border btn-spring-press ${
                      theme === 'dark'
                        ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Guía Salarial
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= STICKY MOBILE BOTTOM CTAs (Visible only on Mobile) ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl">
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('/solicitar-talento');
              } else {
                scrollToSection('calculadora-requerimientos');
              }
            }}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 text-center btn-spring-press"
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Busco Personal</span>
          </button>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('/vacantes');
              } else {
                scrollToSection('vacantes');
              }
            }}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 text-center btn-spring-press"
          >
            <Rocket className="w-4 h-4 shrink-0" />
            <span>Ver Vacantes</span>
          </button>
        </div>
      </div>

    </section>
  );
};
