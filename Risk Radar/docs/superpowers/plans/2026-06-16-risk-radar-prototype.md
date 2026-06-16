# Risk Radar Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file HTML/CSS/JS prototype demonstrating a radar-based strategic navigation tool with cone of possibilities overlay, 12-month track history, clickable decision branches, and a dynamic objectives panel.

**Architecture:** Single `index.html` file with embedded CSS and JS. The radar is drawn on an HTML5 Canvas element. The objectives panel is DOM-based HTML updated via JS. All scenario data is hardcoded as JS objects — no server required.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, HTML5 Canvas API

---

## File Structure

```
index.html          — entire prototype (canvas + objectives panel + controls)
```

Single file — shareable as-is, openable from the filesystem.

---

### Task 1: HTML Shell + Layout

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the HTML shell**

Create `index.html` with this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Risk Radar — Strategic Navigation</title>
  <style>
    /* styles go here in Task 2 */
  </style>
</head>
<body>
  <div id="app">
    <header id="toolbar">
      <span class="brand">Risk Radar</span>
      <div class="scenario-switcher">
        <button class="scenario-btn active" data-scenario="A">Scenario A — Improving</button>
        <button class="scenario-btn" data-scenario="B">Scenario B — Deteriorating</button>
      </div>
    </header>

    <main id="main">
      <section id="radar-panel">
        <canvas id="radar-canvas" width="700" height="700"></canvas>
        <div id="branch-controls">
          <p class="branch-label">Decision Branches</p>
          <button class="branch-btn active" data-branch="0">Current Bearing</button>
          <button class="branch-btn" data-branch="1">Branch A: Invest in Capability</button>
          <button class="branch-btn" data-branch="2">Branch B: Strategic Pivot</button>
          <button class="branch-btn" data-branch="3">Branch C: Consolidate</button>
        </div>
      </section>

      <section id="objectives-panel">
        <h2>Strategic Objectives</h2>
        <p class="objectives-subtitle">True North alignment</p>
        <ul id="objectives-list"></ul>
      </section>
    </main>
  </div>

  <script>
    /* script goes here in Tasks 3–7 */
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify file opens in browser**

