# Change & Issue Register

## Purpose

Combined change request and issue log with status workflows, impact assessment, and dashboard analytics for project governance and control.

**Best For:** Change control, issue tracking, governance, audit trails, CCB decision support.

**Status:** Complete

**localStorage Key:** `changelog-project`

---

## Quick Start

1. **Open the Register tab** — this is the default view
2. **Click Add Change or Add Issue** — a new item appears in the table with an expanded form
3. **Fill in details** — title, description, priority, category, owner, due date
4. **Save** — the item appears in the register table
5. **Progress the status** — expand the row, change the status dropdown, save again
6. **Switch to Dashboard** — view analytics, charts, and KPIs across all items

---

## Features

### Register Tab

The primary workspace — a filterable, sortable table of all change requests and issues.

#### Adding Items

Click **Add Change** or **Add Issue** in the toolbar. A new row is created and expanded for editing. Each item gets an auto-generated ID based on the configured prefix:

- Change requests: `CR-001`, `CR-002`, etc.
- Issues: `IS-001`, `IS-002`, etc.

Prefixes are configurable in Settings (e.g., change to `CHG` or `BUG`).

#### Item Fields

| Field | Purpose | Notes |
|-------|---------|-------|
| **ID** | Unique identifier | Auto-generated, read-only |
| **Title** | Brief description | Displayed in table |
| **Type** | Change Request or Issue | Determines available statuses |
| **Status** | Current workflow state | See workflows below |
| **Priority** | Critical, High, Medium, Low | Colour-coded badges |
| **Category** | Classification | From configurable list (default: Scope, Schedule, Cost, Quality, Resource, Technical) |
| **Raised By** | Person who submitted | Free text |
| **Raised Date** | Date submitted | Defaults to today |
| **Owner** | Person responsible | Free text |
| **Due Date** | Target completion | Used for overdue calculation |
| **Description** | Detailed explanation | Full-width text area |
| **Impact Assessment** | Scope, schedule, cost, quality impact | PM methodology field |
| **Resolution / Decision** | Outcome rationale | Filled when closing |
| **Notes** | Additional context | Free text |

#### Change Request Workflow

```
Submitted → Under Review → Approved → Implemented
                        ↘ Rejected
```

1. **Submitted** — Change request raised, awaiting review
2. **Under Review** — Change Control Board (CCB) evaluating impact
3. **Approved** — CCB authorises the change
4. **Rejected** — CCB declines; reason documented in Resolution field
5. **Implemented** — Change completed and deployed

**Terminal statuses:** Implemented and Rejected automatically set the closed date to today.

#### Issue Workflow

```
Open → In Progress → Resolved → Closed
```

1. **Open** — Issue logged, unassigned
2. **In Progress** — Being worked on
3. **Resolved** — Fix implemented
4. **Closed** — Verified and formally signed off

**Terminal statuses:** Resolved and Closed automatically set the closed date.

#### Sorting and Filtering

**Sort** by clicking any column header — click once for ascending, again for descending. A ▲ or ▼ indicator shows the active sort direction.

**Filter** using the toolbar controls:

| Filter | Options |
|--------|---------|
| **Search** | Real-time text search across title, description, owner, raised by, and ID |
| **Type** | All Types, Changes, Issues |
| **Status** | All Statuses, or type-specific statuses |
| **Priority** | All Priorities, Critical, High, Medium, Low |

Filters combine — you can search for "server" within Critical Issues simultaneously. The status bar shows "Showing X of Y items".

#### Expanding and Editing

Click any table row or the chevron button to expand the inline edit form. All fields are editable. Click **Save** to persist changes or **Cancel** to discard. The **Delete** button (with confirmation) removes the item permanently.

---

### Dashboard Tab

Switch to the Dashboard tab for visual analytics across all items.

#### Metrics Cards

Six KPI cards at the top:

| Metric | What It Shows |
|--------|---------------|
| **Total Open** | Active items not in a terminal status |
| **Changes Pending** | Change requests in Submitted or Under Review |
| **Issues Open** | Issues in Open or In Progress |
| **Approval Rate** | Percentage of decided change requests that were approved (green if ≥ 50%, red if < 50%) |
| **Avg Resolution** | Average days from raised date to closed date |
| **Overdue** | Open items past their due date (red if > 0) |

#### Charts

Four Chart.js visualisations in a 2×2 grid:

