# Epic: Sales & Customer Management

## 1. Epic Title
EPIC-02 — Sales & Customer Management

## 2. Description
Enable sales teams to manage customer records and handle the full sales order lifecycle from
quote to payment. This epic covers customer directory management, sales order creation and
progression, and automatic customer invoice generation — eliminating manual invoicing via email
and providing a clear view of revenue and outstanding receivables.

## 3. Primary Persona
Can — Business Owner / CEO (monitors revenue); Ayşe — Operations Manager (processes orders)

## 4. Success Criteria
1. 100% of sales orders created in the system (zero orders tracked via email or spreadsheet) within 30 days of launch — confirmed by ops team survey.
2. Customer invoices generated automatically from sales orders with no manual re-entry of line items — verified by comparing invoice line items to their source sales order lines.
3. Average time to create a sales order ≤5 minutes (measured via session analytics).
4. Outstanding AR balance visible in real time on the finance module (EPIC-03) within 5 seconds of a payment being recorded.

## 5. Scope/Complexity
**Estimate:** M
- Entities: Customer, SalesOrder, SalesOrderLine, CustomerInvoice, CustomerInvoiceLine
- State machine for sales order: Draft → Confirmed → Shipped → Invoiced → Paid
- Auto-invoice generation from sales orders (links to EPIC-03 finance module)
- Customer directory with billing address and payment terms

## 6. Dependencies
- Multi-tenant auth and RBAC (platform prerequisite)
- EPIC-01 product catalog must exist — sales order lines reference products and prices
- EPIC-03 (Financial Management) for invoice records and AR tracking

## 7. User Stories

| Story ID | Title | Estimate |
|----------|-------|----------|
| STORY-sales.01 | Customer directory management | 1 day |
| STORY-sales.02 | Create and confirm sales order | 2 days |
| STORY-sales.03 | Sales order lifecycle management | 2 days |
| STORY-sales.04 | Auto-generate customer invoice from sales order | 2 days |
| STORY-sales.05 | Record customer payment and close invoice | 1 day |
| STORY-sales.06 | Sales order history and search | 1 day |
