# Story: STORY-inventory.06 — Supplier Management

## 1. Story ID and Title
**Story ID:** STORY-inventory.06
**Title:** Supplier Management

## 2. User Story
As an **Operations Manager (Ayşe)**, I want to maintain a supplier directory with contact and
payment details so that purchase orders and invoices always reference accurate supplier information.

## 3. Acceptance Criteria
1. GIVEN I navigate to Procurement > Suppliers and click "Add Supplier", WHEN I fill in Name (required), Tax ID (required, 10-digit numeric for Turkish VKN), Contact Name, Contact Email, Contact Phone, Payment Terms (dropdown: Net 30 / Net 60 / Net 90 / Immediate), and click Save, THEN the supplier is created and appears in the supplier list.
2. GIVEN a Tax ID is already registered for another supplier in the same tenant, WHEN I try to save, THEN the form shows: "A supplier with this Tax ID already exists: {existing_supplier_name}."
3. GIVEN I click on a supplier in the list, THEN I see a supplier detail page showing all fields plus a "Purchase Order History" section listing the last 10 POs placed with this supplier (PO number, date, total value, status).
4. GIVEN I edit a supplier's Payment Terms, THEN the updated terms are applied to all NEW purchase orders created after the edit; existing POs retain the terms they were created with.
5. GIVEN I deactivate a supplier, THEN the supplier no longer appears in the purchase order supplier selector, but all historical POs and invoices linked to this supplier remain intact and viewable.

## 4. Technical Notes
- Tax ID validation: 10 digits, numeric only (Turkish VKN format). No external VKN lookup API in MVP.
- Payment Terms on the supplier record is the default for new POs; individual POs can override.

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
