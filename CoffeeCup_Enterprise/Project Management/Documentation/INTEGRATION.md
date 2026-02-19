# CoffeeCup Integration Guide

## Overview

CoffeeCup uses a **hub-and-spoke** integration architecture where **PMPlan** acts as the central hub, pulling data from all other applications. This guide explains how data flows between apps, the technical implementation using `localStorage`, and best practices for keeping your project data synchronised.

---

## Integration Architecture

### Key Principles

1. **One-Way Data Flow** — Applications write their own data to `localStorage`. PMPlan reads from other apps but never modifies their data.

2. **Pull-Based Updates** — PMPlan displays "Pull Latest" banners for integrated sections. Clicking refreshes the display with current data from source apps.

3. **Data Independence** — Each app manages its own `localStorage` key. Apps don't know about or depend on each other (except PMPlan, which knows about all of them).

4. **No Shared State** — Unlike traditional PM tools with centralised databases, CoffeeCup apps store data independently. This keeps each tool simple, fast, and failure-isolated.

### The Hub: PMPlan

PMPlan is the **only application** that reads data from other apps. It serves as:

- **Integration Hub** — Aggregates data from Gantt, Risk Register, RACI Matrix, etc.
- **PMBOK Framework** — Organises data into 10 Knowledge Areas
- **Reporting Tool** — Generates comprehensive project plans for export/print

### The Spokes: Specialist Apps

All other applications are self-contained:

- **Gantt Chart** — Stores schedule data (`gantt-project`)
- **Kanban Board** — Stores task cards (`kanban-project`)
- **Risk Register** — Stores risks and simulation results (`risk-register`)
- **Hierarchy Editor** — Stores org chart/WBS (`hierarchy-data`)
- **Delphi Tool** — Stores expert studies (`delphi-studies`)
- **RACI Matrix** — Stores role assignments (`raci-project`)
- **Cost Tracker** — Stores budget lines (`cost-project`)
- **Stakeholder Map** — Stores stakeholder positions (`stakeholder-project`)
- **Change & Issue Register** — Stores change requests/issues (`changelog-project`)
- **EVM Dashboard** — Stores EVM metrics summary (`evm-project`); reads from `cost-project` and `gantt-project`
- **Quality Register** — Stores quality data (`quality-project`)
- **Integrated Analysis** — Stores analysis overrides and last-run snapshot (`analysis-project`); reads from `gantt-project`, `cost-project`, and `risk-register`

**Note:** EVM Dashboard and Integrated Analysis are **secondary consumers** — they read from other spoke apps in addition to being read by PMPlan. This makes them intermediate hubs in the data flow.

---

## LocalStorage Keys Reference

### Primary Data Keys

Every application stores its data in a unique `localStorage` key:

| Application | LocalStorage Key | Data Structure |
|-------------|------------------|----------------|
| **Gantt Chart** | `gantt-project` | `{ startDate, activities[], theme }` |
| **Kanban Board** | `kanban-project` | `{ columns[], cards[], theme }` |
| **Risk Register** | `risk-register` | `{ risks[], simulations[], theme }` |
| **Hierarchy Editor** | `hierarchy-data` | `{ nodes[], edges[], mode, theme }` |
| **Delphi Tool** | `delphi-studies` | `{ studies[], rounds[], responses[] }` |
| **RACI Matrix** | `raci-project` | `{ roles[], tasks[], assignments[], framework }` |
| **PMPlan** | `pmplan-project` | `{ sections[], metadata, versions[] }` |
| **Cost Tracker** | `cost-project` | `{ budgetLines[], categories[], actuals[] }` |
| **Stakeholder Map** | `stakeholder-project` | `{ stakeholders[], quadrants[], strategies[] }` |
| **Change & Issue Register** | `changelog-project` | `{ meta, settings, items[] }` |
| **EVM Dashboard** | `evm-project` | `{ BAC, AC, EV, PV, CPI, SPI, EAC, ETC, TCPI, ... }` |
| **Quality Register** | `quality-project` | `{ criteria[], defects[], approvals[], checklists[] }` |
| **Integrated Analysis** | `analysis-project` | `{ meta, settings, scheduleOverrides, costOverrides, riskToggles, correlationGroups[], lastRun }` |

### Theme Storage

All apps share the `coffeecup-theme` key for suite-wide theme consistency:

- `coffeecup-theme` — Shared theme key (read on load, written on change by every app)

**Modern Approach:** Newer apps store theme in the main data object, allowing per-app theme preferences or suite-wide consistency depending on implementation.

### Version History Keys

Some apps maintain version history for undo/redo:

- `pmplan-versions` — PMPlan version snapshots
- `gantt-versions` (if implemented) — Gantt state history

---

## Data Flow Diagrams

### Typical Integration Flow

