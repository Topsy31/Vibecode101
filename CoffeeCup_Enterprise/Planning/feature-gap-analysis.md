# CoffeeCup Enterprise — Feature Gap Analysis

## Purpose

This document compares CoffeeCup Enterprise's planned capabilities against established open-source ERP suites to validate the roadmap, identify blind spots, and prioritise development. Research sourced from [opensource.com/tools/enterprise-resource-planning](https://opensource.com/tools/enterprise-resource-planning).

**Last Updated:** February 2026

---

## ERP Systems Analysed

| System | Technology | Licence | Target Market | Strengths |
|--------|-----------|---------|---------------|-----------|
| **Odoo** | Web-based | LGPLv3 | SMEs | Modular, Google Drive-like UX, 30+ modules |
| **ERPNext** | Form-driven | Open source | SMEs | Clean UI, strong PM + accounting integration |
| **Dolibarr** | Web-based | GPLv3 | SMEs | Simple interface, add-on marketplace |
| **Apache OFBiz** | Java | Apache 2.0 | Enterprise | Mature, highly customisable, decade-long track record |
| **Tryton** | Python | GPLv3 | All sizes | Modular, Docker-ready, desktop + web clients |
| **Axelor** | Web-based | AGPLv3 | SMEs | 20+ components, intuitive interface |
| **ADempiere** | Java | GPLv2 | SMEs | SCM, CRM, HR, payroll — very comprehensive |
| **xTuple PostBooks** | JavaScript | CPAL | Manufacturing/distribution | Strong inventory, welcomes developer forks |
| **Metasfresh** | Java | GPLv2/3 | SMEs | Weekly updates, modern fork of ADempiere |

**Key Observation:** All major open-source ERPs target SMEs — the same market CoffeeCup Enterprise is targeting. The differentiation must come from the **AI-editable, single-file, no-server** model.

---

## Feature Coverage Comparison

### Legend

- ✅ Full coverage in CoffeeCup Enterprise plan
- ⚠️ Partial coverage or simplified version planned
- ❌ Not planned — gap identified
- 🔵 CoffeeCup exceeds ERP capabilities
- N/A Not relevant to CoffeeCup's model

### Suite 1: Project Management

| Feature | CoffeeCup | Odoo | ERPNext | Dolibarr | Analysis |
|---------|-----------|------|---------|----------|----------|
| Gantt Chart | 🔵 | ✅ | ✅ | ❌ | CoffeeCup's is superior (dependencies, CPM, print modes) |
| Kanban Board | ✅ | ✅ | ✅ | ❌ | Parity with ERPs |
| Risk Management | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — no ERP has Monte Carlo simulation |
| EVM Dashboard | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — EVM is specialist PM |
| Cost Tracking | ✅ | ✅ | ✅ | ⚠️ | Parity; CoffeeCup adds EVM integration |
| Quality Management | ✅ | ⚠️ | ⚠️ | ❌ | CoffeeCup more PM-focused than ERP quality modules |
| Stakeholder Management | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — power/interest grid |
| RACI Matrix | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — no ERP offers this |
| Delphi Method | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — expert consensus tool |
| Quantitative Analysis | 🔵 | ❌ | ❌ | ❌ | **Unique advantage** — joint confidence levels |
| **Timesheet / Time Tracking** | ❌ | ✅ | ✅ | ❌ | **GAP** — See analysis below |
| **Resource Calendar** | ❌ | ✅ | ✅ | ❌ | **GAP** — See analysis below |

**Verdict:** CoffeeCup's PM suite significantly exceeds ERP project management. Two gaps identified.

---

### Suite 2: Finance

| Feature | CoffeeCup Plan | Odoo | ERPNext | Dolibarr | Tryton | Analysis |
|---------|---------------|------|---------|----------|--------|----------|
| Chart of Accounts | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Essential foundation — all ERPs have this |
| Invoicing | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Must-have — universally offered |
| Expenses | ✅ Planned | ✅ | ✅ | ⚠️ | ⚠️ | Good coverage in plan |
| Payroll | ✅ Planned | ✅ | ✅ | ❌ | ❌ | Only Odoo/ERPNext/ADempiere offer payroll |
| P&L Statement | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Standard financial report |
| Balance Sheet | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Standard financial report |
| Cash Flow | ✅ Planned | ✅ | ✅ | ⚠️ | ⚠️ | Good — not all ERPs do this well |
| Tax Tracker | ✅ Planned | ✅ | ✅ | ⚠️ | ⚠️ | Important for UK SMEs (VAT, Corp Tax) |
| Credit & Debit Ledger | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Standard AR/AP |
| **Bank Reconciliation** | ❌ | ✅ | ✅ | ✅ | ✅ | **GAP** — See below |
| **Multi-Currency** | ❌ | ✅ | ✅ | ✅ | ✅ | **GAP** — See below |
| **Budget vs Actual Reporting** | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | Partially covered by Cost Tracker; needs finance-level view |

