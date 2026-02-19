# EVM Dashboard

## Purpose

Earned Value Management dashboard that pulls schedule data from the Gantt Chart and cost data from the Cost Tracker to calculate CPI, SPI, EAC, and display S-curve visualisations with critical path integration.

**Best For:** Performance measurement, cost/schedule forecasting, executive reporting, project health assessment.

**Status:** Complete

**localStorage Key:** `evm-project` (writes summary for PMPlan; reads from `cost-project` and `gantt-project`)

---

## Quick Start

1. **Populate source data first** — add activities in the Gantt Chart and budget/transactions in the Cost Tracker
2. **Open EVM Dashboard** — data loads automatically from both sources
3. **Review the status banner** — green (on track), amber (at risk), or red (over budget / behind schedule)
4. **Check the gauges** — CPI and SPI show cost and schedule efficiency at a glance
5. **Analyse the S-curve** — compare Planned Value, Earned Value, and Actual Cost over time
6. **Click Refresh** to reload data after updating the Gantt Chart or Cost Tracker

---

## Features

### Status Banner

A colour-coded banner at the top shows overall project health:

| Status | Condition | Meaning |
|--------|-----------|---------|
| **On Track** (green) | CPI ≥ 1.0 AND SPI ≥ 1.0 | Under budget and ahead of schedule |
| **At Risk** (amber) | CPI ≥ 0.9 AND SPI ≥ 0.9, but not both ≥ 1.0 | Monitor closely — approaching thresholds |
| **Over Budget / Behind** (red) | CPI < 0.9 OR SPI < 0.9 | Intervention required |

The banner also shows: percentage earned, percentage spent, and schedule progress (day X of Y).

### KPI Cards

Four foundation metrics displayed as large cards:

| Card | Metric | What It Shows |
|------|--------|---------------|
| **Budget at Completion** | BAC | Total authorised project budget |
| **Planned Value** | PV | Budgeted cost of work scheduled to date |
| **Earned Value** | EV | Budgeted cost of work actually performed |
| **Actual Cost** | AC | Actual money spent to date |

Values display in abbreviated currency format (e.g., £245k, £1.2m). Currency symbol is inherited from the Cost Tracker.

### Performance Gauges

Two SVG gauge charts side by side:

#### Cost Performance Index (CPI)

```
CPI = EV / AC
```

- **CPI > 1.0** (green) — Under budget. Every £1 spent is producing more than £1 of value.
- **CPI = 1.0** — On budget exactly.
- **CPI < 1.0** (red) — Over budget. Spending more than the value being delivered.

#### Schedule Performance Index (SPI)

```
SPI = EV / PV
```

- **SPI > 1.0** (green) — Ahead of schedule. More work complete than planned.
- **SPI = 1.0** — On schedule exactly.
- **SPI < 1.0** (red) — Behind schedule. Less work complete than planned.

Gauges use a 0–2 scale with colour thresholds: green (≥ 1.0), amber (≥ 0.9), red (< 0.9).

### Variance Analysis

Three variance metrics showing deviations from plan:

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **Cost Variance (CV)** | EV − AC | Positive = under budget, negative = over budget |
| **Schedule Variance (SV)** | EV − PV | Positive = ahead, negative = behind |
| **Variance at Completion (VAC)** | BAC − EAC | Expected final budget variance |

Positive variances display in green; negative in red.

### Forecasts

Three forward-looking metrics:

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **EAC** (Estimate at Completion) | BAC / CPI | Forecasted total project cost based on current performance |
| **ETC** (Estimate to Complete) | EAC − AC | How much more money is needed to finish |
| **TCPI** (To-Complete Performance Index) | (BAC − EV) / (BAC − AC) | The CPI you need to achieve on remaining work to finish on budget |

**TCPI interpretation:**
- TCPI ≤ 1.0 (green) — Achievable with current performance
- TCPI 1.0–1.1 (amber) — Challenging but possible with improvement
- TCPI > 1.1 (red) — Unlikely to finish on budget without intervention

**Example:** If BAC = £1,000,000 and CPI = 0.85:
- EAC = £1,000,000 / 0.85 = **£1,176,471**
- Overrun = £176,471

### S-Curve Chart

A line chart showing three cumulative curves over time:

- **Planned Value (PV)** — Blue line. The baseline spending plan.
- **Earned Value (EV)** — Green line. Actual progress measured in budget terms.
- **Actual Cost (AC)** — Red line. Actual money spent.

**Reading the S-curve:**
- EV above AC → Under budget (good)
- EV above PV → Ahead of schedule (good)
- AC above PV → Spending faster than planned (concerning)
- Gap between EV and AC → Cost variance (wide gap = significant overrun)

Data comes from the Cost Tracker's time-phased periods. Only periods up to today are plotted to avoid false future projections.

### Schedule Overview

Displays schedule metrics from the Gantt Chart:

