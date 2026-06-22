# Risk Radar — Philosophical Underpinning

*This document captures the conceptual foundations of Risk Radar: what it is, why it exists, what assumptions it rests on, and what it explicitly does not claim to be. It is the document to challenge before anything is built — and to update as evidence from building accumulates.*

*It is organised in three parts.*

*Part I covers the instrument — the problem, the central claim, the mental model, the architecture, and the assumptions. Readers who want to understand what Risk Radar is should read Part I.*

*Part II covers the computation — how the conceptual model is realised mathematically, including the Monte Carlo simulation architecture, risk appetite as a percentile selector, the risk correlation network, and bidirectional signal flow across tiers. Readers who want to understand how it works should read Part II.*

*Part III covers the empirical evidence — what the first two Tier 0 proof-of-concept implementations (WEF.html and Shell.html, June 2026) confirmed, broke, and structurally revised in the theoretical model. Where Parts I and II are theory, Part III is the first external test of that theory against real data and real audiences. Where they conflict, Part III takes precedence.*

---

# Part I — The Instrument

## 1. The Problem This Solves

Senior decision makers in large organisations routinely make consequential strategic decisions without adequate context. Not because the information does not exist — it usually does, somewhere — but because the instruments available to them present that information in forms that do not support decision-making.

Risk registers present threats in isolation, ranked by likelihood and impact, disconnected from the strategic objectives they threaten and from the organisation's actual ability to respond. Strategy documents present aspirations without surfacing the assumptions those aspirations rest on or the forces pushing against them. Board papers present past performance without showing direction of travel.

The result is that the most important decisions — the ones made before commitments are locked in, when the option space is still wide — are made with the least structured information. Once a programme is committed, a contract is signed, or a market position is staked, the cone of possibilities narrows irreversibly. The moment when context matters most is the moment when current instruments serve least well.

Risk Radar exists to fill that gap.

---

## 2. The Central Claim

> **Risk Radar is a board-level strategic dialogue instrument. It structures the conversation between senior decision makers about where the organisation is headed and what is pushing it off course, and renders that structured conversation in a form that makes the consequences of strategic assumptions visible, debatable, and actionable.**

Three words in that claim matter and should be challenged:

**Structured** — the conversation is not free-form. It follows an explicit methodology: define True North, surface the assumptions it rests on, assess the forces acting on bearing, evaluate the capability to respond. The structure is what makes the output comparable across assessment cycles and credible to a board.

**Dialogue** — the instrument does not produce answers. It produces the right questions, with evidence attached. A board member looking at the radar should be able to challenge any blip, any bearing reading, any branch projection — and the tool provides the reasoning chain that makes that challenge possible.

**Actionable** — the output must be usable in the room where strategic decisions are made. Not in a subsequent risk committee meeting. Not in a consultant's report. In the board session itself.

---

## 3. What Risk Radar Is Not

These boundaries are as important as the claim.

**It is not a risk register.** A risk register catalogues threats for governance and compliance purposes. Risk Radar uses risk assessments as inputs to a directional model. The output is not a list of risks — it is a bearing.

**It is not a measurement instrument.** Strategic bearing cannot be measured in the way that physical bearing can. Two assessors looking at the same organisation will produce different bearings — not because their instruments differ, but because bearing relative to a strategic objective is a structured judgement, not an observable fact. Risk Radar makes that judgement structured, transparent, and debatable. It does not make it objective.

**It is not a prediction tool.** The cone of possibilities is not a forecast. It represents the range of plausible futures given current uncertainties and assumptions. It is honest about uncertainty rather than collapsing it to a point estimate.

**It is not a replacement for human judgement.** At every tier boundary — from work package to programme, from programme to entity, from entity to group — a human validates the translation. The AI supports that validation by doing the analytical work and surfacing inconsistencies. It does not make the call.

**It is not a consultant-dependent tool.** Data owners are internal to the client organisation. The AI replaces the external facilitator for data quality enforcement and context-building, not for strategic assessment.

---

## 4. The Core Mental Model

Three concepts underpin everything.

### 4.1 True North

Every assessment begins with a defined strategic destination. This is True North — the objective hierarchy that tells the organisation what it is trying to achieve and by when. Without True North, nothing else has meaning. A bearing is only meaningful relative to a destination. A threat is only material if it deflects the organisation away from where it is trying to go.

True North is set at the level of the instrument's user. A group board sets Group True North. A subsidiary sets Entity True North. A programme director sets Programme True North. These are not the same north, and they can conflict — a programme that delivers on its own north can damage the entity's north above it. Risk Radar must hold that tension explicitly rather than hiding it.

True North is not a static input — it is a live quantity. When a parent tier makes a strategic pivot, that change propagates downward through the tier structure, shifting the True North of every subordinate in proportion to how tightly that subordinate's strategy is bound to its parent. A programme that was pointed at the right destination last quarter may be misaligned this quarter not because anything changed in the programme, but because the board changed the destination. The degree to which all tiers are currently pointing at compatible norths is a measurable output of the system: strategic coherence. The computational mechanism for this is described in Section 13.

### 4.2 Bearing

Given a defined True North, the current bearing is the direction the organisation is actually travelling — the vector sum of all the forces acting on it. Strengths and aligned capabilities push toward north. Threats and capability gaps push away from it. Opportunities pull toward their bearing if the organisation has the capability to respond; if it does not, they are visible on the radar but exert little force.

Bearing is expressed as degrees of deviation from True North. Zero degrees means the organisation is pointed directly at its strategic destination. Thirty degrees east means it is drifting, and the AI can tell you which forces are responsible for that drift and how much each one is contributing.

Bearing is a structured judgement, not a measurement. It is only as reliable as the data and reasoning behind it. The instrument makes that reliability visible — through the confidence band on the bearing arrow and the reasoning chain available on demand.

At tiers above the work package level, bearing is aggregated from subordinate tiers, not computed directly from SWOT forces. Each subordinate's bearing contributes to the parent's bearing in proportion to its strategic materiality. Simple averaging is mathematically wrong for directional quantities — the correct method is the weighted circular mean, described in Section 13.1.

### 4.3 The Cone of Possibilities

The cone represents the range of plausible futures, widening with time and uncertainty. It is the honest representation of what strategic planning actually involves: not a single predicted outcome, but a bounded space of futures within which the organisation is trying to navigate.

The cone has three drivers:

**External driver** — threats and uncertainties in the environment. A hostile regulatory environment, a volatile supply chain, a technology disruption that could arrive at any of several time horizons. These widen the cone from outside. Where these threats are causally connected — one triggering or amplifying another — the cone is wider and more asymmetric than an independent treatment would suggest. The risk correlation network in Section 11.5 captures those connections formally.

**Internal driver** — the fragility of the assumptions underlying the strategic objectives themselves. An objective that rests on an unconfirmed budget assumption, an unratified regulatory requirement, or a market forecast with low confidence has a wider cone than one resting on evidenced, confirmed assumptions. This is the driver most commonly missed by conventional ERM.

**Aggregation driver** — at parent tiers, the spread of subordinate bearings. If five programmes are all pointing in the same direction, the parent's cone is narrow regardless of each programme's individual uncertainty. If those same programmes are pointing in materially different directions, the parent's cone is wide — even if every individual programme has high internal confidence. This reflects strategic disagreement or misalignment across the subordinate portfolio and cannot be resolved by improving any single programme's data quality. It can only be resolved by addressing the divergence between programmes.

The cone narrows in two situations: when assumptions are confirmed and uncertainties resolve (standard foresight logic), and when irreversible commitments are made that close off alternative futures. The second is critical for construction and capital programmes — digging a tunnel narrows the cone regardless of how uncertain the environment remains.

In the computational model, the cone is not drawn by hand. It is an emergent output of a Monte Carlo simulation: N forward simulations from the current assessment state produce a probability distribution of bearing positions at each future time horizon, and the cone boundary is the selected percentile of that distribution. The board's choice of percentile is the formal expression of its risk appetite — a risk-averse board governs at the bad tail of the distribution; a risk-tolerant board navigates by the median. The full simulation architecture is in Section 11; risk appetite as a percentile selector is in Section 12.

