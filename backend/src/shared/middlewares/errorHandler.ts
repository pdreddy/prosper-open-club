import { NextFunction, Request, Response } from 'express';
import { FirebaseError } from 'firebase-admin';
import { ZodError } from 'zod';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';
import { sendError } from '../../utils/response';
import { HttpError } from '../errors/http-error';

export const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    sendError(
      response,
      400,
      'Validation error',
      error.issues.map((issue) => ({ path: issue.path, message: issue.message })),
    );
    return;
  }

  if (error instanceof HttpError) {
    sendError(response, error.statusCode, error.message);
    return;
  }

  if (error instanceof FirebaseError) {
    sendError(response, 401, 'Invalid or expired Firebase authentication token');
    return;
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  logger.error('Unhandled server error', {
    path: request.path,
    method: request.method,
    message: errorMessage,
  });

  sendError(
    response,
    500,
    env.NODE_ENV === 'production' ? 'Internal server error' : errorMessage,
  );
};
