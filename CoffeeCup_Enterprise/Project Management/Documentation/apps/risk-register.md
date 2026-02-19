# Risk Register

## Purpose

The Risk Register is a quantitative risk analysis tool that combines traditional risk management with probabilistic Monte Carlo simulation. It calculates Expected Monetary Value (EMV) for each risk, runs 10,000-iteration simulations to model outcome distributions, and provides pre/post-action assessment to measure mitigation effectiveness.

**Best For:** High-stakes projects where quantitative risk analysis is required (construction, major IT implementations, R&D, investment decisions), PMBOK-compliant risk management, evidence-based contingency planning.

---

## Quick Start

### Creating Your First Risk Register

1. **Add Your First Risk**
   - Click **Add Risk** button in header
   - New row appears in table
   - Click row to expand edit form

2. **Fill in Risk Details**
   - **ID:** Auto-generated (R001, R002, etc.) — editable
   - **Name:** Short risk title (e.g., "Vendor Delay")
   - **Type:** Threat (negative) or Opportunity (positive)
   - **Owner:** Person responsible for managing this risk
   - **Likelihood:** Probability (0-100%)
   - **Impact Cost:** Min/Likely/Max values (£)
   - **Impact Time:** Min/Likely/Max values (days)
   - **Description:** Full risk narrative

3. **Save the Risk**
   - Click **Save** button
   - Risk appears in register with calculated EMV

4. **View EMV Tornado Chart**
   - Navigate to **EMV Tornado** tab
   - See risks ranked by Expected Monetary Value
   - Identify key risk drivers

5. **Run Monte Carlo Simulation**
   - Navigate to **Monte Carlo** tab
   - Simulation runs automatically (10,000 iterations)
   - View histogram and CDF (S-curve)
   - Explore P-values (P10, P50, P80, P90)

---

## Features

### Risk Register Table

#### Risk Attributes

**Core Fields:**

| Field | Purpose | Format | Example |
|-------|---------|--------|---------|
| **ID** | Unique identifier | Auto-generated or custom | R001, R-VENDOR-001 |
| **Name** | Short risk title | Text (50 chars) | "Vendor Delay" |
| **Type** | Threat or Opportunity | Dropdown | Threat |
| **Owner** | Risk owner | Text | "John Smith" |
| **Likelihood** | Probability of occurrence | Percentage (0-100%) | 30% |
| **Impact Cost (Min/Likely/Max)** | Triangular distribution for cost impact | Currency (£) | £10k / £50k / £100k |
| **Impact Time (Min/Likely/Max)** | Triangular distribution for schedule impact | Days | 5 / 15 / 30 days |
| **Description** | Full risk narrative | Text (500 chars) | "Key vendor may miss delivery deadline due to..." |

**Advanced Fields:**

| Field | Purpose | Format |
|-------|---------|--------|
| **Action Name** | Mitigation strategy title | Text |
| **Action Description** | How to mitigate | Text |
| **Post-Action Likelihood** | Probability after mitigation | Percentage |
| **Post-Action Impact Cost** | Cost impact after mitigation | Min/Likely/Max (£) |
| **Post-Action Impact Time** | Time impact after mitigation | Min/Likely/Max (days) |

#### Adding Risks

1. Click **Add Risk** button
2. Risk row appears with default values
3. Click anywhere on row to expand edit form
4. Fill in fields (all fields optional except Name and Type)
5. Click **Save**

**Default Values:**
- ID: Auto-increments (R001, R002, R003...)
- Likelihood: 50%
- Impact Cost: £0 / £10,000 / £20,000
- Impact Time: 0 / 5 / 10 days
- Type: Threat

#### Editing Risks

1. Click on any risk row
2. Edit form expands
3. Modify any field
4. Click **Save** to commit changes
5. Click **Cancel** to discard

**Auto-Calculations:**
- **EMV (Cost)** = Likelihood × Expected Impact Cost
  - Expected Impact = (Min + 4×Likely + Max) / 6 (PERT formula)
- **EMV (Time)** = Likelihood × Expected Impact Time

**Example:**
- Risk: Vendor Delay
- Likelihood: 30%
- Impact Cost: £10k / £50k / £100k
- Expected Impact = (10,000 + 4×50,000 + 100,000) / 6 = £51,667
- **EMV = 0.30 × £51,667 = £15,500**

#### Deleting Risks

1. Click **Delete** button (red trash icon) on risk row
2. Confirmation dialog appears
3. Click **Confirm** to delete

