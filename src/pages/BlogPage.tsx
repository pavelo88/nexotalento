import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PageRoute } from '../types';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Scale, 
  Euro, 
  Sparkles, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileText, 
  TrendingUp, 
  Building2, 
  Users, 
  FileCheck,
  Share2,
  Bookmark,
  ExternalLink,
  Flame,
  Award,
  Layers,
  MessageSquare
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: PageRoute) => void;
  onOpenAIAgent: (agentType?: 'headhunter' | 'evaluator' | 'salary' | 'advisor') => void;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'legal' | 'compensation' | 'ai' | 'strategy';
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  highlightBadge: string;
  summary: string;
  imageUrl: string;
  contentSections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    callout?: {
      type: 'warning' | 'info' | 'success';
      title: string;
      text: string;
    };
    quote?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  customCTA?: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  tags: string[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenAIAgent }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Interactive Retribución Flexible Calculator State in Article 2
  const [grossSalaryCalc, setGrossSalaryCalc] = useState<number>(75000);
  const [mealTicketCalc, setMealTicketCalc] = useState<number>(220); // 11€/day * 20 days
  const [healthInsuranceCalc, setHealthInsuranceCalc] = useState<number>(100); // 50€ * 2 members
  const [kindergartenCalc, setKindergartenCalc] = useState<number>(300);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticleId]);

  // Magazine Articles Database
  const articles: Article[] = [
    {
      id: 'fin-del-especialista-orquestadores-2027',
      slug: 'fin-del-especialista-orquestadores-2027',
      title: '🚀 El fin del "Especialista": Por qué en 2027 tu empresa necesita contratar "Orquestadores"',
      subtitle: 'La IA generativa ha comoditizado la ejecución pura. La solución para mantener la competitividad radica en un nuevo estándar de contratación.',
      category: 'strategy',
      categoryLabel: 'Estrategia de Talento',
      readTime: '4 min de lectura',
      date: 'Septiembre 2026',
      author: 'Equipo Nexotalento',
      authorRole: 'Consultoría Estratégica',
      authorAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&q=80',
      highlightBadge: 'Tendencias 2027',
      summary: 'El escenario ha cambiado de forma irreversible. El problema de RRHH en 2027 no es la escasez de talento, es la parálisis por fricción tecnológica.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      tags: ['IA', 'Futuro del Trabajo', 'Talento 2027', 'Orquestadores'],
      customCTA: {
        title: '¿Listo para actualizar el ADN de tu equipo?',
        description: 'No dejes que tu empresa opere con el talento del ayer. Hablemos hoy.',
        primaryButton: 'Agenda una Auditoría de Talento Gratuita de 15 Minutos',
        secondaryButton: 'Descarga nuestra Matriz de Habilidades 2027 para RRHH'
      },
      contentSections: [
        {
          heading: 'El escenario ha cambiado de forma irreversible',
          paragraphs: [
            'Hasta hace poco, las empresas estructuraban sus nóminas buscando talento hiperespecializado: el programador que memorizaba frameworks, el copywriter con ortografía impecable o el analista financiero que dominaba macros de Excel.',
            'Hoy, la inteligencia artificial generativa ha comoditizado la ejecución pura. Si el valor principal de tu empleado es "producir texto" o "escribir código repetitivo", tu estructura de costos está compitiendo directamente contra agentes autónomos que trabajan 24/7.'
          ],
          quote: '"El problema de los departamentos de RRHH en 2027 no es la escasez de talento, es la parálisis por fricción tecnológica. Están contratando humanos para competir contra la IA, en lugar de contratar humanos para dirigirla."'
        },
        {
          heading: '⚖️ El Cambio de Paradigma: 2024 vs. 2027',
          paragraphs: [
            'La solución para mantener la competitividad radica en un nuevo estándar de contratación. Te presentamos al Profesional Híbrido u Orquestador.'
          ],
          table: {
            headers: ['Habilidad Tradicional (En declive)', 'La Nueva Demanda (El Orquestador)', 'El Impacto en tu Empresa'],
            rows: [
              ['Especialización Única', 'Flexibilidad Cognitiva', 'Adaptación inmediata a nuevas herramientas sin resistencia.'],
              ['Creación desde Cero', 'Curaduría y Auditoría de IA', 'Reducción de tiempos de entrega de semanas a horas.'],
              ['Programación Memorística', 'Orquestación No-Code/Low-Code', 'Automatización de procesos internos sin depender de TI.'],
              ['Gramática / Traducción', 'Empatía y Comunicación Transcultural', 'Cierres de ventas y liderazgo global efectivos.']
            ]
          }
        },
        {
          heading: 'Las 3 Habilidades Críticas del Perfil Híbrido',
          subheading: 'Para que tu empresa no se quede atrás, estos son los tres pilares que evaluamos en la nueva generación de talento:',
          paragraphs: [
            '1. Flexibilidad Cognitiva (La Nueva Habilidad Reina)\nLa tecnología actual muta en ciclos de semanas. Un Orquestador no se define por el software que domina hoy, sino por su velocidad para desaprender procesos obsoletos. Es la capacidad humana de pivotar la estrategia en tiempo real cuando un nuevo modelo de IA cambia las reglas de tu industria.',
            '2. Auditoría de Criterio Estratégico\nLa IA ejecuta perfectamente, pero carece de contexto estratégico, matiz cultural y visión corporativa. El talento de alto valor hoy audita resultados. Ya sea revisando flujos de datos automatizados o ajustando el tono de una negociación B2B internacional, el valor del humano está en la validación, la ética y la estrategia final.',
            '3. Liderazgo Asíncrono\nCon equipos distribuidos y flujos de trabajo hiper-automatizados, el micro-management está muerto. Buscamos perfiles capaces de liderar proyectos asíncronos, documentar procesos con claridad milimétrica y gestionar entregables basándose en objetivos, no en horas-silla.'
          ],
          callout: {
            type: 'warning',
            title: '🛑 Deja de buscar en el mercado equivocado',
            text: 'El talento que transformará tu empresa en 2027 ya no busca trabajo en los portales de empleo tradicionales, y sus currículums no están llenos de las palabras clave de siempre. Si sigues aplicando filtros de contratación del pasado, estás dejando entrar perfiles que inflarán tus costos operativos y frenarán tu escalabilidad tecnológica. En Nexotalento, no llenamos vacantes. Inyectamos competitividad.'
          }
        }
      ]
    },
    {
      id: 'tratado-integral-2026',
      slug: 'tratado-integral-talento-espana-2026',
      title: 'Tratado Integral sobre Gestión del Talento, Externalización y Posicionamiento Estratégico en España (Edición 2026)',
      subtitle: 'Análisis exhaustivo del marco normativo, prevención de cesión ilegal (Art. 43 ET), Directiva UE de Transparencia y optimización de costes laborales.',
      category: 'legal',
      categoryLabel: 'Marco Legal & Compliance',
      readTime: '12 min de lectura',
      date: 'Septiembre 2026 · Edición Oficial',
      author: 'Comité Jurídico & Laboral Nexo',
      authorRole: 'Senior Labor Counsel & Executive Partners',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      highlightBadge: 'Tratado de Referencia B2B',
      summary: 'El compendio definitivo para Consejos de Administración, Directores de Personas y CFOs que operan en España: desde la frontera entre outsourcing y cesión ilegal hasta la implantación obligatoria de la Directiva UE 2023/970.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      tags: ['Art. 43 ET', 'Directiva UE 2023/970', 'Compliance Laboral', 'Executive Search', 'LISOS'],
      contentSections: [
        {
          heading: '1. El Nuevo Paradigma del Mercado Laboral Español en 2026',
          paragraphs: [
            'El mercado laboral español ha experimentado una transformación estructural sin precedentes motivada por la convergencia de tres vectores regulatorios y socioeconómicos.',
            'En primer lugar, la consolidación de la reforma laboral con la priorización absoluta del contrato indefinido y la restricción severa de la temporalidad a circunstancias de la producción imprevisibles (máximo 6 meses prorrogable a 1 año) o sustitución con reserva de puesto.',
            'En segundo término, la transposición de la Directiva Europea de Transparencia Salarial (UE 2023/970), que prohíbe taxativamente indagar el historial retributivo previo del candidato y obliga a comunicar las bandas salariales antes de la primera interacción evaluativa.',
            'Por último, la entrada en vigor del Reglamento Europeo de Inteligencia Artificial (EU AI Act), que clasifica las herramientas de selección y perfilado de talento como sistemas de Alto Riesgo, exigiendo auditorías de sesgo y supervisión humana efectiva.'
          ],
          callout: {
            type: 'info',
            title: 'Principio Clave 2026',
            text: 'En el entorno normativo actual, la agilidad en la contratación no puede lograrse a costa de contingencias laborales. La seguridad jurídica en el contrato de prestación de servicios es el pilar de la sostenibilidad corporativa.'
          }
        },
        {
          heading: '2. Blindaje Jurídico: Prevención de la Cesión Ilegal de Trabajadores (Art. 43 ET)',
          subheading: 'Identificación de indicios de laboralidad y riesgos de subordinación encubierta',
          paragraphs: [
            'El outsourcing de servicios auxiliares, tecnológicos o de atención al cliente es una herramienta indispensable de competitividad, pero constituye el foco número uno de riesgo laboral cuando se desvirtúa la relación mercantil y concurren los indicios definitorios de cesión ilegal previstos en el Artículo 43 del Estatuto de los Trabajadores.',
            'Concurre cesión ilegal cuando la empresa proveedora carece de una auténtica organización empresarial autónoma, no ejerce el poder de dirección directo sobre su personal o factura exclusivamente por horas en lugar de vincular sus honorarios a entregables o acuerdos de nivel de servicio (SLA).'
          ],
          quote: '«La cesión ilegal no se juzga por la denominación formal del contrato mercantil, sino por la realidad fáctica del día a día en el centro de trabajo.»',
          callout: {
            type: 'warning',
            title: 'Sanciones LISOS (Art. 8.2)',
            text: 'Infracción Muy Grave: Multas de entre 7.501 € y 225.018 €, responsabilidad solidaria en salarios y Seguridad Social, y derecho del trabajador a adquirir la condición de fijo en la empresa cliente.'
          }
        },
        {
          heading: '3. Matriz Comparativa: Modelos de Contratación & Riesgo Jurídico',
          paragraphs: [
            'Para garantizar la total certidumbre jurídica, los Comités de Dirección deben distinguir con precisión las diferentes figuras jurídicas aplicables en España:',
            '• Empresa de Trabajo Temporal (ETT): Autorizada por Ley 14/1994 para necesidades temporales tasadas. El poder de dirección lo asume la empresa usuaria.',
            '• Outsourcing / BPO: Relación estrictamente mercantil (Art. 42 ET). El proveedor debe ejercer con exclusividad el poder disciplinario, aportar medios propios y asumir el riesgo empresarial.',
            '• Executive Search & Caza Directa (Nexo Talento): Mandato B2B de intermediación y selección cualificada para contratación indefinida directa por parte del cliente. Riesgo de cesión ilegal: 0%.'
          ]
        }
      ]
    },
    {
      id: 'guia-compensacion-2026',
      slug: 'guia-compensacion-directiva-tech-2026',
      title: 'Guía de Compensación Directiva & Tech 2026: Bandas, Retribución Flexible y Directiva UE 2023/970',
      subtitle: 'Estructuración de paquetes retributivos de alto impacto, exenciones fiscales del Art. 42 LIRPF y compliance con la directiva europea de transparencia.',
      category: 'compensation',
      categoryLabel: 'Total Rewards & Fiscalidad',
      readTime: '9 min de lectura',
      date: 'Septiembre 2026 · Benchmark Oficial',
      author: 'Área de Compensation & Benefits Nexo',
      authorRole: 'Total Rewards Senior Consultants',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      highlightBadge: 'Benchmark Salarial 2026',
      summary: 'Desglose exhaustivo de salarios fijos, variables por EBITDA, stock options bajo la Ley de Startups (Ley 28/2022) y el impacto del IRPF en planes de retribución flexible.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      tags: ['Retribución Flexible', 'Art. 42 LIRPF', 'Bandas Salariales', 'C-Level', 'Tech Salaries', 'Phantom Shares'],
      contentSections: [
        {
          heading: '1. El Impacto de la Directiva UE 2023/970 de Transparencia Salarial',
          paragraphs: [
            'La Directiva Europea de Transparencia Salarial marca un punto de no retorno en la captación directiva.',
            'Los empleadores deben facilitar a los candidatos información transparente sobre el salario inicial o la banda retributiva antes de la primera entrevista, y queda terminantemente prohibido exigir el historial salarial previo.',
            'Asimismo, las organizaciones de más de 100 empleados deberán someterse a auditorías conjuntas si se detecta una brecha de género no justificada superior al 5%.'
          ]
        },
        {
          heading: '2. Bandas Salariales Ejecutivas de Referencia en España (Madrid / Barcelona)',
          paragraphs: [
            '• Chief Executive Officer (CEO / Dir. General): 120.000 € – 220.000 € Fijo + 35% Variable + Equity.',
            '• Chief Technology Officer (CTO): 95.000 € – 150.000 € Fijo + 20% Variable + Stock Options.',
            '• Chief Financial Officer (CFO): 90.000 € – 140.000 € Fijo + 25% Variable.',
            '• Head of Artificial Intelligence & Data: 85.000 € – 120.000 € Fijo.',
            '• Cloud Solutions Architect: 75.000 € – 105.000 € Fijo.'
          ]
        },
        {
          heading: '3. Optimización Fiscal mediante Retribución Flexible (Art. 42 LIRPF)',
          paragraphs: [
            'El paquete de retribución flexible permite elevar el salario neto del directivo hasta un 15-20% mediante conceptos legalmente exentos de tributación en el IRPF:',
            '• Tarjeta Restaurante: Exenta hasta 11 €/día laborable (~2.420 €/año).',
            '• Seguro Médico: Exento hasta 500 €/año por beneficiario (cónyuge e hijos).',
            '• Cheque Guardería: 100% exento sin límite cuantitativo anual.',
            '• Stock Options en Startups (Ley 28/2022): Exención ampliada de hasta 50.000 € anuales.'
          ]
        }
      ]
    },
    {
      id: 'ia-act-rrhh-2026',
      slug: 'reglamento-europeo-ia-act-seleccion-personal',
      title: 'El Impacto del Reglamento Europeo de Inteligencia Artificial (EU AI Act) en Procesos de Selección de Personal',
      subtitle: 'Clasificación de Alto Riesgo (Anexo III), auditorías de sesgo algorítmico y régimen sancionador de hasta 35M€.',
      category: 'ai',
      categoryLabel: 'Inteligencia Artificial & Tech',
      readTime: '8 min de lectura',
      date: 'Septiembre 2026 · Análisis Regulatorio',
      author: 'Unidad de Innovación & LegalTech Nexo',
      authorRole: 'AI Ethics & Regulatory Officers',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
      highlightBadge: 'Normativa Europea AI Act',
      summary: 'Guía práctica para departamentos de RRHH y reclutamiento sobre el uso legal de IA generativa, cribado curricular y agentes evaluadores bajo el marco del EU AI Act.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
      tags: ['EU AI Act', 'IA en RRHH', 'Alto Riesgo', 'Sesgo Algorítmico', 'RGPD', 'Auditoría Algorítmica'],
      contentSections: [
        {
          heading: '1. La Clasificación de RRHH como Sistema de "Alto Riesgo" (Anexo III)',
          paragraphs: [
            'El Reglamento (UE) 2024/1689 del Parlamento Europeo sitúa a los algoritmos de selección y evaluación de personal en el Anexo III de Alto Riesgo.',
            'Esto abarca herramientas de filtrado automatizado de currículums, análisis de vídeo de entrevistas y modelos predictivos de rendimiento laboral.'
          ],
          callout: {
            type: 'warning',
            title: 'Sanciones Máximas EU AI Act',
            text: 'Multas de hasta 35.000.000 € o el 7% de la facturación global de la compañía por uso indebido de sistemas de IA sin supervisión humana contrastada.'
          }
        },
        {
          heading: '2. El Principio Obligatorio de Human-in-the-Loop',
          paragraphs: [
            'Ningún candidato puede ser descartado o clasificado de manera 100% automatizada sin la intervención, revisión y validación cualificada de un profesional humano.',
            'En Nexo Talento, nuestros modelos de IA actúan como copilotos analíticos, pero toda terna final es evaluada presencialmente mediante entrevistas STAR por nuestros Senior Partners.'
          ]
        }
      ]
    },
    {
      id: 'pactos-no-competencia-2026',
      slug: 'pactos-no-competencia-blindaje-know-how',
      title: 'Pactos de No Competencia Postcontractual y Blindaje de Know-How (Art. 21 Estatuto de los Trabajadores)',
      subtitle: 'Límites temporales, compensación económica obligatoria y doctrina jurisprudencial de nulidad radical.',
      category: 'legal',
      categoryLabel: 'Derecho Laboral Ejecutivo',
      readTime: '7 min de lectura',
      date: 'Septiembre 2026 · Doctrina Jurídica',
      author: 'Comité Jurídico & Laboral Nexo',
      authorRole: 'Labor Law Senior Specialists',
      authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
      highlightBadge: 'Seguridad Contractual',
      summary: 'Cómo redactar e implementar cláusulas de no competencia postcontractual para personal técnico y directivo sin incurrir en vicios de nulidad que dejen desprotegida a la empresa.',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
      tags: ['Art. 21 ET', 'No Competencia', 'Secreto Empresarial', 'Directivos', 'Jurisprudencia'],
      contentSections: [
        {
          heading: '1. Requisitos Cumulativos de Validez Jurídica (Art. 21.2 ET)',
          paragraphs: [
            'Para que un pacto de no competencia postcontractual sea válido y ejecutable ante los juzgados de lo social, deben concurrir obligatoriamente dos condiciones:',
            '1. Interés industrial o comercial efectivo: Posesión demostrable de know-how estratégico o relación directa con clientes clave.',
            '2. Compensación económica adecuada: El Tribunal Supremo anula de pleno derecho cualquier pacto con compensación inexistente o irrisoria.'
          ]
        },
        {
          heading: '2. Límites Temporales Máximos',
          paragraphs: [
            '• Personal directivo y técnico: Máximo legal de 2 años tras la extinción contractual.',
            '• Resto de trabajadores: Máximo de 6 meses.'
          ]
        }
      ]
    },
    {
      id: 'bonificaciones-contratacion-2026',
      slug: 'bonificaciones-seguridad-social-contratacion-rdl-1-2023',
      title: 'Bonificaciones a la Contratación y Reducción de Cuotas a la Seguridad Social (RDL 1/2023)',
      subtitle: 'Optimización de costes laborales, incentivos para contratos indefinidos y requisitos de mantenimiento de empleo.',
      category: 'strategy',
      categoryLabel: 'Estrategia & Finanzas Laborales',
      readTime: '6 min de lectura',
      date: 'Septiembre 2026 · Análisis Fiscal',
      author: 'Consultoría Laboral & ROI Nexo',
      authorRole: 'Labor Economics & Tax Advisors',
      authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80',
      highlightBadge: 'Incentivos Laborales',
      summary: 'Mapa completo de deducciones y bonificaciones en cuotas de la Seguridad Social para contrataciones estratégicas y planes de talento joven en España.',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80',
      tags: ['Bonificaciones SS', 'RDL 1/2023', 'Contratos Formativos', 'Costes Laborales', 'REGCON'],
      contentSections: [
        {
          heading: '1. Principales Incentivos Económicos en Cuotas Patronales',
          paragraphs: [
            '• Conversión de contratos formativos en indefinidos: Bonificación de 128 €/mes (1.536 €/año) durante 3 años.',
            '• Contratación indefinida de desempleados de larga duración: 110 €/mes (o 128 €/mes para mujeres o mayores de 45 años).',
            '• Sustitución por maternidad o paternidad: Exención de 366 €/mes en cuotas patronales.'
          ]
        }
      ]
    }
  ];

  // Filtering
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesQuery = searchQuery === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const activeArticle = articles.find(a => a.id === selectedArticleId) || null;

  // Flexible Compensation Math
  const marginalTaxRate = grossSalaryCalc > 60000 ? 0.45 : grossSalaryCalc > 35000 ? 0.37 : 0.30;
  const annualExemptAmount = (mealTicketCalc * 11) + (healthInsuranceCalc * 12) + (kindergartenCalc * 12);
  const annualTaxSavings = Math.round(annualExemptAmount * marginalTaxRate);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`pt-36 sm:pt-40 pb-24 relative overflow-hidden min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-[#FAFAFA] text-slate-900'
    }`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
           VIEW 1: ARTICLE DETAIL VIEW (EDITORIAL MAGAZINE READING MODE)
           ========================================================================= */}
        {activeArticle ? (
          <article className="max-w-4xl mx-auto animate-spring-in">
            
            {/* Top Navigation & Back Action (No ugly "Inicio" breadcrumbs) */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer shadow-sm btn-spring-press"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-500" />
                <span>Volver a la Revista Editorial</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-cyan-500 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Copiar enlace"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{copied ? '¡Enlace Copiado!' : 'Compartir'}</span>
                </button>
              </div>
            </div>

            {/* Magazine Cover Header */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500 text-slate-950 shadow-sm">
                  {activeArticle.highlightBadge}
                </span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {activeArticle.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight mb-4 text-slate-900 dark:text-white">
                {activeArticle.title}
              </h1>

              {/* Deck / Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6">
                {activeArticle.subtitle}
              </p>

              {/* Author Strip with Avatar & Credentials */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <img
                  src={activeArticle.authorAvatar}
                  alt={activeArticle.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/40"
                />
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>{activeArticle.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {activeArticle.authorRole} · {activeArticle.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Image with Magazine Aspect Ratio */}
            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-200 dark:border-slate-800 h-64 sm:h-96">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-semibold drop-shadow-md">
                NEXO EXECUTIVE REVIEW · Compendio Doctrinal y Legal 2026
              </div>
            </div>

            {/* Article Content Sections */}
            <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeArticle.contentSections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <h3 className="text-sm sm:text-base font-bold text-cyan-400">
                      {section.subheading}
                    </h3>
                  )}

                  {section.paragraphs.map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className={`${sIdx === 0 && pIdx === 0 ? 'first-letter:text-4xl first-letter:font-black first-letter:text-cyan-500 first-letter:mr-2 first-letter:float-left' : ''}`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Pull-Quote */}
                  {section.quote && (
                    <div className="p-6 my-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border-l-4 border-cyan-500 italic text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {section.quote}
                    </div>
                  )}

                  {/* Dynamic Table */}
                  {section.table && (
                    <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/80">
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="p-4 text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700/50">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                          {section.table.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="p-4 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Callout Boxes */}
                  {section.callout && (
                    <div className={`p-5 rounded-2xl border ${
                      section.callout.type === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                        : section.callout.type === 'info'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-950 dark:text-cyan-200'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                    }`}>
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider mb-1">
                        {section.callout.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <ShieldCheck className="w-4 h-4 text-cyan-500" />}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* Interactive Retribución Flexible Calculator (for Compensation Article) */}
              {activeArticle.id === 'guia-compensacion-2026' && (
                <div className="my-10 p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Euro className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-black text-white font-heading">
                      Simulador de Optimización Fiscal en Nómina (Art. 42 LIRPF)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mb-6">
                    Ajusta los parámetros para cuantificar el ahorro neto anual que experimenta un directivo en España sin coste adicional para la empresa.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label 
                        htmlFor="blog-gross-salary-slider"
                        className="text-xs font-bold text-slate-300 block mb-1"
                      >
                        Salario Bruto Anual: <span className="text-emerald-400 font-mono font-bold">{grossSalaryCalc.toLocaleString('es-ES')} €</span>
                      </label>
                      <input
                        id="blog-gross-salary-slider"
                        type="range"
                        min={35000}
                        max={160000}
                        step={5000}
                        value={grossSalaryCalc}
                        onChange={(e) => setGrossSalaryCalc(Number(e.target.value))}
                        aria-label="Salario Bruto Anual para Simulación Fiscal"
                        data-webmcp-field="blog-gross-salary"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="blog-meal-ticket-slider"
                        className="text-xs font-bold text-slate-300 block mb-1"
                      >
                        Tarjeta Restaurante (Mensual): <span className="text-emerald-400 font-mono font-bold">{mealTicketCalc} €/mes</span>
                      </label>
                      <input
                        id="blog-meal-ticket-slider"
                        type="range"
                        min={0}
                        max={220}
                        step={20}
                        value={mealTicketCalc}
                        onChange={(e) => setMealTicketCalc(Number(e.target.value))}
                        aria-label="Gasto Mensual en Tarjeta Restaurante"
                        data-webmcp-field="blog-meal-ticket"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase">Ahorro Neto Anual IRPF para el Empleado</p>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">+{annualTaxSavings.toLocaleString('es-ES')} € / año</p>
                    </div>
                    <button
                      onClick={() => onOpenAIAgent('salary')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
                    >
                      Consultar Asesor Salarial
                    </button>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                {activeArticle.tags.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Footer Consultation Box */}
            <div className={`mt-14 p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
              activeArticle.customCTA 
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white' 
                : 'border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white'
            }`}>
              <div className="space-y-1.5 text-center md:text-left">
                <h3 className="text-lg font-black font-heading">
                  {activeArticle.customCTA ? activeArticle.customCTA.title : '¿Deseas una consulta de compliance o headhunting directivo?'}
                </h3>
                <p className={`text-xs ${activeArticle.customCTA ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
                  {activeArticle.customCTA ? activeArticle.customCTA.description : 'Nuestros Senior Partners evalúan tu estructura organizativa y blindan tus contrataciones en Madrid y Barcelona.'}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto flex-col sm:flex-row">
                <button
                  onClick={() => activeArticle.customCTA ? onNavigate('/contacto') : onOpenAIAgent('advisor')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto ${
                    activeArticle.customCTA
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {activeArticle.customCTA ? (
                    <span>{activeArticle.customCTA.primaryButton}</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preguntar a IA</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate('/contacto')}
                  className={`px-5 py-2.5 text-xs rounded-xl shadow-lg transition-all text-center font-black w-full sm:w-auto ${
                    activeArticle.customCTA
                      ? 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950'
                  }`}
                >
                  {activeArticle.customCTA ? activeArticle.customCTA.secondaryButton : 'Contactar Socio'}
                </button>
              </div>
            </div>

          </article>
        ) : (
          /* =========================================================================
             VIEW 2: MAGAZINE HUB / EDITORIAL FRONT PAGE
             ========================================================================= */
          <div>
            
            {/* Magazine Masthead Header */}
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-cyan-400 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>NEXO EXECUTIVE REVIEW · VOL. VIII · EDICIÓN 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading leading-tight">
                Revista Doctrinal &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                  Tratado Legal 2026
                </span>
              </h1>

              <p className={`mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Compendio editorial de referencia para Consejos de Administración, Directores de Personas y CFOs en España: análisis del Art. 43 ET, Directiva UE 2023/970 y EU AI Act.
              </p>

              {/* Search & Topic Filters */}
              <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por artículo, término legal, salario, Art. 43 ET, AI Act..."
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900/90 text-slate-100 border-slate-800 focus:border-cyan-500'
                        : 'bg-white text-slate-900 border-slate-200 focus:border-cyan-500 shadow-sm'
                    }`}
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'legal', label: 'Legal & Art. 43' },
                    { id: 'compensation', label: 'Salarios & IRPF' },
                    { id: 'ai', label: 'EU AI Act' },
                    { id: 'strategy', label: 'Estrategia' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                          : theme === 'dark'
                            ? 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                MAGAZINE HERO LEAD STORY (Large Featured Card)
                ------------------------------------------------------------- */}
            {filteredArticles.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
              <div 
                onClick={() => setSelectedArticleId(articles[0].id)}
                className={`mb-12 rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer group ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-500/60'
                    : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-xl'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Image Column */}
                  <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
                    <img
                      src={articles[0].imageUrl}
                      alt={articles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/80" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                        ★ Portada Doctrinal 2026
                      </span>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span className="text-cyan-500 font-bold uppercase tracking-wider text-[10px]">{articles[0].categoryLabel}</span>
                        <span>·</span>
                        <span>{articles[0].readTime}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading group-hover:text-cyan-500 transition-colors leading-tight mb-3">
                        {articles[0].title}
                      </h2>

                      <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {articles[0].summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={articles[0].authorAvatar}
                          alt={articles[0].author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{articles[0].author}</p>
                          <p className="text-[10px] text-slate-400">{articles[0].date}</p>
                        </div>
                      </div>

                      <span className="text-xs font-black text-cyan-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Leer Tratado</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                MAGAZINE 3-COLUMN EDITORIAL GRID
                ------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className={`rounded-3xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                      : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-md'
                  }`}
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                          {article.highlightBadge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 text-white text-[10px] font-bold flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mb-1.5">
                        {article.categoryLabel}
                      </p>

                      <h3 className="text-base sm:text-lg font-black font-heading group-hover:text-cyan-500 transition-colors leading-snug mb-2">
                        {article.title}
                      </h3>

                      <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={article.authorAvatar}
                          alt={article.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-[11px] font-bold text-slate-400 truncate max-w-[120px]">{article.author}</span>
                      </div>

                      <span className="text-xs font-bold text-cyan-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Leer</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
