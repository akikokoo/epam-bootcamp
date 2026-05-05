# Story: STORY-inventory.04 — Receive Goods and Update Stock

## 1. Story ID and Title
**Story ID:** STORY-inventory.04
**Title:** Receive Goods and Update Stock

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to record goods received against a purchase order
so that stock levels are automatically updated and the PO is closed accurately.

## 3. Acceptance Criteria
1. GIVEN a PO is in `Confirmed` status, WHEN I click "Receive Goods" and enter received quantities for each line, THEN a `StockMovement` record of type `receipt` is created for each line item, increasing the product stock by the received quantity.
2. GIVEN I receive a partial shipment (received quantity < ordered quantity for one or more lines), WHEN I save the receipt, THEN the PO status becomes `Partially Received` and the system shows "Remaining: {quantity}" per line.
3. GIVEN all ordered quantities have been received (across one or more receipts), WHEN the last receipt is saved, THEN the PO status automatically changes to `Received`.
4. GIVEN I navigate to Inventory > Stock Levels after receiving goods, THEN the updated stock quantity is reflected within 5 seconds.
5. GIVEN I try to receive a quantity greater than the ordered quantity for a line, THEN the form shows an inline error: "Cannot receive more than ordered ({ordered_qty} {unit}). Create a new PO for additional quantities."

## 4. Technical Notes
- Each receipt creates immutable `StockMovement` records — no editing receipts after save. Corrections are done via a separate manual adjustment story (STORY-inventory.07).
- Receipt date defaults to today but is editable (for backdating purposes).
- Receiving goods does NOT automatically generate a supplier invoice — that is handled in EPIC-02 (STORY-finance.01).

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
