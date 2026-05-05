# Story: CORE-KANBAN-02 - Task Model & In-Memory State

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-02
**Title:** Task Model & In-Memory State

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **tasks to have a consistent data structure in the app state** so that **my board can reliably display and update tasks**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** a task is created, **when** it is stored in state, **then** it includes id, title, optional description, status, and order fields.
2. **Given** the app is running, **when** a task is updated or deleted, **then** the in-memory board state reflects the change immediately without a page reload.
3. **Given** multiple tasks exist in a column, **when** the column renders, **then** tasks are displayed in ascending order value.
4. **Given** the app starts with no tasks, **when** the state initializes, **then** all columns are empty and ready for new tasks.

## 4. Technical Notes (optional implementation hints)

Define TypeScript interfaces for Task and BoardState and manage state with a centralized store or top-level component state.

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
