import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, 
  Briefcase, 
  Crosshair, 
  TrendingUp, 
  Compass, 
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';
import { trackEvent } from '../lib/tracking';

interface AreasEspecializacionProps {
  onNavigate?: (path: PageRoute) => void;
}

export const AreasEspecializacionSection: React.FC<AreasEspecializacionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  // Las 6 áreas exactas de la Imagen 3 del cliente
  const areas = [
    {
      id: 'seleccion-talento',
      title: 'Selección de Talento',
      subtitle: 'Reclutamiento Operativo y Mandos Medios',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Procesos Ágiles',
      description: 'Atracción y filtrado por competencias para posiciones intermedias, técnicas y operativas con validación de idoneidad y referencias verificadas.',
      deliverables: ['Terna en 18 días hábiles', 'Entrevista por competencias STAR', 'Pruebas psicotécnicas aplicadas']
    },
    {
      id: 'executive-search',
      title: 'Executive Search',
      subtitle: 'C-Level & Directores Generales',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Máxima Confidencialidad',
      description: 'Búsqueda directa y exclusiva de Presidentes, CEOs, CFOs y miembros del Comité de Dirección bajo estrictos acuerdos de confidencialidad.',
      deliverables: ['Mapeo ciego del mercado', 'Evaluación de liderazgo estratégico', 'Garantía contractual de 3 a 6 meses']
    },
    {
      id: 'headhunting',
      title: 'Headhunting',
      subtitle: 'Caza Directa de Talento en Activo',
      icon: Crosshair,
      color: 'from-[#00A9A3] to-teal-600',
      badge: 'Caza Quirúrgica',
      description: 'Identificación y captación directa de perfiles no disponibles en portales de empleo, atrayendo a líderes consolidados en la competencia.',
      deliverables: ['Acceso a talento pasivo', 'Presentación confidencial', 'Alineación de compensación total']
    },
    {
      id: 'evaluacion-talento',
      title: 'Evaluación de Talento',
      subtitle: 'Assessment Centers & Fit Cultural',
      icon: TrendingUp,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Diagnóstico 360°',
      description: 'Auditoría competencial y metodológica del capital humano existente o en proceso de promoción mediante simulaciones situacionales y dinámicas.',
      deliverables: ['Informes ejecutivos en 48h', 'Medición de potencial vs desempeño', 'Planes de cierre de brechas']
    },
    {
      id: 'desarrollo-organizacional',
      title: 'Desarrollo Organizacional',
      subtitle: 'Estructura, Cultura y Retención',
      icon: Compass,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Estrategia Humana',
      description: 'Diseño de manuales de funciones, escalas salariales, planes de sucesión y programas de retención del talento clave en scaleups y corporaciones.',
      deliverables: ['Bandas salariales P25-P90', 'Modelos de compensación variable', 'Encuestas de clima y engagement']
    },
    {
      id: 'outplacement',
      title: 'Outplacement',
      subtitle: 'Transición de Carrera & Recolocación',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-600',
      badge: 'Acompañamiento Humano',
      description: 'Programas de orientación profesional, optimización de marca personal y recolocación efectiva para ejecutivos desvinculados.',
      deliverables: ['Coaching de transición directiva', 'Optimización de CV y LinkedIn', 'Networking con comités y headhunters']
    }
  ];

  const handleConsult = (areaTitle: string) => {
    trackEvent({
      eventName: 'area_especializacion_click',
      category: 'Servicios',
      label: areaTitle
    });
    if (onNavigate) {
      onNavigate('/contacto');
    }
  };

  return (
    <section id="areas-especializacion" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00A9A3]/10 via-cyan-500/10 to-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Freelancer Style */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border backdrop-blur-md bg-[#00A9A3]/10 border-[#00A9A3]/30 text-[#00A9A3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio Oficial de Soluciones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            Áreas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500">Especialización</span>
          </h2>

          <p className={`text-xs sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Estructuramos nuestras prácticas en 6 divisiones estratégicas para atender tanto la atracción de perfiles clave como la optimización y transición del talento directivo.
          </p>
        </div>

        {/* 6 Areas Grid Freelancer Luxury Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                onClick={() => handleConsult(area.title)}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/50 shadow-xl shadow-black/40'
                    : 'bg-white hover:bg-cyan-50/20 border-slate-200 hover:border-[#00A9A3]/50 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Top border glow bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${area.color} text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                      {area.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-lg sm:text-xl font-bold font-heading mb-1 transition-colors ${
                    theme === 'dark' ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-[#00A9A3]'
                  }`}>
                    {area.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#00A9A3] mb-3">
                    {area.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {area.description}
                  </p>

                  {/* Deliverables Box */}
                  <div className={`p-3 rounded-2xl mb-4 border ${
                    theme === 'dark' ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <ul className="space-y-1.5">
                      {area.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9A3] shrink-0 mt-0.5" />
                          <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Strip */}
                <div className={`pt-4 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Consultar con Headhunter
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-[#00A9A3] group-hover:text-white transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
