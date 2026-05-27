---
name: wrap
description: End-of-phase ceremony. Runs token health check, drafts a commit message from the diff for approval, commits, then decides whether to compact. Run this at every natural phase boundary — feature done, bug fixed, chapter written.
user-invocable: true
---

# Phase Wrap

A single command that closes out a phase of work cleanly: token health → commit → compact decision. Run this whenever you finish a logical chunk of work.

Do NOT use this for quick mid-phase saves — use `/commit` for those. This is the end-of-phase ceremony.

## Procedure

### Step 1: Token health snapshot

Check current session state and report concisely:

```bash
git status --short
git diff HEAD
git log --oneline -5
```

Report in one block:

```
## Session State
**Context window:** [Low / Medium / High / Critical]
**Recommendation:** [Continue / Compact after commit / Compact now]
```

If Critical (80%+), flag it immediately:
> "Context is Critical. Recommend compacting before committing. Shall I compact first?"
> Wait for user response before proceeding.

### Step 2: Read the diff and draft the commit summary

Read the full diff:

```bash
git diff HEAD
git diff --cached
```

Also check recent commit style:

```bash
git log --oneline -5
```

Draft a one-sentence summary of what was just completed. Frame it in imperative mood, max 50 chars for the title. Add a brief body if the change warrants it.

Present to user:

> "Here's what I see:
>
> **[Draft commit title]**
> [Draft commit body if needed]
>
> Confirm, or tell me what to change."

Wait for approval or amendment before proceeding.

### Step 3: Execute the commit

Use the approved summary. Follow the same nested-repo detection logic as `/commit`:

1. Detect which repo(s) have changes
2. If ambiguous, ask which repo to commit to
3. Stage and commit:

```bash
cd "<repo-path>" && git add <relevant files>
cd "<repo-path>" && git commit -m "$(cat <<'EOF'
<approved title>

<approved body>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

4. Push if remote exists:

```bash
cd "<repo-path>" && git push origin <branch>
```

Report result:
```
✓ Committed to <repo> (<branch>)
  <hash> <title>
  → Pushed to origin/<branch>
```

### Step 4: Compact decision

**If context was High or Critical:**
> "Context is [High/Critical]. Running /compact now to keep the next phase clean."

Run compact with an explicit preservation instruction built from the commit summary:

> Compact this conversation. Preserve: the current task context, the work just completed ([commit title]), any open files, architectural decisions made this session, and any unresolved errors.

**If context was Low or Medium:**
> "Context is healthy — no compact needed. Clean to start next phase."

### Step 5: Next phase anchor (optional)

Ask once:

> "What are you working on next?"

This is a deliberate reset moment. The answer is not saved anywhere — it just sets a clean mental anchor before the new phase begins. If the user says nothing or skips it, move on.

## Safety Rules

Inherited from `/commit`:
- **NEVER** use `git commit --amend` unless explicitly requested
- **NEVER** use `git push --force` unless explicitly requested
- **NEVER** commit `.env`, credentials, or secret files
- **ALWAYS** check for a remote before pushing

## When to use /wrap vs /commit

| Situation | Use |
|-----------|-----|
| Finished a feature, bug fix, or chapter | `/wrap` |
| Quick save mid-task | `/commit` |
| Mid-session health check only | `/token-check` |
| Starting a new session | `/token-check` |

## Source principles

Based on: *18 tactics. 80% saving. The Claude Code Field Guide* — Ant Newman, May 2026.
Phase-boundary compaction: compact after each logical chunk, not at 95% crisis point.
