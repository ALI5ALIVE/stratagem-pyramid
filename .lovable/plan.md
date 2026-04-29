## Alignment check — `exec3-slide-coanalyst` ("The Platform · Insights & Intelligence")

The slide the user is reviewing is `TechV4Slide7CoAnalyst`. It sits between:

- `exec3-slide-insights-summary` — *Insights & Intelligence (reactive: you ask, the platform answers)*
- `exec3-slide-insights` — *Recommendations & Prescriptive Actions (Future Vision · Roadmap Capability)*

**What's aligned:** title, subtitle, the three product cards (SafetyManager365 Available · Content/Training Coming Soon), rows 1–2 (Ask in plain English, Cross-domain insight & root cause), and the footer that ties it back to the cross-product story.

**What's misaligned:** Row 3 — *"Recommended next actions"* — uses language that belongs to the 2026 prescriptive vision we just separated out:

- "Suggest an audit, risk re-score or corrective action with evidence attached."
- "Propose a procedure update or revision route with the right reviewers."
- "Auto-assign a refresher module or recurrency event to the right crew."

That reads as autonomous, prescriptive, multi-step orchestration — exactly what the next slide explicitly badges as *Future Vision · Roadmap Capability*. The exec audience will hear "this is shipping inside every app today" and then feel whiplash on the next slide.

## Proposed change (minimal — content only, no structural edit)

Rename row 3 and rewrite its three cells so it stays in the *answer-plus-next-best-step* lane established on the previous slide.

**File:** `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx`

**Row 3 — rename:**
- `name`: "Recommended next actions" → **"Cited answer + the single next step"**
- `blurb`: "Turn insight into prescriptive guidance the team can act on immediately, in-app." → **"Every answer comes with sources and one suggested next step the user can take inside the app — not an autonomous workflow."**

**Row 3 — rewrite the three product cells to be reactive, single-step, in-app suggestions tied to the answer:**

- SafetyManager365 cell:
  *"Answer cites the source occurrences and offers one next step — open the cluster, log a finding, or flag for review."*
- ContentManager365 cell:
  *"Answer cites the affected procedures and offers one next step — open the revision, route to the right reviewer, or compare versions."*
- TrainingManager365 cell:
  *"Answer cites the at-risk crew and offers one next step — open the recurrency list or draft a refresher assignment for a coordinator to confirm."*

This keeps the row's icon (`Lightbulb`), its position in the matrix, and the visual rhythm of the slide. It just removes any wording that implies autonomous prescription, auto-assignment, or multi-step action plans — which now lives cleanly on `TechV4SlideInsights` (the next slide) as the 2026 roadmap capability.

## Optional companion tweak

Update the narration line for `exec3-slide-coanalyst` in `src/data/executivePitchNarration.ts` if it currently echoes "auto-assign" / "prescriptive" / "corrective action" language, so the spoken story matches the on-screen wording. I'll inspect and adjust only if the script reinforces the misalignment.

## Files to edit

- `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx` — rename row 3 and rewrite its three cells.
- `src/data/executivePitchNarration.ts` — light edit to the `exec3-slide-coanalyst` script only if needed to keep narration consistent.

No changes to layout, structure, ordering, or to the Insights summary / Recommendations slides — those are already aligned.
