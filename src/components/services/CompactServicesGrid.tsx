import React from 'react';
import { ArrowRight, BriefcaseBusiness, Cpu, Rocket, Sparkles, Users } from 'lucide-react';
import { PageRoute } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Reveal } from '../motion/Reveal';

interface CompactServicesGridProps { onNavigate: (path: PageRoute) => void; }

const services = [
  { id: 'seleccion-talento', title: 'Selección de talento', eyebrow: 'OPERATIVOS, COMERCIALES Y MANDOS MEDIOS', description: 'Procesos de selección claros y personalizados para incorporar el talento que sostiene el crecimiento de tu organización.', icon: Users, color: 'from-cyan-500 to-blue-600' },
  { id: 'executive-search', title: 'Executive Search', eyebrow: 'DIRECCIÓN Y LIDERAZGO ESTRATÉGICO', description: 'Búsqueda confidencial de líderes y perfiles críticos, con acompañamiento consultivo para decisiones de alto impacto.', icon: BriefcaseBusiness, color: 'from-blue-600 to-indigo-600' },
  { id: 'talento-tech', title: 'Talento Tech & Digital', eyebrow: 'TECNOLOGÍA, DATOS Y PRODUCTO', description: 'Conectamos equipos digitales con especialistas que entienden la complejidad técnica y el negocio.', icon: Cpu, color: 'from-violet-600 to-blue-600' },
  { id: 'equipos-expansion', title: 'Equipos & expansión', eyebrow: 'RPO, NEARSHORE Y ESCALAMIENTO', description: 'Una solución flexible para construir equipos, abrir mercado y responder a nuevas etapas de tu empresa.', icon: Rocket, color: 'from-[#00A9A3] to-emerald-600' },
  { id: 'impulso-laboral', title: 'Impulso laboral', eyebrow: 'TU PRÓXIMO EMPLEO', description: 'Acompañamiento profesional para fortalecer tu perfil, comunicar tu valor y avanzar con confianza.', icon: Sparkles, color: 'from-amber-500 to-orange-600' }
] as const;

export const CompactServicesGrid: React.FC<CompactServicesGridProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  return <section aria-label="Servicios Nexo Talento" className="scroll-mt-28"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{services.map((service, index) => {
    const Icon = service.icon;
    return <Reveal key={service.id} delay={0.1 + index * 0.07} className="h-full"><article id={service.id} className={`group scroll-mt-28 flex min-h-[350px] h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${theme === 'dark' ? 'border-white/10 bg-slate-900/65 shadow-xl shadow-black/20 hover:border-cyan-400/50' : 'border-slate-200 bg-white shadow-lg hover:border-cyan-500/45'}`}>
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}><Icon className="h-6 w-6" /></div>
      <p className="text-[10px] font-black tracking-[0.12em] text-cyan-600 dark:text-cyan-300">{service.eyebrow}</p><h2 className="mt-2 font-heading text-xl font-black text-slate-900 dark:text-white">{service.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
      <button type="button" onClick={() => onNavigate(service.id === 'impulso-laboral' ? '/jobhunting' : '/contacto')} className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-black text-cyan-700 transition-colors hover:text-cyan-500 dark:text-cyan-300">{service.id === 'impulso-laboral' ? 'Conocer el programa' : 'Hablar con un consultor'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
    </article></Reveal>;
  })}</div></section>;
};
