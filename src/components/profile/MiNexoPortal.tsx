import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { BriefcaseBusiness, LoaderCircle, UserRound } from 'lucide-react';
import { auth, db } from '../../lib/firebase';

interface ApplicationItem { id: string; jobTitle?: string; status?: string; createdAt?: { toDate?: () => Date } }
const statusLabels: Record<string, string> = { received: 'Recibida', pending: 'Pendiente', reviewing: 'En revisión', shortlisted: 'Preseleccionado', interviewing: 'Entrevista', accepted: 'Avanzando', rejected: 'Cerrada', withdrawn: 'Retirada' };

export const MiNexoPortal: React.FC<{ isDark: boolean; muted: string; surface: string }> = ({ isDark, muted, surface }) => {
  const [items, setItems] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const user = auth.currentUser; if (!user) { setLoading(false); return; } getDocs(query(collection(db, 'applications'), where('candidateUid', '==', user.uid))).then((snapshot) => setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as ApplicationItem)))).catch(() => setItems([])).finally(() => setLoading(false)); }, []);
  return <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 rounded-3xl border ${surface} p-5 sm:p-6`} aria-label="Mi Nexo"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-500">Mi Nexo</p><h2 className="mt-1 text-xl font-extrabold">Tu espacio profesional</h2><p className={`mt-1 text-sm ${muted}`}>Tu perfil guardado y el seguimiento de tus postulaciones.</p></div><UserRound className="w-8 h-8 text-cyan-500" /></div><div className="mt-5">{loading ? <LoaderCircle className="w-5 h-5 animate-spin text-cyan-500" /> : items.length === 0 ? <p className={`text-sm ${muted}`}>Todavía no tienes postulaciones registradas.</p> : <div className="grid gap-3 sm:grid-cols-2">{items.map((item) => <article key={item.id} className={`rounded-2xl border p-4 ${isDark ? 'border-slate-700 bg-slate-950/40' : 'border-slate-200 bg-white/60'}`}><div className="flex items-start justify-between gap-3"><h3 className="font-bold flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4 text-cyan-500" />{item.jobTitle || 'Postulación'}</h3><span className="text-xs font-bold text-cyan-600">{statusLabels[item.status || 'received'] || item.status}</span></div>{item.createdAt?.toDate && <p className={`mt-2 text-xs ${muted}`}>Enviada el {item.createdAt.toDate().toLocaleDateString('es-ES')}</p>}</article>)}</div>}</div></section>;
};
