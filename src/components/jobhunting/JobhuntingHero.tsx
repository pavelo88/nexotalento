import React from 'react';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const JobhuntingHero: React.FC = () => {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#0E243A] via-[#102B45] to-[#0A1826] text-white">
      {/* Glows y luces dinámicas con pulso sutil */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#00A896]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            VISTA CELULARES Y TABLETS (< lg) - DISEÑO EMIL / APPLE: VISUAL INMEDIATO
           ========================================================================= */}
        <div className="block lg:hidden space-y-3.5 text-center">
          
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#00A896]/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C9] animate-ping" />
            <span className="text-[10px] font-black tracking-wider uppercase text-[#00E5C9]">
              Nexo Talento · Servicio ProProfile
            </span>
          </div>

          {/* Título de impacto controlado */}
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight leading-[1.12] text-white">
            Programa de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5C9] to-[#00A896]">
              Proprofile &amp; Jobhunting
            </span>
          </h1>

          {/* Subtítulo conciso */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light max-w-md mx-auto">
            Acompañamiento integral con psicólogos de RRHH y headhunters senior para redefinir tu posicionamiento real y conseguir ofertas de alto nivel.
          </p>

          {/* FOTOGRAFÍA EJECUTIVA INMEDIATA EN MÓVIL (Con Garantía de Reactivación) */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0A1826] max-w-sm mx-auto my-3 group">
            <img 
              src="/jobhunting-hero-mobile.jpg" 
              alt="Candidata programa ProProfile Nexo Talento" 
              className="w-full h-80 sm:h-96 object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826] via-transparent to-transparent" />
            
            {/* Badge de Garantía flotante en móvil */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-[#0E243A]/95 border border-white/15 backdrop-blur-md flex items-center gap-2.5 text-left">
              <div className="w-7 h-7 rounded-lg bg-[#00A896]/20 flex items-center justify-center shrink-0 text-[#00E5C9] border border-[#00A896]/30">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[11px] font-black text-white">Garantía de Reactivación</p>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">100% Real</span>
                </div>
                <p className="text-[9px] text-slate-300 truncate">Te recolocamos sin coste si el encaje no funciona</p>
              </div>
            </div>
          </div>

          {/* Botones de Acción Móviles con feedback táctil active:scale-95 */}
          <div className="flex flex-col gap-2.5 max-w-sm mx-auto pt-1">
            <a
              href="#formulario-postulacion"
              className="w-full h-12 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#00A896] via-[#00C4AF] to-[#00E5C9] text-[#0A1826] flex items-center justify-center gap-2 shadow-lg shadow-[#00A896]/25 active:scale-95 transition-all"
            >
              <span>Postular al Programa</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#modalidades-precios"
              className="w-full h-11 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center justify-center active:scale-95 transition-all"
            >
              Ver Modelos &amp; Inversión (300 € / 450 €)
            </a>
          </div>

          {/* Métricas compactas en 1 sola fila en móvil */}
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-base font-black text-[#00E5C9]">2,5 m</p>
              <p className="text-[9px] text-slate-300 font-medium">Colocación</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-base font-black text-[#00E5C9]">95%</p>
              <p className="text-[9px] text-slate-300 font-medium">Éxito</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-base font-black text-[#00E5C9]">Oculto</p>
              <p className="text-[9px] text-slate-300 font-medium">Mercado VIP</p>
            </div>
          </div>

        </div>

        {/* =========================================================================
            VISTA ESCRITORIO (lg+) - PROPORCIÓN PERFECTA ARRIBA DEL FOLD
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* Lado Izquierdo: Copywriting, CTAs y Métricas en un solo flujo */}
          <div className="lg:col-span-7 space-y-4 xl:space-y-5 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00A896]/40 backdrop-blur-xl shadow-lg shadow-[#00A896]/10">
              <span className="w-2 h-2 rounded-full bg-[#00E5C9] animate-ping" />
              <span className="text-xs font-black tracking-wider uppercase text-[#00E5C9]">
                Nexo Talento · Servicio de Proprofile
              </span>
            </div>

            <h1 className="text-3xl lg:text-[40px] xl:text-[46px] font-black font-heading tracking-tight leading-[1.1] text-white">
              Programa de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5C9] to-[#00A896]">
                Proprofile &amp; Jobhunting
              </span>
            </h1>

            <p className="text-sm xl:text-base text-slate-200 font-light leading-relaxed max-w-xl">
              Un acompañamiento integral para <strong className="font-semibold text-white">redefinir tu posicionamiento real en el mercado</strong>, fortalecer tu marca personal y diseñar una estrategia efectiva para acceder a puestos de alta dirección.
            </p>

            {/* Pastilla de síntesis de valor */}
            <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 py-2 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C9]" />
                Sesiones individuales con Psicólogo RRHH
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C9]" />
                Estrategia con Headhunters Senior
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C9]" />
                Acceso a red viva de decisores
              </span>
            </div>

            {/* Botones de Acción con Microinteracciones */}
            <div className="flex items-center gap-3.5 pt-1">
              <a
                href="#formulario-postulacion"
                className="h-12 px-6 rounded-xl font-black text-xs xl:text-sm bg-gradient-to-r from-[#00A896] via-[#00C4AF] to-[#00E5C9] text-[#0A1826] hover:opacity-95 shadow-xl shadow-[#00A896]/25 transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
              >
                <span>Postular al Programa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#modalidades-precios"
                className="h-12 px-5 rounded-xl font-bold text-xs xl:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all flex items-center justify-center active:scale-95"
              >
                Ver Modelos &amp; Inversión
              </a>
            </div>

            {/* Métricas Auditadas del PDF integradas arriba del pliegue */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 max-w-lg">
              <div className="p-2.5 xl:p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xl xl:text-2xl font-black text-[#00E5C9]">2,5 meses</p>
                <p className="text-[11px] text-slate-300 font-medium">Colocación media</p>
              </div>
              <div className="p-2.5 xl:p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xl xl:text-2xl font-black text-[#00E5C9]">95%</p>
                <p className="text-[11px] text-slate-300 font-medium">Consiguen empleo</p>
              </div>
              <div className="p-2.5 xl:p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xl xl:text-2xl font-black text-[#00E5C9]">Oculto</p>
                <p className="text-[11px] text-slate-300 font-medium">Mercado no publicado</p>
              </div>
            </div>

          </div>

          {/* Lado Derecho: Tarjeta Fotográfica con Garantía de Reactivación */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00A896] to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0A1826] h-[380px] xl:h-[430px]">
                <img 
                  src="/jobhunting-hero-desktop.jpg" 
                  alt="Candidata programa ProProfile Nexo Talento" 
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  fetchPriority="high"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826] via-transparent to-transparent" />

                {/* Badge Flotante con Garantía de Reactivación */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#0E243A]/95 border border-white/15 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00A896]/20 flex items-center justify-center shrink-0 border border-[#00A896]/40 text-[#00E5C9]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-white">Garantía de Reactivación</p>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">100% Real</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                        Si el encaje no funciona tras incorporarte, te ayudamos a recolocarte sin coste.
                      </p>
                    </div>
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
