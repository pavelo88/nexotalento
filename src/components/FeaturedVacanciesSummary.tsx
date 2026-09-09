import React from 'react';
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
  Send
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FeaturedVacanciesSummaryProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer?: () => void;
}

export const FeaturedVacanciesSummary: React.FC<FeaturedVacanciesSummaryProps> = ({
  onNavigate,
  onOpenCVAnalyzer
}) => {
  const { theme } = useTheme();

  const vacancies = [
    {
      id: 'cto-scaleup',
      title: 'Chief Technology Officer (CTO)',
      department: 'Tecnología & Cloud',
      location: 'Madrid (Híbrido 2d)',
      modality: 'Híbrido',
      salary: '110.000 € - 145.000 € + Stock Options',
      tags: ['C-Level', 'Fintech', 'AWS'],
      hot: true
    },
    {
      id: 'head-ai',
      title: 'Head of Artificial Intelligence & Data',
      department: 'Data & IA',
      location: 'Barcelona / Remoto España',
      modality: '100% Remoto',
      salary: '95.000 € - 125.000 €',
      tags: ['IA Generativa', 'Pharma', 'Remoto'],
      hot: false
    },
    {
      id: 'cfo-private-equity',
      title: 'Director Financiero (CFO) — Private Equity',
      department: 'Finanzas & M&A',
      location: 'Madrid (Castellana)',
      modality: 'Presencial',
      salary: '100.000 € - 130.000 € + 30% Bonus',
      tags: ['M&A', 'Private Equity', 'C-Level'],
      hot: true
    },
    {
      id: 'medical-director',
      title: 'Director Médico / Medical Affairs Director',
      department: 'Salud & Biotecnología',
      location: 'Barcelona / Madrid',
      modality: 'Híbrido',
      salary: '105.000 € - 140.000 € + Coche',
      tags: ['Pharma', 'Medical Affairs', 'Biotech'],
      hot: false
    },
    {
      id: 'vp-engineering',
      title: 'VP of Engineering / Software Director',
      department: 'Ingeniería SaaS',
      location: '100% Remoto (España / UE)',
      modality: '100% Remoto',
      salary: '120.000 € - 150.000 € + Equity',
      tags: ['Engineering', 'Scaleup', 'Remoto'],
      hot: true
    },
    {
      id: 'coo-operations',
      title: 'Chief Operating Officer (COO)',
      department: 'Operaciones & Logística',
      location: 'Madrid / Barcelona',
      modality: 'Híbrido',
      salary: '90.000 € - 120.000 €',
      tags: ['Operaciones', 'Supply Chain', 'C-Level'],
      hot: false
    },
    {
      id: 'cloud-security-lead',
      title: 'Lead Cloud Security & CISO Associate',
      department: 'Ciberseguridad & Cloud',
      location: 'Madrid / Remoto',
      modality: 'Híbrido',
      salary: '85.000 € - 115.000 €',
      tags: ['Ciberseguridad', 'AWS/Azure', 'CISO'],
      hot: false
    },
    {
      id: 'latam-tech-lead',
      title: 'Senior Nearshore Tech Lead (LATAM)',
      department: 'Hub Nearshore B2B',
      location: 'Remoto LATAM (Horario ES)',
      modality: '100% Remoto',
      salary: '36.000 € - 45.000 € / año B2B',
      tags: ['Nearshore', 'Fullstack', 'Top 1.8%'],
      hot: true
    }
  ];

  // Selección curada de vacantes insignia duplicada al 50% para ciclo infinito fluido con DOM reducido
  const marqueeItems = [...vacancies.slice(0, 5), ...vacancies.slice(0, 5)];

  return (
    <section id="vacantes-resumen" className="py-16 sm:py-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        
        {/* Header con llamada directa al catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm mb-3 bg-cyan-950/40 border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Directiva UE 2023/970 — 100% Transparencia Salarial</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Posiciones Directivas &amp; Tech en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Selección Activa</span>
            </h2>

            <p className={`mt-2 text-xs sm:text-sm ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Búsquedas ejecutivas con banda retributiva pública, contratos indefinidos y confidencialidad blindada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenCVAnalyzer && (
              <button
                type="button"
                onClick={onOpenCVAnalyzer}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-105 cursor-pointer"
            >
              <span>Ver Catálogo Completo (8+ Ofertas)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= CARRUSEL INFINITO DE VACANTES ================= */}
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

        {/* Tira animada que se desplaza continuamente y se pausa al hover */}
        <div 
          className="animate-infinite-carousel flex items-stretch gap-5 px-4 carousel-duration-45s"
        >
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
                {/* Badges de departamento y modalidad */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {job.department}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {job.hot && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        <Flame className="w-3 h-3 text-amber-400" />
                        Urgente
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium bg-slate-800/80 px-2 py-0.5 rounded">
                      {job.modality}
                    </span>
                  </div>
                </div>

                {/* Título del puesto */}
                <h3 className="text-base font-bold text-white font-heading leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {job.title}
                </h3>

                {/* Ubicación */}
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{job.location}</span>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[9px] font-semibold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Banda salarial y botón de explorar */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                    Banda Salarial Directiva UE
                  </span>
                  <span className="text-xs font-black text-emerald-400 font-heading">
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

    </section>
  );
};
