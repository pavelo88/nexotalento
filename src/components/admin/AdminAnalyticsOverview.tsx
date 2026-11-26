import { BarChart3, CheckCircle2, Cookie, Eye, MessageCircle, Phone, Send } from 'lucide-react';

interface TrackingEvent { eventName?: string; category?: string; label?: string; createdAt?: string | null; }

const metric = (events: TrackingEvent[], ...names: string[]) => events.filter((event) => names.includes(event.eventName || '')).length;

export function AdminAnalyticsOverview({ leads, events }: { leads: unknown[]; events: TrackingEvent[] }) {
  const visits = metric(events, 'page_view');
  const consents = metric(events, 'analytics_consent_granted');
  const whatsapp = metric(events, 'whatsapp_click');
  const calls = metric(events, 'phone_click');
  const forms = metric(events, 'generate_lead', 'contact_submit');
  const totalActions = whatsapp + calls + forms;
  const conversion = visits ? ((totalActions / visits) * 100).toFixed(1) : '—';
  const rows = [
    ['Visitas medidas', visits, Eye, 'text-cyan-500'],
    ['Consentimientos', consents, Cookie, 'text-emerald-500'],
    ['WhatsApp', whatsapp, MessageCircle, 'text-green-500'],
    ['Llamadas', calls, Phone, 'text-violet-500'],
    ['Formularios', forms, Send, 'text-amber-500'],
  ] as const;

  return <div className="space-y-5">
    <section className="rounded-2xl border border-stone-200 bg-gradient-to-br from-cyan-50 to-white p-5 dark:border-stone-800 dark:from-cyan-950/30 dark:to-stone-900">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-300">Embudo comercial medido</p><h2 className="mt-1 text-xl font-black text-stone-900 dark:text-white">Actividad con consentimiento</h2><p className="mt-1 text-xs text-stone-500">Eventos propios en Firebase. GA4 recoge analítica externa tras la aceptación de cookies.</p></div><div className="rounded-xl bg-stone-950 px-4 py-3 text-white"><p className="text-[10px] font-bold uppercase text-slate-400">Conversión medida</p><p className="text-2xl font-black">{conversion}{conversion === '—' ? '' : '%'}</p></div></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{rows.map(([label, value, Icon, color]) => <div key={label} className="rounded-xl border border-stone-200 bg-white/80 p-3 dark:border-stone-800 dark:bg-stone-950/40"><Icon className={`h-4 w-4 ${color}`} /><p className="mt-3 text-xl font-black text-stone-900 dark:text-white">{value}</p><p className="text-[10px] font-bold text-stone-500">{label}</p></div>)}</div>
    </section>
    <section className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/80"><div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-cyan-500" /><h3 className="text-sm font-black">Resumen de seguimiento</h3></div><dl className="mt-4 space-y-3 text-xs"><div className="flex justify-between border-b border-stone-100 pb-3 dark:border-stone-800"><dt className="text-stone-500">Leads recibidos</dt><dd className="font-black">{leads.length}</dd></div><div className="flex justify-between border-b border-stone-100 pb-3 dark:border-stone-800"><dt className="text-stone-500">Acciones comerciales</dt><dd className="font-black">{totalActions}</dd></div><div className="flex justify-between"><dt className="text-stone-500">Eventos registrados</dt><dd className="font-black">{events.length}</dd></div></dl></div>
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5"><CheckCircle2 className="h-5 w-5 text-emerald-500" /><h3 className="mt-3 text-sm font-black">Qué significa cada dato</h3><p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">Los datos de esta pantalla provienen de eventos consentidos y persistidos. Para informes de usuarios, sesiones y campañas de GA4 dentro del panel falta autorizar la API de Google Analytics.</p></div>
    </section>
  </div>;
}
