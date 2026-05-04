import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const router = Router();

const passwordRules = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/).withMessage('Password must contain at least one number');

// POST /api/auth/register
router.post(
  '/register',
  [body('email').isEmail().normalizeEmail(), passwordRules],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hash]
      );
      const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
      return res.status(201).json({ success: true, data: { token, expiresIn: 86400 } });
    } catch {
      return res.status(409).json({ success: false, error: { code: 'EMAIL_EXISTS', message: 'Email already registered' } });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    return res.json({ success: true, data: { token, expiresIn: 86400 } });
  }
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  [body('email').isEmail().normalizeEmail(), passwordRules],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg } });
    }

    const { email, newPassword } = req.body;
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING id',
      [hash, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'No user with that email' } });
    }

    return res.json({ success: true, data: null });
  }
);

export default router;
