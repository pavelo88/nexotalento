import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

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
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden transition-colors duration-300">
      
      {/* Fondo Arquitectónico Corporativo: Muy visible en Modo Claro (opacidad 75%) vs sutil en Modo Oscuro (25%) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90"
          alt="Edificio corporativo y centro financiero"
          className="w-full h-full object-cover object-center opacity-75 dark:opacity-25"
        />
        {/* Viñeta para garantizar 100% legibilidad del contenido */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950/90'
            : 'bg-gradient-to-b from-white/60 via-white/30 to-white/70'
        }`} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with clear H2 for Google FAQ snippet rich results */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/10 border border-[#00A9A3]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes · FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading text-slate-900 dark:text-white drop-shadow-xs">
            Dudas Frecuentes sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600">Headhunting &amp; Selección</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base font-medium leading-relaxed text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Respuestas claras sobre nuestros plazos de 18 días, garantías contractuales de 3 a 6 meses y metodología directa de búsqueda.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 shadow-xl shadow-black/40 hover:border-cyan-500/50'
                    : 'bg-white/95 border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#00A9A3]/50 backdrop-blur-md'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'rotate-180 bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner de WhatsApp al pie de las FAQs */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900/95 border border-[#00A9A3]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left backdrop-blur-md">
          <div>
            <h3 className="text-base font-extrabold text-white font-heading">¿Tienes otra pregunta sobre tu vacante?</h3>
            <p className="text-xs text-slate-300 mt-1">Un Senior Talent Partner te responde por WhatsApp en pocos minutos.</p>
          </div>
          <a
            href="https://wa.me/34614143763?text=Hola%20Nexo%20Talento,%20tengo%20una%20consulta%20sobre%20sus%20servicios%20de%20selecci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 shrink-0 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
