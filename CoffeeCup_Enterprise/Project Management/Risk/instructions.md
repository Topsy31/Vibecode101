# Risk Register User Guide

A quantitative risk management tool for analyzing project risks using EMV calculations and Monte Carlo simulation.

---

## Getting Started

Open `index.html` in a web browser. The app runs entirely in-browser with no server required.

---

## Tab 1: Risk Register

The main data entry screen for managing your risk inventory.

### Adding a Risk

1. Click **Add Risk** in the toolbar
2. Click the new row to expand the edit form
3. Fill in the risk details:
   - **ID**: Auto-generated (editable)
   - **Name**: Short risk title
   - **Type**: Threat (negative) or Opportunity (positive)
   - **Owner**: Person responsible
   - **Likelihood**: Probability as percentage (0-100%)
   - **Impact Cost**: Min/Likely/Max values (triangular distribution)
   - **Impact Time**: Min/Likely/Max values (triangular distribution)
   - **Description**: Full risk description
4. Click **Save** to confirm changes

### Pre-Action vs Post-Action

Each risk supports two assessments:
- **Pre-Action**: Risk exposure before mitigation
- **Post-Action**: Expected exposure after implementing the response action

Fill in the Action Name/Description and Post-Action values to track mitigation effectiveness.

### Managing Risks

- Click any row to expand and edit
- Click **Delete** to remove a risk (with confirmation)
- Rows are color-coded: red for Threats, green for Opportunities

---

## Tab 2: EMV Tornado Chart

Sensitivity analysis showing which risks have the greatest impact on your project.

### Understanding EMV

**Expected Monetary Value** = Likelihood × Expected Impact

The tornado chart displays risks sorted by EMV magnitude, helping identify the key risk drivers.

### Features

- Toggle between **Cost Impact** and **Time Impact** views
- Red bars = Threats, Green bars = Opportunities
- Bars sorted by swing magnitude (largest first)
- Summary table shows Pre-EMV, Post-EMV, and reduction percentage

---

## Tab 3: Monte Carlo Analysis

Probabilistic simulation showing the range of possible project outcomes.

### How It Works

The simulation runs 10,000 iterations:
1. For each iteration, each risk either occurs or not (based on likelihood)
2. When a risk occurs, impact is sampled from its triangular distribution
3. Threats add to total exposure; Opportunities subtract
4. Results form a probability distribution of outcomes

### Charts

**Histogram**: Shows frequency distribution of outcomes
- Red = Pre-action distribution
- Green = Post-action distribution

**CDF S-Curve**: Cumulative probability distribution
- Shows probability of outcomes at or below each value
- Useful for answering "What's the chance we exceed X?"

### P-Value Analysis

Use the slider or preset buttons (P10, P50, P80, P90) to explore:
- **P10**: 10% chance the actual value will be at or below this
- **P50**: Median outcome (50/50 chance)
- **P80**: 80% confidence level
- **P90**: 90% confidence level

The comparison table shows how mitigation shifts these values.

---

## Saving and Loading Data

- **Save**: Downloads your risk register as a JSON file
- **Open**: Loads a previously saved JSON file
- **Clear**: Resets all data (with confirmation)
- Data also auto-saves to browser localStorage

---

## Themes

Click the theme selector in the header to switch between:
- Blueprint (light, professional)
- Fun (colorful)
- Dark (dark mode)
- Traditional (classic)

---

## Tips

1. **Start with key risks**: Focus on the 10-20 most significant risks
2. **Use realistic ranges**: The Min/Likely/Max spread affects simulation accuracy
3. **Review the tornado first**: Identify which risks to prioritize for mitigation
4. **Compare pre/post values**: Verify your mitigation strategies are effective
5. **Use P80 for contingency**: Common practice for budget reserves
