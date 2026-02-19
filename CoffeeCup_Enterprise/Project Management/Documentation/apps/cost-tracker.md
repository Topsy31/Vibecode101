# Cost Tracker

## Purpose

The Cost Tracker is a comprehensive budget management application that combines traditional cost control with Earned Value Management (EVM) metrics. It provides real-time visibility into project financials with interactive Chart.js visualisations, PMBOK-aligned cost hierarchy, and integration with the Risk Register for evidence-based contingency planning.

**Best For:** Construction projects, IT implementations, consulting engagements, any project where budget control is critical.

---

## Quick Start

### Creating Your First Budget

1. **Set Project Metadata**
   - Click **Settings** (gear icon in header)
   - Enter project name
   - Set start and end dates
   - Choose currency symbol (£, $, €)

2. **Add Budget Categories**
   - Default categories provided: Labour, Materials, Equipment, Subcontractors, Travel, Overheads, Professional Services
   - Click **Add Category** to create custom categories
   - Assign colours for visual distinction in charts

3. **Add Budget Line Items**
   - Click **+ Add Line Item** within any category
   - Enter description (e.g., "Senior Developer")
   - Set quantity, unit (Hours/Days/Units/Lump Sum), and unit rate
   - Planned cost calculates automatically

4. **Record Actual Spend**
   - Click **Edit** on any line item
   - Enter **Actual Cost** field
   - Optionally record earned value (% complete × planned cost)
   - Variance calculates automatically

5. **View Dashboard**
   - Navigate to **Dashboard** tab
   - See budget health at a glance: total budget, spent, remaining, CPI, SPI
   - Interactive charts update in real-time

---

## Features

### Budget Hierarchy (PMBOK-Aligned)

The Cost Tracker follows the PMBOK cost structure:

```
Total Project Budget (£1,000,000)
├─ Cost Baseline (£850,000)
│  ├─ Labour (£400,000)
│  │  ├─ Senior Developer (80 hrs × £150)
│  │  └─ Junior Developer (160 hrs × £75)
│  ├─ Materials (£200,000)
│  └─ Equipment (£250,000)
├─ Contingency Reserve (£100,000) — For known risks
└─ Management Reserve (£50,000) — For unknown-unknowns
```

**Key Concepts:**

- **Cost Baseline** — Sum of all category budgets (authorised, time-phased)
- **Contingency Reserve** — Buffer for identified risks (managed by PM)
- **Management Reserve** — Buffer for unidentified risks (requires senior approval to use)
- **Total Project Budget** — Cost Baseline + Contingency + Management Reserve

---

### Category Management

#### Default Categories

Seven categories provided out-of-the-box:

| Category | Typical Use | Colour |
|----------|-------------|--------|
| **Labour** | Staff costs, salaries, contractor fees | Indigo |
| **Materials** | Raw materials, consumables | Green |
| **Equipment** | Machinery, tools, IT hardware | Amber |
| **Subcontractors** | Third-party services | Pink |
| **Travel** | Flights, accommodation, mileage | Teal |
| **Overheads** | Rent, utilities, admin | Purple |
| **Professional Services** | Legal, accounting, consulting | Orange |

#### Adding Categories

1. Click **+ Add Category** button
2. Enter category name
3. Choose colour (hex picker or preset palette)
4. Category appears in list and charts

#### Editing Categories

1. Click **Edit** icon on category card
2. Modify name or colour
3. Click **Save**

**Note:** Editing a category doesn't affect line items within it (they remain associated).

#### Deleting Categories

1. Click **Delete** icon (red trash)
2. Confirm deletion

**Warning:** Deleting a category deletes all line items within it. Export your project before major deletions.

#### Reordering Categories

- Drag-and-drop category cards using handle (≡ icon)
- Order affects display in lists and charts

---

### Line Item Management

#### Adding Line Items

1. Expand category (click chevron)
2. Click **+ Add Line Item**
3. Fill out form:
   - **Description** — What is being purchased (e.g., "Senior Project Manager")
   - **Quantity** — Number of units (e.g., 160)
   - **Unit** — Hours, Days, Units, or Lump Sum
   - **Unit Rate** — Cost per unit (e.g., £150/hour)
   - **Planned Cost** — Auto-calculates (Quantity × Unit Rate) or manual entry for lump sum
   - **Actual Cost** (optional) — Actual spend to date
   - **Earned Value** (optional) — Percentage complete × Planned Cost

