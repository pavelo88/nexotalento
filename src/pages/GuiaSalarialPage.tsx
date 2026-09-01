import React, { useState } from 'react';
import { SalaryGuideSection } from '../components/SalaryGuideSection';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Calendar,
  Share2,
  CheckCircle2,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';

interface GuiaSalarialPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenSalaryAgent: () => void;
}

export const GuiaSalarialPage: React.FC<GuiaSalarialPageProps> = ({
  onNavigate,
  onOpenSalaryAgent
}) => {
  const { theme } = useTheme();
  const [downloadEmail, setDownloadEmail] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  const blogArticles = [
    {
      id: 'directiva-ue-transparencia',
      tag: 'Marco Legal UE',
      date: 'Actualizado Febrero 2026',
      readTime: '6 min de lectura',
      title: 'Directiva UE 2023/970: Todo lo que directores de RRHH deben adaptar en bandas salariales',
      excerpt: 'Análisis pormenorizado sobre la obligación legal de comunicar rangos retributivos en las ofertas de empleo y el fin del secretismo salarial en empresas con más de 50 empleados.',
      highlights: [
        'Prohibición expresa de preguntar por el histórico salarial previo del candidato.',
        'Derecho del empleado a conocer la media retributiva desglosada por sexo.',
        'Auditoría y planes de acción cuando la brecha de género no justificada supere el 5%.'
      ]
    },
    {
      id: 'retencion-clevel-equity',
      tag: 'Estrategia de Compensación',
      date: 'Enero 2026',
      readTime: '8 min de lectura',
      title: 'Diseño de Paquetes de Retención C-Level: Phantom Shares, Stock Options y Bonus por Hitos',
      excerpt: 'Cómo las scaleups y multinacionales en España están estructurando sus ofertas para fichar perfiles directivos pasivos que exigen alineación a largo plazo con el valor de la compañía.',
      highlights: [
        'Esquemas de vesting a 4 años con 1 año de cliff estándar.',
        'Tributación de las stock options tras la Ley de Startups.',
        'Cláusulas de Good/Bad Leaver y aceleración por liquidez o M&A.'
      ]
    },
    {
      id: 'boom-ia-cloud-salarios',
      tag: 'Mercado Tech & IA',
      date: 'Enero 2026',
      readTime: '5 min de lectura',
      title: 'El Mapa Salarial Tech 2026: Por qué los perfiles de Inteligencia Artificial Generativa marcan récord',
      excerpt: 'La escasez de talento con experiencia práctica en orquestación de agentes LLM, RAG y finetuning ha disparado las compensaciones un 25% por encima de los perfiles de desarrollo tradicional.',
      highlights: [
        'Salarios de Head of AI situados en la franja de 100k€ - 150k€.',
        'Crecimiento exponencial en la demanda de ingenieros de Machine Learning Ops.',
        'Competencia de empresas de EE.UU. contratando en remoto con salarios en dólares.'
      ]
    }
  ];

  const handleDownloadReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadEmail) {
      setIsDownloaded(true);
    }
  };

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-indigo-500/15 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-cyan-400 mb-4 animate-spring-in">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog Editorial &amp; Observatorio de Compensación de Nexo Talentos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            Guía de Compensación{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              Directiva &amp; Tech España 2026
            </span>
          </h1>

          <p className={`mt-4 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Estudio integral de bandas salariales, variables, equity y marco regulatorio europeo (Directiva UE 2023/970) para directores generales, líderes de tecnología y comités ejecutivos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-500" />
              Edición Anual 2026
            </span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              Muestra auditada de +450 colocaciones directivas
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Conforme a Directiva de Transparencia Retributiva
            </span>
          </div>
        </div>

        {/* Embedded Interactive Salary Table Section */}
        <div className="mb-16">
          <SalaryGuideSection 
            onOpenSalaryAgent={onOpenSalaryAgent}
            onNavigateToSalaryGuide={() => {}}
          />
        </div>

        {/* ================= EDITORIAL BLOG ARTICLES / RESEARCH DEEP DIVES ================= */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800/60">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Artículos Editoriales &amp; Análisis de Mercado</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Claves Estratégicas para Consejos y Directores de Personas
              </h2>
            </div>
            <span className="text-xs text-slate-400 mt-2 sm:mt-0">
              Publicaciones periódicas por nuestros Senior Partners
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogArticles.map((article) => (
              <article 
                key={article.id}
                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between card-spring-hover ${
                  theme === 'dark' 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 shadow-md hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      {article.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {article.excerpt}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-800/60 mb-6">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Aspectos clave tratados:
                    </p>
                    {article.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenSalaryAgent}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border btn-spring-press flex items-center justify-center gap-1.5 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Consultar detalles con Agente de Compensación</span>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* ================= DOWNLOADABLE DOSSIER LEAD CAPTURE ================= */}
        <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-cyan-500/30' 
            : 'bg-gradient-to-r from-cyan-50 via-white to-blue-50 border-cyan-200 shadow-xl'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                <Download className="w-3.5 h-3.5" />
                <span>Informe Completo de 68 Páginas en PDF</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight">
                Descarga el Estudio Salarial Ejecutivo España 2026
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Incluye tablas salariales desglosadas por ciudad (Madrid, Barcelona, Valencia, Málaga, Bilbao y Remoto), análisis de equity por fase de empresa (Seed, Serie A, Serie B, Enterprise) y plantillas de comunicación según la Directiva UE.
              </p>

              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Actualizado con datos de Q1 2026
                </span>
                <span className="flex items-center gap-1.5 text-cyan-500 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Descarga libre de spam
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              {!isDownloaded ? (
                <form 
                  onSubmit={handleDownloadReport} 
                  data-webmcp-form="guia-salarial-download-form"
                  className={`p-6 rounded-2xl border space-y-4 ${
                  theme === 'dark' ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <h3 className="text-sm font-bold font-heading">
                    Recibe el documento instantáneamente
                  </h3>

                  <div>
                    <label 
                      htmlFor="guia-download-email"
                      className="block text-xs font-semibold text-slate-400 mb-1"
                    >
                      Email Corporativo o Personal
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="guia-download-email"
                        type="email"
                        required
                        placeholder="tu.email@empresa.com"
                        aria-label="Email para recibir la Guía Salarial 2026"
                        data-webmcp-field="download-email"
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border ${
                          theme === 'dark'
                            ? 'bg-slate-950 text-slate-100 border-slate-700 focus:border-cyan-500'
                            : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg btn-spring-press flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Descargar Estudio Salarial 2026 (PDF)</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Tus datos están protegidos bajo estricto RGPD.
                  </p>
                </form>
              ) : (
                <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                  theme === 'dark' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-base font-bold">¡Informe Salarial Enviado con Éxito!</h3>
                  <p className="text-xs">
                    Hemos remitido el dossier ejecutivo de 68 páginas a <strong>{downloadEmail}</strong>.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
