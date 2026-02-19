# PMPlan — Project Management Plan Builder

## Purpose

PMPlan is the central integration hub of the CoffeeCup suite. It pulls data from all other applications (Gantt Chart, Risk Register, RACI Matrix, Cost Tracker, etc.) to build comprehensive project management plans aligned with the PMBOK 10 Knowledge Areas framework.

**Best For:** Creating formal PM plans for governance, stakeholder reporting, baseline documentation, PMP-certified project managers, organisations requiring PMBOK compliance.

---

## Quick Start

### Creating Your First PM Plan

1. **Set Project Metadata**
   - Click **Settings** (gear icon in header)
   - Enter project name, sponsor, manager
   - Set methodology (Waterfall, Agile, Hybrid, PRINCE2)
   - Choose plan status (Draft, In Review, Approved, Baselined)

2. **Enable Sections**
   - PMPlan shows **Tier 1** sections by default (10 core sections)
   - Click **+ Enable Section** to add Tier 2 or Tier 3 sections
   - Or use **Template Presets** (IT/Software, Construction, Consulting)

3. **Fill in Core Sections**
   - **Project Overview** — Charter, objectives, business case
   - **Scope Statement** — In/out of scope, deliverables, constraints
   - **Success Criteria** — Measurable KPIs

4. **Pull Data from Other Apps**
   - Navigate to sections with integration (e.g., Schedule Summary)
   - Click **Pull Latest** banner
   - PMPlan reads data from Gantt Chart, Risk Register, etc.
   - Review pulled data, edit if needed

5. **Export Plan**
   - Click **Export** button (JSON download)
   - Or **Print** to PDF (browser print dialog)

---

## Features

### Three-Tier Section Architecture

PMPlan organises content into **3 tiers** based on project complexity and industry needs:

#### Tier 1: Core (10 Sections)

**Always visible.** Essential for any project.

| Section | Purpose | Integration |
|---------|---------|-------------|
| **Project Overview** | Charter, objectives, sponsor, dates | Manual entry |
| **Scope Statement** | In/out of scope, deliverables, acceptance criteria | Manual entry |
| **Schedule Summary** | Milestones, critical path | Gantt Chart |
| **Budget Summary** | Total budget, spend, CPI | Cost Tracker |
| **Team & Organisation** | Org chart, key roles | Hierarchy Editor + RACI Matrix |
| **Risk Summary** | Top risks, EMV exposure | Risk Register |
| **Communications Plan** | Stakeholder reporting schedule | RACI Matrix (Consulted/Informed) |
| **Stakeholder Register** | Key stakeholders, influence | Manual entry + Stakeholder Map (future) |
| **Change Management** | Change request process | Change & Issue Register (future) |
| **Success Criteria** | Measurable project success KPIs | Manual entry |

#### Tier 2: Extended (10 Sections)

**Optional.** Add for formal projects requiring detailed documentation.

| Section | Purpose | Integration |
|---------|---------|-------------|
| **Requirements Management** | How requirements are collected, traced | Manual entry |
| **WBS** | Work Breakdown Structure | Hierarchy Editor |
| **Schedule Baseline** | Approved schedule snapshot | Gantt Chart |
| **Cost Baseline** | Time-phased budget | Cost Tracker |
| **Quality Management** | Quality standards, metrics | Quality Register (future) |
| **Resource Calendar** | Team availability, leave | Manual entry |
| **Procurement Plan** | Make-or-buy, vendor selection | Manual entry |
| **Issue Log** | Materialised risks, open issues | Change & Issue Register (future) |
| **Lessons Learned** | Lessons capture approach | Manual entry |
| **Project Closure** | Closure criteria, handover | Manual entry |

#### Tier 3: Specialist (9 Sections)

**Domain-specific.** Add for niche project types.

