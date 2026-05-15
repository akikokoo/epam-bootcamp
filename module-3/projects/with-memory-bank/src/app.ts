import express from 'express';
import rateLimit from 'express-rate-limit';
import inventoryRoutes from '@/modules/inventory/inventory.routes';
import salesRoutes from '@/modules/sales/sales.routes';
import { errorMiddleware } from '@/middleware/error.middleware';

const app = express();

app.use(express.json());

// Rate limiting: 100 req/min per IP on all endpoints
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api', inventoryRoutes);
app.use('/api', salesRoutes);

// Centralized error handler — always last
app.use(errorMiddleware);

export default app;
