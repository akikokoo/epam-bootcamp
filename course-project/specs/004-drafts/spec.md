# Feature Specification: InnovatEPAM Portal — Phase 4: Draft Management

**Feature Branch**: `004-drafts`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Allow submitters to save an idea as a draft, return to edit it later, and submit when ready. Drafts are visible only to the submitter and are excluded from the admin review dashboard.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Save and edit a draft before submitting (Priority: P1)

A submitter can save a partially complete idea as a draft, return later to edit it, and submit it when ready. Drafts appear in a separate section of their idea list.

**Why this priority**: Submitters often have incomplete ideas they want to refine before sharing. Without drafts, they either submit prematurely or lose their work.

**Independent Test**: Log in as submitter, open the idea form, fill in only the title and category, click "Save as Draft." Verify the draft appears in the Drafts section. Click "Edit Draft," modify the description, click "Submit Idea." Verify the idea moves to the Submitted section and disappears from Drafts.

**Acceptance Scenarios**:

1. **Given** a submitter on the idea form, **when** they click "Save as Draft," **then** the idea is saved with `isDraft: true` and appears in the Drafts section of their idea list.
2. **Given** a submitter viewing their draft, **when** they click "Edit Draft," **then** the idea form opens pre-populated with the draft's data.
3. **Given** a submitter editing a draft, **when** they click "Submit Idea," **then** `isDraft` is set to `false`, the idea appears in the Submitted section, and it is visible to admins.
4. **Given** a submitter editing a draft, **when** they click "Save as Draft" again, **then** the existing draft is updated in place (no duplicate created).
5. **Given** an admin on the review dashboard, **when** drafts exist, **then** drafts are NOT visible in the admin list.

---

### Edge Cases

- **Draft with no title**: A draft may be saved with minimal data; no field is required for draft saving.
- **Draft updates are idempotent**: Saving a draft multiple times updates the same record, not creating new ones.
- **Submitting from draft edit view**: The form correctly submits the draft's `id` so the existing record is updated rather than a new idea created.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-401**: System MUST allow submitters to save an idea as a draft without filling in all required fields.
- **FR-402**: System MUST display drafts in a visually distinct section separate from submitted ideas.
- **FR-403**: System MUST allow submitters to open a draft for editing, pre-populating all previously saved fields.
- **FR-404**: System MUST update the existing draft record (not create a duplicate) when a draft is re-saved.
- **FR-405**: System MUST convert a draft to a submitted idea when the submitter clicks "Submit Idea" from the edit view.
- **FR-406**: System MUST exclude drafts from the admin review dashboard.

### Key Entities (additions to Phase 1)

- **Idea.isDraft**: Boolean (`@default(false)`). When `true`, the idea is a draft and excluded from admin queries.

## Success Criteria *(mandatory)*

- **SC-401**: A draft saved and re-opened has all previously entered fields pre-populated.
- **SC-402**: After submission from draft edit, the idea appears in the admin dashboard and is no longer in the submitter's Drafts section.
- **SC-403**: Drafts never appear in the admin review dashboard in any manual test.

## Assumptions

- Drafts are per-submitter and scoped to `submitterId`; admins cannot see or manage drafts.
- There is no "delete draft" feature in this phase.
- Draft and submitted ideas share the same `Idea` table; `isDraft` is the only distinction.
