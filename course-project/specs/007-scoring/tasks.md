# Tasks: InnovatEPAM Portal — Phase 7: Scoring System

**Input**: Design documents from `specs/007-scoring/`

---

## Task List

- [x] T701 Add `IdeaScore` model to `prisma/schema.prisma` with fields: `id`, `ideaId`, `adminId`, `innovation Int`, `feasibility Int`, `impact Int`, `clarity Int`, `createdAt`; add `@@unique([ideaId, adminId])`
- [x] T702 Add `scores IdeaScore[]` relation to `Idea` model
- [x] T703 Add `scores IdeaScore[]` relation to `User` model
- [x] T704 Run `npx prisma db push` to apply schema changes
- [x] T705 Create `app/api/admin/[ideaId]/score/route.ts` — POST: verify admin session, parse `{ innovation, feasibility, impact, clarity }`, validate all are integers 1–5, upsert `IdeaScore` via `ideaId_adminId` unique key, return saved score
- [x] T706 Update `app/admin/ideas/page.tsx` — add `scores: { include: { admin: { select: { email: true } } } }` to Prisma include
- [x] T707 Add `ScoreBar` helper component to `app/admin/ideas/client.tsx` — renders 5 colored/muted segments based on value
- [x] T708 Add scoring section to each idea card in `app/admin/ideas/client.tsx` — four number inputs (Innovation, Feasibility, Impact, Clarity); "Submit Score" button; POST to `/api/admin/[ideaId]/score`
- [x] T709 Display existing scores in admin idea card — list each score with admin email attribution and `ScoreBar` for each dimension

---

## Verification

- [x] Submitting scores saves all four dimensions
- [x] Submitting a second time by the same admin updates, not duplicates
- [x] Two admins can each score the same idea and both scores appear
- [x] ScoreBar renders correct number of filled segments
- [x] Score values outside 1–5 are rejected by the API
- [x] Scores persist on page refresh
