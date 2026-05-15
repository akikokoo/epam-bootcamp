# Lab 5: Reusable Sync Prompts (Optional) - Advanced Workflow Automation

| | |
|---|---|
| **Duration** | 30 minutes |
| **Prerequisites** | Labs 3-4 complete (Jira + Confluence sync working) |
| **Difficulty** | ⭐⭐⭐ Advanced |

---

## 🎯 Lab Goal

Learn to **create reusable prompt files** for batch sync operations, status checks, and two-way sync workflows—enabling team-wide workflow automation.

---

## 📚 What You'll Learn

By the end of this lab, you will:

- ✅ Create reusable prompt files for common sync operations
- ✅ Implement batch sync workflows (sync all stories at once)
- ✅ Build status check prompts (detect out-of-date files)
- ✅ Design two-way sync with approval plans
- ✅ Understand prompt file structure and best practices
- ✅ Recognize when to use prompts vs inline commands

---

## 🗺️ Lab Overview

### What You'll Do
1. Create `.github/prompts/` folder structure
2. Build `sync-to-jira.prompt.md` for batch story sync
3. Build `sync-to-confluence.prompt.md` for PRD sync
4. Build `check-sync-status.prompt.md` for out-of-date detection
5. Build `sync-plan.prompt.md` for two-way sync with approval
6. Test prompts with real files

### What You'll Build

**4 Reusable Prompt Files:**
- **sync-to-jira.prompt.md** - Batch sync all stories to Jira
- **sync-to-confluence.prompt.md** - Batch sync all PRDs to Confluence
- **check-sync-status.prompt.md** - Detect out-of-date files
- **sync-plan.prompt.md** - Two-way sync with conflict detection

### Key Concept
Prompt files are **reusable workflow instructions** stored in version control, enabling consistent batch operations across your team.

---

## ✅ Prerequisites Check

Before starting, verify:

- [ ] Labs 3-4 complete (Jira + Confluence sync working)
- [ ] At least 2 markdown files with sync frontmatter exist
- [ ] Atlassian MCP authenticated (no OAuth popup)
- [ ] Understand frontmatter tracking from Labs 3-4

> **⚠️ If any fail:** Complete [Lab 3](lab-03-jira-sync.md) and [Lab 4](lab-04-confluence-sync.md) first

---

## Step 1: Create Prompt Folder Structure

⏱️ **2 minutes**

### 1.1 Create Prompts Directory

Create the folder structure where prompt files will live:

```bash
mkdir -p .github/prompts
cd .github/prompts
```

**Why `.github/prompts/`?**
- ✅ Standard location for GitHub Copilot to auto-detect prompts
- ✅ Easy to find and version control
- ✅ Shareable across team members

---

### 1.2 Understand Prompt File Format

**Prompt files are markdown with:**
- `.prompt.md` extension
- Frontmatter (optional metadata)
- Instructions for AI
- Examples and edge cases

**Basic structure:**
```markdown
---
name: "Prompt Name"
description: "What this prompt does"
---

# Instructions

Your detailed instructions here...

## Examples

Show expected behavior...

## Edge Cases

Handle special scenarios...
```

---

## Step 2: Create Batch Jira Sync Prompt

⏱️ **8 minutes**

### 2.1 Create the File

Create file: `.github/prompts/sync-to-jira.prompt.md`

**Content (copy-paste):**

````markdown
---
name: "sync-to-jira"
description: "Batch sync all markdown stories to Jira with parent-child relationships"
---

# Sync Stories to Jira

## Objective

Sync all markdown story files in `specs/stories/` to Jira project **MCPW** (or specified project).

## Instructions

### 1. Discover Stories

- Find all `.md` files in `specs/stories/` folder
- Read frontmatter to determine sync status

### 2. Analyze Sync State

For each story file:

**If NO `sync.jira` in frontmatter:**
- Action: **CREATE** new Jira issue
- Type: Use `type` field from frontmatter (`story`, `epic`, `task`, `bug`)
- Summary: Use `title` field

**If HAS `sync.jira.issue_key`:**
- Action: **UPDATE** existing Jira issue
- Issue: Use `sync.jira.issue_key` value
- Check: Verify issue still exists in Jira

### 3. Handle Parent-Child Relationships