---

## 5. The Four-Tier Architecture

Risk Radar operates at four levels of organisational scope, using the same visual metaphor at each level. A board member who can read the group radar already knows how to read the subsidiary radar. The drill-down navigation is conceptually consistent throughout.

```
Tier 0  — Group / Holding Company Radar        (Group Board)
Tier 1  — Entity / Subsidiary Radar            (Entity Board / C-Suite)
Tier 2  — Programme Radar                      (Programme Director)
Tier 3  — Work Package Radar                   (Delivery Teams)
```

Each tier below appears as a blip on the tier above. A programme is a blip on the entity strategic radar. A subsidiary is a blip on the group radar. Each blip carries four encoding dimensions: position (current bearing), vector arrow (direction and velocity of change), cone (uncertainty envelope), and track history (accumulated bearing record).

The tier structure is not merely organisational — it is the mechanism through which bearing information and strategic intent flow. Bearing aggregates upward from subordinate to parent. True North propagates downward from parent to subordinate. Both flows pass through tier-to-tier edges that carry two distinct weights: a materiality weight (governing how much a subordinate's bearing influences the parent's reading) and a cascade weight (governing how much of a parent's strategic pivot flows down to reshape the subordinate's True North). These are different quantities set for different purposes and must be elicited and stored separately.

The primary customer is the board and C-suite — Tier 0 and Tier 1. Tiers 2 and 3 are the data supply chain that makes the board instrument credible. Without evidenced data from the tiers below, the board instrument is decorative.

---

## 6. The Data Quality Principle

The instrument is only as trustworthy as the data behind it. This is not a disclaimer — it is a design principle.

Every record in Risk Radar carries a completeness score. That score becomes a confidence multiplier on the record's contribution to bearing. A significant but poorly evidenced threat still influences the bearing — ignoring it would be more dishonest than including it — but at a fraction of the weight of an equivalently assessed, fully evidenced threat.

This produces a confidence band on the bearing arrow: narrow when data quality is high, wide when it is low. The board sees the bearing and the reliability of the bearing simultaneously. The instrument is honest about what it does not know.

The confidence band also propagates upward through the tier structure. A programme blip built on 45% complete Tier 3 data carries a wide cone when it appears on the entity strategic radar. The entity board can see not just where the programme is, but how much they should trust that reading.

---

## 7. The AI's Role

The AI operates in three distinct modes and must not be confused between them. Mode 1 has two sub-modes corresponding to two structurally different problems: first-time data population, and ongoing data quality maintenance. Conflating them produces an AI that is either too passive (a coach when a parser is needed) or too invasive (a parser when a coach is needed).

**Mode 1a — Document Ingestion (first engagement, populating the data model)**

On first engagement with a client organisation, the AI reads the organisation's own strategic and risk documents — Annual Reports, Board Papers, Risk Committee minutes, regulatory submissions, strategic plans — and produces a draft Risk Radar data model. It does not wait for data owners to enter records. It extracts them.

The extraction produces: blips positioned by bearing and range derived from the disclosed severity language; causal links drawn from disclosed risk interdependency statements; KRIs populated from disclosed performance tables; True North derived from the strategic objective or mission statement; and active issues identified from language indicating confirmed, ongoing conditions rather than probabilistic future risks.

Each extracted data point is locked to its source passage — document title, section, and page reference — so that every blip on the radar carries a traceable citation. Confidence tiers are assigned automatically by source type: externally audited data (statutory accounts, assurance statements) = Verified; formally disclosed data (Annual Report risk section, regulatory submissions) = Disclosed; management-provided workshop or interview input = Asserted; AI inference from narrative context = Inferred.

A human review step validates each extraction before it enters the live model. The reviewer sees the extracted data point alongside the source passage and approves, corrects, or rejects it. Approved data locks. Rejected data is flagged for manual entry. The AI does not bypass human judgement — it eliminates the research burden that makes manual data entry prohibitive at scale.

The output of Mode 1a is a pre-loaded radar, source-traceable and confidence-tiered, ready for a board session within hours of document ingestion rather than weeks of manual research.

**Mode 1b — Data Quality Coach (subsequent cycles, with internal data owners)**

In assessment cycles after the first, the AI shifts from parser to interrogator. It compares the current data model against the new document set, identifies what has changed since the previous cycle, proposes updates to blip positions and confidence tiers, and flags where previously high-confidence data has not been refreshed and should be revalidated.

It works with the people who own risks, actions, and capabilities to maintain quality and completeness between board sessions. It does not fill in gaps — it asks the questions that prompt owners to fill them. It challenges capability ratings unsupported by action register evidence. It identifies risks without parent uncertainty records. It flags assumptions that have not been recorded against objectives. It produces a completeness score per record and per assessment cycle.

The AI in Mode 1b is the structured interrogator of the data, not of the decision makers. Its output is a data set that can be trusted — not perfect, but transparently incomplete where gaps remain, and explicitly labelled by provenance tier so that the board can distinguish what is known from what is asserted.

**Mode 2 — Board Navigator (downstream, with decision makers)**

Once an assessment meets the minimum completeness threshold, the AI shifts role entirely. It becomes the decision maker's navigator — answering natural language questions about bearing and its causes, surfacing the chain of evidence behind any blip, simulating the bearing consequences of decision branches, and flagging KRIs trending in the wrong direction since the last assessment.

Every Mode 2 answer carries three elements: context (what is happening and why), confidence (how reliable is this reading), and call to action (what would need to change to shift the bearing). The AI never presents a conclusion without its evidence chain. The board can always drill into the reasoning behind any statement.

Mode 2 also carries an explicit responsibility that the POC experience identified as missing: translation by governance role. A bearing of +42° east means something different to a Non-Executive Director (is management being challenged?), an institutional investor (what is the earnings implication?), and a risk officer (which control is failing?). The AI does not present a single interpretation — it contextualises the bearing reading for the specific governance role of the person asking. The Mode 2 interface should surface role context as an input before generating a response.

The AI does not make strategic decisions. It maximises the context available to the people who do.

---

## 8. The Ontological Foundation

Risk Radar adopts the RiskLeap Risk Ontology (Loopnut Consultoria Ltda, March 2026) as its vocabulary, with extensions for the directional model.

The core distinction the ontology establishes — and which conventional ERM conflates — is between UNCERTAINTY (the condition that exists: the cause layer) and RISK (the effect of that condition on a specific objective: the consequence layer). A skills gap is an uncertainty. The bearing deflection that skills gap causes on the talent and culture objective is a risk. One uncertainty can produce multiple risks across multiple objectives. This is where cascade effects originate — and where the risk correlation network described in Section 11.5 provides formal structure for what the ontology identifies as a causal relationship.

The ontology's causal chain runs: UNCERTAINTY → causes → RISK → informs → DECISION → triggers → ACTION → triggers → OBSERVATION → informs → INDICATOR → influences → OBJECTIVE. This is a feedback loop, not a linear chain.

Risk Radar traverses this chain in reverse: starting from the OBJECTIVE (True North), identifying which RISKs deflect bearing away from it, tracing which UNCERTAINTIEs cause those risks, and evaluating which ACTIONs address the root uncertainties. The AI performs this reverse traversal to answer the bearing question.

Risk Radar extends the ontology with five concepts the original does not contain:

- **BearingForce** — the directional encoding (0–359° relative to True North, magnitude, force type) that transforms a consequence model into a navigation instrument
- **Propagation** — the cross-tier cascade mechanism, with mechanism type (financial, reputational, capability, strategic alignment) and direction (upward or downward)
- **CommitmentCone** — the narrowing cone for programme-level irreversibility, distinct from the widening foresight cone
- **OrganisationalBearingArrow** — the weighted vector sum of all blip forces as a single directional output at each tier
- **ActiveDeviation** — a confirmed event or condition that is currently applying a deterministic bearing force. Distinguished from RISK (probabilistic) by state: probability has collapsed to 1, the effect is ongoing, and resolution requires a tracked ACTION. Carries onset date, current bearing effect (magnitude and direction), linked action register entries, and estimated resolution horizon. Corresponds to what practitioners commonly call an Issue — a risk that has materialised and is not yet resolved.

