# Feature Specification: InnovatEPAM Portal — Phase 2: Smart Submission Forms

**Feature Branch**: `002-smart-forms`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Extend the idea submission form with dynamic, category-specific fields so submitters provide richer, more structured information based on their idea type.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Submit a category-specific idea with dynamic fields (Priority: P1)

A submitter selects a category and sees additional fields tailored to that category. Filling in those fields and submitting persists the data alongside the idea.

**Why this priority**: Generic forms produce low-quality submissions. Category-specific guidance raises the quality of ideas and gives admins the context they need to evaluate fairly.

**Independent Test**: Log in as a submitter, open the idea form, select "Technical Innovation," verify that fields for tech stack, complexity, and effort appear. Fill them in and submit. Log in as admin, open the idea, and confirm the category data is displayed.

**Acceptance Scenarios**:

1. **Given** a submitter on the idea form, **when** they select "Technical Innovation," **then** additional fields appear: Technology Stack (text), Technical Complexity (Low/Medium/High select), Estimated Development Time (text).
2. **Given** a submitter on the idea form, **when** they select "Process Improvement," **then** fields appear: Current Process Pain Points (textarea), Expected Improvement (text), Affected Teams (text).
3. **Given** a submitter on the idea form, **when** they select "Client Solution," **then** fields appear: Target Client / Industry (text), Client Problem Statement (textarea), Expected Business Impact (text).
4. **Given** a submitter on the idea form, **when** they select "Other," **then** a field appears: Additional Context (textarea).
5. **Given** a submitter who switches categories, **when** the new category is selected, **then** the previous category's fields are cleared and replaced with the new category's fields.
6. **Given** a submitter who fills in category fields and submits, **when** the idea is saved, **then** the category-specific data is persisted and visible in the admin review dashboard.

---

### Edge Cases

- **Category switch clears previous fields**: Switching from one category to another resets the category-specific data to avoid stale values from a prior selection.
- **Category fields are optional**: Category-specific fields are supplementary; the idea can be submitted without filling them in.
- **Admin view shows only relevant fields**: The admin card renders only the fields that belong to the idea's category, not empty fields from other categories.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-201**: System MUST render category-specific form fields immediately when a category is selected, without page reload.
- **FR-202**: System MUST clear category-specific field values when the user changes the selected category.
- **FR-203**: System MUST persist category-specific field values as a JSON blob (`categoryData`) alongside the idea record.
- **FR-204**: System MUST display category-specific data in the admin review dashboard, grouped and labeled per field.
- **FR-205**: Category-specific fields MUST be optional; their absence MUST NOT prevent idea submission.

### Key Entities (additions to Phase 1)

- **Idea.categoryData**: Nullable JSON string storing key-value pairs of category-specific fields (e.g., `{ "techStack": "React", "complexity": "High", "effort": "3 months" }`).

## Success Criteria *(mandatory)*

- **SC-201**: Selecting any of the 4 categories renders the correct set of additional fields within 200ms.
- **SC-202**: Category data submitted by a submitter is retrievable by an admin in the same session without data loss.
- **SC-203**: Switching categories resets the previous category's field values in 100% of manual test cases.

## Assumptions

- Category-specific fields are defined statically in the front-end; they are not admin-configurable.
- All category-specific fields are text or select inputs; no file uploads per category field.
- `categoryData` is stored as a raw JSON string in SQLite and parsed on read.
