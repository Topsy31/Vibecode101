# Estimator Module — Implementation Plan

## Context

The CoffeeCup suite covers project management dashboards aligned to PMBOK knowledge areas. A gap exists in **bottom-up cost estimation** — the "quantity surveyor" function. The Cost Tracker manages budgets and actuals but has no mechanism for calculating material quantities from physical dimensions.

The target use case is **micro-construction projects** (bathroom renovation, landscaping, decking) through to **full house builds** (foundations → shell → fit-out). The user enters room/zone dimensions and the app calculates material requirements using coverage rates, wastage factors, and pack rounding — producing a priced bill of quantities.

### User Decisions
- **Structure:** Flat list with categories (like Cost Tracker)
- **Integration:** Read-only standalone — PMPlan reads from `estimator-project`, no push to Cost Tracker
- **Templates:** Full house build set (15+ templates covering rooms + structural phases)
- **Rate library:** Ship with UK and USA defaults (region selector) + user can create custom rates persisted separately in `estimator-rates`

---

## Data Model

### Primary: `estimator-project` (localStorage)

```javascript
{
  meta: { name: 'New Estimate', created, modified, currencySymbol: '£' },
  settings: { theme, defaultWastage: 10, showPackRounding: true, region: 'UK'|'USA' },
  categories: [{
    id, name, colour, sortOrder, templateId,
    dimensions: {
      zones: [{              // Composite room — multiple rectangular zones
        id, label: 'Main',   // User-editable label (Main, Alcove, Bay Window, etc.)
        length, width, height
      }]
    },
    materials: [{
      id, description,
      dimensionSource: 'floorArea'|'wallArea'|'perimeter'|'volume'|'ceilingArea'|'length'|'width'|'height'|'custom',
      coverageRate: 0.09,    // m² per unit (or m/unit, m³/unit depending on context)
      coverageUnit: 'm²/tile',
      wastage: 10,           // percentage
      packSize: 10,          // 0 = sold individually
      packPrice: 24.99,      // price per pack
      unitRate: null,         // price per unit (used when packSize = 0)
      manualQty: 0,          // used when dimensionSource is 'custom' (per-material manual quantity)
      notes: ''
    }]
  }]
}
```

### Secondary: `estimator-rates` (localStorage)

```javascript
{
  lastModified, rates: [{
    id, description, category, coverageRate, coverageUnit,
    wastage, packSize, packPrice, unitRate,
    region: 'UK'|'USA'|'both',   // which region this rate applies to
    isDefault: true|false, source: 'UK Standard 2025'|'USA Standard 2025'|'Custom'
  }]
}
```

### Region System

The app ships with **two complete default rate sets** — UK and USA — reflecting different:

