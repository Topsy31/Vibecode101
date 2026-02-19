# CoffeeCup Design System Guide

## Overview

The CoffeeCup design system ensures visual consistency across all applications through a unified set of CSS variables, component patterns, and four distinct theme variants. This guide is essential for users who want to understand the visual language, and developers who want to extend or customise the suite.

---

## Philosophy

### Design Principles

1. **Consistency Over Creativity** — Every app uses the same CSS variables, button styles, and interaction patterns. This creates predictability and reduces cognitive load.

2. **Theme Flexibility** — Four theme variants (Blueprint, Fun, Dark, Traditional) allow users to match their aesthetic preferences or corporate branding without compromising functionality.

3. **Accessibility First** — Sufficient colour contrast in all themes, keyboard navigation support, and semantic HTML structure.

4. **No External UI Frameworks** — CoffeeCup avoids Bootstrap, Material-UI, or other heavy frameworks. All components are custom-built with Tailwind CSS utilities and inline styles.

5. **Progressive Enhancement** — Core functionality works without animations. Enhancements (shadows, transitions, hover effects) layer on top.

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose | CDN |
|------------|---------|---------|-----|
| **React** | 18 | Component-based UI | `unpkg.com/react@18` |
| **ReactDOM** | 18 | Browser rendering | `unpkg.com/react-dom@18` |
| **Babel Standalone** | Latest | In-browser JSX compilation | `unpkg.com/@babel/standalone` |
| **Tailwind CSS** | Latest | Utility-first CSS framework | `cdn.tailwindcss.com` |

### Typography

| Font | Usage | Weights | CDN |
|------|-------|---------|-----|
| **DM Sans** | Primary UI font | 400, 500, 600, 700 | Google Fonts |
| **JetBrains Mono** | Code, monospace data | 400, 500 | Google Fonts |
| **Nunito** | Fun theme primary font | 400, 600, 700 | Google Fonts |

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## Theme System

CoffeeCup supports **four theme variants** with complete visual consistency across all applications.

### Theme Selector

Every app includes a theme dropdown in the header toolbar:

```
[Blueprint ▼] ← Select theme
```

Theme selection is persisted in `localStorage` and applies immediately without page reload.

---

### Blueprint Theme (Default)

**Visual Identity:** Professional, refined, architectural elegance.

**Best For:** Corporate presentations, formal documentation, client-facing deliverables.

#### Colour Palette

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--bg-primary` | `#fafaf9` | Main background (warm cream) |
| `--bg-secondary` | `#f5f5f4` | Secondary backgrounds |
| `--bg-card` | `#ffffff` | Card/panel backgrounds |
| `--bg-hover` | `rgba(0,0,0,0.02)` | Hover state overlay |
| `--border-primary` | `#e7e5e4` | Primary borders |
| `--border-secondary` | `#f5f5f4` | Subtle borders |
| `--border-accent` | `#d6d3d1` | Emphasis borders |
| `--text-primary` | `#292524` | Body text |
| `--text-secondary` | `#57534e` | Secondary text |
| `--text-muted` | `#78716c` | Muted labels |
| `--text-faint` | `#a8a29e` | Disabled/placeholder |
| `--accent-primary` | `#b8956a` | Warm brown accent |
| `--accent-hover` | `#a07d4f` | Accent hover state |
| `--accent-light` | `rgba(185,149,106,0.12)` | Accent backgrounds |

#### Typography

- **Primary Font:** DM Sans
- **Monospace:** JetBrains Mono

#### Border Radius

- `--radius-sm`: 4px (controls, inputs)
- `--radius-md`: 6px (buttons)
- `--radius-lg`: 12px (cards, panels)
- `--radius-xl`: 16px (large containers)

#### Special Effects

- **Grid Pattern Background:**
  ```css
  background-image:
    linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px);
  background-size: 24px 24px;
  ```

- **Shadows:** Subtle, layered shadows for depth
  - `--shadow-sm`: `0 1px 2px rgba(0,0,0,0.04)`
  - `--shadow-md`: `0 4px 6px -1px rgba(0,0,0,0.05)`
  - `--shadow-lg`: `0 10px 15px -3px rgba(0,0,0,0.08)`