| Section | Purpose | Best For |
|---------|---------|----------|
| **HSE Plan** | Health, Safety & Environment | Construction, industrial |
| **Compliance Management** | Regulatory requirements | Pharma, finance, public sector |
| **Security Plan** | Data security, access controls | IT, defence, healthcare |
| **Testing Strategy** | Verification & validation | IT/software projects |
| **Benefits Realisation** | How benefits are measured | Programme management, consulting |
| **Earned Value Management** | CPI, SPI, EAC forecasting | EVM Dashboard (future) |
| **Training Plan** | Skills development | HR-focused projects |
| **Configuration Management** | Artefact versioning | Software, engineering |
| **Sustainability Plan** | ESG considerations | Corporate initiatives |

---

### Template Presets

**Purpose:** Quickly enable relevant sections for your industry.

#### General (Default)

- **Enabled:** Tier 1 only (10 core sections)
- **Best For:** Most projects, lightweight governance

#### IT / Software

- **Enabled:** Tier 1 + Testing Strategy, Security Plan, Configuration Management, Requirements Management
- **Best For:** Software development, system implementations

#### Construction

- **Enabled:** Tier 1 + HSE Plan, Procurement, Compliance Management, Quality Management
- **Best For:** Construction, infrastructure, engineering projects

#### Consulting

- **Enabled:** Tier 1 + Benefits Realisation, Lessons Learned, Project Closure, Quality Management
- **Best For:** Management consulting, advisory projects

**How to Use:**
1. Click **Template Presets** dropdown
2. Select preset (IT / Software, Construction, Consulting)
3. Relevant Tier 2/3 sections enable automatically
4. Customise further (enable/disable individual sections)

---

### Integration: Pulling Data from Other Apps

PMPlan is **read-only** for integrated data—it never writes back to source apps.

#### How "Pull Latest" Works

**Workflow:**

1. **User works in Gantt Chart** → Adds activities, sets dependencies
2. **Gantt saves to `localStorage['gantt-project']`**
3. **User opens PMPlan** → Navigate to Schedule Summary section
4. **PMPlan detects stale data** → Displays "Pull Latest" banner
5. **User clicks "Pull Latest"** → PMPlan reads Gantt data, extracts milestones/critical path
6. **Data displays in PMPlan** → User reviews, optionally edits text

**Visual Indicators:**
- **Green checkmark** — Data pulled successfully, timestamp shown
- **Amber warning** — Data available but not pulled yet (stale)
- **Red alert** — Source app has no data (e.g., Gantt Chart never used)

#### Schedule Summary (from Gantt Chart)

**Reads From:** `localStorage['gantt-project']`

