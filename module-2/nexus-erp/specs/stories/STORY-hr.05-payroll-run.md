# Story: STORY-hr.05 — Monthly Payroll Run and Calculation

## 1. Story ID and Title
**Story ID:** STORY-hr.05
**Title:** Monthly Payroll Run and Calculation

## 2. User Story
As an **HR & Payroll Administrator (Zeynep)**, I want to initiate a monthly payroll run that
automatically calculates net pay for each active employee
so that payroll preparation takes hours, not days.

## 3. Acceptance Criteria
1. GIVEN I navigate to HR > Payroll and click "New Payroll Run", WHEN I select the payroll month, THEN the system presents a draft payroll table with one row per active employee: Name, Department, Gross Salary, Leave Deductions (days × daily rate), Overtime Addition (hours × hourly rate — manually entered), Calculated Net Salary.
2. GIVEN the payroll month is calculated, THEN leave deductions use only approved leave days from that month (leave requests with status = `Approved` and dates within the payroll period).
3. GIVEN any employee's calculated gross salary is below the configured minimum wage for that year, THEN that row is highlighted in red with: "⚠️ Below minimum wage ({min_wage} TRY). Correct before finalizing."
4. GIVEN I click "Finalize Payroll", THEN a `PayrollRun` record is created with status `Finalized`, individual `PayrollLine` records are locked (read-only), and the total payroll cost is posted as an expense transaction to the Finance module with category = "Personnel".
5. GIVEN a payroll run is finalized, THEN attempting to create another run for the same month shows: "A finalized payroll run already exists for {month}. Contact a system administrator to make corrections."

## 4. Technical Notes
- Daily rate = Gross Monthly Salary / 30 (simplified; not calendar-day accurate — acceptable for MVP).
- Overtime is entered manually per employee on the payroll draft screen (no timesheet integration in MVP).
- Minimum wage data is updated annually by the system admin; not fetched from an external API.
- Finance module integration (criterion 4): if the expense posting call fails, payroll finalization is rolled back (transactional).

## 5. Estimation
**Estimate Type:** DAYS
**Estimate Value:** 3

<!--
INVEST Validation:
[x] Independent
[x] Negotiable
[x] Valuable
[x] Estimable
[x] Small (3 days — multi-entity calculation with finance integration)
[x] Testable
-->
