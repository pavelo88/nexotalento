import React from 'react';
import { BriefcaseBusiness, FileCheck2, Mail, Phone, UserRound } from 'lucide-react';

interface ApplicationItem {
  id: string;
  createdAt: string | null;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  status: string;
  hasCv: boolean;
}

interface AdminApplicationsInboxProps {
  applications: ApplicationItem[];
}

function formatDate(value: string | null): string {
  if (!value) return 'Fecha pendiente';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Fecha pendiente' : date.toLocaleDateString('es-ES');
}

export const AdminApplicationsInbox: React.FC<AdminApplicationsInboxProps> = ({ applications }) => (
  <section className="space-y-4" aria-label="Bandeja de postulaciones">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Bolsa de empleo</p>
        <h2 className="text-lg font-bold text-stone-900 dark:text-white">Postulaciones recibidas</h2>
      </div>
      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
        {applications.length} total
      </span>
    </div>

    {applications.length > 0 ? (
      <div className="grid gap-3 md:grid-cols-2">
        {applications.map((application) => (
          <article key={application.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{application.status || 'received'}</p>
                <h3 className="mt-1 flex items-center gap-2 font-bold text-stone-900 dark:text-white"><BriefcaseBusiness className="h-4 w-4 text-cyan-500" />{application.jobTitle}</h3>
              </div>
              {application.hasCv && <FileCheck2 className="h-5 w-5 shrink-0 text-emerald-500" aria-label="CV adjunto" />}
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <p className="flex items-center gap-2"><UserRound className="h-3.5 w-3.5 text-stone-400" />{application.name || 'Candidato sin nombre'}</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-stone-400" />{application.email || 'Sin correo'}</p>
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-stone-400" />{application.phone || 'Sin teléfono'}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] text-stone-500 dark:border-stone-800">
              <span>Recibida: {formatDate(application.createdAt)}</span>
              {application.availability && <span>{application.availability}</span>}
            </div>
          </article>
        ))}
      </div>
    ) : (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center dark:border-stone-700 dark:bg-stone-900/40">
        <BriefcaseBusiness className="mx-auto h-8 w-8 text-stone-400" />
        <p className="mt-3 text-sm font-bold text-stone-700 dark:text-stone-300">Aún no hay postulaciones para revisar.</p>
      </div>
    )}
  </section>
);
