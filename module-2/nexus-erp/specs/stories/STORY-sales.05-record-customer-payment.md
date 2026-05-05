# Story: STORY-sales.05 — Record Customer Payment and Close Invoice

## 1. Story ID and Title
**Story ID:** STORY-sales.05
**Title:** Record Customer Payment and Close Invoice

## 2. User Story
As a **Finance Director (Mehmet)**, I want to record incoming customer payments against invoices
so that AR balances are always current and paid invoices are closed automatically.

## 3. Acceptance Criteria
1. GIVEN I navigate to a customer invoice with status `Unpaid`, WHEN I click "Record Payment", fill in payment date, amount, and payment method (Bank Transfer / Cash / Credit Card), and click Save, THEN a payment record is created and the invoice remaining balance is updated.
2. GIVEN the recorded payment amount equals the invoice total, THEN the invoice status changes to `Paid` and the linked sales order status changes to `Paid`.
3. GIVEN the recorded payment amount is less than the invoice total (partial payment), THEN the invoice status changes to `Partially Paid` and the remaining balance is shown on the invoice.
4. GIVEN I try to record a payment amount greater than the invoice total, THEN the form shows: "Payment amount ({entered}) exceeds invoice balance ({balance}). Enter the correct amount or contact finance to handle the overpayment."
5. GIVEN I navigate to Finance > AR Aging, THEN all `Unpaid` and `Partially Paid` invoices appear with their remaining balances and days overdue.

## 4. Technical Notes
- Multiple payment records per invoice are allowed (for partial payments over time).
- Payment records are immutable after save — corrections require voiding the payment record (Owner role only) and re-entering.

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
