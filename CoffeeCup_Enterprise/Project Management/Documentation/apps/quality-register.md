# Quality Register

## Purpose

Quality criteria definition, inspection checklists, defect tracking, and formal acceptance sign-off for construction and IT/software projects.

**Best For:** Quality assurance, compliance, acceptance testing, construction QA, deliverable sign-off.

**Status:** Complete

**localStorage Key:** `quality-project`

---

## Quick Start

1. **Define quality criteria** — open the Quality Criteria tab, add standards with categories and methods
2. **Create checklists** — switch to Inspection Checklists, add items to check during inspections
3. **Log defects** — use the Defect Log to record non-conformances found during quality checks
4. **Progress defects** — move cards through Open → In Progress → Closed columns
5. **Sign off** — use the Sign-Off tab for formal acceptance by stakeholders

---

## Features

### Quality Criteria Tab

Define what "quality" means for your project before work begins.

#### Adding a Standard

Fill in the form at the top:

| Field | Options | Purpose |
|-------|---------|---------|
| **Category** | Inspection, Functionality, Performance, Compliance, Usability | Classification of the quality standard |
| **Description** | Free text | What the standard requires |
| **Method** | Auto-set to "Visual" | How the standard is measured |

Click **Add Standard** to save. The criterion appears in the table below.

#### Criteria Table

Each standard displays as a row with category, description, and method (shown as a badge). Click the trash icon to remove a standard.

**Example Criteria (IT Project):**
- **Performance:** Response time < 2 seconds for all API calls
- **Functionality:** Zero critical security vulnerabilities
- **Compliance:** Accessibility WCAG AA compliance
- **Inspection:** Code coverage ≥ 80% via automated testing

**Example Criteria (Construction):**
- **Inspection:** Concrete compressive strength ≥ 30 MPa at 28 days
- **Compliance:** Electrical systems pass safety certification
- **Performance:** HVAC system achieves target temperature within 15 minutes

---

### Inspection Checklists Tab

Standardised checklists for inspecting deliverables against quality criteria.

#### Adding Items

Type a checklist item in the input field and press **Enter** or click the add button.

#### Using the Checklist

Click any item to toggle its completion state:

- **Incomplete** — Full text, outlined checkbox, interactive card with border
- **Completed** — Strikethrough text, filled green checkbox, faded background

**Example Checklist (Software Sprint Review):**
- API returns correct HTTP status codes
- Error handling implemented for all edge cases
- Input validation present on all user-facing forms
- Unit tests passing with > 80% coverage
- Documentation updated for new endpoints

**Example Checklist (Construction Phase Gate):**
- Foundation depth meets specification
- Rebar spacing correct per structural drawings
- Concrete curing time meets minimum requirement
- Surface finish acceptable to client representative

---

### Defect Log Tab

Track non-conformances found during inspections through a Kanban-style workflow.

#### Logging a Defect

Fill in the form at the top:

| Field | Options | Purpose |
|-------|---------|---------|
| **Description** | Free text | What the defect is |
| **Severity** | Critical, Major, Minor, Cosmetic | Impact classification |

Click **Log Defect**. The defect appears in the Open column with today's date.

#### Defect Workflow

Defects display as cards in three columns:

```
Open → In Progress → Closed
```

Each column shows a header with the status name and a count badge. Use the arrow buttons on each card to move it between columns:

- **→** advances the defect (Open → In Progress → Closed)
- **←** moves it back (useful if a fix fails verification)

When a defect moves to Closed, the resolved date is automatically set to today.

#### Severity Badges

| Severity | Badge Colour | When to Use |
|----------|-------------|-------------|
| **Critical** | Red | Prevents operation, safety risk, or complete failure |
| **Major** | Orange | Significant impact on functionality or performance |
| **Minor** | Blue | Small issue, workaround exists |
| **Cosmetic** | Blue | Visual or minor UX issue, no functional impact |

---

### Sign-Off Tab

Formal acceptance of deliverables by authorised stakeholders.

#### Recording a Sign-Off

The left panel contains the sign-off form:

| Field | Options | Purpose |
|-------|---------|---------|
| **Signer Name** | Free text | Who is signing off |
| **Role** | Client, Sponsor, Project Manager, QA Lead | Authority level |
| **Condition Notes** | Free text (optional) | Conditions or caveats on acceptance |

Click **Sign Off** to record the acceptance. Each sign-off creates a permanent record with today's date.

