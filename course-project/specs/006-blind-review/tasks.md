# Tasks: InnovatEPAM Portal — Phase 6: Blind Review

**Input**: Design documents from `specs/006-blind-review/`

---

## Task List

- [x] T601 Add `blindReview Boolean @default(false)` to `Idea` model in `prisma/schema.prisma`
- [x] T602 Run `npx prisma db push` to apply schema change
- [x] T603 Create `app/api/admin/[ideaId]/blind/route.ts` — PATCH: verify admin session, read current `blindReview`, toggle to opposite value, persist, return `{ blindReview: boolean }`
- [x] T604 Update admin idea card in `app/admin/ideas/client.tsx` — render submitter as "Anonymous Submitter" (italic, muted) when `blindReview` is true, otherwise show email
- [x] T605 Add "Enable/Disable Blind Review" toggle button in admin idea card — call PATCH endpoint; update local state with returned `blindReview` value

---

## Verification

- [x] Clicking "Enable Blind Review" replaces submitter email with "Anonymous Submitter"
- [x] Button label toggles to "Disable Blind Review" when enabled
- [x] Clicking "Disable Blind Review" reveals submitter email again
- [x] Toggle state persists on page refresh
- [x] Stage, status, and scores are unaffected by toggling blind review
