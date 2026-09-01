import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  FileCheck,
  Building2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProcesoPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

export const ProcesoPage: React.FC<ProcesoPageProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      phase: 'Fase 01',
      days: 'Días 1 al 3',
      title: 'Inmersión Estratégica & Definición del Perfil 360°',
      subtitle: 'Comprender los retos del negocio antes de buscar candidatos',
      icon: Compass,
      tag: 'Estrategia & Cultura',
      description: 'Mantenemos una sesión ejecutiva de inmersión con el Comité de Dirección o Founder para analizar los objetivos de negocio, estilo de liderazgo requerido, estructura salarial y encaje cultural del puesto.',
      activities: [
        'Elaboración del Briefing de Posición y Job Spec ejecutivo.',
        'Definición de las competencias críticas (Hard & Soft Skills).',
        'Elaboración del mapa de empresas competidoras y sectores target en España y Europa.',
        'Fijación del calendario de hitos y compromiso de entrega.'
      ],
      deliverable: 'Dossier de Posición Aprobado y Mapa de Búsqueda.'
    },
    {
      phase: 'Fase 02',
      days: 'Días 4 al 8',
      title: 'Mapeo Exhaustivo, Caza Directa & Algoritmos de IA',
      subtitle: 'Acceso a talento pasivo de alto impacto que no busca en portales',
      icon: Search,
      tag: 'Headhunting Activo',
      description: 'Nuestros consultores sénior activan la búsqueda directa y confidencial sobre directivos en activo. Cruzamos los perfiles con nuestros algoritmos de adecuación predictiva de Inteligencia Artificial para filtrar encaje por experiencia y cultura.',
      activities: [
        'Mapeo de más de 40 candidatos potenciales en empresas target.',
        'Primer contacto directo de máxima confidencialidad.',
        'Cribado de motivaciones de cambio, disponibilidad y pretensiones salariales.',
        'Filtro preliminar de adecuación técnica y de liderazgo.'
      ],
      deliverable: 'Longlist con 10-15 directivos cualificados y contactados.'
    },
    {
      phase: 'Fase 03',
      days: 'Días 9 al 14',
      title: 'Evaluación Psicométrica, Entrevistas en Profundidad & Referencias',
      subtitle: 'Verificación empírica de logros, encaje de valores y referencias ciegas',
      icon: UserCheck,
      tag: 'Assessment Científico',
      description: 'Entrevistas por competencias dirigidas por Socios Consultores, complementadas con batería de tests psicométricos de liderazgo y contraste minucioso de referencias profesionales con ex-superiores.',
      activities: [
        'Entrevistas estructuradas por incidentes críticos (STAR).',
        'Test psicométrico de adecuación al rol y estilo directivo.',
        'Comprobación confidencial de referencias con al menos 2 ex-CEOs o miembros de consejo.',
        'Auditoría de reputación y trayectoria contrastada.'
      ],
      deliverable: 'Informes Ejecutivos Individuales con matriz de competencias.'
    },
    {
      phase: 'Fase 04',
      days: 'Días 15 al 18',
      title: 'Presentación de la Terna Final & Acompañamiento en Entrevistas',
      subtitle: 'Entrega de los 3 mejores candidatos listos para incorporarse',
      icon: FileCheck,
      tag: 'Terna Finalista',
      description: 'Presentación del informe comparativo de los 3 candidatos finalistas con fortalezas, áreas de desarrollo, motivaciones y encaje retributivo. Coordinación y asesoramiento en las entrevistas con el Consejo.',
      activities: [
        'Reunión ejecutiva de presentación de la terna final.',
        'Apoyo metodológico en la estructura de preguntas para el cliente.',
        'Recogida y análisis del feedback de ambas partes.',
        'Asesoramiento en la toma de decisión final.'
      ],
      deliverable: 'Terna Directiva con Informes Psicométricos y Comparativa.'
    },
    {
      phase: 'Fase 05',
      days: 'Día 19+',
      title: 'Negociación de Oferta, Onboarding & Garantía de 12 Meses',
      subtitle: 'Cierre exitoso y seguimiento continuo durante el primer año',
      icon: ShieldCheck,
      tag: 'Garantía & Éxito',
      description: 'Facilitamos el cierre salarial y contractual para asegurar la aceptación de la oferta. Realizamos un seguimiento periódico a los 30, 90 y 180 días, respaldado por nuestra garantía total de reposición de 12 meses.',
      activities: [
        'Mediación en la negociación del paquete retributivo (fijo + variable + equity).',
        'Plan de Onboarding y acompañamiento de aterrizaje.',
        'Revisiones trimestrales de satisfacción con el cliente y el directivo.',
        'Activación de garantía inmediata sin coste si surge cualquier contingencia.'
      ],
      deliverable: 'Contrato firmado, incorporación efectiva y póliza de garantía.'
    }
  ];

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/15 border border-[#00A9A3]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>SLA Comprometido: Terna en 18 Días</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            El Proceso de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] to-blue-500">Executive Search</span> Paso a Paso
          </h1>
          <p className={`mt-4 text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Una metodología probada en más de 240 procesos directivos en España que combina rigor de evaluación por competencias, confidencialidad absoluta y velocidad de ejecución.
          </p>
        </div>

        {/* Interactive Step Switcher for Mobile & Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
          {steps.map((st, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`p-3 sm:p-4 rounded-2xl text-left border transition-all btn-spring-press ${
                activeStep === index
                  ? 'bg-[#00A9A3]/20 border-[#00A9A3] shadow-lg shadow-[#00A9A3]/10 font-bold'
                  : theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${activeStep === index ? 'text-[#00A9A3]' : 'text-slate-400'}`}>
                  {st.phase}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">{st.days}</span>
              </div>
              <p className={`text-xs font-bold truncate ${
                activeStep === index 
                  ? (theme === 'dark' ? 'text-white' : 'text-slate-900') 
                  : (theme === 'dark' ? 'text-slate-300' : 'text-slate-600')
              }`}>
                {st.tag}
              </p>
            </button>
          ))}
        </div>

        {/* Featured Step Detailed Box */}
        {(() => {
          const st = steps[activeStep];
          const Icon = st.icon;
          return (
            <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-16 ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-[#00A9A3]/40'
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#00A9A3]/20 border border-[#00A9A3]/40 flex items-center justify-center text-[#00A9A3] shadow-lg shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00A9A3]">
                        {st.phase} ({st.days})
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {st.tag}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                      {st.title}
                    </h2>
                    <p className={`text-xs mt-0.5 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>{st.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenAIAgent('headhunter')}
                    className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors btn-spring-press ${
                      theme === 'dark'
                        ? 'bg-slate-950 hover:bg-slate-800 text-[#00A9A3] border-[#00A9A3]/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-[#00A9A3] border-slate-200 shadow-sm'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Preguntar al Agente IA</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                {/* Description & Activities (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      ¿Qué hacemos en esta fase?
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {st.description}
                    </p>
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Actividades clave ejecutadas:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {st.activities.map((act, idx) => (
                        <div key={idx} className={`p-3 border rounded-xl flex items-start gap-2.5 text-xs ${
                          theme === 'dark'
                            ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 text-[#00A9A3] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverable Box (4 cols) */}
                <div className={`lg:col-span-4 border rounded-2xl p-6 flex flex-col justify-between space-y-4 ${
                  theme === 'dark'
                    ? 'bg-slate-950/90 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 text-[#00A9A3] mb-2">
                      <FileCheck className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">Entregable Concreto:</span>
                    </div>
                    <p className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {st.deliverable}
                    </p>
                  </div>

                  <div className={`pt-4 border-t text-xs space-y-2 ${
                    theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span>Interlocutor:</span>
                      <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Socio Consultor Sénior</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Garantía:</span>
                      <strong className="text-emerald-500">100% Reposición (12 Meses)</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/solicitar-talento')}
                    className="w-full py-2.5 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md btn-spring-press"
                  >
                    <span>Iniciar Búsqueda en 18 Días</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 5-Step Vertical Chronology */}
        <div className="space-y-4 mb-16">
          <h3 className="text-xl font-bold font-heading text-center mb-8">
            Cronograma Completo del Proceso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className={`p-4 border rounded-2xl space-y-2 card-spring-hover ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <span className="text-xs font-bold text-[#00A9A3]">{st.phase} ({st.days})</span>
                <h4 className="text-xs font-bold leading-snug">{st.title}</h4>
                <p className={`text-[11px] line-clamp-3 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>{st.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Banner */}
        <div className={`border rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-[#00A9A3]/30'
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <h3 className="text-xl font-bold font-heading">
              ¿Quieres agendar el Kick-off de tu vacante esta misma semana?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Contacta con nuestro equipo en Madrid o Barcelona y activamos la búsqueda en menos de 24 horas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20iniciar%20un%20proceso%20de%20seleccion"
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
              <span>Solicitar Reunión Inicial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
