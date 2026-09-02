import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { BragBar } from '../components/BragBar';
import { PageRoute, AgentType } from '../types';

// Lazy loaded components for aggressive initial load code-splitting
const B2BRequirementWizard = lazy(() => import('../components/B2BRequirementWizard').then(m => ({ default: m.B2BRequirementWizard })));
const FeaturedVacanciesSummary = lazy(() => import('../components/FeaturedVacanciesSummary').then(m => ({ default: m.FeaturedVacanciesSummary })));
const LatamEliteTalentSection = lazy(() => import('../components/LatamEliteTalentSection').then(m => ({ default: m.LatamEliteTalentSection })));
const ServicesSection = lazy(() => import('../components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const MethodologySection = lazy(() => import('../components/MethodologySection').then(m => ({ default: m.MethodologySection })));
const AIAgentsTeaser = lazy(() => import('../components/AIAgentsTeaser').then(m => ({ default: m.AIAgentsTeaser })));
const BlogTeaserSection = lazy(() => import('../components/BlogTeaserSection').then(m => ({ default: m.BlogTeaserSection })));
const CostCalculatorTeaser = lazy(() => import('../components/CostCalculatorTeaser').then(m => ({ default: m.CostCalculatorTeaser })));
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
        {/* 3. Executive Interactive Requirement Wizard */}
        <div id="solicitar-talento" className="py-8">
          <B2BRequirementWizard onOpenContact={() => onNavigate('/contacto')} />
        </div>

        {/* 4. Candidate Jobs Summary */}
        <FeaturedVacanciesSummary
          onNavigate={onNavigate}
          onOpenCVAnalyzer={onOpenCVAnalyzer}
        />

        {/* 5. Special Editorial Report: LatAm Elite Talent */}
        <LatamEliteTalentSection
          onNavigate={onNavigate}
          onOpenContact={() => onNavigate('/contacto')}
        />

        {/* 6. Services Section */}
        <ServicesSection
          onOpenAIAgent={onOpenAIAgent}
          onOpenJobSpecGenerator={onOpenJobSpecGenerator}
          onViewAllServices={() => onNavigate('/servicios')}
        />

        {/* 7. Methodology Executive Summary */}
        <MethodologySection onNavigateToProcess={() => onNavigate('/proceso')} />

        {/* 8. AI Agents Interactive Teaser */}
        <AIAgentsTeaser
          onNavigate={onNavigate}
          onOpenAIAgent={onOpenAIAgent}
        />

        {/* 9. Blog & Regulatory Insights */}
        <BlogTeaserSection
          onNavigate={onNavigate}
          onOpenAIAgent={onOpenAIAgent}
        />

        {/* 10. Vacancy Cost & ROI Calculator Teaser */}
        <CostCalculatorTeaser onNavigate={onNavigate} />

        {/* 11. Success Stories & Audited Testimonials */}
        <SuccessStories onNavigateToTestimonials={() => onNavigate('/testimonios')} />

        {/* 12. FAQ Section */}
        <FAQSection />

        {/* 13. Contact Section */}
        <ContactSection />
      </Suspense>
    </div>
  );
};