**If story references an epic:**
- Check frontmatter for `epic` field (e.g., `epic: "EPIC-001"`)
- Look up epic's Jira issue key from `specs/epics/EPIC-001.md` frontmatter
- Set parent link when creating/updating story

### 4. Preview Before Execution

**Show me:**
- List of files to sync
- Action for each (CREATE or UPDATE)
- Parent-child relationships detected
- Total count: X creates, Y updates

**Wait for my confirmation** before proceeding.

### 5. Execute Sync

For each file:
1. Sync to Jira using `@atlassian` MCP
2. Update frontmatter with sync info
3. Report success or failure

### 6. Summary Report

After all syncs complete, show:
- ✅ Successfully synced: [count]
- ❌ Failed: [count] (with reasons)
- 📝 Files updated with sync info: [list]

## Example Frontmatter

**Before sync (no sync info):**

```yaml
---
title: "User Login Form"
type: story
status: draft
epic: "EPIC-001"
---
```

**After sync (CREATE):**
```yaml
---
title: "User Login Form"
type: story
status: draft
epic: "EPIC-001"
sync:
  jira:
    url: "https://yourname-workshop.atlassian.net/browse/MCPW-1"
    issue_key: "MCPW-1"
    synced_at: "2025-12-03T15:00:00Z"
---
```

## Edge Cases

### Epic Not Yet Synced
- If story references epic but epic has no `sync.jira.issue_key`
- Action: Sync epic first, then sync story

### Story Updated in Markdown Only
- If `synced_at` is older than file modification time
- Action: UPDATE existing Jira issue

### Jira Issue Deleted
- If `sync.jira.issue_key` exists but issue not found in Jira
- Action: Warn user, ask if should CREATE new issue or skip

### Conflicting Changes
- If both markdown and Jira were updated since last sync
- Action: Show diff, ask which version to keep

## Configuration

**Default Project:** MCPW
**Story Folder:** specs/stories/
**Epic Folder:** specs/epics/

To change project, specify: "Sync to Jira project [PROJECT_KEY]"

````

**Save the file.**

---

### 2.2 Understand the Prompt Structure

**Key sections in the prompt:**

| Section | Purpose |
|---------|----------|
| **Objective** | Clear goal statement |
| **Instructions** | Step-by-step logic (Discover → Analyze → Handle → Preview → Execute → Report) |
| **Sync State Analysis** | CREATE vs UPDATE decision logic |
| **Parent-Child Handling** | Epic relationship logic |
| **Preview Before Execution** | Human approval gate (safety) |
| **Summary Report** | Batch operation results |
| **Example Frontmatter** | Shows before/after sync state |
| **Edge Cases** | Handles failures and conflicts |

> **Important:** This is NOT executable code—it's instructions for AI to follow.

---

### 2.3 Test the Prompt

Run this command to invoke the prompt:

```
/sync-to-jira sync all my stories
```

**Expected behavior:**
1. AI reads the prompt file
2. Discovers all story files in `specs/stories/`
3. Analyzes sync state (NEW vs needs UPDATE)
4. Shows preview with CREATE/UPDATE actions
5. Waits for your confirmation
6. Executes sync batch after approval
7. Reports success/failure summary

✅ **Success Check:** You see a preview list of files with their sync actions

---

## Step 3: Create Batch Confluence Sync Prompt

⏱️ **6 minutes**

### 3.1 Create the File

**Create file:** `.github/prompts/sync-to-confluence.prompt.md`

**Content (copy-paste):**

````markdown
---
name: "sync-to-confluence"
description: "Batch sync all PRD markdown files to Confluence space"
---

# Sync PRDs to Confluence

## Objective

Sync all Product Requirements Documents (PRDs) in `specs/prds/` to Confluence space **MCPDOCS** (or specified space).

## Instructions

### 1. Discover PRDs

- Find all `.md` files in `specs/prds/` folder
- Verify `type: prd` in frontmatter

### 2. Analyze Sync State

For each PRD file:

**If NO `sync.confluence` in frontmatter:**
- Action: **CREATE** new Confluence page
- Space: Use default space (MCPDOCS) or specified
- Title: Use `title` field from frontmatter
- Parent: None (root-level page)

