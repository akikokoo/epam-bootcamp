import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { createCustomerHandler, listCustomersHandler } from './sales.controller';

const router = Router();

router.post('/customers', authMiddleware, createCustomerHandler);
router.get('/customers', authMiddleware, listCustomersHandler);

export default router;