**Data Extracted:**
- Project start date, end date (calculated from activities)
- Milestones (zero-duration activities)
- Critical path activities (identified by Gantt's CPM algorithm)
- Total number of activities
- Dependency count

**What Displays:**
- High-level schedule overview table
- Milestone list with dates
- Critical path summary ("15 activities, 8 on critical path")

**Example Display:**

| Milestone | Date | Status |
|-----------|------|--------|
| Project Kickoff | 12 Feb 2026 | Complete |
| Phase 1 Complete | 28 Mar 2026 | On Track |
| Final Delivery | 15 Aug 2026 | Planned |

---

#### Budget Summary (from Cost Tracker)

**Reads From:** `localStorage['cost-project']`

**Data Extracted:**
- Total project budget (cost baseline + reserves)
- Budget by category (Labour, Materials, Equipment, etc.)
- Actual spend to date
- Remaining budget
- Cost Performance Index (CPI)
- Estimate at Completion (EAC)

**What Displays:**
- Budget overview table (planned, actual, variance)
- Contingency reserve status
- EVM metrics (CPI, SPI)

**Example Display:**

| Metric | Value |
|--------|-------|
| Total Budget | £1,000,000 |
| Spent to Date | £450,000 |
| Remaining | £550,000 |
| CPI | 0.92 (8% over budget) |
| EAC | £1,087,000 |

---

#### Risk Summary (from Risk Register)

**Reads From:** `localStorage['risk-register']`

**Data Extracted:**
- Top 5 threats by EMV
- Top 3 opportunities by EMV
- Total pre-action exposure
- Total post-action exposure (after mitigation)
- Risk reduction percentage

**What Displays:**
- Top risks table with EMV values
- Total risk exposure (pre/post)
- Mitigation effectiveness summary

**Example Display:**

| Risk | Type | EMV (Pre) | EMV (Post) | Reduction |
|------|------|-----------|------------|-----------|
| Vendor Delay | Threat | £75,000 | £15,000 | 80% |
| Tech Failure | Threat | £60,000 | £10,000 | 83% |
| Early Completion | Opp | £35,000 | £50,000 | +43% |

---

#### Team & Organisation (from Hierarchy Editor + RACI Matrix)

**Reads From:**
- `localStorage['hierarchy-data']` — Org chart structure
- `localStorage['raci-project']` — Role definitions

**Data Extracted:**
- Org chart nodes (if Hierarchy in "org" mode)
- Key roles from RACI (Responsible, Accountable)
- Reporting lines

**What Displays:**
- Simplified org chart (top 2-3 levels)
- Key roles table (Name, Role, Responsibility)

---

### Manual Entry Sections

**Sections without integration** require manual content entry:

#### Project Overview

**Fields:**
- Project Name
- Project Sponsor
- Project Manager
- Start Date / End Date
- Business Case / Objectives
- High-level deliverables

**Rich Text Editor:**
- Bold, italic, bullet lists, numbered lists
- Headings (H2, H3)
- Auto-saves to localStorage

---

#### Scope Statement

**Fields:**
- In Scope (bullet list)
- Out of Scope (bullet list)
- Deliverables (numbered list)
- Acceptance Criteria (table or bullet list)
- Assumptions (bullet list)
- Constraints (bullet list)

**Example Content:**

**In Scope:**
- Design and development of customer portal
- Integration with CRM system
- User training (2 sessions)

**Out of Scope:**
- Mobile app development (Phase 2)
- Legacy system data migration
- 24/7 support (beyond go-live)

---

### Export & Print

#### Export to JSON

**Purpose:** Backup, version control, sharing with team.

**Steps:**
1. Click **Export** button in header
2. Browser downloads `pmplan-project-YYYY-MM-DD.json`
3. File contains all section content + metadata

**JSON Structure:**
```json
{
  "meta": {
    "name": "Project Phoenix",
    "sponsor": "Jane Doe",
    "manager": "John Smith",
    "methodology": "Agile",
    "status": "Approved"
  },
  "sections": {
    "overview": {
      "content": "Project objectives...",
      "lastPulled": null
    },
    "schedule": {
      "content": "Pulled data from Gantt...",
      "lastPulled": "2026-02-12T10:30:00Z",
      "sourceApp": "gantt-project"
    }
  }
}
```

**Use Cases:**
- Daily backups before major edits
- Version control (Git, Dropbox)
- Sharing with collaborators

---

#### Print to PDF

**Purpose:** Generate formal PM plan document for governance, stakeholders, archives.

**Steps:**
1. Click **Print** button in header (or Ctrl/Cmd+P)
2. Browser print dialog opens
3. Select "Save as PDF" as destination
4. Configure settings:
   - Paper size: A4 or Letter
   - Margins: Normal
   - Include background graphics (for theme colours)
5. Click **Print**

**What Prints:**
- Project metadata (name, sponsor, manager, dates)
- All enabled sections (Tier 1, 2, 3)
- Last pulled timestamps for integrated sections
- Headers/footers with page numbers
- Table of contents (auto-generated from section headings)

**Print Layout:**
- Professional typography (DM Sans font)
- Section headings styled (bold, larger font)
- Tables formatted (borders, cell padding)
- Page breaks before major sections

**Tips:**
- Use **Blueprint theme** for most professional print output
- Click **Pull Latest** on all integrated sections before printing (ensures fresh data)
- Review print preview before saving PDF

---

## PMBOK Knowledge Areas

PMPlan aligns with **PMBOK Guide 7th Edition** knowledge areas:

| PMBOK Knowledge Area | PMPlan Sections |
|----------------------|-----------------|
| **Integration Management** | Project Overview, Change Management |
| **Scope Management** | Scope Statement, WBS, Requirements Management |
| **Schedule Management** | Schedule Summary, Schedule Baseline |
| **Cost Management** | Budget Summary, Cost Baseline, Earned Value Management |
| **Quality Management** | Quality Management |
| **Resource Management** | Team & Organisation, Resource Calendar |
| **Communications Management** | Communications Plan, Stakeholder Register |
| **Risk Management** | Risk Summary |
| **Procurement Management** | Procurement Plan |
| **Stakeholder Management** | Stakeholder Register |

**Compliance:**
PMPlan's structure follows PMBOK best practices, making it suitable for PMP-certified project managers and organisations requiring PMI compliance.

---

## Tips & Best Practices

### When to Create a PM Plan

**Always:**
- Projects with external stakeholders (clients, regulators)
- Projects requiring governance approval
- Large projects (>£500k budget, >6 months duration)

**Optional:**
- Small internal projects (<£50k, <3 months)
- Agile projects with lightweight documentation needs

**Guidance:** If in doubt, create a plan—it's easier to scale down (use Tier 1 only) than to create documentation mid-project.

---

### Section Completion Order

**Recommended Sequence:**

1. **Project Overview** — Foundation (charter, objectives)
2. **Scope Statement** — What's in/out
3. **Schedule Summary** — Pull from Gantt Chart
4. **Budget Summary** — Pull from Cost Tracker
5. **Risk Summary** — Pull from Risk Register
6. **Team & Organisation** — Pull from Hierarchy/RACI
7. **Success Criteria** — Define measurable outcomes
8. **Communications Plan** — Reporting cadence
9. **Stakeholder Register** — Map key stakeholders
10. **Change Management** — Define change process

**Rationale:** Start with high-level (Overview, Scope), then pull integrated data, finish with governance (Change, Stakeholders).

---

### Updating the Plan

**Frequency:**

- **Weekly:** Pull latest data from Gantt, Cost Tracker (if actuals updated)
- **Bi-Weekly:** Review Risk Register, update Risk Summary
- **Monthly:** Full plan review, update all sections
- **Milestone Reviews:** Pull all data, export to PDF, present to stakeholders

**Version Control:**

- Export JSON after each major update
- Naming convention: `pmplan-project-phoenix-v1.2-2026-02-15.json`
- Store in project folder or Git repository

**Baseline Management:**

- After plan approval, create **Baseline** (PMPlan settings)
- Baseline locks current content for performance measurement
- Future changes compared against baseline

---

### Governance Workflows

**Draft → In Review → Approved → Baselined**

**Draft:**
- Work-in-progress
- Not yet shared with stakeholders
- Frequent edits, data pulls

**In Review:**
- Sent to stakeholders for review
- Minor edits only (typos, clarifications)
- No major scope/schedule changes

**Approved:**
- Stakeholders have signed off
- Ready for baselining
- No further edits without change control

**Baselined:**
- Formal baseline created (snapshot)
- All future changes tracked as variances
- Used for EVM performance measurement

**How to Set Status:**
1. Settings → Plan Status dropdown
2. Select status (Draft, In Review, Approved, Baselined)
3. Status badge displays in header

---

### Integration Best Practices

1. **Pull Fresh Data Before Exporting**
   - Click "Pull Latest" on all integrated sections
   - Ensures plan reflects current project state

2. **Review Pulled Data**
   - PMPlan pulls raw data (milestones, EMVs)
   - Add narrative context (e.g., "Risk A is mitigated by...")
   - Edit pulled content for stakeholder clarity

3. **Don't Over-Pull**
   - Pulling daily creates noise (minor changes)
   - Pull weekly or before major reviews

4. **Document Integration Assumptions**
   - "Schedule based on Gantt data as of 12 Feb 2026"
   - If Gantt changes, note may be stale

---

## Troubleshooting

### "Pull Latest" shows no data

**Cause:** Source app (Gantt, Risk Register, etc.) has no saved data.

**Solution:**
1. Open source app (e.g., Gantt Chart)
2. Verify data exists (activities, risks, etc.)
3. Save data (localStorage auto-save should work)
4. Return to PMPlan, try pulling again

**Check localStorage:**
```javascript
// In browser console:
console.log(localStorage.getItem('gantt-project'));
```
If `null`, source app has no data.

---

### Pulled data looks incorrect

**Cause:** Source app data structure changed, or PMPlan integration code outdated.

**Solution:**
1. Export source app data (JSON)
2. Inspect JSON structure
3. Compare with PMPlan integration code (see INTEGRATION.md for expected structure)
4. If mismatch, update source app or PMPlan

---

### Sections don't enable

**Cause:** JavaScript error or localStorage corruption.

**Solution:**
1. Hard refresh (Ctrl+F5 / Cmd+Shift+R)
2. Check browser console (F12) for errors
3. Clear localStorage, reload PMPlan (lose current data—export first!)

---

### Print layout is broken

**Cause:** Browser print CSS not loading, or theme incompatibility.

**Solution:**
1. Switch to **Blueprint theme** (most print-friendly)
2. Use Chrome or Edge (best print support)
3. Ensure "Background graphics" enabled in print settings
4. Try landscape orientation for wide tables

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + S** | Auto-save (triggers localStorage update) |
| **Ctrl/Cmd + P** | Print plan to PDF |
| **Ctrl/Cmd + E** | Export to JSON |
| **Esc** | Close settings panel |

---

## Technical Notes

### LocalStorage Key

**Primary Key:** `pmplan-project`

**Data Structure:**
```json
{
  "meta": {
    "name": "Project Phoenix",
    "sponsor": "Jane Doe",
    "manager": "John Smith",
    "startDate": "2026-02-12",
    "endDate": "2026-08-15",
    "methodology": "Agile",
    "status": "Approved",
    "created": "2026-02-01T10:00:00Z",
    "modified": "2026-02-12T14:30:00Z"
  },
  "enabledSections": ["overview", "scope", "schedule", "budget", "risk", "team", "comms", "stakeholders", "change", "success"],
  "sections": {
    "overview": {
      "content": "<rich text HTML>",
      "lastModified": "2026-02-10T09:00:00Z"
    },
    "schedule": {
      "content": "Pulled from Gantt Chart...",
      "lastPulled": "2026-02-12T10:30:00Z",
      "sourceApp": "gantt-project",
      "sourceData": { /* cached Gantt data */ }
    }
  },
  "baselines": [
    {
      "id": "baseline-1",
      "name": "Approved Plan v1.0",
      "created": "2026-02-05T12:00:00Z",
      "snapshot": { /* full plan content at baseline time */ }
    }
  ]
}
```

---

## See Also

- [Gantt Chart](gantt-chart.md) — Schedule data source
- [Risk Register](risk-register.md) — Risk data source
- [Cost Tracker](cost-tracker.md) — Budget data source
- [RACI Matrix](raci-matrix.md) — Team & communications data
- [Hierarchy Editor](hierarchy-editor.md) — Org chart & WBS
- [INTEGRATION.md](../INTEGRATION.md) — Technical integration details
- [OVERVIEW.md](../OVERVIEW.md) — Suite introduction

---

*PMPlan: PMBOK-aligned project management plan builder with live integration from all CoffeeCup apps. Built with React 18.*
