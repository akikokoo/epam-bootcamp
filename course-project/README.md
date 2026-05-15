# InnovatEPAM Portal

A full-stack employee innovation management platform built as the capstone project for **A201: Beyond Vibe Coding**. Employees submit innovation ideas, admins evaluate them through a structured multi-stage pipeline, and the entire lifecycle is tracked transparently.

---

## Features

| Phase | Feature |
|---|---|
| Phase 1 | User auth (register/login/logout), role-based access, idea submission, admin evaluation with comments |
| Phase 2 | Smart submission forms — dynamic fields per category (Technical Innovation, Process Improvement, Client Solution, Other) |
| Phase 3 | Multi-media support — multiple file attachments (PDF, PNG, JPG, JPEG, DOCX, MP4, MOV, PPTX), 50MB per file |
| Phase 4 | Draft management — save, edit, and submit ideas at your own pace |
| Phase 5 | Multi-stage review pipeline — Initial Screening → Technical Review → Business Impact → Final Selection |
| Phase 6 | Blind review — hide submitter identity per idea to reduce evaluator bias |
| Phase 7 | Scoring system — rate ideas on Innovation, Feasibility, Impact, Clarity (1–5) |

---

## Tech Stack

- **Framework**: Next.js 16 App Router (TypeScript strict)
- **UI**: React + Tailwind CSS
- **Database**: SQLite via Prisma v6
- **Auth**: bcrypt + HTTP-only cookie sessions
- **File storage**: Local filesystem (`public/uploads/`)

---

## Local Setup

### Prerequisites

- Node.js 18+
- `sqlite3` CLI (for manual DB inspection, optional)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./prisma/dev.db"
```

### 3. Set up the database

```bash
npx prisma db push
npx prisma db seed
```

This creates the SQLite database and seeds the admin account.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@innovatepam.local` | `Admin1234!` |
| Submitter | `bob@test.com` | `Test1234!` |

To create additional submitter accounts, use the `/register` page.

---

## Project Structure

```
course-project/
├── app/
│   ├── (auth)/login         # Login page
│   ├── (auth)/register      # Registration page
│   ├── submitter/ideas      # Submitter dashboard
│   ├── admin/ideas          # Admin review dashboard
│   └── api/                 # API route handlers
├── components/
│   ├── idea-form.tsx        # Idea submission form
│   ├── idea-card.tsx        # Idea display card
│   └── status-badge.tsx     # Status indicator
├── lib/
│   ├── auth.ts              # Session helpers
│   ├── db.ts                # Prisma singleton
│   └── validation.ts        # Input validation
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Admin account seed
├── specs/                   # SpecKit specs for all 7 phases
├── PROJECT_SUMMARY.md       # Course deliverable
└── PRESENTATION_SCRIPT.md   # 3-minute demo script
```

---

## User Roles

**Submitter**
- Register and log in
- Submit ideas with category-specific fields and file attachments
- Save ideas as drafts and edit before submission
- Track status of their own ideas

**Admin**
- View all submitted ideas
- Advance ideas through the review pipeline
- Toggle blind review per idea
- Score ideas on 4 dimensions
- Add evaluation comments and update status

---

## Course

Built during **EPAM A201: Beyond Vibe Coding** — a course on Specification-Driven Development (SDD) using GitHub SpecKit and AI-native engineering practices.

All 7 phases completed. See [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md) for full documentation.
