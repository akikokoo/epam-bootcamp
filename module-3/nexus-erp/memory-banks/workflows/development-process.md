# Development Workflow — NexusERP

---

## Development Process

### The Spec-First Principle

NexusERP is built spec-first. The hierarchy is enforced:

```
PRD (product requirements)
  └── Epic (feature area)
        └── Story (implementable unit with acceptance criteria)
              └── Implementation (code + tests)
```

**No code is written before a Story exists.** This is a hard rule.

### From Idea to Production

1. **Identify need** → link to PRD goals or existing Epic
2. **Write / locate Story** in `specs/stories/` with acceptance criteria
3. **Check ADRs** in `specs/adrs/` if the story touches architecture decisions
4. **Create feature branch** from `develop` (see Branching Strategy)
5. **Write failing tests first** (TDD) that match Story acceptance criteria
6. **Implement** until tests pass; do not implement beyond the Story spec
7. **Self-review:** run `npm run lint`, `npm run typecheck`, `npm test`
8. **Open PR** against `develop` following the PR template
9. **Code review** — at least one approval required
10. **Merge to `develop`** → auto-deploys to staging
11. **QA validates** against Story acceptance criteria on staging
12. **Manual promote** to production when QA approves

---

## Branching Strategy

- **Pattern:** GitHub Flow (simplified Git Flow)
- **Main branches:**
  - `main` — production; never commit directly
  - `develop` — integration branch; auto-deploys to staging on push
- **Feature branches:** `feature/{story-id}-{short-description}`
  - Example: `feature/STORY-inventory.03-create-purchase-order`
- **Bug fixes:** `bugfix/{issue-number}-{short-description}`
- **Hotfixes (production):** `hotfix/{issue-number}-{short-description}` — branches from `main`

**Protection rules:**
- `main` requires PR + at least 1 approval + all CI checks passing
- `develop` requires PR + all CI checks passing
- Direct push to `main` or `develop` is blocked

---

## Pull Request Process

### Before Creating a PR

- [ ] All tests passing locally (`npm test`)
- [ ] TypeScript compiles with zero errors (`npm run typecheck`)
- [ ] ESLint passes with zero warnings (`npm run lint`)
- [ ] No `console.log` or `any` type in changed files
- [ ] Self-review completed: does the code match the Story acceptance criteria exactly?
- [ ] If architecture decisions were needed, ADR drafted in `specs/adrs/`

### PR Requirements

- **Title:** `[STORY-{id}] Short description` (e.g., `[STORY-inventory.03] Create purchase order endpoint`)
- **Description:** Link to the Story file; paste acceptance criteria; list what was implemented
- **Reviewers:** Minimum 1 required approval
- **Checks:** All GitHub Actions workflows must pass (lint, typecheck, unit tests, integration tests)
- **Size:** Keep PRs small — one Story per PR; no bundled multi-story PRs

### Code Review Checklist

Reviewer verifies:
- [ ] Implementation matches Story acceptance criteria (no more, no less)
- [ ] Follows naming conventions from `AGENTS.md` / `conventions/coding-standards.md`
- [ ] Tests cover happy path + at least one error case per endpoint
- [ ] No `any` TypeScript types
- [ ] Errors use the standard `{ error: string, code: string }` shape
- [ ] Structured logger used instead of `console.log`
- [ ] `tenantId` enforced in all repository queries
- [ ] No secrets or credentials in code

---

## Testing Strategy

### Test Types

| Type | What to Test | Location |
|------|-------------|---------|
| Unit | Utility functions, service methods, calculation logic | `tests/unit/` |
| Integration | API endpoints (request → DB → response) | `tests/integration/` |
| Component | User interactions: form submit, validation, loading states | `tests/components/` |

### Coverage Requirements

- **Minimum:** 80% code coverage for all backend services
- **Critical code:** 100% for payroll calculation, financial transaction logic, auth middleware
- **Frontend:** Component tests for all interactive elements

### Test Database

Integration tests use a dedicated PostgreSQL test database:
- Connection string in `DATABASE_URL_TEST` environment variable
- Seeded before tests via `prisma db seed`
- **Never mock the database** in integration tests — real DB only

### TDD Approach

1. Write the test (it should fail — `npm test` → RED)
2. Write minimal implementation to make it pass (GREEN)
3. Refactor for clarity and standards compliance (REFACTOR)

---

## Deployment Process

### Staging (Automatic)

1. Push / merge to `develop` branch
2. GitHub Actions runs: lint → typecheck → unit tests → integration tests
3. If all pass: deploy to Railway staging environment
4. Health check: `GET /api/health` must return `200 OK`
5. Automatic Prisma migrations run on deploy (`prisma migrate deploy`)

### Production (Manual)

1. QA confirms Story acceptance criteria are met on staging
2. Create a GitHub Release tag (e.g., `v1.2.0`)
3. Trigger `promote-to-production` workflow in GitHub Actions
4. Same health check as staging
5. Monitor error logs for 30 minutes post-deploy

### Rollback Procedure

- **Staging:** Re-deploy previous commit via Railway dashboard (< 2 min)
- **Production:** Revert to previous Railway deployment via dashboard (< 2 min)
- If migration was applied: contact DBA — never auto-rollback DB migrations without review

### Verification After Deployment

- [ ] `GET /api/health` returns `200 OK`
- [ ] Can log in as test tenant Owner
- [ ] Smoke test: create a product, create a purchase order

---

## Local Development Setup

```bash
git clone <repo>
cd nexus-erp
npm install
cp .env.example .env          # Fill in DATABASE_URL, JWT_SECRET, etc.
npx prisma migrate dev        # Apply migrations + seed
npm run dev                   # Starts backend on :3000 and frontend on :5173
npm test                      # Run all tests
```

**Required local services:**
- Node.js 20 LTS
- PostgreSQL 15 (local or Docker)
- No other services needed (no Redis, no message queue)