Open `index.html` in a browser. You should see a plain page with "Risk Radar" in a toolbar and two scenario buttons. No canvas content yet.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: html shell and layout structure"
```

---

### Task 2: CSS Layout + Visual Design

**Files:**
- Modify: `index.html` — replace `/* styles go here in Task 2 */` with the CSS below

- [ ] **Step 1: Add CSS inside the `<style>` tag**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0a0e1a;
  color: #e0e6f0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Toolbar */
#toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #0d1220;
  border-bottom: 1px solid #1e2a40;
  flex-shrink: 0;
}

.brand {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #4fc3f7;
  text-transform: uppercase;
}

.scenario-switcher {
  display: flex;
  gap: 8px;
}

.scenario-btn {
  padding: 6px 16px;
  background: #1a2235;
  border: 1px solid #2a3550;
  border-radius: 4px;
  color: #8a9bb5;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.scenario-btn:hover { border-color: #4fc3f7; color: #e0e6f0; }
.scenario-btn.active { background: #1a3a5c; border-color: #4fc3f7; color: #4fc3f7; }

/* Main layout */
#main {
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 0;
}

/* Radar panel */
#radar-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px;
  gap: 16px;
}

#radar-canvas {
  max-width: min(700px, calc(100vh - 160px));
  max-height: min(700px, calc(100vh - 160px));
  width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(79, 195, 247, 0.08);
}

/* Branch controls */
#branch-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.branch-label {
  font-size: 0.75rem;
  color: #4a5a75;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-right: 4px;
}

.branch-btn {
  padding: 5px 14px;
  background: #1a2235;
  border: 1px solid #2a3550;
  border-radius: 20px;
  color: #8a9bb5;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.branch-btn:hover { border-color: #7986cb; color: #e0e6f0; }
.branch-btn.active { background: #1f2b4a; border-color: #7986cb; color: #b0beff; }

/* Objectives panel */
#objectives-panel {
  width: 320px;
  min-width: 280px;
  background: #0d1220;
  border-left: 1px solid #1e2a40;
  padding: 24px 20px;
  overflow-y: auto;
  flex-shrink: 0;
}

#objectives-panel h2 {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4fc3f7;
  margin-bottom: 4px;
}

.objectives-subtitle {
  font-size: 0.75rem;
  color: #4a5a75;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

#objectives-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Objective items */
.obj-item {
  border-radius: 6px;
  overflow: hidden;
}

.obj-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.15s;
  background: #131a2e;
  border: 1px solid #1e2a40;
  border-radius: 6px;
}

.obj-header:hover { background: #18213a; }
.obj-header.expanded { border-radius: 6px 6px 0 0; border-bottom-color: transparent; }

.obj-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.4s;
}

.obj-name {
  flex: 1;
  font-size: 0.82rem;
  color: #c8d4e8;
  line-height: 1.3;
}

.obj-status {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.4s;
}

.obj-expand-icon {
  font-size: 0.6rem;
  color: #4a5a75;
  transition: transform 0.2s;
}

.obj-header.expanded .obj-expand-icon { transform: rotate(180deg); }

/* Status colours */
.status-strong .obj-dot { background: #26a69a; }
.status-strong .obj-status { color: #26a69a; }
.status-moderate .obj-dot { background: #ffa726; }
.status-moderate .obj-status { color: #ffa726; }
.status-weak .obj-dot { background: #ef5350; }
.status-weak .obj-status { color: #ef5350; }
.status-critical .obj-dot { background: #b71c1c; box-shadow: 0 0 6px #b71c1c; }
.status-critical .obj-status { color: #ef5350; }

/* Sub-objectives */
.obj-children {
  display: none;
  flex-direction: column;
  gap: 2px;
  background: #0f1624;
  border: 1px solid #1e2a40;
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 4px 8px 8px;
}

.obj-children.open { display: flex; }

.obj-child {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 4px;
}

.obj-child-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.4s;
}

.obj-child-name {
  flex: 1;
  font-size: 0.77rem;
  color: #8a9bb5;
}

.obj-child-status {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: color 0.4s;
}

/* Legend */
#legend {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #1e2a40;
}

#legend p {
  font-size: 0.7rem;
  color: #4a5a75;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #6a7a95;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
```

- [ ] **Step 2: Add legend HTML before closing `</section>` of objectives panel**

Add this inside `#objectives-panel`, after `<ul id="objectives-list"></ul>`:

```html
<div id="legend">
  <p>Status Key</p>
  <div class="legend-items">
    <div class="legend-item"><div class="legend-dot" style="background:#26a69a"></div> Strong — on track</div>
    <div class="legend-item"><div class="legend-dot" style="background:#ffa726"></div> Moderate — at risk</div>
    <div class="legend-item"><div class="legend-dot" style="background:#ef5350"></div> Weak — off bearing</div>
    <div class="legend-item"><div class="legend-dot" style="background:#b71c1c"></div> Critical — needs action</div>
  </div>
</div>
```

- [ ] **Step 3: Verify layout in browser**

Open `index.html`. You should see: dark navy background, toolbar with scenario buttons, empty radar area on the left, objectives panel column on the right.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: css layout and visual design"
```

---

### Task 3: Scenario Data Model

**Files:**
- Modify: `index.html` — replace `/* script goes here in Tasks 3–7 */` with the data below

- [ ] **Step 1: Add scenario data as the first block inside `<script>`**

```javascript
// ─── Data ────────────────────────────────────────────────────────────────────

