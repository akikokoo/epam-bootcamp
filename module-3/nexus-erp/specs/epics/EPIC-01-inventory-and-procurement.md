# Epic: Inventory & Procurement Management

## 1. Epic Title
EPIC-01 — Inventory & Procurement Management

## 2. Description
Enable operations teams to manage products, track real-time stock levels, and handle the
full purchase order lifecycle from draft to goods receipt. This epic replaces manual
spreadsheet-based inventory tracking and ad-hoc supplier communication with a structured,
auditable workflow that feeds directly into the financial module.

## 3. Primary Persona
Ayşe — Operations Manager

## 4. Success Criteria
1. Operations team can view real-time stock levels for all products without opening any spreadsheet — confirmed by 100% of ops users in a 30-day survey.
2. Purchase orders progressed through at least 3 state transitions (Draft → Sent → Confirmed) by ≥80% of active operations users within 60 days of launch.
3. Stockout incidents reduced by ≥60% within 90 days compared to the 3-month pre-deployment baseline.
4. Average time to create a purchase order ≤5 minutes (measured via session analytics).

## 5. Scope/Complexity
**Estimate:** L
- Entities: Product, Category, Supplier, PurchaseOrder, PurchaseOrderLine, StockMovement
- State machine for PO lifecycle (Draft → Sent → Confirmed → Partially Received → Received → Closed)
- Inventory adjustment logic must remain consistent with financial module (EPIC-03)

## 6. Dependencies
- Multi-tenant auth and RBAC (platform prerequisite)
- PostgreSQL schema and Prisma setup complete
- Supplier entity management (CRUD for supplier records)

## 7. User Stories

| Story ID | Title | Estimate |
|----------|-------|----------|
| STORY-inventory.01 | Product catalog management | 2 days |
| STORY-inventory.02 | Real-time stock level dashboard | 2 days |
| STORY-inventory.03 | Create and submit purchase order | 2 days |
| STORY-inventory.04 | Receive goods and update stock | 1 day |
| STORY-inventory.05 | Low-stock alerts | 1 day |
| STORY-inventory.06 | Supplier management | 1 day |
| STORY-inventory.07 | Stock movement audit history | 1 day |
