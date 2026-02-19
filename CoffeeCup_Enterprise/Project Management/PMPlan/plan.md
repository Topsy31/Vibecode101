# PMPlan — Project Management Plan Template App

## Overview

PMPlan is a CoffeeCup application that serves as a **central hub** for building comprehensive project management plans. It aggregates data from the other CoffeeCup tools (Gantt, Kanban, Risk Register, Hierarchy Editor, Delphi, RACI) into a structured, professional PM plan document.

The app follows the **PMBOK 10 Knowledge Areas** structure as its primary framework, with **progressive disclosure** to scale from simple plans (~8 core sections) to full enterprise plans (~50+ sections). The UX uses a **sidebar navigation + dashboard** pattern.

---

## Architecture

### Framework: PMBOK 10 Knowledge Areas

The plan structure maps directly to the PMBOK 6th Edition subsidiary management plans:

| # | Knowledge Area | Subsidiary Plan | CoffeeCup Integration |
|---|---------------|-----------------|----------------------|
| 1 | **Integration** | Project Charter / Overview | — (standalone) |
| 2 | **Scope** | Scope Management Plan | Hierarchy (WBS view) |
| 3 | **Schedule** | Schedule Management Plan | **Gantt Chart** (live pull) |
| 4 | **Cost** | Cost Management Plan | Gantt (resource costs) |
| 5 | **Quality** | Quality Management Plan | — (standalone) |
| 6 | **Resource** | Resource Management Plan | **Hierarchy** (org chart), **RACI** |
| 7 | **Communications** | Communications Management Plan | RACI (informed parties) |
| 8 | **Risk** | Risk Management Plan | **Risk Register**, **Delphi** |
| 9 | **Procurement** | Procurement Management Plan | — (standalone, optional) |
| 10 | **Stakeholder** | Stakeholder Engagement Plan | Hierarchy, RACI |

Plus cross-cutting:
- **Change Management Plan** — standalone
- **Baselines** (Scope, Schedule, Cost) — pulled from Gantt + manual input

### Integration Strategy: Live Pull from localStorage

PMPlan reads data from other CoffeeCup apps' localStorage keys in real-time:

| Source App | localStorage Key | Data Pulled |
|-----------|-----------------|-------------|
| Gantt Chart | `gantt-project` | Activities, milestones, dependencies, critical path, schedule baseline |
| Kanban Board | `kanban-project` | Task statuses, assignments, backlog items, WIP |
| Risk Register | `risk-register` | Risk list, probability/impact, EMV, response strategies, owners |
| Hierarchy Editor | `hierarchy-data` | Org structure, roles, reporting lines |
| Delphi Tool | `delphi-studies` | Expert estimates, consensus data, identified risks |
| RACI Matrix | `raci-project` | Roles, task groups, responsibility assignments (R/A/C/I per task), notes |
| Cost Tracker | `cost-project` | Budget categories, line items, transactions, EVM metrics (BAC, AC, CPI, EAC), contingency status, time-phased data, baselines |
| Stakeholder Map | `stakeholder-project` | Stakeholder names, roles, power/interest scores, quadrant engagement strategies |

**Behaviour when source data is absent:** Section shows an empty state with a link to open the relevant CoffeeCup app, plus the option to enter data manually.

**Behaviour when source data exists:** Section auto-populates with a summary view. User can override/annotate the pulled data without modifying the source.

---

## Progressive Disclosure — Section Tiers

### Tier 1: Core Sections (shown by default)

These 10 sections form the minimum viable PM plan:

1. **Project Overview** — Name, description, objectives, sponsor, PM, start/end dates, business justification
2. **Scope Statement** — In-scope, out-of-scope, deliverables, acceptance criteria, assumptions, constraints
3. **Schedule Summary** — Milestones, key dates, critical path (pulled from Gantt)
4. **Budget Summary** — Total budget, cost breakdown by phase/category, contingency reserves
5. **Team & Organisation** — Org chart, key roles and responsibilities (pulled from Hierarchy + RACI)
6. **Risk Summary** — Top risks with ratings and response strategies (pulled from Risk Register)
7. **Communications Plan** — Stakeholder reporting schedule, meeting cadence, escalation procedures
8. **Stakeholder Register** — Key stakeholders, their interests, influence level, engagement strategy
9. **Change Management** — Change request process, approval authority, impact assessment approach
10. **Success Criteria** — Measurable criteria for project success, KPIs

### Tier 2: Extended Sections (user-enabled)

These sections appear when the user toggles them on via settings:

