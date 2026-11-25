import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Briefcase, FileSearch, Filter, MapPin, Search, Sparkles, TrendingUp, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { INITIAL_JOBS } from '../data/jobsData';
import { JobPosition } from '../types';
import { JobApplicationModal } from './JobApplicationModal';

interface JobsPortalProps {
  onOpenCVAnalyzer: () => void;
  isFullPage?: boolean;
}

const matchesTextSearch = (job: JobPosition, rawTerm: string) => {
  const term = rawTerm.trim().toLocaleLowerCase();
  if (!term) return true;

  return [
    job.title,
    job.department,
    job.location,
    job.modality,
    job.description,
    job.experienceLevel,
    ...(job.tags ?? [])
  ].some((value) => value.toLocaleLowerCase().includes(term));
};

const FilterGroup = ({ label, values, selected, onToggle }: { label: string; values: string[]; selected: string[]; onToggle: (value: string) => void }) => (
  <fieldset className="border-b py-5 last:border-0 dark:border-slate-800">
    <legend className="text-xs font-black uppercase tracking-wide">{label}</legend>
    <div className="mt-3 space-y-3">
      {values.map((value) => <label key={value} className="flex cursor-pointer items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} className="h-4 w-4 accent-emerald-500" />{value}</label>)}
    </div>
  </fieldset>
);

const JobFact = ({ icon, label, value, accent = false }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) => (
  <div className="flex items-start gap-2"><span className="mt-0.5 shrink-0">{icon}</span><div><p className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</p><p className={`mt-1 font-bold leading-snug ${accent ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-800 dark:text-white'}`}>{value}</p></div></div>
);

export const JobsPortal: React.FC<JobsPortalProps> = ({ onOpenCVAnalyzer, isFullPage = false }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobsList, setJobsList] = useState<JobPosition[]>(INITIAL_JOBS);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/vacancies')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) setJobsList(data);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => jobsList.filter((job) => {
    const modalityMatches = !selectedModalities.length || selectedModalities.includes(job.modality);
    const departmentMatches = !selectedDepartments.length || selectedDepartments.some((department) => job.department.toLowerCase().includes(department.toLowerCase()));
    return matchesTextSearch(job, searchTerm) && modalityMatches && departmentMatches;
  }), [jobsList, searchTerm, selectedModalities, selectedDepartments]);

  const toggleFilter = (value: string, group: 'modality' | 'department') => {
    const update = group === 'modality' ? setSelectedModalities : setSelectedDepartments;
    update((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const openApplication = (job: JobPosition) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeApplication = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <section
      id="oportunidades"
      className={`scroll-mt-24 pt-14 sm:pt-20 ${
        isFullPage ? '' : theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className={isFullPage ? '' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            Oportunidades seleccionadas
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Vacantes en Selección <span className="bg-gradient-to-r from-cyan-400 via-[#00A9A3] to-blue-500 bg-clip-text text-transparent">Inmediata</span>
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            Encuentra la posición que mejor encaja con tu experiencia. Puedes buscar por cargo, área, habilidad o ubicación.
          </p>
        </div>

        <div className={`sticky top-20 z-20 mb-8 rounded-2xl border p-3 shadow-lg backdrop-blur-xl ${
          theme === 'dark'
            ? 'border-slate-700/80 bg-slate-900/95 shadow-black/40'
            : 'border-slate-200 bg-white/95 shadow-slate-200/60'
        }`}>
          <label htmlFor="jobs-search-input" className="sr-only">
            Buscar vacantes por cargo, área, habilidad o ubicación
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-600 dark:text-cyan-400" />
            <input
              id="jobs-search-input"
              type="search"
              placeholder="Ej.: marketing, finanzas, Madrid, remoto, ventas B2B…"
              aria-describedby="jobs-search-help jobs-results-count"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className={`w-full rounded-xl border py-3 pl-12 pr-12 text-sm font-medium outline-none transition focus:ring-4 focus:ring-cyan-500/15 ${
                theme === 'dark'
                  ? 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400'
                  : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              }`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 px-1 text-xs">
            <p id="jobs-search-help" className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
              Busca por cargo, ciudad o habilidad; afina por modalidad y sector.
            </p>
            <p id="jobs-results-count" aria-live="polite" className="shrink-0 font-black text-cyan-700 dark:text-cyan-300">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'resultado' : 'resultados'}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className={`rounded-3xl border p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto ${theme === 'dark' ? 'border-slate-700 bg-slate-900/95' : 'border-slate-200 bg-white shadow-sm'}`}>
            <div className={`flex items-center justify-between border-b pb-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2"><Filter className="h-4 w-4 text-emerald-500" /><h3 className="text-xs font-black uppercase tracking-wide">Filtros avanzados</h3></div>
              <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-black text-emerald-500">{filteredJobs.length} activas</span>
            </div>
            <FilterGroup label="Modalidad de trabajo" values={['Presencial', 'Híbrido', '100% Remoto']} selected={selectedModalities} onToggle={(value) => toggleFilter(value, 'modality')} />
            <FilterGroup label="Sector / departamento" values={['Marketing', 'Finanzas', 'Logística', 'Ventas', 'Tecnología', 'People']} selected={selectedDepartments} onToggle={(value) => toggleFilter(value, 'department')} />
            <button type="button" onClick={onOpenCVAnalyzer} className="mt-5 w-full rounded-xl bg-emerald-500/10 px-3 py-3 text-xs font-black text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-300">No encuentro mi posición: preparar mi CV</button>
          </aside>

          <div className="space-y-4">
            <div className={`flex items-center justify-between border-b pb-3 text-xs ${theme === 'dark' ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'}`}><span>Mostrando <strong>{filteredJobs.length}</strong> posiciones activas</span><span className="font-black text-emerald-500">Procesos actualizados</span></div>
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className={`flex min-h-full flex-col rounded-3xl border p-5 sm:p-6 shadow-sm transition duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'border-slate-700 bg-slate-900/90 hover:border-cyan-500/60'
                    : 'border-slate-200 bg-white hover:border-cyan-500/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
                    {job.department}
                  </span>
                  {job.isUrgent && <span className="text-[10px] font-black text-amber-600 dark:text-amber-300">Proceso activo</span>}
                </div>

                <h3 className={`mt-5 font-heading text-xl font-black leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {job.title}
                </h3>
                <p className={`mt-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {job.description}
                </p>

                <div className={`mt-5 grid gap-3 rounded-2xl border p-4 text-xs sm:grid-cols-3 ${theme === 'dark' ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
                  <JobFact icon={<TrendingUp className="h-4 w-4 text-emerald-500" />} label="Banda salarial" value={job.salaryRange} accent />
                  <JobFact icon={<MapPin className="h-4 w-4 text-cyan-500" />} label="Ubicación" value={job.location} />
                  <JobFact icon={<Briefcase className="h-4 w-4 text-blue-500" />} label="Experiencia / nivel" value={job.experienceLevel} />
                </div>

                <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wide">Requisitos clave</p><ul className="mt-2 grid gap-2 text-xs leading-relaxed sm:grid-cols-2">{job.requirements.map((requirement) => <li key={requirement} className="flex gap-2"><span className="text-emerald-500">•</span>{requirement}</li>)}</ul></div>
                <div className="mt-5 flex flex-wrap gap-2">{job.tags?.map((tag) => <span key={tag} className={`rounded-md border px-2 py-1 text-[10px] font-bold ${theme === 'dark' ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-white text-slate-600'}`}>#{tag}</span>)}</div>

                <button
                  type="button"
                  onClick={() => openApplication(job)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:brightness-110 active:scale-[0.98]"
                >
                  Postular a esta vacante
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className={`rounded-3xl border p-10 text-center ${theme === 'dark' ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-white'}`}>
            <FileSearch className="mx-auto h-11 w-11 text-cyan-500" />
            <h3 className={`mt-4 font-heading text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              No encontramos una coincidencia exacta
            </h3>
            <p className={`mx-auto mt-2 max-w-md text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Prueba una palabra más amplia, como el área, una habilidad o una ciudad.
            </p>
            <button
              type="button"
              onClick={onOpenCVAnalyzer}
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-700 underline decoration-cyan-400 underline-offset-4 dark:text-cyan-300"
            >
              <Briefcase className="h-4 w-4" />
              Preparar mi CV para nuevas oportunidades
            </button>
          </div>
        )}</div></div>
      </div>

      <JobApplicationModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={closeApplication}
        theme={theme}
      />
    </section>
  );
};
