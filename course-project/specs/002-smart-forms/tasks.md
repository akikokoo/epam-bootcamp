# Tasks: InnovatEPAM Portal — Phase 2: Smart Submission Forms

**Input**: Design documents from `specs/002-smart-forms/`

---

## Task List

- [x] T201 Add `categoryData String?` column to `Idea` model in `prisma/schema.prisma`
- [x] T202 Run `npx prisma db push` to apply schema change to `dev.db`
- [x] T203 Add `categoryFields` state (`Record<string, string>`) to `IdeaForm` component with reset logic on category change
- [x] T204 Implement `TECHNICAL_INNOVATION` field section in `IdeaForm` — Technology Stack (text input), Technical Complexity (select: Low/Medium/High), Estimated Development Time (text input)
- [x] T205 Implement `PROCESS_IMPROVEMENT` field section — Current Process Pain Points (textarea), Expected Improvement (text), Affected Teams (text)
- [x] T206 Implement `CLIENT_SOLUTION` field section — Target Client / Industry (text), Client Problem Statement (textarea), Expected Business Impact (text)
- [x] T207 Implement `OTHER` field section — Additional Context (textarea)
- [x] T208 Append `categoryData` (JSON-stringified `categoryFields`) to FormData in `IdeaForm` submit handler
- [x] T209 Update `POST /api/ideas` to read `categoryData` from FormData and pass to `prisma.idea.create`
- [x] T210 Update admin dashboard to parse and display `categoryData` fields per idea card

---

## Verification

- [x] Selecting each of the 4 categories renders the correct dynamic fields
- [x] Switching categories clears the previous fields
- [x] Submitted `categoryData` appears in admin dashboard
- [x] Submitting without filling category fields succeeds (fields are optional)
