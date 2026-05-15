# Lab 4: Confluence MCP Usage - Sync PRDs and Documentation

| | |
|---|---|
| **Duration** | 15 minutes |
| **Prerequisites** | Lab 3 complete (Atlassian MCP configured, OAuth done) |
| **Difficulty** | ⭐⭐ Medium |

---

## 🎯 Lab Goal

Learn to **sync markdown PRDs to Confluence pages** and link them to Jira epics.

---

## 📚 What You'll Learn

By the end of this lab, you will:

- ✅ Create Confluence spaces for documentation
- ✅ Sync markdown PRDs to Confluence pages
- ✅ Cross-link Confluence pages to Jira epics
- ✅ Update existing Confluence pages
- ✅ Understand markdown → Confluence formatting conversion
- ✅ Recognize documentation sync patterns

---

## 🗺️ Lab Overview

### What You'll Do
1. Create a Confluence space
2. Create a PRD markdown file
3. Sync PRD to Confluence (CREATE)
4. Update PRD and re-sync (UPDATE)
5. Link Confluence page to Jira epic

### Key Concept
Markdown files act as the **source of truth**, while Confluence mirrors their content.

---

## ✅ Prerequisites Check

Before starting, verify:

- [ ] Atlassian MCP configured (from Lab 0)
- [ ] OAuth completed (from Lab 0 or Lab 3)
- [ ] Jira project exists with at least one issue
- [ ] Test command works: `list my Confluence spaces`

