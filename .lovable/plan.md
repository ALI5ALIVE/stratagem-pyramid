

# Align Use Case Slides to Strategy Deck Format

## Problem
The strategy deck's "Use Cases in Action" (SlideUseCases.tsx) presents each use case as a **vertical DTOP flow** with colored left-border timeline steps (Signal Detected → Action Triggered → Change Orchestrated → Outcome Proven). The tech and ops deck use case slides use a different pattern — horizontal accordion cards with inline pill badges for the DTOP chain. This inconsistency breaks the visual narrative.

## Target Format (from SlideUseCases.tsx)
Each use case is a card with:
- Icon + title header
- Vertical left-border timeline: 4 colored steps (Detect = primary, Trigger = accent, Orchestrate = cyan, Prove = emerald)
- Each step has a dot, uppercase label, headline text, and expandable description
- Cards arranged in a column or responsive grid
- DTOP legend bar at the top
- Bottom callout

## Slides to Refactor

### 1. `TechSlide10SafetyUseCases.tsx` (3 safety use cases)
- Replace accordion expand/collapse with vertical DTOP timeline cards
- Map `platformMechanism` split parts to the 4 DTOP steps
- Use the same colored left-border + dot pattern as strategy deck
- Layout: 3 cards in a row (grid-cols-3)

### 2. `TechSlide11OpsUseCases.tsx` (4 ops use cases)
- Same refactor — replace 2x2 grid of accordion buttons with vertical DTOP timeline cards
- Layout: 2x2 grid (grid-cols-2) since there are 4 cases

### 3. `TechSlide12FinancialUseCases.tsx` (1 insurance use case + summary)
- Refactor the insurance deep-dive card to use the vertical DTOP timeline format
- Keep the revenue protection summary cards at the bottom

### 4. `OpsSlide6NearTermUseCases.tsx` (4 near-term use cases)
- Already has D/T/O/P labels but uses a compact inline format
- Refactor to match the vertical left-border timeline pattern
- Layout: 2x2 grid (grid-cols-2)

## Visual Pattern Applied to Each Card
```text
┌─────────────────────────────┐
│  [Icon]  Use Case Title     │
│                             │
│  ● Signal Detected          │
│  │ Headline text            │
│  │ Description...           │
│  │                          │
│  ● Action Triggered         │
│  │ Headline text            │
│  │ Description...           │
│  │                          │
│  ● Change Orchestrated      │
│  │ Headline text            │
│  │ Deliverable badge        │
│  │                          │
│  ● Outcome Proven           │
│    Headline text            │
│    [Metric badge]           │
└─────────────────────────────┘
```

## Data Mapping
For tech slides (using `lineOfSightData`):
- **Detect**: First part of `platformMechanism` split + `description`
- **Trigger**: Second part of `platformMechanism`
- **Orchestrate**: Third part + `costComponents` as context
- **Prove**: Fourth part + annual cost as metric badge

For ops slide (using local `useCaseCards` data):
- Already has `detect`, `trigger`, `orchestrate`, `prove` fields — just restyle them

## What Stays the Same
- DTOP legend bar at the top of each slide
- Bottom callout text
- Click-to-expand behavior (collapsed shows just headlines, expanded shows descriptions)
- The `SalesSlideContainer` wrapper
- `TechSlide13LineOfSight` (ROI model) — different purpose, not a use case slide

