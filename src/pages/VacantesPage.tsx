import React from 'react';
import { JobsPortal } from '../components/JobsPortal';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';

interface VacantesPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer: () => void;
}

export const VacantesPage: React.FC<VacantesPageProps> = ({
  onNavigate,
  onOpenCVAnalyzer
}) => {
  const { theme } = useTheme();

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-x-clip min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Banner Callout hacia /jobhunting */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0E243A] to-[#102B45] border border-[#00A896]/40 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[#00E5C9] text-xs font-bold uppercase tracking-wider">
              <span>★ Programa ProProfile para Candidatos</span>
            </div>
            <p className="text-base sm:text-lg font-bold">
              ¿Llevas meses aplicando y tus entrevistas no se convierten en ofertas?
            </p>
            <p className="text-xs text-slate-300">
              Acompáñate de headhunters senior y psicólogos de RRHH con 95% de éxito y garantía de reactivación.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/jobhunting')}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#00A896] to-[#00C4AF] text-[#0A1826] hover:opacity-90 transition-all shrink-0 active:scale-95 shadow-md"
          >
            Conoce el Programa ProProfile
          </button>
        </div>

        {/* Embedded Jobs Portal */}
        <JobsPortal onOpenCVAnalyzer={onOpenCVAnalyzer} isFullPage={true} />
      </div>
    </div>
  );
};
