

## Technical Deep-Dive — Full Revision Plan

Goal: rebuild `/pitch-technical` so it aligns 1:1 with the Platform Playbook architecture (Core Apps → Data Foundation → Intelligence Layer → Mobile → DTOP), pulls in the deeper material now living in the capability playbooks (CoAnalyst, Insights, Automation, Mobile, DTOP), and gives a sales engineer a complete, in-order walkthrough.

## Diagnosis of current deck

Current order (22 slides) mixes concepts and repeats:
- Strategic Shift → Industry Challenge → Before/After (3 problem slides, overlap)
- Platform → Safety / Content / Training (good)
- CoAnalyst → Intelligence Tiers (good but thin vs CoAnalyst playbook)
- DTOP → Integrations (DTOP buried mid-deck, should anchor the model)
- Safety / Ops / Financial Use Cases → 2026 Roadmap → Line of Sight → Maturity
- Customer Outcomes → Why Us → Partnership

Gaps vs the rest of the app:
1. No dedicated **Data Foundation** slide — the architectural keystone the Platform Playbook centres on.
2. No **Insights & Recommendations** or **Automation** slides — both have full playbooks now.
3. No **Unified Mobile** slide — the delivery layer is missing.
4. DTOP appears once, mid-deck, without the closed-loop visual prominence it gets elsewhere.
5. Three problem slides up front; one is enough.
6. Use-case slides don't follow the standard DTOP vertical timeline used in other playbooks.

## Revised structure (20 slides, 5 acts)

```text
ACT 1 — FRAME THE PROBLEM (3)
 0  Title — "Operational Performance Platform: Technical Deep-Dive"
 1  Strategic Shift — point tools → connected platform (keep, tighten)
 2  Industry Challenge — cost waterfall (keep, single problem slide)

ACT 2 — THE ARCHITECTURE (6)  ← mirrors Platform Playbook stack
 3  Platform Overview — 5-layer architecture diagram (reuse PlatformArchitectureDiagram)
 4  Core Apps: SafetyManager365 (keep TechSlide4a)
 5  Core Apps: ContentManager365 + CoAuthor (keep TechSlide4b)
 6  Core Apps: TrainingManager365 + CoTrainer (keep TechSlide4c)
 7  NEW — Operational Data Foundation (data lake, taxonomy, governance, customer-owned)
 8  Platform Integrations — live case studies (keep TechSlide6)

ACT 3 — THE INTELLIGENCE LAYER (4)  ← three capabilities + tiers
 9  CoAnalyst — conversational intelligence (refresh TechSlide7 with playbook content)
10  NEW — Insights & Recommendations (proactive signals, recommended actions)
11  NEW — Automation (closed-loop execution, guardrails)
12  Intelligence Tiers + vs Generic AI (merge TechSlide8 + TechSlide9, side-by-side)

ACT 4 — DELIVERY & OPERATING MODEL (3)
13  NEW — Unified Mobile App (one entry point, in-context action)
14  DTOP Operating Model — hero slide, full pipeline (reuse TechSlide5DTOP, promoted)
15  Use Cases — Safety / Ops / Financial in tabbed or 3-column layout
     (consolidate TechSlide10/11/12 into one richer slide using DTOP timeline)

ACT 5 — VALUE & CLOSE (5)
16  Line of Sight — Tier 3 → Tier 1 cascade (keep TechSlide13)
17  Maturity Roadmap — where customer is today (keep TechSlide14)
18  2026 Roadmap — what's coming (keep TechSlide15)
19  Customer Outcomes + Why Comply365 (merge CustomerOutcomes + TechSlide17)
20  Partnership / Next Steps (keep TechSlide18)
```

Net: drop 1 problem slide, drop 2 standalone use-case slides (consolidated), drop standalone "vs Generic AI" (merged), add 4 new (Data Foundation, Insights, Automation, Mobile). Total 20 vs 22.

## New slides to build (4)

1. **TechSlide7DataFoundation.tsx** — left: schematic of data flowing from 3 core apps into a single operational data lake; right: 4 cards (Unified taxonomy 4,000+ categories, Customer-owned & governed, Real-time event propagation, Open APIs / no lock-in). Pull copy from `platformPlaybook.architectureLayers` "Operational Data Foundation".

2. **TechSlide11Insights.tsx** — proactive signals → recommended actions. Mirror `insightsPlaybook.ts`: 3 capability cards (Pattern Detection, Recommended Actions, Trend Analysis) + 1 short use case using DTOP vertical timeline.

3. **TechSlide12Automation.tsx** — closed-loop execution. Mirror `automationPlaybook.ts`: triggers → orchestration → guardrails → audit trail. Include a "with human-in-the-loop" callout.

4. **TechSlide13Mobile.tsx** — one app, three mini-apps (Content/Training/Safety), in-context action. Mirror `mobilePlaybook.ts` value pillars.

## Slides to revise (5)

- **TechSlide4Platform** → replace static module list with the 5-layer `PlatformArchitectureDiagram` (already exists in `/components/platform-slides/`). Keep right-side legend.
- **TechSlide7CoAnalyst** → expand using `mem://content/coanalyst/intelligence-framework` (90% vs 35% accuracy stat, 4 tiers preview, master message "From Reports to Intelligence").
- **TechSlide8IntelligenceTiers** → merge with TechSlide9VsGenericAI as a 2-panel slide (tiers on left, generic-AI contrast on right).
- **Use cases consolidation** → new `TechSlide15UseCases.tsx` with a tabbed Safety/Ops/Financial selector, each tab showing 1–2 use cases in standardised DTOP vertical timeline format (per `mem://ui/use-case-timeline-standardization`).
- **Customer Outcomes + Why Us** → merge into `TechSlide19WhyComply.tsx` — outcomes stats top, 3 differentiator cards bottom (per `mem://content/pitch-decks/closing-strategy`).

## Slides to delete

- `TechSlide3BeforeAfter` (redundant after Strategic Shift + Industry Challenge)
- `TechSlide9VsGenericAI` (merged into #12)
- `TechSlide10SafetyUseCases`, `TechSlide11OpsUseCases`, `TechSlide12FinancialUseCases` (consolidated into one)
- Standalone `CustomerOutcomesSlide` instance (merged into Why Us)

## Page wiring

Update `src/pages/TechnicalDeepDive.tsx` slide array to the 20-slide order above. Add narration entries for the 4 new slides in `src/data/technicalPitchNarration.ts` (concise scripts following `mem://content/pitch-decks/narrative-strategy` — technical tone, ~45–60s each).

## Visual & copy standards (applied throughout)

- All slides use `SalesSlideContainer` (h-screen, asymmetrical padding) per `mem://ui/layout-standards`.
- Use cases use vertical DTOP timelines (Detect amber, Trigger blue, Orchestrate purple, Prove emerald).
- Approved terminology only (SafetyManager365 / ContentManager365 / TrainingManager365, no "FOQA/FDM").
- Disclaimer footer on cost/ROI slides per `mem://content/pitch-deck-disclaimer-credibility`.
- Trust signals: 550+ Airlines, ~2.5M Users, 6 Continents.

## Files touched

New: 4 slide components + 4 narration entries.
Edit: 5 slide components, `TechnicalDeepDive.tsx`, `technicalPitchNarration.ts`, `useTechPitchNarration.ts` (no logic change, just new IDs).
Delete (remove from page, leave files): 5 deprecated slide imports.

## Out of scope

- PDF export of revised deck.
- New illustrations (reuse existing diagrams + lucide icons).
- Re-recording any audio.

