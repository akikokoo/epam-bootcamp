# Story: STORY-dashboard.01 — Executive KPI Overview Page

## 1. Story ID and Title
**Story ID:** STORY-dashboard.01
**Title:** Executive KPI Overview Page

## 2. User Story
As a **Business Owner (Can)**, I want a single-page dashboard showing key business KPIs from all modules
so that I can assess company health in under 30 seconds without opening multiple reports.

## 3. Acceptance Criteria
1. GIVEN I log in with Owner role and navigate to Dashboard, THEN I see the following KPI cards, each showing the current period value and a trend indicator (↑/↓/→) vs the same period last year: Monthly Revenue, Monthly Expenses, Gross Margin %, Total Inventory Value, Open AR, Open AP, Active Headcount, Open Leave Requests.
2. GIVEN I select "This Month" in the date range selector, THEN all KPI values update to reflect the current calendar month's data within 2 seconds.
3. GIVEN a KPI value crosses a configured alert threshold (STORY-dashboard.05), THEN the KPI card background changes to amber and a tooltip shows: "This metric has crossed your alert threshold."
4. GIVEN any source module has no data yet (fresh tenant), THEN the corresponding KPI card shows "No data yet" — not zero or an error.
5. GIVEN the page is opened on a mobile browser (viewport ≤768px), THEN KPI cards stack in a single column with no horizontal scrolling.

## 4. Technical Notes
- KPI values computed on-demand via `GET /api/analytics/kpis?period=this_month` — no caching in MVP.
- Trend indicator compares current period vs same period in the previous year (not month-over-month).
- All 8 KPI cards are loaded in a single API call to avoid waterfall requests.

## 5. Estimation
**Estimate Type:** DAYS
**Estimate Value:** 3

<!--
INVEST Validation:
[x] Independent
[x] Negotiable
[x] Valuable
[x] Estimable
[x] Small
[x] Testable
-->
