import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Compass, 
  Search, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { PageRoute } from '../types';

interface MethodologySectionProps {
  onNavigateToProcess?: (path: PageRoute) => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onNavigateToProcess }) => {
  const { theme } = useTheme();

  const methodologySteps = [
    {
      number: '01',
      tag: 'Estrategia 360°',
      title: 'Inmersión & Perfil 360°',
      days: 'Días 1-3',
      icon: Compass,
      desc: 'Briefing estratégico con el Comité de Selección, matriz de competencias y empresas target.'
    },
    {
      number: '02',
      tag: 'Headhunting Activo',
      title: 'Caza Directa & IA',
      days: 'Días 4-8',
      icon: Search,
      desc: 'Headhunting confidencial sobre profesionales en activo con evaluación exhaustiva.'
    },
    {
      number: '03',
      tag: 'Assessment Científico',
      title: 'Entrevistas STAR',
      days: 'Días 9-14',
      icon: UserCheck,
      desc: 'Evaluación técnica, análisis de liderazgo y verificación de referencias ejecutivas.'
    },
    {
      number: '04',
      tag: 'Terna Finalista',
      title: 'Terna & Cierre',
      days: 'Días 15-18',
      icon: Clock,
      desc: 'Presentación de 3-5 finalistas en dossier comparativo y mediación en la oferta.'
    },
    {
      number: '05',
      tag: 'Garantía & Éxito',
      title: 'Negociación & Garantía',
      days: 'Día 19+',
      icon: ShieldCheck,
      desc: 'Cierre contractual, plan de aterrizaje y garantía de reposición de 3 a 6 meses.'
    }
  ];

  // Duplicado para carrusel infinito fluido idéntico a vacantes
  const marqueeSteps = [...methodologySteps, ...methodologySteps];

  return (
    <section id="metodologia-resumen" className="py-16 sm:py-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm mb-3 bg-cyan-950/40 border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>El Método Nexo Talento (18 Días SLA)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Metodología de Selección <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ágil &amp; Predictiva</span>
            </h2>

            <p className={`mt-2 text-xs sm:text-sm ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              5 fases estructuradas para reducir el Time-to-Hire sin comprometer el ajuste cultural ni el encaje con la dirección.
            </p>
          </div>

          {onNavigateToProcess && (
            <button
              type="button"
              onClick={() => onNavigateToProcess('/proceso')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Ver Metodología Completa &amp; Fases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* ================= CARRUSEL INFINITO DE FASES (ESTILO VACANTES) ================= */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Fades laterales */}
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

        {/* Tira animada */}
        <div className="animate-infinite-carousel flex items-stretch gap-5 px-4 carousel-duration-45s">
          {marqueeSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={`${step.number}-${idx}`}
                onClick={() => onNavigateToProcess && onNavigateToProcess('/proceso')}
                className={`w-[310px] sm:w-[350px] shrink-0 p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] cursor-pointer relative group select-none ${
                  theme === 'dark'
                    ? 'bg-slate-900/85 border-slate-800 hover:border-cyan-500/60 shadow-xl shadow-black/40 hover:bg-slate-900'
                    : 'bg-white border-slate-200 hover:border-cyan-500/60 shadow-md hover:shadow-xl hover:bg-cyan-50/10'
                }`}
              >
                <div>
                  {/* Badges superiores iguales a las tarjetas de vacantes */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {step.tag}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      theme === 'dark' ? 'text-slate-400 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
                    }`}>
                      {step.days}
                    </span>
                  </div>

                  {/* Icono y Título */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-heading">
                      Fase {step.number}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold font-heading leading-snug transition-colors line-clamp-2 ${
                    theme === 'dark' 
                      ? 'text-white group-hover:text-cyan-400' 
                      : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mt-2.5 line-clamp-3 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {step.desc}
                  </p>
                </div>

                {/* Footer inferior idéntico al botón de acción de las vacantes */}
                <div className={`mt-5 pt-3 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Ver protocolo completo
                  </span>

                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Banner with Guarantee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 text-left">
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
            <p className="text-xs sm:text-sm">
              <strong>Garantía Contractual de 3 a 6 Meses:</strong> Reposición directa sin coste en caso de desajuste o salida no prevista del candidato.
            </p>
          </div>

          {onNavigateToProcess && (
            <button
              type="button"
              onClick={() => onNavigateToProcess('/proceso')}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Explorar Protocolos de Garantía</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </section>
  );
};