**Warning:** Deletion is immediate and cannot be undone. Export your register before major deletions.

#### Risk Colouring

**Visual Coding:**
- **Red background** — Threats (negative risks)
- **Green background** — Opportunities (positive risks)

**Purpose:** Quick visual distinction between threats and opportunities in large registers (50+ risks).

---

### Pre-Action vs Post-Action Assessment

**Concept:** Assess risk exposure **before** and **after** implementing mitigation strategies.

#### Pre-Action Assessment (Inherent Risk)

**What It Is:** Risk exposure with **no mitigation** in place.

**Fields:**
- Likelihood (pre-action)
- Impact Cost (pre-action)
- Impact Time (pre-action)

**Use Case:** Understand baseline risk, prioritise which risks to mitigate.

#### Post-Action Assessment (Residual Risk)

**What It Is:** Risk exposure **after** mitigation action is implemented.

**Fields:**
- Action Name (e.g., "Contract penalty clause")
- Action Description (e.g., "Add late delivery penalty to vendor contract")
- Post-Action Likelihood (e.g., reduced from 30% to 10%)
- Post-Action Impact Cost (e.g., reduced from £50k to £20k)
- Post-Action Impact Time (e.g., reduced from 15 days to 5 days)

**Use Case:** Quantify mitigation effectiveness, justify mitigation spend, calculate residual risk for contingency planning.

#### Mitigation Effectiveness Calculation

**Example:**
- **Pre-Action EMV:** 30% × £50k = £15,000
- **Post-Action EMV:** 10% × £20k = £2,000
- **Risk Reduction:** £15,000 - £2,000 = £13,000 (87% reduction)

**Dashboard Display:** EMV Tornado chart shows pre and post EMV side-by-side, with reduction percentage.

**Insight:** If mitigation costs £5,000 but reduces EMV by £13,000, it's cost-effective (ROI = 160%).

---

### EMV Tornado Chart

**Purpose:** Sensitivity analysis showing which risks have the greatest impact on project outcomes.

#### What is a Tornado Chart?

A horizontal bar chart where risks are sorted by **EMV magnitude** (largest at top), resembling a tornado shape.

**Features:**
- Red bars: Threats (negative EMV, bars extend left)
- Green bars: Opportunities (positive EMV, bars extend right)
- X-axis: EMV in currency (£)
- Y-axis: Risk names (sorted by magnitude)

**Why "Tornado"?**
- Widest bars at top (biggest impact risks)
- Narrowest bars at bottom (smallest impact risks)
- Shape prioritises focus

#### Viewing EMV Tornado

1. Navigate to **EMV Tornado** tab
2. Toggle **Cost Impact** or **Time Impact** view
3. Risks sort automatically by EMV magnitude

**Cost Impact View:**
- Shows EMV calculated from cost impacts (£)
- Use for budget contingency planning

**Time Impact View:**
- Shows EMV calculated from time impacts (days)
- Use for schedule contingency planning

#### Interpreting the Chart

**Example Chart:**

```
Risk B (Threat)    ████████████████████████  £75,000
Risk A (Threat)    ██████████████████        £60,000
Risk E (Threat)    ████████████              £40,000
Risk C (Opportunity)      ██████████  £35,000
Risk D (Threat)    ████                      £15,000
Risk F (Opportunity)      ████        £12,000
```

**Insights:**
- Focus mitigation on Risk B and Risk A (highest EMV threats)
- Risk C is top opportunity — exploit this
- Risk D and Risk F are low priority (small EMV)

**80/20 Rule:** Often 20% of risks account for 80% of total EMV. Tornado chart makes this visible.

#### Pre vs Post Comparison

**Table Below Chart:**

| Risk | Pre-EMV | Post-EMV | Reduction | % Reduction |
|------|---------|----------|-----------|-------------|
| Risk A | £60,000 | £10,000 | £50,000 | 83% |
| Risk B | £75,000 | £75,000 | £0 | 0% |

**Interpretation:**
- Risk A: Effective mitigation (83% reduction)
- Risk B: No mitigation planned (0% reduction) — requires action plan

**Use Case:** Present to stakeholders to justify mitigation budget.

---

### Monte Carlo Simulation

**Purpose:** Probabilistic analysis showing the **range** of possible project outcomes, not just a single-point estimate.

#### What is Monte Carlo Simulation?

A computational technique that:
1. Runs thousands of iterations (10,000 in Risk Register)
2. For each iteration:
   - Determines if each risk occurs (based on likelihood)
   - If occurs, samples impact from triangular distribution (Min/Likely/Max)
   - Sums all impacts (threats add, opportunities subtract)
