import { Request, Response } from 'express';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ErrorResponse } from '@/types/api';
import { salesService } from './sales.service';

export const createCustomerSchema = z.object({
  name: z.string().min(2).max(200),
  taxId: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function createCustomerHandler(req: Request, res: Response) {
  const parsed = createCustomerSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: ErrorResponse = {
      error: parsed.error.errors[0]?.message ?? 'Invalid customer data',
      code: 'VALIDATION_ERROR',
    };
    return res.status(400).json(response);
  }

  try {
    const customer = await salesService.createCustomer({
      ...parsed.data,
      tenantId: req.tenantId,
    });

    logger.info('Customer created', { customerId: customer.id, tenantId: req.tenantId });
    return res.status(201).json(customer);
  } catch (error: unknown) {
    logger.error('Failed to create customer', { error, tenantId: req.tenantId });
    const response: ErrorResponse = {
      error: 'Failed to create customer',
      code: 'INTERNAL_ERROR',
    };
    return res.status(500).json(response);
  }
}

export async function listCustomersHandler(req: Request, res: Response) {
  try {
    const customers = await salesService.listCustomers({ tenantId: req.tenantId });
    return res.json(customers);
  } catch (error: unknown) {
    logger.error('Failed to list customers', { error, tenantId: req.tenantId });
    const response: ErrorResponse = {
      error: 'Failed to list customers',
      code: 'INTERNAL_ERROR',
    };
    return res.status(500).json(response);
  }
}
