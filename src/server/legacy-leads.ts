import fs from "fs";

/**
 * Compatibilidad temporal y explícita para un archivo local antiguo.
 * Jamás se habilita en producción ni se usa como sustituto de Firebase.
 */
export function readLegacyLeadsForDevelopment(filePath: string): unknown[] | null {
  if (process.env.NODE_ENV === "production" || process.env.ALLOW_LEGACY_LEADS_JSON !== "true") {
    return null;
  }

  try {
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
