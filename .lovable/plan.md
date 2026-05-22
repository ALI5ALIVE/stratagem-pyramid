# Plain-English Rewrite — All Study Sheets (W1 + W2 + W3)

## Goal

Make every study sheet (the first page of each one-pager) read like a plain-English explainer a smart 11-year-old could follow. Short sentences. Everyday words. Same meaning, less jargon. Locked brand and proof terms stay exact.

## Scope

One file: `src/data/salesEnablementStudyNotes.ts`. 53 slide entries. For each entry I rewrite every prose field:

- `inOneSentence` — Takeaway
- `whyItMatters` — Why the buyer cares
- `keyIdeas[]` — Ideas to own
- `terms[].definition` — Key terms (definitions only, term labels untouched)
- `facts[]` — Proof points
- `watchOut` — Watch-out
- `connectsTo[]` — left alone (these are slide titles, not prose)
- `checkYourself[]` — three questions per slide, simplified

No edits to the PDF renderer, the React app, narration scripts, or any other data file.

## Writing rules I will follow

1. Sentences ≤ 18 words. Aim for 10–14.
2. One idea per sentence. Break compound sentences with periods, not semicolons or em-dashes.
3. Active voice. Concrete nouns. No "leverage", "unlock", "drive", "enable", "robust", "holistic", "stack-agnostic".
4. Replace abstractions with what a buyer actually sees or does. ("Outcome evidence" → "proof the fix worked".)
5. Keep locked terms verbatim and unbolded by me (renderer handles bolding): Comply365, SafetyManager365, ContentManager365, TrainingManager365, DTOP, Detect, Trigger, Orchestrate, Prove, Operational Data, Intelligence Layer, Unified Mobile, Core Apps, Generative AI, Recommended Actions, Line-of-Sight, BrandNumber, Practice Center, ~90% / ~35%, $25–35B, Eurocontrol / IATA / SITA, FAA / EASA / CAA / CASA.
6. Never re-introduce forbidden words: FOQA, FDM, ASAP, CoAnalyst, "modules", "suite", "digital transformation".
7. Keep every fact, number and citation exactly as it stands today. Plain English ≠ softer claims.
8. `checkYourself` stays as three questions, each answerable in one breath.
9. Term definitions: one short sentence, no nested clauses.

## Approach

1. Read the full file once, group entries by week.
2. Rewrite in four passes so I keep voice consistent:
   - Pass A: Week 1 (≈10 slides)
   - Pass B: Week 2 (≈18 slides)
   - Pass C: Week 3 (≈25 slides)
   - Pass D: Final read-through for tone drift and locked-term checks.
3. Each rewrite is a targeted patch — same keys, same shape, only string values change. No structural edits, no new fields, no field removals.
4. After the rewrites, regenerate W1/W2/W3 PDFs with the existing script and rasterise a sample of pages per week to confirm:
   - No overflow regression (lines fit the rail and column widths the renderer was tuned for).
   - Locked terms still appear verbatim.
   - Page counts within ±2 of current (W1=31, W2=37, W3=52).

## Before / after example (illustrative)

Current `se-slide-shift.whyItMatters`:
> "This is the only reason prospects take the meeting. Leadership is being asked for outcome evidence their record-keeping tools cannot produce, and the gap is structural — not a matter of effort or budget."

Rewritten:
> "This is why buyers take the meeting. Their bosses now want proof the fix worked, not just records that it was logged. Their old tools cannot produce that proof. It is a tool problem, not a team problem."

Current `se-slide-dtop.keyIdeas[0]`:
> "Detect: fuses four signal sources (operational, safety, regulatory, training) into one Detect layer."

Rewritten:
> "Detect pulls four signals into one place: operations, safety, rules, and training."

## Out of scope

- No copy changes to React components, slide titles, narration scripts, or PDF layout code.
- No changes to `connectsTo` strings (they are slide titles used as links).
- No new slides, no removed slides, no re-ordering.

## Risk and rollback

Single-file change. If a rewrite reads worse than the original or trips the renderer, revert that one entry from git history. Locked-term verbatim list above is the gate for tone drift.

## Deliverable

Updated `src/data/salesEnablementStudyNotes.ts` and three regenerated PDFs (W1, W2, W3) confirmed visually clean.
