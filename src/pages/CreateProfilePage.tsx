import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileImage,
  FileText,
  Globe,
  ImagePlus,
  LoaderCircle,
  Sparkles,
  Upload,
  UserRound,
  WandSparkles,
  X,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { auth, db, storage } from '../lib/firebase';
import { AccountSetupCard } from '../components/profile/AccountSetupCard';
import { downloadProfilePdf, type ProfilePdfData } from '../utils/profilePdfGenerator';

type CreationMode = 'choose' | 'manual' | 'upload';

interface DraftResult {
  name: string;
  headline: string;
  summary: string;
}

const allowedCvTypes = '.pdf,.doc,.docx,image/jpeg,image/png,image/webp';

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const CreateProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const cvInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<CreationMode>('choose');
  const [accountReady, setAccountReady] = useState(Boolean(auth.currentUser));
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftResult | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    headline: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAccountReady(Boolean(user));
      if (user?.email) updateForm('email', user.email);
    });
    return unsubscribe;
  }, []);

  const isDark = theme === 'dark';
  const surface = `card-spring-hover ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`;
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';
  const input = isDark
    ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400';

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };



  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCvFile(file);
    setDraft(null);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async (): Promise<string | undefined> => {
    const user = auth.currentUser;
    if (!user || !photoFile) return undefined;
    const photoRef = ref(storage, `users/${user.uid}/profile/photo-${Date.now()}-${photoFile.name.replace(/[^a-z0-9.]+/giu, '-')}`);
    await uploadBytes(photoRef, photoFile, { contentType: photoFile.type });
    return getDownloadURL(photoRef);
  };

  const uploadSourceCv = async (): Promise<void> => {
    const user = auth.currentUser;
    if (!user || !cvFile) return;
    const safeName = cvFile.name.replace(/[^a-z0-9.]+/giu, '-');
    const cvRef = ref(storage, `users/${user.uid}/profile/source-cv-${Date.now()}-${safeName}`);
    await uploadBytes(cvRef, cvFile, { contentType: cvFile.type || 'application/octet-stream' });
  };

  const toSlug = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/gu, '').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '').slice(0, 50);

  const publishProfile = async () => {
    const user = auth.currentUser;
    if (!user || !draft || isPublishing) return;
    setIsPublishing(true);
    setPublishStatus(null);
    try {
      const baseSlug = toSlug(draft.name || form.name);
      if (!baseSlug) throw new Error('Necesitamos un nombre para crear el enlace público.');
      const baseRef = doc(db, 'profiles', baseSlug);
      const existing = await getDoc(baseRef);
      const slug = existing.exists() && existing.data().ownerUid !== user.uid ? `${baseSlug}-${user.uid.slice(0, 6).toLowerCase()}` : baseSlug;
      const [photoUrl] = await Promise.all([uploadPhoto(), uploadSourceCv()]);
      await setDoc(doc(db, 'profiles', slug), {
        ownerUid: user.uid,
        slug,
        name: draft.name || form.name,
        headline: draft.headline || form.headline,
        summary: draft.summary || form.summary,
        email: form.email || user.email || '',
        photoUrl: photoUrl || null,
        specialties: form.skills.split(/[,\n]/u).map((item) => item.trim()).filter(Boolean).slice(0, 12),
        experience: form.experience ? [{ role: 'Experiencia profesional', description: form.experience }] : [],
        education: form.education ? [{ title: 'Formación y habilidades', details: form.education }] : [],
        published: true,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setPublishStatus(`Perfil publicado: https://${slug}.nexotalento.com`);
    } catch (error) {
      setPublishStatus(error instanceof Error ? error.message : 'No se pudo publicar el perfil. Revisa los archivos e inténtalo de nuevo.');
    } finally {
      setIsPublishing(false);
    }
  };

  const removePhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const generateDraft = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || isGenerating) return;

    setIsGenerating(true);
    setDraft(null);

    const sourceText = [
      form.name,
      form.headline,
      form.summary,
      form.experience,
      form.education,
      form.skills,
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: sourceText, targetRole: form.headline }),
      });
      const result = await response.json();
      setDraft({
        name: result.candidateName || form.name,
        headline: form.headline || result.recommendedRoles?.[0] || 'Profesional en desarrollo',
        summary: result.executiveSummary || form.summary || 'Tu perfil está listo para revisión.',
      });
    } catch {
      setDraft({
        name: form.name,
        headline: form.headline || 'Profesional en desarrollo',
        summary: form.summary || 'Tu información quedó preparada para revisión y diseño.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!accountReady) {
    return (
      <AccountSetupCard
        isDark={isDark}
        surface={surface}
        input={input}
        muted={muted}
        onSuccess={(name, email) => {
          setForm((current) => ({ ...current, name, email }));
          setAccountReady(true);
        }}
        onContinueLocal={(name, email) => {
          setForm((current) => ({ ...current, name, email }));
          setAccountReady(true);
        }}
      />
    );
  }

  const handlePdfDownload = async () => {
    if (!draft || isGeneratingPdf) return;

    const profile: ProfilePdfData = {
      name: draft.name || form.name,
      email: form.email,
      headline: draft.headline || form.headline,
      summary: draft.summary || form.summary,
      experience: form.experience,
      education: form.education,
      skills: form.skills,
      photoDataUrl: photoPreview,
    };

    setIsGeneratingPdf(true);
    setPdfStatus(null);
    try {
      await downloadProfilePdf(profile, { fileName: `${profile.name}-perfil-profesional` });
      setPdfStatus('PDF generado correctamente.');
    } catch {
      setPdfStatus('No se pudo generar el PDF. Revisa los datos e inténtalo de nuevo.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className={`min-h-screen pt-28 pb-20 ${isDark ? 'bg-[#06080B] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-bold uppercase tracking-wider">
            <WandSparkles className="w-3.5 h-3.5" /> Nexo Talento Studio
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black font-heading tracking-tight">
            Convierte tu trayectoria en un perfil que se puede compartir
          </h1>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${muted}`}>
            Carga tu CV o completa tus datos. La IA ordena la información y prepara tu sitio personal y tu PDF profesional.
          </p>
        </div>

        {mode === 'choose' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button type="button" onClick={() => setMode('manual')} className={`text-left p-7 rounded-3xl border ${surface} hover:border-cyan-500 hover:-translate-y-1 transition-all shadow-xl`}>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center mb-5">
                <UserRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold">Llenar mis datos</h2>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
                Empieza desde cero y construye tu perfil paso a paso con control sobre cada texto.
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-cyan-500">Comenzar manualmente <ArrowRight className="w-4 h-4" /></span>
            </button>

            <button type="button" onClick={() => setMode('upload')} className={`text-left p-7 rounded-3xl border ${surface} hover:border-teal-500 hover:-translate-y-1 transition-all shadow-xl`}>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-500 flex items-center justify-center mb-5">
                <Upload className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold">Cargar mi CV</h2>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
                Sube un PDF, Word o una foto completa. Después podrás revisar y completar lo que falte.
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-teal-500">Cargar documento <ArrowRight className="w-4 h-4" /></span>
            </button>
          </div>
        )}

        {mode !== 'choose' && (
          <form onSubmit={generateDraft} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
            <div className={`rounded-3xl border ${surface} p-6 sm:p-8 shadow-xl space-y-6`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-500">Paso 1 de 3</p>
                  <h2 className="mt-1 text-2xl font-extrabold">{mode === 'upload' ? 'Carga tu información' : 'Cuéntanos sobre ti'}</h2>
                </div>
                <button type="button" onClick={() => setMode('choose')} className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} aria-label="Volver a elegir método"><X className="w-5 h-5" /></button>
              </div>

              {mode === 'upload' && (
                <div>
                  <input ref={cvInputRef} type="file" accept={allowedCvTypes} onChange={handleCvChange} className="hidden" />
                  <button type="button" onClick={() => cvInputRef.current?.click()} className={`w-full min-h-36 rounded-2xl border-2 border-dashed ${isDark ? 'border-slate-700 hover:border-teal-500 bg-slate-950/50' : 'border-slate-300 hover:border-teal-500 bg-slate-50'} flex flex-col items-center justify-center gap-2 transition-colors`}>
                    <FileText className="w-8 h-8 text-teal-500" />
                    <span className="font-bold text-sm">Seleccionar PDF, Word o imagen</span>
                    <span className={`text-xs ${muted}`}>PDF, DOC, DOCX, JPG, PNG o WEBP</span>
                  </button>
                  {cvFile && <div className="mt-3 flex items-center justify-between gap-3 p-3 rounded-xl bg-teal-500/10 border border-teal-500/30"><div className="flex items-center gap-2 min-w-0"><FileText className="w-4 h-4 text-teal-500 shrink-0" /><span className="text-xs truncate">{cvFile.name} · {formatBytes(cvFile.size)}</span></div><button type="button" onClick={() => setCvFile(null)} className="text-xs text-teal-500 font-bold">Quitar</button></div>}
                  <p className={`mt-3 text-xs leading-relaxed ${muted}`}>La carga se usa como fuente de información. Podrás corregir el resultado antes de publicar tu perfil.</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-bold">Nombre completo *<input required value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Ej. María López" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
                <label className="text-xs font-bold">Correo electrónico<input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="tu@correo.com" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
              </div>
              <label className="block text-xs font-bold">Titular profesional<input value={form.headline} onChange={(e) => updateForm('headline', e.target.value)} placeholder="Ej. Directora de Operaciones | Transformación Digital" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
              <label className="block text-xs font-bold">Resumen profesional<textarea rows={4} value={form.summary} onChange={(e) => updateForm('summary', e.target.value)} placeholder="Escribe o pega aquí tu resumen, logros y propuesta de valor..." className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-bold">Experiencia<textarea rows={4} value={form.experience} onChange={(e) => updateForm('experience', e.target.value)} placeholder="Cargos, empresas, años y logros" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
                <label className="text-xs font-bold">Formación y habilidades<textarea rows={4} value={`${form.education}${form.education && form.skills ? '\n' : ''}${form.skills}`} onChange={(e) => updateForm('education', e.target.value)} placeholder="Estudios, cursos, certificaciones y habilidades" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
              </div>
              <button type="submit" disabled={isGenerating} className="w-full rounded-xl py-3.5 px-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-extrabold flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity">
                {isGenerating ? <><LoaderCircle className="w-4 h-4 animate-spin" /> Preparando borrador con IA...</> : <><Sparkles className="w-4 h-4" /> Preparar mi perfil</>}
              </button>
            </div>

            <aside className={`rounded-3xl border ${surface} p-6 shadow-xl space-y-5 lg:sticky lg:top-28`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-500">Paso 2 de 3</p>
                <h2 className="mt-1 text-lg font-extrabold">Tu foto profesional</h2>
                <p className={`mt-2 text-xs leading-relaxed ${muted}`}>Se usará en tu sitio y en el PDF. Puedes cambiarla antes de publicar.</p>
              </div>
              <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" />
              <div className="flex justify-center">
                {photoPreview ? <div className="relative"><img src={photoPreview} alt="Vista previa de la foto profesional" className="w-36 h-36 rounded-3xl object-cover border-4 border-cyan-500/50" /><button type="button" onClick={removePhoto} className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-950 text-white border border-white/20" aria-label="Quitar foto"><X className="w-3.5 h-3.5" /></button></div> : <div className={`w-36 h-36 rounded-3xl border-2 border-dashed ${isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-slate-50'} flex items-center justify-center`}><ImagePlus className="w-8 h-8 text-slate-400" /></div>}
              </div>
              <button type="button" onClick={() => photoInputRef.current?.click()} className={`w-full rounded-xl border py-3 text-sm font-bold flex items-center justify-center gap-2 ${isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}><FileImage className="w-4 h-4 text-cyan-500" /> {photoFile ? 'Cambiar foto' : 'Cargar foto'}</button>
              <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} space-y-2`}>
                <p className="text-xs font-bold">Después podrás:</p>
                {['Elegir una plantilla', 'Revisar el texto generado', 'Publicar tu perfil y descargar el PDF'].map((item) => <p key={item} className={`text-xs flex items-start gap-2 ${muted}`}><CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />{item}</p>)}
              </div>
            </aside>
          </form>
        )}

        {draft && <section className={`mt-8 max-w-4xl mx-auto rounded-3xl border ${surface} p-6 sm:p-8 shadow-xl`}><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-500">Borrador preparado</p><h2 className="text-xl font-extrabold">Revisa tu información antes de publicar</h2></div></div><div className="mt-6 grid sm:grid-cols-[120px_1fr] gap-5 items-start"><div>{photoPreview ? <img src={photoPreview} alt="Foto del perfil" className="w-28 h-28 rounded-2xl object-cover" /> : <div className={`w-28 h-28 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center`}><UserRound className="w-8 h-8 text-slate-400" /></div>}</div><div><h3 className="text-lg font-extrabold">{draft.name}</h3><p className="mt-1 text-cyan-500 font-bold text-sm">{draft.headline}</p><p className={`mt-3 text-sm leading-relaxed ${muted}`}>{draft.summary}</p></div></div><div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3"><button type="button" onClick={handlePdfDownload} disabled={isGeneratingPdf} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><Download className="w-4 h-4" />{isGeneratingPdf ? 'Generando PDF...' : 'Generar y descargar PDF'}</button><button type="button" onClick={publishProfile} disabled={isPublishing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><Globe className="w-4 h-4" />{isPublishing ? 'Publicando...' : 'Publicar mi perfil'}</button></div>{(pdfStatus || publishStatus) && <p className={`mt-3 text-xs leading-relaxed ${publishStatus?.startsWith('Perfil publicado') ? 'text-emerald-500' : muted}`} role="status">{publishStatus || pdfStatus}</p>}<div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed">Al publicar, tu perfil quedará disponible en un subdominio personal. Podrás revisar el PDF antes de compartirlo.</div></section>}
      </section>
    </div>
  );
};

