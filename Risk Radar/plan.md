# Risk Radar — Product Plan

---

## Part 1: MVP Prototype — ICE Blueprint

### Intent

Build an HTML/CSS/JS prototype to test whether a single radar view can simultaneously communicate strategic bearing, cone of possibilities, and decision branch routing to a senior decision maker — without instruction. The prototype is a UI experiment, not a production tool.

**Core experiment:** Can one view carry both the radar metaphor and the cone of possibilities, or do they require separate panels?

**Primary audience:** Senior decision makers in a closed stakeholder group. The metaphor must land intuitively.

### Constraints

- Pure HTML/CSS/JS — no frameworks required, though Alpine.js or vanilla JS is acceptable
- Shareable as a folder or GitHub Pages — no server required
- No timeline — quality over speed
- Prototype only — not wired to real data, all scenarios are pre-populated fiction

### Expectations

The prototype must demonstrate:

1. **Radar + cone combined view** — the cone widens as range rings move outward (further in time), overlaid on the radar. This is the primary experiment.
2. **Track history** — a visible trail on the radar from south toward centre, representing 12 months of prior assessments. Shows an improving trajectory in Scenario A, a deteriorating trajectory in Scenario B.
3. **Decision branches** — click to reveal route options on the radar. Each branch shows a new predicted bearing line. Selecting a branch updates the objectives panel dynamically.
4. **Objectives panel** — level 1 objectives displayed by default, hierarchically nested (expandable). Colour-coded by health: weighted visually by colour rather than numeric score. Updates dynamically as decision branches are selected.
5. **Two switchable scenarios:** A (improving, narrow cone) and B (deteriorating, wide cone).
6. **Hover tooltips** on each blip: likelihood / impact / capability grid, bearing effect explanation, rationale, primary objective, time horizon.
7. **Bearing rationale panel** below branch controls explaining why current bearing is where it is, updating dynamically on branch and scenario switch.

**Success signal:** A stakeholder describes back what the cone represents and asks a question about their own organisation — without being prompted.

### Decisions Made

| Decision | Rationale |
|---|---|
| Combined cone-on-radar (to be tested) | Core experiment — split panel is the fallback if it fails |
| Colour weighting for objectives, not scores | Consistent with High/Medium/Low qualitative principle |
| Level 1 objectives only by default | Screen real estate; decision makers need summary first |
| Two pre-populated scenarios | Tests both early warning and progress tracking |
| Track history always visible | Permanently visible context, not hidden behind interaction |
| Branch reveal on click, objectives update dynamically | The reveal moment must feel like a demonstration |
| Animation (sweep, bearing draw) | Nice-to-have for later iteration — not in scope for MVP |
| Hover tooltips on blips | Explains placement rationale without cluttering radar surface |
| Bearing rationale as persistent text panel | Grounds the bearing arrow in narrative evidence |

### Critical Review Notes

- Radar metaphor may not be universally intuitive — animation deferred to later iteration
- Two scenarios prevent stakeholders reading the tool as a "good news instrument"
- Objective weighting via colour avoids false numerical precision
- Congestion (hundreds of real risks) not addressed in MVP — deferred to v2 category filtering

---

## Part 2: Conceptual Developments Since MVP Build

These topics emerged from conversation and must inform the v2 architecture. None are implemented in the current prototype.

---

### 2.0 RiskLeap Risk Ontology — Full Content and Alignment

Source: riskleap.com/riskontology — Loopnut Consultoria Ltda, updated 8 March 2026. Full ontology JSON stored at [assets/risk_ontology.json](assets/risk_ontology.json).

---

#### 2.0.0 Complete Term Inventory

The ontology distinguishes two node types: **concepts** (the core primitives, yellow nodes) and **terms** (specialisations, subtypes, and contextual entities).

**Core Concepts — the non-negotiable vocabulary:**

| Name | Definition | Synonyms |
|---|---|---|
| UNCERTAINTY | Lack of knowledge or certainty about the future state of the variables that produce an outcome. Not all uncertainties cause risk — some may create opportunities instead. | Risk driver, Risk Factor, Risk source, Cause |
| ASSUMPTION | A proposition accepted as true or as certain to occur, without proof. It serves as a logical underpinning of the organisation's objectives, though not necessarily in a direct or obvious manner. It may also function as an expression of risk appetite. | — |
| RISK | An effect of one or more uncertainties on an objective. It is a set of possible consequences arising from deviations from, or violations of, assumptions. | — |
| OBSERVATION | The result of proactive attention to relevant evidence and its subsequent recording. It serves as a reality check and confirmation of consistency within a system. | — |
| INDICATOR | A consolidation of observations, ideally complemented by contextual interpretation. It provides information useful for comparing the current state of a relevant variable with its desired or forecasted state. It may function just for monitoring, or as a warning or an insight. | — |
| ACTION | The practical implementation of a decision. It is dependent on resources, technical viability, and cultural acceptance. | Mitigation, Corrective action, Action Plan, Contingency, Risk treatment |
| DECISION | A resolution on whether to take an action, based on prior inputs. | — |
| POLICY | Specification of how a decision should be made, including constraints and criteria. | — |
| OBJECTIVE | Long-term goal tied to the organisation's mission and vision, driving overall direction. | — |

**Terms — Subtypes of UNCERTAINTY:**

| Name | Definition | Synonyms |
|---|---|---|
| Threat | A type of uncertainty with negative potential effect on an objective. | — |
| Vulnerability | A type of uncertainty representing internal exposure or fragility. | Fragility |
| Complexity | A type of uncertainty arising from the number and interdependence of system elements. | — |
| Volatility | A type of uncertainty arising from the rate and unpredictability of change. | — |
| Variation | A type of uncertainty arising from natural deviation within a process or system. | — |

**Terms — Subtypes of RISK:**

| Name | Definition | Synonyms |
|---|---|---|
| SingleEventRisk | A risk characterised by a single discrete triggering event. | — |
| RecurringRisk | A risk characterized by a chronic condition that repeatedly triggers discrete loss events over time. The events are distinguishable and countable, but their recurrence is systematic, indicating an unresolved underlying cause. | — |
| PersistentRisk | A risk characterized by a structural condition that continuously generates adverse outcomes without discrete triggering events. The harm is not episodic but inherent to the condition itself, enduring as long as the condition remains unaddressed. | Systemic |
| CompoundRisk | Not a risk per se, but a statistical aggregation of individual singular risks. CompoundRisk is caused by a high-level Uncertainty. An alternative representation is to indicate the risks that aggregate to it. | — |

