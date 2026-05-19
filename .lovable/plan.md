# Plan — Realign W2 "In-Product · Insights & Intelligence" narration

## Problem
The narration for `se-slide-coanalyst` (component `TechV4Slide7CoAnalyst`, titled "In-Product · Insights & Intelligence — The same intelligence layer expressed inside every core application") currently describes the Intelligence Layer in the abstract. The actual slide visualises a 3×3 matrix: the **same** capability surfacing **inside each Core App** — **SafetyManager365 = Available**, **ContentManager365 = Coming Soon**, **TrainingManager365 = Coming Soon** — with three capability rows (Ask in plain English · Cross-domain insight & root cause · Cited answer + single next step). The narration never names that story and doesn't tee up the next slide's per-app use cases.

## Edit (single file)
`src/data/salesEnablementNarration.ts` — rewrite the `script` for `slideId: "se-slide-coanalyst"`.

New script must land:

1. **Why this slide matters** — we just showed platform-wide Insights & Intelligence; this slide shows the *same* intelligence layer **expressed inside each Core App** so reps don't get asked "great, but does it work where my team already lives?".
2. **Core message (verbatim line)** — "One intelligence layer, three doorways: Safety today, Content and Training next — same engine, same guardrails, scoped to the app the user is already in."
3. **What's on the slide** — three columns are the Core Apps with rollout chips: **SafetyManager365 — Available now**, **ContentManager365 — Coming Soon**, **TrainingManager365 — Coming Soon**. Three rows are the capability the layer brings into each app: ask in plain English, cross-domain insight & root cause, cited answer plus the single next step a human takes inside that app.
4. **The honest limitation** — in-product, the layer reasons over **that app's own data** (single-domain). The platform-wide view shown two slides ago is what you get when the same layer reasons **across** all three. Same engine, different scope. Reps must say this out loud — it's how we defuse "is this real or roadmap?".
5. **Pain → value pivot** — pain: today an analyst leaves the app, opens BI, exports CSVs, then comes back. Value: the answer arrives **where the work happens**, with cited evidence and one next step a human confirms — never an autonomous workflow.
6. **How to deliver** — point at the Safety column first ("this is live"), then the Content and Training columns ("same pattern, sequenced rollout"). Do **not** quote the 90% vs 35% accuracy stat here — that lives on the Intelligence-Layer-vs-Generic-AI slide later in Week 2; reusing it here blunts it.
7. **Discovery question** — "Which of your three teams — Safety, Content, or Training — loses the most hours per week leaving their app to chase an answer?"
8. **Transition** — "Next slide, the Monday-morning picture: the specific per-solution use case inside each Core App — the safety-report pull in SafetyManager365, the mobile-sync list in ContentManager365, and the recurrency roster in TrainingManager365."

## Constraints respected
- BrandNumber product naming (SafetyManager365, ContentManager365, TrainingManager365).
- 5-part Coach Script Standard (rep-facing teaching script, not customer copy).
- No "90% vs 35%" reuse; no "pilot" framing; no FOQA/FDM/ASAP.
- Roadmap honesty: Safety = available; Content/Training = "coming soon" (matches the slide's chips — no fabricated dates).
- Visuals, slide order, and the next slide's narration (`se-slide-coanalyst-usecases`) are unchanged; only the transition tail of the current script is rewritten to hand off cleanly to that slide's three per-app cards.

## Out of scope
- No component, layout, or slide-order changes.
- No edits to `se-slide-coanalyst-usecases` script (already correctly per-app — Safety report pull, Content mobile-sync list, Training recurrency roster).
- No Week 1 or Week 3 narration changes.
