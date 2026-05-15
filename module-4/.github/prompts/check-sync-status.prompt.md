---
name: "check-sync-status"
description: "Detect out-of-date files and sync conflicts"
---

# Check Sync Status

## Objective

Analyze all markdown files with sync frontmatter and detect:
- Files modified since last sync (out-of-date)
- Files synced but remote deleted (orphaned)
- Files never synced (new)

## Instructions

### 1. Discover All Spec Files

**Scan folders:**
- `specs/stories/` - Jira stories
- `specs/epics/` - Jira epics
- `specs/prds/` - Confluence PRDs
- `specs/adrs/` - Confluence ADRs (if exists)

### 2. Categorize Each File

**Category A: Never Synced (NEW)**
- Condition: No `sync` section in frontmatter
- Status: 🆕 NEW
- Action Needed: Sync to Jira/Confluence

**Category B: Out-of-Date (MODIFIED)**
- Condition: File modified after `synced_at` timestamp
- Status: ⚠️ OUT-OF-DATE
- Action Needed: Update remote (Jira/Confluence)

**Category C: Synced and Current**
- Condition: File not modified since `synced_at`
- Status: ✅ UP-TO-DATE
- Action Needed: None

**Category D: Orphaned (REMOTE DELETED)**
- Condition: Has `sync` info but remote issue/page deleted
- Status: ❌ ORPHANED
- Action Needed: Remove sync info or recreate remote

### 3. Check Remote Status

For files with sync info:

**Jira Issues:**
- Use `sync.jira.issue_key` to check if issue exists

**Confluence Pages:**
- Use `sync.confluence.page_id` to check if page exists

### 4. Generate Report

```
Sync Status Report
Generated: [timestamp]

NEW (never synced):        [list]
OUT-OF-DATE (not synced):  [list with time delta]
UP-TO-DATE:                [list]
ORPHANED (remote deleted): [list]
```

**Recommended Actions:**
1. Sync NEW files: Run sync-to-jira or sync-to-confluence prompt
2. Update OUT-OF-DATE files: Re-run sync prompt
3. Fix ORPHANED files: Remove sync section or recreate remote

## Configuration

**Folders to Scan:**
- specs/stories/ (Jira)
- specs/epics/ (Jira)
- specs/prds/ (Confluence)
- specs/adrs/ (Confluence, optional)
