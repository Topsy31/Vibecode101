# CLAUDE.md - CoffeeCup Enterprise

## Project Overview

CoffeeCup Enterprise is an AI-customisable, modular micro-application suite for SMEs. Seven suites of single-file HTML apps, each solving one business task. Priced at £1.99 per app. Every app is fully transparent and AI-editable — users own the code.

**Architecture:** Hub-based suite model. Independent apps with localStorage persistence, one hub per suite, and a top-level Enterprise Dashboard.

---

## Theme Consistency (CRITICAL)

All CoffeeCup apps share a single theme via localStorage. This is a core design invariant.

### The Rule

**Every page in the suite MUST read and write the theme using the key `coffeecup-theme` in localStorage.**

No namespaced keys (`coffeecup-enterprise-theme`, `coffeecup-docs-theme`, etc.). One key, one source of truth.

### Implementation Pattern

Every app must implement this exact pattern:

```javascript
// Read theme on initialisation
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('coffeecup-theme') || 'blueprint';
});

// Apply theme to DOM and persist on change
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('coffeecup-theme', theme);
}, [theme]);
```

For non-React apps (vanilla JS), the equivalent is:

```javascript
const theme = localStorage.getItem('coffeecup-theme') || 'blueprint';
document.documentElement.setAttribute('data-theme', theme);

// On theme change:
function setTheme(newTheme) {
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('coffeecup-theme', newTheme);
}
```

### Available Themes

| Key | Name | Notes |
|-----|------|-------|
| `blueprint` | Architectural Blueprint | Default. Grid background, warm stone tones. |
| `fun` | Fun & Vibrant | Purple/pink palette, Nunito font, larger radii. |
| `traditional` | Traditional | Bootstrap-like, blue accent, sharp corners. |
| `dark` | Dark Mode | Dark background, indigo accent. |

### HTML Default

Every HTML file must start with the default theme on the root element:

```html
<html lang="en" data-theme="blueprint">
```

### Why This Matters

Users open multiple CoffeeCup apps in different tabs simultaneously. When they change the theme in any tab, the next tab they open (or reload) should reflect that choice. The shared `coffeecup-theme` key in localStorage is what makes this work.

---

## Technology Stack

All apps are self-contained single HTML files. No build tools, no server.

- **Frontend:** React 18 via CDN + Babel for in-browser JSX
- **Styling:** Tailwind CSS via CDN + CSS custom properties for theming
- **Fonts:** DM Sans (primary), JetBrains Mono (code), Nunito (fun theme)
- **Data:** Browser localStorage (no server, no cloud)
- **Charts:** Chart.js via CDN (where needed)

---

## Folder Structure

```
CoffeeCup_Enterprise/
├── CLAUDE.md                          ← This file
├── Enterprise Launch/
│   └── index.html                     ← Enterprise Dashboard (top-level hub)
├── Project Management/                ← Suite 1 (ACTIVE)
│   ├── Main/index.html                ← PM Dashboard
│   ├── Gantt/index.html
│   ├── Kanban/index.html
│   ├── Risk/index.html
│   ├── Cost/index.html
│   ├── EVM/index.html
│   ├── Hierarchy/index.html
│   ├── RACI/index.html
│   ├── Stakeholder/index.html
│   ├── Change/index.html
│   ├── Quality/index.html
│   ├── Delphi/index.html
│   ├── Analysis/index.html
│   ├── PMPlan/index.html
│   ├── Estimator/index.html
│   └── Documentation/index.html
├── Finance/                           ← Suite 2 (PLANNED)
│   └── Documentation/index.html
├── Customer Lifecycle/                ← Suite 3 (PLANNED)
│   └── Documentation/index.html
├── People & HR/                       ← Suite 4 (PLANNED)
│   └── Documentation/index.html
├── Suppliers & Procurement/           ← Suite 5 (PLANNED)
│   └── Documentation/index.html
├── Inventory & Logistics/             ← Suite 6 (PLANNED)
│   └── Documentation/index.html
├── Company & Governance/              ← Suite 7 (PLANNED)
│   └── Documentation/index.html
└── Planning/
    ├── plan.md                        ← Strategic plan
    └── feature-gap-analysis.md        ← ERP comparison
```

---

## localStorage Keys

### Shared Keys (cross-suite)