**Verdict:** Finance suite plan is solid. Two gaps identified that most ERPs include.

---

### Suite 3: Customer Lifecycle

| Feature | CoffeeCup Plan | Odoo | ERPNext | Dolibarr | Analysis |
|---------|---------------|------|---------|----------|----------|
| Lead Tracker | ✅ Planned | ✅ | ✅ | ✅ | Parity |
| Sales Pipeline | ✅ Planned | ✅ | ✅ | ✅ | Parity |
| Proposals/Quotes | ✅ Planned | ✅ | ✅ | ✅ | Parity |
| Contracts | ✅ Planned | ✅ | ✅ | ✅ | Parity |
| Support Tickets | ✅ Planned | ✅ | ✅ | ⚠️ | Good coverage |
| Satisfaction / NPS | ✅ Planned | ⚠️ | ⚠️ | ❌ | **Advantage** — most ERPs lack this |
| Customer Directory | ✅ Planned | ✅ | ✅ | ✅ | Essential hub |
| **Email Integration** | ❌ | ✅ | ✅ | ⚠️ | **GAP** — See below |
| **Marketing Campaigns** | ❌ | ✅ | ⚠️ | ❌ | **GAP** — Odoo has strong marketing module |

**Verdict:** Good CRM coverage planned. Email integration and campaign management are gaps but may be out of scope for single-file apps.

---

### Suite 4: People & HR

| Feature | CoffeeCup Plan | Odoo | ERPNext | OFBiz | Analysis |
|---------|---------------|------|---------|-------|----------|
| Recruitment | ✅ Planned | ✅ | ✅ | ⚠️ | Parity |
| Onboarding | ✅ Planned | ✅ | ✅ | ❌ | Good — not all ERPs cover this |
| Training Log | ✅ Planned | ✅ | ✅ | ⚠️ | Parity |
| Performance Reviews | ✅ Planned | ✅ | ✅ | ❌ | Good |
| Leave & Absence | ✅ Planned | ✅ | ✅ | ✅ | Essential |
| Contractor Register | ✅ Planned | ⚠️ | ⚠️ | ❌ | **Advantage** — UK IR35 relevance |
| Exit Management | ✅ Planned | ⚠️ | ⚠️ | ❌ | **Advantage** — rarely covered |
| **Organisation Chart** | ✅ (Hierarchy Editor) | ✅ | ✅ | ⚠️ | Already built in PM suite — reusable |
| **Employee Directory** | ❌ | ✅ | ✅ | ✅ | **GAP** — See below |

**Verdict:** Strong HR plan, particularly for UK market (IR35, exit management). Employee directory is a gap.

---

### Suite 5: Suppliers & Procurement

| Feature | CoffeeCup Plan | Odoo | ERPNext | Dolibarr | OFBiz | Analysis |
|---------|---------------|------|---------|----------|-------|----------|
| Supplier Register | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Parity |
| Purchase Orders | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Essential |
| Supplier Contracts | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Parity |
| Supplier Performance | ✅ Planned | ⚠️ | ⚠️ | ❌ | ❌ | **Advantage** — most ERPs lack formal scorecards |
| **Goods Receipt** | ❌ | ✅ | ✅ | ✅ | ✅ | **GAP** — Needed if Inventory suite exists |
| **RFQ/Tender Management** | ❌ | ✅ | ✅ | ⚠️ | ✅ | **GAP** — Important for formal procurement |

**Verdict:** Good plan. Add RFQ/Tender management for completeness if targeting larger SMEs.

---

### Suite 6: Inventory & Logistics

| Feature | CoffeeCup Plan | Odoo | ERPNext | Dolibarr | xTuple | Analysis |
|---------|---------------|------|---------|----------|--------|----------|
| Stock Register | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Parity |
| Warehouse/Locations | ✅ Planned | ✅ | ✅ | ⚠️ | ✅ | Good |
| Orders (fulfilment) | ✅ Planned | ✅ | ✅ | ✅ | ✅ | Parity |
| Shipments | ✅ Planned | ✅ | ✅ | ⚠️ | ✅ | Good |
| **Barcode/SKU Support** | ❌ | ✅ | ✅ | ⚠️ | ✅ | **GAP** — Important for physical inventory |
| **Reorder Levels** | ❌ | ✅ | ✅ | ✅ | ✅ | **GAP** — Automated low-stock alerts |
| **Bill of Materials** | ❌ | ✅ | ✅ | ❌ | ✅ | **GAP** — Manufacturing-oriented, may be out of scope |

