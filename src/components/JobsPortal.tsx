import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { JobPosition } from '../types';
import { INITIAL_JOBS } from '../data/jobsData';
import { JobApplicationModal } from './JobApplicationModal';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  FileSearch, 
  ArrowRight, 
  X, 
  TrendingUp,
  Flame
} from 'lucide-react';

interface JobsPortalProps {
  onOpenCVAnalyzer: () => void;
  isFullPage?: boolean;
}

export const JobsPortal: React.FC<JobsPortalProps> = ({ onOpenCVAnalyzer, isFullPage = false }) => {
  const { theme } = useTheme();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPill, setSelectedPill] = useState('Todos');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pill filter options
  const filterPills = [
    'Todos',
    'Quito',
    'Guayaquil',
    'Valle de los Chillos',
    'Marketing',
    'Contabilidad',
    'Carga Internacional',
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
      setSearchTerm('');
    } else if (pill === 'Híbrido') {
      setSelectedModalities(['Híbrido']);
      setSearchTerm('');
    } else if (pill === 'Presencial') {
      setSelectedModalities(['Presencial']);
      setSearchTerm('');
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
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      !term ||
      job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.department.toLowerCase().includes(term) ||
      job.tags?.some((t) => t.toLowerCase().includes(term));

    const matchesModality = 
      selectedModalities.length === 0 || selectedModalities.includes(job.modality);

    const matchesDept = 
      selectedDepartments.length === 0 || selectedDepartments.some((d) => job.department.toLowerCase().includes(d.toLowerCase()));

    return matchesSearch && matchesModality && matchesDept;
  });

  const handleOpenApply = (job: JobPosition) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <section id="vacantes" className={`${isFullPage ? '' : 'py-16 sm:py-12 sm:py-16'} relative transition-colors duration-300 ${
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
              Posiciones Directivas &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Talento en Selección Activa</span>
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Posiciones Directivas &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Talento en Selección Activa</span>
            </h2>
          )}
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Todas las ofertas cuentan con <strong>bandas salariales transparentes</strong>, procesos confidenciales y respuesta ágil en selección corporativa.
          </p>
        </div>

        {/* MOBILE STICKY SEARCH & TACTILE PILLS */}
        <div className={`sticky top-16 z-30 mb-8 p-3 rounded-2xl border backdrop-blur-xl shadow-lg transition-all ${
          theme === 'dark'
            ? 'bg-slate-900/95 border-slate-700/80 shadow-black/40'
            : 'bg-white/95 border-slate-300 shadow-slate-200/60'
        }`}>
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="jobs-search-input"
              type="text"
              placeholder="Buscar por cargo (ej. Jefe de Marketing, Asesor Comercial, Contable) o ciudad..."
              aria-label="Buscar posiciones por cargo, especialidad o ciudad"
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
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all border shrink-0 active:scale-95 ${
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

        {/* MAIN JOBS LAYOUT (DESKTOP PERSISTENT STICKY SIDEBAR + JOB CARDS GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP PERSISTENT LEFT SIDEBAR - Stays visible on scroll down to footer */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-6">
            <div className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              
              <div className={`flex items-center justify-between pb-3 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Filtros Avanzados
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {filteredJobs.length} Activas
                </span>
              </div>

              {/* Modality Filter */}
              <div className="pt-4">
                <label className="block text-xs font-black uppercase tracking-wider mb-2.5 text-slate-900 dark:text-slate-100">
                  Modalidad de Trabajo
                </label>
                <div className="space-y-2.5">
                  {['Presencial', 'Híbrido', '100% Remoto'].map((mod) => (
                    <label key={mod} className="flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-colors text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400">
                      <input
                        type="checkbox"
                        checked={selectedModalities.includes(mod)}
                        onChange={() => toggleModality(mod)}
                        className="rounded border-slate-400 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Department Filter */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-black uppercase tracking-wider mb-2.5 text-slate-900 dark:text-slate-100">
                  Sector / Departamento
                </label>
                <div className="space-y-2.5">
                  {['Marketing', 'Finanzas', 'Logística', 'Ventas', 'Tecnología', 'People'].map((dept) => (
                    <label key={dept} className="flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-colors text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => toggleDepartment(dept)}
                        className="rounded border-slate-400 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span>{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AI CV Audit Promo Box */}
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 text-center">
                  <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mx-auto mb-1.5" />
                  <p className={`text-xs font-black ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    ¿No encuentras tu posición ideal?
                  </p>
                  <p className={`text-[10px] mt-1 mb-2.5 font-medium ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Sube tu CV para que nuestros Headhunters te emparejen con posiciones confidenciales en Ecuador e internacional.
                  </p>
                  <button
                    onClick={onOpenCVAnalyzer}
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Auditar CV con IA
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* JOB LISTINGS CARDS (GRID OF JOBS) */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Live Count Header */}
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-300 dark:border-slate-800">
              <p className="text-slate-900 dark:text-slate-100 font-semibold">
                Mostrando <strong className="text-slate-950 dark:text-white font-black">{filteredJobs.length}</strong> posiciones activas
              </p>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-black bg-emerald-500/15 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                Procesos Actualizados
              </span>
            </div>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl relative flex flex-col justify-between ${
                    job.isFeatured
                      ? theme === 'dark'
                        ? 'bg-slate-900 border-emerald-500/40 hover:border-emerald-500 shadow-lg'
                        : 'bg-white border-emerald-300 hover:border-emerald-500 shadow-md'
                      : theme === 'dark'
                        ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Top Tags & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        {job.department}
                      </span>
                      {job.hot && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                          <Flame className="w-3 h-3 text-rose-500" />
                          <span>Proceso Activo</span>
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.postedDate}
                    </span>
                  </div>

                  {/* Job Title & Main Specs */}
                  <div>
                    <h3 className={`text-lg sm:text-xl font-black font-heading mb-2 transition-colors ${
                      theme === 'dark' ? 'text-white hover:text-emerald-400' : 'text-slate-950 hover:text-emerald-600'
                    }`}>
                      {job.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {job.description}
                    </p>

                    {/* Salary & Location Strip */}
                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl border mb-4 text-xs ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-700' : 'bg-slate-100 border-slate-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <p className={`text-[10px] uppercase font-black ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>Banda Salarial</p>
                          <p className="font-black text-emerald-700 dark:text-emerald-400 text-sm">{job.salaryRange}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <div>
                          <p className={`text-[10px] uppercase font-black ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>Ubicación</p>
                          <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <div>
                          <p className={`text-[10px] uppercase font-black ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>Experiencia / Nivel</p>
                          <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{job.experienceLevel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Requirements List */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-4">
                        <p className={`text-[11px] font-black uppercase tracking-wider mb-1.5 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Requisitos Clave:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs">
                          {job.requirements.map((req, rIdx) => (
                            <li key={rIdx} className={`flex items-start gap-1.5 font-medium ${
                              theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                            }`}>
                              <span className="text-emerald-600 dark:text-emerald-400 font-black shrink-0">•</span>
                              <span className="leading-snug">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {job.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              theme === 'dark'
                                ? 'bg-slate-950 border-slate-700 text-slate-200'
                                : 'bg-slate-100 border-slate-300 text-slate-800'
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
                      Proceso confidencial gestionado por Nexo Talento
                    </span>
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
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
                <p className="text-xs text-slate-400 mt-1 mb-4">Prueba a borrar términos o seleccionar otra modalidad/ciudad.</p>
                <button
                  onClick={() => handlePillClick('Todos')}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl active:scale-95 cursor-pointer"
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Frictionless Multi-step Application Modal */}
      <JobApplicationModal 
        job={selectedJob} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        theme={theme} 
      />

    </section>
  );
};