**If HAS `sync.confluence.page_id`:**
- Action: **UPDATE** existing Confluence page
- Page ID: Use `sync.confluence.page_id` value
- Check: Verify page still exists in Confluence

### 3. Content Conversion

**Markdown → Confluence format:**
- Headers: Convert to Confluence heading styles
- Code blocks: Use Confluence code macro
- Lists: Preserve bullet and numbered lists
- Tables: Convert to Confluence table format
- Links: Preserve URLs and convert relative links

**Note:** Some markdown features may not convert perfectly (e.g., advanced tables, nested blockquotes)

### 4. Cross-Link to Jira Epics

**If PRD has `jira_epic_key` in frontmatter:**
- Add Jira issue link at top of Confluence page
- Format: "Related Jira Epic: [EPIC_KEY](jira_url)"

### 5. Preview Before Execution

**Show me:**
- List of PRD files to sync
- Action for each (CREATE or UPDATE)
- Destination space and titles
- Total count: X creates, Y updates

**Wait for my confirmation** before proceeding.

### 6. Execute Sync

For each PRD:
1. Convert markdown to Confluence format
2. Create or update page using `@atlassian` MCP
3. Update frontmatter with sync info
4. Report success or failure

### 7. Summary Report

After all syncs complete, show:
- ✅ Successfully synced: [count]
- ❌ Failed: [count] (with reasons)
- 📝 PRD URLs: [list with links]
- 🔗 Cross-links added: [count]

## Example Frontmatter

**Before sync (no sync info):**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
jira_epic_key: "MCPW-5"
---
```

**After sync (CREATE):**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
jira_epic_key: "MCPW-5"
sync:
  confluence:
    url: "https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678"
    page_id: "12345678"
    space_key: "MCPDOCS"
    synced_at: "2025-12-03T15:10:00Z"
---
```

## Edge Cases

### Confluence Space Not Found
- If specified space doesn't exist
- Action: List available spaces, ask user to choose

### Page Title Conflict
- If page with same title already exists
- Action: Show existing page, ask if should update or create with different title

### Large PRD Content
- If PRD exceeds Confluence page size limit
- Action: Warn user, suggest splitting into multiple pages

### Formatting Issues
- If markdown doesn't convert cleanly
- Action: Sync content, note formatting differences, suggest manual review

## Configuration

**Default Space:** MCPDOCS
**PRD Folder:** specs/prds/
**Parent Page:** None (root-level)

To change space, specify: "Sync to Confluence space [SPACE_KEY]"
````

**Save the file.**

---

### 3.2 Test the Prompt

Run this command to invoke the prompt:

```
/sync-to-confluence sync all my PRDs
```

**Expected behavior:**
1. Discovers PRD files in `specs/prds/`
2. Shows preview (CREATE/UPDATE with Confluence URLs)
3. Waits for your confirmation
4. Syncs to Confluence space
5. Reports results with clickable URLs

✅ **Success Check:** You see preview with Confluence space and page titles

---

## Step 4: Create Sync Status Checker

⏱️ **7 minutes**

### 4.1 Create the File

**Create file:** `.github/prompts/check-sync-status.prompt.md`

**Content (copy-paste):**

````markdown
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
- API: `@atlassian get issue [issue_key]`

**Confluence Pages:**
- Use `sync.confluence.page_id` to check if page exists
- API: `@atlassian get page [page_id]`

### 4. Detect Conflicts (Optional Deep Check)

**If remote was updated after local `synced_at`:**
- Status: ⚠️ CONFLICT
- Action Needed: Manual merge or choose version

### 5. Generate Report

**Summary Table:**

```
Sync Status Report
Generated: 2025-12-03T15:20:00Z

NEW (never synced):
- specs/stories/STORY-002.md
- specs/prds/PRD-002.md
Total: 2

OUT-OF-DATE (local changes not synced):
- specs/stories/STORY-001.md (modified 2 hours ago, last synced 1 day ago)
Total: 1

UP-TO-DATE:
- specs/epics/EPIC-001.md
- specs/prds/PRD-001.md
Total: 2

ORPHANED (remote deleted):
(none)
Total: 0

CONFLICTS (both local and remote updated):
(none - requires deep check)
Total: 0
```

