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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (path: string) => {
    onNavigate(path as PageRoute);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      id="main-header"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl py-2.5'
            : 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-xl py-2.5'
          : theme === 'dark'
            ? 'bg-slate-950/60 backdrop-blur-md border-b border-slate-800/40 py-3.5'
            : 'bg-white/75 backdrop-blur-md border-b border-slate-200/80 py-3.5'
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
            <Logo size="md" />
          </button>

          {/* Desktop Grouped Navigation Menu (Clean & Uncluttered) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navegación principal">
            
            {/* 2. Servicios Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('servicios')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                  currentPath === '/servicios' || activeDropdown === 'servicios'
                    ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                    : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'servicios' ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>

              {activeDropdown === 'servicios' && (
                <div className={`absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl border p-2 animate-fadeIn z-50 ${
                  theme === 'dark' 
                    ? 'bg-slate-950/95 border-slate-800 text-slate-100 backdrop-blur-2xl' 
                    : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-2xl'
                }`}>
                  <button
                    onClick={() => handleLinkClick('/servicios#executive-search')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                        Executive Search &amp; C-Level
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 px-1.5 py-0.2 rounded font-extrabold">18 Días</span>
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Caza confidencial para CEOs, CFOs, CTOs y Directores.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('/servicios#tech-digital')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                        Selección Tech &amp; Digital
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Tech Leads, Desarrolladores, IA, DevOps y Product.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('/servicios#rpo-scaleup')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        RPO &amp; Escalado de Equipos
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Externalización de reclutamiento para scaleups y aperturas.
                      </p>
                    </div>
                  </button>

                  <div className={`mt-1.5 pt-1.5 border-t px-2 flex items-center justify-between ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <button
                      onClick={() => handleLinkClick('/servicios')}
                      className="text-xs text-cyan-800 dark:text-cyan-300 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Ver catálogo completo de soluciones</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Buscar Personal (Pestaña dedicada y funcional hacia /proceso) */}
            <button
              id="nav-buscar-personal-btn"
              onClick={() => handleLinkClick('/proceso')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentPath === '/proceso'
                  ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                  : theme === 'dark' ? 'text-slate-200 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-500" />
              <span>Buscar Personal</span>
            </button>

            {/* 4. Vacantes (Para candidatos) */}
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentPath === '/vacantes' 
                  ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                  : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <span>Vacantes</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* 5. Calculadora de Coste de Vacante */}
            <button
              onClick={() => handleLinkClick('/calculadora-roi')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentPath === '/calculadora-roi' 
                  ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                  : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-500" />
              <span>Calculadora ROI</span>
            </button>

            {/* 6. Contacto */}
            <button
              onClick={() => handleLinkClick('/contacto')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentPath === '/contacto'
                  ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                  : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Contacto
            </button>

          </nav>

          {/* Right Action Cluster: Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dark/Light Mode Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-colors ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-slate-800 text-slate-200' 
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto ${
          theme === 'dark' 
            ? 'bg-slate-950/98 border-slate-800 text-slate-100' 
            : 'bg-white/98 border-slate-200 text-slate-900'
        }`}>
          
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            > 
              Inicio
            </button>
            <button
              onClick={() => handleLinkClick('/servicios')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/servicios' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Servicios de Selección
            </button>

            {/* Buscar Personal (Corregido para ir siempre a /proceso) */}
            <button
              onClick={() => handleLinkClick('/proceso')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between ${
                currentPath === '/proceso' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-50 text-cyan-900 border border-cyan-200'
              }`}
            >
              <span>Buscar Personal</span>
              <Users className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/vacantes' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Vacantes Activas
            </button>
            <button
              onClick={() => handleLinkClick('/calculadora-roi')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/calculadora-roi' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Calculadora de Costes
            </button>
            <button
              onClick={() => handleLinkClick('/contacto')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/contacto' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
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