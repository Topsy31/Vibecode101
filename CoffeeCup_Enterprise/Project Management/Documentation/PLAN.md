# CoffeeCup Documentation Planning

## Purpose

This planning document helps manage the growing CoffeeCup suite of project management applications. It provides a structured approach to creating unified, consistent documentation that users can follow for any application within the suite.

---

## Current State

### Completed Applications (13 + Main Dashboard)

| App | Status | Documentation Status |
|-----|--------|---------------------|
| Main Dashboard | ✅ Complete | ✅ Documented (main-dashboard.md) |
| Gantt Chart | ✅ Complete | ✅ Documented (gantt-chart.md - 620 lines) |
| Kanban Board | ✅ Complete | ✅ Documented (kanban-board.md) |
| Risk Register | ✅ Complete | ✅ Documented (risk-register.md - 750 lines) |
| Hierarchy Editor | ✅ Complete | ✅ Documented (hierarchy-editor.md) |
| Delphi Tool | ✅ Complete | ✅ Documented (delphi-tool.md) |
| RACI Matrix | ✅ Complete | ✅ Documented (raci-matrix.md) |
| Cost Tracker | ✅ Complete | ✅ Documented (cost-tracker.md - 710 lines) |
| Stakeholder Map | ✅ Complete | ✅ Documented (stakeholder-map.md - 340 lines) |
| PMPlan | ✅ Complete | ✅ Documented (pmplan.md - 550 lines) |
| Change & Issue Register | ✅ Complete | ✅ Documented (change-issue-register.md - 250 lines) |
| EVM Dashboard | ✅ Complete | ✅ Documented (evm-dashboard.md - 230 lines) |
| Quality Register | ✅ Complete | ✅ Documented (quality-register.md - 250 lines) |
| Integrated Analysis | ✅ Complete | ✅ Documented (integrated-analysis.md - 380 lines) |

---

## Documentation Structure (Proposed)

### 1. Suite Overview Documentation

**File:** `Documentation/OVERVIEW.md`

**Content:**
- What is CoffeeCup?
- Suite architecture diagram
- Integration model (how apps work together)
- Common conventions (themes, localStorage, naming)
- Getting started (which app to use when)

### 2. Per-Application User Guides

**Location:** `Documentation/apps/[app-name].md`

**Template structure:**
```markdown
# [Application Name]

## Purpose
What problem does this solve?

## Quick Start
1. First steps
2. Basic workflow
3. Common scenarios

## Features
- Feature 1 with screenshot/description
- Feature 2 with screenshot/description

## Integration
How this app feeds data to PMPlan (or other apps)

## Tips & Best Practices
Power user features, shortcuts, gotchas

## Troubleshooting
Common issues and solutions
```

### 3. Integration Guide

**File:** `Documentation/INTEGRATION.md`

**Content:**
- How PMPlan pulls from other apps
- localStorage key mapping
- Data flow diagrams
- What happens when you click "Pull Latest"
- Keeping data in sync across apps

### 4. Developer/Technical Documentation

**File:** `Documentation/TECHNICAL.md`

**Content:**
- Technology stack summary
- Design system deep-dive
- CSS variable reference
- Component patterns with code examples
- Creating a new application (step-by-step)
- Theme implementation guide

### 5. Quick Reference Cards

**Location:** `Documentation/quick-reference/`

**Files:**
- `gantt-shortcuts.md`
- `raci-frameworks.md`
- `risk-formulas.md`
- `theme-system.md`

Short, printable reference guides for specific topics.

---

## Documentation Completion Status

### ✅ Phase 1: Foundation Documentation (COMPLETE)
- ✅ Write `OVERVIEW.md` — Suite introduction and architecture (520 lines)
- ✅ Write `INTEGRATION.md` — localStorage keys, data flow (410 lines)
- ✅ Write `DESIGN-SYSTEM.md` — CSS variables, themes, components (650 lines)
- ✅ Create `apps/` subfolder structure
- ✅ Create `assets/` subfolder structure (screenshots/, diagrams/)

### ✅ Phase 2: Complex Application Guides (COMPLETE)
- ✅ Gantt Chart user guide — CPM, dependencies, topological sorting (620 lines)
- ✅ Risk Register user guide — Monte Carlo, EMV, probability distributions (750 lines)
- ✅ Cost Tracker guide — EVM metrics, PMBOK hierarchy, Chart.js visualisations (710 lines)
- ✅ PMPlan guide — PMBOK integration, 3-tier sections, data pulling (550 lines)

