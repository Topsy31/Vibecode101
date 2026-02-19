# Gantt Chart Editor

## Purpose

The Gantt Chart Editor is a sophisticated project scheduling tool that helps you plan activities, manage dependencies, and visualise timelines. It combines drag-and-drop interactivity with powerful scheduling algorithms to calculate critical paths and identify project bottlenecks.

**Best For:** Complex projects with multiple interdependent activities, construction schedules, software development sprints, event planning.

---

## Quick Start

### Creating Your First Project

1. **Set Project Start Date**
   - Located in the header toolbar
   - Click the date field and select your project kick-off date
   - All activity timelines calculate from this date

2. **Add Your First Activity**
   - Enter activity name (e.g., "Design Phase")
   - Enter duration in days (e.g., 10)
   - Click **Add Activity** button or press Enter

3. **Add More Activities**
   - Repeat step 2 for each major task
   - Activities appear in the left panel and timeline

4. **Create Dependencies**
   - Click the **Dependencies** button on any activity
   - Select which activity must complete first (predecessor)
   - Choose dependency type (Finish-to-Start, Start-to-Start, etc.)
   - Click **Add Dependency**

5. **View Timeline**
   - The Gantt chart automatically displays bars for each activity
   - Critical path activities highlight in a distinct colour
   - Dependency arrows show relationships between activities

---

## Features

### Activity Management

#### Adding Activities

**Input Fields:**
- **Name** — Activity description (max 100 characters, auto-wraps long words)
- **Duration** — Number of days (0 = milestone, >0 = task)

**Activity Types:**
- **Regular Activity** — Duration > 0, renders as horizontal bar
- **Milestone** — Duration = 0, renders as diamond marker

**Validation:**
- Name cannot be empty
- Duration must be non-negative integer
- Long words (>16 chars) automatically break for layout

#### Editing Activities

1. Click **Edit** button on any activity card
2. Modify name or duration in inline form
3. Click **Save** to commit changes
4. Click **Cancel** or press Esc to discard

**What Updates:**
- Activity bar length adjusts if duration changes
- Timeline recalculates if dependencies exist
- Critical path recalculates automatically

#### Deleting Activities

1. Click **Delete** button (red trash icon)
2. Activity removes immediately (no confirmation)
3. Dependent activities adjust their start dates
4. Dependency arrows update automatically

**Warning:** Deletion cannot be undone. Export your project before major changes.

#### Reordering Activities

**Drag-and-Drop:**
1. Click and hold the drag handle (≡ icon) on any activity card
2. Drag up or down to new position
3. Release to drop

**Visual Feedback:**
- Dragged card becomes semi-transparent
- Drop target shows blue highlight
- Timeline updates after drop

**Note:** Reordering changes visual list order but doesn't affect scheduling logic (dependencies control timing).

---

### Dependency Management

#### Dependency Types

The Gantt Chart supports **four dependency types** (PMBOK standard):

| Type | Code | Meaning | Example |
|------|------|---------|---------|
| **Finish-to-Start** | FS | Successor starts after predecessor finishes | Design must finish before Development starts |
| **Start-to-Start** | SS | Both activities start simultaneously | Design and Procurement can start together |
| **Finish-to-Finish** | FF | Both activities finish simultaneously | Testing finishes when Development finishes |
| **Start-to-Finish** | SF | Successor finishes when predecessor starts | Old system shuts down when new system starts (rare) |

**Default:** Finish-to-Start (FS) — most common in project scheduling.

#### Adding Dependencies

1. Click **Dependencies** button on activity card
2. Modal opens with dependency form
3. **Select Predecessor** — Dropdown lists all other activities
4. **Choose Type** — FS, SS, FF, or SF
5. **Set Lag** (optional) — Delay in days (+) or lead time (-)
6. Click **Add Dependency**

**Lag Examples:**
- **+5 days lag** — Successor starts 5 days after predecessor finishes (FS+5)
- **-2 days lag** — Successor starts 2 days before predecessor finishes (FS-2 = lead time)

