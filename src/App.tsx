import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NexoFloatingMenu } from './components/NexoFloatingMenu';
import { HomePage } from './pages/HomePage';
import { PageRoute } from './types';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from './config/company';

// Code-Splitting: Lazy load all secondary routes & heavy interactive modals
const ServiciosPage = lazy(() => import('./pages/ServiciosPage').then(m => ({ default: m.ServiciosPage })));
const PorQueElegirnosPage = lazy(() => import('./pages/PorQueElegirnosPage').then(m => ({ default: m.PorQueElegirnosPage })));
const ProcesoPage = lazy(() => import('./pages/ProcesoPage').then(m => ({ default: m.ProcesoPage })));
const TestimoniosPage = lazy(() => import('./pages/TestimoniosPage').then(m => ({ default: m.TestimoniosPage })));
const ContactoPage = lazy(() => import('./pages/ContactoPage').then(m => ({ default: m.ContactoPage })));
const VacantesPage = lazy(() => import('./pages/VacantesPage').then(m => ({ default: m.VacantesPage })));
const GuiaSalarialPage = lazy(() => import('./pages/GuiaSalarialPage').then(m => ({ default: m.GuiaSalarialPage })));
const CalculadoraRoiPage = lazy(() => import('./pages/CalculadoraRoiPage').then(m => ({ default: m.CalculadoraRoiPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
// PRESERVADO COMENTADO SEGÚN SOLICITUD DE CLIENTE:
// const AgentesIAPage = lazy(() => import('./pages/AgentesIAPage').then(m => ({ default: m.AgentesIAPage })));

const NexIAChatModal = lazy(() =>
  import('./components/NexIAChatModal').then((m) => ({ default: m.NexIAChatModal }))
);
const CVAnalyzerModal = lazy(() =>
  import('./components/CVAnalyzerModal').then((m) => ({ default: m.CVAnalyzerModal }))
);
const JobSpecGeneratorModal = lazy(() =>
  import('./components/JobSpecGeneratorModal').then((m) => ({ default: m.JobSpecGeneratorModal }))
);

function AppContent() {
  const [currentPath, setCurrentPath] = useState<PageRoute>('/');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isJobSpecModalOpen, setIsJobSpecModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [selectedAgentType, setSelectedAgentType] = useState<
    'headhunter' | 'evaluator' | 'salary' | 'advisor' | undefined
  >(undefined);
  const { theme } = useTheme();

  // Parse path on initial load & handle browser back/forward buttons
  useEffect(() => {
    const syncRouteWithLocation = () => {
      const fullPath = window.location.pathname;
      const [pathname] = fullPath.split('#');
      
      // Redirigir /agentes-ia a /servicios según solicitud del cliente
      if (pathname === '/agentes-ia') {
        window.history.replaceState({}, '', '/servicios');
        setCurrentPath('/servicios');
        return;
      }

      const validRoutes: PageRoute[] = [
        '/',
        '/servicios',
        '/por-que-elegirnos',
        '/testimonios',
        '/proceso',
        '/contacto',
        '/vacantes',
        '/guia-salarial',
        '/calculadora-roi',
        '/blog'
      ];
      if (validRoutes.includes(pathname as PageRoute)) {
        setCurrentPath(pathname as PageRoute);
      } else {
        setCurrentPath('/');
      }

      // Si hay hash inicial en la URL, hacer scroll suave al elemento
      if (window.location.hash) {
        const hashTarget = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(hashTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    };

    syncRouteWithLocation();
    window.addEventListener('popstate', syncRouteWithLocation);
    return () => window.removeEventListener('popstate', syncRouteWithLocation);
  }, []);

  // Sincronizar etiqueta canonical con la ruta activa para SEO A+ y evitar advertencias de canonicalización
  useEffect(() => {
    try {
      let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      const cleanPath = currentPath === '/' ? '' : currentPath;
      canonical.setAttribute('href', `https://nexotalento.com${cleanPath}`);
    } catch {
      // Ignorar en entornos sin DOM
    }
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    const [rawPath, hash] = path.split('#');
    const route = (rawPath || '/') as PageRoute;

    const executeScroll = () => {
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setCurrentPath(route);
        if (window.location.pathname !== route || window.location.hash !== (hash ? `#${hash}` : '')) {
          window.history.pushState({}, '', path);
        }
        executeScroll();
      });
    } else {
      setCurrentPath(route);
      if (window.location.pathname !== route || window.location.hash !== (hash ? `#${hash}` : '')) {
        window.history.pushState({}, '', path);
      }
      executeScroll();
    }
  };

  const handleOpenAIAgent = (type?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => {
    // Redirigir a WhatsApp directo con consultor de talento humano
    setSelectedAgentType(type);
    window.open(COMPANY_CONFIG.whatsappUrl, '_blank');
  };

  return (
      <div className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-950 text-slate-100' 
          : 'bg-white text-slate-900'
      }`}>
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-400/10'
        }`} />
        <div className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-400/10'
        }`} />
        <div className={`absolute bottom-1/4 -left-40 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-indigo-600/10' : 'bg-indigo-400/10'
        }`} />
      </div>

      <div className="relative z-10">
        {/* Modern Grouped Navigation Bar */}
        <Navbar 
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenAIAgent={handleOpenAIAgent}
          onOpenCVAnalyzer={() => setIsCVModalOpen(true)}
          onOpenJobSpecGenerator={() => setIsJobSpecModalOpen(true)}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="min-h-[70vh]">
          {currentPath === '/' ? (
            <HomePage
              onNavigate={handleNavigate}
              onOpenAIAgent={handleOpenAIAgent}
              onOpenCVAnalyzer={() => setIsCVModalOpen(true)}
              onOpenJobSpecGenerator={() => setIsJobSpecModalOpen(true)}
              selectedAgentType={selectedAgentType}
            />
          ) : (
            <Suspense fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-slate-400">Cargando módulo...</span>
                </div>
              </div>
            }>
              {currentPath === '/servicios' && (
                <ServiciosPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                  onOpenJobSpecGenerator={() => setIsJobSpecModalOpen(true)}
                />
              )}

              {currentPath === '/por-que-elegirnos' && (
                <PorQueElegirnosPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                />
              )}

              {currentPath === '/proceso' && (
                <ProcesoPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                />
              )}

              {currentPath === '/testimonios' && (
                <TestimoniosPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                />
              )}

              {currentPath === '/contacto' && (
                <ContactoPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                />
              )}

              {currentPath === '/vacantes' && (
                <VacantesPage
                  onNavigate={handleNavigate}
                  onOpenCVAnalyzer={() => setIsCVModalOpen(true)}
                />
              )}

              {currentPath === '/guia-salarial' && (
                <GuiaSalarialPage
                  onNavigate={handleNavigate}
                  onOpenSalaryAgent={() => handleOpenAIAgent('salary')}
                />
              )}

              {currentPath === '/calculadora-roi' && (
                <CalculadoraRoiPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPath === '/blog' && (
                <BlogPage
                  onNavigate={handleNavigate}
                  onOpenAIAgent={handleOpenAIAgent}
                />
              )}

              {/* 
               * =====================================================================
               * RUTA /agentes-ia PRESERVADA COMENTADA SEGÚN SOLICITUD DEL CLIENTE:
               * {currentPath === '/agentes-ia' && (
               *   <AgentesIAPage
               *     onNavigate={handleNavigate}
               *     onOpenAIAgent={handleOpenAIAgent}
               *   />
               * )}
               * =====================================================================
               */}
            </Suspense>
          )}
        </main>

        {/* Unified Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenAIAgent={handleOpenAIAgent}
          onOpenCVAnalyzer={() => setIsCVModalOpen(true)}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />
      </div>

      {/* Floating Center (Menu with NexIA 24/7 & Direct WhatsApp Advisor matching Image 3 Reference) */}
      <NexoFloatingMenu 
        onNavigateToContact={() => handleNavigate('/contacto')}
      />

      {/* Direct NexIA Chat Modal (Triggerable from Footer or Navigation) */}
      {isConciergeOpen && (
        <Suspense fallback={null}>
          <NexIAChatModal
            isOpen={isConciergeOpen}
            onClose={() => setIsConciergeOpen(false)}
            onNavigateToContact={() => {
              setIsConciergeOpen(false);
              handleNavigate('/contacto');
            }}
          />
        </Suspense>
      )}

      {/* CV Analyzer Modal */}
      {isCVModalOpen && (
        <Suspense fallback={null}>
          <CVAnalyzerModal
            isOpen={isCVModalOpen}
            onClose={() => setIsCVModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Job Spec Generator Modal */}
      {isJobSpecModalOpen && (
        <Suspense fallback={null}>
          <JobSpecGeneratorModal
            isOpen={isJobSpecModalOpen}
            onClose={() => setIsJobSpecModalOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