| Key | Type | Purpose |
|-----|------|---------|
| `coffeecup-theme` | String | Active theme (`blueprint`, `fun`, `traditional`, `dark`) |
| `coffeecup-enterprise-pm-apps` | JSON | PM app toggle/order config for Enterprise Dashboard |
| `coffeecup-enterprise-suite-config` | JSON | Suite tab visibility/order for Enterprise Dashboard |
| `coffeecup-sync-folder` | String | Display name of the user's chosen sync folder (for UI) |
| `coffeecup-sync-enabled` | Boolean | Whether file sync is active |

### PM Suite Keys

| Key | Purpose |
|-----|---------|
| `gantt-project` | Gantt Chart data |
| `kanban-project` | Kanban Board data |
| `risk-register` | Risk Register data |
| `cost-project` | Cost Tracker data |
| `evm-project` | EVM Dashboard data |
| `hierarchy-data` | Hierarchy Editor data |
| `raci-project` | RACI Matrix data |
| `stakeholder-project` | Stakeholder Map data |
| `changelog-project` | Change & Issue Register data |
| `quality-project` | Quality Register data |
| `delphi-studies` | Delphi Tool data |
| `analysis-project` | Integrated Analysis data |
| `pmplan-project` | PMPlan data |
| `estimator-project` | Estimator project data |
| `estimator-rates` | Estimator rate library |

---

## Design Conventions

- **British English:** -ise, -isation, -our, -re endings
- **Currency:** GBP (£), US Dollar ($), and Euro (€) as available currencies
- **No emojis** in UI or documentation
- **Fonts:** DM Sans for all themes except Fun (Nunito)
- **Favicon:** Shared CoffeeCup SVG favicon across all apps

### Suite Colours

| Suite | Colour | Usage |
|-------|--------|-------|
| Project Management | `#b8956a` | Icons, accents |
| Finance | `#22c55e` | Icons, accents |
| Customer Lifecycle | `#3b82f6` | Icons, accents |
| People & HR | `#f59e0b` | Icons, accents |
| Suppliers & Procurement | `#8b5cf6` | Icons, accents |
| Inventory & Logistics | `#ef4444` | Icons, accents |
| Company & Governance | `#64748b` | Icons, accents |

---

## Data Sync Architecture

### Overview

CoffeeCup Enterprise uses a hybrid sync model: **File System Access API** for Chromium browsers (Chrome, Edge, Brave) with **manual export/import** as a fallback for Firefox/Safari.

No server, no database, no vendor lock-in. The user's existing cloud sync service (OneDrive, Google Drive, Dropbox) handles the sharing.

### How It Works

1. **Enterprise Dashboard** manages sync settings (one-time folder selection per user)
2. User picks a shared folder (e.g., `OneDrive/CoffeeCup/`)
3. Each app's localStorage data is written as a named JSON file (e.g., `gantt-project.json`)
4. The cloud sync service distributes files to other team members automatically
5. On load, apps check the sync folder for newer data and offer to pull updates

### Sync Flow

```
localStorage ──► JSON file ──► Shared Folder ──► Cloud Sync ──► Other Users
(app data)    (push/save)   (OneDrive/GDrive)  (automatic)   (pull/load)
```

### Key Design Rules

- **User-initiated sync** — Push and pull are explicit actions, not automatic. This prevents silent overwrites.
- **localStorage remains primary** — The sync folder is a secondary persistence layer. Apps always work offline from localStorage.
- **One JSON file per localStorage key** — Simple, transparent, AI-editable files.
- **Folder handle re-confirmed per session** — Browser security requires this. The folder *name* is remembered in localStorage so the user picks the same location.
- **Graceful degradation** — If File System Access API is unavailable, show manual export/import buttons instead.

### Conflict Handling

- Last-write-wins by default (file timestamp comparison)
- User prompted when sync folder version is newer than localStorage version
- No automatic merging — user decides which version to keep

---

## Build Commands

None. All apps are static HTML files served directly from the filesystem or any web server.

To run locally: open any `index.html` in a browser. For best results, use a local server (e.g., `npx serve .`) to avoid CORS issues with `file://` protocol.

---

## Adding New Apps

When creating a new app:

1. Create as a self-contained single HTML file
2. Use the shared CSS variable system for theming (copy from any existing app)
3. Read/write theme from `coffeecup-theme` in localStorage (see pattern above)
4. Use a unique localStorage key for app data (follow naming convention: `suite-appname`)
5. Include all 4 theme definitions in the CSS
6. Add a theme selector dropdown in the app header
7. Use the shared CoffeeCup favicon SVG
8. Update the Enterprise Dashboard's `DEFAULT_PM_APPS` (or future suite equivalent) if appropriate
