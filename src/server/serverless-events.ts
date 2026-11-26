import { createTrackingEvent } from "./firestore-repository.js";
import type { ServerlessRequest, ServerlessResponse } from "./serverless-types.js";

const MAX_EVENT_NAME_LENGTH = 80;

function clean(value: unknown, maxLength = 160): string {
  return typeof value === "string"
    ? value.replace(/[\x00-\x1F\x7F]/g, "").trim().slice(0, maxLength)
    : "";
}

function bodyOf(body: unknown): Record<string, unknown> {
  if (typeof body !== "string") return body && typeof body === "object" ? body as Record<string, unknown> : {};
  try {
    const parsed = JSON.parse(body);
    return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

export async function handleTrackingEvent(req: ServerlessRequest, res: ServerlessResponse): Promise<void> {
  res.setHeader("Allow", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });

  const body = bodyOf(req.body);
  const eventName = clean(body.eventName, MAX_EVENT_NAME_LENGTH);
  if (!eventName) return res.status(400).json({ error: "Evento inválido." });

  try {
    await createTrackingEvent({
      eventName,
      category: clean(body.category, 80) || "General",
      label: clean(body.label),
      path: clean(body.path, 200) || "/",
      jobId: clean(body.jobId, 100) || undefined,
      jobTitle: clean(body.jobTitle) || undefined,
      leadType: clean(body.leadType, 80) || undefined,
      measurementScope: body.measurementScope === "consented" ? "consented" : "anonymous_operational",
    });
    return res.status(202).json({ success: true });
  } catch (error) {
    console.error("[Analytics] No se pudo persistir el evento operativo.", error instanceof Error ? error.message : "Error desconocido");
    return res.status(202).json({ success: false });
  }
}