### ✅ Phase 3: Simple Application Guides (COMPLETE)
- ✅ Kanban Board user guide — Workflow management, WIP limits, analytics
- ✅ Hierarchy Editor user guide — Org charts, WBS, Tree/Organogram modes
- ✅ Delphi Tool user guide — Expert consensus, Delphi method explained
- ✅ RACI Matrix user guide — RACI/RASCI/DACI frameworks
- ✅ Main Dashboard user guide — Navigation hub

### ✅ Phase 4: Remaining Application Guides (COMPLETE)
- ✅ Stakeholder Map guide — Power/interest grid, engagement strategies (340 lines)
- ✅ Change & Issue Register guide — Change control workflow, dashboard analytics (250 lines)
- ✅ EVM Dashboard guide — CPI/SPI gauges, S-curve, forecasting (230 lines)
- ✅ Quality Register guide — Quality criteria, defect tracking, acceptance sign-off (250 lines)
- ✅ Integrated Analysis guide — Monte Carlo, S-curves, tornado charts, JCL (380 lines)

### ⏳ Phase 5: Interactive HTML Documentation Site (PENDING)
- [ ] Create `Documentation/index.html` — Single-page documentation site
- [ ] Implement sidebar navigation (hierarchical menu)
- [ ] Add client-side search functionality
- [ ] Theme switcher (matches CoffeeCup themes)
- [ ] Responsive design (mobile-friendly)
- [ ] Markdown-to-HTML conversion or pre-converted content
- [ ] Auto-generated table of contents
- [ ] Deep linking with anchor tags

### ⏳ Phase 6: PDF Reference Guide (PENDING)
- [ ] Create `Documentation/CoffeeCup-Reference-Guide.md` — Combined markdown
- [ ] Use `/build` skill to generate PDF
- [ ] Include table of contents with page numbers
- [ ] Professional typography and formatting
- [ ] Headers/footers
- [ ] Proper page breaks between major sections
- [ ] Generate `Documentation/CoffeeCup-Reference-Guide.pdf`

### ⏳ Phase 7: Visual Assets (PENDING)
- [ ] **Screenshots**: Each app in each theme (4 themes × 14 apps = 56 screenshots)
  - Blueprint theme screenshots
  - Fun & Vibrant theme screenshots
  - Dark Mode theme screenshots
  - Traditional theme screenshots
- [ ] **Diagrams**:
  - Integration flow diagram (hub-and-spoke architecture)
  - LocalStorage architecture diagram
  - Data flow diagrams (per-app → PMPlan)
- [ ] **Icons**: High-resolution app icons for documentation
- [ ] Storage: `Documentation/assets/screenshots/`, `Documentation/assets/diagrams/`

### ⏳ Phase 8: Downloadable Documentation Packages (PENDING)
- [ ] **Complete Documentation ZIP**
  - All markdown files
  - PDF reference guide
  - Screenshots and diagrams
  - README with usage instructions
- [ ] **Quick Reference Cards (PDF)**
  - Gantt shortcuts and formulas
  - RACI framework comparison
  - Risk analysis formulas (EMV, PERT)
  - Theme system reference
- [ ] **User Onboarding Package**
  - Getting started guide
  - Common workflows
  - Integration setup guide
  - Troubleshooting quick reference

---

## Documentation Statistics

### Current Deliverables (As of February 2026)

**Markdown Documentation Files: 18**

| File | Lines | Status | Purpose |
|------|-------|--------|---------|
| OVERVIEW.md | ~400 | ✅ Complete | Suite introduction, app catalogue |
| INTEGRATION.md | ~420 | ✅ Complete | Hub-and-spoke architecture, data flow |
| DESIGN-SYSTEM.md | 650 | ✅ Complete | CSS variables, themes, components |
| PLAN.md | ~480 | ✅ Updated | This planning document |
| apps/gantt-chart.md | 620 | ✅ Complete | Gantt Chart user guide |
| apps/cost-tracker.md | 710 | ✅ Complete | Cost Tracker user guide |
| apps/risk-register.md | 750 | ✅ Complete | Risk Register user guide |
| apps/pmplan.md | 550 | ✅ Complete | PMPlan user guide |
| apps/kanban-board.md | ~150 | ✅ Complete | Kanban Board user guide |
| apps/hierarchy-editor.md | ~150 | ✅ Complete | Hierarchy Editor user guide |
| apps/delphi-tool.md | ~200 | ✅ Complete | Delphi Tool user guide |
| apps/raci-matrix.md | ~200 | ✅ Complete | RACI Matrix user guide |
| apps/main-dashboard.md | ~100 | ✅ Complete | Main Dashboard user guide |
| apps/stakeholder-map.md | 340 | ✅ Complete | Stakeholder Map user guide |
| apps/change-issue-register.md | 250 | ✅ Complete | Change & Issue Register user guide |
| apps/evm-dashboard.md | 230 | ✅ Complete | EVM Dashboard user guide |
| apps/quality-register.md | 250 | ✅ Complete | Quality Register user guide |
| apps/integrated-analysis.md | 380 | ✅ Complete | Integrated Analysis user guide |