**Visual Result:**
- Dependency arrow draws from predecessor to successor
- Arrow colour matches theme accent
- Timeline automatically adjusts successor start date

#### Editing Dependencies

1. Click **Dependencies** button on activity with existing dependencies
2. Listed dependencies show predecessor name, type, and lag
3. Click **Edit** on dependency row
4. Modify type or lag
5. Click **Save**

#### Removing Dependencies

1. Click **Dependencies** button
2. Click **Delete** (red X) next to dependency row
3. Dependency removes immediately
4. Timeline recalculates without constraint

**Effect:** Successor activity may shift earlier if no longer constrained.

#### Multiple Dependencies

Activities can have **multiple predecessors**:
- Activity starts when **all predecessors** satisfy their dependency types
- For FS dependencies, activity waits for the **latest** predecessor finish

**Example:**
- Activity C depends on Activity A (FS) and Activity B (FS)
- A finishes Day 10, B finishes Day 15
- C starts Day 16 (waits for both)

---

### Timeline Visualisation

#### Understanding the Gantt Chart

**Components:**
- **Timeline Header** — Date labels (days, weeks, or months depending on scale)
- **Activity Bars** — Horizontal bars showing duration and timing
- **Dependency Arrows** — Lines connecting predecessor to successor
- **Milestone Diamonds** — Zero-duration events
- **Critical Path Highlight** — Distinct colour for critical activities

#### Critical Path

**What It Is:**
The critical path is the **longest sequence** of dependent activities from project start to finish. Any delay on the critical path delays the entire project.

**How It's Identified:**
1. Gantt Chart calculates Early Start (ES) and Early Finish (EF) for each activity using forward pass
2. Calculates Late Start (LS) and Late Finish (LF) using backward pass
3. Activities with **zero slack** (ES = LS) are critical

**Visual Indication:**
- Critical path activities render in accent colour (brown in Blueprint, magenta in Fun, indigo in Dark)
- Non-critical activities use muted colours (bars 1-6 palette)

**Why It Matters:**
- Focus management attention on critical activities
- Identify where fast-tracking or crashing would be most effective
- Understand which activities have scheduling flexibility (float)

#### Time Scale

**Options:**
- **Days** — Default, 1 unit = 1 day
- **Weeks** — 1 unit = 7 days
- **Months** — 1 unit = 30 days (approximation)

**Changing Scale:**
1. Use **Time Scale** dropdown in toolbar
2. Chart re-renders with new unit
3. Activity bars resize proportionally

**Use Cases:**
- Days: Short projects (1-3 months)
- Weeks: Medium projects (3-12 months)
- Months: Long projects (1+ years)

#### Zooming

**Unit Width Slider:**
- Located in toolbar
- Adjusts horizontal spacing of timeline units
- Range: 20px to 60px per unit

**Effects:**
- **Narrower (20px)** — More timeline visible, compact view
- **Wider (60px)** — Zoomed-in detail, easier to read dates

**Tip:** Use narrow width for overview, wide width for detailed dependency editing.

#### Dependency Arrows

**Toggle On/Off:**
- Click **Show Arrows** checkbox in toolbar
- Hides arrows for cleaner print view
- Arrows still exist in data, just not rendered

**Arrow Rendering:**
- Start point: Right edge of predecessor bar (FS, FF) or left edge (SS, SF)
- End point: Left edge of successor bar (FS, SS) or right edge (FF, SF)
- Curved path: SVG quadratic Bézier curve for visual clarity

---

### Print & Export

#### Export to JSON

**Purpose:** Back up project data, share with team, version control.

**Steps:**
1. Click **Export** button in header
2. Browser downloads `gantt-project.json`
3. File contains startDate, activities, dependencies

**JSON Structure:**
```json
{
  "startDate": "2026-02-12",
  "activities": [
    {
      "name": "Design Phase",
      "duration": 10,
      "dependencies": [
        {
          "predecessorId": "uuid-of-predecessor",
          "type": "FS",
          "lag": 0
        }
      ]
    }
  ]
}
```

