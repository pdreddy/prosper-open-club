import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { env } from './env';

let firebaseApp: App | null = null;

export const getFirebaseApp = (): App => {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length > 0) {
    firebaseApp = getApps()[0] as App;
    return firebaseApp;
  }

  firebaseApp = initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  });

  return firebaseApp;
};