```
1. USER WORKS IN GANTT CHART
   ↓
   Gantt saves to localStorage['gantt-project']
   ↓
2. USER OPENS PMPLAN
   ↓
   PMPlan detects outdated Schedule Summary section
   ↓
   Displays "Pull Latest" banner
   ↓
3. USER CLICKS "PULL LATEST"
   ↓
   PMPlan reads localStorage['gantt-project']
   ↓
   Extracts activities[], milestones[], critical path
   ↓
   Renders Schedule Summary with fresh data
   ↓
4. USER EXPORTS PMPLAN
   ↓
   Exported plan includes latest Gantt data
```

### Multi-Source Integration

Some PMPlan sections pull from multiple apps:

**Team & Organisation Section:**
```
PMPlan reads:
  ├─ localStorage['hierarchy-data'] → Org chart structure
  ├─ localStorage['raci-project']   → Role definitions
  └─ Merges into unified team view
```

**Risk Summary Section:**
```
PMPlan reads:
  ├─ localStorage['risk-register']  → Quantitative risks
  ├─ localStorage['delphi-studies'] → Expert-identified risks
  └─ Combines into comprehensive risk summary
```

---

## Integration Mapping

### What PMPlan Pulls from Each App

#### Gantt Chart → PMPlan

**Sections Populated:**
- **Schedule Summary** — Key milestones, start/end dates, critical activities
- **Schedule Baseline** — Approved schedule snapshot for performance measurement

**Data Extracted:**
```javascript
const ganttData = JSON.parse(localStorage.getItem('gantt-project'));
const milestones = ganttData.activities.filter(a => a.duration === 0);
const criticalPath = ganttData.activities.filter(a => a.isCritical);
const projectStart = ganttData.startDate;
const projectEnd = calculateEndDate(ganttData.activities);
```

**Use Case:** PMPlan displays a high-level schedule summary with milestones and critical path, not the full Gantt chart.

---

#### Risk Register → PMPlan

**Sections Populated:**
- **Risk Summary** — Top risks ranked by EMV or probability × impact
- **Risk Response Strategies** — Mitigation actions for key risks

**Data Extracted:**
```javascript
const riskData = JSON.parse(localStorage.getItem('risk-register'));
const topThreats = riskData.risks
  .filter(r => r.type === 'threat')
  .sort((a, b) => b.emv - a.emv)
  .slice(0, 5);
const topOpportunities = riskData.risks
  .filter(r => r.type === 'opportunity')
  .slice(0, 3);
```

**Use Case:** PMPlan shows high-level risk exposure, not detailed simulation charts.

---

#### RACI Matrix → PMPlan

**Sections Populated:**
- **Team & Organisation** — Key roles and responsibilities
- **Communications Plan** — Who needs to be consulted/informed
- **Stakeholder Register** — Accountability mapping

**Data Extracted:**
```javascript
const raciData = JSON.parse(localStorage.getItem('raci-project'));
const keyRoles = raciData.roles; // Responsible, Accountable roles
const consultedParties = raciData.assignments.filter(a => a.type === 'Consulted');
const informedParties = raciData.assignments.filter(a => a.type === 'Informed');
```

**Use Case:** PMPlan identifies who to communicate with based on RACI assignments.

---

#### Hierarchy Editor → PMPlan

**Sections Populated:**
- **Team & Organisation** — Org chart visualisation
- **WBS** — Work Breakdown Structure for scope decomposition

**Data Extracted:**
```javascript
const hierarchyData = JSON.parse(localStorage.getItem('hierarchy-data'));
const orgChart = hierarchyData.mode === 'org' ? hierarchyData.nodes : null;
const wbs = hierarchyData.mode === 'wbs' ? hierarchyData.nodes : null;
```

**Use Case:** PMPlan embeds a simplified org chart or WBS diagram.

---

#### Kanban Board → PMPlan

**Sections Populated:**
- **Dashboard Statistics** — Task progress, completion rates, velocity

**Data Extracted:**
```javascript
const kanbanData = JSON.parse(localStorage.getItem('kanban-project'));
const totalCards = kanbanData.cards.length;
const completedCards = kanbanData.cards.filter(c => c.column === 'done').length;
const completionRate = (completedCards / totalCards * 100).toFixed(1);
```

**Use Case:** PMPlan shows KPIs, not full Kanban board.

---

#### Delphi Tool → PMPlan

**Sections Populated:**
- **Risk Summary** — Risks identified through expert consensus
- **Schedule Estimates** — Three-point estimates from Delphi rounds

**Data Extracted:**
```javascript
const delphiData = JSON.parse(localStorage.getItem('delphi-studies'));
const identifiedRisks = delphiData.studies.flatMap(s => s.rounds.flatMap(r => r.responses));
const consensusEstimates = delphiData.studies.filter(s => s.converged);
```

