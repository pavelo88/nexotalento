import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  Euro, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  AlertTriangle,
  Award
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CostCalculatorSectionProps {
  isFullPage?: boolean;
}

export const CostCalculatorSection: React.FC<CostCalculatorSectionProps> = ({ isFullPage }) => {
  const { theme } = useTheme();
  const [annualSalary, setAnnualSalary] = useState(85000);
  const [vacancyMonths, setVacancyMonths] = useState(3);
  const [revenueMultiplier, setRevenueMultiplier] = useState(2.5);

  // Calculations
  const dailySalary = annualSalary / 220; // 220 working days
  const dailyBusinessImpact = dailySalary * revenueMultiplier;
  const totalCostOfVacancy = dailyBusinessImpact * (vacancyMonths * 21.6);
  
  // Nexo Talentos accelerates hiring to 18 days (approx 0.8 months) vs industry average 3-4 months
  const traditionalDaysToHire = vacancyMonths * 21.6;
  const nexoDaysToHire = 18;
  const daysSaved = Math.max(0, traditionalDaysToHire - nexoDaysToHire);
  const estimatedSavings = daysSaved * dailyBusinessImpact;

  return (
    <section 
      id="calculadora-roi" 
      data-webmcp-tool="cost-calculator-roi"
      className={`${isFullPage ? '' : 'py-16 sm:py-12 sm:py-16'} relative transition-colors duration-300 ${
      isFullPage ? '' : theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Herramienta Financiera de Impacto Organizacional</span>
          </div>
          {isFullPage ? (
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">Coste de Vacante Desierta</span> &amp; ROI
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">Coste de Vacante Desierta</span> &amp; ROI
            </h2>
          )}
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Tener una posición clave o directiva sin cubrir no es un ahorro; genera sobrecarga en el equipo, pérdidas de facturación y retrasos estratégicos. Cuantifica el impacto exacto en tu empresa.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders Input Panel (Col 1) */}
          <div className={`lg:col-span-6 rounded-3xl p-7 flex flex-col justify-between space-y-6 border shadow-xl ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="space-y-6">
              
              {/* Slider 1: Annual Salary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label 
                    htmlFor="calc-annual-salary"
                    className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Salario Bruto Anual de la Posición (€)
                  </label>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">
                    {annualSalary.toLocaleString('es-ES')} €
                  </span>
                </div>
                <input
                  id="calc-annual-salary"
                  type="range"
                  min={35000}
                  max={200000}
                  step={5000}
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  aria-label="Salario Bruto Anual de la Posición en Euros"
                  data-webmcp-field="annual-salary"
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                    theme === 'dark' ? 'bg-slate-950' : 'bg-slate-200'
                  }`}
                />
                <div className={`flex justify-between text-[10px] mt-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span>35.000 € (Mando Intermedio)</span>
                  <span>110.000 € (Director)</span>
                  <span>200.000 € (C-Level)</span>
                </div>
              </div>

              {/* Slider 2: Vacancy Months */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label 
                    htmlFor="calc-vacancy-months"
                    className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Meses Estimados de Vacante Sin Cubrir
                  </label>
                  <span className="text-base font-extrabold text-amber-500 dark:text-amber-400 font-mono">
                    {vacancyMonths} {vacancyMonths === 1 ? 'Mes' : 'Meses'}
                  </span>
                </div>
                <input
                  id="calc-vacancy-months"
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={vacancyMonths}
                  onChange={(e) => setVacancyMonths(Number(e.target.value))}
                  aria-label="Meses Estimados de Vacante Sin Cubrir"
                  data-webmcp-field="vacancy-months"
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500 ${
                    theme === 'dark' ? 'bg-slate-950' : 'bg-slate-200'
                  }`}
                />
                <div className={`flex justify-between text-[10px] mt-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span>1 Mes (Rápido)</span>
                  <span>3 Meses (Media España)</span>
                  <span>6 Meses (Crítico)</span>
                </div>
              </div>

              {/* Slider 3: Multiplier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label 
                    htmlFor="calc-revenue-multiplier"
                    className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Multiplicador de Impacto de Negocio
                  </label>
                  <span className="text-base font-extrabold text-indigo-500 dark:text-indigo-400 font-mono">
                    {revenueMultiplier}x
                  </span>
                </div>
                <input
                  id="calc-revenue-multiplier"
                  type="range"
                  min={1.5}
                  max={4.0}
                  step={0.5}
                  value={revenueMultiplier}
                  onChange={(e) => setRevenueMultiplier(Number(e.target.value))}
                  aria-label="Multiplicador de Impacto de Negocio"
                  data-webmcp-field="revenue-multiplier"
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                    theme === 'dark' ? 'bg-slate-950' : 'bg-slate-200'
                  }`}
                />
                <div className={`flex justify-between text-[10px] mt-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span>1.5x (Soporte / Staff)</span>
                  <span>2.5x (Gestión / Tech)</span>
                  <span>4.0x (Comercial / C-Level)</span>
                </div>
              </div>

            </div>

            {/* Quick Note */}
            <div className={`p-4 rounded-2xl border text-xs flex items-start gap-2.5 ${
              theme === 'dark'
                ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Fórmula avalada por estudios de Harvard Business Review y SHRM: el coste diario de una vacante equivale a su salario diario ponderado por el multiplicador de impacto en productividad y ventas.
              </span>
            </div>
          </div>

          {/* Results Analytics Panel (Col 2) */}
          <div className={`lg:col-span-6 border rounded-3xl p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500/40'
              : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
          }`}>
            
            <div className="space-y-6">
              <div className={`flex items-center justify-between pb-3 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Award className="w-4 h-4 text-cyan-500" />
                  Diagnóstico Económico de la Vacante
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30 dark:border-emerald-800">
                  Ahorro con Nexo Talentos
                </span>
              </div>

              {/* Main Stat 1: Daily Loss */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <p className={`text-[11px] uppercase font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Pérdida Económica Diaria</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-red-500 dark:text-red-400 font-mono mt-1">
                    {Math.round(dailyBusinessImpact).toLocaleString('es-ES')} €
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Por cada día sin cubrir</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <p className={`text-[11px] uppercase font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Coste Total de la Vacante</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 dark:text-amber-400 font-mono mt-1">
                    {Math.round(totalCostOfVacancy).toLocaleString('es-ES')} €
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Durante {vacancyMonths} meses</p>
                </div>
              </div>

              {/* Highlight Box: Savings with Nexo Talentos */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border-emerald-500/40'
                  : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Ahorro Estimado al Contratar con Nexo Talentos
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                      +{Math.round(estimatedSavings).toLocaleString('es-ES')} €
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Al reducir el tiempo de cobertura a <strong>18 días hábiles</strong> con filtrado predictivo de IA y búsqueda directa, recuperas hasta <strong>{Math.round(daysSaved)} días laborables</strong> de productividad.
                </p>
              </div>

            </div>

            {/* Bottom Action CTA */}
            <div className={`pt-6 border-t ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <a
                href="#contacto"
                className="w-full py-4 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all btn-spring-press"
              >
                <span>Cerrar mi Vacante Crítica en 18 Días</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

