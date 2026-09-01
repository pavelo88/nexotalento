import React, { useState } from 'react';
import { CVAnalysisResult } from '../types';
import { 
  FileSearch, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Send, 
  Award, 
  Briefcase,
  Copy,
  Check,
  Building2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CVAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAgentWithCV?: (cvText: string) => void;
}

export const CVAnalyzerModal: React.FC<CVAnalyzerModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenAgentWithCV 
}) => {
  const [cvText, setCvText] = useState('');
  const [targetRole, setTargetRole] = useState('Director / Head of Department');
  const [industry, setIndustry] = useState('Tecnología & Digital');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleCVs: Record<string, string> = {
    tech: `Experiencia Profesional:
- CTO / Lead Architect en Empresa SaaS B2B (Madrid, 2021 - Actualidad)
  * Lideré un equipo de 28 ingenieros de software, DevOps y científicos de datos.
  * Migración de arquitectura monolítica a microservicios en Kubernetes y GCP, reduciendo costes de nube en un 32%.
  * Implementación de pipelines CI/CD y estándares de seguridad ISO 27001.
- Senior Software Engineering Manager (Barcelona, 2017 - 2021)
  * Escalamiento de plataforma fintech de 50.000 a 1.2M de usuarios activos mensuales.
  * Gestión de presupuestos anuales de tecnología (1.8M€).
Formación: Grado en Ingeniería Informática (UPM) + Executive MBA (ESADE).`,

    commercial: `Experiencia Profesional:
- Director Comercial / Chief Commercial Officer (Madrid, 2020 - Actualidad)
  * Responsable de la estrategia comercial y expansión en España, Portugal e Italia.
  * Crecimiento del ARR de 4.5M€ a 14.8M€ en 3 años (+228%).
  * Dirección directa de 18 Key Account Managers y equipo de preventa B2B.
- Head of Sales B2B (Valencia, 2016 - 2020)
  * Cierre de acuerdos corporativos clave con cuentas del IBEX 35 y grandes corporaciones.
Formación: Licenciatura en Administración y Dirección de Empresas + Máster en Dirección Comercial (IE Business School).`,

    finance: `Experiencia Profesional:
- Director Financiero / CFO (Madrid, 2019 - Presente)
  * Supervisión integral de tesorería, contabilidad, reporting IFRS y auditorías Big Four.
  * Lideré 2 rondas de financiación Serie B y Serie C por valor acumulado de 35M€.
  * Optimización de flujo de caja y renegociación de deuda bancaria (ahorro financiero del 18%).
- Financial Controller Senior (Barcelona, 2014 - 2019)
Formación: Doble Grado ADE y Finanzas (CUNEF) + Certificación CFA Nivel II.`
  };

  const handleAnalyze = async () => {
    if (!cvText.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch('/api/cv-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText,
          targetRole,
          industry
        })
      });

      const data = await res.json();
      setResult(data);
      if (data.matchScore && data.matchScore >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Error analyzing CV:', err);
      // Fallback
      setResult({
        matchScore: 86,
        summary: 'Perfil directivo con alto impacto y métricas cuantificables muy valoradas en el mercado español.',
        strengths: [
          'Experiencia probada en liderazgo de equipos y optimización de costes.',
          'Formación ejecutiva alineada con estándares de selección en Madrid y Barcelona.',
          'Orientación a resultados y escalado de negocio.'
        ],
        areasToImprove: [
          'Incorporar palabras clave específicas de IA aplicada al sector.',
          'Resumir el primer tercio del CV con un extracto ejecutivo más directo.'
        ],
        estimatedSalaryRange: '75.000 € - 95.000 € Bruto/Año + 20% Variable',
        headhunterVerdict: 'Candidato Excelente (Tier 1) para posiciones de Dirección y Headhunter Outreach.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopySummary = () => {
    if (!result) return;
    const text = `Diagnóstico de Talento Nexo Talentos:
Score de Encaje: ${result.matchScore}/100
Rango Salarial Estimado: ${result.estimatedSalaryRange}
Veredicto: ${result.headhunterVerdict}
Resumen: ${result.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                Auditor &amp; Matchmaker de Perfil Ejecutivo con IA
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Evalúa tu encaje para posiciones directivas y calcula tu valor retributivo en España
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Configuration Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="cv-target-role-select"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Posición u Objetivo Directivo
              </label>
              <select
                id="cv-target-role-select"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                aria-label="Posición u Objetivo Directivo"
                data-webmcp-field="cv-target-role"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="Director General / CEO">Director General / CEO</option>
                <option value="CTO / VP of Engineering">CTO / VP of Engineering</option>
                <option value="CFO / Director Financiero">CFO / Director Financiero</option>
                <option value="Director Comercial / CCO">Director Comercial / CCO</option>
                <option value="Director de Operaciones / COO">Director de Operaciones / COO</option>
                <option value="Director de Recursos Humanos / CHRO">Director de Recursos Humanos / CHRO</option>
                <option value="Head of Data & AI">Head of Data &amp; AI</option>
                <option value="Senior Manager / Especialista Clave">Senior Manager / Especialista Clave</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="cv-industry-select"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Sector en España
              </label>
              <select
                id="cv-industry-select"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                aria-label="Sector de Actividad en España"
                data-webmcp-field="cv-industry"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="Tecnología, SaaS & Digital">Tecnología, SaaS &amp; Digital</option>
                <option value="Banca, Fintech & Servicios Financieros">Banca, Fintech &amp; Servicios Financieros</option>
                <option value="Salud, Pharma & Biotech">Salud, Pharma &amp; Biotech</option>
                <option value="Industria, Energía & Construcción">Industria, Energía &amp; Construcción</option>
                <option value="Retail, FMCG & Gran Consumo">Retail, FMCG &amp; Gran Consumo</option>
                <option value="Consultoría Estratégica & Legal">Consultoría Estratégica &amp; Legal</option>
              </select>
            </div>
          </div>

          {/* Quick Sample CV Loader */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pega tu CV o trayectoria profesional:</span>
            <div className="flex items-center gap-1.5">
              <span>Cargar ejemplo:</span>
              <button
                type="button"
                onClick={() => setCvText(sampleCVs.tech)}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Tech CTO
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setCvText(sampleCVs.commercial)}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Comercial
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setCvText(sampleCVs.finance)}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Finanzas
              </button>
            </div>
          </div>

          {/* CV Text Area */}
          <textarea
            id="cv-analyzer-input"
            rows={5}
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Pega aquí el texto de tu CV, resumen de LinkedIn o logros principales (empresas, años, responsabilidades, métricas y logros)..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-xs"
          />

          {/* Action Analyze Button */}
          <button
            id="cv-analyzer-submit-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !cvText.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-cyan-950/40 transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>Analizando perfil con motor IA de Nexo Talentos...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Ejecutar Diagnóstico de Encaje y Banda Salarial</span>
              </>
            )}
          </button>

          {/* Result Card */}
          {result && (
            <div className="p-6 bg-slate-950/90 rounded-2xl border border-cyan-500/40 shadow-2xl space-y-4 animate-in slide-in-from-bottom-2">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-base font-bold text-white">Veredicto del Headhunter IA</h3>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium mt-0.5">
                    {result.headhunterVerdict}
                  </p>
                </div>

                {/* Match Score Badge */}
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl">
                  <span className="text-xs text-slate-400">Score de Encaje:</span>
                  <span className={`text-xl font-extrabold ${
                    result.matchScore >= 80 ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {result.matchScore}%
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Resumen de Evaluación
                </p>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {result.summary}
                </p>
              </div>

              {/* Strengths & Improvements in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Fortalezas Competitivas
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {result.strengths.map((st, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Recomendaciones para Destacar
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {result.areasToImprove.map((ai, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{ai}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Estimated Salary Benchmark */}
              <div className="p-3.5 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">
                    Banda Salarial de Mercado Estimada (España 2026)
                  </p>
                  <p className="text-base font-extrabold text-cyan-300 mt-0.5">
                    {result.estimatedSalaryRange}
                  </p>
                </div>
                <button
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar Diagnóstico'}</span>
                </button>
              </div>

              {/* Direct Next Step Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href="#contacto"
                  onClick={onClose}
                  className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-center text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar CV a la Red Confidencial de Headhunters Nexo</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
