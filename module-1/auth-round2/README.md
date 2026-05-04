# Auth Round 2 — Precision Techniques Applied

Prompt specifies: email login, password rules, tech stack, response format.

## Run

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in values
npm run dev

# Frontend
cd frontend
npm install
npm run dev            # → http://localhost:5173
```

## Stack
- React + TypeScript (Vite)
- Node.js + Express + TypeScript
- PostgreSQL
- bcrypt (cost 10), JWT 24h, express-validator

See `PROMPT.md` for assessment.
