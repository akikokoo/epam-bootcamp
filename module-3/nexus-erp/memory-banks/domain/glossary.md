# Domain Glossary — NexusERP

Terms specific to this project that AI assistants might misinterpret without explicit definition.

---

## Tenant

**Definition:** A single company (SME) using NexusERP. Each tenant has completely isolated data.

**Context:** NexusERP is multi-tenant — multiple companies share the same application and database
infrastructure, but their data is separated by a `tenant_id` column on every business entity table.
"Tenant" is not a user; it's the company account.

**Business Rule:** Every database query MUST include `WHERE tenant_id = $tenantId`. The repository
layer enforces this — no cross-tenant queries are ever valid.

**Example:** Ayşe's manufacturing company is Tenant A. Mehmet's retail business is Tenant B.
They both log in to NexusERP but can never see each other's data.

---

## Purchase Order (PO)

**Definition:** A formal document from a buyer (the SME) to a supplier requesting goods or services.

**Lifecycle:** `DRAFT → SENT → CONFIRMED → RECEIVED → CLOSED`

| State | Meaning |
|-------|---------|
| DRAFT | Being created; not yet sent to supplier |
| SENT | Transmitted to supplier; awaiting confirmation |
| CONFIRMED | Supplier accepted the order |
| RECEIVED | Goods received via Goods Receipt; stock levels updated automatically |
| CLOSED | Invoice matched, payment recorded |

**Business Rule:** Stock levels do NOT update when a PO is confirmed. They update only when
a Goods Receipt is recorded against the PO (state = RECEIVED).

---

## Sales Order (SO)

**Definition:** A formal record of a customer's request to purchase goods or services from the SME.

**Lifecycle:** `DRAFT → CONFIRMED → SHIPPED → INVOICED → PAID`

**Business Rule:** A customer invoice is generated automatically when a Sales Order transitions
to INVOICED state — no manual invoice creation required.

---

## Goods Receipt

**Definition:** The act of recording that physical goods have arrived and been inspected at the
SME's warehouse. Tied to a Purchase Order.

**Effect:** Recording a Goods Receipt immediately increments the product's `stock_level`
and transitions the PO to RECEIVED state.

---

## Stockout

**Definition:** When a product's stock level drops to zero and orders cannot be fulfilled.

**Context:** NexusERP's primary value proposition includes reducing stockout incidents by ≥60%.
Stockout prevention is enabled via reorder-level alerts (low-stock alerts).

**Reorder Level:** A product-level threshold. When `stock_level ≤ reorder_level`, a low-stock
alert is triggered for the Operations Manager to create a new Purchase Order.

---

## Financial Close

**Definition:** The monthly process of reconciling all financial transactions to produce a
finalized Profit & Loss statement, accounts receivable (AR), and accounts payable (AP) reports.

**Context:** NexusERP targets reducing financial close time from 30–45 days (SME baseline)
to ≤7 days. This is achieved by having all POs, invoices, and transactions already linked
in the system — eliminating manual reconciliation between tools.

**Business Rule:** Financial close cannot be initiated until all Sales Orders in the month
are in INVOICED or PAID state, and all Purchase Orders are in RECEIVED or CLOSED state.

---

## Leave Request

**Definition:** An employee's formal request to take paid/unpaid time off.

**Lifecycle:** `SUBMITTED → MANAGER_REVIEW → HR_REVIEW → APPROVED / REJECTED`

**Business Rule:** A leave request requires TWO approvals: the employee's direct manager
approves first, then HR reviews and gives final approval. Neither can be skipped.

**Effect:** Approved leave automatically deducts from the employee's leave balance
and is used in the monthly Payroll Run calculation.

---

## Payroll Run

**Definition:** The monthly batch process that calculates net pay for all active employees.

**Inputs:** Employee base salary, approved leave deductions, recorded overtime hours, tax rates.

**Process:**
1. System auto-calculates gross pay for each employee
2. Flags anomalies (overtime spikes, below-minimum-wage cases, missing attendance data)
3. HR reviews and resolves flagged cases
4. HR approves the run → pay slips generated and accessible to employees

**Business Rule:** A Payroll Run cannot be finalized if any employee record has unresolved
anomaly flags. Pay slips are immutable after finalization.

---

## Role-Based Access Control (RBAC)

**Definition:** NexusERP has three roles per tenant:

| Role | Permissions |
|------|-------------|
| Owner | All permissions including user management and billing |
| Manager | CRUD on business data; can approve leave and POs |
| Staff | Read-own-data only (e.g., own pay slips, own leave balance) |

**Context:** Role is scoped per tenant. A user can be "Manager" in Company A and "Staff" in
Company B if they have accounts in both tenants.

---

## Spec-First Development

**Definition:** NexusERP's development methodology: no code is written before a Story
with acceptance criteria exists. The hierarchy is: PRD → Epic → Story → Implementation.

**Context:** "Spec-first" is the core discipline of this project. When an AI is asked to
implement a feature, it MUST first check if a corresponding Story exists in `specs/stories/`.
If no Story exists, implementation should not begin.

**Contrast with Vibe Coding:** Vibe coding = write code first, figure out requirements later.
Spec-first = requirements and acceptance criteria first, code second.

---

## Key Business Rules Summary

### Rule: tenantId on Every Query
**Rule:** Every database query must include tenant isolation via `WHERE tenant_id = $tenantId`.
**Rationale:** Multi-tenant security — data leaks between tenants are a critical vulnerability.

### Rule: Zod Validation on Both Sides
**Rule:** All form/API data must be validated using the same Zod schema on both frontend and backend.
**Rationale:** Prevents schema drift between client-side and server-side validation; reduces duplicate bugs.

### Rule: No Implementation Beyond Story Spec
**Rule:** AI and developers must not implement features beyond what is specified in the Story's acceptance criteria.
**Rationale:** Prevents scope creep; keeps the 12-week MVP timeline realistic.

### Rule: Financial Data Integrity via ACID
**Rule:** Any operation that touches multiple financial tables (e.g., payroll finalization + expense posting)
must be wrapped in a single Prisma transaction.
**Rationale:** PostgreSQL ACID guarantees prevent partial writes that would corrupt financial records.

---

## User Personas (from PRD)

| Persona | Role | Primary Module | Key Pain Point |
|---------|------|----------------|----------------|
| Ayşe | Operations Manager | Inventory & Procurement | 2 hrs/day reconciling inventory spreadsheets |
| Mehmet | Finance Director | Financial Management | 5-week financial close process |
| Zeynep | HR & Payroll Admin | HR & Payroll | 3 days/month preparing payroll manually |
| Can | Business Owner / CEO | Analytics Dashboard | No consolidated reporting; relies on partial views |
