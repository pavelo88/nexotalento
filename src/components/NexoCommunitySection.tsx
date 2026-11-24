import React from 'react';
import { ArrowRight, Crown, HeartHandshake, Sparkles, UsersRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';

interface NexoCommunitySectionProps {
  onNavigate: (path: PageRoute | string) => void;
}

export const NexoCommunitySection: React.FC<NexoCommunitySectionProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  const cards = [
    {
      icon: UsersRound,
      eyebrow: 'Para profesionales',
      title: 'Sé parte de Nexo',
      text: 'Crea tu perfil, comparte tu talento y recibe oportunidades que sí conectan con tu siguiente gran paso.',
      action: 'Crear mi perfil',
      path: '/vacantes',
      tone: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Crown,
      eyebrow: 'Para líderes de comunidad',
      title: 'Nexoembajador',
      text: 'Conecta a personas extraordinarias con empresas que necesitan crecer. Tu red también puede transformar carreras.',
      action: 'Quiero ser embajador',
      path: '/contacto',
      tone: 'from-violet-500 to-fuchsia-600'
    },
    {
      icon: HeartHandshake,
      eyebrow: 'Para nuestra comunidad',
      title: 'Talento embajador',
      text: 'Comparte tu experiencia, inspira a otros profesionales y construye reputación dentro del ecosistema Nexo.',
      action: 'Hablar con Nexo',
      path: '/contacto',
      tone: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section className={`relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 ${dark ? 'bg-slate-950' : 'bg-slate-100/80'}`}>
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">
            <Sparkles className="h-3.5 w-3.5" /> Comunidad Nexo
          </div>
          <h2 className={`font-heading text-3xl font-black tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-slate-950'}`}>
            El próximo gran talento puede estar <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">en tu red</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            Nexo es más que una firma de selección: es una comunidad de personas ambiciosas, humanas y listas para crear conexiones que dejan huella.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, eyebrow, title, text, action, path, tone }) => (
            <article key={title} className={`group relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${dark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
              <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-500">{eyebrow}</p>
              <h3 className={`mt-2 font-heading text-xl font-black ${dark ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
              <p className={`mt-3 min-h-[76px] text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{text}</p>
              <button type="button" onClick={() => onNavigate(path)} className={`mt-6 inline-flex items-center gap-2 text-xs font-black transition-colors ${dark ? 'text-cyan-400 hover:text-white' : 'text-cyan-700 hover:text-blue-700'}`}>
                {action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

