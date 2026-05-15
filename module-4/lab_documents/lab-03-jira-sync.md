# Lab 3: Jira Account & MCP Setup - Sync Your First Story

| | |
|---|---|
| **Duration** | 20 minutes |
| **Prerequisites** | Lab 0 complete (Atlassian MCP configured, OAuth done) |
| **Difficulty** | ⭐⭐ Medium |

---

## 🎯 Lab Goal

Learn to **sync markdown stories to Jira issues** using MCP, and understand the CREATE vs UPDATE sync patterns.

---

## 📚 What You'll Learn

By the end of this lab, you will:

- ✅ Sync markdown stories to Jira issues via MCP
- ✅ Understand frontmatter as a sync state tracker
- ✅ Verify sync in Jira UI
- ✅ Recognize CREATE vs UPDATE sync patterns
- ✅ Handle parent-child relationships (Epic → Story)

---

## 🗺️ Lab Overview

### What You'll Do
1. Verify Atlassian account and OAuth (from Lab 0)
2. Create a test story in markdown
3. Sync story to Jira (CREATE)
4. Update story and re-sync (UPDATE)
5. Understand frontmatter tracking

### Key Concept
Markdown files act as the **source of truth**, while Jira mirrors their content.

---

## ✅ Prerequisites Check

Before starting, verify:

- [ ] Atlassian sandbox account created (from Lab 0)
- [ ] Jira project exists (e.g., MCPW)
- [ ] Atlassian MCP configured
- [ ] Test command works: `List my Jira projects`
- [ ] OAuth completed (no popup when running Atlassian commands)

