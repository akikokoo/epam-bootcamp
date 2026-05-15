# Coding Standards — NexusERP

Source of truth: `AGENTS.md` in the project root. This file expands on it with examples.

---

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables / functions | camelCase | `purchaseOrderId`, `calculatePayroll()` |
| React components | PascalCase | `PurchaseOrderForm`, `StockLevelCard` |
| Files (components) | PascalCase | `PurchaseOrderForm.tsx` |
| Files (utils/services/routes) | kebab-case | `purchase-order.service.ts`, `stock-level.routes.ts` |
| Database tables | snake_case | `purchase_orders`, `tenant_id` |
| Database columns | snake_case | `created_at`, `reorder_level` |
| API routes | kebab-case | `/api/purchase-orders`, `/api/sales-orders` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE` |
| Spec files | per AGENTS.md | `PRD-nexus-erp.md`, `EPIC-01-inventory.md` |
| Test files | `{module}.test.ts` | `purchase-order.service.test.ts` |

One React component per file — no exception.

---

## File Structure

```
src/
  modules/
    inventory/
      inventory.routes.ts
      inventory.controller.ts
      inventory.service.ts
      inventory.repository.ts
    sales/
    finance/
    hr/
    analytics/
  lib/
    logger.ts       # Structured logger — use this, never console.log
    prisma.ts       # Prisma client singleton
    auth.ts         # JWT helpers
  middleware/
    auth.middleware.ts
    error.middleware.ts
    rate-limit.middleware.ts
  types/
    api.ts          # Shared API types (ErrorResponse, etc.)
```

---

## Code Organization

- Maximum function length: 40 lines (extract helpers if longer)
- One class per file (or one module export)
- DRY: extract shared logic when the same block appears 3+ times
- All async functions wrapped in try/catch; never let unhandled rejections propagate
- No `any` type in TypeScript — use explicit types or `unknown` with type guards

---

## Error Handling

All API errors must use the standard shape:

```typescript
// src/types/api.ts
export interface ErrorResponse {
  error: string;   // human-readable message
  code: string;    // machine-readable error code, e.g. "STOCK_INSUFFICIENT"
}
```

HTTP status codes follow REST conventions:
- `400` Bad Request (validation failure)
- `401` Unauthorized (missing / invalid token)
- `403` Forbidden (valid token, insufficient permissions)
- `404` Not Found
- `409` Conflict (e.g., duplicate SKU)
- `500` Internal Server Error

Error middleware at `src/middleware/error.middleware.ts` catches all unhandled errors
and returns the standard `ErrorResponse` shape. Never return stack traces to clients.

---

## Logging

Use the structured logger at `src/lib/logger.ts`. **Never use `console.log` in production code.**

```typescript
import { logger } from '@/lib/logger';

// Correct usage:
logger.info('Purchase order created', { orderId, tenantId });
logger.error('Payroll calculation failed', { error, employeeId });
logger.warn('Low stock threshold reached', { productId, currentLevel });
```

Log levels: `error` > `warn` > `info` > `debug`.
In production, only `info` and above are emitted.

---

## Comments

JSDoc only on exported functions with non-obvious parameters:

```typescript
/**
 * Calculates gross payroll for a single employee.
 * @param overtimeHours - hours beyond the standard 45h/week; multiplied by 1.5x
 */
export function calculateGrossPayroll(employee: Employee, overtimeHours: number): number
```

Do not comment what the code does; only comment *why* if it's non-obvious.
No TODO comments in committed code — use GitHub Issues instead.

---

## Testing Requirements

- **Unit tests:** all utility functions and service methods — ≥80% coverage
- **Integration tests:** all API endpoints — happy path + at least one error case each
- **Component tests:** all user-facing interactions — form submit, validation, loading states

**Test file naming:**
- Backend: `{module}.test.ts` (e.g., `inventory.service.test.ts`)
- Frontend: `{Component}.test.tsx` (e.g., `PurchaseOrderForm.test.tsx`)

**Test organization:** mirror `src/` structure in `tests/`

**Never mock the database in integration tests** — use a dedicated test database seeded
via `prisma db seed`. This prevents mock/prod divergence that masks broken migrations.

**TDD approach:** write failing tests first, implement to pass, then refactor.

---

## Imports Order

```typescript
// 1. External packages
import express from 'express';
import { z } from 'zod';

// 2. Internal modules (absolute imports with @/ alias)
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

// 3. Relative imports
import { validatePurchaseOrder } from './inventory.validators';
```

Blank line between each group. Enforced by ESLint import/order rule.

---

## Security Requirements

- Never commit secrets — use environment variables defined in `.env.example`
- Rate limiting: 100 req/min per IP on all public endpoints (enforced by `rate-limit.middleware.ts`)
- Sensitive fields (national ID, salary amounts) encrypted at column level in PostgreSQL
- All data encrypted in transit (TLS 1.3); encrypted at rest (AES-256 via hosting provider)
- Accessible UI: ARIA labels on interactive elements, keyboard-navigable modals

---

## Quality Criteria — Definition of Done

A story is "done" when:
- [ ] Acceptance criteria from the Story file are fully implemented
- [ ] Unit and integration tests written and passing
- [ ] Test coverage ≥80% for new code
- [ ] TypeScript compiles with zero errors (`tsc --noEmit`)
- [ ] ESLint passes with zero warnings
- [ ] No `console.log` or `any` type in committed code
- [ ] API responses follow the standard `ErrorResponse` shape
- [ ] PR reviewed and approved by at least one reviewer
- [ ] `AGENTS.md` consulted before implementation; no deviations without ADR
