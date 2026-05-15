# Story: STORY-inventory.01 — Product Catalog Management

## 1. Story ID and Title
**Story ID:** STORY-inventory.01
**Title:** Product Catalog Management

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to create, edit, and categorize products in a central catalog
so that all inventory tracking and purchase orders reference a single, consistent product list.

## 3. Acceptance Criteria
1. GIVEN I am logged in with Operations Manager role, WHEN I navigate to Inventory > Products, THEN I see a paginated list of all products with columns: Name, SKU, Category, Unit, Current Stock, Reorder Level, Status (Active/Inactive).
2. GIVEN I click "Add Product", WHEN I fill in Name (required), SKU (required, unique per tenant), Category (required, from dropdown), Unit of Measure (required), Reorder Level (required, integer ≥0), and click Save, THEN the product is created and appears at the top of the product list.
3. GIVEN a SKU already exists in the tenant, WHEN I try to save a new product with the same SKU, THEN the form shows an inline error: "SKU already exists. Each product must have a unique SKU."
4. GIVEN I click Edit on an existing product, WHEN I change the Reorder Level and save, THEN the updated value is immediately reflected in the product list without a page reload.
5. GIVEN I set a product status to Inactive, THEN it no longer appears in purchase order product selectors, but its historical stock movement records remain intact.

## 4. Technical Notes
- SKU uniqueness is enforced at the database level (unique constraint on `sku + tenantId`).
- Categories are tenant-configurable (CRUD for categories is part of this story).
- Unit of Measure options: piece, kg, litre, metre, box, pallet — seeded at tenant creation; user can add custom units.
- No bulk import in this story (CSV import is out of scope for MVP).

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
