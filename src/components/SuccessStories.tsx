import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Award, 
  Quote, 
  Clock, 
  TrendingUp, 
  Star, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageRoute } from '../types';

interface SuccessStoriesProps {
  onNavigateToTestimonials?: (path: PageRoute) => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onNavigateToTestimonials }) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredStories = [
    {
      id: 'case-1',
      sector: 'Fintech & Scaleup (Madrid)',
      role: 'Chief Technology Officer (CTO)',
      time: '14 Días',
      quote: 'Nexo Talento entendió exactamente el nivel de exigencia técnica y liderazgo que requeríamos para nuestra ronda Serie B. El nuevo CTO fue clave.',
      author: 'Ignacio M. de la Hoz',
      authorRole: 'CEO & Co-Fundador, Fintech Madrid'
    },
    {
      id: 'case-2',
      sector: 'Salud & Pharma (Barcelona)',
      role: 'Director Médico Corporativo',
      time: '17 Días',
      quote: 'La rigurosidad en la verificación de antecedentes y el trato discreto convirtieron a Nexo Talento en nuestro partner estratégico permanente.',
      author: 'Dra. Montserrat Valls',
      authorRole: 'Directora de Recursos Humanos, Grupo Sanitario'
    },
    {
      id: 'case-3',
      sector: 'Energía & M&A (Valencia)',
      role: 'Chief Financial Officer (CFO)',
      time: '19 Días',
      quote: 'El informe de competencias 360° que acompaña a cada candidato nos ahorró semanas de deliberación. Supieron captar el perfil a la primera.',
      author: 'Javier Aranzábal',
      authorRole: 'Presidente del Consejo de Administración'
    }
  ];

  // Auto rotation on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredStories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredStories.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredStories.length);
  };

  const currentMobileStory = featuredStories[currentSlide];

  return (
    <section id="testimonios-resumen" className={`py-14 sm:py-20 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-2.5 border ${
              theme === 'dark'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Resultados Auditados &amp; Satisfacción</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Casos de Éxito &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Testimonios Directivos</span>
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Conoce cómo hemos ayudado a empresas de Madrid, Barcelona y toda España a incorporar directivos de alto rendimiento.
            </p>
          </div>

          {/* Action button to dedicated full page */}
          {onNavigateToTestimonials && (
            <button
              onClick={() => onNavigateToTestimonials('/testimonios')}
              className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer btn-spring-press"
            >
              <span>Ver Todos los Casos de Éxito &amp; Métricas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* MOBILE ONLY: Interactive Testimonial Carousel */}
        <div className="block md:hidden mb-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-900'} flex items-center gap-1`}>
              <span>Testimonio {currentSlide + 1} de {featuredStories.length}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all shadow-sm"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            key={currentMobileStory.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 animate-fadeIn shadow-lg ${
              theme === 'dark'
                ? 'bg-slate-950/90 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  theme === 'dark'
                    ? 'text-cyan-300 bg-cyan-950 border-cyan-800'
                    : 'text-cyan-900 bg-cyan-50 border-cyan-300'
                }`}>
                  Terna: {currentMobileStory.time}
                </span>
              </div>

              <p className={`text-[11px] font-extrabold uppercase mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>{currentMobileStory.sector}</p>
              <h3 className="text-sm font-bold font-heading mb-3">{currentMobileStory.role}</h3>

              <p className={`text-xs italic leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                "{currentMobileStory.quote}"
              </p>
            </div>

            <div className={`pt-3 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className="text-xs font-bold">{currentMobileStory.author}</p>
              <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{currentMobileStory.authorRole}</p>
            </div>
          </div>

          {/* Dots Indicator with 44px touch target */}
          <div className="flex items-center justify-center gap-1 mt-1">
            {featuredStories.map((_, idx) => (
              <div key={idx} className="min-h-[44px] min-w-[44px] flex items-center justify-center">
                <button
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-amber-500' : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP ONLY: 3 Columns Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-6">
          {featuredStories.map((story) => (
            <div
              key={story.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                theme === 'dark'
                  ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                  : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    theme === 'dark'
                      ? 'text-cyan-300 bg-cyan-950 border-cyan-800'
                      : 'text-cyan-900 bg-cyan-50 border-cyan-300'
                  }`}>
                    {story.time}
                  </span>
                </div>

                <p className={`text-[11px] font-extrabold uppercase mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>{story.sector}</p>
                <h3 className="text-sm font-bold font-heading mb-3">{story.role}</h3>

                <p className={`text-xs italic leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{story.quote}"
                </p>
              </div>

              <div className={`pt-3 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <p className="text-xs font-bold">{story.author}</p>
                <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{story.authorRole}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
