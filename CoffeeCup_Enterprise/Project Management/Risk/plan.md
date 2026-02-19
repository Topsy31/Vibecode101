# Risk Register Implementation Plan

## Overview
Create a Risk Register application in `Risk/index.html` following the same standalone HTML/React/Tailwind pattern as Gantt Chart and Kanban Board.

## Technology Stack
- React 18 (CDN)
- Tailwind CSS (CDN)
- Babel (in-browser JSX)
- Chart.js (CDN) - for histogram and CDF charts
- Same 4-theme system (Blueprint, Fun, Dark, Traditional)

## File Structure
```
Risk/
  index.html    # Complete standalone application
  plan.md       # This implementation plan
```

## Core Features

### 1. Risk Data Fields
Each risk contains:
- `id` - Auto-assigned (R001, R002...), editable
- `name` - Text input
- `description` - Textarea
- `owner` - Text input
- `type` - Dropdown: "Threat" (default) | "Opportunity"
- `likelihood` - Percentage (0-100%)
- `impactCost` - 3-point triangular: `{min, likely, max}`
- `impactTime` - 3-point triangular: `{min, likely, max}`
- `actionName` - Text input
- `actionDescription` - Textarea

### 2. Risk Table View
- Table layout similar to Gantt activity list
- Columns: ID, Name, Type, Owner, Likelihood, Impact Cost (range), Impact Time (range), Actions
- Row click expands inline editing form
- Drag handle for reordering
- Color-coded type indicator (Threat=red tones, Opportunity=green tones)

### 3. Monte Carlo Simulation Engine
```javascript
function runMonteCarloSimulation(risks, iterations = 5000) {
  const costResults = [];
  const timeResults = [];

  for (let i = 0; i < iterations; i++) {
    let totalCost = 0;
    let totalTime = 0;

    for (const risk of risks) {
      // Determine if risk occurs based on likelihood
      if (Math.random() * 100 < risk.likelihood) {
        // Sample from triangular distribution
        const costImpact = sampleTriangular(
          risk.impactCost.min,
          risk.impactCost.likely,
          risk.impactCost.max
        );
        const timeImpact = sampleTriangular(
          risk.impactTime.min,
          risk.impactTime.likely,
          risk.impactTime.max
        );

        // Threats add, opportunities subtract
        const multiplier = risk.type === 'threat' ? 1 : -1;
        totalCost += costImpact * multiplier;
        totalTime += timeImpact * multiplier;
      }
    }

    costResults.push(totalCost);
    timeResults.push(totalTime);
  }

  return { costResults, timeResults };
}

function sampleTriangular(min, mode, max) {
  const u = Math.random();
  const fc = (mode - min) / (max - min);

  if (u < fc) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  } else {
    return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }
}
```

### 4. Charts (Chart.js)

#### Histogram Chart
- Toggle between Cost and Time impact view
- Bins calculated from simulation results
- Bar chart showing frequency distribution
- X-axis: Impact value bins
- Y-axis: Frequency count

#### CDF S-Curve
- Cumulative Distribution Function
- X-axis: Impact value (sorted)
- Y-axis: Cumulative probability (0-100%)
- Smooth line chart

#### P-Value Slider
- Horizontal slider below CDF chart (range 0-100)
- Displays: "P{value} = {interpolated X value}"
- Vertical line indicator on chart at selected P
- Common presets: P10, P50, P80, P90 as quick buttons

### 5. UI Layout
```
┌─────────────────────────────────────────────────────────┐
│ Header: Risk Register | Theme Selector                  │
├─────────────────────────────────────────────────────────┤
│ Toolbar: [Add Risk] [Run Simulation] [Save] [Open]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Risk Table (scrollable)                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ID | Name | Type | Owner | L% | Cost | Time | ⋮ │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ R001 | ... | Threat | ... | 30% | 10-50-100 | ...│   │
│  │ (expanded row shows full edit form)              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Simulation Results (appears after running)              │
│  ┌──────────────────────┬──────────────────────┐       │
│  │ [Cost] [Time] Toggle │  Statistics Panel    │       │
│  ├──────────────────────┼──────────────────────┤       │
│  │                      │  Mean: $X            │       │
│  │  Histogram Chart     │  P10: $X             │       │
│  │                      │  P50: $X             │       │
│  │                      │  P80: $X             │       │
│  │                      │  P90: $X             │       │
│  ├──────────────────────┴──────────────────────┤       │
│  │  CDF S-Curve                                │       │
│  │  [=========|==================] P-slider    │       │
│  │  P{80} = {value}                           │       │
│  └─────────────────────────────────────────────┘       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6. Styling Approach
- Copy CSS variable system from Kanban (4 themes)
- Use `.input-refined`, `.btn`, `.card` patterns
- Table styling from Gantt `.gantt-row`, `.gantt-cell` patterns
- Threat rows: subtle red-tinted background
- Opportunity rows: subtle green-tinted background

### 7. File Operations
- Save: JSON download of risk data
- Open: JSON file upload
- Clear: Reset to empty state with confirmation

## Implementation Steps

1. **Create Risk/index.html skeleton**
   - HTML structure with CDN links (React, Tailwind, Babel, Chart.js)
   - Copy CSS variable system and theme styles from Kanban

2. **Build React component structure**
   - `App` - Main container with state management
   - `Header` - Title and theme selector
   - `Toolbar` - Action buttons
   - `RiskTable` - Table of risks
   - `RiskRow` - Individual risk row (collapsed/expanded)
   - `RiskForm` - Edit form within expanded row
   - `SimulationPanel` - Charts and statistics
   - `HistogramChart` - Chart.js bar chart
   - `CDFChart` - Chart.js line chart with slider

3. **Implement Monte Carlo engine**
   - Triangular distribution sampling
   - 5000 iteration simulation
   - Result aggregation and statistics

4. **Integrate Chart.js**
   - Histogram with dynamic binning
   - CDF line chart
   - P-value slider with chart annotation

5. **Add file I/O**
   - JSON save/load functionality
   - Match Gantt/Kanban file format patterns

## Design Decisions (Based on User Input)

- **Chart Library**: Chart.js (lightweight, CDN-friendly)
- **Risk Display**: Table view with inline editing
- **Distribution Input**: Three separate fields for Min/Likely/Max
- **Simulation Trigger**: Manual "Run Simulation" button
- **Units**: Numeric only (no currency/time unit labels)
- **Risk Aggregation**: Sum all risks for total project exposure
- **P-Value Display**: Shows X value at selected percentile (e.g., "P80 = 125,000")

## Verification
- Open `Risk/index.html` directly in browser
- Add 3-5 test risks with varying likelihood and impacts
- Click "Run Simulation" and verify charts render
- Test P-value slider updates display correctly
- Test all 4 themes render properly
- Test save/load functionality preserves all data

## Repository
GitHub: https://github.com/Topsy31/Risk