3. Results form a probability distribution of total project exposure

**Why Use It?**
- Single-point EMV = **expected average** (mean)
- Monte Carlo shows **full range** (min, max, P10, P50, P90)
- Answers: "What's the probability we exceed £X contingency?"

#### Running the Simulation

**Automatic:**
- Navigate to **Monte Carlo** tab
- Simulation runs automatically on page load
- 10,000 iterations complete in <2 seconds

**Manual Re-Run:**
- Click **Re-Run Simulation** button
- Use when risks have changed since last visit

**Progress Indicator:**
- "Running 10,000 iterations..." message
- Completes near-instantly (modern browsers)

#### Understanding the Histogram

**X-Axis:** Total Cost Exposure (£)
**Y-Axis:** Frequency (number of iterations with that outcome)

**Two Distributions:**
- **Red** — Pre-action (inherent risk)
- **Green** — Post-action (residual risk)

**Shape Interpretation:**
- **Narrow bell curve** — Low uncertainty, outcomes clustered near mean
- **Wide, flat curve** — High uncertainty, outcomes vary widely
- **Skewed right** — Potential for extreme high-cost outcomes (fat tail)

**Example:**
- Pre-action: Mean = £150k, Range = £50k to £350k (wide)
- Post-action: Mean = £60k, Range = £30k to £120k (narrow)
- **Mitigation reduces both mean and uncertainty**

#### Understanding the CDF (S-Curve)

**CDF = Cumulative Distribution Function**

**X-Axis:** Total Cost Exposure (£)
**Y-Axis:** Cumulative Probability (0% to 100%)

**Reading the Chart:**
- Pick a value on X-axis (e.g., £100k)
- Read up to the curve, then left to Y-axis
- Y-value = probability outcome is **at or below** £100k

**Example:**
- CDF shows 80% at £120k
- **Interpretation:** "There's an 80% chance total exposure will be £120k or less" (P80 = £120k)

**Inverse Reading:**
- Pick a probability on Y-axis (e.g., 90%)
- Read right to curve, then down to X-axis
- X-value = P90 (90% confidence level)

**Two Curves:**
- **Red** — Pre-action CDF
- **Green** — Post-action CDF
- Green curve left of red = mitigation working

#### P-Value Analysis

**P-Values Explained:**

| P-Value | Name | Meaning | Use Case |
|---------|------|---------|----------|
| **P10** | 10th Percentile | 10% chance actual exposure is at or below this | Optimistic scenario |
| **P50** | Median (50th Percentile) | 50/50 chance (most likely outcome) | Central estimate |
| **P80** | 80th Percentile | 80% confidence level | Common for contingency planning |
| **P90** | 90th Percentile | 90% confidence level | Conservative contingency |

**Interactive Slider:**
- Drag slider to any percentile (1% to 99%)
- Table updates with corresponding cost and time values
- Compare pre-action vs post-action at selected percentile

**Preset Buttons:**
- Click **P10**, **P50**, **P80**, **P90** for quick navigation

**Example P-Value Table:**

| Metric | Pre-Action | Post-Action | Reduction |
|--------|------------|-------------|-----------|
| **P50** | £150,000 | £60,000 | £90,000 (60%) |
| **P80** | £220,000 | £95,000 | £125,000 (57%) |
| **P90** | £280,000 | £125,000 | £155,000 (55%) |

**Insight:** Even at P90 (conservative), mitigation saves £155,000.

#### Setting Contingency Reserves

**Best Practice:**
- Use **P80** for cost contingency (80% confidence)
- PMBOK recommends P75-P80 for most projects
- High-risk projects: Use P90 (90% confidence)

**Example:**
- Monte Carlo shows P80 = £120,000
- Set cost contingency reserve = £120,000
- 80% chance actual risk exposure doesn't exceed this

**Integration with Cost Tracker:**
- Cost Tracker can pull EMV data from Risk Register
- Sets contingency = sum of all threat EMVs (P50 equivalent)
- For higher confidence, manually set contingency = P80 value

---

## Project Management Concepts

### Probability Distributions

#### Triangular Distribution

**Definition:**
A probability distribution defined by three parameters:
- **Minimum (Min):** Best-case scenario (low boundary)
- **Likely (Mode):** Most probable value (peak of triangle)
- **Maximum (Max):** Worst-case scenario (high boundary)

**Shape:**
```
        /\
       /  \
      /    \
     /      \
    /        \
   /          \
  /____________\
 Min   Likely  Max
```

