import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Save, 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  Globe, 
  MessageSquare,
  Search,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'metrics' | 'cms' | 'leads'>('metrics');
  
  // CMS Content State
  const [siteContent, setSiteContent] = useState<any>({
    hero: {
      badge: 'Firma de Headhunting & Selección Ejecutiva',
      editionBadge: 'Edición 2026',
      titlePrefix: 'Executive Search &',
      titleGradient: 'Selección Directiva de Alto Impacto',
      subtitle: 'Conectamos empresas líderes con directivos y especialistas de alto nivel en Ecuador y Latinoamérica. Terna validada en 18 días hábiles con garantía contractual de 3 a 6 meses.',
      stat1Value: '18 Días',
      stat1Label: 'Terna Validada',
      stat2Value: '3-6 Meses',
      stat2Label: 'Garantía Reposición',
      stat3Value: '98.4%',
      stat3Label: 'Tasa de Retención'
    },
    contact: {
      whatsapp: '+34 614 143 763',
      whatsappNumber: '34614143763',
      email: 'info@nexotalento.com'
    }
  });

  // Leads State
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Cargar contenido CMS
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.hero) setSiteContent(data);
      })
      .catch(err => console.warn('No se pudo cargar CMS:', err));

    // Cargar Leads
    fetch('/api/admin/leads')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch(err => console.warn('No se pudieron cargar leads:', err));
  }, []);

  const handleSaveCMS = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error guardando contenido:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    !searchTerm ||
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Navbar Admin */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between ${
        theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#082041] via-[#00A9A3] to-cyan-500 flex items-center justify-center text-white font-extrabold shadow-md">
            NT
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold font-heading">
              Nexo Talento — Centro de Control
            </h1>
            <p className="text-[10px] text-slate-400">
              Conectado como <strong>{user?.nombre || user?.email}</strong> (Superadmin)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNavigateHome}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              theme === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Sitio Web</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas &amp; Publicidad</span>
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'cms'
                ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Editor de Landing Page (CMS)</span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-extrabold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Bandeja de Leads ({leads.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: MÉTRICAS & PUBLICIDAD ================= */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Total Leads Captados</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-extrabold font-heading text-cyan-400">{leads.length}</p>
                <p className="text-[10px] text-emerald-400 mt-1">Registrados en servidor &amp; Sheets</p>
              </div>

              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Google Tag Manager</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-sm font-black font-mono text-emerald-400">GTM-PX6M5QSS</p>
                <p className="text-[10px] text-slate-400 mt-1">Activo en todas las rutas</p>
              </div>

              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Google Analytics 4</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm font-black font-mono text-blue-400">G-T4ZC2SJXHS</p>
                <p className="text-[10px] text-slate-400 mt-1">Tracking tiempo real activo</p>
              </div>

              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Pixel Ads (Meta &amp; TikTok)</span>
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-sm font-extrabold text-purple-400">Conectores Listos</p>
                <p className="text-[10px] text-slate-400 mt-1">Eventos Lead y Click configurados</p>
              </div>
            </div>

            {/* Campaign Guide Box */}
            <div className={`p-6 rounded-3xl border ${
              theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <h3 className="text-base font-bold font-heading mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00A9A3]" />
                <span>Estado de Configuración Ad-Ready para Meta Ads &amp; TikTok Ads</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                La plataforma ya cuenta con los disparadores estándar requeridos para optimización por coste por adquisición (CPA):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <strong className="text-cyan-400 block mb-1">Evento: generate_lead</strong>
                  <p className="text-slate-400 text-[11px]">Disparado cuando un prospecto llena el formulario de contacto o solicitud de perfil.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Evento: apply_job</strong>
                  <p className="text-slate-400 text-[11px]">Disparado cuando un candidato postula a alguna de las vacantes activas.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <strong className="text-blue-400 block mb-1">Evento: whatsapp_click</strong>
                  <p className="text-slate-400 text-[11px]">Disparado con el botón flotante circular de WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: EDITOR DE LANDING PAGE (CMS) ================= */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-heading">Editor de Contenidos en Vivo</h2>
                <p className="text-xs text-slate-400">Modifica los textos principales de la Landing Page sin necesidad de programar.</p>
              </div>
              <button
                onClick={handleSaveCMS}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00A9A3] to-blue-600 hover:opacity-95 text-slate-950 font-extrabold text-xs transition-all shadow flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Guardando...' : 'Publicar Cambios'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Cambios guardados exitosamente y aplicados a la página principal!</span>
              </div>
            )}

            {/* Hero Section Fields */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00A9A3]">
                1. Textos del Hero Principal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Título Inicial (Blanco)
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero?.titlePrefix || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titlePrefix: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Título con Gradiente
                  </label>
                  <input
                    type="text"
                    value={siteContent.hero?.titleGradient || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titleGradient: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Subtítulo / Propuesta de Valor
                </label>
                <textarea
                  rows={3}
                  value={siteContent.hero?.subtitle || ''}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    hero: { ...siteContent.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-700 leading-relaxed"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Métrica 1 (Días)</label>
                  <input
                    type="text"
                    value={siteContent.hero?.stat1Value || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, stat1Value: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Métrica 2 (Garantía)</label>
                  <input
                    type="text"
                    value={siteContent.hero?.stat2Value || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, stat2Value: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Métrica 3 (Éxito)</label>
                  <input
                    type="text"
                    value={siteContent.hero?.stat3Value || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, stat3Value: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Contact Settings */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00A9A3]">
                2. Configuración de Contacto &amp; WhatsApp
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Número de WhatsApp Oficial
                  </label>
                  <input
                    type="text"
                    value={siteContent.contact?.whatsapp || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, whatsapp: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Email de Recepción de Notificaciones
                  </label>
                  <input
                    type="email"
                    value={siteContent.contact?.email || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, email: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-700"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: BANDEJA DE LEADS ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, empresa o cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border bg-slate-900 border-slate-700"
                />
              </div>

              <span className="text-xs text-slate-400">
                Mostrando {filteredLeads.length} de {leads.length} prospectos
              </span>
            </div>

            {filteredLeads.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase font-extrabold text-[10px]">
                    <tr>
                      <th className="p-3.5 border-b border-slate-800">Fecha</th>
                      <th className="p-3.5 border-b border-slate-800">Nombre</th>
                      <th className="p-3.5 border-b border-slate-800">Email &amp; Teléfono</th>
                      <th className="p-3.5 border-b border-slate-800">Empresa</th>
                      <th className="p-3.5 border-b border-slate-800">Posición Requerida</th>
                      <th className="p-3.5 border-b border-slate-800">Mensaje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/50">
                    {filteredLeads.map((lead, idx) => (
                      <tr key={lead.id || idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 text-slate-400 whitespace-nowrap text-[11px]">
                          {lead.createdAt || 'Reciente'}
                        </td>
                        <td className="p-3.5 font-bold text-white whitespace-nowrap">
                          {lead.name}
                        </td>
                        <td className="p-3.5">
                          <p className="text-cyan-400">{lead.email}</p>
                          <p className="text-slate-400 text-[11px]">{lead.phone}</p>
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium whitespace-nowrap">
                          {lead.company}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                            {lead.role || lead.serviceType}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 text-[11px] max-w-xs truncate">
                          {lead.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/30">
                <Users className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold">No se encontraron leads registrados</h4>
                <p className="text-xs text-slate-400 mt-1">Los contactos enviados desde la web aparecerán aquí en tiempo real.</p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
