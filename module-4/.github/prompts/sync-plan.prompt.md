---
name: "sync-plan"
description: "Two-way sync plan with conflict detection and human approval"
---

# Generate Sync Plan (Two-Way Sync)

## Objective

Create a detailed sync plan that:
1. Detects changes in both local markdown AND remote (Jira/Confluence)
2. Identifies conflicts requiring human decision
3. Proposes merge strategy
4. Waits for approval before execution

## Instructions

### 1. Discover All Files with Sync Info

**Find files with:**
- `sync.jira` section (Jira-synced files)
- `sync.confluence` section (Confluence-synced files)

### 2. For Each File, Check Both Directions

**Local State:**
- Read file content and last modified timestamp
- Compare to `synced_at` in frontmatter

**Remote State:**
- Fetch current content from Jira/Confluence
- Check remote last updated timestamp

### 3. Determine Sync Direction

**Scenario A: Local Changed, Remote Unchanged**
- Direction: Local → Remote (UPDATE)
- Action: Push local changes to remote

**Scenario B: Remote Changed, Local Unchanged**
- Direction: Remote → Local (PULL)
- Action: Pull remote changes to local

**Scenario C: Both Changed**
- Direction: CONFLICT
- Action: Show diff, ask user to resolve

**Scenario D: Neither Changed**
- Direction: IN SYNC
- Action: Skip

### 4. Generate Sync Plan

For each file show:
- Last synced timestamp
- Local changes (if any)
- Remote changes (if any)
- Conflict status
- Proposed action

### 5. Preview Full Plan

```
Sync Plan Summary
─────────────────────────────────
IN SYNC:          [count] files
LOCAL → REMOTE:   [count] files
REMOTE → LOCAL:   [count] files
CONFLICTS:        [count] files
─────────────────────────────────
```

### 6. Wait for Approval

Ask user:
- Type 'approve' to execute
- Type 'skip [filename]' to exclude specific files
- Type 'cancel' to abort

### 7. Execute Approved Plan

For each approved action:
1. Execute sync (push/pull/merge)
2. Update frontmatter with new `synced_at`
3. Report success or failure

### 8. Final Report

```
Sync Complete
─────────────────────────────────
✅ Synced:  [count]
⏭️ Skipped: [count]
❌ Failed:  [count]
─────────────────────────────────
```

## Edge Cases

### Remote Deleted Since Last Sync
- Warn user, ask if should remove sync info or recreate

### Frontmatter-Only Changes
- Status/assignee field changes: Auto-merge (low risk)

### Description Conflicts
- Both local and remote description changed: Show diff, require user decision

## Configuration

**Conflict Strategy:** Three-way merge (default)
**Auto-Merge:** Frontmatter fields only
**Require Approval:** Always
