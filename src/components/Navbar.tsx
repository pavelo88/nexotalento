import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  Briefcase, 
  Calculator, 
  TrendingUp, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  WandSparkles,
  FileSearch, 
  ChevronDown,
  ShieldCheck, 
  Users, 
  Award, 
  Clock, 
  MessageSquare,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentPath: PageRoute;
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenCVAnalyzer: () => void;
  onOpenJobSpecGenerator: () => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath,
  onNavigate,
  onOpenAIAgent, 
  onOpenCVAnalyzer,
  onOpenJobSpecGenerator,
  onOpenConcierge
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // La navegación conserva la misma firma navy en ambos temas. El tema claro
  // queda reservado para el contenido, no para diluir la identidad de marca.
  const headerUsesDarkBrand = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    onNavigate(path as PageRoute);
    setMobileMenuOpen(false);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 ${
        isScrolled ? 'py-2.5 shadow-2xl shadow-slate-950/35' : 'py-3.5 shadow-lg shadow-slate-950/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('/')}
            className="flex items-center focus:outline-none text-left group transition-transform hover:scale-[1.02]"
            aria-label="Ir a página de inicio Nexo Talento"
          >
            <Logo size="md" showText={true} showSubtitle={true} forceDark={headerUsesDarkBrand} />
          </button>

          {/* Desktop Navigation Links (Consistent, Unified Apple-Style System) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
            
            <button
              onClick={() => handleLinkClick('/servicios')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
                currentPath === '/servicios' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Servicios
            </button>

            {/* 2. Buscar Personal (Para empresas) */}
            <button
              id="nav-buscar-personal-btn"
              onClick={() => handleLinkClick('/proceso')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
                currentPath === '/proceso'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Buscar Personal
            </button>

            {/* 3. Vacantes (Para candidatos) */}
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
                currentPath === '/vacantes' 
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Vacantes
            </button>

            <button
              onClick={() => handleLinkClick('/jobhunting')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
                currentPath === '/jobhunting' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Tu próximo empleo
            </button>

            {/* Calculadora ROI: conservada para uso interno, oculta de la navegación pública. */}

            {/* 6. Contacto */}
            <button
              onClick={() => handleLinkClick('/contacto')}
              className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
                currentPath === '/contacto'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contacto
            </button>

          </nav>

          {/* Right Action Cluster: Primary CTA + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* CTA disponible solo en escritorio; se oculta por completo en móviles. */}
            <button
              onClick={() => handleLinkClick('/crear-perfil')}
              className={`hidden lg:flex h-9 px-4 rounded-xl text-xs font-bold transition-all items-center gap-1.5 active:scale-95 cursor-pointer shadow-md ${
                currentPath === '/crear-perfil'
                  ? 'bg-[#00E5C9] text-slate-950 shadow-[#00E5C9]/25'
                  : 'bg-[#00A896] hover:bg-[#00C4AF] text-slate-950 shadow-[#00A896]/20'
              }`}
            >
              <WandSparkles className="w-3.5 h-3.5" />
              <span>Crear tu perfil</span>
            </button>
            
            {/* Dark/Light Mode Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900/90 text-amber-400 transition-all duration-200 focus:outline-none cursor-pointer hover:bg-slate-800"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 transition-colors cursor-pointer hover:bg-slate-800"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-3 text-slate-100 animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            > 
              Inicio
            </button>
            <button
              onClick={() => handleLinkClick('/servicios')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/servicios' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              Servicios de Selección
            </button>

            {/* Buscar Personal (Corregido para ir siempre a /proceso) */}
            <button
              onClick={() => handleLinkClick('/proceso')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                currentPath === '/proceso' ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950'
              }`}
            >
              <span>Buscar Personal</span>
              <Users className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/vacantes' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              Vacantes Activas
            </button>
            <button
              onClick={() => handleLinkClick('/jobhunting')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                currentPath === '/jobhunting' ? 'bg-cyan-500 text-slate-950' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950'
              }`}
            >
              <span>Tu próximo empleo</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            {/* Calculadora ROI: conservada para uso interno, oculta del menú móvil. */}
            <button
              onClick={() => handleLinkClick('/contacto')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/contacto' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              Contacto
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            {/* WhatsApp Directo Prioritario */}
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20consultar%20con%20un%20Senior%20Talent%20Partner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Chatear por WhatsApp (+34 614 143 763)</span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
};
