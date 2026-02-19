# Stakeholder Map

## Purpose

Visual power/interest quadrant grid for mapping stakeholders and determining engagement strategies using drag-and-drop positioning and auto-classification.

**Best For:** Stakeholder analysis, engagement planning, communications strategy, identifying key influencers.

---

## Quick Start

1. **Add Stakeholders** — Click "+ Add Stakeholder", enter name, role, organisation
2. **Position on Grid** — Drag stakeholder cards to appropriate quadrant (Power × Interest)
3. **Review Strategy** — App auto-suggests engagement approach based on quadrant
4. **Export to PMPlan** — Pull stakeholder data into PMPlan Stakeholder Register

---

## Features

### Power/Interest Grid

**Axes:**
- **X-Axis:** Interest (Low → High)
- **Y-Axis:** Power (Low → High)

**Four Quadrants:**

| Quadrant | Power | Interest | Strategy |
|----------|-------|----------|----------|
| **Manage Closely** | High | High | Active engagement, frequent updates |
| **Keep Satisfied** | High | Low | Meet their needs, don't bore with detail |
| **Keep Informed** | Low | High | Adequate information, show consideration |
| **Monitor** | Low | Low | Minimal effort, periodic check-ins |

---

### Adding Stakeholders

**Steps:**
1. Click **+ Add Stakeholder** button
2. Fill in stakeholder form:
   - **Name** — Full name
   - **Role** — Job title or function
   - **Organisation** — Company or department
   - **Email** — Contact email (optional)
   - **Notes** — Additional context

3. Click **Save**
4. Stakeholder card appears in default quadrant (Monitor — low power, low interest)

**Auto-ID:** Stakeholders auto-assigned IDs (SH-001, SH-002, etc.)

---

### Stakeholder Attributes

**Core Fields:**
- Name, Role, Organisation, Email
- Power Level (1-5, auto-calculated from quadrant position)
- Interest Level (1-5, auto-calculated from quadrant position)
- Current Engagement (Unaware, Resistant, Neutral, Supportive, Leading)
- Desired Engagement (target state)
- Notes (free text)

**Engagement Levels:**
- **Unaware** — Doesn't know about project
- **Resistant** — Actively opposes project
- **Neutral** — Aware but no strong opinion
- **Supportive** — Backs the project
- **Leading** — Champions the project

---

### Drag-and-Drop Positioning

**How It Works:**
1. Click and hold stakeholder card
2. Drag to appropriate quadrant
3. Drop in position
4. Power/Interest values auto-update (1-5 scale based on position)
5. Engagement strategy label updates

**Visual Feedback:**
- Card becomes semi-transparent while dragging
- Quadrant highlights on hover
- Strategy badge updates on drop

**Power/Interest Mapping:**
- **Bottom-left** → Power: 1-2, Interest: 1-2
- **Top-left** → Power: 4-5, Interest: 1-2
- **Bottom-right** → Power: 1-2, Interest: 4-5
- **Top-right** → Power: 4-5, Interest: 4-5

---

### Editing Stakeholders

1. Click stakeholder card to expand
2. Modify any field
3. Click **Save** to commit changes
4. Or manually drag to reposition

**Deleting Stakeholders:**
- Click **Delete** button (red trash icon)
- Confirmation dialog appears
- Click **Confirm** to delete

---

## Integration with PMPlan

### Data PMPlan Pulls

When you click "Pull Latest" in PMPlan's **Stakeholder Register** section, it reads:

**From `localStorage['stakeholder-project']`:**
- All stakeholders (name, role, organisation, email)
- Power/Interest classification (quadrant)
- Engagement strategy (based on quadrant)
- Current vs Desired engagement levels

**What PMPlan Displays:**
- Stakeholder table with power/interest indicators
- Engagement strategy recommendations
- High-priority stakeholders (Manage Closely quadrant)

**What PMPlan Doesn't Display:**
- Full quadrant grid (too visual for text-based plan)
- Detailed notes (kept in Stakeholder Map)

### Workflow

1. **Map stakeholders** in Stakeholder Map — Position on grid, set engagement levels
2. **Open PMPlan** — Navigate to Stakeholder Register section
3. **Click "Pull Latest"** — PMPlan reads Stakeholder Map data
4. **Review list** — High-level stakeholder overview for plan documentation
5. **Export PMPlan** — Include stakeholder register in formal project plan

---

## Tips & Best Practices

### Stakeholder Analysis

**High Power/High Interest (Manage Closely):**
- These are your **sponsors and champions**
- Engage frequently (weekly updates, one-on-ones)
- Seek their input on major decisions
- Ensure their needs are met
- Examples: Project sponsor, CEO, key client

**High Power/Low Interest (Keep Satisfied):**
- These are **busy executives** who care about outcomes, not details
- Keep them satisfied but don't over-communicate
- Monthly high-level updates sufficient
- Escalate only critical issues
- Examples: CFO, VP of Operations

