import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

interface JobhuntingTeaserSectionProps {
  onNavigate: (path: PageRoute) => void;
}

export const JobhuntingTeaserSection: React.FC<JobhuntingTeaserSectionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contenedor Banner Principal con los colores oficiales (#0E243A y #00A896) */}
        <div className="relative rounded-3xl overflow-hidden border border-[#00A896]/30 bg-gradient-to-br from-[#0E243A] via-[#102B45] to-[#0A1826] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* Luces y Glows de Fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Mensaje y Propuesta */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A896]/20 border border-[#00A896]/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5C9]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5C9]">
                  Para Profesionales y Candidatos · Impulso laboral
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-[1.15]">
                ¿Buscas empleo y las entrevistas <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5C9] to-[#00A896]">
                  no se convierten en ofertas?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-xl">
                Descubre <strong>Impulso laboral</strong>: un acompañamiento integral con psicólogos de RRHH y headhunters senior para redefinir tu posicionamiento real y acelerar tu colocación en España y LATAM.
              </p>

              {/* 3 Bullets con métricas del PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-[#00E5C9]">2,5 meses</p>
                  <p className="text-[11px] text-slate-300">Tiempo medio colocación</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-[#00E5C9]">95% éxito</p>
                  <p className="text-[11px] text-slate-300">En periodo del programa</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xl font-black text-[#00E5C9]">A medida</p>
                  <p className="text-[11px] text-slate-300">Plan según tu objetivo</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={() => onNavigate('/jobhunting')}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#00A896] to-[#00C4AF] text-[#0A1826] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A896]/25 group active:scale-95"
                >
                  <span>Conocer Impulso laboral</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('/jobhunting#formulario-postulacion')}
                  className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all text-center"
                >
                  Solicitar información
                </button>
              </div>

            </div>

            {/* Columna Derecha: Tarjeta Fotográfica de Autoridad */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0A1826] group">
                <img 
                  src="/jobhunting-hero-desktop.jpg" 
                  alt="Jobhunting ProProfile Nexo Talento" 
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0E243A]/90 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <HeartHandshake className="w-5 h-5 text-[#00E5C9] shrink-0" />
                    <p className="text-xs text-slate-200">
                      <strong className="text-white">Garantía de Reactivación:</strong> si el encaje no funciona tras incorporarte, te ayudamos a recolocarte.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
