# CoffeeCup Project Management Suite

## What is CoffeeCup?

CoffeeCup is a comprehensive, browser-based project management suite designed for professional project managers, team leads, and anyone who needs to plan, track, and manage complex projects. Unlike heavyweight enterprise PM tools, CoffeeCup runs entirely in your browser—no installation, no server, no subscription. All your data stays on your computer, stored securely in your browser's local storage.

The suite follows a **modular architecture**: each application is a self-contained tool that excels at one thing, from scheduling activities in a Gantt chart to running Monte Carlo risk simulations. When you need the big picture, the **PMPlan** application acts as a central hub, pulling data from all other tools to build a complete project management plan aligned with the PMBOK framework.

### Philosophy

CoffeeCup embodies three core principles:

1. **Privacy First** — Your project data never leaves your computer. No cloud sync, no telemetry, no tracking. LocalStorage persistence means you own and control your data completely.

2. **Modular Excellence** — Each application does one thing exceptionally well. Use what you need, ignore what you don't. Apps work independently but integrate seamlessly when needed.

3. **Visual Consistency** — Every application shares a unified design system with four beautiful themes. Whether you prefer the professional Blueprint theme or the playful Fun & Vibrant variant, the entire suite adapts to your aesthetic preference.

---

## Application Catalogue

CoffeeCup currently includes **14 completed applications** plus the Main Dashboard navigation hub.

### Completed Applications

| Application | Purpose | Complexity | Best For |
|-------------|---------|------------|----------|
| **[Main Dashboard](apps/main-dashboard.md)** | Central navigation hub for all CoffeeCup applications | Simple | Starting point, discovering tools |
| **[Gantt Chart](apps/gantt-chart.md)** | Interactive project scheduling with dependencies, critical path analysis, and three-point estimation | High | Scheduling complex projects, dependency management, timeline visualisation |
| **[Kanban Board](apps/kanban-board.md)** | Visual task management with customisable columns, drag-and-drop cards, and workflow analytics | Medium | Agile workflows, personal task management, team collaboration |
| **[Risk Register](apps/risk-register.md)** | Monte Carlo risk analysis with 10,000-iteration simulations, EMV tornado charts, and pre/post-action assessment | High | Quantitative risk analysis, uncertainty modelling, investment decisions |
| **[Hierarchy Editor](apps/hierarchy-editor.md)** | Organisational structure and Work Breakdown Structure (WBS) visualisation with Tree View and Organogram modes | Medium | Org charts, project decomposition, reporting hierarchies |
| **[Delphi Tool](apps/delphi-tool.md)** | Expert consensus gathering using the systematic Delphi method with anonymous rounds and structured questionnaires | Medium | Risk identification, estimation, forecasting with expert panels |
| **[RACI Matrix](apps/raci-matrix.md)** | Responsibility assignment matrix builder supporting RACI, RASCI, and DACI frameworks with role grouping | Medium | Clarifying accountability, communication planning, stakeholder engagement |
| **[Cost Tracker](apps/cost-tracker.md)** | Budget management with PMBOK cost hierarchy, EVM metrics, Chart.js visualisations (S-curve, burn-down, donut, contingency gauge), and Risk Register integration | High | Budget control, cost forecasting, earned value management, contingency planning |
| **[Stakeholder Map](apps/stakeholder-map.md)** | Power/interest quadrant grid with drag-and-drop positioning and engagement strategy recommendations | Medium | Stakeholder analysis, engagement planning, communications strategy |
| **[PMPlan](apps/pmplan.md)** | Central integration hub that pulls data from all other apps to build a comprehensive PM plan (PMBOK 10 Knowledge Areas) | Medium | Creating formal project plans, integrating all project data, executive reporting |
| **[Change & Issue Register](apps/change-issue-register.md)** | Combined change request and issue log with status workflows, impact assessment, and dashboard analytics | Medium | Change control, issue tracking, governance, CCB decision support |
| **[EVM Dashboard](apps/evm-dashboard.md)** | Earned Value Management with CPI/SPI gauges, S-curve chart, forecasts, and critical path integration (pulls from Gantt + Cost Tracker) | Medium | Performance measurement, cost/schedule forecasting, executive reporting |
| **[Quality Register](apps/quality-register.md)** | Quality criteria definition, inspection checklists, defect tracking (Kanban workflow), and formal acceptance sign-off | Medium | Quality assurance, compliance, acceptance testing, deliverable sign-off |
| **[Integrated Analysis](apps/integrated-analysis.md)** | Quantitative cost and schedule risk analysis with Monte Carlo simulation, S-curves, tornado charts, and Joint Confidence Levels | High | Reserve estimation, sensitivity analysis, confidence level reporting, risk quantification |
| **[Estimator](apps/estimator.md)** | Bottom-up material quantity estimation from dimensions with coverage rates, wastage factors, pack rounding, and priced bills of quantities | Medium | Material takeoff, quantity surveying, procurement costing, shopping lists |

