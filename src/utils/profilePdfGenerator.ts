import { jsPDF } from 'jspdf';

type RGB = readonly [number, number, number];

export interface ProfileContact {
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ProfileEducation {
  title: string;
  institution?: string;
  period?: string;
  details?: string;
}

export interface ProfileExperience {
  role: string;
  company?: string;
  period?: string;
  description?: string;
  bullets?: string[];
}

export interface ProfileReference {
  name: string;
  role?: string;
  organization?: string;
  contact?: string;
}

export interface GenericProfile {
  name: string;
  title?: string;
  summary?: string;
  contact?: ProfileContact;
  photo?: string | Blob;
  specialties?: string[];
  education?: ProfileEducation[];
  experience?: ProfileExperience[];
  references?: ProfileReference[];
  links?: ProfileLink[];
}

/** Compatibilidad con el borrador inicial del editor; se normaliza al modelo genérico. */
export interface ProfilePdfData {
  name: string;
  email?: string;
  headline?: string;
  summary?: string;
  experience?: string;
  education?: string;
  skills?: string;
  photoDataUrl?: string | null;
}

export interface ProfilePdfOptions {
  fileName?: string;
}

const COLORS: Record<string, RGB> = {
  navy: [31, 59, 98],
  slate: [36, 49, 66],
  muted: [91, 110, 133],
  cyan: [0, 150, 204],
  paleBlue: [234, 242, 253],
  headerBlue: [202, 216, 233],
  white: [255, 255, 255],
  rule: [203, 213, 225],
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const SIDEBAR_WIDTH = 184;
const MAIN_X = SIDEBAR_WIDTH + 30;
const MAIN_WIDTH = PAGE_WIDTH - MAIN_X - 32;
const BODY_SIZE = 8.7;
const BODY_LINE = 11.4;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function safeFileName(name: string): string {
  const base = clean(name).replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
  return `${base || 'perfil-profesional'}.pdf`;
}

function imageFormat(dataUrl: string): 'PNG' | 'JPEG' {
  return /^data:image\/jpe?g/i.test(dataUrl) ? 'JPEG' : 'PNG';
}

async function toDataUrl(source: string | Blob): Promise<string> {
  if (typeof source === 'string' && source.startsWith('data:')) return source;

  const blob = typeof source === 'string'
    ? await fetch(source).then((response) => {
        if (!response.ok) throw new Error(`No se pudo cargar la foto (${response.status})`);
        return response.blob();
      })
    : source;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer la foto'));
    reader.readAsDataURL(blob);
  });
}

function linesFor(doc: jsPDF, value: string, width: number, maxLines: number): string[] {
  const lines = doc.splitTextToSize(clean(value) || '—', width) as string[];
  if (lines.length <= maxLines) return lines;
  const shortened = lines.slice(0, maxLines);
  shortened[maxLines - 1] = `${shortened[maxLines - 1].replace(/[.,;:!?\s]+$/u, '')}…`;
  return shortened;
}

function textBlock(
  doc: jsPDF,
  value: string,
  x: number,
  y: number,
  width: number,
  options: { size?: number; color?: RGB; style?: 'normal' | 'bold'; line?: number; maxLines?: number; url?: string } = {},
): number {
  const size = options.size ?? BODY_SIZE;
  const line = options.line ?? BODY_LINE;
  const color = options.color ?? COLORS.slate;
  const lines = linesFor(doc, value, width, options.maxLines ?? 4);
  doc.setFont('helvetica', options.style ?? 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(lines, x, y, { lineHeightFactor: line / size });

  if (options.url) {
    lines.forEach((lineText, index) => {
      doc.link(x, y - size + index * line, Math.min(width, doc.getTextWidth(lineText)), line, { url: options.url });
    });
  }

  return y + lines.length * line;
}

function sectionTitle(doc: jsPDF, title: string, x: number, y: number, width: number): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.navy);
  doc.text(title.toUpperCase(), x, y);
  doc.setDrawColor(...COLORS.navy);
  doc.setLineWidth(1.2);
  doc.line(x, y + 6, x + Math.min(30, width), y + 6);
  return y + 23;
}

function sidebarTitle(doc: jsPDF, title: string, y: number): void {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.cyan);
  doc.text(title.toUpperCase(), 20, y);
  doc.setDrawColor(...COLORS.cyan);
  doc.setLineWidth(1.1);
  doc.line(20, y + 5, SIDEBAR_WIDTH - 20, y + 5);
}

