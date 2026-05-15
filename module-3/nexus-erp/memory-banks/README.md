# Memory Banks — NexusERP

## Purpose

This memory bank provides persistent context for AI assistants working on NexusERP.
It contains architectural decisions, coding conventions, domain knowledge, and workflows
that must guide all AI-generated code and documentation.

NexusERP is a web-based ERP system for Turkish SMEs (5–200 employees) built spec-first:
every feature starts as a Story with acceptance criteria before any code is written.

## Structure

### architecture/
System architecture pattern, technology stack with exact versions, deployment approach,
and key architectural decisions (see also `specs/adrs/`).

### conventions/
Coding standards, naming conventions, testing patterns, error handling requirements,
and quality criteria sourced from `AGENTS.md`.

### domain/
Domain-specific terminology, business rules, lifecycle state machines, user personas,
and key concepts specific to ERP / SME context that AI would otherwise misinterpret.

### workflows/
Development processes (spec-first TDD), branching strategy, PR requirements,
deployment procedures, and team collaboration patterns.

### roles/
Role-specific context for different team members: developer, QA engineer, product manager.

## Quick Navigation

- [Architecture Overview](architecture/overview.md)
- [Coding Standards](conventions/coding-standards.md)
- [Domain Glossary](domain/glossary.md)
- [Development Workflow](workflows/development-process.md)
- [Developer Context](roles/developer.md)
- [QA Context](roles/qa.md)

## How to Use

When asking AI to generate code or documentation for NexusERP, load the relevant memory
bank files to provide project-specific context.

- **Claude Code:** files in `.claude/` are auto-loaded; also reference memory-banks/ explicitly
- **Cline:** place memory banks in `.cline/memory/` (auto-loaded on start)
- **GitHub Copilot:** workspace context in `.github/copilot/`
- **Manual:** paste relevant file contents into the conversation context

**Golden rule:** Memory Bank (architecture) + Agents.MD (standards) + Inline Prompt (task) = high-quality AI output.

## Maintenance

- Review and update quarterly or when major architectural/process changes occur.
- Version-control these files alongside project code.
- Use the same PR process for memory bank updates as for code changes.

**Last Updated:** 2026-05-06
**Version:** 1.0
**Project:** NexusERP