const SCENARIOS = {
  A: {
    label: 'Scenario A — Improving',
    // bearing in degrees: 0 = north (true north), clockwise positive
    // currentBearing: angle the org is currently heading
    currentBearing: 18,       // 18° east of north — slightly off
    trackHistory: [
      // 12 monthly snapshots, oldest first, bearing in degrees
      // started ~170° off (south-ish), progressively correcting
      { bearing: 168, month: -12 },
      { bearing: 145, month: -11 },
      { bearing: 122, month: -10 },
      { bearing: 100, month: -9 },
      { bearing: 82,  month: -8 },
      { bearing: 64,  month: -7 },
      { bearing: 52,  month: -6 },
      { bearing: 40,  month: -5 },
      { bearing: 34,  month: -4 },
      { bearing: 28,  month: -3 },
      { bearing: 22,  month: -2 },
      { bearing: 18,  month: -1 },
    ],
    // cone: half-angle of uncertainty cone in degrees (narrows = more certainty)
    coneHalfAngle: 22,
    // threats: items on the radar
    threats: [
      { label: 'Skills Gap', bearing: 45,  range: 0.45, size: 14, type: 'threat' },
      { label: 'Regulatory Change', bearing: 320, range: 0.65, size: 11, type: 'threat' },
      { label: 'Competitor Move', bearing: 80,  range: 0.70, size: 9,  type: 'threat' },
      { label: 'Market Expansion', bearing: 10,  range: 0.50, size: 13, type: 'opportunity' },
      { label: 'Tech Partnership', bearing: 355, range: 0.60, size: 11, type: 'opportunity' },
    ],
    // branches: decision options, each with a projected bearing shift
    branches: [
      {
        label: 'Current Bearing',
        projectedBearing: 18,
        coneHalfAngle: 22,
        color: '#4fc3f7',
        objectiveImpact: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        label: 'Branch A: Invest in Capability',
        projectedBearing: 5,
        coneHalfAngle: 16,
        color: '#26a69a',
        objectiveImpact: [1, 1, 0, 1, 0, 0, -1, 0, 1, 0, 0, 1],
      },
      {
        label: 'Branch B: Strategic Pivot',
        projectedBearing: 32,
        coneHalfAngle: 30,
        color: '#ffa726',
        objectiveImpact: [-1, 0, 1, -1, 1, 0, 0, -1, 0, 1, 0, -1],
      },
      {
        label: 'Branch C: Consolidate',
        projectedBearing: 12,
        coneHalfAngle: 18,
        color: '#7986cb',
        objectiveImpact: [0, -1, 0, 0, -1, 1, 1, 0, 0, 0, 1, 0],
      },
    ],
    // base objective statuses (0=strong, 1=moderate, 2=weak, 3=critical)
    baseObjectiveStatus: [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  },

  B: {
    label: 'Scenario B — Deteriorating',
    currentBearing: 42,
    trackHistory: [
      { bearing: 10,  month: -12 },
      { bearing: 14,  month: -11 },
      { bearing: 18,  month: -10 },
      { bearing: 22,  month: -9 },
      { bearing: 26,  month: -8 },
      { bearing: 28,  month: -7 },
      { bearing: 32,  month: -6 },
      { bearing: 35,  month: -5 },
      { bearing: 37,  month: -4 },
      { bearing: 39,  month: -3 },
      { bearing: 41,  month: -2 },
      { bearing: 42,  month: -1 },
    ],
    coneHalfAngle: 45,
    threats: [
      { label: 'Talent Flight', bearing: 55,  range: 0.35, size: 16, type: 'threat' },
      { label: 'Tech Disruption', bearing: 30,  range: 0.55, size: 14, type: 'threat' },
      { label: 'Cash Constraint', bearing: 100, range: 0.40, size: 12, type: 'threat' },
      { label: 'Regulatory Risk', bearing: 340, range: 0.60, size: 10, type: 'threat' },
      { label: 'Niche Opportunity', bearing: 5,   range: 0.75, size: 9,  type: 'opportunity' },
    ],
    branches: [
      {
        label: 'Current Bearing',
        projectedBearing: 42,
        coneHalfAngle: 45,
        color: '#4fc3f7',
        objectiveImpact: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        label: 'Branch A: Invest in Capability',
        projectedBearing: 28,
        coneHalfAngle: 35,
        color: '#26a69a',
        objectiveImpact: [1, 0, 1, 0, 1, -1, 0, 1, 0, 0, 1, 0],
      },
      {
        label: 'Branch B: Strategic Pivot',
        projectedBearing: 55,
        coneHalfAngle: 55,
        color: '#ffa726',
        objectiveImpact: [-1, -1, 0, -1, 0, 0, -1, 0, -1, 0, 0, -2],
      },
      {
        label: 'Branch C: Consolidate',
        projectedBearing: 35,
        coneHalfAngle: 38,
        color: '#7986cb',
        objectiveImpact: [0, 1, 0, 1, -1, 1, 0, 0, 1, -1, 0, 1],
      },
    ],
    baseObjectiveStatus: [1, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2],
  },
};

// 12 level-1 objectives with sub-objectives
const OBJECTIVES = [
  {
    name: 'Revenue Growth',
    children: ['Expand into new markets', 'Increase retention rate', 'Launch premium tier'],
  },
  {
    name: 'Operational Efficiency',
    children: ['Reduce cost per transaction', 'Automate manual workflows'],
  },
  {
    name: 'Talent & Culture',
    children: ['Reduce attrition below 10%', 'Build leadership pipeline'],
  },
  {
    name: 'Technology Capability',
    children: ['Migrate to cloud infrastructure', 'Implement data platform'],
  },
  {
    name: 'Customer Experience',
    children: ['NPS above 60', 'Reduce onboarding time by 40%'],
  },
  {
    name: 'Regulatory Compliance',
    children: ['ISO 27001 certification', 'GDPR audit readiness'],
  },
  {
    name: 'Strategic Partnerships',
    children: ['Sign 3 channel partners', 'API ecosystem launch'],
  },
  {
    name: 'Financial Resilience',
    children: ['18-month cash runway', 'Diversify revenue streams'],
  },
  {
    name: 'Innovation Pipeline',
    children: ['2 new products in development', 'R&D budget at 15% revenue'],
  },
  {
    name: 'Market Positioning',
    children: ['Analyst recognition (Gartner/Forrester)', 'Thought leadership content'],
  },
  {
    name: 'ESG Commitments',
    children: ['Carbon neutral by 2027', 'Diversity targets met'],
  },
  {
    name: 'Risk Management',
    children: ['Board risk appetite statement', 'Quarterly ERM review cycle'],
  },
];

const STATUS_LABELS = ['Strong', 'Moderate', 'Weak', 'Critical'];
const STATUS_CLASSES = ['strong', 'moderate', 'weak', 'critical'];

// ─── State ───────────────────────────────────────────────────────────────────
let activeScenario = 'A';
let activeBranch = 0;
```

- [ ] **Step 2: Verify no JS errors**

Open `index.html` in browser, open DevTools console. No errors should appear.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scenario data model and state variables"
```

---

### Task 4: Radar Canvas Drawing Engine

**Files:**
- Modify: `index.html` — add canvas drawing functions after the state block

- [ ] **Step 1: Add canvas utility and drawing functions**

Add this block after the state variables:

```javascript
// ─── Canvas drawing ───────────────────────────────────────────────────────────

const canvas = document.getElementById('radar-canvas');
const ctx = canvas.getContext('2d');
const CX = canvas.width / 2;   // 350
const CY = canvas.height / 2;  // 350
const MAX_R = 300;              // outermost ring radius in canvas px

// Convert bearing (degrees, 0=north, clockwise) to canvas angle (radians, 0=east, counter-clockwise)
function bearingToAngle(bearing) {
  return (bearing - 90) * Math.PI / 180;
}

// Point on circle given bearing and fraction of max radius (0–1)
function polarPoint(bearing, fraction) {
  const a = bearingToAngle(bearing);
  const r = fraction * MAX_R;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function drawRangeRings() {
  const rings = [
    { fraction: 0.25, label: '6 months' },
    { fraction: 0.50, label: '1 year' },
    { fraction: 0.75, label: '2 years' },
    { fraction: 1.00, label: '5 years' },
  ];

  rings.forEach(ring => {
    ctx.beginPath();
    ctx.arc(CX, CY, ring.fraction * MAX_R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Label at east (right)
    ctx.fillStyle = 'rgba(79, 195, 247, 0.35)';
    ctx.font = '10px Segoe UI, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ring.label, CX + ring.fraction * MAX_R + 5, CY + 4);
  });
}

function drawCompassRose() {
  // Cardinal lines
  const cardinals = [
    { bearing: 0,   label: 'N' },
    { bearing: 90,  label: 'E' },
    { bearing: 180, label: 'S' },
    { bearing: 270, label: 'W' },
  ];

  cardinals.forEach(c => {
    const p = polarPoint(c.bearing, 1.08);
    const inner = polarPoint(c.bearing, 0.0);
    ctx.beginPath();
    ctx.moveTo(inner.x, inner.y);
    ctx.lineTo(polarPoint(c.bearing, 1.0).x, polarPoint(c.bearing, 1.0).y);
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.10)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = c.label === 'N' ? '#4fc3f7' : 'rgba(79, 195, 247, 0.4)';
    ctx.font = c.label === 'N' ? 'bold 13px Segoe UI' : '11px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(c.label, p.x, p.y);
  });

  // True North marker: bright dot at centre-top
  const north = polarPoint(0, 0.04);
  ctx.beginPath();
  ctx.arc(north.x, north.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#4fc3f7';
  ctx.fill();
  ctx.fillStyle = '#4fc3f7';
  ctx.font = 'bold 10px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('TRUE NORTH', CX, CY - MAX_R - 18);
}

function drawRadarSweepBackground() {
  // Faint sector glow — static decorative sweep
  const gradient = ctx.createConicalGradient
    ? null
    : null; // conical not standard; use radial sweep instead

  // Draw subtle grid
  for (let b = 0; b < 360; b += 30) {
    const p = polarPoint(b, 1.0);
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawConeOfPossibilities(branch) {
  const bearing = branch.projectedBearing;
  const halfAngle = branch.coneHalfAngle;
  const color = branch.color;

  // Draw cone as a filled sector, widening with each range ring
  // Near term (inner) = narrow, far term (outer) = wide
  // We draw three time-horizon bands with increasing opacity toward edges

  const timeBands = [
    { fraction: 0.25, alpha: 0.18 },
    { fraction: 0.50, alpha: 0.12 },
    { fraction: 0.75, alpha: 0.08 },
    { fraction: 1.00, alpha: 0.05 },
  ];

  timeBands.forEach((band, i) => {
    const prevFraction = i === 0 ? 0 : timeBands[i - 1].fraction;
    const prevHalf = halfAngle * (prevFraction / 1.0);
    const currHalf = halfAngle * (band.fraction / 1.0);

    // Arc segment between two radii
    const startAngle = bearingToAngle(bearing - currHalf);
    const endAngle   = bearingToAngle(bearing + currHalf);
    const prevStart  = bearingToAngle(bearing - prevHalf);
    const prevEnd    = bearingToAngle(bearing + prevHalf);

    ctx.beginPath();
    ctx.arc(CX, CY, band.fraction * MAX_R, startAngle, endAngle);
    ctx.arc(CX, CY, prevFraction * MAX_R, prevEnd, prevStart, true);
    ctx.closePath();

    const hex = color;
    ctx.fillStyle = hex + Math.round(band.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
  });

  // Cone boundary lines
  const leftEdge  = polarPoint(bearing - halfAngle, 1.0);
  const rightEdge = polarPoint(bearing + halfAngle, 1.0);

  ctx.beginPath();
  ctx.moveTo(CX, CY);
  ctx.lineTo(leftEdge.x, leftEdge.y);
  ctx.strokeStyle = color + '55';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(CX, CY);
  ctx.lineTo(rightEdge.x, rightEdge.y);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawTrackHistory(scenario) {
  const track = scenario.trackHistory;
  if (track.length < 2) return;

  // Plot track as a path from 12 months ago to now
  // Range: position along radius. Oldest = 0.9 (outer), newest = 0.05 (centre)
  // We map month index to a range fraction — oldest outer, newest inner
  const points = track.map((t, i) => {
    const fraction = 0.9 - (i / (track.length - 1)) * 0.85;
    return polarPoint(t.bearing, fraction);
  });

  // Draw faint trail
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Dots for each assessment
  points.forEach((p, i) => {
    const alpha = 0.2 + (i / points.length) * 0.6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 210, 230, ${alpha})`;
    ctx.fill();
  });

  // Label oldest
  ctx.fillStyle = 'rgba(200, 210, 230, 0.35)';
  ctx.font = '9px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('−12mo', points[0].x, points[0].y - 8);
  ctx.fillText('Now', points[points.length - 1].x + 14, points[points.length - 1].y);
}

