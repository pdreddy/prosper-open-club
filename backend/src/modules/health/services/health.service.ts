import { getFirebaseApp } from '../../../config/firebase';
import { ApiHealthResponse } from '@prosper/shared';

export class HealthService {
  public getStatus(verbose: boolean): ApiHealthResponse {
    const firebaseApp = getFirebaseApp();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        firebase: firebaseApp.name ? 'healthy' : 'unhealthy',
      },
      metadata: verbose
        ? {
            uptimeSeconds: Math.floor(process.uptime()),
            nodeVersion: process.version,
          }
        : undefined,
    };
  }
}
