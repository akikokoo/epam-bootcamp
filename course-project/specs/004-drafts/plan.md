# Implementation Plan: InnovatEPAM Portal — Phase 4: Draft Management

**Branch**: `004-drafts` | **Date**: 2026-05-15 | **Spec**: `specs/004-drafts/spec.md`

## Summary

Add `isDraft Boolean @default(false)` to the `Idea` schema. Update the submission API to accept an `isDraft` flag and an optional `draftId` for updates. Update the submitter UI to show two sections (Drafts / Submitted) and an "Edit Draft" flow that pre-populates `IdeaForm`. Exclude drafts from the admin query with `where: { isDraft: false }`.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — add `isDraft Boolean @default(false)` to `Idea`
- `app/api/ideas/route.ts` — handle `isDraft` flag and `draftId` for upsert logic
- `app/submitter/ideas/page.tsx` — query includes drafts; pass all ideas to client
- `app/submitter/ideas/client.tsx` — split ideas into `drafts[]` and `submitted[]`; handle edit draft flow
- `components/idea-form.tsx` — accept `draft` prop to pre-populate; send `isDraft` + `draftId` on submit
- `components/idea-card.tsx` — show "Draft" badge and "Edit Draft" button for draft ideas
- `app/admin/ideas/page.tsx` — add `where: { isDraft: false }` to Prisma query

## Upsert Logic (API)

```ts
const isDraft = formData.get('isDraft') === 'true';
const draftId = formData.get('draftId') as string | null;

if (draftId) {
  // update existing draft
  await prisma.idea.update({ where: { id: draftId }, data: { title, description, category, categoryData, isDraft } });
} else {
  // create new idea or draft
  await prisma.idea.create({ data: { ..., isDraft } });
}
```

## UI State (SubmitterIdeasClient)

```ts
const drafts    = ideas.filter(i => i.isDraft);
const submitted = ideas.filter(i => !i.isDraft);

function handleEditDraft(id: string) {
  const draft = ideas.find(i => i.id === id);
  setEditingDraft(draft);
  setShowForm(true);
}
```
