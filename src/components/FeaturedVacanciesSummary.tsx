import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute, JobPosition } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Euro, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Pause,
  Play
} from 'lucide-react';

interface FeaturedVacanciesSummaryProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer: () => void;
}

export const FeaturedVacanciesSummary: React.FC<FeaturedVacanciesSummaryProps> = ({
  onNavigate,
  onOpenCVAnalyzer
}) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const featuredPositions: JobPosition[] = [
    {
      id: 'cto-scaleup',
      title: 'Chief Technology Officer (CTO)',
      department: 'Tecnología & Cloud',
      location: 'Madrid (Híbrido 2d)',
      modality: 'Híbrido',
      salaryRange: '110.000 € - 145.000 € + Stock Options',
      experienceLevel: '+8 años liderazgo',
      description: 'Liderar la arquitectura multi-cloud y un equipo de 35 ingenieros para scaleup fintech en expansión internacional.',
      requirements: ['Experiencia escalando plataformas SaaS', 'Arquitectura AWS / Kubernetes', 'Liderazgo de equipos ágiles'],
      isFeatured: true,
      hot: true,
      tags: ['C-Level', 'Fintech', 'AWS']
    },
    {
      id: 'head-ai',
      title: 'Head of Artificial Intelligence & Data',
      department: 'Data & IA',
      location: 'Barcelona / Remoto España',
      modality: '100% Remoto',
      salaryRange: '95.000 € - 125.000 €',
      experienceLevel: '+6 años en IA',
      description: 'Diseño e implantación de modelos LLMs generativos y pipelines de analítica predictiva en sector farmacéutico.',
      requirements: ['PyTorch / LangChain / GenAI', 'Gobierno de datos & EU AI Act', 'Gestión de equipos'],
      isFeatured: true,
      tags: ['IA Generativa', 'Pharma', 'Remoto']
    },
    {
      id: 'cfo-private-equity',
      title: 'Director Financiero (CFO) — Private Equity',
      department: 'Finanzas & M&A',
      location: 'Madrid (Castellana)',
      modality: 'Presencial',
      salaryRange: '100.000 € - 130.000 € + 30% Bonus',
      experienceLevel: '+10 años',
      description: 'Liderazgo financiero, control de gestión y procesos de M&A para grupo industrial respaldado por fondo PE.',
      requirements: ['Auditoría Big 4 previa', 'Experiencia en compras e integración', 'Reporting en IFRS'],
      isFeatured: true,
      tags: ['M&A', 'Private Equity', 'C-Level']
    },
    {
      id: 'medical-director',
      title: 'Director Médico / Medical Affairs Director',
      department: 'Salud & Biotecnología',
      location: 'Barcelona / Madrid',
      modality: 'Híbrido',
      salaryRange: '105.000 € - 140.000 € + Coche de Empresa',
      experienceLevel: '+7 años en Pharma',
      description: 'Supervisión de ensayos clínicos fase III, enlace con comités éticos y relación con líderes de opinión.',
      requirements: ['Licenciatura en Medicina', 'Experiencia en oncología o inmunología', 'Inglés C2'],
      isFeatured: true,
      tags: ['Pharma', 'Medical Affairs', 'Biotech']
    }
  ];

  // 3-second autoplay for mobile carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPositions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, featuredPositions.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? featuredPositions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % featuredPositions.length);
  };

  const currentJob = featuredPositions[currentSlide];

  return (
    <section className={`py-14 sm:py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/70 text-slate-100' : 'bg-slate-100/70 text-slate-900'
    }`} id="posiciones-activas-resumen">
      
      {/* Ambient background glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Directiva UE 2023/970 — 100% Transparencia Salarial</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
              Posiciones Directivas &amp; Tech en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Selección Activa
              </span>
            </h2>
            
            <p className={`mt-2 text-xs sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Búsquedas ejecutivas con banda retributiva real, contratación indefinida y auditadas bajo estricto compliance laboral.
            </p>
          </div>

          {/* Desktop Quick Actions */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCVAnalyzer}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-cyan-700 border-slate-300 shadow-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Analizar mi CV con IA</span>
            </button>

            <button
              onClick={() => onNavigate('/vacantes')}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg flex items-center gap-2 group transition-all"
            >
              <span>Ver Catálogo Completo (8+ Ofertas)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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
              <span>Vacante {currentSlide + 1} de {featuredPositions.length}</span>
            </span>

            {/* Prev / Play-Pause / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Vacante anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center active:scale-95 transition-all"
                aria-label={isPlaying ? 'Pausar rotación' : 'Activar rotación automática'}
                title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Siguiente vacante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Positioned Vacancy Card */}
          <div
            key={currentJob.id}
            onClick={() => onNavigate('/vacantes')}
            className={`p-6 rounded-3xl border transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between min-h-[340px] ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-500/40 shadow-cyan-950/20'
                : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div>
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {currentJob.department}
                </span>

                <div className="flex items-center gap-2">
                  {currentJob.hot && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center gap-1 border border-amber-500/30">
                      <Flame className="w-3 h-3 text-amber-500" />
                      Urgente
                    </span>
                  )}
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                    theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {currentJob.modality}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold font-heading text-slate-900 dark:text-white mb-2">
                {currentJob.title}
              </h3>

              {/* Description */}
              <p className={`text-xs leading-relaxed mb-3 line-clamp-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {currentJob.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {currentJob.tags?.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      theme === 'dark' ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Details */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">
                    Banda Salarial Directiva UE
                  </span>
                  <span className="text-xs font-black text-emerald-500 flex items-center gap-1">
                    <Euro className="w-3.5 h-3.5" />
                    {currentJob.salaryRange}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-cyan-400">
                  <span>Ver y Postular</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator with 44px Touch Target */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {featuredPositions.map((_, idx) => (
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
                  aria-label={`Ir a la vacante ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Mobile Bottom Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('/vacantes')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Ver Catálogo Completo de Vacantes (8+ Ofertas)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onOpenCVAnalyzer}
              className="w-full py-2.5 bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analizar mi CV con IA</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            DESKTOP ONLY: 4-GRID DISPLAY CARDS
            ------------------------------------------------------------- */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {featuredPositions.map((job) => (
            <div
              key={job.id}
              onClick={() => onNavigate('/vacantes')}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-950/90 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-md'
              }`}
            >
              <div>
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {job.department}
                  </span>

                  <div className="flex items-center gap-2">
                    {job.hot && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center gap-1 border border-amber-500/30">
                        <Flame className="w-3 h-3 text-amber-500" />
                        Urgente
                      </span>
                    )}
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {job.modality}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading group-hover:text-cyan-500 transition-colors">
                  {job.title}
                </h3>

                {/* Description */}
                <p className={`mt-2.5 text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {job.tags?.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        theme === 'dark' ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Details */}
              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Banda Salarial Directiva UE
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    {job.salaryRange}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Ver Oferta y Postular</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner to Full Portal */}
        <div className={`mt-10 p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">¿Buscas una posición confidencial no publicada?</p>
              <p className="text-xs text-slate-400">El 60% de nuestros mandatos de C-Level se gestionan en régimen de Direct Search privado.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/vacantes')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-colors shrink-0"
          >
            Explorar Portal de Vacantes
          </button>
        </div>

      </div>
    </section>
  );
};
