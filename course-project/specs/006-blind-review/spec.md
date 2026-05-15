# Feature Specification: InnovatEPAM Portal — Phase 6: Blind Review

**Feature Branch**: `006-blind-review`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Allow admins to enable an anonymous evaluation mode per idea, hiding the submitter's identity to reduce bias during review.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Enable blind review for an idea (Priority: P1)

An admin can toggle blind review on or off for any idea. When enabled, the submitter's email is hidden in the admin dashboard and replaced with "Anonymous Submitter."

**Why this priority**: Evaluator bias based on seniority, department, or personal relationships can unfairly affect idea outcomes. Blind review creates a fairer evaluation environment.

**Independent Test**: Log in as admin. Find an idea with a visible submitter email. Click "Enable Blind Review." Verify the submitter email is replaced with "Anonymous Submitter." Click again to disable. Verify the email is visible again.

**Acceptance Scenarios**:

1. **Given** an admin viewing an idea with blind review disabled, **when** they click "Enable Blind Review," **then** the submitter's identity is hidden and the button label changes to "Disable Blind Review."
2. **Given** an idea with blind review enabled, **when** the admin views it, **then** the submitter field shows "Anonymous Submitter" instead of the actual email.
3. **Given** an admin who clicks "Disable Blind Review," **when** the action succeeds, **then** the submitter's identity is revealed and the `blindReview` flag is set to `false`.
4. **Given** an idea with blind review enabled, **when** a different admin views it, **then** they also see "Anonymous Submitter" — the setting is per-idea, not per-admin.

---

### Edge Cases

- **Toggle is per-idea**: Blind review is stored on the `Idea` record, not on the admin's session.
- **Blind review affects display only**: The submitter's data is not deleted; it is simply not rendered when `blindReview` is `true`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-601**: System MUST allow admins to toggle `blindReview` on or off for any individual idea.
- **FR-602**: When `blindReview` is `true`, the admin dashboard MUST display "Anonymous Submitter" instead of the submitter's email.
- **FR-603**: The `blindReview` state MUST persist in the database and apply to all admins viewing the idea.
- **FR-604**: Toggling blind review MUST be possible without affecting the idea's stage, status, or any other field.

### Key Entities (additions to Phase 1)

- **Idea.blindReview**: `Boolean @default(false)`

## Success Criteria *(mandatory)*

- **SC-601**: Enabling blind review hides the submitter identity immediately without page reload.
- **SC-602**: The `blindReview` state persists correctly on page refresh.
- **SC-603**: Disabling blind review reveals the submitter email immediately.

## Assumptions

- Blind review applies only in the admin dashboard; submitters are not notified when blind review is toggled.
- The submitter's data remains in the database; blind review only controls display.
