# InnovatEPAM Portal - Project Summary

## Overview

InnovatEPAM Portal is a full-stack employee innovation management platform that enables EPAM employees to submit, track, and collaboratively evaluate innovation ideas through a structured multi-stage workflow. Built with Next.js 16 App Router, it delivers a complete idea lifecycle — from drafting through blind scoring — in a polished, role-aware interface.

---

## Phases Completed

### Phase 1: Core Portal ✅
- [x] User registration with email/password (bcrypt hashing)
- [x] User login/logout with cookie-based session auth
- [x] Role-based access control (submitter / admin)
- [x] Idea submission form (title, description, category)
- [x] File attachment support
- [x] Idea listing page per role
- [x] Status tracking (Submitted → Under Review → Accepted / Rejected)
- [x] Admin evaluation workflow with evaluation comments

### Phase 2: Smart Submission Forms ✅
- [x] Dynamic form fields per category (Technical Innovation, Process Improvement, Client Solution, Other)
- [x] Category-specific guidance with contextual fields (tech stack, pain points, client industry, etc.)
- [x] Category data persisted as JSON (`categoryData` field)

### Phase 3: Multi-Media Support ✅
- [x] Multiple file attachments per idea (1-to-many relationship)
- [x] Supported formats: PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX
- [x] 50MB per-file size limit with client-side validation
- [x] Attachment download links in both submitter and admin views

### Phase 4: Draft Management ✅
- [x] Save ideas as drafts without submission
- [x] Edit drafts before final submission
- [x] Drafts visually separated from submitted ideas
- [x] Draft count shown in submitter stats dashboard

### Phase 5: Multi-Stage Review ✅
- [x] Four-stage evaluation pipeline: Initial Screening → Technical Review → Business Impact → Final Selection
- [x] Stage advancement actions available to admins
- [x] Visual stage progress bar on each idea card

### Phase 6: Blind Review ✅
- [x] Per-idea blind review toggle (admin controlled)
- [x] Submitter identity hidden when blind review is enabled
- [x] Toggle persisted in database, actionable from admin dashboard

### Phase 7: Scoring System ✅
- [x] Multi-dimension scoring: Innovation, Feasibility, Impact, Clarity (1–5 each)
- [x] One score per admin per idea (upsert logic via `@@unique([ideaId, adminId])`)
- [x] Visual score bars rendered in admin review cards
- [x] Scores listed with admin attribution

---

## Technical Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 App Router | RSC + streaming, file-based routing, API routes co-located |
| Language | TypeScript (strict) | Type safety across client/server boundary |
| UI | React + Tailwind CSS | No external component library; full design control |
| ORM | Prisma v6 | Type-safe DB access, easy schema migration with SQLite |
| Database | SQLite (via Prisma) | Zero-config, portable, sufficient for demo scale |
| Auth | bcrypt + HTTP-only cookie session | Simple, secure, no third-party dependency |
| File storage | Local filesystem (`/public/uploads`) | Simple setup; swap to S3 in production |
| Date formatting | date-fns | Lightweight, tree-shakeable |

### Key Architecture Decisions

**RSC + Client Component split**: Server components fetch data and pass it as props; client components handle interactivity (form state, toggles, score submission). This keeps data fetching simple and avoids `useEffect` waterfalls.

**`categoryData` as JSON string**: Instead of separate tables per category type, category-specific fields are stored as a JSON blob. This made it possible to add all 4 category types in Phase 2 with a single DB column and zero migrations.

---

## Challenges & Solutions

### Challenge 1: Single vs. multiple file attachments
Phase 1 used `@unique` on `Attachment.ideaId`, which prevented multiple attachments. Fixing this required removing the unique constraint, changing the relation from 1-to-1 to 1-to-many, regenerating the Prisma client, and updating all API and query code.

**Solution:** Removed `@unique` from `Attachment.ideaId`, updated all `include: { attachment: true }` usages to `attachments: true`, and updated the upload handler to loop over `files[]` entries.

### Challenge 2: Prisma client location conflict
The project used a custom `output` path (`app/generated/prisma/client`) for the Prisma client, which conflicted with default import assumptions in some tooling.

**Solution:** Added `output = "../app/generated/prisma/client"` in `schema.prisma` and consistently imported from `@/app/generated/prisma/client` throughout the codebase.

---

## AI Collaboration

### Tools Used
- **Claude Code** (Anthropic) — primary AI coding assistant throughout all phases

### What Worked Well
Claude Code excelled at translating spec requirements into complete, working implementations in one shot — entire API routes, Prisma schema updates, and React components were generated correctly on the first attempt when given clear context about the project structure and existing patterns.

### What Could Be Improved
For large refactors spanning many files (like the full UI redesign), iterating file-by-file with verification between steps works better than asking for everything at once. Giving the AI a concrete "before/after" design reference (screenshots or detailed descriptions) produces much more consistent results than open-ended design requests.

---

## Time Breakdown

| Phase | Estimated Time |
|-------|---------------|
| Setup & project scaffolding | ~1 hr |
| Phase 1: Core Portal | ~3 hrs |
| Phase 2: Smart Submission Forms | ~30 min |
| Phase 3: Multi-Media Support | ~30 min |
| Phase 4: Draft Management | ~30 min |
| Phase 5: Multi-Stage Review | ~45 min |
| Phase 6: Blind Review | ~20 min |
| Phase 7: Scoring System | ~30 min |
| UI Redesign | ~2 hrs |
| Documentation | ~30 min |

---

## Reflection

### Key Learning
Writing a spec first — even a short one — dramatically reduces the number of AI re-prompts needed. When the AI has a clear description of the data model, the API contract, and the UI behavior upfront, the generated code is correct and complete rather than requiring several correction rounds.

### What I'd Do Differently
Set up the full Prisma schema (all 7 phases) at the start. Incremental schema changes require re-running `prisma db push`, regenerating the client, and fixing all the TypeScript references each time. One upfront migration would have saved 30–45 minutes of incremental fix cycles.

### SDD vs Vibe Coding
With SpecKit-driven development, each phase had a clear acceptance criteria list before any code was written. This meant the AI could be given a precise, bounded task ("implement this story") rather than a vague request ("add file uploads"). The result was fewer hallucinations, less back-and-forth, and code that matched the intended behavior on the first generation.

### AI Collaboration Insight
The most surprising thing was how much the *framing* of a prompt matters. Asking "make the UI look better" produced safe, incremental changes. Asking "redesign this file with a gradient hero header, colored category cards, and a stats dashboard — no shadcn, pure Tailwind" produced a complete, polished redesign in one shot. Specificity is the real skill.

---

*Submitted by: Akif Emre Reis*
*Date: 2026-05-15*
