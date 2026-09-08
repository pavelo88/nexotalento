import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Compass, 
  Search, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';

interface MethodologySectionProps {
  onNavigateToProcess?: (path: PageRoute) => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onNavigateToProcess }) => {
  const { theme } = useTheme();

  const previewSteps = [
    {
      number: '01',
      title: 'Inmersión & Perfil 360°',
      days: 'Días 1-3',
      icon: Compass,
      desc: 'Briefing estratégico con el Comité de Selección, matriz de competencias y empresas target.'
    },
    {
      number: '02',
      title: 'Caza Directa & IA',
      days: 'Días 4-8',
      icon: Search,
      desc: 'Headhunting confidencial sobre profesionales en activo con evaluación exhaustiva.'
    },
    {
      number: '03',
      title: 'Entrevistas STAR',
      days: 'Días 9-14',
      icon: UserCheck,
      desc: 'Evaluación técnica, análisis de liderazgo y verificación de referencias ejecutivas.'
    },
    {
      number: '04',
      title: 'Terna & Cierre',
      days: 'Días 15-18',
      icon: Clock,
      desc: 'Presentación de 3-5 finalistas en dossier comparativo y mediación en la oferta.'
    }
  ];

  return (
    <section id="metodologia-resumen" className={`py-14 sm:py-16 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Direct Full Page Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 mb-2.5">
              <Clock className="w-3.5 h-3.5" />
              <span>El Método Nexo Talentos (18 Días SLA)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Metodología de Selección <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Ágil &amp; Predictiva</span>
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              5 fases estructuradas para reducir el Time-to-Hire sin comprometer el ajuste cultural ni el encaje con la dirección.
            </p>
          </div>

          {onNavigateToProcess && (
            <button
              onClick={() => onNavigateToProcess('/proceso')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer btn-spring-press"
            >
              <span>Ver Metodología Completa &amp; Fases</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* 4-Step Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {previewSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                    : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-heading">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700">
                      {step.days}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-2.5">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold font-heading mb-1">{step.title}</h3>
                  <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Guarantee */}
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