---

## 9. What Risk Radar Assumes

These are the assumptions the concept rests on. Each is a legitimate target for challenge.

1. **Senior decision makers can engage with a spatial metaphor.** The radar must land intuitively without instruction. If it requires explanation, it has failed.

2. **Qualitative data is sufficient for directional judgement.** High / Medium / Low is enough to establish bearing direction and relative magnitude. False numerical precision makes the model less trustworthy, not more.

3. **Internal data owners will maintain their records.** The instrument depends on periodic updates from people who have other jobs. Gamification and the Mode 1 AI reduce the friction, but the commitment required from client organisations is real and must not be underestimated.

4. **Human validation at tier boundaries is sustainable.** Programme directors confirming their blip position, entity boards confirming their subsidiary's position — these are governance steps that must be embedded in existing review cycles, not added as additional overhead.

5. **The structured conversation is more valuable than an unstructured one.** Risk Radar's value is not in the radar itself. It is in what the radar forces: the explicit definition of True North, the surfacing of assumptions, the evidencing of capability, the mapping of uncertainties to objectives. If those conversations happen without the tool, the tool adds no value.

6. **Context is the primary deliverable, not conclusions.** The instrument gives decision makers the information they need to make better judgements. It does not make the judgements for them. A board that wants a tool to tell them what to decide will be disappointed. A board that wants a tool that makes their conversations more structured and their decisions better informed will find this useful.

---

## 10. The Competitive Position

The market gap is genuine. The components of Risk Radar exist separately:

- Futures Cone templates in Miro
- SWOT tools as digital sticky notes
- ERM platforms (Riskonnect, LogicGate, Archer, ServiceNow GRC) as compliance documentation systems
- Scenario planning tools (Planisware and similar) designed for finance and portfolio teams

No existing tool integrates SWOT-based capability assessment, cone of possibilities scenario planning, and ERM risk data into a unified directional instrument with a board-level visual output.

### 10.1 Standards Alignment

The standards landscape confirms both the need and the gap. A survey of more than twenty international standards, governance codes, and frameworks reveals a consistent pattern: multiple frameworks require boards to govern risk relative to strategic objectives; none provide a practical instrument for doing so.

**Explicitly objective-led standards — Risk Radar operationalises what these mandate:**

| Standard | Issuing Body | Relevant Requirement |
|---|---|---|
| COSO ERM 2017 | COSO | Risk as "effect of uncertainty on the achievement of strategy and business objectives" |
| ISO 31000:2018 | ISO | Risk as "effect of uncertainty on objectives" — the definitional foundation |
| King IV / King V (2026) | IoDSA | Board must "govern risk in a way that supports the organisation in setting and achieving its strategic objectives" |
| OECD Principles of Corporate Governance (2023) | OECD/G20 | Board must provide strategic guidance and align risk management to corporate objectives |
| Basel III Governance Guidelines | BCBS | Risk Appetite Statement must link acceptable risk to strategic direction and performance objectives |
| ISO 55000 (Asset Management) | ISO | Strategic Asset Management Plan must bridge business strategy to asset-level decisions |
| Balanced Scorecard | Kaplan/Norton | Risk management integrated with strategic objectives across four performance perspectives |

King IV and King V are the most directly analogous to Risk Radar's position. King IV explicitly frames risk governance as support for strategic objective achievement — language that maps precisely onto True North and bearing. King V (effective for financial years beginning January 2026) extends the governance mandate to AI and cyber risk, which is directly relevant to Risk Radar's AI architecture.

The Basel III Risk Appetite Statement is the closest existing concept to True North in any governance standard. Boards in regulated financial institutions already understand the principle of defining acceptable risk bounds relative to strategic direction. Risk Radar generalises this concept across all sectors and makes it visual.

**Disclosure-led standards — boards are obligated to govern these risks but have no instrument for doing so:**

| Standard | Issuing Body | Board-Level Obligation |
|---|---|---|
| UK Corporate Governance Code 2024, Provision 29 | FRC | Board must monitor, manage, and report on risk management effectiveness |
| TCFD | Financial Stability Board | Board oversight of climate-related risks and opportunities; strategy disclosure |
| TNFD | TNFD Global | Board oversight of nature-related dependencies, impacts, risks and opportunities |
| IFRS S1 / S2 | ISSB | Governance processes for sustainability and climate-related risks disclosed in annual reports |
| CSRD | European Commission | Governance disclosure for ~49,000 European companies; board roles in sustainability oversight |
| GRI Standards (GRI 2) | GRI | Disclosure of board oversight of sustainability impacts |

These standards create a board obligation without providing a methodology. TCFD, TNFD, IFRS S1/S2, and CSRD all require boards to demonstrate governance of material risks — but each treats its category of risk (climate, nature, sustainability) in isolation. Risk Radar's integrated bearing model allows boards to show how these risks interact with financial, operational, and strategic forces to affect their overall direction of travel. It turns disclosure compliance into strategic insight rather than compliance theatre.

UK Corporate Governance Code 2024 Provision 29 is a specific and recent driver. It expanded the FRC's expectations for how boards demonstrate understanding and oversight of risk through monitoring, management, and reporting. It creates an explicit obligation that no existing ERM platform addresses at the level of strategic direction.

### 10.2 The Consistent Gap

Across all frameworks surveyed, five gaps appear consistently:

1. **No unified visual framework.** Governance codes mandate oversight but prescribe no instrument. Boards are left to assemble their own patchwork.

2. **No dynamic bearing assessment.** Standards operate on annual review and compliance cycles. Boards need continuous visibility into whether conditions since the last board meeting have shifted their strategic bearing.

3. **No objective-relative risk prioritisation.** Risk materiality is assessed in the abstract — against size, probability, and impact in general. A risk that is highly material to one strategic objective may be irrelevant to another. No standard addresses this. No existing platform surfaces causal chain leverage — which single risk node, if mitigated, collapses the most downstream consequence bearing. Risk Radar's correlation network model (Section 11.5) produces exactly this output.

4. **No operationalised cone of possibilities.** Shell scenario planning and horizon scanning exist, but they are workshop-based and periodic. No framework provides continuous, dynamically updated scenario bounds.

5. **No SWOT-to-bearing translation.** SWOT analysis is universally taught and widely used at board level, but it is never formally integrated with ERM. The result is that boards do two separate exercises — SWOT for strategy, risk register for governance — with no mechanism connecting them.

### 10.3 Commercial Positioning

Risk Radar is not another risk register competing with Archer, LogicGate, or Riskonnect. Those platforms are compliance documentation systems. Risk Radar is the missing front-end instrument for the strategic decision lifecycle — the point where option space is still open, assumptions are still challengeable, and the most consequential decisions are made with the least structured support.

The commercial entry point is boards and executive teams operating under one or more of the above disclosure obligations who need to demonstrate governance, not just document it. The standards create the demand. Risk Radar is the instrument that fulfils it.

---

# Part II — The Computation

*Part II covers how the conceptual model described in Part I is realised mathematically. It is intended for those designing or evaluating the technical architecture. The concepts here extend — and do not contradict — the instrument described in Part I.*

---

## 11. The Monte Carlo Simulation Architecture

### 11.1 Why Monte Carlo

The cone of possibilities is the instrument's most important visual claim. A hand-drawn cone communicates uncertainty in the abstract but cannot be challenged, calibrated, or compared across assessment cycles. A Monte Carlo cone is an emergent output: run N forward simulations from the current assessment state, plot the distribution of bearing positions at each future time horizon, and the cone boundary is the Nth percentile of that distribution. The cone becomes a testable claim rather than a sketch.