**Total Lines of Documentation:** ~6,800+ lines

**Folder Structure:**
```
Documentation/
├── OVERVIEW.md
├── INTEGRATION.md
├── DESIGN-SYSTEM.md
├── PLAN.md
├── apps/
│   ├── gantt-chart.md
│   ├── cost-tracker.md
│   ├── risk-register.md
│   ├── pmplan.md
│   ├── kanban-board.md
│   ├── hierarchy-editor.md
│   ├── delphi-tool.md
│   ├── raci-matrix.md
│   ├── main-dashboard.md
│   ├── stakeholder-map.md
│   ├── change-issue-register.md
│   ├── evm-dashboard.md
│   ├── quality-register.md
│   └── integrated-analysis.md
└── assets/
    ├── screenshots/ (ready for screenshots)
    └── diagrams/ (ready for diagrams)
```

### Pending Deliverables (Future Phases)

**Interactive HTML Documentation:** 1 file
- `Documentation/index.html` — Single-page documentation website
- Estimated size: ~1,500 lines (React + Tailwind)
- Features: Navigation, search, theme switcher, responsive design

**PDF Documentation:** 2 files
- `Documentation/CoffeeCup-Reference-Guide.md` — Master markdown (combined)
- `Documentation/CoffeeCup-Reference-Guide.pdf` — Generated PDF
- Estimated size: 150-200 pages

**Visual Assets:** 56+ files
- 56 screenshots (14 apps × 4 themes)
- 5-10 diagrams (architecture, data flow, integration)
- App icons (high-resolution)

**Downloadable Packages:** 3 packages
- Complete Documentation ZIP (all markdown, PDF, assets)
- Quick Reference Cards PDF (shortcuts, formulas, frameworks)
- User Onboarding Package (getting started, workflows)

**Total Estimated Deliverables:** 60+ files when complete

---

## Documentation Format Standards

### Consistency Rules

1. **British English** throughout (-ise, -isation, -our)
2. **Markdown formatting** (GitHub-flavoured)
3. **No emojis** in formal documentation (except status indicators in this planning doc)
4. **Consistent heading levels:**
   - `#` = Document title
   - `##` = Major section
   - `###` = Subsection
   - `####` = Minor detail
5. **Code blocks** with syntax highlighting where applicable
6. **Tables** for feature comparisons and reference data
7. **Bullet lists** for steps and tips
8. **Numbered lists** for sequential workflows

### Visual Assets

- **Screenshots**: PNG format, 1200px max width
- **Diagrams**: Mermaid (inline in markdown) or SVG
- **Storage**: `Documentation/assets/` folder

---

## Target Audience

### Primary Users
- **Project Managers** using CoffeeCup for real projects
- **First-time users** needing onboarding
- **Power users** looking for advanced features

### Secondary Users
- **Developers** extending or customising applications
- **Trainers** teaching PM methodology using CoffeeCup
- **Evaluators** deciding whether to adopt the suite

---

## Documentation Maintenance

### Update Triggers
- ✅ New application added to suite → Create user guide
- ✅ Feature added to existing app → Update relevant guide
- ✅ Integration point changes → Update `INTEGRATION.md`
- ✅ Design system changes → Update `TECHNICAL.md`
- ✅ User feedback identifies confusion → Add to troubleshooting

### Versioning
Not required initially (single-file HTML apps, no releases). Consider adding version numbers if apps become multi-file projects or distributed externally.

---

## Expansion Plan for New Apps

When a new application is added:

1. **Update this planning document**
   - Add to "Current State" table
   - Set documentation priority

2. **Create user guide** using template
   - File: `Documentation/apps/[app-name].md`
   - Follow standard structure
   - Add screenshots/diagrams

3. **Update `OVERVIEW.md`**
   - Add to application list
   - Update architecture diagram if needed

4. **Update `INTEGRATION.md`**
   - Document localStorage key
   - Add to data flow diagram
   - Explain PMPlan integration

5. **Update Main Dashboard** (if not already done)
   - Add navigation tile
   - Update icon and colour scheme

---

## Open Questions

