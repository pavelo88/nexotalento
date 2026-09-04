import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Building2, 
  Users, 
  Clock, 
  MapPin, 
  Euro, 
  Send,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TalentAssessmentWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyType: 'Scaleup / Empresa en Crecimiento',
    teamSize: '25-100 empleados',
    urgency: 'Inmediata (< 30 días)',
    profileCategory: 'Dirección C-Level (CEO, CTO, CFO, CCO)',
    targetSeniority: 'Executive (+10 años experiencia)',
    workModality: 'Híbrido (2-3 días oficina)',
    location: 'Madrid / Barcelona',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          company: formData.companyName,
          role: formData.profileCategory,
          serviceType: 'Diagnóstico de Talento & Headhunting',
          message: `Diagnóstico realizado: Empresa: ${formData.companyType}, Tamaño: ${formData.teamSize}, Urgencia: ${formData.urgency}, Posición: ${formData.profileCategory}, Ubicación: ${formData.location}`
        })
      });
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="diagnostico-talento" className="py-24 bg-slate-900/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Diagnóstico de Necesidades de Contratación en 2 Minutos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Diseña tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Estrategia de Selección a Medida</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Responde 4 sencillas preguntas para obtener un plan de atracción de talento personalizado y estimación de honorarios de headhunting.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Step Progress Bar */}
          {!isCompleted && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                <span>Paso {currentStep} de 4</span>
                <span className="text-cyan-400">
                  {currentStep === 1 && 'Perfil de Organización'}
                  {currentStep === 2 && 'Posición & Urgencia'}
                  {currentStep === 3 && 'Modalidad & Ubicación'}
                  {currentStep === 4 && 'Propuesta & Contacto'}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ${
                    currentStep === 1 ? 'w-1/4' : currentStep === 2 ? 'w-2/4' : currentStep === 3 ? 'w-3/4' : 'w-full'
                  }`}
                />
              </div>
            </div>
          )}

          {isCompleted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                ¡Diagnóstico Registrado con Éxito!
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Hemos generado tu hoja de ruta personalizada de atracción de talento para <strong>{formData.companyName || 'tu empresa'}</strong>. Un Headhunter Sénior asignado revisará tu caso y te contactará en menos de 24 horas laborables.
              </p>
              
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-2">
                <p className="font-bold text-cyan-400 uppercase text-[11px]">Resumen de tu Solicitud:</p>
                <p>• <strong>Posición:</strong> {formData.profileCategory}</p>
                <p>• <strong>Ubicación:</strong> {formData.location}</p>
                <p>• <strong>Plazo de Entrega:</strong> Terna en 18 días garantizados</p>
                <p>• <strong>Garantía:</strong> Hasta 12 meses de reposición sin coste</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                >
                  Realizar otro diagnóstico
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    ¿Qué tipo de organización representas?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Scaleup / Empresa en Crecimiento',
                      'Gran Corporación / Multinacional',
                      'Pyme Consolidada / Familiar',
                      'Fondo de Private Equity / Venture Capital'
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, companyType: opt })}
                        className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                          formData.companyType === opt
                            ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Tamaño actual de la plantilla
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['1 - 25 empleados', '25 - 100 empleados', '100 - 500 empleados', '+500 empleados'].map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamSize: ts })}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            formData.teamSize === ts
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                    <Users className="w-5 h-5 text-cyan-400" />
                    ¿Qué perfil prioritario necesitas incorporar?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Dirección C-Level (CEO, CTO, CFO, CCO, COO)',
                      'Ingeniería, Software, Cloud & IA',
                      'Comercial B2B, Expansión & Marketing',
                      'Finanzas, Legal & Operaciones',
                      'Recursos Humanos & People Lead',
                      'Proyecto Masivo / Múltiples Posiciones (RPO)'
                    ].map((prof) => (
                      <button
                        key={prof}
                        type="button"
                        onClick={() => setFormData({ ...formData, profileCategory: prof })}
                        className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                          formData.profileCategory === prof
                            ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        {prof}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Urgencia del proceso de contratación
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Inmediata (< 30 días)',
                        'Planificada (1-3 meses)',
                        'Prospección Estratégica'
                      ].map((urg) => (
                        <button
                          key={urg}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: urg })}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            formData.urgency === urg
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {urg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    Ubicación y Modelo de Trabajo
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Madrid & Comunidad de Madrid',
                      'Barcelona & Cataluña',
                      'Valencia & Levante',
                      'País Vasco / Norte',
                      'Andalucía / Sur',
                      '100% Remoto España / Internacional'
                    ].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setFormData({ ...formData, location: loc })}
                        className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                          formData.location === loc
                            ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Modalidad de Presencialidad
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Presencial', 'Híbrido (2-3 días)', '100% Remoto'].map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => setFormData({ ...formData, workModality: mod })}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            formData.workModality === mod
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                    <Send className="w-5 h-5 text-cyan-400" />
                    ¿A dónde enviamos tu propuesta ejecutiva personalizada?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre y Apellidos *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Ej. Rodrigo Fernández"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Empresa *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Ej. NovaTech Iberia S.L."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Corporativo *</label>
                      <input
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="rodrigo@novatech.es"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono Directo *</label>
                      <input
                        type="tel"
                        required
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="+34 612 345 678"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Acuerdo de Confidencialidad (NDA) automático
                    </span>
                    <span className="text-cyan-400 font-semibold">Respuesta en &lt;24h</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span>Generando propuesta ejecutiva...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Recibir Plan de Selección y Cotización Personalizada</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Navigation Buttons (Prev / Next) */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                ) : <div />}

                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-md flex items-center gap-1.5 ml-auto"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
