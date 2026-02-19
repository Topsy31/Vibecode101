# Integrated Analysis

## Purpose

Quantitative cost and schedule risk analysis with Monte Carlo simulation, S-curves, tornado charts, and Joint Confidence Levels. Pulls data from the Gantt Chart, Cost Tracker, and Risk Register to produce probabilistic project forecasts.

**Best For:** Risk quantification, reserve estimation, confidence level reporting, sensitivity analysis, executive decision support.

**Status:** Complete

**localStorage Key:** `analysis-project`

---

## Quick Start

1. **Populate source data** — add activities in the Gantt Chart, budget in the Cost Tracker, and risks in the Risk Register
2. **Open Integrated Analysis** — source data loads automatically
3. **Add 3-point estimates** — enter optimistic, likely, and pessimistic values for activities and cost items with uncertainty
4. **Toggle risk events** — choose which risks to include in the simulation
5. **Run the simulation** — click Run Simulation (default: 10,000 iterations)
6. **Review results** — switch between Schedule Analysis, Cost Analysis, and Joint Analysis tabs

---

## Features

### Model Setup Tab

The primary configuration workspace with four expandable sections.

#### Source Data Status

Shows what data has been loaded from other applications:

| Source | localStorage Key | What It Provides |
|--------|-----------------|------------------|
| **Gantt Chart** | `gantt-project` | Activities, durations, dependencies, critical path |
| **Cost Tracker** | `cost-project` | Line items, categories, budget, currency symbol |
| **Risk Register** | `risk-register` | Risks, likelihood, cost/time impacts, pre/post-mitigation values |

Green indicators show loaded sources; grey shows missing data. The deterministic baseline (base schedule in days, base cost in currency) is displayed for reference.

Click **Refresh Data** to re-pull from all three sources without running a simulation.

#### Schedule Uncertainty (3-Point Estimates)

A table with one row per activity from the Gantt Chart:

| Column | Editable | Purpose |
|--------|----------|---------|
| **Activity** | No | Name from Gantt Chart |
| **Base Duration** | No | Deterministic duration from Gantt |
| **Min (O)** | Yes | Optimistic estimate — best-case duration |
| **Likely (M)** | Yes | Most likely duration |
| **Max (P)** | Yes | Pessimistic estimate — worst-case duration |
| **Distribution** | Yes | Triangular, PERT, or Uniform |

Leave fields empty to use the base duration (no uncertainty). Only enter estimates for activities with genuine uncertainty.

#### Cost Uncertainty (3-Point Estimates)

Same structure as schedule uncertainty, but for cost line items:

| Column | Editable | Purpose |
|--------|----------|---------|
| **Line Item** | No | Description from Cost Tracker |
| **Category** | No | Category with colour badge |
| **Base Cost** | No | Deterministic cost from Cost Tracker |
| **Min** | Yes | Optimistic cost (best case) |
| **Likely** | Yes | Most likely cost |
| **Max** | Yes | Pessimistic cost (worst case) |
| **Distribution** | Yes | Triangular, PERT, or Uniform |

Currency formatting inherits from the Cost Tracker (e.g., £, $, €).

#### Risk Events

A table with one row per risk from the Risk Register:

| Column | Purpose |
|--------|---------|
| **Include** | Toggle checkbox — include this risk in the simulation? |
| **Name** | Risk name from Risk Register |
| **Type** | Threat (red badge) or Opportunity (green badge) |
| **Likelihood** | Probability percentage from Risk Register |
| **Cost Impact** | Min–Max range, or "—" if no cost impact |
| **Time Impact** | Min–Max range in days, or "—" if no time impact |
| **Post-Mitigation** | Toggle to use post-mitigation values instead of pre-mitigation |

Excluded risks appear at 50% opacity. In each simulation iteration, a random draw determines whether each included risk occurs (based on its likelihood percentage). If triggered, its impact is sampled from the distribution and added (threats) or subtracted (opportunities) from the project totals.

#### Correlation Groups (Advanced)

Model activities whose uncertainties are linked — e.g., if weather delays one outdoor activity, it likely delays others too.

| Control | Purpose |
|---------|---------|
| **Group Name** | Descriptive label (e.g., "Weather-dependent tasks") |
| **Correlation Factor** | Slider from 0.0 (independent) to 1.0 (perfectly correlated) |
| **Activity Selection** | Multi-select buttons to choose which activities belong to this group |

A factor of 0.5 means moderate correlation; activities in the group tend to move together but not perfectly.

#### Running the Simulation

Click **Run Simulation** to execute. The button shows:

- Iteration count and execution mode (Web Worker for > 5,000 iterations)
- Progress bar with percentage during execution
- Timestamp and iteration count after completion

**Performance:** 10,000 iterations typically completes in seconds. For 100,000 iterations, execution uses a Web Worker to keep the UI responsive.

---

### Schedule Analysis Tab

Displays after running a simulation. Shows probabilistic schedule outcomes.

#### Percentile Cards

Six cards showing key schedule outcomes:

