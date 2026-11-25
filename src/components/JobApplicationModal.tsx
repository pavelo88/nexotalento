import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { JobPosition } from '../types';
import { loginCandidate, registerCandidate, submitCandidateApplication, validateCv } from '../features/candidates/application';
import { auth } from '../lib/firebase';
import { 
  X, 
  ChevronRight, 
  FolderUp, 
  Cloud, 
  Send, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface JobApplicationModalProps {
  job: JobPosition | null;
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  theme
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Application Form Inputs
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateLinkedin, setCandidateLinkedin] = useState('');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [desiredSalary, setDesiredSalary] = useState('');
  const [availability, setAvailability] = useState('Inmediata');
  const [candidatePassword, setCandidatePassword] = useState('');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [candidateUser, setCandidateUser] = useState<User | null>(null);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !job) return null;

  const handleClose = () => {
    onClose();
    setStep(1);
    setIsSuccess(false);
    setCvFileName(null);
    setCvFile(null);
    setCandidatePassword('');
    setCandidateUser(null);
    setConsent(false);
    setError('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateCv(file);
      if (validationError) { setError(validationError); return; }
      setError('');
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <section role="dialog" aria-modal="true" aria-label="Acceso requerido para postular" className={`w-full max-w-md rounded-3xl border p-7 shadow-2xl ${theme === 'dark' ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
          <button type="button" onClick={handleClose} className="float-right rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          <span className="text-xs font-black uppercase tracking-wide text-emerald-500">Postulación segura</span>
          <h2 className="mt-3 font-heading text-2xl font-black">Crea o ingresa a tu perfil primero</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">Para postular a <strong className="text-inherit">{job.title}</strong>, necesitamos asociar tu CV y el estado de tu proceso a una cuenta privada.</p>
          <button type="button" onClick={() => { window.location.assign('/crear-perfil'); }} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 font-black text-slate-950">Crear mi perfil <ArrowRight className="h-4 w-4" /></button>
          <button type="button" onClick={() => { window.location.assign('/crear-perfil?modo=ingresar'); }} className="mt-3 w-full rounded-xl border border-slate-600 px-4 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-300">Ya tengo una cuenta</button>
        </section>
      </div>
    );
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !consent) { setError('Selecciona un CV válido y acepta el consentimiento para continuar.'); return; }
    setIsSubmitting(true); setError('');
    try {
      const user = candidateUser || (authMode === 'register' ? await registerCandidate(candidateEmail, candidatePassword) : await loginCandidate(candidateEmail, candidatePassword));
      if (!user.emailVerified) throw new Error('Verifica tu email antes de enviar la postulación y luego inicia sesión nuevamente.');
      setCandidateUser(user);
      await submitCandidateApplication({ user, file: cvFile, name: candidateName, phone: candidatePhone, linkedin: candidateLinkedin, desiredSalary, availability, jobId: job.id, jobTitle: job.title });
      setIsSuccess(true);
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : 'No fue posible enviar la postulación.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <div>
            <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider">
              Postulación de Candidato
            </span>
            <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">
              {job.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Step Progress Bar */}
        {!isSuccess && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
              <span className={step >= 1 ? 'text-emerald-500 font-extrabold' : ''}>1. Datos Personales</span>
              <span className={step >= 2 ? 'text-emerald-500 font-extrabold' : ''}>2. Carga de CV</span>
              <span className={step >= 3 ? 'text-emerald-500 font-extrabold' : ''}>3. Disponibilidad</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {!isSuccess ? (
            <div>
              {/* STEP 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label 
                      htmlFor="job-candidate-name"
                      className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                      Nombre y Apellidos *
                    </label>
                    <input
                      id="job-candidate-name"
                      type="text"
                      required
                      placeholder="Ej. Laura Martínez González"
                      aria-label="Nombre y Apellidos del Candidato"
                      data-webmcp-field="candidate-name"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                        theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label 
                        htmlFor="job-candidate-email"
                        className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >
                        Email de Contacto *
                      </label>
                      <input
                        id="job-candidate-email"
                        type="email"
                        required
                        placeholder="tu.email@ejemplo.com"
                        aria-label="Email de Contacto del Candidato"
                        data-webmcp-field="candidate-email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                          theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="job-candidate-phone"
                        className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >
                        Teléfono *
                      </label>
                      <input
                        id="job-candidate-phone"
                        type="tel"
                        required
                        placeholder="+593 99 123 4567"
                        aria-label="Teléfono del Candidato"
                        data-webmcp-field="candidate-phone"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                          theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="job-candidate-linkedin"
                      className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                      Enlace a Perfil de LinkedIn (Opcional)
                    </label>
                    <input
                      id="job-candidate-linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/tu-perfil"
                      aria-label="Enlace a Perfil de LinkedIn"
                      data-webmcp-field="candidate-linkedin"
                      value={candidateLinkedin}
                      onChange={(e) => setCandidateLinkedin(e.target.value)}
                      className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                        theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!candidateName || !candidateEmail || !candidatePhone) {
                          alert('Por favor completa nombre, email y teléfono.');
                          return;
                        }
                        setStep(2);
                      }}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Siguiente: Subir CV</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CV Upload & 1-Click Connectors */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className={`p-6 border-2 border-dashed rounded-2xl text-center relative transition-all ${
                    cvFileName ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-950/40 hover:border-emerald-500/50'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FolderUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    {cvFileName ? (
                      <div>
                        <p className="text-xs font-bold text-emerald-400">Archivo Seleccionado:</p>
                        <p className="text-xs text-white font-mono mt-0.5">{cvFileName}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Haz clic para cambiar de archivo</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold">Arrastra tu CV aquí o haz clic para subir</p>
                        <p className="text-[10px] text-slate-400 mt-1">Formatos aceptados: PDF, Word (Máx 10MB)</p>
                      </div>
                    )}
                  </div>

                  {error && <p role="alert" className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">{error}</p>}

                  {/* 1-Click Cloud & LinkedIn Connectors */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                      O Importa con 1 Clic desde:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setError('La importación directa desde LinkedIn aún no está habilitada. Selecciona tu archivo para continuar.')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-blue-500' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span>💼 LinkedIn</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setError('La importación directa desde Drive aún no está habilitada. Selecciona tu archivo para continuar.')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-cyan-500' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <Cloud className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Drive</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setError('La importación directa desde iCloud aún no está habilitada. Selecciona tu archivo para continuar.')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-teal-500' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span>☁️ iCloud</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!cvFileName) {
                          alert('Por favor sube o importa tu CV.');
                          return;
                        }
                        setStep(3);
                      }}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Siguiente: Preferencias</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Expectations & Confirmation */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-3.5" data-webmcp-form="job-application-preferences">
                  <div>
                    <label 
                      htmlFor="job-desired-salary"
                      className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                      Pretensión Salarial
                    </label>
                    <input
                      id="job-desired-salary"
                      type="text"
                      placeholder="Ej. USD 1.800 o según banda"
                      aria-label="Pretensión Salarial"
                      data-webmcp-field="desired-salary"
                      value={desiredSalary}
                      onChange={(e) => setDesiredSalary(e.target.value)}
                      className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                        theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="job-availability-select"
                      className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                      Disponibilidad de Incorporación
                    </label>
                    <select
                      id="job-availability-select"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      aria-label="Disponibilidad de Incorporación"
                      data-webmcp-field="availability"
                      className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                        theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    >
                      <option value="Inmediata">Inmediata (Sin preaviso)</option>
                      <option value="15 Dias">15 Días (Preaviso estándar)</option>
                      <option value="1 Mes">1 Mes (Preaviso ejecutivo)</option>
                      <option value="2 Meses">2 Meses o más</option>
                    </select>
                  </div>

                  {/* Summary Box */}
                  <div className={`p-3.5 rounded-xl border text-xs ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confidencialidad Garantizada</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Tus datos se procesarán exclusivamente para este proceso de selección y no se compartirán con terceros sin tu consentimiento previo expreso (Políticas de Confidencialidad y Protección de Datos).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cuenta segura del candidato</label>
                    <div className="flex gap-2 text-[11px] font-bold">
                      <button type="button" onClick={() => setAuthMode('register')} className={authMode === 'register' ? 'text-emerald-400' : 'text-slate-400'}>Crear cuenta</button>
                      <button type="button" onClick={() => setAuthMode('login')} className={authMode === 'login' ? 'text-emerald-400' : 'text-slate-400'}>Ya tengo cuenta</button>
                    </div>
                    <input type="password" required minLength={8} placeholder="Contraseña (mínimo 8 caracteres)" value={candidatePassword} onChange={(e) => setCandidatePassword(e.target.value)} className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'}`} />
                    <label className="flex gap-2 items-start text-[11px] text-slate-400">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-emerald-500" />
                      <span>Acepto el tratamiento de mis datos y CV para esta postulación, según la política de privacidad. *</span>
                    </label>
                  </div>

                  {error && <p role="alert" className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">{error}</p>}

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Enviando de forma segura...' : 'Confirmar y Enviar Postulación'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Instant Confirmation Card */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold font-heading text-emerald-400">
                ¡Postulación Enviada con Éxito!
              </h3>
              <div className={`p-4 rounded-xl border text-left text-xs space-y-2 max-w-md mx-auto ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <p className="font-bold text-white">Siguientes pasos de tu proceso:</p>
                <p>1. <strong>Revisión del CV:</strong> Nuestro equipo de Headhunters evaluará tu encaje competencial con <strong>{job.title}</strong>.</p>
                <p>2. <strong>Contacto en &lt;48h:</strong> Te contactaremos al <strong>{candidatePhone}</strong> o escribiremos a <strong>{candidateEmail}</strong>.</p>
                <p>3. <strong>Entrevista STAR:</strong> Si tu perfil encaja con el perfil requerido, coordinaremos la primera sesión confidencial.</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer active:scale-95 transition-all"
                >
                  Cerrar y Ver Más Ofertas
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