This also produces an audit trail. If an organisation consistently governs at P80 and actual outcomes fall within the cone 80% of the time, the model is well-calibrated. If actual outcomes fall outside the P80 boundary 40% of the time, either the volatility parameters are underfit or the edge weights are wrong. This gives the instrument a self-correcting mechanism over successive assessment cycles.

### 11.2 The Three-Regime Simulation Model

The simulation requires three distinct noise regimes, corresponding to three structurally different types of uncertainty. Using a single noise type for all three conflates phenomena that behave differently and require different governance responses.

**Regime 1 — Baseline Volatility**

Symmetric Gaussian noise applied to each KRI at every timestep. Models ordinary operational variation: the natural ebb and flow of indicators that are functioning within normal bounds. This regime widens the cone symmetrically. It is parameterised by a volatility rating (High / Medium / Low) elicited from the KRI owner and mapped to a standard deviation. It does not require historical data, though historical variance can be used for calibration where available.

Effect on the cone: widens it uniformly in all directions from the anchor point.

**Regime 2 — Shocks (Threats and Opportunities)**

Low-probability directional step-changes applied stochastically per simulation run. These correspond directly to the ontology's UNCERTAINTY subtypes:

- Threats → negative directional shocks, pulling bearing away from True North in a specific direction
- Opportunities → positive directional shocks, pulling bearing toward True North or opening new bearing options where capability exists to exploit them

Shocks are parameterised by probability (how likely per assessment cycle) and magnitude (how large the bearing displacement if triggered). Both can be elicited as High / Medium / Low and mapped to numeric values.

Effect on the cone: shocks create asymmetric tail risk. The cone is not a symmetric fan but a probability distribution that may be heavily skewed in the direction of the dominant threat portfolio. This is the correct behaviour — an organisation facing a concentrated threat in one strategic direction should see a cone that bulges in that direction, not a symmetric fan.

**Regime 3 — Active Deviations (Issues)**

Deterministic per-step bearing offsets applied when an ActiveDeviation record is present and unresolved. An Issue is a Threat whose probability has collapsed to 1: it has happened, it is ongoing, and it is deflecting bearing right now.

The critical distinction from the first two regimes is that an ActiveDeviation does not widen the cone — it moves where the centre of the cone is anchored. A board looking at the radar during an active crisis should see the bearing arrow itself displaced from True North, with the cone fanning out from that displaced position. The uncertainty about an Issue is not whether it is affecting bearing, but how long it persists and whether the linked actions are effective at resolving it.

An ActiveDeviation is closed — and its deterministic offset removed from the simulation — when the linked ACTION in the action register is marked complete and confirmed effective through OBSERVATION. This connects the simulation directly to the operational action register, giving the board a visible mechanism: resolve the Issue, watch the bearing arrow move back toward north.

Effect on the cone: shifts the anchor point of the entire cone. The cone width is unchanged by the Issue itself; the displacement from north is what changes.

### 11.3 The Two Sources of Bearing Arrow Width

With the Monte Carlo architecture in place, the bearing arrow carries uncertainty from two distinct sources that must be visually distinguished:

**Simulation spread** — the width of the probability distribution across N runs. This is epistemic uncertainty: the world is volatile, and the indicators driving bearing vary. It is driven by the volatility parameters in Regime 1 and the shock parameters in Regime 2. A wider spread means the bearing is genuinely uncertain because the underlying indicators are volatile.

**Data completeness** — the confidence multiplier from Section 6. Low completeness scores on the underlying assessment records widen this band independently of the simulation spread. It is evidentiary uncertainty: we do not have enough information to be confident in the bearing reading even before accounting for future volatility.

These must not be conflated. "The world is uncertain" and "we don't know enough about the world we are in" are different problems requiring different responses. The first is addressed by reducing exposure to volatile indicators. The second is addressed by improving data quality.

### 11.4 Edge Weight Calibration

For the simulation to produce a bearing that is more than a count of connected KRIs, the edges connecting KRIs to Objectives — and Objectives to each other — must carry weights encoding the strength of the causal relationship. An unweighted network assigns equal bearing force to every KRI regardless of its actual strategic importance, which is almost certainly wrong for any real organisation.

Edge weights require calibration at two levels:

**Within an Objective** — relative importance of each incoming KRI. Elicited from the objective owner using importance ratings (High / Medium / Low → 3 / 2 / 1) and normalised across the set. This prevents the "all KRIs equal" problem and ensures that a highly rated KRI contributes proportionally more to the Objective's bearing score than a monitoring indicator.

**Cross-Objective propagation** — strength of cascade from one Objective's bearing deviation to adjacent Objectives. The ontology's Propagation mechanism type (financial, reputational, capability, strategic alignment) provides the vocabulary for these weights. A financial cascade from Operations to Financial Management is a different relationship to a reputational cascade from Compliance to Corporate Communications, and the weights should reflect that difference.

The minimum viable approach is importance-rated weights elicited from data owners. Full calibration against historical outcome data is the aspirational state, reachable after two or more assessment cycles have produced a comparative record.

Within-tier edge weights (KRI to Objective, Objective to Objective) are structurally different from tier-to-tier edge weights. Tier-to-tier edges carry two distinct weights: a `materiality_weight` for bottom-up bearing aggregation and a `cascade_weight` for top-down True North propagation. These serve different purposes and must not be conflated. Section 13.3 defines both.

The within-tier network of risk-to-risk lateral edges is a separate structure from the tier-to-tier hierarchy. Its treatment — and the effect of that structure on simulation behaviour — is in Section 11.5.

### 11.5 The Risk Correlation Network

The three-regime simulation model in Sections 11.2–11.4 treats each shock event as an independent Bernoulli trial: threat T1 fires with probability p₁, threat T2 fires with probability p₂, and the two are statistically independent. This is computationally convenient but structurally false for most risk portfolios. In practice, risks share causal drivers, and the firing of one event changes the probability of others firing in the same assessment window.

A contractor insolvency raises the probability of programme delay, which raises the probability of a planning consent lapse, which triggers a contractual penalty clause. The Ofgem price review adversely decided raises the cost of capital, which raises the probability of debt refinancing stress. None of these relationships are captured in an independent-shock model, and the consequence is systematic underestimation of tail risk — the very region of the distribution where the percentile selector is most sensitive.

**The risk correlation network is a directed graph** whose nodes are the Regime 2 shock events and whose edges carry two parameters:

- `conditional_probability_delta` — how much the probability of the target node changes when the source node fires. Expressed as a signed delta: +0.15 means the target becomes 15 percentage points more likely; −0.10 means 10 points less likely (a threat that, if it fires, reduces the viability of a competing threat).
- `magnitude_scaling` — how much the target node's bearing displacement changes when the source node has fired. A regulatory adverse decision may increase the magnitude of a downstream financial shock because lenders reprice the regulatory environment, not just the event itself.

This is distinct from the tier-to-tier hierarchy. The tier graph is hierarchical: bearing aggregates upward and True North propagates downward. The risk correlation network is lateral: it connects shock events within a single tier's risk inventory to each other.

**In the Monte Carlo simulation**, the independent-draw model is replaced with a two-pass sampling procedure:

*Pass 1 — Draw the trigger set.* For each shock node in topological sort order (causes before effects), draw a Bernoulli trial. If the node's source predecessors have fired, apply their `conditional_probability_delta` values to adjust the base probability before drawing. The result is a consistent set of triggered events that respects the causal structure.

*Pass 2 — Apply bearing effects.* For each triggered event, compute its bearing displacement (base magnitude, scaled by any `magnitude_scaling` from fired predecessors), resolve the direction, and sum the vector contributions across all triggered events as in the independent model.

The output of this two-pass procedure is structurally identical to the independent model — a bearing position per simulation run — but the distribution it produces has a fatter tail on the side of the dominant causal chain. Events that share upstream causes cluster in the same simulation runs; they do not cancel each other out across independent draws.

