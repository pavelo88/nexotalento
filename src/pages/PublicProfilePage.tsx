import React, { useEffect, useState } from 'react';
import { ExternalLink, LoaderCircle, MapPin, Mail, Phone, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { getPublicProfile, type PublicProfile } from '../features/profiles/publicProfile';
import { useTheme } from '../context/ThemeContext';

interface PublicProfilePageProps { slug: string }

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ slug }) => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dark = theme === 'dark';

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPublicProfile(slug).then((result) => {
      if (!active) return;
      setProfile(result);
      setLoading(false);
    }).catch(() => {
      if (!active) return;
      setError(true);
      setLoading(false);
    });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#08111F] text-white"><LoaderCircle className="w-8 h-8 animate-spin text-cyan-400" /></div>;

  if (error || !profile) return (
    <div className="min-h-screen flex items-center justify-center bg-[#08111F] px-6 text-white text-center">
      <div><p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Nexo Talento</p><h1 className="mt-3 text-3xl font-black">Este perfil todavía no está publicado</h1><p className="mt-3 text-slate-400 max-w-md">El enlace existe, pero la persona aún no ha terminado de revisar y publicar su perfil profesional.</p><a className="inline-block mt-6 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950" href="https://www.nexotalento.com/crear-perfil">Crear mi perfil</a></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${dark ? 'bg-[#08111F] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <header className="bg-gradient-to-br from-[#102B45] via-[#0E243A] to-[#08111F] text-white pt-16 pb-14">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[160px_1fr] gap-8 items-center">
          {profile.photoUrl ? <img src={profile.photoUrl} alt={`Foto de ${profile.name}`} className="w-40 h-40 rounded-3xl object-cover border-4 border-cyan-400/60 shadow-2xl" /> : <div className="w-40 h-40 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl font-black text-cyan-300">{profile.name.charAt(0)}</div>}
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Perfil profesional</p><h1 className="mt-3 text-4xl sm:text-5xl font-black">{profile.name}</h1><p className="mt-3 text-xl text-cyan-200 font-semibold">{profile.headline || 'Profesional en desarrollo'}</p><div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">{profile.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-300" />{profile.location}</span>}{profile.email && <a className="flex items-center gap-1.5 hover:text-white" href={`mailto:${profile.email}`}><Mail className="w-4 h-4 text-cyan-300" />{profile.email}</a>}{profile.phone && <a className="flex items-center gap-1.5 hover:text-white" href={`https://wa.me/${profile.phone.replace(/\D/gu, '')}`}><Phone className="w-4 h-4 text-cyan-300" />{profile.phone}</a>}</div></div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {profile.summary && <section><h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600">Perfil</h2><p className="mt-3 text-lg leading-relaxed max-w-4xl">{profile.summary}</p></section>}
        {profile.specialties?.length ? <section><h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600">Especialidades</h2><div className="mt-4 flex flex-wrap gap-2">{profile.specialties.map((item) => <span key={item} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm">{item}</span>)}</div></section> : null}
        {profile.experience?.length ? <section><h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600">Experiencia</h2><div className="mt-4 space-y-4">{profile.experience.map((item, index) => <article key={`${item.role}-${index}`} className={`rounded-2xl border p-5 ${dark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}><h3 className="font-extrabold flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4 text-cyan-500" />{item.role}</h3><p className="mt-1 text-sm text-cyan-600">{[item.company, item.period].filter(Boolean).join(' · ')}</p>{item.description && <p className="mt-2 text-sm leading-relaxed opacity-80">{item.description}</p>}</article>)}</div></section> : null}
        {profile.education?.length ? <section><h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600">Formación</h2><div className="mt-4 grid sm:grid-cols-2 gap-4">{profile.education.map((item, index) => <article key={`${item.title}-${index}`} className={`rounded-2xl border p-5 ${dark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}><h3 className="font-extrabold flex items-center gap-2"><GraduationCap className="w-4 h-4 text-cyan-500" />{item.title}</h3><p className="mt-1 text-sm opacity-70">{[item.institution, item.period].filter(Boolean).join(' · ')}</p></article>)}</div></section> : null}
        {profile.links?.length ? <section className="flex flex-wrap gap-3">{profile.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950"><ExternalLink className="w-4 h-4" />{link.label}</a>)}</section> : null}
      </main>
      <footer className="max-w-5xl mx-auto px-6 pb-10 text-xs opacity-50">Perfil publicado con Nexo Talento · {profile.slug}.nexotalento.com</footer>
    </div>
  );
};

