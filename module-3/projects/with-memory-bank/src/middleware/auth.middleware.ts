import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '@/types/api';

// Extend Express Request to carry tenantId and userId after token verification
declare global {
  namespace Express {
    interface Request {
      tenantId: string;
      userId: string;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    const response: ErrorResponse = { error: 'Missing authorization token', code: 'AUTH_REQUIRED' };
    return res.status(401).json(response);
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      tenantId: string;
    };
    req.userId = payload.sub;
    req.tenantId = payload.tenantId;
    next();
  } catch {
    const response: ErrorResponse = { error: 'Invalid or expired token', code: 'AUTH_INVALID' };
    return res.status(401).json(response);
  }
}
