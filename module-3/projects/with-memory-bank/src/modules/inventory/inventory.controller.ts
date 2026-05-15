import { Request, Response } from 'express';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ErrorResponse } from '@/types/api';
import { inventoryService } from './inventory.service';

// Zod schema — exported so frontend can reuse the same schema (no duplication)
export const createPurchaseOrderSchema = z.object({
  supplierId: z.string().uuid(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      }),
    )
    .min(1, 'At least one item is required'),
  notes: z.string().max(500).optional(),
});

export async function createPurchaseOrderHandler(req: Request, res: Response) {
  const parsed = createPurchaseOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: ErrorResponse = {
      error: parsed.error.errors[0]?.message ?? 'Invalid purchase order data',
      code: 'VALIDATION_ERROR',
    };
    return res.status(400).json(response);
  }

  try {
    const order = await inventoryService.createPurchaseOrder({
      ...parsed.data,
      tenantId: req.tenantId, // injected by authMiddleware — never trust client-provided tenantId
    });

    logger.info('Purchase order created', { orderId: order.id, tenantId: req.tenantId });
    return res.status(201).json(order);
  } catch (error: unknown) {
    logger.error('Failed to create purchase order', { error, tenantId: req.tenantId });
    const response: ErrorResponse = {
      error: 'Failed to create purchase order',
      code: 'INTERNAL_ERROR',
    };
    return res.status(500).json(response);
  }
}

export async function listPurchaseOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await inventoryService.listPurchaseOrders({ tenantId: req.tenantId });
    return res.json(orders);
  } catch (error: unknown) {
    logger.error('Failed to list purchase orders', { error, tenantId: req.tenantId });
    const response: ErrorResponse = {
      error: 'Failed to list purchase orders',
      code: 'INTERNAL_ERROR',
    };
    return res.status(500).json(response);
  }
}
