import { NextFunction, Response } from 'express';
import { HttpError } from '../errors/http-error';
import { AuthenticatedRequest, UserRole } from '../types/auth-request';

export const roleMiddleware = (allowedRoles: readonly UserRole[]) => {
  return (request: AuthenticatedRequest, _response: Response, next: NextFunction): void => {
    if (!request.user) {
      next(new HttpError(401, 'User authentication is required'));
      return;
    }

    if (!allowedRoles.includes(request.user.role)) {
      next(new HttpError(403, 'Insufficient permissions to access this resource'));
      return;
    }

    next();
  };
};