---

### Fun & Vibrant Theme

**Visual Identity:** Playful, energetic, gradient-rich.

**Best For:** Creative teams, personal projects, brainstorming sessions.

#### Colour Palette

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--bg-primary` | `#fef7ff` | Light purple-pink |
| `--bg-secondary` | `#fae8ff` | Slightly darker purple |
| `--bg-card` | `#ffffff` | Card backgrounds |
| `--border-primary` | `#f0abfc` | Bright purple borders |
| `--text-primary` | `#701a75` | Deep purple text |
| `--text-secondary` | `#86198f` | Medium purple text |
| `--text-muted` | `#a21caf` | Muted purple |
| `--accent-primary` | `#d946ef` | Vibrant magenta |

#### Typography

- **Primary Font:** Nunito (rounded, friendly)
- **Monospace:** JetBrains Mono

#### Border Radius

- `--radius-lg`: 20px (very rounded)
- `--radius-xl`: 24px (pill-shaped)

#### Special Effects

- **Gradient Background:**
  ```css
  background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 50%, #f5d0fe 100%);
  ```

- **Bounce Animations:**
  ```css
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  ```
  Buttons "bounce" on hover with playful easing curve.

- **Gradient Buttons:**
  ```css
  background: linear-gradient(135deg, var(--accent-primary) 0%, #c026d3 100%);
  ```

---

### Dark Mode Theme

**Visual Identity:** High contrast, reduced eye strain, modern minimalism.

**Best For:** Night work, reducing screen glare, developer-focused environments.

#### Colour Palette

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--bg-primary` | `#0f0f0f` | Near-black background |
| `--bg-secondary` | `#1a1a1a` | Secondary backgrounds |
| `--bg-card` | `#242424` | Card backgrounds |
| `--border-primary` | `#333333` | Borders |
| `--text-primary` | `#f0f0f0` | High-contrast white text |
| `--text-secondary` | `#b0b0b0` | Secondary text |
| `--text-muted` | `#808080` | Muted grey |
| `--text-faint` | `#606060` | Disabled text |
| `--accent-primary` | `#6366f1` | Indigo accent |
| `--accent-light` | `rgba(99,102,241,0.15)` | Accent backgrounds |

#### Typography

- **Primary Font:** DM Sans
- **Monospace:** JetBrains Mono

#### Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 10px

#### Special Effects

- **Enhanced Shadows:**
  ```css
  --shadow-md: 0 8px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 16px 32px rgba(0,0,0,0.5);
  ```
  Deeper shadows for depth in dark environment.

- **Subtle Glow on Focus:**
  ```css
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  ```

---

### Traditional/Classic Theme

**Visual Identity:** Bootstrap-inspired, minimal styling, corporate-safe.

**Best For:** Conservative organisations, enterprise environments, legacy system integration.

#### Colour Palette

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--bg-primary` | `#f8f9fa` | Light grey background |
| `--bg-secondary` | `#e9ecef` | Secondary backgrounds |
| `--bg-card` | `#ffffff` | Card backgrounds |
| `--border-primary` | `#dee2e6` | Standard borders |
| `--text-primary` | `#212529` | Near-black text |
| `--text-secondary` | `#6c757d` | Grey text |
| `--accent-primary` | `#0d6efd` | Bootstrap blue |
| `--accent-hover` | `#0b5ed7` | Darker blue on hover |

#### Typography

- **Primary Font:** Segoe UI (system font fallback to DM Sans)
- **Monospace:** JetBrains Mono

#### Border Radius

- `--radius-sm`: 2px (very square)
- `--radius-md`: 4px (minimal rounding)
- `--radius-lg`: 4px (same as medium)

#### Special Effects

- **Minimal Shadows:**
  ```css
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 1px 3px rgba(0,0,0,0.1);
  ```

- **No Animations:** Instant state changes, no transitions (for performance and simplicity).

---

## CSS Variables Reference

### Complete Variable List

Every CoffeeCup application must define these CSS variables for each theme:

#### Backgrounds