| Aspect | UK | USA |
|--------|----|-----|
| **Currency** | £ (GBP) | $ (USD) |
| **Units** | Metric (m, m², m³) | Imperial (ft, ft², ft³) |
| **Materials** | UK trade names (e.g. plasterboard, skirting, gravel boards) | US equivalents (e.g. drywall, baseboard, kick boards) |
| **Pack sizes** | UK standard trade packs | US standard (Home Depot / Lowe's style) |
| **Pricing** | UK 2025 typical prices | USA 2025 typical prices |
| **Coverage rates** | Per m² / per m / per m³ | Per ft² / per ft / per ft³ |

**Region selection** is set in the Settings drawer (default: UK). Changing region:
1. Updates `currencySymbol` (£ ↔ $)
2. Filters the default rate library to show only that region's rates
3. Templates auto-populate with region-appropriate materials and rates
4. Custom user rates are region-tagged but always visible

**Region lock:** Once the first category is added to an estimate, the region selector shows a warning that switching will not convert existing materials (coverage rates, units, prices remain as entered). New categories added after switching will use the new region's templates/rates. This prevents silent data corruption while still allowing mixed-region projects if the user explicitly accepts.

**Templates are region-aware** — each template's materials array has both UK and USA variants. When a template is applied, the current region determines which variant is used. The 20 templates remain the same across both regions (Bathroom, Kitchen, Foundations, etc.) but material descriptions, coverage rates, pack sizes, and prices differ.

### Calculation Engine (pure functions, computed at render time via useMemo)

```
resolveZones(dims) → sums floor area, wall area, perimeter, volume across all rectangular zones
resolveDim(dims, source, manualQty) → uses resolveZones totals, or manualQty for 'custom' source
baseQty = dimension ÷ coverageRate  [or manualQty directly for 'custom' source]
wasteQty = baseQty × (1 + wastage/100)
packsNeeded = ceil(wasteQty ÷ packSize)  [if packSize > 0]
totalUnits = packsNeeded × packSize
lineCost = packsNeeded × packPrice  [or wasteQty × unitRate if sold individually]
```

### Composite Rooms (Zone System)

Each category supports **multiple rectangular zones** that are summed to produce composite dimensions. This handles non-rectangular rooms:

- **Single zone** (default): Traditional L × W × H entry with computed values shown inline
- **Multiple zones**: User clicks "+ Add Zone" to add rectangular sections (e.g. main room + alcove + bay window)
- Each zone has an editable label and its own L × W × H inputs
- **Combined totals** row appears below all zones showing summed floor area, wall area, perimeter, and volume
- Height uses the **tallest zone** (for wall area calculations); length and width are summed
- Zones can be individually removed (minimum 1 zone required)
- Migration: old flat `{ length, width, height, custom }` format auto-converts to single-zone format on load

---

## Files to Create

### `Estimator/styles.css` (~550 lines)

Full CSS following the Analysis/Cost Tracker pattern:
- 4 theme variable blocks (Blueprint, Fun, Dark, Traditional)
- Header with amber-to-orange gradient icon (`#f59e0b` → `#d97706`)
- Component styles: cards, buttons, inputs, tabs, data tables, settings drawer, badges, empty states, animations
- Category accordion styles: `.category-header`, `.category-body`, `.dimensions-bar`, `.material-row`
- Chart container styles for Summary tab donut/bar charts
- Print styles and responsive breakpoints

### `Estimator/index.html` (~2,500 lines)

React 18 app with 3 tabs:

**Tab 1 — Estimate** (main working view):
- Category accordion list — each expandable to show dimensions bar + materials table
- Add category from template picker (20 templates) or blank
- Category actions: rename, change colour, **duplicate**, reorder (up/down buttons), delete
- Dimensions inputs (L × W × H) with computed values display (floor area, wall area, perimeter, volume)
- **Empty dimension prompt:** When L/W/H are all zero, show inline message "Enter dimensions to calculate quantities" within the category body instead of a table of zeroes
- Material items table with inline editing: description, dimension source, coverage rate, wastage %, pack size, pack price
- Calculated columns (read-only, mono font): base qty, with waste, packs needed, total units, line cost
- Add material from rate library picker

**Tab 2 — Summary:**
- Metric cards: total estimate, material line count, highest category, average wastage
- Donut chart: cost breakdown by category (Chart.js)
- Horizontal bar chart: cost per category sorted descending
- Full materials shopping list table (printable) with category subtotals and grand total
- **Export actions:** "Copy to Clipboard" (tab-separated for pasting into spreadsheets) and "Export CSV" download button for the shopping list

**Tab 3 — Rate Library:**
- Region toggle (UK / USA) to switch between default rate sets
- Default rates browser (collapsible by category group, read-only) — filtered by selected region
- User custom rates section (full CRUD, region-tagged)
- Search/filter across both
- "Add to Estimate" and "Copy to Custom" actions

**Settings Drawer:** Project name, region (UK/USA — sets currency and units), default wastage %, export/import JSON, reset

---

## Template Library (20 templates)

### Room / Fit-Out Templates
| # | Template | Colour | Key Materials |
|---|----------|--------|---------------|
| 1 | Bathroom | `#3b82f6` | Floor/wall tiles, adhesive, grout, silicone, plasterboard, paint |
| 2 | Kitchen | `#f59e0b` | Base/wall units, worktop, splashback, flooring, plumbing |
| 3 | Bedroom | `#8b5cf6` | Paint (walls/ceiling), flooring, underlay, skirting, coving |
| 4 | Living Room | `#ec4899` | Paint, flooring, skirting, coving, feature wallpaper |
| 5 | Utility Room | `#14b8a6` | Vinyl flooring, paint, plumbing, shelving |
| 6 | Painting & Decorating | `#fb923c` | Emulsion, gloss, primer, filler, sandpaper, masking tape |
| 7 | Flooring (General) | `#d946ef` | Underlay, laminate/vinyl, scotia trim, adhesive, thresholds |

### External / Garden Templates
| # | Template | Colour | Key Materials |
|---|----------|--------|---------------|
| 8 | Garden/Patio | `#22c55e` | Paving slabs, sand, cement, gravel, edging |
| 9 | Fencing | `#a3a29e` | Panels, posts, gravel boards, postcrete, caps |
| 10 | Decking | `#78716c` | Boards, joists, posts, screws, stain |
| 11 | Landscaping | `#84cc16` | Topsoil, turf/seed, membrane, bark, edging |

### Structural / Build Templates
| # | Template | Colour | Key Materials |
|---|----------|--------|---------------|
| 12 | Foundations | `#6366f1` | Concrete, rebar, formwork, DPM, hardcore, sand blinding |
| 13 | External Walls | `#dc3545` | Blocks, mortar, wall ties, insulation, cavity closers |
| 14 | Roofing | `#f97316` | Tiles/slates, battens, membrane, ridge tiles, flashing |
| 15 | Insulation | `#10b981` | Mineral wool/PIR boards, vapour barrier, fixings |
| 16 | Windows & Doors | `#7c3aed` | Frames, glazing, sills, doors, ironmongery, sealant |
| 17 | Plastering | `#d6d3d1` | Multi-finish, bonding coat, PVA, beading, scrim tape |
| 18 | Drainage | `#64748b` | 110mm pipe, bends, inspection chambers, pea gravel |

### First Fix Templates
| # | Template | Colour | Key Materials |
|---|----------|--------|---------------|
| 19 | Plumbing First Fix | `#06b6d4` | Copper/plastic pipe, fittings, valves, clips |
| 20 | Electrical First Fix | `#eab308` | Twin & earth cable, back boxes, consumer unit, conduit |

Each template contains 4-10 material items with region-specific coverage rates, pack sizes, and prices pre-filled (UK metric and USA imperial variants). Templates are applied via a picker modal when adding a new category — the current region setting determines which variant is used.

---

## Files to Modify

### `Main/index.html`
- Add `estimator` entry to `DEFAULT_APPS` array
- Add `.module-card-icon.estimator` CSS gradient (`#f59e0b` → `#d97706`)
- Define `IconEstimator` / `IconEstimatorLarge` (ruler SVG)
- Add `case 'estimator'` to `getSmallIcon()` and `getLargeIcon()`

### `PMPlan/index.html`
- Add `estimator: 'estimator-project'` to `INTEGRATION_KEYS`
- Add `estimator: 'Estimator'` to `INTEGRATION_NAMES`
- Update `procurement` section definition to add `integration: 'estimator'`
- Add data mapping in `pullIntegration()` — reads categories, calculates totals per zone, maps to procurement items
- Duplicate `resolveDimension()` utility into PMPlan (same pattern as Cost Tracker EVM calc duplication)

### `Documentation/index.html`
- Add `estimator` app page entry to `appPages` data
- Add to sidebar navigation `completed` array
- Add to overview table, "Which App" table, workflow sections

### `CLAUDE.md`
- Add Estimator to Complete applications table
- Add `estimator-project` and `estimator-rates` storage keys
- Add integration arrow to diagram

---

## Build Phases

| Phase | Deliverable | Key Files |
|-------|-------------|-----------|
| **1** | styles.css + HTML skeleton (header, tabs, persistence, settings drawer, empty states) | `styles.css`, `index.html` |
| **2** | Template data definitions (all 20 templates with coverage rates) | `index.html` (TEMPLATES constant) |
| **3** | Estimate tab — category CRUD, dimensions entry, material items with calculation engine | `index.html` |
| **4** | Summary tab — metric cards, donut chart, bar chart, shopping list table | `index.html` |
| **5** | Rate Library tab — defaults browser, user custom rates CRUD, search/filter | `index.html` |
| **6** | Suite integration (Main Dashboard, PMPlan, Documentation, CLAUDE.md) | 4 existing files |

### Dependencies
- Phases 1 → 2 → 3 → 4 (sequential)
- Phase 5 can run after Phase 3 (parallel with Phase 4)
- Phase 6 requires Phase 3 + 4 complete

---

## Key Reusable Code

| Source | What to Reuse |
|--------|---------------|
| `Cost/index.html` lines 44-53 | Default categories pattern (id, name, colour, sortOrder, lineItems) |
| `Cost/index.html` lines 58-87 | `formatCurrency()`, `formatCurrencyFull()` utilities |
| `Cost/index.html` lines 120-150 | `createDefaultProject()`, `loadProject()`, `saveProject()` pattern |
| `Cost/index.html` lines 233-247 | `StableInput` component (blur-save pattern for number inputs) |
| `Cost/styles.css` | Theme variable blocks, all component CSS classes |
| `Quality/index.html` | Tab pattern, settings drawer, empty states, badges |
| `Analysis/styles.css` | CSS structure template (most recently built app) |

---

## Verification

- All 4 themes render correctly + suite theme sync works
- **UK region:** Creating a Bathroom template with 3m x 2.5m x 2.4m room produces correct tile counts in metric with £ prices
- **USA region:** Creating a Bathroom template with 10ft x 8ft x 8ft room produces correct tile counts in imperial with $ prices
- Switching region updates currency symbol, default rates, and template materials
- Pack rounding works (e.g. 91.7 tiles → 10 packs of 10 = 100 tiles)
- Wastage factor correctly inflates quantities
- Summary tab totals match sum of all category line costs
- Donut chart segments match category costs
- Shopping list table is printable
- Rate Library shows correct defaults per region, custom rates always visible
- Rate Library persists custom rates across page reloads
- PMPlan pulls material summary into Procurement section
- Main Dashboard tile navigates to Estimator correctly
- Dimension source "custom" allows manual quantity entry for non-standard templates (fencing, drainage)
- Duplicate category creates an independent copy with all materials and dimensions
- Category reorder (up/down) updates sortOrder and persists correctly
- Empty dimensions show prompt message instead of a table of zeroes/NaN
- Region switching with existing categories shows warning; new categories use new region
- CSV export produces valid file with correct headers, subtotals, and grand total
- Copy to clipboard pastes cleanly into Excel/Google Sheets