11. **Requirements Management** — How requirements are collected, documented, traced
12. **WBS / Work Breakdown Structure** — Hierarchical decomposition (pulled from Hierarchy or manual)
13. **Schedule Baseline** — Approved schedule model (snapshot from Gantt)
14. **Cost Baseline** — Time-phased budget, funding requirements
15. **Quality Management Plan** — Standards, QA activities, control methods, metrics
16. **Resource Calendar** — Team availability, leave, resource conflicts
17. **Procurement Plan** — Make-or-buy, vendor selection, contract types
18. **Issue Log** — Tracking materialised risks and open issues
19. **Lessons Learned** — Approach to capturing and applying lessons
20. **Project Closure** — Closure criteria, handover procedures, final report

### Tier 3: Specialist Sections (industry/methodology specific)

Available via a "Add Section" menu:

21. **HSE Plan** (Health, Safety & Environment) — construction/industrial
22. **Compliance Management** — regulated industries
23. **Security Plan** — IT/data projects
24. **Testing Strategy** — software/IT projects
25. **Benefits Realisation** — government/strategic programmes
26. **Earned Value Management** — formal performance measurement
27. **Training Plan** — change-heavy projects
28. **Configuration Management** — complex deliverables
29. **Sustainability Plan** — ESG-conscious organisations
30. **Custom Section** — user-defined title and content

---

## UX Design

### Layout: Sidebar + Dashboard

```
+----------------------------------------------------------+
|  [Icon] PMPlan — Project Management Plan    [Theme] [Gear] |
+----------+-----------------------------------------------+
|          |                                               |
| SIDEBAR  |              MAIN CONTENT AREA                |
|          |                                               |
| Dashboard|  (Dashboard / Section Editor / Preview)       |
| -------- |                                               |
| Overview |                                               |
| Scope    |                                               |
| Schedule |                                               |
| Budget   |                                               |
| Team     |                                               |
| Risk     |                                               |
| Comms    |                                               |
| Stakeh.  |                                               |
| Change   |                                               |
| Success  |                                               |
| -------- |                                               |
| + More   |                                               |
| -------- |                                               |
| Settings |                                               |
| Export   |                                               |
+----------+-----------------------------------------------+
```

### Sidebar Behaviour

- **Fixed left sidebar** (~240px width, collapsible to icon-only ~60px)
- **Section indicators**: Empty (grey dot), In Progress (amber dot), Complete (green dot)
- **Grouped sections**: Core sections always visible, extended sections in a collapsible "More" group
- **Active section highlighted** with accent colour
- **Drag-and-drop reordering** of sections

### Dashboard (Home View)

The dashboard provides a plan health overview:

- **Plan Completeness** — progress bar/ring showing % of sections completed
- **Section Status Grid** — cards for each section showing status (empty/draft/complete)
- **Integration Status** — which CoffeeCup apps have data available to pull
- **Quick Stats** — total risks, total budget, team size, milestones remaining
- **Recent Activity** — last edited sections with timestamps

### Section Editor

Each section has a consistent editing pattern:

1. **Section Header** — title, description of what this section covers
2. **Integration Banner** (if applicable) — "Data available from [Gantt Chart]. Pull latest?" with a refresh button
3. **Content Area** — a mix of:
   - **Structured fields** (text inputs, dropdowns, date pickers) for key data
   - **Rich text blocks** for narrative descriptions
   - **Tables** for structured data (risk register summary, RACI excerpt, stakeholder list)
   - **Embedded visualisations** from source apps (mini Gantt timeline, risk heat map)
4. **Section Notes** — internal notes/comments (not included in export)

### Preview Mode

A read-only, scrolling-document view of the complete plan:
- Professional formatting matching export output
- Table of contents with clickable links
- Page break indicators
- "Edit this section" links that jump back to the editor

---

## Data Model

### Plan Object (localStorage key: `pmplan-project`)

```
{
  meta: {
    name: string,
    version: string,
    created: ISO date,
    modified: ISO date,
    author: string,
    status: "Draft" | "In Review" | "Approved" | "Baselined"
  },
  settings: {
    theme: "blueprint" | "fun" | "dark" | "traditional",
    enabledSections: string[],       // IDs of Tier 2/3 sections the user has enabled
    sectionOrder: string[],          // custom ordering of all sections
    complexity: "simple" | "standard" | "enterprise"
  },
  sections: {
    [sectionId]: {
      id: string,
      status: "empty" | "draft" | "complete",
      lastModified: ISO date,
      fields: { [fieldName]: any },  // structured data
      narrative: string,             // rich text content
      notes: string,                 // internal notes
      integrationSource: string | null,  // which app data was pulled from
      integrationTimestamp: ISO date | null
    }
  }
}
```

### Section Field Definitions

Each section type has a defined schema of fields. Example for **Project Overview**:

