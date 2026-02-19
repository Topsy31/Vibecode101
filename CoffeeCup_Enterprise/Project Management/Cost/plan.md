# Cost Tracker — Project Budget & Cost Management

## Overview

The Cost Tracker is a CoffeeCup application for managing project budgets and tracking actual spend against the baseline. It follows the PMBOK cost management hierarchy:

```
Cost Estimate + Contingency Reserve = Cost Baseline
Cost Baseline + Management Reserve = Total Project Budget
```

The app integrates with the Risk Register (pulling EMV-based contingency figures and Monte Carlo confidence levels) and feeds budget data into PMPlan's Budget Summary and Cost Baseline sections.

---

## Architecture

### File Structure

```
Cost/
├── index.html    # React app with embedded JS
└── styles.css    # Separate CSS (app will be 3,000+ lines)
```

### localStorage

- **Key:** `cost-project`
- **Read from:** `risk-register` (contingency/EMV data)
- **Read by:** `pmplan-project` (Budget Summary, Cost Baseline sections)

---

## Core Features

### 1. Budget Baseline Management

**Budget structure (3-tier):**

| Level | Contents | Controlled By |
|-------|----------|---------------|
| Cost Estimate | Sum of all category line items | Project Manager |
| Cost Baseline | Cost Estimate + Contingency Reserve | Project Manager |
| Total Budget | Cost Baseline + Management Reserve | Sponsor / PMO |

**Baseline versioning:** manual "Save Baseline" button creates a named snapshot. Planned vs actual comparisons always measure against the active baseline.

### 2. Category-Based Budgeting

**Default categories** (user can add/rename/remove):

| Category | Typical % | Description |
|----------|-----------|-------------|
| Labour | 40-60% | Staff costs, day rates, timesheets |
| Materials | 10-20% | Consumables, raw materials |
| Equipment | 5-15% | Tools, machinery, rental |
| Subcontractors | 10-30% | External vendors, outsourced work |
| Travel | 2-5% | Transport, accommodation, per diems |
| Overheads | 5-10% | Office, utilities, allocated indirect costs |
| Professional Services | 5-10% | Consultants, legal, audit |
| Contingency Reserve | — | Calculated from Risk Register EMV or manual |
| Management Reserve | — | Typically 5-10% of cost baseline |

Each category contains **line items**:

```
Line Item: {
  id, description, quantity, unit (hours/days/units/lump sum),
  unitCost (£), totalCost, startDate, endDate, responsible
}
```

### 3. Time-Phased Budget (Monthly)

Budget is distributed across monthly periods from project start to end date. Each period tracks:

- **Planned Value (PV)** — budgeted cost for that month
- **Actual Cost (AC)** — actual spend recorded
- **Earned Value (EV)** — value of work completed (% complete × BAC for that item)
- **Cumulative** totals for all three

Distribution method: user allocates per line item, or uses even spread / front-loaded / back-loaded presets.

### 4. Actuals Tracking

**Transaction entry:**

```
Transaction: {
  id, date, categoryId, lineItemId, description,
  amount (£), vendor, invoiceRef, approvedBy, notes
}
```

**Entry methods:**
- Quick-add form (inline or modal)
- Bulk entry per period (table view — enter amounts per category per month)
- JSON import for batch data

### 5. EVM Metrics (Auto-calculated)

| Metric | Formula | Description |
|--------|---------|-------------|
| BAC | Sum of baseline | Budget at Completion |
| PV | Time-phased baseline to date | Planned Value |
| EV | % Complete × BAC per item | Earned Value |
| AC | Sum of actuals to date | Actual Cost |
| CV | EV − AC | Cost Variance (+ve = under budget) |
| SV | EV − PV | Schedule Variance |
| CPI | EV / AC | Cost Performance Index (>1 = good) |
| SPI | EV / PV | Schedule Performance Index |
| EAC | BAC / CPI | Estimate at Completion |
| ETC | EAC − AC | Estimate to Complete |
| VAC | BAC − EAC | Variance at Completion |
| TCPI | (BAC − EV) / (BAC − AC) | To-Complete Performance Index |

Displayed as a **metrics panel** at the top of the dashboard with colour-coded indicators (green/amber/red thresholds).

### 6. Risk Register Integration

**Live pull from `risk-register`:**

- Import total EMV (threats) as suggested contingency reserve
- Import individual risk EMVs with risk names for contingency breakdown
- Import Monte Carlo P50/P80/P90 confidence levels if available
- Display contingency utilisation (how much reserve has been consumed by materialised risks)

**Contingency tracking:**

```
Contingency: {
  calculatedFromEMV: £,     // auto-pulled from Risk Register
  manualOverride: £ | null, // user can override
  allocated: £,             // whichever is active
  utilised: £,              // sum of spend attributed to risk events
  remaining: £              // allocated − utilised
}
```

---

## Visualisations

### Dashboard Charts

