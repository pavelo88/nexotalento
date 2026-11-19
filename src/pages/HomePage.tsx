import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { BragBar } from '../components/BragBar';
import { PageRoute, AgentType } from '../types';

// Lazy loaded components for aggressive initial load code-splitting
// const B2BRequirementWizard = lazy(() => import('../components/B2BRequirementWizard').then(m => ({ default: m.B2BRequirementWizard })));
const FeaturedVacanciesSummary = lazy(() => import('../components/FeaturedVacanciesSummary').then(m => ({ default: m.FeaturedVacanciesSummary })));
// const LatamEliteTalentSection = lazy(() => import('../components/LatamEliteTalentSection').then(m => ({ default: m.LatamEliteTalentSection })));
const ServicesSection = lazy(() => import('../components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const MethodologySection = lazy(() => import('../components/MethodologySection').then(m => ({ default: m.MethodologySection })));
// PRESERVADO COMENTADO SEGÚN REQUERIMIENTO:
// const AIAgentsTeaser = lazy(() => import('../components/AIAgentsTeaser').then(m => ({ default: m.AIAgentsTeaser })));
// const CostCalculatorTeaser = lazy(() => import('../components/CostCalculatorTeaser').then(m => ({ default: m.CostCalculatorTeaser })));
//const SalaryComparisonSection = lazy(() => import('../components/SalaryComparisonSection').then(m => ({ default: m.SalaryComparisonSection })));
const SuccessStories = lazy(() => import('../components/SuccessStories').then(m => ({ default: m.SuccessStories })));
const FAQSection = lazy(() => import('../components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('../components/ContactSection').then(m => ({ default: m.ContactSection })));
const SpecializationSectorsSection = lazy(() => import('../components/SpecializationSectorsSection').then(m => ({ default: m.SpecializationSectorsSection })));
const AreasEspecializacionSection = lazy(() => import('../components/AreasEspecializacionSection').then(m => ({ default: m.AreasEspecializacionSection })));

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: AgentType) => void;
  onOpenCVAnalyzer: () => void;
  onOpenJobSpecGenerator: () => void;
  selectedAgentType?: AgentType;
}

// Helper para montaje progresivo sin bloquear el hilo principal (TBT < 50ms y DOM optimizado)
const DeferredMount: React.FC<{ children: React.ReactNode; placeholderClass?: string }> = ({
  children,
  placeholderClass = 'min-h-[250px]'
}) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    // CORRECCIÓN: Se eliminó la clase "content-auto" que causaba saltos de scroll en móviles
    <div ref={ref} className={shouldRender ? '' : placeholderClass}>
      {shouldRender ? children : null}
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAIAgent,
  onOpenCVAnalyzer,
  onOpenJobSpecGenerator
}) => {
  // Se eliminó la animación de scroll reveal compleja a petición del usuario para garantizar visibilidad

  return (
    // CORRECCIÓN: Se eliminaron las clases space-y-16 sm:space-y-10 sm:space-y-14 que sumaban 
    // márgenes excesivos a los paddings propios de las secciones.
    <div className="lg:px-[8%] xl:px-[12%] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* 1. Hero Section (Eagerly loaded for instant LCP/FCP) */}
      <Hero
        onOpenAIAgent={onOpenAIAgent}
        onOpenCVAnalyzer={onOpenCVAnalyzer}
        onNavigate={onNavigate}
      />

      {/* 2. Brag Bar (Eagerly loaded for immediate credibility) */}
      <BragBar />

      {/* 3. Vacantes en Selección Inmediata (4 Procesos Activos en Cuadrícula Directa) */}
      <FeaturedVacanciesSummary
        onNavigate={onNavigate}
        onOpenCVAnalyzer={onOpenCVAnalyzer}
      />

      {/* Lazy-loaded sections with zero initial bundle footprint */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>
       
        {/* 4. Methodology Executive Summary (Terna en 18 días y garantía 3 a 6 meses) */}
        <MethodologySection onNavigateToProcess={() => onNavigate('/proceso')} />

        {/* 5. Áreas de Especialización Oficiales (Imagen 3 del cliente: Selección, Executive Search, Headhunting, etc.) */}
        <AreasEspecializacionSection onNavigate={onNavigate} />
       
        {/* Services Section (Headhunting directivo y tecnológico) */}
        <ServicesSection
          onOpenAIAgent={onOpenAIAgent}
          onOpenJobSpecGenerator={onOpenJobSpecGenerator}
          onViewAllServices={() => onNavigate('/servicios')}
        />

        {/* Áreas de Especialización - 7 Sectores Productivos Clave */}
        <SpecializationSectorsSection onNavigate={onNavigate} />

        {/* Success Stories & Audited Testimonials */}
        <SuccessStories onNavigateToTestimonials={() => onNavigate('/testimonios')} />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Contact Section (Con invitación directa a WhatsApp y llamada) */}
        <ContactSection />
      </Suspense>
    </div>
  );
};