import React, { useEffect } from 'react';
import { ArrowRight, Layers, MessageSquare } from 'lucide-react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AreasEspecializacionSection } from '../components/AreasEspecializacionSection';
import { SpecializationSectorsSection } from '../components/SpecializationSectorsSection';
import { CompactServicesGrid } from '../components/services/CompactServicesGrid';
import { legacyDetailedServices } from '../components/services/legacySpecializationContent';
import { Reveal } from '../components/motion/Reveal';

interface ServiciosPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenJobSpecGenerator: () => void;
}

export const ServiciosPage: React.FC<ServiciosPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Catálogo detallado, metodologías, SLAs y perfiles: preservado, pero fuera de la vista pública.
  void legacyDetailedServices;

  return (
    <main className={`relative min-h-screen overflow-hidden pb-24 pt-36 sm:pt-40 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="pointer-events-none absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#00A9A3]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A9A3]/30 bg-[#00A9A3]/15 px-4 py-1.5 text-xs font-bold text-[#00A9A3]"><Layers className="h-3.5 w-3.5" />Soluciones para empresas y profesionales</div>
          <h1 className="font-heading text-3xl font-black tracking-tight sm:text-5xl">Selección de talento, <span className="bg-gradient-to-r from-[#00A9A3] to-blue-500 bg-clip-text text-transparent">impulso laboral y liderazgo</span> en España y Latam</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">Una propuesta clara para incorporar talento, consolidar equipos y acompañar decisiones profesionales importantes.</p>
        </Reveal>

        <CompactServicesGrid onNavigate={onNavigate} />
        <div id="areas-especializacion" className="mt-16 scroll-mt-28"><AreasEspecializacionSection onNavigate={onNavigate} /></div>
        <div className="mt-16"><SpecializationSectorsSection onNavigate={onNavigate} /></div>

        <section className={`mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border p-8 text-center shadow-2xl sm:flex-row sm:text-left ${theme === 'dark' ? 'border-[#00A9A3]/30 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900' : 'border-slate-200 bg-white'}`}>
          <div><h2 className="font-heading text-xl font-bold">¿No sabes qué solución encaja mejor?</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Conversemos sobre tu necesidad y definamos el mejor siguiente paso.</p></div>
          <button type="button" onClick={() => onNavigate('/contacto')} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-blue-600 px-5 py-3 text-xs font-extrabold text-white shadow-lg btn-spring-press"><MessageSquare className="h-4 w-4" />Contactar a un consultor<ArrowRight className="h-4 w-4" /></button>
        </section>
      </div>
    </main>
  );
};
