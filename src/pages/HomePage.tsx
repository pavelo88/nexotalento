import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { BragBar } from '../components/BragBar';
import { MetricStatsSection } from '../components/MetricStatsSection';
import { PageRoute, AgentType } from '../types';
import { NexoCommunitySection } from '../components/NexoCommunitySection';

// Lazy loaded components for aggressive initial load code-splitting
const FeaturedVacanciesSummary = lazy(() => import('../components/FeaturedVacanciesSummary').then(m => ({ default: m.FeaturedVacanciesSummary })));
// const MethodologySection = lazy(() => import('../components/MethodologySection').then(m => ({ default: m.MethodologySection })));
const SuccessStories = lazy(() => import('../components/SuccessStories').then(m => ({ default: m.SuccessStories })));
const FAQSection = lazy(() => import('../components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('../components/ContactSection').then(m => ({ default: m.ContactSection })));
const SpecializationSectorsSection = lazy(() => import('../components/SpecializationSectorsSection').then(m => ({ default: m.SpecializationSectorsSection })));
const AreasEspecializacionSection = lazy(() => import('../components/AreasEspecializacionSection').then(m => ({ default: m.AreasEspecializacionSection })));
const JobhuntingTeaserSection = lazy(() => import('../components/JobhuntingTeaserSection').then(m => ({ default: m.JobhuntingTeaserSection })));

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: AgentType) => void;
  onOpenCVAnalyzer: () => void;
  onOpenJobSpecGenerator: () => void;
  selectedAgentType?: AgentType;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAIAgent,
  onOpenCVAnalyzer,
  onOpenJobSpecGenerator
}) => {
  return (
    <div className="nexo-home-shell w-full relative min-h-screen overflow-x-clip bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

      {/* 1. Zona Hero + Marcas (Con fondo arquitectónico nítido, luminoso y visible) */}
      <div className="nexo-hero-stage relative overflow-hidden bg-slate-950">
        {/* Fondo fotográfico arquitectónico visible y claro */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95"
            alt="Atmósfera corporativa Nexo Talento"
            className="nexo-hero-photo w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/90" />
        </div>

        <div className="relative z-10">
          <Hero
            onOpenAIAgent={onOpenAIAgent}
            onOpenCVAnalyzer={onOpenCVAnalyzer}
            onNavigate={onNavigate}
          />
          <BragBar />
        </div>
      </div>

      <div className="relative z-10">

        {/* 3. Métricas Clave de Desempeño (Garantía, Retención, Terna y Vacantes) */}
        <MetricStatsSection />

        {/* Lazy-loaded sections with zero initial bundle footprint */}
        <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>

          {/* 4. Acompañamiento para candidatos, antes de explorar oportunidades */}
          <JobhuntingTeaserSection onNavigate={onNavigate} />

          {/* 5. Vacantes en Selección Inmediata (Carrusel Interactivo Oficial) */}
          <FeaturedVacanciesSummary
              onNavigate={onNavigate}
              onOpenCVAnalyzer={onOpenCVAnalyzer}
            />

          {/* Metodología de Selección Ágil & Predictiva: sección conservada en código,
              oculta de la portada para no repetir la propuesta de valor del hero. */}
          {/* <MethodologySection onNavigateToProcess={() => onNavigate('/proceso')} /> */}

          {/* 6. Áreas de Especialización Oficiales (Selección, Executive Search, Headhunting, etc.) */}
          <AreasEspecializacionSection onNavigate={onNavigate} />

          {/* 7. Áreas de Especialización - 7 Sectores Productivos Clave */}
          <SpecializationSectorsSection onNavigate={onNavigate} />

          {/* 8. Success Stories & Audited Testimonials */}
          <SuccessStories onNavigateToTestimonials={() => onNavigate('/testimonios')} />

          <NexoCommunitySection onNavigate={onNavigate} />

          {/* 9. FAQ Section */}
          <FAQSection />

          {/* 10. Contact Section (Con invitación directa a WhatsApp y llamada) */}
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
};
