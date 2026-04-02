# CLAUDE.md - Vibe Coding Root

Universal rules that apply to every project in this workspace.
Each project has its own `CLAUDE.md` with additional constraints. Project-specific rules override root where they conflict.
Project inventory lives in `PROJECTS.md` (not loaded automatically — check it when you need context on other projects).

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

### No custom authentication
Never build custom auth. Delegate to Clerk, Auth0, Supabase Auth, or equivalent. The cost of getting auth wrong is too high; the cost of delegation is negligible.

### Never commit secrets
API keys, credentials, and passwords belong in `.env` files. `.env` is in `.gitignore`. This is not optional. Git history is permanent.

### Query-building over answering
When reasoning about real data (counts, errors, metrics), build code that answers the question rather than inferring the answer. The code can be verified. The inference cannot.

---

## Security: STRIDE

Apply STRIDE at the start of any feature touching data, authentication, or external services:

| Category | Question |
|----------|----------|
| **S**poofing | Could someone impersonate a legitimate user or system? |
| **T**ampering | Could data be modified without authorisation? |
| **R**epudiation | Could someone deny performing an action? |
| **I**nformation Disclosure | Could private data reach the wrong person? |
| **D**enial of Service | Could this be overwhelmed or made unavailable? |
| **E**levation of Privilege | Could someone gain permissions they should not have? |

---

## The 40% Rule

In any commercial application, approximately 40% of backend scope exists for the operator, not users. Plan administrative infrastructure (account management, queue monitoring, storage reporting, subscription lifecycle) as a first-class deliverable from the start.

---

## Git

- **Co-author line:** `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- **Nested repos:** `/commit` detects which repo contains changes. Never commit to the parent repo when changes belong to a nested project repo.

---

## Skills

All skills are defined in `e:\Vibe Coding\.claude\skills\`. Available across all projects:

| Skill | Purpose |
|-------|---------|
| `/q` | Ask clarifying questions before starting work |
| `/ice` | Run an ICE planning session — Intent, Constraints, Expectations |
| `/challenge` | Challenge assumptions from hostile positions |
| `/verify` | Review output critically before accepting |
| `/adversarial-editor` | Stress-test documents and strategies |
| `/newproject` | Create new project folder with git and Claude init |
| `/commit` | Git commit and push (nested-repo aware) |
| `/status` | Brief project status update |

---

## New Projects

1. Create a project-specific `CLAUDE.md` — open with "Inherits from root `CLAUDE.md`."
2. Create `.claude/settings.local.json` for bash permissions if needed.
3. Add the project to `PROJECTS.md`.
4. If documenting for learning, create `HISTORY.md` from the start.
