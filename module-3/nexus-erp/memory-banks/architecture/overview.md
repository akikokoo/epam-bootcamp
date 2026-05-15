# Architecture Overview — NexusERP

## System Architecture

### Pattern: Modular Monolith (Phase 1 MVP)

NexusERP uses a modular monolith architecture for the MVP phase to support:
- Single-developer deployment within 12 weeks
- Minimal operational complexity (one app to deploy, one DB to manage)
- Clear module boundaries that can be extracted to microservices later if needed

The application is organized as domain modules (inventory, sales, finance, hr, analytics)
inside a single Express backend. Each module owns its routes, controllers, services, and
Prisma schema models.

### Core Components

- **React SPA (Frontend):** Single-page application served as static files from CDN or the same host
- **Express API Server (Backend):** RESTful API server; all business logic lives here
- **PostgreSQL 15 Database:** Single relational database, multi-tenant via `tenantId` column
- **Prisma 5 ORM:** Schema-first migrations and type-safe query builder

### Communication

- **Frontend ↔ Backend:** REST API over HTTPS. JSON payloads. All endpoints prefixed `/api/`
- **Authentication:** JWT access token (15 min TTL) + refresh token (7 days) stored in HTTP-only cookies
- **No message queues in MVP** — all operations are synchronous request/response

### Multi-Tenancy

Every business entity table has a `tenant_id` foreign key column. The repository layer
enforces `WHERE tenant_id = $tenantId` on every query. Tenants are fully isolated at the
data level — no cross-tenant queries are possible through the API.

### Data Flow

```
Browser → HTTPS → Express Router → Controller → Service → Prisma Repository → PostgreSQL
                                        ↓
                                  JWT Middleware (validates token, injects req.tenantId)
```

---

## Tech Stack

### Backend
- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js 20 LTS
- **Framework:** Express 4.x
- **ORM:** Prisma 5 (schema migrations via `prisma migrate deploy`)
- **Auth:** JWT (jsonwebtoken) — access tokens 15 min, refresh tokens 7 days
- **Validation:** Zod (same schema shared between frontend and backend via a shared package)
- **Logging:** Structured logger at `src/lib/logger.ts` (no `console.log` in production)
- **Rate limiting:** `express-rate-limit` — 100 req/min per IP on all public endpoints

### Frontend
- **Framework:** React 18
- **Build tool:** Vite
- **Language:** TypeScript
- **UI Library:** shadcn/ui (component primitives built on Radix UI)
- **Styling:** Tailwind CSS
- **State Management:** React Query (server state) + React Context (UI state)
- **Form validation:** Zod (same schemas as backend via shared package)

### Database
- **Engine:** PostgreSQL 15
- **Hosting:** Railway or Supabase (managed — no self-managed server)
- **ORM:** Prisma 5
- **Backups:** Automated daily backups via hosting provider, 30-day retention

### Infrastructure
- **Cloud Provider:** Railway (app + DB) or Vercel (frontend) + Supabase (DB)
- **Containers:** Not used in MVP — direct process deployment on Railway
- **CI/CD:** GitHub Actions
- **Secrets:** Environment variables; never committed; defined in `.env.example`

### Testing
- **Backend unit + integration:** Jest + Supertest
- **Frontend component:** Jest + React Testing Library + MSW (Mock Service Worker)
- **Test DB:** Separate PostgreSQL database seeded via `prisma db seed`

---

## Deployment

### Environments

| Environment | Trigger | Purpose |
|-------------|---------|---------|
| `development` | Local `npm run dev` | Active development |
| `staging` | Push to `develop` branch | QA validation before release |
| `production` | Manual promotion from staging | Live SME tenants |

### CI/CD Pipeline (GitHub Actions)

1. Push to any branch triggers lint + type-check + unit tests
2. Push to `develop` branch additionally runs integration tests and deploys to staging
3. Manual `workflow_dispatch` promotes staging build to production
4. Health-check endpoint (`/api/health`) verified after each deployment

### Deployment Strategy

- **MVP:** Rolling deployment (Railway restarts single process)
- **Rollback:** Revert to previous Railway deployment via dashboard (< 2 minutes)

### Key Environment Variables

```
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET            # Access token signing key
JWT_REFRESH_SECRET    # Refresh token signing key
NODE_ENV              # development | staging | production
```

---

## Key Architectural Decisions

See `specs/adrs/` for full ADRs.

- **ADR-01:** PostgreSQL 15 chosen over MySQL/MongoDB for ACID guarantees on financial data
  and strong TypeScript/Prisma ecosystem support.
- **Multi-tenancy via tenantId** (not separate schemas/databases) for cost efficiency at MVP scale.
- **Spec-first development** — no code is written before a Story with acceptance criteria exists.
- **No AI-powered features in MVP** — explicitly out of scope per PRD Section 7.
