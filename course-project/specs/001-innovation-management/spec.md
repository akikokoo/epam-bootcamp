# Feature Specification: InnovatEPAM Portal — Phase 1 MVP

**Feature Branch**: `001-innovation-management`

**Created**: 2026-05-15

**Status**: Ready for Implementation

**Input**: User description: "Build InnovatEPAM Portal — an employee innovation management platform for Phase 1 MVP."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Submit an innovation idea as a submitter (Priority: P1)

A registered employee can create an account, sign in, submit an innovation idea with a title, description, category, and one file attachment, then view their submitted idea in their personal idea list.

**Why this priority**: This is the core value of the platform. Without idea submission, nothing else has purpose. It also covers the full authentication lifecycle (register, login, logout) for the submitter role.

**Independent Test**: Create a new submitter account, log in, fill in all idea fields, attach a valid file, submit the idea, then verify the idea appears in the submitter's idea list with the correct details.

**Acceptance Scenarios**:

1. **Given** an unregistered visitor, **when** they register with a valid email and password, **then** a submitter account is created and they can log in.
2. **Given** a signed-in submitter, **when** they complete the idea form with title, description, a category, and one valid file attachment, **then** the idea is saved and visible in their personal idea list.
3. **Given** a signed-in submitter who has submitted ideas, **when** they view their idea list, **then** only their own submitted ideas appear, each showing the title, category, and status.
4. **Given** a signed-in submitter, **when** they choose to log out, **then** the session ends and the app returns to an unauthenticated state.

---

### User Story 2 — Review and evaluate submitted ideas as an admin (Priority: P2)

An admin can sign in, view all submitted ideas from every submitter, update the status of any idea, and add an evaluation comment.

**Why this priority**: Admin review closes the innovation lifecycle. Without it, submitted ideas have no path to decision and the platform delivers no organizational value.

**Independent Test**: Log in as an admin, open the idea review dashboard, change the status of an idea to "under review," add an evaluation comment, and verify the updated status and comment appear on the idea detail.

**Acceptance Scenarios**:

1. **Given** an authenticated admin, **when** they open the idea review dashboard, **then** they see all submitted ideas from all submitters with submitter name, idea title, category, and current status.
2. **Given** an admin reviewing an idea, **when** they change the status to "under review," "accepted," or "rejected," **then** the idea status updates immediately and the change is persisted.
3. **Given** an admin reviewing an idea, **when** they add an evaluation comment, **then** the comment is saved and displayed alongside the idea.

---

### User Story 3 — Role-based access control and local app usability (Priority: P3)

The app enforces role-based access so submitters cannot reach admin screens, admins can access their dashboard, and the app starts and runs without errors in a local development environment.

**Why this priority**: Access control is a foundational safety requirement. Without it, any user could manipulate ideas or access admin functions.

**Independent Test**: Start the app locally. Log in as a submitter and confirm that admin screens return an error or redirect. Log out, log in as a seeded admin, and confirm the idea review dashboard is accessible.

**Acceptance Scenarios**:

1. **Given** a local development environment, **when** the app is started, **then** visitors can reach the login and registration screens without errors.
2. **Given** a signed-in submitter, **when** they attempt to navigate to any admin-only screen, **then** they are redirected to their idea list and no admin data is exposed.
3. **Given** a signed-in admin, **when** they access the app, **then** the idea review dashboard is available and all submitted ideas are visible.

---

### Edge Cases

