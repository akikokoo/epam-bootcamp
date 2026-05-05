---
description: "Generate a PRD from project brief"
---

# Generate PRD

You are generating a Product Requirements Document (PRD) for this repository.

## Instructions
1. Read and follow the template at `specs/templates/prd-template.md`.
2. Use the project brief provided in the user prompt as the input source of truth.
3. Produce a complete PRD with concrete, specific details (avoid vague statements).
4. Make all goals, requirements, and success metrics measurable where possible.
5. Use explicit names for personas and clear in-scope vs out-of-scope boundaries.
6. Derive a feature name in kebab-case from the brief and save the PRD to:
   `specs/prds/PRD-{feature-name}.md`
7. If `specs/prds/` does not exist, create it.

## PRD Quality Checklist
Before finalizing, confirm the PRD satisfies all of the following:
- Problem statement includes numbers/baseline context where available.
- User personas are explicitly named (not generic labels only).
- Success metrics are SMART (specific, measurable, achievable, relevant, time-bound when applicable).
- Scope is unambiguous, with clear in-scope and out-of-scope items.

## Output Requirements
- Output only the final PRD content using the repository template structure.
- Fill all template placeholders with project-specific content.
- Keep writing concise, professional, and implementation-ready.
