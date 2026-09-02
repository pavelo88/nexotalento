import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿En qué se diferencia Nexo Talentos de una agencia de empleo tradicional?',
    answer: 'A diferencia de los portales generalistas, en Nexo Talentos operamos como una boutique de Executive Search y Headhunting especializado. Combinamos consultores sénior con más de 15 años en comités de dirección con tecnología de Inteligencia Artificial para la búsqueda directa de talento pasivo (profesionales que no están buscando activamente pero escuchan ofertas estratégicas).'
  },
  {
    question: '¿Cuánto tiempo tarda un proceso de selección ejecutiva con Nexo Talentos?',
    answer: 'Nuestro compromiso estándar es la entrega de la terna final validada en 18 días hábiles a partir de la firma del briefing de posición. Nuestro filtrado predictivo y mapeo continuo de mercado reduce los tiempos habituales de la industria (60-90 días) en más de un 65%.'
  },
  {
    question: '¿Qué garantía ofrecéis ante una posible desvinculación?',
    answer: 'Ofrecemos una garantía contractual de reposición de hasta 12 meses para posiciones de C-Level y Directores de Área. Si el candidato no supera el periodo de prueba o decide abandonar voluntariamente la empresa durante ese plazo, reiniciamos el proceso de selección sin ningún coste adicional de honorarios.'
  },
  {
    question: '¿En qué ubicaciones geográficas de España y el extranjero operáis?',
    answer: 'Nuestras sedes principales se ubican en el Paseo de la Castellana (Madrid) y en el Distrito 22@ (Barcelona). Gestionamos procesos en toda la geografía española (Valencia, Sevilla, Bilbao, Málaga, Zaragoza) así como búsquedas internacionales y posiciones 100% remotas para empresas multinacionales y scaleups.'
  },
  {
    question: '¿Cómo garantizáis la máxima confidencialidad en puestos directivos?',
    answer: 'Firmamos un Acuerdo de Confidencialidad (NDA) antes de iniciar cualquier prospección. En búsquedas de sustitución o estratégicas, no publicamos el nombre de la empresa contratante ni detalles identificativos hasta que el candidato ha sido filtrado y ha firmado su propio compromiso de confidencialidad.'
  },
  {
    question: '¿Cómo funcionan los Agentes de Inteligencia Artificial de Nexo Talentos?',
    answer: 'Nuestros 4 agentes de IA están especializados en áreas clave de RRHH: 1) Headhunter Executive (evaluación de perfiles y requisitos), 2) Evaluador de Encaje Cultural (análisis de soft skills y liderazgo), 3) Asesor de Banda Salarial (benchmarks retributivos en España en tiempo real), y 4) Consultor Estratégico de RRHH (planes de retención y diseño de organigramas). Puedes consultarlos de forma libre 24/7 en esta misma plataforma.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with clear H2 for Google FAQ snippet rich results */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes · FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Dudas Frecuentes sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Headhunting &amp; Selección</span>
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            Todo lo que directores generales, comités de RRHH y candidatos ejecutivos necesitan saber sobre nuestros servicios.
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

      </div>
    </section>
  );
};
