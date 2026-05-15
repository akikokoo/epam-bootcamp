# Agent Instructions — NexusERP

This document defines project conventions for AI assistants working in this repository.

## 1. Project Context

NexusERP is a web-based ERP system for small and medium enterprises (5–200 employees).
It manages core business operations: inventory, procurement, sales, finance, and HR/payroll
in a single multi-tenant platform.

The system is built spec-first: every feature starts as a Story with acceptance criteria before any code is written.

## 2. Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Frontend    | React 18 + Vite + TypeScript            |
| UI Library  | shadcn/ui + Tailwind CSS                |
| Backend     | Node.js 20 + Express + TypeScript       |
| Database    | PostgreSQL 15                           |
| ORM         | Prisma 5                                |
| Auth        | JWT (access 15min) + refresh tokens 7d  |
| Testing FE  | Jest + React Testing Library + MSW      |
| Testing BE  | Jest + Supertest                        |
| CI          | GitHub Actions                          |

## 3. Specification Structure

```
specs/
  templates/     # reusable templates (PRD, Epic, Story, ADR)
  prds/          # PRD-{feature-name}.md
  epics/         # EPIC-{nn}-{name}.md
  stories/       # STORY-{epic}.{nn}-{name}.md
  adrs/          # ADR-{nn}-{title}.md
```

## 4. Naming Conventions

- **PRD:** `PRD-{feature-name}.md`
- **Epic:** `EPIC-{01..99}-{short-kebab-name}.md`
- **Story:** `STORY-{epic-slug}.{01..99}-{short-kebab-name}.md`
- **ADR:** `ADR-{01..99}-{title-kebab}.md`
- Use only lowercase letters, numbers, and hyphens in file names.

## 5. Coding Standards

- **Variables/functions:** camelCase
- **React components:** PascalCase, one component per file
- **Database tables/columns:** snake_case (managed by Prisma schema)
- **API routes:** kebab-case (`/api/purchase-orders`)
- **Imports:** external packages → internal modules → relative paths (blank line between groups)
- **No `any` type in TypeScript** — use explicit types or `unknown`
- **Error handling:** all async functions wrapped with try/catch; API errors use standard `{ error: string, code: string }` shape

## 6. Testing Requirements

- Unit tests for all utility functions (≥80% coverage).
- Integration tests for all API endpoints (happy path + at least one error case).
- Component tests for user-facing interactions (form submit, validation, loading states).
- Test file naming: `{module}.test.ts` / `{Component}.test.tsx`.
- No mocking of the database layer in integration tests — use a test database seeded via `prisma db seed`.

## 7. Quality Criteria

- No `console.log` in production code — use the structured logger (`src/lib/logger.ts`).
- All API responses include HTTP status codes consistent with REST conventions.
- All forms validated both client-side (Zod) and server-side (same Zod schema re-used).
- Accessible UI: ARIA labels on interactive elements, keyboard navigable modals.
- Rate limiting on all public endpoints (100 req/min per IP).

## 8. When Implementing Stories

1. Read the Story acceptance criteria carefully — do not implement beyond what's specified.
2. Follow naming and structural conventions from this file.
3. Write tests first (TDD), implement to make tests pass, then refactor.
4. Reference the ADR if a story touches an architectural decision.
5. Add JSDoc only on exported functions with non-obvious parameters.
6. Never commit secrets — use environment variables defined in `.env.example`.
