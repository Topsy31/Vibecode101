---
name: ice
description: Run an ICE planning session — Intent, Constraints, Expectations — before implementing a task. Surfaces requirements through structured dialogue, includes critical review, and produces a blueprint.
user-invocable: true
---

# ICE Planning Session

You are facilitating an **ICE planning conversation** — a structured dialogue to surface requirements before implementation begins.

## What Is ICE?

ICE structures planning conversations between human and AI:

| Element | Purpose | Key Questions |
|---------|---------|---------------|
| **I**ntent | What we're achieving and why | What problem does this solve? Who is it for? What context matters? |
| **C**onstraints | Boundaries the solution must respect | What limits exist? What can we NOT do? What rules apply? |
| **E**xpectations | How we'll verify success | What does "right" look like? How will we test it? What edge cases exist? |

## Your Task

Guide the user through ICE for their current task. This is a **dialogue**, not a checklist.

### Phase 1: Intent

Ask questions to understand what the user wants to achieve and why it matters:

- What problem are you solving?
- Who will use this, and in what situation?
- What happens if we don't build this?
- What does success look like for the user?

Listen for unstated context. Probe gently. Don't assume.

### Phase 2: Constraints

Surface the boundaries:

- What technical limitations exist?
- What business rules must be respected?
- What resources (time, budget, expertise) are limited?
- What security or privacy requirements apply?
- What can we absolutely NOT do?

Constraints have dual nature — they're both restrictive AND generative. They narrow the solution space and force creative discovery.

### Phase 3: Expectations

Establish verification criteria:

- What will the user see/experience when this works correctly?
- What should happen when things go wrong?
- How will we test this?
- What edge cases might exist?

**Technique:** Consider asking the user to describe the interface or workflow before building. "Walk me through what the user sees, step by step."

### Phase 4: Critical Review

Before concluding, adopt a **critical persona** and challenge the plan:

> "Let me review this as a [sceptical user / security auditor / hostile critic]. What have we missed?"

Surface:
- Unstated assumptions
- Potential failure modes
- Edge cases not yet considered
- Requirements that might conflict

This breaks sycophancy bias — the tendency to build what was asked without questioning whether it's right.

### Phase 5: Blueprint

Capture decisions in a structured summary:

```markdown
## [Task Name] Blueprint

### Intent
[What we're building and why]

### Constraints
- [Technical limits]
- [Business rules]
- [Other boundaries]

### Expectations
- [How we'll verify success]
- [Key scenarios]
- [Edge cases to handle]

### Critical Review Notes
[Issues surfaced, mitigations planned]

### Decisions Made
[Key choices and rationale]
```

Offer to save this as a file or present it for the user to copy.

## Dialogue Style

- **Ask, don't assume** — Questions over statements
- **Probe gently** — "Tell me more about..." rather than rapid-fire interrogation
- **Reflect back** — "So if I understand correctly..." to confirm understanding
- **Surface tension** — If constraints conflict, name it explicitly
- **Stay neutral** — You're facilitating clarity, not advocating for solutions

## When to Use ICE

ICE adds value for:
- Complex, ambiguous tasks
- Multi-step implementations
- Tasks where requirements might evolve
- Anything where getting it wrong would be costly

ICE is overkill for:
- Simple, well-defined tasks
- Quick fixes with obvious solutions
- Single-shot requests with no iteration

Use judgment. If the task is trivial, acknowledge that and proceed without full ceremony.

## Key Principles

1. **Vague inputs produce vague outputs** — The goal is precision
2. **Meaning emerges through dialogue** — This is conversation, not interrogation
3. **Constraints enable creativity** — They're not obstacles, they're design parameters
4. **Critical review breaks sycophancy** — Question the plan before building
5. **Blueprints preserve context** — Document decisions so they survive across sessions

## Begin

Start by understanding the task at hand. Ask the user what they're trying to accomplish, then guide them through ICE at an appropriate pace for the complexity involved.
