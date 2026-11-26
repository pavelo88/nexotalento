import { BarChart3, CheckCircle2, Cookie, Eye, MessageCircle, Send, ShieldCheck, TrendingUp, Users } from 'lucide-react';

interface TrackingEvent {
  eventName?: string;
  label?: string;
  path?: string;
  createdAt?: string | null;
}

const metric = (events: TrackingEvent[], ...names: string[]) => events.filter((event) => names.includes(event.eventName || '')).length;

const EVENT_NAMES: Record<string, string> = {
  page_view: 'Visita de página', analytics_consent_granted: 'Aceptó medición ampliada', analytics_consent_denied: 'Rechazó medición ampliada', whatsapp_click: 'Clic en WhatsApp', phone_click: 'Clic en llamada', generate_lead: 'Formulario enviado', contact_submit: 'Formulario enviado', apply_job: 'Postulación iniciada',
};

function percent(value: number, total: number) {
  return total ? Math.min(100, Math.round((value / total) * 100)) : 0;
}

export function AdminAnalyticsOverview({ leads, events }: { leads: unknown[]; events: TrackingEvent[] }) {
  const visits = metric(events, 'page_view');
  const accepted = metric(events, 'analytics_consent_granted');
  const rejected = metric(events, 'analytics_consent_denied');
  const whatsapp = metric(events, 'whatsapp_click');
  const calls = metric(events, 'phone_click');
  const forms = metric(events, 'generate_lead', 'contact_submit');
  const applications = metric(events, 'apply_job');
  const totalActions = whatsapp + calls + forms + applications;
  const conversion = visits ? ((totalActions / visits) * 100).toFixed(1) : '—';
  const funnel = [
    ['Visitas anónimas', visits, Eye, 'bg-cyan-500'], ['Contactos', whatsapp + calls, MessageCircle, 'bg-emerald-500'], ['Formularios', forms, Send, 'bg-amber-500'], ['Postulaciones', applications, Users, 'bg-violet-500'],
  ] as const;
  const recentEvents = [...events].sort((left, right) => (right.createdAt || '').localeCompare(left.createdAt || '')).slice(0, 6);

  return <div className="space-y-5">
    <section className="overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950 via-slate-950 to-slate-900 p-5 text-white shadow-xl sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Centro de medición comercial</p><h2 className="mt-2 text-2xl font-black">Visitas, contactos y oportunidades</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">El volumen operativo se registra de forma anónima sin cookies. Las etiquetas de Google y publicidad solo se activan cuando la persona lo acepta.</p></div><div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Acciones por visita</p><p className="mt-1 text-3xl font-black text-cyan-300">{conversion}{conversion === '—' ? '' : '%'}</p></div></div>
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{funnel.map(([label, value, Icon, color]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><Icon className="h-5 w-5 text-white" /><p className="mt-4 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-bold text-slate-300">{label}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className={`h-full ${color}`} style={{ width: `${percent(value, visits)}%` }} /></div></div>)}</div>
    </section>
    <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"><div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-cyan-500" /><div><h3 className="font-black">Embudo de seguimiento</h3><p className="text-xs text-stone-500">Datos propios disponibles para el equipo comercial.</p></div></div><dl className="mt-5 divide-y divide-stone-100 text-sm dark:divide-stone-800"><div className="flex justify-between py-3"><dt className="text-stone-500">Leads recibidos</dt><dd className="font-black">{leads.length}</dd></div><div className="flex justify-between py-3"><dt className="text-stone-500">WhatsApp y llamadas</dt><dd className="font-black">{whatsapp + calls}</dd></div><div className="flex justify-between py-3"><dt className="text-stone-500">Formularios enviados</dt><dd className="font-black">{forms}</dd></div><div className="flex justify-between py-3"><dt className="text-stone-500">Acciones comerciales</dt><dd className="font-black text-cyan-600 dark:text-cyan-400">{totalActions}</dd></div></dl></div>
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5"><div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500" /><h3 className="font-black">Privacidad y permisos</h3></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/70 p-3 dark:bg-slate-950/30"><Cookie className="h-4 w-4 text-emerald-500" /><p className="mt-2 text-2xl font-black">{accepted}</p><p className="text-[11px] font-bold text-stone-500">Aceptaron cookies</p></div><div className="rounded-xl bg-white/70 p-3 dark:bg-slate-950/30"><CheckCircle2 className="h-4 w-4 text-stone-500" /><p className="mt-2 text-2xl font-black">{rejected}</p><p className="text-[11px] font-bold text-stone-500">Rechazaron cookies</p></div></div><p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">No se guardan identificadores, correos, teléfonos ni perfiles en los eventos anónimos. Los reportes de campañas y sesiones de GA4 requieren conectar Google Analytics Data API.</p></div>
    </section>
    <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-cyan-500" /><div><h3 className="font-black">Actividad reciente</h3><p className="text-xs text-stone-500">Últimos eventos operativos recibidos.</p></div></div><div className="mt-4 divide-y divide-stone-100 dark:divide-stone-800">{recentEvents.length ? recentEvents.map((event, index) => <div key={`${event.createdAt}-${index}`} className="flex items-center justify-between gap-4 py-3 text-xs"><div><p className="font-bold">{EVENT_NAMES[event.eventName || ''] || event.eventName || 'Evento'}</p><p className="mt-0.5 text-stone-500">{event.label || event.path || '/'}</p></div><time className="shrink-0 text-stone-500">{event.createdAt ? new Date(event.createdAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : 'Pendiente'}</time></div>) : <p className="py-5 text-sm text-stone-500">Aún no hay eventos. Se llenará al recibir las primeras visitas.</p>}</div></section>
  </div>;
}
