

# Plan: Add AI Vision & Future Roadmap Slide

## Overview

Create a new slide (Slide 16) titled **"The AI-Powered Future"** that showcases Comply365's current and future AI capabilities, positions the "Operational Intelligence Layer" as the AI story, and explores the journey to becoming an AI-first company including domain rebranding suggestions.

---

## Slide Concept

### Title
**"The AI-Powered Future"**

### Subtitle
*"From Operational Intelligence Layer to AI Company — the journey ahead"*

### Core Narrative
This slide positions the existing "Operational Intelligence Layer" (Slide 3: Detect → Trigger → Orchestrate → Prove) as the foundational AI story, then shows how AI capabilities evolve across the Performance Ladder stages, culminating in a vision of Comply365 as an AI-first company.

---

## Visual Layout (Two-Column Design)

### Left Column: AI Evolution Journey

A vertical timeline showing AI capability maturity aligned with the Performance Ladder:

| Stage | AI Capability | Description |
|-------|---------------|-------------|
| **Today** (Stage 3-4) | Embedded Intelligence | Pattern detection, recommended actions, governance-aware automation |
| **Near-term** (Stage 4-5) | Predictive Operations | Weak signal detection, proactive interventions, risk forecasting |
| **Future** (Stage 5+) | Agentic Reliability | Autonomous orchestration, human-in-the-loop exceptions, continuous proof |

Each stage shows:
- Current capability status (Active / In Development / Vision)
- Key AI features enabled at that stage
- Connection to the Performance Ladder journey

### Right Column: The AI Story & Brand Evolution

**The Operational Intelligence Layer IS the AI Story**
- Visual callback to the Detect → Trigger → Orchestrate → Prove model
- Shows how AI is embedded at each stage (not bolted on)

**Domain Rebranding Exploration**
A card component showing domain alternatives with pros/cons:

| Domain | Positioning | Notes |
|--------|-------------|-------|
| **comply365.ai** | AI-first signal | Clear AI company positioning, modern, memorable |
| **comply.ai** | Premium AI brand | Shorter, cleaner, but less brand continuity |
| **c365.ai** | Concise AI identifier | Tech-forward, may lose brand recognition |
| **Keep comply365.com** | Stability | Established brand equity, add AI messaging layer |

---

## Interactive Elements

1. **AI Capability Cards**: Click to expand details on each AI stage
2. **Domain Selector**: Interactive cards showing hover states with pros/cons
3. **Narration Sync**: Cards animate in sequence with voiceover progress

---

## Narration Script (for ElevenLabs "George" voice)

```text
"Let's talk about the future — and how Comply three six five becomes an AI company.

The foundation is already in place. The Operational Intelligence Layer — Detect, Trigger, Orchestrate, Prove — isn't just a workflow model. It's an AI model. Every stage is powered by embedded intelligence that learns from operational data, detects patterns, and recommends actions.

Today, we're at Stage Three and Four capability. AI detects weak signals from FOQA, ASAP, and crew reports. It recommends prioritised interventions. It assists with change execution and ensures governance-aware automation.

Near-term — Stage Four to Five — we move to predictive operations. AI identifies risks before they become incidents. Proactive interventions replace reactive firefighting. Forecasting models compress decision cycles.

The future is Stage Five and beyond: Agentic Reliability. AI handles routine orchestration autonomously. Humans govern exceptions. Continuous proof is generated automatically. Reliability becomes embedded — not enforced.

This positions Comply three six five as more than a platform company. It positions us as an AI company.

Should the brand reflect this? Consider: comply three six five dot AI. A clear signal that intelligence is core to what we do. Or comply dot AI — shorter, premium, unmistakably AI-first. Or keep comply three six five dot com and layer the AI story through the Operational Intelligence positioning.

The domain is a choice. But the direction is clear. The Operational Intelligence Layer is our AI story. And this journey — from embedded intelligence to agentic reliability — is how we take customers up the Performance Ladder and position Comply three six five as a leader in AI-powered operational performance."
```

---

## Files to Create/Update

