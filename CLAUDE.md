# CLAUDE.md - Vibe Coding Root

Universal rules that apply to every project in this workspace.
Each project has its own `CLAUDE.md` with additional constraints. Project-specific rules override root where they conflict.
Project inventory lives in `PROJECTS.md` (not loaded automatically — check it when you need context on other projects).

**Output discipline:** Respond with code only. No preamble, no recap, no explanation unless asked.

**Compaction:** When compacting, preserve open files, current task, architectural decisions, and unresolved errors.

---

## Writing Standards

- **British English:** -ise, -isation, -our, -re endings
- **Currency:** GBP (£) for all pricing
- **Voice:** First person, conversational but professional
- **No emojis** in copy, tables, or documentation

---

## Behavioural Rules

### Anti-sycophancy
- Do not infer positive connections to my work unless explicitly asked.
- Do not editorially reframe content to flatter my frameworks or ideas.
- Provide blunt, unsolicited critical analysis when reviewing work.
- If uncertain whether a comment is sycophantic, omit it.

### Reference integrity
**No hallucinated references.** Every citation must be verified. Do not invent sources, statistics, or quotations.

### Accuracy over helpfulness
Prioritise accuracy over helpfulness. Flag uncertainty rather than smoothing over it. Do not invent sources, quotes, or APIs. Mark unverified statistics as approximate. Note where information may be stale post-cutoff. Ask rather than assume when context is unclear.

### No custom authentication
Never build custom auth. Delegate to Clerk, Auth0, Supabase Auth, or equivalent. The cost of getting auth wrong is too high; the cost of delegation is negligible.

### Never commit secrets
API keys, credentials, and passwords belong in `.env` files. `.env` is in `.gitignore`. This is not optional. Git history is permanent.

### Query-building over answering
When reasoning about real data (counts, errors, metrics), build code that answers the question rather than inferring the answer. The code can be verified. The inference cannot.

---

## Security

Apply STRIDE threat-modelling (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) before any feature touching auth, data, or external services.

---

## The 40% Rule

In any commercial application, approximately 40% of backend scope exists for the operator, not users. Plan administrative infrastructure (account management, queue monitoring, storage reporting, subscription lifecycle) as a first-class deliverable from the start.

---

## Git

- **Co-author line:** `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- **Nested repos:** `/commit` detects which repo contains changes. Never commit to the parent repo when changes belong to a nested project repo.

---

## Skills

Skills are defined in `e:\Vibe Coding\.claude\skills\`. Key skills for every session:

| Skill | When to use |
|-------|-------------|
| `/token-check` | Start of session, or any mid-session health check |
| `/wrap` | End of every phase — commits, checks context, compacts if needed |
| `/commit` | Quick mid-phase saves only |
| `/ice` | Before starting any non-trivial task |
| `/q` | When requirements need clarifying before work begins |

---

## New Projects

1. Create a project-specific `CLAUDE.md` — open with "Inherits from root `CLAUDE.md`."
2. Create `.claude/settings.local.json` for bash permissions if needed.
3. Add the project to `PROJECTS.md`.
4. If documenting for learning, create `HISTORY.md` from the start.
