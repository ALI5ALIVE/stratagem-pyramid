## Goal

Equip reps in Week 3 (Sell & Win) to walk into any Comply365 account — whether they own one, two or three of the core apps — and confidently:
1. Map the customer's current footprint
2. Sell the missing pieces with tailored discovery questions
3. Paint the platform vision (DTOP across all three apps + CoAnalyst)
4. Quantify the value already captured vs the value still on the table

## What's added

A new **Week 3 sub-track: "Customer Footprint Scenarios"** — 6 new slides inserted into the Sales Enablement deck immediately after `se-usecase-cheatsheet` and before `se-slide-regmgmt`. Also surfaced as its own Academy specialist module so reps can revisit it standalone.

### New slides (in order)

1. **SEFootprintIntro** — "Where is the customer today?"
   - 2x2 / Venn-style visual showing 7 possible footprints (S, C, T, S+C, S+T, C+T, S+C+T)
   - Quick stat: % of base in each footprint (placeholder, you confirm)
   - Coach line: "Your job is never to sell what they have. It's to sell what they're missing — and the loop they can't close without it."

2. **SEFootprintSingleApp** — "They have ONE app"
   - Three columns (S only / C only / T only), each with:
     - What they're getting today (1-line value captured)
     - What's broken without the other two (the loop that can't close)
     - 3 discovery questions to open the cross-sell
     - The "left on the table" number (e.g. Safety only → no closed-loop training, ~40% of recurrent issues stay recurrent)

3. **SEFootprintTwoApps** — "They have TWO apps"
   - Three columns (S+C / S+T / C+T), same structure
   - Emphasis: "Two apps gets you a half-loop. The third closes it."
   - Discovery questions specifically for the missing third

4. **SEFootprintAllThree** — "They have all THREE — now sell the platform"
   - The vision pivot: apps → platform (CoAnalyst, Insights, Automation, Mobile)
   - "You've bought the instruments. Now buy the conductor."
   - Discovery questions for intelligence layer adoption
   - DTOP loop fully lit up vs partially lit up (visual)

5. **SEFootprintValueLadder** — "Value captured vs value on the table"
   - Horizontal bar / ladder visual: 1 app = ~25% of platform value, 2 apps = ~55%, 3 apps = ~75%, 3 apps + CoAnalyst/Automation = 100%
   - Pillar breakdown (Controllable Cost, Systemic Risk, Line-of-Sight) at each rung
   - Coach line: "Never present this as 'you're missing X%.' Present it as 'here's the loop you can't close yet.'"

6. **SEFootprintPlaybook** — "The 3-move footprint play"
   - Move 1: Audit the footprint in discovery (3 questions)
   - Move 2: Name the broken loop out loud
   - Move 3: Anchor the next purchase to the loop, not the product
   - Mini role-play prompt + transition into Regulation Management use case

### Narration

Add 6 new entries to `src/data/salesEnablementNarration.ts` following the established 5-part coach script standard (Why → Core message → Pain → Value pivot → How to deliver → Transition). ~60–90s per slide. Reuses ElevenLabs "George" voice, no new audio config needed.

### Deck registration

Update `src/pages/SalesEnablement.tsx`:
- Import the 6 new components
- Insert them in the slides array between `se-usecase-cheatsheet` and `se-slide-regmgmt`
- Update `weekProps.w3.upNext` to include "Footprint scenarios" and bump `estimatedMinutes` from 14 → ~22

### Academy specialist module (optional second surface)

One migration to add a new `academy_modules` row:
- `id: 'm-footprint'`
- `module_number: 12`, `track: 'specialist'`, `accent_color: 'sky'`
- `estimated_minutes: 8`
- `slide_ids`: the 6 new slide ids
- Plus 4 quiz questions in `academy_questions` (footprint identification, missing-loop naming, discovery question recall, value ladder positioning)

Reps can take it as part of the Week 3 flow OR standalone from the Academy.

## Out of scope

- No changes to existing W3 slides (`SEDiscoveryToClose`, `SEUseCaseCheatSheet`, `SEObjections`, `SEClosingForReps`)
- No changes to W1/W2 content
- No new product positioning — uses existing pillars (Controllable Cost, Systemic Risk, Line-of-Sight) and existing DTOP framing
- No PPTX exporter updates (these are enablement-only slides, not customer-facing)

## Open questions before I build

1. **Value ladder percentages** — I've sketched 25 / 55 / 75 / 100. Want me to use those as illustrative (with a "directional, not contractual" disclaimer per the pitch-deck disclaimer memory) or do you have firmer numbers from Line of Sight?
2. **Footprint mix data** — the intro slide ideally cites % of current base in each footprint. Use placeholder ("~X% of base") or omit until you supply real numbers?
3. **Single combined slide vs three columns** — for the "one app" and "two apps" slides, do you prefer one dense slide with three columns each (6 slides total as planned), or split into 6 slides per scenario (one app per slide, 13 slides total)? My recommendation is the dense version — fewer slides, easier to scan, and each scenario gets equal coach airtime.