**Low Power/High Interest (Keep Informed):**
- These are your **advocates and influencers**
- Keep them informed—they'll spread the word
- Bi-weekly or monthly updates
- Leverage their enthusiasm for change management
- Examples: End users, team leads, subject matter experts

**Low Power/Low Interest (Monitor):**
- Minimal effort required
- Periodic check-ins (quarterly or as needed)
- Don't ignore completely—context can shift
- Examples: Distant departments, peripheral stakeholders

---

### Engagement Planning

**Moving Stakeholders:**

**Goal:** Shift from **Current Engagement** to **Desired Engagement**

**Example:**
- Stakeholder: IT Director
- Current: Resistant (opposes cloud migration)
- Desired: Supportive (backs the project)

**Actions:**
1. Understand resistance (cost concerns? security worries?)
2. Address concerns (cost-benefit analysis, security audit)
3. Involve in solution design (co-create security controls)
4. Track engagement shift (Resistant → Neutral → Supportive)

**Update Stakeholder Map:**
- Edit stakeholder card
- Change "Current Engagement" from Resistant to Neutral (progress)
- Continue engagement until Supportive achieved

---

### Quadrant Shifts

**Stakeholders aren't static—they move between quadrants:**

**Common Shifts:**
- **Promotion** — Low power → High power (new role)
- **Project Impact** — Low interest → High interest (now affects their team)
- **Retirement/Departure** — High power → No power (left organisation)

**Review Frequency:**
- **Monthly:** Review top 10 stakeholders
- **Quarterly:** Review all stakeholders
- **Major Milestones:** Re-assess before key decisions

**Re-Positioning:**
- Drag stakeholder to new quadrant
- Update engagement strategy accordingly
- Document reason for shift in Notes field

---

### Common Pitfalls

**Pitfall:** Assuming power/interest is permanent.

**Solution:** Review quarterly—roles and priorities change.

**Pitfall:** Over-engaging Low Power/Low Interest stakeholders.

**Solution:** Monitor only—focus effort on Manage Closely quadrant.

**Pitfall:** Ignoring Low Power/High Interest (advocates).

**Solution:** These are your champions—keep them informed, leverage their support.

**Pitfall:** Stakeholder Map becomes static (no updates after initial mapping).

**Solution:** Treat as living document—update as project evolves.

---

## Troubleshooting

### Stakeholders won't drag

**Cause:** JavaScript error or browser issue.

**Solution:**
1. Hard refresh (Ctrl+F5 / Cmd+Shift+R)
2. Check browser console (F12) for errors
3. Try different browser (Chrome recommended)

---

### Power/Interest values don't update after drag

**Cause:** Auto-calculation disabled or data not saving.

**Solution:**
1. Check localStorage: `localStorage.getItem('stakeholder-project')`
2. Manually edit stakeholder, set Power/Interest values
3. Save and verify update

---

### PMPlan shows no stakeholder data

**Cause:** Stakeholder Map has no saved data.

**Solution:**
1. Open Stakeholder Map
2. Verify stakeholders exist (cards visible on grid)
3. Click any stakeholder to trigger auto-save
4. Return to PMPlan, try pulling again

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + S** | Auto-save (triggers localStorage update) |
| **Enter** | Save stakeholder (when form focused) |
| **Esc** | Cancel edit, close stakeholder form |
| **Delete** | Delete focused stakeholder (with confirmation) |

---

## Technical Notes

### LocalStorage Key

**Primary Key:** `stakeholder-project`

**Data Structure:**
```json
{
  "stakeholders": [
    {
      "id": "SH-001",
      "name": "Jane Doe",
      "role": "Project Sponsor",
      "organisation": "Acme Corp",
      "email": "jane.doe@acme.com",
      "powerLevel": 5,
      "interestLevel": 5,
      "quadrant": "manage-closely",
      "currentEngagement": "supportive",
      "desiredEngagement": "leading",
      "notes": "Key decision-maker, approve all major changes",
      "position": {
        "x": 350,
        "y": 150
      }
    }
  ],
  "meta": {
    "created": "2026-02-12T10:00:00Z",
    "modified": "2026-02-12T14:30:00Z"
  }
}
```

**Quadrant Values:**
- `manage-closely` — High Power, High Interest
- `keep-satisfied` — High Power, Low Interest
- `keep-informed` — Low Power, High Interest
- `monitor` — Low Power, Low Interest

---

## See Also

- [PMPlan Integration](pmplan.md) — How stakeholder data feeds into project plans
- [RACI Matrix](raci-matrix.md) — Role assignment (complements stakeholder analysis)
- [OVERVIEW.md](../OVERVIEW.md) — Suite introduction

---

*Stakeholder Map: Visual power/interest grid for engagement planning with drag-and-drop positioning.*
