# Integrated Cost & Schedule Risk Analysis

## Goal Description

Create a new Analysis module to perform quantitative risk analysis on both schedule and cost. The module will integrate data from the Gantt Chart, Cost Tracker, and Risk Register to run Monte Carlo simulations, generating probabilistic outcomes (P50, P80) and Joint Confidence Levels (JCL).

---

## ICE Review

### Intent — What are we actually trying to achieve?

**Primary goal:** Give project managers a single view that answers "What is the probability of delivering on time and on budget?" by combining schedule, cost, and risk data into a Monte Carlo simulation.

**Who is this for?** A PM who has already populated Gantt (schedule), Cost Tracker (budget), and Risk Register (risks) and wants quantitative analysis of their combined exposure.

**What decision does this enable?** Setting realistic contingency reserves, choosing between mitigation strategies, and communicating confidence levels to stakeholders.

### Constraints — What must we work within?

#### Hard Constraints (non-negotiable)

1. **CoffeeCup architecture rules apply** — single HTML file, React 18 via CDN, Babel in-browser, localStorage persistence, 4-theme support, `coffeecup-theme` sync.
2. **Read-only integration** — Analysis reads from `gantt-project`, `cost-project`, and `risk-register` but never writes to them.
3. **No build step, no backend** — everything runs client-side in the browser.
4. **No external dependencies beyond CDN** — React, Babel, Tailwind, Chart.js only.

#### Data Constraints (critical gap identified)

5. **Gantt Chart stores single-point durations only** — no optimistic/likely/pessimistic fields exist. Activities have `{ duration: 5 }`, not `{ durationMin, durationLikely, durationMax }`.
6. **Cost Tracker stores single-point costs only** — line items have `{ totalCost: 1500 }`, no 3-point estimates.
7. **Risk Register DOES store 3-point estimates** — full `{ min, likely, max }` for both cost and time impact, pre and post-mitigation, with distribution type selection.

**Implication:** The plan says "Assign 3-point estimates to tasks and cost items" but doesn't clarify where these estimates live. Two options:
- **(A) Analysis module owns the uncertainty** — users enter 3-point overrides within Analysis itself, mapped to Gantt activities and Cost line items. Source apps remain unchanged.
- **(B) Extend Gantt and Cost Tracker** — add optional 3-point fields to the source apps. Analysis reads them directly.

Option A is strongly preferred: it avoids modifying two stable apps, keeps Analysis self-contained, and follows CoffeeCup's independence principle.

#### Performance Constraints

8. **50,000 iterations with network scheduling is computationally heavy.** Each iteration must re-run the forward pass (topological sort + dependency resolution) for the full activity network. With 50+ activities and dependencies, this could take several seconds.
9. **Web Workers are essential** for >5,000 iterations — the plan mentions "if necessary" but it's effectively mandatory for the upper range. Web Workers with inline blobs work in CDN-loaded apps (no separate file needed).

### Expectations — What does "done" look like?

#### Must Have (MVP)

- [ ] Pull and display Gantt activities, Cost line items, and Risk Register events
- [ ] Allow users to assign 3-point estimates (O/L/P) to any activity duration or cost item within the Analysis module
- [ ] Run Monte Carlo simulation (default 10,000 iterations) on schedule network
- [ ] Run Monte Carlo simulation on cost model
- [ ] Display schedule S-curve (CDF) with P50/P80 markers
- [ ] Display cost S-curve (CDF) with P50/P80 markers
- [ ] Pre vs Post mitigation comparison (using Risk Register pre/post data)
- [ ] Tornado chart showing top schedule and cost drivers
- [ ] Persist simulation inputs (3-point overrides) to `analysis-project` localStorage
- [ ] 4-theme support, suite theme sync
- [ ] Main Dashboard tile and PMPlan integration

#### Should Have

- [ ] JCL scatter plot (joint cost + schedule confidence)
- [ ] What-if toggles for individual risks
- [ ] Latin Hypercube Sampling option
- [ ] Web Worker for simulation (>5,000 iterations)

#### Won't Have (this release)

- [ ] Modifying Gantt or Cost Tracker data structures
- [ ] Correlation between schedule and cost variables
- [ ] Resource levelling or resource-constrained scheduling
- [ ] PDF export of analysis reports

---

## Proposed Changes (Revised)

### 1. Analysis Module (`Analysis/index.html`)

**[NEW]** Single-file React application.

#### Data Inputs

| Source | localStorage Key | Fields Used |
|--------|-----------------|-------------|
| Gantt Chart | `gantt-project` | `activities` (id, name, duration, dependencies), `criticalPath`, `startDate` |
| Cost Tracker | `cost-project` | `categories[].lineItems` (id, description, totalCost, quantity, unit, unitCost) |
| Risk Register | `risk-register` | `risks[]` (id, name, likelihood, impactCost{min,likely,max}, impactTime{min,likely,max}, costDistribution, timeDistribution, postLikelihood, postImpactCost, postImpactTime, postCostDistribution, postTimeDistribution) |

