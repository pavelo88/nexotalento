import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  ShoppingBag, 
  Landmark, 
  Factory, 
  Trees, 
  Truck, 
  Cpu, 
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
  Users2,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { PageRoute } from '../types';

interface SpecializationSectorsSectionProps {
  onNavigate?: (path: PageRoute) => void;
  className?: string;
}

interface SectorItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
  description: string;
  typicalProfiles: string[];
  metrics: string;
}

export const SpecializationSectorsSection: React.FC<SpecializationSectorsSectionProps> = ({
  onNavigate,
  className = ''
}) => {
  const { theme } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isGridMode, setIsGridMode] = useState(false);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 390;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  const sectors: SectorItem[] = [
    {
      id: 'retail-consumo',
      name: 'Retail y Consumo Masivo',
      subtitle: 'FMCG, Gran Distribución y E-commerce Omnicanal',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-600',
      badge: 'Alta Rotación & Expansión',
      description: 'Atracción de directores comerciales, gerentes de operaciones retail y especialistas en cadena de suministro de gran consumo con probada capacidad de rentabilidad y tracción en punto de venta.',
      typicalProfiles: [
        'Directores de Operaciones Retail y Expansión',
        'Category Managers & Key Account Managers (KAM)',
        'E-commerce & Omnichannel Directors'
      ],
      metrics: 'SLA 16 días • Cobertura Nacional'
    },
    {
      id: 'banca-finanzas',
      name: 'Banca, Finanzas y Seguros',
      subtitle: 'Banca Corporativa, Fintech, Insurtech y Fondos de Inversión',
      icon: Landmark,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Cumplimiento & C-Level',
      description: 'Headhunting confidencial para posiciones clave en gestión de patrimonio, banca de inversión, modelación de riesgos, cumplimiento normativo y directores financieros (CFO) con visión estratégica.',
      typicalProfiles: [
        'Chief Financial Officers (CFO) & Controllers',
        'Directores de Riesgos (CRO) y Compliance',
        'Investment Banking Associates & Portfolio Managers'
      ],
      metrics: 'Garantía 6 meses • Protocolo Confidencial'
    },
    {
      id: 'industria-manufactura',
      name: 'Industria y Manufactura',
      subtitle: 'Automoción, Metalmecánica, Química y Plantas Industriales',
      icon: Factory,
      color: 'from-slate-600 to-cyan-700',
      badge: 'Ingeniería & Producción',
      description: 'Selección de líderes de planta, directores de ingeniería, especialistas en Lean Manufacturing, excelencia operacional y mantenimiento predictivo en entornos industriales de alta exigencia.',
      typicalProfiles: [
        'Directores de Planta (Plant Managers)',
        'Jefes de Mantenimiento y Excelencia Operativa (Lean)',
        'Directores de Calidad, Seguridad y Medio Ambiente (HSE)'
      ],
      metrics: 'Evaluación Técnica In-Situ • Terna Validada'
    },
    {
      id: 'agroindustria-forestal',
      name: 'Agroindustria y Sector Forestal',
      subtitle: 'Agrotech, Producción Agrícola, Procesamiento y Forestal',
      icon: Trees,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Sostenibilidad & Campo',
      description: 'Reclutamiento de especialistas agronómicos, gerentes de operaciones agrícolas, directores de packing y líderes en tecnificación de riego y biotecnología aplicada a la productividad.',
      typicalProfiles: [
        'Gerentes de Operaciones Agrícolas y Campos',
        'Directores de Planta Agroindustrial & Packing',
        'Especialistas en I+D Agro, Riego y Biotecnología'
      ],
      metrics: 'Red en Zonas Productivas • 95% Permanencia'
    },
    {
      id: 'transporte-logistica',
      name: 'Transporte, Logística e Importaciones',
      subtitle: 'Supply Chain, Operadores 3PL/4PL, Aduanas y Freight Forwarding',
      icon: Truck,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Supply Chain Crítica',
      description: 'Captación de directores de cadena de suministro internacional, jefes de centros de distribución (CD), agentes de aduana y expertos en comercio exterior para blindar las operaciones de entrada y salida.',
      typicalProfiles: [
        'Directores de Supply Chain y Centros de Distribución',
        'Gerentes de Tráfico, Flota y Transporte Terrestre/Marítimo',
        'Directores de Comercio Exterior y Aduanas'
      ],
      metrics: 'Reducción Cuellos de Botella • 18 Días SLA'
    },
    {
      id: 'tecnologia-telecomunicaciones',
      name: 'Tecnología y Telecomunicaciones',
      subtitle: 'Software, Infraestructura Cloud, Ciberseguridad, Telco e IA',
      icon: Cpu,
      color: 'from-violet-600 to-purple-700',
      badge: 'Tech & Digital Leaders',
      description: 'Headhunting ultra-especializado en talento tecnológico: arquitectos de nube, directores de ingeniería, líderes de producto y especialistas en telecomunicaciones de alta disponibilidad.',
      typicalProfiles: [
        'CTOs, VPs of Engineering & Tech Leads',
        'Cloud & DevOps Architects (AWS / Azure / GCP)',
        'CISO, Seguridad de la Información y Redes Telco'
      ],
      metrics: 'Validación por Ingenieros • 94% Retención'
    },
    {
      id: 'hoteleria-servicios',
      name: 'Hotelería y Servicios',
      subtitle: 'Hospitality, Cadenas Hoteleras, Restauración y Facility Services',
      icon: UtensilsCrossed,
      color: 'from-rose-500 to-pink-600',
      badge: 'Hospitality & Customer Care',
      description: 'Identificación de directores de hotel, gerentes generales de resorts, directores de alimentos y bebidas (F&B) y ejecutivos de servicios corporativos enfocados en la experiencia del cliente.',
      typicalProfiles: [
        'Directores Generales de Hotel / Resort Managers',
        'Directores de Alimentos y Bebidas (F&B Managers)',
        'Gerentes de Calidad, Experiencia y Facility Management'
      ],
      metrics: 'Disponibilidad Inmediata • Enfoque NPS'
    }
  ];

  const handleConsultSector = (sectorName: string) => {
    if (onNavigate) {
      onNavigate('/contacto');
    } else {
      const whatsappUrl = `https://wa.me/34614143763?text=${encodeURIComponent(
        `Hola Nexo Talento, me gustaría consultar por perfiles especializados para el sector: ${sectorName}.`
      )}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="sectores-especializacion" 
      aria-label="Áreas de especialización por sectores productivos"
      className={`py-16 sm:py-24 relative overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* Background Accent Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00A9A3]/10 via-blue-500/5 to-purple-500/10 blur-3xl pointer-events-none rounded-full -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border backdrop-blur-md bg-[#00A9A3]/10 border-[#00A9A3]/30 text-[#00A9A3]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>7 Ecosistemas Productivos Clave</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
              Especialización{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] via-blue-500 to-indigo-600">
                Sectorial &amp; Mercado
              </span>
            </h2>

            <p className={`text-xs sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              No creemos en soluciones genéricas. Nuestros consultores provienen de las mismas industrias 
              que asesoran, garantizando un entendimiento profundo del léxico técnico y perfiles demandados en 7 ecosistemas productivos.
            </p>
          </div>

          {/* Action buttons & Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => setIsGridMode(!isGridMode)}
              className="h-10 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:text-white active:scale-95 shadow-sm"
            >
              {isGridMode ? <Layers className="w-3.5 h-3.5 text-cyan-400" /> : <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{isGridMode ? 'Ver como Carrusel' : 'Ver Todos (7)'}</span>
            </button>

            {!isGridMode && (
              <>
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Anterior sector"
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    canScrollLeft
                      ? 'bg-slate-900 border-slate-700 text-white hover:border-cyan-400 active:scale-95 shadow-md cursor-pointer'
                      : 'bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Siguiente sector"
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    canScrollRight
                      ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-black hover:opacity-90 active:scale-95 shadow-md cursor-pointer'
                      : 'bg-slate-900/40 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sectors Carousel / Grid Container */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className={
            isGridMode
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory px-4 sm:px-0'
          }
        >
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            const isFullWidthSpan = isGridMode && index === sectors.length - 1 && sectors.length % 3 !== 0;

            return (
              <div
                key={sector.id}
                className={`${
                  isGridMode
                    ? isFullWidthSpan ? 'md:col-span-2 lg:col-span-1' : ''
                    : 'snap-start shrink-0 w-[300px] sm:w-[350px] lg:w-[380px]'
                } group relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-[#00A9A3]/50'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-[#00A9A3]/40 shadow-sm'
                }`}
              >
                {/* Subtle top border gradient glow on hover */}
                <div 
                  aria-hidden="true" 
                  className={`absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r ${sector.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                />

                <div>
                  {/* Top Header: Icon & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${sector.color} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {sector.badge}
                    </span>
                  </div>

                  {/* Sector Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading mb-1.5 group-hover:text-[#00A9A3] transition-colors">
                    {sector.name}
                  </h3>
                  <p className="text-xs font-medium text-[#00A9A3] mb-3">
                    {sector.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {sector.description}
                  </p>

                  {/* Typical Profiles Box */}
                  <div className={`p-3.5 rounded-2xl mb-6 border ${
                    theme === 'dark'
                      ? 'bg-slate-950/60 border-slate-800/80'
                      : 'bg-slate-100/70 border-slate-200/70'
                  }`}>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Users2 className="w-3.5 h-3.5 text-[#00A9A3]" />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Perfiles Clave Reclutados
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {sector.typicalProfiles.map((profile, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9A3] shrink-0 mt-0.5" />
                          <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                            {profile}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-4 border-t border-slate-800/50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className={`text-[11px] font-medium ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {sector.metrics}
                  </span>

                  <button
                    onClick={() => handleConsultSector(sector.name)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <span>Solicitar Talento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom Consultation Card */}
        <div className={`mt-14 sm:mt-18 rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-[#00A9A3]/30'
            : 'bg-gradient-to-r from-cyan-50/50 via-white to-blue-50/50 border-slate-200'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-heading">
              ¿Tu empresa opera en una industria altamente específica o de nicho?
            </h3>
            <p className={`text-xs sm:text-sm max-w-2xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Contamos con una red activa de headhunters sectoriales y mapeo continuo de ejecutivos y especialistas técnicos en toda España y Latinoamérica.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talento,%20deseo%20consultar%20por%20talento%20especializado%20para%20mi%20sector"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp con Headhunter</span>
            </a>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/contacto')}
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Abrir Requerimiento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
