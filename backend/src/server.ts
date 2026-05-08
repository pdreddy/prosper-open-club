import { app } from './app/app';
import { env } from './config/env';
import { getFirebaseApp } from './config/firebase';

const startServer = (): void => {
  getFirebaseApp();

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend server listening on port ${env.PORT}`);
  });
};

startServer();
