import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Euro, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  FileText
} from 'lucide-react';

interface BlogTeaserSectionProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

export const BlogTeaserSection: React.FC<BlogTeaserSectionProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const featuredArticles = [
    {
      id: 'tratado-integral-2026',
      badge: '★ Tratado Principal',
      title: 'Tratado Integral 2026: Gestión del Talento, Art. 43 ET y Sanciones LISOS',
      subtitle: 'Prevención estricta de cesión ilegal de trabajadores, diferencias salariales y blindaje de contratas.',
      readTime: '12 min',
      category: 'Legal & Compliance'
    },
    {
      id: 'guia-compensacion-2026',
      badge: 'Guía Salarial',
      title: 'Compensación Directiva & Tech 2026: Directiva UE 2023/970 y Art. 42 LIRPF',
      subtitle: 'Bandas salariales para C-Level y optimización fiscal de Ticket Restaurant, Guardería y Seguro Médico.',
      readTime: '9 min',
      category: 'Total Rewards'
    },
    {
      id: 'ia-act-rrhh-2026',
      badge: 'Normativa Europea',
      title: 'Reglamento Europeo de IA (EU AI Act): Impacto en Selección de Personal',
      subtitle: 'Clasificación de Alto Riesgo (Anexo III), supervisión humana y multas de hasta 35M€.',
      readTime: '8 min',
      category: 'LegalTech & IA'
    }
  ];

  // 3-second autoplay for mobile carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, featuredArticles.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? featuredArticles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const currentArticle = featuredArticles[currentSlide];

  return (
    <section className={`py-14 sm:py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`} id="blog-insights-resumen">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-cyan-500/15 text-cyan-900 dark:text-cyan-300 border border-cyan-500/30 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span>Observatorio Jurídico &amp; Retributivo</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
              Tratado de Talento, Legal &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Compensación 2026
              </span>
            </h2>
            
            <p className={`mt-2 text-xs sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Compendio editorial de referencia para Consejos de Administración, Directores de Personas y CFOs en España.
            </p>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenAIAgent('advisor')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-cyan-700 border-slate-300 shadow-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Consultar Asesor Legal IA</span>
            </button>

            <button
              onClick={() => onNavigate('/blog')}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg flex items-center gap-2 group transition-all"
            >
              <span>Explorar Todo el Blog &amp; Tratado</span>
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
              <span>Artículo {currentSlide + 1} de {featuredArticles.length}</span>
            </span>

            {/* Prev / Play-Pause / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Artículo anterior"
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
                aria-label="Siguiente artículo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Positioned Article Card */}
          <div
            key={currentArticle.id}
            onClick={() => onNavigate('/blog')}
            className={`p-6 rounded-3xl border transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between min-h-[300px] ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-500/40 shadow-cyan-950/20'
                : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {currentArticle.badge}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentArticle.readTime}
                </span>
              </div>

              <h3 className="text-base font-extrabold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                {currentArticle.title}
              </h3>

              <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {currentArticle.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-400 text-[11px]">{currentArticle.category}</span>
              <span className="font-bold text-cyan-400 flex items-center gap-1">
                Leer artículo completo <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Dots Indicator with 44px Touch Target */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {featuredArticles.map((_, idx) => (
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
                  aria-label={`Ir al artículo ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Mobile Bottom Action Button */}
          <div className="mt-4">
            <button
              onClick={() => onNavigate('/blog')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Explorar Revista &amp; Tratado Legal 2026</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            DESKTOP ONLY: 3 SUMMARY CARDS
            ------------------------------------------------------------- */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('/blog')}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-950/90 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90'
                  : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {article.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-heading group-hover:text-cyan-500 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className={`mt-2.5 text-xs leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {article.subtitle}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">{article.category}</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Leer análisis <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
