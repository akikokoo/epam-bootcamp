# Story: CORE-KANBAN-01 - Three-Column Board Layout

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-01
**Title:** Three-Column Board Layout

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **to see a three-column board (To Do, In Progress, Done)** so that **I can quickly understand the structure of my workflow**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** the app loads, **when** the board renders, **then** exactly three columns labeled “To Do”, “In Progress”, and “Done” are visible.
2. **Given** an empty board, **when** no tasks exist, **then** each column shows an empty-state message (e.g., “No tasks yet”).
3. **Given** up to 200 tasks across columns, **when** the board renders, **then** the initial render completes in under 1 second on a mid-range laptop.
4. **Given** the board is displayed, **when** the user resizes the window, **then** columns remain visible without horizontal overflow on standard laptop widths (≥1280px).

## 4. Technical Notes (optional implementation hints)

Use a shared board layout component with three column components and a responsive grid layout.

## 5. Estimation (story points or days)

**Estimate Type:** DAYS
**Estimate Value:** 2

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
