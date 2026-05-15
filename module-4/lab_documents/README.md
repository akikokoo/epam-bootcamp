# MCP Workshop - Participant Lab Guides

**Welcome to the Model Context Protocol (MCP) Workshop!**

This hands-on workshop teaches you how to use MCP servers to enhance AI coding workflows with live documentation, browser automation, and project management tool integration.

---

## 🎯 Workshop Overview

**Duration:** 2-3 hours
**Difficulty:** Beginner to Intermediate

**What you'll learn:**
- Configure MCP servers (Context7, Playwright, Atlassian)
- Fetch up-to-date library documentation
- Automate browser testing through natural language
- Sync markdown specs to Jira and Confluence
- Create reusable prompt workflows
- Build batch sync automation

**What you'll build:**
- Configured MCP environment (3 servers)
- Markdown-based spec workflow (stories, epics, PRDs)
- Sync automation prompts
- Two-way sync with conflict detection

---

## 📚 Lab Structure

### Phase 1: Setup (Lab 0)
**Duration:** 20 minutes | **Required**

Start here to configure all MCP servers before beginning hands-on labs.

**[→ Lab 0: Pre-Lab Setup](lab-00-pre-lab-setup.md)**
- Configure Context7, Playwright, and Atlassian MCP servers
- Set up API keys and OAuth
- Install browser binaries
- Verify all servers running

---

### Phase 2: Core MCP Usage (Labs 1-2)
**Duration:** 30 minutes | **Required**

Learn fundamental MCP concepts with Context7 and Playwright.

#### **[→ Lab 1: Context7 - Up-to-Date Library Documentation](lab-01-context7.md)**
**Duration:** 15 minutes | **Difficulty:** Low

- Understand stale training data problem
- Fetch live documentation from official sources
- Compare AI responses with/without Context7
- Verify version-specific syntax

**Key Concepts:** Training data cutoff, source attribution, live docs

---

#### **[→ Lab 2: Playwright - AI-Driven Browser Automation](lab-02-playwright.md)**
**Duration:** 15 minutes | **Difficulty:** Low-Medium

- Automate browser navigation and screenshots
- Fill forms through natural language
- Understand MCP vs Library trade-offs
- Practical testing use cases

**Key Concepts:** Natural language automation, accessibility tree, E2E testing

---

### Phase 3: Sync Workflows (Labs 3-4)
**Duration:** 35 minutes | **Required**

Build markdown-to-Jira/Confluence sync workflows.

#### **[→ Lab 3: Jira Sync - Stories and Epics](lab-03-jira-sync.md)**
**Duration:** 20 minutes | **Difficulty:** Medium

- Sync markdown stories to Jira
- Understand CREATE vs UPDATE patterns
- Track sync state with frontmatter
- Handle parent-child relationships (Epic → Story)

**Key Concepts:** Frontmatter tracking, one-way sync, sync state

---

#### **[→ Lab 4: Confluence Sync - PRDs and Documentation](lab-04-confluence-sync.md)**
**Duration:** 15 minutes | **Difficulty:** Medium

- Sync PRDs to Confluence pages
- Cross-link Confluence pages to Jira epics
- Understand markdown → Confluence conversion
- Update existing pages

**Key Concepts:** Documentation sync, cross-tool linking, formatting conversion

---

### Phase 4: Advanced Automation (Lab 5)
**Duration:** 30 minutes | **Optional**

Build reusable prompt workflows for batch operations and two-way sync.

#### **[→ Lab 5: Reusable Sync Prompts](lab-05-reusable-prompts.md)**
**Duration:** 30 minutes | **Difficulty:** Medium-High

- Create reusable prompt files
- Batch sync all stories/PRDs at once
- Detect out-of-date files automatically
- Build two-way sync with conflict detection

**Key Concepts:** Prompt engineering, batch operations, conflict resolution

---

## 🗺️ Recommended Learning Paths

### Path 1: Core Workflow (Minimum)
**Duration:** 1.5 hours

1. [Lab 0: Pre-Lab Setup](lab-00-pre-lab-setup.md) *(20 min)*
2. [Lab 1: Context7](lab-01-context7.md) *(15 min)*
3. [Lab 2: Playwright](lab-02-playwright.md) *(15 min)*
4. [Lab 3: Jira Sync](lab-03-jira-sync.md) *(20 min)*
5. [Lab 4: Confluence Sync](lab-04-confluence-sync.md) *(15 min)*

**Outcome:** Configure MCP, sync markdown to Jira/Confluence

---

### Path 2: Complete Workshop (Recommended)
**Duration:** 2.5 hours

1. Core Workflow (Labs 0-4) *(1.5 hours)*
2. [Lab 5: Reusable Prompts](lab-05-reusable-prompts.md) *(30 min)*
3. Practice & experimentation *(30 min)*

**Outcome:** Full automation with batch sync and conflict detection

---

## 📋 Prerequisites

**Before starting Lab 0, ensure you have:**