| Percentile | Meaning | Use Case |
|------------|---------|----------|
| **P10** | 90% chance of beating this duration | Optimistic scenario |
| **P50** | Median outcome — 50/50 chance | Most likely outcome |
| **P80** | 80% confidence level | **Recommended reserve target** |
| **P90** | 90% confidence level | Conservative estimate |
| **Mean** | Statistical average | May differ from P50 if distribution is skewed |
| **Deterministic** | Base plan from Gantt | What happens if nothing goes wrong |

#### Contingency Alert

If P80 exceeds the deterministic schedule, a yellow-bordered alert shows:

> "Schedule Contingency Needed (P80): +X days beyond the deterministic plan of Y days."

This quantifies how much schedule reserve is recommended.

#### Schedule S-Curve (CDF)

A cumulative distribution function chart showing the probability of completing within any given duration:

- **X-axis:** Project duration (days)
- **Y-axis:** Cumulative probability (0–100%)
- **Reference lines:** Dashed lines at P50 and P80 with labels

**Reading the S-curve:** Find your target duration on the X-axis. Read up to the curve and across to the Y-axis. That's the probability of finishing by that date.

If pre-mitigation comparison data is available, two curves overlay: pre-mitigation (red dashed) and post-mitigation (purple solid), showing the quantified benefit of risk mitigation.

#### Schedule Histogram

A frequency distribution showing how many iterations resulted in each duration range. The shape reveals whether the distribution is symmetric (equal upside and downside risk) or skewed (more downside risk than upside).

#### Schedule Sensitivity Tornado

A horizontal bar chart showing the top 10 inputs driving schedule uncertainty, ranked by Spearman rank correlation:

- **Positive correlation** (purple bars) — when this input increases, schedule increases
- **Negative correlation** (red bars) — when this input increases, schedule decreases (e.g., an opportunity)
- **Longer bars** = more influence on the outcome

Use this to focus risk mitigation efforts on the activities and risks that matter most.

---

### Cost Analysis Tab

Identical structure to Schedule Analysis, but for cost outcomes:

- **Percentile cards** in currency format (e.g., £1.2m, £245k)
- **Contingency alert** showing cost reserve recommendation
- **Cost S-curve** (CDF) in magenta
- **Cost histogram** showing frequency distribution
- **Cost sensitivity tornado** ranking the top 10 cost drivers

---

### Joint Analysis Tab

Shows the probability of achieving both schedule AND cost targets simultaneously.

#### Summary Cards

| Card | What It Shows |
|------|---------------|
| **Schedule P80** | 80th percentile schedule duration |
| **Cost P80** | 80th percentile total cost |
| **JCL @ P50** | Joint Confidence Level at the 50th percentile |
| **JCL @ P80** | Joint Confidence Level at the 80th percentile |

#### Why JCL Matters

Individual P80 values give you 80% confidence for schedule alone and 80% for cost alone. But the probability of achieving both simultaneously is always lower. The JCL quantifies this.

**Example:** If Schedule P80 = 80% and Cost P80 = 80%, the JCL might only be 65% — because achieving both is harder than achieving either one.

#### Joint Confidence Narrative

A text card explaining the results in plain language:

> "There is a X% probability that the project will complete within Y days and £Z simultaneously."

Includes comparison against deterministic baselines and an educational note explaining why JCL is lower than individual confidence levels.

#### Scatter Plot

A 2D scatter showing each simulation iteration's outcome:

- **X-axis:** Project duration (days)
- **Y-axis:** Total cost (currency)
- **Points:** Semi-transparent purple dots (downsampled to 2,000 for performance)
- **Reference crosshairs:** P50 (green dashed) and P80 (red dashed) for both dimensions

**Interpretation:**
- Tight cluster → schedule and cost are correlated (fix one, fix both)
- Wide spread → independent risks (need separate mitigation strategies)
- Upper-right quadrant → over budget AND behind schedule scenarios

---

## PM Methodology: Quantitative Risk Analysis

### What Is Monte Carlo Simulation?

Monte Carlo simulation is a probabilistic technique that runs thousands of "what-if" scenarios to build a picture of possible outcomes. Instead of a single estimate ("the project will take 180 days"), it produces a range with probabilities ("there's an 80% chance it will take 195 days or less").

### How It Works

For each of the 10,000 iterations:

1. **Sample each activity duration** from its 3-point distribution (e.g., if O=10, M=14, P=22 with Triangular, draw a random value from that shape)
2. **Sample each cost item** from its 3-point distribution
3. **Roll the dice on each risk** — if the random draw is below the likelihood percentage, the risk occurs and its impact is added
4. **Calculate total duration** considering dependencies (critical path recalculation)
5. **Calculate total cost** as sum of all sampled costs + triggered risk impacts
6. **Record the outcome** — one data point for schedule, one for cost

After all iterations, sort the results to determine percentiles.

### 3-Point Estimation

Every uncertain input uses three values:

| Value | Symbol | Meaning |
|-------|--------|---------|
| **Optimistic** | O | Best-case scenario — everything goes right |
| **Most Likely** | M | Expected outcome — what usually happens |
| **Pessimistic** | P | Worst-case scenario — everything goes wrong |

