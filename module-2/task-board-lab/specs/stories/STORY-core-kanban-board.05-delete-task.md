# Story: CORE-KANBAN-05 - Delete Task

## 1. Story ID and Title

**Story ID:** CORE-KANBAN-05
**Title:** Delete Task

<!-- Example ID format: US-101 -->

## 2. User Story

As a **Aylin Demir**, I want **to delete a task I no longer need** so that **my board stays clean and relevant**.

<!-- Keep this sentence clear and user-value focused. -->

## 3. Acceptance Criteria (3-5 specific, testable conditions)

1. **Given** a task card, **when** I select delete, **then** the task is removed from its column.
2. **Given** I delete a task, **when** the board updates, **then** remaining tasks keep their relative order.
3. **Given** a board with 200 tasks, **when** I delete a task, **then** the operation completes in under 300 ms.
4. **Given** I initiate delete, **when** a confirmation prompt appears, **then** I can cancel without changes.

## 4. Technical Notes (optional implementation hints)

Use a lightweight confirmation dialog to avoid accidental removal; update in-memory state only (no persistence in this epic).

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
