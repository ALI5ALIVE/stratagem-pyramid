## Move DTOP into Foundation (Week 1)

DTOP is the operating model — conceptually it belongs alongside "The Platform" in Foundation, not buried at the end of Capabilities. This plan moves the slide, updates the week banners, re-points the Academy DB, and rewrites the affected coach narration so transitions stay clean.

Signals is **not** moved (you didn't request it, and Signals is a specific capability lens rather than a foundational frame). Happy to revisit separately.

### 1. Slide order in `src/pages/SalesEnablement.tsx`

New Week 1 order (Foundation):

```text
Title
▸ Week 1 · Foundation (banner)
M1 · Strategic Shift
M1 · Why This Matters (Plain English)
M2 · The Platform
M2 · DTOP                  ← moved here
M2 · Value Unlocked
M2 · Recap Talk Track
```

Week 2 (Capabilities) — DTOP removed:

```text
▸ Week 2 · Capabilities
M3 · SafetyManager365
M3 · ContentManager365
M3 · TrainingManager365
M3 · CoAnalyst
M3 · Insights
M3 · Automation
M3 · CoAnalyst vs Generic AI
M3 · Unified Mobile
M3 · Capability Talk Track   ← now closes Week 2
```

Relabel the DTOP slide from `M3 · DTOP` → `M2 · DTOP`.

### 2. Week banner metadata (`weekProps` in same file)

- **w1.upNext**: add `"DTOP — the operating loop"` between "The platform at a glance" and "Value unlocked".
- **w1.learningGoal**: extend to "…and walk the DTOP loop (Detect → Trigger → Orchestrate → Prove) on a whiteboard."
- **w1.estimatedMinutes**: 10 → 14.
- **w2.upNext**: remove "DTOP" entry.
- **w2.learningGoal**: drop the "…and walk DTOP on a whiteboard" clause (now a Week 1 outcome). Replace with "…and pick the right capability to lead with for the room you're in."
- **w2.estimatedMinutes**: 18 → 16.

### 3. Academy DB — `academy_modules.slide_ids`

A new migration updates the two affected rows:

- `m-w1.slide_ids` → add `se-slide-dtop` after `se-slide-whatis`.
- `m-w2.slide_ids` → remove `se-slide-dtop`.

No schema changes, no quiz changes (DTOP quiz questions, if any, can stay on their current module — confirm in a follow-up if you want them re-pointed to Week 1).

### 4. Narration rewrites in `src/data/salesEnablementNarration.ts`

- **`se-week-1` (Week 1 banner)** — add DTOP to the closing line: "…The four capability bands you must name from memory, in order: Core Apps, Intelligence & Orchestration, Unified Mobile, and DTOP — and by the end of this week you can walk the DTOP loop on a whiteboard."
- **`se-slide-whatis` (The Platform)** — change closing transition to "Next we go straight into DTOP — the loop that makes the platform worth buying."
- **`se-slide-dtop`** — retitle to `M2 · DTOP`; rewrite the closing transition from "Next: the capability cheat sheet." to "Next: the value this loop unlocks." Keep the body (Detect/Trigger/Orchestrate/Prove colour cues, whiteboard-it instruction, discovery pivot) intact.
- **`se-slide-value` (Value Unlocked)** — adjust opening so it follows DTOP, not the platform diagram: "Now that the loop is on the whiteboard, this slide turns it into money and time…"
- **`se-week-2` (Week 2 banner)** — remove "…then DTOP itself…" from the capability-order sentence; close on "…then the Unified Mobile App, and we close with the capability cheat sheet."
- **`se-slide-mobile`** — change closing transition from "Next: DTOP itself." to "Next: the capability cheat sheet — your study page before every call."

All rewrites stay inside the 5-part coach format (Why this matters → Core message → Pain→Value pivot → How to deliver → Transition).

### 5. Memory update

Append to `mem://content/sales-enablement/coach-script-standard`: "DTOP lives in Week 1 (Foundation), not Week 2. The four capability bands taught from memory in Week 1 are Core Apps, Intelligence & Orchestration, Unified Mobile, DTOP. Week 2 covers product capabilities only; the DTOP whiteboard is a Week 1 outcome."

### Files touched

- `supabase/migrations/<new>.sql` (slide_ids update for `m-w1` and `m-w2`)
- `src/pages/SalesEnablement.tsx` (slide order, weekProps)
- `src/data/salesEnablementNarration.ts` (six narration entries)
- `mem/content/sales-enablement/coach-script-standard.md`

No component code changes — `TechV4Slide5DTOP` renders unchanged in its new position.
