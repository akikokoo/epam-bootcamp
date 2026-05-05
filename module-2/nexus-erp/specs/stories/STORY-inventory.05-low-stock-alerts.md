# Story: STORY-inventory.05 — Low-Stock Alerts

## 1. Story ID and Title
**Story ID:** STORY-inventory.05
**Title:** Low-Stock Alerts

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to receive in-app alerts when a product falls below
its reorder level so that I can initiate a purchase order before a stockout occurs.

## 3. Acceptance Criteria
1. GIVEN a product's stock falls below its configured reorder level, THEN within 5 minutes an in-app notification is created for users with Operations Manager role: "⚠️ {product_name} is below reorder level ({current_stock} {unit} remaining, reorder level: {reorder_level})."
2. GIVEN I open the notification, THEN I am navigated to the product detail page showing current stock, reorder level, and a "Create Purchase Order" button pre-filled with the product.
3. GIVEN I click "Create Purchase Order" from the alert, THEN a Draft PO is opened with the product already added as a line item — quantity and supplier fields are empty and must be filled manually.
4. GIVEN a product is already below reorder level when I set the reorder level (e.g., editing the product), THEN an alert is generated immediately (not waiting for the next stock movement).
5. GIVEN I navigate to Inventory > Reorder Alerts, THEN I see a list of all products currently below their reorder level with current stock, reorder level, and a "Create PO" shortcut per row.

## 4. Technical Notes
- Alert generation: triggered by a background job polling every 5 minutes — not real-time event streaming.
- Deduplication: if an alert already exists for a product and is unread, do not create a duplicate. Reset when stock returns above reorder level.

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
