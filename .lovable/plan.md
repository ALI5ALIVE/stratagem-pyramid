# Separating Insights & Intelligence from Recommendations & Prescriptive Actions

## Problem

Today the two slides bleed into each other:

- `IRSlide2WhatIs` (Insights — Just Ask) ends at **"Insight + Recommended Action"** in stage 6, and references "Recommended Actions" in the workflow.
- `TechV4SlideInsights` (Recommendations & Prescriptive Actions) reuses the **same DG worked example** and includes "Recommended Actions" as one of three capability cards — re-stating the previous slide instead of building on it.

The buyer hears the same idea twice and loses the *Today vs. Tomorrow* distinction.

## Positioning Fix (one-line per slide)

| Slide | Tense | Verb | What it does | Output |
|---|---|---|---|---|
| Insights & Intelligence (CoAnalyst, today) | **Now · Live** | **Ask & Answer** | Plain-English Q&A across operational data with citations | An *answer* + the single best next action tied to that answer |
| Recommendations & Prescriptive Actions (future) | **2026 vision** | **Detect & Prescribe** | Always-on pattern detection across the platform — no question required | A *prioritised action plan*: what to do, where, in what order, with predicted impact |

The clean line: **Insights answers what you ask. Recommendations tells you what to ask before you knew to ask it.**

## Minimal Slide Changes (no structural rewrite)

### Slide A — `IRSlide2WhatIs` (Insights — Just Ask)

Keep the 6-stage workflow. Two surgical edits:

1. **Stage 6 label** — change from `"Insight + Recommended Action"` to **`"Cited answer + next best step"`**.
   - *Description*: "Plain-English answer with sources, plus the single next step tied to this question. Live on SafetyManager365 today."
2. **Footer chip** (next to "6 stages · seconds end-to-end") — add a small caption:
   > *Reactive · you ask, the platform answers.*

That's it for this slide. It now clearly owns "ask anything · cited answer · today."

### Slide B — `TechV4SlideInsights` (Recommendations & Prescriptive Actions)

Keep the layout (Future Vision pill · 3 capability cards · worked example), but re-cut the content so it does NOT re-explain Insights:

1. **Subtitle** — change to:
   > *Always-on pattern detection across the platform — surfacing prioritised actions before anyone thinks to ask.*

2. **Replace the 3 capability cards** so none of them duplicate "ask & answer":

   | # | Title | Description |
   |---|---|---|
   | 1 | **Continuous Pattern Detection** *(amber)* | The platform watches operational data 24/7, correlating safety, training, content and ops — no question required, no dashboard to build. |
   | 2 | **Prescriptive Action Plans** *(violet)* | Not a single suggestion — a ranked plan: what to do, where, in what order, by whom, with predicted impact and effort. |
   | 3 | **Predicted Impact & Foresight** *(emerald)* | Each action carries a forecast — risk reduction, compliance exposure closed, hours saved — so leaders prioritise on outcome, not opinion. |

3. **Replace the worked example** so it is not the same DG question from the Insights slide. Keep the 4-step timeline format, change the framing from *"COO asks…"* to *"Platform surfaces…"*:

   - **Trigger banner** (replaces the question quote):
     > *No question asked — platform proactively flags:* **"DG handling risk rising at 3 hubs over next 30 days."**
   - **Step 1 · Detect** *(amber)* — Continuous correlation across 90 days of safety events, training records, station rosters and procedure versions flags an emerging pattern.
   - **Step 2 · Prioritise** *(blue)* — Ranks 3 hubs by predicted incident likelihood × operational exposure; deprioritises 2 stations the dashboards would have flagged on volume alone.
   - **Step 3 · Prescribe** *(violet)* — Generates a sequenced plan: retrain 180 ground crew (week 1), republish DG SOP v4.2 (week 1), targeted station audits (week 3), with named owners.
   - **Step 4 · Prove** *(emerald)* — Forecasts 60–70% incident reduction over 90 days; closes the loop into DTOP for tracking and audit evidence.

   Caption (top-right of card): *"From signal to sequenced plan — before the first incident."*

## Narration Adjustment (`src/data/executivePitchNarration.ts`)

Two scripts only — keep the rest as-is:

- **`exec3-slide-insights-summary`** — re-anchor on **today, reactive, cited Q&A**. Close with: *"This is live now. The next slide is what comes when you stop having to ask."*
- **`exec3-slide-insights`** *(Recommendations & Prescriptive Actions)* — open with: *"Insights answers the questions you think to ask. This is the platform asking the questions for you."* Then walk the proactive DG scenario, close on the 2026 roadmap commitment.

## Files to Edit

- `src/components/insights-slides/IRSlide2WhatIs.tsx` — stage 6 label/desc, footer caption.
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx` — subtitle, 3 capability cards, worked example (trigger + 4 steps), caption.
- `src/data/executivePitchNarration.ts` — rewrite the two scripts named above.

No slide added, removed or reordered. No container/layout changes. PPTX exporters do not need to change because they render these components.

## Outcome

The Medium pitch now tells a clean two-beat story:

1. **Today** — *Ask anything in plain English, get a cited answer plus the next step.* (Insights & Intelligence · CoAnalyst)
2. **Tomorrow** — *The platform watches everything and hands you a prioritised, predicted-impact action plan before you ask.* (Recommendations & Prescriptive Actions)

No more overlap, no structural surgery.
