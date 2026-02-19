# CoffeeCup Enterprise — Strategic Plan

**Status:** Planning
**Last Updated:** 2026-02-18
**Vision:** An AI-customisable, modular micro-application suite for SMEs — buy what you need, edit what you want.

---

## 1. Vision & Value Proposition

### The Problem
SMEs are underserved by enterprise software. ERPs (SAP, Oracle) are absurdly complex and expensive. Mid-market SaaS (Zoho, Odoo) is opaque and locked-down. Generic tools (Notion, Airtable) require building everything from scratch.

### The Solution
A library of single-file HTML micro-applications, each solving one specific business task. Individually useful, collectively powerful. Priced at £1.99 per app — an impulse buy.

### The USP
Every app is **fully transparent and AI-editable**. Users own the code. They can hand any app to an AI assistant and say "add a field for X" or "change the workflow to Y". No build tools, no vendor lock-in, no deployment pipeline. Each app ships with a README.md that guides both humans and AI on how to extend it.

---

## 2. Suite Architecture

Seven suites, each following the proven CoffeeCup pattern: independent apps with localStorage persistence, one hub per suite, and a top-level enterprise dashboard.

| # | Suite | Hub App | Status |
|---|-------|---------|--------|
| 1 | Project Management | PMPlan | **Exists** (CoffeeCup) |
| 2 | Finance | Finance Hub | Planned |
| 3 | Customer Lifecycle | CRM Hub | Planned |
| 4 | People & HR | People Hub | Planned |
| 5 | Suppliers & Procurement | Procurement Hub | Planned |
| 6 | Inventory & Logistics | Inventory Hub | Planned |
| 7 | Company & Governance | Strategy Hub | Planned |

### Integration Model

```
Enterprise Dashboard
├── Project Management Hub (PMPlan) ──── Gantt, Kanban, Risk, Cost, EVM, ...
├── Finance Hub ─────────────────────── Invoicing, Expenses, P&L, Payroll, ...
├── CRM Hub ─────────────────────────── Leads, Pipeline, Contracts, Support, ...
├── People Hub ──────────────────────── Recruitment, Reviews, Training, Leave, ...
├── Procurement Hub ─────────────────── Suppliers, Purchase Orders, Contracts, ...
├── Inventory Hub ───────────────────── Stock, Warehouse, Orders, Shipments, ...
└── Strategy Hub ────────────────────── Business Plan, OKRs, Compliance, Audit, ...
```

---

## 3. Suite Breakdown — Candidate Modules

### 3.1 Project Management (Exists)

Already built in CoffeeCup. Migrates into Enterprise as Suite 1.

| Module | Status | localStorage Key |
|--------|--------|-----------------|
| Gantt Chart | Complete | `gantt-project` |
| Kanban Board | Complete | `kanban-project` |
| Risk Register | Complete | `risk-register` |
| Cost Tracker | Complete | `cost-project` |
| EVM Dashboard | Complete | `evm-project` |
| Hierarchy Editor | Complete | `hierarchy-data` |
| RACI Matrix | Complete | `raci-project` |
| Stakeholder Map | Complete | `stakeholder-project` |
| Change & Issue Register | Complete | `changelog-project` |
| Quality Register | Complete | `quality-project` |
| Delphi Tool | Complete | `delphi-studies` |
| Integrated Analysis | Complete | `analysis-project` |
| Estimator | Complete | `estimator-project`, `estimator-rates` |
| PMPlan (Hub) | Complete | `pmplan-project` |

### 3.2 Finance

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Chart of Accounts | Account structure (assets, liabilities, equity, revenue, expenses) | `fin-accounts` |
| Invoicing | Create, send, track invoices. Link to customers and projects | `fin-invoices` |
| Expenses | Employee expense claims, receipt tracking, approval workflow | `fin-expenses` |
| Payroll | Salary calculations, tax deductions, payment records | `fin-payroll` |
| P&L Statement | Profit & loss reporting from invoice and expense data | `fin-pnl` |
| Balance Sheet | Assets vs liabilities snapshot | `fin-balance` |
| Cash Flow | Cash in/out tracking and forecasting | `fin-cashflow` |
| Tax Tracker | VAT, corporation tax obligations and deadlines | `fin-tax` |
| Credit & Debit | Accounts receivable and payable ledger | `fin-ledger` |
| Finance Hub | Central dashboard pulling from all finance modules | `fin-hub` |

### 3.3 Customer Lifecycle

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Lead Tracker | Capture and qualify inbound leads | `crm-leads` |
| Sales Pipeline | Visual deal stages with drag-and-drop | `crm-pipeline` |
| Proposals | Create and track proposals/quotes | `crm-proposals` |
| Contracts | Contract management with milestones and renewals | `crm-contracts` |
| Support Tickets | Customer issue tracking and resolution | `crm-support` |
| Satisfaction | NPS/CSAT surveys and feedback tracking | `crm-satisfaction` |
| Customer Directory | Master customer record linking all touchpoints | `crm-directory` |
| CRM Hub | Central dashboard for customer lifecycle | `crm-hub` |

