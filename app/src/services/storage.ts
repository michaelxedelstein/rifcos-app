import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db, auth } from '../config/firebase';

export async function uploadProfilePhoto(uri: string): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const response = await fetch(uri);
  const blob = await response.blob();

  const fileRef = ref(storage, `profilePhotos/${user.uid}/profile.jpg`);
  await uploadBytes(fileRef, blob);

  const downloadUrl = await getDownloadURL(fileRef);

  await updateDoc(doc(db, 'users', user.uid), {
    photoUrl: downloadUrl,
  });

  return downloadUrl;
}

export async function getProfilePhotoUrl(userId: string): Promise<string | null> {
  try {
    const fileRef = ref(storage, `profilePhotos/${userId}/profile.jpg`);
    return await getDownloadURL(fileRef);
  } catch {
    return null;
  }
}
