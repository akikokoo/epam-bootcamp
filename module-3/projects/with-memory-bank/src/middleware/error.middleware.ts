import { Request, Response, NextFunction } from 'express';
import { logger } from '@/lib/logger';
import { ErrorResponse } from '@/types/api';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error('Unhandled error', { err, path: req.path, method: req.method });
  const response: ErrorResponse = {
    error: 'An unexpected error occurred',
    code: 'UNHANDLED_ERROR',
  };
  // Never expose stack traces or internal messages to clients
  res.status(500).json(response);
}
