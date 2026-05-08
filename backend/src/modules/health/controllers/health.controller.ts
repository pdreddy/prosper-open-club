import { NextFunction, Request, Response } from 'express';
import { healthQuerySchema } from '../schemas/health.schema';
import { HealthService } from '../services/health.service';

export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  public getHealth = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const { verbose } = healthQuerySchema.parse(request.query);
      const result = this.healthService.getStatus(verbose);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
