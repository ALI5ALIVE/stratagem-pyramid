## Feedback summary (from Chris + Kathrina, 11 May)

| # | Item | Action |
|---|------|--------|
| 1 | Title says "31 slides" — deck has 28 | Compute live |
| 2 | Welcome narration references "90-day pilot" | Remove pilot wording everywhere it's premature |
| 3 | 6 modules is too many — should be 2–3 (= 1 week each) | Re-group into **3 modules / 3 weeks** |
| 4 | Enablement slides should map to Executive Pitch 3 ("Medium Pitch") | Add explicit cross-reference chips |
| 5 | Slide 27 "Your first 7 days" Box 2 — "calls to shadow" | Remove (not ready for discovery calls) |
| 6 | Slide 27 Box 4 — "Line of Sight interactive ROI calculator" | Remove that line |
| 7 | Slide 27 timeline should match real enablement plan: Enablement first, *then* Exec Medium pitch | Re-author the closing block |
| 8 | Platform Playbook overlap, Signals Playbook sequencing | **Deferred** — Chris still deciding; no change this round |

---

## Plan

### 1. Slide 0 — Title (`SESlide0Title.tsx`)

- Replace hardcoded `31 slides` with a `slideCount` prop passed from `SalesEnablement.tsx` (computed from `slides.length`).
- Collapse the 6-tile module grid into **3 tiles** representing the new week structure:
  1. **Week 1 — Foundation** · *The Market Shift + Plain-English pitch* (M1+M2)
  2. **Week 2 — Capabilities** · *How the platform fits together* (M3)
  3. **Week 3 — Sell & Win** · *Discovery → Demo → Close, use cases, objections* (M4+M5+M6)
- Keep the dark/accent styling; one accent per week (sky / violet / amber).

### 2. Module dividers (`SalesEnablement.tsx` + `SEModuleDivider`)

Re-label the existing dividers so the deck *reads* as 3 weeks without renumbering every slide ID:

- `se-module-2` divider becomes **"Week 1 — Foundation (continued)"** OR is removed; M1 + M2 content stays back-to-back under one Week 1 banner.
- `se-module-3` divider becomes **"Week 2 — Capabilities"**.
- `se-module-4` / `se-module-5` / `se-module-6` collapse under a single **"Week 3 — Sell & Win"** divider; the M5/M6 dividers are removed from the deck.
- Net result: 3 week-dividers instead of 5 module-dividers (-2 slides).

Slide-IDs stay the same so narration data file doesn't need a rename; only the divider components/labels and the `slides` array are edited.

### 3. Narration cleanup — remove premature "90-day pilot" language

In `src/data/salesEnablementNarration.ts`:

- `se-slide-0` (Welcome) — replace *"…objection handling that gets you to a ninety-day pilot."* with *"…objection handling that earns the next conversation."*
- `se-module-4` intro — *"close scopes a ninety-day pilot around their highest-cost use case"* → *"close scopes the next focused conversation around their highest-cost use case."*
- `se-module-6` intro — *"walk a prospect to a ninety-day pilot"* → *"walk a prospect to a clear next step."*
- `se-slide-why` (Why Comply365) — drop the *"can we put a focused ninety-day pilot together"* close line; substitute *"can we set up a focused walkthrough on your highest-cost use case?"*
- Leave the M3 `se-slide-coanalyst` narration's competitor reference ("running a generic AI pilot") intact — that's the prospect's pilot, not ours.

### 4. Slide 27 — "Your first 7 days" (`SEClosingForReps.tsx`)

Rebuild around the **real enablement sequence** Chris described:

- **Box 1 — Read first (Enablement deck)**: Strategic Shift, Plain-English Shift, What It Is, Value Unlocked.
- **Box 2 — Then read the Medium Pitch**: Executive Pitch 3 (the customer-facing narrative the Enablement is teaching).
- **Box 3 — Practice**: role-play "we already have an SMS" using Acknowledge → Reframe → Bridge; end by booking a 20-min DTOP walkthrough.
- **Box 4 — Where to find collateral**: Command Centre, Persona Deep-Dive, Signals 101 Playbook. *(Line-of-Sight ROI calculator removed.)*

Remove the old Box 2 ("2 calls to shadow") entirely. Update the day-7 readiness checklist accordingly (drop the "discovery call" item).

### 5. Map Enablement slides → Executive Pitch 3 ("Medium Pitch")

Add a small **"Maps to Exec Pitch 3 · Slide X"** chip to the PitchSlideContainer header on the teaching slides that explicitly teach an exec-pitch slide. Proposed mapping (final mapping confirmed when implementing — based on current Exec Pitch 3 slide order):

| Enablement slide | Exec Pitch 3 slide |
|---|---|
| M1 · Strategic Shift | The Shift |
| M1 · Plain-English Shift | What This Means for Customers |
| M2 · The Platform | The Platform |
| M2 · Value Unlocked | What This Means for Customers |
| M3 · DTOP | DTOP / Operating Model |
| M3 · CoAnalyst | Intelligence Layer |
| M5 · Customer Outcomes | Proof / Outcomes |
| M6 · Why Comply365 | Closing / Why Us |

Implementation: optional `mapsTo?: string` prop on the slide components above, rendered as a subtle pill in the slide header (`text-[10px] uppercase tracking-wider text-muted-foreground`).

### 6. Memory update

Add a short rule to `mem://content/sales-enablement/coach-script-standard.md`:

> Until further notice, do **not** use "90-day pilot" wording in Sales Enablement narration or slide copy. Replace with "next focused conversation" / "20-min walkthrough" / "focused use-case session". We are not promoting pilots yet.

### 7. Out of scope this round

- Platform Playbook rationalisation (Chris still deciding)
- Signals Playbook sequencing inside enablement (Chris still deciding — Kathrina suggests next session)
- Any change to Executive Pitch 3 itself
- Restructuring narration data file IDs (kept stable for continuity)

---

## Technical notes

- Files touched: `src/components/sales-enablement-slides/SESlide0Title.tsx`, `SEClosingForReps.tsx`, `SEModuleDivider.tsx` (optional label tweak), `src/pages/SalesEnablement.tsx`, `src/data/salesEnablementNarration.ts`, `src/components/shared/PitchSlideContainer.tsx` (small optional `mapsTo` prop), and the 8 slide components in the mapping table to pass `mapsTo`.
- No new routes, no DB, no narration-audio re-generation required (text changes will re-synthesise on next play).