**Verdict:** Basic inventory covered. Barcode support and reorder levels are common ERP features worth considering.

---

### Suite 7: Company & Governance

| Feature | CoffeeCup Plan | ERP Coverage | Analysis |
|---------|---------------|-------------|----------|
| Business Plan | ✅ Planned | Rare | **Advantage** — ERPs don't typically cover strategy |
| OKRs / KPIs | ✅ Planned | ⚠️ (Odoo only) | **Advantage** — specialist tool |
| Compliance Register | ✅ Planned | ⚠️ (OFBiz) | Good for regulated industries |
| Audit Log | ✅ Planned | ✅ | Standard governance feature |
| Legal Tracker | ✅ Planned | ❌ | **Advantage** — not covered by ERPs |
| Security Register | ✅ Planned | ❌ | **Advantage** — niche but valuable |
| Quality Assurance (company) | ✅ Planned | ⚠️ | Distinct from PM quality — good |
| **Document Management** | ❌ | ✅ (Dolibarr, OFBiz) | **GAP** — See below |
| **Meeting Minutes / Actions** | ❌ | ❌ | Opportunity — no ERP does this well |

**Verdict:** Strong governance suite with unique features (OKRs, legal, security). Document management is a cross-suite gap.

---

## Consolidated Gap List

### Priority 1: High Value, High Frequency (Recommended Additions)

| # | Gap | Suite | Why It Matters | ERP Prevalence |
|---|-----|-------|----------------|----------------|
| 1 | **Timesheet / Time Tracking** | PM | Labour actuals for EVM; consulting billing basis; resource utilisation | 7/9 ERPs |
| 2 | **Resource Calendar** | PM | Team availability; capacity planning; leave integration | 5/9 ERPs |
| 3 | **Bank Reconciliation** | Finance | Match bank transactions to invoices/expenses; UK SMEs need this | 7/9 ERPs |
| 4 | **Multi-Currency Support** | Finance | International clients/suppliers; FX gain/loss tracking | 8/9 ERPs |
| 5 | **Employee Directory** | HR | Central people register; links to leave, reviews, payroll | 6/9 ERPs |
| 6 | **Document Register** | Governance | Metadata tracking for contracts, reports, deliverables; cross-suite | 4/9 ERPs |

### Priority 2: Medium Value (Consider for Completeness)

| # | Gap | Suite | Why It Matters | ERP Prevalence |
|---|-----|-------|----------------|----------------|
| 7 | **RFQ / Tender Management** | Procurement | Formal bidding process for construction/public sector | 4/9 ERPs |
| 8 | **Reorder Levels / Low Stock Alerts** | Inventory | Automated inventory triggers | 6/9 ERPs |
| 9 | **Budget vs Actual (Finance-Level)** | Finance | Departmental budgets beyond project-level Cost Tracker | 5/9 ERPs |
| 10 | **Meeting Minutes / Actions** | Governance | Governance trail; no ERP does this — opportunity | 0/9 ERPs |

### Priority 3: Low Alignment (Don't Build)

| # | Gap | Reason to Skip |
|---|-----|----------------|
| 11 | Email Integration | Requires server-side infrastructure; breaks single-file model |
| 12 | Marketing Campaigns | Specialist domain; better served by Mailchimp, Resend |
| 13 | Barcode/SKU Support | Requires hardware (scanner); niche for localStorage-based apps |
| 14 | Bill of Materials | Manufacturing-specific; too niche for SME-focused suite |
| 15 | Multi-User / Real-Time Sync | Already identified as technical decision in plan.md §6.2 |

---

## Recommendations

### 1. Add to PM Suite (Immediate)

**Timesheet** and **Resource Calendar** should be added to the existing PM suite (Suite 1). They:
- Fill the two remaining PMBOK gaps
- Feed directly into EVM actuals (Timesheet → Cost Tracker → EVM Dashboard)
- Complete the PMPlan Resource Calendar section
- Are relatively simple to build (follow existing patterns)

**Proposed Keys:**
- `timesheet-project`
- `resource-calendar`

**Note:** The Vibe Coding workspace already has a TimeCapture PWA — its approach (mobile-first, timer + manual entry) could inform the CoffeeCup Timesheet module.

### 2. Add to Finance Suite Plan