| File | Action | Description |
|------|--------|-------------|
| `src/components/slides/SlideAIVision.tsx` | **Create** | New slide component |
| `src/pages/SlideDeck.tsx` | **Update** | Add import, update slides array, add component to render |
| `src/components/slides/Slide0Title.tsx` | **Update** | Add slide 16 to agenda items |
| `src/data/slideNarration.ts` | **Update** | Add narration script for slide 16 |
| `src/hooks/useSimpleNarration.ts` | **Update** | Update preload limit from 15 to 16 |

---

## Technical Implementation

### SlideAIVision.tsx Component Structure

```typescript
// Key data structures

const aiStages = [
  {
    id: "today",
    label: "Today",
    stage: "Stage 3-4",
    status: "Active",
    title: "Embedded Intelligence",
    capabilities: [
      "Pattern detection from operational signals",
      "Recommended actions with governance awareness",
      "Assisted drafting and execution",
      "Audit trail generation"
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "nearterm",
    label: "Near-term",
    stage: "Stage 4-5",
    status: "In Development",
    title: "Predictive Operations",
    capabilities: [
      "Weak signal detection before incidents",
      "Proactive intervention recommendations",
      "Risk forecasting models",
      "Compressed decision cycles"
    ],
    color: "from-cyan-400 to-teal-400"
  },
  {
    id: "future",
    label: "Future",
    stage: "Stage 5+",
    status: "Vision",
    title: "Agentic Reliability",
    capabilities: [
      "Autonomous orchestration of routine tasks",
      "Human-in-the-loop exception handling",
      "Continuous automated proof generation",
      "Self-optimizing operational workflows"
    ],
    color: "from-teal-400 to-emerald-400"
  }
];

const domainOptions = [
  {
    domain: "comply365.ai",
    position: "AI-First Signal",
    pros: ["Clear AI company positioning", "Modern and memorable", "Brand continuity"],
    cons: ["Requires domain acquisition", "Migration effort"],
    recommended: true
  },
  {
    domain: "comply.ai",
    position: "Premium AI Brand",
    pros: ["Shorter, cleaner", "Premium positioning"],
    cons: ["Less brand continuity", "May be unavailable"],
    recommended: false
  },
  {
    domain: "c365.ai",
    position: "Tech-Forward",
    pros: ["Concise", "Modern tech aesthetic"],
    cons: ["May lose brand recognition", "Less intuitive"],
    recommended: false
  },
  {
    domain: "comply365.com + AI layer",
    position: "Stability",
    pros: ["Established equity", "No migration", "Lower risk"],
    cons: ["Doesn't signal AI shift", "Messaging-only change"],
    recommended: false
  }
];
```

### Layout Components

1. **AI Evolution Timeline**: Vertical timeline with expandable cards
2. **Domain Options Grid**: 2x2 grid of domain cards with hover states
3. **Intelligence Layer Callback**: Small visual reference to Slide 3 operating model

### Narration Sync Timing

```typescript
const aiStageTimings = [
  { index: 0, startPercent: 15 },  // Today
  { index: 1, startPercent: 35 },  // Near-term
  { index: 2, startPercent: 55 },  // Future
];

const domainTimings = [
  { startPercent: 75 }  // Domain discussion
];
```

---

## Updated Slide Structure

| # | Slide | Notes |
|---|-------|-------|
| 0-12 | Main deck | Core positioning |
| 13 | Category: Excellence | Alternative |
| 14 | Category: Orchestration | Alternative |
| 15 | Category: Assurance | Alternative |
| **16** | **AI Vision & Future** | **NEW: AI company positioning** |

---

## Summary

| Metric | Count |
|--------|-------|
| New files | 1 |
| Files modified | 4 |
| New narration script | 1 (~45 seconds) |
| Total slides after | 17 |

This slide ties together the existing Operational Intelligence Layer positioning with a forward-looking AI vision, demonstrates the customer journey up the Performance Ladder through AI capability evolution, and opens discussion on brand positioning to signal Comply365's AI-first future.

