import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Eye, EyeOff, LoaderCircle, ArrowRight, UserRound, ShieldCheck, Mail } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { verifyEmailIsReal } from '../../lib/emailValidator';

interface AccountSetupCardProps {
  isDark: boolean;
  surface: string;
  input: string;
  muted: string;
  onSuccess: (name: string, email: string) => void;
  onContinueLocal: (name: string, email: string) => void;
}

export const AccountSetupCard: React.FC<AccountSetupCardProps> = ({
  isDark,
  surface,
  input,
  muted,
  onSuccess,
  onContinueLocal,
}) => {
  const [accountForm, setAccountForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isCreatingAccount) return;
    setAccountError(null);

    const cleanEmail = accountForm.email.trim().toLowerCase();
    const cleanName = accountForm.name.trim();

    if (accountForm.password.length < 8) {
      setAccountError('La contraseña debe tener al menos 8 caracteres por seguridad.');
      return;
    }

    setIsCreatingAccount(true);

    try {
      // 1. Verificación exhaustiva de correo real (sintaxis RFC, anti-desechables y resolución DNS MX)
      const emailCheck = await verifyEmailIsReal(cleanEmail);
      if (!emailCheck.valid) {
        setAccountError(
          (emailCheck.reason || 'El correo electrónico ingresado no es válido.') +
          (emailCheck.suggestion ? ` (Sugerencia: ¿Quisiste escribir ${emailCheck.suggestion}?)` : '')
        );
        setIsCreatingAccount(false);
        return;
      }

      // 2. Creación en Firebase Authentication
      const credential = await createUserWithEmailAndPassword(auth, cleanEmail, accountForm.password);

      // 3. Registro atómico en Firestore con trazabilidad y estado de verificación
      await setDoc(doc(db, 'users', credential.user.uid), {
        uid: credential.user.uid,
        displayName: cleanName,
        email: cleanEmail,
        role: 'afiliate',
        accountType: 'afiliate',
        status: 'pending_verification',
        emailVerified: false,
        emailVerificationSentAt: serverTimestamp(),
        termsAccepted: true,
        policyVersion: '2026-v1',
        securityVersion: 2,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 4. Envío de correo de verificación
      await sendEmailVerification(credential.user);

      onSuccess(cleanName, cleanEmail);
    } catch (error: any) {
      const code = String(error?.code || '');
      const message = String(error?.message || '');

      if (code.includes('email-already-in-use') || message.includes('EMAIL_EXISTS')) {
        setAccountError('Ese correo ya tiene una cuenta registrada en Firebase.');
      } else if (code.includes('configuration-not-found') || message.includes('CONFIGURATION_NOT_FOUND')) {
        setAccountError(
          'Firebase Auth no está activo en este proyecto (studio-2340725787-ed6b5): Habilita "Authentication > Sign-in method > Correo/Contraseña" en Firebase Console, o usa el botón de prueba local abajo.'
        );
      } else if (code.includes('operation-not-allowed')) {
        setAccountError('El método Correo/Contraseña no está habilitado en Firebase Console (Authentication > Sign-in method).');
      } else if (code.includes('weak-password')) {
        setAccountError('La contraseña debe tener al menos 8 caracteres.');
      } else {
        setAccountError(`No se pudo crear la cuenta: ${message || code || 'Error de conexión con Firebase. Puedes usar el modo de prueba abajo.'}`);
      }
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 flex items-center justify-center ${isDark ? 'bg-[#06080B] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 my-auto">
        <form onSubmit={handleSubmit} className={`rounded-2xl sm:rounded-3xl border ${surface} p-6 sm:p-7 shadow-2xl`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center shrink-0">
              <UserRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-cyan-500">Paso 1 de 4</p>
              <h1 className="text-xl sm:text-2xl font-black font-heading leading-tight">Crea tu cuenta profesional</h1>
            </div>
          </div>

          <p className={`text-xs leading-relaxed ${muted} mb-4`}>
            Tu espacio privado para cargar tu CV, añadir tu fotografía y activar tu perfil profesional.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre completo *</label>
              <input
                required
                value={accountForm.name}
                onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                placeholder="Ej. Pablo García"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs outline-none focus:border-cyan-500 transition-colors ${input}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Correo electrónico profesional (verificado) *
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className={`w-full rounded-xl border px-3.5 py-2.5 pr-10 text-xs outline-none focus:border-cyan-500 transition-colors ${input}`}
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className={`mt-1 text-[11px] ${muted}`}>Verificamos en tiempo real que el dominio exista y pueda recibir mensajes.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contraseña (mínimo 8 caracteres) *</label>
              <div className="relative">
                <input
                  required
                  minLength={8}
                  type={showPassword ? 'text' : 'password'}
                  value={accountForm.password}
                  onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border px-3.5 py-2.5 pr-10 text-xs outline-none focus:border-cyan-500 transition-colors ${input}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-400 active:scale-95 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {accountError && (
            <div className="mt-3 rounded-xl bg-red-500/10 border border-red-500/30 px-3.5 py-2 text-xs text-red-500 leading-relaxed">
              <p className="font-semibold">{accountError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isCreatingAccount}
            className="mt-4 w-full rounded-xl py-3 px-4 bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
          >
            {isCreatingAccount ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" /> Verificando correo y creando espacio...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Crear mi cuenta protegida
              </>
            )}
          </button>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={() =>
                onContinueLocal(
                  accountForm.name.trim() || 'Pablo García',
                  accountForm.email.trim() || 'pablofgarciaf@gmail.com'
                )
              }
              className="text-xs text-cyan-500 hover:text-cyan-400 font-bold hover:underline active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Continuar en modo de prueba local (sin Firebase)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className={`mt-3 text-[10px] text-center ${muted}`}>Tus documentos y datos quedan protegidos en tu espacio privado.</p>
        </form>
      </div>
    </div>
  );
};
