import { JobPosition } from '../types';

export const INITIAL_JOBS: JobPosition[] = [
  {
    id: 'job-jefe-marketing',
    title: 'Jefe de Marketing',
    department: 'Marketing & Comercial',
    location: 'Quito, Ecuador',
    modality: 'Presencial',
    salaryRange: 'USD 1.500 – 2.000',
    experienceLevel: 'Liderazgo / Senior (+4 años)',
    description: 'Empresa de servicios en Ecuador busca un Jefe de Marketing para liderar la estrategia de posicionamiento de marca, impulsar el crecimiento comercial y desarrollar iniciativas innovadoras de marketing digital, orientadas a resultados y generación de oportunidades de negocio.',
    requirements: [
      'Experiencia liderando estrategias de marketing y posicionamiento de marca.',
      'Dominio de marketing digital, redes sociales y campañas publicitarias.',
      'Conocimientos de pauta digital, SEO/SEM y generación de leads.',
      'Planificación y administración de presupuestos de marketing.',
      'Análisis de indicadores de gestión (KPIs), métricas y resultados.',
      'Capacidad para liderar equipos y coordinar agencias o proveedores.'
    ],
    benefits: ['Plan de carrera y desarrollo profesional', 'Excelente clima laboral', 'Beneficios de ley y corporativos'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Activo hoy',
    tags: ['Marketing Digital', 'SEO/SEM', 'Leads', 'Quito', 'Ecuador', 'Presencial'],
    hot: true
  },
  {
    id: 'job-asistente-contable',
    title: 'Asistente Contable',
    department: 'Finanzas & Contabilidad',
    location: 'Quito / Valle de los Chillos, Ecuador',
    modality: 'Presencial',
    salaryRange: 'USD 600 – 700',
    experienceLevel: 'Mínimo 3 años (Indispensable)',
    description: 'Empresa de servicios ubicada en el Valle de los Chillos (Quito) busca incorporar un Asistente Contable con experiencia en gestión de procesos contables, capacidad analítica y orientación al detalle. Profesional organizado, proactivo y con disponibilidad inmediata.',
    requirements: [
      'Experiencia comprobable en procesos y registros contables.',
      'Manejo de conciliaciones bancarias y cuentas por pagar y cobrar.',
      'Registro y revisión de facturas y comprobantes.',
      'Manejo de retenciones e impuestos.',
      'Apoyo en cierres y reportes contables.',
      'Manejo de herramientas informáticas y sistemas contables.',
      'Disponibilidad inmediata para integrarse al equipo.'
    ],
    benefits: ['Estabilidad laboral inmediata', 'Beneficios de ley', 'Buen ambiente de trabajo'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Activo hoy',
    tags: ['Contabilidad', 'Conciliaciones', 'Impuestos', 'Valle de los Chillos', 'Quito', 'Ecuador'],
    hot: true
  },
  {
    id: 'job-asesor-nuevos-negocios',
    title: 'Asesor de Nuevos Negocios (Sector Carga Internacional)',
    department: 'Logística & Comercio Exterior',
    location: 'Quito, Ecuador',
    modality: 'Presencial',
    salaryRange: 'A convenir (según experiencia y cartera)',
    experienceLevel: 'Mínimo 4 años (Sector Carga / Logística)',
    description: 'Empresa del sector de logística y carga internacional busca incorporar un Asesor de Nuevos Negocios con visión estratégica y fuerte orientación comercial, capaz de desarrollar oportunidades de negocio, estructurar y potenciar el área comercial y generar relaciones con clientes corporativos.',
    requirements: [
      'Experiencia comercial comprobable en carga internacional, freight forwarding o logística.',
      'Cartera de clientes activa y contactos comerciales en el sector.',
      'Capacidad para estructurar, desarrollar y potenciar el área comercial.',
      'Experiencia en prospección, apertura de mercados y generación de nuevos negocios.',
      'Habilidades de negociación, cierre de ventas y gestión de cuentas corporativas.',
      'Capacidad para identificar oportunidades y desarrollar relaciones comerciales a largo plazo.',
      'Orientación a resultados y cumplimiento de objetivos comerciales.'
    ],
    benefits: ['Atractivo esquema de ingresos según cartera', 'Bonificaciones por metas comerciales', 'Oportunidad de desarrollo corporativo'],
    isFeatured: true,
    isUrgent: false,
    postedDate: 'Activo hoy',
    tags: ['Carga Internacional', 'Freight Forwarding', 'Logística', 'B2B', 'Quito', 'Ecuador'],
    hot: true
  },
  {
    id: 'job-asesor-comercial-corporativo',
    title: 'Asesor Comercial Corporativo',
    department: 'Ventas & Desarrollo de Negocios',
    location: 'Guayaquil, Ecuador',
    modality: 'Presencial',
    salaryRange: 'A convenir + Comisiones',
    experienceLevel: 'Senior Comercial (+3 años B2B)',
    description: 'Empresa busca incorporar un Asesor Comercial para la ciudad de Guayaquil, con experiencia en comercialización de productos y desarrollo de negocios en el segmento corporativo. Se valorará especialmente la trayectoria en el sector tecnológico y cartera de clientes consolidada.',
    requirements: [
      'Experiencia comprobable en ventas comerciales y desarrollo de negocios.',
      'Cartera de clientes activa en el sector corporativo (indispensable).',
      'Se valorará experiencia en comercialización de productos tecnológicos.',
      'Manejo de clientes empresariales y negociación B2B.',
      'Habilidad para identificar oportunidades, captar nuevos clientes y cerrar negocios.',
      'Orientación al cumplimiento de objetivos y resultados comerciales.',
      'Disponibilidad para trabajar presencialmente en Guayaquil.'
    ],
    benefits: ['Sueldo base a convenir + atractivo esquema de comisiones sin techo', 'Plan de desarrollo profesional', 'Beneficios de ley y corporativos'],
    isFeatured: true,
    isUrgent: false,
    postedDate: 'Activo hoy',
    tags: ['Ventas B2B', 'Tecnología', 'Comercial', 'Guayaquil', 'Ecuador', 'Presencial'],
    hot: true
  },
  {
    id: 'job-1',
    title: 'Chief Technology Officer (CTO) & VP of Engineering',
    department: 'Tecnología & Producto',
    location: 'Madrid / Híbrido (2 días)',
    modality: 'Híbrido',
    salaryRange: '110.000 € – 150.000 € + Stock Options',
    experienceLevel: 'C-Level (+10 años)',
    description: 'Scaleup fintech en fase Serie B busca CTO para liderar un equipo distribuido de 45 ingenieros, modernizar arquitectura cloud en AWS/Kubernetes y escalar la infraestructura transaccional de pagos.',
    requirements: [
      'Experiencia demostrable como CTO, VP Engineering o Head of Tech.',
      'Dominio de arquitecturas distribuidas de microservicios y alta disponibilidad.',
      'Liderazgo de personas, cultura ágil y retención de talento de ingeniería.'
    ],
    benefits: ['Equity / Stock Options', 'Seguro Médico Familiar Sanitas', 'Presupuesto formativo 4.000€/año'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Hace 1 día',
    tags: ['C-Level', 'Fintech', 'AWS', 'Kubernetes', 'Madrid'],
    hot: true
  },
  {
    id: 'job-2',
    title: 'Head of Artificial Intelligence & Generative Models',
    department: 'Inteligencia Artificial & Datos',
    location: 'Barcelona / Remoto España',
    modality: '100% Remoto',
    salaryRange: '90.000 € – 130.000 € + Bonus',
    experienceLevel: 'Director / Lead (+7 años)',
    description: 'Compañía multinacional de software B2B busca líder para crear la división de agentes de IA generativa, optimización de LLMs y automatización de procesos corporativos.',
    requirements: [
      'Track record en despliegue de modelos de IA / LLMs en producción.',
      'Conocimientos de Python, PyTorch, LangChain, RAG y arquitecturas cloud.',
      'Visión estratégica para monetizar soluciones de IA en clientes Enterprise.'
    ],
    benefits: ['100% Remoto en España', 'Horario 100% flexible', 'Bonus anual 20%'],
    isFeatured: true,
    isUrgent: false,
    postedDate: 'Hace 2 días',
    tags: ['IA Generativa', 'LLMs', 'Python', 'Remoto', 'Barcelona'],
    hot: true
  },
  {
    id: 'job-3',
    title: 'Chief Financial Officer (CFO / Director Financiero)',
    department: 'Finanzas & Legal',
    location: 'Madrid (Castellana)',
    modality: 'Presencial',
    salaryRange: '95.000 € – 140.000 € + 25% Variable',
    experienceLevel: 'C-Level (+10 años)',
    description: 'Grupo industrial en expansión internacional requiere CFO para liderar rondas de financiación, control de gestión, relación con banca y comités de auditoría.',
    requirements: [
      'Experiencia como Director Financiero o Senior Controller Corporativo.',
      'Sólido conocimiento en M&A, reporting bajo IFRS y estructuración fiscal.',
      'Nivel de inglés C1/C2 de negociación.'
    ],
    benefits: ['Vehículo de empresa', 'Plan de pensiones corporativo', 'Retribución flexible completa'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Hace 3 días',
    tags: ['CFO', 'Finanzas', 'M&A', 'Madrid'],
    hot: false
  },
  {
    id: 'job-4',
    title: 'Director Comercial & Business Development B2B',
    department: 'Ventas & Expansión',
    location: 'Madrid / Barcelona / Valencia',
    modality: 'Híbrido',
    salaryRange: '75.000 € – 110.000 € + Comisiones (40%)',
    experienceLevel: 'Senior / Director (+6 años)',
    description: 'Empresa SaaS B2B en pleno crecimiento busca líder comercial para estructurar el equipo de ventas directas y partners en España, Portugal e Italia.',
    requirements: [
      'Experiencia contrastada en venta consultiva B2B y ciclo largo Enterprise.',
      'Capacidad de apertura de cuentas clave y negociación con C-Levels.',
      'Liderazgo de equipos comerciales y metodología outbound/inbound.'
    ],
    benefits: ['Comisiones sin techo', 'Coche de empresa + Tarjeta gastos', 'Seguro médico'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 4 días',
    tags: ['Ventas B2B', 'SaaS', 'Híbrido', 'Comercial'],
    hot: false
  },
  {
    id: 'job-5',
    title: 'Senior Cloud & DevOps Architect (AWS / Terraform)',
    department: 'Infraestructura & Cloud',
    location: '100% Remoto España',
    modality: '100% Remoto',
    salaryRange: '65.000 € – 85.000 € Bruto Anual',
    experienceLevel: 'Senior (+5 años)',
    description: 'Diseño e implementación de infraestructura como código (IaC), pipelines CI/CD automatizados y clusters multi-región Kubernetes de alta tolerancia a fallos.',
    requirements: [
      'Certificaciones AWS Solutions Architect o similar.',
      'Dominio de Terraform, Docker, Kubernetes, Prometheus y Grafana.',
      'Experiencia en observabilidad y compliance de seguridad.'
    ],
    benefits: ['100% Remoto', 'Jornada intensiva los viernes', 'Ticket guardería y restaurant'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 5 días',
    tags: ['DevOps', 'AWS', 'Terraform', 'Kubernetes', 'Remoto'],
    hot: true
  },
  {
    id: 'job-6',
    title: 'Director de Recursos Humanos / Chief People Officer',
    department: 'People & Talent',
    location: 'Barcelona / Híbrido',
    modality: 'Híbrido',
    salaryRange: '70.000 € – 95.000 € + Bonus',
    experienceLevel: 'Director (+7 años)',
    description: 'Liderar la estrategia de captación, cultura y desarrollo de talento en una compañía de 300+ empleados en transformación digital.',
    requirements: [
      'Experiencia liderando departamentos de RRHH / People en España.',
      'Conocimiento en planes de carrera, evaluación 360 y retribución flexible.',
      'Dominio de la legislación laboral española (compliance y planes de igualdad).'
    ],
    benefits: ['Flexibilidad total', 'Seguro médico privado', 'Presupuesto de formación'],
    isFeatured: false,
    isUrgent: false,
    postedDate: 'Hace 6 días',
    tags: ['RRHH', 'People', 'Cultura', 'Barcelona'],
    hot: false
  }
];
