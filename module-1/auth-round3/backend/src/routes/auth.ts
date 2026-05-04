import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { authLimiter } from '../middleware/rateLimiter';
import type { ApiResponse, TokenData } from '../types';

const router = Router();
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || '86400', 10);

const passwordValidation = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/).withMessage('Password must contain at least one number');

function respond<T>(res: Response, status: number, payload: ApiResponse<T>) {
  return res.status(status).json(payload);
}

// POST /api/auth/register
router.post(
  '/register',
  [body('email').isEmail().normalizeEmail(), passwordValidation],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(res, 400, { success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, password } = req.body as { email: string; password: string };

    try {
      const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      const result = await pool.query<{ id: number }>(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
        [email, hash]
      );
      const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
      return respond<TokenData>(res, 201, { success: true, data: { token, expiresIn: JWT_EXPIRES_IN } });
    } catch {
      return respond(res, 409, { success: false, error: { code: 'EMAIL_EXISTS', message: 'Email already registered' } });
    }
  }
);

// POST /api/auth/login  (rate limited: 5 attempts/hour)
router.post(
  '/login',
  authLimiter,
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(res, 400, { success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, password } = req.body as { email: string; password: string };

    try {
      const result = await pool.query<{ id: number; password_hash: string; locked_until: Date | null }>(
        'SELECT id, password_hash, locked_until FROM users WHERE email = $1',
        [email]
      );
      const user = result.rows[0];

      if (!user) {
        return respond(res, 401, { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
      }

      if (user.locked_until && user.locked_until > new Date()) {
        return respond(res, 423, { success: false, error: { code: 'ACCOUNT_LOCKED', message: 'Too many attempts. Try again in 1 hour.' } });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return respond(res, 401, { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
      return respond<TokenData>(res, 200, { success: true, data: { token, expiresIn: JWT_EXPIRES_IN } });
    } catch {
      return respond(res, 500, { success: false, error: { code: 'SERVER_ERROR', message: 'Connection failed. Please try again.' } });
    }
  }
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  [body('email').isEmail().normalizeEmail(), passwordValidation],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return respond(res, 400, { success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, newPassword } = req.body as { email: string; newPassword: string };

    try {
      const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
      const result = await pool.query(
        'UPDATE users SET password_hash = $1, locked_until = NULL WHERE email = $2 RETURNING id',
        [hash, email]
      );

      if (result.rowCount === 0) {
        return respond(res, 404, { success: false, error: { code: 'USER_NOT_FOUND', message: 'No account found with that email' } });
      }

      return respond(res, 200, { success: true });
    } catch {
      return respond(res, 500, { success: false, error: { code: 'SERVER_ERROR', message: 'Connection failed. Please try again.' } });
    }
  }
);

export default router;
