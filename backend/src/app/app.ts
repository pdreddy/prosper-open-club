import express from 'express';
import { healthRouter } from '../modules/health/routes/health.routes';
import { errorHandler } from '../shared/middlewares/error-handler';
import { notFoundHandler } from '../shared/middlewares/not-found';

export const app = express();

app.use(express.json());
app.use('/api/health', healthRouter);
app.use(notFoundHandler);
app.use(errorHandler);