**Use Cases:**
- Daily backups before major edits
- Sharing with collaborators (import on their machines)
- Storing in version control (Git, Dropbox)

#### Import from JSON

**Steps:**
1. Click **Import** button
2. Select `.json` file from Export
3. Gantt Chart loads data, replacing current project

**Migration:** Import automatically migrates old data formats (pre-UUID dependencies, pre-array dependencies) to current structure.

#### Print to PDF

**Built-In Print Modes:**

The Gantt Chart includes **two print layouts** optimised for paper:

##### Chart View (Default)

1. Click **Print** button (or Ctrl/Cmd+P)
2. Ensure **Print Mode: Chart** selected in toolbar
3. Browser print dialog opens
4. Select "Save as PDF" as destination

**What Prints:**
- Full Gantt timeline with bars and dependency arrows
- Activity list on left
- Project start date and title (if set)
- Scales to fit A4/Letter paper

**Best For:** Visual timeline presentations, Gantt chart posters.

##### Table View

1. Select **Print Mode: Table** from toolbar dropdown
2. Click **Print** button
3. Browser print dialog opens

**What Prints:**
- Two-column table format:
  - **Column 1:** Activity List (ID, Name, Duration, Dependencies)
  - **Column 2:** Schedule Calculations (ES, EF, LS, LF, Slack, Critical Path indicator)
- Compact typography, fits 20+ activities per page

**Best For:** Schedule analysis, critical path review, technical documentation.

**Table Columns Explained:**
- **ES (Early Start):** Earliest day activity can start
- **EF (Early Finish):** Earliest day activity can finish (ES + Duration)
- **LS (Late Start):** Latest day activity can start without delaying project
- **LF (Late Finish):** Latest day activity can finish without delaying project
- **Slack:** LS - ES (or LF - EF) — days of scheduling flexibility
- **Critical:** "Yes" if slack = 0

---

### Three-Point Estimation (Planned Feature)

**Note:** The Gantt Chart code includes infrastructure for three-point estimation (optimistic, likely, pessimistic durations) but the UI is not yet exposed. This feature will calculate PERT estimates and integrate with Risk Register Monte Carlo simulations.

**When Implemented:**
- Input three durations instead of one
- PERT formula: (Optimistic + 4×Likely + Pessimistic) / 6
- Standard deviation calculation for uncertainty quantification
- Feeds into Risk Register probabilistic scheduling

---

## Project Management Concepts

### Critical Path Method (CPM)

**Definition:**
The Critical Path Method is a scheduling algorithm that identifies the longest sequence of dependent activities and calculates the minimum project duration.

**How It Works:**

1. **Forward Pass** — Calculate Early Start and Early Finish for each activity
   - Start at Day 0 (or project start date)
   - For each activity, ES = max(predecessor EF + lag)
   - EF = ES + Duration

2. **Backward Pass** — Calculate Late Start and Late Finish
   - Start at project end date
   - For each activity (in reverse), LF = min(successor LS - lag)
   - LS = LF - Duration

3. **Slack Calculation**
   - Slack = LS - ES (or LF - EF, both equal)
   - Activities with zero slack are on the critical path

**Why Use CPM:**
- Identifies which activities **cannot be delayed** without delaying the project
- Reveals which activities have **float** (scheduling flexibility)
- Informs **resource allocation** decisions (focus on critical activities)
- Supports **fast-tracking** analysis (which activities can be parallelised?)

### Topological Sorting

**Definition:**
Topological sorting orders activities such that all dependencies are satisfied before dependent activities are processed.

**Why the Gantt Chart Uses It:**
- Ensures activities are scheduled in dependency order
- Detects circular dependencies (Activity A depends on B, B depends on A)
- Validates that the schedule is mathematically solvable

