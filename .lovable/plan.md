

# Fix Cost Figure Consistency — Align Narration to $110M Data

## The Problem
The slide UI dynamically calculates the total from `lineOfSightData.ts` use cases, which sums to **~$110.4M**. But narration scripts across all three decks reference outdated figures ("$47M", "forty million"). The ExecSlide5Value component also has a hardcoded "$40M+".

## Computed Breakdown
- UC1 Go-Arounds: 12 × $15K × 12 = $2.16M
- UC2 AOG: 8 × $300K × 12 = $28.8M
- UC3 Delays: 45 × $140 × 365 = $2.3M
- UC4 Fuel: 3.2 × $12.5M × 1 = $40M
- UC5 Injuries: 4 × $135K × 4 = $2.16M
- UC6 Fines: 5 × $400K × 1 = $2M
- UC7 Insurance: 6 × $5.5M × 1 = $33M
- UC8 Baggage: 6.5 × $225 × 12 = $17.6K
- **Total: ~$110.4M**

The cost avoidance figure (used elsewhere) applies a 0.3 scale factor → **~$33M**. However the "Problem" slide shows the full exposure ($110.4M), not the avoidance.

## Changes Required

### 1. Executive Pitch Narration (`src/data/executivePitchNarration.ts`)
- **Slide 1 title**: "The $47M Problem" → "The $110M Problem"
- **Slide 1 script**: "Forty-seven million" → "One hundred and ten million"
- **Slide 6 script**: "exceeds forty million" → "exceeds one hundred million" (this references total exposure, not scaled avoidance)

### 2. Operational Pitch Narration (`src/data/operationalPitchNarration.ts`)
- **Slide 2 script**: "exceeds forty million" → "exceeds one hundred million"

### 3. Technical Pitch Narration (`src/data/technicalPitchNarration.ts`)
- **Slide 16 (Outcomes) script**: "exceeding forty million" → "exceeding one hundred million"

### 4. ExecSlide5Value component (`src/components/exec-slides/ExecSlide5Value.tsx`)
- Hardcoded "$40M+" → dynamically compute from `useCases` data (same pattern as ExecSlide1Problem), or update to "$110M+" to match the total exposure figure

### Note on "cost avoidance" vs "total exposure"
- The **Problem slide** shows total annual exposure ($110M) — the cost of doing nothing
- The **Value/Outcomes slides** should reference the **avoidance opportunity** — a fraction of that (commonly 30%, ~$33M)
- Will use "over thirty million" for avoidance references and "over one hundred million" for total exposure references, keeping both defensible

### Revised avoidance references
- Exec Slide 6: "the total cost avoidance opportunity exceeds thirty million dollars annually"
- Ops Slide 9 / Tech Slide 16: same — "thirty million" for avoidance
- ExecSlide5Value: "$33M+" (dynamically computed)

