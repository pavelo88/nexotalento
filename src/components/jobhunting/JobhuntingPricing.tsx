import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

interface JobhuntingPricingProps {
  theme: string;
  selectedPlan: 'exito' | 'cerrado';
  onSelectPlan: (plan: 'exito' | 'cerrado') => void;
}

export const JobhuntingPricing: React.FC<JobhuntingPricingProps> = ({
  theme,
  selectedPlan,
  onSelectPlan
}) => {
  // Los precios explícitos se conservan para una futura revisión comercial,
  // pero no se muestran públicamente hasta que exista una aprobación vigente.
  return null;
  return (
    <section id="modalidades-precios" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A896]/10 text-[#00A896] dark:text-[#00E5C9] text-xs font-black uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5" />
          <span>Modalidades de Inversión</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mt-1">
          Elige Cómo Abordar Tu Proceso
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Sin letras pequeñas. Tú decides si prefieres vincular la inversión a resultados o invertir en un paquete cerrado sin comisiones posteriores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Modalidad 1: Modelo a Éxito */}
        <div className={`glass-card p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border relative flex flex-col justify-between transition-all duration-300 ${
          selectedPlan === 'exito'
            ? 'border-[#00A896] ring-2 ring-[#00A896]/40 shadow-2xl shadow-[#00A896]/15'
            : 'border-stone-200 dark:border-stone-800'
        }`}>

          <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00A896]/15 text-[#00A896] dark:text-[#00E5C9] border border-[#00A896]/30">
            Más Solicitado
          </div>

          <div>
            <span className="text-xs font-black uppercase text-stone-400">Modalidad 01 · Compromiso Compartido</span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading mt-1">Modelo a Éxito</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Trabajo en exclusividad con acompañamiento estratégico e implicación activa por tu parte.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#00A896]">300 €</span>
                <span className="text-xs font-bold text-stone-500 uppercase">Inicial (Retain)</span>
              </div>
              <p className="text-sm font-extrabold text-stone-800 dark:text-stone-100 mt-2">
                + 25% del salario mensual al conseguir empleo
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                (Se descuenta el retain inicial de 300 € del fee de éxito)
              </p>
              <p className="text-[11px] text-[#00A896] dark:text-[#00E5C9] font-bold mt-2">
                Pagas una parte ahora y el resto cuando consigues el resultado.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-xs font-black uppercase tracking-wider text-stone-400">¿Qué Incluye?</p>
              {[
                '4 sesiones estratégicas con consultor senior',
                '1 sesión con psicólogos especializados en RRHH',
                'CV + LinkedIn + Estrategia de escaparate',
                'Activación de mercado y difusión en red de partners',
                'Preparación de entrevistas reales + negociación salarial',
                'Trabajo en exclusividad'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#formulario-postulacion"
            onClick={() => onSelectPlan('exito')}
            className="w-full py-4 px-4 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#00A896] via-[#00C4AF] to-[#00E5C9] text-[#0A1826] hover:opacity-90 text-center transition-all shadow-lg shadow-[#00A896]/20 active:scale-95"
          >
            Elegir Modelo a Éxito (300 € + 25%)
          </a>
        </div>

        {/* Modalidad 2: Modelo Sin Exclusividad (Inversión Cerrada) */}
        <div className={`glass-card p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border relative flex flex-col justify-between transition-all duration-300 ${
          selectedPlan === 'cerrado'
            ? 'border-cyan-500 ring-2 ring-cyan-500/40 shadow-2xl shadow-cyan-500/15'
            : 'border-stone-200 dark:border-stone-800'
        }`}>

          <div>
            <span className="text-xs font-black uppercase text-stone-400">Modalidad 02 · Total Autonomía</span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading mt-1">Modelo Sin Exclusividad</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Todo lo del modelo a éxito, y más. Aplicación flexible por tu parte y enfoque estructurado.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white">450 €</span>
                <span className="text-xs font-bold text-stone-500 uppercase">Programa Completo</span>
              </div>
              <p className="text-sm font-extrabold text-stone-800 dark:text-stone-100 mt-2">
                Sin fees ni comisiones posteriores al conseguir empleo
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Inviertes desde el inicio y ejecutas con las herramientas sin pagos adicionales
              </p>
              <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold mt-2">
                Mayor foco psicológico: incluye 3 sesiones con psicólogos.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-xs font-black uppercase tracking-wider text-stone-400">¿Qué Incluye?</p>
              {[
                'Todo lo incluido en el modelo a éxito',
                '3 sesiones con psicólogos especializados (en lugar de 1)',
                '4 sesiones estratégicas con consultor senior',
                'CV + LinkedIn + Estrategia de escaparate',
                'Listado de empresas target y primeros decisores',
                'Sin exclusividad: avanzas a tu propio ritmo',
                'Cero comisiones ni retenciones de tu sueldo'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#formulario-postulacion"
            onClick={() => onSelectPlan('cerrado')}
            className="w-full py-4 px-4 rounded-2xl font-black text-xs sm:text-sm bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:opacity-90 text-center transition-all shadow-lg active:scale-95"
          >
            Elegir Inversión Cerrada (450 €)
          </a>
        </div>

      </div>
    </section>
  );
};
