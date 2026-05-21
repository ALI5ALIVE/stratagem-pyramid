## Goal
Tighten the `se-w3-whole-vision-whiteboard` narration so each of the 5 stages on the board is unmistakably called out by **stage number + layer + DTOP role**, matching the slide visuals exactly.

## Single change
Edit `src/data/salesEnablementNarration.ts` (entry `se-w3-whole-vision-whiteboard`, ~line 297). Keep the MAD top-of-board opening, the verbatim core line, and the verbatim close. Replace the bottom-up walk with these 5 explicit beats:

- **Stage 1 — Core Apps (the foundation):** the three apps as the foundation, one signal visible across all three. No app names called out.
- **Stage 2 — Insights as Detect (blue):** Madrid trend surfaces itself in 14 days, no analyst pulled the report.
- **Stage 3 — Intelligence Layer as Trigger (amber):** ~90% accurate on aviation work vs ~35% generic AI, every answer cited to regulation, procedure, training; returns as Recommended Actions, not a dashboard.
- **Stage 4 — Automation as Orchestrate (violet), with Unified Mobile last mile:** drafts OMA revision, opens reviews, assigns training, lands on crew devices in 48h.
- **Stage 5 — Insights as Prove (green):** Madrid trend flat in 5 days, audit pack one click, loop closed.

Each beat opens with the literal phrase "Stage one…", "Stage two…", etc., so the listener never loses the count.

## Out of scope
- No changes to the whiteboard slide component or any other slide.
- No changes to the MAD top strip wording or the verbatim core/close lines.
