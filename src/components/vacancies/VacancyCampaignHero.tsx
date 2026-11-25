import React from 'react';
import { ArrowDown, BriefcaseBusiness, CheckCircle2, Sparkles } from 'lucide-react';
import { PageRoute } from '../../types';

interface VacancyCampaignHeroProps {
  onNavigate: (path: PageRoute) => void;
}

export const VacancyCampaignHero: React.FC<VacancyCampaignHeroProps> = ({ onNavigate }) => {
  const scrollToOpportunities = () => {
    document.getElementById('oportunidades')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-gradient-to-br from-slate-950 via-[#0d2941] to-slate-950 px-6 py-10 text-white shadow-2xl shadow-cyan-950/30 sm:px-10 sm:py-14 lg:px-14">
      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.09em] text-cyan-200 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Procesos de selección activos
          </div>

          <h1 className="max-w-3xl font-heading text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Tu próximo reto profesional puede estar más cerca de lo que imaginas.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Explora oportunidades seleccionadas por Nexo Talento para profesionales que buscan crecer en España y Latam.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToOpportunities}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 active:scale-[0.98]"
            >
              Explorar vacantes activas
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/crear-perfil')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/15 active:scale-[0.98]"
            >
              Crear mi perfil
              <BriefcaseBusiness className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            'Procesos revisados por especialistas',
            'Información clara antes de postular',
            'Perfil disponible para nuevas búsquedas'
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 backdrop-blur-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm font-semibold text-slate-100">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
