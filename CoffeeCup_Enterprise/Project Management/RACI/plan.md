# RACI Matrix Builder — Application Plan

## Overview

A single-page React application (CoffeeCup-style) that helps project managers create, edit, validate, export, and print RACI responsibility assignment matrices. Inherits the CoffeeCup design system: 4 CSS themes, right-hand settings blade, localStorage persistence, CDN-loaded React 18 + Tailwind + Babel.

---

## 1. What is a RACI Matrix?

A **Responsibility Assignment Matrix** (RAM) maps **tasks/deliverables** (rows) against **roles/people** (columns). Each cell contains a code indicating that role's responsibility level for that task.

### Standard RACI Codes

| Code | Name | Meaning |
|------|------|---------|
| **R** | Responsible | Does the work. Multiple Rs allowed per task. |
| **A** | Accountable | Owns the outcome. Signs off. **Exactly one per task.** |
| **C** | Consulted | Two-way communication — provides input before/during work. |
| **I** | Informed | One-way communication — notified of progress/completion. |

---

## 2. RACI Variations & Extended Frameworks

Research reveals 17+ documented variations. The most commonly used in practice are:

| Framework | Roles | Best For |
|-----------|-------|----------|
| **RACI** | Responsible, Accountable, Consulted, Informed | General purpose; most widely understood |
| **RASCI** | + **S**upport | Projects needing explicit helper roles |
| **RACI-VS** | + **V**erifier, **S**ignatory | Regulated industries, compliance, audit trails |
| **RACIO / CAIRO** | + **O**mitted | Explicitly excluding roles from tasks |
| **RAPID** | Recommend, Agree, Perform, Input, Decide | Decision-making clarity in matrix organisations |
| **DACI** | Driver, Approver, Contributor, Informed | Agile/tech environments |
| **CARS** | Communicate, Approve, Responsible, Support | Action-oriented teams |
| **CLAM** | Contribute, Lead, Approve, Monitor | Highly collaborative projects |

### Design Decision: Support Multiple Frameworks

The app should offer **preset frameworks** (RACI, RASCI, RACI-VS, RACIO, DACI, RAPID, CARS, CLAM) PLUS the ability for users to **define custom responsibility codes**. This accommodates:

- Industry-specific terminology
- Organisational preferences
- Hybrid frameworks (e.g., RACI + Quality Review)
- User-invented codes for niche contexts

### Implementation Approach

- **Framework selector** in settings blade: dropdown to choose a preset, which auto-populates the available codes
- **Custom codes section**: users can add/edit/remove codes with:
  - Single-letter code (e.g., "Q")
  - Full name (e.g., "Quality Review")
  - Colour assignment (for visual distinction in the matrix)
  - Description/tooltip text
- **Validation rules** adapt to the selected framework (e.g., RACI requires exactly one A per row; RAPID requires exactly one D per row)

---

## 3. Matrix Construction

### 3.1 Structure

| Axis | Contains | Notes |
|------|----------|-------|
| **Rows** | Tasks, activities, deliverables, or decisions | Grouped by phase/workstream (optional) |
| **Columns** | Roles, teams, or individuals | Recommended: use role titles, not names |

### 3.2 Editing the Matrix

- **Click a cell** to cycle through available codes (R → A → C → I → blank → R...)
- **Right-click / long-press** opens a picker showing all available codes with their colours and descriptions
- **Bulk operations**: select multiple cells and assign the same code
- **Drag to reorder** rows and columns
- **Inline editing** of row labels (task names) and column headers (role names)
- **Row grouping**: optional phase/category headers that group related tasks

### 3.3 Validation Rules

The app should validate the matrix in real-time and surface warnings (not blocking errors):

| Rule | Severity | Description |
|------|----------|-------------|
| Exactly one A per row | Warning | Every task should have precisely one Accountable person |
| At least one R per row | Warning | Every task should have someone doing the work |
| No overloaded columns | Info | Flag if one role is A or R on >60% of tasks |
| No empty columns | Info | Role with no assignments may not belong |
| No empty rows | Warning | Task with no assignments is unassigned |
| No duplicate A per row | Error | Multiple Accountable parties defeats the purpose |

Validation panel in the settings blade showing issues grouped by severity.

### 3.4 Practical Size Guidance

- **Columns**: up to ~15 roles (scrollable beyond that)
- **Rows**: up to ~50 tasks per group (virtualized rendering if >100 total rows)
- **Groups**: unlimited phase/category groupings

---

## 4. Technical Architecture

### 4.1 Stack (CoffeeCup Standard)

```
RACI/
├── index.html          # Single-file application
├── styles.css          # Theme CSS with custom properties
└── plan.md             # This file
```

- **React 18** via CDN (unpkg.com)
- **Tailwind CSS** via CDN
- **Babel Standalone** for in-browser JSX compilation
- **No build step required**

### 4.2 CDN Dependencies

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- React 18 -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### 4.3 Four CSS Themes

Matching CoffeeCup exactly:

