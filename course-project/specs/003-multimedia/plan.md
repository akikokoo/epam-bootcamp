# Implementation Plan: InnovatEPAM Portal — Phase 3: Multi-Media Support

**Branch**: `003-multimedia` | **Date**: 2026-05-15 | **Spec**: `specs/003-multimedia/spec.md`

## Summary

Convert the Attachment relation from 1-to-1 to 1-to-many by removing `@unique` from `Attachment.ideaId`. Update the upload API to loop over all files in the FormData. Update all Prisma queries from `attachment: true` to `attachments: true`. Expand allowed file types and raise the size limit to 50MB. Update both the submitter and admin views to render attachment lists.

## Technical Context

**Changed files**:
- `prisma/schema.prisma` — remove `@unique` from `Attachment.ideaId`
- `lib/validation.ts` — add MP4/MOV/PPTX MIME types; raise limit to 50MB
- `app/api/ideas/route.ts` — loop over `files[]` in FormData; create multiple `Attachment` rows
- `app/admin/ideas/page.tsx` — change `include: { attachment: true }` → `attachments: true`
- `app/submitter/ideas/page.tsx` — same include update
- `components/idea-card.tsx` — render `attachments[]` array instead of singular `attachment`
- `app/admin/ideas/client.tsx` — render all attachments as a list

## Schema Change

```prisma
model Attachment {
  id       String @id @default(cuid())
  fileName String
  filePath String
  fileType String
  fileSize Int
  ideaId   String          // @unique removed — now 1-to-many
  idea     Idea @relation(fields: [ideaId], references: [id])
}
```

## Upload Loop (API)

```ts
const files = formData.getAll('files') as File[];
for (const file of files) {
  // validate each file
  // write to disk
  // prisma.attachment.create({ data: { ideaId, fileName, filePath, ... } })
}
```
