import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = true }) => {
  const { theme } = useTheme();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const isDark = theme === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#082041';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="nexo-brand-logo">
      {/* Official NT Monogram / Isotipo Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[#00A9A3] rounded-xl blur-md opacity-30 dark:opacity-40" />
        
        <div className={`relative w-full h-full rounded-xl border shadow-sm flex items-center justify-center p-1.5 overflow-hidden transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* N: Left Vertical Bar (#082041 in light mode, #FFFFFF in dark mode) */}
            <rect 
              x="60" 
              y="50" 
              width="70" 
              height="380" 
              rx="35" 
              fill={navyColor}
            />

            {/* N: Diagonal Bar */}
            <path 
              d="M95 50 L375 390 C392 410 388 438 368 452 C348 465 320 460 305 440 L35 110 C18 90 22 62 42 48 C62 35 90 40 95 50 Z" 
              fill={navyColor}
            />

            {/* T: Horizontal Crossbar (#00A9A3 Nexo Teal) */}
            <rect x="180" y="50" width="260" height="70" rx="35" fill="#00A9A3" />

            {/* T: Vertical Stem (#00A9A3 Nexo Teal) */}
            <rect x="275" y="100" width="70" height="230" rx="35" fill="#00A9A3" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-black tracking-tight font-heading transition-colors ${titleSizes[size]}`}
            style={{ color: navyColor }}
          >
            NEXO
          </span>
          <span className={`font-bold tracking-wide text-[#00A9A3] font-heading ${titleSizes[size]}`}>
            TALENTOS
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[8px] sm:text-[9.5px] uppercase font-semibold tracking-wider mt-0.5 flex items-center gap-1 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A9A3] animate-ping inline-block" />
            Contactamos Talento con Oportunidades
          </span>
        )}
      </div>
    </div>
  );
};

