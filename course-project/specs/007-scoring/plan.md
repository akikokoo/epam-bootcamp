# Implementation Plan: InnovatEPAM Portal — Phase 7: Scoring System

**Branch**: `007-scoring` | **Date**: 2026-05-15 | **Spec**: `specs/007-scoring/spec.md`

## Summary

Add an `IdeaScore` model to the schema with `@@unique([ideaId, adminId])`. Create a `POST /api/admin/[ideaId]/score` endpoint that upserts a score. In the admin dashboard, add a scoring section with four number inputs (1–5) and a "Submit Score" button. Display existing scores as visual bar components. Fetch scores via `include: { scores: { include: { admin: true } } }` in the admin query.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — new `IdeaScore` model; add `scores IdeaScore[]` to `Idea`; add `scores IdeaScore[]` to `User`
- `app/api/admin/[ideaId]/score/route.ts` — new POST endpoint (upsert)
- `app/admin/ideas/page.tsx` — add `scores: { include: { admin: true } }` to include
- `app/admin/ideas/client.tsx` — scoring section with inputs + ScoreBar component

## Schema

```prisma
model IdeaScore {
  id          String   @id @default(cuid())
  ideaId      String
  adminId     String
  innovation  Int
  feasibility Int
  impact      Int
  clarity     Int
  createdAt   DateTime @default(now())
  idea        Idea     @relation(fields: [ideaId], references: [id])
  admin       User     @relation(fields: [adminId], references: [id])
  @@unique([ideaId, adminId])
}
```

## Upsert Logic (API)

```ts
await prisma.ideaScore.upsert({
  where: { ideaId_adminId: { ideaId, adminId } },
  update: { innovation, feasibility, impact, clarity },
  create: { ideaId, adminId, innovation, feasibility, impact, clarity },
});
```

## ScoreBar Component

```tsx
function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`h-2 w-5 rounded-sm ${i <= value ? 'bg-indigo-500' : 'bg-slate-200'}`} />
      ))}
    </div>
  );
}
```