4. Click **Save Line Item**

**Unit Types Explained:**

- **Hours** — Typical for labour (e.g., 160 hours × £150/hr = £24,000)
- **Days** — For day-rate contractors (e.g., 20 days × £600/day = £12,000)
- **Units** — For materials/equipment (e.g., 500 units × £25/unit = £12,500)
- **Lump Sum** — For fixed-price contracts (quantity = 1, unit rate = total cost)

#### Editing Line Items

1. Click **Edit** button on line item row
2. Modify any field
3. Click **Save**

**Auto-Calculation:**
- If you edit Quantity or Unit Rate, Planned Cost recalculates
- If you manually enter Planned Cost, it overrides calculation (useful for negotiated prices)

#### Deleting Line Items

1. Click **Delete** button (red X)
2. Line item removes immediately

**Effect:** Category total decreases, charts update, baseline unaffected (if set).

#### Recording Actuals

**Purpose:** Track actual spend against budget to calculate variances.

**Methods:**

1. **Edit Line Item** — Enter actual cost directly
2. **Import Transactions** (future feature) — CSV upload from accounting system
3. **PMPlan Integration** — Pull actuals from external systems

**Best Practice:** Update actuals weekly or after each purchase order.

---

### Contingency Reserve

**Definition:** Budget set aside for **known risks** (identified in Risk Register).

#### Manual Contingency

**Setup:**
1. Go to **Reserves** tab
2. Select **Manual** method
3. Enter contingency amount (e.g., £100,000)

**Use Case:** You've estimated contingency based on expert judgment or historical data.

#### Percentage-Based Contingency

**Setup:**
1. Select **Percentage** method
2. Enter percentage of cost baseline (e.g., 10%)
3. Contingency calculates automatically

**Example:**
- Cost Baseline: £850,000
- Contingency Percentage: 10%
- Contingency Reserve: £85,000

#### Risk Register Integration (EMV-Based)

**Setup:**
1. Select **Pull from Risk Register** method
2. Click **Pull EMV Data**
3. Cost Tracker reads `localStorage['risk-register']`
4. Contingency sets to **sum of threat EMVs**

**How It Works:**
- Risk Register runs Monte Carlo simulation for each risk
- Expected Monetary Value (EMV) = Probability × Impact
- For threats: EMV is potential cost increase (negative)
- Cost Tracker sums all threat EMVs to determine evidence-based contingency

**Example:**
- Risk 1: Vendor Delay — 30% probability × £50,000 impact = £15,000 EMV
- Risk 2: Material Price Increase — 20% × £25,000 = £5,000 EMV
- Risk 3: Scope Creep — 40% × £30,000 = £12,000 EMV
- **Total Contingency:** £32,000

**Benefits:**
- Evidence-based, not arbitrary
- Updates as risks are mitigated
- Transparent to stakeholders

**Workflow:**
1. Populate Risk Register with threats
2. Run Monte Carlo simulations
3. Pull EMV data into Cost Tracker
4. Review contingency adequacy
5. Re-pull monthly as risks evolve

#### Utilising Contingency

**Purpose:** Track contingency drawdown as risks materialise.

**Method:**
1. Go to **Reserves** tab → **Contingency** section
2. Click **Utilise Contingency**
3. Enter amount used, reason, and date
4. Click **Record**

**Example Entry:**
- **Amount:** £15,000
- **Reason:** "Vendor delay caused overtime costs"
- **Date:** 2026-02-12

**Dashboard Impact:**
- Contingency gauge updates (shows £15k utilised)
- Remaining contingency decreases
- Contingency burn rate calculates

**Best Practice:** Link utilisation to Risk Register entries (e.g., "Risk R001 materialised").

---

### Management Reserve

**Definition:** Budget for **unknown risks** (unidentified at planning stage). Requires senior management approval to access.

#### Percentage-Based Management Reserve

