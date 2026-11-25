import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { JobhuntingFormData } from './types';
import { getMarketingAttribution } from '../../lib/attribution';
import { trackEvent } from '../../lib/tracking';

interface JobhuntingFormProps {
  theme: string;
}

export const JobhuntingForm: React.FC<JobhuntingFormProps> = ({ theme }) => {
  const [formData, setFormData] = useState<JobhuntingFormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '3-5 años',
    plan: 'exito',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: 'Candidato ProProfile',
          role: `${formData.role} (${formData.experience})`,
          serviceType: 'Programa Impulso laboral - solicitud de información',
          message: formData.notes,
          source: 'Landing /jobhunting',
          attribution: getMarketingAttribution()
        })
      });
      if (!response.ok) throw new Error('No se pudo registrar la solicitud.');
      trackEvent({ eventName: 'generate_lead', category: 'Jobhunting', label: 'Jobhunting ProProfile' });
      setSubmitSuccess(true);
    } catch {
      setErrorMessage('No pudimos registrar tu solicitud. Revisa tu conexión e inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario-postulacion" data-reveal className={`reveal-on-scroll py-24 border-t ${theme === 'dark' ? 'bg-[#090C11] border-stone-800' : 'bg-stone-100/70 border-stone-200'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl">
          
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#00A896]">
              Admisión y Diagnóstico Gratuito
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Postular al Programa Proprofile
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
              Revisamos tu trayectoria para confirmar si tu perfil encaja en el programa y coordinar la primera sesión.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
                ¡Postulación Recibida!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Un consultor senior de Nexo Talento revisará tu información y te contactará en menos de 24 horas laborables para coordinar tu sesión inicial.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Sánchez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="roberto@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+34 600 000 000 o +593..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Años de Experiencia</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  >
                    <option value="1-3 años">1 a 3 años</option>
                    <option value="3-5 años">3 a 5 años</option>
                    <option value="5-10 años">5 a 10 años</option>
                    <option value="10+ años">Más de 10 años (Directivo/Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Puesto o Área de Búsqueda Objetivo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Director de Operaciones, Tech Lead, Gerente Financiero..."
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                />
              </div>

              {/* Las opciones comerciales se coordinan de forma privada tras el diagnóstico. */}

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Situación Actual o Desafíos</label>
                <textarea
                  rows={3}
                  placeholder="Cuéntanos brevemente cuánto tiempo llevas buscando o tus principales desafíos..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#00A896] via-[#00C4AF] to-[#00E5C9] text-[#0A1826] hover:opacity-90 transition-all shadow-xl shadow-[#00A896]/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Enviando postulación...' : 'Enviar Solicitud de Admisión'}
              </button>

              {errorMessage && <p className="text-xs text-center font-semibold text-rose-600 dark:text-rose-400">{errorMessage}</p>}

              <p className="text-[11px] text-center text-stone-400 pt-1">
                Tus datos se procesan con estricta confidencialidad bajo política de privacidad y protección de datos.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
