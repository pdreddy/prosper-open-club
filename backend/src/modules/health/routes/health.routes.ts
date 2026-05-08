import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';
import { HealthService } from '../services/health.service';

const healthRouter = Router();
const healthController = new HealthController(new HealthService());

healthRouter.get('/', healthController.getHealth);

export { healthRouter };
