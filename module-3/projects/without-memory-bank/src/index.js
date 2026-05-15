const express = require('express');
const purchaseOrderRoutes = require('./routes/purchaseOrders');
const customerRoutes = require('./routes/customers');

const app = express();
app.use(express.json());

// No auth middleware, no rate limiting, no error middleware
app.use('/api', purchaseOrderRoutes);
app.use('/api', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
