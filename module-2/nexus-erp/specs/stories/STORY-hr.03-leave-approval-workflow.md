# Story: STORY-hr.03 — Leave Approval Workflow for Managers and HR

## 1. Story ID and Title
**Story ID:** STORY-hr.03
**Title:** Leave Approval Workflow for Managers and HR

## 2. User Story
As an **HR & Payroll Administrator (Zeynep)** and **Manager**, I want a structured leave approval workflow
so that leave requests are reviewed, approved or rejected, and automatically reflected in leave balances.

## 3. Acceptance Criteria
1. GIVEN an employee submits a leave request (STORY-hr.02), THEN the direct manager receives an in-app notification: "{employee_name} has requested {leave_type} leave from {start_date} to {end_date} ({duration} days). Action required."
2. GIVEN I am the direct manager and I open the pending leave request, WHEN I click "Approve" or "Reject" (rejection requires a mandatory reason text field), THEN the request status changes to `Manager Approved` or `Manager Rejected` respectively, and the HR Admin is notified.
3. GIVEN the manager approves, WHEN the HR Admin clicks "Final Approve", THEN the request status changes to `Approved`, the employee's leave balance is decremented by the approved duration, and the employee receives a notification: "Your leave request has been approved."
4. GIVEN the manager rejects, THEN the request status changes to `Rejected` immediately (no HR final step required), and the employee receives a notification with the rejection reason.
5. GIVEN a leave request has been in `Pending Manager Review` status for more than 48 hours, THEN a reminder notification is sent to the manager and the HR Admin can escalate by approving directly, with the escalation recorded in the audit log.

## 4. Technical Notes
- If an employee has no direct manager assigned, the request goes directly to HR final approval (1-step workflow).
- Leave balance decrement happens only on `Approved` status — not on manager approval stage.
- All status transitions are recorded in the audit log with actor, timestamp, and notes.

## 5. Estimation
**Estimate Type:** DAYS
**Estimate Value:** 2

<!--
INVEST Validation:
[x] Independent
[x] Negotiable
[x] Valuable
[x] Estimable
[x] Small
[x] Testable
-->