**Terms — Subtypes of OBJECTIVE:**

| Name | Definition |
|---|---|
| Target | A type of objective — a measurable, specific target within a broader objective. |
| KeyResult | A type of objective — OKR-aligned: a measurable outcome that signals an objective has been achieved. |

**Terms — Subtypes of ASSUMPTION:**

| Name | Definition |
|---|---|
| Budget | A financial assumption — the financial envelope accepted as a constraint on the plan. |
| Requirement | An aspect of a law, regulation or internal norm that must be followed. It may be qualitative or quantitative. |
| Forecast | A forward-looking assumption about future state accepted as a planning input. |
| Threshold | A boundary condition — a point in a continuum where the system transitions from one state to another. It is positional and discrete in its effect: you are either below it or above it, and crossing it triggers a qualitative change. It describes the structure of the decision space, not the disposition of the agent. Thresholds are often externally defined — by regulators, physics, or design. |
| Tolerance | An acceptance envelope — the range of deviation from a desired state that a system or agent is willing to absorb without initiating a response. It encodes a relational stance: how much imperfection or uncertainty the agent will bear before acting. Tolerance is inherently normative and often internally defined — it reflects values, risk appetite, or resource constraints. |
| Plan | A type of assumption — an approved plan is accepted as a basis for action until evidence contradicts it. |

**Terms — Subtypes of OBSERVATION:**

| Name | Definition |
|---|---|
| Signal | A type of observation indicating an early or weak indicator of change. |
| Issue | A type of observation — a condition already materialised that requires management attention. |
| Incident | A type of observation — an event that has occurred and been recorded. |
| Finding | A type of observation — typically from an audit, review, or assessment. |
| Claim | A type of observation — an assertion made by a party, requiring verification. |
| ControlBehavior | A type of observation — direct observation of how a control is actually functioning. |

**Terms — Subtypes of INDICATOR:**

| Name | Definition |
|---|---|
| RiskIndicator | A type of indicator specifically tracking risk-related variables (KRI — Key Risk Indicator). |
| PerfIndicator | A type of indicator tracking performance variables (KPI — Key Performance Indicator). |
| ControlIndicator | A type of indicator tracking control effectiveness. |

**Terms — Controls (adjacent subclasses, noted as outside the core model):**

| Name | Definition |
|---|---|
| Control | An intervention or measure applied to modify risk. |
| FrequencyControl | An intervention that aims to reduce (or increase) the frequency of events. Adjacent subclass of Control. |
| ImpactControl | An intervention that aims to reduce (or increase) the consequence of events. Adjacent subclass of Control. |

**Terms — Value Chain Entities (teal nodes — contextual anchors for risk):**

| Name | Notes |
|---|---|
| Asset | Something of value that can be affected by risk. |
| Product | A delivered output that carries risk exposure. |
| Customer | An external party whose interests and expectations are a source of risk and opportunity. |
| Supplier | An external party in the supply chain whose performance creates risk. |
| Contract | A formal agreement that creates obligations and risk exposure on both sides. |

---

#### 2.0.1 Complete Relation Inventory

The ontology defines relations of four types: **Generalization** (is-a subtype), **Attributive** (has, carries an attribute), **Other** (named functional relations).

**Generalization relations — "X is a subtype of Y":**

| Source | Target |
|---|---|
| Threat | UNCERTAINTY |
| Vulnerability | UNCERTAINTY |
| Complexity | UNCERTAINTY |
| Volatility | UNCERTAINTY |
| Variation | UNCERTAINTY |
| SingleEventRisk | RISK |
| RecurringRisk | RISK |
| PersistentRisk | RISK |
| CompoundRisk | RISK |
| Target | OBJECTIVE |
| KeyResult | OBJECTIVE |
| Budget | ASSUMPTION |
| Requirement | ASSUMPTION |
| Forecast | ASSUMPTION |
| Threshold | ASSUMPTION |
| Tolerance | ASSUMPTION |
| Plan | ASSUMPTION |
| Signal | OBSERVATION |
| Issue | OBSERVATION |
| Incident | OBSERVATION |
| Finding | OBSERVATION |
| Claim | OBSERVATION |
| ControlBehavior | OBSERVATION |
| RiskIndicator | INDICATOR |
| PerfIndicator | INDICATOR |
| ControlIndicator | INDICATOR |
| FrequencyControl | Control (dashed — adjacent model) |
| ImpactControl | Control (dashed — adjacent model) |

**Attributive relations — structural ownership:**

| Source | Relation | Target | Meaning |
|---|---|---|---|
| OBJECTIVE | has | ASSUMPTION | Objectives carry assumptions — the plan rests on propositions accepted as true |
| ASSUMPTION | has | UNCERTAINTY | Assumptions carry uncertainty — when an assumption is wrong, uncertainty is introduced |

**Functional relations — causal and operational links:**

| Source | Relation | Target | Meaning |
|---|---|---|---|
| UNCERTAINTY | causes | RISK | Uncertainty is the root cause of risk |
| RISK | informs | DECISION | Risk information drives decision-making |
| DECISION | triggers | ACTION | A decision to act produces an action |
| ACTION | triggers | OBSERVATION | An action in execution is observed and recorded |
| OBSERVATION | informs | INDICATOR | Observations aggregate into indicators |
| INDICATOR | influences | OBJECTIVE | Indicators signal whether objectives are being achieved |
| OBJECTIVE | influences | POLICY | Objectives shape the policies governing decisions |
| POLICY | frames | DECISION | Policy sets the constraints within which a decision is made |
| FrequencyControl | modifies | UNCERTAINTY | A frequency control changes the likelihood dimension of the uncertainty |
| ImpactControl | modifies | RISK | An impact control changes the consequence dimension of the risk |

---

#### 2.0.2 The Ontology's Causal Chain — Complete Flow

Reading the functional relations in sequence reveals the full causal loop:

```
OBJECTIVE
  └─ has ─► ASSUMPTION ─► has ─► UNCERTAINTY ─► causes ─► RISK
                                                              │
                                                          informs
                                                              │
                                                              ▼
                                                          DECISION ◄─── frames ─── POLICY
                                                              │              ▲
                                                          triggers      influences
                                                              │              │
                                                              ▼          OBJECTIVE
                                                           ACTION
                                                              │
                                                          triggers
                                                              │
                                                              ▼
                                                        OBSERVATION ─► informs ─► INDICATOR
                                                        (Signal, Issue,                │
                                                         Incident, Finding,        influences
                                                         Claim, ControlBehavior)       │
                                                                                       ▼
                                                                                   OBJECTIVE
```