**The board-visible consequence** is that the P80 and P90 gap widens relative to an independent model. Where the independent model might show P50 at 28° and P80 at 49°, the correlated model might show P50 at 30° and P80 at 63° — because the bad-tail scenarios contain multiple co-firing events that share a common trigger, not independent unlucky draws. The cone is visibly asymmetric and heavier in the direction of the dominant causal chain.

**Causal chain identification.** The risk correlation graph has a second board-level output beyond the cone shape: it surfaces the highest-impact causal pathways. A path analysis across the directed graph (computing expected bearing impact weighted by joint path probability) identifies which chains of events, if any single node in the chain were interrupted, would most reduce tail risk. This is the intervention leverage question: where in the causal network does a single action produce the greatest reduction in P80 bearing deviation?

This reframes the board's relationship to risk response. In an independent model, the question is "which individual risk do we mitigate?" In a network model, the question is "which node in the causal chain, if broken, collapses the most downstream tail risk?" The two answers are often different, and the network answer is typically more efficient: a single capability investment that addresses a common cause node simultaneously reduces the probability of multiple downstream consequence nodes.

**Practical elicitation.** Capturing a full correlation matrix is analytically demanding and typically produces unreliable estimates from practitioners who have not encountered the question before. Risk Radar uses a more tractable approach: for each risk, data owners are asked a single structured question — "if this risk materialises, which other risks on your register become significantly more or less likely?" — and the answers are encoded as directional edges with a qualitative weight (High / Medium / Low delta → 0.20 / 0.10 / 0.05). This is sufficient to reshape the tail of the distribution meaningfully without requiring precision that practitioners cannot provide.

The correlation network is elicited incrementally: a risk register with no edges is valid and falls back to the independent model. Edges are added as the organisation's understanding of its causal structure matures. The first assessment cycle establishes the independent baseline. Subsequent cycles layer in the relationships that the first cycle's outcomes revealed. This is consistent with the instrument's broader philosophy: structured judgement that improves with use, not precision that demands expertise the client does not yet have.

---

## 12. Risk Appetite as a Percentile Selector

### 12.1 The Percentile as Operationalised Appetite

The Monte Carlo simulation produces a distribution of bearing positions, not a single bearing. The board must choose which point in that distribution to navigate by. That choice is the formal expression of risk appetite — not as a label ("we are risk averse") but as a mechanical parameter that directly moves the bearing arrow the board sees on the radar.

At **P50**, the bearing arrow points to the median outcome. Half of simulated futures produce a worse bearing, half produce a better one. A risk-tolerant organisation is willing to navigate by the central expectation.

At **P80**, the bearing arrow points to the 80th percentile worst-case trajectory. The board is choosing to govern as if the bad tail were their actual heading. They are not predicting that outcome — they are electing to plan for it.

This mapping operationalises what ISO 31000 and COSO define as risk appetite in language that is precise, visible, and board-debatable. The percentile selector turns a policy statement ("we are conservative") into a number that visibly shifts the bearing arrow, forcing the question: *do you still want to take that strategic decision if the bearing is here rather than there?*

### 12.2 The Percentile Is a First-Class Instrument Control

The percentile selector is not a buried settings parameter. It sits alongside the scenario selector as an instrument-level governance decision that the board consciously owns and records. It is set once per assessment cycle and persists through all downstream bearing calculations. It can be changed mid-session to run what-if comparisons: "what does our bearing look like if we governed at P65 rather than P80 this cycle?"

Typical appetite profiles:

| Context | Percentile | Rationale |
|---|---|---|
| Growth-stage organisation, high tolerance | P50 | Navigate by the expected outcome; accept that half of futures are worse |
| Established entity, moderate tolerance | P65 | Some buffer against downside without overcorrecting |
| Regulated entity, conservative | P80 | Govern against the bad tail; required by some disclosure frameworks |
| Programme in delivery, irreversible commitments | P90 | Course error is costly and hard to reverse; high conservative margin |

### 12.3 Percentile Can Differ by Tier

A group board may govern at P80. A subsidiary in a growth market may govern at P60. A programme in delivery may govern at P90. The percentile is set per-tier without breaking the model — each tier runs its own simulation and selects its own percentile.

When a programme blip appears on the entity radar, the percentile the programme is using must be surfaced alongside the blip. A P90 programme bearing and a P50 programme bearing in the same entity radar are not comparable without that context. The entity board needs to know whether the programme director is being conservative or optimistic in what they are presenting as their position.

### 12.4 The Percentile Selector Requires Asymmetric Distributions to Be Meaningful

If the Monte Carlo distribution is symmetric — which pure Gaussian baseline volatility produces — then P50 and the mean are identical, and P80 is a fixed offset from P50 in all bearing directions equally. Selecting a higher percentile would then change how far the bearing is deflected but not which direction it is deflected toward.

For the percentile selector to produce meaningfully different *directional* bearings, the underlying distributions must be asymmetric. This requires the Regime 2 shock model to be active: directional threats must be represented as shocks that pull bearing in specific directions, not as symmetric noise. An organisation facing concentrated regulatory and cyber threats should have a distribution that skews in those bearing directions, so that a higher percentile selector moves the bearing arrow toward those specific threats — not just further from north in general.

The practical implication: the percentile selector has limited strategic value unless shock events are modelled with explicit direction. Baseline volatility alone is insufficient.

### 12.5 Calibration as a Self-Correcting Mechanism

The percentile model produces a testable claim. If an organisation consistently governs at P80 and actual outcomes fall within the P80 cone 80% of the time across successive assessment cycles, the model is well-calibrated for that organisation. If actual outcomes fall outside the boundary more frequently than the percentile implies, the volatility parameters or weights are underfit and must be revised.

This gives the board a governance mechanism that improves over time. The first assessment cycle establishes a baseline. Subsequent cycles compare predictions against outcomes and tighten the parameters. The instrument becomes more precise — and more trustworthy — with use.

---

## 13. Bidirectional Signal Flow Across Tiers

Risk Radar operates as a two-directional system. Bottom-up signal aggregation carries bearing information upward from work packages through programmes through entities to the group board. Top-down True North propagation carries strategic intent downward from the board through every subordinate tier. Both directions are required. A system that only aggregates upward is a reporting tool. A system that only propagates downward is a directive tool. Risk Radar is neither: it is a navigation instrument in which the destination and the current position continuously inform each other.

### 13.1 Bottom-Up Bearing Aggregation: The Mathematics

The naive approach to aggregating subordinate bearings — averaging them — is incorrect for two reasons.

**Reason 1: Bearings are angular quantities.** Arithmetic mean fails at the wrap-around boundary. The average of 359° and 1° computes as 180°, which is south — the opposite of where both bearings are pointing. The correct approach is the **circular mean**: convert each bearing to a unit vector in two-dimensional space (cos θ, sin θ), sum the vectors across all subordinate bearings, and recover the parent bearing as the angle of the resultant vector. This is standard directional statistics and produces a well-defined result for any set of bearings.

**Reason 2: Subordinate tiers are not equally weighted.** A £50m programme has more influence on the entity's bearing than a £500k work package. The aggregation must weight each subordinate bearing by its materiality before summing. The **weighted circular mean** is computed as:

```
R_x = Σ (w_i × cos θ_i)
R_y = Σ (w_i × sin θ_i)
parent_bearing = atan2(R_y, R_x)
```

where `w_i` is the materiality weight of subordinate `i` and `θ_i` is its bearing. Weights are normalised so they sum to 1. The materiality weight is elicited as a relative importance rating (budget, strategic dependency, or risk exposure — the organisation chooses its basis) and is stored on the downward edge from the parent tier node to the subordinate tier node.

**The third effect: circular standard deviation.** The spread of subordinate bearings contributes to the parent's cone width independently of any individual programme's simulation spread. If five programmes all point the same direction, the group bearing is confident. If they are scattered across 180°, the group bearing is highly uncertain regardless of how narrow each programme's individual cone is. The **circular standard deviation** of the subordinate bearing set is computed alongside the circular mean and added to the parent cone width as a distinct source of aggregate uncertainty. This is the correct propagation of strategic disagreement — or misalignment — upward through the tier structure.

