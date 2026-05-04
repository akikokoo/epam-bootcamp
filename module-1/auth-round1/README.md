# Auth Round 1 — Natural Baseline

Prompt: `"Create a user authentication system"`

Vague prompt, AI makes all the decisions. Plain JavaScript, no types, no validation rules, no rate limiting.

## Run

```bash
# Backend
cd backend
npm install
# Copy .env.example → .env, fill in your DB url
node server.js

# Frontend
# Open frontend/index.html directly in browser
```

## Stack
- Node.js + Express (plain JS)
- PostgreSQL
- bcrypt (cost 10), JWT

See `PROMPT.md` for assessment.