### Design Decisions Needed
- [ ] Should documentation live in `/Documentation` or be distributed per-app (e.g., `Gantt/README.md`)?
- [ ] Do we need a searchable documentation site, or is markdown in the repo sufficient?
- [ ] Should we create video tutorials for complex apps (Gantt, Risk, EVM)?
- [ ] Do we need multi-language support? (Currently British English only)

### User Research Needed
- [ ] What questions do first-time users ask most often?
- [ ] Which apps cause the most confusion?
- [ ] What's the typical user journey through the suite?

---

## Next Actions

### ✅ Completed Actions

**Phases 1-4 Complete (February 2026):**
1. ✅ Created complete documentation structure (`Documentation/` folder)
2. ✅ Wrote all foundation documents (OVERVIEW, INTEGRATION, DESIGN-SYSTEM)
3. ✅ Documented all 13 completed applications + Main Dashboard
4. ✅ Updated all guides to reflect actual app implementations (verified against source code)
5. ✅ Updated PLAN.md with completion status

**Total Work Completed:**
- 18 markdown files (~6,800 lines)
- Comprehensive user guides with PM methodology explanations
- Integration documentation with technical specifications
- Design system reference with all 4 themes documented

### 🔄 Remaining Actions (Future Phases)

**Phase 5: Interactive HTML Site**
1. Design navigation structure (sidebar menu)
2. Implement search functionality (client-side)
3. Create theme switcher (Blueprint/Fun/Dark/Traditional)
4. Convert or link markdown content
5. Make responsive for mobile/tablet

**Phase 6: PDF Reference Guide**
1. Combine all markdown into master document
2. Use `/build` skill to generate PDF
3. Add table of contents with page numbers
4. Format for professional printing
5. Test on A4 and Letter paper sizes

**Phase 7: Visual Assets**
1. Take screenshots of each app in all 4 themes
2. Create architecture diagrams (draw.io or Mermaid)
3. Generate data flow diagrams
4. Export app icons at high resolution
5. Organize in `assets/` folders

**Phase 8: Downloadable Packages**
1. Create Complete Documentation ZIP
2. Generate Quick Reference Cards PDF
3. Build User Onboarding Package
4. Add download links to HTML site

### Ongoing Maintenance
- Update guides when apps add new features
- Add screenshots as visual assets become available
- Collect user feedback and refine troubleshooting sections
- Document new apps (as they're built in parallel)

---

## Success Criteria

### ✅ Phase 1-4 Success Criteria (ACHIEVED)

Documentation for Phases 1-4 is considered **complete** when:
- ✅ Every completed application has a user guide
- ✅ Every planned application has a pre-documentation guide
- ✅ Integration model is clearly explained
- ✅ First-time users can onboard without external help
- ✅ Power users can find advanced features
- ✅ Developers can create new apps following patterns
- ✅ Troubleshooting sections address common issues
- ✅ PM methodology concepts are explained for non-PMs
- ✅ British English conventions followed throughout

### ⏳ Phase 5-8 Success Criteria (PENDING)

Documentation for Phases 5-8 will be considered **complete** when:
- [ ] Interactive HTML site is functional and searchable
- [ ] PDF reference guide is generated and printable
- [ ] Visual assets (screenshots, diagrams) are available
- [ ] Downloadable packages are ready for distribution
- [ ] All documentation formats are accessible (markdown, HTML, PDF)

---

## Notes

### Documentation Principles

- This is a **living document** — update as the suite evolves
- Focus on **clarity over completeness** initially
- **Iterate based on user feedback** rather than guessing needs
- Documentation should **match the code reality** (no aspirational features)
- **No hallucinated references** — all technical details verified against source code

### Current Status Summary (February 2026)

**Completed:**
- ✅ Phases 1-4 (Foundation, Complex Apps, Simple Apps, All Completed Apps)
- ✅ 18 markdown documentation files
- ✅ ~6,800 lines of comprehensive user documentation
- ✅ All 13 completed applications documented (verified against source code)
- ✅ Main Dashboard documented
- ✅ Integrated Analysis guide created (was missing)
- ✅ Change & Issue Register, EVM Dashboard, Quality Register upgraded from pre-docs to full guides

**Pending:**
- ⏳ Phase 5: Interactive HTML documentation site
- ⏳ Phase 6: PDF reference guide generation
- ⏳ Phase 7: Visual assets (screenshots, diagrams)
- ⏳ Phase 8: Downloadable documentation packages

**Key Achievement:**
Users now have complete, professional documentation for all CoffeeCup applications, with methodology explanations suitable for both technical and non-technical audiences. All guides have been verified against the actual application source code.
