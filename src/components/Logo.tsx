import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  forceDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = false,
  showSubtitle = false,
  forceDark = false 
}) => {
  const { theme } = useTheme();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const isDark = forceDark || theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="nexo-brand-logo">
      {/* Official NT Monogram / Isotipo Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {forceDark ? (
          <img 
            src="/icon-dark.png" 
            alt="Nexo Talento Logo" 
            width="44"
            height="44"
            decoding="async"
            className="w-full h-full object-contain" 
          />
        ) : (
          <>
            <img 
              src="/icon-light.png" 
              alt="Nexo Talento Logo" 
              width="44"
              height="44"
              decoding="async"
              className="w-full h-full object-contain dark:hidden" 
            />
            <img 
              src="/icon-dark.png" 
              alt="Nexo Talento Logo" 
              width="44"
              height="44"
              decoding="async"
              className="w-full h-full object-contain hidden dark:block" 
            />
          </>
        )}
      </div>

      {/* Brand Typography (Only rendered if showText is explicitly true) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span 
              className={`font-black tracking-tight font-heading transition-colors ${titleSizes[size]} ${
                forceDark ? 'text-white' : 'text-[#082041] dark:text-white'
              }`}
            >
              NEXO
            </span>
            <span className={`font-bold tracking-wide text-[#00A9A3] font-heading ${titleSizes[size]}`}>
              TALENTO
            </span>
          </div>
          {showSubtitle && (
            <span className={`text-[8px] sm:text-[9.5px] uppercase font-semibold tracking-wider mt-0.5 flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Contactamos Talento con Oportunidades
            </span>
          )}
        </div>
      )}
    </div>
  );
};

