import React, { useEffect } from 'react';
import { CheckCircle2, Home, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { COMPANY_CONFIG } from '../config/company';

interface SuccessModalProps {
  isOpen: boolean;
  onGoHome: () => void;
  title?: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onGoHome,
  title = "¡Información Recibida con Éxito!",
  message = "Un Socio Consultor revisará tu solicitud y se pondrá en contacto contigo de forma confidencial. ¿Necesitas algo más de forma urgente?"
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 1000 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onGoHome}
      />
      
      {/* Modal Card */}
      <div className={`relative w-full max-w-md rounded-3xl p-8 shadow-2xl transform scale-100 animate-slideUp fade-in-up ${
        theme === 'dark' ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
      }`}>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h3 className={`text-2xl font-black font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {message}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('Hola, acabo de enviar mi formulario por la web y necesito atención urgente.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onGoHome}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              Sí, Continuar por WhatsApp
            </a>
            
            <button
              onClick={onGoHome}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 font-bold rounded-xl transition-all border active:scale-95 ${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Home className="w-5 h-5" />
              No, Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