### 3.4 People & HR

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Recruitment | Job postings, applicant tracking, interview scheduling | `hr-recruitment` |
| Onboarding | New starter checklists and task tracking | `hr-onboarding` |
| Training Log | Skills matrix, training records, certification tracking | `hr-training` |
| Performance Reviews | Review cycles, objectives, feedback | `hr-reviews` |
| Leave & Absence | Holiday requests, sickness tracking, calendar | `hr-leave` |
| Rewards & Discipline | Pay reviews, bonuses, disciplinary records | `hr-rewards` |
| Contractor Register | Consultants, freelancers, IR35 status tracking | `hr-contractors` |
| Exit Management | Offboarding checklists, exit interviews | `hr-exit` |
| People Hub | Central HR dashboard | `hr-hub` |

### 3.5 Suppliers & Procurement

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Supplier Register | Approved supplier list with ratings and contacts | `proc-suppliers` |
| Purchase Orders | Create, approve, track POs | `proc-orders` |
| Supplier Contracts | Terms, SLAs, renewal dates | `proc-contracts` |
| Supplier Performance | Scorecards, delivery tracking, quality metrics | `proc-performance` |
| Procurement Hub | Central procurement dashboard | `proc-hub` |

### 3.6 Inventory & Logistics

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Stock Register | Item catalogue with quantities and locations | `inv-stock` |
| Warehouse | Storage locations, bin management | `inv-warehouse` |
| Orders | Purchase and sales order fulfilment tracking | `inv-orders` |
| Shipments | Delivery tracking, carrier management | `inv-shipments` |
| Inventory Hub | Central inventory dashboard | `inv-hub` |

### 3.7 Company & Governance

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Business Plan | Mission, vision, strategic objectives | `gov-plan` |
| OKRs / KPIs | Objectives and key results tracking | `gov-okrs` |
| Compliance Register | Regulatory obligations, deadlines, evidence | `gov-compliance` |
| Audit Log | Internal audit findings and actions | `gov-audit` |
| Legal Tracker | Contracts, IP, disputes, regulatory filings | `gov-legal` |
| Security Register | Physical and digital security controls, incidents | `gov-security` |
| Quality Assurance | Company-wide QA policies (distinct from PM Quality) | `gov-quality` |
| Strategy Hub | Central governance dashboard | `gov-hub` |

---

## 4. Cross-Suite Integration

### 4.1 The Registry

A lightweight discovery mechanism so hub apps know what's installed:

```json
{
  "coffeecup-registry": {
    "gantt": { "key": "gantt-project", "suite": "pm", "version": "1.0", "provides": ["schedule", "milestones"] },
    "crm-leads": { "key": "crm-leads", "suite": "crm", "version": "1.0", "provides": ["leads", "contacts"] },
    "fin-invoices": { "key": "fin-invoices", "suite": "finance", "version": "1.0", "provides": ["invoices", "revenue"] }
  }
}
```

### 4.2 Key Cross-Suite Links

These represent the highest-value integration points between suites:

| From | To | Data Flow |
|------|----|-----------|
| CRM → Projects | Customer wins trigger project creation | Customer context flows into PM |
| Projects → Finance | Project costs feed financial reporting | Actuals from Cost Tracker → P&L |
| Finance → Projects | Budget allocations inform project budgets | Chart of Accounts → Cost Tracker |
| HR → Projects | Resource availability feeds scheduling | People data → RACI, Gantt |
| CRM → Finance | Won deals generate invoices | Pipeline → Invoicing |
| Procurement → Finance | POs create financial commitments | Purchase Orders → Ledger |
| Procurement → Inventory | Received goods update stock | PO receipts → Stock Register |
| Governance → All | Compliance requirements cascade to suites | Obligations → relevant apps |

### 4.3 Shared Entities

Some data is referenced across many suites. These need careful schema design:

- **People** (employees, contacts, stakeholders) — referenced by HR, CRM, PM, Governance
- **Organisations** (customers, suppliers, partners) — referenced by CRM, Procurement, Finance
- **Money** (amounts, currencies, tax) — referenced by Finance, PM, Procurement, CRM
- **Documents** (contracts, proposals, reports) — referenced by most suites

---

## 5. README.md Template (AI Extension Guide)

Every app ships with a README.md structured for both human and AI consumption:

