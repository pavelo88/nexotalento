import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { AIAgentsSuite } from '../components/AIAgentsSuite';
import { PageRoute, AgentType } from '../types';
import { 
  Bot, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface AgentesIAPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent?: (agentType?: AgentType) => void;
}

export const AgentesIAPage: React.FC<AgentesIAPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-4">
            <Bot className="w-4 h-4" />
            <span>Inteligencia Artificial Especializada en RRHH &amp; Headhunting</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Asesores IA para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Comités y Talento Directivo</span>
          </h1>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Interactúa en tiempo real con modelos orquestados con estudios salariales 2026, normativas de compliance laboral (Art. 43 y 21 ET) y metodologías de caza directa en España.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Motor Gemini 3.7 + NVIDIA API</p>
              <p className="text-[11px] text-slate-400">Respuestas contextuales ultrarrápidas</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Compliance &amp; EU AI Act</p>
              <p className="text-[11px] text-slate-400">Sin sesgo y conforme al RGPD</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">100% Confidencial</p>
              <p className="text-[11px] text-slate-400">Tus datos nunca entrenan modelos</p>
            </div>
          </div>
        </div>

        {/* Full Interactive AI Suite Component */}
        <div className="max-w-4xl mx-auto mb-16">
          <AIAgentsSuite isEmbedded={true} />
        </div>

        {/* Bottom CTA Banner */}
        <div className={`max-w-4xl mx-auto p-8 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-cyan-500/30'
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div className="text-left space-y-1.5">
            <h3 className="text-lg font-bold font-heading">
              ¿Prefieres conversar con un Socio Consultor Humano?
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Nuestros Headhunters sénior atienden consultas estratégicas de contratación en Madrid y Barcelona.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34614143763?text=Hola%20Nexo%20Talentos,%20deseo%20asesoria%20directa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md btn-spring-press"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>

            <button
              onClick={() => onNavigate('/contacto')}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md btn-spring-press"
            >
              <span>Contactar con Consultor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
