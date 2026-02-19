# Delphi Tool - Implementation Plan

## Overview

A facilitator-driven Delphi method tool for systematic risk identification, with email-based expert participation and integration with the CoffeeCup Risk Register.

---

## Requirements Summary

### User Model
- **Hybrid approach**: Facilitator manages the process; experts participate via email
- No backend server required
- Experts receive self-contained HTML questionnaire files via email
- Experts complete in browser, return results to facilitator
- Facilitator ingests responses into the main tool

### Data & Persistence
- **File export/import**: Save/load JSON files for portability
- localStorage for active session
- Configurable scoring scales (1-5, 1-10, percentage, or custom)
- Configurable number of rounds per study

### Integration
- **Risk Register integration**: Export final consensus as JSON matching Risk Register schema
- Support the existing Risk Register data model (id, name, description, owner, type, likelihood, impactCost, impactTime)

### Deliverables
- Prioritised risk list
- Full analysis report (convergence charts, outlier analysis, round progression)
- Risk Register import format

---

## Architecture

### Two-Component Design

```
┌─────────────────────────────────────────────────────────────────┐
│                    FACILITATOR TOOL                              │
│                  (CoffeeCup/Delphi/index.html)                   │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Study   │  │  Expert  │  │ Response │  │    Analysis &    │ │
│  │  Setup   │→ │Generator │→ │ Ingestion│→ │     Reports      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│       │              │              ↑              │             │
│       ↓              ↓              │              ↓             │
│  [Save Study]  [Download HTML]  [Paste/Load]  [Export to Risk   │
│                                               Register JSON]     │
└─────────────────────────────────────────────────────────────────┘
                       │
                       ↓ (email attachment)
┌─────────────────────────────────────────────────────────────────┐
│                 EXPERT QUESTIONNAIRE                             │
│              (Self-contained HTML file)                          │
│                                                                  │
│  • Opens in any browser                                          │
│  • Displays round context (previous consensus if Round 2+)       │
│  • Expert completes risk assessments                             │
│  • Generates response code (Base64 JSON)                         │
│  • Expert copies code and emails back to facilitator             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Facilitator Tool Features

### 1. Study Setup
- Create new Delphi study with:
  - Study name and description
  - Problem statement / risk context
  - Scoring scale configuration (Likert 1-5, 1-10, percentage, or custom)
  - Number of planned rounds
  - Expert list (names/codes for tracking, anonymous to each other)

### 2. Round Management
- **Round 1 (Identification)**:
  - Open-ended questions for risk identification
  - Option to seed with predefined risk categories
  - Experts suggest risks + initial probability/impact scores

- **Round 2+ (Refinement)**:
  - Show aggregated results from previous round (mean, median, IQR)
  - Experts revise their assessments
  - Flag outliers for reconsideration
  - Continue until consensus or stability

### 3. Questionnaire Generator
- Generate self-contained HTML file per round
- Embed:
  - Study context and instructions
  - Previous round summary (for rounds 2+)
  - Risk items to assess
  - Scoring interface matching configured scale
  - Comment/rationale fields
- Output: Downloadable HTML file to email to experts

### 4. Response Ingestion
- Paste expert's response code (Base64 JSON)
- Or load response JSON file
- Validate and associate with expert code
- Track which experts have responded per round

### 5. Analysis Dashboard
- **Per-round statistics**: Mean, median, mode, standard deviation, IQR
- **Convergence tracking**: How opinions are narrowing across rounds
- **Outlier detection**: Highlight divergent views (potential weak signals)
- **Consensus indicators**: Configurable threshold (e.g., 70% within ±1 point)
- **Visualisations**:
  - Box plots per risk item
  - Convergence line charts across rounds
  - Heat map of expert responses

### 6. Final Report & Export
- **Prioritised risk list**: Ranked by consensus risk score (P × I)
- **Full analysis report**: Round-by-round progression, outlier analysis
- **Risk Register export**: JSON matching the schema:
  ```json
  {
    "risks": [
      {
        "id": "R001",
        "name": "Risk name from Delphi",
        "description": "Combined expert descriptions",
        "owner": "",
        "type": "threat",
        "included": true,
        "likelihood": 65,
        "impactCost": { "min": 0, "likely": 0, "max": 0 },
        "impactTime": { "min": 0, "likely": 0, "max": 0 },
        "actionName": "",
        "actionDescription": "",
        "postLikelihood": 65,
        "postImpactCost": { "min": 0, "likely": 0, "max": 0 },
        "postImpactTime": { "min": 0, "likely": 0, "max": 0 }
      }
    ]
  }
  ```

---

## Expert Questionnaire Features

### Self-Contained HTML File
- No server required - works offline
- Embedded CSS following CoffeeCup design system
- Clean, simple interface focused on the task

### Content Sections
1. **Header**: Study name, round number, instructions
2. **Context**: Problem statement, previous round summary (if applicable)
3. **Risk Assessment Form**:
   - For each risk: probability slider/input, impact slider/input, confidence level, comments
   - Round 1: Option to suggest new risks
4. **Submit Section**:
   - Generate response code button
   - Displays Base64-encoded JSON
   - Copy button for easy transfer
   - Instructions to email back to facilitator

### Response Format
```json
{
  "studyId": "uuid",
  "roundNumber": 1,
  "expertCode": "E001",
  "timestamp": "2026-01-30T...",
  "responses": [
    {
      "riskId": "RISK001",
      "probability": 70,
      "impact": 4,
      "confidence": "high",
      "comment": "Based on similar projects..."
    }
  ],
  "suggestedRisks": [
    {
      "name": "New risk identified",
      "description": "...",
      "initialProbability": 50,
      "initialImpact": 3
    }
  ]
}
```

---

## Data Model

### Study Object
```json
{
  "id": "uuid",
  "name": "Project X Risk Assessment",
  "description": "Identifying risks for...",
  "problemStatement": "What risks could impact...",
  "createdAt": "2026-01-30T...",
  "status": "active|completed",
  "config": {
    "probabilityScale": { "min": 0, "max": 100, "type": "percentage" },
    "impactScale": { "min": 1, "max": 5, "type": "likert", "labels": ["Very Low", "Low", "Medium", "High", "Very High"] },
    "plannedRounds": 3,
    "consensusThreshold": 0.7
  },
  "experts": [
    { "code": "E001", "name": "Expert 1 (internal reference)" }
  ],
  "rounds": [
    {
      "number": 1,
      "status": "complete|in-progress|pending",
      "risks": [...],
      "responses": [...],
      "summary": { "generatedAt": "...", "statistics": {...} }
    }
  ],
  "finalConsensus": null
}
```

---

## File Structure

```
CoffeeCup/
├── Delphi/
│   ├── index.html          # Facilitator tool (main application)
│   └── plan.md             # This plan document
├── Risk/
│   └── index.html          # Existing Risk Register
└── CLAUDE.md               # Updated with Delphi addition
```

---

## Implementation Steps

### Phase 1: Core Facilitator Tool
1. Create `CoffeeCup/Delphi/index.html` with CoffeeCup design system
2. Implement study setup form (name, description, scales, experts)
3. Implement risk item management (add/edit/remove risks)
4. Build localStorage persistence with JSON export/import

### Phase 2: Questionnaire Generator
5. Build HTML template generator for expert questionnaires
6. Implement round context embedding (previous results for round 2+)
7. Add download functionality for generated HTML files

### Phase 3: Response Handling
8. Build response code parser (Base64 JSON decoder)
9. Implement response ingestion and validation
10. Track expert participation per round

### Phase 4: Analysis & Visualisation
11. Implement statistical calculations (mean, median, IQR, std dev)
12. Build convergence tracking across rounds
13. Add outlier detection algorithm
14. Create visualisations (box plots, line charts, heat maps)

### Phase 5: Export & Integration
15. Implement prioritised risk list generation
16. Build full analysis report export
17. Create Risk Register JSON export matching schema
18. Test import into Risk Register tool

---

## Verification

1. **Create a test study** with 3 mock experts and 5 sample risks
2. **Generate Round 1 questionnaire** and verify HTML opens correctly in browser
3. **Simulate expert responses** by completing the questionnaire and generating response codes
4. **Ingest responses** and verify statistics calculate correctly
5. **Generate Round 2 questionnaire** with previous round summary embedded
6. **Complete full cycle** through to consensus
7. **Export to Risk Register format** and verify import into Risk Register tool works

---

## Technology Stack

- React 18 via CDN
- Tailwind CSS via CDN
- Babel Standalone for JSX
- Google Fonts (DM Sans, JetBrains Mono)
- CoffeeCup 4-theme system
- localStorage + JSON file export/import
- No backend required