The three values define the shape of the probability distribution.

### Distribution Types

| Distribution | Shape | When to Use |
|--------------|-------|-------------|
| **Triangular** | Peak at M, linear sides | Simple projects, limited data, quick estimates |
| **PERT** | Bell-shaped, weighted toward M | Recommended default — more realistic tail behaviour than Triangular |
| **Uniform** | Flat — all values equally likely | When you know the range but have no idea about the most likely value |

**PERT is recommended** for most project activities because it weights the Most Likely value more heavily (using λ=4 in the beta distribution formula), producing more realistic results than Triangular.

### Understanding Percentiles

| Percentile | Meaning | Typical Use |
|------------|---------|-------------|
| P10 | 10% chance of being at or below this | Optimistic target (used in best-case planning) |
| P50 | 50% chance (median) | Base estimate for planning |
| P80 | 80% chance | **Industry-standard reserve target** |
| P90 | 90% chance | Conservative or high-stakes projects |

**Why P80?** Most organisations use P80 as the confidence level for budgets and schedules. It provides a reasonable buffer without being excessively conservative. P50 means a coin flip — unacceptable for most stakeholders.

### Spearman Rank Correlation

The sensitivity analysis uses Spearman rank correlation to identify which inputs drive the most variance in outputs. A correlation of +0.7 means this input strongly influences the result. Focus mitigation efforts on the top 3–5 drivers.

---

## Settings Panel

Click the gear icon to open the settings drawer.

#### Simulation
- **Iterations** — configurable from 100 to 100,000 (default: 10,000)
- Uses Web Worker for > 5,000 iterations to keep the UI responsive

#### Project
- **Project Name** — metadata label

#### Data Management
- **Export Project** — downloads `analysis-project.json` with all overrides, toggles, correlation groups, and last-run snapshot
- **Reset Project** — clears all data (requires confirmation)

---

## Integration

### Data Sources (Read-Only)

```
Gantt Chart ──────→ activities, durations, dependencies → schedule baseline
Cost Tracker ─────→ line items, categories, currency → cost baseline
Risk Register ────→ risks, likelihood, impacts (pre & post) → probabilistic events
```

The Analysis app reads from these sources but never writes to them.

### PMPlan Integration

PMPlan reads the `analysis-project` key to display quantitative analysis results in its **Quantitative Analysis** section. The last-run snapshot includes percentile values and deterministic baselines.

---

## Tips and Best Practices

**Start with Schedule, Then Add Cost:** Get your schedule model working first (3-point estimates on key activities). Then layer in cost uncertainty. Finally, add risk events.

**Don't Estimate Everything:** Only add 3-point estimates for activities and cost items with genuine uncertainty. Fixed costs and well-understood durations can keep their deterministic values.

**Use PERT Distribution by Default:** Triangular overweights the tails. PERT gives more realistic results for most project activities.

**Focus on the Tornado:** The sensitivity tornado tells you where to spend your risk mitigation budget. If one activity drives 40% of the schedule variance, that's where to invest.

**Run Pre and Post Mitigation:** Toggle between pre- and post-mitigation risk values and compare the S-curves. This quantifies the value of your risk response plans.

**10,000 Iterations Is Usually Enough:** More iterations improve precision but take longer. For most projects, 10,000 gives stable P80 values. Use 50,000+ only for critical decision points.

**Correlation Groups Matter:** If you have 5 outdoor construction activities, they should be correlated — bad weather affects all of them. Without correlation, Monte Carlo underestimates tail risk.

---

## Troubleshooting

**Q: The simulation won't run — "No schedule or cost data found."**
A: Ensure the Gantt Chart has at least one activity and/or the Cost Tracker has at least one line item. Open those apps, add data, then return to Integrated Analysis and click Refresh Data.

**Q: All percentiles show the same value.**
A: You haven't added any uncertainty. If all activities use their base duration with no 3-point estimates and no risks are included, every iteration produces the same deterministic result. Add O-M-P estimates to activities with uncertainty.

**Q: The tornado chart is empty.**
A: The tornado requires variance in inputs to calculate correlation. If only one activity has a 3-point estimate, there's no sensitivity to rank. Add estimates to multiple activities.

**Q: The Joint Analysis tab says "Run a simulation with both schedule and cost data."**
A: JCL requires both schedule and cost data. Ensure the Gantt Chart has activities (for schedule) and the Cost Tracker has line items (for cost), and that at least some items have 3-point estimates.

**Q: The simulation is slow.**
A: Reduce iterations (10,000 is usually sufficient). For > 5,000 iterations, the app automatically uses a Web Worker. If the Worker fails, it falls back to the main thread — check the browser console for errors.

**Q: Risk events don't seem to affect the results.**
A: Check that risks are toggled on (checkbox enabled) in the Risk Events section. Also verify that the risks have cost and/or time impact values — a risk with no impact has no effect on the simulation.

---

*Integrated Analysis: Quantitative cost and schedule risk analysis with Monte Carlo simulation, S-curves, tornado charts, and Joint Confidence Levels.*
