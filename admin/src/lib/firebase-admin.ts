/**
 * Firebase Admin SDK initialization for the admin dashboard.
 *
 * This gives the dashboard server-side access to Firestore, Auth, etc.
 * using elevated admin privileges (not client-side Firebase).
 *
 * Setup required:
 * 1. Generate a service account key from Firebase Console → Project Settings → Service Accounts
 * 2. Download the JSON key file
 * 3. Set the FIREBASE_SERVICE_ACCOUNT_KEY env variable to the JSON string
 *    (or set GOOGLE_APPLICATION_CREDENTIALS to the file path)
 *
 * Will be connected when building Phase 9 dashboard features.
 */

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    console.warn(
      "FIREBASE_SERVICE_ACCOUNT_KEY not set — Firebase Admin SDK not initialized"
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    return null;
  }
}

const app = getFirebaseAdminApp();

export const adminDb = app ? getFirestore(app) : null;
export const adminAuth = app ? getAuth(app) : null;
