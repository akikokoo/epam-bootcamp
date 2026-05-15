# Developer Context — NexusERP

Context for developers implementing Stories in the NexusERP codebase.

---

## Your Primary References (in order)

1. **The Story file** in `specs/stories/` — defines exactly what to build and acceptance criteria
2. **`AGENTS.md`** — tech stack, naming conventions, quality standards
3. **`memory-banks/conventions/coding-standards.md`** — expanded coding standards with examples
4. **`memory-banks/domain/glossary.md`** — domain terms and business rules
5. **`specs/adrs/`** — architectural decisions; consult before touching architecture

---

## Before You Write Any Code

- [ ] Locate the Story file. If it doesn't exist, do not implement — request spec first.
- [ ] Read all acceptance criteria in the Story. Implement exactly those, no more.
- [ ] Check if any ADR applies to what you're building.
- [ ] Create your feature branch: `feature/STORY-{id}-{short-name}`

---

## Implementing an API Endpoint (Checklist)

When implementing any new API endpoint:

- [ ] Route defined in `src/modules/{module}/{module}.routes.ts`
- [ ] Controller handles HTTP — no business logic in controller
- [ ] Service contains business logic — no Prisma calls directly in service when complex
- [ ] Repository handles all Prisma queries; EVERY query includes `tenantId` filter
- [ ] Input validated with Zod schema (same schema exported for frontend use)
- [ ] Response uses standard error shape `{ error: string, code: string }` on failures
- [ ] Structured logger (`src/lib/logger.ts`) used for info/error events
- [ ] JWT middleware applied to all authenticated routes
- [ ] Rate limiting applied (already global via middleware)
- [ ] Integration test covers: happy path + at least one validation error + one auth error

---

## Common Mistakes to Avoid

| Mistake | Correct Approach |
|---------|-----------------|
| `console.log(...)` | `logger.info(...)` from `src/lib/logger.ts` |
| `catch (e: any)` | `catch (error: unknown)` with type guard |
| Prisma query without `tenantId` | Always `where: { tenantId, ...rest }` |
| Returning `500` for validation errors | `400` for client errors, `500` for server errors |
| Implementing beyond Story spec | Stop at acceptance criteria; open new Story for extras |
| Mocking DB in integration tests | Use test DB seeded with `prisma db seed` |

---

## Financial Module Caution

Any code touching `payroll`, `invoices`, `transactions`, or `P&L`:
- Wrap multi-table operations in a Prisma transaction (`prisma.$transaction`)
- Test with edge cases: zero salary, negative adjustments, multi-currency amounts
- 100% test coverage required (not just 80%)

---

## Useful Commands

```bash
npm run dev           # Start dev server (backend :3000, frontend :5173)
npm run typecheck     # TypeScript check without emitting
npm run lint          # ESLint
npm test              # All tests
npm run test:unit     # Unit tests only
npm run test:int      # Integration tests only (requires test DB)
npx prisma studio     # Browse DB visually
npx prisma migrate dev --name {name}   # Create a new migration
```