```
overview: {
  projectName: string,
  projectDescription: text,
  objectives: text[],
  sponsor: string,
  projectManager: string,
  startDate: date,
  endDate: date,
  businessJustification: text,
  methodology: "Waterfall" | "Agile" | "Hybrid" | "PRINCE2",
  successCriteria: text[]
}
```

---

## Integration Detail

### How Live Pull Works

1. On section load, PMPlan checks the relevant localStorage key
2. If data exists, a **blue integration banner** appears: "Schedule data available from Gantt Chart (last saved: 2 hours ago). [Pull Latest] [Dismiss]"
3. Clicking "Pull Latest" reads the source data, transforms it into the section's field format, and populates fields
4. User can then **edit, annotate, or override** pulled data — their changes are saved to the PMPlan data model, not back to the source app
5. A "Re-pull" option warns if user has manual overrides that would be replaced
6. If source data doesn't exist, the section shows a normal empty state with an option to open the source app or enter data manually

### Integration Mappings

**Gantt --> Schedule Summary:**
- Activities list --> milestone table
- Start/end dates --> schedule summary
- Dependencies --> critical path narrative
- Progress % --> schedule health indicator

**Risk Register --> Risk Summary:**
- Top N risks by EMV --> risk summary table
- Probability/Impact matrix --> embedded heat map
- Response strategies --> response plan table
- Risk owners --> cross-referenced with RACI

**Hierarchy --> Team & Organisation:**
- Org tree --> embedded org chart visualisation
- Roles --> role descriptions table
- Reporting lines --> governance structure

**RACI --> Team & Organisation + Communications:**
- R/A assignments --> responsibility summary
- C/I parties --> communications distribution list

**Kanban --> Dashboard stats:**
- Task counts by status --> progress indicators
- Blocked items --> issue log

**Delphi --> Risk + Schedule:**
- Consensus estimates --> schedule/cost estimates with confidence levels
- Identified risks --> added to risk summary

**Cost Tracker --> Budget Summary:**
- Categories + line items --> cost breakdown table (planned + actual columns)
- EVM metrics (BAC, AC, CPI, EAC) --> metrics summary panel
- Contingency used/remaining --> reserves status
- Total budget (cost estimate + contingency + mgmt reserve) --> total budget field

**Cost Tracker --> Cost Baseline:**
- PMBOK cost hierarchy (cost estimate → contingency → baseline → mgmt reserve → total) --> structured display
- Time-phased periods (PV, AC, EV per month) --> time-phased table
- Baseline snapshots --> baseline list with dates
- Variance summary (CPI, CV, EAC) --> variance banner

**Stakeholder Map --> Stakeholder Register:**
- Stakeholder names and roles --> stakeholder register table
- Power/interest scores --> influence/interest level (High/Medium/Low)
- Quadrant engagement --> engagement strategy column

---

## Theming

Follows the standard CoffeeCup 4-theme system:

- **Architectural Blueprint** (default) — warm cream, brown accents, grid background
- **Fun & Vibrant** — purple-pink gradient, magenta accents, rounded corners, Nunito font
- **Dark Mode** — near-black background, indigo accents, enhanced shadows
- **Traditional/Classic** — light grey, Bootstrap blue accents, Segoe UI, sharp corners

All CSS via custom properties (`data-theme` attribute). Theme persisted in `settings.theme`.

---

## Export

### Primary Formats: PDF + Word

Both formats produce **professional, branded documents** with:

- **Cover page** — project name, date, author, status (Draft/Approved/Baselined), organisation logo placeholder
- **Auto-generated Table of Contents** — with page numbers, clickable in PDF
- **Section headers/footers** — project name, section title, page X of Y
- **Page breaks** — each major section starts on a new page
- **Landscape pages** — for wide content (Gantt timeline, RACI matrix, budget tables)
- **Section-selective export** — user chooses which sections to include via a checklist dialog
- **Watermark option** — "DRAFT" / "CONFIDENTIAL" / custom text

#### PDF Export

- **Library:** html2pdf.js via CDN (wraps html2canvas + jsPDF)
- Renders from the Preview mode HTML, ensuring WYSIWYG fidelity
- Embedded visualisations (mini Gantt, risk heat map, org chart) render as images
- Supports A4 and Letter page sizes
- Colour output by default, with a "Print-friendly" option (reduced colour, no backgrounds)

#### Word (.docx) Export

- **Library:** docx.js via CDN
- Generates a real `.docx` file (not HTML-disguised-as-Word)
- Maintains heading hierarchy for Word's built-in navigation pane and TOC generation
- Tables are native Word tables (editable, sortable)
- Styled with a professional template: consistent fonts, heading styles, table borders
- Users can edit, track changes, and add comments in Word after export

