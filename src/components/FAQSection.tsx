import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿En qué se diferencia Nexo Talento de una agencia de empleo tradicional?',
    answer: 'A diferencia de los portales generalistas de empleo, en Nexo Talento operamos como una boutique de Executive Search y Headhunting de precisión. Nuestros consultores sénior cuentan con más de 15 años de experiencia y realizan búsqueda directa confidencial de profesionales de alta cualificación actualmente en activo que no están buscando trabajo en portales.'
  },
  {
    question: '¿Cuánto tiempo tarda un proceso de selección ejecutiva con Nexo Talento?',
    answer: 'Nuestro compromiso estándar es la entrega de la terna final validada en 18 días hábiles a partir de la firma del briefing de posición. Nuestro mapeo continuo de mercado y metodología directa reduce los tiempos habituales de la industria (60-90 días) en más de un 65%.'
  },
  {
    question: '¿Qué garantía ofrecéis ante una posible desvinculación?',
    answer: 'Ofrecemos una garantía contractual de reposición de 3 a 6 meses según el nivel de la vacante (3 meses para mandos técnicos e intermedios y hasta 6 meses para posiciones directivas y C-Level). Si el candidato no supera el periodo de prueba o se desvincula durante ese plazo, reiniciamos el proceso de selección sin ningún coste adicional de honorarios.'
  },
  {
    question: '¿En qué ubicaciones geográficas de España y el extranjero operáis?',
    answer: 'Gestionamos procesos en toda la geografía española (Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga, Zaragoza) así como búsquedas internacionales y posiciones 100% remotas para empresas multinacionales y scaleups.'
  },
  {
    question: '¿Cómo garantizáis la máxima confidencialidad en puestos directivos?',
    answer: 'Firmamos un Acuerdo de Confidencialidad (NDA) antes de iniciar cualquier prospección. En búsquedas de sustitución o estratégicas, no publicamos el nombre de la empresa contratante ni detalles identificativos hasta que el candidato ha sido validado y ha firmado su propio compromiso de confidencialidad.'
  },
  {
    question: '¿Cómo puedo consultar una vacante o solicitar una propuesta personalizada?',
    answer: 'Puedes escribirnos directamente a nuestro WhatsApp oficial (+34 614 143 763) o llamarnos para coordinar una reunión de briefing. Un Senior Talent Partner analizará el perfil que necesitas y te enviará una estimación de plazos y bandas salariales en menos de 24 horas.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with clear H2 for Google FAQ snippet rich results */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes · FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Dudas Frecuentes sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Headhunting &amp; Selección</span>
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Respuestas claras sobre nuestros plazos de 18 días, garantías contractuales de 3 a 6 meses y metodología directa.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white font-heading">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-cyan-500 text-slate-950 border-cyan-400' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner de WhatsApp al pie de las FAQs */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-bold text-white">¿Tienes otra pregunta sobre tu vacante?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Un Senior Talent Partner te responde por WhatsApp en pocos minutos.</p>
          </div>
          <a
            href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20tengo%20una%20consulta%20sobre%20sus%20servicios%20de%20selecci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
