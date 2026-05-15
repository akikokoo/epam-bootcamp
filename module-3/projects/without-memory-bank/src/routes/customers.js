const express = require('express');
const router = express.Router();

// In-memory store (no real DB, no tenant isolation)
let customers = [];

// Create customer (no auth, no validation, no tenant scoping)
router.post('/customers', (req, res) => {
  const customer = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
  };
  customers.push(customer);
  console.log('Customer created:', customer.id);  // console.log
  res.status(201).json({ message: 'Customer created', customer });
});

// Get all customers — no pagination, no tenant filter
router.get('/customers', (req, res) => {
  res.json(customers);  // returns ALL customers from ALL companies!
});

// Update customer — no ownership check
router.put('/customers/:id', (req, res) => {
  const index = customers.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }
  customers[index] = { ...customers[index], ...req.body };
  res.json(customers[index]);
});

module.exports = router;
