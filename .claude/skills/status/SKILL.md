---
name: status
description: Get a brief project status update. Summarises current state of the project — what exists, what's in progress, what's next. Use when the user invokes /status or wants a quick orientation.
user-invocable: true
---

# Project Status Skill

Give a concise, structured status update for the current project.

## What to Include

1. **Project:** Name and one-line purpose
2. **Current state:** What exists right now (key files, features, build status)
3. **In progress:** What is actively being worked on
4. **Blockers:** Anything preventing forward progress
5. **Next steps:** The two or three most important things to do next

## How to Gather Information

- Read `CLAUDE.md` for project context and conventions
- Check `HISTORY.md` if it exists for recent changes
- Run `git log --oneline -10` to see recent commits
- Run `git status` to see uncommitted changes
- Scan the project structure with a quick glob

## Output Format

Keep it tight. No padding. Use this structure:

```
## Status: <Project Name>

**Purpose:** <one line>

**Current state:**
- <what exists>

**In progress:**
- <active work>

**Blockers:**
- <none / list>

**Next:**
1. <most important>
2. <second>
3. <third>
```

If there is no HISTORY.md and no recent commits, say so — do not invent activity.
