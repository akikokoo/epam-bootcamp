# Implementation Plan: InnovatEPAM Portal — Phase 5: Multi-Stage Review

**Branch**: `005-multistage` | **Date**: 2026-05-15 | **Spec**: `specs/005-multistage/spec.md`

## Summary

Add a `ReviewStage` enum and `reviewStage` field to the `Idea` model. Create a `PATCH /api/admin/[ideaId]/stage` endpoint that advances the stage. Render a 4-step progress bar in the admin dashboard with an "Advance to Next Stage" button that is hidden when the idea is at the final stage.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — add `ReviewStage` enum; add `reviewStage ReviewStage @default(INITIAL_SCREENING)` to `Idea`
- `app/api/admin/[ideaId]/stage/route.ts` — new PATCH endpoint
- `app/admin/ideas/client.tsx` — progress bar component + advance button

## Stage Progression Map

```ts
const NEXT_STAGE: Record<ReviewStage, ReviewStage | null> = {
  INITIAL_SCREENING: 'TECHNICAL_REVIEW',
  TECHNICAL_REVIEW:  'BUSINESS_IMPACT',
  BUSINESS_IMPACT:   'FINAL_SELECTION',
  FINAL_SELECTION:   null,  // no advance button shown
};
```

## API Endpoint

```
PATCH /api/admin/[ideaId]/stage
Body: (none required — server derives next stage from current)
Response: { reviewStage: ReviewStage }
```

Server reads current `reviewStage`, maps to next stage via `NEXT_STAGE`, rejects (400) if already at final.

## Progress Bar UI

```tsx
const STAGES = [
  { key: 'INITIAL_SCREENING', label: 'Initial Screening', emoji: '🔵' },
  { key: 'TECHNICAL_REVIEW',  label: 'Technical Review',  emoji: '⚙️' },
  { key: 'BUSINESS_IMPACT',   label: 'Business Impact',   emoji: '📊' },
  { key: 'FINAL_SELECTION',   label: 'Final Selection',   emoji: '🏆' },
];
// Current stage = filled/active; future stages = muted
```
