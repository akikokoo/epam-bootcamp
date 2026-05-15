import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import {
  createPurchaseOrderHandler,
  listPurchaseOrdersHandler,
} from './inventory.controller';

const router = Router();

router.post('/purchase-orders', authMiddleware, createPurchaseOrderHandler);
router.get('/purchase-orders', authMiddleware, listPurchaseOrdersHandler);

export default router;