| Chart | Type | Description |
|-------|------|-------------|
| **S-Curve** | Line chart (Canvas/SVG) | Cumulative PV, EV, AC over time. The signature PM cost visualisation. |
| **Budget Burn-down** | Line chart | Remaining budget over time vs baseline trajectory |
| **Category Breakdown** | Donut chart | Budget allocation or actual spend by category |
| **Variance Waterfall** | Bar chart | Shows how variances accumulate across categories |
| **Contingency Gauge** | Arc/ring | Contingency reserve utilisation (allocated vs remaining) |

### Chart Library

**Chart.js via CDN** (`https://cdn.jsdelivr.net/npm/chart.js`). Handles S-curves, donut charts, bar charts, and line charts with built-in animations, tooltips, and responsive scaling. One additional `<script>` tag alongside React/Babel/Tailwind.

---

## UX Design

### Layout: Dashboard + Table Views

Two primary views toggled from the header:

**1. Dashboard View (default)**

```
+------------------------------------------------------------------+
|  [Icon] Cost Tracker           [View Toggle] [Theme] [Settings]  |
+------------------------------------------------------------------+
|                                                                  |
|  [BAC]  [AC]  [EV]  [CPI]  [EAC]  [VAC]     ← Metric Cards    |
|                                                                  |
|  +---------------------------+  +----------------------------+   |
|  |      S-Curve Chart        |  |   Category Breakdown       |   |
|  |  (PV / EV / AC lines)     |  |   (Donut chart)            |   |
|  +---------------------------+  +----------------------------+   |
|                                                                  |
|  +---------------------------+  +----------------------------+   |
|  |   Budget Burn-down        |  |   Contingency Gauge        |   |
|  +---------------------------+  +----------------------------+   |
|                                                                  |
|  [Recent Transactions]                                           |
+------------------------------------------------------------------+
```

**2. Table View**

```
+------------------------------------------------------------------+
|  [Icon] Cost Tracker           [View Toggle] [Theme] [Settings]  |
+------------------------------------------------------------------+
|  [+ Add Transaction]  [Period: Feb 2026 ▾]  [Cumulative toggle]  |
+------------------------------------------------------------------+
|  Category        | Baseline | Actuals | Variance | % Var | EAC   |
|  ─────────────── | ──────── | ─────── | ──────── | ───── | ───── |
|  ▾ Labour         | £50,000  | £45,000 | +£5,000  | +10%  | £48k  |
|    ├ Senior Dev   | £30,000  | £28,000 | +£2,000  |       |       |
|    └ Junior Dev   | £20,000  | £17,000 | +£3,000  |       |       |
|  ▾ Materials      | £30,000  | £32,000 | -£2,000  | -6.7% | £34k  |
|  ▾ Subcontractors | £25,000  | £22,000 | +£3,000  | +12%  | £23k  |
|  ─────────────── | ──────── | ─────── | ──────── | ───── | ───── |
|  Cost Estimate    | £105,000 | £99,000 | +£6,000  | +5.7% | £105k |
|  Contingency      | £12,000  |         | (£3,200 used)    |       |
|  Cost Baseline    | £117,000 |         |                  |       |
|  Mgmt Reserve     | £11,700  |         |                  |       |
|  TOTAL BUDGET     | £128,700 |         |                  |       |
+------------------------------------------------------------------+
```

**Colour coding:**
- Green: variance ≥ 0 (under budget)
- Amber: variance between 0% and -5% (slight overrun)
- Red: variance < -5% (significant overrun)

### Header Pattern

Standard CoffeeCup header:
```
[Icon 36x36 gradient] [Title] [Spacer] [View Toggle: Dashboard | Table] [Theme Selector] [Settings Button]
```

### Settings Drawer

- **Project Details:** name, start date, end date, currency symbol (£ default, configurable to $, €, etc.)
- **Categories:** add/rename/remove/reorder budget categories
- **Thresholds:** amber/red variance thresholds (default: -5%, -10%)
- **Time Phasing:** period type (monthly), auto-distribute toggle
- **Data:** export JSON, import JSON, save baseline, new project
- **Theme:** 4-theme selector

### Transaction Entry

**Quick-add modal:**
- Date (default: today)
- Category (dropdown)
- Line Item (dropdown, filtered by category)
- Amount (£, with formatting)
- Description (text)
- Vendor / Invoice Ref (optional)
- Save / Cancel

---

## Data Model

### localStorage key: `cost-project`