**Recommended Actions:**
1. Sync 2 NEW files: Run `sync-to-jira.prompt.md` or `sync-to-confluence.prompt.md`
2. Update 1 OUT-OF-DATE file: Re-run sync prompt
3. No orphaned files detected

### 6. Action Prompts

**If NEW files found:**
```
To sync new files, run:
- For Jira: Use sync-to-jira.prompt.md
- For Confluence: Use sync-to-confluence.prompt.md
```

**If OUT-OF-DATE files found:**
```
To update out-of-date files, run:
- Re-run appropriate sync prompt (will auto-detect UPDATE action)
```

**If ORPHANED files found:**
```
To fix orphaned files:
1. Remove sync section from frontmatter, or
2. Re-sync to create new remote issue/page
```

## Edge Cases

### File Modified But Content Unchanged
- Check actual content diff, not just timestamp
- If only whitespace/formatting changed, mark as UP-TO-DATE

### Multiple Sync Targets
- If file synced to both Jira AND Confluence
- Check status for each target separately

### Permission Issues
- If can't access remote due to permissions
- Mark as UNKNOWN status, suggest permission check

## Configuration

**Folders to Scan:**
- specs/stories/ (Jira)
- specs/epics/ (Jira)
- specs/prds/ (Confluence)
- specs/adrs/ (Confluence, optional)

**Deep Conflict Check:** Optional (add `--deep` flag)
````

**Save the file.**

---

### 4.2 Test the Prompt

Run this command to invoke the prompt:

```
/check-sync-status show me what's out of sync
```

**Expected behavior:**
1. Scans all spec folders (`specs/stories/`, `specs/prds/`, etc.)
2. Reads frontmatter and compares file timestamps
3. Categorizes files: NEW | OUT-OF-DATE | UP-TO-DATE | ORPHANED
4. Generates summary report with counts
5. Recommends next actions (which prompts to run)

✅ **Success Check:** You see a categorized report with file counts

---

## Step 5: Create Two-Way Sync Plan Prompt

⏱️ **7 minutes**

### 5.1 Create the File

**Create file:** `.github/prompts/sync-plan.prompt.md`

**Content (copy-paste):**

````markdown
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
- Read file content
- Check last modified timestamp
- Compare to `synced_at` in frontmatter

**Remote State:**
- Fetch current content from Jira/Confluence
- Check remote last updated timestamp
- Compare to `synced_at` in frontmatter

### 3. Determine Sync Direction

**Scenario A: Local Changed, Remote Unchanged**
- Direction: Local → Remote (UPDATE)
- Conflict: No
- Action: Push local changes to remote

**Scenario B: Remote Changed, Local Unchanged**
- Direction: Remote → Local (PULL)
- Conflict: No
- Action: Pull remote changes to local

**Scenario C: Both Changed**
- Direction: Both (CONFLICT)
- Conflict: YES
- Action: Show diff, ask user to resolve

**Scenario D: Neither Changed**
- Direction: None (IN SYNC)
- Conflict: No
- Action: Skip

### 4. Generate Sync Plan

**For each file, show:**

```markdown
## File: specs/stories/STORY-001.md

**Sync Target:** Jira issue MCPW-1
**Last Synced:** 2025-12-01T10:00:00Z

**Local Status:**
- Modified: 2025-12-03T14:00:00Z (2 days after sync)
- Changes:
  * Added AC4: Remember Me Functionality
  * Updated technical notes

**Remote Status:**
- Modified: 2025-12-02T12:00:00Z (1 day after sync)
- Changes:
  * Status changed: To Do → In Progress
  * Assignee set: John Doe

**Conflict Detected:** YES (both changed)

**Proposed Action:**
1. Pull remote status field → local frontmatter (`status: in-progress`)
2. Pull remote assignee → local frontmatter (`assignee: "John Doe"`)
3. Push local AC4 addition → remote description
4. Push local technical notes → remote description

**User Decision Required:**
- Accept proposed merge? (yes/no)
- Or: Choose version (local/remote)
- Or: Skip this file
```

### 5. Handle Conflicts

**For conflicting files:**

**Option 1: Three-way merge**
- Identify common ancestor (last synced version)
- Apply non-conflicting changes from both sides
- Flag truly conflicting sections for user

**Option 2: Manual choice**
- Show local version
- Show remote version
- Ask user: "Which version do you want to keep?"

