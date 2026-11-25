import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AdminDashboardLayout } from './AdminDashboardLayout';
import { AdminDashboardPrimaryTabs } from './AdminDashboardPrimaryTabs';
import { AdminDashboardSecondaryTabs } from './AdminDashboardSecondaryTabs';
import { auth } from '../../lib/firebase';
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
  | 'applications'
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

  // Áreas de Especialización Administrables
  const [areasList, setAreasList] = useState<any[]>([
    {
      id: 'seleccion-talento',
      title: 'Selección de Talento',
      subtitle: 'Reclutamiento Operativo y Mandos Medios',
      badge: 'Procesos Ágiles',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      description: 'Atracción y filtrado por competencias para posiciones intermedias, técnicas y operativas con validación de idoneidad y referencias verificadas.'
    },
    {
      id: 'executive-search',
      title: 'Executive Search',
      subtitle: 'C-Level & Directores Generales',
      badge: 'Máxima Confidencialidad',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      description: 'Búsqueda directa y exclusiva de Presidentes, CEOs, CFOs y miembros del Comité de Dirección bajo estrictos acuerdos de confidencialidad.'
    },
    {
      id: 'headhunting',
      title: 'Headhunting',
      subtitle: 'Caza Directa de Talento en Activo',
      badge: 'Caza Quirúrgica',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      description: 'Identificación y captación directa de perfiles no disponibles en portales de empleo, atrayendo a líderes consolidados en la competencia.'
    },
    {

      id: 'evaluacion-talento',
      title: 'Evaluación de Talento',
      subtitle: 'Assessment Centers & Fit Cultural',
      badge: 'Diagnóstico 360°',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      description: 'Auditoría psicométrica, pruebas situacionales y evaluación profunda del potencial para promociones internas o comités de sucesión.'
    },
    {
      id: 'desarrollo-organizacional',
      title: 'Desarrollo Organizacional',
      subtitle: 'Estructura, Cultura y Retención',
      badge: 'Escalabilidad Corporativa',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      description: 'Diseño de organigramas ágiles, planes de compensación total y diagnóstico de clima laboral para maximizar el engagement del equipo directivo.'
    },
    {
      id: 'outplacement',
      title: 'Outplacement',
      subtitle: 'Transición de Carrera & Recolocación',
      badge: 'Acompañamiento Humano',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      description: 'Programas de orientación profesional, optimización de marca personal y recolocación efectiva para ejecutivos desvinculados.'
    }
  ]);

  // Sectores de Industria Administrables
  const [sectorsList, setSectorsList] = useState<any[]>([
    {
      id: 'retail-consumo',
      name: 'Retail y Consumo Masivo',
      subtitle: 'FMCG, Gran Distribución y E-commerce Omnicanal',
      badge: 'Alta Rotación & Expansión',
      description: 'Atracción de directores comerciales, gerentes de operaciones retail y especialistas en cadena de suministro de gran consumo con probada capacidad de rentabilidad y tracción en punto de venta.'
    },
    {
      id: 'banca-finanzas',
      name: 'Banca, Finanzas y Seguros',
      subtitle: 'Banca Corporativa, Fintech, Insurtech y Fondos de Inversión',
      badge: 'Cumplimiento & C-Level',
      description: 'Headhunting confidencial para posiciones clave en gestión de patrimonio, banca de inversión, modelación de riesgos, cumplimiento normativo y directores financieros (CFO) con visión estratégica.'
    },
    {
      id: 'industria-manufactura',
      name: 'Industria y Manufactura',
      subtitle: 'Automoción, Metalmecánica, Química y Plantas Industriales',
      badge: 'Ingeniería & Producción',
      description: 'Selección de líderes de planta, directores de ingeniería, especialistas en Lean Manufacturing, excelencia operacional y mantenimiento predictivo en entornos industriales de alta exigencia.'
    },
    {
      id: 'agroindustria-forestal',
      name: 'Agroindustria y Sector Forestal',
      subtitle: 'Agrotech, Producción Agrícola, Procesamiento y Forestal',
      badge: 'Sostenibilidad & Campo',
      description: 'Reclutamiento de especialistas agronómicos, gerentes de operaciones agrícolas, directores de packing y líderes en tecnificación de riego y biotecnología aplicada a la productividad.'
    },
    {
      id: 'transporte-logistica',
      name: 'Transporte, Logística e Importaciones',
      subtitle: 'Supply Chain, Operadores 3PL/4PL, Aduanas y Freight Forwarding',
      badge: 'Supply Chain Crítica',
      description: 'Captación de directores de cadena de suministro internacional, jefes de centros de distribución (CD), agentes de aduana y expertos en comercio exterior para blindar las operaciones de entrada y salida.'
    },
    {
      id: 'tecnologia-telecomunicaciones',
      name: 'Tecnología y Telecomunicaciones',
      subtitle: 'Software, Infraestructura Cloud, Ciberseguridad, Telco e IA',
      badge: 'Tech & Digital Leaders',
      description: 'Headhunting ultra-especializado en talento tecnológico: arquitectos de nube, directores de ingeniería, líderes de producto y especialistas en telecomunicaciones de alta disponibilidad.'
    },
    {
      id: 'hoteleria-servicios',
      name: 'Hotelería y Servicios',
      subtitle: 'Hospitality, Cadenas Hoteleras, Restauración y Facility Services',
      badge: 'Hospitality & Customer Care',
      description: 'Identificación de directores de hotel, gerentes generales de resorts, directores de alimentos y bebidas (F&B) y ejecutivos de servicios corporativos enfocados en la experiencia del cliente.'
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
  const [applications, setApplications] = useState<any[]>([]);
  const [trackingEvents, setTrackingEvents] = useState<any[]>([]);
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'pending' | 'attended'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const adminFetch = async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const user = auth.currentUser;
    if (!user) throw new Error('La sesión administrativa ha expirado.');
    const token = await user.getIdToken();
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(input, { ...init, headers });
  };

  useEffect(() => {
    let cancelled = false;
    const loadAdminData = async () => {
      try {
        const [contentRes, leadsRes, applicationsRes, eventsRes] = await Promise.all([
          adminFetch('/api/admin/content'),
          adminFetch('/api/admin/leads'),
          adminFetch('/api/admin/applications'),
          adminFetch('/api/admin/events')
        ]);
        if (!contentRes.ok || !leadsRes.ok || !applicationsRes.ok || !eventsRes.ok) throw new Error('No fue posible validar la sesión administrativa.');
        const data = await contentRes.json();
        const leadsData = await leadsRes.json();
        const applicationsData = await applicationsRes.json();
        const eventsData = await eventsRes.json();
        if (cancelled) return;
        if (data && data.hero) setSiteContent(data);
        if (data && Array.isArray(data.vacancies) && data.vacancies.length > 0) setVacancies(data.vacancies);
        if (data && Array.isArray(data.areas) && data.areas.length > 0) setAreasList(data.areas);
        if (data && Array.isArray(data.sectors) && data.sectors.length > 0) setSectorsList(data.sectors);
        if (Array.isArray(leadsData)) setLeads(leadsData);
        if (Array.isArray(applicationsData)) setApplications(applicationsData);
        if (Array.isArray(eventsData)) setTrackingEvents(eventsData);
      } catch (err) {
        console.warn('No se pudieron cargar datos administrativos:', err);
      }
    };
    loadAdminData();
    return () => { cancelled = true; };
  }, []);

  const handleSaveCMS = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await adminFetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...siteContent, vacancies, areas: areasList, sectors: sectorsList })
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
    { id: 'applications' as AdminTab, label: 'Postulaciones', icon: Briefcase, count: applications.length },
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


  const panelState = {
    activeTab, siteContent, setSiteContent, vacancies, setVacancies, areasList, setAreasList, sectorsList, setSectorsList,
    isCreatingVacancy, setIsCreatingVacancy, newVacTitle, setNewVacTitle, newVacDept, setNewVacDept, newVacLoc, setNewVacLoc,
    newVacMod, setNewVacMod, newVacSalary, setNewVacSalary, newVacDesc, setNewVacDesc, leads, leadStatusFilter, setLeadStatusFilter,
    applications, trackingEvents, searchTerm, setSearchTerm, filteredLeads, handleAddVacancy, handleDeleteVacancy, handleDeleteLead, handleToggleLeadAttended
  };

  const dashboardState = {
    theme, toggleTheme, sidebarOpen, setSidebarOpen, user, onLogout, activeTab, setActiveTab, adminSearch, setAdminSearch,
    menuItems, saveSuccess, handleRestoreDefaults, handleSaveCMS, isSaving
  };

  return (
    <AdminDashboardLayout state={dashboardState}>
      <AdminDashboardPrimaryTabs state={panelState} />
      <AdminDashboardSecondaryTabs state={panelState} />
    </AdminDashboardLayout>
  );
};
