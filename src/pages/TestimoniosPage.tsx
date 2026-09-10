import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  MessageSquare
} from 'lucide-react';
import { PageRoute, SuccessCase } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TestimoniosPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

export const TestimoniosPage: React.FC<TestimoniosPageProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const cases: SuccessCase[] = [
    {
      id: 'fintech-cto',
      clientSector: 'Fintech & Banca Digital (Madrid)',
      position: 'Chief Technology Officer (CTO)',
      location: 'Madrid (Paseo de la Castellana)',
      timeToHire: '16 Días Laborables',
      challenge: 'Scaleup fintech con ronda Serie B de 25M€ requería un CTO con experiencia previa liderando equipos de más de 80 ingenieros y arquitectura bancaria de alta concurrencia en España.',
      solution: 'Mapeo confidencial de 42 directivos tech en activo. Criba asistida por IA y evaluación de liderazgo situacional con terna presentada en el día 14.',
      results: [
        'Incorporación exitosa en 16 días con 100% de aceptación de la oferta.',
        'El nuevo CTO escaló el equipo técnico de 25 a 70 ingenieros en 8 meses.',
        'Permanencia superior a 2 años con valoración sobresaliente del Consejo.'
      ],
      quote: 'El nivel de comprensión técnica y cultural que demostró Nexo Talento superó con creces cualquier experiencia previa con headhunters tradicionales. Entregaron perfiles de calibre C-Level real en dos semanas.',
      author: 'Alejandro Morales',
      authorRole: 'CEO & Co-Founder',
      authorCompany: 'Fintech Scaleup Madrid',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    {
      id: 'biotech-cfo',
      clientSector: 'Biotech & Pharma (Barcelona - 22@)',
      position: 'Chief Financial Officer (CFO)',
      location: 'Barcelona (Distrito 22@)',
      timeToHire: '18 Días Laborables',
      challenge: 'Compañía biotecnológica en fase de salida al BME Growth requería un CFO sénior con experiencia contrastada en auditorías Big Four, rondas institucionales y relación con inversores.',
      solution: 'Caza directa sobre directores financieros de farmacéuticas y healthtech en Cataluña y Madrid con contraste exhaustivo de 4 referencias bancarias.',
      results: [
        'CFO incorporado en el día 18 cumpliendo todos los hitos de la salida a bolsa.',
        'Ahorro del 40% respecto al coste de intermediación habitual de consultoras anglosajonas.',
        'Garantía contractual cumplida con éxito total.'
      ],
      quote: 'En un sector tan regulado y especializado como el biotecnológico, encontrar un CFO con visión de mercado y rigor técnico parecía imposible en menos de tres meses. Nexo lo logró en 18 días.',
      author: 'Dra. Meritxell Rovira',
      authorRole: 'Directora General',
      authorCompany: 'Laboratorios Biotech Barcelona',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80'
    },
    {
      id: 'retail-cmo',
      clientSector: 'Retail & E-Commerce Omnicanal (Valencia)',
      position: 'Chief Marketing & Growth Officer (CMO)',
      location: 'Valencia / Híbrido',
      timeToHire: '15 Días Laborables',
      challenge: 'Grupo retail de moda con más de 120 tiendas físicas y necesidad urgente de transformar su canal digital y acelerar su expansión internacional en Francia e Italia.',
      solution: 'Atracción de talento directivo proveniente de líderes internacionales del sector e-commerce en España, evaluando capacidad de gestión de P&L de marketing.',
      results: [
        'Crecimiento de ventas online del +64% interanual en los primeros 12 meses.',
        'Reducción del CAC en un 28% gracias a la reorganización estratégica del equipo.',
        'Premio Nacional de Transformación Digital del sector retail.'
      ],
      quote: 'Nexo Talento entendió la cultura de nuestra empresa familiar desde el primer minuto, conectándonos con un directivo de primer nivel internacional que encajó a la perfección.',
      author: 'Carlos Vicent',
      authorRole: 'Presidente Ejecutivo',
      authorCompany: 'Grupo Moda Mediterráneo',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
    },
    {
      id: 'industrial-coo',
      clientSector: 'Industria 4.0 & Logística (Bilbao)',
      position: 'Chief Operations Officer (COO)',
      location: 'País Vasco',
      timeToHire: '19 Días Laborables',
      challenge: 'Empresa manufacturera con plantas en España y Alemania necesitaba un COO con experiencia en Lean Manufacturing, digitalización de planta y gestión de más de 300 operarios.',
      solution: 'Búsqueda directa dirigida en clústeres de automoción y maquinaria pesada en el norte de España y sur de Francia con tests de liderazgo psicométrico.',
      results: [
        'Aumento del OEE (eficiencia general de equipos) del 72% al 86% en el primer año.',
        'Cero incidencias laborales y transición suave con el equipo histórico.',
        'Acompañamiento de onboarding durante el periodo de garantía contractual.'
      ],
      quote: 'La rapidez y la discreción fueron impecables. Reemplazar un puesto histórico de más de 20 años era un reto enorme y Nexo lo resolvió con maestría.',
      author: 'Iñigo Aranguren',
      authorRole: 'Consejero Delegado',
      authorCompany: 'Corporación Industrial Norte',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
    }
  ];

  const filteredCases = selectedSector === 'all'
    ? cases
    : cases.filter(c => c.clientSector.toLowerCase().includes(selectedSector.toLowerCase()));

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Glow ambient */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/15 border border-[#00A9A3]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4">
            <Star className="w-3.5 h-3.5 fill-[#00A9A3]" />
            <span>Resultados Auditados &amp; Casos Reales</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Casos de Éxito y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] to-blue-500">Testimonios de Directivos</span>
          </h1>
          <p className={`mt-4 text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Descubre cómo hemos ayudado a empresas líderes, scaleups y grupos consolidados en Madrid, Barcelona y toda España a incorporar talento C-Level de máximo impacto.
          </p>
        </div>

        {/* Verified KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className={`p-6 border rounded-3xl text-center space-y-1 ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-[#00A9A3] font-heading">98.4%</span>
            <p className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Tasa de Retención a 12 Meses</p>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>Medido sobre 240+ procesos directivos</p>
          </div>

          <div className={`p-6 border rounded-3xl text-center space-y-1 ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={`text-3xl sm:text-4xl font-black font-heading ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>18 Días</span>
            <p className="text-xs font-bold text-[#00A9A3] uppercase tracking-wider">Tiempo Medio a Terna</p>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>Frente a 65 días del promedio español</p>
          </div>

          <div className={`p-6 border rounded-3xl text-center space-y-1 ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-heading">94.8%</span>
            <p className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Aceptación de Oferta</p>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>Cierre efectivo a la primera propuesta</p>
          </div>

          <div className={`p-6 border rounded-3xl text-center space-y-1 ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-amber-500 font-heading">12 Meses</span>
            <p className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Garantía por Contrato</p>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>Reposición 100% gratuita y sin letras pequeñas</p>
          </div>
        </div>

        {/* Detailed Case Studies Cards */}
        <div className="space-y-8 mb-16">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className={`border rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 group card-spring-hover ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800 hover:border-[#00A9A3]/40'
                  : 'bg-white border-slate-200 hover:border-[#00A9A3]/50 shadow-md'
              }`}
            >
              <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div>
                  <span className="text-xs font-bold text-[#00A9A3] uppercase tracking-wider block">
                    {cs.clientSector}
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-bold font-heading mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Búsqueda Directa: {cs.position}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    theme === 'dark'
                      ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}>
                    <Clock className="w-3.5 h-3.5" /> Cerrado en {cs.timeToHire}
                  </span>
                </div>
              </div>

              {/* 3 Pillars of the Case Study */}
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b text-xs ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="space-y-2">
                  <h3 className="font-bold text-rose-500 uppercase tracking-wider text-[11px]">
                    1. El Desafío:
                  </h3>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {cs.challenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-[#00A9A3] uppercase tracking-wider text-[11px]">
                    2. La Solución Nexo:
                  </h3>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {cs.solution}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-emerald-500 uppercase tracking-wider text-[11px]">
                    3. Resultados Medibles:
                  </h3>
                  <ul className={`space-y-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {cs.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Client Testimonial Quote */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={cs.avatarUrl}
                    alt={cs.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#00A9A3]/40 shrink-0 shadow-sm"
                  />
                  <div>
                    <p className={`text-xs italic max-w-xl ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      "{cs.quote}"
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <strong className={`text-xs ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>{cs.author}</strong>
                      <span className={theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}>|</span>
                      <span className="text-[11px] text-[#00A9A3] font-medium">{cs.authorRole}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/solicitar-talento')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border shrink-0 transition-colors flex items-center gap-1 btn-spring-press ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-sm'
                  }`}
                >
                  <span>Replicar Caso Similar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A9A3]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className={`border rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-[#00A9A3]/30'
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <h3 className="text-xl font-bold font-heading">
              ¿Quieres consultar referencias de clientes en tu sector?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Conectamos de forma confidencial a Consejeros y Directores Generales con homólogos de nuestro portafolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20me%20gustaria%20conocer%20casos%20de%20exito%20en%20mi%20sector"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +34 614 143 763</span>
            </a>

            <button
              onClick={() => onNavigate('/solicitar-talento')}
              className="px-5 py-3 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg btn-spring-press"
            >
              <span>Hablar con un Socio Consultor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