function drawCurrentBearing(bearing, color) {
  const tip = polarPoint(bearing, 0.85);
  const arrowLen = 12;
  const angle = bearingToAngle(bearing);

  // Main bearing line
  ctx.beginPath();
  ctx.moveTo(CX, CY);
  ctx.lineTo(tip.x, tip.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(
    tip.x - arrowLen * Math.cos(angle - 0.3),
    tip.y - arrowLen * Math.sin(angle - 0.3)
  );
  ctx.lineTo(
    tip.x - arrowLen * Math.cos(angle + 0.3),
    tip.y - arrowLen * Math.sin(angle + 0.3)
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawThreats(threats) {
  threats.forEach(t => {
    const p = polarPoint(t.bearing, t.range);
    const isOpportunity = t.type === 'opportunity';
    const color = isOpportunity ? '#26a69a' : '#ef5350';
    const glow  = isOpportunity ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';

    // Glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, t.size + 4, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Blip
    ctx.beginPath();
    ctx.arc(p.x, p.y, t.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Label
    ctx.fillStyle = 'rgba(220, 230, 245, 0.75)';
    ctx.font = '9px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(t.label, p.x, p.y - t.size / 2 - 5);
  });
}

function drawOriginPulse() {
  // Pulsing centre dot for current position
  ctx.beginPath();
  ctx.arc(CX, CY, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#4fc3f7';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(CX, CY, 10, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawBearingLabel(bearing, color) {
  const degrees = Math.round(bearing);
  const label = `${degrees}° from north`;
  ctx.fillStyle = color;
  ctx.font = 'bold 11px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText(label, CX, CY + MAX_R + 24);
}

function renderRadar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark background circle
  ctx.beginPath();
  ctx.arc(CX, CY, MAX_R + 2, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0e1a';
  ctx.fill();

  const scenario = SCENARIOS[activeScenario];
  const branch = scenario.branches[activeBranch];

  drawRadarSweepBackground();
  drawRangeRings();
  drawCompassRose();
  drawConeOfPossibilities(branch);
  drawTrackHistory(scenario);
  drawThreats(scenario.threats);
  drawCurrentBearing(branch.projectedBearing, branch.color);
  drawOriginPulse();
  drawBearingLabel(branch.projectedBearing, branch.color);
}
```

- [ ] **Step 2: Call renderRadar at end of script (temporarily)**

At the very end of the `<script>` block, add:

```javascript
renderRadar();
```

- [ ] **Step 3: Verify radar renders**

Open in browser. You should see: dark radar circle, four range rings labelled 6 months / 1 year / 2 years / 5 years, compass rose with N/E/S/W, a cone of possibilities, the track history trail, threat blips, and a bearing arrow.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: radar canvas drawing engine"
```

---

### Task 5: Objectives Panel Renderer

**Files:**
- Modify: `index.html` — add objectives rendering functions after the canvas drawing block

- [ ] **Step 1: Add objectives rendering function**

Add this block after the canvas drawing functions (before the temporary `renderRadar()` call):

```javascript
// ─── Objectives Panel ─────────────────────────────────────────────────────────

function getObjectiveStatus(baseStatus, impact) {
  return Math.max(0, Math.min(3, baseStatus + impact));
}

function statusClass(s) { return STATUS_CLASSES[s]; }
function statusLabel(s) { return STATUS_LABELS[s]; }

function renderObjectives() {
  const scenario = SCENARIOS[activeScenario];
  const branch = scenario.branches[activeBranch];
  const list = document.getElementById('objectives-list');
  list.innerHTML = '';

  OBJECTIVES.forEach((obj, i) => {
    const baseStatus = scenario.baseObjectiveStatus[i];
    const impact = branch.objectiveImpact[i];
    const status = getObjectiveStatus(baseStatus, impact);
    const sc = statusClass(status);
    const sl = statusLabel(status);

    const li = document.createElement('li');
    li.className = 'obj-item';

    const header = document.createElement('div');
    header.className = 'obj-header';
    header.innerHTML = `
      <div class="obj-dot status-${sc}" style="background:${dotColor(status)}"></div>
      <span class="obj-name">${obj.name}</span>
      <span class="obj-status" style="color:${dotColor(status)}">${sl}</span>
      <span class="obj-expand-icon">▼</span>
    `;

    const children = document.createElement('div');
    children.className = 'obj-children';

    obj.children.forEach((childName, j) => {
      // Child status: inherit parent with slight variation
      const childStatus = Math.max(0, Math.min(3, status + (j % 2 === 0 ? 0 : Math.min(1, impact >= 0 ? 0 : 1))));
      const cSc = statusClass(childStatus);
      const cSl = statusLabel(childStatus);
      const childEl = document.createElement('div');
      childEl.className = 'obj-child';
      childEl.innerHTML = `
        <div class="obj-child-dot" style="background:${dotColor(childStatus)}"></div>
        <span class="obj-child-name">${childName}</span>
        <span class="obj-child-status" style="color:${dotColor(childStatus)}">${cSl}</span>
      `;
      children.appendChild(childEl);
    });

    header.addEventListener('click', () => {
      const isOpen = children.classList.contains('open');
      // Close all others
      document.querySelectorAll('.obj-children.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.obj-header.expanded').forEach(el => el.classList.remove('expanded'));
      if (!isOpen) {
        children.classList.add('open');
        header.classList.add('expanded');
      }
    });

    li.appendChild(header);
    li.appendChild(children);
    list.appendChild(li);
  });
}

function dotColor(status) {
  return ['#26a69a', '#ffa726', '#ef5350', '#b71c1c'][status];
}
```

- [ ] **Step 2: Update the temporary call at bottom of script**

Replace the temporary `renderRadar();` with:

```javascript
// ─── Initial render ───────────────────────────────────────────────────────────
renderRadar();
renderObjectives();
```

- [ ] **Step 3: Verify objectives panel**

Open in browser. The right panel should show 12 objectives with coloured dots and status labels. Clicking a row should expand/collapse sub-objectives.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: objectives panel renderer with expand/collapse"
```

---

### Task 6: Interaction — Scenario + Branch Switching

**Files:**
- Modify: `index.html` — add event listeners and update logic after the render functions

- [ ] **Step 1: Add interaction logic**

Add this block after the `dotColor` function:

```javascript
// ─── Interaction ──────────────────────────────────────────────────────────────

function setActiveScenario(key) {
  activeScenario = key;
  activeBranch = 0;
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scenario === key);
  });
  syncBranchButtons();
  renderRadar();
  renderObjectives();
}

function setActiveBranch(index) {
  activeBranch = index;
  syncBranchButtons();
  renderRadar();
  renderObjectives();
}

function syncBranchButtons() {
  const scenario = SCENARIOS[activeScenario];
  document.querySelectorAll('.branch-btn').forEach(btn => {
    const idx = parseInt(btn.dataset.branch, 10);
    btn.classList.toggle('active', idx === activeBranch);
    btn.textContent = scenario.branches[idx].label;
  });
}

document.querySelectorAll('.scenario-btn').forEach(btn => {
  btn.addEventListener('click', () => setActiveScenario(btn.dataset.scenario));
});

document.querySelectorAll('.branch-btn').forEach(btn => {
  btn.addEventListener('click', () => setActiveBranch(parseInt(btn.dataset.branch, 10)));
});
```

- [ ] **Step 2: Update initial render block to call syncBranchButtons**

Replace the `// ─── Initial render` block with:

```javascript
// ─── Initial render ───────────────────────────────────────────────────────────
syncBranchButtons();
renderRadar();
renderObjectives();
```

- [ ] **Step 3: Verify interactions**

Open in browser:
- Click "Scenario B — Deteriorating": radar redraws with wider cone and different bearing, objectives shift to more red/critical
- Click "Branch A: Invest in Capability": bearing arrow moves, cone narrows, objectives update dynamically
- Click back to "Scenario A" and try other branches
- Expand objective rows to see sub-objectives

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: scenario and branch switching interactions"
```

---

### Task 7: Polish — Radar Background, Labels, Responsive Canvas

**Files:**
- Modify: `index.html` — refine canvas rendering and add responsive resize

- [ ] **Step 1: Add responsive canvas resize handler**

Add this block after the interaction code, before the initial render block:

```javascript
// ─── Responsive canvas ────────────────────────────────────────────────────────

function resizeCanvas() {
  const panel = document.getElementById('radar-panel');
  const available = Math.min(panel.clientWidth - 40, panel.clientHeight - 100);
  const size = Math.max(300, Math.min(700, available));
  canvas.style.width  = size + 'px';
  canvas.style.height = size + 'px';
}

window.addEventListener('resize', () => {
  resizeCanvas();
  renderRadar();
});

resizeCanvas();
```

- [ ] **Step 2: Add scan-line texture to radar background in drawRadarSweepBackground**

Replace the existing `drawRadarSweepBackground` function body with:

```javascript
function drawRadarSweepBackground() {
  // Radial gradient background
  const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, MAX_R);
  grad.addColorStop(0, 'rgba(79, 195, 247, 0.04)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.beginPath();
  ctx.arc(CX, CY, MAX_R, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle grid spokes
  for (let b = 0; b < 360; b += 30) {
    const p = polarPoint(b, 1.0);
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.05)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
```

- [ ] **Step 3: Add a scope border around the radar canvas**

Add this to the end of `renderRadar()`, just before the closing `}`:

```javascript
  // Outer border ring
  ctx.beginPath();
  ctx.arc(CX, CY, MAX_R, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();
```

- [ ] **Step 4: Add bearing drift annotation**

Add this function after `drawBearingLabel`:

```javascript
function drawDriftAnnotation(bearing) {
  if (Math.abs(bearing) < 3) return;
  const dir = bearing > 0 ? 'east' : 'west';
  const deg = Math.abs(Math.round(bearing));
  ctx.fillStyle = 'rgba(200, 210, 230, 0.35)';
  ctx.font = '9px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText(`${deg}° drift ${dir} of True North`, CX, CY + MAX_R + 38);
}
```

Then add a call to it inside `renderRadar()` after `drawBearingLabel(...)`:

```javascript
  drawDriftAnnotation(branch.projectedBearing);
```

- [ ] **Step 5: Final verification**

Open in browser and test the complete prototype:
- Both scenarios render correctly
- All 4 branches switch on click with radar updating
- Cone widens visibly in Scenario B vs A
- Track history trail is visible (south to centre in A, centre drifting east in B)
- Objectives update colour when switching branches
- Sub-objectives expand on click
- Page resizes without breaking layout

- [ ] **Step 6: Final commit**

```bash
git add index.html
git commit -m "feat: radar polish — responsive canvas, background gradient, drift annotation"
```

---

## Self-Review Against Spec

| Requirement | Task |
|---|---|
| Radar + cone combined view | Task 4 `drawConeOfPossibilities` |
| Cone widens with time horizons (range rings) | Task 4 — `timeBands` sector bands |
| Track history trail south→centre (A) and centre→east (B) | Task 4 `drawTrackHistory`, data in Task 3 |
| Click to reveal decision branches | Task 6 branch button interaction |
| Branch updates bearing arrow on radar | Task 4 `drawCurrentBearing`, Task 6 |
| Two switchable scenarios (A improving, B deteriorating) | Task 3 data, Task 6 scenario switcher |
| 12 objectives, level-1 only by default | Task 5, OBJECTIVES array |
| Objectives hierarchically nested, expandable | Task 5 click handler |
| Objectives colour-coded by health | Task 5 `dotColor`, status classes |
| Objectives update dynamically on branch switch | Task 6 calls `renderObjectives()` |
| Pure HTML/CSS/JS, no server | Single `index.html` throughout |
| Shareable as folder | Single file, no external dependencies |