**Option 3: Skip**
- Leave file unchanged
- Mark as requiring manual resolution

### 6. Preview Full Plan

**Summary:**
```
Sync Plan Summary
─────────────────────────────────────────────
Files Analyzed: 5

IN SYNC (no action needed):
- specs/epics/EPIC-001.md
Total: 1

LOCAL → REMOTE (push changes):
- specs/stories/STORY-002.md
  Action: Push new AC5 to Jira
Total: 1

REMOTE → LOCAL (pull changes):
- specs/prds/PRD-001.md
  Action: Pull status update from Confluence
Total: 1

CONFLICTS (both changed):
- specs/stories/STORY-001.md
  Action: Merge (see details above)
Total: 1

SKIPPED (manual resolution required):
- specs/stories/STORY-003.md
  Reason: Complex merge conflict
Total: 1
─────────────────────────────────────────────

Next Steps:
1. Review conflict resolutions above
2. Confirm plan (type 'approve' to proceed)
3. I'll execute the sync actions
```

### 7. Wait for Approval

**Ask user:**
```
Do you approve this sync plan?
- Type 'approve' to execute
- Type 'skip [filename]' to exclude specific files
- Type 'cancel' to abort
```

### 8. Execute Approved Plan

**For each approved action:**
1. Execute sync (push/pull/merge)
2. Update frontmatter with new `synced_at`
3. Report success or failure

### 9. Final Report

```
Sync Plan Execution Complete
─────────────────────────────────────────────
✅ Successfully synced: 3 files
❌ Failed: 0 files
⏭️ Skipped: 1 file (STORY-003.md - manual resolution)

Updated Files:
- specs/stories/STORY-001.md (merged)
- specs/stories/STORY-002.md (pushed)
- specs/prds/PRD-001.md (pulled)

Skipped Files (require manual review):
- specs/stories/STORY-003.md
  Reason: Complex conflict in acceptance criteria
  Next: Manually merge and re-sync
─────────────────────────────────────────────
```

## Edge Cases

### Remote Deleted Since Last Sync
- If `sync.jira.issue_key` exists but issue deleted
- Action: Warn user, ask if should remove sync info or recreate

### Local Deleted Since Last Sync
- If file exists in Jira/Confluence but not locally
- Action: Ask if should pull back or delete remote

### Frontmatter-Only Changes
- If only `status`, `assignee` fields changed (not description)
- Action: Auto-merge (low risk)

### Description Conflicts
- If both local and remote description changed
- Action: Show diff, require user decision

## Configuration

**Conflict Strategy:** Three-way merge (default)
**Auto-Merge:** Frontmatter fields only
**Require Approval:** Always (safety gate)

````

**Save the file.**

---

### 5.2 Understand Two-Way Sync Complexity

**Why this is advanced:**

| One-Way Sync (Labs 3-4) | Two-Way Sync (Lab 5) |
|--------------------------|----------------------|
| Local = source of truth | Both sides are sources |
| Simple CREATE/UPDATE | Conflict detection needed |
| No conflict handling | Three-way merge required |
| Immediate execution | Approval gate required (safety) |

**Two-way sync requires:**
- ✅ Fetching remote state from Jira/Confluence
- ✅ Comparing timestamps (local vs remote vs last sync)
- ✅ Detecting conflicts (both changed since last sync)
- ✅ Human approval before making changes
- ✅ Merge strategy (which version wins, or combine both)

---

### 5.3 Test the Prompt

Run this command to invoke the prompt:

```
/sync-plan generate a two-way sync plan
```

**Expected behavior:**
1. Scans all files with sync info
2. Fetches remote state from Jira/Confluence
3. Detects changes in both directions (local and remote)
4. Identifies conflicts requiring human decision
5. Shows detailed plan with diffs and proposed actions
6. Waits for your approval
7. Executes approved actions only

✅ **Success Check:** You see a detailed plan with conflict detection

---

## Step 6: When to Use Prompts vs Inline Commands

⏱️ **2 minutes**

## Step 6: When to Use Prompts vs Inline Commands

⏱️ **2 minutes**

### 6.1 Decision Framework

