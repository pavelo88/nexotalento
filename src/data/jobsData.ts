import { JobPosition } from '../types';

export const INITIAL_JOBS: JobPosition[] = [
  {
    id: 'job-jefe-marketing',
    title: 'Jefe de Marketing',
    department: 'Marketing & Comercial',
    location: 'Quito, Ecuador / Modalidad presencial',
    modality: 'Presencial',
    salaryRange: 'USD 1.500 – 2.000',
    experienceLevel: 'Experiencia en Marketing Digital y liderazgo estratégico',
    description: 'Empresa de servicios en Ecuador busca un Jefe de Marketing para liderar la estrategia de posicionamiento de marca, impulsar el crecimiento comercial y desarrollar iniciativas innovadoras de marketing digital, orientadas a resultados y generación de oportunidades de negocio.',
    requirements: [
      'Experiencia liderando estrategias de marketing y posicionamiento de marca.',
      'Dominio de marketing digital, redes sociales y campañas publicitarias.',
      'Conocimientos de pauta digital, SEO/SEM y generación de leads.',
      'Planificación y administración de presupuestos de marketing.',
      'Análisis de indicadores de gestión (KPIs), métricas y resultados.',
      'Capacidad para liderar equipos y coordinar agencias o proveedores.'
    ],
    benefits: ['Beneficios de ley', 'Plan de desarrollo y crecimiento profesional', 'Excelente clima laboral'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Proceso Activo',
    tags: ['Marketing Digital', 'Posicionamiento', 'SEO/SEM', 'Leads', 'Quito', 'Presencial'],
    hot: true
  },
  {
    id: 'job-asistente-contable',
    title: 'Asistente Contable',
    department: 'Finanzas & Contabilidad',
    location: 'Quito / Valle de los Chillos – Modalidad presencial',
    modality: 'Presencial',
    salaryRange: 'USD 600 – 700',
    experienceLevel: 'Mínimo 3 años en procesos contables (indispensable)',
    description: 'Empresa de servicios ubicada en el Valle de los Chillos (Quito) busca incorporar un Asistente Contable con experiencia en gestión de procesos contables, capacidad analítica y orientación al detalle. Buscamos un profesional organizado, proactivo y con disponibilidad inmediata para integrarse al equipo.',
    requirements: [
      'Experiencia comprobable en procesos y registros contables.',
      'Manejo de conciliaciones bancarias y cuentas por pagar y cobrar.',
      'Registro y revisión de facturas y comprobantes.',
      'Manejo de retenciones e impuestos.',
      'Apoyo en cierres y reportes contables.',
      'Manejo de herramientas informáticas y sistemas contables.',
      'Disponibilidad inmediata.'
    ],
    benefits: ['Disponibilidad inmediata', 'Beneficios de ley y estabilidad', 'Buen ambiente de trabajo'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Proceso Activo',
    tags: ['Contabilidad', 'Conciliaciones', 'Retenciones', 'Impuestos', 'Valle de los Chillos', 'Quito'],
    hot: true
  },
  {
    id: 'job-asesor-nuevos-negocios',
    title: 'Asesor de Nuevos Negocios (Sector carga internacional)',
    department: 'Logística & Carga Internacional',
    location: 'Quito / Ecuador',
    modality: 'Presencial',
    salaryRange: 'A convenir, según experiencia, trayectoria y cartera de clientes',
    experienceLevel: 'Mínimo 4 años en el sector de carga y logística internacional (indispensable)',
    description: 'Empresa del sector de logística y carga internacional busca incorporar un Asesor de Nuevos Negocios con visión estratégica y fuerte orientación comercial, capaz de desarrollar oportunidades de negocio, estructurar y potenciar el área comercial y generar nuevas relaciones con clientes corporativos. Buscamos un profesional con experiencia en el sector, habilidades de negociación y una cartera de clientes activa que le permita impulsar el crecimiento y posicionamiento de la compañía en el mercado.',
    requirements: [
      'Experiencia comercial comprobable en carga internacional, freight forwarding o logística.',
      'Cartera de clientes activa y contactos comerciales en el sector.',
      'Capacidad para estructurar, desarrollar y potenciar el área comercial.',
      'Experiencia en prospección, apertura de mercados y generación de nuevos negocios.',
      'Habilidades de negociación, cierre de ventas y gestión de cuentas corporativas.',
      'Capacidad para identificar oportunidades y desarrollar relaciones comerciales a largo plazo.',
      'Orientación a resultados y cumplimiento de objetivos comerciales.'
    ],
    benefits: ['Esquema según experiencia y cartera', 'Oportunidades de crecimiento y liderazgo comercial', 'Proyección corporativa'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Proceso Activo',
    tags: ['Carga Internacional', 'Freight Forwarding', 'Cartera Activa', 'Logística', 'B2B', 'Quito'],
    hot: true
  },
  {
    id: 'job-asesor-comercial-corporativo',
    title: 'Asesor Comercial Corporativo',
    department: 'Ventas & Sector Tecnológico',
    location: 'Guayaquil, Ecuador / Modalidad presencial',
    modality: 'Presencial',
    salaryRange: 'A convenir, según experiencia y trayectoria + esquema de comisiones',
    experienceLevel: 'Experiencia en ventas de productos, preferiblemente en el sector tecnológico',
    description: 'Empresa busca incorporar un Asesor Comercial para la ciudad de Guayaquil, con experiencia en comercialización de productos y desarrollo de negocios en el segmento corporativo. Se valorará especialmente la trayectoria en el sector tecnológico y la capacidad para generar nuevas oportunidades comerciales a través de una cartera de clientes consolidada. Buscamos un profesional con habilidades de negociación, orientación a resultados y capacidad para desarrollar relaciones comerciales de largo plazo con empresas.',
    requirements: [
      'Experiencia comprobable en ventas comerciales y desarrollo de negocios.',
      'Cartera de clientes activa en el sector corporativo (indispensable).',
      'Se valorará experiencia en comercialización de productos tecnológicos.',
      'Manejo de clientes empresariales y negociación B2B.',
      'Habilidad para identificar oportunidades, captar nuevos clientes y cerrar negocios.',
      'Orientación al cumplimiento de objetivos y resultados comerciales.',
      'Disponibilidad para trabajar presencialmente en Guayaquil.'
    ],
    benefits: ['Sueldo base a convenir + Comisiones', 'Cartera corporativa', 'Desarrollo en sector tecnológico'],
    isFeatured: true,
    isUrgent: true,
    postedDate: 'Proceso Activo',
    tags: ['Ventas B2B', 'Sector Tecnológico', 'Cartera Corporativa', 'Comisiones', 'Guayaquil', 'Presencial'],
    hot: true
  }
];