| KPI | Source | Format |
|-----|--------|--------|
| **Total Activities** | Gantt Chart activity count | Integer |
| **Critical Path Length** | Longest dependency chain | Days (red text) |
| **Critical Activities** | Activities on the critical path | Count (red text) |
| **Elapsed / Remaining** | Days since start vs days to go | "Xd / Yd" |

A progress bar shows the percentage of the critical path duration elapsed.

### Metrics Reference Table

A comprehensive table listing all 12 EVM metrics with their acronyms, formulas, values, and status indicators. Useful for executive reporting — provides the full picture in one view.

---

## PM Methodology: Earned Value Management

### What Is EVM?

Earned Value Management is an industry-standard method for measuring project performance by combining scope, schedule, and cost into a unified framework. It answers three fundamental questions:

1. **How much work was planned?** (Planned Value)
2. **How much work was actually done?** (Earned Value)
3. **How much did it cost?** (Actual Cost)

By comparing these three values, EVM reveals whether a project is on track, and if not, by how much and in which dimension.

### The Four Foundation Values

Everything in EVM derives from four base values:

```
BAC → Total budget (what we plan to spend overall)
 PV → What we should have spent by now (based on the schedule)
 EV → What we've actually accomplished (in budget terms)
 AC → What we've actually spent
```

### Why CPI Matters More Than Budget Reports

A traditional budget report shows "we've spent £500,000 of our £1,000,000 budget." This tells you nothing about progress. EVM adds the crucial missing piece:

- If EV = £400,000 → You spent £500k but only delivered £400k of value (CPI = 0.80 — trouble)
- If EV = £600,000 → You spent £500k and delivered £600k of value (CPI = 1.20 — excellent)

### CPI Stabilises at 20% Complete

Research shows that CPI stabilises once approximately 20% of the budget is spent. Early CPI (Month 1) is volatile and unreliable. By the 20% mark, CPI becomes a reliable predictor of final cost — projects rarely recover from a low CPI.

### TCPI: The Reality Check

If your TCPI is 1.30 but your CPI is 0.80, the project cannot finish on budget. A 30% improvement in cost efficiency is unrealistic. Use TCPI to have honest conversations about budget reforecasting with stakeholders.

---

## Data Integration

### How It Works

The EVM Dashboard is a **read-only** consumer of data from two source applications:

```
Cost Tracker (cost-project) ──→ BAC, AC, EV, PV, time-phased periods, currency
Gantt Chart (gantt-project) ──→ Activities, durations, critical path, start date
```

The dashboard never writes to these sources. It reads their localStorage keys on load and when the Refresh button is clicked.

### What It Writes

The dashboard writes a summary object to `evm-project` containing all calculated metrics (BAC, AC, EV, PV, CPI, SPI, EAC, ETC, TCPI, variances, schedule metrics, and a timestamp). PMPlan reads this summary to display EVM health without recalculating.

### Refresh Workflow

1. Update activities or durations in the **Gantt Chart**
2. Add transactions or adjust budgets in the **Cost Tracker**
3. Open or refresh the **EVM Dashboard**
4. Click the **Refresh** button to pull latest data
5. All metrics, gauges, and charts update immediately

---

## Tips and Best Practices

**Update Weekly:** EVM metrics are only as good as your actuals. Update the Cost Tracker with transactions and the Gantt Chart with progress at least weekly.

**Baseline Required:** EVM compares against a baseline (the original plan), not the current revised plan. If you rebaseline, your historical variances reset.

**Watch the Trend, Not Just the Number:** A CPI of 0.95 is fine if it was 0.90 last month (improving). A CPI of 0.95 is concerning if it was 1.05 last month (declining).

**Use TCPI for Honest Conversations:** When TCPI exceeds CPI significantly, the project needs reforecasting or additional funding. Present this to stakeholders early.

**S-Curve Shape Tells a Story:** A healthy S-curve shows three lines close together. If AC diverges sharply above EV, investigate where costs are running away.

---

## Troubleshooting

**Q: The dashboard shows "No EVM Data Available."**
A: Open the Cost Tracker and add at least one budget category with line items and some transactions. Open the Gantt Chart and add at least one activity. Then return to the EVM Dashboard.

**Q: CPI and SPI show 0.**
A: Ensure the Cost Tracker has transactions (AC) and line items with percentage complete (EV). If AC or PV is zero, the division results in 0 or undefined.

**Q: The S-curve only shows one line.**
A: The S-curve requires time-phased data from the Cost Tracker. If no time periods are defined, only the current totals are available.

**Q: The currency symbol is wrong.**
A: The currency is inherited from the Cost Tracker's metadata. Change it there and refresh the EVM Dashboard.

**Q: Schedule metrics show no critical path.**
A: The Gantt Chart needs dependencies between activities to calculate a critical path. Without dependencies, each activity is independent and there is no "longest chain."

---

*EVM Dashboard: Earned Value metrics with integrated Gantt Chart and Cost Tracker data.*