| Theme | Key Colours | Font | Radius |
|-------|-------------|------|--------|
| **Blueprint** (default) | bg: `#fafaf9`, accent: `#b8956a`, primary: `#292524` | DM Sans | 6-8px |
| **Fun & Vibrant** | bg: gradient `#fdf4ff → #fae8ff`, accent: `#d946ef` | Nunito | 20-24px |
| **Dark Mode** | bg: `#0f0f0f → #242424`, accent: `#6366f1`, text: `#f0f0f0` | DM Sans | 6-8px |
| **Traditional** | bg: `#f8f9fa`, accent: `#0d6efd`, primary: `#212529` | Segoe UI | 2-4px |

Theme switcher in header + settings blade, applied via `data-theme` attribute on `<html>`.

### 4.4 State Management

- **React hooks** (`useState`, `useEffect`, `useRef`)
- **localStorage** for auto-save (key: `raci-project`)
- **State shape**:

```js
{
  projectName: "My Project RACI",
  framework: "raci",           // preset key or "custom"
  codes: [                     // responsibility codes in use
    { code: "R", name: "Responsible", colour: "#3b82f6", description: "..." },
    { code: "A", name: "Accountable", colour: "#ef4444", description: "..." },
    { code: "C", name: "Consulted", colour: "#f59e0b", description: "..." },
    { code: "I", name: "Informed", colour: "#22c55e", description: "..." }
  ],
  roles: [                     // columns
    { id: "role-1", name: "Project Manager" },
    { id: "role-2", name: "Lead Developer" },
    ...
  ],
  groups: [                    // row groupings (phases)
    {
      id: "group-1",
      name: "Planning Phase",
      tasks: [
        { id: "task-1", name: "Define scope" },
        { id: "task-2", name: "Identify stakeholders" },
        ...
      ]
    }
  ],
  assignments: {               // cell values: "task-id|role-id" → "code"
    "task-1|role-1": "A",
    "task-1|role-2": "R",
    ...
  },
  theme: "blueprint",
  settings: {
    showValidation: true,
    showLegend: true,
    compactMode: false
  }
}
```

---

## 5. Right-Hand Settings Blade

Matches CoffeeCup drawer pattern:
- **Width**: 420px, slides in from right
- **Overlay**: semi-transparent backdrop
- **Sections** (accordion or scrollable):

### 5.1 Project Settings
- Project name (text input)
- Project description (textarea, optional)

### 5.2 Framework & Codes
- Framework preset selector (dropdown: RACI, RASCI, RACI-VS, RACIO, DACI, RAPID, CARS, CLAM, Custom)
- Changing preset updates available codes (with confirmation if matrix has data)
- Custom codes editor:
  - Add new code (letter, name, colour picker, description)
  - Edit existing codes
  - Delete codes (with warning if in use)
- Colour swatches for each code (8 preset colours matching CoffeeCup palette)

### 5.3 Roles (Columns)
- List of current roles with reorder (up/down), rename, delete
- Add Role button
- Drag handle for reordering

### 5.4 Validation
- Toggle validation on/off
- Live validation results grouped by severity (Error / Warning / Info)
- Click a validation issue to highlight the relevant cell(s)

### 5.5 Display
- Theme selector (also in header for quick access)
- Compact mode toggle (reduces cell size for larger matrices)
- Show/hide legend
- Show/hide group headers
- Show/hide descriptions column

### 5.6 Data Management
- Save to file (JSON export)
- Load from file (JSON import)
- Export to CSV
- Export to Excel (.xlsx — using SheetJS/xlsx library via CDN)
- Print matrix
- Clear all / New project

---

## 6. Export & Save Capabilities

### 6.1 JSON (Native Format)
- Full project state saved as `.json` file
- Can be re-imported to restore the complete matrix
- Auto-saved to localStorage on every change

### 6.2 CSV Export
- Standard CSV with headers: Task Group, Task, Role1, Role2, ...
- Each cell contains the responsibility code letter
- Compatible with Excel, Google Sheets, any spreadsheet tool

### 6.3 Excel Export (.xlsx)
- Uses **SheetJS (xlsx)** library via CDN
- Colour-coded cells matching the code colours
- Header row with role names
- Task grouping with merged cells for group headers
- Legend sheet with code definitions

### 6.4 PDF / Print
- **CSS print stylesheet** (`@media print`) that:
  - Removes UI chrome (header, settings blade, buttons)
  - Renders matrix in landscape orientation
  - Includes project name, date, and legend
  - Colour-codes cells for visual scanning
  - Alternating row colours for readability
  - Repeats column headers on each page
  - Handles page breaks between groups
- **Print button** triggers `window.print()`
- For very large matrices: option to print selected groups only

---

## 7. UI Layout

