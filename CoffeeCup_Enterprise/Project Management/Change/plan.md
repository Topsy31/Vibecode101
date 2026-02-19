# Change & Issue Register — Implementation Plan

## Context

The CoffeeCup suite currently covers scheduling (Gantt), task tracking (Kanban), risk analysis (Risk Register), budgeting (Cost Tracker), and stakeholder management. The **Change & Issue Register** completes the "governance trio" — the missing piece for tracking change requests and issues through a formal workflow. It feeds into PMPlan's Change Management (Tier 1) and Issue Log (Tier 2) sections.

---

## Data Model

**localStorage key:** `changelog-project`

```javascript
{
  meta: { name, created, modified },
  settings: {
    theme,
    changePrefix: 'CR',    // e.g. CR-001
    issuePrefix: 'IS',     // e.g. IS-001
    categories: ['Scope', 'Schedule', 'Cost', 'Quality', 'Resource', 'Technical']
  },
  items: [{
    id, type ('change'|'issue'), title, description,
    status,          // Change: submitted → under-review → approved/rejected → implemented
                     // Issue:  open → in-progress → resolved → closed
    priority,        // critical, high, medium, low
    category,        // from settings.categories
    raisedBy, raisedDate, owner, dueDate,
    impactAssessment,  // free text
    resolution,        // free text
    closedDate, notes
  }]
}
```

---

## Architecture

**Single file:** `Change/index.html` (~2,100 lines)

### Component Tree
```
ChangeLogApp (root — state, persistence, CRUD, file I/O)
├── Header (icon + title + theme selector + settings button)
├── Toolbar (tabs + filters + action buttons)
├── RegisterTab
│   └── ItemRow[] (summary row + expandable edit form)
├── DashboardTab
│   ├── MetricsPanel (6 KPI cards)
│   └── ChartsGrid (4 Chart.js charts)
└── SettingsPanel (right-side drawer)
```

---

## Features

### Tab 1: Register
- Table with columns: ID, Type, Title, Status, Priority, Category, Owner, Raised, Due
- **Type badges** — blue for Change, amber for Issue
- **Status badges** — coloured pills per status
- **Filters** in toolbar — by type, status, priority + text search
- **Sortable** column headers
- **Expandable rows** for editing (Risk Register pattern)
- Auto-set `closedDate` when status reaches terminal state
- "Add Change" / "Add Issue" buttons
- Save/Open JSON, Clear All

### Tab 2: Dashboard
- **KPI cards:** Total Open, Changes Pending, Issues Open, Approval Rate, Avg Resolution Time, Overdue
- **Charts:** Status breakdown (doughnut), Category breakdown (bar), Items over time (line), Priority distribution (doughnut)

### Settings Panel (drawer)
- Project name, ID prefixes (CR/IS), category list management, data export/import/clear

---

## Implementation Order

| Step | What | Est. Lines |
|------|------|-----------|
| 1 | HTML boilerplate, CDN links, favicon | ~25 |
| 2 | CSS: variables, 4 themes, base styles, app-specific classes | ~690 |
| 3 | Constants, utilities, SVG icons | ~220 |
| 4 | Root component: state, theme sync, auto-save, CRUD, file I/O | ~120 |
| 5 | ItemRow: summary row + expanded edit form | ~250 |
| 6 | Register tab: table, filters, sorting, empty state, toolbar | ~230 |
| 7 | Dashboard: MetricsPanel + 4 Chart.js charts | ~390 |
| 8 | Settings panel (drawer) | ~150 |
| 9 | Final assembly + ReactDOM render | ~25 |

---

## Reference Files

| File | What to reuse |
|------|--------------|
| `Risk/index.html` | Expandable row pattern, tab navigation, theme CSS, settings drawer, file I/O |
| `Cost/index.html` + `Cost/styles.css` | Chart.js integration, MetricsPanel KPI cards, charts-grid layout |
| `Kanban/index.html` | Status workflow pattern, drag colour conventions |

---

## Follow-up Steps (after main app)

These are **not** part of this implementation — done separately:

1. **PMPlan integration** — add `changelog` to INTEGRATION_KEYS/NAMES, add pull logic for Change Management and Issue Log sections
2. **Main Dashboard** — add Change & Issue Register entry to DEFAULT_APPS array

---

## Verification

1. Open `Change/index.html` in browser
2. Add a mix of change requests and issues
3. Test status workflow transitions for both types
4. Verify filters (type, status, priority, search) and sorting
5. Switch between all 4 themes — check badges, charts, drawer
6. Test JSON export, close tab, reopen — verify localStorage persistence
7. Test JSON import from exported file
8. Check Dashboard KPIs and charts update correctly
9. Confirm `coffeecup-theme` sync works (set theme in another app, open Change)
