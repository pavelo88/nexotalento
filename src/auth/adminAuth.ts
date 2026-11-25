import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { auth, authPersistenceReady } from '../lib/firebase';

// Debe mantenerse alineado con las reglas de Firestore/Storage y el servidor.
const ADMIN_ROLES = new Set(['admin', 'super', 'superadmin', 'recruiter']);

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  role: string;
  claims: Record<string, unknown>;
}

const toAdminUser = async (user: User): Promise<AdminUser | null> => {
  const tokenResult = await user.getIdTokenResult();
  const claims = tokenResult.claims as Record<string, unknown>;
  const role = typeof claims.role === 'string' ? claims.role : '';
  const hasAdminClaim = claims.admin === true || claims.isAdmin === true;

  if (!user.emailVerified || (!hasAdminClaim && !ADMIN_ROLES.has(role))) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    role: role || 'admin',
    claims,
  };
};

export const subscribeToAdmin = (onChange: (user: AdminUser | null) => void) =>
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      onChange(null);
      return;
    }

    try {
      onChange(await toAdminUser(user));
    } catch {
      onChange(null);
    }
  });

export const signInAdmin = async (email: string, password: string): Promise<AdminUser> => {
  await authPersistenceReady;
  const credential: UserCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  const adminUser = await toAdminUser(credential.user);

  if (!adminUser) {
    await signOut(auth);
    if (!credential.user.emailVerified) {
      throw new Error('Verifica tu correo electrónico antes de acceder al panel.');
    }
    throw new Error('Tu cuenta no tiene permisos de administrador.');
  }

  return adminUser;
};

export const signOutAdmin = () => signOut(auth);