1. **Status Breakdown** (Doughnut) — Count of items per status, colour-coded
2. **Priority Distribution** (Doughnut) — Count per priority level
3. **Category Breakdown** (Horizontal Bar) — Changes vs Issues per category, side-by-side
4. **Items Over Time** (Line) — Cumulative raised vs closed items by month

---

### Settings Panel

Click the gear icon in the header to open the settings drawer.

#### Project
- **Project Name** — optional metadata label

#### ID Prefixes
- **Change Requests** — prefix for new change IDs (default: `CR`, max 4 characters, uppercase)
- **Issues** — prefix for new issue IDs (default: `IS`, max 4 characters, uppercase)

Changing prefixes only affects newly created items. Existing IDs are not renamed.

#### Categories
- View, add, and remove categories
- Default set: Scope, Schedule, Cost, Quality, Resource, Technical
- Categories appear in the Category dropdown when editing items

---

## PM Methodology: Change Control

### What Is Change Control?

Change control is a formal process for managing modifications to a project's scope, schedule, cost, or quality baselines. Without it, projects experience "scope creep" — uncontrolled growth that erodes schedules and budgets.

### The Change Control Board (CCB)

A CCB is a group of stakeholders with authority to approve or reject change requests. Typical structure:

- **Project Manager** — approves changes under threshold (e.g., < £10,000)
- **Project Sponsor** — approves larger changes
- **Technical Lead** — assesses feasibility

### Impact Assessment

Every change request should document impact across four dimensions:

- **Cost Impact** — Budget increase or decrease
- **Schedule Impact** — Days of delay or acceleration
- **Scope Impact** — What is added, removed, or modified
- **Quality Impact** — Any degradation or improvement in standards

The Impact Assessment field captures this analysis for CCB review.

### Issue vs Change vs Risk

| Concept | Timing | Example |
|---------|--------|---------|
| **Risk** | Hasn't happened yet | "Server vendor might increase prices" |
| **Issue** | Has happened | "Server vendor increased prices by 20%" |
| **Change** | Proposed modification | "Switch to alternative vendor to reduce cost" |

When a risk materialises, log it as an issue. If the issue requires a change to baselines, raise a change request. This traceability is key to project governance.

---

## Integration with PMPlan

PMPlan pulls from the Change & Issue Register to populate:

- **Change Management** section — recent change requests, approval statistics
- **Issue Log** section — open issues, critical issues requiring action

**localStorage key:** `changelog-project`

---

## Import and Export

### Export
Click the **Save JSON** button (download icon) in the Register toolbar. Downloads the full project as a `.json` file including all items and settings.

### Import
Click the **Load JSON** button (upload icon). Select a previously exported `.json` file. The file must contain a valid `items` array. All filters reset after import.

### Clear All
Click the trash icon button. Requires confirmation. Resets the project to default state with no items.

---

## Tips and Best Practices

**Define Approval Thresholds:** Establish clear rules — e.g., PM approves changes under £10,000, Sponsor approves above. Document this in the Impact Assessment field.

**Baseline Comparison:** Changes are measured against the original baseline, not the current plan. If you've already accepted 3 changes adding 15 days, the next change is still measured against the original schedule.

**Link Issues to Risks:** If Risk R-005 materialises, log it as Issue IS-012 and reference the risk ID in the description. This creates an audit trail from identification through resolution.

**Close Items Promptly:** Open items on status reports erode confidence. Move resolved issues to Closed after verification. Don't leave them in limbo.

**Use Categories Consistently:** Align categories with your WBS or PMBOK knowledge areas so reporting aggregates meaningfully.

---

## Troubleshooting

**Q: My status options changed when I switched the type.**
A: Change requests and issues have different status workflows. Switching type resets the status to the first option for that type.

**Q: The closed date appeared automatically.**
A: Moving an item to a terminal status (Implemented, Rejected, Resolved, Closed) automatically sets the closed date to today. Moving it back clears the closed date.

**Q: I changed the prefix but existing IDs didn't update.**
A: Prefixes only affect newly created items. Existing IDs are permanent to maintain traceability.

**Q: The approval rate shows a dash.**
A: The approval rate only calculates when at least one change request has reached a decision (Approved, Rejected, or Implemented). It excludes items still in Submitted or Under Review.

---

*Change & Issue Register: Governance for change requests and issue tracking with dashboard analytics.*
