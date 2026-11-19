import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../Logo';
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
  X,
  RotateCcw,
  Sun,
  Moon,
  Check,
  Archive
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
  const [adminSearch, setAdminSearch] = useState('');
  
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

  // Vacantes Administrables (CRUD Completo: Crear, Modificar, Eliminar)
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

  // Modal para nueva vacante
  const [isCreatingVacancy, setIsCreatingVacancy] = useState(false);
  const [newVacTitle, setNewVacTitle] = useState('');
  const [newVacDept, setNewVacDept] = useState('Executive Search');
  const [newVacLoc, setNewVacLoc] = useState('Quito, Ecuador');
  const [newVacMod, setNewVacMod] = useState('Presencial');
  const [newVacSalary, setNewVacSalary] = useState('A convenir');
  const [newVacDesc, setNewVacDesc] = useState('');

  // Leads State con Actions (Marcar atendido / Eliminar)
  const [leads, setLeads] = useState<any[]>([]);
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'pending' | 'attended'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Cargar contenido CMS
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.hero) setSiteContent(data);
        if (data && Array.isArray(data.vacancies) && data.vacancies.length > 0) {
          setVacancies(data.vacancies);
        }
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

  const handleRestoreDefaults = () => {
    if (confirm('¿Restaurar los textos originales del sitio web?')) {
      setSiteContent({
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
          email: 'info@nexotalento.com'
        }
      });
    }
  };

  // Acciones en Leads (Marcar atendido / Eliminar)
  const handleToggleLeadAttended = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if ((l.id || l._id) === leadId) {
        return { ...l, attended: !l.attended };
      }
      return l;
    }));
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('¿Deseas eliminar este prospecto de la bandeja?')) {
      setLeads(prev => prev.filter(l => (l.id || l._id) !== leadId));
    }
  };

  // Crear Vacante
  const handleAddVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacTitle.trim()) return;

    const newVac = {
      id: `vac-${Date.now()}`,
      title: newVacTitle.trim(),
      department: newVacDept,
      location: newVacLoc,
      modality: newVacMod,
      salaryRange: newVacSalary,
      experienceLevel: 'Experiencia directiva o técnica demostrada',
      description: newVacDesc.trim() || 'Posición en selección activa gestionada por Nexo Talento.',
      requirements: ['Experiencia relevante en el sector.', 'Disponibilidad para incorporarse al equipo.'],
      hot: true,
      postedDate: 'Reciente'
    };

    setVacancies(prev => [newVac, ...prev]);
    setIsCreatingVacancy(false);
    setNewVacTitle('');
    setNewVacDesc('');
  };

  const handleDeleteVacancy = (vacId: string) => {
    if (confirm('¿Eliminar esta vacante del portal?')) {
      setVacancies(prev => prev.filter(v => v.id !== vacId));
    }
  };

  const menuItems = [
    { id: 'analytics' as AdminTab, label: 'Analítica', icon: BarChart3 },
    { id: 'hero' as AdminTab, label: 'Inicio y Hero', icon: FileText },
    { id: 'vacancies' as AdminTab, label: 'Vacantes Activas', icon: Briefcase, count: vacancies.length },
    { id: 'services' as AdminTab, label: 'Áreas de Especialización', icon: Layers },
    { id: 'sectors' as AdminTab, label: 'Sectores de Industria', icon: Building2 },
    { id: 'leads' as AdminTab, label: 'Bandeja de Leads', icon: MessageSquare, count: leads.length },
    { id: 'settings' as AdminTab, label: 'Configuración y Contacto', icon: Settings }
  ];

  const filteredLeads = leads.filter(l => {
    const matchesSearch = !searchTerm ||
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (leadStatusFilter === 'attended') return matchesSearch && l.attended;
    if (leadStatusFilter === 'pending') return matchesSearch && !l.attended;
    return matchesSearch;
  });

  return (
    <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#080a0d] text-slate-100' : 'bg-[#FAF8F5] text-slate-900'
    }`}>
      
      {/* SIDEBAR FIJO DEL ALTO EXACTO DE LA PANTALLA (ESTILO MODULARES GM) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 md:static flex flex-col h-full border-r transition-transform duration-300 ease-in-out shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        theme === 'dark' ? 'bg-[#0c0e12] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        
        {/* Header Izquierdo con Logo Oficial (Mismo Alto h-16 que el Header Derecho) */}
        <div className="h-16 px-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" showSubtitle={false} />
            <div className="flex flex-col leading-none">
              <span className="text-xs font-bold text-stone-900 dark:text-white font-heading">Nexo Talento</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">Admin HQ</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge Limpio */}
        <div className="p-3 mx-3 my-2.5 rounded-xl border border-stone-200 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-900/60 shrink-0">
          <p className="text-xs font-bold truncate text-stone-900 dark:text-stone-100">{user?.nombre || 'Pablo García'}</p>
          <p className="text-[10px] text-stone-500 truncate">{user?.email || 'pablofgarciaf@gmail.com'}</p>
        </div>

        {/* Menú de Navegación Vertical */}
        <nav className="flex-1 px-2.5 py-1 space-y-1 overflow-y-auto">
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-bold shadow-xs'
                    : theme === 'dark'
                      ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-900/60'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive 
                      ? 'bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-900' 
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer del Sidebar con Cerrar Sesión */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 shrink-0">
          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay para móvil */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ÁREA PRINCIPAL CON HEADER FIJO Y SCROLL INTERNO */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* ÚNICO HEADER SUPERIOR FIJO (h-16 EXACTO COMO MODULARES GM) */}
        <header className="h-16 px-4 sm:px-8 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-xl flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 md:hidden"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-heading">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-stone-500">
                Gestión en tiempo real de Nexo Talento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Buscador inteligente */}
            <div className="relative hidden lg:block w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar sección o texto..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              />
            </div>

            {/* Alternador Modo Claro / Oscuro */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
          </div>
        </header>

        {/* CONTENIDO INTERNO CON SCROLL (CON ESPACIO INFERIOR PARA BARRA FIJA) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* TAB 1: ANALÍTICA */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Leads Totales</span>
                    <Users className="w-4 h-4 text-cyan-500" />
                  </div>
                  <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{leads.length}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Conectado a Google Sheets</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Google Analytics 4</span>
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">G-T4ZC2SJXHS</p>
                  <p className="text-[10px] text-stone-500 mt-1">Medición de eventos activa</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Google Tag Manager</span>
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                  </div>
                  <p className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">GTM-PX6M5QSS</p>
                  <p className="text-[10px] text-stone-500 mt-1">Inyectado en head y body</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Meta &amp; TikTok Ads</span>
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-xs font-bold text-purple-600 dark:text-purple-300">fbq &amp; ttq Listos</p>
                  <p className="text-[10px] text-stone-500 mt-1">Eventos: lead, apply_job, whatsapp</p>
                </div>
              </div>
            )}

            {/* TAB 2: HERO & TEXTOS */}
            {activeTab === 'hero' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Badge Superior</label>
                    <input
                      type="text"
                      value={siteContent.hero?.badge || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, badge: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Badge Edición</label>
                    <input
                      type="text"
                      value={siteContent.hero?.editionBadge || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, editionBadge: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Título Principal (H1)</label>
                  <input
                    type="text"
                    value={siteContent.hero?.titlePrefix || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titlePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Subtítulo / Propuesta de Valor</label>
                  <textarea
                    rows={3}
                    value={siteContent.hero?.subtitle || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, subtitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: VACANTES (CON MODAL CREAR, MODIFICAR Y ELIMINAR) */}
            {activeTab === 'vacancies' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {vacancies.length} posiciones en selección activa
                  </span>
                  <button
                    onClick={() => setIsCreatingVacancy(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Vacante</span>
                  </button>
                </div>

                {/* Formulario Crear Vacante Modal */}
                {isCreatingVacancy && (
                  <form onSubmit={handleAddVacancy} className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border-2 border-cyan-500/50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-300 dark:border-stone-800">
                      <span className="text-xs font-black uppercase text-cyan-600 dark:text-cyan-400">Nueva Oferta de Empleo</span>
                      <button type="button" onClick={() => setIsCreatingVacancy(false)} className="text-stone-400 hover:text-stone-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Cargo / Título</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Gerente de Operaciones"
                          value={newVacTitle}
                          onChange={(e) => setNewVacTitle(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Departamento</label>
                        <input
                          type="text"
                          value={newVacDept}
                          onChange={(e) => setNewVacDept(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Ubicación</label>
                        <input
                          type="text"
                          value={newVacLoc}
                          onChange={(e) => setNewVacLoc(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Modalidad</label>
                        <select
                          value={newVacMod}
                          onChange={(e) => setNewVacMod(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        >
                          <option value="Presencial">Presencial</option>
                          <option value="Híbrido">Híbrido</option>
                          <option value="100% Remoto">100% Remoto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Banda Salarial</label>
                        <input
                          type="text"
                          value={newVacSalary}
                          onChange={(e) => setNewVacSalary(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Descripción</label>
                      <textarea
                        rows={2}
                        placeholder="Descripción detallada de la posición..."
                        value={newVacDesc}
                        onChange={(e) => setNewVacDesc(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsCreatingVacancy(false)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-sm"
                      >
                        Guardar Vacante
                      </button>
                    </div>
                  </form>
                )}

                {/* Lista de Vacantes Editables */}
                <div className="space-y-3">
                  {vacancies.map((vac, idx) => (
                    <div key={vac.id || idx} className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={vac.title}
                          onChange={(e) => {
                            const copy = [...vacancies];
                            copy[idx].title = e.target.value;
                            setVacancies(copy);
                          }}
                          className="text-sm font-bold bg-transparent border-b border-transparent hover:border-stone-300 dark:hover:border-stone-700 focus:border-cyan-500 outline-none text-stone-900 dark:text-white flex-1"
                        />
                        <button
                          onClick={() => handleDeleteVacancy(vac.id)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                          title="Eliminar vacante"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Sueldo</span>
                          <input
                            type="text"
                            value={vac.salaryRange}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].salaryRange = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-emerald-600 dark:text-emerald-400 font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Ubicación</span>
                          <input
                            type="text"
                            value={vac.location}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].location = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Modalidad</span>
                          <input
                            type="text"
                            value={vac.modality}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].modality = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: BANDEJA DE LEADS CON ACCIONES (ATENDER / ELIMINAR) */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, email o cargo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      onClick={() => setLeadStatusFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'all' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Todos ({leads.length})
                    </button>
                    <button
                      onClick={() => setLeadStatusFilter('pending')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'pending' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Pendientes
                    </button>
                    <button
                      onClick={() => setLeadStatusFilter('attended')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'attended' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Atendidos
                    </button>
                  </div>
                </div>

                {filteredLeads.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-stone-50 dark:bg-stone-950 text-stone-500 uppercase font-bold text-[10px]">
                        <tr>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800">Estado</th>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800">Fecha</th>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800">Nombre</th>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800">Email &amp; Teléfono</th>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800">Empresa / Rol</th>
                          <th className="p-3 border-b border-stone-200 dark:border-stone-800 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
                        {filteredLeads.map((lead, idx) => {
                          const leadId = lead.id || lead._id || `lead-${idx}`;
                          return (
                            <tr key={leadId} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                              <td className="p-3">
                                {lead.attended ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                    Atendido
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                                    Pendiente
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-stone-500 text-[11px] whitespace-nowrap">
                                {lead.createdAt?.slice(0, 10) || 'Hoy'}
                              </td>
                              <td className="p-3 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                                {lead.name}
                              </td>
                              <td className="p-3">
                                <p className="text-cyan-600 dark:text-cyan-400">{lead.email}</p>
                                <p className="text-stone-500 text-[11px]">{lead.phone}</p>
                              </td>
                              <td className="p-3 text-stone-700 dark:text-stone-300">
                                <span className="font-semibold">{lead.company}</span>
                                {lead.role && <span className="text-[11px] text-stone-500 block">{lead.role}</span>}
                              </td>
                              <td className="p-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleToggleLeadAttended(leadId)}
                                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                                      lead.attended 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300' 
                                        : 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300'
                                    }`}
                                    title={lead.attended ? 'Marcar como pendiente' : 'Marcar como atendido'}
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLead(leadId)}
                                    className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-rose-500 transition-colors"
                                    title="Eliminar lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40">
                    <Users className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-stone-700 dark:text-stone-300">No se encontraron prospectos</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: CONFIGURACIÓN */}
            {activeTab === 'settings' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">WhatsApp Consultor</label>
                    <input
                      type="text"
                      value={siteContent.contact?.whatsapp || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, whatsapp: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Email Notificaciones</label>
                    <input
                      type="email"
                      value={siteContent.contact?.email || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* BARRA DE GUARDAR / RESTAURAR FIJA DE TODO EL ANCHO EN EL FONDO (IGUAL A MODULARES GM) */}
        <footer className="fixed bottom-0 right-0 left-0 md:left-64 z-40 h-16 border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            {saveSuccess ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cambios guardados con éxito en la web.</span>
              </span>
            ) : (
              <span>Recuerda guardar los cambios para aplicarlos en la página.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRestoreDefaults}
              className="h-9 px-4 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Restaurar</span>
            </button>
            <button
              onClick={handleSaveCMS}
              disabled={isSaving}
              className="h-9 px-5 rounded-xl text-xs font-bold bg-stone-900 text-white dark:bg-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-stone-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </footer>

      </div>

    </div>
  );
};
