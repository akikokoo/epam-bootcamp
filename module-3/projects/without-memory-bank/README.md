# NexusERP — WITHOUT Memory Bank

> **Purpose:** This project demonstrates what AI generates when given only a generic prompt
> with no project-specific context (no memory banks loaded).

## What Was Asked

```
Generate an API endpoint for creating a purchase order and managing customers.
Use Node.js and Express. Include basic validation and error handling.
```

## Problems in This Code

| Issue | File | Why It Matters |
|-------|------|----------------|
| ❌ JavaScript, not TypeScript | All files | No type safety, runtime bugs harder to catch |
| ❌ `console.log` in production | `purchaseOrders.js:54`, `customers.js:14` | Unstructured logs, can leak sensitive data |
| ❌ No `tenantId` isolation | `purchaseOrders.js:18`, `customers.js:26` | Any user can read ANY company's data |
| ❌ Wrong status `'pending'` | `purchaseOrders.js:45` | Should be `'DRAFT'` per domain lifecycle |
| ❌ Wrong error shape `{ message }` | Multiple | Should be `{ error, code }` per API contract |
| ❌ No auth middleware | `index.js` | Any unauthenticated request succeeds |
| ❌ No Zod validation | All routes | No shared schema, frontend/backend can drift |
| ❌ No rate limiting | `index.js` | Vulnerable to brute force and DDoS |
| ❌ CommonJS `require` / `module.exports` | All files | Project uses ES modules |
| ❌ No error middleware | `index.js` | Unhandled errors may leak stack traces |

## Estimated Fix Time

~45 minutes to rewrite to TypeScript, add tenantId isolation, fix error shapes,
replace console.log with structured logger, add Zod validation, add auth middleware,
fix status enum, add rate limiting.

## File Structure

```
src/
  index.js              ← no auth, no rate limiting, no error middleware
  routes/
    purchaseOrders.js   ← JavaScript, no tenantId, wrong status, console.log
    customers.js        ← no auth, no tenant isolation, no pagination
```

---

Compare this with `../with-memory-bank/` to see the memory bank impact.
