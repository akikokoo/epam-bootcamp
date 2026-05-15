# Tasks: InnovatEPAM Portal — Phase 4: Draft Management

**Input**: Design documents from `specs/004-drafts/`

---

## Task List

- [x] T401 Add `isDraft Boolean @default(false)` to `Idea` model in `prisma/schema.prisma`
- [x] T402 Run `npx prisma db push` to apply schema change
- [x] T403 Update `POST /api/ideas` — read `isDraft` and `draftId` from FormData; if `draftId` present, update existing record; otherwise create new; set `isDraft` accordingly
- [x] T404 Update `app/admin/ideas/page.tsx` Prisma query — add `where: { isDraft: false }` to exclude drafts from admin view
- [x] T405 Update `components/idea-form.tsx` — accept `draft` prop; pre-populate state from draft data; send `isDraft` flag and `draftId` in FormData; show "Save as Draft" and "Submit Idea" as separate buttons
- [x] T406 Update `components/idea-card.tsx` — show "Draft" badge instead of StatusBadge when `isDraft` is true; render "Edit Draft" button for draft cards
- [x] T407 Update `app/submitter/ideas/client.tsx` — split ideas into `drafts` and `submitted` arrays; render Drafts section above Submitted; implement `handleEditDraft` to open form pre-populated with draft data
- [x] T408 Update `app/submitter/ideas/page.tsx` — remove `isDraft: false` filter so drafts are included in the submitter query

---

## Verification

- [x] "Save as Draft" saves without requiring all fields
- [x] Draft appears in Drafts section with "Draft" badge
- [x] "Edit Draft" opens form pre-populated with all saved fields
- [x] Re-saving a draft updates the existing record (no duplicate)
- [x] Submitting from draft edit view moves idea to Submitted section
- [x] Draft never appears in admin dashboard
