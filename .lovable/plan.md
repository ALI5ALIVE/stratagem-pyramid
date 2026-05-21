## Problem

The `se-w3-signals-recap` narration (and the slide framing) refers to "the Madrid approach trend" — a second use case from a slide that was removed earlier in the Week 3 refactor. Reps hearing the narration are told "two use cases drilled" when only one is shown, which breaks credibility and the transition into "Who to Target".

The on-screen slide itself is fine — it already shows: 4 signal sources on the left, the DTOP lane on the right, and walks the crew duty-time anomaly through D→T→O→P. Only the **narration script** needs to change.

## Change

Single-file edit to `src/data/salesEnablementNarration.ts`, `se-w3-signals-recap.script` only.

New script structure (coach-script standard, ~same length):

1. **Why this slide matters** — first-call question: "where does Detect come from?" Reps who can name the 4 sources and walk one through DTOP in 30 seconds keep selling.
2. **Recap — what a signal is** — anything that should change what the team does next. Name the four sources on the slide (Regulation, Anomalies, Operational Change, Macro/Geopolitical) with a one-line example each.
3. **Recap — what DTOP is** — the closed loop every signal runs through: **Detect** (see it without an analyst pulling a report), **Trigger** (Intelligence Layer recommends the next action with evidence), **Orchestrate** (Automation + Unified Mobile push the change to the people who execute), **Prove** (Insights shows the signal flat, audit pack one click). Point: point solutions stop at Detect; only we do all four.
4. **Walk the one use case on screen** — crew duty-time anomaly, end-to-end, one step at a time (D → T → O → P), exactly as the slide shows.
5. **Pain / value lever** — today the regulation, safety, ops and planning teams each see their own signal in their own tool and nothing joins up; we are the only platform that connects the four signal worlds into one loop.
6. **How to deliver it** — name the four sources, point at the anomaly, narrate the loop one step at a time, end on Prove, then pause. Don't list capabilities — the use case names them.
7. **Transition** — drop the "two use cases drilled / Madrid" line entirely. End with: one signal, walked end-to-end, is enough to earn the next conversation — which is *who* to walk it to. → Next: Who to Target.

No other files touched. No audio regeneration logic changes — the cache will refetch on next play because the script string changed.
