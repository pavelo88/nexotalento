import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type Auth, type DecodedIdToken } from "firebase-admin/auth";

let authInstance: Auth | null = null;

function getFirebaseAdminAuth(): Auth {
  if (authInstance) return authInstance;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin no está configurado. Define FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY."
    );
  }

  const app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  authInstance = getAuth(app);
  return authInstance;
}

export async function verifyAdminToken(token: string): Promise<DecodedIdToken> {
  const decoded = await getFirebaseAdminAuth().verifyIdToken(token, true);
  const role = decoded.role;
  const isAdmin = decoded.admin === true || ["superadmin", "admin"].includes(role);

  if (!isAdmin) {
    throw new Error("El usuario autenticado no tiene permisos administrativos.");
  }

  return decoded;
}
