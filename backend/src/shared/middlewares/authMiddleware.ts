import { NextFunction, Response } from 'express';
import { getFirestoreDb, getFirebaseAuth } from '../../config/firebase';
import { HttpError } from '../errors/http-error';
import { AuthenticatedRequest, UserRole } from '../types/auth-request';

interface UserDocument {
  role?: UserRole;
}

const extractBearerToken = (authorizationHeader: string | undefined): string => {
  if (!authorizationHeader) {
    throw new HttpError(401, 'Authorization header is required');
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Authorization header must use Bearer token format');
  }

  return token;
};

export const authMiddleware = async (
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractBearerToken(request.headers.authorization);
    const decodedToken = await getFirebaseAuth().verifyIdToken(token, true);

    const userDoc = await getFirestoreDb().collection('users').doc(decodedToken.uid).get();
    const userData = (userDoc.data() ?? {}) as UserDocument;

    request.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userData.role ?? 'member',
    };

    next();
  } catch (error) {
    next(error);
  }
};
