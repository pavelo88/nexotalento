import React, { useState } from 'react';
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
  LayoutGrid,
  Layers
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
  const [activeTab, setActiveTab] = useState<'grid' | 'carousel'>('grid');

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

  const marqueeItems = [...vacancies, ...vacancies];

  return (
    <section id="vacantes-resumen" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background Subtle Mesh Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-[#00A9A3]/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        
        {/* Header con estética SaaS de Alto Impacto (Ontop + Freelancer) */}
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

          {/* Selector de visualización y llamada a la acción */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* View Switcher Toggle */}
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'grid'
                    ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cuadrícula</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('carousel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'carousel'
                    ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Carrusel</span>
              </button>
            </div>

            {onOpenCVAnalyzer && (
              <button
                type="button"
                onClick={onOpenCVAnalyzer}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                }`}
              >
                Auditar mi CV
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('/vacantes')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600 hover:opacity-95 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-105 cursor-pointer active:scale-95"
            >
              <span>Portal de Empleo (4 Vacantes)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= 1. VISTA EN CUADRÍCULA ESTÁTICA (ONTOP + FREELANCER STYLE) ================= */}
      {activeTab === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vacancies.map((job) => (
              <div
                key={job.id}
                onClick={() => onNavigate('/vacantes')}
                className={`group relative rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/60 shadow-xl shadow-black/40'
                    : 'bg-white hover:bg-cyan-50/20 border-slate-200 hover:border-cyan-500/60 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Glow bar superior ontop style */}
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

                  {/* Requirement mini brief */}
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
        </div>
      )}

      {/* ================= 2. VISTA EN CARRUSEL INFINITO ALTERNATIVO ================= */}
      {activeTab === 'carousel' && (
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Fades laterales para efecto boutique sin cortes bruscos */}
          <div className={`absolute top-0 left-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent'
              : 'bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent'
          }`} />
          <div className={`absolute top-0 right-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent'
              : 'bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent'
          }`} />

          <div className="animate-infinite-carousel flex items-stretch gap-5 px-4 carousel-duration-45s">
            {marqueeItems.map((job, idx) => (
              <div
                key={`${job.id}-${idx}`}
                onClick={() => onNavigate('/vacantes')}
                className={`w-[310px] sm:w-[350px] shrink-0 p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] cursor-pointer relative group select-none ${
                  theme === 'dark'
                    ? 'bg-slate-900/85 border-slate-800 hover:border-cyan-500/60 shadow-xl shadow-black/40 hover:bg-slate-900'
                    : 'bg-white border-slate-200 hover:border-cyan-500/60 shadow-md hover:shadow-xl hover:bg-cyan-50/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <Flame className="w-3 h-3 text-amber-400" />
                      Urgente
                    </span>
                  </div>

                  <h3 className={`text-base font-bold font-heading leading-snug transition-colors line-clamp-2 ${
                    theme === 'dark' 
                      ? 'text-white group-hover:text-cyan-400' 
                      : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>
                    {job.title}
                  </h3>

                  <p className={`text-xs flex items-center gap-1 mt-2 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>{job.location}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.tags.map((tag, tIdx) => (
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

                <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                      Banda Salarial Oficial
                    </span>
                    <span className={`text-xs font-black font-heading ${
                      theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {job.salary}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};