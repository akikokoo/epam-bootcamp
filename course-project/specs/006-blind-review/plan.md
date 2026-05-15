# Implementation Plan: InnovatEPAM Portal — Phase 6: Blind Review

**Branch**: `006-blind-review` | **Date**: 2026-05-15 | **Spec**: `specs/006-blind-review/spec.md`

## Summary

Add `blindReview Boolean @default(false)` to the `Idea` schema. Create a `PATCH /api/admin/[ideaId]/blind` endpoint that toggles the value. In the admin dashboard, render the submitter field conditionally: if `blindReview` is true, show "Anonymous Submitter"; otherwise show the email. Add an "Enable/Disable Blind Review" button that calls the toggle endpoint and updates local state.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — add `blindReview Boolean @default(false)` to `Idea`
- `app/api/admin/[ideaId]/blind/route.ts` — new PATCH endpoint
- `app/admin/ideas/client.tsx` — conditional submitter display + toggle button

## API Endpoint

```
PATCH /api/admin/[ideaId]/blind
Body: (none — server reads current value and toggles)
Response: { blindReview: boolean }
```

## UI Logic

```tsx
// Submitter display
{idea.blindReview
  ? <span className="italic text-slate-400">Anonymous Submitter</span>
  : <span>{idea.submitter.email}</span>
}

// Toggle button
<button onClick={() => toggleBlind(idea.id)}>
  {idea.blindReview ? '🔓 Disable Blind Review' : '🔒 Enable Blind Review'}
</button>
```

Local state is updated optimistically after a successful PATCH response.
