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
    { name: 'Banco Santander', sector: 'Banca & Fintech', initial: 'SAN' },
    { name: 'Telefónica Tech', sector: 'Telecom & Cloud', initial: 'TEL' },
    { name: 'Repsol Digital', sector: 'Energía & Sostenibilidad', initial: 'REP' },
    { name: 'Indra / Minsait', sector: 'Defensa & IT', initial: 'IND' },
    { name: 'Glovo / Delivery Hero', sector: 'Tech & Scaleup', initial: 'GLO' },
    { name: 'Cabify Enterprise', sector: 'Movilidad & App', initial: 'CAB' },
    { name: 'Sanitas / Bupa', sector: 'Salud & Pharma', initial: 'SAN' },
    { name: 'BBVA Spark', sector: 'Banca Corporativa', initial: 'BBV' },
    { name: 'Acciona Infraestructuras', sector: 'Energía & Sostenible', initial: 'ACC' },
    { name: 'Amadeus IT Group', sector: 'Travel & Tech', initial: 'AMA' },
    { name: 'Grifols Biotecnología', sector: 'Pharma & Biotech', initial: 'GRI' },
    { name: 'Iberdrola Renovables', sector: 'Energía Verde', initial: 'IBE' }
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
                  {/* CORRECCIÓN: text-slate-500 cambiado a text-slate-600 para pasar accesibilidad */}
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
              Confían en la Externalización &amp; Headhunting de Nexo Talento
            </span>
          </div>
          {/* CORRECCIÓN: text-emerald-600 cambiado a text-emerald-700 para pasar accesibilidad */}
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
        <div className="animate-infinite-carousel flex items-center gap-12 sm:gap-20 py-4 opacity-80 hover:opacity-100 transition-opacity duration-700 carousel-duration-60s">
          {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
            <div
              key={index}
              className={`shrink-0 flex items-center gap-4 transition-all duration-500 hover:scale-105 select-none grayscale hover:grayscale-0 ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              <div className="text-xl sm:text-2xl font-heading font-black tracking-tighter uppercase opacity-80">
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};