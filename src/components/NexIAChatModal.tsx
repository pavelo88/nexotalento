import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  Send, 
  User, 
  RotateCcw, 
  X, 
  MessageSquare, 
  Check,
  Copy,
  Sparkles
} from 'lucide-react';

interface NexIAChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

export const NexIAChatModal: React.FC<NexIAChatModalProps> = ({
  isOpen,
  onClose
}) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: '¡Hola! Soy **NexIA**, tu asesora virtual de talento en **Nexo Talentos**.\n\nEstoy lista para ayudarte a definir y cubrir posiciones directivas y técnicas bajo nuestro compromiso garantizado de **terna validada en 18 días hábiles**.\n\n¿Qué perfil necesitas incorporar en tu equipo?',
      timestamp: 'Ahora'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const whatsappNumber = '34614143763';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const buildWhatsAppUrl = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || 'Consulta sobre selección directiva y terna en 18 días';
    const text = `Hola Nexo Talentos, estuve consultando con NexIA sobre: "${lastUserMsg}". Deseo coordinar con un Senior Partner.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: 'nexia',
          message: text,
          history: historyPayload
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || '¡Entendido! Tomo nota de los detalles. ¿Deseas que coordinemos los siguientes pasos por WhatsApp, llamada telefónica o teleconferencia?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error sending message:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '¡Perfecto! Para atenderte con la máxima agilidad y presentarte nuestra propuesta de terna en 18 días, ¿prefieres que te contactemos por **WhatsApp**, por **llamada telefónica** o agendamos una breve **teleconferencia**?',
        timestamp: 'Ahora'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content: '¡Hola de nuevo! Soy **NexIA**. ¿Qué perfil directivo o técnico necesitas incorporar en tu equipo?',
        timestamp: 'Ahora'
      }
    ]);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="w-full max-w-lg h-[86vh] max-h-[680px] rounded-3xl flex flex-col shadow-2xl relative overflow-hidden transition-all border border-slate-800 bg-[#0f1422] text-slate-100"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 169, 163, 0.25)'
        }}
      >
        {/* Subtle Ambient Lighting */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00A9A3]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Clean, Elegant Header with Prominent Title and Direct Actions */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between relative z-10 bg-[#141a2c] shrink-0">
          <div className="flex items-center gap-3">
            {/* NexIA Avatar with Green Active Ring */}
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A9A3] to-cyan-400 p-[1.5px] shadow-md shadow-cyan-950/60">
                <div className="w-full h-full rounded-2xl bg-[#0f1422] flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5 text-[#00A9A3]" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0f1422]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-heading">
                  NexIA • Asistente Virtual
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-extrabold border border-cyan-500/30">
                  ONLINE 24/7
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Nexo Talentos • Headhunting &amp; Selección Directiva (18 Días)
              </p>
            </div>
          </div>

          {/* Action cluster in Header: WhatsApp + Reset + Close Button */}
          <div className="flex items-center gap-1.5">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/15 rounded-xl transition-all border border-emerald-500/30"
              title="Transferir a WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 border border-transparent rounded-xl transition-all"
              aria-label="Cerrar ventana"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area (Full Vertical Space) */}
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 relative z-10"
        >
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00A9A3] to-cyan-500 p-[1px] shrink-0 mt-0.5">
                    <div className="w-full h-full rounded-xl bg-[#0f1422] flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-[#00A9A3]" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[84%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                    isAssistant
                      ? 'bg-[#161d2f] text-slate-100 border border-slate-700/70 rounded-tl-sm'
                      : 'bg-gradient-to-r from-[#00A9A3] to-cyan-600 text-slate-950 font-semibold rounded-tr-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.content}
                  </div>

                  {isAssistant && (
                    <div className="mt-2 pt-1.5 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Nexo Talentos</span>
                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                        title="Copiar texto"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copiado</span>
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
                  <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 justify-start items-center animate-pulse">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00A9A3] to-cyan-500 p-[1px] shrink-0">
                <div className="w-full h-full rounded-xl bg-[#0f1422] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-[#00A9A3]" />
                </div>
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 bg-[#161d2f] border border-slate-700/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-bounce delay-200" />
                <span className="text-xs ml-1 text-slate-400 font-medium">
                  NexIA está escribiendo...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar (No wasted vertical space, directly attached at bottom) */}
        <div className="p-3 bg-[#141a2c] border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta (ej. Director de Operaciones en Madrid)..."
              disabled={isLoading}
              className="flex-1 rounded-xl px-4 py-3 text-xs sm:text-sm bg-[#0a0d16] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A9A3] transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#00A9A3] to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-950/50 transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
