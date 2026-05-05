# Epic: Financial Management & Invoicing

## 1. Epic Title
EPIC-03 — Financial Management & Invoicing

## 2. Description
Give finance teams a single source of truth for income, expenses, invoicing, and reporting.
This epic covers supplier invoice management (linked to purchase orders from EPIC-01),
customer invoice management (linked to sales orders from EPIC-02), expense categorization,
and automated generation of the monthly Profit & Loss statement and AR/AP aging reports.
It directly targets reducing the 30–45 day financial close cycle to ≤7 days.

## 3. Primary Persona
Mehmet — Finance Director

## 4. Success Criteria
1. Monthly financial close time reduced from 30–45 days to ≤7 days within 2 months of going live (measured by self-reported close date each month).
2. 100% of purchase orders and sales orders automatically generate linked invoices — no manual re-entry of line items.
3. AR aging report generated in ≤10 seconds for any date range within the last 24 months.
4. P&L statement available for any calendar month within 5 seconds of request.

## 5. Scope/Complexity
**Estimate:** L
- Entities: SupplierInvoice, SupplierInvoiceLine, ExpenseTransaction, PaymentRecord, ExchangeRate
- Auto-generation logic linking POs → supplier invoices; SOs → customer invoices (from EPIC-02)
- Multi-currency support with manually configured exchange rates
- P&L calculation engine spanning income and expense transactions
- Turkish KDV VAT rates: 1%, 8%, 18%, 20% — pre-seeded, selectable per line item

## 6. Dependencies
- EPIC-01 (Inventory & Procurement) — purchase orders are the source of supplier invoices
- EPIC-02 (Sales) — sales orders are the source of customer invoices
- Chart of Accounts pre-seeded with standard SME categories at tenant creation

## 7. User Stories

| Story ID | Title | Estimate |
|----------|-------|----------|
| STORY-finance.01 | Auto-generate supplier invoice from purchase order | 2 days |
| STORY-finance.02 | Record and categorize expense transactions | 2 days |
| STORY-finance.03 | Mark supplier invoice as paid | 1 day |
| STORY-finance.04 | Profit & Loss report generation | 3 days |
| STORY-finance.05 | AR and AP aging reports | 2 days |
| STORY-finance.06 | Multi-currency transaction support | 2 days |
