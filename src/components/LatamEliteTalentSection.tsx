import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe2, 
  TrendingDown, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Zap, 
  Building2, 
  Users, 
  Code2, 
  Calculator,
  MessageSquare,
  Lock,
  Compass
} from 'lucide-react';
import { PageRoute } from '../types';

interface LatamEliteTalentSectionProps {
  onNavigate?: (path: PageRoute) => void;
  onOpenContact?: () => void;
}

export const LatamEliteTalentSection: React.FC<LatamEliteTalentSectionProps> = ({
  onNavigate,
  onOpenContact
}) => {
  const { theme } = useTheme();

  // Interactive Arbitrage Simulator State
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [teamSize, setTeamSize] = useState(2);

  const roles = [
    {
      title: 'Senior Fullstack / Cloud Architect',
      spainGross: 68000,
      spainSocial: 20400, // ~30% SS empresa
      latamAllInclusive: 36000,
      skills: 'React, Node.js, AWS/GCP, Kubernetes, Microservicios',
      experience: '7+ años · Inglés B2B / Español Nativo',
      badge: 'Tech & Engineering'
    },
    {
      title: 'Head of Growth / Data & Analytics Lead',
      spainGross: 72000,
      spainSocial: 21600,
      latamAllInclusive: 39000,
      skills: 'Python, SQL, Looker, BigQuery, Attribution Models',
      experience: '6+ años · Formación Top Universidades LATAM',
      badge: 'Data & Growth'
    },
    {
      title: 'Financial Controller / Senior FP&A',
      spainGross: 60000,
      spainSocial: 18000,
      latamAllInclusive: 32000,
      skills: 'ERP SAP/Oracle, Modelización Financiera, M&A, IFRS',
      experience: '8+ años · Big 4 background',
      badge: 'Finance & Strategy'
    },
    {
      title: 'Customer Success & Key Account Lead',
      spainGross: 48000,
      spainSocial: 14400,
      latamAllInclusive: 24000,
      skills: 'HubSpot, Salesforce, Retención B2B, Expansión LATAM',
      experience: '5+ años · Trilingüe (ES/EN/PT)',
      badge: 'Operations & B2B'
    }
  ];

  const currentRole = roles[selectedRoleIndex];
  const spainTotalPerDev = currentRole.spainGross + currentRole.spainSocial;
  const latamTotalPerDev = currentRole.latamAllInclusive;
  const savingsPerDev = spainTotalPerDev - latamTotalPerDev;
  const totalAnnualSavings = savingsPerDev * teamSize;
  const savingsPercentage = Math.round((savingsPerDev / spainTotalPerDev) * 100);

  const pillars = [
    {
      tag: 'CALIDAD TOP 1%',
      title: 'Riguroso Filtro Técnico & Soft Skills',
      description: 'Solo el 1.8% de los candidatos supera nuestras pruebas algorítmicas, entrevistas situacionales STAR y contraste de referencias.',
      metric: 'Top 1.8%',
      metricLabel: 'Tasa de Selección',
      icon: Award
    },
    {
      tag: 'ARBITRAJE SALARIAL',
      title: 'Hasta un 60% de Ahorro Neto',
      description: 'Accede a talento de calibre internacional con costes optimizados, sin pagar el sobreprecio de la burbuja local de Madrid o Barcelona.',
      metric: '55% - 62%',
      metricLabel: 'Optimización de Coste',
      icon: Coins
    },
    {
      tag: 'SOLAPAMIENTO TOTAL',
      title: 'Sincronía Horaria & Afinidad Cultural',
      description: 'De 4 a 6 horas de solapamiento diario directo con España (GMT-3 / GMT-5), español nativo y metodologías ágiles compartidas.',
      metric: '100%',
      metricLabel: 'Afinidad Cultural',
      icon: Clock
    },
    {
      tag: 'SEGURIDAD JURÍDICA',
      title: 'Cero Fricción Laboral ni Visados',
      description: 'Facturación directa B2B en España a través de Nexo Talentos. Contratos mercantiles blindados bajo estricto cumplimiento legal.',
      metric: '0%',
      metricLabel: 'Riesgo Laboral',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="talento-latam-hub" className={`py-16 sm:py-12 sm:py-16 relative overflow-hidden transition-colors duration-300 border-y ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0b0f19] via-[#0d1322] to-[#0b0f19] border-slate-800/90 text-slate-100' 
        : 'bg-gradient-to-b from-slate-50 via-cyan-50/20 to-slate-50 border-slate-200/90 text-slate-900'
    }`}>
      {/* Editorial Decorative Lighting & Background Mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Magazine Editorial Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm mb-4"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(6, 182, 212, 0.5)'
            }}
          >
            <Globe2 className="w-4 h-4 text-cyan-500 animate-spin-slow" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              SPECIAL REPORT · HUB DE TALENTO NEARSHORE LATAM 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4">
            El Secreto Mejor Guardado de los{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              Comités de Dirección
            </span>
          </h2>

          <p className={`text-sm sm:text-base max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Contrata profesionales de élite en <strong>tecnología, finanzas, data y operaciones</strong> procedentes de los principales hubs de América Latina (Colombia, Argentina, México, Chile). La misma o superior preparación técnica con hasta un <strong>58% de optimización de costes</strong> y cero fricción legal.
          </p>
        </div>

        {/* Editorial Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] relative group ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 shadow-lg shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-cyan-500/60 shadow-md shadow-cyan-950/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      {item.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-500 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-baseline justify-between ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <span className="text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    {item.metric}
                  </span>
                  <span className={`text-[11px] font-semibold ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {item.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Arbitrage Simulator (Magazine Spread Design) */}
        <div className={`rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#101524] border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-500 text-xs font-bold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Simulador Ejecutivo de Arbitraje &amp; Retención</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold font-heading tracking-tight">
                Compara el Coste Real: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">España vs LATAM Elite Hub</span>
              </h3>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Terna en 18 Días · 12 Meses Garantía</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Role Selector & Team Size */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className={`block text-xs font-extrabold uppercase tracking-wider mb-2.5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  1. Selecciona el Perfil Especializado:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roles.map((r, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRoleIndex(idx)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        selectedRoleIndex === idx
                          ? 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border-cyan-500 text-slate-950 dark:text-white shadow-md font-bold'
                          : theme === 'dark'
                            ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                        {r.badge}
                      </span>
                      <p className="text-xs font-bold leading-tight">{r.title}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Details of Selected Role */}
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                theme === 'dark' ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-slate-100/90 border-slate-300 text-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Stack / Competencias:</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-bold">{currentRole.skills}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Experiencia &amp; Idiomas:</span>
                  <span className="text-slate-900 dark:text-slate-200 font-bold">{currentRole.experience}</span>
                </div>
              </div>

              {/* Team Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label 
                    htmlFor="latam-team-size-slider"
                    className={`text-xs font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    2. Número de Profesionales a Incorporar:
                  </label>
                  <span className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
                    {teamSize} {teamSize === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
                <input
                  id="latam-team-size-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  aria-label="Número de Profesionales a Incorporar en LATAM"
                  data-webmcp-field="latam-team-size"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className={`flex justify-between text-[10px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>1 especialista</span>
                  <span>5 equipo core</span>
                  <span>10 squad completo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Comparative Financial Analysis Card */}
            <div className="lg:col-span-6">
              <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-900 via-[#131a2e] to-slate-950 border-cyan-500/40'
                  : 'bg-gradient-to-br from-cyan-50/40 via-white to-cyan-50/40 border-cyan-500/40'
              }`}>
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Impacto Económico Estimado (Anual)
                    </span>
                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                      Ahorro Estructural en Masa Salarial
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 text-xs font-black">
                    -{savingsPercentage}% Ahorro
                  </div>
                </div>

                {/* Comparison Rows */}
                <div className="space-y-3.5 mb-6 text-xs">
                  <div className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    theme === 'dark' ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-300'
                  }`}>
                    <div>
                      <p className={`font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>Coste Total Empresa en España</p>
                      <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Salario Bruto + ~30% Seg. Social Empresa</p>
                    </div>
                    <span className={`text-sm sm:text-base font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>
                      {(spainTotalPerDev * teamSize).toLocaleString('es-ES')} € / año
                    </span>
                  </div>

                  <div className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    theme === 'dark' ? 'bg-cyan-950/30 border-cyan-500/40' : 'bg-cyan-50 border-cyan-300'
                  }`}>
                    <div>
                      <p className={`font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-950'}`}>Coste Total Hub LATAM Elite (Nexo)</p>
                      <p className={`text-[10px] ${theme === 'dark' ? 'text-cyan-400/80' : 'text-cyan-800 font-semibold'}`}>Todo incluido · Factura B2B · 0% contingencias</p>
                    </div>
                    <span className={`text-sm sm:text-base font-black ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-800'}`}>
                      {(latamTotalPerDev * teamSize).toLocaleString('es-ES')} € / año
                    </span>
                  </div>
                </div>

                {/* Total Savings Big Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 text-center mb-6">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                    Ahorro Neto Anual para la Compañía
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-heading text-emerald-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300">
                    {totalAnnualSavings.toLocaleString('es-ES')} €
                  </div>
                  <p className={`text-[10px] mt-1 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                    Equivalente a reinvertir en marketing, producto o contratar {Math.round(totalAnnualSavings / latamTotalPerDev)} perfil(es) adicional(es).
                  </p>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenContact) onOpenContact();
                      else if (onNavigate) onNavigate('/contacto');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Solicitar Dossier &amp; Perfiles LATAM</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/34614143763?text=${encodeURIComponent(
                      `Hola Nexo Talentos, estuve consultando el Hub de Talento LATAM para perfiles de ${currentRole.title} (${teamSize} personas). Deseo recibir el dossier ejecutivo.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Directo</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Editorial Pullquote */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <blockquote className={`text-base sm:text-lg italic font-serif leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-800 font-medium'
          }`}>
            «Las compañías líderes ya no compiten por el escaso talento en un radio de 50 kilómetros. Construyen hubs globales de alto impacto que multiplican su velocidad de entrega reduciendo sus costes fijos.»
          </blockquote>
          <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mt-2">
            — Nexo Executive Talent Report · Tendencias Globales 2026
          </p>
        </div>

      </div>
    </section>
  );
};
