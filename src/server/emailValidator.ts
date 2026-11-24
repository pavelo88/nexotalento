import dns from "node:dns";

// Configuramos DNS resolvers públicos de alta disponibilidad para evitar bloqueos locales
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // En entornos donde setServers no esté permitido, se usa el resolver por defecto del sistema
}

// Lista negra de dominios desechables, temporales y de spam (Anti-Bot & Anti-Fraud)
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "10minutemail.net",
  "20minutemail.com",
  "guerrillamail.biz",
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamailblock.com",
  "mailinator.com",
  "mailinator.net",
  "mailin8r.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "tempmail.com",
  "tempmail.net",
  "temp-mail.org",
  "temp-mail.io",
  "dispostable.com",
  "throwawaymail.com",
  "sharklasers.com",
  "grr.la",
  "getairmail.com",
  "fakeinbox.com",
  "trashmail.com",
  "trashmail.net",
  "nada.ltd",
  "getnada.com",
  "inboxkitten.com",
  "crazymailing.com",
  "mytemp.email",
  "fakemailgenerator.com",
  "generator.email",
  "mohmal.com",
  "burnermail.io",
  "tmail.ws",
  "emailondeck.com",
  "dropmail.me",
  "disposablemail.com",
  "fake.com",
  "test.com",
  "ejemplo.com",
  "example.com",
  "example.org",
  "example.net",
]);

// Mapa de corrección de errores tipográficos comunes en dominios populares
const TYPO_DOMAINS: Record<string, string> = {
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmali.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "yahho.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "iclou.com": "icloud.com",
  "iclud.com": "icloud.com",
};

// Regex RFC 5322 simplificada pero exhaustiva
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface EmailValidationResult {
  valid: boolean;
  email: string;
  domain: string;
  reason?: string;
  suggestion?: string;
  mxRecords?: string[];
}

/**
 * Valida de forma estricta si una dirección de correo es REAL:
 * 1. Formato y sintaxis RFC.
 * 2. Longitudes máximas y caracteres seguros.
 * 3. Detección y rechazo de dominios temporales/desechables.
 * 4. Detección de errores tipográficos en dominios conocidos.
 * 5. Resolución DNS de registros MX (comprobando que el dominio realmente tiene servidores de correo activos).
 */
export async function validateRealEmail(rawEmail: string): Promise<EmailValidationResult> {
  const email = (rawEmail || "").trim().toLowerCase();

  // 1. Sintaxis y tamaño
  if (!email || email.length < 5 || email.length > 254) {
    return {
      valid: false,
      email,
      domain: "",
      reason: "El correo electrónico debe tener entre 5 y 254 caracteres.",
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      valid: false,
      email,
      domain: "",
      reason: "El formato del correo electrónico no es válido.",
    };
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return {
      valid: false,
      email,
      domain: "",
      reason: "El correo electrónico debe contener un solo símbolo '@'.",
    };
  }

  const [localPart, domain] = parts;

  if (localPart.length > 64) {
    return {
      valid: false,
      email,
      domain,
      reason: "El nombre de usuario del correo no puede superar los 64 caracteres.",
    };
  }

  // 2. Detección de dominios desechables / falsos
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      email,
      domain,
      reason: "No se permiten correos electrónicos temporales o desechables. Por favor usa un correo corporativo o personal real.",
    };
  }

  // 3. Detección de errores tipográficos
  if (TYPO_DOMAINS[domain]) {
    const suggestedDomain = TYPO_DOMAINS[domain];
    const suggestion = `${localPart}@${suggestedDomain}`;
    return {
      valid: false,
      email,
      domain,
      suggestion,
      reason: `Parece que hay un error tipográfico en el dominio. ¿Quisiste escribir ${suggestion}?`,
    };
  }

  // 4. Comprobación activa de registros DNS MX
  try {
    const mxRecords = await dns.promises.resolveMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
      return {
        valid: false,
        email,
        domain,
        reason: `El dominio @${domain} no tiene servidores de correo (registros MX) configurados para recibir mensajes.`,
      };
    }

    const hostnames = mxRecords.map((r) => r.exchange).filter(Boolean);

    return {
      valid: true,
      email,
      domain,
      mxRecords: hostnames,
    };
  } catch (dnsErr: any) {
    const code = dnsErr?.code;

    if (code === "ENOTFOUND" || code === "ENODATA" || code === "NXDOMAIN") {
      return {
        valid: false,
        email,
        domain,
        reason: `El dominio @${domain} no existe en Internet o no puede recibir correos electrónicos.`,
      };
    }

    // En caso de timeout transitorio de DNS o restricción de red, intentamos fallback a registro A
    try {
      const aRecords = await dns.promises.resolve4(domain);
      if (aRecords && aRecords.length > 0) {
        return {
          valid: true,
          email,
          domain,
          mxRecords: aRecords,
        };
      }
    } catch {
      // Si tampoco tiene registro A, definitivamente no existe
    }

    return {
      valid: false,
      email,
      domain,
      reason: `No fue posible verificar la existencia del dominio @${domain}. Revisa que esté bien escrito.`,
    };
  }
}
