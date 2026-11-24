declare module 'firebase-admin/app' {
  export function cert(options: { projectId: string; clientEmail: string; privateKey: string }): unknown;
  export function getApps(): unknown[];
  export function initializeApp(options: { credential: unknown }): unknown;
}

declare module 'firebase-admin/auth' {
  export interface DecodedIdToken {
    [key: string]: unknown;
    role?: string;
    admin?: boolean;
  }
  export interface Auth {
    verifyIdToken(token: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
  }
  export function getAuth(app?: unknown): Auth;
}
