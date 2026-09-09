import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { JobPosition } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  FileSearch, 
  ArrowRight, 
  X, 
  Upload, 
  FileText, 
  Send, 
  ChevronRight,
  TrendingUp,
  Flame,
  Layers,
  SlidersHorizontal,
  Cloud,
  FolderUp
} from 'lucide-react';

interface JobsPortalProps {
  onOpenCVAnalyzer: () => void;
  isFullPage?: boolean;
}

const INITIAL_JOBS: JobPosition[] = [
  {
    id: 'job-1',
    title: 'Chief Technology Officer (CTO) & VP of Engineering',
    department: 'Tecnología & Producto',
    location: 'Madrid / Híbrido (2 días)',
    modality: 'Híbrido',
    salaryRange: '110.000 € – 150.000 € + Stock Options',
    experienceLevel: 'C-Level (+10 años)',
    description: 'Scaleup fintech en fase Serie B busca CTO para liderar un equipo distribuido de 45 ingenieros, modernizar arquitectura cloud en AWS/Kubernetes y escalar la infraestructura transaccional de pagos.',
    requirements: [
      'Experiencia demostrable como CTO, VP Engineering o Head of Tech.',
      'Dominio de arquitecturas distribuidas de microservicios y alta disponibilidad.',
      'Liderazgo de personas, cultura ágil y retención de talento de ingeniería.'
    ],
    benefits: ['Equity / Stock Options', 'Seguro Médico Familiar Sanitas', 'Presupuesto formativo 4.000€/año'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Hace 1 día',
    tags: ['C-Level', 'Fintech', 'AWS', 'Kubernetes', 'Madrid'],
    hot: true
  },
  {
    id: 'job-2',
    title: 'Head of Artificial Intelligence & Generative Models',
    department: 'Inteligencia Artificial & Datos',
    location: 'Barcelona / Remoto España',
    modality: '100% Remoto',
    salaryRange: '90.000 € – 130.000 € + Bonus',
    experienceLevel: 'Director / Lead (+7 años)',
    description: 'Compañía multinacional de software B2B busca líder para crear la división de agentes de IA generativa, optimización de LLMs y automatización de procesos corporativos.',
    requirements: [
      'Track record en despliegue de modelos de IA / LLMs en producción.',
      'Conocimientos de Python, PyTorch, LangChain, RAG y arquitecturas cloud.',
      'Visión estratégica para monetizar soluciones de IA en clientes Enterprise.'
    ],
    benefits: ['100% Remoto en España', 'Horario 100% flexible', 'Bonus anual 20%'],
    isFeatured: true,
    isUrgent: false,
    postedDate: 'Hace 2 días',
    tags: ['IA Generativa', 'LLMs', 'Python', 'Remoto', 'Barcelona'],
    hot: true
  },
  {
    id: 'job-3',
    title: 'Chief Financial Officer (CFO / Director Financiero)',
    department: 'Finanzas & Legal',
    location: 'Madrid (Castellana)',
    modality: 'Presencial',
    salaryRange: '95.000 € – 140.000 € + 25% Variable',
    experienceLevel: 'C-Level (+10 años)',
    description: 'Grupo industrial en expansión internacional requiere CFO para liderar rondas de financiación, control de gestión, relación con banca y comités de auditoría.',
    requirements: [
      'Experiencia como Director Financiero o Senior Controller Corporativo.',
      'Sólido conocimiento en M&A, reporting bajo IFRS y estructuración fiscal.',
      'Nivel de inglés C1/C2 de negociación.'
    ],
    benefits: ['Vehículo de empresa', 'Plan de pensiones corporativo', 'Retribución flexible completa'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Hace 3 días',
    tags: ['CFO', 'Finanzas', 'M&A', 'Madrid'],
    hot: false
  },
  {
    id: 'job-4',
    title: 'Director Comercial & Business Development B2B',
    department: 'Ventas & Expansión',
    location: 'Madrid / Barcelona / Valencia',
    modality: 'Híbrido',
    salaryRange: '75.000 € – 110.000 € + Comisiones (40%)',
    experienceLevel: 'Senior / Director (+6 años)',
    description: 'Empresa SaaS B2B en pleno crecimiento busca líder comercial para estructurar el equipo de ventas directas y partners en España, Portugal e Italia.',
    requirements: [
      'Experiencia contrastada en venta consultiva B2B y ciclo largo Enterprise.',
      'Capacidad de apertura de cuentas clave y negociación con C-Levels.',
      'Liderazgo de equipos comerciales y metodología outbound/inbound.'
    ],
    benefits: ['Comisiones sin techo', 'Coche de empresa + Tarjeta gastos', 'Seguro médico'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 4 días',
    tags: ['Ventas B2B', 'SaaS', 'Híbrido', 'Comercial'],
    hot: false
  },
  {
    id: 'job-5',
    title: 'Senior Cloud & DevOps Architect (AWS / Terraform)',
    department: 'Infraestructura & Cloud',
    location: '100% Remoto España',
    modality: '100% Remoto',
    salaryRange: '65.000 € – 85.000 € Bruto Anual',
    experienceLevel: 'Senior (+5 años)',
    description: 'Diseño e implementación de infraestructura como código (IaC), pipelines CI/CD automatizados y clusters multi-región Kubernetes de alta tolerancia a fallos.',
    requirements: [
      'Certificaciones AWS Solutions Architect o similar.',
      'Dominio de Terraform, Docker, Kubernetes, Prometheus y Grafana.',
      'Experiencia en observabilidad y compliance de seguridad.'
    ],
    benefits: ['100% Remoto', 'Jornada intensiva los viernes', 'Ticket guardería y restaurant'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 5 días',
    tags: ['DevOps', 'AWS', 'Terraform', 'Kubernetes', 'Remoto'],
    hot: true
  },
  {
    id: 'job-6',
    title: 'Director de Recursos Humanos / Chief People Officer',
    department: 'People & Talent',
    location: 'Barcelona / Híbrido',
    modality: 'Híbrido',
    salaryRange: '70.000 € – 95.000 € + Bonus',
    experienceLevel: 'Director (+7 años)',
    description: 'Liderar la estrategia de captación, cultura y desarrollo de talento en una compañía de 300+ empleados en transformación digital.',
    requirements: [
      'Experiencia liderando departamentos de RRHH / People en España.',
      'Conocimiento en planes de carrera, evaluación 360 y retribución flexible.',
      'Dominio de la legislación laboral española (compliance y planes de igualdad).'
    ],
    benefits: ['Flexibilidad total', 'Seguro médico privado', 'Presupuesto de formación'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 6 días',
    tags: ['RRHH', 'People', 'Cultura', 'Barcelona'],
    hot: false
  }
];

export const JobsPortal: React.FC<JobsPortalProps> = ({ onOpenCVAnalyzer, isFullPage = false }) => {
  const { theme } = useTheme();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPill, setSelectedPill] = useState('Todos');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState(0);

  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Application Form Inputs
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateLinkedin, setCandidateLinkedin] = useState('');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [desiredSalary, setDesiredSalary] = useState('');
  const [availability, setAvailability] = useState('Inmediata');

  // Pill filter options
  const filterPills = [
    'Todos',
    '100% Remoto',
    'Híbrido',
    'Madrid',
    'Barcelona',
    'Tecnología & IA',
    'C-Level',
    'Finanzas',
    'Ventas B2B'
  ];

  const handlePillClick = (pill: string) => {
    setSelectedPill(pill);
    if (pill === 'Todos') {
      setSelectedModalities([]);
      setSelectedDepartments([]);
      setSearchTerm('');
    } else if (pill === '100% Remoto') {
      setSelectedModalities(['100% Remoto']);
    } else if (pill === 'Híbrido') {
      setSelectedModalities(['Híbrido']);
    } else {
      setSearchTerm(pill);
    }
  };

  const toggleModality = (mod: string) => {
    setSelectedModalities((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  // Filter jobs
  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesModality = 
      selectedModalities.length === 0 || selectedModalities.includes(job.modality);

    const matchesDept = 
      selectedDepartments.length === 0 || selectedDepartments.some((d) => job.department.includes(d));

    return matchesSearch && matchesModality && matchesDept;
  });

  const handleOpenApply = (job: JobPosition) => {
    setSelectedJob(job);
    setStep(1);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setStep(1);
    setIsSuccess(false);
    setCvFileName(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
    }
  };

  const handleFakeImport = (source: string) => {
    setCvFileName(`Perfil_Importado_${source}_${candidateName.replace(/\s+/g, '_') || 'Candidato'}.pdf`);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <section id="vacantes" className={`${isFullPage ? '' : 'py-16 sm:py-24'} relative transition-colors duration-300 ${
      isFullPage ? '' : theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className={`${isFullPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} relative z-10`}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bolsa de Empleo &amp; Procesos de Executive Search</span>
          </div>
          {isFullPage ? (
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Posiciones Directivas &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Tech en Selección Activa</span>
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Posiciones Directivas &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Tech en Selección Activa</span>
            </h2>
          )}
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Todas las ofertas cuentan con <strong>bandas salariales transparentes</strong> (Directiva UE 2023/970) y procesos de respuesta garantizada en menos de 48 horas.
          </p>
        </div>

        {/* MOBILE STICKY SEARCH & TACTILE PILLS */}
        <div className="sticky top-16 z-30 mb-8 p-3 rounded-2xl border backdrop-blur-xl shadow-lg transition-all"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: theme === 'dark' ? 'rgba(51, 65, 85, 0.7)' : 'rgba(226, 232, 240, 0.9)'
          }}
        >
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="jobs-search-input"
              type="text"
              placeholder="Buscar por cargo, tecnología (ej. CTO, Python, AWS) o ciudad..."
              aria-label="Buscar posiciones por cargo, tecnología o ciudad"
              data-webmcp-field="jobs-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/90 text-slate-100 border-slate-700 focus:border-emerald-500'
                  : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-emerald-500'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tactile Pills Filter Bar (Horizontal touch scroll) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 shrink-0 hidden sm:inline">
              Filtro Rápido:
            </span>
            {filterPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handlePillClick(pill)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all border shrink-0 ${
                  selectedPill === pill
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : theme === 'dark'
                      ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN JOBS LAYOUT (DESKTOP SIDEBAR + JOB CARDS GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className={`p-5 rounded-2xl border sticky top-40 ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider">Filtros Avanzados</h3>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {filteredJobs.length} Activas
                </span>
              </div>

              {/* Modality Filter */}
              <div className="pt-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Modalidad de Trabajo
                </label>
                <div className="space-y-2">
                  {['100% Remoto', 'Híbrido', 'Presencial'].map((mod) => (
                    <label key={mod} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={selectedModalities.includes(mod)}
                        onChange={() => toggleModality(mod)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Department Filter */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Sector / Departamento
                </label>
                <div className="space-y-2">
                  {['Tecnología', 'Inteligencia Artificial', 'Finanzas', 'Ventas', 'Infraestructura', 'People'].map((dept) => (
                    <label key={dept} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => toggleDepartment(dept)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                      />
                      <span>{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AI CV Audit Promo Box */}
              <div className="pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center">
                  <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold">¿No encuentras tu posición ideal?</p>
                  <p className="text-[10px] text-slate-400 mt-1 mb-2.5">
                    Sube tu CV para que nuestros Agentes de IA te emparejen con posiciones confidenciales.
                  </p>
                  <button
                    onClick={onOpenCVAnalyzer}
                    className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all"
                  >
                    Auditar CV con IA
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* JOB LISTINGS CARDS (GRID OF JOBS) */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Live Count Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
              <p>Mostrando <strong className="text-slate-100">{filteredJobs.length}</strong> posiciones encontradas</p>
              <span className="text-[11px] text-emerald-500 font-semibold">Actualizado hoy</span>
            </div>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl relative flex flex-col justify-between ${
                    job.isFeatured
                      ? theme === 'dark'
                        ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500'
                        : 'bg-white border-emerald-300 hover:border-emerald-500 shadow-md'
                      : theme === 'dark'
                        ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Top Tags & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {job.department}
                      </span>
                      {job.hot && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <Flame className="w-3 h-3 text-rose-500" />
                          <span>Proceso Urgente</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {job.postedDate}
                    </span>
                  </div>

                  {/* Job Title & Main Specs */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading mb-2 hover:text-emerald-500 transition-colors">
                      {job.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {job.description}
                    </p>

                    {/* Salary & Location Strip */}
                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl border mb-4 text-xs ${
                      theme === 'dark' ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Banda Salarial</p>
                          <p className="font-extrabold text-emerald-500">{job.salaryRange}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Ubicación</p>
                          <p className="font-semibold">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Experiencia</p>
                          <p className="font-semibold">{job.experienceLevel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {job.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                              theme === 'dark'
                                ? 'bg-slate-950 border-slate-800 text-slate-400'
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Proceso confidencial gestionado por Nexo Talentos
                    </span>
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Postular a esta Vacante</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="p-12 text-center border rounded-2xl bg-slate-900/30 border-slate-800">
                <FileSearch className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h4 className="text-base font-bold">No se encontraron posiciones con estos filtros</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">Prueba a borrar términos o seleccionar otra modalidad.</p>
                <button
                  onClick={() => handlePillClick('Todos')}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ================= FRICTIONLESS MULTI-STEP APPLICATION MODAL ================= */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
            }`}>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider">
                  Postulación de Candidato
                </span>
                <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Step Progress Bar */}
            {!isSuccess && (
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                  <span className={step >= 1 ? 'text-emerald-500 font-extrabold' : ''}>1. Datos Personales</span>
                  <span className={step >= 2 ? 'text-emerald-500 font-extrabold' : ''}>2. Carga de CV</span>
                  <span className={step >= 3 ? 'text-emerald-500 font-extrabold' : ''}>3. Disponibilidad</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                    style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                  />
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6">
              {!isSuccess ? (
                <div>
                  {/* STEP 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-3.5">
                      <div>
                        <label 
                          htmlFor="job-candidate-name"
                          className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >
                          Nombre y Apellidos *
                        </label>
                        <input
                          id="job-candidate-name"
                          type="text"
                          required
                          placeholder="Ej. Laura Martínez González"
                          aria-label="Nombre y Apellidos del Candidato"
                          data-webmcp-field="candidate-name"
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label 
                            htmlFor="job-candidate-email"
                            className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                          >
                            Email de Contacto *
                          </label>
                          <input
                            id="job-candidate-email"
                            type="email"
                            required
                            placeholder="tu.email@ejemplo.com"
                            aria-label="Email de Contacto del Candidato"
                            data-webmcp-field="candidate-email"
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                            className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                              theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                            }`}
                          />
                        </div>
                        <div>
                          <label 
                            htmlFor="job-candidate-phone"
                            className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                          >
                            Teléfono *
                          </label>
                          <input
                            id="job-candidate-phone"
                            type="tel"
                            required
                            placeholder="+34 612 345 678"
                            aria-label="Teléfono del Candidato"
                            data-webmcp-field="candidate-phone"
                            value={candidatePhone}
                            onChange={(e) => setCandidatePhone(e.target.value)}
                            className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                              theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label 
                          htmlFor="job-candidate-linkedin"
                          className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >
                          Enlace a Perfil de LinkedIn (Opcional)
                        </label>
                        <input
                          id="job-candidate-linkedin"
                          type="url"
                          placeholder="https://linkedin.com/in/tu-perfil"
                          aria-label="Enlace a Perfil de LinkedIn"
                          data-webmcp-field="candidate-linkedin"
                          value={candidateLinkedin}
                          onChange={(e) => setCandidateLinkedin(e.target.value)}
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        />
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (!candidateName || !candidateEmail || !candidatePhone) {
                              alert('Por favor completa nombre, email y teléfono.');
                              return;
                            }
                            setStep(2);
                          }}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                        >
                          <span>Siguiente: Subir CV</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: CV Upload & 1-Click Connectors */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className={`p-6 border-2 border-dashed rounded-2xl text-center relative transition-all ${
                        cvFileName ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-950/40 hover:border-emerald-500/50'
                      }`}>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <FolderUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        {cvFileName ? (
                          <div>
                            <p className="text-xs font-bold text-emerald-400">Archivo Seleccionado:</p>
                            <p className="text-xs text-white font-mono mt-0.5">{cvFileName}</p>
                            <p className="text-[10px] text-slate-400 mt-1">Haz clic para cambiar de archivo</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-bold">Arrastra tu CV aquí o haz clic para subir</p>
                            <p className="text-[10px] text-slate-400 mt-1">Formatos aceptados: PDF, Word (Máx 10MB)</p>
                          </div>
                        )}
                      </div>

                      {/* 1-Click Cloud & LinkedIn Connectors */}
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                          O Importa con 1 Clic desde:
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => handleFakeImport('LinkedIn')}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-blue-500' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <span>💼 LinkedIn</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFakeImport('GoogleDrive')}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-cyan-500' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <Cloud className="w-3.5 h-3.5 text-cyan-500" />
                            <span>Drive</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFakeImport('iCloud')}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-teal-500' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <span>☁️ iCloud</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                        >
                          Atrás
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!cvFileName) {
                              alert('Por favor sube o importa tu CV.');
                              return;
                            }
                            setStep(3);
                          }}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                        >
                          <span>Siguiente: Preferencias</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Expectations & Confirmation */}
                  {step === 3 && (
                    <form onSubmit={handleFinalSubmit} className="space-y-3.5" data-webmcp-form="job-application-preferences">
                      <div>
                        <label 
                          htmlFor="job-desired-salary"
                          className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >
                          Pretensión Salarial Bruta Anual (€/año)
                        </label>
                        <input
                          id="job-desired-salary"
                          type="text"
                          placeholder="Ej. 75.000 € - 85.000 €"
                          aria-label="Pretensión Salarial Bruta Anual"
                          data-webmcp-field="desired-salary"
                          value={desiredSalary}
                          onChange={(e) => setDesiredSalary(e.target.value)}
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800 focus:border-emerald-500' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="job-availability-select"
                          className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >
                          Disponibilidad de Incorporación
                        </label>
                        <select
                          id="job-availability-select"
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          aria-label="Disponibilidad de Incorporación"
                          data-webmcp-field="availability"
                          className={`w-full py-2.5 px-3.5 text-xs rounded-xl border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
                          }`}
                        >
                          <option value="Inmediata">Inmediata (Sin preaviso)</option>
                          <option value="15 Dias">15 Días (Preaviso estándar)</option>
                          <option value="1 Mes">1 Mes (Preaviso directivo)</option>
                          <option value="2 Meses">2 Meses o más</option>
                        </select>
                      </div>

                      {/* Summary Box */}
                      <div className={`p-3.5 rounded-xl border text-xs ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confidencialidad Garantizada</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          Tus datos se procesarán exclusivamente para este proceso de selección y no se compartirán con terceros sin tu consentimiento previo expreso (Directiva UE y RGPD).
                        </p>
                      </div>

                      <div className="pt-3 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                        >
                          Atrás
                        </button>
                        <button
                          type="submit"
                          className="px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Confirmar y Enviar Postulación</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Instant Confirmation Card */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold font-heading text-emerald-400">
                    ¡Postulación Enviada con Éxito!
                  </h3>
                  <div className={`p-4 rounded-xl border text-left text-xs space-y-2 max-w-md mx-auto ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <p className="font-bold text-white">Siguientes pasos de tu proceso:</p>
                    <p>1. <strong>Revisión del CV:</strong> Nuestro equipo de Headhunters evaluará tu encaje competencial con <strong>{selectedJob.title}</strong>.</p>
                    <p>2. <strong>Contacto en &lt;48h:</strong> Te llamaremos al <strong>{candidatePhone}</strong> o escribiremos a <strong>{candidateEmail}</strong>.</p>
                    <p>3. <strong>Entrevista STAR:</strong> Si tu perfil encaja, coordinaremos la primera sesión confidencial.</p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Cerrar y Ver Más Ofertas
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
