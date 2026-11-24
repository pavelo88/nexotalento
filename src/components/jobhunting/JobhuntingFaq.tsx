import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from './types';

interface JobhuntingFaqProps {
  theme: string;
}

const faqs: FaqItem[] = [
  {
    cat: 'Garantías y resultados',
    q: '¿Este programa me garantiza encontrar trabajo?',
    a: 'No podemos garantizar una oferta concreta, pero sí un proceso estructurado, claro y enfocado a resultados. El objetivo es que salgas con una estrategia y herramientas que aumenten significativamente tus probabilidades.'
  },
  {
    cat: 'Garantías y resultados',
    q: '¿Y si no consigo el resultado esperado?',
    a: 'Nuestro objetivo es que consigas resultados en el menor tiempo posible, pero cada proceso depende también de factores externos (mercado, timing, sector…). Por eso te damos una estrategia clara y accionable, activamos tu perfil en el mercado y trabajamos contigo para maximizar tus oportunidades. Además: si el encaje no funciona tras incorporarte a una empresa, incluimos una garantía de reactivación para ayudarte a recolocarte.'
  },
  {
    cat: 'Duración y tu implicación',
    q: '¿Cuánto dura el programa?',
    a: 'La fase activa dura entre 4 y 8 semanas, en función de la frecuencia de las sesiones (acordada entre cliente y consultor). Durante este tiempo se estructura toda la estrategia y se activa el perfil en el mercado.'
  },
  {
    cat: 'Duración y tu implicación',
    q: '¿Cuánto depende de mí el resultado?',
    a: 'Mucho. Este programa está diseñado para que trabajemos en equipo ya que no podemos aplicar por ti ni acudir a las entrevistas. El resto de trabajo lo hacemos conjuntamente como una máquina perfecta.'
  },
  {
    cat: 'Duración y tu implicación',
    q: '¿Qué pasa si no tengo claro a qué quiero postular?',
    a: 'Es totalmente válido. La primera fase del programa está enfocada precisamente en definir tu posicionamiento, perfil profesional y objetivos.'
  },
  {
    cat: 'Modelos y pagos',
    q: '¿Qué diferencia hay entre los dos modelos?',
    a: 'ProProfile a éxito: trabajamos en exclusividad, con un modelo vinculado a resultado (300 € inicial + 25% del salario mensual descontando el retain al conseguir empleo). ProProfile – Inversión cerrada (450 €): no hay exclusividad ni porcentaje. Incluye mayor foco en la parte psicológica, con 3 sesiones con psicóloga, y un formato más estructurado desde el inicio.'
  },
  {
    cat: 'Modelos y pagos',
    q: '¿Cuándo se paga el success fee?',
    a: 'En la modalidad a éxito, únicamente cuando aceptas una oferta laboral dentro del periodo acordado. Además, ofrecemos distintas opciones de pago para facilitar el proceso.'
  },
  {
    cat: 'Entrevistas y oportunidades',
    q: '¿Incluye ayuda con entrevistas y negociación?',
    a: 'Sí. Trabajamos preparación de entrevistas, storytelling profesional y negociación de ofertas en las últimas sesiones.'
  },
  {
    cat: 'Entrevistas y oportunidades',
    q: '¿Trabajáis solo con vuestras oportunidades?',
    a: 'No. Nuestro trabajo es activar tu posicionamiento en el mercado combinando acceso a nuestro círculo de decisores, contacto directo con empresas y difusión estratégica de tu perfil; y en paralelo te enseñamos a identificar oportunidades, contactar decisores y moverte con criterio en el mercado para que ganes visibilidad y autonomía.'
  }
];

export const JobhuntingFaq: React.FC<JobhuntingFaqProps> = ({ theme }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-black uppercase tracking-wider text-[#00A896]">
          Preguntas Frecuentes
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-heading mt-1">
          Resolvemos Todas tus Dudas
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2">
          Respuestas claras y directas sobre garantías, duración, modelos y metodología.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className={`glass-card rounded-2xl border transition-all overflow-hidden ${
              theme === 'dark' ? 'border-stone-800' : 'shadow-xs'
            }`}
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00A896] block mb-1">
                  {faq.cat}
                </span>
                <span>{faq.q}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#00A896]' : ''}`} />
            </button>
            
            {openFaq === idx && (
              <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