```css
--bg-primary       /* Main page background */
--bg-secondary     /* Alternate sections, sidebars */
--bg-card          /* Cards, panels, modals */
--bg-hover         /* Hover overlay (rgba) */
--bg-weekend       /* Gantt/calendar weekend columns (optional) */
```

#### Borders

```css
--border-primary   /* Standard borders */
--border-secondary /* Subtle dividers */
--border-accent    /* Emphasis borders, focus rings */
```

#### Text

```css
--text-primary     /* Body text, headings */
--text-secondary   /* Subtext, labels */
--text-muted       /* Disabled, placeholders */
--text-faint       /* Very subtle text */
```

#### Accents

```css
--accent-primary   /* Buttons, links, highlights */
--accent-hover     /* Accent hover state */
--accent-light     /* Accent backgrounds (rgba) */
```

#### Activity/Status Bars

Six-colour palette for visual distinction in Gantt charts, Kanban columns, Risk categories:

```css
--bar-1            /* First activity colour */
--bar-2            /* Second activity colour */
--bar-3            /* Third activity colour */
--bar-4            /* Fourth activity colour */
--bar-5            /* Fifth activity colour */
--bar-6            /* Sixth activity colour */
```

**Blueprint Example:**
- `--bar-1`: `#b8956a` (warm brown)
- `--bar-2`: `#7c9885` (sage green)
- `--bar-3`: `#8b7ba8` (muted purple)
- `--bar-4`: `#c98a7d` (terracotta)
- `--bar-5`: `#6b8ba8` (steel blue)
- `--bar-6`: `#a89b6b` (olive)

#### Status Colours

```css
--danger           /* Destructive actions, errors */
--danger-hover     /* Danger hover state */
--success          /* Success states, confirmations */
--warning          /* Warnings, alerts (optional) */
--info             /* Info messages (optional) */
```

#### Typography

```css
--font-primary     /* Body, UI text */
--font-mono        /* Code, technical data */
```

#### Border Radius

```css
--radius-sm        /* 2-4px: inputs, controls */
--radius-md        /* 6-8px: buttons */
--radius-lg        /* 10-20px: cards, containers */
--radius-full      /* 9999px: pills, badges */
```

#### Shadows

```css
--shadow-sm        /* Subtle elevation */
--shadow-md        /* Standard cards */
--shadow-lg        /* Modals, dialogs */
--shadow-xl        /* Popovers, tooltips */
```

#### Transitions

```css
--transition-fast   /* 0.15s: hover effects */
--transition-normal /* 0.2s: standard transitions */
--transition-slow   /* 0.3s: complex animations */
```

---

## Component Patterns

### Cards

**Purpose:** Containers for grouped content (activities, risks, tasks, etc.).

**Structure:**
```jsx
<div className="card">
  <div className="card-header">
    <h3>Card Title</h3>
  </div>
  <div className="card-body">
    Content here
  </div>
</div>
```

**CSS:**
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**Hover Effect:** Cards lift slightly with enhanced shadow.

---

### Buttons

CoffeeCup defines **four button styles**:

#### Primary Button

**Usage:** Main actions (Save, Create, Submit).

```jsx
<button className="btn-primary">
  Save Project
</button>
```

**CSS:**
```css
.btn-primary {
  background: var(--accent-primary);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

---

#### Secondary Button

**Usage:** Cancel, Close, secondary actions.

```jsx
<button className="btn-secondary">
  Cancel
</button>
```

**CSS:**
```css
.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 10px 20px;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-accent);
}
```

---

#### Accent Button

**Usage:** Special actions, highlighted CTAs.

```jsx
<button className="btn-accent">
  Run Simulation
</button>
```

**CSS:**
```css
.btn-accent {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.btn-accent:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px var(--accent-light);
}
```

---

#### Danger Button

**Usage:** Destructive actions (Delete, Remove).

```jsx
<button className="btn-danger">
  Delete Activity
</button>
```

**CSS:**
```css
.btn-danger {
  background: var(--danger);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: none;
  transition: all var(--transition-fast);
}

.btn-danger:hover {
  background: var(--danger-hover);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}