**Setup:**
1. Go to **Reserves** tab → **Management Reserve**
2. Select **Percentage** method
3. Enter percentage (typically 5-15% of cost baseline)

**Example:**
- Cost Baseline: £850,000
- Management Reserve: 10%
- Reserve Amount: £85,000

#### Manual Management Reserve

**Setup:**
1. Select **Manual** method
2. Enter fixed amount

**Use Case:** Senior management allocated a specific reserve amount.

**Note:** Unlike contingency, management reserve doesn't track utilisation within Cost Tracker (organisational process requires approval outside PM tool).

---

### Earned Value Management (EVM)

#### What is EVM?

Earned Value Management integrates scope, schedule, and cost to assess project performance and forecast completion.

**Key Metrics:**

| Metric | Symbol | Formula | Meaning |
|--------|--------|---------|---------|
| **Planned Value** | PV | Budgeted cost for work scheduled | What you planned to spend by now |
| **Earned Value** | EV | Budgeted cost for work performed | Value of work actually completed |
| **Actual Cost** | AC | Actual cost for work performed | What you actually spent |
| **Cost Variance** | CV | EV - AC | Positive = under budget, Negative = over budget |
| **Schedule Variance** | SV | EV - PV | Positive = ahead of schedule, Negative = behind |
| **Cost Performance Index** | CPI | EV / AC | >1 = efficient, <1 = over budget |
| **Schedule Performance Index** | SPI | EV / PV | >1 = ahead, <1 = behind |
| **Estimate at Completion** | EAC | BAC / CPI | Forecasted total cost at project end |
| **Estimate to Complete** | ETC | EAC - AC | Remaining budget needed |
| **To-Complete Performance Index** | TCPI | (BAC - EV) / (BAC - AC) | CPI needed to finish on budget |

**Legend:**
- **BAC** (Budget at Completion) = Total planned cost (cost baseline)

#### Calculating EVM Metrics in Cost Tracker

**Automatic Calculation:**
1. Enter **Planned Cost** for all line items → Cost Tracker calculates PV
2. Record **Actual Cost** as work progresses → Cost Tracker calculates AC
3. Enter **Earned Value** (% complete × Planned Cost) for completed items → Cost Tracker calculates EV

**Example:**
- Line Item: "Senior Developer" — £24,000 planned
- 50% complete → Earned Value = £12,000
- Actual spent: £14,000

**Results:**
- CV = £12,000 - £14,000 = -£2,000 (over budget)
- CPI = £12,000 / £14,000 = 0.86 (inefficient, need £1.16 of cost to earn £1 of value)

#### EVM Dashboard Visualisations

**S-Curve Chart:**
- X-axis: Time (months from project start to end)
- Y-axis: Cumulative cost (£)
- Three lines:
  - **Planned Value (PV)** — Blue line, baseline spending plan
  - **Earned Value (EV)** — Green line, actual progress
  - **Actual Cost (AC)** — Red line, actual spend

**Interpretation:**
- **EV above PV** → Ahead of schedule
- **EV below AC** → Over budget
- **All three converge at project end** → Ideal outcome

**CPI/SPI Trend Chart:**
- X-axis: Time periods
- Y-axis: Index value (0.0 to 2.0)
- Two lines:
  - **CPI** — Cost efficiency over time
  - **SPI** — Schedule efficiency over time
- Horizontal line at 1.0 = baseline

**Use Case:** Spot trends early (e.g., CPI declining for 3 months = systemic cost issue).

#### Forecasting with EVM

**Estimate at Completion (EAC):**

Cost Tracker calculates EAC using the formula:
```
EAC = BAC / CPI
```

**Example:**
- BAC (Budget at Completion): £1,000,000
- CPI (to date): 0.85
- EAC = £1,000,000 / 0.85 = £1,176,471

**Interpretation:** Based on current cost performance, project will finish £176,471 over budget.

**To-Complete Performance Index (TCPI):**

```
TCPI = (BAC - EV) / (BAC - AC)
```

**Example:**
- BAC: £1,000,000
- EV: £400,000 (earned to date)
- AC: £500,000 (spent to date)
- TCPI = (£1,000,000 - £400,000) / (£1,000,000 - £500,000) = 1.20

