import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { env } from './env';

interface FirebaseServices {
  app: App;
  auth: Auth;
  firestore: Firestore;
}

let firebaseServices: FirebaseServices | null = null;

const createFirebaseApp = (): App => {
  if (getApps().length > 0) {
    return getApps()[0] as App;
  }

  return initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  });
};

export const getFirebaseServices = (): FirebaseServices => {
  if (firebaseServices) {
    return firebaseServices;
  }

  const app = createFirebaseApp();
  firebaseServices = {
    app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };

  return firebaseServices;
};

export const getFirebaseApp = (): App => getFirebaseServices().app;
export const getFirebaseAuth = (): Auth => getFirebaseServices().auth;
export const getFirestoreDb = (): Firestore => getFirebaseServices().firestore;
