# Feature Specification: InnovatEPAM Portal — Phase 7: Scoring System

**Feature Branch**: `007-scoring`

**Created**: 2026-05-15

**Status**: Implemented

**Input**: Add a structured scoring system where admins rate each idea on four dimensions (Innovation, Feasibility, Impact, Clarity) from 1 to 5. Each admin submits one score per idea. Scores are displayed alongside the idea in the admin dashboard.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Score an idea on multiple dimensions (Priority: P1)

An admin can assign a score (1–5) for Innovation, Feasibility, Impact, and Clarity to any idea. The score is saved and displayed in the admin dashboard. Submitting a second score updates the existing one.

**Why this priority**: Binary accept/reject decisions provide no nuance. Multi-dimensional scoring helps the team understand where an idea excels or falls short, enabling better-informed decisions and useful feedback.

**Independent Test**: Log in as admin. Find a submitted idea. Enter scores: Innovation=4, Feasibility=3, Impact=5, Clarity=4. Click "Submit Score." Verify scores appear with visual bars. Log out, log back in, verify scores are still present. Submit different scores and verify they update (not duplicate).

**Acceptance Scenarios**:

1. **Given** an admin viewing an idea, **when** they enter scores (1–5) for all four dimensions and click "Submit Score," **then** the score is saved and the visual score bars update.
2. **Given** an admin who already scored an idea, **when** they submit new scores, **then** the existing score is updated (upserted), not duplicated.
3. **Given** multiple admins who each score the same idea, **when** any admin views the dashboard, **then** all submitted scores are visible with the scoring admin's email.
4. **Given** an admin entering a score, **when** they enter a value outside 1–5, **then** the input is constrained or rejected with a validation error.

---

### Edge Cases

- **Partial score**: All four dimensions must be provided; partial scores are not accepted.
- **Score uniqueness**: One score per (idea, admin) pair enforced at the database level via `@@unique([ideaId, adminId])`.
- **Score persistence**: Scores survive page refreshes; they are fetched alongside ideas in the admin query.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-701**: System MUST allow admins to assign integer scores from 1 to 5 for four dimensions: Innovation, Feasibility, Impact, Clarity.
- **FR-702**: System MUST enforce one score per admin per idea (upsert on `@@unique([ideaId, adminId])`).
- **FR-703**: System MUST display submitted scores as visual score bars (filled segments 1–5) in the admin dashboard.
- **FR-704**: System MUST attribute each score to the submitting admin (display admin email alongside score).
- **FR-705**: System MUST validate that all four score dimensions are provided and within 1–5 before persisting.

### Key Entities (new in Phase 7)

- **IdeaScore**: `{ id, ideaId, adminId, innovation Int, feasibility Int, impact Int, clarity Int, createdAt }`
  - `@@unique([ideaId, adminId])` — one row per admin-idea pair
  - Relations: `idea Idea`, `admin User`

## Success Criteria *(mandatory)*

- **SC-701**: Scores submitted by two different admins on the same idea both appear in the dashboard.
- **SC-702**: Submitting a second score by the same admin updates the existing record without creating a duplicate.
- **SC-703**: Score bars accurately reflect the entered values (e.g., 3/5 shows 3 filled segments out of 5).

## Assumptions

- Scoring is available to all admins; there is no assignment of "which admin scores which idea."
- Score aggregation (average/ranking) is not displayed in this phase — raw scores per admin are shown.
- The scoring section is always visible regardless of `reviewStage` or `status`.
