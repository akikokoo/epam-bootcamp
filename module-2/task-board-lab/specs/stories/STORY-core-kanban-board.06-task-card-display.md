# Story: CORE-KANBAN-06 - Task Card Display

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-06
**Title:** Task Card Display

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **to view task titles and optional descriptions on cards** so that **I can understand work items at a glance**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** a task has a title, **when** it is rendered, **then** the title is visible on the card.
2. **Given** a task has a description, **when** it is rendered, **then** the description is shown below the title.
3. **Given** a task has no description, **when** it is rendered, **then** the card shows only the title with no placeholder text.
4. **Given** the board contains long titles, **when** cards render, **then** text wraps without breaking the column layout.

## 4. Technical Notes (optional implementation hints)

Define a reusable TaskCard component with basic typography styles and truncation rules if needed.

## 5. Estimation (story points or days)

**Estimate Type:** DAYS
**Estimate Value:** 1

<!--
6. INVEST Validation Checklist
- I (Independent): Can this story be delivered without tight coupling to another story?
- N (Negotiable): Is it a conversation starter rather than a fixed spec?
- V (Valuable): Does it produce clear value for the user/business?
- E (Estimable): Is scope clear enough to estimate with confidence?
- S (Small): Can it be completed within one iteration/sprint?
- T (Testable): Are acceptance criteria objective and verifiable?

Mark as:
[ ] Independent
[ ] Negotiable
[ ] Valuable
[ ] Estimable
[ ] Small
[ ] Testable
-->
