# Feature Specification: InnovatEPAM Portal — Phase 3: Multi-Media Support

**Feature Branch**: `003-multimedia`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Extend file attachment support to allow multiple files per idea and additional media types including video and presentation formats.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Attach multiple files of various types to an idea (Priority: P1)

A submitter can attach more than one file to a single idea submission. Supported types expand to include MP4, MOV, and PPTX in addition to the Phase 1 types. Each file may be up to 50MB.

**Why this priority**: Innovation ideas often require multiple supporting documents — a PDF brief, a prototype video, and a presentation. Restricting to one file forces submitters to choose, losing context for evaluators.

**Independent Test**: Log in as a submitter, open the idea form, attach three files (a PDF, a PPTX, and a JPG), submit the idea. Log in as admin, open the idea, and confirm all three attachment links are present and downloadable.

**Acceptance Scenarios**:

1. **Given** a submitter on the idea form, **when** they select multiple files, **then** all selected files are listed for upload.
2. **Given** a submitter attaching files, **when** any file exceeds 50MB, **then** submission is blocked and an error names the offending file.
3. **Given** a submitter attaching files, **when** any file has an unsupported extension, **then** submission is blocked and the error lists allowed types.
4. **Given** a submitter who submits an idea with three attachments, **when** the admin views the idea, **then** all three files appear as labeled download links.

---

### Edge Cases

- **Mixed valid/invalid files**: If one file fails validation, the entire submission is blocked and all files must be re-selected after correction.
- **Zero attachments**: Ideas may be submitted with no attachments; the attachment section is optional.
- **Filename collisions**: Each file is stored with a UUID prefix to prevent overwriting files with the same name.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-301**: System MUST allow submitters to attach multiple files (1-to-many) to a single idea.
- **FR-302**: System MUST support file types: PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX.
- **FR-303**: System MUST enforce a 50MB maximum size per file, validated client-side before upload.
- **FR-304**: System MUST store each attachment as a separate `Attachment` record linked to the idea.
- **FR-305**: System MUST display all attachments as download links on both the submitter and admin idea views.

### Key Entities (changes from Phase 1)

- **Attachment**: Relation to Idea changed from 1-to-1 (`@unique` on `ideaId`) to 1-to-many (unique constraint removed). Each `Attachment` row stores `fileName`, `filePath`, `fileType`, `fileSize`, and `ideaId`.

## Success Criteria *(mandatory)*

- **SC-301**: An idea submitted with 3 attachments shows exactly 3 download links in the admin dashboard.
- **SC-302**: A file exceeding 50MB is rejected before any network request is made.
- **SC-303**: All 8 supported file types (PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX) are accepted in manual testing.

## Assumptions

- Files are stored in `public/uploads/` with `<uuid>-<originalName>` filename pattern.
- No file preview (thumbnail/inline player) is implemented; files are linked for download only.
- The 50MB limit applies per file, not per idea total.