**User Impact:**
- If you create a circular dependency, the chart displays an error
- Activities always render in a logical sequence
- Schedule calculations never enter infinite loops

### Float/Slack

**Definition:**
Float (or slack) is the amount of time an activity can be delayed without affecting the project end date.

**Types:**
- **Total Float** — Delay without affecting project finish (what Gantt Chart calculates)
- **Free Float** — Delay without affecting successor early start (not calculated)

**How to Use Float:**
- Activities with **high float** (e.g., 10 days) are flexible — safe to delay if needed
- Activities with **zero float** are critical — must be monitored closely
- Float allows **resource levelling** — shift non-critical activities to balance workload

**Visual Clue:**
Non-critical activities (with float) use muted bar colours; critical activities (zero float) use accent colour.

---

## Integration with PMPlan

### Data PMPlan Pulls

When you click "Pull Latest" in PMPlan's **Schedule Summary** section, it reads:

**From `localStorage['gantt-project']`:**
- Project start date
- List of all activities (name, duration)
- Milestones (zero-duration activities)
- Critical path activities (calculated)
- Dependencies (for dependency diagrams)

**What PMPlan Displays:**
- High-level schedule summary (start date, end date, total duration)
- Milestone list with dates
- Critical path activities highlighted
- Dependency count (e.g., "15 activities, 8 dependencies")

**What PMPlan Doesn't Display:**
- Full Gantt chart (too complex for summary view)
- Non-critical activity details
- Lag values or dependency types

### Workflow

1. **Build schedule in Gantt Chart** — Add activities, set dependencies, validate timeline
2. **Open PMPlan** — Navigate to Schedule Summary section
3. **Click "Pull Latest"** — PMPlan reads Gantt data
4. **Review summary** — High-level schedule overview for stakeholders
5. **Export PMPlan** — Include schedule summary in formal project plan

---

## Tips & Best Practices

### Scheduling Tips

1. **Start with Milestones**
   - Add key milestones first (duration = 0)
   - Example: "Project Kickoff", "Phase 1 Complete", "Final Delivery"
   - Provides structure for filling in activities

2. **Work Backwards from Deadline**
   - If you have a fixed end date, start there
   - Add final activity (e.g., "Handover") with target date
   - Work backwards adding predecessors

3. **Use Consistent Duration Units**
   - Days: For short, detailed schedules
   - Weeks: For medium-length projects (avoid "5.5 days" confusion)

4. **Don't Over-Decompose**
   - Keep activity list manageable (20-50 activities typical)
   - Too granular (100+ activities) makes chart unreadable
   - Use work breakdown structure (WBS) for detailed task lists, Gantt for high-level timeline

5. **Validate Dependencies**
   - Click **Dependencies** on each activity to review
   - Ensure no circular dependencies
   - Check lag values are correct (positive for delay, negative for lead)

### Dependency Best Practices

1. **Prefer Finish-to-Start**
   - FS is most intuitive and common
   - Use SS/FF/SF only when truly parallel or overlapping work

2. **Avoid Dependency Chains >5 Links**
   - Long chains create brittle schedules
   - One delay propagates through entire chain
   - Consider parallelising activities

3. **Use Lag for Buffer Time**
   - FS+2 = "Activity B starts 2 days after Activity A finishes" (buffer for handover)
   - Builds contingency into schedule

4. **Test Critical Path Impact**
   - After adding dependencies, check which activities are critical
   - If too many activities are critical (>60%), schedule may be too tight

### Performance Optimisation

**For Large Projects (50+ Activities):**

1. **Disable Arrows**
   - Uncheck "Show Arrows" for faster rendering
   - Dependency calculation still happens, just not drawn

2. **Use Wider Time Scale**
   - Switch to Weeks or Months
   - Fewer timeline units = faster render

3. **Export and Archive**
   - Complete phases: export to JSON, clear Gantt, start new phase
   - Keeps activity list manageable

### Data Backup Strategy

1. **Export Weekly**
   - Click Export, save to `gantt-backup-YYYY-MM-DD.json`
   - Store in project folder or cloud storage

