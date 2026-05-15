# Research: InnovatEPAM Portal Phase 1 MVP

**Branch**: `001-innovation-management` | **Date**: 2026-05-15

## Authentication & Session Management

**Decision**: Cookie-based session with a server-generated token stored in an HttpOnly cookie. Session records stored in SQLite via Prisma.

**Rationale**: Simplest approach for a local MVP with no external identity provider. HttpOnly cookies prevent XSS access to session tokens. No JWT dependency needed — token is just a random UUID looked up against the sessions table.

**Alternatives considered**:
- JWT (stateless): Adds complexity (signing keys, expiry edge cases) for no benefit in a single-server local app.
- NextAuth.js: Overkill for local MVP; introduces provider configuration overhead.
- iron-session: Good library but adds a dependency; raw cookie + DB lookup is simpler for this scope.

**Implementation**: Generate a random UUID token on login, store `{ userId, token, expiresAt }` in the `Session` table, set `Set-Cookie: session=<token>; HttpOnly; SameSite=Lax; Path=/`. On each request, read the cookie and look up the session.

---

## Password Hashing

**Decision**: `bcrypt` with cost factor 12.

**Rationale**: Industry standard for password hashing. Cost factor 12 provides strong security with acceptable local performance (<200ms for dev use).

**Alternatives considered**:
- argon2: Slightly more modern but requires native bindings; bcrypt has wider Next.js compatibility.
- Plain SHA-256: Never acceptable for passwords.

---

## File Storage

**Decision**: Store uploaded files in `public/uploads/` using the original filename prefixed with a UUID to prevent collisions. Reference the relative path in the database. Serve files as static assets via Next.js built-in static file serving.

**Rationale**: Zero-configuration for local MVP. No external storage service (S3, Cloudinary) needed. `public/` directory is served automatically by Next.js.

**Alternatives considered**:
- `/api/files/[id]` protected route: Adds auth-gated download logic; out of scope for Phase 1.
- External object storage: Unnecessary complexity for local use.

**Constraints**:
- Max file size enforced in the API route before saving (10MB limit).
- Allowed types: PDF, PNG, JPG, JPEG, DOCX — validated by MIME type and extension.

---

## Database & ORM

**Decision**: SQLite via Prisma ORM.

**Rationale**: Zero-configuration, file-based database perfect for local development. Prisma provides type-safe queries, schema migrations, and a seeding mechanism. No separate database server required.

**Alternatives considered**:
- PostgreSQL: Requires a running server; overkill for local demo.
- Raw SQL with `better-sqlite3`: No ORM benefits; manual migration management.

---

## UI Component Library

**Decision**: shadcn/ui with Tailwind CSS.

**Rationale**: shadcn/ui components are copy-pasted into the project (not a black-box dependency), fully customizable, accessible by default, and styled with Tailwind. Aligns with the constitution's approved stack.

**Key components to use**: `Button`, `Input`, `Label`, `Select`, `Textarea`, `Card`, `Badge`, `Table`, `Form`.

---

## Date Formatting

**Decision**: `date-fns` for all date display formatting.

**Rationale**: Lightweight, tree-shakeable, no locale setup required for simple formatting (e.g., `format(date, 'MMM d, yyyy')`).

---

## Testing Approach

**Decision**: Manual testing only for Phase 1 MVP.

**Rationale**: Constitution and course requirements explicitly state no automated tests are needed. Manual test coverage via acceptance scenarios in spec.md is sufficient.

---

## Admin Provisioning

**Decision**: Seed script (`prisma/seed.ts`) creates one admin account: `admin@innovatepam.local` / `Admin123!`.

**Rationale**: Simplest approach for local MVP. No admin registration UI needed. Developer runs `npx prisma db seed` once.
