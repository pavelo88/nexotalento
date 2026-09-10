import React, { useState, useRef, useEffect } from 'react';
import { AgentType, ChatMessage } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Building, 
  CheckCircle2, 
  Copy, 
  Check, 
  HelpCircle,
  X,
  Clock,
  ChevronRight
} from 'lucide-react';

interface AIAgentsSuiteProps {
  initialAgent?: AgentType;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  isEmbedded?: boolean;
}

const AGENTS_METADATA: Record<AgentType, {
  name: string;
  badge: string;
  role: string;
  description: string;
  avatarBg: string;
  icon: React.ElementType;
  quickPrompts: string[];
  welcomeMessage: string;
}> = {
  headhunter: {
    name: 'Nexo Senior Headhunter AI',
    badge: 'Executive Search & Direct Search',
    role: 'Asesor Especialista en Reclutamiento C-Level y Directivo',
    description: 'Especializado en perfiles directivos, CTOs, CFOs, Directores Generales y estrategia de caza confidencial en España.',
    avatarBg: 'from-cyan-500 to-blue-600',
    icon: Briefcase,
    quickPrompts: [
      '¿Cuánto tarda un proceso de Executive Search para un Director General en Madrid?',
      '¿Qué metodología de evaluación por competencias usa Nexo Talentos?',
      'Necesitamos contratar un CTO en Barcelona, ¿cuáles son los requisitos clave?',
      '¿Cómo garantizáis la confidencialidad en la caza de talento de la competencia?'
    ],
    welcomeMessage: '¡Hola! Soy **Nexo Senior Headhunter AI**. Asesoro a comités de dirección, CEOs y directores de RRHH en España a definir la estrategia de atracción para perfiles directivos y críticos. Terna final en 18 días con 12 meses de garantía. ¿Qué posición o reto de talento estás liderando?'
  },
  evaluator: {
    name: 'Nexo Career & CV Advisor AI',
    badge: 'Evaluador de Perfiles & Carrera',
    role: 'Consultor de Orientación Directiva y Optimización de Perfil',
    description: 'Ayuda a directivos y profesionales sénior a auditar su propuesta de valor, adecuar su CV y preparar entrevistas.',
    avatarBg: 'from-indigo-500 to-purple-600',
    icon: FileText,
    quickPrompts: [
      '¿Cómo estructuro mi CV para un puesto de Dirección de Operaciones?',
      '¿Qué preguntas situacionales me hará un Headhunter en una entrevista C-Level?',
      '¿Cómo plasmar métricas de impacto y facturación en mi trayectoria?',
      'Tengo 15 años de experiencia y quiero dar el salto a Consejo o Dirección.'
    ],
    welcomeMessage: '¡Bienvenido! Soy **Nexo Career & CV Advisor AI**. Te ayudo a potenciar tu trayectoria profesional, destacar tus logros cuantitativos y triunfar en los procesos de selección directiva más selectos de España y el exterior.'
  },
  salary: {
    name: 'Nexo Salary Benchmark AI',
    badge: 'Compensación & Beneficios 2026',
    role: 'Consultor de Bandas Salariales y Mercado Retributivo España',
    description: 'Provee datos actualizados de salarios fijos, variables y paquetes de beneficios para posiciones clave en España.',
    avatarBg: 'from-emerald-500 to-teal-600',
    icon: TrendingUp,
    quickPrompts: [
      '¿Cuál es el salario medio de un Head of Engineering en Madrid vs Remoto?',
      '¿Qué porcentaje de retribución variable y bonus se maneja para un Director Comercial?',
      'Rango salarial de un CFO para empresa con 20M€ de facturación en España.',
      '¿Cuáles son los beneficios más valorados por el talento sénior en 2026?'
    ],
    welcomeMessage: '¡Saludos! Soy **Nexo Salary Benchmark AI**. Te ofrezco inteligencia retributiva precisa y actualizada sobre salarios brutos anuales, esquemas de bonus e incentivos directivos en el mercado español.'
  },
  advisor: {
    name: 'Nexo Talent Strategist B2B',
    badge: 'Diagnóstico & Consultoría RRHH',
    role: 'Estratega de Retención, Cultura y ROI de Contratación',
    description: 'Calcula el impacto de una vacante desierta, planes de incentivos a largo plazo (LTIP) y optimización de costes de contratación.',
    avatarBg: 'from-amber-500 to-orange-600',
    icon: Building,
    quickPrompts: [
      '¿Cuánto le cuesta a una empresa tener una dirección vacante durante 3 meses?',
      '¿Por qué el modelo de éxito de Nexo Talentos reduce la rotación a menos del 2%?',
      '¿Qué diferencia hay entre contratar por RPO frente a Headhunting puntual?',
      '¿Cómo diseñar un plan de onboarding que asegure el éxito en los primeros 90 días?'
    ],
    welcomeMessage: 'Hola. Soy **Nexo Talent Strategist B2B**. Ayudo a organizaciones a cuantificar el impacto económico de su capital humano y a diseñar estrategias de selección escalables y de alto rendimiento.'
  }
};

