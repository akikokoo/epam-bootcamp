# Story: STORY-sales.03 — Sales Order Lifecycle Management

## 1. Story ID and Title
**Story ID:** STORY-sales.03
**Title:** Sales Order Lifecycle Management

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to progress a confirmed sales order through shipping and
invoicing stages so that fulfillment status is always visible without asking anyone.

## 3. Acceptance Criteria
1. GIVEN a sales order is in `Confirmed` status, WHEN I click "Mark as Shipped" and enter a shipment date, THEN the status changes to `Shipped`, the action is logged in the audit trail, and stock is decremented for each line item by the ordered quantity.
2. GIVEN I try to mark an order as shipped without entering a shipment date, THEN the "Mark as Shipped" button remains disabled until a date is entered.
3. GIVEN a sales order is in `Shipped` status, WHEN I click "Generate Invoice", THEN the status changes to `Invoiced` and a customer invoice is automatically created (per STORY-sales.04).
4. GIVEN a sales order is in `Invoiced` status, WHEN the invoice is marked as paid (STORY-sales.05), THEN the sales order status automatically changes to `Paid`.
5. GIVEN a sales order is in `Draft` status, WHEN I click "Cancel", THEN the status changes to `Cancelled` and no stock movements are created. Cancellation of orders in any other status requires Owner-role confirmation.

## 4. Technical Notes
- Stock decrement on shipment: creates a `StockMovement` record of type `sale` per line item. If stock goes negative (due to the insufficient stock warning being ignored), allow it — do not block shipment.
- State transitions are one-way (no going back): Draft → Confirmed → Shipped → Invoiced → Paid.
- Cancelled is a terminal state reachable only from Draft.

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