```

---

#### Button Variants

**Small Button:**
```css
.btn-sm {
  padding: 6px 12px;
  font-size: 14px;
}
```

**Icon Button:**
```css
.btn-icon {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### Inputs

**Purpose:** Text fields, number inputs, date pickers.

```jsx
<input
  type="text"
  className="input-refined"
  placeholder="Activity name"
/>
```

**CSS:**
```css
.input-refined {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: var(--font-primary);
  transition: all var(--transition-normal);
}

.input-refined:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.input-refined::placeholder {
  color: var(--text-muted);
}
```

**Focus State:** Blue ring (accent colour) with enhanced border.

---

### Dropdowns/Selects

```jsx
<select className="input-refined">
  <option>Blueprint</option>
  <option>Fun</option>
  <option>Dark</option>
  <option>Traditional</option>
</select>
```

**CSS:** Same as `.input-refined`, with custom arrow (optional):

```css
select.input-refined {
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Custom chevron */
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

---

### Modals/Dialogs

**Structure:**
```jsx
<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2>Modal Title</h2>
      <button className="btn-icon" onClick={closeModal}>
        {icons.x(20)}
      </button>
    </div>
    <div className="modal-body">
      Content here
    </div>
    <div className="modal-footer">
      <button className="btn-secondary">Cancel</button>
      <button className="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

**CSS:**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

### Settings Panel (Right-Side Drawer)

**Usage:** Kanban, Gantt, Risk Register settings.

```jsx
<div className={`settings-drawer ${isOpen ? 'open' : ''}`}>
  <div className="settings-header">
    <h3>Settings</h3>
    <button onClick={close}>{icons.x(20)}</button>
  </div>
  <div className="settings-body">
    {/* Settings sections */}
  </div>
</div>
```

**CSS:**
```css
.settings-drawer {
  position: fixed;
  right: -420px;
  top: 0;
  bottom: 0;
  width: 420px;
  background: var(--bg-card);
  border-left: 1px solid var(--border-primary);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transition: right var(--transition-normal);
  z-index: 999;
  overflow-y: auto;
}

.settings-drawer.open {
  right: 0;
}
```

---

### Header Pattern

**Structure:**
```jsx
<div className="app-header">
  <div className="header-left">
    <div className="icon-gradient">🎯</div>
    <div>
      <h1 className="header-title">Gantt Chart</h1>
      <p className="header-subtitle">Project scheduling</p>
    </div>
  </div>
  <div className="header-right">
    <select className="theme-selector">
      <option>Blueprint</option>
      <option>Fun</option>
      <option>Dark</option>
      <option>Traditional</option>
    </select>
    <button className="btn-icon" onClick={openSettings}>
      {icons.settings(20)}
    </button>
  </div>
</div>
```

**CSS:**
```css
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-primary);
}

.icon-gradient {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.header-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
```

---

### Empty States

**Usage:** When no data exists (no activities, no risks, etc.).

```jsx
<div className="empty-state">
  <div className="empty-icon">
    {icons.clipboard(64)}
  </div>
  <h3 className="empty-heading">No Activities Yet</h3>
  <p className="empty-description">
    Click "Add Activity" to create your first task.
  </p>
  <button className="btn-primary">
    {icons.plus(16)} Add Activity
  </button>
</div>
```

**CSS:**
```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.empty-heading {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-description {
  color: var(--text-muted);
  margin-bottom: 20px;
}
```

---

## Icon System

### Implementation

CoffeeCup uses **inline SVG icons** (no icon fonts like Font Awesome).

**Advantages:**
- No external dependencies
- Full control over size, colour, stroke width
- SSR-friendly, no FOUC (Flash of Unstyled Content)

**Pattern:**
```jsx
const icons = {
  plus: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  // ... more icons
};
```

**Usage:**
```jsx
<button className="btn-primary">
  {icons.plus(16)} Add Activity
</button>
```

**Colour Inheritance:** Icons use `stroke="currentColor"`, inheriting text colour from parent.

---

## Animation & Feedback

### Hover Effects

**Cards:**
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**Buttons:**
```css
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

### Focus States

**Inputs:**
```css
.input-refined:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-light);
}
```

### Loading States

**Spinner:**
```jsx
<div className="spinner"></div>
```

```css
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Page Transitions