> **⚠️ If any fail:** See [Lab 0 - Step 4](lab-00-pre-lab-setup.md#step-4-atlassian-mcp-setup-10-minutes)

---

## Step 1: Create Test Story File

⏱️ **3 minutes**

### 1.1 Create Folder Structure

Run the following commands to create the necessary folders:

```bash
mkdir -p specs/stories
cd specs/stories
```

or create the folders manually.

---

### 1.2 Create Story File

Create a file named `specs/stories/STORY-001.md` with the following content:

```markdown
---
title: "User Login Form"
type: story
status: draft
---

# STORY-001: User Login Form

## Description
As a user, I want to log in with my email and password so that I can access my account.

## Acceptance Criteria

### AC1: Display Login Form
- Given I am on the login page
- When the page loads
- Then I see email and password fields with a "Login" button

### AC2: Validate Credentials
- Given I enter valid credentials
- When I click "Login"
- Then I am redirected to the dashboard

### AC3: Show Error on Invalid Credentials
- Given I enter invalid credentials
- When I click "Login"
- Then I see "Invalid email or password" error message

## Technical Notes
- Use bcrypt for password hashing
- Implement rate limiting (5 attempts per minute)
- Store session in HTTP-only cookies
```

---

### 1.3 Understand the Frontmatter

**Current frontmatter:**

```yaml
---
title: "User Login Form"
type: story
status: draft
---
```

**What each field means:**
- `title`: Story title (used in Jira)
- `type`: Issue type (`story`, `epic`, `task`, `bug`)
- `status`: Current status (`draft`, `ready`, `in-progress`, etc.)

---

## Step 2: Sync to Jira (CREATE)

⏱️ **7 minutes**

### 2.1 Preview Sync

Run the following prompt (replace `MCPW` with your project key):

```
Create a story based on specs/stories/STORY-001.md in Jira project MCPW.

Show me what you'll create first, then wait for my confirmation before creating the ticket.

As the final step, update frontmatter in the md file with sync info: sync.jira.url, sync.jira.issue_key, sync.jira.synced_at
```

---

### 2.2 Confirm and Create

When prompted, type `yes` to confirm.

**Expected Response:**

```
Creating Jira issue...

✅ Jira issue created successfully!

Issue Key: MCPW-1
URL: https://yourname-workshop.atlassian.net/browse/MCPW-1
Summary: User Login Form
Type: Story
Status: To Do

Updating frontmatter in STORY-001.md...
✅ Frontmatter updated with sync info
```

---

### 2.3 Verify File Updated

Open `specs/stories/STORY-001.md` and check the updated frontmatter:

```yaml
---
title: "User Login Form"
type: story
status: draft
sync:
  jira:
    url: "https://yourname-workshop.atlassian.net/browse/MCPW-1"
    issue_key: "MCPW-1"
    synced_at: "2025-12-03T14:30:00Z"
---
```

**New fields explained:**
- `sync.jira.url`: Direct link to Jira issue
- `sync.jira.issue_key`: Jira issue identifier
- `sync.jira.synced_at`: ISO timestamp of last sync

---

### 2.4 Verify in Jira UI

1. Copy `sync.jira.url` from the frontmatter.
2. Paste it into your browser.
3. Verify the issue details in Jira:
   - Issue type: Story
   - Summary: User Login Form
   - Description: Your markdown content (converted to Jira format)
   - All 3 acceptance criteria
   - Technical notes

✅ **If visible in Jira:** Sync successful!

---

## Step 3: Update and Re-Sync (UPDATE)

⏱️ **5 minutes**

### 3.1 Make Changes to Story

Edit `specs/stories/STORY-001.md` to add a new acceptance criterion:

```markdown
### AC4: Remember Me Functionality
- Given I check "Remember me" checkbox
- When I log in successfully
- Then my session persists for 30 days
```

Save the file.

---

### 3.2 Re-Sync (UPDATE)

Run the following prompt:

```
Sync specs/stories/STORY-001.md to Jira - update the existing issue.

Then update sync info in the md file accordingly.
```

**Expected Response:**

```
Updating Jira issue MCPW-1...

✅ Jira issue updated successfully!

Issue Key: MCPW-1 (same)
URL: https://yourname-workshop.atlassian.net/browse/MCPW-1
Changes applied:
- Description updated (added AC4)
- Last updated: 2026-02-13T14:35:00Z

Frontmatter synced_at updated.
```

---

### 3.3 Verify Update in Jira

Refresh the Jira issue page and verify:
- All 4 acceptance criteria (including new AC4)
- Updated timestamp

✅ **If AC4 visible:** Update successful!

---

## Step 4: Understand Sync Logic

⏱️ **3 minutes**

### 4.1 CREATE vs UPDATE Decision

| Condition | Action |
|-----------|--------|
| **No `sync.jira` in frontmatter** | CREATE new issue |
| **Has `sync.jira.issue_key`** | UPDATE existing issue |
| **Has `sync.jira` but issue deleted in Jira** | ERROR (manual fix needed) |

---

### 4.2 Frontmatter as State Tracker

**Frontmatter tracks sync relationship:**

```yaml
sync:
  jira:
    url: "..."           # Link to issue
    issue_key: "..."     # Unique identifier
    synced_at: "..."     # Last sync timestamp
```

This allows:
- ✅ Detecting whether to CREATE or UPDATE
- ✅ Linking back to Jira issue
- ✅ Tracking when file was last synced
- ✅ Later: Detecting out-of-date files (Lab 5)

---

### 4.3 Sync is One-Way (Local → Jira)

Markdown file = **source of truth**

- Changes in markdown → sync → **reflected in Jira**
- Changes in Jira → NOT automatically pulled back to markdown (manual process or Lab 5 two-way sync)

---

## 🎉 Lab 3 Complete!

### Key Concepts Review

1. **Local Files as Source of Truth:**
   - Markdown files = authoritative content
   - Jira = mirror/view of that content
   - Changes start in markdown, sync to Jira

2. **Frontmatter Tracking:**
   - `sync` section added after first sync
   - Tracks relationship to Jira issue
   - Enables CREATE vs UPDATE detection

3. **Sync Workflow:**
   - CREATE: No sync.jira → new Jira issue
   - UPDATE: Has sync.jira.issue_key → update existing issue
   - One-way: Local → Jira (this lab)

4. **Verification:**
   - Always check Jira UI after sync
   - Confirm frontmatter updated
   - Verify content matches

---

### Success Checkpoints

**Before moving to Lab 4, verify:**

- [ ] Created STORY-001.md file (Step 1)
- [ ] Synced to Jira (CREATE) (Step 2)
- [ ] Frontmatter updated with sync info (Step 2)
- [ ] Verified issue in Jira UI (Step 2)
- [ ] Updated story with AC4 (Step 3)
- [ ] Re-synced (UPDATE) (Step 3)
- [ ] Verified update in Jira (Step 3)
- [ ] Understand CREATE vs UPDATE logic (Step 4)

✅ **If all checked:** Proceed to [Lab 4](lab-04-confluence-sync.md)

---

## Troubleshooting

### Issue: OAuth Popup Appears

**Symptom:** Browser opens asking to authorize Atlassian access

**Fix:**
1. Complete OAuth flow (sign in, grant permissions)
2. Return to VS Code/CLI
3. Retry the sync command

---

### Issue: "Project Not Found"

**Symptom:** Error: "Project MCPW does not exist" or "Insufficient permissions"

**Fixes:**

1. **Verify project key spelling:**
   - Run: `list my Jira projects`
   - Copy exact project key from output
   - Project keys are case-sensitive!

2. **Create project if missing:**
   - Go to https://yourname-workshop.atlassian.net
   - Projects → Create Project
   - Template: Kanban or Scrum
   - Project Key: MCPW (or your choice)

3. **Check permissions:**
   - Ensure you're admin of the project
   - Free tier should have full permissions

---

### Issue: Issue Created but Wrong Type

**Symptom:** Created as Task instead of Story

**Fix:**

1. **Check available issue types:**
   ```
   @atlassian what issue types are available in project MCPW?
   ```

2. **Enable Story type in Jira:**
   - Go to Project Settings → Issue Types
   - Add "Story" if missing

3. **Or change to available type:**
   Edit frontmatter:
   ```yaml
   type: task  # or epic, bug
   ```

---

### Issue: Rate Limiting

**Symptom:** "429 Too Many Requests" error

**Fix:**
- Wait 60 seconds
- Don't sync repeatedly in quick succession
- Batch your changes before syncing

---

## Reference Materials

### Copy-Paste Prompts

**All exact prompts for this lab:**

```
# Step 1: Verify access
List my Jira projects

# Step 3: Sync (CREATE) - replace MCPW with your project key
Create a story based on specs/stories/STORY-001.md in Jira project MCPW.

Show me what you'll create first, then wait for my confirmation before creating the ticket.

As the final step, update frontmatter in the md file with sync info: sync.jira.url, sync.jira.issue_key, sync.jira.synced_at

# Step 4: Re-sync (UPDATE)
Sync specs/stories/STORY-001.md to Jira - update the existing issue.

Then update sync info in the md file accordingly.
```

---

### Frontmatter Evolution

**Before first sync:**
```yaml
---
title: "User Login Form"
type: story
status: draft
---
```

**After first sync (CREATE):**
```yaml
---
title: "User Login Form"
type: story
status: draft
sync:
  jira:
    url: "https://yourname-workshop.atlassian.net/browse/MCPW-1"
    issue_key: "MCPW-1"
    synced_at: "2025-12-03T14:30:00Z"
---
```

**After update (UPDATE):**
```yaml
---
title: "User Login Form"
type: story
status: draft
sync:
  jira:
    url: "https://yourname-workshop.atlassian.net/browse/MCPW-1"
    issue_key: "MCPW-1"
    synced_at: "2025-12-03T14:35:00Z"  # <-- timestamp updated
---
```

---

### Issue Types Reference

**Common Jira issue types:**
- `story` - User story (feature from user perspective)
- `epic` - Large feature (parent of multiple stories)
- `task` - Technical task
- `bug` - Defect or issue
- `subtask` - Child of story/task

**Set in frontmatter:**
```yaml
type: story  # or epic, task, bug
```