```
┌─────────────────────────────────────────────────────┐
│ [Icon] RACI Matrix Builder                          │
│ Project: My Project     Theme: [▾]  [⚙ Settings]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Toolbar: [+ Task] [+ Group] [+ Role]               │
│           [Export ▾] [Import] [Print] [Validate]    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Legend: ■R Responsible ■A Accountable        │    │
│  │         ■C Consulted   ■I Informed           │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌───────────┬────┬────┬────┬────┬────┐            │
│  │ Task      │ PM │ Dev│ QA │ BA │ Ops│            │
│  ├───────────┼────┼────┼────┼────┼────┤            │
│  │ PLANNING  │    │    │    │    │    │ ← group    │
│  ├───────────┼────┼────┼────┼────┼────┤            │
│  │ Define    │ A  │ R  │ C  │ R  │ I  │            │
│  │ scope     │    │    │    │    │    │            │
│  ├───────────┼────┼────┼────┼────┼────┤            │
│  │ Identify  │ A  │ I  │ I  │ R  │ C  │            │
│  │ stakehldrs│    │    │    │    │    │            │
│  ├───────────┼────┼────┼────┼────┼────┤            │
│  │ EXECUTION │    │    │    │    │    │ ← group    │
│  ├───────────┼────┼────┼────┼────┼────┤            │
│  │ Build     │ I  │ R  │ C  │ I  │    │            │
│  │ prototype │    │    │    │    │    │            │
│  └───────────┴────┴────┴────┴────┴────┘            │
│                                                     │
│  Validation: ⚠ 1 warning  ℹ 2 info                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 8. Key Interactions

| Action | Behaviour |
|--------|-----------|
| **Click cell** | Cycle through codes: R → A → C → I → (blank) → R... |
| **Right-click cell** | Open code picker popup with all available codes |
| **Double-click task name** | Inline edit |
| **Double-click role header** | Inline edit |
| **Drag row** | Reorder task within its group |
| **Drag group** | Reorder entire group |
| **Drag column header** | Reorder roles |
| **Click "+" on group** | Add task to that group |
| **Delete key on selected row** | Remove task (with confirmation) |
| **Ctrl+Z / Ctrl+Y** | Undo / Redo |
| **Ctrl+S** | Save to file |
| **Ctrl+P** | Print |

---

## 9. Component Structure

```
App
├── Header (project name, theme selector, settings toggle)
├── Toolbar (add task/group/role, export, import, print, validate)
├── Legend (colour-coded code reference)
├── MatrixTable
│   ├── ColumnHeaders (role names, draggable)
│   ├── GroupRow (collapsible group header)
│   │   └── TaskRow
│   │       └── Cell (clickable, colour-coded)
│   └── AddTaskRow (inline add within group)
├── ValidationBar (summary of issues)
├── SettingsDrawer
│   ├── ProjectSection
│   ├── FrameworkSection
│   ├── RolesSection
│   ├── ValidationSection
│   ├── DisplaySection
│   └── DataSection
└── CodePickerPopup (appears on right-click)
```

---

## 10. Open Questions

These questions need answers before building:

### Functionality
1. **Should the matrix support multiple assignments per cell?** (e.g., a role that is both R and C on a task — uncommon but some frameworks allow it)
2. **Should there be a "notes" or "comments" field per cell** for additional context?
3. **Do you want version history / snapshots** (save named versions of the matrix)?
4. **Should roles support grouping** (e.g., group roles by department: "Engineering", "Management")?
5. **Do you want a "description" column** for tasks (expanding on the task name)?

### Data
6. **Should the app support multiple projects** (project switcher) or one project at a time?
7. **Do you want template matrices** pre-populated with common project phases (e.g., Waterfall phases, Agile ceremonies, Software Development Lifecycle)?
8. **Should CSV/Excel import be supported** (not just export)?

### Visual
9. **Should cells show the full code name or just the letter?** (configurable? e.g., compact = letter only, expanded = full name)
10. **Any preference on the RACI code colour scheme** or should it match the theme accent colours?

### Scope
11. **Should this app appear on the CoffeeCup main landing page** alongside the other tools?
12. **Any specific branding** for this tool (icon, tagline)?
13. **Target audience** — is this for your own use, a client deliverable, or for the CoffeeCup template collection?

---

## 11. Implementation Phases

### Phase 1: Core Matrix
- Single-file React app with 4 themes
- Matrix table with click-to-assign
- Add/edit/delete tasks, groups, and roles
- RACI framework with standard 4 codes
- localStorage auto-save
- Settings blade with project, display, and role configuration

### Phase 2: Extended Features
- Framework presets (RASCI, RACI-VS, DACI, etc.)
- Custom user-defined codes
- Validation engine with visual indicators
- Undo/redo

### Phase 3: Export & Import
- JSON save/load
- CSV export
- Excel export (SheetJS)
- Print stylesheet
- CSV/Excel import (if desired)

### Phase 4: Polish
- Drag-to-reorder (rows, columns, groups)
- Keyboard shortcuts
- Right-click code picker
- Bulk cell operations
- Templates (if desired)

---

*Created: 2026-02-11*
*Status: Awaiting answers to open questions before implementation*