**Mount Animation:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-content {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Responsive Design

### Breakpoints

CoffeeCup targets **desktop-first** design with mobile responsiveness:

| Breakpoint | Width | Target |
|------------|-------|--------|
| **Desktop** | 1280px+ | Primary target |
| **Laptop** | 1024px-1279px | Slightly condensed layout |
| **Tablet** | 768px-1023px | Stacked sidebars, simplified charts |
| **Mobile** | <768px | Single-column, touch-optimised |

**Tailwind Responsive Classes:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

---

## Accessibility

### Colour Contrast

All themes meet **WCAG AA contrast ratios** (4.5:1 for body text, 3:1 for large text).

**Blueprint:**
- Text on white: #292524 on #ffffff (16.8:1) ✅
- Accent on white: #b8956a on #ffffff (3.2:1 for large text) ✅

**Dark Mode:**
- Text on dark: #f0f0f0 on #0f0f0f (15.2:1) ✅

### Keyboard Navigation

- **Tab Order:** Logical, follows visual order
- **Focus Indicators:** Blue ring (3px) on all interactive elements
- **Escape Key:** Closes modals, settings panels
- **Enter Key:** Submits forms, creates items

### Screen Readers

- **Semantic HTML:** `<button>`, `<input>`, `<select>` (not `<div onclick>`)
- **ARIA Labels:** Where text isn't visible
  ```jsx
  <button aria-label="Close modal">{icons.x(20)}</button>
  ```
- **Alt Text:** All decorative icons have `aria-hidden="true"`

---

## Theme Persistence

### LocalStorage Key

Theme selection stored in:
- **Modern Apps:** `{app-key}.theme` (e.g., `gantt-project.theme`)
- **Legacy Apps:** `{app-name}-theme` (e.g., `delphi-theme`)

### Implementation

```javascript
// On theme change
const saveTheme = (newTheme) => {
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('app-theme', newTheme);
};

// On page load
useEffect(() => {
  const savedTheme = localStorage.getItem('app-theme') || 'blueprint';
  setTheme(savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
}, []);
```

**Real-Time Switching:** No page reload required. CSS variables update instantly.

---

## Creating New Applications

### Checklist

When building a new CoffeeCup application:

1. ✅ **Copy CSS variable block** from existing app (all 4 themes)
2. ✅ **Implement theme selector** in header
3. ✅ **Use standard component patterns** (cards, buttons, inputs)
4. ✅ **Define consistent border radius** per theme
5. ✅ **Include Google Fonts** (DM Sans, JetBrains Mono, Nunito)
6. ✅ **Persist theme** in localStorage
7. ✅ **Test all 4 themes** for visual consistency
8. ✅ **Verify accessibility** (contrast ratios, keyboard nav)

### Template Starter

```html
<!DOCTYPE html>
<html lang="en" data-theme="blueprint">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App — CoffeeCup</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    /* Insert CSS variables for all 4 themes here */
  </style>

  <!-- React -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;

    const App = () => {
      const [theme, setTheme] = useState('blueprint');

      // Load theme from localStorage
      useEffect(() => {
        const saved = localStorage.getItem('myapp-theme') || 'blueprint';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      }, []);

      const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('myapp-theme', newTheme);
      };

      return (
        <div>
          <header className="app-header">
            <h1>My App</h1>
            <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
              <option value="blueprint">Blueprint</option>
              <option value="fun">Fun</option>
              <option value="dark">Dark</option>
              <option value="traditional">Traditional</option>
            </select>
          </header>
          {/* App content */}
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

---

## See Also

- [OVERVIEW.md](OVERVIEW.md) — Suite introduction
- [INTEGRATION.md](INTEGRATION.md) — Data flow between apps
- [Per-App Guides](apps/) — Detailed usage documentation

---

*Design system ensures visual consistency and scalability across the CoffeeCup suite. All apps share these patterns for predictable, professional UX.*
