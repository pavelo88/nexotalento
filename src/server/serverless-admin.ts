import { verifyAdminToken } from "./firebase-admin.js";
import type { ServerlessRequest, ServerlessResponse } from "./serverless-types.js";

function getBearerToken(headers: ServerlessRequest["headers"]): string {
  const authorization = headers.authorization;
  const value = Array.isArray(authorization) ? authorization[0] : authorization;
  return value?.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function isFirebaseAdminConfigurationError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Firebase Admin no está configurado");
}

export function createAdminListHandler<T>(listRecords: () => Promise<T[]>, unavailableMessage: string) {
  return async (req: ServerlessRequest, res: ServerlessResponse): Promise<void> => {
    res.setHeader("Allow", "GET");
    if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido." });

    const token = getBearerToken(req.headers);
    if (!token) return res.status(401).json({ error: "Autenticación requerida." });

    try {
      await verifyAdminToken(token);
    } catch (error) {
      if (isFirebaseAdminConfigurationError(error)) return res.status(503).json({ error: unavailableMessage });
      return res.status(403).json({ error: "Sesión administrativa inválida o sin permisos." });
    }

    try {
      return res.status(200).json(await listRecords());
    } catch (error) {
      if (isFirebaseAdminConfigurationError(error)) return res.status(503).json({ error: unavailableMessage });
      console.error("[Admin] Firebase collection read failed.");
      return res.status(500).json({ error: "No fue posible cargar la bandeja administrativa." });
    }
  };
}
