import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  forceDark?: boolean;
  monochromeWhite?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true,
  showSubtitle = true,
  forceDark = false,
  monochromeWhite = false
}) => {
  const { theme } = useTheme();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[7px] sm:text-[8px]',
    md: 'text-[7.5px] sm:text-[9px]',
    lg: 'text-[10px]',
  };

  const isDark = forceDark || theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="nexo-brand-logo">
      {/* Official NT Monogram / Isotipo Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {monochromeWhite ? (
          <img 
            src="/icon-dark.png" 
            alt="Nexo Talento Logo" 
            width="44"
            height="44"
            decoding="async"
            className="w-full h-full object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity" 
          />
        ) : forceDark ? (
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

      {/* Brand Typography (NEXO TALENTO + Slogan) */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span 
              className={`font-black tracking-tight font-heading transition-colors ${titleSizes[size]} ${
                monochromeWhite
                  ? 'text-white'
                  : forceDark
                    ? 'text-white'
                    : 'text-[#0a192f] dark:text-white'
              }`}
            >
              NEXO
            </span>
            <span 
              className={`font-bold tracking-wide font-heading ${titleSizes[size]} ${
                monochromeWhite
                  ? 'text-white'
                  : 'text-[#00A9A3]'
              }`}
            >
              TALENTO
            </span>
          </div>

          {showSubtitle && (
            <span 
              className={`uppercase font-bold tracking-[0.08em] mt-1 flex items-center gap-1 leading-none ${subtitleSizes[size]} ${
                monochromeWhite 
                  ? 'text-slate-400' 
                  : isDark 
                    ? 'text-slate-400' 
                    : 'text-slate-500'
              }`}
            >
              Contactamos Talento con Oportunidades
            </span>
          )}
        </div>
      )}
    </div>
  );
};
