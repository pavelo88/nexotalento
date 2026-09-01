import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Building2, 
  ChevronRight,
  Zap,
  Lock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';

interface PorQueElegirnosPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

export const PorQueElegirnosPage: React.FC<PorQueElegirnosPageProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();

  const comparisonData = [
    {
      feature: 'Tiempo medio de entrega de terna validada',
      nexo: '18 Días Laborables (Garantizado por contrato)',
      traditional: '60 - 90 Días (Largo e impredecible)',
      highlight: true
    },
    {
      feature: 'Garantía de reposición de directivos',
      nexo: '12 Meses sin coste adicional',
      traditional: '3 a 6 meses máximo con restricciones',
      highlight: true
    },
    {
      feature: 'Metodología de búsqueda y criba',
      nexo: 'Caza directa + Agentes de IA + Evaluación 360°',
      traditional: 'Búsqueda manual en base de datos desactualizada',
      highlight: false
    },
    {
      feature: 'Tasa de permanencia a los 12 meses',
      nexo: '98.4% de éxito y adecuación cultural',
      traditional: '72% - 78% (Riesgo de rotación temprana)',
      highlight: true
    },
    {
      feature: 'Nivel de interlocución del consultor',
      nexo: 'Socio Consultor Sénior dedicado al proyecto',
      traditional: 'Junior recruiters o delegación a becarios',
      highlight: false
    },
    {
      feature: 'Confidencialidad y blindaje de marca',
      nexo: 'Protocolo estricto RGPD & Acuerdos NDA previos',
      traditional: 'Publicación abierta en portales de empleo',
      highlight: false
    },
    {
      feature: 'Transparencia de mercado & Benchmark Salarial',
      nexo: 'Datos en tiempo real España 2026 incluidos',
      traditional: 'Coste adicional por informe retributivo',
      highlight: false
    },
    {
      feature: 'Hub Nearshore LATAM (Arbitraje de costes 55%-62%)',
      nexo: 'Top 1.8% perfiles bilingües con facturación B2B en España',
      traditional: 'Sin red internacional ni cobertura de compliance global',
      highlight: true
    }
  ];

  const pillars = [
    {
      icon: Clock,
      title: 'Velocidad Sin Precedentes (18 Días)',
      description: 'Optimizamos la fase de mapeo con algoritmos inteligentes, reduciendo en un 60% el tiempo de contratación de directivos en España.'
    },
    {
      icon: ShieldCheck,
      title: 'Garantía de Cobertura Total de 12 Meses',
      description: 'Asumimos el compromiso absoluto: si el candidato contratado no supera el año de desempeño, reiniciamos la búsqueda de forma gratuita.'
    },
    {
      icon: Sparkles,
      title: 'Tecnología Propia de Inteligencia Artificial',
      description: 'Nuestra suite de 4 agentes IA cruza más de 50 variables situacionales para predecir el éxito antes de la primera entrevista.'
    },
    {
      icon: Users,
      title: 'Socios Consultores de Primer Nivel',
      description: 'Cada proceso es liderado por directores con más de 12 años de experiencia en el tejido empresarial español.'
    }
  ];

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/15 border border-[#00A9A3]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Diferenciación &amp; Excelencia Operativa</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            ¿Por Qué las Empresas Líderes Eligen <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] to-blue-500">Nexo Talentos</span>?
          </h1>
          <p className={`mt-4 text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Hemos redefinido el estándar del Headhunting y Executive Search en España, combinando la cercanía y juicio de socios consultores expertos con la velocidad y precisión de la Inteligencia Artificial.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className={`border rounded-3xl p-6 shadow-xl space-y-4 transition-all duration-300 card-spring-hover ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-[#00A9A3]/40'
                    : 'bg-white border-slate-200 hover:border-[#00A9A3]/40 shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00A9A3]/15 border border-[#00A9A3]/30 flex items-center justify-center text-[#00A9A3] shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading">
                  {pil.title}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {pil.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table Section */}
        <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl mb-16 ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Nexo Talentos vs. Agencias Tradicionales
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Compara de forma transparente por qué nuestro modelo genera un 45% más de rentabilidad y un encaje cultural superior.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className={`border-b ${
                  theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  <th className="pb-4 font-bold uppercase tracking-wider text-xs">Criterio de Evaluación</th>
                  <th className="pb-4 font-bold text-[#00A9A3] uppercase tracking-wider text-xs bg-[#00A9A3]/10 px-4 rounded-t-xl">
                    ⚡ Nexo Talentos
                  </th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-xs px-4">
                    Agencias Tradicionales
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-slate-800/60' : 'divide-slate-200'
              }`}>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={`transition-colors ${
                    theme === 'dark' ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
                  }`}>
                    <td className={`py-4 pr-4 font-semibold ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#00A9A3] bg-[#00A9A3]/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A9A3] shrink-0" />
                        <span>{row.nexo}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-4 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & GDPR Spanish Legal Framework */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className={`border rounded-3xl p-6 space-y-3 ${
            theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-[#00A9A3]">
              <Lock className="w-5 h-5" />
              <h3 className="text-sm font-bold">Confidencialidad Rigurosa</h3>
            </div>
            <p className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Firma de acuerdos de confidencialidad (NDA) antes de cualquier intercambio de información. Tu marca e intenciones estratégicas permanecen blindadas.
            </p>
          </div>

          <div className={`border rounded-3xl p-6 space-y-3 ${
            theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold">Cumplimiento RGPD &amp; LOPDGDD</h3>
            </div>
            <p className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Tratamiento de perfiles directivos auditado bajo el marco legal español y europeo. NIF B-88492019 con sede fiscal en Madrid.
            </p>
          </div>

          <div className={`border rounded-3xl p-6 space-y-3 ${
            theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-blue-500">
              <Building2 className="w-5 h-5" />
              <h3 className="text-sm font-bold">Sedes Físicas en Madrid y BCN</h3>
            </div>
            <p className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Oficinas en Paseo de la Castellana 95 (Madrid) y Av. Diagonal 640 (Barcelona) para reuniones presenciales con el comité de dirección.
            </p>
          </div>
        </div>

        {/* Direct Action Banner */}
        <div className={`border rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-[#00A9A3]/30'
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <h3 className="text-xl font-bold font-heading">
              ¿Listo para cubrir tu vacante directiva con la máxima garantía?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Cuéntanos tu necesidad y recibe una propuesta de búsqueda estratégica en menos de 24 horas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20conocer%20vuestra%20propuesta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +34 614 143 763</span>
            </a>

            <button
              onClick={() => onNavigate('/solicitar-talento')}
              className="px-5 py-3 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press"
            >
              <span>Solicitar Terna en 18 Días</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