---

## Integration Model

CoffeeCup uses a **hub-and-spoke architecture** with **PMPlan** at the centre.

### How It Works

```
┌─────────────────┐
│  Gantt Chart    │──────┐
└─────────────────┘      │
                         │    ┌──────────────────────┐
┌─────────────────┐      ├───>│      PMPlan          │
│  Kanban Board   │──────┤    │  (Central Hub)       │
└─────────────────┘      │    └──────────────────────┘
                         │              │
┌─────────────────┐      │              │
│  Risk Register  │──────┤              v
└─────────────────┘      │    ┌──────────────────────┐
                         │    │  Comprehensive       │
┌─────────────────┐      │    │  Project Plan        │
│  RACI Matrix    │──────┘    └──────────────────────┘
└─────────────────┘

(+ Hierarchy, Delphi, Cost Tracker, Stakeholder Map, Change Log, EVM, Quality)
```

### Key Principles

1. **One-Way Data Flow** — Apps store their data independently in `localStorage`. PMPlan reads from other apps but **never writes** to them. This prevents data corruption and maintains clear ownership.

2. **Pull-Based Updates** — PMPlan displays "Pull Latest" banners for each section. When you click, it reads the current state from the source app (e.g., Gantt, Risk Register) and updates the displayed summary.

3. **Data Independence** — Each app manages its own data structure. You can use Gantt without ever opening PMPlan, or run Risk simulations without touching the Stakeholder Map. Integration is optional, not required.

4. **No Shared State** — Unlike traditional enterprise PM tools with centralised databases, CoffeeCup apps don't share state. This keeps each tool simple, fast, and resilient.

### What PMPlan Pulls From Each App

| Source App | PMPlan Sections Populated |
|------------|---------------------------|
| **Gantt Chart** | Schedule Summary, Schedule Baseline, Milestones |
| **Kanban Board** | Dashboard stats (task progress, completion rates) |
| **Risk Register** | Risk Summary, Top Risks, Mitigation Actions |
| **Hierarchy Editor** | Team & Organisation, WBS, Reporting Structure |
| **Delphi Tool** | Risk identification notes, Schedule estimates, Forecast data |
| **RACI Matrix** | Team & Organisation, Communications Plan, Stakeholder Register |
| **Cost Tracker** | Budget Summary, Cost Baseline, Expenditure tracking |
| **Stakeholder Map** | Stakeholder Register, Engagement strategies |
| **Change & Issue Register** | Change Management log, Issue tracking |
| **EVM Dashboard** | Earned Value metrics (CPI, SPI, EAC), Performance forecasts |
| **Quality Register** | Quality Management, Acceptance criteria |
| **Estimator** | Procurement Plan, Material Quantities, Cost Summaries |

For detailed technical information about localStorage keys and data structures, see [Integration Guide](INTEGRATION.md).

---

## Getting Started

### Which App Should I Use?

Choose your starting point based on your immediate need:

| If You Need To... | Start With... |
|-------------------|---------------|
| See all available tools | **Main Dashboard** |
| Schedule tasks with dependencies | **Gantt Chart** |
| Manage day-to-day tasks visually | **Kanban Board** |
| Analyse project risks quantitatively | **Risk Register** |
| Build an org chart or WBS | **Hierarchy Editor** |
| Gather expert opinions systematically | **Delphi Tool** |
| Clarify who does what | **RACI Matrix** |
| Track budget and costs | **Cost Tracker** |
| Map stakeholder influence | **Stakeholder Map** |
| Manage change requests and issues | **Change & Issue Register** |
| Monitor cost/schedule performance | **EVM Dashboard** (after Gantt + Cost Tracker) |
| Define quality and track defects | **Quality Register** |
| Run probabilistic simulations | **Integrated Analysis** (after Gantt + Cost + Risk) |
| Estimate material quantities and costs | **Estimator** |
| Build a formal PM plan | **PMPlan** (after populating other apps) |

### Typical Workflows

#### Workflow 1: Starting a New Project

1. **Gantt Chart** — Define activities, dependencies, and timeline
2. **Risk Register** — Identify and quantify risks
3. **RACI Matrix** — Assign responsibilities
4. **PMPlan** — Pull everything together into a formal plan

#### Workflow 2: Agile Team Management

1. **Kanban Board** — Manage sprint tasks
2. **Hierarchy Editor** — Define team structure
3. **PMPlan** — Create lightweight project documentation

#### Workflow 3: Risk-Heavy Projects

