<!--
Sync Impact Report
Version change: unset → 1.0.0
Modified principles: placeholders → Clean Code; placeholders → Simple and Responsive UI; placeholders → Minimal Dependencies; placeholders → Reusable React Components; placeholders → Persistence and Accessibility
Added sections: Technology & Constraints; Development Workflow
Removed sections: none
Templates requiring updates: none — templates are generic and remain valid
Follow-up TODOs: none
-->

# InnovatEPAM Portal Constitution

## Core Principles

### I. Clean Code
- Code MUST be readable, explicit, and easy to understand for the next developer.
- The project MUST use TypeScript strict mode and MUST avoid `any` except when a documented exception is required.
- Functions and components MUST have a single responsibility and MUST NOT hide side effects.
- Duplicate logic MUST be extracted into reusable utilities, hooks, or shared components.
- Comments MUST explain intent or trade-offs, not restate obvious implementation details.

### II. Simple and Responsive UI
- The UI MUST be mobile-first and MUST work across viewport sizes without horizontal overflow.
- Layouts MUST remain simple, predictable, and visually consistent across screens.
- shadcn/ui components MUST be used for all interactive UI elements; custom components are allowed only when shadcn/ui lacks coverage.
- New UI behavior MUST be justified by user value and MUST NOT be added for visual novelty.
- Functional, working UI takes priority over visual polish in all MVP phases.

### III. Minimal Dependencies
- Dependencies MUST be limited to essential, actively maintained packages.
- Next.js, React, Tailwind CSS, shadcn/ui, and Prisma are approved; any additional dependency MUST be justified with a documented rationale.
- Native browser APIs and built-in React/Next.js patterns MUST be preferred over extra libraries for one-off behavior.
- The bundle SHOULD remain small and maintainable; large frameworks MUST NOT be added for narrow needs.

### IV. Reusable React Components
- React components MUST be composable, presentational where possible, and configurable through props.
- UI components MUST separate visual rendering from business logic and data fetching.
- Shared components SHOULD be reused consistently rather than duplicated across pages.
- Components MUST be named clearly to reflect their responsibility and MUST NOT mix unrelated concerns.

### V. Persistence and Accessibility
- Persistence MUST use SQLite via Prisma ORM, with all data access encapsulated behind a clear abstraction layer.
- Accessibility basics MUST be respected: semantic HTML, keyboard navigation, visible focus states, and adequate contrast ratios.
- Manual testing is the required validation approach for UI and responsive behavior; findings MUST be fixed before a phase is considered complete.
- The product MUST support basic keyboard navigation and degrade gracefully when optional features are unavailable.

## Technology & Constraints

- The project MUST be implemented with **Next.js 16 App Router** and **TypeScript** with strict compiler settings enabled.
- **Tailwind CSS** and **shadcn/ui** are the approved and required UI styling approach; no other CSS frameworks may be added.
- **Prisma ORM** with **SQLite** is the required persistence technology; direct database access MUST NOT bypass the Prisma client.
- Storage access (Prisma client initialization, query helpers) MUST be isolated in `lib/` and MUST NOT be imported directly inside React Server Components or UI components.
- File attachments for Phase 1 MUST be stored under `public/uploads/` using public static URLs; protected download routing is out of scope for the MVP.
- No automated unit, integration, or end-to-end tests are required; manual testing is sufficient and expected.

## Development Workflow

- Every feature MUST start with a SpecKit specification (`/speckit-specify`) before any implementation begins.
- Commits MUST be descriptive and grouped logically: `feat:`, `fix:`, `docs:`, `refactor:` prefixes MUST be used.
- Each phase MUST produce a functionally working result before the next phase begins; incomplete phases MUST NOT be merged forward.
- Non-trivial dependency or architecture changes MUST be documented and reviewed before implementation.
- Manual testing MUST include at least one responsive viewport check and one keyboard/navigation check for each UI flow.

## Governance

- This constitution is the authoritative guide for all engineering decisions in the InnovatEPAM Portal.
- Amendments require a documented rationale and an update to the `Last Amended` date.
- Version changes follow SemVer:
  - MAJOR for backward-incompatible principle or constraint changes.
  - MINOR for added principles or workflow expansions.
  - PATCH for clarifications, wording improvements, or non-semantic refinements.
- All code reviews MUST confirm adherence to at least one relevant principle and MUST flag violations before approval.

**Version**: 1.0.0 | **Ratified**: 2026-05-15 | **Last Amended**: 2026-05-15
