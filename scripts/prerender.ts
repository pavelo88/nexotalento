import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RouteMetadata {
  path: string;
  title: string;
  description: string;
  h1: string;
  h2: string;
  summaryText: string;
  closingText: string;
  h3s: { title: string; desc: string; linkText: string; linkHref: string }[];
}

const DOMAIN = 'https://nexotalento.com';

const ROUTES: RouteMetadata[] = [
  {
    path: '/servicios',
    title: 'Servicios de Headhunting y Selección | Nexo Talentos',
    description: 'Servicios de Executive Search, selección de mandos intermedios y talento tech en Madrid y Barcelona. Terna en 18 días hábiles garantizada.',
    h1: 'Servicios de Executive Search &amp; Headhunting en España',
    h2: 'Catálogo de Soluciones de Contratación Directiva y Tecnológica',
    summaryText: 'Buscamos líderes para tu empresa en toda España. Cubrimos puestos clave con rapidez y trato cercano. Entregamos candidatos listos en dieciocho días laborables. Cuentas con garantía de tres a seis meses sin coste extra. Cuidamos cada detalle legal en todo momento.',
    closingText: 'Te ayudamos a formar equipos sólidos que hacen crecer tu negocio. Habla hoy mismo con un consultor sénior. Analizamos tu vacante y te enviamos una propuesta clara en menos de un día.',
    h3s: [
      {
        title: 'Executive Search y Alta Dirección',
        desc: 'Buscamos directores generales y consejeros con visión de futuro. Evaluamos logros reales y capacidad de mando. Te presentamos tres líderes que encajan con tu plan.',
        linkText: 'Solicitar Executive Search',
        linkHref: '/contacto'
      },
      {
        title: 'Selección de Perfiles Tecnológicos e IA',
        desc: 'Reclutamos directores de tecnología y jefes de desarrollo. Validamos código, datos y proyectos de inteligencia artificial. Encontramos expertos listos para entrar a tu equipo.',
        linkText: 'Ver Soluciones Tech',
        linkHref: '/contacto'
      },
      {
        title: 'Selección de Mandos Intermedios',
        desc: 'Cubrimos puestos clave de gestión diaria y mandos medios. Seleccionamos jefes de equipo que ejecutan tus planes con éxito. Aceleramos la contratación con filtros claros.',
        linkText: 'Consultar Mandos Medios',
        linkHref: '/contacto'
      },
      {
        title: 'Talento Remoto en Latinoamérica',
        desc: 'Accede a talento cualificado en otros países con el mismo horario. Ahorras hasta un cincuenta por ciento en costes laborales. Mantienes la máxima calidad técnica en tus proyectos.',
        linkText: 'Ver Opciones Remotas',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Garantía Real de Reposición Sin Coste',
        desc: 'Todos nuestros procesos cuentan con garantía por contrato. Si la persona no supera el periodo acordado, buscamos otra sin coste. Tu inversión está protegida desde el primer día.',
        linkText: 'Conocer Nuestras Garantías',
        linkHref: '/por-que-elegirnos'
      }
    ]
  },
  {
    path: '/por-que-elegirnos',
    title: 'Por Qué Elegirnos: Garantías y Valor | Nexo Talentos',
    description: 'Descubre nuestras 4 garantías exclusivas: terna en 18 días, blindaje legal Art. 43 ET, sustitución gratuita y evaluación con IA avanzada.',
    h1: '¿Por Qué las Empresas Líderes Eligen Nexo Talentos?',
    h2: 'Cuatro Pilares Exclusivos de Excelencia y Seguridad Jurídica',
    summaryText: 'Somos la firma de selección directiva más ágil de España. Ayudamos a directores de personas y comités de dirección a contratar con calma. Te ofrecemos cuatro garantías reales por contrato. Trabajamos con método, cercanía y total discreción en cada proceso.',
    closingText: 'Más de doscientas empresas han cerrado con éxito sus procesos directivos con nosotros. Te damos la tranquilidad de contratar bien a la primera. Pide una cita confidencial con un socio de la firma hoy.',
    h3s: [
      {
        title: 'Entrega de Terna en 18 Días Hábiles',
        desc: 'Reducimos los tiempos habituales de selección a solo dieciocho días laborables. No te hacemos esperar meses. Presentamos tres finalistas listos para tu entrevista final.',
        linkText: 'Ver Nuestro Proceso Ágil',
        linkHref: '/proceso'
      },
      {
        title: 'Blindaje Legal Total según la Ley Laboral',
        desc: 'Protegemos tu empresa ante cualquier riesgo laboral. Cumplimos cada punto de la ley de contratos y cesión de trabajadores. Todos los acuerdos quedan blindados por escrito.',
        linkText: 'Leer Sobre Blindaje Legal',
        linkHref: '/blog'
      },
      {
        title: 'Garantía Real de Reposición Sin Coste',
        desc: 'Si el candidato decide salir o no encaja en el equipo, lo cambiamos sin coste. Cuentas con tres a seis meses de cobertura total. Reanudamos la búsqueda de inmediato.',
        linkText: 'Consultar Condiciones',
        linkHref: '/contacto'
      },
      {
        title: 'Evaluación Técnica con Herramientas Modernas',
        desc: 'Medimos conocimientos prácticos y habilidades de liderazgo. Empleamos pruebas objetivas para predecir el éxito en el puesto. Reducimos al mínimo los fallos en la elección.',
        linkText: 'Ver Métodos de Evaluación',
        linkHref: '/servicios'
      },
      {
        title: 'Confidencialidad Absoluta en Cada Proceso',
        desc: 'Tratamos las búsquedas sensibles con total reserva. Firmamos acuerdos de secreto profesional antes de empezar. Protegemos la imagen de tu empresa en todo momento.',
        linkText: 'Contactar de Forma Privada',
        linkHref: '/contacto'
      }
    ]
  },
  {
    path: '/testimonios',
    title: 'Testimonios y Casos de Éxito Reales | Nexo Talentos',
    description: 'Conoce las opiniones y casos reales de CEOs y directores de recursos humanos que confían en Nexo Talentos para contratar talento clave en España.',
    h1: 'Casos de Éxito y Testimonios de Directivos',
    h2: 'Opiniones Verificadas de Líderes Empresariales en España',
    summaryText: 'Más de doscientas empresas líderes confían en Nexo Talentos. Ayudamos a grupos empresariales a encontrar directores de alto nivel con rapidez. Nuestros clientes destacan la cercanía y el rigor de los consultores. Compartimos casos reales con datos claros y resultados auditados.',
    closingText: 'Si deseas hablar con clientes de tu mismo sector, te facilitamos referencias directas. Comprueba por qué el noventa y cuatro por ciento de las empresas repite con nosotros. Escríbenos hoy y cuéntanos tu caso.',
    h3s: [
      {
        title: 'Director de Tecnología para Empresa de Pagos',
        desc: 'Presentamos una terna de directores en Madrid en solo doce días laborables. El candidato elegido lidera hoy un equipo de cuarenta ingenieros con gran éxito.',
        linkText: 'Ver Ofertas Tecnológicas',
        linkHref: '/vacantes'
      },
      {
        title: 'Director de Operaciones en Sector Industrial',
        desc: 'Buscaban un líder de planta en Valencia para gestionar trescientas personas. Cerramos el proceso en dieciséis días con plena satisfacción del consejo.',
        linkText: 'Ver Servicios Industriales',
        linkHref: '/servicios'
      },
      {
        title: 'Cinco Ingenieros Sénior en Modalidad Remota',
        desc: 'Una empresa de software incorporó cinco expertos en Latinoamérica. Lograron un ahorro de costes del cincuenta por ciento manteniendo alta calidad técnica.',
        linkText: 'Calcular Ahorro Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Directora Financiera para Grupo de Salud',
        desc: 'Cubrimos una vacante clave de dirección financiera en Barcelona. La empresa resolvió su necesidad en dos semanas con un perfil de primer nivel.',
        linkText: 'Pedir Propuesta Directiva',
        linkHref: '/contacto'
      },
      {
        title: 'Atención Ágil y Cercana en Todo Momento',
        desc: 'Los directores de personas valoran nuestro trato directo. Resolvemos cada duda en menos de veinticuatro horas y cuidamos los detalles en cada paso.',
        linkText: 'Hablar con un Consultor',
        linkHref: '/contacto'
      }
    ]
  },
  {
    path: '/proceso',
    title: 'Proceso de Selección Ejecutiva en 18 Días | Nexo Talentos',
    description: 'Metodología ágil en 5 fases para identificar y contratar líderes clave en 18 días hábiles con total confidencialidad y garantía de reposición.',
    h1: 'El Proceso de Executive Search Paso a Paso',
    h2: 'Metodología Ágil y Rigurosa de Cinco Fases en Dieciocho Días',
    summaryText: 'Nuestro método de trabajo es claro, rápido y seguro. Entregamos tres candidatos finalistas en dieciocho días laborables. Combinamos el contacto directo con profesionales en activo y entrevistas a fondo. Minimizamos el tiempo de espera sin descuidar la calidad.',
    closingText: 'Con nosotros sabes en todo momento en qué punto está tu proceso. Te enviamos informes semanales con datos claros y avances reales. Inicia hoy tu proceso con una llamada breve.',
    h3s: [
      {
        title: 'Fase 1: Definición del Perfil en Dos Días',
        desc: 'En las primeras cuarenta y ocho horas definimos los requisitos del puesto. Acordamos funciones, sueldo, objetivos y estilo de liderazgo deseado.',
        linkText: 'Ver Guía Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Fase 2: Búsqueda Directa en el Mercado',
        desc: 'Contactamos con profesionales con empleo que no buscan trabajo de forma activa. Les presentamos tu proyecto de empresa con discreción y rigor.',
        linkText: 'Ver Vacantes Activas',
        linkHref: '/vacantes'
      },
      {
        title: 'Fase 3: Entrevistas por Competencias',
        desc: 'Hacemos entrevistas personales para medir logros reales y valores. Contrastamos referencias con antiguos jefes para validar cada detalle del perfil.',
        linkText: 'Ver Criterios de Evaluación',
        linkHref: '/servicios'
      },
      {
        title: 'Fase 4: Entrega de la Terna el Día Dieciocho',
        desc: 'El día dieciocho laborable te entregamos un informe con los tres mejores candidatos. Organizamos las entrevistas finales con tu equipo de dirección.',
        linkText: 'Solicitar Presupuesto',
        linkHref: '/contacto'
      },
      {
        title: 'Fase 5: Oferta, Cierre y Cobertura Total',
        desc: 'Te ayudamos a negociar la oferta final para asegurar el sí del candidato. Acompañamos la incorporación y cubrimos seis meses de garantía por contrato.',
        linkText: 'Iniciar un Proceso Hoy',
        linkHref: '/contacto'
      }
    ]
  },
  {
    path: '/contacto',
    title: 'Contacto y Sedes en Madrid y Barcelona | Nexo Talentos',
    description: 'Contacta con nuestro equipo de consultores sénior de selección en Madrid y Barcelona. Respuesta garantizada y confidencial en menos de 24 horas.',
    h1: 'Contacto, Sedes y Consultor Directo en España',
    h2: 'Atención Directa y Personalizada para Empresas y Candidatos',
    summaryText: 'Estamos listos para ayudarte a contratar el mejor talento. Te atendemos en nuestras oficinas de Madrid y Barcelona o por canales digitales. Cada solicitud recibe respuesta de un consultor sénior en menos de veinticuatro horas. Cuidamos cada consulta con máxima reserva.',
    closingText: 'Tanto si eres una empresa con una vacante urgente como si eres un directivo buscando nuevos retos, cuentas con nuestro apoyo. Escríbenos hoy y comencemos a trabajar juntos.',
    h3s: [
      {
        title: 'Oficina Central en Madrid',
        desc: 'Nos encuentras en pleno Paseo de la Castellana noventa y cinco. Atendemos reuniones presenciales en el centro financiero de la capital.',
        linkText: 'Pedir Cita en Madrid',
        linkHref: '/contacto'
      },
      {
        title: 'Sede en Barcelona',
        desc: 'Nuestra oficina en Avinguda Diagonal da servicio a empresas de Cataluña. Gestionamos procesos locales con consultores de la zona.',
        linkText: 'Pedir Cita en Barcelona',
        linkHref: '/contacto'
      },
      {
        title: 'Atención Rápida por WhatsApp',
        desc: 'Escríbenos un mensaje directo para resolver dudas urgentes. Te responde un socio consultor en menos de dos horas laborables.',
        linkText: 'Abrir Chat WhatsApp',
        linkHref: '/contacto'
      },
      {
        title: 'Propuestas a Medida para Empresas',
        desc: 'Cuéntanos qué perfil necesitas y el plazo que manejas. Te enviamos una propuesta detallada sin ningún compromiso por tu parte.',
        linkText: 'Enviar Formulario',
        linkHref: '/contacto'
      },
      {
        title: 'Bolsa Privada para Directivos',
        desc: 'Si eres directivo y buscas un cambio profesional, envíanos tu perfil. Protegemos tus datos y nunca los compartimos sin tu permiso previo.',
        linkText: 'Enviar Perfil Profesional',
        linkHref: '/vacantes'
      }
    ]
  },
  {
    path: '/vacantes',
    title: 'Bolsa de Empleo y Vacantes Activas | Nexo Talentos',
    description: 'Ofertas de empleo y oportunidades ejecutivas en tecnología, finanzas y dirección en España. Salarios transparentes y respuesta ágil.',
    h1: 'Posiciones Directivas &amp; Tech en Selección Activa',
    h2: 'Oportunidades Profesionales con Bandas Salariales Transparentes',
    summaryText: 'Publicamos ofertas de empleo para directores y especialistas técnicos en España. Todas las posiciones cuentan con bandas salariales claras y públicas. Cumplimos las normas europeas de igualdad retributiva. Cuidamos tu tiempo y te damos respuesta en cada fase del proceso.',
    closingText: 'Revisamos todas las candidaturas recibidas con respeto y rigor profesional. Inscríbete en pocos pasos y da un nuevo impulso a tu carrera ejecutiva con Nexo Talentos.',
    h3s: [
      {
        title: 'Puestos de Dirección en Tecnología',
        desc: 'Buscamos directores de tecnología, jefes de sistemas y expertos en nube. Oportunidades en empresas consolidadas y negocios en rápida expansión.',
        linkText: 'Postular a Puestos Tech',
        linkHref: '/contacto'
      },
      {
        title: 'Dirección General y Finanzas',
        desc: 'Posiciones para consejeros delegados y directores financieros. Proyectos de liderazgo empresarial con paquetes de retribución atractivos.',
        linkText: 'Consultar Puestos Directivos',
        linkHref: '/contacto'
      },
      {
        title: 'Sueldos Claros desde el Inicio',
        desc: 'Publicamos el rango fijo y los bonus variables de cada oferta. Sabes lo que puedes ganar antes de hacer la primera entrevista.',
        linkText: 'Ver Estudio Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Privacidad Total de tus Datos',
        desc: 'Protegemos tu identidad en todo momento. No enviamos tu currículum a ninguna empresa sin hablar antes contigo y tener tu visto bueno.',
        linkText: 'Conocer Nuestra Política',
        linkHref: '/contacto'
      },
      {
        title: 'Respuesta en Menos de Dos Días',
        desc: 'Te informamos del estado de tu candidatura con rapidez. Damos consejos útiles a todos los profesionales que pasan por nuestros procesos.',
        linkText: 'Inscribirse a Vacantes',
        linkHref: '/contacto'
      }
    ]
  },
  {
    path: '/guia-salarial',
    title: 'Guía Salarial Directiva y Tech 2026 | Nexo Talentos',
    description: 'Estudio integral de bandas salariales, variables y equity para directores generales, mandos medios y perfiles tech en España en 2026.',
    h1: 'Guía de Compensación Directiva &amp; Tech España 2026',
    h2: 'Bandas Retributivas, Beneficios y Comparativa Internacional',
    summaryText: 'Analizamos los sueldos de directores y perfiles técnicos en España para 2026. Este estudio ayuda a empresas y profesionales a fijar sueldos justos y competitivos. Ofrecemos datos reales de sueldos fijos, bonus y planes de acciones en los sectores con mayor demanda.',
    closingText: 'Usa nuestros datos para negociar con seguridad y retener a los mejores profesionales en tu equipo. Descarga el informe o pide una asesoría salarial personalizada.',
    h3s: [
      {
        title: 'Tablas de Sueldos en Madrid y Barcelona',
        desc: 'Compara lo que cobra un director general o un jefe de tecnología en las principales ciudades de España con datos actualizados este año.',
        linkText: 'Ver Rangos de Salario',
        linkHref: '/contacto'
      },
      {
        title: 'Norma Europea de Igualdad de Sueldos',
        desc: 'Te explicamos las nuevas leyes que obligan a publicar los rangos salariales. Evita sanciones y adapta tu empresa a tiempo con nuestra ayuda.',
        linkText: 'Leer Análisis Normativo',
        linkHref: '/blog'
      },
      {
        title: 'Ahorro con Profesionales en Remoto',
        desc: 'Compara el coste de contratar en España frente a incorporar talento en otros países. Puedes reducir costes a la mitad manteniendo la calidad.',
        linkText: 'Calcular Ahorro de Costes',
        linkHref: '/calculadora-roi'
      },
      {
        title: 'Beneficios Más Pedidos por Directivos',
        desc: 'Conoce los extras más valorados: seguros médicos de familia, planes de formación continua y opciones de trabajo desde casa.',
        linkText: 'Pedir Estudio Personalizado',
        linkHref: '/contacto'
      },
      {
        title: 'Bonus por Objetivos y Acciones',
        desc: 'Cómo diseñar planes de incentivos que motiven a los directivos a cumplir las metas de la empresa a medio y largo plazo.',
        linkText: 'Consultar Asesoría Salarial',
        linkHref: '/contacto'
      }
    ]
  },
  {
    path: '/calculadora-roi',
    title: 'Calculadora de Coste de Vacante y ROI | Nexo Talentos',
    description: 'Calcula cuánto dinero y productividad pierde tu empresa por cada mes que una posición estratégica permanece vacante y descubre tu ROI.',
    h1: 'Calculadora de Coste de Vacante Desierta &amp; ROI',
    h2: 'Cuantifica el Impacto Económico de una Posición Sin Cubrir',
    summaryText: 'Tener un puesto directivo vacío cuesta mucho dinero a tu empresa. No se trata solo del sueldo que dejas de pagar. Una vacante sin cubrir frena ventas, satura al resto del equipo y retrasa proyectos clave. Nuestra calculadora te muestra la cifra exacta en dos minutos.',
    closingText: 'Cerrar tu contratación a tiempo protege los ingresos de tu negocio y la salud de tu equipo. Haz números ahora y comprueba las ventajas de trabajar con Nexo Talentos.',
    h3s: [
      {
        title: 'Coste Diario por Puesto Vacante',
        desc: 'Calculamos el dinero que pierde tu empresa cada día sin ese líder. Multiplicamos el sueldo diario por el valor que aporta el puesto.',
        linkText: 'Acelerar Contratación',
        linkHref: '/proceso'
      },
      {
        title: 'Cierre de la Posición en 18 Días',
        desc: 'Las firmas clásicas tardan tres o cuatro meses. Nosotros te entregamos candidatos en dieciocho días laborables para que ahorres tiempo.',
        linkText: 'Ver Metodología de 18 Días',
        linkHref: '/proceso'
      },
      {
        title: 'Ahorro Real de Miles de Euros',
        desc: 'Al contratar en pocas semanas evitas pérdidas de clientes y sobrecostes. La inversión en nuestro servicio se recupera desde el primer mes.',
        linkText: 'Solicitar Presupuesto',
        linkHref: '/contacto'
      },
      {
        title: 'Menos Estrés para tu Equipo Actual',
        desc: 'Evita que otros directivos se quemen asumiendo tareas dobles. Incorporar al líder adecuado devuelve el ritmo normal a tu compañía.',
        linkText: 'Ver Servicios Directivos',
        linkHref: '/servicios'
      },
      {
        title: 'Inversión Asegurada por Contrato',
        desc: 'Cuentas con garantía de tres a seis meses sin coste extra. Si algo falla, buscamos otro profesional sin cobrar nada más.',
        linkText: 'Conocer Nuestras Garantías',
        linkHref: '/por-que-elegirnos'
      }
    ]
  },
  {
    path: '/blog',
    title: 'Blog de Headhunting y Selección 2026 | Nexo Talentos',
    description: 'Artículos y análisis técnicos sobre selección ejecutiva, jurisprudencia del Art. 43 ET, equidad salarial y adopción de IA en recursos humanos.',
    h1: 'Revista Doctrinal &amp; Tratado Legal 2026',
    h2: 'Análisis Jurídico, Tendencias de Selección y Gestión de Talento',
    summaryText: 'En nuestra revista compartimos análisis útiles para líderes y empresas. Publicamos guías claras sobre derecho laboral, sueldos y gestión de personas. Explicamos las sentencias más recientes de los tribunales con un lenguaje directo y fácil de entender.',
    closingText: 'Aprende a tomar decisiones seguras en la contratación de directivos y protege a tu empresa ante cualquier cambio normativo. Lee todos nuestros artículos gratis.',
    h3s: [
      {
        title: 'Blindaje Legal y Cesión de Trabajadores',
        desc: 'Analizamos el artículo cuarenta y tres de la ley laboral española. Te enseñamos a contratar servicios externos sin riesgos de multas.',
        linkText: 'Leer Artículo Completo',
        linkHref: '/blog'
      },
      {
        title: 'Guía de la Norma Europea de Sueldos',
        desc: 'Cómo adaptar los procesos de selección a las nuevas reglas de transparencia. Fechas clave y pasos a seguir en tu departamento de personas.',
        linkText: 'Consultar Guía Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Uso de Inteligencia Artificial en Selección',
        desc: 'Claves para usar herramientas modernas de evaluación cumpliendo la ley europea. Evita sesgos y elige con datos objetivos.',
        linkText: 'Ver Soluciones de Selección',
        linkHref: '/servicios'
      },
      {
        title: 'Cómo Retener a tus Mejores Líderes',
        desc: 'Consejos prácticos para cuidar el talento clave de tu empresa. Buenas prácticas de motivación, planes de carrera y clima laboral positivo.',
        linkText: 'Conocer Más Consejos',
        linkHref: '/testimonios'
      },
      {
        title: 'Noticias del Mercado Laboral Directivo',
        desc: 'Resúmenes periódicos sobre los puestos más pedidos y las tendencias de sueldos en Madrid, Barcelona y el resto de España.',
        linkText: 'Contactar Editorial',
        linkHref: '/contacto'
      }
    ]
  }
];

