# Round 3 — Maximum Precision Prompt

## Prompt Used

```
Build a production-ready user authentication REST API with the following complete specification:

Tech Stack:
- React + TypeScript frontend (Vite, port 5174)
- Node.js + Express + TypeScript backend (port 3001)
- PostgreSQL database

Security Requirements:
- Bcrypt password hashing with cost factor 12
- Rate limiting: 5 login attempts per hour per IP (express-rate-limit)
- JWT session expiry: 24 hours (configurable via env)
- Account lock flag in DB (locked_until column)
- All secrets via environment variables — fail fast if missing

Password Rules (enforced on both client and server):
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number

API Endpoints:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/reset-password

Exact Response Schema:
{
  success: boolean,
  data?: { token: string, expiresIn: number },
  error?: { code: string, message: string }
}

Exact Error Messages:
- Invalid credentials → "Invalid email or password"
- Account locked     → "Too many attempts. Try again in 1 hour."
- Network failure    → "Connection failed. Please try again."
- Duplicate email    → 409 with code EMAIL_EXISTS
- Rate limit hit     → 429 with code RATE_LIMIT_EXCEEDED

Frontend:
- Live password strength indicator (show per-rule pass/fail)
- Disable submit button while loading
- Clear form on success
- autoComplete attributes for password managers

Database schema must include: id, email, password_hash, failed_attempts, locked_until, created_at, updated_at
```

## Techniques Applied

- [x] Clear and direct
- [x] Tech stack + ports specified
- [x] Security requirements with exact values (bcrypt=12, rate limit=5/hour)
- [x] Password rules (both client and server)
- [x] API endpoints defined
- [x] Exact response schema
- [x] Exact error messages per scenario
- [x] DB schema columns specified
- [x] Performance constraints (session expiry configurable)
- [x] Frontend UX requirements

## Comparison

| Metric              | Round 1 | Round 2 | Round 3 |
|---------------------|---------|---------|---------|
| Prompt length       | 1 line  | ~15 lines | ~40 lines |
| Quality score       | 4/10    | 7/10    | 9/10    |
| AI assumptions      | Many    | Some    | Few     |
| Production ready    | No      | No      | Yes (minor tweaks) |

## Confidence Level: 9/10 (R1: 4/10, R2: 7/10)
