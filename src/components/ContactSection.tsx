import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { isValidEmail, isValidPhone, sanitizeInput } from '../utils/security';
import { COMPANY_CONFIG } from '../config/company';

export const ContactSection: React.FC = () => {
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
`*NUEVA SOLICITUD - NEXO TALENTOS*
----------------------------------
📋 *Modalidad:* ${tab === 'empresa' ? 'Empresa / Búsqueda de Talento' : 'Candidato / Envío de Perfil'}
👤 *Nombre:* ${cleanName}
📧 *Email:* ${cleanEmail}
📞 *Teléfono:* ${cleanPhone || 'No indicado'}
🏢 *${tab === 'empresa' ? 'Empresa' : 'LinkedIn / Perfil'}:* ${cleanCompany || 'Confidencial'}
🎯 *Servicio / Posición:* ${tab === 'empresa' ? serviceType : role || 'General'}
${cleanMessage ? `💬 *Mensaje:* ${cleanMessage}` : ''}
----------------------------------
Enviado desde el formulario web de Nexo Talentos.`;

    const dynamicWaUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`;
    setLastWhatsAppUrl(dynamicWaUrl);

    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
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

      // Abrir WhatsApp en nueva pestaña para atención en tiempo real
      try {
        window.open(dynamicWaUrl, '_blank');
      } catch {
        // Si el navegador bloquea la apertura automática, el botón visible en pantalla lo permite
      }

      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      try {
        window.open(dynamicWaUrl, '_blank');
      } catch {}
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-slate-900/50 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto y Consultoría Confidencial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Hablemos de tu Próxima <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Contratación Estratégica</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Respuesta garantizada en menos de 24 horas laborables por un Socio Consultor de Nexo Talentos.
          </p>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office info & Direct Consultor WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Offices & Direct Consultor Card */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  Sedes en España
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Atención Inmediata
                </span>
              </div>

              {/* Direct Consultor WhatsApp Highlight Box */}
              <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900/80 rounded-2xl border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Consultor Directo Senior
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    WhatsApp Activo
                  </span>
                </div>
                <p className="text-xs text-slate-300">
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
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Sede Madrid</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">{COMPANY_CONFIG.addresses.madrid.city}</span>
                </div>
                <p className="text-xs text-slate-300 flex items-start gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{COMPANY_CONFIG.addresses.madrid.full}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-300 font-medium">{COMPANY_CONFIG.phoneDisplay}</a>
                </p>
              </div>

              {/* Barcelona Office */}
              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Sede Barcelona</span>
                  <span className="text-[10px] text-blue-400 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800">{COMPANY_CONFIG.addresses.barcelona.city}</span>
                </div>
                <p className="text-xs text-slate-300 flex items-start gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{COMPANY_CONFIG.addresses.barcelona.full}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-300 font-medium">{COMPANY_CONFIG.phoneDisplay}</a>
                </p>
              </div>

              {/* Emails and Schedule */}
              <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span><span>{COMPANY_CONFIG.emailUser}</span><span className="text-cyan-400">&#64;</span><span>{COMPANY_CONFIG.emailDomain}</span></span>
                  </div>
                  <span className="text-[10px] text-cyan-400">General</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>empresas@nexotalentos.com</span>
                  </div>
                  <span className="text-[10px] text-blue-400">Headhunting</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Lunes a Viernes: 08:30 - 20:00 CEST (C-Level 24/7)</span>
                </div>
              </div>


            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {/* Type Switcher */}
              <div className="flex flex-col sm:flex-row bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-6 gap-1 sm:gap-0">
                <button
                  type="button"
                  onClick={() => setTab('empresa')}
                  className={`flex-1 py-3 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    tab === 'empresa'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
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
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Soy Candidato / Enviar CV</span>
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">
                      ¡Solicitud Registrada con Éxito!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mt-2">
                      Tus datos han quedado registrados bajo estricta confidencialidad RGPD. Un Socio Consultor ha recibido tu notificación.
                    </p>
                  </div>

                  {/* Tarjeta destacada de WhatsApp para seguimiento en caliente */}
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 max-w-md mx-auto space-y-3">
                    <p className="text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Atención Directa &amp; Revisión Inmediata de Requerimientos
                    </p>
                    <a
                      href={lastWhatsAppUrl || `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent('Hola Nexo Talentos, acabo de enviar mi requerimiento desde la web.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950 shrink-0" />
                      <span>Continuar por WhatsApp (+34 614 143 763)</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-webmcp-form="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contact-name-input"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Nombre y Apellidos *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Nombre y Apellidos"
                        autoComplete="name"
                        data-webmcp-field="contact-name"
                        placeholder="Ej. Carlos Martínez"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="contact-email-input"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Correo Electrónico Corporativo *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Correo Electrónico Corporativo"
                        autoComplete="email"
                        data-webmcp-field="contact-email"
                        placeholder="ejemplo@empresa.com"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contact-phone-input"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Teléfono de Contacto
                      </label>
                      <input
                        id="contact-phone-input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-label="Teléfono de Contacto"
                        autoComplete="tel"
                        data-webmcp-field="contact-phone"
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                      />
                    </div>

                    {tab === 'empresa' ? (
                      <div>
                        <label 
                          htmlFor="contact-company-input"
                          className="block text-xs font-semibold text-slate-300 mb-1.5"
                        >
                          Empresa o Entidad
                        </label>
                        <input
                          id="contact-company-input"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          aria-label="Nombre de la Empresa"
                          autoComplete="organization"
                          data-webmcp-field="contact-company"
                          placeholder="Nombre de la empresa"
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                        />
                      </div>
                    ) : (
                      <div>
                        <label 
                          htmlFor="contact-linkedin-input"
                          className="block text-xs font-semibold text-slate-300 mb-1.5"
                        >
                          Enlace a LinkedIn o Perfil
                        </label>
                        <input
                          id="contact-linkedin-input"
                          type="url"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          aria-label="Enlace a LinkedIn o Perfil Profesional"
                          autoComplete="url"
                          data-webmcp-field="contact-linkedin"
                          placeholder="https://linkedin.com/in/tu-perfil"
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {tab === 'empresa' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="contact-role-select"
                          className="block text-xs font-semibold text-slate-300 mb-1.5"
                        >
                          Posición Requerida
                        </label>
                        <select
                          id="contact-role-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          aria-label="Posición Requerida para Headhunting"
                          data-webmcp-field="contact-role"
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
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
                          className="block text-xs font-semibold text-slate-300 mb-1.5"
                        >
                          Modalidad de Servicio
                        </label>
                        <select
                          id="contact-service-type-select"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          aria-label="Modalidad de Servicio de Headhunting"
                          data-webmcp-field="contact-service-type"
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
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
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      {tab === 'empresa' ? 'Detalles de la posición o requerimiento' : 'Resumen de tu experiencia y aspiraciones'}
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-label={tab === 'empresa' ? 'Detalles de la posición o requerimiento' : 'Resumen de tu experiencia y aspiraciones'}
                      data-webmcp-field="contact-message"
                      placeholder={tab === 'empresa' 
                        ? 'Indica ubicación (Madrid, BCN, Remoto), banda salarial estimada o características del perfil...' 
                        : 'Cuéntanos sobre tus últimos puestos directivos o áreas de especialización...'}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
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

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    🔒 Tratamos tus datos con máxima confidencialidad bajo la normativa europea RGPD.
                  </p>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Estricta confidencialidad RGPD (NIF: B-88492019)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Compromiso de entrega de terna en 18 días hábiles</span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
