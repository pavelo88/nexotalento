import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const getEnv = (key: string, fallback: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  const meta = import.meta as any;
  if (meta && meta.env && meta.env[key]) {
    return meta.env[key];
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY', "AIzaSyD1-srAYmRSVD0qmrb35K6ZIpQgPSIR0X8"),
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', "nexo-talento-ec.firebaseapp.com"),
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', "nexo-talento-ec"),
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', "nexo-talento-ec.firebasestorage.app"),
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', "826443165832"),
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID', "1:826443165832:web:54a179844e58cc31e86f3d")
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