### 13.2 Top-Down True North Propagation: The Cascade Mechanism

When a board-level strategic pivot occurs — an acquisition, a market exit, a material regulatory change, a shift in investor mandate — the true norths of all subordinate tiers must update. A programme that was on-bearing before the pivot may be pointing in the wrong direction after it, not because the programme's execution deteriorated, but because the destination moved. That distinction is critical: it determines whether the corrective action is governance (hold the programme accountable) or design (replan the programme for the new destination).

The propagation mechanism works as follows:

**Step 1 — A north cascade event originates at the parent tier.** The Group board updates its True North: the strategic bearing shifts by some number of degrees (or equivalently, the objective hierarchy is reweighted). The shift is expressed as a bearing delta: how many degrees has the destination moved, and in which direction.

**Step 2 — Each downward edge carries a `cascade_weight`.** This weight encodes how much of the parent's north change should flow through to this subordinate. A regulatory pivot might cascade at 0.9 to the Legal and Compliance entity and 0.15 to the Technology Transformation entity. A financial repositioning might cascade at 0.8 to the Commercial entity and 0.3 to the People entity. Cascade weights are set by the parent tier's owners and represent a governance decision about how tightly subordinate strategies should be bound to the parent's strategic direction.

**Step 3 — Each subordinate recomputes its True North** as a weighted blend of its prior True North and the incoming north delta:

```
new_north_i = prior_north_i + (cascade_weight_i × parent_north_delta)
```

This is not an override — it is an influence. A programme with a cascade weight of 0.6 receiving a 20° parent north shift will see its True North shift by 12°. A programme with a cascade weight of 0.1 receiving the same parent shift sees only 2°. The cascade weight gives the model political realism: not every top-level change propagates with equal force to every corner of the organisation.

**Step 4 — The propagation continues downward.** A recomputed Entity True North cascades to its Programmes with their own cascade weights; Programme True Norths cascade to their Work Packages. The full effect of a board-level pivot resolves through the tier hierarchy within a single propagation pass.

### 13.3 The Two-Weight Edge Model

The separation of `materiality_weight` and `cascade_weight` on every tier-to-tier edge is the structural consequence of the bidirectional model.

| Field | Direction | Purpose | Who sets it |
|---|---|---|---|
| `materiality_weight` | Bottom-up | Scales the subordinate's bearing in the parent's weighted circular mean | Parent tier owner (reflecting relative strategic importance) |
| `cascade_weight` | Top-down | Scales how much of the parent's north shift flows to this subordinate | Parent tier owner (reflecting strategic binding) |

These weights serve different purposes and should be elicited separately. A highly material programme (high `materiality_weight`) may be deliberately insulated from strategic pivots (low `cascade_weight`) because it is in late delivery and replanning would be more damaging than accepting some north misalignment for the remaining programme duration. Conversely, an early-stage work package may have low current materiality but high cascade weight because it is being designed now and must reflect the new north immediately.

Both weights are stored on the downward edge from parent to subordinate. The upward aggregation reads `materiality_weight`; the downward propagation reads `cascade_weight`.

### 13.4 Strategic Coherence as a Measurable Output

The two-directional flow produces a system-level output that no single-direction model can provide: **strategic coherence** — the degree to which all tiers at a given moment are pointing at the same north.

After a north cascade propagates, each subordinate tier's True North is knowable. The bearing of each subordinate is also knowable. The angle between each subordinate's bearing and its current True North is its individual bearing deviation. The spread of True Norths across subordinate tiers — before bearings are even considered — indicates how aligned the strategic frame is across the organisation.

A group board that has made three strategic pivots in two years, each cascading at different weights to different entities, may find that its subsidiaries are operating with materially different True Norths. That is not a simulation artefact — it is an accurate reflection of strategic fragmentation that was invisible until the cascade weights and tier-by-tier north values were made explicit.

Risk Radar makes strategic coherence a live, visible quantity at every board session rather than an assumption that is never verified.

### 13.5 Bearing Deviation vs True North Deviation

The board must be able to distinguish between two different alert conditions that can look similar on the radar:

**Bearing deviation** — the subordinate is pointed in the wrong direction relative to its own True North. The programme is not executing toward its stated objective. Corrective action is programme governance: replan, reprioritise, or escalate.

**True North deviation** — the subordinate's True North has drifted from the parent's True North because cascade weights have not fully transmitted the parent's strategic pivot. The programme may be executing well toward an objective that is no longer the right one. Corrective action is strategic redesign: restate the programme objective to align with the updated parent north.

Both conditions produce visible displacement on the radar, but they require fundamentally different responses. The instrument must surface which condition applies — and the two-weight edge model is what makes that diagnosis possible.

---

# Part III — Empirical Evidence from the Tier 0 Proof of Concepts

*Part III records the findings from the first two Tier 0 proof-of-concept implementations completed in June 2026: WEF.html (17 UN Sustainable Development Goals mapped against WEF 2026 Global Risk data) and Shell.html (Shell plc 9 principal risks across five Annual Reports, 2021–2025). These were single-file HTML/Canvas instruments, not production software. Their value is evidentiary: they are the first external test of the theoretical model against real data and real audiences.*

*Where the POC findings confirm the theoretical model, that confirmation is recorded. Where they contradict, qualify, or extend it, those findings take precedence over the theory. Building the instrument and observing how people actually engage with it is more reliable than predicting engagement from first principles.*

---

## 14. What the POCs Confirmed

### 14.1 The radar metaphor works at first contact

Every reviewer understood the instrument within seconds without instruction. True North, bearing deviation, blip proximity, and cone width all read intuitively. No reviewer asked what the degrees meant. Several asked immediately whether the instrument was pointing in the right direction. The central claim in Section 2 — that the output must be usable in the room where decisions are made, without explanation — held in practice.

This validates Assumption 1 in Section 9: senior decision makers can engage with the spatial metaphor without a literacy barrier.

### 14.2 Blips as navigable objects produce a qualitatively different cognitive response

Positioning individual risks as objects on a screen — rather than rows in a register — changed what reviewers did first. They scanned the radar before reading any text. The spatial relationship between adjacent blips surfaced causal intuition before any network diagram was opened: a cyberattack blip sitting visually proximate to an HSSE blip prompted the question "are those connected?" before the Risk Network tab was touched.

This is the practical confirmation of the radar metaphor claim in Section 4.2: bearing is a structured judgement, and the spatial rendering makes the structure legible without requiring the reviewer to read it.

### 14.3 The Risk Network tab was opened before the Analysis tab

In the Shell build, the panel tab sequence was Analysis / Risk Network / Decisions / Board Q&A. Every reviewer opened Risk Network first. This was the opposite of what a conventional risk report produces. The implication is significant and contradicts the implied hierarchy in the theoretical model: the causal network is not a supporting feature — it is the primary cognitive tool. The radar provides spatial intuition; the network provides the reasoning. The theoretical model in Sections 11.4 and 11.5 treats the correlation network as a computational backend. The POC evidence suggests it should be a primary front-end output.

### 14.4 History track on the outer ring is immediately read as accountability

The year labels on the outer ring — collapsing consecutive same-bearing years into range labels (e.g. "22–24") — were interpreted without explanation as "this risk has not moved in three years." That reading is directionally correct and precisely what the track is intended to convey. The follow-on question was consistent: "why has it not moved?" That question is the most valuable thing a board instrument can prompt, and a static risk register never produces it.

This validates the track history dimension in Section 5 — "accumulated bearing record" — and confirms it earns its place as a primary encoding dimension rather than a decorative feature.

### 14.5 Opportunities rendered north-west of True North worked geometrically without labelling

Positioning opportunity blips west of north — pulling toward the objective rather than deflecting from it — was understood spatially without colour or label. The visual grammar of the radar handles the threat/opportunity distinction directionally, which is more effective than the conventional approach of distinguishing them by row colour in a register.

This confirms the compass metaphor in Section 4.2: opportunities exert pull toward a bearing when capability exists. The geometry does the work.

