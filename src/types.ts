export type PageRoute = 
  | '/'
  | '/servicios'
  | '/por-que-elegirnos'
  | '/testimonios'
  | '/proceso'
  | '/contacto'
  | '/vacantes'
  | '/guia-salarial'
  | '/calculadora-roi'
  | '/agentes-ia'
  | '/blog';

export type AgentType = 'headhunter' | 'evaluator' | 'salary' | 'advisor';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  agentType?: AgentType;
}

export interface NavItem {
  label: string;
  href: PageRoute | string;
  badge?: string;
  description?: string;
  iconName?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  modality: 'Presencial' | 'Híbrido' | '100% Remoto';
  salaryRange: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  isFeatured?: boolean;
  isUrgent?: boolean;
  postedDate?: string;
  tags?: string[];
  hot?: boolean;
}

export interface JobVacancy extends JobPosition {
  type?: 'Presencial' | 'Híbrido' | '100% Remoto';
  salary?: string;
  experience?: string;
  isNew?: boolean;
}

export interface SalaryData {
  role: string;
  sector: string;
  juniorMid: string;
  senior: string;
  leadDirector: string;
  cLevel: string;
  variableBonus: string;
  demandTrend: string;
}

export interface CaseStudy {
  id: string;
  clientSector: string;
  companyProfile: string;
  roleHired: string;
  challenge: string;
  solution: string;
  results: {
    timeToHire: string;
    candidatesInterviewed: string;
    retentionRate: string;
    roi: string;
  };
  quote: string;
  author: string;
  authorRole: string;
}

export interface SuccessCase {
  id: string;
  clientSector: string;
  position: string;
  location: string;
  timeToHire: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  author: string;
  authorRole: string;
  authorCompany: string;
  avatarUrl: string;
}

export interface CVAnalysisResult {
  candidateName?: string;
  seniorityLevel: string;
  fitScore: number;
  marketSalaryEstimate: string;
  strengths: string[];
  growthAreas: string[];
  recommendedRoles: string[];
  executiveSummary: string;
}