#### Data Model (stored in `analysis-project`)

```javascript
{
  meta: { name, created, modified },
  settings: {
    theme, iterations: 10000,
    samplingMethod: "monteCarlo",  // or "lhs"
    seed: null                     // for reproducibility
  },
  // 3-point overrides keyed by source ID
  scheduleOverrides: {
    "<gantt-activity-id>": {
      min: 3, likely: 5, max: 10,
      distribution: "pert"         // pert | triangular | uniform
    }
  },
  costOverrides: {
    "<cost-lineitem-id>": {
      min: 1000, likely: 1500, max: 2500,
      distribution: "pert"
    }
  },
  // Risk toggles (which risks are included in analysis)
  riskToggles: {
    "<risk-id>": { included: true, usePostMitigation: true }
  },
  // Last simulation snapshot (for PMPlan to read)
  lastRun: {
    timestamp: "ISO date",
    scheduleP50: 45, scheduleP80: 52,
    costP50: 125000, costP80: 148000,
    iterations: 10000
  }
}
```

#### UI Tabs

1. **Model Setup** — Pull data from source apps, assign 3-point estimates, toggle risks
2. **Schedule Analysis** — S-curve, tornado chart, P-values for duration
3. **Cost Analysis** — S-curve, tornado chart, P-values for total cost
4. **Joint Analysis** — JCL scatter plot (Should Have), combined summary

#### Simulation Engine

- **Schedule simulation:** For each iteration, sample each activity's duration from its distribution (3-point override or deterministic), then run the forward pass to get total project duration. Collect results into histogram/CDF.
- **Cost simulation:** For each iteration, sample each line item's cost from its distribution, add sampled risk impacts (based on probability draw), sum to get total cost. Collect results.
- **Risk event sampling:** For each risk, draw random number. If < probability, sample impact from 3-point distribution and add to schedule/cost. Use pre or post-mitigation values based on toggle.
- **Sensitivity:** Rank-order correlation (Spearman) between each input sample and the output to identify top drivers.

#### Performance Strategy

- Iterations <= 5,000: run synchronously on main thread
- Iterations > 5,000: use inline Web Worker (blob URL) to avoid blocking UI
- Progress bar during simulation

### 2. Main Dashboard (`Main/index.html`)

- Add Analysis tile to the application grid
- Create scatter-chart style SVG icon

### 3. PMPlan Integration (`PMPlan/index.html`)

- Add "Quantitative Analysis" section
- Pull `lastRun` snapshot from `analysis-project` (P50/P80 schedule and cost values, iteration count, timestamp)

---

## Verification Plan

### Functional Checks

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Data load | Open Analysis with populated Gantt, Cost, Risk data | All activities, line items, and risks appear in Model Setup |
| Default estimates | Activities without overrides | Use deterministic (single-point) values — simulation should produce zero variance for those items |
| 3-point entry | Assign O/L/P to an activity | Values persist after page reload |
| Simulation speed | 10,000 iterations, 20 activities | Completes within 3 seconds |
| Schedule S-curve | Run simulation | Smooth CDF curve, P50 and P80 markers visible |
| Cost S-curve | Run simulation | Smooth CDF curve, P50 and P80 markers visible |
| Tornado chart | Run simulation | Top 10 drivers ranked by correlation, bars extend both directions |
| Pre vs Post | Toggle between pre and post-mitigation | Curves shift left (lower values) for post-mitigation |
| Theme sync | Change theme in Main Dashboard, open Analysis | Theme matches |
| PMPlan pull | Run simulation, open PMPlan | P50/P80 values appear in Quantitative Analysis section |

### Logic Checks

- Increase a critical activity's max duration → P80 schedule duration increases
- Add a high-probability, high-impact risk → P80 cost increases
- Toggle a risk off → Cost distribution tightens
- Set all overrides to deterministic (min = likely = max) → Zero variance in output

### Edge Cases

- No Gantt data → Show empty state with guidance
- No Cost data → Schedule-only analysis still works
- No Risk data → Analysis runs without risk events (pure uncertainty on estimates)
- All activities deterministic, no risks → Simulation produces single-point result

---

## Open Questions

1. **Should the Analysis module store its own copy of pulled data, or re-pull on every simulation run?** Re-pulling is simpler and always fresh, but slower. Storing a snapshot enables offline comparison but can go stale.

2. **Correlation modelling** — In reality, if one task overruns, related tasks often do too. Should we support correlation matrices between activities? (Recommend: defer to a future release.)

3. **localStorage key:** `analysis-project` — consistent with suite naming convention. Confirm?