The loop is closed: INDICATOR influences OBJECTIVE, which has ASSUMPTION, which carries UNCERTAINTY, which causes RISK. This is a feedback system, not a linear chain.

**Controls act at two points in the chain:**
- FrequencyControl modifies UNCERTAINTY (reduces the likelihood of the uncertainty producing a risk event)
- ImpactControl modifies RISK (reduces the consequence once the risk has materialised)

---

#### 2.0.3 Risk Radar Alignment — Where the Ontology Fits

**Adopted without change:**
- The nine core concepts as the vocabulary for all data capture
- The four RISK subtypes (Single, Recurring, Persistent, Compound) — each renders differently on the radar
- The ASSUMPTION subtypes (Budget, Requirement, Forecast, Threshold, Tolerance) as the cone-width drivers per objective
- The OBSERVATION subtypes (Signal, Issue, Incident, Finding, Claim, ControlBehavior) as the evidence base for capability ratings and the action register
- The INDICATOR subtypes (RiskIndicator, PerfIndicator, ControlIndicator) as the monitoring layer feeding the bearing calculation

**Adopted with extension:**
- UNCERTAINTY — extended with tier-awareness (external / portfolio / programme / operational source)
- OBJECTIVE — extended with tier assignment (Group / Entity / Programme) and conflict relationships between tiers
- RISK — extended with BearingForce (direction 0–359° relative to True North, magnitude, force type: propulsive / drag / lateral / magnetic)

**Not present in the ontology — added by Risk Radar:**
- BearingForce — the directional encoding that transforms a consequence model into a navigation instrument
- Propagation — cross-tier cascade mechanism (upward and downward), with mechanism type (financial / reputational / capability / strategic alignment)
- CommitmentCone — the narrowing cone for programme-level irreversibility (inverted from foresight cone logic)
- OrganisationalBearingArrow — the weighted vector sum of all blip forces as a single directional output

**The ontology's causal direction vs. Risk Radar's bearing direction:**
The ontology runs left-to-right: UNCERTAINTY → RISK → consequence → ACTION. Risk Radar traverses right-to-left: OBJECTIVE (True North) → which RISKs deflect bearing → which UNCERTAINTIEs cause those risks → which ACTIONs address the root uncertainties. The MCP translation layer performs this reverse traversal to answer the bearing question.

---

#### 2.0.4 Risk Subtypes — Radar Rendering Rules

| Subtype | Radar rendering |
|---|---|
| SingleEventRisk | Point blip at its assigned time horizon range ring. Standard treatment. |
| RecurringRisk | Persistent blip with a recurrence marker. The real intervention target is the upstream UNCERTAINTY, not the event. Tooltip surfaces the root UNCERTAINTY. |
| PersistentRisk | Not a blip. Rendered as directional shading within the cone — a permanent drag vector on bearing. Colour and intensity encode direction and magnitude. No time horizon to expire. |
| CompoundRisk | Hub node in the graph. Blip size encodes aggregate impact. Decomposition to constituent risks is surfaced on drill-down. Cascade factor derived from downstream connection count. |

---

#### 2.0.5 UNCERTAINTY / RISK Distinction — Data Model Implication

The ontology correctly separates UNCERTAINTY (the condition that exists) from RISK (the effect of that condition on a specific objective). The current prototype conflates these as a single record. In the full data model they must be separate entities:

- `Skills Gap` is an UNCERTAINTY
- "Skills Gap causes 12° eastward bearing deflection on the Talent & Culture objective" is a RISK — the objective-specific effect

A single UNCERTAINTY can produce multiple RISKs across different objectives. This is where cascade amplification originates. The graph network has UNCERTAINTY nodes as root causes, RISK nodes as their objective-specific effects, and "causes" edges between them.

---

#### 2.0.6 ASSUMPTION Subtypes as Cone-Width Drivers

The ontology's ASSUMPTION subtypes (Budget, Requirement, Forecast, Threshold, Tolerance, Plan) are the internal cone-width drivers currently missing from the model. Cone width has two distinct sources:

- **External driver:** threats and uncertainties in the environment (already modelled)
- **Internal driver:** fragility of the assumptions underlying the objectives themselves (not yet modelled)

An objective resting on an unapproved budget assumption, an unratified regulatory requirement, or a market forecast with low confidence has a wider cone than one resting on confirmed, evidenced assumptions. The data model needs an `assumptions` register per objective, with each assumption carrying a fragility rating derived from its confidence and evidential basis.

---

### 2.1 Capability Assessment — the Missing ERM Variable

The capability rating is the most important variable in the model and the one that differentiates Risk Radar from a conventional risk register.

**What it represents:** The organisation's current structural ability to respond to a specific threat or capture a specific opportunity. It is not a measure of how well the risk is being managed today — it is a measure of whether the organisation has the tools to respond at all.

**How it drives radar geometry:**
- A threat with High likelihood + High impact + Low capability creates large bearing deflection — the organisation is exposed with nothing to dampen the force.
- The same threat with High capability creates modest deflection — the organisation can absorb it.
- An opportunity with High capability creates strong magnetic pull toward its bearing. Low capability means the opportunity exists on the radar but barely moves the needle.

**The four strategic positions (Exposure × Capability):**

| Exposure | Capability | Position |
|---|---|---|
| High | High | Pursue — you can handle it, use it |
| High | Low | Hedge — exposed and unable to respond; build capability first |
| Low | High | Defend — comfortable but monitor for complacency |
| Low | Low | Avoid — not an issue now, defenceless if conditions change |

---

### 2.2 Capability Backed by Current Actions

A single qualitative capability rating (High / Medium / Low) is a subjective assertion. Grounding it in current actions changes its epistemological status entirely.

**The action register:** Each capability rating is backed by the initiatives, investments, or programmes currently in place to address the specific threat or opportunity. Each action carries three assessments:

- **Approval status** — formally sanctioned with budget and ownership? Unapproved actions are intentions, not controls.
- **Execution status** — actually running? An approved action not executing is governance theatre.
- **Outcome status** — producing results? An action can be approved, executing, and still not moving the needle.

