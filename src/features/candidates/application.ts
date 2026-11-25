import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, limit, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../lib/firebase';
import { verifyEmailIsReal } from '../../lib/emailValidator';

export const MAX_CV_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function validateCv(file: File): string | null {
  const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
  if (!ACCEPTED_EXTENSIONS.includes(extension) || !ACCEPTED_TYPES.includes(file.type)) return 'El CV debe ser PDF, DOC o DOCX válido.';
  if (file.size > MAX_CV_BYTES) return 'El CV no puede superar los 10 MB.';
  return null;
}

export async function registerCandidate(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();
  const emailCheck = await verifyEmailIsReal(cleanEmail);
  if (!emailCheck.valid) {
    throw new Error(emailCheck.reason || 'El correo ingresado no es válido o no tiene servidores de correo activos.');
  }

  const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  await sendEmailVerification(credential.user);
  return credential.user;
}

export async function loginCandidate(email: string, password: string) {
  return (await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)).user;
}

export async function submitCandidateApplication(input: { user: { uid: string; email: string | null }; file: File; name: string; phone: string; linkedin?: string; desiredSalary?: string; availability: string; jobId: string; jobTitle: string; }) {
  const validationError = validateCv(input.file);
  if (validationError) throw new Error(validationError);
  if (!input.user.email) throw new Error('La cuenta candidata no tiene un email válido.');
  const duplicateQuery = query(collection(db, 'applications'), where('candidateUid', '==', input.user.uid), where('jobId', '==', input.jobId), limit(1));
  const existingApplication = await getDocs(duplicateQuery);
  if (!existingApplication.empty) throw new Error('Ya enviaste tu postulación a esta vacante. Puedes revisar su estado desde tu perfil.');
  const applicationRef = doc(collection(db, 'applications'));
  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `users/${input.user.uid}/cvs/${applicationRef.id}/${crypto.randomUUID()}-${safeName}`;
  const fileRef = ref(storage, storagePath);
  await uploadBytes(fileRef, input.file, { contentType: input.file.type });
  try {
    await setDoc(doc(db, 'users', input.user.uid), {
      uid: input.user.uid,
      email: input.user.email,
      displayName: input.name,
      phone: input.phone,
      role: 'candidate',
      accountType: 'candidate',
      status: 'active',
      emailVerified: Boolean(auth.currentUser?.emailVerified),
      termsAccepted: true,
      policyVersion: '2026-v1',
      securityVersion: 2,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    }, { merge: true });
    await setDoc(applicationRef, {
      candidateUid: input.user.uid,
      jobId: input.jobId,
      jobTitle: input.jobTitle,
      status: 'received',
      name: input.name,
      email: input.user.email,
      phone: input.phone,
      linkedin: input.linkedin || null,
      desiredSalary: input.desiredSalary || null,
      availability: input.availability,
      cv: { storagePath, originalName: input.file.name, contentType: input.file.type, sizeBytes: input.file.size },
      consentVersion: 'candidate-cv-v1',
      consentedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    await deleteObject(fileRef).catch(() => undefined);
    throw error;
  }
  return applicationRef.id;
}