### Secondary Formats

- **JSON export/import** — full plan data for backup, sharing, and restoring (consistent with other CoffeeCup apps)
- **HTML export** — self-contained HTML snapshot of the preview mode with inline styles (for intranet/email sharing)

### Future Formats (Phase 5+)

- **Excel (.xlsx)** via SheetJS — tabular sections only (risk register, budget, RACI, stakeholder register) as separate worksheets
- **PowerPoint (.pptx)** via PptxGenJS — auto-generated executive summary deck (1 slide per section with key data points)

---

## Build Plan

### Phase 1: Foundation
- [ ] App shell with sidebar navigation and dashboard
- [ ] Theme system (4 themes, persistence)
- [ ] Plan data model and localStorage persistence
- [ ] Section editor framework (field types, narrative blocks)

### Phase 2: Core Sections
- [ ] Project Overview section
- [ ] Scope Statement section
- [ ] Schedule Summary section (with Gantt integration)
- [ ] Budget Summary section
- [ ] Team & Organisation section (with Hierarchy integration)
- [ ] Risk Summary section (with Risk Register integration)
- [ ] Communications Plan section
- [ ] Stakeholder Register section
- [ ] Change Management section
- [ ] Success Criteria section

### Phase 3: Integration
- [ ] Live pull from Gantt Chart
- [ ] Live pull from Risk Register
- [ ] Live pull from Hierarchy Editor
- [ ] Live pull from RACI Matrix (when RACI app exists)
- [ ] Live pull from Delphi Tool
- [ ] Live pull from Kanban Board
- [x] Live pull from Cost Tracker (Budget Summary + Cost Baseline sections)
- [x] Live pull from Stakeholder Map (Stakeholder Register section)
- [ ] Integration status indicators on dashboard

### Phase 4: Extended Features
- [ ] Tier 2 section toggle (enable/disable)
- [ ] Tier 3 specialist sections
- [ ] Custom section creation
- [ ] Section drag-and-drop reordering
- [ ] Preview mode (scrolling document view)

### Phase 5: Export
- [ ] JSON export/import
- [ ] Preview mode (print-optimised scrolling document)
- [ ] Section-selective export dialog
- [ ] PDF export with cover page, TOC, page numbers (html2pdf.js)
- [ ] Word (.docx) export with heading hierarchy and native tables (docx.js)
- [ ] HTML self-contained export
- [ ] Watermark option (Draft/Confidential)

### Phase 6: Polish (future)
- [ ] Excel export for tabular sections (SheetJS)
- [ ] PowerPoint executive summary deck (PptxGenJS)
- [ ] Plan comparison (diff between versions)
- [ ] Custom branding (logo upload, colour overrides for export)

---

## Technical Constraints

- **Two files: `index.html` + `styles.css`** — CSS separated for maintainability at this scale; JS stays inline (React/Babel in-browser compilation). No build step.
- **React 18 via CDN** + Babel standalone
- **Tailwind CSS via CDN**
- **Google Fonts**: DM Sans, JetBrains Mono, Nunito
- **No external UI frameworks** — roll own components using CSS custom properties
- **localStorage** for all persistence
- **Inline SVG icons** with `currentColor`
- **British English** throughout (organisation, summarise, colour, etc.)

---

## Design Decisions (Resolved)

1. **RACI** — Build as a **separate CoffeeCup app** in the existing `RACI/` folder. PMPlan integrates via live pull, keeping the modular architecture consistent across the suite.

2. **Rich text editing** — **Lightweight rich text** for narrative sections: bold, italic, bullet lists, numbered lists, headings. Sufficient for professional documents without the complexity of a full WYSIWYG editor. Consider a lightweight library (e.g., Tiptap via CDN, or a minimal contenteditable implementation).

3. **Plan versioning** — **Basic manual versioning**. A "Save Version" button creates a named snapshot stored in localStorage. Users can view past versions and compare. Supports the PMBOK concept of baselining the plan at key milestones.

4. **Template presets** — **3-4 pre-built presets** for common project types:
   - **General** — core sections only, minimal guidance
   - **IT / Software** — adds Testing Strategy, Security Plan, Configuration Management
   - **Construction** — adds HSE Plan, Procurement Plan, Compliance Management
   - **Consulting** — adds Benefits Realisation, Knowledge Transfer, Client-specific stakeholder guidance

   Each preset configures which sections are enabled and pre-fills section descriptions with relevant guidance text.

5. **Collaboration** — JSON export/import for sharing (consistent with other CoffeeCup apps). No real-time collaboration in Phase 1.
