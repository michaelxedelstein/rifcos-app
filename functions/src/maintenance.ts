import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

/**
 * Runs daily at 3 AM UTC. Deletes error logs and event logs
 * older than 30 days to keep Firestore costs under control.
 */
export const cleanupOldLogs = onSchedule(
  { schedule: "every day 03:00", timeZone: "America/New_York" },
  async () => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    const collections = ["errorLogs", "events"];
    let totalDeleted = 0;

    for (const col of collections) {
      let batch = db.batch();
      let batchCount = 0;

      const snapshot = await db
        .collection(col)
        .where("timestamp", "<", cutoff)
        .limit(500)
        .get();

      for (const doc of snapshot.docs) {
        batch.delete(doc.ref);
        batchCount++;

        if (batchCount >= 500) {
          await batch.commit();
          totalDeleted += batchCount;
          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
        totalDeleted += batchCount;
      }
    }

    logger.info("Log cleanup complete", { totalDeleted });
  }
);
