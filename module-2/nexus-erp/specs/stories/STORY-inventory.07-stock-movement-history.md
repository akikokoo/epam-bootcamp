# Story: STORY-inventory.07 — Stock Movement Audit History

## 1. Story ID and Title
**Story ID:** STORY-inventory.07
**Title:** Stock Movement Audit History

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to see a full audit trail of stock movements for any product
so that I can trace discrepancies and verify inventory accuracy.

## 3. Acceptance Criteria
1. GIVEN I navigate to a product's detail page, WHEN I click the "Stock History" tab, THEN I see a chronological list of all stock movements with: Date, Movement Type (receipt / sale / manual_adjustment / initial_stock), Reference (PO number, SO number, or "Manual"), Quantity Change (+/-), and Running Balance.
2. GIVEN there are more than 50 movements, THEN the list is paginated (50 per page) with a "Load more" button.
3. GIVEN I need to correct an error (e.g., a wrong receipt quantity), WHEN I click "Add Manual Adjustment", fill in quantity (positive or negative integer), reason (required text field), and save, THEN a new `StockMovement` of type `manual_adjustment` is added — the original record is never edited.
4. GIVEN a manual adjustment is saved, THEN an audit log entry records: adjusted by (user), adjusted at (timestamp), reason, and quantity change.
5. GIVEN I filter the movement history by date range, THEN only movements within the selected range are shown and the running balance recalculates accordingly.

## 4. Technical Notes
- `StockMovement` records are immutable after creation — corrections are new records, not edits.
- Running balance is computed from the earliest movement to the selected date range end — not stored as a field.
- Manual adjustments require Manager or Owner role; Staff role can view but not create adjustments.

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
