import React, { useState } from 'react';
import { SalaryData, PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  Layers, 
  Bot,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface SalaryGuideSectionProps {
  onOpenSalaryAgent: () => void;
  onNavigateToSalaryGuide?: (path: PageRoute) => void;
}

const SALARY_BENCHMARKS: SalaryData[] = [
  {
    role: 'Chief Technology Officer (CTO)',
    sector: 'Tecnología & SaaS',
    juniorMid: '65.000 € - 80.000 €',
    senior: '85.000 € - 115.000 €',
    leadDirector: '120.000 € - 160.000 €',
    cLevel: '140.000 € - 200.000 € + Stock Options',
    variableBonus: '15% - 30%',
    demandTrend: 'Muy Alta (+25%)'
  },
  {
    role: 'Head of AI / Data Science Director',
    sector: 'Tecnología & IA',
    juniorMid: '55.000 € - 70.000 €',
    senior: '75.000 € - 95.000 €',
    leadDirector: '100.000 € - 135.000 €',
    cLevel: '125.000 € - 170.000 € + Equity',
    variableBonus: '15% - 25%',
    demandTrend: 'Muy Alta (+25%)'
  },
  {
    role: 'Chief Financial Officer (CFO)',
    sector: 'Finanzas & Legal',
    juniorMid: '50.000 € - 65.000 €',
    senior: '70.000 € - 95.000 €',
    leadDirector: '100.000 € - 140.000 €',
    cLevel: '130.000 € - 190.000 € + Bonus',
    variableBonus: '20% - 35%',
    demandTrend: 'Alta (+18%)'
  },
  {
    role: 'Chief Commercial Officer (CCO / Dir. Comercial)',
    sector: 'Comercial & Ventas',
    juniorMid: '45.000 € - 60.000 €',
    senior: '65.000 € - 85.000 €',
    leadDirector: '90.000 € - 130.000 €',
    cLevel: '120.000 € - 180.000 € + Comisiones',
    variableBonus: '30% - 60%',
    demandTrend: 'Alta (+20%)'
  },
  {
    role: 'Chief People Officer (CPO / Dir. RRHH)',
    sector: 'Recursos Humanos',
    juniorMid: '42.000 € - 55.000 €',
    senior: '60.000 € - 80.000 €',
    leadDirector: '85.000 € - 115.000 €',
    cLevel: '110.000 € - 150.000 €',
    variableBonus: '15% - 25%',
    demandTrend: 'Media-Alta (+15%)'
  },
  {
    role: 'Director Médico / Medical Affairs Director',
    sector: 'Salud & Pharma',
    juniorMid: '60.000 € - 75.000 €',
    senior: '80.000 € - 105.000 €',
    leadDirector: '110.000 € - 150.000 €',
    cLevel: '140.000 € - 195.000 € + Bonus',
    variableBonus: '20% - 30%',
    demandTrend: 'Alta (+18%)'
  }
];

export const SalaryGuideSection: React.FC<SalaryGuideSectionProps> = ({ 
  onOpenSalaryAgent,
  onNavigateToSalaryGuide 
}) => {
  const { theme } = useTheme();
  const [selectedSector, setSelectedSector] = useState('Todos');

  const sectors = ['Todos', 'Tecnología & SaaS', 'Tecnología & IA', 'Finanzas & Legal', 'Comercial & Ventas', 'Recursos Humanos', 'Salud & Pharma'];

  const filteredData = SALARY_BENCHMARKS.filter(
    (item) => selectedSector === 'Todos' || item.sector === selectedSector
  );

  return (
    <section id="guia-salarial-resumen" className={`py-16 sm:py-20 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Estudio Salarial de Mercado España 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Guía de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Compensación Directiva &amp; Tech</span>
            </h2>
            <p className={`mt-2 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Bandas salariales contrastadas en procesos de Executive Search en España (Madrid, Barcelona y Remoto).
            </p>
          </div>

          {/* Link to Full Salary Guide Page */}
          {onNavigateToSalaryGuide && (
            <button
              onClick={() => onNavigateToSalaryGuide('/guia-salarial')}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer"
            >
              <span>Ver Estudio Salarial Completo &amp; Tablas</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Sector Pill Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <Layers className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:inline" />
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-all whitespace-nowrap border shrink-0 font-bold ${
                selectedSector === sec
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                  : theme === 'dark'
                    ? 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Salary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredData.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50'
                  : 'bg-white border-slate-200 hover:border-emerald-500/60 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {item.sector}
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400">
                    {item.demandTrend}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading mb-4">
                  {item.role}
                </h3>

                <div className={`space-y-2 text-xs pt-3 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-center py-1">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Senior (5-8 años):</span>
                    <span className="font-bold">{item.senior}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Lead / Director:</span>
                    <span className="font-bold">{item.leadDirector}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>C-Level / VP:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.cLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Bonus Variable:</span>
                    <span className="font-semibold">{item.variableBonus}</span>
                  </div>
                </div>
              </div>

              <div className={`mt-5 pt-3 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>España 2026</span>
                <button
                  onClick={onOpenSalaryAgent}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Consultar Banda con IA</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-500 shrink-0" />
            <p className="text-xs sm:text-sm">
              ¿Deseas un <strong>estudio retributivo personalizado</strong> para una posición directiva confidencial o un plan de incentivos LTIP en España?
            </p>
          </div>
          <button
            onClick={onOpenSalaryAgent}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs shadow-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            Abrir Asesor de Salarios con IA
          </button>
        </div>

      </div>
    </section>
  );
};