**The capability modifier this creates:**

| Approved | Executing | Outcome | Effect on Rating |
|---|---|---|---|
| Yes | Yes | Yes | Confirmed — rating stands |
| Yes | Yes | No | Overstated — downgrade one level |
| Yes | No | — | At risk — downgrade one level |
| No | — | — | Aspirational — downgrade to Low regardless |

**SWOT connection:** Strengths are evidenced by actions where all three statuses are confirmed. Weaknesses are evidenced by actions that are unapproved, stalled, or not producing results. The gap between intended and actual capability becomes measurable, not assumed.

**Prototype implication:** The tooltip hover card is the natural home for the action register — shown beneath the rationale as a small action list with three status indicators per action.

---

### 2.3 Risk Graph Networks — Cascade Effects on Bearing

Treating risks as independent blips overstates diversification and understates actual exposure. In reality, risks are interconnected nodes in a graph.

**What a graph model adds:**

- **Cascade amplification:** A root-cause threat with downstream dependents has disproportionate bearing impact. Skills Gap → Talent Flight → Tech Disruption creates compounding deflection beyond the sum of individual impacts.
- **Correlated risk:** Two risks driven by the same root cause aren't adding uncertainty independently. Treating them as independent creates false cone width.
- **Hub nodes:** A threat connected to five others deflects bearing disproportionately regardless of its individual magnitude. Identifying hub nodes is one of the most valuable outputs the instrument could provide.
- **Opportunity paths:** An opportunity is only capturable if the threat path toward it doesn't pass through a node the organisation cannot defend.

**Bearing calculation shift:** From vector sum to weighted graph traversal — each node's bearing contribution is multiplied by a cascade factor derived from its number of downstream dependents and edge strengths.

**Preserving the qualitative principle:** Edges between risks are binary (connected or not) or ordinal (strong / weak influence) — not precise coefficients. A hub node with 3+ connections gets a visual amplifier (larger blip, stronger glow) without requiring a precise numerical weight.

**Architecture note:** The `risks` data model needs a `riskRelationships` structure alongside the `threats` array. Blip size should encode both impact magnitude and connectivity — a medium-impact hub threat renders larger than a high-impact isolated one.

---

### 2.4 Decision Intelligence Alignment

The Kaleido article (*The Missing Discipline — Decision Intelligence on Complex Infrastructure Projects*, Deepak Mistry) validates Risk Radar's core proposition and sharpens its commercial positioning.

**Mistry's five DI dimensions map directly onto the Risk Radar architecture:**

| DI Dimension | Risk Radar equivalent |
|---|---|
| Framing | Objective hierarchy — defining True North before anything else |
| Process | Branch layer — decisions as routes, not moments |
| Behavioural | Qualitative-only data capture — avoiding false precision that suppresses challenge |
| Organisational | Objectives panel — shared vocabulary for what north means |
| Technical | Bearing vector calculation — causal model mapping SWOT to directional output |

**Failure modes Risk Radar directly counters:**

- *The Agreement Trap* — three branch routes visible simultaneously on the same radar makes it structurally harder to present a single pre-determined conclusion.
- *Illusion of Rigour* — the cone makes uncertainty explicit rather than collapsing it to a point estimate.
- *Analysis as Advocacy* — the capability-action register prevents optimistic capability ratings unsupported by evidence.

**Commercial positioning implication:** Risk Radar is not a risk tool or a strategy tool. It is the missing instrument for the front end of the decision lifecycle — the point before programme commitment where the most consequential and least structured decisions are made. The board-level bearing arrow is the Decision Intelligence output Mistry describes, rendered in a form that reaches the room where strategic decisions are actually made.

---

## Part 3: V2 Architecture — Three-Tier Radar

This is the target architecture for the commercial product serving mega construction organisations.

---

### 3.1 The Two True Norths Problem

A mega construction organisation has two simultaneous and potentially conflicting True Norths:

- **Strategic North** — long-term organisational position: market share, capability, reputation, financial resilience. The boardroom question.
- **Programme North** — the committed programme outcome: asset delivered on budget, on time, fit for purpose. The delivery team's question.

These are not the same. A programme can deliver on its own north while damaging the organisation's strategic north. Risk Radar must hold both simultaneously and show the relationship between them.

---

### 3.2 The Three-Tier Structure

**Tier 1 — Strategic Radar (Board)**
The organisation's bearing relative to long-term True North. Blips are strategic forces: programme portfolio, ERM, financial position, market position, people and capability, supply chain, technology positioning, client relationships, regulatory environment, ESG position, reputation. The organisational bearing arrow is the weighted vector sum of all forces.

**Tier 2 — Programme Radars (Programme Director)**
One per major programme. Each has its own True North (committed programme outcome), cone (remaining option space, narrowing as phase commitments are made), threat population (programme risk register), and track history (phase-gate performance). The cone narrows with irreversible commitment, not just time — reflecting Mistry's point that you cannot un-build a tunnel.

**Tier 3 — Work Package / Discipline Radars (Delivery Teams)**
Individual workstreams within a mega programme. Their bearing feeds upward into the programme radar above.

**Navigation model:** Zoom and drill. Strategic view is the permanent anchor. Click a programme blip to zoom into Programme Mode. Click a threat within the programme to see action register and upward propagation. The strategic consequence of programme decisions is always legible to the board.

---

### 3.3 Programmes as Strategic Blips

Each programme appears on the strategic radar as a blip with four encoding dimensions:

**Position** — the programme's current bearing relative to organisational True North, derived from the vector sum of four programme-level forces:
- Financial vector (margin, cash, bonding capacity)
- Capability vector (building or consuming organisational human capital)
- Reputation vector (delivery performance enhancing or damaging market position)
- Strategic alignment vector (is this programme in the sectors and relationships that point toward True North?)

**Vector arrow** — the programme's trajectory: direction (improving or deteriorating alignment), length (velocity of change — rate between last two assessment periods), weight/thickness (programme magnitude by revenue or capital value).

**Cone** — the programme's uncertainty envelope propagated upward to the strategic view.

**Track history** — the accumulated bearing record for this programme, showing whether strategic alignment has been improving or deteriorating over the delivery lifecycle.