**Use Case:** PMPlan incorporates expert-validated risks and estimates.

---

#### Cost Tracker → PMPlan

**Sections Populated:**
- **Budget Summary** — Planned vs actual spend, burn rate
- **Cost Baseline** — Approved budget for performance measurement

**Data Extracted:**
```javascript
const costData = JSON.parse(localStorage.getItem('cost-project'));
const totalBudget = costData.budgetLines.reduce((sum, line) => sum + line.planned, 0);
const totalSpent = costData.budgetLines.reduce((sum, line) => sum + line.actual, 0);
const remainingBudget = totalBudget - totalSpent;
```

**Use Case:** PMPlan shows financial health without detailed line items.

---

#### Stakeholder Map → PMPlan

**Sections Populated:**
- **Stakeholder Register** — Key stakeholders with power/interest classification
- **Engagement Strategies** — Recommended approach per stakeholder

**Data Extracted:**
```javascript
const stakeholderData = JSON.parse(localStorage.getItem('stakeholder-project'));
const highPowerHighInterest = stakeholderData.stakeholders.filter(s =>
  s.quadrant === 'manage-closely'
);
```

**Use Case:** PMPlan lists stakeholders with engagement recommendations.

---

#### Change & Issue Register → PMPlan

**Sections Populated:**
- **Change Management** — Recent change requests and status
- **Issue Log** — Open issues requiring resolution

**Data Extracted:**
```javascript
const changeLogData = JSON.parse(localStorage.getItem('changelog-project'));
const openChanges = changeLogData.changes.filter(c => c.status === 'Under Review');
const criticalIssues = changeLogData.issues.filter(i => i.priority === 'High' && i.status === 'Open');
```

**Use Case:** PMPlan highlights governance activity.

---

## Synchronisation Best Practices

### When to Pull Latest

**Before Exporting PMPlan:**
Always click "Pull Latest" for all integrated sections before exporting. This ensures your plan reflects the most current data.

**After Major Changes:**
If you've made significant updates in Gantt, Risk Register, or RACI Matrix, refresh PMPlan to see the impact.

**During Stakeholder Reviews:**
Pull latest data immediately before presenting to stakeholders to avoid outdated information.

### Manual Synchronisation

CoffeeCup uses **manual pull synchronisation** by design:

✅ **Advantages:**
- You control when data updates
- Prevents unexpected changes during editing
- Clear audit trail (you know when data was last refreshed)

❌ **Disadvantages:**
- Requires manual "Pull Latest" clicks
- PMPlan can display stale data if not refreshed

**Alternative (Not Implemented):** Real-time auto-sync would add complexity, potential race conditions, and performance overhead. Manual pull keeps the architecture simple and predictable.

### Data Export & Backup Strategy

**Recommended Workflow:**

1. **Weekly Exports** — Export each app's data to JSON files weekly
2. **Pre-Milestone Snapshots** — Before major reviews, export all apps
3. **Naming Convention** — `gantt-project-2026-02-12.json`
4. **Storage Location** — Keep exports in project folder or cloud storage (Dropbox, Google Drive)

**Example Backup Script (Manual):**
```javascript
// In browser console (any CoffeeCup app):
Object.keys(localStorage).forEach(key => {
  if (key.includes('project') || key.includes('register') || key.includes('data')) {
    const data = localStorage.getItem(key);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }
});
```

---

## Troubleshooting Integration Issues

### "PMPlan shows no data from Gantt"

**Causes:**
1. Gantt data not saved to `localStorage`
2. Using different browser/profile
3. LocalStorage cleared or corrupt

**Solutions:**
1. Open Gantt Chart → verify activities exist → click Save
2. Check browser DevTools → Application → LocalStorage → look for `gantt-project` key
3. Ensure Gantt and PMPlan opened in same browser

---

### "Pull Latest doesn't update data"

**Causes:**
1. Source app data unchanged
2. Browser caching issue
3. JavaScript error in PMPlan

**Solutions:**
1. Verify source app has new data (open app, check contents)
2. Hard refresh PMPlan (Ctrl+F5 / Cmd+Shift+R)
3. Check browser console for errors (F12)

---

### "Data from two apps conflicts in PMPlan"

**Example:** Hierarchy Editor and RACI Matrix both define "Project Manager" role differently.

**Solution:**
PMPlan prioritises data sources based on section type:
- **Org Chart:** Hierarchy Editor takes precedence
- **Role Definitions:** RACI Matrix takes precedence
- **Merged Views:** PMPlan attempts to reconcile, but manual review recommended

**Best Practice:** Maintain consistent role names across apps to avoid confusion.

---

### "Exported PMPlan is huge (MB)"

