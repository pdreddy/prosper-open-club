import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { mobileEnv } from './env';

export const getFirebaseClientApp = (): FirebaseApp => {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(mobileEnv.firebase);
};
