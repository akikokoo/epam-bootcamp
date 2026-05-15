---
name: "sync-to-confluence"
description: "Batch sync all PRD markdown files to Confluence space"
---

# Sync PRDs to Confluence

## Objective

Sync all Product Requirements Documents (PRDs) in `specs/prds/` to Confluence space **YG** (or specified space).

## Instructions

### 1. Discover PRDs

- Find all `.md` files in `specs/prds/` folder
- Verify `type: prd` in frontmatter

### 2. Analyze Sync State

For each PRD file:

**If NO `sync.confluence` in frontmatter:**
- Action: **CREATE** new Confluence page
- Space: Use default space (YG) or specified
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
2. Create or update page using Atlassian MCP
3. Update frontmatter with sync info
4. Report success or failure

### 7. Summary Report

After all syncs complete, show:
- ✅ Successfully synced: [count]
- ❌ Failed: [count] (with reasons)
- 📝 PRD URLs: [list with links]
- 🔗 Cross-links added: [count]

## Example Frontmatter

**After sync (CREATE):**
```yaml
---
title: "User Authentication PRD"
type: prd
status: draft
sync:
  confluence:
    url: "https://bootcamp.atlassian.net/wiki/spaces/YG/pages/262146"
    page_id: "262146"
    space_key: "YG"
    synced_at: "2026-05-07T00:00:00Z"
---
```

## Configuration

**Default Space:** YG
**PRD Folder:** specs/prds/
**Parent Page:** None (root-level)

To change space, specify: "Sync to Confluence space [SPACE_KEY]"
