import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Euro, 
  Clock, 
  ArrowRight,
  Sparkles,
  Award,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';

interface CostCalculatorTeaserProps {
  onNavigate: (path: PageRoute) => void;
}

export const CostCalculatorTeaser: React.FC<CostCalculatorTeaserProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [annualSalary, setAnnualSalary] = useState(85000);
  const [vacancyMonths, setVacancyMonths] = useState(3);

  // Math
  const dailySalary = annualSalary / 220;
  const revenueMultiplier = 2.5;
  const dailyImpact = dailySalary * revenueMultiplier;
  const totalCost = dailyImpact * (vacancyMonths * 21.6);
  
  // Nexo closes in 18 days vs standard
  const daysSaved = Math.max(0, (vacancyMonths * 21.6) - 18);
  const estimatedSavings = daysSaved * dailyImpact;

  return (
    <section id="calculadora-resumen" className={`py-14 sm:py-16 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Direct Full Page Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 mb-2.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Diagnóstico Financiero de Impacto B2B</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">Coste de Vacante Desierta</span> &amp; ROI
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Una posición directiva sin cubrir genera pérdidas operativas y de facturación. Cuantifica tu ahorro al cerrar la vacante en 18 días.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/calculadora-roi')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer btn-spring-press"
          >
            <span>Abrir Calculadora Completa &amp; Parámetros</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Compact Interactive Panel */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
          theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="teaser-annual-salary"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Salario Bruto Anual de la Posición
                </label>
                <span className="text-base font-extrabold text-cyan-500 font-mono">
                  {annualSalary.toLocaleString('es-ES')} €
                </span>
              </div>
              <input
                id="teaser-annual-salary"
                type="range"
                min={40000}
                max={180000}
                step={5000}
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                aria-label="Salario Bruto Anual de la Posición"
                data-webmcp-field="annual-salary-teaser"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>40.000 € (Mando)</span>
                <span>90.000 € (Director)</span>
                <span>180.000 € (C-Level)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="teaser-vacancy-months"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Tiempo Estimado Sin Cubrir
                </label>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {vacancyMonths} {vacancyMonths === 1 ? 'Mes' : 'Meses'}
                </span>
              </div>
              <input
                id="teaser-vacancy-months"
                type="range"
                min={1}
                max={5}
                step={1}
                value={vacancyMonths}
                onChange={(e) => setVacancyMonths(Number(e.target.value))}
                aria-label="Tiempo Estimado Sin Cubrir"
                data-webmcp-field="vacancy-months-teaser"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 Mes (Rápido)</span>
                <span>3 Meses (Media España)</span>
                <span>5 Meses (Crítico)</span>
              </div>
            </div>
          </div>

          {/* Results Summary (6 cols) */}
          <div className={`lg:col-span-6 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
            theme === 'dark' 
              ? 'bg-slate-950/90 border-slate-800' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Pérdida Diaria</p>
                <p className="text-xl sm:text-2xl font-black text-red-400 font-mono mt-0.5">
                  {Math.round(dailyImpact).toLocaleString('es-ES')} €
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Coste {vacancyMonths} Meses</p>
                <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5">
                  {Math.round(totalCost).toLocaleString('es-ES')} €
                </p>
              </div>
            </div>

            {/* Savings with Nexo */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-emerald-400 uppercase">
                  Ahorro con Nexo Talento (18 Días SLA)
                </p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">
                  +{Math.round(estimatedSavings).toLocaleString('es-ES')} €
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400 shrink-0" />
            </div>

            {/* Discreet LATAM Nearshore Note */}
            <div className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-between text-[11px]">
              <span className="text-cyan-300 font-medium">
                💡 <strong>Arbitraje Nearshore:</strong> Si optas por perfiles del Hub LATAM Elite, el ahorro estructural asciende a un <strong>58% adicional</strong>.
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onNavigate('/calculadora-roi')}
                className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver desglose detallado &amp; simulación completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
