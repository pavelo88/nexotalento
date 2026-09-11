import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  UserCheck,
  FileCheck,
  Calendar,
  Globe,
  AlertCircle
} from 'lucide-react';

import { isValidEmail, isValidPhone, sanitizeInput } from '../utils/security';
import { COMPANY_CONFIG } from '../config/company';
import { SuccessModal } from './SuccessModal';

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState<'empresa' | 'candidato'>('empresa');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Director General / C-Level');
  const [serviceType, setServiceType] = useState('Executive Search');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const whatsappUrl = COMPANY_CONFIG.whatsappUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = sanitizeInput(name, 100);
    const cleanEmail = email.trim();
    const cleanPhone = sanitizeInput(phone, 30);
    const cleanCompany = sanitizeInput(company, 150);
    const cleanMessage = sanitizeInput(message, 3000);

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!cleanEmail) {
      setErrorMsg('El correo electrónico es obligatorio.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMsg('Por favor ingresa un correo electrónico válido (ej. usuario@empresa.com).');
      return;
    }

    if (cleanPhone && !isValidPhone(cleanPhone)) {
      setErrorMsg('Por favor ingresa un número de teléfono válido.');
      return;
    }

    // Construir mensaje estructurado para WhatsApp
    const waText = 
`*NUEVA SOLICITUD - NEXO TALENTO*
----------------------------------
📋 *Modalidad:* ${tab === 'empresa' ? 'Empresa / Búsqueda de Talento' : 'Candidato / Envío de Perfil'}
👤 *Nombre:* ${cleanName}
📧 *Email:* ${cleanEmail}
📞 *Teléfono:* ${cleanPhone || 'No indicado'}
🏢 *${tab === 'empresa' ? 'Empresa' : 'LinkedIn / Perfil'}:* ${cleanCompany || 'Confidencial'}
🎯 *Servicio / Posición:* ${tab === 'empresa' ? serviceType : role || 'General'}
${cleanMessage ? `💬 *Mensaje:* ${cleanMessage}` : ''}
----------------------------------
Enviado desde el formulario web de Nexo Talento.`;

    const dynamicWaUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`;
    setLastWhatsAppUrl(dynamicWaUrl);

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          company: tab === 'empresa' ? cleanCompany : 'Candidato Confidencial',
          role,
          serviceType: tab === 'empresa' ? serviceType : 'Candidatura Espontánea / Base de Talento',
          message: cleanMessage
        })
      });

      if (!response.ok) {
        console.error('Error al enviar la solicitud (probablemente en Vercel falta backend)');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error de red:', err);
      // Forzamos el popup como pidió el usuario, aunque falle la red.
      setSubmitted(true);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contacto" className={`py-12 sm:py-16 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border ${
            theme === 'dark' 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' 
              : 'bg-cyan-50 border-cyan-200 text-cyan-700'
          }`}>
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto y Consultoría Confidencial</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Hablemos de tu Próxima <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Contratación Estratégica</span>
          </h2>
          <p className={`mt-4 text-sm sm:text-base ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Respuesta garantizada en menos de 24 horas laborables por un Socio Consultor de Nexo Talento.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office info & Direct Consultor WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Offices & Direct Consultor Card */}
            <div className={`border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold font-heading flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <Building2 className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-500'}`} />
                  Sedes en España
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  theme === 'dark' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  Atención Inmediata
                </span>
              </div>

              {/* Direct Consultor WhatsApp Highlight Box */}
              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900/80 border-emerald-500/30'
                  : 'bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-white border-emerald-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Consultor Directo Senior
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    theme === 'dark'
                      ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                      : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                  }`}>
                    WhatsApp Activo
                  </span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Chatea directamente con nuestro Socio Director de Búsqueda Ejecutiva:
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: +34 614 143 763</span>
                </a>
              </div>

              {/* Madrid Office */}
              <div className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>Sede Madrid</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    theme === 'dark' 
                      ? 'text-cyan-400 bg-cyan-950 border-cyan-800' 
                      : 'text-cyan-700 bg-cyan-100 border-cyan-300'
                  }`}>{COMPANY_CONFIG.addresses.madrid.city}</span>
                </div>
                <p className={`text-xs flex items-start gap-1.5 pt-1 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-500'}`} />
                  <span>{COMPANY_CONFIG.addresses.madrid.full}</span>
                </p>
                <p className={`text-xs flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Phone className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-500'}`} />
                  <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-500 font-medium">{COMPANY_CONFIG.phoneDisplay}</a>
                </p>
              </div>

              {/* Barcelona Office */}
              <div className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>Sede Barcelona</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    theme === 'dark' 
                      ? 'text-blue-400 bg-blue-950 border-blue-800' 
                      : 'text-blue-700 bg-blue-100 border-blue-300'
                  }`}>{COMPANY_CONFIG.addresses.barcelona.city}</span>
                </div>
                <p className={`text-xs flex items-start gap-1.5 pt-1 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span>{COMPANY_CONFIG.addresses.barcelona.full}</span>
                </p>
                <p className={`text-xs flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Phone className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
                  <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-500 font-medium">{COMPANY_CONFIG.phoneDisplay}</a>
                </p>
              </div>

              {/* Emails and Schedule */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-slate-700 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <span><span>{COMPANY_CONFIG.emailUser}</span><span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}>&#64;</span><span>{COMPANY_CONFIG.emailDomain}</span></span>
                  </div>
                  <span className={`text-[10px] ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>General</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span><span>empresas</span><span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>&#64;</span><span>nexotalento.com</span></span>
                  </div>
                  <span className={`text-[10px] ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Headhunting</span>
                </div>
                <div className={`flex items-center gap-2 pt-2 border-t text-[11px] ${
                  theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-500'
                }`}>
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Lunes a Viernes: 08:30 - 20:00 CEST (C-Level 24/7)</span>
                </div>
              </div>


            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`border rounded-3xl p-6 sm:p-8 shadow-2xl ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Type Switcher */}
              <div className={`flex flex-col sm:flex-row p-1.5 rounded-2xl border mb-6 gap-1 sm:gap-0 ${
                theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setTab('empresa')}
                  className={`flex-1 py-3 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    tab === 'empresa'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Soy Empresa / Busco Talento</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab('candidato')}
                  className={`flex-1 py-3 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    tab === 'candidato'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Soy Candidato / Enviar CV</span>
                </button>
              </div>

              {errorMsg && (
                <div className={`mb-4 p-3 border rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" data-webmcp-form="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="contact-name-input"
                      className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Nombre y Apellidos *
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Carlos Martínez"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-email-input"
                      className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Correo Electrónico *
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="contact-phone-input"
                      className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Teléfono de Contacto
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                      }`}
                    />
                  </div>

                  {tab === 'empresa' ? (
                    <div>
                      <label 
                        htmlFor="contact-company-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Empresa o Entidad
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Nombre de la empresa"
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  ) : (
                    <div>
                      <label 
                        htmlFor="contact-linkedin-input"
                        className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Enlace a LinkedIn o Perfil
                      </label>
                      <input
                        id="contact-linkedin-input"
                        type="url"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="https://linkedin.com/in/tu-perfil"
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {tab === 'empresa' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contact-role-select"
                        className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Posición Requerida
                      </label>
                      <select
                        id="contact-role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-cyan-400'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500'
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
                        htmlFor="contact-service-type-select"
                        className={`block text-xs font-semibold mb-1.5 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Modalidad de Servicio
                      </label>
                      <select
                        id="contact-service-type-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-cyan-400'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500'
                        }`}
                      >
                        <option value="Executive Search (18 días)">Executive Search (18 días)</option>
                        <option value="Selección Tech & Digital">Selección Tech &amp; Digital</option>
                        <option value="RPO / Escalado de Equipos">RPO / Escalado de Equipos</option>
                        <option value="Assessment Center & IA">Assessment Center &amp; IA</option>
                        <option value="Interim Management">Interim Management</option>
                        <option value="Consultoría Salarial">Consultoría Salarial</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label 
                    htmlFor="contact-message-textarea"
                    className={`block text-xs font-semibold mb-1.5 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {tab === 'empresa' ? 'Detalles de la posición o requerimiento' : 'Resumen de tu experiencia y aspiraciones'}
                  </label>
                  <textarea
                    id="contact-message-textarea"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={tab === 'empresa' 
                      ? 'Indica ubicación, banda salarial estimada o características clave...' 
                      : 'Cuéntanos sobre tus últimos puestos directivos o áreas de especialización...'}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400'
                        : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{tab === 'empresa' ? 'Solicitar Terna en 18 Días' : 'Enviar Mi Perfil Confidencial'}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className={`text-[11px] text-center pt-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  🔒 Tratamos tus datos con máxima confidencialidad bajo la normativa europea RGPD.
                </p>

                <div className={`pt-3 mt-3 border-t flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] ${
                  theme === 'dark' ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <span>Estricta confidencialidad RGPD (NIF: B-88492019)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3.5 h-3.5 shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    <span>Compromiso de entrega en 18 días hábiles</span>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>

      <SuccessModal 
        isOpen={submitted} 
        onGoHome={handleGoHome} 
        title="¡Solicitud Registrada con Éxito!"
      />
    </section>
  );
};