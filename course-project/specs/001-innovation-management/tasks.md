# Tasks: InnovatEPAM Portal — Phase 1 MVP

**Input**: Design documents from `specs/001-innovation-management/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, configure tooling, and create baseline structure.

- [ ] T001 Update `package.json` to add `prisma`, `@prisma/client`, `bcrypt`, `@types/bcrypt`, `date-fns`, `uuid`, `@types/uuid` to dependencies
- [ ] T002 Run `npm install` to install all dependencies
- [ ] T003 [P] Initialize Prisma with SQLite: run `npx prisma init --datasource-provider sqlite` to create `prisma/schema.prisma` and set `DATABASE_URL` in `.env`
- [ ] T004 [P] Initialize shadcn/ui: run `npx shadcn@latest init` and add components: Button, Input, Label, Select, Textarea, Card, Badge, Table, Form
- [ ] T005 Create `public/uploads/` directory and add `/public/uploads/*` to `.gitignore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database schema, auth utilities, and API auth routes that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Create `prisma/schema.prisma` — define models: `User` (id, email, passwordHash, role, createdAt), `Idea` (id, title, description, category, status, submitterId, createdAt, updatedAt), `Attachment` (id, fileName, filePath, fileType, fileSize, ideaId — unique), `EvaluationComment` (id, text, adminId, ideaId, createdAt), `Session` (id, userId, token, expiresAt, createdAt); enums: `Role { submitter admin }`, `Category { TECHNICAL_INNOVATION PROCESS_IMPROVEMENT CLIENT_SOLUTION OTHER }`, `IdeaStatus { SUBMITTED UNDER_REVIEW ACCEPTED REJECTED }`
- [ ] T007 Run `npx prisma migrate dev --name init` to apply the schema and create `prisma/dev.db`
- [ ] T008 Create `prisma/seed.ts` — hash password `Admin123!` with bcrypt and upsert `{ email: "admin@innovatepam.local", role: "admin" }` in User table
- [ ] T009 Add `"prisma": { "seed": "ts-node prisma/seed.ts" }` to `package.json` and run `npx prisma db seed`
- [ ] T010 [P] Create `lib/db.ts` — export a singleton Prisma client instance using global caching to prevent multiple connections in dev
- [ ] T011 [P] Create `lib/validation.ts` — export helpers: `validateEmail(email)`, `validatePassword(password)`, `validateIdeaFields({ title, description, category })`, `validateFile({ type, size })` (allowed MIME types: pdf/png/jpg/jpeg/docx; max 10MB = 10485760 bytes)
- [ ] T012 Create `lib/auth.ts` — export `createSession(userId)` (generates UUID token, inserts Session row with 12h expiry, returns token), `getSession(token)` (looks up Session, checks expiry, returns User or null), `destroySession(token)` (deletes Session row)
- [ ] T013 Create `app/api/auth/register/route.ts` — POST: parse `{ email, password }`, run validation, check duplicate email (409 if exists), hash with bcrypt cost 12, create User with role `submitter`, return `{ success: true }` (201)
- [ ] T014 Create `app/api/auth/login/route.ts` — POST: parse `{ email, password }`, find user by email, compare password with bcrypt, call `createSession`, set `Set-Cookie: session=<token>; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200`, return `{ success: true, role }`
- [ ] T015 Create `app/api/auth/logout/route.ts` — POST: read `session` cookie, call `destroySession`, set `Set-Cookie: session=; HttpOnly; Max-Age=0`, return `{ success: true }`

**Checkpoint**: Auth API working. Can register, login (get cookie), and logout. Foundation ready for user stories.

---

## Phase 3: User Story 1 — Submit idea as a submitter (Priority: P1) 🎯 MVP

**Goal**: Submitters can register, log in, submit an idea with a file attachment, view their own ideas, and log out.

**Independent Test**: Register a new account at `/register`, log in at `/login`, submit an idea with a valid file at `/submitter/ideas`, verify the idea appears in the list, then log out.

- [ ] T016 [P] [US1] Create `components/status-badge.tsx` — renders a shadcn/ui `Badge` with color-coded labels for each `IdeaStatus` value (SUBMITTED=gray, UNDER_REVIEW=blue, ACCEPTED=green, REJECTED=red)
- [ ] T017 [P] [US1] Create `components/idea-card.tsx` — displays one idea's title, category, status (via StatusBadge), submission date formatted with date-fns, and optional attachment file name with link to `/uploads/<filename>`
- [ ] T018 [US1] Create `app/api/ideas/route.ts` — GET: verify session (401 if missing, 403 if not submitter), query ideas WHERE submitterId = userId, include attachment, return list; POST: verify session, parse multipart FormData, validate fields and file with `lib/validation.ts`, write file to `public/uploads/<uuid>-<originalName>`, create Idea + Attachment in DB, return created idea (201)
- [ ] T019 [US1] Create `app/(auth)/register/page.tsx` — Client Component with email + password form using shadcn/ui Input/Button/Label, POST to `/api/auth/register`, redirect to `/login` on success, show inline error on failure
- [ ] T020 [US1] Create `app/(auth)/login/page.tsx` — Client Component with email + password form, POST to `/api/auth/login`, redirect to `/submitter/ideas` (submitter) or `/admin/ideas` (admin) based on role in response, show inline error on failure
- [ ] T021 [US1] Create `components/idea-form.tsx` — Client Component with title (Input), description (Textarea), category (Select with 4 options), file upload (Input type=file, accept=".pdf,.png,.jpg,.jpeg,.docx"), client-side file size/type validation before submit, POST to `/api/ideas` as FormData
- [ ] T022 [US1] Create `app/submitter/ideas/page.tsx` — Server Component: read session cookie, redirect to `/login` if unauthenticated or to `/admin/ideas` if admin; fetch GET `/api/ideas`; render IdeaForm (collapsible/toggleable) and list of IdeaCards; show empty state if no ideas
- [ ] T023 [US1] Update `app/page.tsx` — Server Component: read session cookie, call `getSession`, redirect to `/submitter/ideas` (submitter), `/admin/ideas` (admin), or `/login` (no session)

**Checkpoint**: User Story 1 complete. A submitter can register, log in, submit an idea with attachment, see their ideas list, and log out.

---

## Phase 4: User Story 2 — Review ideas as an admin (Priority: P2)

**Goal**: Admins can view all submitted ideas, update idea status, and add evaluation comments.

**Independent Test**: Log in as `admin@innovatepam.local` / `Admin123!`, open `/admin/ideas`, change the status of an idea to "under review," add a comment, and verify both changes persist on refresh.

- [ ] T024 [US2] Create `app/api/admin/ideas/route.ts` — GET: verify session (401 if missing, 403 if not admin), query all ideas with `include: { submitter: true, attachment: true, comments: { include: { admin: true } } }`, return list
- [ ] T025 [US2] Create `app/api/admin/[ideaId]/status/route.ts` — PATCH: verify admin session, parse `{ status }`, validate transition (SUBMITTED→UNDER_REVIEW, UNDER_REVIEW→ACCEPTED, UNDER_REVIEW→REJECTED — all others return 400), update Idea.status, return updated idea
- [ ] T026 [US2] Create `app/api/admin/[ideaId]/comments/route.ts` — POST: verify admin session, parse `{ text }`, validate non-empty text (400 if empty), create EvaluationComment with adminId + ideaId, return created comment (201)
- [ ] T027 [US2] Create `app/admin/ideas/page.tsx` — Server Component: verify admin session (redirect to `/login` if not); Client Component for interactivity: fetch GET `/api/admin/ideas`, render each idea in a Card showing submitter email, title, category, StatusBadge, createdAt, attachment link, evaluation comments list, status update Select + Save button (PATCH `/api/admin/[ideaId]/status`), and comment Textarea + Add button (POST `/api/admin/[ideaId]/comments`)

**Checkpoint**: User Story 2 complete. Admin can log in, view all ideas, update statuses, and add comments.

---

## Phase 5: User Story 3 — Role-based access control (Priority: P3)

**Goal**: Submitters cannot reach admin screens, admins cannot reach submitter-only screens, and unauthenticated users are redirected to login from all protected routes.

**Independent Test**: Log in as submitter → navigate to `/admin/ideas` → expect redirect to `/submitter/ideas`. Log in as admin → navigate to `/submitter/ideas` → expect redirect to `/admin/ideas`. Clear cookies → navigate to `/submitter/ideas` → expect redirect to `/login`.

- [ ] T028 [US3] Update `app/layout.tsx` — Server Component: read session cookie and call `getSession`; render role-aware navigation: submitter sees "My Ideas" link + Logout button; admin sees "All Ideas" link + Logout button; unauthenticated sees "Login" + "Register" links; Logout button calls POST `/api/auth/logout` then redirects to `/login`
- [ ] T029 [US3] Verify route guard in `app/submitter/ideas/page.tsx` — confirm server-side redirect to `/login` when unauthenticated and to `/admin/ideas` when role is `admin` (should already be in T022; update if missing)
- [ ] T030 [US3] Verify route guard in `app/admin/ideas/page.tsx` — confirm server-side redirect to `/login` when unauthenticated and to `/submitter/ideas` when role is `submitter` (should already be in T027; update if missing)

**Checkpoint**: All three user stories complete and access-controlled. Full MVP is functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Empty states, error feedback, and documentation.

- [ ] T031 [P] Add empty state to `app/submitter/ideas/page.tsx` — when ideas list is empty, show a Card with message: "No ideas submitted yet. Use the form above to share your first innovation idea."
- [ ] T032 [P] Add form-level error summary to `components/idea-form.tsx` and auth forms — display all validation errors together above the submit button when submission fails
- [ ] T033 Update `README.md` — add project description, tech stack, setup instructions (npm install → prisma migrate → prisma db seed → npm run dev), and test account table (admin@innovatepam.local / Admin123!)
- [ ] T034 Manually follow `specs/001-innovation-management/quickstart.md` end-to-end — verify all steps work on a clean checkout (fresh migrate + seed + dev server), confirm submitter and admin flows work, document any fixes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Requires Phase 1 complete — BLOCKS all user story phases
- **US1 Phase (Phase 3)**: Requires Phase 2 complete
- **US2 Phase (Phase 4)**: Requires Phase 2 complete — can start in parallel with US1
- **US3 Phase (Phase 5)**: Requires Phase 3 and Phase 4 complete
- **Polish (Phase 6)**: Requires Phase 5 complete

### User Story Dependencies

- **US1 (P1)**: No story dependencies — starts after Foundational
- **US2 (P2)**: No story dependencies — starts after Foundational (can run in parallel with US1)
- **US3 (P3)**: Depends on US1 + US2 — enforces access control across both flows

### Within Each Phase

- T006 before T007 (schema before migration)
- T007 before T008, T009 (DB must exist before seeding)
- T010, T011 before T012 (db.ts, validation.ts before auth.ts)
- T012 before T013, T014, T015 (auth.ts before API routes)
- T016, T017 before T022 (components before pages that use them)
- T018 before T022 (API before page that fetches it)
- T024, T025, T026 before T027 (admin APIs before admin page)

---

## Parallel Opportunities

```
Phase 1 parallel: T003 (prisma init) + T004 (shadcn init) simultaneously
Phase 2 parallel: T010 (lib/db.ts) + T011 (lib/validation.ts) simultaneously
Phase 3 parallel: T016 (status-badge) + T017 (idea-card) simultaneously
Phase 4+5 parallel: T024/T025/T026 (admin API routes) all simultaneously
Phase 6 parallel: T031 (empty state) + T032 (error summary) simultaneously
```

---

## Implementation Strategy

### MVP First (US1 Only — ~3 hours)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (submitter flow)
4. **STOP and VALIDATE**: register → login → submit idea → view list → logout
5. Demo-ready MVP at this point

### Full Phase 1 Portal (~6 hours total)

1. Phase 1 + 2 → Foundation
2. Phase 3 → US1 (submitter flow)
3. Phase 4 → US2 (admin review)
4. Phase 5 → US3 (access control)
5. Phase 6 → Polish + docs

---

## Notes

- `[P]` = can run in parallel with other `[P]` tasks in the same phase
- `[US1/US2/US3]` = maps to user story for traceability
- No automated tests — manual validation via acceptance scenarios in `spec.md`
- Commit after each phase checkpoint at minimum
- Seed admin account once with `npx prisma db seed`; re-run `npx prisma migrate reset` to start fresh
