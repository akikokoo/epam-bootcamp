# Story: STORY-inventory.03 — Create and Submit Purchase Order

## 1. Story ID and Title
**Story ID:** STORY-inventory.03
**Title:** Create and Submit Purchase Order

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to create a purchase order and mark it as sent to the supplier
so that procurement is tracked in the system rather than via email threads.

## 3. Acceptance Criteria
1. GIVEN I navigate to Procurement > Purchase Orders and click "New PO", WHEN I select a supplier (from registered suppliers list), add at least one line item (product, quantity, unit price), and click "Save as Draft", THEN a PO is created with status `Draft` and a system-generated PO number (format: `PO-YYYYMM-NNNN`).
2. GIVEN a PO is in `Draft` status, WHEN I click "Send to Supplier", THEN the PO status changes to `Sent` and the action is logged in the PO audit trail with timestamp and user.
3. GIVEN I try to send a PO with zero line items, THEN the "Send to Supplier" button is disabled and a tooltip reads: "Add at least one product line to send this order."
4. GIVEN a PO is in `Sent` status, WHEN I click "Mark as Confirmed", THEN the status changes to `Confirmed`.
5. GIVEN I navigate to the PO list, THEN I can filter by status (All / Draft / Sent / Confirmed / Received / Closed) and the count per status is shown in filter chips.

## 4. Technical Notes
- PO number sequence resets per month per tenant (not global).
- Line item unit price is editable on the PO regardless of any catalog price — PO price is the source of truth for this transaction.
- Total PO value = SUM(quantity × unit_price) for all line items, displayed with currency symbol.

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
