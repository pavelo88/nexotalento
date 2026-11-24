import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { signInAdmin, type AdminUser } from '../../auth/adminAuth';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Sparkles
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (userData: AdminUser) => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const user = await signInAdmin(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.code === 'auth/invalid-credential'
        ? 'Correo o contraseña inválidos.'
        : err.message || 'Error al iniciar sesión.');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`w-full max-w-md rounded-3xl border p-8 shadow-2xl relative z-10 backdrop-blur-xl ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-slate-800 shadow-black/50' 
          : 'bg-white/95 border-slate-200 shadow-slate-300/50'
      }`}>
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#082041] via-[#00A9A3] to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold font-heading tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Nexo Talento CMS &amp; Business Intelligence
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <>
          {/* ================= VISTA DE LOGIN ESTÁNDAR ================= */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
              placeholder="tu correo administrativo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-950 border-slate-700 focus:border-[#00A9A3]' 
                      : 'bg-slate-50 border-slate-200 focus:border-[#00A9A3]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Contraseña (Cédula en Primer Ingreso)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Tu contraseña o número de cédula"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-950 border-slate-700 focus:border-[#00A9A3]' 
                      : 'bg-slate-50 border-slate-200 focus:border-[#00A9A3]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600 hover:opacity-95 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-400 hover:text-[#00A9A3] transition-colors"
          >
            ← Volver a la página principal
          </button>
        </div>

      </div>
    </div>
  );
};