**Use Prompt Files When:**
- ✅ Complex multi-step workflows (batch operations)
- ✅ Repeatable processes (run weekly/daily)
- ✅ Team collaboration (shared workflows)
- ✅ Need consistency (same logic every time)
- ✅ Compliance/audit trail (documented process)

**Use Inline Commands When:**
- ✅ One-off tasks (sync single file)
- ✅ Quick exploration (ad-hoc testing)
- ✅ Context-specific (unique situation)
- ✅ Learning/experimenting (trying new patterns)

---

### 6.2 Decision Matrix

| Scenario | Tool | Why |
|----------|------|-----|
| "Sync all stories every sprint" | **Prompt file** | Repeatable, consistent |
| "Sync this one story I just wrote" | **Inline command** | One-off, fast |
| "Check what's out of sync before standup" | **Prompt file** | Regular process |
| "Quick test: does this sync work?" | **Inline command** | Exploratory |
| "Onboard new team member to sync workflow" | **Prompt file** | Documented process |

---

## 🎉 Lab 5 Complete!

### Key Concepts Review

1. **Prompt Files as Reusable Workflows:**
   - Markdown files with instructions for AI
   - Stored in `.github/prompts/` for version control
   - Invoked by reference (`/prompt-name`), not copy-paste
   - Shareable across team

2. **Batch Operations:**
   - Process multiple files in one command
   - Preview → Approve → Execute pattern (safety)
   - Summary reporting for visibility
   - Efficient for regular operations

3. **Sync State Detection:**
   - **NEW**: No sync frontmatter (never synced)
   - **OUT-OF-DATE**: Modified after `synced_at` timestamp
   - **UP-TO-DATE**: Not modified since sync
   - **ORPHANED**: Has sync info but remote deleted

4. **Two-Way Sync Complexity:**
   - Requires fetching remote state
   - Conflict detection (both local and remote changed)
   - Three-way merge strategy (common ancestor)
   - Human approval gate (safety before changes)

5. **Prompt Design Patterns:**
   - Clear objective statement
   - Step-by-step instructions
   - Edge case handling
   - Example frontmatter (before/after)
   - Preview before execution (approval gate)

---

### Success Checkpoints

**Before considering this lab complete, verify:**

- [ ] Created `.github/prompts/` folder (Step 1)
- [ ] Created `sync-to-jira.prompt.md` (Step 2)
- [ ] Tested Jira batch sync successfully (Step 2)
- [ ] Created `sync-to-confluence.prompt.md` (Step 3)
- [ ] Tested Confluence batch sync successfully (Step 3)
- [ ] Created `check-sync-status.prompt.md` (Step 4)
- [ ] Tested status check successfully (Step 4)
- [ ] Created `sync-plan.prompt.md` (Step 5)
- [ ] Understand two-way sync complexity (Step 5)
- [ ] Tested sync plan generation (Step 5)
- [ ] Understand when to use prompts vs inline commands (Step 6)

✅ **If all checked:** Lab 5 Complete! You've mastered advanced workflow automation with reusable prompts.

---

## 🔧 Troubleshooting

### Issue: Prompt File Not Found

**Symptom:** When you type `/prompt-name` in the chat, no prompt appears in autocomplete

**Fixes:**

1. **Verify file exists and has correct extension:**
   ```bash
   ls -la .github/prompts/
   ```
   Look for `.prompt.md` extension (not just `.md`)

2. **Check current directory:**
   ```bash
   pwd
   ```
   Should be at workspace root

---

### Issue: Prompt Not Executing as Expected

**Symptom:** AI doesn't follow prompt instructions or skips steps

**Fixes:**

1. **Be explicit in command:**
   ```
   Read and follow the instructions in .github/prompts/sync-to-jira.prompt.md
   Then sync all stories in specs/stories/ to Jira project MCPW
   ```

2. **Check prompt file format:**
   - Valid markdown syntax
   - Clear section headers
   - No syntax errors in code blocks

3. **Test with simpler prompt first:**
   - Start with one file sync to verify MCP works
   - Then try batch operation

---

### Issue: Batch Sync Too Slow

**Symptom:** Syncing many files takes too long or times out

**Cause:** Each API call to Jira/Confluence has network latency

**Fixes:**

1. **Reduce batch size:**
   - Sync 5 files at a time instead of all
   - Use file patterns: `sync specs/stories/STORY-00*.md`

