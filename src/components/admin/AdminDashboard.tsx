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
  Sparkles,
  Layers,
  Palette,
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onNavigateHome: () => void;
}

type AdminTab = 
  | 'analytics' 
  | 'hero' 
  | 'vacancies' 
  | 'services' 
  | 'sectors' 
  | 'leads' 
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // CMS Content State
  const [siteContent, setSiteContent] = useState<any>({
    hero: {
      badge: 'Firma Boutique de Executive Search & Headhunting',
      editionBadge: 'Ecuador & LATAM 2026',
      titlePrefix: 'Contrata al mejor talento',
      titleGradient: 'directivo y técnico',
      titleSuffix: 'para tu empresa',
      subtitle: 'Garantizamos la máxima precisión de selección en Quito, Guayaquil y la región. Entrega de terna validada en 18 días hábiles con garantía contractual de 3 a 6 meses.',
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
      email: 'info@nexotalento.com',
      madridAddress: 'Paseo de la Castellana 95, 28046 Madrid',
      barcelonaAddress: 'Avinguda Diagonal 640, 08017 Barcelona',
      phoneDisplay: '+34 614 143 763'
    }
  });

  // Vacantes Administrables (Las 4 del Word con formulario completo)
  const [vacancies, setVacancies] = useState<any[]>([
    {
      id: 'jefe-marketing',
      title: 'Jefe de Marketing',
      department: 'Marketing & Comercial',
      location: 'Quito, Ecuador',
      modality: 'Presencial',
      salaryRange: 'USD 1.500 – 2.000',
      experienceLevel: 'Experiencia en Marketing Digital y liderazgo estratégico',
      description: 'Empresa de servicios en Ecuador busca un Jefe de Marketing para liderar la estrategia de posicionamiento de marca, impulsar el crecimiento comercial y desarrollar iniciativas innovadoras de marketing digital, orientadas a resultados y generación de oportunidades de negocio.',
      requirements: [
        'Experiencia liderando estrategias de marketing y posicionamiento de marca.',
        'Conocimientos de pauta digital, SEO/SEM y generación de leads.',
        'Análisis de indicadores de gestión (KPIs), métricas y resultados.',
        'Dominio de marketing digital, redes sociales y campañas publicitarias.',
        'Planificación y administración de presupuestos de marketing.',
        'Capacidad para liderar equipos y coordinar agencias o proveedores.'
      ],
      hot: true,
      postedDate: 'Proceso Activo'
    },
    {
      id: 'asistente-contable',
      title: 'Asistente Contable',
      department: 'Finanzas & Contabilidad',
      location: 'Valle de los Chillos, Quito',
      modality: 'Presencial',
      salaryRange: 'USD 600 – 700',
      experienceLevel: 'Mínimo 3 años en procesos contables',
      description: 'Empresa de servicios ubicada en el Valle de los Chillos (Quito) busca incorporar un Asistente Contable con experiencia en gestión de procesos contables, capacidad analítica y orientación al detalle. Buscamos un profesional organizado, proactivo y con disponibilidad para trabajar de forma presencial.',
      requirements: [
        'Registro y control de transacciones contables.',
        'Conciliaciones bancarias y manejo de cuentas.',
        'Elaboración y liquidación de impuestos y retenciones.',
        'Manejo de sistemas contables y herramientas ofimáticas (Excel intermedio/avanzado).',
        'Mínimo 3 años en cargos similares en empresas comerciales o de servicios.'
      ],
      hot: true,
      postedDate: 'Proceso Activo'
    },
    {
      id: 'asesor-nuevos-negocios',
      title: 'Asesor de Nuevos Negocios (Sector Carga Internacional)',
      department: 'Logística & Comercio Exterior',
      location: 'Quito, Ecuador',
      modality: 'Presencial',
      salaryRange: 'A convenir (experiencia y cartera)',
      experienceLevel: 'Mínimo 4 años en freight forwarding',
      description: 'Importante empresa del sector de logística y transporte internacional de carga busca incorporar un Asesor de Nuevos Negocios con fuerte perfil comercial y experiencia en captación de clientes corporativos para servicios de importación y exportación aérea, marítima y terrestre.',
      requirements: [
        'Prospección activa y apertura de nuevas cuentas corporativas.',
        'Venta de servicios de transporte internacional de carga (aéreo, marítimo y terrestre).',
        'Negociación de tarifas y condiciones comerciales con clientes.',
        'Fidelización y seguimiento de clientes actuales.',
        'Mínimo 4 años en ventas en empresas de freight forwarding o logística internacional.',
        'Cartera activa de clientes en Ecuador (altamente deseable).'
      ],
      hot: true,
      postedDate: 'Proceso Activo'
    },
    {
      id: 'asesor-comercial-corporativo',
      title: 'Asesor Comercial Corporativo',
      department: 'Ventas Corporativas & Tech',
      location: 'Guayaquil, Ecuador',
      modality: 'Presencial',
      salaryRange: 'A convenir + Comisiones',
      experienceLevel: 'Cartera corporativa en sector tecnológico',
      description: 'Empresa en expansión en Guayaquil requiere incorporar un Asesor Comercial Corporativo enfocado en apertura y desarrollo de clientes B2B para soluciones tecnológicas y empresariales.',
      requirements: [
        'Venta consultiva B2B de soluciones y servicios empresariales.',
        'Gestión de embudo comercial y cumplimiento de cuotas de ventas.',
        'Negociación con directores de compras, operaciones y gerencia general.',
        'Experiencia comprobada en prospección y cierre de ventas en Guayaquil.',
        'Excelente comunicación y presencia ejecutiva.'
      ],
      hot: true,
      postedDate: 'Proceso Activo'
    }
  ]);

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
        body: JSON.stringify({ ...siteContent, vacancies })
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

  const menuItems = [
    { id: 'analytics' as AdminTab, label: 'Analítica & Publicidad', icon: BarChart3, badge: 'Live' },
    { id: 'hero' as AdminTab, label: 'Hero & Textos Principales', icon: FileText },
    { id: 'vacancies' as AdminTab, label: 'Gestión de Vacantes (4)', icon: Briefcase, count: vacancies.length },
    { id: 'services' as AdminTab, label: 'Áreas de Especialización', icon: Layers },
    { id: 'sectors' as AdminTab, label: 'Sectores de Industria (7)', icon: Building2 },
    { id: 'leads' as AdminTab, label: 'Bandeja de Leads', icon: MessageSquare, count: leads.length },
    { id: 'settings' as AdminTab, label: 'Configuración & Enlaces', icon: Settings }
  ];

  const filteredLeads = leads.filter(l => 
    !searchTerm ||
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0b131e] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* SIDEBAR PERSISTENTE AL ESTILO MODULARES GM */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col border-r ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        theme === 'dark' ? 'bg-[#0f1a26] border-slate-800' : 'bg-white border-slate-200 shadow-xl md:shadow-none'
      }`}>
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#082041] via-[#00A9A3] to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              NT
            </div>
            <div>
              <h2 className="text-sm font-black font-heading leading-tight">Nexo Talento</h2>
              <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Panel Administrador</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              {user?.nombre?.[0] || 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate">{user?.nombre || 'Pablo García'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'pablofgarciaf@gmail.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-[#00A9A3] text-slate-950 font-black shadow-md'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-cyan-300'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-emerald-500/20 text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onNavigateHome}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-800"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ver Sitio Web</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className={`sticky top-0 z-30 border-b px-5 py-4 flex items-center justify-between backdrop-blur-xl ${
          theme === 'dark' ? 'bg-[#0f1a26]/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black font-heading leading-tight">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-slate-400">
                Gestión en tiempo real de Nexo Talento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardado exitosamente</span>
              </span>
            )}
            <button
              onClick={handleSaveCMS}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#00A9A3] hover:opacity-95 text-slate-950 text-xs font-black shadow-md transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-5 sm:p-8 max-w-6xl space-y-6">

          {/* TAB 1: ANALÍTICA & PUBLICIDAD */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Leads Totales</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-2xl font-black text-cyan-400">{leads.length}</p>
                  <p className="text-[10px] text-emerald-400 font-bold mt-1">Conectado a Google Sheets</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Google Analytics 4</span>
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-sm font-black font-mono text-emerald-400">G-T4ZC2SJXHS</p>
                  <p className="text-[10px] text-slate-400 mt-1">Medición de eventos activa</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Google Tag Manager</span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-sm font-black font-mono text-cyan-400">GTM-PX6M5QSS</p>
                  <p className="text-[10px] text-slate-400 mt-1">Contenedor global en head/body</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Meta &amp; TikTok Ads</span>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-xs font-black text-purple-300">fbq &amp; ttq Conectados</p>
                  <p className="text-[10px] text-slate-400 mt-1">Eventos: lead, apply_job, whatsapp</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & TEXTOS */}
          {activeTab === 'hero' && (
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">Textos Principales del Hero</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge Superior</label>
                  <input
                    type="text"
                    value={siteContent.hero?.badge || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, badge: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge Edición</label>
                  <input
                    type="text"
                    value={siteContent.hero?.editionBadge || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, editionBadge: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Título Principal (H1)</label>
                <input
                  type="text"
                  value={siteContent.hero?.titlePrefix || ''}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    hero: { ...siteContent.hero, titlePrefix: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subtítulo / Propuesta de Valor</label>
                <textarea
                  rows={3}
                  value={siteContent.hero?.subtitle || ''}
                  onChange={(e) => setSiteContent({
                    ...siteContent,
                    hero: { ...siteContent.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: GESTIÓN DE VACANTES */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">Vacantes Activas en el Portal</h3>
                  <p className="text-xs text-slate-400">Edita las bandas salariales, requisitos y descripciones en tiempo real.</p>
                </div>
              </div>

              <div className="space-y-4">
                {vacancies.map((vac, idx) => (
                  <div key={vac.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <input
                        type="text"
                        value={vac.title}
                        onChange={(e) => {
                          const copy = [...vacancies];
                          copy[idx].title = e.target.value;
                          setVacancies(copy);
                        }}
                        className="text-base font-black bg-transparent border-b border-slate-700 focus:border-cyan-400 outline-none text-white py-1"
                      />
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                        {vac.department}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Banda Salarial</label>
                        <input
                          type="text"
                          value={vac.salaryRange}
                          onChange={(e) => {
                            const copy = [...vacancies];
                            copy[idx].salaryRange = e.target.value;
                            setVacancies(copy);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Ubicación</label>
                        <input
                          type="text"
                          value={vac.location}
                          onChange={(e) => {
                            const copy = [...vacancies];
                            copy[idx].location = e.target.value;
                            setVacancies(copy);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Modalidad</label>
                        <input
                          type="text"
                          value={vac.modality}
                          onChange={(e) => {
                            const copy = [...vacancies];
                            copy[idx].modality = e.target.value;
                            setVacancies(copy);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Descripción</label>
                      <textarea
                        rows={2}
                        value={vac.description}
                        onChange={(e) => {
                          const copy = [...vacancies];
                          copy[idx].description = e.target.value;
                          setVacancies(copy);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-300 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BANDEJA DE LEADS */}
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
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Mostrando {filteredLeads.length} de {leads.length} prospectos
                </span>
              </div>

              {filteredLeads.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-black text-[10px]">
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

          {/* TAB 5: CONFIGURACIÓN */}
          {activeTab === 'settings' && (
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">Canales de Atención &amp; WhatsApp</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Consultor</label>
                  <input
                    type="text"
                    value={siteContent.contact?.whatsapp || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, whatsapp: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Notificaciones</label>
                  <input
                    type="email"
                    value={siteContent.contact?.email || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
