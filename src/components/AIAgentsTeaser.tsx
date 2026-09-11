import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  Sparkles, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Building, 
  ArrowRight,
  Zap,
  ChevronDown
} from 'lucide-react';
import { AgentType, PageRoute } from '../types';

interface AIAgentsTeaserProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: AgentType) => void;
}

export const AIAgentsTeaser: React.FC<AIAgentsTeaserProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('headhunter');

  const agents = [
    {
      id: 'headhunter' as AgentType,
      name: 'Senior Headhunter AI',
      role: 'Executive Search & C-Level',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      sampleQuery: '¿Cuánto tarda un proceso de selección para un Director General en Madrid?',
      desc: 'Especialista en perfiles directivos, mapeo de competencia y caza confidencial.'
    },
    {
      id: 'evaluator' as AgentType,
      name: 'Career & CV Advisor AI',
      role: 'Auditor de Perfiles & Carrera',
      icon: FileText,
      color: 'from-indigo-500 to-purple-600',
      sampleQuery: '¿Qué preguntas situacionales STAR me harán en una entrevista C-Level?',
      desc: 'Audita el CV directivo y alinea la propuesta de valor con las exigencias del mercado.'
    },
    {
      id: 'salary' as AgentType,
      name: 'Salary Benchmark AI',
      role: 'Compensación España 2026',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      sampleQuery: '¿Cuál es el salario medio de un Head of Engineering en Madrid vs Remoto?',
      desc: 'Bandas salariales por percentiles (P25-P90), esquemas de bonus y retribución flexible.'
    },
    {
      id: 'advisor' as AgentType,
      name: 'Talent Strategist B2B',
      role: 'ROI & Consultoría Laboral',
      icon: Building,
      color: 'from-amber-500 to-orange-600',
      sampleQuery: '¿Cuánto le cuesta a mi empresa una vacante clave desierta durante 3 meses?',
      desc: 'Cuantifica el coste de vacante, rotación y planes de retención a largo plazo.'
    }
  ];

  const currentAgent = agents.find(a => a.id === selectedAgent) || agents[0];

  return (
    <section id="agentes-ia-resumen" className={`py-14 sm:py-16 relative border-y transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Direct Full Page Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-900 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span>Inteligencia Artificial Especializada en RRHH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Suite de Agentes IA para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Comités de Dirección</span>
            </h2>
            <p className={`mt-1.5 text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              4 Asesores inteligentes disponibles 24/7 entrenados con la normativa laboral española y estudios de compensación 2026.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/servicios')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto group cursor-pointer btn-spring-press"
          >
            <span>Explorar Servicios y Consultoría Especializada</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Compact Interactive Teaser Card */}
        <div className={`p-5 sm:p-8 rounded-3xl border shadow-xl transition-all ${
          theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          
          {/* MOBILE ONLY: Dropdown Selector for Complete, Uncut Text */}
          <div className="block sm:hidden mb-5">
            <label className={`block text-xs font-bold mb-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Seleccionar Agente Especializado:
            </label>
            <div className="relative">
              <select
                aria-label="Seleccionar agente de IA para el servicio"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value as AgentType)}
                className={`w-full p-3.5 pr-10 rounded-xl text-xs font-bold border appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                }`}
              >
                {agents.map((ag) => (
                  <option key={ag.id} value={ag.id}>
                    {ag.name} — {ag.role}
                  </option>
                ))}
              </select>
              <ChevronDown className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`} />
            </div>
          </div>

          {/* DESKTOP / TABLET ONLY: 4 Agent Selection Tabs */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {agents.map((ag) => {
              const Icon = ag.icon;
              const isSelected = selectedAgent === ag.id;
              return (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAgent(ag.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-slate-800 border-cyan-500/60 shadow-md shadow-cyan-950/40 text-white'
                        : 'bg-cyan-50/80 border-cyan-500 text-slate-900 shadow-sm font-bold'
                      : theme === 'dark'
                        ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${ag.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{ag.name}</p>
                    <p className={`text-[10px] truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{ag.role}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Agent Interactive Preview Box */}
          <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
            theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pregunta Frecuente al Asesor:
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold italic text-slate-800 dark:text-slate-200">
                "{currentAgent.sampleQuery}"
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentAgent.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => onOpenAIAgent(currentAgent.id)}
                className="px-4 py-2.5 rounded-xl border border-cyan-500/40 hover:bg-cyan-500/10 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Consultar a {currentAgent.name.replace(' AI', '')}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
