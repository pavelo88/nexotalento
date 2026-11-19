import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Building2, CheckCircle2 } from 'lucide-react';

export const BragBar: React.FC = () => {
  const { theme } = useTheme();

  const trustedCompanies = [
    { name: 'Baterías Ecuador', sector: 'Industria & Automotriz', logoFile: '/logos/baterias_ecuador.webp' },
    { name: 'Takoo', sector: 'Tecnología & E-commerce', logoFile: '/logos/takoo.webp' },
    { name: 'AI Tecnologist', sector: 'Inteligencia Artificial & Tech', logoFile: '/logos/aitecnologist.webp' },
    { name: 'Fast Line', sector: 'Logística & Transporte', logoFile: '/logos/fast_line.webp' },
    { name: 'Assis', sector: 'Asistencia & Servicios', logoFile: '/logos/assis.webp' },
    { name: 'UpConta', sector: 'Fintech & Contabilidad', logoFile: '/logos/upconta.webp' },
    { name: 'Vita Alimentos', sector: 'Consumo Masivo & Lácteos', logoFile: '/logos/vita.webp' },
    { name: 'EBF Cargo', sector: 'Logística & Carga Internacional', logoFile: '/logos/ebf_cargo.webp' },
    { name: 'Global Ecuador', sector: 'Comercio Exterior & Logística', logoFile: '/logos/global_ecudor.webp' },
    { name: 'Gravity', sector: 'Innovación & Software', logoFile: '/logos/gravity.webp' },
    { name: 'Intellcard', sector: 'Tecnología & Pagos Digitales', logoFile: '/logos/intellcard.webp' },
    { name: 'Limon Flowers', sector: 'Agroindustria & Exportación', logoFile: '/logos/limon.webp' }
  ];

  return (
    <section className={`py-6 sm:py-8 border-y relative transition-colors duration-300 overflow-hidden ${
      theme === 'dark'
        ? 'bg-slate-950/90 border-slate-800/90 text-slate-100'
        : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Corporate Trust Title & Compliance Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-500" />
            <span className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
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

      {/* Infinite Seamless Moving Band (Fondo blanco estricto tanto en claro como oscuro) */}
      <div className="relative w-full overflow-hidden py-3 bg-white border-y border-slate-200 shadow-xs">
        {/* Left & Right gradient fades to white */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        {/* Animated Marquee Strip (Slow Pace) */}
        <div className="animate-infinite-carousel flex items-center gap-8 sm:gap-12 py-2 opacity-95 hover:opacity-100 transition-opacity duration-700 carousel-duration-60s">
          {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
            <div
              key={index}
              className="shrink-0 flex items-center justify-center px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105 select-none min-w-[120px]"
              title={`${company.name} · ${company.sector}`}
            >
              <img
                src={company.logoFile}
                alt={company.name}
                className="h-7 sm:h-8 w-auto max-w-[140px] object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).classList.add('hidden');
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};