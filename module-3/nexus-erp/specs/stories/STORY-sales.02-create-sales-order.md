# Story: STORY-sales.02 — Create and Confirm Sales Order

## 1. Story ID and Title
**Story ID:** STORY-sales.02
**Title:** Create and Confirm Sales Order

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to create a sales order and confirm it with the customer
so that all sales are tracked in the system from the moment of agreement.

## 3. Acceptance Criteria
1. GIVEN I navigate to Sales > Orders and click "New Order", WHEN I select a customer, add at least one line item (product from catalog, quantity, unit price), and click "Save as Draft", THEN a sales order is created with status `Draft` and a system-generated SO number (format: `SO-YYYYMM-NNNN`).
2. GIVEN a Sales Order is in `Draft` status, WHEN I click "Confirm Order", THEN the status changes to `Confirmed` and the action is logged in the audit trail with timestamp and user.
3. GIVEN I try to confirm an order with zero line items, THEN the "Confirm Order" button is disabled and a tooltip reads: "Add at least one product line to confirm this order."
4. GIVEN a product on a sales order line has insufficient stock (current stock < ordered quantity), THEN the line item row is highlighted in amber with a warning: "⚠️ Insufficient stock ({available} {unit} available)." — the order can still be saved and confirmed; the warning is informational only.
5. GIVEN I navigate to the SO list, THEN I can filter by status (All / Draft / Confirmed / Shipped / Invoiced / Paid) with the count per status shown in filter chips.

## 4. Technical Notes
- SO number sequence: per month per tenant, same pattern as PO numbers.
- Unit price on the SO line is fully editable — the catalog price is pre-filled as a default but can be overridden.
- Total SO value = SUM(quantity × unit_price) for all lines; displayed with currency symbol.

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