1. **Delphi Tool** — Gather expert risk inputs
2. **Risk Register** — Run Monte Carlo simulations
3. **Gantt Chart** — Build schedule with contingency
4. **Cost Tracker** — Budget with risk reserves
5. **Integrated Analysis** — Run joint cost/schedule simulation for P80 confidence levels
6. **PMPlan** — Integrate risk-adjusted plan

#### Workflow 4: Full Project Lifecycle

1. **Gantt Chart** — Plan the schedule
2. **Cost Tracker** — Set up budget and baselines
3. **Risk Register** — Identify and quantify risks
4. **Integrated Analysis** — Run Monte Carlo for reserve estimation
5. **RACI Matrix** — Assign responsibilities
6. **Stakeholder Map** — Map influence and engagement
7. **Quality Register** — Define acceptance criteria
8. **PMPlan** — Pull all data into formal plan
9. **Change & Issue Register** — Track changes and issues during execution
10. **EVM Dashboard** — Monitor cost/schedule performance

---

## Common Conventions

### Themes

All CoffeeCup applications support **four theme variants**:

| Theme | Visual Style | Best For |
|-------|-------------|----------|
| **Blueprint** (default) | Warm cream background, brown accents, professional grid pattern | Corporate presentations, formal documentation |
| **Fun & Vibrant** | Purple-pink gradient, rounded corners, playful animations | Creative teams, personal projects |
| **Dark Mode** | Near-black background, indigo accents, high contrast | Reducing eye strain, late-night work sessions |
| **Traditional** | Light grey background, blue accents, minimal styling | Conservative organisations, enterprise environments |

**Theme persistence:** Your theme selection is saved in localStorage and applies across the entire suite. Change it once in any app, and all apps adopt the new theme.

For detailed theme specifications, see [Design System Guide](DESIGN-SYSTEM.md).

### Data Persistence

**Where Your Data Lives:**

All project data is stored in your browser's `localStorage` using app-specific keys:

- Gantt Chart: `gantt-project`
- Kanban Board: `kanban-project`
- Risk Register: `risk-register`
- Hierarchy Editor: `hierarchy-data`
- Delphi Tool: `delphi-studies`
- RACI Matrix: `raci-project`
- PMPlan: `pmplan-project`
- Cost Tracker: `cost-project`
- Stakeholder Map: `stakeholder-project`
- Change & Issue Register: `changelog-project`
- EVM Dashboard: `evm-project`
- Quality Register: `quality-project`
- Integrated Analysis: `analysis-project`
- Estimator: `estimator-project`, `estimator-rates`

**Important Notes:**

1. **Browser-Specific** — Data in Chrome doesn't appear in Firefox. Each browser maintains separate storage.
2. **No Sync** — LocalStorage doesn't sync across devices. If you work on multiple computers, manually export/import data.
3. **Clearing Browser Data** — If you clear browser history/cache, select "Cookies and site data" carefully—this includes localStorage. Use export features to back up important projects.
4. **Storage Limits** — Most browsers allow 5-10MB per domain. CoffeeCup projects rarely exceed 1MB unless you have thousands of activities/risks.

### Import & Export

Most applications support **JSON export** for backup and data portability:

- **Gantt Chart** — Export button in header (saves `.json` file)
- **Kanban Board** — Settings panel → Export/Import
- **Risk Register** — Export button (includes all simulation results)
- **Hierarchy Editor** — Export/Import in toolbar
- **PMPlan** — Export entire plan as JSON or print to PDF

**Best Practice:** Export your data regularly, especially before major browser updates or when experimenting with complex changes.

### Keyboard Shortcuts

Common shortcuts across applications:

- **Ctrl/Cmd + S** — Save (triggers localStorage update)
- **Ctrl/Cmd + P** — Print (where supported)
- **Esc** — Close modal or settings panel
- **Enter** — Submit form or create item
- **Delete** — Remove selected item (where applicable)

App-specific shortcuts are documented in each application's user guide.

---

## System Requirements

### Browser Compatibility

CoffeeCup runs in any modern browser with JavaScript enabled:

- ✅ **Chrome** 90+ (Recommended)
- ✅ **Edge** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Brave** (Chromium-based)

**Mobile Browsers:**
- ✅ iOS Safari 14+
- ✅ Chrome for Android 90+

### Performance

**Recommended Specs:**
- 4GB RAM minimum
- Dual-core processor
- 1280×720 screen resolution (1920×1080 recommended)

**Large Projects:**
- Gantt Chart handles 500+ activities smoothly
- Risk Register simulates 10,000 iterations in <2 seconds
- Kanban Board supports hundreds of cards

### LocalStorage Requirements

