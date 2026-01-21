# CLAUDE.md - Vibe Coding Root

This is the root folder for vibe coding experiments and applications. This file captures key learnings, patterns, and conventions discovered across all projects.

---

## Projects Overview

| Folder | Purpose | Status |
|--------|---------|--------|
| `VibeCoded-Ebook/` | "Vibe-Coding: The Art of Collaborating with AI" e-book | Active (2nd edition) |
| `VibeCoding-Ebook-Marketing/` | Marketing website for e-book launch | Active (Feb 2026 launch) |
| `Marketing_Manager/` | AI-powered marketing SaaS tool | Complete (8 phases) |
| `Interloquial_Experiment/` | Research platform testing interloquial prompting | Active |
| `VibeCoding_101/` | Educational presentation and training materials | Complete |
| `Gantt Chart/` | Interactive React Gantt chart editor | Complete |
| `CoffeeCup/` | Dashboard/interface framework templates | Template |
| `Contacts/` | Email list exports | Archive |
| `Consulting/` | [New project] | New |

---

## Core Concepts

### Interloquial Communication
Communication between different kinds of intelligences (human-AI). Distinct from interpersonal (human-human). Recognises that AI is not human, so we shouldn't talk to it like it is.

### ICE Framework
**I**ntent, **C**onstraints, **E**xpectations — a planning conversation framework (not a prompt template). Front-loads the thinking that should happen before work begins.

### Key Insight
**Vague inputs produce vague outputs.** Most poor AI results stem from unclear requests, not AI limitations.

---

## Available Skills (Slash Commands)

These skills are available across all projects:

| Skill | Purpose |
|-------|---------|
| `/q` | Ask clarifying questions before starting work |
| `/challenge` | Challenge assumptions and sharpen the prompt |
| `/verify` | Review AI output critically before accepting |
| `/newproject` | Create new project folder with git and Claude init |
| `/commit` | Create git commit with descriptive message (nested repo aware) |
| `/status` | Get brief project status update |

### How Skills Work
- Skills are defined in `.claude/skills/[skill-name]/SKILL.md`
- User-invocable skills have `user-invocable: true` in frontmatter
- Invoke with `/skill-name` (e.g., `/q`, `/challenge`)

---

## Key Patterns & Conventions

### Writing Standards
- **British English:** -ise, -isation, -our, -re endings
- **Currency:** GBP (£) for all pricing
- **Voice:** First person, conversational but professional
- **No emojis** in tables or formal documentation

### Development Practices
- **HISTORY.md:** Document development history for learning/book purposes
- **Monorepo:** Use pnpm workspaces + Turborepo for multi-app projects
- **Git commits:** Include `Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>`

### Technology Stack (Common Choices)
- **Frontend:** React 18, Next.js 14, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, TypeScript, Fastify, Prisma ORM
- **Database:** PostgreSQL, Supabase
- **Queue:** Redis + BullMQ
- **AI:** Anthropic Claude API
- **Email:** Resend API

### Static Sites (No Build Required)
Several projects use CDN-loaded frameworks for simplicity:
- React via CDN + Babel for in-browser JSX
- Tailwind via CDN
- Vanilla JavaScript for lightweight apps

---

## Lessons Learned

### 1. Front-load Thinking
Five minutes of clarification saves hours of rework. Use `/q` before complex tasks.

### 2. Trust but Verify
AI output can be fluent without being accurate. Use `/verify` for important work.

### 3. Document as You Go
Update HISTORY.md after significant changes. Future you will thank present you.

### 4. Reference Integrity
**NO HALLUCINATED REFERENCES.** Every citation must be verified and documented.

### 5. Avoid Over-Engineering
Only make changes that are directly requested or clearly necessary. Keep solutions simple.

### 6. Psychological Guardrails
Be aware of:
- **Automation complacency** — The more fluent the output, the less critically it gets reviewed
- **Skill atrophy** — Delegating cognitive work can weaken underlying human capability
- **Sycophancy bias** — AI is trained to be agreeable, which can reinforce poor ideas

### 7. Plan Before Implementing
For complex features, plan-first approaches (EnterPlanMode) prevent wasted effort and ensure alignment.

---

## Project-Specific CLAUDE.md Files

Each project has its own `CLAUDE.md` with specific instructions:
- `VibeCoded-Ebook/CLAUDE.md` — Editorial conventions, reference handling
- `Marketing_Manager/CLAUDE.md` — Tech stack, build commands, HISTORY.md requirements
- `VibeCoding-Ebook-Marketing/CLAUDE.md` — Visual identity, marketing strategy
- `Interloquial_Experiment/CLAUDE.md` — Experiment design, ethics requirements

---

## File Organisation

```
e:\Vibe Coding\
├── .claude\
│   └── skills\           # Root-level skills (available to all projects)
│       ├── adversarial-editor\
│       ├── challenge\
│       ├── commit\
│       ├── newproject\
│       ├── pdf-chapter-builder\
│       ├── q\
│       └── verify\
├── CLAUDE.md             # This file
├── CoffeeCup\            # [nested repo]
├── Consulting\           # [nested repo, no remote]
├── Contacts\
├── Gantt Chart\
├── Interloquial_Experiment\  # [nested repo]
├── Marketing_Manager\    # [nested repo]
├── VibeCoded-Ebook\      # [nested repo]
├── VibeCoding-Ebook-Marketing\  # [nested repo]
└── VibeCoding_101\
```

---

## Nested Repository Structure

This workspace contains multiple independent git repositories. Each project folder marked `[nested repo]` has its own `.git` directory and commit history.

**Important:** When committing changes, use `/commit` which will:
1. Detect which repo(s) contain changes
2. Ask for clarification if changes span multiple repos
3. Commit to the correct repo (not the parent)

| Folder | Git Remote | Branch |
|--------|------------|--------|
| Root (`e:\Vibe Coding`) | Vibecode101 | main |
| `CoffeeCup/` | CoffeeCup | main |
| `Consulting/` | (none - local only) | main |
| `VibeCoded-Ebook/` | (check) | - |
| `Marketing_Manager/` | (check) | - |

---

## When Starting New Projects

1. Create a project-specific `CLAUDE.md` with build commands and conventions
2. Create `.claude/settings.local.json` for bash permissions if needed
3. Skills from root `.claude/skills/` are inherited automatically
4. Update root `CLAUDE.md` with new project in the overview table
5. If documenting for learning, create `HISTORY.md` from the start
