import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, getDoc, limit, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
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
import { MiNexoPortal } from '../components/profile/MiNexoPortal';
import { downloadProfilePdf, type ProfilePdfData } from '../utils/profilePdfGenerator';

type CreationMode = 'choose' | 'manual' | 'upload';
interface DraftResult {
  name: string;
  headline: string;
  summary: string;
}

const allowedCvTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp';
const cvExtension = /\.(pdf|docx?|jpe?g|png|webp)$/i;
const maxCvBytes = 3.5 * 1024 * 1024;
type ImageTextDetector = new () => {
  detect: (image: ImageBitmap) => Promise<{ rawValue: string }[]>;
};

const readCvBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = typeof reader.result === 'string' ? reader.result.split(',', 2)[1] : '';
    if (base64) resolve(base64);
    else reject(new Error('Archivo vacío.'));
  };
  reader.onerror = () => reject(reader.error);
  reader.onabort = () => reject(new Error('Lectura cancelada.'));
  reader.readAsDataURL(file);
});

async function readImageText(file: File, TextDetector: ImageTextDetector): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const blocks = await new TextDetector().detect(bitmap);
    return blocks.map(({ rawValue }) => rawValue).join('\n');
  } finally {
    bitmap.close();
  }
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const CreateProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const cvInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [mode, setMode] = useState<CreationMode>('choose');
  const [accountReady, setAccountReady] = useState(Boolean(auth.currentUser));
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDraggingCv, setIsDraggingCv] = useState(false);
  const [cvError, setCvError] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [isReadingCv, setIsReadingCv] = useState(false);
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
      if (user) {
        getDocs(query(collection(db, 'profiles'), where('ownerUid', '==', user.uid), limit(1))).then((snapshot) => {
          const existing = snapshot.docs[0]?.data();
          if (!existing) return;
          setForm((current) => ({
            ...current,
            name: existing.name || current.name,
            headline: existing.headline || current.headline,
            summary: existing.summary || current.summary,
            skills: Array.isArray(existing.specialties) ? existing.specialties.join(', ') : current.skills,
          }));
          setDraft({ name: existing.name || '', headline: existing.headline || '', summary: existing.summary || '' });
          setPublishStatus('Recuperamos tu perfil guardado. Puedes editarlo y volver a publicarlo.');
        }).catch(() => undefined);
      }
    });
    return unsubscribe;
  }, []);

  const isDark = theme === 'dark';
  const surface = `card-spring-hover backdrop-blur-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] ${isDark ? 'bg-slate-900/55 border-white/10' : 'bg-white/45 border-white/80'}`;
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';
  const input = isDark
    ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400';

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectCv = (file: File | null) => {
    if (file && (!cvExtension.test(file.name) || !file.size)) {
      setCvError(file.size ? 'Selecciona un PDF, DOC, DOCX, JPG, PNG o WEBP.' : 'El archivo está vacío. Elige otro archivo.');
      return;
    }
    if (file && file.size > maxCvBytes) {
      setCvError('El archivo supera el límite de 3,5 MB. Elige una versión más ligera.');
      return;
    }
    setCvError('');
    setGenerationError('');
    setCvFile(file);
    setDraft(null);
  };

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (file && !isGenerating) selectCv(file);
  };

  const handleCvDragEnter = (event: React.DragEvent) => {
    if (!event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    dragDepth.current += 1;
    setIsDraggingCv(true);
  };

  const handleCvDragLeave = () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (!dragDepth.current) setIsDraggingCv(false);
  };
  const handleCvDrop = (event: React.DragEvent) => {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDraggingCv(false);
    if (isGenerating) return;
    const { files } = event.dataTransfer;
    if (files.length > 1) setCvError('Suelta un solo CV a la vez.');
    else if (files[0]) selectCv(files[0]);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async (): Promise<string | undefined> => {
    const user = auth.currentUser;
    if (!user || !photoFile) return undefined;
    if (!photoFile.type.startsWith('image/') || photoFile.size > 5 * 1024 * 1024) throw new Error('La foto debe ser una imagen de máximo 5 MB.');
    const photoRef = ref(storage, `users/${user.uid}/public-profile/photo-${Date.now()}.${photoFile.name.split('.').pop() || 'jpg'}`);
    await uploadBytes(photoRef, photoFile, { contentType: photoFile.type });
    return getDownloadURL(photoRef);
  };

  const uploadSourceCv = async (): Promise<void> => {
    const user = auth.currentUser;
    if (!user || !cvFile) return;
    const safeName = cvFile.name.replace(/[^a-z0-9.]+/giu, '-');
    const cvRef = ref(storage, `users/${user.uid}/private-cvs/source-cv-${Date.now()}-${safeName}`);
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
      if (!user.emailVerified) throw new Error('Verifica tu correo antes de publicar el perfil.');
      const [photoUrl] = await Promise.all([uploadPhoto(), uploadSourceCv()]);
      await setDoc(doc(db, 'profiles', slug), {
        ownerUid: user.uid,
        slug,
        name: draft.name || form.name,
        headline: draft.headline || form.headline,
        summary: draft.summary || form.summary,
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
    if (isGenerating) return;

    const sourceFile = mode === 'upload' ? cvFile : null;
    const name = form.name.trim();
    setGenerationError('');
    setDraft(null);
    if (!sourceFile && !name) {
      setGenerationError('Escribe tu nombre o adjunta un CV para preparar el perfil.');
      return;
    }

    setIsGenerating(true);
    const formText = [
      name,
      form.headline,
      form.summary,
      form.experience,
      form.education,
      form.skills,
    ].filter(Boolean).join('\n');
    try {
      let sourceBase64 = '';
      let sourceText = formText;
      if (sourceFile) {
        if (/\.doc$/i.test(sourceFile.name)) {
          setGenerationError('Guarda el DOC como DOCX o PDF y vuelve a adjuntarlo para analizarlo.');
          return;
        }
        const isImage = /\.(jpe?g|png|webp)$/i.test(sourceFile.name);
        const TextDetector = (window as Window & { TextDetector?: ImageTextDetector }).TextDetector;
        if (isImage && !TextDetector) {
          setGenerationError('Este navegador no puede leer texto de imágenes. Usa un PDF con texto o quita el archivo y pega el contenido del CV.');
          return;
        }
        setIsReadingCv(true);
        try {
          if (isImage) {
            sourceText = (await readImageText(sourceFile, TextDetector)).trim();
            if (sourceText.length < 20) {
              setGenerationError('No se encontró suficiente texto en la imagen. Usa otra imagen o quita el archivo y pega el contenido del CV.');
              return;
            }
          } else {
            sourceBase64 = await readCvBase64(sourceFile);
          }
        } catch {
          setGenerationError('No se pudo leer el CV. Elige otro archivo o quita el adjunto y pega el texto.');
          return;
        } finally {
          setIsReadingCv(false);
        }
      }

      if (!sourceBase64 && sourceText.trim().length < 20) {
        setGenerationError('Añade más información, por ejemplo tu experiencia o tu titular profesional.');
        return;
      }
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(45_000),
        body: JSON.stringify({
          targetRole: form.headline,
          ...(sourceBase64 ? { sourceFile: { base64: sourceBase64 } } : { cvText: sourceText.slice(0, 8000) }),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 429) {
          setGenerationError('Hay demasiadas solicitudes. Espera un momento y vuelve a intentarlo.');
        } else {
          const errorDetail = [400, 413, 415, 422].includes(response.status) && typeof result?.error === 'string'
            ? result.error : 'Vuelve a intentarlo.';
          setGenerationError(`El análisis falló (HTTP ${response.status}). ${errorDetail}`);
        }
        return;
      }
      if (typeof result?.executiveSummary !== 'string' || !result.executiveSummary.trim()) {
        setGenerationError('El servicio devolvió una respuesta incompleta. Vuelve a intentarlo.');
        return;
      }
      const analyzedName = typeof result.candidateName === 'string' && result.provider !== 'heuristic'
        ? result.candidateName.trim()
        : '';
      if (!name && !analyzedName) {
        setGenerationError('El análisis no pudo identificar tu nombre. Escríbelo para preparar el borrador.');
        return;
      }
      setDraft({
        name: name || analyzedName,
        headline: form.headline || (typeof result.recommendedRoles?.[0] === 'string' ? result.recommendedRoles[0] : '') || 'Profesional en desarrollo',
        summary: result.executiveSummary,
      });
    } catch (error) {
      setGenerationError(error instanceof DOMException && error.name === 'TimeoutError'
        ? 'El análisis tardó demasiado. Vuelve a intentarlo.'
        : 'No se pudo conectar con el servicio de análisis. Vuelve a intentarlo.');
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
    <div className={`min-h-screen pt-28 pb-20 ${isDark ? 'bg-[radial-gradient(circle_at_15%_5%,rgba(0,229,201,0.12),transparent_32%),#06080B] text-white' : 'bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_88%_38%,rgba(129,140,248,0.13),transparent_34%),#F8FAFC] text-slate-900'}`}>
      <MiNexoPortal isDark={isDark} muted={muted} surface={surface} />
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
                <button type="button" disabled={isGenerating} onClick={() => setMode('choose')} className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} aria-label="Volver a elegir método"><X className="w-5 h-5" /></button>
              </div>

              {mode === 'upload' && (
                <div
                  onDragEnter={handleCvDragEnter}
                  onDragOver={(event) => {
                    if (!event.dataTransfer.types.includes('Files')) return;
                    event.preventDefault();
                    event.dataTransfer.dropEffect = isGenerating ? 'none' : 'copy';
                  }}
                  onDragLeave={handleCvDragLeave}
                  onDrop={handleCvDrop}
                >
                  <input ref={cvInputRef} type="file" accept={allowedCvTypes} onChange={handleCvChange} className="hidden" />
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={() => cvInputRef.current?.click()}
                    className={`w-full min-h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                      isDraggingCv && !isGenerating ? 'border-teal-500 bg-teal-500/15 ring-4 ring-teal-500/20'
                        : isDark ? 'border-slate-700 hover:border-teal-500 bg-slate-950/35'
                        : 'border-cyan-300/70 hover:border-teal-500 bg-white/35 backdrop-blur-xl'
                    }`}
                  >
                    <FileText className="w-8 h-8 text-teal-500" />
                    <span className="font-bold text-sm">{isDraggingCv && !isGenerating ? 'Suelta tu CV aquí' : 'Arrastra tu CV aquí o selecciona un archivo'}</span>
                    <span className={`text-xs ${muted}`}>PDF, DOC, DOCX, JPG, PNG o WEBP</span>
                  </button>
                  {cvFile && (
                    <div className="mt-3 flex items-center justify-between gap-3 p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                      <div className="flex items-center gap-2 min-w-0" role="status">
                        <FileText className="w-4 h-4 text-teal-500 shrink-0" />
                        <span className="text-xs truncate">{cvFile.name} · {formatBytes(cvFile.size)}</span>
                      </div>
                      <button type="button" disabled={isGenerating} onClick={() => selectCv(null)} className="text-xs text-teal-500 font-bold">Quitar</button>
                    </div>
                  )}
                  {cvError && <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">{cvError}</p>}
                  <p className={`mt-3 text-xs leading-relaxed ${muted}`}>{cvFile ? 'Pulsa «Preparar mi perfil» para leer el archivo y generar el borrador.' : 'También puedes completar los campos a mano.'}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-bold">Nombre completo{mode === 'upload' && cvFile ? '' : ' *'}<input value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Ej. María López" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
                <label className="text-xs font-bold">Correo electrónico<input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="tu@correo.com" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
              </div>
              <label className="block text-xs font-bold">Titular profesional<input value={form.headline} onChange={(e) => updateForm('headline', e.target.value)} placeholder="Ej. Directora de Operaciones | Transformación Digital" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 ${input}`} /></label>
              <label className="block text-xs font-bold">Resumen profesional<textarea rows={4} value={form.summary} onChange={(e) => updateForm('summary', e.target.value)} placeholder="Escribe o pega aquí tu resumen, logros y propuesta de valor..." className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-bold">Experiencia<textarea rows={4} value={form.experience} onChange={(e) => updateForm('experience', e.target.value)} placeholder="Cargos, empresas, años y logros" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
                <label className="text-xs font-bold">Formación y habilidades<textarea rows={4} value={`${form.education}${form.education && form.skills ? '\n' : ''}${form.skills}`} onChange={(e) => updateForm('education', e.target.value)} placeholder="Estudios, cursos, certificaciones y habilidades" className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-cyan-500 resize-y ${input}`} /></label>
              </div>
              <button type="submit" disabled={isGenerating} aria-busy={isGenerating} className="w-full rounded-xl py-3.5 px-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-extrabold flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60 transition-opacity">
                {isGenerating ? <><LoaderCircle className="w-4 h-4 animate-spin" /> {isReadingCv ? 'Leyendo tu CV…' : 'Analizando tu información…'}</> : <><Sparkles className="w-4 h-4" /> Preparar mi perfil</>}
              </button>
              {generationError && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{generationError}</p>}
              <span role="status" className="sr-only">{isGenerating ? (isReadingCv ? 'Leyendo tu CV' : 'Analizando tu información') : draft ? 'Borrador listo' : ''}</span>
              {draft && <a href="#borrador-perfil" className={`block text-sm font-bold underline ${muted}`}>Borrador listo. Ir a la revisión</a>}
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

        {draft && <section id="borrador-perfil" className={`scroll-mt-28 mt-8 max-w-4xl mx-auto rounded-3xl border ${surface} p-6 sm:p-8 shadow-xl`}><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-500">Borrador preparado</p><h2 className="text-xl font-extrabold">Revisa tu información antes de publicar</h2></div></div><div className="mt-6 grid sm:grid-cols-[120px_1fr] gap-5 items-start"><div>{photoPreview ? <img src={photoPreview} alt="Foto del perfil" className="w-28 h-28 rounded-2xl object-cover" /> : <div className={`w-28 h-28 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center`}><UserRound className="w-8 h-8 text-slate-400" /></div>}</div><div><h3 className="text-lg font-extrabold">{draft.name}</h3><p className="mt-1 text-cyan-500 font-bold text-sm">{draft.headline}</p><p className={`mt-3 text-sm leading-relaxed ${muted}`}>{draft.summary}</p></div></div><div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3"><button type="button" onClick={handlePdfDownload} disabled={isGeneratingPdf} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><Download className="w-4 h-4" />{isGeneratingPdf ? 'Generando PDF...' : 'Generar y descargar PDF'}</button><button type="button" onClick={publishProfile} disabled={isPublishing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><Globe className="w-4 h-4" />{isPublishing ? 'Publicando...' : 'Publicar mi perfil'}</button></div>{(pdfStatus || publishStatus) && <p className={`mt-3 text-xs leading-relaxed ${publishStatus?.startsWith('Perfil publicado') ? 'text-emerald-500' : muted}`} role="status">{publishStatus || pdfStatus}</p>}<div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed">Al publicar, tu perfil quedará disponible en un subdominio personal. Podrás revisar el PDF antes de compartirlo.</div></section>}
      </section>
    </div>
  );
};
