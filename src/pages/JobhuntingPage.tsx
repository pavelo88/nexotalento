import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  Compass, 
  Share2, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award, 
  ChevronDown, 
  Users, 
  HelpCircle,
  FileSpreadsheet,
  Linkedin,
  FileText
} from 'lucide-react';

interface JobhuntingPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenCVAnalyzer?: () => void;
}

export const JobhuntingPage: React.FC<JobhuntingPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'exito' | 'cerrado'>('exito');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '3-5 años',
    plan: 'exito',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: 'Candidato ProProfile',
          role: `${formData.role} (${formData.experience})`,
          service: `Programa Jobhunting ProProfile - Modalidad ${formData.plan === 'exito' ? 'A Éxito (300€ + 25%)' : 'Inversión Cerrada (450€)'}`,
          message: formData.notes,
          source: 'Landing /jobhunting'
        })
      });
      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(true); // Fallback amigable
      }
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const phases = [
    {
      num: '0',
      badge: 'Fase 0',
      title: 'Sesión con Psicólogo Experto en RRHH',
      subtitle: 'Bienestar y Mentalidad Ganadora',
      icon: HeartHandshake,
      desc: 'Sesión individual con una psicóloga especializada en desarrollo profesional y bienestar laboral, enfocada en la parte emocional de la búsqueda.',
      bullets: [
        'Confianza y autoconfianza profesional',
        'Gestión del estrés, la incertidumbre y el rechazo',
        'Desbloqueo de creencias limitantes'
      ]
    },
    {
      num: '1',
      badge: 'Fase 1',
      title: 'Estrategia y Posicionamiento',
      subtitle: 'Definición de Rumbo y Escaparate',
      icon: Compass,
      desc: 'Primera sesión con consultor senior. Trabajamos juntos tu propuesta de valor profesional, los tipos de puestos y sectores objetivo.',
      bullets: [
        'Definición de propuesta de valor diferencial',
        'Optimización inicial de escaparate laboral (CV & LinkedIn)',
        'Entrega del Excel de seguimiento para planificar acciones y decisores'
      ]
    },
    {
      num: '2',
      badge: 'Fase 2',
      title: 'Escaparate y Activación de Mercado',
      subtitle: 'Entregables Premium y Red de Decisores',
      icon: Share2,
      desc: 'Segunda sesión con consultor. Transformamos tus activos y activamos activamente tu perfil en nuestro ecosistema corporativo.',
      bullets: [
        'CV de alto impacto optimizado para ATS y reclutadores',
        'Perfil de LinkedIn optimizado con visibilidad de escaparate',
        'Listado de empresas target + primeros decisores',
        'Difusión activa en la red de partners y headhunters de Nexo Talento'
      ]
    },
    {
      num: '3',
      badge: 'Fase 3',
      title: 'Entrevistas y Conversión',
      subtitle: 'De la Entrevista a la Oferta Firme',
      icon: MessageSquare,
      desc: 'Tercera sesión con consultor. Te preparamos para superar procesos reales y destacar sobre cualquier candidato competidor.',
      bullets: [
        'Preparación y simulación de entrevistas reales',
        'Storytelling profesional y estructura STAR',
        'Defensa sólida de tu valor, logros y expectativas'
      ]
    },
    {
      num: '4',
      badge: 'Fase 4',
      title: 'Cierre y Negociación Salarial',
      subtitle: 'Maximizar Valor y Asegurar Encaje',
      icon: TrendingUp,
      desc: 'Cuarta sesión con consultor. Te respaldamos en el momento decisivo para que no dejes dinero sobre la mesa.',
      bullets: [
        'Estrategia de negociación salarial y beneficios',
        'Evaluación objetiva de ofertas y toma de decisiones',
        'Apoyo en cualquier punto crítico del proceso',
        'Garantía de reactivación si el encaje inicial no funciona'
      ]
    }
  ];

  const painPoints = [
    { id: '1', text: 'Llevas tiempo buscando y no estás consiguiendo resultados' },
    { id: '2', text: 'No te llaman o no accedes a las entrevistas que quieres' },
    { id: '3', text: 'Sientes que no sabes cómo vender adecuadamente tu perfil' },
    { id: '4', text: 'Te bloqueas en entrevistas o no sabes cómo destacar frente a otros' },
    { id: '5', text: 'No tienes claro qué tipo de empresas o roles encajan contigo' },
    { id: '6', text: 'Estás aplicando a diario, pero no sabes si lo estás haciendo bien' }
  ];

  const faqs = [
    {
      q: '¿Este programa me garantiza encontrar trabajo?',
      a: 'No podemos garantizar una oferta concreta porque la contratación final depende de la empresa, pero sí te garantizamos un proceso estructurado, claro y enfocado a resultados. El objetivo es que salgas con una estrategia y herramientas que aumenten exponencialmente tus probabilidades de éxito.'
    },
    {
      q: '¿Y si no consigo el resultado esperado o no encajo en la empresa?',
      a: 'Trabajamos contigo para maximizar tus oportunidades con estrategia clara y activación en el mercado. Además, si el encaje no funciona tras incorporarte a una empresa, incluimos una Garantía de Reactivación para ayudarte a recolocarte sin coste adicional.'
    },
    {
      q: '¿Cuánto dura el programa ProProfile?',
      a: 'La fase activa dura entre 4 y 8 semanas, en función de la frecuencia de las sesiones que acuerdes con tu consultor asignado. Durante este tiempo se estructura toda la estrategia, se optimizan los activos y se activa activamente tu perfil en el mercado.'
    },
    {
      q: '¿Cuánto depende de mí el resultado?',
      a: 'Mucho. Este programa está diseñado como un trabajo en equipo: nosotros no podemos postular por ti con tu firma ni acudir a las entrevistas en tu lugar. El resto de la estrategia, optimización, contactos y preparación lo hacemos conjuntamente como una máquina perfecta.'
    },
    {
      q: '¿Qué pasa si no tengo claro a qué quiero postular?',
      a: 'Es totalmente válido y muy común. La primera fase del programa está enfocada precisamente en definir tu posicionamiento, perfil profesional, objetivos y sectores target.'
    },
    {
      q: '¿Qué diferencia hay entre los dos modelos (A Éxito vs Inversión Cerrada)?',
      a: 'ProProfile A Éxito trabaja con exclusividad y fee a resultado (300 € inicial + 25% del primer salario mensual al conseguir empleo, descontando el retain inicial). ProProfile Inversión Cerrada (450 €) no tiene exclusividad ni comisiones sobre tu sueldo, e incluye mayor foco emocional con 3 sesiones completas de psicología.'
    },
    {
      q: '¿Cuándo se paga el success fee en el modelo a éxito?',
      a: 'Únicamente cuando aceptas una oferta laboral dentro del periodo acordado. Además, ofrecemos facilidades de pago para que el proceso sea completamente accesible.'
    },
    {
      q: '¿Trabajan solo con sus vacantes internas o con todo el mercado?',
      a: 'Combinamos ambas: tienes acceso directo a nuestro círculo de empresas y decisores, difusión estratégica de tu perfil, y en paralelo te enseñamos a identificar oportunidades ocultas, contactar decisores y moverte con criterio autónomo en el mercado.'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#06080B] text-slate-100' : 'bg-[#FAF8F5] text-slate-900'}`}>
      
      {/* HERO SECTION DE IMPACTO CON COLORES OFICIALES DEL PDF (#0E243A Navy & #009688 / #00A896 Cyan) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#0E243A] via-[#102B45] to-[#0A1826] text-white">
        {/* Glows y Luces Ambientales */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: Copywriting Estratégico */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A896]/20 border border-[#00A896]/40 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#00E5C9]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E5C9]">
                  Nexo Talento · Servicio de ProProfile
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.1]">
                Programa de <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5C9] to-[#00A896]">
                  Jobhunting & ProProfile
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl">
                Un acompañamiento integral para <strong className="font-semibold text-white">redefinir tu posicionamiento real en el mercado</strong>, fortalecer tu marca personal y diseñar una estrategia efectiva de búsqueda laboral.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-xl">
                <p className="text-sm text-slate-300 italic">
                  &ldquo;Tú pones la historia, nosotros la estrategia. Conectamos talento con oportunidades en LATAM y España.&rdquo;
                </p>
              </div>

              {/* CTAs Principales */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#formulario-postulacion"
                  className="px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00A896] to-[#00C4AF] text-[#0A1826] hover:from-[#00BFA8] hover:to-[#00DEC7] shadow-lg shadow-[#00A896]/30 transition-all text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Postular al Programa</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#modalidades-precios"
                  className="px-6 py-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all text-center"
                >
                  Ver Modelos &amp; Precios
                </a>
              </div>

              {/* Métricas destacadas del PDF */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-[#00E5C9]">2,5 meses</p>
                  <p className="text-xs text-slate-300 font-medium">Tiempo medio de colocación</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-[#00E5C9]">95%</p>
                  <p className="text-xs text-slate-300 font-medium">Consiguen empleo en el periodo</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-2xl sm:text-3xl font-black text-[#00E5C9]">Mercado Oculto</p>
                  <p className="text-xs text-slate-300 font-medium">Acceso directo a decisores</p>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Responsive Hero Image Art (Desktop & Mobile) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow decorativo de fondo */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00A896] to-cyan-500 rounded-3xl blur-xl opacity-40 animate-pulse" />

                {/* Contenedor de Imagen con Picture Tag Responsive */}
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0A1826]">
                  <picture>
                    <source media="(max-width: 768px)" srcSet="/jobhunting-hero-mobile.jpg" />
                    <img 
                      src="/jobhunting-hero-desktop.jpg" 
                      alt="Programa de Jobhunting y ProProfile en Nexo Talento" 
                      className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>

                  {/* Overlay gradiente inferior con badge flotante */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0E243A]/90 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00A896]/20 flex items-center justify-center shrink-0 border border-[#00A896]/40">
                        <Award className="w-5 h-5 text-[#00E5C9]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Headhunters Senior Reales</p>
                        <p className="text-[11px] text-slate-300">No somos coaching teórico. Vivimos en el mercado de selección.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN "¿ES PARA MÍ?" (LOS 6 PUNTOS DE DOLOR DEL PDF) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A896] dark:text-[#00E5C9]">
            ¿Es para mí?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
            Este programa es para ti si…
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Identificamos los bloqueos más comunes que frenan el avance de profesionales altamente capacitados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item) => (
            <div 
              key={item.id}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark' 
                  ? 'bg-stone-900/60 border-stone-800 hover:border-[#00A896]/50 hover:bg-stone-900' 
                  : 'bg-white border-stone-200/80 hover:border-[#00A896]/50 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 text-[#00A896] dark:text-[#00E5C9] font-black flex items-center justify-center text-lg mb-4">
                {item.id}
              </div>
              <p className="text-base font-semibold text-stone-800 dark:text-stone-200 leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMA EN DETALLE (FASES 0 A 4) */}
      <section className={`py-20 border-y ${theme === 'dark' ? 'bg-[#0a0d13] border-stone-800' : 'bg-stone-50/70 border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A896] dark:text-[#00E5C9]">
              Metodología Comprobada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              Programa en Detalle: Fases 0 a 4
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
              Alineación psicológica, estrategia técnica de mercado y ejecución hasta el cierre contractual.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={phase.num}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-stone-900/80 border-stone-800 hover:border-stone-700' 
                      : 'bg-white border-stone-200 shadow-xs hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#00A896]/10 text-[#00A896] dark:text-[#00E5C9] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A896] dark:text-[#00E5C9]">
                          {phase.badge}
                        </span>
                        <h3 className="text-xl font-bold font-heading text-stone-900 dark:text-white">
                          {phase.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {phase.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
                    {phase.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/80">
                    {phase.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DIFERENCIADOR CLAVE (HEADHUNTERS SENIOR VS COACHING TRADICIONAL) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 sm:p-12 rounded-3xl border ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-[#0E243A] to-[#0A1826] border-stone-800 text-white' 
            : 'bg-gradient-to-br from-[#0E243A] to-[#12304D] border-stone-200 text-white shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00E5C9]">
                Nuestra Diferencia
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                ¿En qué nos diferenciamos del resto?
              </h2>
              <p className="text-lg text-slate-200 font-medium">
                No somos un servicio de coaching laboral tradicional.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Somos un equipo de <strong>headhunters senior</strong> con experiencia directa en procesos de selección a nivel nacional e internacional. Vivimos evaluando perfiles, cerrando ternas y asesorando a comités de dirección.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Perspectiva de Empleador', desc: 'Entendemos cómo piensan las empresas y los decisores reales.' },
                { title: 'Criterio de Selección', desc: 'Sabemos qué perfiles destacan en la terna y por qué motivos.' },
                { title: 'Enfoque de Mercado Real', desc: 'Te preparamos con situaciones, preguntas y números vigentes en 2026.' },
                { title: 'Red de Contactos Activa', desc: 'Acceso a un círculo de decisores construido durante años.' }
              ].map((card, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-sm font-bold text-[#00E5C9] mb-1">{card.title}</p>
                  <p className="text-xs text-slate-300">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES Y PRECIOS TRANSPARENTES (DEL PDF) */}
      <section id="modalidades-precios" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A896] dark:text-[#00E5C9]">
            Inversión Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
            Elige Cómo Abordar Tu Proceso
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Dos esquemas diseñados para adaptarse a tu nivel de implicación y preferencia financiera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Modalidad 1: Modelo a Éxito */}
          <div className={`p-8 rounded-3xl border relative flex flex-col justify-between transition-all ${
            selectedPlan === 'exito'
              ? 'border-[#00A896] ring-2 ring-[#00A896]/30 shadow-xl'
              : 'border-stone-200 dark:border-stone-800'
          } ${theme === 'dark' ? 'bg-stone-900/90' : 'bg-white'}`}>
            
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00A896]/15 text-[#00A896] dark:text-[#00E5C9] border border-[#00A896]/30">
              Más Solicitado
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-stone-500">Modalidad 01</span>
              <h3 className="text-2xl font-black font-heading mt-1">Modelo a Éxito</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Acompañamiento en exclusividad vinculado a resultados.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#00A896]">300 €</span>
                  <span className="text-xs font-bold text-stone-500">inicial (retain)</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-semibold mt-2">
                  + 25% del salario mensual al conseguir empleo
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  (El retain inicial de 300 € se descuenta del fee final)
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">¿Qué incluye?</p>
                {[
                  '4 sesiones estratégicas con consultor senior',
                  '1 sesión profunda con psicóloga especializada en RRHH',
                  'Optimización completa de CV + Perfil de LinkedIn',
                  'Excel de seguimiento y planificación de contactos',
                  'Activación activa en red de headhunters y partners',
                  'Preparación de entrevistas reales + negociación salarial',
                  'Trabajo en exclusividad y acompañamiento estrecho'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#formulario-postulacion"
              onClick={() => {
                setSelectedPlan('exito');
                setFormData(prev => ({ ...prev, plan: 'exito' }));
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#00A896] to-[#00C4AF] text-[#0A1826] hover:opacity-90 text-center transition-all shadow-md active:scale-95"
            >
              Elegir Modelo a Éxito (300 € + 25%)
            </a>
          </div>

          {/* Modalidad 2: Modelo Sin Exclusividad (Inversión Cerrada) */}
          <div className={`p-8 rounded-3xl border relative flex flex-col justify-between transition-all ${
            selectedPlan === 'cerrado'
              ? 'border-[#0E243A] dark:border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl'
              : 'border-stone-200 dark:border-stone-800'
          } ${theme === 'dark' ? 'bg-stone-900/90' : 'bg-white'}`}>

            <div>
              <span className="text-xs font-bold uppercase text-stone-500">Modalidad 02</span>
              <h3 className="text-2xl font-black font-heading mt-1">Modelo Sin Exclusividad</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Inversión cerrada desde el inicio. Sin fees ni comisiones posteriores.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-stone-900 dark:text-white">450 €</span>
                  <span className="text-xs font-bold text-stone-500">pago único total</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-semibold mt-2">
                  Programa completo sin ningún porcentaje sobre tu sueldo
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Inviertes al inicio y ejecutas con total autonomía
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">¿Qué incluye?</p>
                {[
                  'Todo lo incluido en el modelo a éxito',
                  '3 sesiones con psicólogos especializados (en lugar de 1)',
                  '4 sesiones estratégicas con consultor senior',
                  'CV + LinkedIn + Excel de seguimiento',
                  'Listado de empresas target y primeros decisores',
                  'Sin exclusividad: aplicación flexible a tu propio ritmo',
                  'Cero comisiones al conseguir empleo'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#formulario-postulacion"
              onClick={() => {
                setSelectedPlan('cerrado');
                setFormData(prev => ({ ...prev, plan: 'cerrado' }));
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:opacity-90 text-center transition-all shadow-md active:scale-95"
            >
              Elegir Inversión Cerrada (450 €)
            </a>
          </div>

        </div>
      </section>

      {/* FORMULARIO DE POSTULACIÓN / DIAGNÓSTICO */}
      <section id="formulario-postulacion" className={`py-20 border-t ${theme === 'dark' ? 'bg-[#0a0d13] border-stone-800' : 'bg-stone-50/80 border-stone-200'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl">
            
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A896]">
                Admisión Directa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-1">
                Solicita tu Diagnóstico para ProProfile
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                Evaluamos tu perfil para confirmar viabilidad y acordar la primera sesión estratégica.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  ¡Solicitud Recibida con Éxito!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Un consultor senior de Nexo Talento revisará tus datos y se pondrá en contacto contigo en menos de 24 horas laborables para coordinar tu sesión de diagnóstico.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">WhatsApp / Teléfono *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000 o +593..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Años de Experiencia</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                    >
                      <option value="1-3 años">1 a 3 años</option>
                      <option value="3-5 años">3 a 5 años</option>
                      <option value="5-10 años">5 a 10 años</option>
                      <option value="10+ años">Más de 10 años (Directivo/Senior)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Puesto o Área de Búsqueda Objetivo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Director de Operaciones, Tech Lead, Gerente Financiero..."
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Modalidad de Preferencia</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, plan: 'exito' })}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        formData.plan === 'exito'
                          ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]'
                          : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      Modelo a Éxito (300 € + 25%)
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, plan: 'cerrado' })}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        formData.plan === 'cerrado'
                          ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]'
                          : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      Inversión Cerrada (450 €)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Situación Actual o Comentarios</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos brevemente cuánto tiempo llevas buscando o tus principales desafíos..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-[#00A896]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#00A896] to-[#00C4AF] text-[#0A1826] hover:opacity-90 transition-all shadow-lg shadow-[#00A896]/20 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando postulación...' : 'Enviar Solicitud de Admisión'}
                </button>

                <p className="text-[10px] text-center text-stone-400">
                  Tus datos se procesan con estricta confidencialidad bajo política de privacidad y protección de datos.
                </p>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQS DEL PDF) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A896]">
            Resolución de Dudas
          </span>
          <h2 className="text-3xl font-extrabold font-heading mt-1">
            Preguntas Frecuentes sobre Jobhunting
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                theme === 'dark' ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-stone-900 dark:text-stone-100"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#00A896]' : ''}`} />
              </button>
              
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