**Key vector arrow combinations:**
- Thick arrow toward north — large programme, improving alignment. Portfolio engine.
- Thick arrow away from north — large programme, deteriorating alignment. Dominant portfolio risk pulling the organisational bearing arrow with it.
- Long arrow away from north — rapid divergence regardless of programme size. Urgency signal.
- Arrow rotating direction — forces acting on this programme have changed character, not just strength. Surfaced as a visible arc showing previous and current direction.

---

### 3.4 Upward and Downward Cascade

**Downward cascade:** A strategic decision to pursue a new geography or sector changes organisational True North. Programmes already in delivery are suddenly misaligned to a north that has moved. Their blip positions are unchanged but north has shifted — making visible drift that wasn't apparent before.

**Upward cascade:** A programme deteriorating in Programme Mode registers as a blip moving away from north on the strategic radar. A ground conditions problem at month 18 triggers cost overrun → drains financial resilience → reduces bid capacity → constrains ability to pursue the next strategic opportunity. The programme's drift propagates upward through the portfolio to deflect organisational bearing. This chain is traceable and visible, not assumed.

**The graph network at portfolio level:** Programme risks are nodes. Edges are the propagation paths between programmes and strategic forces. A risk shared across multiple programmes is a hub node with disproportionate strategic bearing impact. Identifying these is one of the most valuable portfolio-level outputs.

---

### 3.5 ERM as Its Own Strategic Blip

ERM is a distinct blip on the strategic radar, separate from programme blips, because it captures what programmes do not.

**What it captures:** Risks that exist regardless of what the organisation is actively delivering — the external environment, regulatory landscape, macroeconomic forces, reputational and governance exposures that sit at enterprise level.

| Programme blips | ERM blip |
|---|---|
| Risks arising from active delivery | Risks arising from the external environment |
| Inside the organisation's control envelope | Partially or wholly outside it |
| Time-bounded to programme lifecycle | Continuous, enterprise-wide |
| Managed by programme teams | Owned at board level |
| Feed upward into strategy | Sit alongside strategy as a constraint |

**ERM blip encoding:**
- Position — net bearing deflection of the enterprise risk register assessed against True North
- Vector arrow — is the external risk environment improving or deteriorating?
- Weight — magnitude of enterprise risk exposure relative to organisational resilience
- Cone — uncertainty envelope: how predictable is the external environment?

**COSO and ISO 31000 connection restored:** Both frameworks mandate that ERM connects to strategic objectives. The ERM blip makes that connection literal — sitting on the same radar as the bearing arrow, its deflection force visible in the same frame as programme vectors. This is precisely the gap both frameworks were updated to close and that no current instrument provides.

---

### 3.6 The Complete Strategic Radar — All Blip Populations

| Blip | What it measures | Distinct from |
|---|---|---|
| Programme portfolio | Delivery performance as strategic force | Everything else |
| ERM | External risk environment | Internal capability and performance |
| Financial position | Own financial health and trajectory | ERM financial threats (which are external) |
| Market position | Competitive bearing in target markets | Client relationships (which are specific) |
| People & capability | Human capital relative to strategy | Programme capability gaps (which are project-specific) |
| Supply chain health | Strategic supply chain as an asset | Programme procurement (which is project-specific) |
| Innovation & technology | Technology positioning trajectory | Capability (which is broader) |
| Client relationships | Key relationship health and trajectory | Market position (which is aggregate) |
| Regulatory & political | Policy environment opportunity vector | ERM regulatory threats (which are risk consequences) |
| ESG & sustainability | Non-financial compliance trajectory | ERM and reputation |
| Reputation & brand | Perception and profile trajectory | Market position and client relationships |

**The four diagnostic scenarios this enables:**

| Programmes | ERM | Reading |
|---|---|---|
| Aligned | Hostile | Portfolio well-managed but external environment working against the organisation. Question is resilience. |
| Drifting | Benign | Problem is internal — governance, resource, capability — not external conditions. |
| Aligned | Aligned | Organisation performing well, environment favourable. Bearing arrow approaching True North. |
| Drifting | Hostile | Most dangerous position. Internal and external forces both working against bearing. Early warning. |

**Layer control:** Not all blips visible simultaneously. Board controls which populations are displayed for the current agenda item. Default: five or six most material blips. Others toggled. When a specific topic is under discussion, the relevant blip is foregrounded and others dimmed.

---

### 3.7 The Organisational Bearing Arrow

The organisational True North arrow on the strategic radar is the weighted vector sum of all blip forces — programme vectors, ERM force, financial position, capability, market position, and all others. When a programme's arrow rotates toward north, the organisational arrow moves. When a large programme accelerates eastward, the organisational arrow follows.

This is the instrument-level behaviour that makes the metaphor earn its place. A ship's compass doesn't show a table of headings — it shows a needle that moves. The strategic radar's organisational bearing arrow is that needle.

**The question it answers:** Given everything acting on this organisation — what we're delivering, the environment we're operating in, our financial position, our people, our clients, our reputation, our technology, and our regulatory context — where are we actually going, and is that where we said we wanted to go?

---

## Part 4: Tier 0 — Group / Multinational Architecture

The three-tier model extends upward without architectural change. A multinational organisation with separate legal or operational entities adds a fourth tier sitting above the existing structure:

```
Tier 0  — Group / Holding Company Radar
Tier 1  — Subsidiary / Organisational Entity Radar
Tier 2  — Programme Radar
Tier 3  — Work Package Radar
```

### 4.1 Subsidiaries as Group Blips

Each subsidiary entity appears on the Group radar as a blip, encoded using the same four dimensions as programme blips on the Tier 1 strategic radar:

- **Position** — the subsidiary's current bearing relative to Group True North, which is set at holding-company level and is not negotiable by subsidiary management
- **Vector arrow** — direction and velocity of the subsidiary's strategic drift: correcting toward Group north or diverging from it; thickness encodes the subsidiary's materiality (revenue, capital employed, headcount)
- **Cone** — the subsidiary's uncertainty envelope propagated upward to group level
- **Track history** — whether the subsidiary's alignment to Group north has been improving or deteriorating over time

### 4.2 The Local True North Problem

A multinational holding company may have subsidiaries operating in different sectors, geographies, and regulatory environments — each with a legitimately different local True North. The Group radar does not demand that all subsidiaries point in the same direction. It shows the weighted vector sum of where they are all going, and surfaces the subsidiaries whose trajectory is diverging from that aggregate.

This is a materially different and more honest picture than a consolidated P&L, which flattens direction into magnitude.

