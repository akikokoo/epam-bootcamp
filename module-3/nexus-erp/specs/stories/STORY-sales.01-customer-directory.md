# Story: STORY-sales.01 — Customer Directory Management

## 1. Story ID and Title
**Story ID:** STORY-sales.01
**Title:** Customer Directory Management

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to create and maintain a customer directory with contact and
billing details so that all sales orders and invoices reference consistent, up-to-date customer records.

## 3. Acceptance Criteria
1. GIVEN I navigate to Sales > Customers and click "Add Customer", WHEN I fill in Company Name (required), Tax ID (required, 10-digit Turkish VKN), Contact Name, Contact Email, Contact Phone, Billing Address, and Payment Terms (dropdown: Net 30 / Net 60 / Net 90 / Immediate), and click Save, THEN the customer is created and appears in the customer list.
2. GIVEN a Tax ID already exists in the same tenant, WHEN I try to save, THEN the form shows: "A customer with this Tax ID already exists: {existing_customer_name}."
3. GIVEN I navigate to Sales > Customers, THEN I see a list with columns: Company Name, Contact Name, Contact Email, Payment Terms, Status (Active/Inactive), and a search bar that filters by company name or Tax ID in real time.
4. GIVEN I click on a customer record, THEN a detail page shows all fields plus a "Sales Order History" tab listing the last 10 sales orders for this customer (SO number, date, total value, status).
5. GIVEN I deactivate a customer, THEN the customer no longer appears in sales order customer selectors, but all historical records remain intact.

## 4. Technical Notes
- Tax ID validation: 10 digits, numeric only (Turkish VKN). No external VKN lookup in MVP.
- Payment Terms on the customer record is the default for new sales orders; individual orders can override.

## 5. Estimation
**Estimate Type:** DAYS
**Estimate Value:** 1

<!--
INVEST Validation:
[x] Independent
[x] Negotiable
[x] Valuable
[x] Estimable
[x] Small
[x] Testable
-->
