export interface EmailValidationResponse {
  valid: boolean;
  email: string;
  domain: string;
  reason?: string;
  suggestion?: string;
}

const DISPOSABLE_CLIENT_LIST = new Set([
  '10minutemail.com',
  '10minutemail.net',
  '20minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
  'tempmail.com',
  'temp-mail.org',
  'dispostable.com',
  'throwawaymail.com',
  'fake.com',
  'test.com',
  'ejemplo.com',
  'example.com',
]);

const BASIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Valida un correo en el cliente y consulta al backend para verificar registros DNS MX reales.
 */
export async function verifyEmailIsReal(rawEmail: string): Promise<EmailValidationResponse> {
  const email = (rawEmail || '').trim().toLowerCase();

  if (!email) {
    return { valid: false, email, domain: '', reason: 'Ingresa un correo electrónico.' };
  }

  if (!BASIC_EMAIL_REGEX.test(email)) {
    return { valid: false, email, domain: '', reason: 'El formato del correo electrónico es inválido.' };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return { valid: false, email, domain: '', reason: 'El correo electrónico debe tener un solo @.' };
  }

  const [, domain] = parts;

  if (DISPOSABLE_CLIENT_LIST.has(domain)) {
    return {
      valid: false,
      email,
      domain,
      reason: 'No se permiten correos temporales o desechables. Usa tu correo real.',
    };
  }

  try {
    const res = await fetch('/api/validate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const data: EmailValidationResponse = await res.json();
      return data;
    }

    const errData = await res.json().catch(() => null);
    return {
      valid: false,
      email,
      domain,
      reason: errData?.error || errData?.reason || 'No se pudo verificar el correo.',
      suggestion: errData?.suggestion,
    };
  } catch {
    // Si la red se cae, permitimos continuar con la validación de formato básica
    return { valid: true, email, domain };
  }
}
