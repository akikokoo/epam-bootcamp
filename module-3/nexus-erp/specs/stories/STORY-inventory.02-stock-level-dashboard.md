# Story: STORY-inventory.02 — Real-Time Stock Level Dashboard

## 1. Story ID and Title
**Story ID:** STORY-inventory.02
**Title:** Real-Time Stock Level Dashboard

## 2. User Story
As an **Operations Manager (Ayşe)**, I want a real-time stock level overview for all products
so that I can identify items below reorder threshold without opening any spreadsheet.

## 3. Acceptance Criteria
1. GIVEN I navigate to Inventory > Stock Levels, WHEN the page loads, THEN I see all active products with their current stock quantity, reorder level, and a status indicator: Green (stock > reorder level), Yellow (stock = reorder level), Red (stock < reorder level).
2. GIVEN there are products with Red status, WHEN the page loads, THEN Red-status products are automatically sorted to the top of the list.
3. GIVEN I apply a filter "Show only: Below Reorder Level", THEN only products with Red status are displayed.
4. GIVEN a goods receipt is processed (STORY-inventory.04), WHEN I refresh the Stock Levels page, THEN the updated quantity is reflected within 5 seconds.
5. GIVEN I search by product name or SKU in the search bar, THEN the list filters to matching products in real time (debounced, ≤300ms after last keystroke).

## 4. Technical Notes
- Stock levels are computed from the `StockMovement` table (sum of all movements per product per tenant).
- No caching layer on this data — query directly to ensure real-time accuracy.
- Search is a client-side filter on the already-fetched page data (not a new API call per keystroke) for pages ≤500 items; server-side search for larger catalogs is out of scope for MVP.

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