```markdown
# CoffeeCup — [App Name]

## What This App Does
[Human-readable description of purpose and key features]

## Data Schema
- **localStorage Key:** `xxx-yyy`
- **Structure:**
  ```json
  { ... exact JSON schema ... }
  ```

## Integration Points
- **Reads from:** [list of other app keys and what data it pulls]
- **Read by:** [list of apps that consume this app's data]

## Extension Guide (for AI)

### Add a New Field
1. Find the `createDefault...()` function
2. Add your field with a default value
3. Add an input in the form/modal JSX
4. Add the field to any table/card display
5. Test: save, reload, verify persistence

### Add a New View or Tab
1. Add a tab button to the navigation array
2. Create a new render function for the view
3. Wire it into the tab switching logic

### Change the Workflow / Status Options
1. Find the STATUS_OPTIONS or WORKFLOW constant
2. Modify the stages
3. Update any colour mappings
4. Check filter logic still works

### Connect to an External API
1. Replace localStorage reads with fetch() calls
2. Add loading/error states
3. Consider CORS — you may need a proxy

## Design System
This app follows the CoffeeCup Design System. See [design-system.md] for:
- Theme variables and 4-theme support
- Component patterns (cards, buttons, inputs)
- Typography and icon conventions
```

---

## 6. Technical Decisions (To Discuss)

### 6.1 localStorage Limits
- **Issue:** localStorage has a ~5-10MB limit per origin. With 50+ apps, this could become a constraint for data-heavy modules (invoices, stock records).
- **Options:**
  - (a) Stay with localStorage — adequate for most SME volumes
  - (b) Move to IndexedDB for data-heavy apps — more complex but much higher limits
  - (c) Offer optional file export/import as overflow mechanism
  - (d) Hybrid: localStorage for small apps, IndexedDB adapter for heavy ones

### 6.2 Multi-User / Sharing — DECIDED
- **Issue:** Current model is single-user, single-browser. Real businesses have multiple people.
- **Decision:** Hybrid approach — File System Access API for Chromium browsers + manual export/import fallback for others.
- **Implementation:**
  - Enterprise Dashboard manages sync settings (folder selection, sync controls)
  - Each app writes its localStorage data as a JSON file to a user-selected shared folder (e.g., OneDrive, Google Drive, Dropbox sync folder)
  - Cloud sync service handles the sharing — no CoffeeCup server needed
  - Manual export/import buttons remain as fallback for Firefox/Safari
  - Each user configures once; folder choice persisted in localStorage, folder handle re-confirmed per session (browser security requirement)
- **Rejected options:**
  - (c) Optional backend — breaks the single-file, no-server model
  - (d) GitHub Gist sync — too technical for target SME users

### 6.3 Migration from CoffeeCup
- **Issue:** Existing PM apps in CoffeeCup need to coexist with CoffeeCup Enterprise.
- **Options:**
  - (a) Copy PM apps into Enterprise with no changes (same localStorage keys)
  - (b) Namespace keys (e.g., `ce-gantt-project`) and provide migration
  - (c) Keep PM in CoffeeCup, Enterprise references them in place

### 6.4 Catalogue / App Store Experience
- **Issue:** How do users discover, purchase, and install individual apps?
- **Options:**
  - (a) Static website with download links (simplest)
  - (b) A CoffeeCup "Store" app that manages installation
  - (c) GitHub-based distribution with a landing page
  - (d) Gumroad / LemonSqueezy for payment, direct download for delivery

---

## 7. Build Order (Proposed)

**Phase 1 — Foundation**
- [ ] Define the CoffeeCup Registry specification
- [ ] Create the README.md template and apply to all existing PM apps
- [ ] Build the Enterprise Dashboard (top-level hub of hubs)

**Phase 2 — Finance Suite** (highest cross-suite value)
- [ ] Invoicing (most universally needed)
- [ ] Expenses
- [ ] P&L Statement
- [ ] Finance Hub
- [ ] Remaining finance modules

**Phase 3 — Customer Lifecycle**
- [ ] Customer Directory
- [ ] Lead Tracker
- [ ] Sales Pipeline
- [ ] CRM Hub
- [ ] Remaining CRM modules

**Phase 4 — People & HR**
- [ ] People Hub + core modules

**Phase 5 — Suppliers & Procurement**
- [ ] Procurement Hub + core modules

**Phase 6 — Inventory & Logistics**
- [ ] Inventory Hub + core modules

**Phase 7 — Company & Governance**
- [ ] Strategy Hub + core modules

---

## 8. Open Questions

1. **Pricing model:** £1.99 per app, or also offer suite bundles (e.g., £9.99 for all Finance)?
2. **Branding:** Does "CoffeeCup Enterprise" work, or does "Enterprise" imply too much complexity?
3. **Existing PM apps:** Copy into Enterprise or reference in place?
4. **Data limits:** localStorage-first or IndexedDB-first for new apps?
5. **Target customer:** Solo operator? Micro-business (1-10)? Small business (10-50)?
6. **Distribution channel:** Direct download? GitHub? App marketplace?
7. **Support model:** Community-only? Paid customisation? AI-first (let users ask AI)?

---

## 9. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-18 | Hub-based suite architecture adopted | Proven pattern from PM suite, scales well |
| 2026-02-18 | Seven suites identified | Covers core SME operational needs |
| 2026-02-19 | Hybrid file sync for multi-user sharing | File System Access API + manual export/import fallback. No server, no vendor lock-in. Cloud sync via user's existing OneDrive/Google Drive/Dropbox. |
| | | |

---

*This is a living document. Update it as decisions are made and plans evolve.*