**Why Use Triangular?**
- Simple to elicit from experts ("What's the best case, likely case, worst case?")
- Doesn't require extensive historical data
- Commonly used in project management (PERT)

**PERT Estimate:**
```
Expected Value = (Min + 4×Likely + Max) / 6
```

**Example:**
- Vendor Delay Impact: £10k (Min), £50k (Likely), £100k (Max)
- Expected Value = (10,000 + 4×50,000 + 100,000) / 6 = £51,667

**Alternative:** Uniform distribution (all values equally likely) — rarely realistic in project contexts.

#### Sampling from Triangular Distribution

**Monte Carlo Process:**
1. Generate random number between 0 and 1
2. Use inverse transform method to sample from triangular distribution
3. Result is a value between Min and Max, with peak probability at Likely

**Example Iteration:**
- Random number: 0.65
- Samples from Vendor Delay distribution
- Might return: £58,000 (near Likely value)

**Over 10,000 Iterations:**
- Samples form triangular shape
- Mean converges to PERT expected value (£51,667)

---

### Expected Monetary Value (EMV)

**Definition:**
EMV = Probability of Risk × Expected Impact

**Formula:**
```
EMV = Likelihood × [(Min + 4×Likely + Max) / 6]
```

**For Threats:**
- EMV is **negative** (cost increase or schedule delay)
- Displayed as positive value with "Threat" label

**For Opportunities:**
- EMV is **positive** (cost savings or schedule acceleration)
- Displayed as positive value with "Opportunity" label

**Use Cases:**
1. **Prioritisation:** Rank risks by EMV (largest first)
2. **Contingency Planning:** Sum of all threat EMVs = contingency reserve
3. **Mitigation ROI:** If mitigation costs less than EMV reduction, it's worthwhile

**Example:**
- Risk: Technology Failure
- Likelihood: 20%
- Impact: £50k (Min) / £150k (Likely) / £300k (Max)
- Expected Impact = (50,000 + 4×150,000 + 300,000) / 6 = £158,333
- **EMV = 0.20 × £158,333 = £31,667**

**Interpretation:** On average, this risk costs the project £31,667. Budget £31,667 contingency for it.

---

### Pre-Action vs Post-Action (Inherent vs Residual Risk)

**Terminology:**

| Term | Meaning | Risk Register Field |
|------|---------|---------------------|
| **Inherent Risk** | Risk exposure with **no controls** | Pre-Action values |
| **Residual Risk** | Risk exposure **after controls** | Post-Action values |
| **Risk Treatment** | Mitigation action | Action Name, Action Description |

**PMBOK Risk Response Strategies:**

**For Threats:**
1. **Avoid** — Eliminate risk (change project plan)
2. **Mitigate** — Reduce likelihood or impact
3. **Transfer** — Shift risk to third party (insurance, contracts)
4. **Accept** — Acknowledge risk, set contingency

**For Opportunities:**
1. **Exploit** — Ensure opportunity occurs
2. **Enhance** — Increase likelihood or positive impact
3. **Share** — Partner to benefit together
4. **Accept** — Passive acceptance, no action

**Risk Register Implementation:**
- **Avoid:** Delete risk from register (if eliminated)
- **Mitigate:** Enter post-action values (lower likelihood/impact)
- **Transfer:** Reduce impact (insurance caps exposure)
- **Accept:** Leave post-action blank (inherent = residual)

---

### Risk Management Process (PMBOK)

**1. Identify Risks**
- Brainstorm, Delphi technique, SWOT analysis
- **Tool:** Risk Register table (add all identified risks)

**2. Perform Qualitative Analysis**
- Rate probability and impact (High/Medium/Low)
- **Tool:** EMV Tornado chart (prioritisation)

**3. Perform Quantitative Analysis**
- Probabilistic simulation
- **Tool:** Monte Carlo simulation (10,000 iterations)

**4. Plan Risk Responses**
- Define mitigation actions
- **Tool:** Action Name, Action Description fields

**5. Monitor and Control Risks**
- Track residual risk, update register
- **Tool:** Compare pre/post EMV, re-run simulation monthly

---

## Integration with Cost Tracker

### Pulling EMV Data for Contingency

**Workflow:**

1. **Populate Risk Register** — Add all identified threats with likelihood and impact
2. **Run Monte Carlo** — Verify P80 value for contingency sizing
3. **Open Cost Tracker** — Navigate to **Reserves** tab
4. **Select "Pull from Risk Register"** — Cost Tracker reads `localStorage['risk-register']`
5. **Review Breakdown** — Cost Tracker shows which risks contributed to contingency
6. **Approve Contingency** — Cost Tracker sets contingency reserve = sum of threat EMVs