```
{
  meta: {
    name: string,
    startDate: ISO date,
    endDate: ISO date,
    currencySymbol: "£",
    created: ISO date,
    modified: ISO date
  },
  settings: {
    theme: "blueprint" | "fun" | "dark" | "traditional",
    amberThreshold: -5,   // percentage
    redThreshold: -10,    // percentage
    periodType: "monthly"
  },
  categories: [
    {
      id: string,
      name: string,
      colour: string,       // for charts
      sortOrder: number,
      lineItems: [
        {
          id: string,
          description: string,
          quantity: number,
          unit: "hours" | "days" | "units" | "lump",
          unitCost: number,
          totalCost: number,
          startDate: ISO date | null,
          endDate: ISO date | null,
          responsible: string,
          percentComplete: number  // 0-100, for EV calculation
        }
      ]
    }
  ],
  contingency: {
    method: "emv" | "manual" | "percentage",
    manualAmount: number | null,
    percentage: number | null,      // e.g. 10 for 10% of cost estimate
    emvPulledDate: ISO date | null,
    riskBreakdown: [                // from Risk Register
      { riskId: string, riskName: string, emv: number }
    ],
    utilised: number,
    utilisedLog: [
      { date: ISO date, amount: number, riskId: string, description: string }
    ]
  },
  managementReserve: {
    method: "percentage" | "manual",
    percentage: number,  // default 10
    manualAmount: number | null
  },
  timePhased: {
    periods: [
      {
        id: string,
        label: string,     // "Feb 2026"
        startDate: ISO date,
        endDate: ISO date,
        planned: number,    // PV for this period
        actual: number,     // AC for this period
        earned: number      // EV for this period
      }
    ]
  },
  transactions: [
    {
      id: string,
      date: ISO date,
      categoryId: string,
      lineItemId: string | null,
      description: string,
      amount: number,
      vendor: string,
      invoiceRef: string,
      notes: string
    }
  ],
  baselines: [
    {
      name: string,
      date: ISO date,
      snapshot: { /* full copy of categories + contingency + mgmtReserve at that point */ }
    }
  ]
}
```

---

## Theming

Standard CoffeeCup 4-theme system. CSS custom properties in `styles.css`.

- **Blueprint** (default) — warm cream, brown accents, grid background
- **Fun & Vibrant** — purple-pink gradient, magenta accents, Nunito font
- **Dark Mode** — near-black, indigo accents
- **Traditional** — light grey, blue accents, Segoe UI

---

## Integration

### From Risk Register → Cost Tracker

**Pull `risk-register` localStorage:**
- Extract risks with cost impacts
- Calculate EMV per risk: probability × most likely cost impact
- Sum threat EMVs as suggested contingency
- If Monte Carlo results present, extract P50/P80/P90 for confidence display

### From Cost Tracker → PMPlan

**PMPlan reads `cost-project`:**
- **Budget Summary section:** BAC, AC, EAC, CPI, category breakdown, contingency status
- **Cost Baseline section:** baseline snapshot, time-phased PV, variance summary

---

## Currency Formatting

Default GBP, configurable symbol via settings (£, $, €, or custom):
- Symbol before amount: £1,234.56
- Comma thousands separator
- Two decimal places for inputs, round to nearest unit for display in tables
- Negative values: -£500 (red text)
- Large values abbreviated on charts: £125k, £1.2m

---

## Build Plan

### Phase 1: Foundation
- [ ] App shell: header, view toggle (dashboard/table), settings drawer
- [ ] Theme system (4 themes, styles.css)
- [ ] Data model and localStorage persistence
- [ ] Category management (add/rename/remove/reorder)
- [ ] Line item editor within categories

### Phase 2: Budget Table View
- [ ] Hierarchical table (categories → line items)
- [ ] Summary row with Cost Estimate / Baseline / Budget totals
- [ ] Contingency and Management Reserve rows
- [ ] Inline editing of line item values
- [ ] Currency formatting (£)

### Phase 3: Transactions & Actuals
- [ ] Transaction entry modal (quick-add)
- [ ] Transaction list with sort/filter
- [ ] Actuals aggregation per category/period
- [ ] Variance calculation (planned vs actual)
- [ ] Colour-coded variance indicators (green/amber/red)

### Phase 4: Time Phasing
- [ ] Auto-generate monthly periods from project dates
- [ ] Planned Value distribution (even spread or manual)
- [ ] Period selector in table view
- [ ] Cumulative vs period toggle

### Phase 5: EVM Metrics & Dashboard
- [ ] Calculate BAC, PV, EV, AC, CV, SV, CPI, SPI, EAC, ETC, VAC
- [ ] Metrics card panel at top of dashboard
- [ ] S-Curve chart (PV, EV, AC cumulative lines)
- [ ] Budget burn-down chart
- [ ] Category breakdown donut chart
- [ ] Contingency utilisation gauge

### Phase 6: Risk Register Integration
- [ ] Live pull from `risk-register` localStorage
- [ ] Map risk EMVs to contingency breakdown
- [ ] Monte Carlo confidence level display (if available)
- [ ] Contingency utilisation tracking

### Phase 7: Export & Baseline
- [ ] JSON export/import
- [ ] Save baseline snapshot
- [ ] Baseline comparison view
- [ ] Print stylesheet

---

## Design Decisions (Resolved)

1. **Earned Value source** — **Manual entry**. User enters % complete per line item directly in the Cost Tracker. Works standalone without requiring Gantt data.

2. **Currency** — **Configurable symbol**. Default GBP (£), but users can select $, €, or other symbols via settings. Display-only — no conversion logic.

3. **Approval workflow** — **No approval**. All transactions count immediately as actuals. Appropriate for a single-user localStorage tool.

4. **Chart library** — **Chart.js via CDN**. S-curves, donut charts, bar charts with built-in animations and tooltips. One extra `<script>` tag, saves ~500 lines of hand-drawn chart code.
