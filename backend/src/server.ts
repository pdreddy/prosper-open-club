import { app } from './app/app';
import { env } from './config/env';
import { getFirebaseServices } from './config/firebase';
import { logger } from './utils/logger';

const startServer = (): void => {
  const firebaseServices = getFirebaseServices();

  app.listen(env.PORT, () => {
    logger.info('Backend server started', {
      port: env.PORT,
      firebaseAppName: firebaseServices.app.name,
      firestoreConfigured: Boolean(firebaseServices.firestore),
      authConfigured: Boolean(firebaseServices.auth),
    });
  });
};

startServer();
