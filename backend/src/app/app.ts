import express, { Request, Response } from 'express';
import { healthRouter } from '../modules/health/routes/health.routes';
import { errorHandler } from '../shared/middlewares/errorHandler';
import { notFoundHandler } from '../shared/middlewares/not-found';
import { sendSuccess } from '../utils/response';

export const app = express();

app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
  sendSuccess(response, 200, 'Prosper Racquet League API is running', {
    service: 'backend',
  });
});

app.use('/api/health', healthRouter);
app.use(notFoundHandler);
app.use(errorHandler);