#### Approval Log

The right panel displays the chronological approval log. Each entry shows:

- Green check icon
- Signer name and role
- Condition notes (if any, displayed in italic)
- Date (monospace format)

The log is append-only — sign-offs cannot be edited or deleted once recorded, creating a formal audit trail.

**Use Cases:**
- **Construction:** Sign-off on each phase before proceeding to the next
- **IT/Software:** UAT acceptance before production deployment
- **Consulting:** Client acceptance of deliverables at project milestones

---

## PM Methodology: Quality Management

### What Is Quality Management?

Quality management ensures that project deliverables meet defined standards and stakeholder expectations. It has three pillars:

1. **Quality Planning** — Define standards and acceptance criteria before work begins
2. **Quality Assurance** — Systematic activities to ensure processes are being followed
3. **Quality Control** — Inspect deliverables and identify non-conformances

### The Quality Register's Role

This application supports all three pillars:

| Pillar | Tab | Activity |
|--------|-----|----------|
| Quality Planning | Quality Criteria | Define measurable standards and acceptance thresholds |
| Quality Assurance | Inspection Checklists | Standardise inspection processes |
| Quality Control | Defect Log | Record and track non-conformances |
| Acceptance | Sign-Off | Formal stakeholder acceptance |

### Objective vs Subjective Criteria

Effective quality criteria are **measurable and objective**:

| Subjective (Avoid) | Objective (Use) |
|--------------------|-----------------|
| "Code looks good" | "Code coverage ≥ 80%" |
| "Fast enough" | "Response time < 2 seconds" |
| "Looks professional" | "Passes WCAG AA accessibility audit" |
| "Strong concrete" | "Compressive strength ≥ 30 MPa" |

### The Defect Lifecycle

```
Identify → Log → Assign → Fix → Retest → Close
```

1. **Identify** during inspection against quality criteria
2. **Log** in the Defect Log with severity classification
3. **Assign** by moving to In Progress (implies someone is working on it)
4. **Fix** — developer/contractor implements the correction
5. **Retest** — inspector verifies the fix against the original criterion
6. **Close** — defect resolved, moves to Closed column

---

## Integration with PMPlan

PMPlan pulls from the Quality Register to populate the **Quality Management** section:

- Quality criteria summary
- Defect counts by severity
- Acceptance rate (percentage of deliverables accepted first time)
- Quality trend data (defects decreasing over time)

**localStorage key:** `quality-project`

---

## Tips and Best Practices

**Define Criteria Early:** Before work starts. This prevents "moving goalposts" and ensures everyone agrees on what "done" means.

**Prioritise Defect Resolution:** Fix Critical defects immediately. Major defects should have resolution plans within a week. Minor and Cosmetic defects can be backlogged.

**Always Retest:** Don't assume a fix works. Always re-inspect against the original criterion before moving to Closed. Moving a defect back from In Progress to Open is expected when retesting fails.

**Close the Loop:** Track every defect to closure. Open defects on project status reports undermine stakeholder confidence.

**Separate Criteria by Category:** Use the category classification (Inspection, Functionality, Performance, Compliance, Usability) to organise criteria logically. This helps inspectors focus on relevant standards for their domain.

**Sign-Off at Milestones:** Don't wait until the end. Progressive sign-offs at key milestones (phase gates, sprint reviews, stage completions) reduce risk of late-stage rejection.

---

## Troubleshooting

**Q: How do I delete a checklist item?**
A: Click the item to mark it complete. Currently, completed items remain in the list as a record of inspection. Clear the entire project via Settings to start fresh.

**Q: Can I edit a defect after logging it?**
A: Defects are managed by status progression (Open → In Progress → Closed). The description and severity are set at creation. If you need to add context, log a new defect with updated details.

**Q: The Sign-Off tab shows "No formal sign-offs yet."**
A: Enter a signer name, select a role, and click Sign Off. The approval log populates once the first sign-off is recorded.

**Q: Can I remove a sign-off?**
A: No. The approval log is designed as an immutable audit trail. Once recorded, sign-offs cannot be edited or deleted. This is intentional for governance.

**Q: How do I export quality data?**
A: Quality data is stored in `quality-project` in localStorage. PMPlan reads this key directly to pull quality management information. For standalone export, use browser developer tools or the PMPlan export function.

---

*Quality Register: Quality criteria, inspection checklists, defect tracking, and formal acceptance sign-off.*