### 4.3 Three Group-Level Diagnostic Scenarios

| Subsidiary Positions | Group Bearing Arrow | Reading |
|---|---|---|
| Clustered, pointing near Group north | Strong, on-bearing | Portfolio coherent — acquisition and disposal strategy working |
| Widely dispersed bearings | Weak, near-centre | Conglomerate discount problem — no coherent group direction |
| One subsidiary pointing sharply away | Group arrow deflected | Single entity is the dominant group risk — concentration exposure |

### 4.4 Architectural Consistency

The recursive structure — same visualisation from work package to group level — is a deliberate design principle. A board member who can read the Group radar already knows how to read the subsidiary radar. Drill-down navigation is conceptually consistent at every level. There is no new metaphor to learn as the user moves between tiers.

**The navigational model scales accordingly:** Group radar is the permanent anchor for a group executive. Click a subsidiary blip to enter Tier 1. Click a programme blip within the subsidiary to enter Tier 2. At every level, the bearing relationship to the tier above remains visible — a programme director can always see how their bearing contribution flows upward to the subsidiary, and from the subsidiary upward to the group.

---

## Part 6: Concept Validity, Restated Claim, and AI Architecture

This part captures the critical challenge session and the architectural decisions that emerged from it. All material post the last commit (30a7d68).

---

### 6.1 Critical Challenge — Five Attacks on the Plan

The plan was subjected to a hostile validity review. The five challenges and their resolutions are recorded here because they define the boundaries of what Risk Radar can and cannot claim.

---

**Challenge 1: The Metaphor Implies Objectivity the Model Cannot Deliver**

Bearing on a radar screen is a physical measurement. Bearing on a Risk Radar screen is a structured human judgement. Two assessors looking at the same organisation will produce different bearings — not because their instruments differ, but because bearing is not an observable property of an organisation.

*Resolution:* The tool must make its reasoning visible at every level. The bearing arrow is not a measurement — it is a structured, evidence-backed, debatable judgement rendered in a form that a board can engage with directly. The rationale panel in the prototype is the correct instinct. Every bearing reading must be accompanied by the chain of reasoning that produced it, so a board member can challenge the inputs, not just the output. The tool is sold honestly as a structured dialogue instrument, not as a navigation instrument claiming objective precision.

---

**Challenge 2: The Qualitative Principle Breaks Under Aggregation**

High / Medium / Low is sufficient at the individual risk level. The moment aggregation occurs — vector sums, weighted bearing arrows, cascade factors, portfolio-level blips — arithmetic is being performed on ordinal labels. The plan had not documented how this aggregation works.

*Resolution:* The aggregation methodology must be explicit, consistent, and boardroom-explainable. It does not need to be academically rigorous. It needs to be directionally correct (increasing threat severity moves bearing away from north; increasing capability moves it back), consistent (same inputs always produce the same output), and explainable (the bearing rationale panel can name the two or three forces that dominate the current reading). The bearing arrow is an indicative direction for dialogue, confirmed by the chain of evidence behind it. The quality-weighted bearing model (section 6.3) is the specific resolution.

---

**Challenge 3: Three Tiers Plus Tier 0 Is Four Distinct Products**

A work package delivery team and a multinational group board have nothing in common except that both face uncertainty. A tool that genuinely serves both is either too abstract to be useful to either, or requires deep customisation at each tier.

*Resolution:* Risk Radar has one primary customer: the board and C-suite. That is Tier 0 and Tier 1. The expansion path is phased and sequenced upward from the strategic radar — not simultaneously across all tiers. Sequencing: Phase 1 is Tier 1 only (single-entity strategic radar — current prototype). Phase 2 adds programme blips propagating upward from Tier 2 (portfolio view — Part 5). Phase 3 adds Tier 0 group view. Phase 4 adds Tier 3 work package level feeding upward. This is one product with a defined expansion path, not four products with a shared visual metaphor.

---

**Challenge 4: Data Capture Has Been Treated as a Feature, Not the Product**

The plan acknowledges data capture is the hardest problem, then proceeds to develop the visualisation, MCP layer, ontology, and four-tier architecture — all of which assume clean, structured, ontology-aligned data exists. It does not exist in any client organisation. Risk data in real organisations is held in inconsistent spreadsheets, narrative registers written by different people, half-completed action logs, and politically managed heat maps.

*Resolution:* The data capture workflow and facilitation methodology are not peripheral. They are the product. The software makes the methodology scalable and the output visual. But the structured process for eliciting objectives, assumptions, capabilities, actions, and risks from a leadership team — and keeping those records evidenced and current — is what Risk Radar actually delivers. This is also its strongest differentiator: no current ERM tool ships with a board-level facilitation methodology baked into the product. Data owners are internal only — there is no external consultant risk manager role. The AI (Mode 1, section 6.4) replaces the external facilitator for data quality enforcement.

---

**Challenge 5: The MCP / AI Layer Assumes Data Quality That Cannot Be Guaranteed**

An AI that answers bearing questions is only as reliable as the data behind it. Confident, fluent, wrong answers from an AI are more dangerous than hedged right answers from a human analyst — because a board is more likely to act on them.

*Resolution:* The MCP layer is restructured as two distinct modes with a quality gate between them (section 6.4). Mode 1 operates upstream with data owners to maximise data quality. Mode 2 operates downstream with decision makers only after quality thresholds are met. The quality score modulates bearing contribution rather than acting as a binary pass/fail gate (section 6.3).

---

### 6.2 Restated Central Claim

The plan's original framing implied Risk Radar is a navigation instrument that measures strategic bearing. That framing does not survive hostile scrutiny.

The defensible and still distinctive claim is:

> **Risk Radar is a board-level strategic dialogue instrument. It structures the conversation between senior decision makers about where the organisation is headed and what is pushing it off course, and renders that structured conversation in a form that makes the consequences of strategic assumptions visible, debatable, and actionable.**

The radar is not the product. The structured conversation is the product. The radar makes it visible.

The original intent — give senior decision makers the type of information they can use to influence strategic decisions — is fully served by this framing. Context is the most important part of the decision maker's toolkit. Risk Radar's job is to maximise the quality and relevance of that context.

**What this framing changes:**
- Bearing is a structured judgement, not a measurement — always shown with its reasoning chain
- The facilitation methodology is a first-class deliverable, not a feature
- The AI's primary role is maximising data quality and context, not replacing human judgement
- The aggregation methodology must be explainable to a board, not academically defensible