function contactUrl(type: 'phone' | 'email', value: string): string | undefined {
  if (type === 'email') return `mailto:${value}`;
  const digits = value.replace(/[^\d+]/gu, '');
  return digits ? `https://wa.me/${digits.replace(/^\+/u, '')}` : undefined;
}

function isLegacyProfile(profile: GenericProfile | ProfilePdfData): profile is ProfilePdfData {
  return 'headline' in profile || 'photoDataUrl' in profile || typeof profile.experience === 'string';
}

function normalizeProfile(profile: GenericProfile | ProfilePdfData): GenericProfile {
  if (isLegacyProfile(profile)) {
    return {
      name: profile.name,
      title: profile.headline,
      summary: profile.summary,
      contact: { email: profile.email },
      photo: profile.photoDataUrl ?? undefined,
      specialties: clean(profile.skills) ? profile.skills!.split(/[,\n]/u).map((item) => item.trim()).filter(Boolean) : [],
      education: clean(profile.education) ? [{ title: profile.education! }] : [],
      experience: clean(profile.experience) ? [{ role: profile.experience! }] : [],
    };
  }
  return profile;
}

function drawSidebar(doc: jsPDF, profile: GenericProfile, photoDataUrl?: string): void {
  doc.setFillColor(...COLORS.white);
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F');
  doc.setFillColor(...COLORS.headerBlue);
  doc.rect(0, 0, PAGE_WIDTH, 150, 'F');
  doc.setFillColor(...COLORS.paleBlue);
  doc.rect(0, 150, SIDEBAR_WIDTH, PAGE_HEIGHT - 150, 'F');

  const photoX = 38;
  const photoY = 29;
  const photoSize = 96;
  if (photoDataUrl) {
    doc.addImage(photoDataUrl, imageFormat(photoDataUrl), photoX, photoY, photoSize, photoSize);
  } else {
    doc.setFillColor(...COLORS.paleBlue);
    doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'F');
  }
  doc.setDrawColor(...COLORS.cyan);
  doc.setLineWidth(5);
  doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 2, 'S');

  sidebarTitle(doc, 'Contacto', 173);
  const contact = profile.contact ?? {};
  const contactItems: Array<{ value: string; url?: string }> = [
    { value: clean(contact.location) },
    { value: clean(contact.phone), url: contact.phone ? contactUrl('phone', contact.phone) : undefined },
    { value: clean(contact.email), url: contact.email ? contactUrl('email', contact.email) : undefined },
    { value: clean(contact.website), url: contact.website },
  ].filter((item) => item.value);
  let y = 195;
  contactItems.slice(0, 4).forEach((item) => {
    y = textBlock(doc, item.value, 20, y, SIDEBAR_WIDTH - 38, { size: 7.8, color: COLORS.slate, line: 11, maxLines: 1, url: item.url });
    y += 3;
  });

  sidebarTitle(doc, 'Enlaces', 270);
  const links = (profile.links ?? []).filter((link) => clean(link.label) && clean(link.url));
  y = 292;
  if (!links.length) {
    textBlock(doc, 'Añade tus enlaces profesionales', 20, y, SIDEBAR_WIDTH - 38, { size: 7.5, color: COLORS.muted, line: 10, maxLines: 1 });
  } else {
    links.slice(0, 3).forEach((link) => {
      y = textBlock(doc, link.label, 20, y, SIDEBAR_WIDTH - 38, { size: 7.7, color: COLORS.slate, line: 11, maxLines: 1, url: link.url });
      y += 3;
    });
  }

  sidebarTitle(doc, 'Especialidades', 345);
  y = 367;
  (profile.specialties ?? []).filter(Boolean).slice(0, 8).forEach((specialty) => {
    y = textBlock(doc, `• ${specialty}`, 20, y, SIDEBAR_WIDTH - 38, { size: 7.5, color: COLORS.slate, line: 11, maxLines: 1 });
    y += 1;
  });

  sidebarTitle(doc, 'Formación', 478);
  y = 500;
  (profile.education ?? []).slice(0, 3).forEach((education) => {
    const heading = [education.title, education.institution].filter(Boolean).join(' · ');
    y = textBlock(doc, `• ${heading}`, 20, y, SIDEBAR_WIDTH - 38, { size: 7.5, color: COLORS.slate, line: 10, maxLines: 2 });
    const detail = [education.period, education.details].filter(Boolean).join(' · ');
    if (detail) y = textBlock(doc, detail, 27, y + 1, SIDEBAR_WIDTH - 45, { size: 7.1, color: COLORS.muted, line: 9, maxLines: 1 });
    y += 5;
  });
}

