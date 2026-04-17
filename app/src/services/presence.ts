import { ref, set, onValue, onDisconnect, serverTimestamp } from 'firebase/database';
import { rtdb, auth } from '../config/firebase';

export function goOnline(): void {
  const user = auth.currentUser;
  if (!user) return;

  const presenceRef = ref(rtdb, `providerPresence/${user.uid}`);

  set(presenceRef, {
    online: true,
    lastSeen: serverTimestamp(),
  });

  onDisconnect(presenceRef).set({
    online: false,
    lastSeen: serverTimestamp(),
  });
}

export function goOffline(): void {
  const user = auth.currentUser;
  if (!user) return;

  const presenceRef = ref(rtdb, `providerPresence/${user.uid}`);
  set(presenceRef, {
    online: false,
    lastSeen: serverTimestamp(),
  });
}

export function watchPresence(
  providerId: string,
  callback: (online: boolean) => void
): () => void {
  const presenceRef = ref(rtdb, `providerPresence/${providerId}`);
  const unsubscribe = onValue(presenceRef, (snapshot) => {
    const data = snapshot.val();
    callback(data?.online === true);
  });
  return unsubscribe;
}

export function updateProviderLocation(
  lat: number,
  lng: number
): void {
  const user = auth.currentUser;
  if (!user) return;

  const locationRef = ref(rtdb, `providerLocations/${user.uid}`);
  set(locationRef, {
    lat,
    lng,
    updatedAt: serverTimestamp(),
  });
}