**Data Extracted:**
```javascript
const riskData = JSON.parse(localStorage.getItem('risk-register'));
const threats = riskData.risks.filter(r => r.type === 'threat');
const contingency = threats.reduce((sum, r) => sum + r.emv, 0);
```

**Example:**
- Risk A: £15,000 EMV
- Risk B: £31,667 EMV
- Risk C: £8,500 EMV
- **Total Contingency:** £55,167

**Re-Pulling:**
- As risks are mitigated or retired, re-pull EMV data
- Contingency decreases (or increases if new risks emerge)

**Best Practice:** Pull EMV monthly during risk review meetings.

---

### Integration with PMPlan

#### Data PMPlan Pulls

When you click "Pull Latest" in PMPlan's **Risk Summary** section, it reads:

**From `localStorage['risk-register']`:**
- Top 5 threats by EMV
- Top 3 opportunities by EMV
- Total number of risks
- Total pre-action exposure (sum of threat EMVs)
- Total post-action exposure (sum of residual threat EMVs)
- Risk reduction percentage

**What PMPlan Displays:**
- High-level risk summary table (top threats and opportunities)
- Total risk exposure (pre/post)
- Mitigation effectiveness (% reduction)

**What PMPlan Doesn't Display:**
- Full risk register (too detailed)
- Monte Carlo charts (live in Risk Register)
- Individual risk descriptions

#### Workflow

1. **Build risk register** — Identify risks, assess likelihood/impact, plan mitigations
2. **Run Monte Carlo** — Verify P80 for contingency
3. **Open PMPlan** — Navigate to Risk Summary section
4. **Click "Pull Latest"** — PMPlan reads Risk Register data
5. **Review summary** — High-level risk exposure for stakeholders
6. **Export PMPlan** — Include risk summary in formal project plan

---

## Tips & Best Practices

### Risk Identification

1. **Use Multiple Techniques**
   - Brainstorming (team workshops)
   - Expert interviews (Delphi method)
   - Historical data (past projects)
   - Checklists (PMBOK risk categories)

2. **Risk Categories (PMBOK):**
   - **Technical:** Technology maturity, complexity, dependencies
   - **External:** Vendors, regulations, market conditions
   - **Organisational:** Resources, priorities, stakeholder support
   - **Project Management:** Estimation, planning, control

3. **Don't Over-Populate**
   - Focus on **10-20 key risks** (Pareto principle)
   - 100+ risks = unmanageable, low value
   - Quality over quantity

### Probability and Impact Estimation

1. **Use Historical Data When Available**
   - "Vendor delays occurred on 3 of last 10 projects" → 30% likelihood
   - Actual delays ranged 5-30 days → Min/Likely/Max values

2. **Three-Point Estimates (Delphi)**
   - Ask 3-5 experts for Min/Likely/Max
   - Average results (reduces bias)
   - Document assumptions

3. **Likelihood Calibration:**
   - 10% = Rare (1 in 10 projects)
   - 30% = Unlikely (1 in 3 projects)
   - 50% = Even chance (coin flip)
   - 70% = Likely (2 in 3 projects)
   - 90% = Almost certain (9 in 10 projects)

4. **Impact Ranges:**
   - **Narrow range** (Min/Max close to Likely) — High certainty
   - **Wide range** (Min/Max far from Likely) — High uncertainty
   - Example: £40k / £50k / £60k (narrow) vs £10k / £50k / £200k (wide)

### Mitigation Planning

1. **Mitigation Threshold:**
   - If EMV > £X (e.g., £25,000), plan mitigation
   - If EMV < £X, accept risk (not cost-effective to mitigate)

2. **Cost-Benefit Analysis:**
   - Mitigation Cost: £10,000
   - EMV Reduction: £35,000 → £8,000 = £27,000
   - **Net Benefit:** £27,000 - £10,000 = £17,000 (ROI = 170%)
   - Proceed with mitigation

3. **Residual Risk:**
   - Some risk always remains (post-action EMV > 0)
   - Set contingency for residual risk (not inherent risk)

4. **Document Assumptions:**
   - "Post-action likelihood assumes vendor contract penalty clause implemented"
   - If assumption changes, update post-action values

### Monte Carlo Interpretation

1. **Use P80 for Contingency**
   - Standard practice in construction and IT
   - Balances confidence and conservatism

