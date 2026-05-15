# NexusERP — WITH Memory Bank

> **Purpose:** This project demonstrates what AI generates when the same generic prompt is
> used BUT memory bank files are loaded in context (architecture, conventions, domain, roles).

## Memory Banks Loaded

| File | Impact |
|------|--------|
| `memory-banks/architecture/overview.md` | TypeScript, Prisma 5, module structure, multi-tenancy |
| `memory-banks/conventions/coding-standards.md` | Error shape, logger, no console.log, ES modules |
| `memory-banks/domain/glossary.md` | `DRAFT` status, `tenantId` rule, lifecycle states |
| `memory-banks/roles/developer.md` | Routes/controller/service separation pattern |

## What Was Asked (same prompt as without-memory-bank)

```
Generate an API endpoint for creating a purchase order and managing customers.
Use Node.js and Express. Include basic validation and error handling.
```

## Improvements Over Without-Memory-Bank Version

| Feature | Without | With |
|---------|---------|------|
| Language | JavaScript | TypeScript (strict) |
| Auth | None | JWT middleware on every route |
| Tenant isolation | None | `tenantId` on every query |
| Status values | `'pending'` | `PurchaseOrderStatus.DRAFT` (correct enum) |
| Error shape | `{ message }` | `{ error, code }` (API contract) |
| Logging | `console.log` | Structured `logger.info/error` |
| Validation | Manual `if` checks | Zod schemas (exportable to frontend) |
| Rate limiting | None | 100 req/min per IP |
| Error handling | Partial | Centralized `error.middleware.ts` |
| Module structure | Flat files | routes / controller / service layers |

## File Structure

```
src/
  app.ts                          ← Express app with rate limiting + error middleware
  types/
    api.ts                        ← Shared ErrorResponse interface
  lib/
    logger.ts                     ← Structured logger (never console.log)
    prisma.ts                     ← Prisma singleton
  middleware/
    auth.middleware.ts            ← JWT verification + tenantId injection
    error.middleware.ts           ← Centralized error handler
  modules/
    inventory/
      inventory.routes.ts         ← Route definitions with authMiddleware
      inventory.controller.ts     ← Zod validation + request handling
      inventory.service.ts        ← Business logic + Prisma queries
    sales/
      sales.routes.ts
      sales.controller.ts
      sales.service.ts
```

## Estimated Fix Time

~5 minutes — only minor remaining issues:
- Export Zod schemas to a shared package for frontend reuse
- Add integration tests (requires explicit prompt)

---

Compare this with `../without-memory-bank/` to see the difference memory banks make.