**Interpretation:** To finish on budget, you need to achieve a CPI of 1.20 for remaining work (20% more efficient than originally planned). If current CPI is 0.80, this is unrealistic — budget overrun is inevitable.

---

### Visualisations (Chart.js)

Cost Tracker includes **four interactive charts** powered by Chart.js:

#### 1. S-Curve (Planned vs Earned vs Actual)

**Purpose:** Visualise cumulative spending and progress over time.

**Features:**
- Three lines: PV (blue), EV (green), AC (red)
- Time-phased by month (or custom period)
- Interactive tooltips (hover to see exact values)
- Responsive (scales to screen size)

**Use Case:** Executive reporting, performance reviews, forecasting.

#### 2. Burn-Down Chart

**Purpose:** Show remaining budget over time.

**Features:**
- X-axis: Time periods
- Y-axis: Remaining budget (£)
- Declining line (ideally straight, indicating steady burn)
- Baseline comparison

**Use Case:** Identify if spending accelerating or deceleating relative to plan.

#### 3. Category Breakdown (Donut Chart)

**Purpose:** Show budget allocation across categories.

**Features:**
- Each slice = category (sized by planned cost)
- Colour-coded (matches category colours)
- Percentage labels
- Click slice to highlight category

**Use Case:** Understand cost structure at a glance (e.g., "60% is labour").

#### 4. Contingency Gauge

**Purpose:** Visual indicator of contingency reserve status.

**Features:**
- Gauge (semi-circle)
- Green zone: <50% utilised
- Amber zone: 50-80% utilised
- Red zone: >80% utilised
- Centre displays remaining contingency (£)

**Use Case:** Quick health check — if gauge is red, contingency nearly exhausted, escalate.

#### Customising Charts

**Theme Adaptation:**
- Charts automatically adapt colours to selected theme (Blueprint, Fun, Dark, Traditional)
- Dark theme uses high-contrast colours for readability
- Fun theme uses vibrant gradient fills

**Export Charts:**
- Right-click chart → "Save image as..."
- Embeds in presentations, reports

---

### Time-Phased Budgeting

**Purpose:** Distribute costs across project timeline (monthly/quarterly).

**Setup:**
1. Go to **Time-Phased** tab
2. Cost Tracker generates periods from project start to end date
3. Allocate line item costs to specific periods

**Methods:**

#### Automatic Distribution (Planned)

- Cost Tracker distributes line item costs evenly across project duration
- Example: £24,000 over 12 months = £2,000/month

#### Manual Allocation

- Edit each period cell to assign specific amounts
- Example: Front-load labour costs (£5k in Month 1, £3k in Month 2, etc.)

**Uses:**
- Cash flow forecasting
- Funding requests (show monthly budget needs)
- S-curve accuracy (PV line follows time-phased plan)

**Export:** Time-phased data exports to Excel-compatible CSV.

---

### Baseline Management

**Purpose:** Lock in approved budget for performance measurement.

**Creating a Baseline:**
1. Finalise all budget line items
2. Go to **Baselines** tab
3. Click **Create Baseline**
4. Enter baseline name (e.g., "Approved Budget v1.0")
5. Click **Save**

**What's Captured:**
- All categories and line items (planned costs)
- Contingency and management reserve amounts
- Time-phased allocations
- Timestamp and creator

**Comparing to Baseline:**
- Dashboard shows "Variance to Baseline" metrics
- CV and SV calculate against baseline, not current budget

**Multiple Baselines:**
- Store multiple baselines (e.g., "Original", "Re-Baseline after Scope Change")
- Select active baseline for comparison

**Use Case:** After approved budget change, create new baseline to reset EVM metrics.

---

### Integration with PMPlan

#### Data PMPlan Pulls

When you click "Pull Latest" in PMPlan's **Budget Summary** section, it reads:

**From `localStorage['cost-project']`:**
- Total project budget (cost baseline + reserves)
- Budget breakdown by category (£ and %)
- Spend to date (actual costs)
- Contingency reserve status
- EVM metrics (CPI, SPI, EAC, ETC)

