# RACI Matrix

## Purpose

Responsibility Assignment Matrix builder supporting RACI, RASCI, and DACI frameworks for clarifying who does what in projects.

**Best For:** Role clarity, accountability mapping, communications planning, stakeholder engagement.

---

## Quick Start

1. **Choose Framework** — RACI, RASCI, or DACI
2. **Add Roles** — Columns (e.g., Project Manager, Developer, QA Lead)
3. **Add Tasks** — Rows (e.g., Requirements Gathering, Development, Testing)
4. **Assign Responsibilities** — Click cell → Select R/A/C/I

---

## Features

### Frameworks Explained

#### RACI

| Letter | Meaning | Description |
|--------|---------|-------------|
| **R** | Responsible | Does the work |
| **A** | Accountable | Ultimately answerable (one per task) |
| **C** | Consulted | Provides input (two-way communication) |
| **I** | Informed | Kept updated (one-way communication) |

**Rule:** Each task must have exactly one **A** (Accountable), at least one **R** (Responsible).

#### RASCI

Adds **S = Supportive** (provides resources but doesn't do the work).

**Use When:** Need to distinguish between support roles and doers.

#### DACI

Different model:
- **D** = Driver (leads the work)
- **A** = Approver (makes final decision)
- **C** = Contributor (provides input)
- **I** = Informed (kept updated)

**Use When:** Decision-making focus (tech companies often use DACI).

---

### Building the Matrix

**Adding Roles:**
- Click "+ Add Role"
- Enter role name (e.g., "Senior Developer")
- Optionally assign person (e.g., "John Smith")

**Adding Tasks:**
- Click "+ Add Task"
- Enter task name (e.g., "API Design")

**Assigning Responsibilities:**
- Click cell intersection (Role × Task)
- Select R, A, C, or I
- Cell updates with letter

**Visual Coding:**
- **R** = Blue
- **A** = Red (bold)
- **C** = Green
- **I** = Grey

---

### Role Grouping

**Feature:** Group roles by department or team.

**Example:**
- **Development Team:** Developer 1, Developer 2, Tech Lead
- **QA Team:** QA Lead, Tester 1
- **Management:** Project Manager, Sponsor

**Use Case:** Large matrices (20+ roles) become manageable.

---

## Integration with PMPlan

**Pulls:**
- Team & Organisation (key roles)
- Communications Plan (Consulted/Informed parties for reporting)
- Stakeholder Register (Accountable parties mapped to stakeholders)

**Use Case:** PMPlan shows "Who to consult for schedule changes" (pulls C roles for schedule-related tasks).

---

## Tips

**One Accountable:** If multiple people are accountable, task ownership is ambiguous. Split task or clarify.

**Avoid Too Many C's:** If 10 people are consulted, decision-making slows. Aim for 2-3 C's per task.

**Informed ≠ Responsible:** Don't make everyone "I" (creates email noise). Only inform those who need to know.

**Review Quarterly:** As project evolves, roles change—update matrix.

---

## Common Pitfalls

**Pitfall:** Everyone is "C" (Consulted) → Decisions take forever.

**Solution:** Limit C to 2-3 key people. Others can be "I" (Informed).

**Pitfall:** No one is "A" (Accountable) → Task falls through cracks.

**Solution:** Every task must have exactly one A.

**Pitfall:** R and A are always the same person → RACI adds no value.

**Solution:** Split responsibilities (PM is A for deliverables, Developer is R for coding).

---

*RACI Matrix: Responsibility assignment with RACI, RASCI, and DACI frameworks.*