CoffeeCup requires `localStorage` enabled. If you see "Storage not available" errors:

1. Check browser privacy settings (some strict modes block localStorage)
2. Ensure you're not in Private/Incognito mode
3. Verify browser extensions aren't blocking storage

---

## Privacy & Security

### Your Data Stays Local

CoffeeCup is a **zero-server architecture**. There are:

- ❌ No cloud uploads
- ❌ No telemetry or analytics
- ❌ No external API calls (except CDN for React/Tailwind)
- ❌ No user accounts or authentication

### What This Means

1. **Complete Privacy** — Your project data is never transmitted over the internet. Risk assessments, org charts, budget figures—all stay on your machine.

2. **No Vendor Lock-In** — Export to JSON anytime. The file format is human-readable and documented.

3. **Offline Capable** — Once loaded, most apps work without internet (though CDN-loaded libraries require initial connection).

4. **You Control Backups** — No automatic cloud backup. You decide when and where to export data.

### Recommended Security Practices

- **Encrypt sensitive exports** — If exporting confidential project data, use file encryption (7-Zip, VeraCrypt, etc.)
- **Lock your computer** — Anyone with physical access can open your browser and view localStorage
- **Use browser profiles** — Separate work and personal projects using different browser profiles
- **Clear data when done** — For highly sensitive projects, clear localStorage after exporting

---

## Troubleshooting Common Issues

### "My data disappeared!"

**Likely Causes:**
1. Cleared browser data (cookies/site data includes localStorage)
2. Using a different browser or browser profile
3. Using Private/Incognito mode

**Solutions:**
- Check if you have a recent JSON export
- Verify you're using the same browser and profile
- Check browser data clearing settings

### "Theme doesn't persist across apps"

**Cause:** Each app used to store theme separately; newer versions use shared key.

**Solution:** Open each app once and select your theme. Modern versions will sync theme across apps automatically.

### "Export button doesn't work"

**Cause:** Browser blocking file downloads, or pop-up blocker active.

**Solution:**
- Check browser download settings
- Temporarily disable pop-up blocker
- Try Ctrl/Cmd + S keyboard shortcut

### "App is slow with large datasets"

**Causes:**
- Hundreds of Gantt activities with complex dependencies
- Thousands of Kanban cards
- Risk Register running 10,000+ iterations on low-end device

**Solutions:**
- Archive completed items (move to separate export file)
- Break large projects into phases
- Use Activity/Card filtering to reduce rendered items
- Upgrade browser or clear browser cache

### "Can't see localStorage data in DevTools"

**Cause:** Browser profile isolation or extension blocking.

**Solution:**
1. Press F12 to open DevTools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **Local Storage** → select your domain
4. Look for keys like `gantt-project`, `risk-register`

---

## Next Steps

### Explore the Applications

Start with the [Main Dashboard](apps/main-dashboard.md) to familiarise yourself with the suite layout, then dive into specific tools based on your needs.

### Learn the Integration Model

Read the [Integration Guide](INTEGRATION.md) to understand how data flows between apps and how to build comprehensive project plans in PMPlan.

### Customise Your Experience

Check the [Design System Guide](DESIGN-SYSTEM.md) to learn about themes, CSS variables, and visual customisation options.

### Dive Deep into Complex Apps

If you're tackling advanced features:
- [Gantt Chart Guide](apps/gantt-chart.md) — Dependency management, critical path
- [Risk Register Guide](apps/risk-register.md) — Monte Carlo methodology, EMV analysis
- [Cost Tracker Guide](apps/cost-tracker.md) — PMBOK cost hierarchy, contingency management
- [EVM Dashboard Guide](apps/evm-dashboard.md) — Earned value formulas, performance forecasting
- [Integrated Analysis Guide](apps/integrated-analysis.md) — Joint confidence levels, sensitivity analysis

---

## Getting Help

### Documentation Resources

- **This Overview** — High-level introduction and navigation
- **[Integration Guide](INTEGRATION.md)** — Technical details on data flow
- **[Design System](DESIGN-SYSTEM.md)** — Themes and visual customisation
- **App-Specific Guides** — See `Documentation/apps/` folder

### Community & Support

CoffeeCup is part of the **Vibe Coding** project family. For questions, feedback, or issues:

- **GitHub Issues** — Report bugs or request features
- **Email** — [Contact developer]
- **Documentation Updates** — This is a living document; check back for updates as new apps are released

---

## Version Information

- **Documentation Version:** 1.1
- **Last Updated:** February 2026
- **Completed Apps:** 14 (plus Main Dashboard)
- **Total Suite Size:** 15 applications

---

*CoffeeCup is a browser-based project management suite. No installation required. Your data stays local. Built with React 18 and Tailwind CSS.*