**What PMPlan Displays:**
- High-level budget summary table
- Contingency utilisation gauge
- Cost performance index (CPI)
- Forecast at completion (EAC vs BAC)

**What PMPlan Doesn't Display:**
- Individual line items
- Time-phased data
- Detailed charts (these live in Cost Tracker)

#### Workflow

1. **Build budget in Cost Tracker** — Add categories, line items, set reserves
2. **Record actuals** — Update spent amounts weekly
3. **Open PMPlan** — Navigate to Budget Summary section
4. **Click "Pull Latest"** — PMPlan reads Cost Tracker data
5. **Review summary** — High-level financial status for stakeholders
6. **Export PMPlan** — Include budget summary in formal project plan

---

### Integration with Risk Register

#### Pulling EMV Data

**Purpose:** Set contingency based on quantified risk analysis.

**Steps:**
1. Populate Risk Register with threats (type = threat, not opportunity)
2. Run Monte Carlo simulations (10,000 iterations)
3. Open Cost Tracker → **Reserves** tab
4. Click **Pull from Risk Register**
5. Cost Tracker reads `localStorage['risk-register']`
6. Extracts EMV for each threat
7. Sums EMVs → sets as contingency reserve

**Data Extracted:**
```javascript
const riskData = JSON.parse(localStorage.getItem('risk-register'));
const threats = riskData.risks.filter(r => r.type === 'threat');
const totalEMV = threats.reduce((sum, r) => sum + r.emv, 0);
// Set contingency = totalEMV
```

**Breakdown Table:**
- Cost Tracker displays which risks contributed to contingency
- Example:
  - Risk R001: Vendor Delay — £15,000
  - Risk R003: Material Price Increase — £5,000
  - **Total Contingency:** £20,000

**Re-Pulling:**
- Click **Pull from Risk Register** anytime to refresh
- If risks are mitigated or new risks added, contingency updates

**Best Practice:** Pull EMV monthly during risk reviews.

---

## Tips & Best Practices

### Budgeting Best Practices

1. **Bottom-Up Estimating**
   - Start with granular line items (individual roles, materials)
   - Roll up to categories, then total budget
   - More accurate than top-down allocation

2. **Include All Cost Elements**
   - Don't forget overheads (rent, utilities, admin)
   - Factor in professional services (legal, accounting)
   - Consider travel and subsistence

3. **Use Lump Sum for Fixed-Price Contracts**
   - Unit = "Lump Sum", Quantity = 1
   - Unit Rate = total contract value

4. **Percentage-Based Reserves**
   - Contingency: 5-15% (higher for risky projects)
   - Management Reserve: 5-10% (per organisational policy)

5. **Regular Baseline Reviews**
   - Re-baseline after approved scope changes
   - Don't re-baseline for minor adjustments (maintains EVM integrity)

### EVM Accuracy

1. **Realistic Earned Value**
   - EV = % Complete × Planned Cost
   - Use **physical percent complete** (not guesses)
   - For software: Use story points or features complete
   - For construction: Use quantities installed

2. **Update Actuals Weekly**
   - Stale actual costs = misleading CPI
   - Integrate with accounting system if possible

3. **Time-Phase Accurately**
   - Front-loaded projects: allocate more cost to early periods
   - Back-loaded projects: allocate more to late periods
   - Avoid even distribution if unrealistic

4. **Monitor Trends, Not Snapshots**
   - Single-period CPI = 0.80 might be anomaly (large invoice)
   - Declining CPI over 3 months = systemic issue

### Contingency Management

1. **Link Utilisations to Risk Register**
   - When drawing contingency, note which risk materialised
   - Update Risk Register (risk status → "Occurred")

2. **Don't Over-Rely on Contingency**
   - Contingency is not "extra budget for scope creep"
   - It's for **identified risks only**

3. **Replenish Contingency When Risks Retire**
   - If Risk A had £10k EMV and is mitigated, consider reallocating £10k from contingency to other risks or returning to budget

### Data Backup

1. **Export Weekly**
   - Click **Export** → saves JSON file
   - Naming: `cost-project-YYYY-MM-DD.json`

2. **Before Major Changes**
   - Export before deleting categories or re-baselining