- [ ] **Node.js 18+** - [Download](https://nodejs.org)
- [ ] **VS Code 1.99+** OR **GitHub Copilot CLI**
- [ ] **GitHub Copilot subscription** (Individual, Business, or Enterprise)
- [ ] **Internet connection** (for MCP servers and OAuth)
- [ ] **Personal email** (for Atlassian sandbox account)

**Check versions:**
```bash
node --version   # Should show v18.0.0 or higher
code --version   # Should show 1.99.0 or higher
```

---

## 📖 Lab Overview Table

| Lab | Title | Duration | Difficulty | Required | Key Concept |
|-----|-------|----------|------------|----------|-------------|
| [0](lab-00-pre-lab-setup.md) | Pre-Lab Setup | 20 min | Low | ✅ Yes | MCP configuration |
| [1](lab-01-context7.md) | Context7 | 15 min | Low | ✅ Yes | Live documentation |
| [2](lab-02-playwright.md) | Playwright | 15 min | Low-Med | ✅ Yes | Browser automation |
| [3](lab-03-jira-sync.md) | Jira Sync | 20 min | Medium | ✅ Yes | Markdown → Jira |
| [4](lab-04-confluence-sync.md) | Confluence Sync | 15 min | Medium | ✅ Yes | PRD documentation |
| [5](lab-05-reusable-prompts.md) | Reusable Prompts | 30 min | Med-High | ⭐ Recommended | Batch automation |

---

## 🎓 Learning Objectives

By the end of this workshop, you will be able to:

### Technical Skills
- ✅ Configure multiple MCP servers (Context7, Playwright, Atlassian)
- ✅ Invoke MCP tools through natural language
- ✅ Fetch live library documentation with version specificity
- ✅ Automate browser interactions without writing code
- ✅ Sync markdown specs to Jira and Confluence
- ✅ Track sync state using frontmatter
- ✅ Create reusable prompt workflows
- ✅ Detect out-of-date files and conflicts

### Conceptual Understanding
- ✅ Understand MCP protocol and architecture
- ✅ Recognize when to use MCP vs traditional approaches
- ✅ Design markdown-based spec workflows
- ✅ Handle one-way and two-way sync patterns
- ✅ Apply prompt engineering for automation
- ✅ Troubleshoot common MCP issues

### Practical Application
- ✅ Build production-ready sync workflows
- ✅ Integrate MCP into existing projects
- ✅ Create team-shareable prompts
- ✅ Extend patterns to new tools (Linear, GitHub, etc.)

---

## 📁 File Structure

After completing all labs, your project will look like:

```
your-project/
├── .vscode/
│   └── mcp.json                    # Workspace MCP configuration
├── .github/
│   └── prompts/                    # Reusable prompt workflows
│       ├── sync-to-jira.prompt.md
│       ├── sync-to-confluence.prompt.md
│       ├── check-sync-status.prompt.md
│       └── sync-plan.prompt.md
├── specs/
│   ├── stories/                    # Jira user stories (markdown)
│   │   ├── STORY-001.md
│   │   └── STORY-002.md
│   ├── epics/                      # Jira epics (markdown)
│   │   └── EPIC-001.md
│   ├── prds/                       # Product Requirements Docs
│   │   ├── PRD-001.md
│   │   └── PRD-002.md
│   └── adrs/                       # Architecture Decision Records
│       └── ADR-001.md
└── README.md
```

---

## 🔗 Additional Resources

### MCP Protocol
- **Official Site:** https://modelcontextprotocol.io
- **Specification:** https://spec.modelcontextprotocol.io
- **GitHub:** https://github.com/modelcontextprotocol

### MCP Servers Used
- **Context7:** https://github.com/upstash/context7
- **Playwright MCP:** https://github.com/microsoft/playwright-mcp
- **Atlassian MCP:** https://github.com/atlassianlabs/mcp-server-atlassian

### Vendor Documentation
- **GitHub Copilot MCP:** https://docs.github.com/copilot/using-mcp
- **VS Code MCP:** https://code.visualstudio.com/docs/copilot/mcp

### Community
- **MCP Discord:** https://discord.gg/modelcontextprotocol
- **GitHub Discussions:** https://github.com/modelcontextprotocol/discussions

---

## 💡 Tips for Success

### Before Starting
1. **Block 2-3 hours** - Complete workshop in one session if possible
2. **Close other applications** - Reduce context switching
3. **Follow labs sequentially** - Each builds on previous concepts
4. **Don't skip Lab 0** - Setup is critical for smooth experience

### During Labs
1. **Copy-paste exact prompts** - Use provided commands first, experiment later
2. **Verify each checkpoint** - Don't skip success verification steps
3. **Read troubleshooting sections** - Each lab has common issues documented
4. **Take notes** - Document what works for your environment

### When Stuck
1. **Check Troubleshooting section in a lab**
2. **Reload VS Code** - Fixes 50% of issues
3. **Review prerequisites** - Go back to Lab 0 verification
4. **Ask for help** - After trying self-service for 15 minutes

### After Completing
1. **Apply to real project** - Use patterns in production
2. **Share prompts with team** - Version control `.github/prompts/`
3. **Extend patterns** - Create custom prompts for your workflow
4. **Provide feedback** - Help improve workshop for future participants

---

## 📝 Workshop Feedback

After completing the workshop, we'd love your feedback:

**What worked well?**
**What was confusing?**
**What would you change?**
**How likely are you to use MCP in production? (1-10)**

*(Feedback mechanism TBD - check with instructor)*

---

## 🚀 Getting Started

**Ready to go?** [→ Start Lab 0 Now](lab-00-pre-lab-setup.md)

---

**MCP Workshop Participant Labs - Version 1.0**
**Last Updated:** 2026-02-17
**Maintained by:** AI-Native Engineering Curriculum Team
