import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { JobhuntingHero } from '../components/jobhunting/JobhuntingHero';
import { JobhuntingPainPoints } from '../components/jobhunting/JobhuntingPainPoints';
import { JobhuntingPhases } from '../components/jobhunting/JobhuntingPhases';
import { JobhuntingDifferentiators } from '../components/jobhunting/JobhuntingDifferentiators';
import { JobhuntingPricing } from '../components/jobhunting/JobhuntingPricing';
import { JobhuntingForm } from '../components/jobhunting/JobhuntingForm';
import { JobhuntingFaq } from '../components/jobhunting/JobhuntingFaq';

interface JobhuntingPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer?: () => void;
}

export const JobhuntingPage: React.FC<JobhuntingPageProps> = () => {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'exito' | 'cerrado'>('exito');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#06080B] text-slate-100' : 'bg-[#FAF8F5] text-slate-900'} transition-colors duration-300 pb-28 lg:pb-0`}>
      {/* 1. Hero con Proporción Perfecta y Fotografía Inmediata en Celulares */}
      <JobhuntingHero />

      {/* 2. ¿Es para mí? (6 dolores reales del mercado) */}
      <JobhuntingPainPoints theme={theme} />

      {/* 3. Metodología en 5 Fases (0 a 4) Stepper interactivo */}
      <JobhuntingPhases theme={theme} />

      {/* 4. En qué nos diferenciamos (Headhunters vs Coaching) */}
      <JobhuntingDifferentiators theme={theme} />

      {/* 5. Modalidades y Precios (300€ + 25% vs 450€ cerrado) */}
      <JobhuntingPricing
        theme={theme}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />

      {/* 6. Formulario de Admisión / Diagnóstico */}
      <JobhuntingForm
        theme={theme}
        selectedPlan={selectedPlan}
      />

      {/* 7. FAQs 100% auditadas del PDF */}
      <JobhuntingFaq theme={theme} />
    </div>
  );
};
