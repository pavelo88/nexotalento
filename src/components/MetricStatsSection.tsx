import React from 'react';
import { Clock3, Globe2, ShieldCheck, BriefcaseBusiness } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import { COMPANY_CONFIG } from '../config/company';

const metrics = [
  {
    value: `${COMPANY_CONFIG.commitments.slaDays}`,
    suffix: 'días',
    label: 'Terna validada',
    detail: 'Compromiso de proceso',
    icon: Clock3,
    tone: 'cyan',
  },
  {
    value: '3–6',
    suffix: 'meses',
    label: 'Garantía contractual',
    detail: 'Sustitución según servicio',
    icon: ShieldCheck,
    tone: 'emerald',
  },
  {
    value: 'ES',
    suffix: '· LATAM',
    label: 'Cobertura de búsqueda',
    detail: 'Contexto local e internacional',
    icon: Globe2,
    tone: 'sky',
  },
  {
    value: '4',
    suffix: 'procesos',
    label: 'Vacantes visibles',
    detail: 'Oportunidades activas',
    icon: BriefcaseBusiness,
    tone: 'amber',
  },
] as const;

const toneClasses = {
  cyan: { icon: 'text-cyan-500', value: 'from-cyan-500 to-blue-500' },
  emerald: { icon: 'text-emerald-500', value: 'from-emerald-500 to-cyan-500' },
  sky: { icon: 'text-sky-500', value: 'from-sky-500 to-indigo-500' },
  amber: { icon: 'text-amber-500', value: 'from-amber-500 to-orange-500' },
} as const;

export const MetricStatsSection: React.FC = () => (
  <section className="relative z-10 py-8 sm:py-12 lg:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="nexo-section-kicker">Lo que puedes esperar</p>
          <h2 className="mt-2 max-w-xl font-heading text-2xl text-slate-950 dark:text-white sm:text-3xl">Claridad para decidir mejor.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">Un proceso de selección pensado para que cada conversación acerque a la persona correcta.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const tone = toneClasses[metric.tone];
          return (
            <Reveal key={metric.label} delay={index * 0.08} className="h-full">
              <article className="nexo-metric-card flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 ${tone.icon} dark:bg-slate-800`}><Icon className="h-4 w-4" /></span>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Nexo</span>
                </div>
                <div className="mt-6">
                  <p className={`font-heading text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${tone.value} sm:text-4xl`}>
                    {metric.value} <span className="text-base font-semibold sm:text-lg">{metric.suffix}</span>
                  </p>
                  <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-800 dark:text-slate-200">{metric.label}</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{metric.detail}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
