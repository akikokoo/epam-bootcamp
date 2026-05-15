# AI Output — WITH Memory Banks

**Test Task:** Generate a POST `/api/purchase-orders` API endpoint for creating a purchase order in NexusERP.

**Prompt used (same generic task, but memory banks loaded in context):**
```
Generate an API endpoint for creating a purchase order. Use Node.js and Express.
Include basic validation and error handling.
```

**Memory banks loaded:** `architecture/overview.md`, `conventions/coding-standards.md`,
`domain/glossary.md`, `AGENTS.md`

---

## Generated Code

```typescript
// src/modules/inventory/inventory.routes.ts
import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { createPurchaseOrderHandler } from './inventory.controller';

const router = Router();

router.post('/purchase-orders', authMiddleware, createPurchaseOrderHandler);

export default router;
```

```typescript
// src/modules/inventory/inventory.controller.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ErrorResponse } from '@/types/api';
import { inventoryService } from './inventory.service';

const createPurchaseOrderSchema = z.object({
  supplierId: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
  })).min(1),
  notes: z.string().optional(),
});

export async function createPurchaseOrderHandler(req: Request, res: Response) {
  const parsed = createPurchaseOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    const response: ErrorResponse = {
      error: 'Invalid purchase order data',
      code: 'VALIDATION_ERROR',
    };
    return res.status(400).json(response);
  }

  try {
    const order = await inventoryService.createPurchaseOrder({
      ...parsed.data,
      tenantId: req.tenantId,   // injected by authMiddleware
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
```

```typescript
// src/modules/inventory/inventory.service.ts
import { prisma } from '@/lib/prisma';
import { PurchaseOrderStatus } from '@prisma/client';

interface CreatePurchaseOrderInput {
  tenantId: string;
  supplierId: string;
  items: Array<{ productId: string; quantity: number; unitPrice: number }>;
  notes?: string;
}

export const inventoryService = {
  async createPurchaseOrder(input: CreatePurchaseOrderInput) {
    const { tenantId, supplierId, items, notes } = input;

    return prisma.purchaseOrder.create({
      data: {
        tenantId,
        supplierId,
        status: PurchaseOrderStatus.DRAFT,   // correct enum, not 'pending'
        notes,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: { items: true },
    });
  },
};
```

---

## Improvements vs Without Memory Banks

- ✅ **TypeScript throughout:** typed `Request`, `Response`, typed service input interface
- ✅ **`tenantId` enforced:** injected by `authMiddleware`, passed to service, stored on every record
- ✅ **Correct status enum:** `PurchaseOrderStatus.DRAFT` (matches domain glossary lifecycle)
- ✅ **Standard error shape:** `{ error: string, code: string }` as defined in `types/api.ts`
- ✅ **Structured logging:** `logger.info` and `logger.error` from `src/lib/logger.ts`
- ✅ **JWT auth middleware:** `authMiddleware` applied on route — no unauthenticated access
- ✅ **Zod validation:** schema defined, reusable by frontend
- ✅ **Correct Prisma 5 syntax:** proper `prisma.purchaseOrder.create` with nested `items`
- ✅ **Correct module structure:** routes / controller / service separation as per file structure convention
- ✅ **ES module syntax:** `import`/`export` instead of `require`/`module.exports`

### Remaining Minor Issues

- ⚠️ Zod schema not yet exported to a shared package for frontend reuse (needs a separate task)
- ⚠️ Integration test file not generated (AI would need to be explicitly asked for tests)

**Estimated Correction Time:** ~5 minutes (export Zod schema, request test generation)
