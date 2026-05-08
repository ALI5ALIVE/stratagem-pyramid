## Add a "Signals 101" Playbook

A new sales-enablement playbook that teaches the team **what signals are and why they matter** — using the same slide-deck pattern as the existing DTOP, Insights, Automation, and Mobile playbooks.

### Route & entry points
- New route: `/signals-playbook`
- Add a card to **HomePage › Capabilities** section (alongside DTOP, Insights, Automation, Mobile playbooks)
- Add to `AppSidebar` capability nav

### Deck structure (10 slides)

```
0. Title — "Signals 101: From Noise to Action"
1. Why this matters — the signal age of aviation; ops have data, not signals
2. What is a signal? — plain-English definition, signal vs event vs alert vs metric
3. Where signals come from — the four operational domains (Ops, Content, Safety, Training)
4. The signal lifecycle — raw data → signal → trigger → action → proof (maps to DTOP)
5. Strong vs weak signals — examples; why weak signals matter most (precursors)
6. Use case 1 — Safety: the 12,000 unread signals
7. Use case 2 — Operations: OCC noise → next-best-action
8. Use case 3 — Content: when a signal changes the manual
9. Why Comply365 — Systems of Record + CoAnalyst (~90% vs ~35%) + DTOP
10. Talk track & objections — "isn't this just alerts?", "we already have dashboards"
```

Source material reused from `src/pages/events/SignalsEventBrief.tsx` (master theme, taglines, departments, terms to use/avoid) and existing DTOP/CoAnalyst memory.

### Files to create

- `src/data/signalsPlaybook.ts` — data structures (definition, signal types, lifecycle steps, use cases, objections, terminology guardrails)
- `src/components/signals-slides/` — 11 slide components following the DTOP slide pattern:
  - `SIGSlide0Title.tsx`
  - `SIGSlide1WhyMatters.tsx`
  - `SIGSlide2WhatIsSignal.tsx`
  - `SIGSlide3SignalSources.tsx`
  - `SIGSlide4Lifecycle.tsx` (Detect → Trigger → Orchestrate → Prove color coding)
  - `SIGSlide5StrongVsWeak.tsx`
  - `SIGSlide6UseCaseSafety.tsx`
  - `SIGSlide7UseCaseOps.tsx`
  - `SIGSlide8UseCaseContent.tsx`
  - `SIGSlide9WhyComply365.tsx`
  - `SIGSlide10Closing.tsx`
- `src/pages/SignalsPlaybook.tsx` — deck shell mirroring `DTOPPlaybook.tsx` (scroll-snap, slide registration, progress bar)

### Files to edit

- `src/App.tsx` — register `/signals-playbook` route
- `src/pages/HomePage.tsx` — add Signals Playbook card to Capabilities grid (icon: `Radio` or `Activity`, badge: `11 slides`)
- `src/components/AppSidebar.tsx` — add to `capabilityItems`

### Design conventions (per memory)
- Dark theme, h-screen slide containers, asymmetrical padding
- DTOP color coding on lifecycle slide (D blue · T amber · O violet · P emerald)
- Approved terms only: "signals", "Generative AI", "Recommended Actions", "Operational Data". Avoid FOQA/FDM/ASAP, "AI copilot", "single pane of glass"
- Reuse `PitchSlideContainer` / existing slide layout primitives
- CoAnalyst headline framing: ~90% domain accuracy vs ~35% generic AI

### Out of scope (this iteration)
- Narration/voiceover (can be added later via `src/data/...Narration.ts` + `useSimpleNarration`)
- Quiz / Academy module integration
- PPTX export
- New backend tables
