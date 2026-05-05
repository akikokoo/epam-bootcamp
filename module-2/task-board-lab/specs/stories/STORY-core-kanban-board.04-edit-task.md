# Story: CORE-KANBAN-04 - Edit Task

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-04
**Title:** Edit Task

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **to edit an existing task’s title or description** so that **I can keep task details accurate**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** a task card, **when** I open the edit action, **then** I can modify the title and description fields.
2. **Given** I save changes, **when** the task updates, **then** the updated values appear immediately on the board.
3. **Given** I attempt to save with an empty title, **when** validation runs, **then** the save is blocked and an error is displayed.
4. **Given** I cancel the edit, **when** the form closes, **then** no changes are applied to the task.

## 4. Technical Notes (optional implementation hints)

Reuse the create task form for editing and prefill fields with existing task data.

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
