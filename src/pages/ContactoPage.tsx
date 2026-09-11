import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Globe,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { COMPANY_CONFIG } from '../config/company';
import { SuccessModal } from '../components/SuccessModal';

interface ContactoPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

export const ContactoPage: React.FC<ContactoPageProps> = ({
  onNavigate,
  onOpenAIAgent
}) => {
  const { theme } = useTheme();
  const [tab, setTab] = useState<'empresa' | 'candidato'>('empresa');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Director General / CEO');
  const [serviceType, setServiceType] = useState('Executive Search (18 días)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappPhone = '34614143763';
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    'Hola Nexo Talento, deseo contactar directamente con un Senior Talent Partner sobre procesos de Headhunting en España.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: tab === 'empresa' ? company : 'Candidato Confidencial',
          role: tab === 'empresa' ? role : 'Perfil Directivo',
          serviceType,
          message,
          source: 'Pagina Contacto'
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      setSubmitted(true);
    } catch {
      alert('Error de conexión o el servidor no responde. Por favor, intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    window.location.href = '/';
  };

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00A9A3]/15 border border-[#00A9A3]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#00A9A3] mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Atención Directa &amp; Confidencial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Contacto, Sedes y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A9A3] to-blue-500">Consultor Directo</span>
          </h1>
          <p className={`mt-4 text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Oficinas en los principales distritos de negocios de España. Estamos a tu disposición para proyectos confidenciales de búsqueda y selección directiva.
          </p>
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className={`mb-12 p-6 rounded-3xl border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/40'
            : 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-200 shadow-xl'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-emerald-500/30">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                Canal Prioritario 24/7 para Empresas &amp; Directivos
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-heading">
                WhatsApp Directo con Senior Talent Partner: +34 614 143 763
              </h3>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Respuesta en menos de 1 minuto para consultas confidenciales sobre vacantes y perfiles.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 btn-spring-press"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Abrir Chat de WhatsApp</span>
          </a>
        </div>

        {/* 2-Column Main Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Detailed Office Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
                   {/* Madrid HQ Card */}
            <div className={`border rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 transition-colors card-spring-hover ${
              theme === 'dark' 
                ? 'bg-slate-900/80 border-slate-800 hover:border-[#00A9A3]/40' 
                : 'bg-white border-slate-200 hover:border-[#00A9A3]/50 shadow-md'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00A9A3]" /> Sede Madrid
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                  theme === 'dark'
                    ? 'text-[#00A9A3] bg-[#00A9A3]/15 border-[#00A9A3]/30'
                    : 'text-[#00A9A3] bg-[#00A9A3]/10 border-[#00A9A3]/30'
                }`}>
                  {COMPANY_CONFIG.addresses.madrid.city}
                </span>
              </div>
              <p className={`text-xs flex items-start gap-2 pt-1 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <MapPin className="w-4 h-4 text-[#00A9A3] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.addresses.madrid.full}</span>
              </p>
              <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Teléfono Sede:</span>
                <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="text-[#00A9A3] hover:underline font-semibold">{COMPANY_CONFIG.phoneDisplay}</a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Atención:</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700 font-medium'}>Lunes a Viernes (9:00 - 19:30 CET)</span>
              </div>
            </div>

            {/* Barcelona HQ Card */}
            <div className={`border rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 transition-colors card-spring-hover ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-md'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" /> Sede Barcelona
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                  theme === 'dark'
                    ? 'text-blue-400 bg-blue-950 border-blue-800'
                    : 'text-blue-700 bg-blue-50 border-blue-200'
                }`}>
                  {COMPANY_CONFIG.addresses.barcelona.city}
                </span>
              </div>
              <p className={`text-xs flex items-start gap-2 pt-1 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.addresses.barcelona.full}</span>
              </p>
              <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Teléfono Sede:</span>
                <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="text-blue-500 hover:underline font-semibold">{COMPANY_CONFIG.phoneDisplay}</a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Atención:</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700 font-medium'}>Lunes a Viernes (9:00 - 19:30 CET)</span>
              </div>
            </div>

            {/* Department Emails & Schedule */}
            <div className={`border rounded-3xl p-6 space-y-3 text-xs ${
              theme === 'dark'
                ? 'bg-slate-900/50 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <div className={`flex items-center justify-between pb-2 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Dirección General &amp; Búsqueda C-Level:</span>
                <span className="text-[#00A9A3] font-semibold"><span>empresas</span><span className="text-[#00A9A3]">&#64;</span><span>nexotalento.com</span></span>
              </div>
              <div className={`flex items-center justify-between pb-2 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Candidaturas y Base de Talento:</span>
                <span className="text-blue-500 font-semibold"><span>talento</span><span className="text-blue-500">&#64;</span><span>nexotalento.com</span></span>
              </div>
              <div className={`flex items-center justify-between pb-2 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Consultas Generales:</span>
                <span className="font-semibold"><span>contacto</span><span>&#64;</span><span>nexotalento.com</span></span>
              </div>
              <div className={`flex items-center gap-2 pt-2 text-[11px] ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Lunes a Viernes: 08:30 a 20:00 CEST. Atención directiva 24/7.</span>
              </div>
            </div>

            {/* Legal and Compliance */}
            <div className={`p-4 border rounded-2xl text-[11px] space-y-1 ${
              theme === 'dark'
                ? 'bg-slate-900/30 border-slate-800/80 text-slate-400'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                Nexo Talento Executive Search S.L.
              </p>
              <p>NIF: B-88492019 • Inscrita en el Registro Mercantil de Madrid.</p>
              <p className="text-[#00A9A3]">🔒 Confidencialidad y protección de datos bajo RGPD y LOPDGDD.</p>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Type Switcher */}
              <div className={`flex p-1.5 rounded-2xl border mb-8 ${
                theme === 'dark'
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setTab('empresa')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 btn-spring-press ${
                    tab === 'empresa'
                      ? 'bg-gradient-to-r from-[#00A9A3] to-blue-600 text-white shadow-md'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Soy Empresa (Búsqueda de Talento)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab('candidato')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 btn-spring-press ${
                    tab === 'candidato'
                      ? 'bg-gradient-to-r from-[#00A9A3] to-blue-600 text-white shadow-md'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Soy Candidato (Enviar Perfil)</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" data-webmcp-form="contacto-page-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contacto-name-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Nombre y Apellidos *
                      </label>
                      <input
                        id="contacto-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Nombre y Apellidos"
                        data-webmcp-field="contacto-name"
                        placeholder="Ej. Carlos Martínez"
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="contacto-email-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Correo Corporativo *
                      </label>
                      <input
                        id="contacto-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Correo Corporativo"
                        data-webmcp-field="contacto-email"
                        placeholder="carlos@empresa.com"
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contacto-phone-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Teléfono / Móvil *
                      </label>
                      <input
                        id="contacto-phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-label="Teléfono o Móvil"
                        data-webmcp-field="contacto-phone"
                        placeholder="+34 600 000 000"
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="contacto-company-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {tab === 'empresa' ? 'Empresa o Razón Social' : 'Enlace a LinkedIn'}
                      </label>
                      <input
                        id="contacto-company-input"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        aria-label={tab === 'empresa' ? 'Empresa o Razón Social' : 'Enlace a LinkedIn'}
                        data-webmcp-field="contacto-company"
                        placeholder={tab === 'empresa' ? 'Nombre de la empresa' : 'https://linkedin.com/in/tu-perfil'}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {tab === 'empresa' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="contacto-role-select"
                          className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Posición a Cubrir
                        </label>
                        <select
                          id="contacto-role-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          aria-label="Posición a Cubrir"
                          data-webmcp-field="contacto-role"
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] ${
                            theme === 'dark'
                              ? 'bg-slate-950 border-slate-700 text-white'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Director General / CEO">Director General / CEO</option>
                          <option value="Chief Technology Officer (CTO)">Chief Technology Officer (CTO)</option>
                          <option value="Chief Financial Officer (CFO)">Chief Financial Officer (CFO)</option>
                          <option value="Chief Operating Officer (COO)">Chief Operating Officer (COO)</option>
                          <option value="Director Comercial / VP Sales">Director Comercial / VP Sales</option>
                          <option value="Tech Lead / Senior Engineer">Tech Lead / Senior Engineer</option>
                          <option value="Director de Recursos Humanos">Director de Recursos Humanos</option>
                          <option value="Otro Puesto Ejecutivo">Otro Puesto Ejecutivo</option>
                        </select>
                      </div>

                      <div>
                        <label 
                          htmlFor="contacto-service-select"
                          className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Servicio Requerido
                        </label>
                        <select
                          id="contacto-service-select"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          aria-label="Servicio Requerido"
                          data-webmcp-field="contacto-service"
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] ${
                            theme === 'dark'
                              ? 'bg-slate-950 border-slate-700 text-white'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Executive Search (18 días)">Executive Search (18 días)</option>
                          <option value="Selección Tech & Digital">Selección Tech &amp; Digital</option>
                          <option value="RPO / Escalado Rápido">RPO / Escalado Rápido</option>
                          <option value="Assessment Center & IA">Assessment Center &amp; IA</option>
                          <option value="Interim Management">Interim Management</option>
                          <option value="Consultoría Salarial">Consultoría Salarial</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label 
                      htmlFor="contacto-message-textarea"
                      className={`block text-xs font-semibold mb-1.5 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {tab === 'empresa' ? 'Detalles de la posición o requerimiento' : 'Aspiraciones y resumen ejecutivo'}
                    </label>
                    <textarea
                      id="contacto-message-textarea"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-label={tab === 'empresa' ? 'Detalles de la posición o requerimiento' : 'Aspiraciones y resumen ejecutivo'}
                      data-webmcp-field="contacto-message"
                      placeholder={tab === 'empresa' 
                        ? 'Indica banda salarial estimada, urgencia, si es confidencial o requisitos clave...' 
                        : 'Describe tus áreas de mayor experiencia y tipo de posición que te interesa explorar...'}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#00A9A3] transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#00A9A3] to-blue-600 hover:from-[#00918C] hover:to-blue-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 btn-spring-press disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{tab === 'empresa' ? 'Solicitar Terna Directiva en 18 Días' : 'Enviar Mi Perfil Confidencial'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className={`text-[11px] text-center pt-1 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    🔒 Sus datos serán tratados conforme al Reglamento General de Protección de Datos (RGPD) con total confidencialidad.
                  </p>
                </form>

            </div>
          </div>

        </div>

      </div>

      <SuccessModal 
        isOpen={submitted} 
        onGoHome={handleGoHome} 
        title="¡Solicitud Enviada con Éxito!"
      />
    </div>
  );
};
