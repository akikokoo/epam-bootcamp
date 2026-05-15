# Tasks: InnovatEPAM Portal — Phase 3: Multi-Media Support

**Input**: Design documents from `specs/003-multimedia/`

---

## Task List

- [x] T301 Remove `@unique` from `Attachment.ideaId` in `prisma/schema.prisma` to allow 1-to-many
- [x] T302 Run `npx prisma db push` to apply schema change
- [x] T303 Update `lib/validation.ts` — add MIME types for MP4 (`video/mp4`), MOV (`video/quicktime`), PPTX (`application/vnd.openxmlformats-officedocument.presentationml.presentation`); raise max size to 50MB (52428800 bytes)
- [x] T304 Update `POST /api/ideas` — loop over all files in `formData.getAll('files')`, validate each, write each to disk, create one `Attachment` row per file
- [x] T305 Update `GET /api/admin/ideas` — change `include: { attachment: true }` to `include: { attachments: true }`
- [x] T306 Update `GET /api/ideas` (submitter) — change `include: { attachment: true }` to `include: { attachments: true }`
- [x] T307 Update `components/idea-card.tsx` — accept `attachments[]` prop (array), render each as a download link
- [x] T308 Update `app/admin/ideas/client.tsx` — render `idea.attachments` as a list of labeled links
- [x] T309 Update `components/idea-form.tsx` — set file input `multiple` attribute; update accept string to include `.mp4,.mov,.pptx`; update client-side validation to check each selected file

---

## Verification

- [x] Three files attached to one idea appear as three download links in admin view
- [x] File over 50MB is rejected with error before upload
- [x] Unsupported file type is rejected with error
- [x] PPTX and MP4 files are accepted
- [x] Ideas without attachments still display correctly
