import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Users, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

export const MetricStatsSection: React.FC = () => {
  const { theme } = useTheme();

  const metrics = [
    {
      value: '+1.000',
      label: 'VACANTES CUBIERTAS',
      detail: 'C-Level, Directivos y Tech',
      icon: Users,
      color: 'text-cyan-500',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-500'
    },
    {
      value: '18 Días',
      label: 'TIEMPO MEDIO DE TERNA',
      detail: 'Compromiso garantizado',
      icon: Clock,
      color: 'text-blue-500',
      gradient: 'from-cyan-400 via-[#00A9A3] to-blue-500'
    },
    {
      value: '98.4%',
      label: 'TASA DE RETENCIÓN',
      detail: 'Permanencia a 2 años',
      icon: TrendingUp,
      color: 'text-emerald-500',
      gradient: 'from-cyan-400 via-emerald-500 to-blue-500'
    },
    {
      value: '3 a 6 Meses',
      label: 'GARANTÍA CONTRACTUAL',
      detail: 'Reposición directa sin coste',
      icon: ShieldCheck,
      color: 'text-indigo-500',
      gradient: 'from-cyan-400 via-blue-500 to-purple-500'
    }
  ];

  return (
    <section className="py-8 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className={`glass-card p-5 sm:p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-black/30'
                    : 'shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${metric.color} shrink-0`} />
                  <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {metric.label}
                  </span>
                </div>
                
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${metric.gradient} my-1`}>
                  {metric.value}
                </div>

                <p className={`text-xs mt-2 font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
