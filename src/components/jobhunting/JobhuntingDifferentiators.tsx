import React from 'react';

interface JobhuntingDifferentiatorsProps {
  theme: string;
}

const diffCards = [
  { title: 'Cómo piensan las empresas', desc: 'Entender cómo evalúan los decisores para hablar en sus mismos términos de negocio.' },
  { title: 'Qué perfiles destacan y por qué', desc: 'Criterio real de selección para que tu candidatura supere a cualquier competidor.' },
  { title: 'Enfoque real de mercado', desc: 'Preparación con preguntas y dinámicas vigentes hoy en España y LATAM.' },
  { title: 'Red de decisores de años', desc: 'Acceso directo y difusión estratégica con nuestra red de contactos y partners.' }
];

export const JobhuntingDifferentiators: React.FC<JobhuntingDifferentiatorsProps> = ({ theme }) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`p-8 sm:p-14 lg:p-16 rounded-3xl border ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#0E243A] to-[#0A1826] border-stone-800 text-white' 
          : 'bg-gradient-to-br from-[#0E243A] via-[#102B45] to-[#12304D] border-stone-200 text-white shadow-2xl'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#00E5C9]">
              Nuestra Diferencia
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-tight">
              ¿En qué nos diferenciamos del resto?
            </h2>
            <p className="text-lg sm:text-xl text-[#00E5C9] font-bold">
              No somos un servicio de coaching laboral tradicional.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Somos un equipo de <strong>headhunters senior</strong>, con experiencia directa en procesos de selección a nivel nacional e internacional. Entendemos qué busca un comité de selección y cómo presentar tu candidatura para ganar la terna.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diffCards.map((card, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#00A896]/20 flex items-center justify-center text-[#00E5C9] font-black text-xs mb-3">
                  ✓
                </div>
                <p className="text-sm font-bold text-white mb-1.5">{card.title}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