- **Unsupported file type or more than one attachment**: The app MUST prevent submission and display a clear validation message listing the allowed file types (PDF, PNG, JPG, JPEG, DOCX) and the one-attachment limit.
- **Duplicate email registration**: Attempting to register with an already-used email MUST produce a friendly, specific error message allowing the user to try a different email.
- **Submitter with no ideas**: The idea list MUST display an encouraging empty state message explaining that no ideas have been submitted yet.
- **File too large**: Files exceeding 10MB MUST be rejected with a message stating the size limit before upload begins.
- **Attachment storage failure after form validation**: The idea MUST NOT be saved if the file cannot be stored. All non-file form data MUST be preserved so the user can retry without re-entering text.
- **Invalid status transition**: Admins MUST only be able to select valid next statuses from the current state. Invalid transitions MUST be blocked in the UI.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow visitors to register with an email address and password to create a submitter account.
- **FR-002**: System MUST allow registered users to log in with their email and password.
- **FR-003**: System MUST allow authenticated users to log out, which clears the active session.
- **FR-004**: System MUST enforce two user roles: submitter and admin.
- **FR-005**: System MUST restrict public registration to the submitter role only; admin accounts MUST be created through a separate seeding process.
- **FR-006**: System MUST allow authenticated submitters to create an innovation idea with a title, description, category, and exactly one file attachment.
- **FR-007**: System MUST restrict idea categories to: Technical Innovation, Process Improvement, Client Solution, Other.
- **FR-008**: System MUST restrict file attachments to PDF, PNG, JPG, JPEG, and DOCX file types with a maximum size of 10MB per file.
- **FR-009**: System MUST allow submitters to view a list of only their own submitted ideas.
- **FR-010**: System MUST allow admins to view all submitted ideas from all submitters.
- **FR-011**: System MUST allow admins to update an idea's status among: submitted, under review, accepted, rejected.
- **FR-012**: System MUST allow admins to add a text evaluation comment to any idea.
- **FR-013**: System MUST prevent submitters from accessing any admin-only screens or performing any admin-only actions.
- **FR-014**: System MUST display validation errors inline when required fields are missing or invalid on any form.
- **FR-015**: System MUST run in a local development environment without requiring cloud infrastructure or external services.

### Non-Functional Requirements

- **NFR-001**: Sessions MUST be bounded to 12 hours; logout MUST immediately invalidate the session.
- **NFR-002**: All forms MUST be keyboard-accessible with visible focus states and programmatically associated labels.
- **NFR-003**: Validation feedback MUST appear at the field level and include a form-level summary when submission fails.

### Key Entities

- **User**: A registered person with an email, hashed password, and a role of submitter or admin.
- **Idea**: An innovation submission with a title, description, category, status, submitter reference, and timestamps.
- **Attachment**: A single file linked to an idea, storing file name, local path, type, and size.
- **Evaluation Comment**: A text comment written by an admin, linked to a specific idea.
- **Session**: A record of an authenticated user's active login, with an expiry time and invalidation on logout.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can register, log in, submit an idea with a file attachment, and log out successfully in under 5 minutes on first use.
- **SC-002**: Submitters can view their own idea list, and admins can view all ideas, in at least 9 out of 10 manual test runs without errors.
- **SC-003**: Admins can update idea status and add evaluation comments for at least 19 out of 20 ideas sampled during acceptance testing.
- **SC-004**: The app starts and serves all pages locally with no build or runtime errors on the intended development environment.
- **SC-005**: Role-based access is correctly enforced in 100% of manual test cases — submitters cannot reach admin screens, and admins cannot impersonate submitters.

## Assumptions

- Registration always creates a submitter account; there is no admin role option during self-registration.
- Admin accounts are provisioned via a seed script using a known email and password (e.g., `admin@innovatepam.local` / `Admin123!`).
- Idea categories are fixed: Technical Innovation, Process Improvement, Client Solution, Other. Categories are not user-configurable.
- Each idea accepts exactly one file attachment; multiple attachments are out of scope for Phase 1.
- File attachments are stored locally on the development machine and are accessible via a static URL; protected download routing is out of scope for Phase 1.
- The app is intended for local development and demo use only; production deployment, scalability, and multi-tenancy are out of scope.
- UI polish is not required; the priority is a working, usable experience for both roles.
- Session lifetime is 12 hours for local MVP use.