function prerender() {
  const distDir = path.resolve(__dirname, '../dist');
  const baseHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(baseHtmlPath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');
  console.log('Iniciando pre-renderizado estático de rutas para SEO A+...');

  // 1. Asegurar que la portada raíz dist/index.html tenga su canónico y hreflang exactos
  let rootHtml = baseHtml;
  if (rootHtml.includes('<link rel="canonical"')) {
    rootHtml = rootHtml.replace(
      /<link rel="canonical" href=".*?" \/>/s,
      `<link rel="canonical" href="${DOMAIN}/" />`
    );
  } else {
    rootHtml = rootHtml.replace(
      '<link rel="alternate" hreflang="es-ES"',
      `<link rel="canonical" href="${DOMAIN}/" />\n    <link rel="alternate" hreflang="es-ES"`
    );
  }
  fs.writeFileSync(baseHtmlPath, rootHtml, 'utf-8');
  console.log('✓ Portada raíz actualizada con canónico exacto: /');

  // 2. Generar cada sub-ruta estática
  for (const route of ROUTES) {
    const routeDir = path.join(distDir, route.path.replace('/', ''));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const routeUrl = `${DOMAIN}${route.path}`;

    let html = baseHtml;

    // A. Reemplazar Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

    // B. Reemplazar Meta Description
    html = html.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${route.description}" />`
    );

    // C. Reemplazar o Inyectar Canonical
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical" href=".*?" \/>/s,
        `<link rel="canonical" href="${routeUrl}" />`
      );
    } else {
      html = html.replace(
        '<link rel="alternate" hreflang="es-ES"',
        `<link rel="canonical" href="${routeUrl}" />\n    <link rel="alternate" hreflang="es-ES"`
      );
    }

    // D. Reemplazar Hreflangs con autoreferencia a la ruta activa
    html = html.replace(
      /<link rel="alternate" hreflang="es-ES" href=".*?" \/>/s,
      `<link rel="alternate" hreflang="es-ES" href="${routeUrl}" />`
    );
    html = html.replace(
      /<link rel="alternate" hreflang="es" href=".*?" \/>/s,
      `<link rel="alternate" hreflang="es" href="${routeUrl}" />`
    );
    html = html.replace(
      /<link rel="alternate" hreflang="x-default" href=".*?" \/>/s,
      `<link rel="alternate" hreflang="x-default" href="${routeUrl}" />`
    );

    // E. Reemplazar Open Graph & Twitter URL/Title/Description
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/s,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/s,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/s,
      `<meta property="og:url" content="${routeUrl}" />`
    );

    // F. Reemplazar el contenido fallback semántico dentro de <div id="root">
    const h3sHtml = route.h3s.map((h) => `
          <h3>${h.title}</h3>
          <p>${h.desc}</p>
          <a href="${h.linkHref}">${h.linkText}</a>`).join('\n');

    const semanticFallback = `
      <!-- Semantic Static Route Fallback for Search Engines, Screaming Frog & AI Bots -->
      <header class="sr-only">
        <h1>${route.h1}</h1>
        <p>${route.description}</p>
        <nav aria-label="Navegación principal">
          <a href="/">Inicio</a>
          <a href="/servicios">Servicios de Selección</a>
          <a href="/proceso">Proceso en 18 Días</a>
          <a href="/vacantes">Ofertas de Empleo</a>
          <a href="/guia-salarial">Guía Salarial 2026</a>
          <a href="/testimonios">Casos de Éxito</a>
          <a href="/por-que-elegirnos">Por Qué Elegirnos</a>
          <a href="/contacto">Contacto Directo</a>
          <a href="/blog">Noticias y Consejos</a>
        </nav>
      </header>
      <main class="sr-only">
        <section>
          <h2>${route.h2}</h2>
          <p>${route.summaryText}</p>
${h3sHtml}
          <p>${route.closingText}</p>
        </section>
      </main>
      <footer class="sr-only">
        <p>&copy; 2026 Nexo Talentos Consultores S.L. Paseo de la Castellana 95, Madrid, España. Teléfono: +34 614 143 763. Correo: info@nexotalento.com. Todos los derechos reservados.</p>
      </footer>
    `;

    // Sustituir el interior de <div id="root">
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${semanticFallback}</div>`
    );

    const outFilePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outFilePath, html, 'utf-8');
    const flatFilePath = path.join(distDir, `${route.path.replace('/', '')}.html`);
    fs.writeFileSync(flatFilePath, html, 'utf-8');
    console.log(`✓ Generada ruta estática única: ${route.path} -> dist${route.path}/index.html & dist${route.path}.html`);
  }

  console.log(`🎉 ¡Pre-renderizado completado exitosamente para ${ROUTES.length} rutas!`);
}

prerender();
