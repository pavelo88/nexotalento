import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types';

interface ProProfileCalloutProps {
  onNavigate: (path: PageRoute) => void;
}

export const ProProfileCallout: React.FC<ProProfileCalloutProps> = ({ onNavigate }) => (
  <aside className="relative mb-8 overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-[#102a43] to-slate-950 p-5 text-white shadow-2xl shadow-cyan-950/30 sm:mb-10 sm:p-7">
    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

    <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_auto]">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-cyan-200 backdrop-blur-xl">
          <span>★ Programa ProProfile para Candidatos</span>
        </div>

        <h2 className="max-w-3xl font-heading text-xl font-black leading-tight text-white sm:text-2xl">
          ¿Llevas meses aplicando y tus entrevistas no se convierten en ofertas?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
          Acompáñate de headhunters senior y psicólogos de RRHH con 95% de éxito y garantía de reactivación.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('/jobhunting')}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 active:scale-[0.98] lg:w-auto"
      >
        <span>Conoce ProProfile</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </aside>
);
