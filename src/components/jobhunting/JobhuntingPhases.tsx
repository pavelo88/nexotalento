import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  Check, 
  HeartHandshake, 
  Compass, 
  Share2, 
  MessageSquare, 
  TrendingUp 
} from 'lucide-react';
import { PhaseItem } from './types';

interface JobhuntingPhasesProps {
  theme: string;
}

const phases: PhaseItem[] = [
  {
    num: '0',
    badge: 'Fase 0 · Bienestar Emocional',
    title: 'Sesión con Psicólogo Experto en RRHH',
    subtitle: 'Sesión individual con psicóloga especializada',
    icon: HeartHandshake,
    color: 'from-teal-500 to-emerald-600',
    glow: 'shadow-teal-500/20',
    tag: 'Salud Mental & Confianza',
    desc: 'Sesión individual con una psicóloga especializada en desarrollo profesional y bienestar laboral, enfocada en trabajar la parte emocional y desbloquear barreras internas:',
    bullets: [
      'Confianza y autoconfianza profesional sólida',
      'Gestión inteligente del estrés, incertidumbre y frustración',
      'Eliminación de creencias limitantes y síndrome del impostor'
    ],
    deliverable: 'Plan de Reencuadre y Seguridad Profesional'
  },
  {
    num: '1',
    badge: 'Fase 1 · Dirección & Rumbo',
    title: 'Estrategia y Posicionamiento',
    subtitle: 'Primera sesión con consultor senior',
    icon: Compass,
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
    tag: 'Objetivo: Definir dirección',
    desc: 'En esta primera sesión trabajamos juntos tu propuesta de valor profesional, los tipos de puestos y sectores objetivo, y cómo potenciar tu "escaparate" laboral (CV y LinkedIn):',
    bullets: [
      'Definición de propuesta de valor y posicionamiento en el mercado',
      'Mapeo de sectores y roles de alta tracción afines a tu seniority',
      'Entrega del Excel de seguimiento: herramienta práctica de planificación de acciones, contactos y oportunidades'
    ],
    deliverable: 'Excel de Seguimiento + Hoja de Ruta Estratégica'
  },
  {
    num: '2',
    badge: 'Fase 2 · Branding & Activación',
    title: 'Escaparate y Activación de Mercado',
    subtitle: 'Segunda sesión con consultor senior',
    icon: Share2,
    color: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/20',
    tag: 'Activación en Red de Decisores',
    desc: 'Transformamos tu marca personal y conectamos tu perfil con la red viva de empresas y contratadores:',
    bullets: [
      'CV optimizado de alto impacto para ATS y filtros de selección',
      'Perfil de LinkedIn transformado como escaparate laboral activo',
      'Listado de empresas target + primeros decisores clave',
      'Compartimos activamente tu perfil con empresas, headhunters y contactos estratégicos de nuestra red'
    ],
    deliverable: 'CV Final + LinkedIn Pro + Listado de Decisores'
  },
  {
    num: '3',
    badge: 'Fase 3 · Dominio de Entrevista',
    title: 'Entrevistas y Conversión',
    subtitle: 'Tercera sesión con consultor senior',
    icon: MessageSquare,
    color: 'from-indigo-600 to-violet-600',
    glow: 'shadow-indigo-500/20',
    tag: 'Objetivo: Entrevistas en Ofertas',
    desc: 'Simulaciones reales de entrevistas con preguntas trampa y dinámicas ejecutivas para que destaques con autoridad:',
    bullets: [
      'Preparación exhaustiva de entrevistas reales del sector',
      'Storytelling profesional y estructuración de respuestas STAR',
      'Cómo defender tu valor y logros frente a otros candidatos competidores'
    ],
    deliverable: 'Guion de Storytelling + Matriz de Respuestas STAR'
  },
  {
    num: '4',
    badge: 'Fase 4 · Contratación & Cierre',
    title: 'Cierre, Oferta y Negociación Salarial',
    subtitle: 'Cuarta sesión con consultor senior',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    tag: 'Te ayudamos a cerrar bien',
    desc: 'Acompañamiento decisivo para evaluar propuestas y maximizar tu retribución total fija y variable:',
    bullets: [
      'Estrategia de negociación salarial y paquete de beneficios',
      'Evaluación objetiva de ofertas y toma de decisiones inteligente',
      'Apoyo en cualquier punto crítico del proceso y formalización',
      'Garantía de reactivación si el encaje no funciona tras incorporarte'
    ],
    deliverable: 'Acuerdo Cerrado + Garantía de Reactivación'
  }
];

