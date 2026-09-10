import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe2, 
  TrendingDown, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Building2
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface SalaryComparisonSectionProps {
  onOpenContact?: () => void;
}

export const SalaryComparisonSection: React.FC<SalaryComparisonSectionProps> = ({
  onOpenContact
}) => {
  const { theme } = useTheme();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const roles = [
    {
      title: 'Senior Fullstack / Cloud Architect',
      category: 'Tecnología & Cloud',
      spainGross: '68.000 €',
      spainSocial: '20.400 € (SS Empresa)',
      spainTotal: '88.400 €',
      latamAllInclusive: '36.000 €',
      annualSavings: '52.400 €',
      savingsPercent: '59%',
      skills: 'React, Node, AWS/GCP, Kubernetes, Microservicios',
      experience: '+7 años de experiencia contrastada'
    },
    {
      title: 'Data & AI Engineer / Analytics Lead',
      category: 'Datos & Inteligencia Artificial',
      spainGross: '72.000 €',
      spainSocial: '21.600 € (SS Empresa)',
      spainTotal: '93.600 €',
      latamAllInclusive: '39.000 €',
      annualSavings: '54.600 €',
      savingsPercent: '58%',
      skills: 'Python, SQL, BigQuery, LLMs, Pipelines de Datos',
      experience: '+6 años de experiencia especializada'
    },
    {
      title: 'Financial Controller / Senior FP&A',
      category: 'Finanzas & Estrategia',
      spainGross: '60.000 €',
      spainSocial: '18.000 € (SS Empresa)',
      spainTotal: '78.000 €',
      latamAllInclusive: '32.000 €',
      annualSavings: '46.000 €',
      savingsPercent: '59%',
      skills: 'ERP SAP/Oracle, Modelización, Reporting IFRS',
      experience: '+8 años (Ex-Big 4 / Multinacional)'
    },
    {
      title: 'Customer Success & B2B Operations Lead',
      category: 'Operaciones & Clientes',
      spainGross: '48.000 €',
      spainSocial: '14.400 € (SS Empresa)',
      spainTotal: '62.400 €',
      latamAllInclusive: '24.000 €',
      annualSavings: '38.400 €',
      savingsPercent: '61%',
      skills: 'HubSpot, Salesforce, Retención de Cuentas B2B',
      experience: '+5 años · Bilingüe (Español/Inglés)'
    }
  ];

  const role = roles[selectedRoleIndex];

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hola Nexo Talento, deseo consultar perfiles y tarifas del Hub de Talento Remoto para la posición: ${role.title}`
  )}`;

  return (
    <section id="comparativa-salarial-remoto" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Compacto */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm mb-3 bg-cyan-950/40 border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Globe2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Hub de Talento Remoto &amp; Arbitraje Salarial</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            ¿Cuánto cuesta un profesional en <span className="text-cyan-400">España</span> vs <span className="text-emerald-400">Remoto</span>?
          </h2>

          <p className={`mt-2.5 text-xs sm:text-sm max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Misma solvencia técnica y directiva con <strong>solapamiento de 4 a 6 horas diarias</strong> con España. Facturación mercantil B2B directa y <strong>garantía de sustitución de 3 a 6 meses</strong>.
          </p>
        </div>

        {/* Role Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {roles.map((r, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedRoleIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRoleIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md scale-105'
                  : theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {r.title.split('/')[0].trim()}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Bento Card */}
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-950/90 border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          
          {/* Position Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                {role.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading mt-1.5">
                {role.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {role.skills} • {role.experience}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <span>Ahorro Estimado: {role.savingsPercent}</span>
            </div>
          </div>

          {/* 2 Columns: España vs Remoto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Columna España */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>🇪🇸</span> Contratación Local España
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Presencial / Híbrido</span>
                </div>

                <div className="my-4">
                  <p className="text-3xl font-black text-white font-heading">
                    {role.spainTotal}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">/ año total</span>
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between">
                    <span>Salario Bruto anual:</span>
                    <span className="text-slate-200 font-semibold">{role.spainGross}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seguridad Social empresa (+30%):</span>
                    <span className="text-slate-200 font-semibold">{role.spainSocial}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-amber-400/90 pt-1">
                    <span>Sobrecoste local Madrid/BCN:</span>
                    <span>Competencia agresiva &amp; rotación</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Remoto LATAM */}
            <div className="p-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-950 relative flex flex-col justify-between shadow-lg shadow-emerald-950/20">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span>🌎</span> Talento Remoto Homologado
                  </span>
                  <span className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                    Todo Incluido
                  </span>
                </div>

                <div className="my-4">
                  <p className="text-3xl font-black text-emerald-400 font-heading">
                    {role.latamAllInclusive}
                    <span className="text-xs font-normal text-slate-300 ml-1.5">/ año total</span>
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Facturación B2B directa en España (Cero riesgo laboral)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>4 a 6 horas de solapamiento horario directo</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Terna en 18 días con garantía de 3 a 6 meses</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Total Savings Banner */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Ahorro neto directo de <span className="text-emerald-400 font-extrabold text-sm">{role.annualSavings} / año</span> por profesional
                </p>
                <p className="text-[11px] text-slate-400">
                  Facturas deducibles como gasto mercantil en España sin contingencias de nómina local.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-slate-950" />
                <span>Consultar por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('solicitar-talento');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else if (onOpenContact) {
                    onOpenContact();
                  }
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Solicitar Terna
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
