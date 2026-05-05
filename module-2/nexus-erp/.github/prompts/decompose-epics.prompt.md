---
description: "Decompose PRD into Epics"
---

# Decompose PRD into Epics

You are decomposing an existing PRD into high-impact Epics for the NexusERP repository.

## Instructions
1. Read the PRD provided in the user prompt (or referenced file path).
2. Use `specs/templates/epic-template.md` as the required structure for each Epic.
3. Identify **4 to 5** high-level Epics that collectively cover the PRD scope.
4. Each Epic must:
   - Deliver end-to-end user or business value.
   - Be independently deployable.
   - Map to at least one Success Metric from the PRD.
   - Have clear boundaries (what it includes and excludes).
5. Avoid overlaps between Epics; each major capability should have one clear owner Epic.
6. If any Epic involves the AI Memory Bank, include a "Memory Bank Integration" sub-section.
7. Save each Epic to:
   `specs/epics/EPIC-{number}-{name}.md`
   - `{number}`: 01, 02, 03...
   - `{name}`: short kebab-case Epic name
8. If `specs/epics/` does not exist, create it.

## Quality Rules
- Every Epic should be meaningful on its own and shippable without waiting for all others.
- Success Criteria must be measurable and traceable back to PRD Success Metrics.
- Scope/Complexity should match Epic-level planning (not task-level details).
- Boundaries and dependencies should be explicit.

## Output Requirements
- Generate one file per Epic using the epic template structure.
- Fill placeholders with concrete, PRD-specific content.
- Keep content concise, specific, and execution-ready.