### 14.6 ActiveDeviation records on the inner Now ring read correctly as confirmed, not probabilistic

The three Shell active issues positioned on the inner ring — Hague ruling appeal pending, process safety events up 43%, CSRD mandatory reporting — were immediately distinguished from the outer blips by every reviewer without instruction. The proximity to centre (the current position) communicated "this is happening now" without text. This validates the ActiveDeviation concept from Section 8 and the Regime 3 deterministic offset from Section 11.2: reviewers intuitively understood that these objects behave differently from the probabilistic blips on the outer rings.

### 14.7 The blade panel tab sequence maps to a real board session flow

The sequence Analysis / Network / Decisions / Board Q&A was not designed against a board session model — it emerged from implementation choices made on practical grounds. In retrospect it mirrors how a well-run board risk discussion actually progresses: current position → causal reasoning → route options → challenge questions. This alignment is a design finding worth preserving as a deliberate principle in the production instrument.

---

## 15. What the POCs Broke or Qualified

### 15.1 The aggregate bearing is visually authoritative regardless of how many caveats surround it

Both POCs used unweighted vector sums to produce the aggregate bearing: the WEF aggregate across 17 SDGs and the Shell aggregate across 9 principal risks. Both included explicit caveats in the blade panel noting the aggregate was unweighted and directional only.

Reviewers read the bearing number first. The caveat was noted last, if at all. The number on the canvas is visually authoritative in a way that text in a panel is not — and it carries the false authority of precision regardless of how the text qualifies it.

This is a material conflict with the instrument's stated commitment in Section 6 to honest, confidence-scaled outputs. The theoretical model's solution — the confidence multiplier from data completeness, narrowing or widening the bearing arrow — is correct but insufficient on its own. The aggregate bearing number needs to either carry a visible uncertainty band or be suppressed entirely until a defensible weighting methodology is applied. Displaying an unweighted aggregate to a board is arguably more misleading than displaying no aggregate at all.

The practical resolution: the aggregate bearing should only be displayed when at least two conditions are met — a weighting methodology has been defined and approved by the assessment owner, and the confidence-band rendering clearly distinguishes the weighted mean from the uncertainty envelope. This is technically achievable through the weighted circular mean (Section 13.1) and the two-source bearing arrow width (Section 11.3), but both need to be implemented before the aggregate is presented to a board audience.

### 15.2 The tool mirrors its source data — it cannot challenge it

Both POCs were built entirely from publicly disclosed data: Shell.html from Shell's own Annual Reports; WEF.html from WEF's own risk rankings. In both cases the instrument is an accurate and structured presentation of what the source organisation chose to say about itself. It cannot, by design, surface what the organisation chose not to say.

The persona review against a Shell Non-Executive Director produced the sharpest finding: the blade panel confirmed management's narrative. A Board-facing tool that only reflects management input is a compliance artefact, not a strategic instrument. The NED's role is to challenge management, not to receive a structured presentation of management's own view.

This is a structural limitation of the data architecture, not a visual design problem. The theoretical model addresses data quality in Section 6 through completeness scoring, but completeness is about how thoroughly the data has been entered — not about whether the data is independent of the management view being assessed. These are different problems.

The resolution requires independent data streams alongside management-provided data. For a listed company like Shell, these exist: analyst consensus on risk severity, regulatory findings, litigation outcomes, competitor disclosures, ESG rating agency assessments. For internal programme use, they are peer reviews, internal audit findings, and third-party assessments. The confidence tier system is the mechanism for distinguishing management-disclosed from independently verified data — but this only works if independent data is actually in the model. The Mode 1 AI (Section 7) needs an explicit responsibility to flag when the data model contains only management-provided inputs and no independent triangulation.

### 15.3 Confidence tiers are insufficiently prominent in the visual design

In the Shell build, confidence tiers appear as small text badges (High / Medium / Low) in the blade panel. On the radar canvas, a Low-confidence blip and a High-confidence blip are visually identical in size, opacity, and rendering.

This is architecturally dishonest. The theoretical model in Section 6 describes confidence as a multiplier that narrows or widens the bearing arrow. That design is correct. It was not implemented in the POC, and the gap between what the theory says and what the POC shows is instructive: a visually prominent confidence signal on the canvas is a production requirement, not a nice-to-have.

The minimum viable implementation: Low-confidence blips rendered with significantly reduced opacity or with a dashed boundary, so that a board looking at the radar can immediately distinguish what is known from what is inferred. The confidence band on the bearing arrow (narrow = high confidence, wide = low confidence) is the aggregate expression of this principle at the level of the overall bearing.

### 15.4 Velocity is entirely absent from both builds

The theoretical model in Section 4.2 describes bearing as "strategic velocity — direction plus magnitude." Neither POC achieves this. The history track shows where a bearing has been at discrete points, but it does not show how fast it is moving or whether it is accelerating.

The Shell POC exposed this gap sharply: process safety events went from 63 to 90 Tier 1+2 events in one year, a 43% increase. The bearing for the HSSE blip moved from 38° to 35° — a marginal improvement — because the SIF-F personal safety metric improved over the same period, partially offsetting the process safety deterioration. A KRI that moved 43% in one year is behaviourally different from one that has been stable for five years at the same absolute value, and the radar does not distinguish between them.

Rate of change is the most decision-relevant signal in a dynamic risk environment: it tells the board whether a situation is self-correcting or self-reinforcing before the bearing value itself moves enough to trigger governance attention.

The resolution requires a new field on every blip: `trend`, expressing the direction and pace of change at the KRI level. The visual encoding on the canvas should reflect this — a velocity indicator or trail showing not just where the blip is but whether it is accelerating toward or away from True North. This is distinct from the history track, which records discrete historical positions. The trend indicator is a forward-looking signal derived from the rate of change of the most recent two or three assessment cycles.

### 15.5 The tool speaks to risk experts, not decision makers

The Shell build was persona-reviewed against four audiences: Non-Executive Director, Institutional Investor, Group Risk Officer, and Energy Transition Analyst. The instrument served the Risk Officer most effectively — the taxonomy was correct, the causal chains were real, the data sources were cited. It failed the other three personas for different reasons:

- **NED:** received management's narrative, not a challenge to it.
- **Investor:** no financial translation — no earnings at risk, no NAV sensitivity, no dividend stress test. The bearing deviation has no financial consequence attached to it.
- **Analyst:** the tool uses the organisation's own framing throughout, with no independent triangulation. An analyst would use it as a primary source, not an assessment.

The theoretical model targets "board and C-suite" as primary customers (Section 5). The POC evidence shows the product currently serves the risk function that operates one level below that audience. The gap is not in the visual design or the data model — it is in the translation layer between risk language and decision language. A bearing of +42° east is a risk expert's description. A board member needs to know what it means for their strategic choices. An investor needs to know what it means for their position.

The resolution is an explicit persona translation layer in the blade panel — a "what this means for your decision" section that contextualises the bearing reading for the specific governance role of the person looking at it. The Mode 2 AI (Section 7) is the natural engine for this: it already has the responsibility to answer natural language questions about bearing and its causes. Extending it to answer "what does this mean for my role" is a natural scope addition.

### 15.6 The data entry problem is materially larger than the theory assumes

Section 8 identifies data entry as "the primary integration mechanism" and acknowledges the dependency on internal data owners. The POC experience sharpened this considerably. Populating Shell.html required reading approximately 400 pages of Annual Report material across five years to generate 12 blips, 3 active issues, 4 causal chains, and 9 KRIs. That is not a data entry problem — it is a research problem.

For a production instrument serving a live board, this cost is prohibitive if repeated each assessment cycle. The solution that emerged from the POC experience is structural: the Annual Report — or its internal equivalent, the organisation's own strategic and risk documentation — becomes the ingestion source, not a reference for manual entry.

