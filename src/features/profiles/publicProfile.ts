import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface PublicProfile {
  slug: string;
  name: string;
  headline?: string;
  summary?: string;
  photoUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
  specialties?: string[];
  experience?: Array<{ role: string; company?: string; period?: string; description?: string }>;
  education?: Array<{ title: string; institution?: string; period?: string }>;
  links?: Array<{ label: string; url: string }>;
  published?: boolean;
}

export async function getPublicProfile(slug: string): Promise<PublicProfile | null> {
  const snapshot = await getDoc(doc(db, 'profiles', slug));
  if (!snapshot.exists()) return null;
  const profile = snapshot.data() as PublicProfile;
  return profile.published === true ? { ...profile, slug } : null;
}

