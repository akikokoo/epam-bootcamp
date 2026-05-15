const express = require('express');
const router = express.Router();

// Simulated DB object (no ORM, no type safety)
const db = {
  purchaseOrders: {
    create: async (data) => ({ id: 'po-123', ...data.data }),
  },
};

// Create purchase order
router.post('/purchase-orders', async (req, res) => {
  try {
    const { supplierId, items, notes } = req.body;

    // Basic validation (no Zod, no type checking)
    if (!supplierId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Calculate total (no type safety)
    let total = 0;
    for (const item of items) {
      total += item.quantity * item.unitPrice;
    }

    // Save to database (wrong ORM syntax, no tenantId isolation)
    const purchaseOrder = await db.purchaseOrders.create({
      data: {
        supplierId,
        items,
        total,
        notes,
        status: 'pending',       // wrong: should be 'DRAFT' per domain lifecycle
        createdAt: new Date(),
      },
    });

    res.status(201).json({
      message: 'Purchase order created successfully',  // wrong error shape
      data: purchaseOrder,
    });

  } catch (error) {
    console.log('Error creating purchase order:', error);  // console.log in prod!
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all purchase orders (no tenant isolation — returns ALL tenants' data!)
router.get('/purchase-orders', async (req, res) => {
  try {
    const orders = []; // stub
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
