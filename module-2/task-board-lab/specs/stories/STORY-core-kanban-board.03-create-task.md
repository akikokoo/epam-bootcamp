# Story: CORE-KANBAN-03 - Create Task

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-03
**Title:** Create Task

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **to add a new task with a title and optional description** so that **I can capture work items quickly**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** I open the create task UI, **when** I enter a title and submit, **then** a new task appears in the “To Do” column.
2. **Given** I leave the description blank, **when** I submit the form, **then** the task is created with an empty description field.
3. **Given** I attempt to submit without a title, **when** the form validates, **then** the submit action is blocked and an inline error is shown.
4. **Given** a new task is created, **when** the board updates, **then** the operation completes in under 300 ms for a 200-task board.

## 4. Technical Notes (optional implementation hints)

Add a lightweight modal or inline form with validation; assign new tasks a unique id and order value at the top or bottom of the column.

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
