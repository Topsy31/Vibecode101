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

### 2.0 RiskLeap Risk Ontology — Alignment and Implications

The RiskLeap Risk Ontology (Loopnut Consultoria Ltda, updated March 2026) provides a formal concept model that partially validates and partially challenges the Risk Radar data model. Source: riskleap.com/riskontology.

**Core concepts (ontology primitives):**

| Concept | Definition |
|---|---|
| UNCERTAINTY | Lack of knowledge about future state. The root cause layer. Synonyms: Risk driver, Risk Factor, Risk source, Cause |
| ASSUMPTION | A proposition accepted as true without proof. The logical underpinning of objectives. Can also express risk appetite |
| RISK | An effect of one or more uncertainties on an objective. Consequences arising from deviations from assumptions |
| OBSERVATION | The result of proactive attention to relevant evidence. A reality check on system consistency |
| INDICATOR | A consolidation of observations with contextual interpretation. Compares current state to desired/forecasted state |
| ACTION | The practical implementation of a decision. Dependent on resources, technical viability, cultural acceptance |
| DECISION | A resolution on whether to take an action, based on prior inputs |
| POLICY | Specification of how a decision should be made, including constraints and criteria |
| OBJECTIVE | Long-term goal tied to mission and vision, driving overall direction |

**Risk subtypes with direct radar implications:**

| Subtype | Definition | Risk Radar rendering |
|---|---|---|
| SingleEventRisk | Discrete, countable event | Point blip at a specific time horizon range ring |
| RecurringRisk | Chronic condition repeatedly triggering discrete loss events; unresolved underlying cause | Persistent blip — the target is the UNCERTAINTY, not the event |
| PersistentRisk | Structural condition continuously generating adverse outcomes; no discrete triggering events. Synonym: Systemic | Not a blip — a permanent directional drag on bearing; rendered as cone shading rather than a discrete point |
| CompoundRisk | Statistical aggregation of individual singular risks; not a risk per se | Hub node in the graph; blip size reflects aggregate but decomposition to constituents is the real work |

**Control subtypes:**
- **FrequencyControl** — reduces or increases likelihood of events (maps to our capability modifier on likelihood)
- **ImpactControl** — reduces or increases consequence of events (maps to our capability modifier on impact)

#### 2.0.1 The UNCERTAINTY / RISK Distinction

The ontology correctly separates UNCERTAINTY (the cause layer — the condition that exists) from RISK (the effect on an objective — what that condition does to bearing). The current prototype conflates these as a single record.

In the full data model they must be separate:
- `Skills Gap` is an UNCERTAINTY — a structural condition that exists
- "Skills Gap causes 12° eastward bearing deflection on the Talent & Culture objective" is a RISK — the effect of that uncertainty on a specific objective

**Graph network implication:** UNCERTAINTY nodes are root causes. RISK nodes are their objective-specific effects. Edges represent the "causes" relationship. A single UNCERTAINTY can produce multiple RISKs across different objectives — this is where cascade amplification originates.

#### 2.0.2 PersistentRisk Requires Different Rendering

A PersistentRisk (systemic structural condition) is not an event with a time horizon. It is a permanent drag vector on bearing — a constant crosswind on the compass needle. Rendering it as a conventional blip with a range ring misrepresents its nature.

**Proposed rendering:** PersistentRisk appears as directional shading within the cone rather than a discrete blip. The shading colour and intensity encode the drag direction and magnitude. It is always visible — it has no time horizon to expire.

**Example:** Chronic underfunding of capability development in a mega construction organisation is a PersistentRisk. It doesn't trigger at 12 months or 2 years. It continuously deflects bearing westward for as long as the structural condition exists.

#### 2.0.3 ASSUMPTION as Cone-Width Driver

The ontology defines ASSUMPTION as the logical underpinning of objectives — noting that Budget and Requirement are subtypes of ASSUMPTION. This is the missing link between True North and the risk register.

Strategic objectives rest on assumptions. When an assumption is violated, the objective is at risk from internal logical failure, not external threat. This means cone width has a second driver currently absent from the model:

- **External driver:** threats and uncertainties in the environment
- **Internal driver:** fragility of the assumptions underlying the objectives themselves

An objective built on two explicit assumptions is more robust than one built on five implicit ones. Assumption fragility is a cone-widening force. The data model needs an `assumptions` register per objective, with an explicit fragility rating.

#### 2.0.4 The Ontology's Causal Direction vs. Risk Radar's Bearing Direction

The ontology runs left-to-right: UNCERTAINTY → RISK → consequence → ACTION. This is the conventional ERM causal chain.

Risk Radar runs right-to-left: OBJECTIVE (True North) → which RISKs deflect bearing away from it → which UNCERTAINTIEs cause those risks → which ACTIONs address those uncertainties.

Both are correct framings. The MCP translation layer traverses the ontology's causal chain in reverse to answer the bearing question: "which uncertainties are producing risks that deflect bearing away from this specific objective?" This reverse traversal is precisely what makes the AI interrogation non-trivial and the output defensible.

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

## Part 5: Next Prototype Experiment

**The portfolio view** — the strategic radar with four or five programme blips, each with position, vector arrow (direction + length + weight), short track history trail, and individual cone. Plus an ERM blip. Plus the organisational bearing arrow as the weighted sum.

**The experiment question:** Can a senior stakeholder, looking at that screen, immediately identify:
- Which programme is the strategic engine?
- Which is the dominant portfolio risk?
- Whether the portfolio as a whole is correcting toward or drifting away from True North?

Without being told.

If yes, the commercial proposition is proven at the portfolio level — not just the UI metaphor.

**The time horizon shift for construction:** The programme cone narrows as phase commitments are made (irreversible physical commitment), not just widens with time uncertainty. This is a distinct behaviour from the strategic cone and needs separate rendering logic.
