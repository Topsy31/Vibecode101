---
name: token-check
description: Session token health check. Reports context window usage, active MCPs, model recommendation, and token budget for the current task type. Use at session start or any point mid-session when you want a health check.
user-invocable: true
---

# Token Health Check

A quick session health check based on the token efficiency principles in the Token Saving field guide. Run at session start to set up correctly, or mid-session to assess current state.

## Procedure

### Step 1: Gather session state

Run the following in parallel:

```bash
# Context window position (Claude Code internal)
# Note: Claude Code does not expose a direct context % command.
# Estimate from conversation length and file reads this session.

# Active git state
git status --short
git log --oneline -3
```

Check which MCP servers are active this session (visible in the system prompt tool list).

### Step 2: Ask task type

Ask the user one question:

> "What type of work are you about to do (or currently doing)?"
> - Bug fix
> - New feature
> - Multi-file refactor
> - Exploration / investigation
> - Planning only

### Step 3: Produce the health report

Output a concise report in this format:

```
## Token Health Check

**Context window:** [Low / Medium / High / Critical]
- Low = early session, plenty of room
- Medium = 40–60% estimated used, monitor
- High = 60–80%, compact after this phase
- Critical = 80%+, compact now before continuing

**Active MCPs:** [list any MCP servers visible in tool list, or "None detected"]
- Flag any that are unlikely to be needed for the stated task

**Model recommendation:**
- [Sonnet / Opus] — reason in one line

**Token budget for this task:**
- Bug fix → target under 5,000 tokens
- New feature → target under 50,000 tokens
- Multi-file refactor → target under 500,000 tokens
- Exploration → keep short, use /wrap frequently
- Planning → use Opus once, save output as PLAN.md, switch to Sonnet to execute

**Compact threshold:** Run /wrap when context reaches ~60%. Do not wait for auto-compaction.

**One reminder:**
- Hit Escape the moment Claude heads the wrong direction — output tokens are 5× the cost of input tokens.
```

### Step 4: Flag any immediate issues

If any of the following are true, call them out explicitly before the report:

- MCPs are loaded that don't match the stated task (e.g., Gmail active for a coding task)
- Context appears to be High or Critical already
- The task type suggests Opus but current model is Sonnet (or vice versa)

## Tone

Concise. No padding. This is a five-second check, not a lecture. One screen, done.

## Source principles

Based on: *18 tactics. 80% saving. The Claude Code Field Guide* — Ant Newman, May 2026.
Key benchmarks: bug fix <5K tokens, feature <50K, refactor <500K. Compact at 60%, never at 95%.
