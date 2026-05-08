import { Request } from 'express';

export type UserRole = 'admin' | 'manager' | 'member';

export interface AuthUser {
  uid: string;
  email?: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}