2. **Communicate Uncertainty:**
   - Don't present P50 as "the answer"
   - Show range: "50% chance exposure is £60k-£120k"

3. **Re-Run Monthly:**
   - As risks materialise or are mitigated, distribution shifts
   - Update register, re-run simulation, adjust contingency

4. **Check Distribution Shape:**
   - If histogram has long right tail (fat tail), high-impact outliers exist
   - Consider additional mitigation for tail risks

### Data Quality

1. **Garbage In, Garbage Out:**
   - EMV and Monte Carlo are only as good as input data
   - If likelihood is guessed ("probably 50%?"), results are unreliable

2. **Validate with Stakeholders:**
   - Review tornado chart with project team
   - Ask: "Do these top 5 risks match our intuition?"
   - If not, re-assess probability/impact

3. **Update Regularly:**
   - Monthly risk reviews (minimum)
   - After major milestones or scope changes
   - Mark risks as "Occurred" or "Retired"

---

## Troubleshooting

### Monte Carlo shows "No data"

**Cause:** No risks with likelihood > 0% exist.

**Solution:**
1. Go to **Risk Register** tab
2. Verify at least one risk has Likelihood > 0%
3. Return to **Monte Carlo** tab → simulation re-runs

---

### EMV values seem incorrect

**Cause:** Impact values entered incorrectly (e.g., £50k entered as £50).

**Debug:**
1. Check impact fields: Min/Likely/Max
2. Ensure values are in full currency (£50,000, not £50)
3. Verify likelihood is percentage (30%, not 0.30)

**Calculator:**
- Expected Impact = (Min + 4×Likely + Max) / 6
- EMV = Likelihood × Expected Impact

---

### Histogram looks strange (spiky, gaps)

**Cause:** Low iteration count or identical risk values.

**Solutions:**
- Iteration count is fixed at 10,000 (sufficient)
- If histogram spiky, likely many risks have identical Min/Likely/Max values
- Add variation to impact ranges (realistic uncertainty)

---

### Post-action EMV higher than pre-action

**Cause:** Data entry error (post-action impact higher than pre-action).

**Solution:**
1. Review post-action fields
2. Post-action likelihood should be ≤ pre-action
3. Post-action impact should be ≤ pre-action
4. If mitigation **increases** risk (rare), document why

---

### Charts not displaying

**Cause:** Chart.js CDN failed to load.

**Solution:**
1. Check internet connection
2. Hard refresh (Ctrl+F5 / Cmd+Shift+R)
3. Check browser console (F12) for errors

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Enter** | Save risk (when edit form focused) |
| **Esc** | Cancel edit, collapse risk row |
| **Ctrl/Cmd + S** | Auto-save (triggers localStorage update) |
| **Delete** | Delete focused risk (with confirmation) |

---

## Technical Notes

### LocalStorage Key

**Primary Key:** `risk-register`

**Data Structure:**
```json
{
  "risks": [
    {
      "id": "R001",
      "name": "Vendor Delay",
      "type": "threat",
      "owner": "John Smith",
      "likelihood": 0.30,
      "impactCost": {
        "min": 10000,
        "likely": 50000,
        "max": 100000
      },
      "impactTime": {
        "min": 5,
        "likely": 15,
        "max": 30
      },
      "description": "Key vendor may miss delivery deadline...",
      "actionName": "Contract penalty clause",
      "actionDescription": "Add late delivery penalty to contract",
      "postLikelihood": 0.10,
      "postImpactCost": {
        "min": 5000,
        "likely": 20000,
        "max": 50000
      },
      "postImpactTime": {
        "min": 2,
        "likely": 5,
        "max": 10
      },
      "emv": 15500,
      "postEmv": 2000
    }
  ],
  "simulationResults": {
    "preAction": {
      "iterations": 10000,
      "outcomes": [/* array of 10,000 values */],
      "mean": 150000,
      "p10": 85000,
      "p50": 145000,
      "p80": 220000,
      "p90": 280000
    },
    "postAction": {
      /* same structure */
    }
  }
}
```

---

## See Also

- [Cost Tracker](cost-tracker.md) — EMV-based contingency planning
- [Delphi Tool](delphi-tool.md) — Expert consensus for risk identification
- [PMPlan Integration](pmplan.md) — How risk data feeds into project plans
- [OVERVIEW.md](../OVERVIEW.md) — Suite introduction

---

*Risk Register: Quantitative risk analysis with Monte Carlo simulation and EMV calculations. Built with React 18 and Chart.js.*
