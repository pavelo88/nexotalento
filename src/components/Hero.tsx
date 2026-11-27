import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../lib/tracking';
import { HeroGeometricShapes } from './motion/HeroGeometricShapes';

interface HeroProps {
  onOpenAIAgent?: (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer?: () => void;
  onNavigate?: (path: PageRoute) => void;
}

const frequentSearches = ['Jefe de Marketing', 'Asistente Contable', 'Carga Internacional', 'Ventas B2B Tech'];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (path: PageRoute, eventName: string) => {
    trackEvent({ eventName, category: 'Funnel', label: path });
    onNavigate?.(path);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    trackEvent({
      eventName: 'hero_search',
      category: 'Engagement',
      label: searchQuery.trim() || 'all_jobs',
    });
    onNavigate?.('/vacantes');
  };

  const handleCardKeyDown = (event: React.KeyboardEvent, path: PageRoute, eventName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateTo(path, eventName);
    }
  };

  return (
    <section
      id="inicio"
      className="nexo-hero relative isolate overflow-hidden pt-24 pb-8 text-stone-100 sm:pt-32 sm:pb-12 lg:pt-32 lg:pb-14"
    >
      <HeroGeometricShapes />
      <div className="nexo-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="nexo-hero-glow nexo-hero-glow-one pointer-events-none absolute" aria-hidden="true" />
      <div className="nexo-hero-glow nexo-hero-glow-two pointer-events-none absolute" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div className="nexo-hero-copy max-w-3xl">
            <div className="nexo-eyebrow mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-100 sm:text-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
              </span>
              Selección de talento para empresas
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="hidden normal-case tracking-normal text-cyan-200 sm:inline">España · Latinoamérica</span>
            </div>

            <h1 className="max-w-4xl font-heading text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.75rem]">
              El talento que mueve tu negocio
              <span className="nexo-gradient-text mt-2 block">empieza aquí.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              Conectamos empresas con profesionales que encajan de verdad: por experiencia, contexto y ambición. Un proceso de selección claro, humano y diseñado alrededor de tu próximo reto.
            </p>

            <div className="nexo-hero-actions mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigateTo('/contacto', 'hero_seek_talent_click')}
                className="nexo-primary-button group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold text-slate-950 sm:px-5"
              >
                <Building2 className="h-4 w-4" />
                Necesito contratar talento
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/vacantes', 'hero_seek_job_click')}
                className="nexo-secondary-button group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold text-white sm:px-5"
              >
                <UsersRound className="h-4 w-4 text-cyan-300" />
                Estoy buscando empleo
                <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-stone-300">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />Briefing consultivo</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" />Confidencialidad de principio a fin</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-sky-300" />Cobertura España · Latam</span>
            </div>
          </div>

          <div className="nexo-hero-visual relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:ml-auto">
            <div className="nexo-hero-orbit nexo-hero-orbit-one" aria-hidden="true" />
            <div className="nexo-hero-orbit nexo-hero-orbit-two" aria-hidden="true" />
            <div className="nexo-showcase-card relative overflow-hidden rounded-[2rem] border border-cyan-100/80 bg-transparent p-1 shadow-[0_0_0_1px_rgba(125,211,252,0.28),0_24px_70px_rgba(2,16,36,0.28)]">
              <div className="relative min-h-[27rem] overflow-hidden rounded-[1.75rem] border border-white/25 bg-slate-900">
                <div
                  className="nexo-showcase-photo absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/areas/executive-search.webp)' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/80" aria-hidden="true" />

                <div className="relative flex min-h-[27rem] flex-col justify-between p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-100">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                      Nexo Talent Desk
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
                      Disponible
                    </span>
                  </div>

                  <div>
                    <p className="max-w-xs font-heading text-3xl leading-tight text-white sm:text-4xl">
                      Una búsqueda bien planteada cambia el resultado.
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                      Del briefing al shortlist, ordenamos cada decisión para que puedas avanzar con seguridad.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-slate-950/65 p-2 backdrop-blur-md sm:grid-cols-3">
                    <div className="order-2 rounded-xl bg-white/[0.06] p-2.5 sm:order-none sm:p-3">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <Clock3 className="h-4 w-4 shrink-0 text-cyan-300" />
                        <p className="font-heading text-xl font-semibold text-white">18</p>
                      </div>
                      <p className="mt-1 text-[10px] leading-4 text-slate-400">días para la terna</p>
                    </div>
                    <div className="order-3 rounded-xl bg-white/[0.06] p-2.5 sm:order-none sm:p-3">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <Zap className="h-4 w-4 shrink-0 text-amber-300" />
                        <p className="font-heading text-xl font-semibold text-white">3–6</p>
                      </div>
                      <p className="mt-1 text-[10px] leading-4 text-slate-400">meses de garantía</p>
                    </div>
                    <div className="order-1 col-span-2 rounded-xl bg-cyan-300/[0.08] p-2.5 text-center sm:order-none sm:col-span-1 sm:p-3 sm:text-left">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <Globe2 className="h-4 w-4 shrink-0 text-sky-300" />
                        <p className="whitespace-nowrap font-heading text-base font-semibold tracking-tight text-white">ES · LATAM</p>
                      </div>
                      <p className="mt-1 text-[10px] leading-4 text-slate-400">cobertura de búsqueda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo('/contacto', 'hero_seek_talent_card_click')}
            onKeyDown={(event) => handleCardKeyDown(event, '/contacto', 'hero_seek_talent_card_click')}
            className="nexo-path-card nexo-path-card-enter nexo-path-card-enter-one group rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.07] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:bg-cyan-300/[0.11] sm:p-6"
            aria-label="Ir al formulario para contratar talento"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200"><Building2 className="h-5 w-5" /></span>
              <ArrowRight className="h-5 w-5 text-cyan-200 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-200">Para empresas</p>
            <h2 className="mt-2 font-heading text-2xl text-white sm:text-3xl">Necesito contratar talento</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Comparte el reto y te ayudamos a convertirlo en un proceso de selección claro y accionable.</p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo('/vacantes', 'hero_seek_job_card_click')}
            onKeyDown={(event) => handleCardKeyDown(event, '/vacantes', 'hero_seek_job_card_click')}
            className="nexo-path-card nexo-path-card-enter nexo-path-card-enter-two group rounded-3xl border border-sky-200/15 bg-sky-200/[0.06] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200/40 hover:bg-sky-200/[0.1] sm:p-6"
            aria-label="Ir a las vacantes activas"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-300/15 text-sky-200"><UsersRound className="h-5 w-5" /></span>
              <ArrowRight className="h-5 w-5 text-sky-200 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-200">Para profesionales</p>
            <h2 className="mt-2 font-heading text-2xl text-white sm:text-3xl">Quiero encontrar mi próximo reto</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Explora vacantes activas, conoce el contexto y postúlate con un perfil que te represente.</p>
          </div>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSearchSubmit} className="nexo-search-shell mx-auto flex max-w-4xl flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/55 p-2 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:flex-row sm:items-center">
            <div className="relative flex min-h-12 flex-1 items-center">
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Busca por cargo, área o ciudad…"
                aria-label="Buscar vacantes por cargo, área o ciudad"
                className="w-full bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <button type="submit" className="nexo-search-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold text-slate-950">
              Explorar vacantes <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Quizá buscas</span>
            {frequentSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  trackEvent({ eventName: 'hero_search_suggestion', category: 'Engagement', label: tag });
                  onNavigate?.('/vacantes');
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
