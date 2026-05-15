# Feature Specification: InnovatEPAM Portal — Phase 5: Multi-Stage Review

**Feature Branch**: `005-multistage`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Add a four-stage evaluation pipeline to the admin review workflow so ideas progress through structured checkpoints before a final decision.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Advance an idea through the review pipeline (Priority: P1)

An admin can see which stage an idea is at and advance it to the next stage. The current stage is visually indicated in the admin dashboard.

**Why this priority**: A single-step accept/reject workflow provides no structure for complex evaluations. Multi-stage review lets different specialists evaluate different aspects before a final decision.

**Independent Test**: Log in as admin. Find an idea at Initial Screening. Click "Advance to Technical Review." Verify the stage progress bar updates. Advance again to Business Impact, then Final Selection. Verify each stage change persists on refresh.

**Acceptance Scenarios**:

1. **Given** an admin viewing the dashboard, **when** they look at any idea, **then** a stage progress bar shows the four stages with the current stage highlighted.
2. **Given** an idea at Initial Screening, **when** the admin clicks "Advance to Technical Review," **then** the idea's `reviewStage` updates to `TECHNICAL_REVIEW`.
3. **Given** an idea at Technical Review, **when** the admin clicks "Advance to Business Impact," **then** `reviewStage` updates to `BUSINESS_IMPACT`.
4. **Given** an idea at Business Impact, **when** the admin clicks "Advance to Final Selection," **then** `reviewStage` updates to `FINAL_SELECTION`.
5. **Given** an idea at Final Selection, **then** no further advancement button is shown.

---

### Edge Cases

- **Stage and status are independent**: An idea's `reviewStage` and `status` (Accepted/Rejected) are separate fields. An admin may accept or reject an idea at any stage.
- **Stage does not auto-advance**: Stage only changes when an admin explicitly clicks the advance action.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-501**: System MUST track ideas through four ordered stages: INITIAL_SCREENING → TECHNICAL_REVIEW → BUSINESS_IMPACT → FINAL_SELECTION.
- **FR-502**: System MUST display the current stage visually as a progress bar in the admin dashboard.
- **FR-503**: System MUST allow admins to advance an idea to the next stage via an explicit action.
- **FR-504**: System MUST NOT allow stage regression (ideas cannot move backwards).
- **FR-505**: The stage field MUST be independent of the `status` field (Accepted/Rejected decisions may occur at any stage).

### Key Entities (additions to Phase 1)

- **ReviewStage enum**: `INITIAL_SCREENING | TECHNICAL_REVIEW | BUSINESS_IMPACT | FINAL_SELECTION`
- **Idea.reviewStage**: `ReviewStage @default(INITIAL_SCREENING)`

## Success Criteria *(mandatory)*

- **SC-501**: An idea advances through all four stages in sequence with each change persisted.
- **SC-502**: The progress bar correctly highlights the current stage and dims future stages in all manual tests.
- **SC-503**: An idea can be accepted or rejected at any stage without affecting the stage field.

## Assumptions

- Stages are fixed and not admin-configurable in this phase.
- All new ideas start at `INITIAL_SCREENING`.
- Stage advancement is one-way only; there is no regression or reset.
