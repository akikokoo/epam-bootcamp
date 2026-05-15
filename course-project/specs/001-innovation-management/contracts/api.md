# API Contracts: InnovatEPAM Portal Phase 1 MVP

**Branch**: `001-innovation-management` | **Date**: 2026-05-15

All endpoints are Next.js App Router route handlers. Authentication is via `session` HttpOnly cookie. All JSON responses use `Content-Type: application/json`.

---

## Authentication

### POST /api/auth/register

Register a new submitter account.

**Request**
```json
{ "email": "user@example.com", "password": "Secret123!" }
```

**Success** `201`
```json
{ "success": true }
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 400 | `{ "error": "Invalid email or password format" }` | Validation failure |
| 409 | `{ "error": "Email already registered" }` | Duplicate email |

---

### POST /api/auth/login

Authenticate and create a session. Sets `session` cookie on success.

**Request**
```json
{ "email": "user@example.com", "password": "Secret123!" }
```

**Success** `200`
```json
{ "success": true, "role": "submitter" }
```
Sets: `Set-Cookie: session=<token>; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200`

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 401 | `{ "error": "Invalid email or password" }` | Wrong credentials |

---

### POST /api/auth/logout

Invalidate the current session and clear the cookie.

**Request**: No body. Reads `session` cookie.

**Success** `200`
```json
{ "success": true }
```
Sets: `Set-Cookie: session=; HttpOnly; Max-Age=0`

---

## Ideas (Submitter)

### POST /api/ideas

Create a new idea. Accepts `multipart/form-data`.

**Auth required**: session cookie with role `submitter`

**Request** (FormData)
```
title: string (required, max 200 chars)
description: string (required, max 2000 chars)
category: "TECHNICAL_INNOVATION" | "PROCESS_IMPROVEMENT" | "CLIENT_SOLUTION" | "OTHER"
file: File (optional, max 10MB, allowed types: pdf/png/jpg/jpeg/docx)
```

**Success** `201`
```json
{
  "id": "clx...",
  "title": "My Idea",
  "description": "...",
  "category": "TECHNICAL_INNOVATION",
  "status": "SUBMITTED",
  "createdAt": "2026-05-15T10:00:00.000Z",
  "attachment": {
    "fileName": "proposal.pdf",
    "filePath": "/uploads/abc123-proposal.pdf",
    "fileSize": 204800
  }
}
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 400 | `{ "error": "Title is required" }` | Missing required field |
| 400 | `{ "error": "File type not allowed" }` | Invalid file type |
| 400 | `{ "error": "File size exceeds 10MB limit" }` | File too large |
| 401 | `{ "error": "Unauthorized" }` | No valid session |
| 403 | `{ "error": "Forbidden" }` | Role is not submitter |

---

### GET /api/ideas

List the authenticated submitter's own ideas.

**Auth required**: session cookie with role `submitter`

**Success** `200`
```json
{
  "ideas": [
    {
      "id": "clx...",
      "title": "My Idea",
      "category": "TECHNICAL_INNOVATION",
      "status": "SUBMITTED",
      "createdAt": "2026-05-15T10:00:00.000Z",
      "attachment": { "fileName": "proposal.pdf" }
    }
  ]
}
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 401 | `{ "error": "Unauthorized" }` | No valid session |

---

## Admin

### GET /api/admin/ideas

List all submitted ideas from all submitters.

**Auth required**: session cookie with role `admin`

**Success** `200`
```json
{
  "ideas": [
    {
      "id": "clx...",
      "title": "My Idea",
      "category": "PROCESS_IMPROVEMENT",
      "status": "SUBMITTED",
      "createdAt": "2026-05-15T10:00:00.000Z",
      "submitter": { "email": "user@example.com" },
      "attachment": { "fileName": "doc.docx", "filePath": "/uploads/abc-doc.docx" },
      "comments": [
        { "id": "cly...", "text": "Looks promising", "createdAt": "2026-05-15T11:00:00.000Z" }
      ]
    }
  ]
}
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 401 | `{ "error": "Unauthorized" }` | No valid session |
| 403 | `{ "error": "Forbidden" }` | Role is not admin |

---

### PATCH /api/admin/[ideaId]/status

Update the status of a specific idea.

**Auth required**: session cookie with role `admin`

**Request**
```json
{ "status": "UNDER_REVIEW" }
```

**Valid transitions**:
- `SUBMITTED` → `UNDER_REVIEW`
- `UNDER_REVIEW` → `ACCEPTED`
- `UNDER_REVIEW` → `REJECTED`

**Success** `200`
```json
{ "id": "clx...", "status": "UNDER_REVIEW", "updatedAt": "2026-05-15T12:00:00.000Z" }
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 400 | `{ "error": "Invalid status transition" }` | Disallowed transition |
| 401 | `{ "error": "Unauthorized" }` | No valid session |
| 403 | `{ "error": "Forbidden" }` | Role is not admin |
| 404 | `{ "error": "Idea not found" }` | Unknown ideaId |

---

### POST /api/admin/[ideaId]/comments

Add an evaluation comment to an idea.

**Auth required**: session cookie with role `admin`

**Request**
```json
{ "text": "This idea has strong potential." }
```

**Success** `201`
```json
{
  "id": "cly...",
  "text": "This idea has strong potential.",
  "createdAt": "2026-05-15T12:30:00.000Z"
}
```

**Errors**
| Status | Body | Condition |
|--------|------|-----------|
| 400 | `{ "error": "Comment text is required" }` | Empty text |
| 401 | `{ "error": "Unauthorized" }` | No valid session |
| 403 | `{ "error": "Forbidden" }` | Role is not admin |
| 404 | `{ "error": "Idea not found" }` | Unknown ideaId |
