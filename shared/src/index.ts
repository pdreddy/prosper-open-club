export interface ApiHealthResponse {
  status: 'ok';
  timestamp: string;
  services: {
    api: 'healthy' | 'unhealthy';
    firebase: 'healthy' | 'unhealthy';
  };
  metadata?: {
    uptimeSeconds: number;
    nodeVersion: string;
  };
}
