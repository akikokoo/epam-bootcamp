# Round 1 — Natural Baseline Prompt

## Prompt Used

> "Create a user authentication system"

## What AI Assumed (not specified)

- Tech stack: Node.js + Express, plain JS, PostgreSQL
- Auth method: JWT (default assumption)
- Password hashing: bcrypt with cost factor 10 (default)
- No password validation rules
- No rate limiting
- No input validation
- API routes at root level (`/login`, `/register`)
- Password reset without email — direct update

## Missing Critical Pieces

- [ ] Security measures (rate limiting, input sanitization)
- [ ] Password strength rules
- [ ] Email-based reset flow (token/link)
- [ ] Structured error responses
- [ ] Environment variable validation
- [ ] TypeScript / type safety

## Confidence Level: 4/10

## Assessment

Basic skeleton — would need hours of rework before production use.
Demonstrates that vague prompts produce functional but assumption-heavy output.