The Annual Report boot sequence works as follows: the organisation's own documents (Annual Reports, Board Papers, Risk Committee minutes, strategic plans) are passed to the Claude API or equivalent with a structured extraction prompt calibrated to the Risk Radar data model. The AI produces a draft data object — blips, bearings, confidence tiers, causal links, source citations — in minutes. A human review step validates and locks each extracted data point to its source passage. Approved data enters the radar pre-loaded and source-traceable. The confidence tier is automatic: audited KPI from a financial statement = High; disclosed qualitative language from the risk section = Medium; contextual inference from narrative prose = Low.

This architecture is not a post-launch feature. It is the practical resolution to a data problem that makes the production instrument viable. Without it, the data entry cost ensures the tool is populated once, at onboarding, and not maintained. The Mode 1 AI (Section 7) needs to be extended beyond its current definition — data quality coaching — to include document ingestion and structured extraction as a primary function.

### 15.7 The decision layer exists as text but does not interact with the radar

The theoretical model in Section 9 describes a two-layer instrument: radar for situational awareness, decision branches for route planning. The Shell Decisions tab implements this in minimal form — three route options with projected bearing shifts displayed as text.

The decision simulation does not interact with the canvas. Selecting a decision route does not move any blips, redraw the cone, or show the projected bearing on the radar. The decision layer is a panel, not a navigation instrument. The theoretical model in Section 4 promises more than the POC delivers on this dimension.

The production instrument requires the decision layer to be visually integrated with the radar: selecting a decision option should overlay a projected cone on the canvas, showing the new bearing that would result if that route were taken, alongside the current bearing cone, so the two can be compared spatially. This is the "route planning layer" described in the concept — candidate routes visible as overlays on the situational awareness layer. Without that visual integration, the Decisions tab is a text panel that happens to be next to a radar rather than a decision simulation instrument.

---

## 16. Structural Revisions to the Model

The POC findings require four revisions to the theoretical model. These are not corrections to errors in the theory — the theory is sound. They are extensions and prioritisation changes that the empirical evidence demands.

### 16.1 The causal network is co-equal with the radar, not a backend computation

The theoretical model treats the risk correlation network (Section 11.5) as a computational backend — it shapes the simulation's tail distribution and surfaces intervention leverage points. The POC evidence shows that the network is the first thing reviewers engage with at the front end. Reframing: the network is not an input to the simulation that happens to be explorable. It is a primary instrument output that shapes how the board understands the radar in front of them.

The architectural consequence: the Risk Network tab should be the default open panel when the blade opens, not the Analysis tab. The network view should be directly linked to the canvas — clicking a blip on the radar should highlight that node's connections in the network panel simultaneously. The network and the radar are two representations of the same model, and the interface should make that relationship explicit.

### 16.2 Independent data is a first-day product requirement

The theoretical model's data architecture assumes that data quality is the primary variable: complete, well-evidenced data produces a trustworthy bearing. The POC evidence adds a second dimension: even complete, well-evidenced management data cannot serve the board's challenge function because it reflects management's own view. Independence of data sources is as important as completeness of data entry, and it is not addressed in the current theoretical model.

Revision: the confidence tier system must distinguish four states, not three:
- **Verified** — independently audited or externally confirmed (e.g. statutory audit, regulator finding, third-party assessment)
- **Disclosed** — management-disclosed in a formal document (Annual Report, Board Paper, regulatory submission)
- **Asserted** — management-provided without formal disclosure (workshop input, internal assessment)
- **Inferred** — contextual derivation by the AI from available evidence

The visual encoding must make these distinctions legible on the canvas. A Verified blip and an Inferred blip should look demonstrably different to a board member scanning the radar. This replaces the binary High/Medium/Low confidence tier with a four-state provenance model that is more honest about the nature of the evidence behind each blip.

### 16.3 Velocity requires a new field and new visual encoding at the blip level

The theoretical model describes bearing as direction plus magnitude but has no mechanism for encoding rate of change at the individual blip level. The history track records positions at discrete time points. That is not velocity — it is a position history.

Revision: every blip requires a `trend` field expressing rate of change over the most recent two or three assessment cycles. The values are: `accelerating_toward_north`, `stable`, `decelerating_toward_north`, `accelerating_away_from_north`, `decelerating_away_from_north`. The visual encoding should render this as a directional indicator on the blip — a short trailing vector showing not just where the blip is but whether it is moving toward or away from True North and at what rate.

This is distinct from the projected track (forward-looking, from the Monte Carlo simulation) and from the history track (backward-looking position record). The trend indicator is a first-derivative signal derived from recent history, designed to trigger governance attention before the bearing value itself moves enough to cross a threshold.

### 16.4 The Annual Report boot sequence is the data architecture

The practical resolution to the data entry problem (Section 15.6) reframes how the Mode 1 AI is defined. In the current theoretical model (Section 7), Mode 1 is a data quality coach: it interrogates existing records and raises completeness. That is correct but incomplete. The first-time data population problem — which the POC exposed as requiring a research-scale effort for even a single organisation — is not solved by a quality coach. It requires a document parser.

Revision: Mode 1 AI has two sub-modes.

**Mode 1a — Document Ingestion.** On first engagement with a client organisation, the AI reads the organisation's own strategic and risk documents (Annual Reports, Board Papers, Risk Committee minutes, strategic plans) and produces a draft Risk Radar data model: blips positioned by bearing and range derived from disclosed severity language, causal links drawn from disclosed interdependency statements, KRIs populated from disclosed performance tables, confidence tiers assigned automatically by source type. Human review validates and locks each extraction with its source citation.

**Mode 1b — Data Quality Coach.** In subsequent assessment cycles, the AI compares the current data model against the new document set, identifies what has changed, proposes updates, and flags where previously High-confidence data has not been refreshed and should be revalidated.

The confidence tier assignment is automatic in Mode 1a: externally audited data (statutory accounts, assurance statements) = Verified; formally disclosed data (Annual Report risk section, regulatory submissions) = Disclosed; workshop or interview data = Asserted; AI inference from narrative = Inferred. This makes the provenance model in Section 16.2 operationally tractable — the tier is set by the extraction source, not manually entered.

---

## 17. What Has Not Changed

The following propositions from the theoretical model survive the POC experience without revision.

**True North is non-negotiable.** Without a defined strategic objective, the bearing is meaningless. Both POCs confirmed this: the tool is only coherent when the destination is explicit. Any prospective client who cannot or will not define True North cannot use the instrument. This is not a limitation — it is a diagnostic.

**Qualitative inputs (H/M/L) are sufficient and more defensible than numerical scoring.** No POC reviewer asked for percentages or asked how a degree value was computed. Several noted the High/Medium/Low severity language as more credible than numerical scoring because it does not claim precision that the underlying data cannot support. The argument in Section 2 — "structured judgement, not measurement" — held in practice.

**The market gap is real.** Neither POC surfaced a competing instrument that integrates situational awareness, causal network, and decision simulation in a single board-level visual output. The gap identified in Section 10 remains open. No existing ERM platform, scenario planning tool, or governance framework closes it.

**COSO ERM 2017 and ISO 31000:2018 alignment is genuine and creates real demand.** Both frameworks mandate objective-led risk management. Both leave the same implementation gap. The standards create a governance obligation that Risk Radar is structurally positioned to fulfil. The Section 10 standards survey confirmed this across more than twenty frameworks.

**The four-tier architecture is the right scope.** The Tier 0 POCs (WEF and Shell operating at the equivalent of a group board level) confirmed that the board-level visual is the right entry point. Tiers 1–3 as the data supply chain that makes the board instrument credible is the correct design priority sequence. Build the board instrument first. The lower tiers follow.

**The instrument is only as trustworthy as the data behind it — and that must be visible.** This principle (Section 6) was not just confirmed by the POCs; it was the dominant concern raised by every persona reviewer. The mechanism for making data trustworthiness visible — confidence tiers, provenance encoding, bearing arrow width — is more important in the production instrument than any visual enhancement to the radar itself.

---

*Part III added June 2026 following completion of WEF.html and Shell.html Tier 0 proof-of-concept implementations.*
