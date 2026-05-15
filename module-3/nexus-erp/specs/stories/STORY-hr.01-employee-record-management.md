# Story: STORY-hr.01 — Employee Record Management

## 1. Story ID and Title
**Story ID:** STORY-hr.01
**Title:** Employee Record Management

## 2. User Story
As an **HR & Payroll Administrator (Zeynep)**, I want to create and maintain digital employee records
so that all personnel information is in one place and accessible for payroll and leave management.

## 3. Acceptance Criteria
1. GIVEN I navigate to HR > Employees and click "Add Employee", WHEN I fill in First Name, Last Name, National ID (required, 11-digit Turkish TC), Department, Role/Title, Employment Start Date, Employment Type (Full-time / Part-time / Contract), and Gross Monthly Salary, and click Save, THEN the employee record is created and appears in the employee list.
2. GIVEN a National ID already exists in the same tenant, WHEN I try to save, THEN the form shows: "An employee with this National ID already exists: {existing_employee_name}."
3. GIVEN I navigate to HR > Employees, THEN I see a list with columns: Name, Department, Title, Employment Type, Status (Active/Inactive), Start Date — with a department filter dropdown.
4. GIVEN I click on an employee record, THEN the detail page shows all employment fields plus tabs: Leave History, Payroll History, Emergency Contact.
5. GIVEN I set an employee status to Inactive (with a departure date), THEN the employee no longer appears in leave request selectors or payroll run selections, but all historical records remain intact.

## 4. Technical Notes
- National ID is stored encrypted at rest (AES-256); displayed as `***-***-****` in the UI except to Owner role.
- Gross Monthly Salary is stored encrypted at rest; visible to HR Admin and Owner roles only.
- Departments are configurable by tenant (CRUD in HR Settings, not part of this story — treat as pre-existing lookup data seeded at tenant creation).

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
