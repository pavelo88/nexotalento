import { createLead } from "./firestore-repository";
import type { ServerlessRequest, ServerlessResponse } from "./serverless-types";

function sanitizeInput(input: unknown, maxLen = 8000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .trim()
    .slice(0, maxLen);
}

function sanitizeAttribution(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") return {};
  const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ttclid"];
  return Object.fromEntries(
    allowed.flatMap((key) => {
      const value = sanitizeInput((input as Record<string, unknown>)[key], 200);
      return value ? [[key, value]] : [];
    }),
  );
}

function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }
  return body && typeof body === "object" ? body as Record<string, unknown> : {};
}

function isFirebaseAdminConfigurationError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Firebase Admin no está configurado");
}

export async function handleContactLead(req: ServerlessRequest, res: ServerlessResponse): Promise<void> {
  res.setHeader("Allow", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });

  const body = parseBody(req.body);
  try {
    const leadId = await createLead({
      name: sanitizeInput(body.name) || "Sin nombre",
      email: sanitizeInput(body.email) || "Sin email",
      phone: sanitizeInput(body.phone) || "Sin teléfono",
      company: sanitizeInput(body.company) || "Sin empresa",
      role: sanitizeInput(body.role) || "Sin cargo especificado",
      serviceType: sanitizeInput(body.serviceType) || "Consulta general",
      message: sanitizeInput(body.message) || "Sin mensaje",
      source: sanitizeInput(body.source, 200) || "Formulario web",
      attribution: sanitizeAttribution(body.attribution),
    });
    return res.status(201).json({ success: true, leadId, message: "Solicitud recibida correctamente." });
  } catch (error) {
    if (isFirebaseAdminConfigurationError(error)) {
      return res.status(503).json({ error: "El formulario no está disponible hasta configurar Firebase Admin." });
    }
    console.error("[Contact] Firebase lead write failed.");
    return res.status(500).json({ error: "No fue posible registrar la solicitud." });
  }
}