---

### 6.3 Quality-Weighted Bearing Model

The key architectural decision resolving Challenges 2, 4, and 5 simultaneously.

**The principle:** Every risk, uncertainty, and capability record carries a completeness score. That score becomes a confidence multiplier on its bearing contribution. A risk with High impact but 40% data completeness contributes to bearing at 40% of its assessed weight. It still moves the needle — a significant but poorly evidenced threat is more honest than ignoring it — but less than a fully evidenced record of equivalent impact.

This is not a binary gate (use / don't use). It is a continuous confidence weighting. Low quality but significant impact still carries weight. High quality but low impact remains appropriately minor.

**Visual representation — the confidence band:**
- The bearing arrow has a confidence band rendered around it: narrow when data quality is high, wide when it is low
- The cone of possibilities has a secondary shading layer showing how the cone would narrow if completeness improved
- Low data quality is visible to the board, not just to data owners — the instrument is honest about its own reliability

---

#### 6.3.1 Completeness Score — Per Record Type

Each record type has a weighted completeness checklist. Score = (mandatory items satisfied ÷ total mandatory items) + bonus weighting for high-value items. Normalised to 0–100.

**UNCERTAINTY record:**

| Item | Weight |
|---|---|
| Name and description | Mandatory |
| Subtype assigned (Threat / Vulnerability / Complexity / Volatility / Variation) | Mandatory |
| Tier assigned (external / portfolio / programme / operational) | Mandatory |
| At least one downstream RISK linked | Mandatory |
| Synonyms / alternative labels | Optional |

**RISK record:**

| Item | Weight |
|---|---|
| Linked to parent UNCERTAINTY | Mandatory |
| Linked to primary OBJECTIVE | Mandatory |
| Likelihood rated (H/M/L) | Mandatory |
| Impact rated (H/M/L) | Mandatory |
| Bearing assigned (0–359°) | Mandatory |
| Bearing rationale text | Mandatory |
| Time horizon assigned | Mandatory |
| Risk subtype assigned (Single / Recurring / Persistent / Compound) | Mandatory |
| At least one KRI assigned | High value |
| Capability rating recorded | High value |
| Capability rating backed by at least one ACTION | High value |

**CAPABILITY / ACTION record:**

| Item | Weight |
|---|---|
| Approval status recorded | Mandatory |
| Execution status recorded | Mandatory |
| Outcome status recorded | Mandatory |
| Owner named | Mandatory |
| Last reviewed date | Mandatory |

**OBJECTIVE ASSUMPTION record:**

| Item | Weight |
|---|---|
| At least one ASSUMPTION subtype recorded per objective | High value |
| Fragility rating per assumption | Optional |

---

#### 6.3.2 Gamification — Driving Data Quality Behaviour

The completeness score is visible to data owners, creating competitive pressure without requiring external consultants.

**Assessment Readiness Dashboard (Mode 1 home screen for internal data owners):**
- Per-objective completeness bar — green above threshold, amber when partial, red below minimum
- Overall assessment readiness score — weighted average across all records
- AI-generated "what's missing" prompt list — the three highest-value completeness gaps surfaced by name: "Adding a KRI to Skills Gap would increase your assessment confidence by 8 points"

**Confidence watermark on the radar (visible to board):**
- Bearing arrow confidence band — narrow when quality is high, wide when low
- Cone secondary shading showing how the cone narrows as completeness improves
- Makes data quality visible to decision makers, not just data owners

**KRI Coverage indicator (optional leaderboard):**
- Across the risk register, which risks have complete KRI coverage and which do not
- Risk owners see their completeness relative to peers — social pressure without hierarchy

---

### 6.4 MCP Dual-Mode AI Architecture

The MCP layer operates in two distinct modes, separated by the quality-weighted bearing threshold. Data owners are internal only — no external consultant risk manager role.

---

**Mode 1: AI as Data Quality Coach (upstream — with internal data owners)**

The AI reviews each record against the ontology structure and the completeness checklist. It does not fill in gaps — it asks the right questions to help the owner fill them. It escalates material gaps to the assessment owner before the board session.

Primary tasks:
- Surface missing or weak data against the ontology structure
- Challenge capability ratings that lack action register evidence
- Identify risks without upstream UNCERTAINTY records and prompt owners to make the linkage explicit
- Flag ASSUMPTION subtypes not yet recorded against each objective
- Prompt for KRI assignment — every risk should have at least one RiskIndicator
- Validate ontology relationships: UNCERTAINTIEs → RISKs → OBJECTIVEs → ACTIONs
- Produce completeness score per objective, per risk, and per assessment cycle

Example AI prompts in Mode 1:
- "You have rated Skills Gap as High impact but the bearing is unassigned. Which direction does this push the organisation relative to its Talent & Culture objective?"
- "Your capability rating for this threat is Medium, but none of the three backing actions have confirmed outcome status. Based on current evidence, the effective capability is Low. Do you want to update the rating or add evidence?"
- "You have 4 risks linked to the Digital Transformation objective but no ASSUMPTION records. What is this objective assuming about budget, regulatory environment, or technology availability?"

---

**Mode 2: AI as Board Navigator (downstream — with decision makers)**

Activated once the assessment has passed the minimum completeness threshold. The AI answers questions about the bearing with full context and visible confidence weighting. Every answer carries three elements: context, confidence, and call to action.

Primary tasks:
- Answer natural language questions about bearing and its causes
- Surface the chain of evidence behind any blip on the radar
- Simulate decision branches and their bearing consequences
- Identify UNCERTAINTY hub nodes — root causes with the most downstream risk dependents
- Flag KRIs trending in the wrong direction since the last assessment
- Contextualise across assessment cycles — surfacing when assumptions have not been reviewed since a key programme event

Example AI responses in Mode 2:
- "We are bearing 34° east of True North. The three dominant forces are Skills Gap (High impact, 62% data confidence), Regulatory Shift (Medium impact, 91% confidence), and Infrastructure Programme drift (High impact, 78% confidence). The Regulatory Shift reading is the most reliable — would you like to explore that first?"
- "If you proceed with the capability investment decision, bearing improves by approximately 11° toward north. That estimate carries 71% confidence because the capability rating it depends on has two actions in execution but neither yet showing confirmed outcomes."
- "Your Digital Transformation KRI — graduate hire retention rate — has been below threshold for two consecutive periods. This is the leading indicator for the Skills Gap threat. The action status has not been updated since last month."

---

### 6.5 Key Risk Indicators — Architecture

KRIs are the monitoring layer connecting formal assessment cycles. Without them, the board sees a snapshot at each assessment but has no early warning system between sessions. In the ontology, KRIs are RiskIndicators — a subtype of INDICATOR, informed by OBSERVATION.

**The KRI chain:**
```
UNCERTAINTY → causes → RISK → has → RiskIndicator (KRI)
                                          │
                                   monitored periodically
                                   (manual, per MVP scope)
                                          │
                                   triggers OBSERVATION
                                   (Signal, Issue, Incident)
                                          │
                                   informs INDICATOR
                                          │
                                   influences OBJECTIVE
```

**KRI record structure:**
- Name and description
- Parent RISK (mandatory)
- What to monitor — the specific variable being tracked
- Monitoring frequency — periodic (weekly / monthly / quarterly) for MVP
- Threshold — the value or condition that triggers an OBSERVATION
- Current status — above / at / below threshold
- Last updated date and owner

**MVP scope:** KRI monitoring is manual and periodic. A risk owner records an observation when the monitored variable changes materially or when the periodic review is due. Automated feed from external data sources is a post-MVP capability.

**What KRIs enable:**
- Early warning between formal assessment cycles — the board is notified of material threshold crossings without waiting for the next quarterly assessment
- Continuous bearing refinement — KRI status updates feed into the completeness score and can trigger a bearing recalculation
- Evidence for Mode 2 AI context — "this KRI has been below threshold for two consecutive periods" is a factual, evidenced statement the AI can make with full confidence

Every risk on the radar must have at least one KRI to achieve full completeness score on the RISK record. The Mode 1 AI enforces this as a high-value completeness item.

---

### 6.6 Cross-Tier Bearing Calibration

A work package risk does not have significant bearing on Tier 0 in isolation. Only in aggregation with other risks, and through the translation layers between tiers, does its contribution become visible. There is no single formula from work package to group bearing. There are three translation layers, each with a human validation step supported by the AI.

---

**Translation Layer 1: Tier 3 → Tier 2 (Shared UNCERTAINTY Aggregation)**

Work package risks do not propagate individually. They aggregate via their shared parent UNCERTAINTY records.

A ground conditions risk on Work Package A and a ground conditions risk on Work Package B both trace back to the same parent UNCERTAINTY: `GeologicalSurveyAssumption`. At Tier 2, the programme director does not see two independent risks — they see one UNCERTAINTY with two downstream materialised risks. This is qualitatively more serious than two unrelated risks of equivalent individual impact, and the bearing calculation reflects it via cascade amplification.

Shared UNCERTAINTIEs with multiple downstream RISKs across work packages are identified as CompoundRisks at programme level. The Mode 1 AI's primary task at Tier 3 is identifying risks without parent UNCERTAINTY records and prompting owners to make the linkage explicit — because without those links, the Tier 2 aggregation cannot function correctly.

**Human validation step:** The programme director reviews the aggregated UNCERTAINTY themes before the Tier 2 assessment is published upward.

---

**Translation Layer 2: Tier 2 → Tier 1 (Tier-Specific Recalculation)**

Programme directors do not push individual programme risks to Tier 1. They assess the four strategic alignment vectors (financial, capability, reputation, strategic alignment) informed by the Tier 2 data, and those four vectors determine the programme blip's position on the Tier 1 strategic radar.

The programme blip's position is the programme director's validated judgement about how this programme is affecting the organisation's strategic bearing — not a mechanical roll-up of programme risk scores. The Mode 2 AI supports this by showing how changes to the four alignment vectors would shift the blip position, and by flagging where the blip position appears inconsistent with the underlying Tier 2 data.

**Human validation step:** The programme director confirms the blip position and the four alignment vector assessments before the Tier 1 board session.

---

**Translation Layer 3: Tier 1 → Tier 0 (Materiality-Weighted Recalculation)**

Entity boards assess their subsidiary's blip position on the Group radar. The Group bearing arrow is the materiality-weighted vector sum of subsidiary blip positions — each subsidiary's contribution scaled by its proportional weight in the group (revenue, capital employed, or headcount, as configured).

A subsidiary that is 8% of group revenue contributes its blip force at 8% weight. A subsidiary that is 45% of group revenue dominates the group bearing arrow — which is the correct behaviour: the group cannot be more strategically healthy than its most material entity.

**Human validation step:** Entity leadership confirms their blip position on the Group radar. The Mode 2 AI at Group level can show which subsidiary is the dominant force on the group bearing arrow and what would need to change at entity level to correct it.

---

**The data quality score propagates upward through all translation layers.** If Tier 3 data is 45% complete, the programme blip at Tier 2 carries a wide confidence band. That confidence band propagates to the Tier 1 strategic radar and to the Tier 0 group radar. The board at every tier sees not just the bearing, but the reliability of the bearing — and can trace that reliability back to the completeness of the underlying data at the tier of origin.

---

**Summary of calibration approach:**

| Translation | Method | Human role | AI role |
|---|---|---|---|
| Tier 3 → Tier 2 | Shared UNCERTAINTY aggregation | Programme director validates themes | Identifies unlinked risks; surfaces CompoundRisk patterns |
| Tier 2 → Tier 1 | Four alignment vectors (programme director assessment) | Programme director confirms blip position | Flags inconsistencies between blip position and Tier 2 data |
| Tier 1 → Tier 0 | Materiality-weighted vector sum | Entity leadership confirms blip position | Shows dominant entity force; simulates correction scenarios |

---

## Part 5: Next Prototype Experiment

**The portfolio view** — the strategic radar with four or five programme blips, each with position, vector arrow (direction + length + weight), short track history trail, and individual cone. Plus an ERM blip. Plus the organisational bearing arrow as the weighted sum.

**The experiment question:** Can a senior stakeholder, looking at that screen, immediately identify:
- Which programme is the strategic engine?
- Which is the dominant portfolio risk?
- Whether the portfolio as a whole is correcting toward or drifting away from True North?

Without being told.

If yes, the commercial proposition is proven at the portfolio level — not just the UI metaphor.

**The time horizon shift for construction:** The programme cone narrows as phase commitments are made (irreversible physical commitment), not just widens with time uncertainty. This is a distinct behaviour from the strategic cone and needs separate rendering logic.
