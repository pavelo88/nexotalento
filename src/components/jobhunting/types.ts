import { LucideIcon } from 'lucide-react';

export interface PhaseItem {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  tag: string;
  desc: string;
  bullets: string[];
  deliverable: string;
}

export interface PainPointItem {
  id: string;
  title: string;
  text: string;
}

export interface FaqItem {
  cat: string;
  q: string;
  a: string;
}

export interface JobhuntingFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  plan: 'exito' | 'cerrado';
  notes: string;
}
