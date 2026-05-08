import { Request, Response } from 'express';
import { sendError } from '../../utils/response';

export const notFoundHandler = (request: Request, response: Response): void => {
  sendError(response, 404, `Route ${request.method} ${request.path} not found`);
};
