import React from 'react';
import { Target } from 'lucide-react';
import { PainPointItem } from './types';
import { Reveal } from '../motion/Reveal';

interface JobhuntingPainPointsProps {
  theme: string;
}

const painPoints: PainPointItem[] = [
  { id: '1', title: 'Sin resultados', text: 'Llevas tiempo buscando y no estás consiguiendo resultados' },
  { id: '2', title: 'Filtro inicial', text: 'No te llaman o no accedes a las entrevistas que quieres' },
  { id: '3', title: 'Marca personal', text: 'Sientes que no sabes cómo vender tu perfil profesional' },
  { id: '4', title: 'Bloqueo en vivo', text: 'Te bloqueas en entrevistas o no sabes cómo destacar' },
  { id: '5', title: 'Falta de foco', text: 'No tienes claro qué tipo de empresas o roles encajan contigo' },
  { id: '6', title: 'A ciegas', text: 'Estás aplicando, pero no sabes si lo estás haciendo bien' }
];

export const JobhuntingPainPoints: React.FC<JobhuntingPainPointsProps> = ({ theme }) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A896]/10 text-[#00A896] dark:text-[#00E5C9] text-xs font-black uppercase tracking-wider mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>¿Es para mí?</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mt-1">
          Este programa es para ti si…
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Si alguno de estos bloqueos te resulta familiar, no necesitas enviar más CV a ciegas: necesitas una estrategia que convierta tu experiencia en oportunidades.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {painPoints.map((item, index) => (
          <Reveal key={item.id} delay={0.08 + index * 0.06} className="h-full">
          <div 
            className={`glass-card h-full p-3 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 group cursor-default relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-stone-900/60 border-stone-800 hover:border-[#00A896]/50 hover:bg-stone-900 shadow-lg shadow-black/40' 
                : 'hover:border-[#00A896]/50 shadow-md hover:shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00A896] to-cyan-500 text-slate-950 font-black text-[11px] sm:text-sm flex items-center justify-center shadow-md shrink-0">
                0{item.id}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-stone-700 dark:text-stone-300 leading-tight">
                {item.title}
              </span>
            </div>
            <p className="text-xs sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-[#00A896] dark:group-hover:text-[#00E5C9] transition-colors">
              {item.text}
            </p>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
