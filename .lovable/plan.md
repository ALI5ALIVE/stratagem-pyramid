## Goal

Re-sequence Week 2 so the platform-wide use cases land immediately after the platform-wide Insights & Intelligence story, and rewrite every Week 2 narration so the transitions and references match the new slide order.

## New Week 2 slide order

```text
01  W2 · Divider                                       (se-week-2)
02  W2 · The Platform (map)                            (se-week-2-overview)
03  W2 · Platform · Insights & Intelligence            (se-platform-insights-intelligence)
04  W2 · Intelligence & Insights — Platform-Wide UCs   (se-platform-wide-intelligence-usecases)  ← MOVED UP
05  W2 · Intelligence — Intelligence Layer             (se-slide-coanalyst)
06  W2 · Intelligence & Insights — Use Cases           (se-slide-coanalyst-usecases)             (per-solution)
07  W2 · Intelligence — Insights                       (se-slide-insights)
08  W2 · Recommendations — Use Cases                   (se-slide-insights-usecases)
09  W2 · Intelligence — Automation                     (se-slide-automation)
10  W2 · Automation — Use Cases                        (se-slide-automation-usecases)
11  W2 · Intelligence Layer vs Generic AI              (se-slide-tiers-vs-ai)
12  W2 · Regulation Management Use Case                (se-slide-regmgmt)
13  W2 · Mobile                                        (se-slide-mobile)
14  W2 · Capability Talk Track                         (se-slide-talktrack)
```

Rationale: the platform-wide capability story (slide 03) introduces "ask anything, get cross-domain answers". The three platform-wide use cases (slide 04) make it concrete *before* we zoom into the Intelligence Layer mechanics and the per-solution chores in slides 05–06.

## Changes

### 1. `src/pages/SalesEnablement.tsx`
- Move `se-platform-wide-intelligence-usecases` to immediately after `se-platform-insights-intelligence`.
- Update `weekProps.w2.upNext` to reflect new order:
  `["The Platform map", "Insights & Intelligence", "Platform-wide use cases", "Intelligence Layer", "Per-solution use cases", "Insights", "Recommendations use cases", "Automation", "Automation use cases", "Intelligence Layer vs Generic AI", "Regulation Management", "Mobile", "Capability cheat sheet"]`
- Refresh `weekProps.w2.learningGoal` to reference the new flow (lead with platform-wide intelligence, then layer, then per-capability, then mobile).

### 2. `src/data/salesEnablementNarration.ts` — rewrite Week 2 scripts

All scripts keep the 5-part coach standard (Why this matters → Core message → Pain→Value pivot → How to deliver → Transition). Only the transition lines and the cross-slide references need substantive rewriting; the body copy stays close to current.

| Slide ID | Fix |
|---|---|
| `se-week-2` | Replace the outdated "Core Apps — SafetyManager365 / ContentManager365 / TrainingManager365 then Intelligence layer" agenda with the actual flow: Platform map → Platform-wide Insights & Intelligence → Platform-wide use cases → Intelligence Layer → per-solution use cases → Insights → Automation → Layer vs Generic AI → Regulation Management → Mobile → Talk Track. |
| `se-week-2-overview` | Keep body; transition already correctly hands off to platform-wide Insights & Intelligence. Minor polish only. |
| `se-platform-insights-intelligence` | Transition rewritten: "next we make these promises concrete — three platform-wide questions only this layer can answer" (instead of going straight into the Intelligence Layer deep dive). |
| `se-platform-wide-intelligence-usecases` | Transition rewritten: "next we open the box — the Intelligence Layer that actually runs these answers" (instead of "next: Insights"). |
| `se-slide-coanalyst` | Transition rewritten: "next, how this shows up on a Monday morning — the per-solution use cases your buyer can picture themselves running" (instead of going to "Insights and Recommendations"). |
| `se-slide-coanalyst-usecases` | Reframe scope: this slide is now *per-solution* only (since platform-wide moved to slide 04). Drop the "and at the platform level…" paragraph. Transition: "next: Insights — how the platform earns trust by surfacing patterns before it ever automates." |
| `se-slide-insights` | Body unchanged; transition unchanged ("Next: Automation" via Recommendations use cases) — needs to read "Next: Recommendations and Prescriptive Actions use cases, then Automation." |
| `se-slide-insights-usecases` | Transition unchanged ("Next: Automation"). |
| `se-slide-automation` | Transition rewritten: "Next: Automation use cases, then how Intelligence Layer differs from generic AI." |
| `se-slide-automation-usecases` | Transition unchanged ("Next: Intelligence Layer vs Generic AI"). |
| `se-slide-tiers-vs-ai` | Transition rewritten: "Next: Regulation Management — the cleanest end-to-end use case to demonstrate the whole capability stack." (Currently says "Next: Unified Mobile.") |
| `se-slide-regmgmt` | Transition unchanged (already → Mobile). |
| `se-slide-mobile` | Transition unchanged (→ Capability talk track). |
| `se-slide-talktrack` | Verify it closes Week 2 cleanly and hands off to Week 3. |

### 3. Light copy alignment fixes
- Anywhere in W2 narration that still says "Core Apps deep-dive" or implies a SafetyManager365/ContentManager365/TrainingManager365 dedicated slide → rewrite, since those slides were removed earlier.
- Replace any "next: Intelligence Layer" wording where the next actual slide is now Platform-wide Use Cases.

## Out of scope
- No layout/visual changes to existing slides.
- No edits to Week 1 or Week 3.
- No PPTX exporter changes.

## Open question
Slide 04 (platform-wide) and slide 06 (per-solution use cases) both use the title "Intelligence & Insights — Use Cases", which is now confusing. I will retitle slide 06 to **"Intelligence & Insights — Per-Solution Use Cases"** (component label + narration title) unless you'd prefer different wording.
