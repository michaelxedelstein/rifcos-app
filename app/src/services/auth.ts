import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { type UserRole } from '../constants/config';

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: UserRole
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  await updateProfile(user, { displayName: fullName });

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    fullName,
    role,
    photoUrl: null,
    defaultAvatar: 'avatar_01',
    onboardingComplete: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (role === 'provider') {
    await setDoc(doc(db, 'providers', user.uid), {
      uid: user.uid,
      email: user.email,
      fullName,
      accountStatus: 'registered',
      availabilityStatus: 'offline',
      phone: null,
      photoUrl: null,
      yearsOfExperience: null,
      serviceArea: null,
      travelRadius: null,
      foodHandlerCert: false,
      certificationDetails: null,
      otherLicenses: null,
      additionalNotes: null,
      homeBaseLocation: null,
      rating: 0,
      ratingSum: 0,
      totalRatings: 0,
      totalJobsCompleted: 0,
      cancellationCount: 0,
      declineCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return user;
}

export async function signIn(
  email: string,
  password: string
): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

export async function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

export function onAuthStateChanged(
  callback: (user: User | null) => void
): () => void {
  return firebaseOnAuthStateChanged(auth, callback);
}

export async function getUserProfile(
  uid: string
): Promise<Record<string, any> | null> {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists() ? docSnap.data() : null;
}
