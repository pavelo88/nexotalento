import React from 'react';
import { CostCalculatorSection } from '../components/CostCalculatorSection';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, Calculator } from 'lucide-react';

interface CalculadoraRoiPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const CalculadoraRoiPage: React.FC<CalculadoraRoiPageProps> = ({
  onNavigate
}) => {
  const { theme } = useTheme();

  return (
    <div className={`pt-24 sm:pt-28 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Embedded Calculator */}
        <CostCalculatorSection />

      </div>
    </div>
  );
};

