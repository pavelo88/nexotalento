import React from 'react';
import { Hero } from '../components/Hero';
import { BragBar } from '../components/BragBar';
import { B2BRequirementWizard } from '../components/B2BRequirementWizard';
import { FeaturedVacanciesSummary } from '../components/FeaturedVacanciesSummary';
import { LatamEliteTalentSection } from '../components/LatamEliteTalentSection';
import { ServicesSection } from '../components/ServicesSection';
import { MethodologySection } from '../components/MethodologySection';
import { AIAgentsTeaser } from '../components/AIAgentsTeaser';
import { BlogTeaserSection } from '../components/BlogTeaserSection';
import { CostCalculatorTeaser } from '../components/CostCalculatorTeaser';
import { SuccessStories } from '../components/SuccessStories';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { PageRoute, AgentType } from '../types';

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
    <div>
      {/* 1. Hero Section (Split Screen Desktop + Mobile CTAs) */}
      <Hero
        onOpenAIAgent={onOpenAIAgent}
        onOpenCVAnalyzer={onOpenCVAnalyzer}
        onNavigate={onNavigate}
      />

      {/* 2. Brag Bar (Credibility Metrics & Corporate Logos) */}
      <BragBar />

      {/* 3. Executive Interactive Requirement Wizard (Fast 3-step configurator) */}
      <div id="solicitar-talento">
        <B2BRequirementWizard onOpenContact={() => onNavigate('/contacto')} />
      </div>

      {/* 4. Candidate Jobs Summary (Compact 4-position preview linking to /vacantes) */}
      <FeaturedVacanciesSummary
        onNavigate={onNavigate}
        onOpenCVAnalyzer={onOpenCVAnalyzer}
      />

      {/* 5. Special Editorial Report: LatAm Elite Talent & Nearshore Cost Arbitrage Hub */}
      <LatamEliteTalentSection
        onNavigate={onNavigate}
        onOpenContact={() => onNavigate('/contacto')}
      />

      {/* 6. Services Section (Mobile: Infinite Carousel | Desktop: Compact 3-service grid + Link to /servicios) */}
      <ServicesSection
        onOpenAIAgent={onOpenAIAgent}
        onOpenJobSpecGenerator={onOpenJobSpecGenerator}
        onViewAllServices={() => onNavigate('/servicios')}
      />

      {/* 7. Methodology Executive Summary (Compact 4 Steps + Link to /proceso) */}
      <MethodologySection onNavigateToProcess={() => onNavigate('/proceso')} />

      {/* 8. AI Agents Interactive Teaser (Compact preview + Link to /agentes-ia) */}
      <AIAgentsTeaser
        onNavigate={onNavigate}
        onOpenAIAgent={onOpenAIAgent}
      />

      {/* 9. Blog & Regulatory Insights 2026 Summary (Compact 3 cards + Link to /blog) */}
      <BlogTeaserSection
        onNavigate={onNavigate}
        onOpenAIAgent={onOpenAIAgent}
      />

      {/* 10. Vacancy Cost & ROI Calculator Teaser (Compact instant calculation + Link to /calculadora-roi) */}
      <CostCalculatorTeaser onNavigate={onNavigate} />

      {/* 11. Success Stories & Audited Testimonials (Compact 3 cards + Link to /testimonios) */}
      <SuccessStories onNavigateToTestimonials={() => onNavigate('/testimonios')} />

      {/* 12. FAQ Section with Structured Accordions */}
      <FAQSection />

      {/* 13. Contact Section */}
      <ContactSection />
    </div>
  );
};