**Cause:** PMPlan includes full datasets from integrated apps (e.g., all 500 Gantt activities, all 10,000 Risk simulation results).

**Solutions:**
1. **Archive old data** in source apps before pulling into PMPlan
2. **Use PMPlan's "Summary Only" export** (if implemented) to exclude raw data
3. **Export individual apps separately** and reference them instead of embedding

---

### "LocalStorage quota exceeded"

**Symptoms:** Apps can't save data, or browser warns about storage limits.

**Cause:** Most browsers limit localStorage to 5-10MB per domain. Large projects with extensive Gantt charts, Risk simulations, or Delphi studies can exceed this.

**Solutions:**
1. **Export and clear old data** — Archive completed projects, clear localStorage
2. **Use multiple browser profiles** — Separate projects into different profiles
3. **Reduce data granularity** — Archive detailed simulation results, keep summaries only

---

## Advanced Integration Patterns

### Custom Data Extraction

Developers or power users can write custom scripts to extract specific data:

**Example: Export Top 10 Risks to CSV**
```javascript
const riskData = JSON.parse(localStorage.getItem('risk-register'));
const topRisks = riskData.risks
  .sort((a, b) => b.emv - a.emv)
  .slice(0, 10)
  .map(r => `${r.name},${r.emv},${r.probability},${r.impact}`)
  .join('\n');

const csv = 'Risk Name,EMV,Probability,Impact\n' + topRisks;
const blob = new Blob([csv], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'top-risks.csv';
a.click();
```

**Example: Pull All Gantt Activities into Excel Format**
```javascript
const ganttData = JSON.parse(localStorage.getItem('gantt-project'));
const csv = 'Activity,Start Date,Duration,Dependencies\n' +
  ganttData.activities
    .map(a => `${a.name},${a.startDate},${a.duration},"${a.dependencies.join(';')}"`)
    .join('\n');
// (Download logic same as above)
```

### Cross-Browser Sync (Manual)

**Workflow for Multi-Device Users:**

1. **Device A:** Export all apps to JSON
2. **Cloud Storage:** Upload JSON files to Dropbox/Google Drive
3. **Device B:** Download JSON files
4. **Device B:** Open each app → Import JSON

**Note:** CoffeeCup intentionally avoids auto-sync to maintain privacy and data locality.

---

## Integration Roadmap

### Planned Enhancements

**EVM Dashboard (In Development):**
- Pulls from **Gantt Chart** (schedule performance) + **Cost Tracker** (cost performance)
- Calculates CPI, SPI, EAC, ETC automatically
- Displays S-curve combining both data sources

**Quality Register (Planned):**
- Feeds quality metrics into PMPlan's **Quality Management** section
- Tracks defect rates, inspection results, acceptance sign-off

**Future Consideration:**
- **WebSocket-based real-time sync** (opt-in) for team collaboration
- **Export to external PM tools** (MS Project XML, Jira CSV)
- **API layer** for programmatic access to localStorage data

---

## Technical Reference

### Data Format Specifications

**Gantt Project JSON Structure:**
```json
{
  "startDate": "2026-02-12",
  "activities": [
    {
      "id": "A1",
      "name": "Design Phase",
      "duration": 10,
      "dependencies": [],
      "optimistic": 8,
      "likely": 10,
      "pessimistic": 14,
      "isCritical": true
    }
  ],
  "theme": "blueprint"
}
```

**Risk Register JSON Structure:**
```json
{
  "risks": [
    {
      "id": "R1",
      "name": "Vendor Delay",
      "type": "threat",
      "probability": 0.3,
      "impact": 50000,
      "emv": 15000,
      "distribution": "triangular",
      "responseStrategy": "Mitigate"
    }
  ],
  "simulations": {
    "iterations": 10000,
    "results": [12500, 18900, ...]
  }
}
```

**RACI Matrix JSON Structure:**
```json
{
  "framework": "RACI",
  "roles": ["Project Manager", "Developer", "QA Lead"],
  "tasks": ["Requirements", "Development", "Testing"],
  "assignments": [
    { "task": "Requirements", "role": "Project Manager", "type": "Accountable" },
    { "task": "Development", "role": "Developer", "type": "Responsible" }
  ]
}
```

For complete data schemas, inspect localStorage in browser DevTools or refer to each app's source code.

---

## See Also

- [OVERVIEW.md](OVERVIEW.md) — Suite introduction and navigation
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — Visual themes and CSS variables
- [PMPlan User Guide](apps/pmplan.md) — Detailed PMPlan usage
- [Gantt Chart User Guide](apps/gantt-chart.md) — Schedule management
- [Risk Register User Guide](apps/risk-register.md) — Risk analysis

---

*Integration architecture designed for simplicity, data ownership, and privacy. All data stays in your browser's localStorage.*
