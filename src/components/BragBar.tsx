import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Building2,
  Clock,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react';

export const BragBar: React.FC = () => {
  const { theme } = useTheme();

  const metrics = [
    {
      value: '+1.000',
      label: 'Vacantes Cubiertas',
      detail: 'C-Level, Directivos y Tech',
      icon: Users,
      color: 'text-cyan-500'
    },
    {
      value: '18 Días',
      label: 'Tiempo Medio de Terna',
      detail: 'Compromiso garantizado',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      value: '98.4%',
      label: 'Tasa de Retención',
      detail: 'Permanencia a 2 años',
      icon: TrendingUp,
      color: 'text-emerald-500'
    },
    {
      value: '3 a 6 Meses',
      label: 'Garantía Contractual',
      detail: 'Reposición directa sin coste',
      icon: ShieldCheck,
      color: 'text-indigo-500'
    }
  ];

  const trustedCompanies = [
    { name: 'Corporación Favorita', sector: 'Retail & Supermercados', logoFile: '/logos/corporacion-favorita.png' },
    { name: 'Banco Pichincha', sector: 'Banca & Finanzas', logoFile: '/logos/banco-pichincha.svg' },
    { name: 'SLB Schlumberger', sector: 'Energía & Petróleo', logoFile: '/logos/schlumberger.svg' },
    { name: 'Pronaca', sector: 'Agroindustria & Alimentos', logoFile: '/logos/pronaca.svg' },
    { name: 'Nestlé', sector: 'Consumo Masivo & FMCG', logoFile: '/logos/nestle.svg' },
    { name: 'Caterpillar', sector: 'Maquinaria & Minería', logoFile: '/logos/caterpillar.svg' },
    { name: 'Claro', sector: 'Telecomunicaciones & Tech', logoFile: '/logos/claro.svg' },
    { name: 'Movistar', sector: 'Telecomunicaciones & Datos', logoFile: '/logos/movistar.svg' },
    { name: 'Danone', sector: 'Alimentos & Nutrición', logoFile: '/logos/danone.svg' },
    { name: 'La Fabril', sector: 'Industria & Oleaginosas', logoFile: '/logos/la-fabril.svg' },
    { name: 'Grupo Difare', sector: 'Farmacéutica & Salud', logoFile: '/logos/grupo-difare.svg' },
    { name: 'Baterías Ecuador', sector: 'Industria & Automotriz', logoFile: '/logos/baterias-ecuador.png' },
    { name: 'EBF CARGO', sector: 'Logística & Carga Internacional', logoFile: '/logos/ebf-cargo.png' },
    { name: 'Takoo', sector: 'Tecnología & E-commerce', logoFile: '/logos/takoo.png' },
    { name: 'Vita Alimentos', sector: 'Consumo Masivo & Lácteos', logoFile: '/logos/vita-alimentos.png' },
    { name: 'Limon Flowers', sector: 'Agroindustria & Exportación', logoFile: '/logos/limon-flowers.png' }
  ];

  return (
    <section className={`py-8 sm:py-12 border-y relative transition-colors duration-300 overflow-hidden ${theme === 'dark'
        ? 'bg-slate-950/90 border-slate-800/90 text-slate-100'
        : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Metric Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex flex-col items-center sm:items-start text-center sm:text-left ${theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40'
                    : 'bg-slate-50 border-slate-200 hover:border-cyan-500/50 shadow-sm'
                  }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className={`text-[11px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                    {metric.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                  {metric.value}
                </div>
                <p className={`text-[11px] sm:text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Title & Compliance Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-500" />
            <span className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
              Empresas con las que hemos trabajado · Confían en Nexo Talento
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Blindaje Legal Art. 43 ET &amp; Compliance 2026</span>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Moving Band (Marquee towards Left) */}
      <div className="relative w-full overflow-hidden py-2 mask-radial-edges">
        {/* Left & Right gradient fades for luxury look */}
        <div className={`absolute top-0 left-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none ${theme === 'dark'
            ? 'bg-gradient-to-r from-slate-950 to-transparent'
            : 'bg-gradient-to-r from-white to-transparent'
          }`} />
        <div className={`absolute top-0 right-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none ${theme === 'dark'
            ? 'bg-gradient-to-l from-slate-950 to-transparent'
            : 'bg-gradient-to-l from-white to-transparent'
          }`} />

        {/* Animated Marquee Strip (Luxury Slow Pace) */}
        <div className="animate-infinite-carousel flex items-center gap-10 sm:gap-14 py-4 opacity-90 hover:opacity-100 transition-opacity duration-700 carousel-duration-60s">
          {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
            <div
              key={index}
              className={`shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 hover:scale-105 select-none ${
                theme === 'dark' 
                  ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400 shadow-md' 
                  : 'bg-white border-slate-200 text-slate-800 hover:text-slate-950 hover:border-cyan-500 shadow-sm'
              }`}
            >
              <img
                src={company.logoFile}
                alt={company.name}
                className="h-7 sm:h-8 max-w-[130px] object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-heading font-black tracking-tight uppercase">
                  {company.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wide uppercase text-cyan-600 dark:text-cyan-400">
                  {company.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};