3. **Version Control**
   - Store exports in Git, Dropbox, or SharePoint
   - Enables rollback if data corruption occurs

---

## Troubleshooting

### Charts not displaying

**Cause:** Chart.js CDN failed to load, or JavaScript error.

**Solution:**
1. Check browser console (F12) for errors
2. Hard refresh (Ctrl+F5 / Cmd+Shift+R)
3. Verify internet connection (CDN requires online access initially)

**Fallback:** Chart.js has dual CDN (jsdelivr and cdnjs) — if one fails, other loads.

---

### EVM metrics show "N/A"

**Cause:** Missing earned value data (EV not recorded for line items).

**Solution:**
1. Go to **Budget** tab
2. Edit line items, enter **Earned Value** field
3. EV = % Complete × Planned Cost
4. Save line items
5. Return to Dashboard — EVM metrics now calculate

**Minimum Requirement:** At least one line item with EV > 0.

---

### Contingency pull from Risk Register fails

**Cause:** Risk Register data not found, or no threats exist.

**Debug Steps:**
1. Open Risk Register application
2. Verify risks exist with **type = threat** (not opportunity)
3. Ensure EMV is calculated (run Monte Carlo simulation)
4. Return to Cost Tracker, try pulling again

**Check localStorage:**
```javascript
// In browser console:
const riskData = JSON.parse(localStorage.getItem('risk-register'));
console.log(riskData);
```

If `null`, Risk Register has no saved data.

---

### Time-phased periods don't align with project dates

**Cause:** Project start/end dates changed after periods generated.

**Solution:**
1. Go to **Settings** → update start/end dates
2. Go to **Time-Phased** tab → click **Regenerate Periods**
3. Re-allocate costs to new periods

---

### CPI is exactly 1.00 despite variances

**Cause:** Earned Value equals Actual Cost (uncommon unless deliberately set).

**Solution:**
- Verify EV is accurate (not copy-pasted from AC)
- Check individual line items for data entry errors

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + S** | Auto-save (triggers localStorage update) |
| **Ctrl/Cmd + P** | Print current tab |
| **Esc** | Close modal, cancel edit |
| **Enter** | Save line item (when form focused) |

---

## Technical Notes

### LocalStorage Key

**Primary Key:** `cost-project`

**Data Structure:**
```json
{
  "meta": {
    "name": "Project Name",
    "startDate": "2026-02-12",
    "endDate": "2027-02-12",
    "currencySymbol": "£"
  },
  "categories": [
    {
      "id": "cat-id",
      "name": "Labour",
      "colour": "#6366f1",
      "lineItems": [
        {
          "id": "line-id",
          "description": "Senior Developer",
          "quantity": 160,
          "unit": "hours",
          "unitRate": 150,
          "plannedCost": 24000,
          "actualCost": 14000,
          "earnedValue": 12000
        }
      ]
    }
  ],
  "contingency": {
    "method": "risk-register",
    "manualAmount": null,
    "emvPulledDate": "2026-02-12T10:30:00Z",
    "riskBreakdown": [
      { "riskId": "R001", "riskName": "Vendor Delay", "emv": 15000 }
    ],
    "utilised": 15000,
    "utilisedLog": [
      { "amount": 15000, "reason": "Risk R001 materialised", "date": "2026-02-15" }
    ]
  },
  "managementReserve": {
    "method": "percentage",
    "percentage": 10
  }
}
```

### Risk Register Integration Key

**Reads From:** `localStorage['risk-register']`

**Expected Structure:**
```json
{
  "risks": [
    {
      "id": "R001",
      "name": "Vendor Delay",
      "type": "threat",
      "probability": 0.3,
      "impact": 50000,
      "emv": 15000
    }
  ]
}
```

---

## See Also

- [Risk Register](risk-register.md) — Quantitative risk analysis for contingency planning
- [PMPlan Integration](pmplan.md) — How budget data feeds into project plans
- [Gantt Chart](gantt-chart.md) — Schedule integration for SPI calculation
- [OVERVIEW.md](../OVERVIEW.md) — Suite introduction

---

*Cost Tracker: PMBOK-aligned budget management with EVM metrics and Risk Register integration. Built with React 18 and Chart.js.*