// Simple helper to format Markdown-like texts with headers, bullets, bolding
function renderFormattedMessage(text: string) {
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3 or 4
        if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
          const headingText = trimmed.replace(/^#{3,4}\s+/, '');
          return (
            <h4 key={idx} className="font-extrabold text-sm sm:text-base text-cyan-800 dark:text-cyan-300 mt-2 mb-1">
              {headingText}
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-cyan-600 dark:text-cyan-400 font-black shrink-0 mt-0.5">•</span>
              <span className="text-slate-800 dark:text-slate-200">{renderInlineFormatting(bulletText)}</span>
            </div>
          );
        }

        // Table separator skip
        if (trimmed.startsWith('|') && trimmed.includes('---')) {
          return null;
        }

        // Table row
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          const cells = trimmed.split('|').filter(Boolean).map(c => c.trim());
          const isHeader = idx === 0 || lines[idx - 1]?.includes('---');
          return (
            <div key={idx} className={`grid grid-cols-3 sm:grid-cols-4 gap-1 p-1.5 rounded my-1 text-[11px] ${
              isHeader 
                ? 'bg-cyan-100/70 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 font-extrabold border border-cyan-300/60 dark:border-cyan-800/40' 
                : 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}>
              {cells.map((cell, cIdx) => (
                <div key={cIdx} className={isHeader ? 'font-black' : 'font-medium'}>
                  {renderInlineFormatting(cell)}
                </div>
              ))}
            </div>
          );
        }

        return (
          <p key={idx} className="my-0.5 text-slate-800 dark:text-slate-200">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string) {
  // Simple bold parser **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-950 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const AIAgentsSuite: React.FC<AIAgentsSuiteProps> = ({ 
  initialAgent = 'headhunter',
  isOpenModal = false,
  onCloseModal,
  isEmbedded = false
}) => {
  const { theme } = useTheme();
  const [activeAgent, setActiveAgent] = useState<AgentType>(initialAgent);
  const [messages, setMessages] = useState<Record<AgentType, ChatMessage[]>>({
    headhunter: [
      {
        id: 'msg-1',
        role: 'assistant',
        content: AGENTS_METADATA.headhunter.welcomeMessage,
        timestamp: 'Ahora',
        agentType: 'headhunter'
      }
    ],
    evaluator: [
      {
        id: 'msg-2',
        role: 'assistant',
        content: AGENTS_METADATA.evaluator.welcomeMessage,
        timestamp: 'Ahora',
        agentType: 'evaluator'
      }
    ],
    salary: [
      {
        id: 'msg-3',
        role: 'assistant',
        content: AGENTS_METADATA.salary.welcomeMessage,
        timestamp: 'Ahora',
        agentType: 'salary'
      }
    ],
    advisor: [
      {
        id: 'msg-4',
        role: 'assistant',
        content: AGENTS_METADATA.advisor.welcomeMessage,
        timestamp: 'Ahora',
        agentType: 'advisor'
      }
    ]
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialAgent) {
      setActiveAgent(initialAgent);
    }
  }, [initialAgent]);

  useEffect(() => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTop = chatScrollContainerRef.current.scrollHeight;
    }
  }, [messages, activeAgent]);

  const currentAgentInfo = AGENTS_METADATA[activeAgent];
  const currentChatMessages = messages[activeAgent] || [];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentType: activeAgent
    };

    setMessages((prev) => ({
      ...prev,
      [activeAgent]: [...prev[activeAgent], newUserMsg]
    }));

    if (!textToSend) {
      setInputMessage('');
    }
    setIsLoading(true);

    try {
      const historyPayload = currentChatMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: activeAgent,
          message: text,
          history: historyPayload
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'He procesado tu consulta. En Nexo Talentos disponemos de consultores directivos en Madrid y Barcelona para ayudarte.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentType: activeAgent
      };

      setMessages((prev) => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], assistantMsg]
      }));
    } catch (err) {
      console.error('Error sending message:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: 'En **Nexo Talentos** disponemos de consultores sénior para atenderte de forma personalizada. Para perfiles clave o búsquedas inmediatas en España, puedes llamarnos al +34 910 88 44 20 o vía WhatsApp al +34 614 143 763.',
        timestamp: 'Ahora',
        agentType: activeAgent
      };
      setMessages((prev) => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], fallbackMsg]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages((prev) => ({
      ...prev,
      [activeAgent]: [
        {
          id: `reset-${Date.now()}`,
          role: 'assistant',
          content: AGENTS_METADATA[activeAgent].welcomeMessage,
          timestamp: 'Ahora',
          agentType: activeAgent
        }
      ]
    }));
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const containerContent = (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl border transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900/90 border-slate-800/90 text-slate-100 backdrop-blur-xl' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Header & Agent Selector Tabs */}
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className={`text-xs font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Agentes Inteligentes Nexo Talentos
            </span>
            <span className="bg-cyan-500/15 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
              Gemini 3.7 Flash
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                  : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-200'
              }`}
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
            {isOpenModal && onCloseModal && (
              <button
                onClick={onCloseModal}
                className={`p-1 rounded-lg ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Agent Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(AGENTS_METADATA) as AgentType[]).map((type) => {
            const ag = AGENTS_METADATA[type];
            const Icon = ag.icon;
            const isSelected = activeAgent === type;

            return (
              <button
                key={type}
                id={`agent-tab-${type}`}
                onClick={() => setActiveAgent(type)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all relative border ${
                  isSelected
                    ? theme === 'dark'
                      ? 'bg-slate-800/95 text-white border-cyan-500/50 shadow-md shadow-cyan-950/50'
                      : 'bg-cyan-50/80 text-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10 font-bold'
                    : theme === 'dark'
                      ? 'bg-slate-950/50 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800/60'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${ag.avatarBg} flex items-center justify-center text-white shrink-0 shadow-sm`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate leading-snug">{ag.name.replace('Nexo ', '')}</p>
                  <p className={`text-[10px] truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{ag.badge}</p>
                </div>
                {isSelected && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Agent Info Banner */}
      <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
        theme === 'dark' ? 'bg-slate-950/40 border-slate-800/50 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2">
          <currentAgentInfo.icon className="w-4 h-4 text-cyan-500" />
          <span className="font-semibold">{currentAgentInfo.role}</span>
        </div>
        <span className="text-[11px] hidden sm:inline opacity-80">
          Respuestas con datos verificados de España 2026
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div 
        id="agent-chat-messages-container"
        ref={chatScrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[440px] min-h-[300px]"
      >
        {currentChatMessages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div
                  className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentAgentInfo.avatarBg} flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-cyan-950/30`}
                >
                  <currentAgentInfo.icon className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm relative group ${
                  isAssistant
                    ? theme === 'dark'
                      ? 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-tl-sm'
                      : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-sm'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                }`}
              >
                {/* Agent Tag if Assistant */}
                {isAssistant && (
                  <div className={`flex items-center justify-between gap-2 mb-2 pb-1.5 border-b ${
                    theme === 'dark' ? 'border-slate-700/50' : 'border-slate-300'
                  }`}>
                    <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {currentAgentInfo.name}
                    </span>
                    <span className="text-[10px] opacity-70 text-slate-600 dark:text-slate-400">{msg.timestamp}</span>
                  </div>
                )}

                {/* Content text formatted */}
                <div>
                  {renderFormattedMessage(msg.content)}
                </div>

                {/* Copy Helper */}
                {isAssistant && (
                  <div className={`mt-2.5 pt-1.5 border-t flex items-center justify-between text-[11px] ${
                    theme === 'dark' ? 'border-slate-700/40 text-slate-400' : 'border-slate-300 text-slate-600'
                  }`}>
                    <span className="text-[10px] opacity-80 font-medium">Nexo Talentos AI System</span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.id, msg.content)}
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors font-semibold cursor-pointer"
                      title="Copiar respuesta"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center animate-pulse">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentAgentInfo.avatarBg} flex items-center justify-center text-white shrink-0`}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div className={`rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 border ${
              theme === 'dark' ? 'bg-slate-800/90 border-slate-700/60 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-200" />
              <span className="text-xs ml-2 font-medium">
                Analizando con inteligencia de mercado español...
              </span>
            </div>
          </div>
        )}
      </div>



      {/* Input Box */}
      <div className={`p-3.5 border-t ${
        theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="agent-chat-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Haz una pregunta sobre ${currentAgentInfo.badge}...`}
            aria-label={`Pregunta para el agente de IA ${currentAgentInfo.name}`}
            data-webmcp-field="agent-chat-input"
            disabled={isLoading}
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-700 text-slate-100 placeholder-slate-400'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 text-xs sm:text-sm shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Consultar</span>
          </button>
        </form>
      </div>

    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
        <div className="w-full max-w-4xl h-[90vh] max-h-[750px]">
          {containerContent}
        </div>
      </div>
    );
  }

  if (isEmbedded) {
    return (
      <div className="w-full h-[620px]">
        {containerContent}
      </div>
    );
  }

  return (
    <section id="agentes-ia" className={`py-16 sm:py-12 sm:py-16 border-y transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-slate-100' : 'bg-slate-50/80 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>Inteligencia Artificial Especializada en RRHH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Agentes de IA para Comités de Dirección y Talento
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Interactúa en tiempo real con nuestros modelos entrenados con estudios de compensación, metodologías de Executive Search y evaluación de competencias en España.
          </p>
        </div>

        {/* Live Chat Component */}
        <div className="max-w-4xl mx-auto h-[620px]">
          {containerContent}
        </div>

      </div>
    </section>
  );
};
