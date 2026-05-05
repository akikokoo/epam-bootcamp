# Story: STORY-sales.04 — Auto-Generate Customer Invoice from Sales Order

## 1. Story ID and Title
**Story ID:** STORY-sales.04
**Title:** Auto-Generate Customer Invoice from Sales Order

## 2. User Story
As a **Finance Director (Mehmet)**, I want customer invoices to be automatically generated from shipped
sales orders so that there is no manual re-entry of line items between sales and finance.

## 3. Acceptance Criteria
1. GIVEN a sales order transitions to `Invoiced` status (via STORY-sales.03), THEN a customer invoice is automatically created with: invoice number (format: `INV-YYYYMM-NNNN`), issue date = today, due date = today + customer payment terms (days), line items copied verbatim from the sales order, VAT calculated per line (rate selectable on the SO line, defaulting to 18%).
2. GIVEN the invoice is created, THEN each line shows: Product Name, Quantity, Unit Price, VAT Rate, VAT Amount, Line Total (including VAT).
3. GIVEN I navigate to Finance > Invoices, THEN the new invoice appears with status `Unpaid` and a link to the originating sales order.
4. GIVEN I view the invoice detail page, THEN I can download it as a PDF showing customer details, invoice number, line items, VAT breakdown, and total amount due.
5. GIVEN the customer's payment terms on their record are updated after the invoice is created, THEN the existing invoice due date is NOT retroactively changed — the due date is frozen at creation time.

## 4. Technical Notes
- Invoice number sequence: per month per tenant, independent of SO or PO sequences.
- PDF generation: use a server-side library (e.g., Puppeteer or PDFKit) — no third-party invoice SaaS.
- VAT rates are per line item, not per invoice. An invoice can have mixed VAT rates.

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
