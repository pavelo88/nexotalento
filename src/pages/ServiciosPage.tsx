import React, { useState } from 'react';
import { 
  Briefcase, 
  Cpu, 
  Users, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2, 
  Clock, 
  Building2, 
  FileSpreadsheet,
  Layers,
  ChevronRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ServiciosPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
  onOpenJobSpecGenerator: () => void;
}

export const ServiciosPage: React.FC<ServiciosPageProps> = ({
  onNavigate,
  onOpenAIAgent,
  onOpenJobSpecGenerator
}) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const detailedServices = [
    {
      id: 'executive-search',
      category: 'directivo',
      title: 'Executive Search & C-Level (Caza Directa)',
      badge: 'Garantía 12 Meses • 18 Días SLA',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      description: 'Identificación, contacto confidencial y selección de Consejeros, CEOs, Directores Generales, CFOs, COOs, CMOs y Directores de Área estratégica para empresas en España y filiales internacionales.',
      targetProfiles: [
        'Chief Executive Officer (CEO) / Director General',
        'Chief Technology Officer (CTO) & Chief Information Officer (CIO)',
        'Chief Financial Officer (CFO) & Director de Finanzas',
        'Chief Operating Officer (COO) & Director de Operaciones',
        'VP of Sales & Director Comercial Internacional',
        'Chief People Officer (CPO) & Director de RRHH'
      ],
      methodology: [
        'Mapeo exhaustivo de la competencia y empresas target en España y Europa.',
        'Aproximación 100% confidencial con protocolos de discreción absolutos.',
        'Entrevistas de adecuación estratégica y encaje con el Consejo de Administración.',
        'Evaluación psicométrica 360° y contraste de referencias con ex-superiores.'
      ],
      sla: '18 Días Laborables para Terna Final',
      agentRecommendation: 'headhunter' as const
    },
    {
      id: 'tech-digital',
      category: 'tecnologia',
      title: 'Headhunting Tech, Digital & AI Specialists',
      badge: '94% Aceptación • Código & Algoritmos',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
      description: 'Reclutamiento especializado de perfiles tecnológicos de alta demanda y escasez en el mercado español y europeo, tanto en modalidad presencial como híbrida o 100% remoto.',
      targetProfiles: [
        'VP of Engineering & Engineering Managers',
        'AI / Machine Learning Engineers & Data Scientists',
        'Cloud & DevOps Architects (AWS, Azure, GCP)',
        'Senior Fullstack, Frontend & Backend Leads',
        'Cybersecurity Managers & CISOs',
        'Chief Product Officers (CPO) & Lead Product Managers'
      ],
      methodology: [
        'Headhunters con formación técnica capaces de evaluar código y arquitectura.',
        'Acceso a redes exclusivas de talento pasivo no activo en LinkedIn o InfoJobs.',
        'Negociación de esquemas de compensación flexible (equity, remotework).',
        'Pruebas técnicas y validación de proyectos reales previos.'
      ],
      sla: '14 - 18 Días Laborables',
      agentRecommendation: 'headhunter' as const
    },
    {
      id: 'rpo-scaleup',
      category: 'empresarial',
      title: 'RPO (Recruitment Process Outsourcing) & Scaleups',
      badge: 'Ahorro 45% Costes • Alta Velocidad',
      icon: Users,
      color: 'from-indigo-500 to-purple-600',
      description: 'Externalización total o modular del proceso de captación de talento para scaleups en rondas de financiación (Series A, B, C) o corporaciones que abren nuevos hubs en Madrid y Barcelona.',
      targetProfiles: [
        'Equipos completos de ingeniería y producto',
        'Fuerzas comerciales y ejecutivos de cuentas B2B',
        'Especialistas de operaciones y atención al cliente',
        'Mandos intermedios y jefes de proyecto'
      ],
      methodology: [
        'Implantación de Talent Acquisition Managers dedicados en tu empresa.',
        'Integración con tus sistemas ATS y optimización de Employer Branding.',
        'Reducción drástica del coste por contratación (Cost-per-Hire).',
        'Dashboard de métricas en tiempo real con pipeline de candidatos.'
      ],
      sla: 'Implantación en 5 Días • Contrataciones Continuas',
      agentRecommendation: 'advisor' as const
    },
    {
      id: 'assessment-center',
      category: 'consultoria',
      title: 'Assessment Center & Diagnóstico Directivo con IA',
      badge: 'Precisión Predictiva • Error 1.6%',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      description: 'Auditoría integral de competencias directivas, liderazgo situacional y capacidad de toma de decisiones bajo presión mediante dinámicas de role-play y algoritmos de adecuación de IA.',
      targetProfiles: [
        'Promociones internas a comités de dirección',
        'Candidatos finalistas en procesos críticos',
        'Auditorías de talento tras fusiones y adquisiciones (M&A)',
        'Planes de sucesión para directores generales y socios'
      ],
      methodology: [
        'Simulaciones situacionales de comités de crisis y estrategia.',
        'Test psicométricos estandarizados y validados para el mercado español.',
        'Informe ejecutivo individual con matriz de fortalezas y áreas de desarrollo.',
        'Devolución constructiva (feedback) tanto a la empresa como al directivo.'
      ],
      sla: 'Informe en 48 Horas tras la Sesión',
      agentRecommendation: 'evaluator' as const
    },
    {
      id: 'compensacion-salarios',
      category: 'consultoria',
      title: 'Consultoría Salarial, Equidad & Retención',
      badge: 'Benchmark España 2026 • Legal RGPD',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      description: 'Estudios de retribución fija y variable contrastados con el mercado real de Madrid, Barcelona y principales polos económicos para fidelizar al talento clave y cumplir con las normativas de equidad.',
      targetProfiles: [
        'Comités de retribución de empresas cotizadas y familiares',
        'Fondos de Private Equity y Venture Capital',
        'Direcciones de RRHH y Compensación & Beneficios'
      ],
      methodology: [
        'Bandas salariales por percentiles (P25, P50, P75, P90).',
        'Estructuración de paquetes variables (Bonus, Phantom Shares, Stock Options).',
        'Auditoría y registro retributivo conforme a la legislación española.',
        'Estrategias de retención ante contraofertas de la competencia.'
      ],
      sla: 'Estudio Completo en 7 Días Hábiles',
      agentRecommendation: 'salary' as const
    },
    {
      id: 'interim-management',
      category: 'directivo',
      title: 'Interim Management & Dirección Temporal',
      badge: 'Incorporación en 72 Horas',
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-600',
      description: 'Directivos sénior de dilatada trayectoria para misiones urgentes y de alto impacto: reestructuraciones, suplencias en C-Level, procesos de M&A y gestión del cambio.',
      targetProfiles: [
        'Interim CEO / Director General de Transición',
        'Interim CFO para rondas de inversión o refinanciación',
        'Interim CTO para transformación digital o rescate de proyectos',
        'Interim HR Director para reestructuraciones y negociación laboral'
      ],
      methodology: [
        'Acceso inmediato a nuestra red de más de 200 Interim Managers homologados.',
        'Acuerdos flexibles por meses, hitos o dedicación parcial/completa.',
        'Alineación total con los objetivos de rentabilidad y gobernanza de la empresa.'
      ],
      sla: 'Terna Disponible en 72 Horas',
      agentRecommendation: 'advisor' as const
    },
    {
      id: 'latam-nearshore-hub',
      category: 'empresarial',
      title: 'Hub de Talento Nearshore LATAM & Arbitraje Salarial',
      badge: '55% - 62% Ahorro • Solapamiento 100%',
      icon: Users,
      color: 'from-cyan-500 via-teal-500 to-emerald-600',
      description: 'Acceso exclusivo al Top 1.8% de ingenieros de software, data scientists, controllers financieros y directivos bilingües de América Latina (Colombia, Argentina, México, Chile). Cero riesgo laboral, facturación B2B en España y máxima retención.',
      targetProfiles: [
        'Senior Fullstack, Backend (Node/Python/Go) & Cloud Architects',
        'Data Engineers, BI Analysts & Machine Learning Leads',
        'Financial Controllers & FP&A Managers Bilingües',
        'Product Managers & Customer Success Executives',
        'Directores de Operaciones & Expansión Regional'
      ],
      methodology: [
        'Criba algorítmica y técnica exhaustiva: solo el 1.8% de candidatos admitidos.',
        'Solapamiento de 4 a 6 horas diarias con el horario de España y Europa.',
        'Facturación directa y contratos mercantiles sin contingencias de Seguridad Social local.',
        'Garantía total de sustitución durante los primeros 12 meses.'
      ],
      sla: 'Terna Validada en 18 Días Hábiles',
      agentRecommendation: 'headhunter' as const
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? detailedServices 
    : detailedServices.filter(s => s.category === selectedCategory);

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/15 border border-[#00A9A3]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Catálogo Completo de Soluciones Ejecutivas &amp; Nearshore</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] to-blue-500">Executive Search &amp; Headhunting</span> en España
          </h1>
          <p className={`mt-4 text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Metodología propia que fusiona la experiencia de Consultores Sénior de selección con herramientas de Inteligencia Artificial para entregar la terna directiva en 18 días hábiles.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Todos los Servicios' },
            { id: 'directivo', label: 'C-Level & Executive Search' },
            { id: 'tecnologia', label: 'Talento Tech & Digital' },
            { id: 'empresarial', label: 'Nearshore LATAM & Scaleups' },
            { id: 'consultoria', label: 'Assessment & Salarios' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#00A9A3] text-slate-950 shadow-lg shadow-[#00A9A3]/20 scale-105'
                  : theme === 'dark'
                    ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {filteredServices.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.id}
                id={serv.id}
                className={`border rounded-3xl p-6 sm:p-10 shadow-xl transition-all duration-300 group relative overflow-hidden card-spring-hover ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-[#00A9A3]/40'
                    : 'bg-white border-slate-200 hover:border-[#00A9A3]/40 shadow-md'
                }`}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${serv.color} opacity-5 rounded-bl-full pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Service Info (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${serv.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00A9A3]/15 text-[#00A9A3] border border-[#00A9A3]/30">
                          {serv.badge}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                          {serv.title}
                        </h2>
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {serv.description}
                    </p>

                    {/* Methodology points */}
                    <div className="space-y-2 pt-2">
                      <span className={`text-xs font-bold uppercase tracking-wider block ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Metodología Aplicada:
                      </span>
                      {serv.methodology.map((m, idx) => (
                        <div key={idx} className={`flex items-start gap-2 text-xs ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 text-[#00A9A3] shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Profiles & Action (5 cols) */}
                  <div className={`lg:col-span-5 border rounded-2xl p-5 space-y-4 ${
                    theme === 'dark'
                      ? 'bg-slate-950/80 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <span className="text-xs font-bold text-[#00A9A3] uppercase tracking-wider block mb-2">
                        Perfiles Típicos Seleccionados:
                      </span>
                      <ul className={`space-y-1.5 text-xs ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {serv.targetProfiles.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00A9A3]" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200'
                    }`}>
                      <span className={`flex items-center gap-1.5 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-[#00A9A3]" /> SLA de Entrega:
                      </span>
                      <span className="text-[#00A9A3] font-bold">{serv.sla}</span>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => onOpenAIAgent(serv.agentRecommendation)}
                        className={`w-full py-2.5 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition-all btn-spring-press ${
                          theme === 'dark'
                            ? 'bg-slate-900 hover:bg-slate-800 text-[#00A9A3] border-[#00A9A3]/30'
                            : 'bg-white hover:bg-slate-50 text-[#00A9A3] border-[#00A9A3]/40 shadow-sm'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Consultar Asesor IA para este Servicio</span>
                      </button>

                      <button
                        onClick={() => onNavigate('/contacto')}
                        className="w-full py-2.5 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md btn-spring-press"
                      >
                        <span>Solicitar Presupuesto y Terna</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className={`mt-16 border rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-[#00A9A3]/30'
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-heading">
              ¿No estás seguro de qué modalidad se adapta mejor a tu vacante?
            </h3>
            <p className={`text-xs sm:text-sm ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Uno de nuestros Socios Consultores analizará tu organigrama y requerimiento de forma 100% gratuita y sin compromiso.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20asesoria%20sobre%20vuestros%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo (+34 614 143 763)</span>
            </a>

            <button
              onClick={() => {
                onNavigate('/');
                setTimeout(() => {
                  document.getElementById('solicitar-talento')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-5 py-3 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press cursor-pointer"
            >
              <span>Configurar Requerimiento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
