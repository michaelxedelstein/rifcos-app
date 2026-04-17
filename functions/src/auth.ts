import * as functions from "firebase-functions/v1";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

/**
 * Safety net: if the client-side user document creation fails during signup,
 * this trigger ensures a basic document still gets created.
 */
export const onUserCreated = functions.auth
  .user()
  .onCreate(async (user: functions.auth.UserRecord) => {
    logger.info("New user created", { uid: user.uid, email: user.email });

    const userDoc = await db.collection("users").doc(user.uid).get();
    if (userDoc.exists) {
      logger.info("User document already exists, skipping", { uid: user.uid });
      return;
    }

    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      fullName: user.displayName || "",
      role: "customer",
      photoUrl: null,
      defaultAvatar: "avatar_01",
      onboardingComplete: false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    logger.info("Created fallback user document", { uid: user.uid });
  });

/**
 * Clean up user data when an account is deleted.
 */
export const onUserDeleted = functions.auth
  .user()
  .onDelete(async (user: functions.auth.UserRecord) => {
    logger.info("User deleted", { uid: user.uid, email: user.email });

    const batch = db.batch();
    batch.delete(db.collection("users").doc(user.uid));

    const providerDoc = await db.collection("providers").doc(user.uid).get();
    if (providerDoc.exists) {
      batch.delete(db.collection("providers").doc(user.uid));
    }

    await batch.commit();
    logger.info("Cleaned up user data", { uid: user.uid });
  });
