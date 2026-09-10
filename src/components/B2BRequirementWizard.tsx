import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Building2, 
  Users, 
  Cpu, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  HeartHandshake, 
  Stethoscope, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Send,
  Sliders
} from 'lucide-react';

interface B2BRequirementWizardProps {
  onOpenContact?: () => void;
}

export const B2BRequirementWizard: React.FC<B2BRequirementWizardProps> = ({ onOpenContact }) => {
  const { theme } = useTheme();

  // State
  const [selectedRoleType, setSelectedRoleType] = useState('tech');
  const [vacancyCount, setVacancyCount] = useState(2);
  const [modality, setModality] = useState<'hibrido' | 'remoto' | 'presencial'>('hibrido');
  const [location, setLocation] = useState('Madrid');
  const [urgency, setUrgency] = useState<'estandar' | 'urgente'>('estandar');
  
  // Contact inputs
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleProfiles = [
    {
      id: 'clevel',
      title: 'C-Level & Dirección General',
      subtitle: 'CEO, CTO, CFO, CMO, COO',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      estimatedDays: 18,
      avgSalary: '95k - 180k €'
    },
    {
      id: 'tech',
      title: 'Tecnología, Cloud & IA',
      subtitle: 'Tech Leads, DevOps, Data & IA',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      estimatedDays: 15,
      avgSalary: '65k - 110k €'
    },
    {
      id: 'finance',
      title: 'Finanzas, M&A & Legal',
      subtitle: 'Directores Financieros, Controllers',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      estimatedDays: 16,
      avgSalary: '70k - 130k €'
    },
    {
      id: 'sales',
      title: 'Comercial & Expansión B2B',
      subtitle: 'Dir. Comerciales, VP Sales, KAM',
      icon: Users,
      color: 'from-amber-500 to-orange-600',
      estimatedDays: 14,
      avgSalary: '60k - 120k €'
    },
    {
      id: 'health',
      title: 'Salud, Pharma & Biotech',
      subtitle: 'Medical Directors, MSL, Pharma',
      icon: Stethoscope,
      color: 'from-rose-500 to-pink-600',
      estimatedDays: 18,
      avgSalary: '80k - 145k €'
    },
    {
      id: 'operations',
      title: 'Operaciones & RRHH / People',
      subtitle: 'Directores de Personas, Supply Chain',
      icon: HeartHandshake,
      color: 'from-purple-500 to-indigo-600',
      estimatedDays: 15,
      avgSalary: '65k - 115k €'
    }
  ];

  const currentRole = roleProfiles.find((r) => r.id === selectedRoleType) || roleProfiles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="calculadora-requerimientos" className={`py-16 sm:py-12 sm:py-16 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900/60 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-3.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Generador Guiado de Requerimientos B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            ¿Qué Perfil Profesional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Necesitas Incorporar?</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Configura tu requerimiento en menos de 1 minuto y recibe una propuesta ejecutiva con estimación de plazos, bandas salariales y modelo de garantía.
          </p>
        </div>

        {/* Wizard Container */}
        <div className={`p-6 sm:p-8 lg:p-10 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>

          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Visual Selectors */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Step 1: Select Profile */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-3 text-cyan-400">
                    Paso 1: Área de Especialización del Puesto
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roleProfiles.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRoleType === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRoleType(role.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/30'
                              : theme === 'dark'
                                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${role.color} flex items-center justify-center text-white`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-500" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-tight">{role.title}</p>
                            <p className={`text-[10px] mt-1 truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {role.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Number of Vacancies Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label 
                      htmlFor="wizard-vacancy-count"
                      className="text-xs uppercase tracking-wider font-bold text-cyan-400"
                    >
                      Paso 2: Volumen de Vacantes a Cubrir
                    </label>
                    <span className="text-sm font-extrabold px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 dark:text-cyan-300 border border-cyan-500/30">
                      {vacancyCount} {vacancyCount === 1 ? 'Posición' : 'Posiciones'}
                    </span>
                  </div>
                  <input
                    id="wizard-vacancy-count"
                    type="range"
                    min="1"
                    max="15"
                    value={vacancyCount}
                    onChange={(e) => setVacancyCount(parseInt(e.target.value))}
                    aria-label="Volumen de Vacantes a Cubrir"
                    data-webmcp-field="wizard-vacancy-count"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 (Búsqueda Singular / C-Level)</span>
                    <span>5 (Expansión de Equipo)</span>
                    <span>10+ (Escalado RPO / Proyecto)</span>
                  </div>
                </div>

                {/* Step 3: Modality & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2 text-cyan-400">
                      Paso 3: Modalidad de Trabajo
                    </label>
                    <div className="flex gap-2">
                      {(['hibrido', 'remoto', 'presencial'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setModality(m)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                            modality === m
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                              : theme === 'dark' ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {m === 'hibrido' ? 'Híbrido' : m === 'remoto' ? '100% Remoto' : 'Presencial'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="wizard-location-select"
                      className="block text-xs uppercase tracking-wider font-bold mb-2 text-cyan-400"
                    >
                      Ubicación Principal
                    </label>
                    <select
                      id="wizard-location-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      aria-label="Ubicación Principal del Puesto"
                      data-webmcp-field="wizard-location"
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border ${
                        theme === 'dark' ? 'bg-slate-900 text-slate-200 border-slate-800' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <option value="Madrid">Madrid (Castellana Hub)</option>
                      <option value="Barcelona">Barcelona (Diagonal Hub)</option>
                      <option value="Valencia">Valencia Tech City</option>
                      <option value="PaisVasco">País Vasco / Bilbao</option>
                      <option value="Malaga">Málaga / Andalucía</option>
                      <option value="Nacional">Toda España / Remoto</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Proposal Estimation & Lead Form */}
              <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between ${
                theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                
                <div>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Estimación de Servicio Inmediata</span>
                  </div>

                  <h3 className="text-lg font-bold font-heading mb-3">
                    Propuesta para {vacancyCount} {vacancyCount === 1 ? 'Vacante' : 'Vacantes'} de {currentRole.title}
                  </h3>

                  {/* Estimation Metrics */}
                  <div className={`space-y-2 text-xs p-3.5 rounded-xl border mb-5 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Tiempo de Terna:</span>
                      <span className="font-extrabold text-cyan-500">{currentRole.estimatedDays} Días Hábiles</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Banda Salarial de Referencia:</span>
                      <span className="font-semibold">{currentRole.avgSalary}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Garantía de Sustitución:</span>
                      <span className="font-bold text-emerald-500">3 a 6 Meses por Contrato</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Seguridad Jurídica:</span>
                      <span className="font-semibold">Blindaje Art. 43 ET &amp; Directiva UE</span>
                    </div>
                  </div>

                  {/* Lead Capture Form */}
                  <form onSubmit={handleSubmit} className="space-y-3" data-webmcp-form="b2b-requirement">
                    <div>
                      <label 
                        htmlFor="wizard-company-name"
                        className="block text-[11px] font-bold uppercase text-slate-400 mb-1"
                      >
                        Empresa
                      </label>
                      <input
                        id="wizard-company-name"
                        type="text"
                        required
                        aria-label="Nombre de la Empresa"
                        placeholder="Ej. Grupo Empresarial Tecnológico S.L."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={`w-full py-2 px-3 text-xs rounded-xl border ${
                          theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-cyan-500' : 'bg-white text-slate-900 border-slate-200'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label 
                          htmlFor="wizard-contact-email"
                          className="block text-[11px] font-bold uppercase text-slate-400 mb-1"
                        >
                          Email Corporativo
                        </label>
                        <input
                          id="wizard-contact-email"
                          type="email"
                          required
                          aria-label="Email Corporativo"
                          placeholder="tu.nombre@empresa.es"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className={`w-full py-2 px-3 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-cyan-500' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="wizard-contact-phone"
                          className="block text-[11px] font-bold uppercase text-slate-400 mb-1"
                        >
                          Teléfono
                        </label>
                        <input
                          id="wizard-contact-phone"
                          type="tel"
                          required
                          aria-label="Teléfono de Contacto"
                          placeholder="+34 600 000 000"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className={`w-full py-2 px-3 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-cyan-500' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-3 py-3 px-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Solicitar Propuesta de Headhunting Personalizada</span>
                    </button>
                  </form>
                </div>

                <p className={`text-[10px] mt-4 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Confidencialidad garantizada. Respuesta de un Senior Partner en menos de 2 horas laborables.
                </p>

              </div>

            </div>
          ) : (
            /* Success Feedback Card */
            <div className="py-12 px-6 text-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">
                ¡Requerimiento Recibido con Éxito!
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Gracias, <strong>{companyName}</strong>. Hemos generado la estimación para tus <strong>{vacancyCount} vacantes de {currentRole.title}</strong> en <strong>{location}</strong>. Un Senior Partner de Nexo Talentos se pondrá en contacto en el <strong>{contactPhone}</strong> o a través de <strong>{contactEmail}</strong> en menos de 2 horas.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-slate-500 text-slate-300"
                >
                  Configurar Otra Vacante
                </button>
                <a
                  href="https://wa.me/34614143763?text=Hola,%20acabo%20de%20enviar%20un%20requerimiento%20en%20Nexo%20Talentos%20para%20cubrir%20vacantes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                >
                  Contactar por WhatsApp Directo
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
