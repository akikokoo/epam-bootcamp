---
description: "Break Epic into User Stories"
---

# Decompose Epic into User Stories

You are decomposing a single Epic into implementation-ready User Stories for this repository.

## Instructions
1. Read the Epic provided in the user prompt (or referenced file path).
2. Use `specs/templates/story-template.md` as the required output structure for each story.
3. Create **5 to 7** User Stories that together cover the Epic scope end-to-end.
4. Each story must:
   - Use this exact format: **As a [persona], I want [action] so that [benefit].**
   - Be sized to be completable in **1-3 days**.
   - Include **3-5 specific, testable acceptance criteria**.
   - Satisfy INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable).
5. Keep stories atomic and avoid overlapping scope between stories.
6. Name output files using this convention:
   `specs/stories/STORY-{epic}.{number}-{name}.md`
   - `{epic}`: short kebab-case Epic identifier
   - `{number}`: 01, 02, 03...
   - `{name}`: short kebab-case story name
7. If `specs/stories/` does not exist, create it.

## Quality Rules
- Personas must be explicit and consistent with the Epic audience.
- Acceptance criteria must be verifiable and unambiguous.
- Estimation must fit the 1-3 day constraint.
- If a story is too large, split it before finalizing.
- Ensure the set of stories is collectively complete for the Epic, with no major gaps.

## Output Requirements
- Generate one file per story using the story template structure.
- Fill placeholders with concrete, Epic-specific content.
- Return concise, implementation-ready stories only.
