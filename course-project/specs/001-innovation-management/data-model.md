# Data Model: InnovatEPAM Portal Phase 1 MVP

**Branch**: `001-innovation-management` | **Date**: 2026-05-15

## Entities

### User

Represents a registered employee. Role determines access level.

| Field        | Type     | Constraints                        |
|--------------|----------|------------------------------------|
| id           | String   | Primary key (cuid), auto-generated |
| email        | String   | Unique, required, valid email format |
| passwordHash | String   | Required, bcrypt hash              |
| role         | Role     | Enum: `submitter` \| `admin`       |
| createdAt    | DateTime | Auto-set on creation               |

**Relations**: One User → many Ideas (as submitter), many EvaluationComments (as admin), many Sessions.

---

### Idea

Represents an innovation submission by a submitter.

| Field       | Type       | Constraints                                               |
|-------------|------------|-----------------------------------------------------------|
| id          | String     | Primary key (cuid), auto-generated                        |
| title       | String     | Required, max 200 characters                              |
| description | String     | Required, max 2000 characters                             |
| category    | Category   | Enum: `TECHNICAL_INNOVATION` \| `PROCESS_IMPROVEMENT` \| `CLIENT_SOLUTION` \| `OTHER` |
| status      | IdeaStatus | Enum: `SUBMITTED` \| `UNDER_REVIEW` \| `ACCEPTED` \| `REJECTED`, default: `SUBMITTED` |
| submitterId | String     | Foreign key → User.id                                     |
| createdAt   | DateTime   | Auto-set on creation                                      |
| updatedAt   | DateTime   | Auto-updated on change                                    |

**Relations**: One Idea → one Attachment (optional), many EvaluationComments, one User (submitter).

**Status transitions**:
```
SUBMITTED → UNDER_REVIEW
UNDER_REVIEW → ACCEPTED
UNDER_REVIEW → REJECTED
```
Backward transitions and direct SUBMITTED → ACCEPTED/REJECTED are not permitted.

---

### Attachment

A single file linked to an idea. One idea may have at most one attachment.

| Field    | Type   | Constraints                                      |
|----------|--------|--------------------------------------------------|
| id       | String | Primary key (cuid), auto-generated               |
| fileName | String | Original file name shown to users                |
| filePath | String | Relative path under `public/` (e.g., `uploads/uuid-filename.pdf`) |
| fileType | String | MIME type (e.g., `application/pdf`, `image/png`) |
| fileSize | Int    | File size in bytes, max 10,485,760 (10MB)        |
| ideaId   | String | Foreign key → Idea.id, **unique** (one per idea) |

**Allowed file types**: PDF (`application/pdf`), PNG (`image/png`), JPG/JPEG (`image/jpeg`), DOCX (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`).

---

### EvaluationComment

A text comment written by an admin during idea review.

| Field     | Type     | Constraints                        |
|-----------|----------|------------------------------------|
| id        | String   | Primary key (cuid), auto-generated |
| text      | String   | Required, max 1000 characters      |
| adminId   | String   | Foreign key → User.id              |
| ideaId    | String   | Foreign key → Idea.id              |
| createdAt | DateTime | Auto-set on creation               |

**Relations**: Many EvaluationComments → one Idea, many EvaluationComments → one User (admin).

---

### Session

Tracks an authenticated user's active login.

| Field     | Type     | Constraints                                    |
|-----------|----------|------------------------------------------------|
| id        | String   | Primary key (cuid), auto-generated             |
| userId    | String   | Foreign key → User.id                          |
| token     | String   | Unique, random UUID generated on login         |
| expiresAt | DateTime | Set to 12 hours after creation                 |
| createdAt | DateTime | Auto-set on creation                           |

**Lifecycle**: Created on login. Deleted (invalidated) on logout. Expired sessions are invalid even if not deleted.

---

## Enums

```prisma
enum Role {
  submitter
  admin
}

enum Category {
  TECHNICAL_INNOVATION
  PROCESS_IMPROVEMENT
  CLIENT_SOLUTION
  OTHER
}

enum IdeaStatus {
  SUBMITTED
  UNDER_REVIEW
  ACCEPTED
  REJECTED
}
```

## Entity Relationship Diagram

```
User (1) ──────────────── (many) Idea
  │                               │
  │ (admin)                       │ (1)
  └─── (many) EvaluationComment   │
             │                    │
             └──── (many to 1) ───┘ Idea
                                  │
                               (0..1) Attachment

User (1) ─── (many) Session
```
