# Quickstart: InnovatEPAM Portal

## Prerequisites

- Node.js 18+ (v22 recommended)
- npm 10+

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run database migrations
npx prisma migrate dev --name init

# 3. Seed admin account (admin@innovatepam.local / Admin123!)
npx prisma db seed

# 4. Start the development server
npm run dev
```

App runs at: http://localhost:3000

## Test Accounts

| Role      | Email                     | Password  |
|-----------|---------------------------|-----------|
| Admin     | admin@innovatepam.local   | Admin123! |
| Submitter | Register at /register     | Your choice |

## File Uploads

Uploaded files are saved to `public/uploads/`. This directory is created automatically on first upload. It is gitignored to avoid committing binary files.

## Resetting the Database

```bash
# Delete the database and re-run migrations + seed
npx prisma migrate reset
```

## Folder Structure

```
app/                     Next.js App Router pages and API routes
├── api/auth/            Authentication endpoints
├── api/ideas/           Submitter idea endpoints
├── api/admin/           Admin endpoints
├── (auth)/login/        Login page
├── (auth)/register/     Registration page
├── submitter/ideas/     Submitter idea list
└── admin/ideas/         Admin idea dashboard

components/              Shared React components
lib/                     Auth helpers, Prisma client, validation
prisma/                  Schema, migrations, seed script
public/uploads/          Local file attachment storage (gitignored)
specs/001-innovation-management/  SpecKit documentation
```
