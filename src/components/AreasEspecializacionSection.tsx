import React, { useRef, useState } from 'react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Las 6 áreas exactas de la Imagen 3 del cliente con imágenes corporativas premium
  const areas = [
    {
      id: 'seleccion-talento',
      title: 'Selección de Talento',
      subtitle: 'Reclutamiento Operativo y Mandos Medios',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Procesos Ágiles',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      description: 'Programas de orientación profesional, optimización de marca personal y recolocación efectiva para ejecutivos desvinculados.',
      deliverables: ['Coaching de transición directiva', 'Optimización de CV y LinkedIn', 'Networking con comités y headhunters']
    }
  ];

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 380;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading">
              Áreas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500">Especialización</span>
            </h2>

            <p className={`text-xs sm:text-base font-medium leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Estructuramos nuestras prácticas en 6 divisiones estratégicas para atender tanto la atracción de perfiles clave como la optimización y transición del talento directivo.
            </p>
          </div>

          {/* Nav Buttons (Left / Right) */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior área"
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-slate-900 border-slate-700 text-white hover:border-cyan-400 active:scale-95 shadow-md cursor-pointer'
                  : 'bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Siguiente área"
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-black hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/20 cursor-pointer'
                  : 'bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6 Areas Interactive Carousel */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory px-4 sm:px-6 lg:px-8"
        >
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                onClick={() => handleConsult(area.title)}
                className={`snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[370px] group relative rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 shadow-xl shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-[#00A9A3]/60 shadow-lg hover:shadow-2xl'
                }`}
              >
                {/* Header Image with Gradient Overlay & Headroom Focus */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Floating Icon & Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${area.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {area.badge}
                    </span>
                  </div>

                  {/* Title overlaying base of image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-black font-heading text-white drop-shadow-md">
                      {area.title}
                    </h3>
                    <p className="text-xs font-bold text-cyan-400">
                      {area.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className={`text-xs leading-relaxed font-medium ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {area.description}
                  </p>

                  {/* Deliverables Box */}
                  <div className={`p-3 rounded-2xl border ${
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
