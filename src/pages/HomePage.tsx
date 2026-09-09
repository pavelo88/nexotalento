import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { BragBar } from '../components/BragBar';
import { PageRoute, AgentType } from '../types';

// Lazy loaded components for aggressive initial load code-splitting
const B2BRequirementWizard = lazy(() => import('../components/B2BRequirementWizard').then(m => ({ default: m.B2BRequirementWizard })));
const FeaturedVacanciesSummary = lazy(() => import('../components/FeaturedVacanciesSummary').then(m => ({ default: m.FeaturedVacanciesSummary })));
// const LatamEliteTalentSection = lazy(() => import('../components/LatamEliteTalentSection').then(m => ({ default: m.LatamEliteTalentSection })));
const ServicesSection = lazy(() => import('../components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const MethodologySection = lazy(() => import('../components/MethodologySection').then(m => ({ default: m.MethodologySection })));
// PRESERVADO COMENTADO SEGÚN REQUERIMIENTO:
// const AIAgentsTeaser = lazy(() => import('../components/AIAgentsTeaser').then(m => ({ default: m.AIAgentsTeaser })));
// const CostCalculatorTeaser = lazy(() => import('../components/CostCalculatorTeaser').then(m => ({ default: m.CostCalculatorTeaser })));
const SalaryComparisonSection = lazy(() => import('../components/SalaryComparisonSection').then(m => ({ default: m.SalaryComparisonSection })));
const SuccessStories = lazy(() => import('../components/SuccessStories').then(m => ({ default: m.SuccessStories })));
const FAQSection = lazy(() => import('../components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('../components/ContactSection').then(m => ({ default: m.ContactSection })));

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
  // Se eliminó la animación de scroll reveal compleja a petición del usuario para garantizar visibilidad

  return (
    <div className="lg:px-[8%] xl:px-[12%] overflow-hidden space-y-16 sm:space-y-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* 1. Hero Section (Eagerly loaded for instant LCP/FCP) */}
      <Hero
        onOpenAIAgent={onOpenAIAgent}
        onOpenCVAnalyzer={onOpenCVAnalyzer}
        onNavigate={onNavigate}
      />

      {/* 2. Brag Bar (Eagerly loaded for immediate credibility) */}
      <BragBar />

      {/* Lazy-loaded sections with zero initial bundle footprint */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        
        {/* 3. Executive Interactive Requirement Wizard (Buscar Personal) */}
        <div id="solicitar-talento" className="py-6 scroll-mt-24 content-auto">
          <B2BRequirementWizard onOpenContact={() => onNavigate('/contacto')} />
        </div>

        {/* 4. Services Section (Headhunting directivo y tecnológico) */}
        <div className="content-auto">
          <ServicesSection
            onOpenAIAgent={onOpenAIAgent}
            onOpenJobSpecGenerator={onOpenJobSpecGenerator}
            onViewAllServices={() => onNavigate('/servicios')}
          />
        </div>

        {/* 5. Methodology Executive Summary (Terna en 18 días y garantía 3 a 6 meses) */}
        <div className="content-auto">
          <MethodologySection onNavigateToProcess={() => onNavigate('/proceso')} />
        </div>

        {/* 
         * =====================================================================
         * SECCIONES RETIRADAS DE LA HOME PARA EVITAR EXTENSIÓN Y FATIGA (PRESERVADAS COMENTADAS):
         * 
         * 1. Suite de Agentes IA (Retirada según solicitud del cliente):
         * <AIAgentsTeaser onNavigate={onNavigate} onOpenAIAgent={onOpenAIAgent} />
         * 
         * 2. Blog Teaser (Accesible directamente en su página dedicada /blog):
         * <BlogTeaserSection onNavigate={onNavigate} onOpenAIAgent={onOpenAIAgent} />
         * 
         * 3. Reporte Editorial LatAm:
         * <LatamEliteTalentSection onNavigate={onNavigate} onOpenContact={() => onNavigate('/contacto')} />
         * =====================================================================
         */}

        {/* 6. Comparativa Salarial España vs Remoto LATAM (Sección compacta y visual) */}
        <div className="content-auto">
          <SalaryComparisonSection onOpenContact={() => onNavigate('/contacto')} />
        </div>

        {/* 7. Carrusel Infinito de Vacantes Directivas & Tech en Selección Activa */}
        <div className="content-auto">
          <FeaturedVacanciesSummary
            onNavigate={onNavigate}
            onOpenCVAnalyzer={onOpenCVAnalyzer}
          />
        </div>

        {/* 8. Success Stories & Audited Testimonials */}
        <div className="content-auto">
          <SuccessStories onNavigateToTestimonials={() => onNavigate('/testimonios')} />
        </div>

        {/* 9. FAQ Section */}
        <div className="content-auto">
          <FAQSection />
        </div>

        {/* 10. Contact Section (Con invitación directa a WhatsApp y llamada) */}
        <div className="content-auto">
          <ContactSection />
        </div>
      </Suspense>
    </div>
  );
};
