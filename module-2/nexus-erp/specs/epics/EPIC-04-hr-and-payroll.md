# Epic: HR & Payroll Management

## 1. Epic Title
EPIC-04 — HR & Payroll Management

## 2. Description
Centralize employee records, digitize the leave request and approval workflow, and automate
monthly payroll calculations. This epic eliminates paper-based HR processes and manual payroll
spreadsheets, giving HR administrators a structured, auditable system and employees a self-service
portal for leave requests and pay slip access.

## 3. Primary Persona
Zeynep — HR & Payroll Administrator

## 4. Success Criteria
1. Monthly payroll preparation time reduced from 3-day baseline to ≤4 hours (self-reported by Zeynep after 2 full payroll cycles).
2. 100% of leave requests submitted digitally within 30 days of launch — zero paper or email requests.
3. Leave approval workflow completed within 48 hours for ≥90% of requests (submission timestamp to final decision).
4. Payroll calculation discrepancy rate ≤2% of total payroll line items per month (manual corrections needed after system calculation).

## 5. Scope/Complexity
**Estimate:** M
- Entities: Employee, Department, LeavePolicy, LeaveRequest, PayrollRun, PayrollLine
- Leave approval workflow: Employee → Direct Manager → HR Admin (configurable; 1-step if no manager assigned)
- Payroll calculation: base salary + overtime (manual input) + leave deductions
- Turkish labor law: minimum wage check per payroll run; Turkish public holiday calendar seeded at setup
- Self-service: employees can view own records, submit leave, download pay slips

## 6. Dependencies
- Multi-tenant auth and RBAC — employees need individual logins
- Department and manager hierarchy defined before leave routing works
- Turkish public holiday calendar seeded at tenant creation
- EPIC-03 (Financial Management) — finalized payroll posts as an expense transaction

## 7. User Stories

| Story ID | Title | Estimate |
|----------|-------|----------|
| STORY-hr.01 | Employee record management | 2 days |
| STORY-hr.02 | Leave request submission | 1 day |
| STORY-hr.03 | Leave approval workflow | 2 days |
| STORY-hr.04 | Leave balance tracking and calendar | 2 days |
| STORY-hr.05 | Monthly payroll run and calculation | 3 days |
| STORY-hr.06 | Pay slip generation and employee access | 1 day |
| STORY-hr.07 | Payroll anomaly flagging | 1 day |
