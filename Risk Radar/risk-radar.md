# Risk Radar — Philosophical Underpinning

*This document captures the conceptual foundations of Risk Radar: what it is, why it exists, what assumptions it rests on, and what it explicitly does not claim to be. It is the document to challenge before anything is built.*

---

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

### 4.2 Bearing

Given a defined True North, the current bearing is the direction the organisation is actually travelling — the vector sum of all the forces acting on it. Strengths and aligned capabilities push toward north. Threats and capability gaps push away from it. Opportunities pull toward their bearing if the organisation has the capability to respond; if it does not, they are visible on the radar but exert little force.

Bearing is expressed as degrees of deviation from True North. Zero degrees means the organisation is pointed directly at its strategic destination. Thirty degrees east means it is drifting, and the AI can tell you which forces are responsible for that drift and how much each one is contributing.

Bearing is a structured judgement, not a measurement. It is only as reliable as the data and reasoning behind it. The instrument makes that reliability visible — through the confidence band on the bearing arrow and the reasoning chain available on demand.

### 4.3 The Cone of Possibilities

The cone represents the range of plausible futures, widening with time and uncertainty. It is the honest representation of what strategic planning actually involves: not a single predicted outcome, but a bounded space of futures within which the organisation is trying to navigate.

The cone has two drivers:

**External driver** — threats and uncertainties in the environment. A hostile regulatory environment, a volatile supply chain, a technology disruption that could arrive at any of several time horizons. These widen the cone from outside.

**Internal driver** — the fragility of the assumptions underlying the strategic objectives themselves. An objective that rests on an unconfirmed budget assumption, an unratified regulatory requirement, or a market forecast with low confidence has a wider cone than one resting on evidenced, confirmed assumptions. This is the driver most commonly missed by conventional ERM.

The cone narrows in two situations: when assumptions are confirmed and uncertainties resolve (standard foresight logic), and when irreversible commitments are made that close off alternative futures. The second is critical for construction and capital programmes — digging a tunnel narrows the cone regardless of how uncertain the environment remains.

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

Risk Radar extends the ontology with four concepts the original does not contain:

- **BearingForce** — the directional encoding (0–359° relative to True North, magnitude, force type) that transforms a consequence model into a navigation instrument
- **Propagation** — the cross-tier cascade mechanism, with mechanism type (financial, reputational, capability, strategic alignment) and direction (upward or downward)
- **CommitmentCone** — the narrowing cone for programme-level irreversibility, distinct from the widening foresight cone
- **OrganisationalBearingArrow** — the weighted vector sum of all blip forces as a single directional output at each tier

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

The alignment with COSO ERM 2017 and ISO 31000:2018 provides both regulatory relevance and methodological foundation. Both frameworks were updated specifically to connect risk management to strategic objectives — and both have been widely adopted while widely criticised for failing to achieve that connection in practice. Risk Radar provides the practical instrument both frameworks demand but neither provides.

The commercial positioning is consequently distinctive: this is not another risk register competing with Archer or LogicGate. It is the missing front-end instrument for the strategic decision lifecycle — the point where option space is still open, assumptions are still challengeable, and the most consequential decisions are made with the least structured support.
