# Agents Conventions - Task Board Project

This document defines project conventions for AI assistants working in this repository.

## 1. Tech Stack
- **Frontend:** React 18 + Vite
- **Language:** TypeScript
- **Data Storage:** `localStorage`
- **Backend:** None (no server/API/database)

## 2. Specification Structure
Store product and planning specs under `specs/` using this structure:

- `specs/templates/` -> reusable templates (PRD, Epic, Story)
- `specs/prds/` -> project PRDs
- `specs/epics/` -> epic definitions
- `specs/stories/` -> user stories

If a folder does not exist yet, create it before adding files.

## 3. Naming Conventions
Use lowercase kebab-case file names and descriptive prefixes:

- PRD: `prd-<topic>.md`
- Epic: `epic-<topic>.md`
- Story: `story-<id>-<topic>.md` (example: `story-us-101-login-flow.md`)

Rules:
- Use only lowercase letters, numbers, and hyphens.
- No spaces or underscores.
- Keep names short but specific.

## 4. File Organization
- Keep documentation/specs in `specs/`; keep app code in source directories (e.g., `src/`).
- Do not mix templates with completed specs.
- One artifact per file (one PRD, one Epic, one Story).
- Prefer updating existing related files over creating duplicates.
