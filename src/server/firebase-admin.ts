import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type FirebaseAdminApp = NonNullable<Parameters<typeof getAuth>[0]>;

interface FirebaseAdminAuth {
  verifyIdToken(token: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
  getUserByEmail(email: string): Promise<{ uid: string }>;
  setCustomUserClaims(uid: string, claims: object | null): Promise<void>;
}

let authInstance: FirebaseAdminAuth | null = null;
let firestoreInstance: Firestore | null = null;
const ADMIN_ROLES = new Set(["super", "superadmin", "admin", "recruiter"]);

function getFirebaseAdminApp(): FirebaseAdminApp {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/\\\\n/g, "\n")
    .replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin no está configurado. Define FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY."
    );
  }

  return (getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })) as FirebaseAdminApp;
}

export function getFirebaseAdminAuth(): FirebaseAdminAuth {
  if (authInstance) return authInstance;
  authInstance = getAuth(getFirebaseAdminApp()) as unknown as FirebaseAdminAuth;
  return authInstance;
}

export function getFirebaseAdminFirestore(): Firestore {
  if (firestoreInstance) return firestoreInstance;
  // La distribución actual de firebase-admin expone tipos distintos para app/auth
  // bajo moduleResolution=bundler; en runtime ambas APIs reciben la misma App Admin.
  firestoreInstance = getFirestore(getFirebaseAdminApp() as never);
  return firestoreInstance;
}

export async function verifyAdminToken(token: string): Promise<DecodedIdToken> {
  const decoded = await getFirebaseAdminAuth().verifyIdToken(token, true);
  const role = decoded.role;
  const hasAdminClaim = decoded.admin === true || (typeof role === "string" && ADMIN_ROLES.has(role));

  if (hasAdminClaim) return decoded;

  // El panel puede reconocer el rol asignado al usuario existente en Firestore
  // mientras un Custom Claim se propaga. La identidad siempre viene primero del
  // token verificado; nunca se confía en un UID enviado por el cliente.
  const uid = decoded.uid;
  if (typeof uid !== "string" || !uid) {
    throw new Error("El token no contiene un identificador de usuario válido.");
  }

  const userRecord = await getFirebaseAdminFirestore().collection("users").doc(uid).get();
  const storedRole = userRecord.exists ? userRecord.data()?.role : undefined;
  if (typeof storedRole === "string" && ADMIN_ROLES.has(storedRole)) {
    return decoded;
  }

  throw new Error("El usuario autenticado no tiene permisos administrativos.");
}
