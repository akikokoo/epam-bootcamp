# Epic: Analytics & Executive Dashboard

## 1. Epic Title
EPIC-05 — Analytics & Executive Dashboard

## 2. Description
Provide business owners and managers with a unified, real-time view of company health across
all modules (inventory, finance, HR). The dashboard consolidates KPI cards and trend charts
that would otherwise require opening multiple separate reports, enabling executives to assess
business status in under 30 seconds.

## 3. Primary Persona
Can — Business Owner / CEO

## 4. Success Criteria
1. ≥80% of users with Owner/Manager roles visit the dashboard at least 3 times per week within 60 days (measured via session analytics).
2. All KPI values reflect data no older than 5 minutes.
3. Time to answer "How did we perform last month?" reduced from >1 hour (gathering data manually) to <30 seconds — verified via user testing sessions.
4. Dashboard is fully functional on mobile browsers (viewport ≤768px) — no horizontal scrolling, all KPIs readable.

## 5. Scope/Complexity
**Estimate:** M
- KPI widgets: revenue, expenses, gross margin %, inventory value, open AR, open AP, active headcount, open leave requests
- Chart types: line (trends), bar (comparisons)
- Date range selector: this week, this month, last month, custom range
- Mobile-responsive layout (no separate mobile app — browser only)
- Configurable KPI alert thresholds (amber highlight when crossed)

## 6. Dependencies
- EPIC-01 (Inventory) — inventory KPIs
- EPIC-03 (Finance) — revenue, expenses, AR/AP KPIs
- EPIC-04 (HR) — headcount, leave KPIs
- EPIC-02 (Sales) — revenue figures
- All above epics must have at least seed/demo data for the dashboard to be meaningful

## 7. User Stories

| Story ID | Title | Estimate |
|----------|-------|----------|
| STORY-dashboard.01 | Executive KPI overview page | 3 days |
| STORY-dashboard.02 | Revenue and expense trend charts | 2 days |
| STORY-dashboard.03 | Inventory health widgets | 1 day |
| STORY-dashboard.04 | Date range filtering across all widgets | 1 day |
| STORY-dashboard.05 | KPI threshold alert configuration | 1 day |
| STORY-dashboard.06 | HR headcount and leave summary widget | 1 day |
