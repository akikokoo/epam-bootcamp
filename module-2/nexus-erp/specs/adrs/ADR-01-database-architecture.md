# ADR-01: PostgreSQL 15 as Primary Database

## Status
Accepted

## Context
NexusERP requires a relational database to store structured ERP data across multiple tenants:
orders, invoices, employees, transactions, stock movements. Key constraints:

- MVP must be deployable by a single developer; operational complexity must be minimal.
- Multi-tenant architecture requires strong row-level isolation.
- Cost target: database hosting under $50/month for a typical SME tenant.
- The team has existing PostgreSQL expertise; no prior production experience with alternatives.

## Decision

We will use **PostgreSQL 15** as the sole primary database, accessed via **Prisma 5** ORM.

Specific choices:
1. **Database:** PostgreSQL 15 (latest stable at project start)
2. **Hosting:** Railway or Supabase (managed PostgreSQL — no self-managed server)
3. **ORM:** Prisma 5 for type-safe schema management, migrations, and queries
4. **Multi-tenancy:** `tenantId` foreign key on every business entity table; all queries
   include a `WHERE tenant_id = $tenantId` clause enforced at the repository layer
5. **Backups:** Automated daily backups via hosting provider with 30-day retention

## Consequences

### Positive
- Single database to operate, backup, and monitor — minimizes DevOps overhead for a solo developer.
- Prisma handles schema migrations and provides type-safe query builders.
- Managed hosting (Railway/Supabase) eliminates infrastructure setup time.
- PostgreSQL's ACID guarantees are critical for financial data integrity (e.g., payroll finalization + expense posting in one transaction).

### Negative
- Managed hosting introduces vendor dependency for database availability; mitigated by choosing providers with ≥99.9% SLA.
- Prisma migration workflow requires discipline — schema changes must go through migration files, not ad-hoc SQL.
- If we later need full-text or vector search at scale, PostgreSQL extensions (pg_trgm, pgvector) can be added without migrating to a different system.

## Alternatives Considered

### Option A: MySQL 8
- Rejected: weaker JSON support and less mature tooling ecosystem for TypeScript/Prisma compared to PostgreSQL. No meaningful advantage for this use case.

### Option B: MongoDB
- Rejected: financial data (invoices, payroll, multi-currency transactions) has highly relational structure; a document database would require duplicating data and managing referential integrity manually. Also, ACID transactions across collections in MongoDB are more complex than PostgreSQL.

### Option C: SQLite
- Rejected: does not support concurrent write loads from multiple simultaneous users in a multi-tenant web application.
