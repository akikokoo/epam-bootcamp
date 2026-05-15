# AI Output — WITHOUT Memory Banks

**Test Task:** Generate a POST `/api/purchase-orders` API endpoint for creating a purchase order in NexusERP.

**Prompt used (generic, no project context):**
```
Generate an API endpoint for creating a purchase order. Use Node.js and Express.
Include basic validation and error handling.
```

---

## Generated Code

```javascript
const express = require('express');
const router = express.Router();

// Create purchase order
router.post('/purchase-orders', async (req, res) => {
  try {
    const { supplierId, items, notes } = req.body;

    // Basic validation
    if (!supplierId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      total += item.quantity * item.unitPrice;
    }

    // Save to database (using generic ORM pattern)
    const purchaseOrder = await db.purchaseOrders.create({
      data: {
        supplierId,
        items,
        total,
        notes,
        status: 'pending',
        createdAt: new Date()
      }
    });

    res.status(201).json({
      message: 'Purchase order created successfully',
      data: purchaseOrder
    });

  } catch (error) {
    console.log('Error creating purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
```

---

## Issues Found

- ❌ **Wrong language:** JavaScript instead of TypeScript (project uses TypeScript strictly)
- ❌ **No `tenantId`:** No multi-tenant isolation — any user can see any company's data
- ❌ **Wrong status value:** Uses `'pending'` instead of `'DRAFT'` (the defined lifecycle state)
- ❌ **Wrong error response shape:** Uses `{ message: string }` instead of `{ error: string, code: string }`
- ❌ **`console.log` in production code:** Project requires structured logger (`src/lib/logger.ts`)
- ❌ **No authentication middleware:** No JWT verification; any unauthenticated request would succeed
- ❌ **No Zod validation:** Project requires Zod schema validation (same schema on front + back)
- ❌ **Wrong ORM usage:** Uses `db.purchaseOrders.create` — should be Prisma 5 syntax
- ❌ **No TypeScript types:** No `Request`, `Response` types, no typed body
- ❌ **CommonJS syntax:** Uses `require` / `module.exports` — project uses ES modules

**Estimated Correction Time:** ~45 minutes to rewrite to TypeScript, add tenantId, fix error shape,
replace console.log, add Zod validation, add auth middleware, fix status enum.
