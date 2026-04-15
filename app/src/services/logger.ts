import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export async function logEvent(
  eventName: string,
  data: Record<string, any> = {}
) {
  try {
    await addDoc(collection(db, 'events'), {
      eventName,
      userId: auth.currentUser?.uid || null,
      data,
      timestamp: serverTimestamp(),
      platform: 'mobile',
    });
  } catch (e) {
    console.warn('[Logger] Failed to log event:', eventName, e);
  }
}
