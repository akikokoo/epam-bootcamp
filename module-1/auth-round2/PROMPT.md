# Round 2 — Precision Techniques Applied

## Prompt Used

```
Create user authentication with:

Requirements:
- Email-based login (not username)
- Password: min 8 chars, 1 uppercase, 1 number
- Password reset via email

Tech Stack:
- React + TypeScript frontend
- Node.js/Express + TypeScript backend
- PostgreSQL database

Success Criteria:
- User can register, login, reset password
- Passwords hashed with bcrypt
- Return JWT tokens
- Structured JSON responses: { success, data?, error? }
```

## Techniques Applied

- [x] Clear and direct
- [x] Tech stack specified
- [x] Password rules defined
- [x] Response format shown
- [x] Success criteria listed

## Improvements from Round 1

- AI no longer assumed: username vs email, bcrypt cost factor, response shape
- Now includes: TypeScript types, input validation, structured errors, proper routing (`/api/auth/*`)
- Better handling of: validation errors, duplicate email conflict

## Still Missing (Round 3 will add)

- Rate limiting
- Bcrypt cost factor 12 (using default 10 still)
- Locked account handling
- Specific error messages per spec
- Performance constraints

## Confidence Level: 7/10 (was 4/10 in Round 1)