2. **Before Major Changes**
   - Export before deleting activities or restructuring dependencies
   - Allows rollback if change causes issues

3. **Browser Considerations**
   - Data stored in `localStorage['gantt-project']`
   - Clearing browser data deletes it
   - Export is your only off-browser backup

---

## Troubleshooting

### "Circular dependency detected"

**Cause:** Activity A depends on Activity B, and Activity B (directly or indirectly) depends on Activity A.

**Example:**
- Activity C depends on Activity A (FS)
- Activity A depends on Activity C (FS)
- This creates a loop: A waits for C, C waits for A

**Solution:**
1. Click **Dependencies** on activities in the loop
2. Remove one dependency to break the cycle
3. Re-evaluate project logic (which activity truly comes first?)

**Prevention:** Build dependencies in chronological order (early activities first).

---

### Activities overlap unexpectedly

**Cause:** Multiple dependencies with different lag values, or SS/FF dependencies misunderstood.

**Debug Steps:**
1. Click **Print** and select **Table View**
2. Review ES (Early Start) and EF (Early Finish) columns
3. Identify which predecessor is controlling the start date
4. Check dependency modal for lag values

**Common Issue:**
- Activity B depends on Activity A (FS) and Activity C (FS)
- A finishes Day 10, C finishes Day 5
- B starts Day 11 (controlled by later predecessor A)

**Solution:** Verify all predecessors are correct. Remove unintended dependencies.

---

### Timeline doesn't update after editing

**Cause:** Browser caching issue or JavaScript error.

**Solution:**
1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Check browser console (F12) for errors
3. If error persists, export data, clear localStorage, import data

---

### Arrows render incorrectly

**Cause:** Complex dependency arrows overlapping or going off-screen.

**Solution:**
1. **Zoom out** — Reduce unit width slider
2. **Reorder activities** — Drag activity cards so dependent activities are closer visually
3. **Disable arrows** — Uncheck "Show Arrows" if too cluttered for print

**Note:** Arrow rendering uses SVG curves and may have edge cases with very long projects (>100 activities).

---

### Print layout cuts off activities

**Cause:** Too many activities for one page, or browser print margins.

**Solution:**
1. Switch to **Table View** for multi-page print
2. Adjust browser print settings: margins to "None" or "Minimal"
3. Use landscape orientation for wide timelines
4. Export to JSON, split into phases, print separately

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Enter** | Add activity (when form focused) |
| **Esc** | Cancel edit, close dependency modal |
| **Ctrl/Cmd + S** | Auto-save (triggers localStorage update) |
| **Ctrl/Cmd + P** | Print Gantt chart |
| **Delete** | Remove activity (when activity card focused) |

---

## Technical Notes

### Data Storage

**LocalStorage Key:** `gantt-project`

**Data Structure:**
```json
{
  "startDate": "2026-02-12",
  "theme": "blueprint",
  "activities": [
    {
      "id": "uuid",
      "name": "Activity Name",
      "duration": 10,
      "dependencies": [
        {
          "predecessorId": "uuid-of-predecessor",
          "type": "FS",
          "lag": 0
        }
      ]
    }
  ]
}
```

### Backwards Compatibility

The Gantt Chart includes migration logic for old data formats:
- **Pre-UUID:** Assigns UUIDs to activities missing IDs
- **Pre-Array Dependencies:** Converts single `dependency` field to `dependencies[]` array
- **Pre-Type Dependencies:** Defaults to FS type if not specified

**Result:** Old projects import seamlessly without data loss.

---

## See Also

- [PMPlan Integration](pmplan.md) — How schedule data feeds into project plans
- [Risk Register](risk-register.md) — Probabilistic schedule analysis (future integration)
- [OVERVIEW.md](../OVERVIEW.md) — Suite introduction

---

*Gantt Chart Editor: Professional project scheduling with critical path analysis. Built with React 18, rendered entirely in-browser.*
