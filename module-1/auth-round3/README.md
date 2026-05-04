# Auth Round 3 — Maximum Precision

Fully specified prompt: security requirements, exact error messages, DB schema, rate limiting, response format.

## Run

```bash
# Database — run db.sql against your PostgreSQL instance first
psql -d your_db -f backend/db.sql

# Backend
cd backend
npm install
cp .env.example .env   # fill in values
npm run dev

# Frontend
cd frontend
npm install
npm run dev            # → http://localhost:5174
```

## Stack
- React + TypeScript (Vite, port 5174)
- Node.js + Express + TypeScript (port 3001)
- PostgreSQL
- bcrypt cost factor **12**, JWT 24h, rate limit 5/hour, express-rate-limit

## Key Differences from Round 1 & 2
| Feature | R1 | R2 | R3 |
|---|---|---|---|
| TypeScript | No | Yes | Yes |
| Password rules enforced | No | Yes | Yes |
| Rate limiting | No | No | Yes (5/hr) |
| Bcrypt cost factor | 10 | 10 | **12** |
| Account lock support | No | No | Yes |
| Exact error messages | No | Partial | Yes |
| Password strength UI | No | Hint only | Live indicator |
| Env validation | No | No | Fail-fast |

See `PROMPT.md` for full prompt and assessment.