**Bank Reconciliation** and **Multi-Currency** should be added to the Finance suite plan (Suite 2). They:
- Are expected by any SME financial tool
- Present in 7-8 out of 9 ERP systems
- Are deal-breakers for businesses with bank accounts (i.e., all of them)

**Proposed Modules:**

| Module | Description | localStorage Key |
|--------|-------------|-----------------|
| Bank Reconciliation | Match bank transactions to invoices/expenses | `fin-reconciliation` |
| Multi-Currency | Exchange rates, FX gain/loss, multi-currency invoices | (setting within fin-invoices) |

### 3. Add Employee Directory to HR Suite

Add **Employee Directory** as the foundational module for Suite 4 (People & HR). It:
- Acts as the "people register" referenced by HR, PM, and Finance suites
- Connects to Hierarchy Editor (org structure) and RACI Matrix (role assignments)
- Is the natural hub entity for cross-suite people references

**Proposed Key:** `hr-directory`

### 4. Add Document Register to Governance Suite

Add **Document Register** to Suite 7 (Company & Governance). It:
- Provides metadata tracking (no file storage — stays within browser constraints)
- Connects to PMPlan Configuration Management section
- Enables document transmittal tracking for construction projects

**Proposed Key:** `gov-documents`

### 5. Add Meeting Minutes / Actions (Unique Opportunity)

No ERP system offers a dedicated **Meeting Minutes / Actions** tracker. This is an opportunity to differentiate:
- Structured meeting records (date, attendees, agenda, decisions, actions)
- Action tracking (owner, due date, status)
- Links to project activities (Gantt) or change requests (Change Register)
- Feeds into PMPlan Communications Plan

**Proposed Key:** `gov-meetings`

---

## Updated Suite Module Count

| Suite | Original Modules | Added Modules | New Total |
|-------|-----------------|---------------|-----------|
| 1. Project Management | 13 | +2 (Timesheet, Resource Calendar) | **15** |
| 2. Finance | 10 | +1 (Bank Reconciliation) | **11** |
| 3. Customer Lifecycle | 8 | — | **8** |
| 4. People & HR | 9 | +1 (Employee Directory) | **10** |
| 5. Procurement | 5 | +1 (RFQ/Tender) | **6** |
| 6. Inventory | 5 | — | **5** |
| 7. Governance | 8 | +2 (Document Register, Meeting Minutes) | **10** |
| **Total** | **58** | **+7** | **65** |

---

## CoffeeCup vs ERP: Positioning Summary

### Where CoffeeCup Enterprise Wins

1. **Transparency** — Every app is a single HTML file. Users see and own the code. ERPs are opaque.
2. **AI-Editable** — Hand any app to Claude/ChatGPT with the README and say "add X". ERPs require developers.
3. **No Server** — Runs in a browser tab. ERPs need servers, databases, IT teams.
4. **Price** — £1.99 per app vs Odoo's £20/module/month or SAP's six-figure contracts.
5. **Privacy** — Data stays in localStorage. ERPs store data on servers (privacy concerns).
6. **Specialist PM** — Monte Carlo, EVM, Delphi, RACI, Quantitative Analysis. No ERP matches this depth.

### Where ERPs Win

1. **Multi-User** — ERPs handle teams natively. CoffeeCup is single-user (for now).
2. **Database Scale** — ERPs handle millions of records. localStorage handles thousands.
3. **Email/Notification** — ERPs send invoices, alerts, reminders. CoffeeCup can't (no server).
4. **Bank Integration** — ERPs connect to banking APIs. CoffeeCup can't (no server).
5. **Ecosystem** — Odoo has 30,000+ community modules. CoffeeCup is starting from scratch.

### The Honest Answer

CoffeeCup Enterprise is **not an ERP replacement** for businesses with 50+ employees or complex multi-user workflows. It's an **ERP alternative** for:

- **Solo operators** who need business tools without IT overhead
- **Micro-businesses (1-10)** where one person manages everything
- **Project-heavy organisations** needing deep PM + lightweight business tools
- **Privacy-conscious users** who won't put data on third-party servers
- **AI-forward users** who want to customise their tools with AI assistance

---

## Research Sources

- [Open Source ERP Tools — opensource.com](https://opensource.com/tools/enterprise-resource-planning)
- PMBOK Guide 7th Edition
- CoffeeCup Enterprise Strategic Plan (plan.md)
- CoffeeCup CLAUDE.md (current application inventory)

---

*Feature Gap Analysis: Evidence-based comparison of CoffeeCup Enterprise against 9 open-source ERP systems. Updated February 2026.*
