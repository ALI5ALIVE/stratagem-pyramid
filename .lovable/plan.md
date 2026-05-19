## Goal

Rewrite the Week 2 Sales Enablement narration scripts so each script (a) accurately describes the slide it plays on, and (b) ends with a transition that names the *actual* next slide in the deck. No slide order changes, no visual changes.

## Current Week 2 slide order (from `src/pages/SalesEnablement.tsx`)

1. `se-week-2` — Week 2 divider
2. `se-week-2-overview` — The Platform (map)
3. `se-platform-insights-intelligence` — Platform · Insights & Intelligence
4. `se-platform-wide-intelligence-usecases` — Intelligence & Insights · Platform-Wide Use Cases
5. `se-slide-coanalyst` — Intelligence Layer
6. `se-slide-coanalyst-usecases` — Intelligence & Insights · Per-Solution Use Cases
7. `se-slide-insights` — Insights
8. `se-slide-insights-usecases` — Recommendations & Prescriptive Actions · Use Cases
9. `se-slide-automation` — Automation
10. `se-slide-automation-usecases` — Automation · Use Cases
11. `se-slide-tiers-vs-ai` — Intelligence Layer vs Generic AI
12. `se-slide-regmgmt` — Regulation Management Use Case
13. `se-slide-mobile` — Unified Mobile
14. `se-slide-talktrack` — Capability Talk Track

## Misalignments to fix

- **`se-platform-insights-intelligence`** — script is solid but its transition wording overlaps with the next slide's own intro; tighten so it names slide 4 explicitly.
- **`se-platform-wide-intelligence-usecases`** — duplicates content the previous slide already covered (knowledge graph, 90% vs 35%); needs to focus on the three named questions (Safety↔Training correlation, DG manual landing, Part 145 readiness) and transition into the Intelligence Layer deep-dive.
- **`se-slide-coanalyst`** — currently re-litigates the 90% vs 35% headline already delivered on slide 3; refocus on "what the Intelligence Layer *is* under the hood" and transition cleanly into per-solution use cases.
- **`se-slide-coanalyst-usecases`** — wording is fine; only the transition needs to point at **Insights** (not "patterns before automation" framing that pre-empts the slide).
- **`se-slide-insights`** — biggest mismatch. Script is titled "Insights & Recommendations" and conflates both capabilities. Rewrite as **Insights only** (pattern surfacing, evidence, POC H1 2026 → production H2 2026), and transition into the Recommendations use-cases slide.
- **`se-slide-insights-usecases`** — currently titled "Recommendations & Prescriptive Actions — Use Cases" in narration but the script jumps between solution and platform examples without anchoring. Rewrite to walk the per-solution row then the platform row exactly as rendered by `SECapabilityUseCases` (capability: "recommendations"), keeping the 2027+ roadmap caveat. Transition into Automation.
- **`se-slide-automation`** — solid; minor transition tweak to point at the Automation use cases.
- **`se-slide-automation-usecases`** — solid; transition needs to point at Intelligence Layer vs Generic AI.
- **`se-slide-tiers-vs-ai`** — transition already points at Regulation Management; verify wording.
- **`se-slide-regmgmt`** — currently lives in W3 narration block; confirm it transitions into **Unified Mobile** (slide 13), not into outcomes.
- **`se-slide-mobile`** — transition needs to point at the Capability Talk Track.
- **`se-slide-talktrack`** — closing transition should hand over to Week 3.
- **`se-week-2` divider** — order list inside the script must match the 13-slide order above.

## Edits (one file)

**`src/data/salesEnablementNarration.ts`** — rewrite the `script` field for each of the 13 Week 2 entries listed above. All scripts continue to follow the 5-part coach standard (Why → Core message → Pain→Value → How to deliver → Transition), keep BrandNumber product names, the canonical "~90% domain accuracy vs ~35% generic AI" headline (used only on slides 3 and 11 where it belongs), locked roadmap dates (Insights POC H1 2026 / production H2 2026, Automation POC April 2026 / platform H2 2026, Mobile phased through 2027+), and the no-pilot-wording embargo.

## Out of scope

- No changes to slide components, slide order, `SalesEnablement.tsx`, Week 1, Week 3, or PPTX exporters.
- No new memory entries (existing `coach-script-standard` memory already governs format).
