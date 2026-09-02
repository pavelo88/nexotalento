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

  const handleLinkClick = (path: PageRoute) => {
    onNavigate(path);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Top micro bar removed for cleaner Apple-style look */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('/')}
            className="flex items-center focus:outline-none text-left group transition-transform hover:scale-[1.02]"
            aria-label="Ir a página de inicio Nexo Talentos"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Grouped Navigation Menu (Clean & Uncluttered) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navegación principal">
            
            {/* 1. Inicio */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentPath === '/' 
                  ? theme === 'dark'
                    ? 'text-cyan-300 bg-cyan-950/60 font-bold' 
                    : 'text-cyan-900 bg-cyan-100 font-extrabold'
                  : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>

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
                    onClick={() => handleLinkClick('/servicios#executive')}
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
                    onClick={() => handleLinkClick('/servicios#tech')}
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
                    onClick={() => handleLinkClick('/servicios#rpo')}
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

            {/* 3. Vacantes */}
            <button
              onClick={() => handleLinkClick('/vacantes')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 ${
                currentPath === '/vacantes' 
                  ? theme === 'dark'
                    ? 'text-cyan-300 bg-slate-800/50' 
                    : 'text-slate-900 bg-slate-100'
                  : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              Vacantes
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </button>

            {/* 4. Herramientas IA Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('ia')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentPath === '/guia-salarial' || currentPath === '/calculadora-roi' || activeDropdown === 'ia'
                    ? theme === 'dark' ? 'text-cyan-300 bg-cyan-950/60 font-bold' : 'text-cyan-900 bg-cyan-100 font-extrabold'
                    : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <Bot className="w-4 h-4 text-cyan-500" />
                <span>Herramientas IA</span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 px-1.5 py-0.5 rounded font-extrabold">24/7</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'ia' ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>

              {activeDropdown === 'ia' && (
                <div className={`absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl border p-2 animate-fadeIn z-50 ${
                  theme === 'dark' 
                    ? 'bg-slate-950/95 border-slate-800 text-slate-100 backdrop-blur-2xl' 
                    : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-2xl'
                }`}>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenAIAgent('headhunter');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-800 dark:text-cyan-300">
                        Agentes IA Reclutadores
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Consultas 24/7 de perfiles, roles y estrategia.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenCVAnalyzer();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                      <FileSearch className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        Auditor de CV con IA
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Diagnóstico competencial y adecuación salarial.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenJobSpecGenerator();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                        Generador de Job Descriptions
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Crea perfiles ejecutivos optimizados para reclutamiento.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('/guia-salarial')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        Guía Salarial España 2026
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Bandas salariales, fijos, variables y beneficios.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleLinkClick('/calculadora-roi')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        Calculadora Coste de Vacante
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Estima el impacto financiero de una posición desierta.
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Vacantes */}
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

          {/* Right Action Cluster: Theme Toggle + Primary CTA + Mobile Menu */}
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

            {/* Primary Action Button (Scrolls to interactive requirement builder) */}
            <button
              onClick={() => {
                if (currentPath !== '/') {
                  handleLinkClick('/');
                  setTimeout(() => {
                    const el = document.getElementById('solicitar-talento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                } else {
                  const el = document.getElementById('solicitar-talento');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/25 transition-all hover:scale-[1.03] btn-spring-press group cursor-pointer"
            >
              <span>Solicitar Talento</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
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
            <button
              onClick={() => handleLinkClick('/por-que-elegirnos')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/por-que-elegirnos' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Por Qué Elegirnos
            </button>
            <button
              onClick={() => handleLinkClick('/proceso')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/proceso' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Método en 18 Días
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
              onClick={() => handleLinkClick('/guia-salarial')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/guia-salarial' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Guía Salarial 2026
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
              onClick={() => handleLinkClick('/testimonios')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold ${
                currentPath === '/testimonios' ? 'bg-cyan-500 text-slate-950' : theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'
              }`}
            >
              Casos de Éxito
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIAgent('headhunter');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Agente Headhunter IA (Chat 24/7)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCVAnalyzer();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <FileSearch className="w-4 h-4 text-indigo-400" />
              <span>Auditoría de CV con IA</span>
            </button>

            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20consultar%20con%20un%20Senior%20Talent%20Partner"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Directo (+34 614 143 763)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPath !== '/') {
                  handleLinkClick('/');
                  setTimeout(() => {
                    const el = document.getElementById('solicitar-talento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                } else {
                  const el = document.getElementById('solicitar-talento');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg btn-spring-press cursor-pointer"
            >
              <span>Configurar Requerimiento de Talento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
