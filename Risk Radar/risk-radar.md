# Risk Radar — Philosophical Underpinning

*This document captures the conceptual foundations of Risk Radar: what it is, why it exists, what assumptions it rests on, and what it explicitly does not claim to be. It is the document to challenge before anything is built.*

*It is organised in two parts. Part I covers the instrument — the problem, the central claim, the mental model, the architecture, and the assumptions. Part II covers the computation — how the conceptual model is realised mathematically, including simulation, risk appetite, and bidirectional signal flow. Readers who want to understand what Risk Radar is should read Part I. Readers who want to understand how it works should continue into Part II.*

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

**External driver** — threats and uncertainties in the environment. A hostile regulatory environment, a volatile supply chain, a technology disruption that could arrive at any of several time horizons. These widen the cone from outside.

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

The AI operates in two distinct modes and must not be confused between them.

**Mode 1 — Data Quality Coach (upstream, with internal data owners)**

The AI works with the people who own risks, actions, and capabilities to maximise the quality and completeness of the data before any board-level assessment. It does not fill in gaps — it asks the questions that prompt owners to fill them. It challenges capability ratings unsupported by action register evidence. It identifies risks without parent uncertainty records. It flags assumptions that have not been recorded against objectives. It produces a completeness score per record and per assessment cycle.

The AI in Mode 1 is the structured interrogator of the data, not of the decision makers. Its output is a data set that can be trusted — not perfect, but transparently incomplete where gaps remain.

**Mode 2 — Board Navigator (downstream, with decision makers)**

Once an assessment meets the minimum completeness threshold, the AI shifts role entirely. It becomes the decision maker's navigator — answering natural language questions about bearing and its causes, surfacing the chain of evidence behind any blip, simulating the bearing consequences of decision branches, and flagging KRIs trending in the wrong direction since the last assessment.

Every Mode 2 answer carries three elements: context (what is happening and why), confidence (how reliable is this reading), and call to action (what would need to change to shift the bearing). The AI never presents a conclusion without its evidence chain. The board can always drill into the reasoning behind any statement.

The AI does not make strategic decisions. It maximises the context available to the people who do.

---

## 8. The Ontological Foundation

Risk Radar adopts the RiskLeap Risk Ontology (Loopnut Consultoria Ltda, March 2026) as its vocabulary, with extensions for the directional model.

The core distinction the ontology establishes — and which conventional ERM conflates — is between UNCERTAINTY (the condition that exists: the cause layer) and RISK (the effect of that condition on a specific objective: the consequence layer). A skills gap is an uncertainty. The bearing deflection that skills gap causes on the talent and culture objective is a risk. One uncertainty can produce multiple risks across multiple objectives. This is where cascade effects originate.

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

3. **No objective-relative risk prioritisation.** Risk materiality is assessed in the abstract — against size, probability, and impact in general. A risk that is highly material to one strategic objective may be irrelevant to another. No standard addresses this.

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
