import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, 
  Briefcase, 
  Crosshair, 
  TrendingUp, 
  Compass, 
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../lib/tracking';

interface AreasEspecializacionProps {
  onNavigate?: (path: PageRoute) => void;
}

export const AreasEspecializacionSection: React.FC<AreasEspecializacionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Las 6 áreas exactas con imágenes corporativas premium y encuadre garantizado
  const areas = [
    {
      id: 'seleccion-talento',
      title: 'Selección de Talento',
      subtitle: 'Reclutamiento Operativo y Mandos Medios',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Procesos Ágiles',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'object-[center_20%]',
      description: 'Atracción y filtrado por competencias para posiciones intermedias, técnicas y operativas con validación de idoneidad y referencias verificadas.',
      deliverables: ['Terna en 18 días hábiles', 'Entrevista por competencias STAR', 'Pruebas psicotécnicas aplicadas']
    },
    {
      id: 'executive-search',
      title: 'Executive Search',
      subtitle: 'C-Level & Directores Generales',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Máxima Confidencialidad',
      image: '/areas/executive-search.webp',
      imagePosition: 'object-center',
      description: 'Búsqueda directa y exclusiva de Presidentes, CEOs, CFOs y miembros del Comité de Dirección bajo estrictos acuerdos de confidencialidad.',
      deliverables: ['Mapeo ciego del mercado', 'Evaluación de liderazgo estratégico', 'Garantía contractual de 3 a 6 meses']
    },
    {
      id: 'headhunting',
      title: 'Headhunting',
      subtitle: 'Caza Directa de Talento en Activo',
      icon: Crosshair,
      color: 'from-[#00A9A3] to-teal-600',
      badge: 'Caza Quirúrgica',
      image: '/areas/headhunting.webp',
      imagePosition: 'object-center',
      description: 'Identificación y captación directa de perfiles no disponibles en portales de empleo, atrayendo a líderes consolidados en la competencia.',
      deliverables: ['Acceso a talento pasivo', 'Presentación confidencial', 'Alineación de compensación total']
    },
    {
      id: 'evaluacion-talento',
      title: 'Evaluación de Talento',
      subtitle: 'Assessment Centers & Fit Cultural',
      icon: TrendingUp,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Diagnóstico 360°',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'object-[center_20%]',
      description: 'Auditoría psicométrica, pruebas situacionales y evaluación profunda del potencial para promociones internas o comités de sucesión.',
      deliverables: ['Informes de potencial y gaps', 'Mapeo 9-Box de desempeño', 'Feedback individual al directivo']
    },
    {
      id: 'desarrollo-organizacional',
      title: 'Desarrollo Organizacional',
      subtitle: 'Estructura, Cultura y Retención',
      icon: Compass,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Escalabilidad Corporativa',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'object-[center_25%]',
      description: 'Diseño de organigramas ágiles, planes de compensación total y diagnóstico de clima laboral para maximizar el engagement del equipo directivo.',
      deliverables: ['Planes de incentivos a largo plazo', 'Matriz de competencias clave', 'Estrategia de retención del Top 5%']
    },
    {
      id: 'outplacement',
      title: 'Outplacement',
      subtitle: 'Transición de Carrera & Recolocación',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-600',
      badge: 'Acompañamiento Humano',
      image: '/areas/outplacement.webp',
      imagePosition: 'object-center',
      description: 'Programas de orientación profesional, optimización de marca personal y recolocación efectiva para ejecutivos desvinculados.',
      deliverables: ['Coaching de transición directiva', 'Optimización de CV y LinkedIn', 'Networking con comités y headhunters']
    }
  ];

  // Carrusel continuo: buffer de 3 sets para desplazamiento infinito sin retrocesos bruscos
  const extendedAreas = [...areas, ...areas, ...areas];

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const cards = container.children;
      if (cards.length >= areas.length * 2) {
        const target = cards[areas.length] as HTMLElement;
        if (target) {
          container.scrollLeft = target.offsetLeft;
        }
      }
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards.length < areas.length * 3) return;

    const firstMiddleCard = cards[areas.length] as HTMLElement;
    const firstThirdCard = cards[areas.length * 2] as HTMLElement;
    if (!firstMiddleCard || !firstThirdCard) return;

    const singleSetWidth = firstThirdCard.offsetLeft - firstMiddleCard.offsetLeft;

    // Reseteo silencioso en los extremos para scroll infinito perpetuo
    if (container.scrollLeft >= firstThirdCard.offsetLeft - 10) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= firstMiddleCard.offsetLeft - singleSetWidth + 10) {
      container.scrollLeft += singleSetWidth;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.children[0] as HTMLElement;
    const cardWidth = card ? card.getBoundingClientRect().width : 360;
    const gap = 24;
    const step = cardWidth + gap;

    container.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth'
    });
  };

  const handleConsult = (areaTitle: string) => {
    trackEvent({
      eventName: 'area_especializacion_click',
      category: 'Servicios',
      label: areaTitle
    });
    if (onNavigate) {
      onNavigate('/contacto');
    }
  };

  return (
    <section id="areas-especializacion" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00A9A3]/10 via-cyan-500/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase border backdrop-blur-md bg-[#00A9A3]/10 border-[#00A9A3]/30 text-[#00A9A3]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portafolio Oficial de Soluciones</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-balance font-heading">
              Áreas de <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500">Especialización</span>
            </h2>

            <p className={`text-xs sm:text-base font-medium leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Estructuramos nuestras prácticas en 6 divisiones estratégicas para atender tanto la atracción de perfiles clave como la optimización y transición del talento directivo.
            </p>
          </div>

          {/* Nav Buttons (Left / Right) - Siempre activos, continuo y sin saltos */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Anterior área de especialización"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-white/45 dark:bg-slate-900/55 border-white/70 dark:border-white/10 text-slate-800 dark:text-white hover:border-cyan-400 active:scale-95 shadow-lg backdrop-blur-xl cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Siguiente área de especialización"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-cyan-400/75 dark:bg-cyan-500/65 border-white/70 dark:border-cyan-300/30 text-slate-950 font-black hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/20 backdrop-blur-xl cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6 Areas Interactive Carousel - Exactamente 3 tarjetas completas en desktop */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {extendedAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <div
                key={`${area.id}-${index}`}
                onClick={() => handleConsult(area.title)}
                className={`snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-900/55 border-white/10 hover:border-cyan-500/50 shadow-xl shadow-black/40 backdrop-blur-xl'
                    : 'bg-white/55 border-white/70 hover:border-[#00A9A3]/60 shadow-lg hover:shadow-2xl backdrop-blur-xl'
                }`}
              >
                {/* Header Image with Floating Icon & Badge (Foto nítida sin degradado oscuro que tape los rostros) */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={area.image}
                    alt={area.title}
                    className={`w-full h-full object-cover ${area.imagePosition || 'object-[center_top]'} group-hover:scale-105 transition-transform duration-500`}
                    loading="lazy"
                  />
                  
                  {/* Floating Icon & Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${area.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-950/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                      {area.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body con Título y Subtítulo legibles (Fuera de la foto para no tapar los rostros) */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white mb-1 transition-colors group-hover:text-cyan-500">
                      {area.title}
                    </h3>
                    <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                      {area.subtitle}
                    </p>
                    <p className={`text-xs leading-relaxed font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {area.description}
                    </p>
                  </div>

                  {/* Deliverables Box */}
                  <div className={`p-3.5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <ul className="space-y-1.5">
                      {area.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer CTA */}
                  <div className={`pt-3 border-t flex items-center justify-between ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className="text-[11px] font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                      Consultar con Headhunter
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-[#00A9A3] group-hover:text-slate-950 transition-all duration-200">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
