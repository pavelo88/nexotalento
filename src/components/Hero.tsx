import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  ShieldCheck,
  ArrowRight,
  Search,
  Building2,
  Rocket,
  CheckCircle2,
  Users2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../lib/tracking';

interface HeroProps {
  onOpenAIAgent?: (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer?: () => void;
  onNavigate?: (path: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCVAnalyzer,
  onNavigate
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent({
      eventName: 'hero_search',
      category: 'Engagement',
      label: searchQuery
    });
    if (onNavigate) {
      onNavigate('/vacantes');
    }
  };

  const handleSeekTalent = () => {
    trackEvent({
      eventName: 'hero_seek_talent_click',
      category: 'Funnel'
    });
    if (onNavigate) {
      onNavigate('/contacto');
    }
  };

  const handleSeekJob = () => {
    trackEvent({
      eventName: 'hero_seek_job_click',
      category: 'Funnel'
    });
    if (onNavigate) {
      onNavigate('/vacantes');
    }
  };

  return (
    <section
      id="inicio"
      className={`relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* High-Resolution Corporate Architectural Photography (Visible & Crisp) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90"
          alt="Edificio corporativo y centro de negocios de alta dirección"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-40 scale-100"
        />
        {/* Subtle Vignette Overlay to guarantee 100% text readability without hiding the building */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/90'
            : 'bg-gradient-to-b from-white/60 via-white/20 to-white/95'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill Freelancer Style */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm transition-transform hover:scale-105 bg-slate-900/90 border-[#00A9A3]/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A9A3]" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-100">
              Firma Boutique de Executive Search &amp; Headhunting
            </span>
            <span className="bg-[#00A9A3]/20 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#00A9A3]/40">
              Ecuador &amp; LATAM 2026
            </span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading leading-tight">
            Contrata al mejor talento{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500">
              directivo y técnico
            </span>{' '}
            para tu empresa
          </h1>

          <p className={`mt-4 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
          }`}>
            Garantizamos la máxima precisión de selección en Quito, Guayaquil y la región. Entrega de terna validada en <strong className={theme === 'dark' ? 'text-white' : 'text-slate-950'}>18 días hábiles</strong> con <strong className={theme === 'dark' ? 'text-white' : 'text-slate-950'}>garantía contractual de 3 a 6 meses</strong>.
          </p>
        </div>

        {/* FREELANCER STYLE SEARCH BAR */}
        <div className="max-w-3xl mx-auto mb-10">
          <form
            onSubmit={handleSearchSubmit}
            className={`p-2 rounded-2xl sm:rounded-3xl border shadow-2xl flex flex-col sm:flex-row items-center gap-2 transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-700 shadow-black/60 focus-within:border-cyan-400'
                : 'bg-white border-slate-300 shadow-xl focus-within:border-[#00A9A3]'
            }`}
          >
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="¿Qué perfil buscas? Ej: Jefe de Marketing, Asesor Comercial, Contable..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 text-xs sm:text-sm bg-transparent outline-none font-semibold ${
                  theme === 'dark' ? 'text-white placeholder:text-slate-400' : 'text-slate-900 placeholder:text-slate-500'
                }`}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600 hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buscar Perfiles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick tags below search */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px]">Búsquedas frecuentes:</span>
            {['Jefe de Marketing', 'Asistente Contable', 'Carga Internacional', 'Ventas B2B Tech'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  if (onNavigate) onNavigate('/vacantes');
                }}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-cyan-500'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00A9A3]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* DUAL ACTION CARDS (EMPRESAS VS CANDIDATOS) FREELANCER LUXURY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          
          {/* Card 1: Para Empresas */}
          <div
            onClick={handleSeekTalent}
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer relative group flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900/90 to-slate-950 border-slate-800 hover:border-cyan-500/60 shadow-xl'
                : 'bg-white border-slate-200 hover:border-cyan-500/60 shadow-md'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                <Building2 className="w-3.5 h-3.5" />
                <span>Empresas &amp; Comités de Dirección</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-2 group-hover:text-cyan-400 transition-colors">
                Necesito contratar talento
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Publica un requerimiento o solicita headhunting directo. Te presentamos una terna finalista evaluada en 18 días hábiles.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Terna en 18 días
              </span>
              <span className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs group-hover:bg-cyan-400 transition-colors flex items-center gap-1.5">
                <span>Solicitar Talento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Para Candidatos */}
          <div
            onClick={handleSeekJob}
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer relative group flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900/90 to-slate-950 border-slate-800 hover:border-[#00A9A3]/60 shadow-xl'
                : 'bg-white border-slate-200 hover:border-[#00A9A3]/60 shadow-md'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00A9A3]/10 text-[#00A9A3] border border-[#00A9A3]/20 mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>Candidatos &amp; Profesionales</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-2 group-hover:text-[#00A9A3] transition-colors">
                Quiero postular a vacantes
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Explora los 4 procesos oficiales de selección abiertos en Quito y Guayaquil con bandas salariales transparentes.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Bolsa Activa 2026
              </span>
              <span className="px-4 py-2 rounded-xl bg-[#00A9A3] text-white font-extrabold text-xs group-hover:bg-[#00918C] transition-colors flex items-center gap-1.5">
                <span>Ver 4 Vacantes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

        {/* Trust Badges Strip (Freelancer metrics footer) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <p className="text-xl sm:text-2xl font-black text-cyan-400 font-heading">18 Días</p>
            <p className="text-[11px] text-slate-400 font-medium">Terna Validada</p>
          </div>
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <p className="text-xl sm:text-2xl font-black text-[#00A9A3] font-heading">3-6 Meses</p>
            <p className="text-[11px] text-slate-400 font-medium">Garantía Reposición</p>
          </div>
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <p className="text-xl sm:text-2xl font-black text-blue-400 font-heading">98.4%</p>
            <p className="text-[11px] text-slate-400 font-medium">Tasa de Retención</p>
          </div>
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 font-heading">100%</p>
            <p className="text-[11px] text-slate-400 font-medium">Blindaje Contractual</p>
          </div>
        </div>

      </div>
    </section>
  );
};
