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
  h3s: { title: string; desc: string; linkText: string; linkHref: string }[];
  summaryText: string;
}

const DOMAIN = 'https://nexotalentos.vercel.app';

const ROUTES: RouteMetadata[] = [
  {
    path: '/servicios',
    title: 'Servicios de Headhunting y Selección | Nexo Talentos',
    description: 'Servicios de Executive Search, selección de mandos intermedios y talento tech en Madrid y Barcelona. Terna en 18 días hábiles garantizada.',
    h1: 'Servicios de Executive Search &amp; Headhunting en España',
    h2: 'Catálogo de Soluciones de Contratación Directiva y Tecnológica',
    summaryText: 'En Nexo Talentos ofrecemos soluciones integrales para cubrir puestos directivos, posiciones técnicas y perfiles internacionales con la máxima rapidez y total seguridad jurídica.',
    h3s: [
      {
        title: 'Executive Search y Alta Dirección',
        desc: 'Identificamos directores generales, consejeros y miembros del comité de dirección con visión estratégica y liderazgo probado.',
        linkText: 'Solicitar Executive Search',
        linkHref: '/contacto'
      },
      {
        title: 'Selección de Perfiles Tecnológicos e IA',
        desc: 'Reclutamos directores de tecnología, ingenieros de software y expertos en inteligencia artificial con evaluación técnica rigurosa.',
        linkText: 'Ver Soluciones Tech',
        linkHref: '/contacto'
      },
      {
        title: 'Selección de Mandos Intermedios',
        desc: 'Cubrimos puestos de responsabilidad operativa y mandos medios que impulsan la ejecución del plan estratégico de tu compañía.',
        linkText: 'Consultar Mandos Medios',
        linkHref: '/contacto'
      },
      {
        title: 'Talento Nearshore en Latinoamérica',
        desc: 'Accede a talento bilingüe de alto nivel en Latinoamérica con compatibilidad horaria y optimización de costes salariales.',
        linkText: 'Ver Opciones Nearshore',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Garantía de Sustitución Contractual',
        desc: 'Cada proceso cuenta con un periodo de garantía de tres a seis meses con reposición sin ningún coste extra para tu empresa.',
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
    summaryText: 'Aportamos tranquilidad, velocidad y rigor a los directores de recursos humanos y comités de dirección que necesitan incorporar líderes sin asumir riesgos.',
    h3s: [
      {
        title: 'Entrega de Terna en 18 Días Hábiles',
        desc: 'Nuestro modelo de trabajo reduce los plazos tradicionales de selección a solo dieciocho días laborables con candidatos calificados.',
        linkText: 'Ver Nuestro Proceso Ágil',
        linkHref: '/proceso'
      },
      {
        title: 'Blindaje Legal Total según Art. 43 ET',
        desc: 'Protegemos tu empresa ante riesgos de cesión ilegal de trabajadores con contratos blindados y asesoramiento laboral integral.',
        linkText: 'Leer Sobre Blindaje Legal',
        linkHref: '/blog'
      },
      {
        title: 'Garantía Real de Reposición Sin Coste',
        desc: 'Si el candidato no supera el periodo acordado de tres a seis meses, activamos una nueva búsqueda inmediata sin coste.',
        linkText: 'Consultar Condiciones',
        linkHref: '/contacto'
      },
      {
        title: 'Evaluación Técnica con Inteligencia Artificial',
        desc: 'Analizamos habilidades duras y blandas con herramientas analíticas modernas para predecir el éxito y ajuste cultural del profesional.',
        linkText: 'Ver Herramientas IA',
        linkHref: '/servicios'
      },
      {
        title: 'Confidencialidad Absoluta en Cada Búsqueda',
        desc: 'Gestionamos búsquedas reservadas y sustituciones sensibles con estricto acuerdo de confidencialidad y máxima discreción.',
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
    summaryText: 'Descubre los resultados auditados de empresas que han acelerado su crecimiento contratando talento directivo y técnico con el apoyo de Nexo Talentos.',
    h3s: [
      {
        title: 'Contratación de CTO para Scaleup Fintech',
        desc: 'Presentamos una terna de directores de tecnología en Madrid en solo doce días hábiles, logrando un cierre exitoso y duradero.',
        linkText: 'Ver Ofertas Tecnológicas',
        linkHref: '/vacantes'
      },
      {
        title: 'Director de Operaciones en Sector Industrial',
        desc: 'Identificamos un líder industrial con experiencia internacional en Valencia para liderar una fábrica de trescientas personas.',
        linkText: 'Ver Servicios Industriales',
        linkHref: '/servicios'
      },
      {
        title: 'Equipo de Ingeniería Remoto en Latinoamérica',
        desc: 'Una empresa de software española contrató cinco ingenieros sénior en remoto con un ahorro del cincuenta por ciento en costes.',
        linkText: 'Calcular Ahorro Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Directora Financiera para Grupo Sanitario',
        desc: 'Cubrimos una vacante clave de dirección financiera en Barcelona en dieciséis días, garantizando continuidad en la gestión de tesorería.',
        linkText: 'Pedir Propuesta Directiva',
        linkHref: '/contacto'
      },
      {
        title: 'Opiniones sobre la Rapidez de Respuesta',
        desc: 'El noventa y cuatro por ciento de nuestros clientes destaca la cercanía, transparencia y velocidad de entrega del equipo consultor.',
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
    summaryText: 'Nuestro método combina análisis exhaustivo del mercado laboral, contacto directo con talento pasivo y entrevistas por competencias contrastadas.',
    h3s: [
      {
        title: 'Fase 1: Definición del Perfil y Estrategia',
        desc: 'En las primeras cuarenta y ocho horas definimos los requisitos técnicos, estilo de liderazgo y objetivos estratégicos de la posición.',
        linkText: 'Ver Guía Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Fase 2: Mapeo y Búsqueda Activa',
        desc: 'Contactamos directamente con profesionales en activo que no buscan trabajo activamente pero están abiertos a proyectos superiores.',
        linkText: 'Ver Vacantes Activas',
        linkHref: '/vacantes'
      },
      {
        title: 'Fase 3: Evaluación y Entrevistas por Competencias',
        desc: 'Validamos trayectoria profesional, logros medibles, referencias cruzadas y compatibilidad con los valores de tu empresa.',
        linkText: 'Ver Criterios de Evaluación',
        linkHref: '/servicios'
      },
      {
        title: 'Fase 4: Presentación de la Terna Final',
        desc: 'El día dieciocho entregamos un informe comparativo completo con los tres mejores candidatos finalistas listos para entrevista.',
        linkText: 'Solicitar Presupuesto',
        linkHref: '/contacto'
      },
      {
        title: 'Fase 5: Oferta, Cierre y Acompañamiento',
        desc: 'Asesoramos en la negociación salarial, facilitamos la incorporación y realizamos seguimiento durante los primeros seis meses.',
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
    summaryText: 'Estamos a tu disposición en nuestros despachos de Madrid y Barcelona o a través de nuestros canales digitales para iniciar tu proceso con rapidez.',
    h3s: [
      {
        title: 'Sede Central en Madrid',
        desc: 'Ubicados en Paseo de la Castellana noventa y cinco, en el distrito financiero de la capital. Teléfono directo de atención disponible.',
        linkText: 'Pedir Cita en Madrid',
        linkHref: '/contacto'
      },
      {
        title: 'Oficina Comercial en Barcelona',
        desc: 'Nuestras instalaciones en Avinguda Diagonal atienden a empresas tecnológicas, industriales y del sector servicios de Cataluña.',
        linkText: 'Pedir Cita en Barcelona',
        linkHref: '/contacto'
      },
      {
        title: 'Atención Rápida por WhatsApp Corporativo',
        desc: 'Comunícate de forma ágil con un consultor sénior por mensaje directo para resolver dudas inmediatas en menos de dos horas.',
        linkText: 'Abrir Chat WhatsApp',
        linkHref: '/contacto'
      },
      {
        title: 'Compromiso de Respuesta en Veinticuatro Horas',
        desc: 'Revisamos cada solicitud recibida y te asignamos un consultor especializado en tu sector el mismo día laborable.',
        linkText: 'Enviar Formulario',
        linkHref: '/contacto'
      },
      {
        title: 'Envío de Currículum para Candidatos',
        desc: 'Si eres directivo o especialista en tecnología y buscas nuevos retos, añade tu candidatura a nuestra red privada de talento.',
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
    summaryText: 'Consulta nuestras ofertas de empleo vigentes para puestos directivos y mandos técnicos en Madrid, Barcelona y opciones de trabajo cien por cien remoto.',
    h3s: [
      {
        title: 'Dirección de Tecnología y Arquitectura Cloud',
        desc: 'Buscamos directores de tecnología, líderes de ingeniería y expertos en plataformas en la nube para empresas consolidadas.',
        linkText: 'Postular a Puestos Tech',
        linkHref: '/contacto'
      },
      {
        title: 'Dirección General y Consejeros Delegados',
        desc: 'Oportunidades para líderes ejecutivos con experiencia en planes de expansión, transformación digital y comités de dirección.',
        linkText: 'Consultar Puestos Directivos',
        linkHref: '/contacto'
      },
      {
        title: 'Transparencia Retributiva Garantizada',
        desc: 'Todas nuestras vacantes detallan el rango salarial fijo y variable conforme a la directiva europea de igualdad retributiva.',
        linkText: 'Ver Estudio Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Privacidad y Confidencialidad del Candidato',
        desc: 'Protegemos tu identidad profesional y no compartimos tus datos con ninguna empresa sin tu autorización previa y expresa.',
        linkText: 'Conocer Nuestra Política',
        linkHref: '/contacto'
      },
      {
        title: 'Procesos Ágiles con Respuesta Continua',
        desc: 'Mantenemos informados a todos los candidatos en cada fase de la selección con comentarios constructivos sobre su candidatura.',
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
    summaryText: 'Analizamos las tendencias de retribución en el mercado español con datos contrastados de salarios brutos anuales, bonus variables y opciones sobre acciones.',
    h3s: [
      {
        title: 'Salarios en Madrid y Barcelona',
        desc: 'Compara las tablas salariales de directores generales, directores financieros y líderes de tecnología en las dos principales capitales.',
        linkText: 'Ver Rangos de Salario',
        linkHref: '/contacto'
      },
      {
        title: 'Impacto de la Directiva Europea de Transparencia',
        desc: 'Conoce las obligaciones normativas para empresas sobre publicación de bandas salariales y justificación de diferencias retributivas.',
        linkText: 'Leer Análisis Normativo',
        linkHref: '/blog'
      },
      {
        title: 'Ahorro Estratégico con Talento en Latinoamérica',
        desc: 'Analiza la diferencia de coste laboral entre contratar perfiles sénior en España versus equipos cualificados en modalidad remota.',
        linkText: 'Calcular Ahorro de Costes',
        linkHref: '/calculadora-roi'
      },
      {
        title: 'Paquetes de Compensación Flexible',
        desc: 'Descubre los beneficios más valorados por los altos directivos: seguros de salud familiares, formación ejecutiva y teletrabajo.',
        linkText: 'Pedir Estudio Personalizado',
        linkHref: '/contacto'
      },
      {
        title: 'Variables y Opciones de Acciones (Stock Options)',
        desc: 'Estructuras habituales de incentivos a medio y largo plazo para fidelizar el talento directivo en empresas de alto crecimiento.',
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
    summaryText: 'Tener una posición clave o directiva desierta no supone un ahorro: reduce los ingresos, sobrecarga al equipo actual y frena tus proyectos estratégicos.',
    h3s: [
      {
        title: 'Coste Diario por Puesto Vacante',
        desc: 'Calculamos el impacto directo sobre la facturación de tu compañía multiplicando el salario diario por el factor de contribución.',
        linkText: 'Acelerar Contratación',
        linkHref: '/proceso'
      },
      {
        title: 'Reducción de Tiempo de Selección a 18 Días',
        desc: 'Frente a los tres o cuatro meses habituales del sector, nuestro servicio de selección reduce los días de espera en más de un sesenta por ciento.',
        linkText: 'Ver Metodología de 18 Días',
        linkHref: '/proceso'
      },
      {
        title: 'Ahorro Económico Estimado para Tu Empresa',
        desc: 'Descubre cuántos miles de euros ahorras al cerrar la contratación en menos de tres semanas con una terna de candidatos validados.',
        linkText: 'Solicitar Presupuesto',
        linkHref: '/contacto'
      },
      {
        title: 'Prevención de Pérdidas de Facturación',
        desc: 'Evita perder clientes, oportunidades de mercado o entregas de producto debido a la falta de liderazgo operativo en tu equipo.',
        linkText: 'Ver Servicios Directivos',
        linkHref: '/servicios'
      },
      {
        title: 'Garantía Contractual que Protege Tu Inversión',
        desc: 'Tu inversión está totalmente asegurada con nuestras cláusulas de reposición gratuita de tres a seis meses de duración.',
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
    summaryText: 'Publicamos artículos técnicos y análisis de jurisprudencia laboral para directores generales, consejeros y responsables de recursos humanos en España.',
    h3s: [
      {
        title: 'Blindaje Legal y Cesión Ilegal según el Artículo 43 del Estatuto de los Trabajadores',
        desc: 'Análisis detallado de las sentencias judiciales recientes del Tribunal Supremo sobre contratación de servicios externos y responsabilidades.',
        linkText: 'Leer Artículo Completo',
        linkHref: '/blog'
      },
      {
        title: 'Guía Práctica sobre la Directiva Europea de Transparencia Retributiva',
        desc: 'Cómo adaptar los procesos de selección y las tablas de sueldos antes de la fecha límite fijada por la normativa comunitaria.',
        linkText: 'Consultar Guía Salarial',
        linkHref: '/guia-salarial'
      },
      {
        title: 'Reglamento Europeo de Inteligencia Artificial en Selección de Personal',
        desc: 'Claves para utilizar herramientas de selección automatizada cumpliendo los requisitos de sistemas de alto riesgo de la Unión Europea.',
        linkText: 'Ver Soluciones de Selección',
        linkHref: '/servicios'
      },
      {
        title: 'Estrategias de Retención de Talento Directivo en Mercados Competitivos',
        desc: 'Buenas prácticas para diseñar planes de carrera, esquemas de equidad y culturas empresariales que minimizan la rotación no deseada.',
        linkText: 'Conocer Más Consejos',
        linkHref: '/testimonios'
      },
      {
        title: 'Novedades y Actualizaciones del Mercado Laboral Ejecutivo',
        desc: 'Mantente al día con nuestros resúmenes mensuales sobre salarios, sectores con mayor demanda y evolución del empleo de alta cualificación.',
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
  if (!rootHtml.includes('<link rel="canonical"')) {
    rootHtml = rootHtml.replace(
      '<link rel="alternate" hreflang="es-ES"',
      `<link rel="canonical" href="${DOMAIN}/" />\n    <link rel="alternate" hreflang="es-ES"`
    );
    fs.writeFileSync(baseHtmlPath, rootHtml, 'utf-8');
    console.log('✓ Portada raíz actualizada con canónico exacto: /');
  }

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
        </section>
      </main>
      <footer class="sr-only">
        <p>&copy; 2026 Nexo Talentos Consultores S.L. Paseo de la Castellana 95, Madrid, España. Teléfono: +34 614 143 763. Correo: info@nexotalentos.com. Todos los derechos reservados.</p>
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
