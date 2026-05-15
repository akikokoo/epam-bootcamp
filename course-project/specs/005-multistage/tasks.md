# Tasks: InnovatEPAM Portal — Phase 5: Multi-Stage Review

**Input**: Design documents from `specs/005-multistage/`

---

## Task List

- [x] T501 Add `ReviewStage` enum to `prisma/schema.prisma`: `INITIAL_SCREENING | TECHNICAL_REVIEW | BUSINESS_IMPACT | FINAL_SELECTION`
- [x] T502 Add `reviewStage ReviewStage @default(INITIAL_SCREENING)` to `Idea` model
- [x] T503 Run `npx prisma db push` to apply schema changes
- [x] T504 Create `app/api/admin/[ideaId]/stage/route.ts` — PATCH: verify admin session, read current `reviewStage`, compute next stage via progression map, reject with 400 if at final stage, update and return new `reviewStage`
- [x] T505 Add 4-step stage progress bar to `app/admin/ideas/client.tsx` — render each stage as a chip with emoji and label; highlight current stage; dim future stages
- [x] T506 Add "Advance to [Next Stage]" button in admin idea card — call PATCH endpoint on click; update local state on success; hide button when at FINAL_SELECTION

---

## Verification

- [x] New ideas start at INITIAL_SCREENING
- [x] Each advance click moves to the correct next stage
- [x] Progress bar visually reflects current stage
- [x] No advance button shown at FINAL_SELECTION
- [x] Stage change persists on page refresh
- [x] Status (Accepted/Rejected) can be set independently of stage