2. **Check network connection:**
   - Slow connection increases latency
   - Consider syncing offline, then batch sync later

3. **Use status check first (optimization):**
   - Run `/check-sync-status` to see what actually needs updating
   - Only sync OUT-OF-DATE files, skip UP-TO-DATE ones

---

### Issue: Conflict Detection Not Working

**Symptom:** Two-way sync doesn't detect remote changes

**Cause:** Remote timestamps not being compared or fetched

**Fixes:**

1. **Verify remote access works:**
   ```
   atlassian get issue MCPW-1
   ```
   Should show current issue state with updated timestamp

2. **Check synced_at format in frontmatter:**
   - Should be ISO 8601: `2025-12-03T15:00:00Z`
   - Verify timestamp is UTC (Z suffix)

3. **Explicit conflict check command:**
   ```
   Compare specs/stories/STORY-001.md to Jira issue MCPW-1 
   Show me what's different between local and remote
   ```

---

### Issue: Rate Limiting Errors

**Symptom:** "429 Too Many Requests" error during batch sync

**Cause:** Atlassian API rate limits exceeded

**Fixes:**

1. **Wait before retrying:**
   - Wait 60 seconds before next batch
   - Don't sync repeatedly in quick succession

2. **Reduce batch size:**
   - Sync 3-5 files at a time instead of all
   - Add delays between batches

3. **Check Atlassian status:**
   - Visit https://status.atlassian.com
   - Verify no service disruptions

---

## Reference Materials

### Copy-Paste Commands

**All exact commands for this lab:**

```bash
# Step 1: Create folder
mkdir -p .github/prompts

# Step 2: Test Jira sync
/sync-to-jira sync all my stories

# Step 3: Test Confluence sync
/sync-to-confluence sync all my PRDs

# Step 4: Test status check
/check-sync-status show me what's out of sync

# Step 5: Test sync plan
/sync-plan generate a two-way sync plan
```

---

### Prompt File Locations

**All prompts created in this lab:**

```
.github/prompts/
├── sync-to-jira.prompt.md          (batch Jira sync)
├── sync-to-confluence.prompt.md    (batch Confluence sync)
├── check-sync-status.prompt.md     (out-of-date detection)
└── sync-plan.prompt.md             (two-way sync with approval)
```

---

### Sync State Categories

**Understanding file sync states:**

| State | Description | Frontmatter | File Modified | Remote Exists |
|-------|-------------|-------------|---------------|---------------|
| **NEW** | Never synced | No `sync` section | N/A | No |
| **OUT-OF-DATE** | Local changes not synced | Has `sync` | After `synced_at` | Yes |
| **UP-TO-DATE** | In sync | Has `sync` | Before/same as `synced_at` | Yes |
| **ORPHANED** | Remote deleted | Has `sync` | N/A | No |
| **CONFLICT** | Both changed | Has `sync` | After `synced_at` | Yes (also modified) |

---

## 📚 Additional Resources

### Official Documentation

**GitHub Copilot Prompt Files:**
- [Prompt Files Guide](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Your First Prompt File Tutorial](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file)

---

## 🚀 Optional Advanced Extensions

> **Note:** These extensions are optional and go beyond the core lab. Only attempt after mastering Steps 1-6.

### Extension 1: GitHub Actions Integration

**Goal:** Automatically check sync status on schedule

**Create:** `.github/workflows/sync-check.yml`

```yaml
name: Check Sync Status
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am
  workflow_dispatch:

jobs:
  check-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check sync status
        run: |
          # Run check-sync-status.prompt.md via GitHub Copilot CLI
          # Report results as GitHub issue if out-of-date files found
          echo "Sync status check complete"
```

---

### Extension 2: Custom ADR Sync Prompt

**Goal:** Create domain-specific prompt for Architecture Decision Records

**Create:** `.github/prompts/sync-adrs-to-confluence.prompt.md`

**Key differences from PRD sync:**
- Folder: `specs/adrs/` instead of `specs/prds/`
- Space: `ARCHITECTURE` or dedicated ADR space
- Template: Use Confluence ADR template
- Auto-link: Related PRDs and epics
- Status tracking: Draft → Proposed → Accepted → Deprecated

---