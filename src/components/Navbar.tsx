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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const hasNavbarSurface = isScrolled || mobileMenuOpen || activeDropdown !== null;
  const headerUsesDarkBrand = theme === 'dark' || ((currentPath === '/' || currentPath === '/jobhunting') && !hasNavbarSurface);
  const isTransparentDarkHero = (currentPath === '/' || currentPath === '/jobhunting') && !hasNavbarSurface;
  const navItemClass = (isActive: boolean) => `px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 cursor-pointer ${
    isActive
      ? hasNavbarSurface && theme === 'light' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-800 text-white font-bold'
      : hasNavbarSurface && theme === 'light'
        ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
        : isTransparentDarkHero
          ? 'text-white drop-shadow-md hover:text-cyan-200 hover:bg-white/10'
          : 'text-slate-900 hover:text-slate-950 hover:bg-slate-100/80'
  }`;

  useEffect(() => {
    const handleScroll = () => {
      // El header permanece transparente durante el arranque del hero.
      // La superficie aparece cuando el contenido ya pasó una parte visible de la pantalla.
      setIsScrolled(window.scrollY > 72);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setActiveDropdown((previous) => (previous === name ? null : name));
  };

  return (
    <header
      id="main-header"
      ref={navRef}
      className={`nexo-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasNavbarSurface
          ? theme === 'dark'
            ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl py-2.5'
            : 'bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-xl py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
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
            
            <div className="relative">
              <button
                onClick={() => toggleDropdown('servicios')}
                className={`${navItemClass(currentPath === '/servicios' || activeDropdown === 'servicios')} flex items-center gap-1`}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'servicios' ? 'rotate-180 text-[#00E5C9]' : ''}`} />
              </button>

              {activeDropdown === 'servicios' && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 text-slate-100 shadow-2xl backdrop-blur-2xl animate-fadeIn z-50">
                  <button
                    onClick={() => handleLinkClick('/servicios#executive-search')}
                    className="w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group cursor-pointer hover:bg-slate-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5"><Briefcase className="w-4 h-4" /></div>
                    <div><div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">Executive Search &amp; C-Level <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-extrabold">18 Días</span></div><p className="text-[11px] leading-snug mt-0.5 text-slate-400">Caza confidencial para CEOs, CFOs, CTOs y Directores.</p></div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('/servicios#tech-digital')}
                    className="w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group cursor-pointer hover:bg-slate-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5"><Sparkles className="w-4 h-4" /></div>
                    <div><div className="text-xs font-bold text-blue-300">Selección Tech &amp; Digital</div><p className="text-[11px] leading-snug mt-0.5 text-slate-400">Tech Leads, Desarrolladores, IA, DevOps y Product.</p></div>
                  </button>
                  <button
                    onClick={() => handleLinkClick('/servicios#rpo-scaleup')}
                    className="w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group cursor-pointer hover:bg-slate-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5"><Users className="w-4 h-4" /></div>
                    <div><div className="text-xs font-bold text-indigo-300">RPO &amp; Escalado de Equipos</div><p className="text-[11px] leading-snug mt-0.5 text-slate-400">Externalización de reclutamiento para scaleups y aperturas.</p></div>
                  </button>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 px-2"><button onClick={() => handleLinkClick('/servicios')} className="text-xs text-cyan-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"><span>Ver catálogo completo de soluciones</span><ArrowRight className="w-3 h-3" /></button></div>
                </div>
              )}
            </div>

            {/* 2. Buscar Personal (Para empresas) */}
            <button
              id="nav-buscar-personal-btn"
              onClick={() => handleLinkClick('/proceso')}
              className={navItemClass(currentPath === '/proceso')}
            >
              Buscar Personal
            </button>

            {/* 3. Vacantes (Para candidatos) */}
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={navItemClass(currentPath === '/vacantes')}
            >
              Vacantes
            </button>

            <button
              onClick={() => handleLinkClick('/jobhunting')}
              className={navItemClass(currentPath === '/jobhunting')}
            >
              Tu próximo empleo
            </button>

            {/* Calculadora ROI conservada como ruta interna, oculta de la navegación pública. */}

            {/* 6. Contacto */}
            <button
              onClick={() => handleLinkClick('/contacto')}
              className={navItemClass(currentPath === '/contacto')}
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
              className="nexo-theme-toggle p-2 rounded-xl border border-slate-800 bg-slate-900/90 text-amber-400 transition-all duration-200 focus:outline-none cursor-pointer hover:bg-slate-800"
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
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="nexo-mobile-drawer lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-3 text-slate-100 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 border-b border-slate-800/80 pb-3">
            <button
              onClick={() => handleLinkClick('/contacto')}
              className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-3 py-3 text-left text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-950/30"
            >
              <span className="mb-1 block text-[9px] uppercase tracking-[0.12em] text-slate-800/70">Empresas</span>
              Necesito contratar talento
            </button>
            <button
              onClick={() => handleLinkClick('/crear-perfil')}
              className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-3 text-left text-xs font-extrabold text-cyan-100"
            >
              <span className="mb-1 block text-[9px] uppercase tracking-[0.12em] text-cyan-200/70">Profesionales</span>
              Crear mi perfil
            </button>
          </div>
          
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
            {/*
            <button
              onClick={() => handleLinkClick('/calculadora-roi')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/calculadora-roi' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              Calculadora de Costes
            </button>
            */}
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
