import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Flame, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface FeaturedVacanciesSummaryProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer?: () => void;
}

export const FeaturedVacanciesSummary: React.FC<FeaturedVacanciesSummaryProps> = ({
  onNavigate,
  onOpenCVAnalyzer
}) => {
  const { theme } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  const vacancies = [
    {
      id: 'job-jefe-marketing',
      title: 'Jefe de Marketing',
      department: 'Marketing & Comercial',
      location: 'Quito, Ecuador',
      modality: 'Presencial',
      salary: 'USD 1.500 – 2.000',
      experience: 'Liderazgo en marketing digital y posicionamiento',
      tags: ['Marketing Digital', 'Estrategia', 'SEO/SEM', 'Leads'],
      hot: true
    },
    {
      id: 'job-asistente-contable',
      title: 'Asistente Contable',
      department: 'Finanzas & Contabilidad',
      location: 'Valle de los Chillos, Quito',
      modality: 'Presencial',
      salary: 'USD 600 – 700',
      experience: 'Mínimo 3 años en procesos contables',
      tags: ['Contabilidad', 'Conciliaciones', 'Retenciones', 'Impuestos'],
      hot: true
    },
    {
      id: 'job-asesor-nuevos-negocios',
      title: 'Asesor de Nuevos Negocios (Sector carga internacional)',
      department: 'Logística & Comercio Exterior',
      location: 'Quito, Ecuador',
      modality: 'Presencial',
      salary: 'A convenir (experiencia y cartera)',
      experience: 'Mínimo 4 años en freight forwarding',
      tags: ['Carga Internacional', 'Freight Forwarding', 'Cartera Activa', 'B2B'],
      hot: true
    },
    {
      id: 'job-asesor-comercial-corporativo',
      title: 'Asesor Comercial Corporativo',
      department: 'Ventas Corporativas & Tech',
      location: 'Guayaquil, Ecuador',
      modality: 'Presencial',
      salary: 'A convenir + Comisiones',
      experience: 'Cartera corporativa en sector tecnológico',
      tags: ['Ventas B2B', 'Sector Tecnológico', 'Cartera Corporativa', 'Comisiones'],
      hot: true
    }
  ];

  const [vacanciesList, setVacanciesList] = useState(vacancies);

  useEffect(() => {
    let active = true;
    fetch('/api/vacancies')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setVacanciesList(data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Buffer de 3 sets para desplazamiento infinito y fluido sin salto brusco hacia atrás
  const extendedVacancies = [...vacanciesList, ...vacanciesList, ...vacanciesList];

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const cards = container.children;
      if (cards.length >= vacanciesList.length * 2) {
        const target = cards[vacanciesList.length] as HTMLElement;
        if (target) {
          container.scrollLeft = target.offsetLeft;
        }
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [vacanciesList]);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards.length < vacanciesList.length * 3) return;

    const firstMiddleCard = cards[vacanciesList.length] as HTMLElement;
    const firstThirdCard = cards[vacanciesList.length * 2] as HTMLElement;
    if (!firstMiddleCard || !firstThirdCard) return;

    const singleSetWidth = firstThirdCard.offsetLeft - firstMiddleCard.offsetLeft;

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

  return (
    <section id="vacantes-resumen" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background Subtle Mesh Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-[#00A9A3]/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        
        {/* Header con estética SaaS de Alto Impacto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm mb-3.5 text-xs font-bold ${
              theme === 'dark' 
                ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300' 
                : 'bg-cyan-50 border-cyan-300 text-cyan-900'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>4 Procesos Oficiales de Selección Abiertos</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
              Vacantes en Selección{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500">
                Inmediata
              </span>
            </h2>

            <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Procesos activos para empresas líderes en Quito y Guayaquil. Bandas salariales transparentes, contratación directa y gestión de terna ejecutiva.
            </p>
          </div>

          {/* Carousel Navigation Buttons & Actions (Always Active, Continuous Loop) */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Anterior vacante"
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white hover:border-cyan-400 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Siguiente vacante"
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-black hover:opacity-90 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= CARRUSEL INTERACTIVO DE VACANTES (3 Tarjetas Exactas en Desktop) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {extendedVacancies.map((job, idx) => (
            <div
              key={`${job.id}-${idx}`}
              onClick={() => onNavigate('/vacantes')}
              className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group relative rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/60 shadow-xl shadow-black/40'
                  : 'bg-white hover:bg-cyan-50/20 border-slate-200 hover:border-cyan-500/60 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Glow bar superior */}
              <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {job.department}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Flame className="w-3 h-3 text-amber-400" />
                    Activo
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold font-heading leading-snug mb-2 transition-colors ${
                  theme === 'dark' 
                    ? 'text-white group-hover:text-cyan-400' 
                    : 'text-slate-900 group-hover:text-cyan-600'
                }`}>
                  {job.title}
                </h3>

                {/* Location & Modality */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-slate-300">{job.modality}</span>
                </div>

                {/* Requirement brief */}
                <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {job.experience}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {job.tags.slice(0, 3).map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border ${
                        theme === 'dark' 
                          ? 'text-slate-400 bg-slate-800/60 border-slate-700/50' 
                          : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Strip: Salary & Apply Action */}
              <div className={`pt-4 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                    Banda Salarial
                  </span>
                  <span className={`text-xs font-extrabold font-heading ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {job.salary}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-200">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Botón Ver todas las opciones disponibles */}
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('/vacantes')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Ver todas las opciones disponibles (4 activas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </section>
  );
};