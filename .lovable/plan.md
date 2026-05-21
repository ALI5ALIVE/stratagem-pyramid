## Revise "Sell the Whole Vision" coach script

Rewrite the single-voice coach narration for `se-w3-whole-vision-whiteboard` in `src/data/salesEnablementNarration.ts` so it explicitly teaches reps how to **position and sell every capability as a standalone value AND as one compounding whole**. No code, structure, or slide changes.

### Scope
- File: `src/data/salesEnablementNarration.ts` — `script` field only on the `se-w3-whole-vision-whiteboard` entry (lines ~286–291).
- Keep voice = George (single-voice). No `segments` array (this stays a coach monologue, not a two-way roleplay).
- Keep the 5-part Coach Script Standard: WHY → CORE MESSAGE → PAIN→VALUE → HOW TO DELIVER → TRANSITION.
- Approved terminology only: Generative AI, Recommended Actions, Operational Data, Intelligence Layer (~90% vs ~35%). No CoAnalyst, no FOQA/FDM/ASAP.

### New narrative spine
1. **Why** — every capability has to stand on its own commercially (so a buyer can start anywhere), and stack into one compounding outcome (so the deal grows). Reps lose deals by pitching either the slice or the whole — never both.
2. **Core message (verbatim)** — "Every layer is a deal on its own. Stacked, they are the only loop that closes itself."
3. **Pain → Value, layer by layer** — for each block on the board, give: (a) the **standalone buyer** + the value that lands without anything else, (b) the **compounding value** when the next layer is added.
   - Core Apps (SafetyManager365 / ContentManager365 / TrainingManager365) — standalone: each replaces a system of record; compounding: shared foundation makes a signal in one visible to all three.
   - Insights & Intelligence — standalone: trends surface themselves, domain-trained answers cite reg/procedure/training at ~90% vs ~35%; compounding: the trend now points at the exact procedure and crew in the Core Apps.
   - Recommendations & Prescriptive Actions — standalone: tells the team what to do next with cited evidence (Recommended Actions, not a dashboard); compounding: the action is pre-mapped to the affected SOP and training module.
   - Automation — standalone: drafts the revision, opens the review, assigns the training; compounding: closes the loop without a human routing it.
   - Unified Mobile — standalone: lands content on crew devices with proof of receipt; compounding: Prove writes itself, audit pack already cited.
   - DTOP loop — the wrapper that makes the sum bigger than the parts.
4. **How to deliver** — 90 seconds, one marker, bottom-up. For each layer, two sentences: "Here's what this does on day one if you buy nothing else. Here's what it unlocks the moment the next layer is on." Anchor everything to the MAD unstable-approach use case so the same story runs through every layer.
5. **Close + transition** — "Start with one. The stack lifts the rest as you grow." Transition into Discovery / Walkthrough / Close.

### Out of scope
- No edits to SVG, beats array, slide registry, narration segments, or other slides.
- No PPTX export, design token, or styling changes.