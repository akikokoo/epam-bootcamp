---
description: "Generate an Architecture Decision Record (ADR)"
---

# Generate ADR

You are generating an Architecture Decision Record (ADR) for the NexusERP repository.

## Instructions
1. Read and follow the template at `specs/templates/adr-template.md`.
2. Use the architectural question or decision provided in the user prompt as the input.
3. Produce a complete ADR with a concrete, specific decision — avoid vague statements.
4. The Decision section must name the specific technology/pattern and version.
5. Alternatives Considered must include at least 2 options with clear rejection reasons.
6. Derive a short title in kebab-case and save the ADR to:
   `specs/adrs/ADR-{nn}-{title}.md`
   where `{nn}` is the next available number (01, 02, 03...).
7. If `specs/adrs/` does not exist, create it.

## ADR Quality Checklist
Before finalizing, confirm the ADR satisfies all of the following:
- [ ] Status is set to one of: Proposed / Accepted / Superseded / Deprecated.
- [ ] Context describes the problem and constraints clearly (not the solution).
- [ ] Decision is specific: names technology, version, and implementation approach.
- [ ] Both positive and negative consequences are listed honestly.
- [ ] At least 2 alternatives are documented with rejection reasons.

## Output Requirements
- Output only the final ADR content using the repository template structure.
- Fill all template placeholders with decision-specific content.
- Keep writing concise, technical, and permanent — ADRs are immutable records.
