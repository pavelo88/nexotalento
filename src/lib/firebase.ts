import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const getEnv = (key: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  const meta = import.meta as any;
  if (meta && meta.env && meta.env[key]) {
    return meta.env[key] as string;
  }
  return '';
};

// Configuración oficial de Firebase Nexo Talento (studio-2340725787-ed6b5)
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || getEnv('NEXT_PUBLIC_FIREBASE_API_KEY') || 'AIzaSyAgdpPtkLpmg_vmqZTUypu5ZZFAtZvd_r4',
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN') || 'studio-2340725787-ed6b5.firebaseapp.com',
  projectId: 'studio-2340725787-ed6b5',
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET') || 'studio-2340725787-ed6b5.firebasestorage.app',
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') || '500020968892',
  appId: getEnv('VITE_FIREBASE_APP_ID') || getEnv('NEXT_PUBLIC_FIREBASE_APP_ID') || '1:500020968892:web:4a4dbdd4403b511e2c3fb9'
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authPersistenceReady = setPersistence(auth, indexedDBLocalPersistence);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
