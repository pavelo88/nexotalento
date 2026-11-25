import { FieldValue, type DocumentData, type QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getFirebaseAdminFirestore } from "./firebase-admin";

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  serviceType: string;
  message: string;
  source: string;
  attribution: Record<string, string>;
}

export interface AdminLead {
  id: string;
  createdAt: string | null;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  serviceType: string;
  message: string;
  source: string;
  attribution: Record<string, string>;
  status: string;
}

export interface AdminApplication {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  candidateUid: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string | null;
  desiredSalary: string | null;
  availability: string;
  status: string;
  hasCv: boolean;
}

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asDate(value: unknown): string | null {
  if (value && typeof (value as { toDate?: unknown }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return typeof value === "string" ? value : null;
}

function toAdminLead(snapshot: QueryDocumentSnapshot<DocumentData>): AdminLead {
  const lead = snapshot.data();
  const createdAt = asDate(lead.createdAt) ?? (asText(lead.createdAtIso) || null);
  return {
    id: snapshot.id,
    createdAt,
    name: asText(lead.name),
    email: asText(lead.email),
    phone: asText(lead.phone),
    company: asText(lead.company),
    role: asText(lead.role),
    serviceType: asText(lead.serviceType),
    message: asText(lead.message),
    source: asText(lead.source),
    attribution: lead.attribution && typeof lead.attribution === "object" ? lead.attribution as Record<string, string> : {},
    status: asText(lead.status, "pending"),
  };
}

function toAdminApplication(snapshot: QueryDocumentSnapshot<DocumentData>): AdminApplication {
  const application = snapshot.data();
  return {
    id: snapshot.id,
    createdAt: asDate(application.createdAt),
    updatedAt: asDate(application.updatedAt),
    candidateUid: asText(application.candidateUid),
    jobId: asText(application.jobId),
    jobTitle: asText(application.jobTitle, "Postulación sin cargo"),
    name: asText(application.name),
    email: asText(application.email),
    phone: asText(application.phone),
    linkedin: typeof application.linkedin === "string" ? application.linkedin : null,
    desiredSalary: typeof application.desiredSalary === "string" ? application.desiredSalary : null,
    availability: asText(application.availability),
    status: asText(application.status, "received"),
    hasCv: Boolean(application.cv?.storagePath),
  };
}

export async function createLead(input: LeadInput): Promise<string> {
  const leadRef = getFirebaseAdminFirestore().collection("leads").doc();
  await leadRef.set({
    ...input,
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
    createdAtIso: new Date().toISOString(),
  });
  return leadRef.id;
}

export async function listAdminLeads(limitCount = 100): Promise<AdminLead[]> {
  const snapshot = await getFirebaseAdminFirestore()
    .collection("leads")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();
  return snapshot.docs.map(toAdminLead);
}

export async function listAdminApplications(limitCount = 100): Promise<AdminApplication[]> {
  const snapshot = await getFirebaseAdminFirestore()
    .collection("applications")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();
  return snapshot.docs.map(toAdminApplication);
}
