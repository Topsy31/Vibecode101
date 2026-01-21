# Adversarial Editor Skill

name: adversarial-editor
description: Rigorous challenge of document claims and recommendations. Use when stress-testing reports, proposals, strategies, or any professional documentation for defensibility. Attacks assumptions, logic, evidence, and recommendations from multiple hostile perspectives. Produces vulnerability assessment with suggested defences.

---

## Purpose

This skill performs aggressive adversarial review of professional documentation as if preparing for hostile scrutiny from clients, stakeholders, regulators, or competitors. It assumes your work will be read by critics looking for weaknesses and ensures every claim can withstand rigorous challenge.

## Invocation

Use this skill when:
- A document draft is complete and needs stress-testing
- Preparing for client presentation or board review
- Ensuring recommendations are defensible before submission
- Identifying where hedging, evidence, or acknowledgment of limitations is needed
- Reviewing proposals, reports, strategies, or advisory documents

---

## Attack Framework

The adversarial editor cycles through **eight hostile perspectives**, each examining the text for different vulnerabilities. Select perspectives relevant to your document type.

### Core Perspectives (Always Consider)

#### Perspective 1: The Sceptical Client
**Stance:** "Why should I pay for this? What's the actual value?"

**Attack vectors:**
- Value proposition weakness (recommendations are obvious or generic)
- Cost-benefit gaps (proposed solutions don't justify the investment)
- Relevance questions (analysis doesn't address our actual problems)
- Actionability concerns (recommendations are too vague to implement)
- Uniqueness challenge (we could have got this from anyone)

**Typical challenges:**
- "This reads like a template. Where's the insight specific to our situation?"
- "You've described the problem beautifully but the solution is hand-wavy"
- "What's the ROI? Show me the numbers"
- "We already knew this. What are we paying you for?"

#### Perspective 2: The Hostile Stakeholder
**Stance:** "This threatens my position/budget/team"

**Attack vectors:**
- Political blindness (recommendations ignore organisational realities)
- Winner/loser dynamics (who benefits, who loses from these recommendations?)
- Implementation sabotage potential (will affected parties cooperate?)
- Historical ignorance (we tried this before and it failed)
- Scope creep accusations (consultant expanding their remit)

**Typical challenges:**
- "Easy for an outsider to recommend—you don't have to live with the consequences"
- "This completely ignores why we structured things this way in the first place"
- "You've spoken to the wrong people. The real story is different"
- "This is a solution looking for a problem"

#### Perspective 3: The Legal/Compliance Reviewer
**Stance:** "This could expose us to liability"

**Attack vectors:**
- Regulatory compliance gaps (recommendations may violate regulations)
- Liability creation (advice that could cause harm if followed)
- Documentation inadequacy (insufficient audit trail)
- Disclaimer absence (where's the limitation of liability?)
- Confidentiality concerns (does this reveal sensitive information?)

**Typical challenges:**
- "Have you considered GDPR/FCA/HSE implications?"
- "If we follow this advice and it goes wrong, who's responsible?"
- "This needs to be reviewed by legal before it goes anywhere"
- "You can't make this claim without evidence to back it up in court"

#### Perspective 4: The Finance Director
**Stance:** "The numbers don't add up"

**Attack vectors:**
- Assumption fragility (financial projections based on optimistic assumptions)
- Hidden costs (implementation, maintenance, opportunity costs ignored)
- Baseline manipulation (comparing against unrealistic alternatives)
- Timeframe cherry-picking (ROI looks good only in year 5)
- Risk quantification absence (what's the downside scenario?)

**Typical challenges:**
- "Your assumptions are heroic. What if volumes are 30% lower?"
- "You've costed the solution but not the transition"
- "Where's the sensitivity analysis?"
- "This doesn't account for the cost of doing nothing changing over time"

### Consultancy-Specific Perspectives

#### Perspective 5: The Incumbent Competitor
**Stance:** "This consultant doesn't understand our domain"

**Attack vectors:**
- Domain expertise gaps (generic frameworks applied without sector knowledge)
- Best practice naivety (what works elsewhere won't work here)
- Relationship blindness (ignoring existing vendor/partner dynamics)
- Technology fashion-following (recommending trendy solutions over proven ones)
- Oversimplification (complex problems given simplistic solutions)

**Typical challenges:**
- "They clearly don't understand how this industry actually works"
- "This is textbook stuff—no appreciation of the nuances"
- "They're recommending [technology X] because it's fashionable, not because it fits"
- "A generalist consultant can't match our 20 years in this sector"

#### Perspective 6: The Implementation Realist
**Stance:** "This will never actually happen"

**Attack vectors:**
- Resource blindness (who's going to do this work?)
- Change fatigue ignorance (organisation already overwhelmed)
- Dependency underestimation (this requires things outside our control)
- Timeline fantasy (proposed schedule is unrealistic)
- Capability gaps (we don't have the skills to execute this)

**Typical challenges:**
- "Beautiful strategy, but we don't have the people to deliver it"
- "You're assuming a level of organisational maturity we don't have"
- "This depends on [department X] cooperating, which they won't"
- "The timeline assumes everything goes perfectly. Nothing ever does"

#### Perspective 7: The Board Member
**Stance:** "What's the strategic significance?"

**Attack vectors:**
- Strategic disconnect (recommendations don't align with stated strategy)
- Governance concerns (proper oversight and accountability unclear)
- Reputation risk (how does this affect our standing?)
- Stakeholder impact (shareholders, customers, employees, community)
- Long-term thinking absence (short-term fix, long-term problem?)

**Typical challenges:**
- "How does this fit with our five-year strategy?"
- "What are the reputational implications if this goes wrong?"
- "Have we considered the impact on our key stakeholders?"
- "This solves today's problem but creates tomorrow's"

#### Perspective 8: The Academic Critic
**Stance:** "The methodology is flawed"

**Attack vectors:**
- Evidence weakness (claims not supported by data)
- Logical fallacies (correlation/causation, survivorship bias, etc.)
- Sample bias (interviewed the wrong people, cherry-picked examples)
- Framework misapplication (using tools inappropriately)
- Citation absence (assertions without sources)

**Typical challenges:**
- "You've interviewed 5 people and drawn conclusions about 5,000"
- "This correlation doesn't prove causation"
- "Your framework assumes conditions that don't apply here"
- "Where's the evidence for this claim?"

---

## Attack Categories

For each piece of content, examine:

### 1. Factual Claims
- Statistics, metrics, benchmarks, dates
- Can each be independently verified?
- Are sources cited and accessible?

### 2. Logical Arguments
- Does the conclusion follow from the premises?
- Are there hidden assumptions?
- Are there logical fallacies (post hoc, appeal to authority, false dichotomy)?

### 3. Recommendations
- Are they specific and actionable?
- Do they address the stated problem?
- Are alternatives considered and rejected with reasoning?

### 4. Projections & Forecasts
- What would falsify the projection?
- Are assumptions explicit and reasonable?
- Are confidence levels appropriate?

### 5. Methodological Claims
- Can the approach be scrutinised?
- Are limitations acknowledged?
- Is the scope clearly defined?

### 6. Authority Claims
- Does the author/firm have standing to make this claim?
- Is relevant expertise demonstrated?
- Are limitations of expertise acknowledged?

### 7. Commercial Claims
- Are value propositions substantiated?
- Are cost estimates realistic and complete?
- Are timelines achievable?

---

## Output Format

For each vulnerability identified, provide:

```
## [VULNERABILITY ID]: [Brief Title]

**Location:** [Section/Page/Paragraph reference]

**Claim Under Attack:**
> [Exact quote from text]

**Attacking Perspective:** [Which perspective(s)]

**The Attack:**
[Steel-manned hostile argument against the claim]

**Severity:** [CRITICAL / HIGH / MEDIUM / LOW]
- CRITICAL: Claim is indefensible as written, requires removal or fundamental revision
- HIGH: Claim is vulnerable to obvious counterargument, requires strengthening
- MEDIUM: Claim could be challenged by informed critic, hedging advisable
- LOW: Claim is defensible but could be misread, clarification advisable

**Attack Type:** [Factual / Logical / Recommendation / Projection / Methodological / Authority / Commercial]

**Suggested Defence:**
[How to strengthen, hedge, or defend the claim]

**Defence Category:**
- EVIDENCE: Add supporting data, citations, or examples
- HEDGE: Soften absolute claims with appropriate uncertainty
- ACKNOWLEDGE: Explicitly note the limitation in text
- REFRAME: Change the claim to something more defensible
- REMOVE: Delete indefensible claim
- ACCEPT: Acknowledge vulnerability but retain claim (explain why)
```

---

## Procedure

When invoked on a document:

1. **Read the full document** for context
2. **Identify the document type** (proposal, report, strategy, advisory, etc.)
3. **Select relevant perspectives** based on likely audience and critics
4. **Identify all claims** (factual, logical, recommendations, projections, methodological, authority, commercial)
5. **For each claim, cycle through selected perspectives** asking: "How would this critic attack?"
6. **Rate severity** based on how obvious and damaging the attack would be
7. **Propose defence** that either strengthens the claim or appropriately hedges it
8. **Compile vulnerability report** sorted by severity
9. **Summarise** overall defensibility and critical fixes needed

---

## Severity Guidelines

**CRITICAL vulnerabilities** (must fix before submission):
- Factual errors that can be proven false
- Logical contradictions within the document
- Recommendations that contradict stated objectives
- Projections presented as certainties without evidence
- Claims that could create legal/regulatory liability

**HIGH vulnerabilities** (strongly recommend fixing):
- Claims that informed reviewers would immediately challenge
- Missing obvious counterarguments or alternatives
- Recommendations without clear rationale
- Cost/benefit claims without supporting evidence
- Methodology that can't withstand scrutiny

**MEDIUM vulnerabilities** (recommend addressing):
- Claims that could be misread by unsympathetic readers
- Arguments that work but have stronger forms available
- Examples that don't fully support the claims they illustrate
- Hedging that's present but insufficient

**LOW vulnerabilities** (consider addressing):
- Stylistic choices that might irritate senior reviewers
- Claims that are defensible but could be clearer
- Missing qualifications that sophisticated readers would expect

---

## Document-Type Guidance

### Proposals & Pitches
**Priority perspectives:** Sceptical Client, Finance Director, Incumbent Competitor
**Key vulnerabilities:** Value proposition, differentiation, pricing justification

### Strategy Documents
**Priority perspectives:** Board Member, Implementation Realist, Hostile Stakeholder
**Key vulnerabilities:** Strategic alignment, feasibility, political acceptability

### Due Diligence Reports
**Priority perspectives:** Legal/Compliance, Finance Director, Academic Critic
**Key vulnerabilities:** Evidence quality, risk identification, methodology rigour

### Advisory Reports
**Priority perspectives:** Sceptical Client, Academic Critic, Implementation Realist
**Key vulnerabilities:** Actionability, evidence base, practical feasibility

### Policy Documents
**Priority perspectives:** Legal/Compliance, Board Member, Hostile Stakeholder
**Key vulnerabilities:** Regulatory compliance, governance, stakeholder impact

---

## Common Consultancy Vulnerabilities

### The "So What?" Problem
Analysis is thorough but recommendations are weak or obvious.
**Defence:** Ensure every insight leads to a specific, non-obvious action.

### The Template Trap
Document feels generic, not tailored to the specific client.
**Defence:** Reference client-specific context, data, and constraints throughout.

### The Assumption Cascade
Conclusions depend on unstated assumptions that may not hold.
**Defence:** Make assumptions explicit; show sensitivity to key variables.

### The Implementation Gap
Recommendations ignore organisational capacity to execute.
**Defence:** Include realistic resource requirements and capability assessments.

### The Evidence Vacuum
Claims made without supporting data or sources.
**Defence:** Cite sources; acknowledge where evidence is limited.

### The Political Blindspot
Recommendations ignore who wins and loses from changes.
**Defence:** Explicitly address stakeholder impact and change management.

---

## Skill Limitations

This skill identifies vulnerabilities but cannot:
- Guarantee all weaknesses are found
- Determine which vulnerabilities are acceptable to retain
- Make final decisions about claim retention vs. removal
- Provide domain expertise the author lacks
- Predict how specific individuals will react

The author must ultimately decide:
- Which vulnerabilities to address
- Which to accept and acknowledge
- Which to accept and leave unaddressed
- Whether the overall defensibility meets professional standards

---

## Invocation Examples

```
Run the adversarial-editor skill on the client proposal.
```

```
Use adversarial-editor to stress-test the recommendations section, focusing on the Finance Director and Implementation Realist perspectives.
```

```
Apply adversarial review to the executive summary before the board presentation.
```

```
Run adversarial-editor on this strategy document with priority on political feasibility.
```

```
Review this due diligence report from the Legal/Compliance perspective.
```
