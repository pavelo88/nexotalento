import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Briefcase, 
  Cpu, 
  Users, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles
} from 'lucide-react';
import { PageRoute } from '../types';

interface ServicesSectionProps {
  onOpenAIAgent: (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenJobSpecGenerator: () => void;
  onViewAllServices?: (path: PageRoute) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenAIAgent,
  onOpenJobSpecGenerator,
  onViewAllServices 
}) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const allServices = [
    {
      id: 'executive-search',
      title: 'Executive Search & C-Level',
      badge: 'Caza Directa Confidencial',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      description: 'Identificación y captación de Consejeros, CEOs, CFOs y COOs con garantía de 3 a 6 meses y terna en 18 días.',
      points: ['Mapeo exhaustivo del mercado', 'Entrevistas por competencias STAR', 'Terna validada en 18 días']
    },
    {
      id: 'tech-ia',
      title: 'Headhunting Tech & Especialistas Digitales',
      badge: 'Perfiles Críticos',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-600',
      description: 'Reclutamiento de CTOs, Tech Leads, Cloud Architects, Data Engineers y Especialistas Digitales.',
      points: ['Evaluación técnica rigurosa', 'Caza directa de profesionales senior en activo', 'Modelos híbridos y remotos']
    },
    {
      id: 'rpo-scaleup',
      title: 'RPO & Scaleups en Expansión',
      badge: 'Ahorro 45% Costes',
      icon: Users,
      color: 'from-indigo-600 to-purple-600',
      description: 'Externalización total o modular de procesos de selección para scaleups e implantación de nuevos hubs.',
      points: ['Recruiters dedicados', 'Integración con ATS propio', 'Reducción de coste por contratación']
    },
    {
      id: 'outsourcing-bpo',
      title: 'Externalización & BPO con Compliance',
      badge: '100% Blindaje Legal',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      description: 'Gestión de servicios técnicos sin riesgo de cesión ilegal (Art. 43 ET), con facturación por entregables y SLA.',
      points: ['Autonomía organizativa', 'Medios materiales propios', 'Cero contingencias laborales']
    },
    {
      id: 'assessment-center',
      title: 'Assessment Center & Evaluación Directiva',
      badge: 'Criterio Humano Experto',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      description: 'Auditoría presencial o virtual de liderazgo directivo y encaje situacional mediante role-plays y entrevistas de profundidad.',
      points: ['Simulaciones de comités y retos reales', 'Test competenciales estandarizados', 'Informe ejecutivo en 48 horas']
    },
    {
      id: 'compensacion-salarios',
      title: 'Consultoría Salarial & Retención',
      badge: 'Benchmark España 2026',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      description: 'Estudios de retribución fija y variable por percentiles, stock options y auditoría de igualdad retributiva.',
      points: ['Bandas salariales P25-P90', 'Paquetes de equity y retención de talento', 'Cumplimiento directiva UE']
    }
  ];

  // 3-second autoplay for mobile carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, allServices.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? allServices.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % allServices.length);
  };

  const currentService = allServices[currentSlide];
  const CurrentIcon = currentService.icon;

  // Top 3 for desktop grid
  const desktopTopServices = allServices.slice(0, 3);

  return (
    <section id="servicios-resumen" className={`py-14 sm:py-16 relative transition-colors duration-300 overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900/40 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-400 mb-2.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Soluciones Integrales para Empresas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Servicios de Headhunting &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Externalización</span>
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Desde la búsqueda directa de un Director General hasta el despliegue de células completas con total seguridad jurídica.
            </p>
          </div>

          {/* Prominent Action Button to Dedicated Full Services Page */}
          {onViewAllServices && (
            <button
              onClick={() => onViewAllServices('/servicios')}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer btn-spring-press"
            >
              <span>Ver Catálogo Completo (6 Servicios &amp; Tarifas)</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* -------------------------------------------------------------
            MOBILE ONLY: INTERACTIVE AUTOPLAY CAROUSEL (3 SECONDS + CONTROLS)
            ------------------------------------------------------------- */}
        <div 
          className="block md:hidden mb-6"
          onTouchStart={() => setIsPlaying(false)}
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Servicio {currentSlide + 1} de {allServices.length}</span>
            </span>

            {/* Prev / Play-Pause / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Servicio anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 h-8 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 active:scale-95 transition-all"
                aria-label={isPlaying ? 'Pausar rotación' : 'Activar rotación automática'}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isPlaying ? '3s' : 'Pausa'}</span>
              </button>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Siguiente servicio"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Positioned Card */}
          <div
            key={currentService.id}
            className={`p-6 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between min-h-[310px] ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-500/40 shadow-cyan-950/20'
                : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${currentService.color} flex items-center justify-center text-white shadow-md`}>
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm">
                  {currentService.badge}
                </span>
              </div>

              <h3 className="text-base font-extrabold font-heading mb-2 leading-snug">
                {currentService.title}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {currentService.description}
              </p>

              <ul className="space-y-1.5 text-xs text-slate-400 mb-4">
                {currentService.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="text-slate-300 dark:text-slate-300 text-slate-700">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              {onViewAllServices && (
                <button
                  onClick={() => onViewAllServices('/servicios')}
                  className="text-xs text-cyan-400 font-extrabold flex items-center gap-1"
                >
                  <span>Ver Todos los Servicios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <a
                href={`https://wa.me/34614143763?text=${encodeURIComponent(`Hola Nexo Talento, deseo consultar sobre el servicio de ${currentService.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Consultar por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dots Indicator with 44px Touch Target */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {allServices.map((_, idx) => (
              <div key={idx} className="min-h-[44px] min-w-[44px] flex items-center justify-center">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? 'w-7 bg-cyan-500 shadow-sm' 
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Bottom Full Catalog Action */}
          {onViewAllServices && (
            <div className="mt-4">
              <button
                onClick={() => onViewAllServices('/servicios')}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>Ver los 6 Servicios &amp; Tarifas en Detalle</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------
            DESKTOP ONLY: COMPACT 3-CARD SHOWCASE + FULL PAGE LINK
            ------------------------------------------------------------- */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-6">
          {desktopTopServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                    : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading mb-2">{service.title}</h3>
                  <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-400 mb-4">
                    {service.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={onOpenJobSpecGenerator}
                    className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Generar Job Spec</span>
                  </button>
                  <a
                    href={`https://wa.me/34614143763?text=${encodeURIComponent(`Hola Nexo Talento, deseo consultar sobre el servicio de ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Consultar WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