> **⚠️ If any fail:** See [Lab 0 - Step 4](lab-00-pre-lab-setup.md#-step-4-atlassian-mcp-setup)

---

## Step 1: Create Confluence Space

⏱️ **3 minutes**

### 1.1 Access Confluence

**Go to your Atlassian site:**
- URL: `https://yourname-workshop.atlassian.net`
- Click **"Confluence"** in the top navigation
- If first time: May need to enable Confluence (free on sandbox accounts)

---

### 1.2 Create New Space

**In Confluence:**

1. **Click "Create space"** (usually top-right or sidebar)
2. **Choose space type:**
   - Select: **"Blank space"** (simplest option)
3. **Space details:**
   - **Space name:** `MCP Workshop Docs`
   - **Space key:** `MCPDOCS` (auto-generated, you can customize)
   - **Description:** "Documentation synced from markdown files"
4. **Click "Create"**
5. **Verify:**
   - You should see empty space homepage
   - URL format: `https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS`

---

### 1.3 Verify Space via MCP

**Test command:**

```
List my Confluence spaces
```

**Expected Response:**
```
Your Confluence Spaces:
- MCPDOCS: MCP Workshop Docs
- [other spaces if any]

Site: https://yourname-workshop.atlassian.net/wiki
```

✅ **If you see MCPDOCS:** Continue to Step 2

---

## Step 2: Create PRD File

⏱️ **2 minutes**

### 2.1 Create Folder Structure

Run the following commands to create the necessary folders:

```bash
mkdir -p specs/prds
cd specs/prds
```

---

### 2.2 Create PRD File

Create a file named `specs/prds/PRD-001.md` with the following content:

```markdown
---
title: "User Authentication PRD"
type: prd
status: draft
---

# PRD-001: User Authentication

## Problem Statement
Users need a secure way to authenticate to access protected features of the application.

## Target Users
- All registered users of the application
- Developers integrating with our authentication system

## Functional Requirements

### FR-1: Login
- Email/password authentication
- "Remember me" option for extended sessions
- Password reset via email
- Account lockout after 5 failed attempts

### FR-2: Registration
- Email verification required
- Password strength requirements (min 8 chars, uppercase, number, symbol)
- Terms of service acceptance
- Privacy policy acceptance

### FR-3: Session Management
- JWT-based sessions
- 30-day remember me duration
- Logout from all devices option
- Session expiry notifications

### FR-4: Security
- bcrypt password hashing (cost factor 12)
- Rate limiting on authentication endpoints
- HTTPS required for all auth operations
- CORS configuration for allowed origins

## Non-Functional Requirements

### NFR-1: Performance
- Authentication response time < 200ms (p95)
- Support 1000 concurrent login attempts
- Session validation < 50ms

### NFR-2: Security
- SOC 2 Type II compliance
- OWASP Top 10 mitigation
- Regular security audits

### NFR-3: Availability
- 99.9% uptime SLA
- Graceful degradation during outages
- Multi-region deployment

## Success Metrics
- 95% login success rate
- < 2 second authentication time (p99)
- < 1% password reset requests
- Zero authentication-related security incidents

## Out of Scope
- OAuth/Social login (Phase 2)
- Multi-factor authentication (Phase 2)
- Biometric authentication (Phase 3)
```

---

### 2.3 Understand the Structure

**PRD sections:**
- **Problem Statement** - Why we're building this
- **Target Users** - Who will use it
- **Functional Requirements** - What it does
- **Non-Functional Requirements** - How well it performs
- **Success Metrics** - How we measure success
- **Out of Scope** - What we're NOT doing

**Frontmatter:**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
---
```

---

## Step 3: Sync to Confluence (CREATE)

⏱️ **5 minutes**

### 3.1 Preview Sync

Run the following prompt (replace `MCPDOCS` with your space key):

```
Create a page based on specs/prds/PRD-001.md in Confluence space MCPDOCS.
Update frontmatter in the md file with sync info: 
sync.confluence.url, sync.confluence.page_id, sync.confluence.space_key, sync.confluence.synced_at

Show me what you'll create first, then wait for my confirmation before proceeding.
```

---

### 3.2 Confirm and Create

**Type:** `yes` or `confirm` or `proceed`

**Expected Response:**
```
Creating Confluence page...

✅ Confluence page created successfully!

Page ID: 12345678
URL: https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678
Title: User Authentication PRD
Space: MCPDOCS

Updating frontmatter in PRD-001.md...
✅ Frontmatter updated with sync info
```

---

### 3.3 Verify File Updated

**Open `specs/prds/PRD-001.md` and check frontmatter:**

**Should include `sync` section:**

```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
sync:
  confluence:
    url: "https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678"
    page_id: 12345678
    space_key: MCPDOCS
    synced_at: "2025-12-03T15:00:00Z"
---
```

---

### 3.4 Verify in Confluence UI

**Open the URL in browser:**

1. Copy `sync.confluence.url` from frontmatter
2. Paste into browser
3. OR: Go to Confluence space MCPDOCS → find "User Authentication PRD" page

**You should see:**
- Page title: User Authentication PRD
- All sections formatted in Confluence style
- Headers, bullet points, formatting preserved
- Readable in Confluence's visual format

✅ **If visible in Confluence:** Sync successful!

---

## Step 4: Update and Re-Sync (UPDATE)

⏱️ **3 minutes**

### 4.1 Make Changes to PRD

**Edit `specs/prds/PRD-001.md` - Add new functional requirement:**

```markdown
### FR-5: Password Strength Indicator
- Real-time password strength feedback
- Visual indicator (weak/medium/strong)
- Suggestions for improvement
- Zxcvbn-based strength calculation
```

**Add to Functional Requirements section**

**Save the file**

---

### 4.2 Re-Sync (UPDATE)

Run the following prompt:

```
Sync specs/prds/PRD-001.md to Confluence - update the existing page

Then update sync info in the md file accordingly.
```

**Expected Response:**
```
Updating Confluence page 12345678...

✅ Confluence page updated successfully!

Page ID: 12345678 (same)
URL: https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678
Changes applied:
- Added FR-5: Password Strength Indicator
- Last updated: 2025-12-03T15:05:00Z

Frontmatter synced_at updated.
```

---

### 4.3 Verify Update in Confluence

**Refresh the Confluence page**

**You should see:**
- All 5 functional requirements (including new FR-5)
- Updated timestamp at bottom of page

✅ **If FR-5 visible:** Update successful!

---

## 🎉 Lab 4 Complete!

### Key Concepts Review

1. **Confluence as Documentation Mirror:**
   - Markdown files = source of truth
   - Confluence = stakeholder-friendly view
   - Changes start in markdown, sync to Confluence

2. **Space Organization:**
   - Spaces = top-level containers
   - Pages = individual documents
   - Page hierarchy possible (parent/child)

3. **Markdown Conversion:**
   - Automatic conversion to Confluence format
   - Some formatting differences expected
   - Confluence editor can fine-tune after sync

---

### Success Checkpoints

**Before moving to Lab 5, verify:**

- [ ] Created Confluence space MCPDOCS (Step 1)
- [ ] Created PRD-001.md file (Step 2)
- [ ] Synced to Confluence (CREATE) (Step 3)
- [ ] Frontmatter updated with page_id (Step 3)
- [ ] Verified page in Confluence UI (Step 3)
- [ ] Updated PRD with FR-5 (Step 4)
- [ ] Re-synced (UPDATE) (Step 4)
- [ ] Verified update in Confluence (Step 4)
- [ ] Understand CREATE vs UPDATE logic

**If all checked:** ✅ **Lab 4 Complete!** → Proceed to [Lab 5](lab-05-reusable-prompts.md)

---

## Troubleshooting

### Issue: Confluence Not Enabled

**Symptom:** Can't access Confluence on your Atlassian site

**Fix:**
1. Go to https://yourname-workshop.atlassian.net
2. Look for "Confluence" in product switcher (top-left)
3. If not visible: Click "Try Confluence" to enable
4. Follow setup wizard (choose blank space or skip)

---

### Issue: "Space Not Found"

**Symptom:** Error: "Confluence space MCPDOCS does not exist"

**Fixes:**

1. **Verify space key:**
   - Copy exact space key from output

2. **Check spelling:**
   - Space keys are case-sensitive
   - Use exact match (e.g., MCPDOCS, not mcpdocs)

3. **Create space if missing:**
   - Follow Step 1 again
   - Ensure space created successfully

---

### Issue: Page Creation Fails

**Symptom:** Error during Confluence page creation

**Common causes & fixes:**

1. **Permission issues:**
   - Ensure you're space admin
   - Free tier should have full permissions

2. **Markdown formatting errors:**
   - Check for unclosed code blocks
   - Use JSON validator for frontmatter

3. **Content too large:**
   - Confluence has page size limits
   - Split into multiple pages if needed

---

### Issue: Formatting Looks Wrong

**Symptom:** Confluence page doesn't match markdown formatting

**This is expected!** Markdown → Confluence conversion has limitations:

**Common differences:**
- Tables may render differently
- Some markdown extensions not supported
- Code blocks formatting varies
- Nested lists depth limited

**Fix:**
- Adjust markdown to simpler formatting
- Use Confluence editor to fine-tune after sync
- Accept minor formatting differences

---

## Reference Materials

### Copy-Paste Prompts

**All exact prompts for this lab:**

```
# Step 1: List spaces
List my Confluence spaces

# Step 3: Sync (CREATE) - replace MCPDOCS with your space key
Create a page based on specs/prds/PRD-001.md in Confluence space MCPDOCS.
Update frontmatter in the md file with sync info: 
sync.confluence.url, sync.confluence.page_id, sync.confluence.space_key, sync.confluence.synced_at

Show me what you'll create first, then wait for my confirmation before proceeding.

# Step 4: Re-sync (UPDATE)
Sync specs/prds/PRD-001.md to Confluence - update the existing page

Then update sync info in the md file accordingly.
```

---

### Frontmatter Evolution

**Before first sync:**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
---
```

**After first sync (CREATE):**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
sync:
  confluence:
    url: "https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678"
    page_id: 12345678
    space_key: MCPDOCS
    synced_at: "2025-12-03T15:00:00Z"
---
```

**With Jira epic link (optional):**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
sync:
  confluence:
    url: "https://yourname-workshop.atlassian.net/wiki/spaces/MCPDOCS/pages/12345678"
    page_id: 12345678
    space_key: MCPDOCS
    synced_at: "2025-12-03T15:00:00Z"
jira_epic_key: "MCPW-5"
---
```

---

### Document Types for Confluence

**Common document types to sync:**
- `prd` - Product Requirements Document
- `adr` - Architecture Decision Record
- `tech-spec` - Technical Specification
- `design-doc` - Design Document
- `runbook` - Operational Runbook
- `doc` - General Documentation

**Set in frontmatter:**
```yaml
type: prd  # or adr, tech-spec, etc.
```