function drawExperience(doc: jsPDF, experiences: ProfileExperience[], x: number, y: number): number {
  experiences.slice(0, 2).forEach((experience) => {
    const heading = [experience.role, experience.company, experience.period].filter(Boolean).join(' | ');
    y = textBlock(doc, heading, x, y, MAIN_WIDTH, { size: 8.8, color: COLORS.navy, style: 'bold', line: 11, maxLines: 1 });
    const detail = [experience.description, ...(experience.bullets ?? [])].filter(Boolean).join(' · ');
    if (detail) y = textBlock(doc, detail, x, y + 2, MAIN_WIDTH, { size: 8.2, color: COLORS.slate, line: 10.5, maxLines: 2 });
    y += 8;
  });
  return y;
}

function drawReferences(doc: jsPDF, references: ProfileReference[], x: number, y: number): number {
  references.slice(0, 2).forEach((reference) => {
    const heading = [reference.name, reference.role].filter(Boolean).join(' · ');
    y = textBlock(doc, heading, x, y, MAIN_WIDTH, { size: 8.5, color: COLORS.navy, style: 'bold', line: 10.5, maxLines: 1 });
    const detail = [reference.organization, reference.contact].filter(Boolean).join(' · ');
    if (detail) y = textBlock(doc, detail, x, y + 1, MAIN_WIDTH, { size: 8, color: COLORS.slate, line: 10, maxLines: 1 });
    y += 6;
  });
  return y;
}

export async function generateProfilePdf(profile: GenericProfile | ProfilePdfData): Promise<jsPDF> {
  const normalizedProfile = normalizeProfile(profile);
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  doc.setProperties({ title: clean(normalizedProfile.name) || 'Perfil profesional', subject: 'Perfil profesional' });

  let photoDataUrl: string | undefined;
  if (normalizedProfile.photo) {
    try {
      photoDataUrl = await toDataUrl(normalizedProfile.photo);
    } catch (error) {
      console.warn('No se pudo cargar la foto del perfil:', error);
    }
  }
  drawSidebar(doc, normalizedProfile, photoDataUrl);

  let y = 48;
  const nameLines = linesFor(doc, normalizedProfile.name || 'Perfil profesional', MAIN_WIDTH, 2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(...COLORS.navy);
  doc.text(nameLines, MAIN_X, y, { lineHeightFactor: 1.1 });
  y += nameLines.length * 28 + 3;
  y = textBlock(doc, normalizedProfile.title || 'Perfil profesional', MAIN_X, y, MAIN_WIDTH, { size: 9.2, color: COLORS.cyan, style: 'bold', line: 12, maxLines: 2 });
  doc.setDrawColor(...COLORS.rule);
  doc.setLineWidth(1);
  doc.line(MAIN_X, 137, PAGE_WIDTH - 28, 137);

  y = sectionTitle(doc, 'Perfil profesional', MAIN_X, 166, MAIN_WIDTH);
  y = textBlock(doc, normalizedProfile.summary || 'Información profesional pendiente de completar.', MAIN_X, y, MAIN_WIDTH, { size: 8.8, color: COLORS.slate, line: 12, maxLines: 4 }) + 10;

  y = sectionTitle(doc, 'Experiencia relevante', MAIN_X, y, MAIN_WIDTH);
  y = drawExperience(doc, normalizedProfile.experience ?? [], MAIN_X, y);

  const referenceY = Math.max(y + 4, 470);
  sectionTitle(doc, 'Referencias', MAIN_X, referenceY, MAIN_WIDTH);
  drawReferences(doc, normalizedProfile.references ?? [], MAIN_X, referenceY + 23);

  doc.setDrawColor(...COLORS.rule);
  doc.setLineWidth(0.8);
  doc.line(MAIN_X, PAGE_HEIGHT - 44, PAGE_WIDTH - 28, PAGE_HEIGHT - 44);
  textBlock(doc, 'Perfil profesional · Nexotalento', MAIN_X, PAGE_HEIGHT - 27, MAIN_WIDTH, { size: 7.5, color: COLORS.muted, line: 9, maxLines: 1 });
  return doc;
}

export async function downloadProfilePdf(profile: GenericProfile | ProfilePdfData, options: ProfilePdfOptions = {}): Promise<void> {
  const doc = await generateProfilePdf(profile);
  doc.save(options.fileName ? safeFileName(options.fileName.replace(/\.pdf$/iu, '')) : safeFileName(profile.name));
}