export const JobhuntingPhases: React.FC<JobhuntingPhasesProps> = ({ theme }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const current = phases[activePhaseIndex];
  const Icon = current.icon;

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1023px)');
    const timer = window.setInterval(() => {
      if (mobileQuery.matches) {
        setActivePhaseIndex((prev) => (prev + 1) % phases.length);
      }
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section data-reveal className={`reveal-on-scroll py-24 border-y ${theme === 'dark' ? 'bg-[#090C11] border-stone-800' : 'bg-stone-100/60 border-stone-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A896]/10 text-[#00A896] dark:text-[#00E5C9] text-xs font-black uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Metodología en 5 Fases</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mt-1">
            Programa en Detalle: <span className="block sm:inline">Fases 0 a 4</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Haz clic en cada fase para explorar el trabajo paso a paso: desde el reencuadre emocional hasta el cierre salarial.
          </p>
        </div>

        {/* Stepper / Timeline Selector Tabs */}
        <div className="hidden lg:flex lg:flex-wrap items-center justify-center gap-2 pb-4 mb-10">
          {phases.map((p, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={p.num}
                onClick={() => setActivePhaseIndex(idx)}
                className={`w-full sm:w-auto px-3 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#00A896] to-cyan-500 text-slate-950 font-black shadow-lg shadow-[#00A896]/30 scale-105' 
                    : theme === 'dark' 
                      ? 'bg-stone-900/90 text-stone-400 hover:text-white border border-stone-800' 
                      : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200 shadow-xs'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                  isActive ? 'bg-slate-950 text-[#00E5C9]' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                }`}>
                  {p.num}
                </span>
                <span>Fase {p.num}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta Expandida de la Fase Activa */}
        <div className={`glass-card p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border transition-all duration-500 shadow-2xl relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-stone-900 border-stone-700 text-white' 
            : 'border-white/80 text-stone-900'
        }`}>
          {/* Glow decorativo de fondo */}
          <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${current.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#00A896]/15 text-[#00A896] dark:text-[#00E5C9] border border-[#00A896]/30">
                  {current.badge}
                </span>
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  {current.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
                  Puntos Clave del Trabajo:
                </p>
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-200">
                    <div className="w-5 h-5 rounded-lg bg-[#00A896]/15 text-[#00A896] dark:text-[#00E5C9] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-stone-50 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00A896] to-cyan-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                <Icon className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-stone-400">Entregable Certificado</p>
                <p className="text-base font-extrabold text-[#00A896] dark:text-[#00E5C9] mt-1">
                  {current.deliverable}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500">
                <span>Fase {activePhaseIndex + 1} de 5</span>
              </div>
            </div>
          </div>

          {/* Botones Prev / Next del Stepper */}
          <div className="hidden lg:flex mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 items-center justify-between">
            <button
              disabled={activePhaseIndex === 0}
              onClick={() => setActivePhaseIndex(prev => Math.max(0, prev - 1))}
              className="text-xs font-bold px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 disabled:opacity-30 transition-all hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              ← Fase Anterior
            </button>

            <button
              disabled={activePhaseIndex === phases.length - 1}
              onClick={() => setActivePhaseIndex(prev => Math.min(phases.length - 1, prev + 1))}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-[#00A896] text-slate-950 font-black disabled:opacity-30 transition-all hover:opacity-90 shadow-md cursor-pointer"
            >
              Siguiente Fase →
            </button>
          </div>

          <div className="lg:hidden pt-5">
            <label htmlFor="jobhunting-phase-select" className="sr-only">Seleccionar fase</label>
            <select
              id="jobhunting-phase-select"
              value={activePhaseIndex}
              onChange={(event) => setActivePhaseIndex(Number(event.target.value))}
              className="w-full rounded-2xl border border-white/70 bg-white/45 px-4 py-3 text-sm font-bold text-stone-800 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/45 dark:text-white"
            >
              {phases.map((phase, idx) => (
                <option key={phase.num} value={idx}>Fase {phase.num} · {phase.title}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </section>
  );
};
