## Goal

Tighten the Week 3 flow into a world-class "Sell & Win" arc, and fix slides where content is clipped by the fixed narration bar at the bottom of the viewport.

## Part A — Flow improvements (Week 3)

Current W3 order (24 slides) groups as: 2 recaps → targeting → process → discovery/persona/use cases → 6 footprint slides → outcomes → competitive → objections → discovery runbook → deal-stage language → strategy & vision. Three problems:

1. **Two opening recaps feel redundant.** "Recap — One Use Case, Every Capability, One DTOP Loop" (re-use of W2 capstone) immediately followed by "Recap — Signals → DTOP" repeats the loop framing twice before the rep learns anything new.
2. **Discovery-Call Runbook lands too late.** It's the structural call template — currently sits *after* Objections, but Objections, Persona Playbook, Question Bank, and Use Case Cheat Sheet are all inputs *into* the runbook. Reps need the runbook first, then the tactical kits slot into it.
3. **No Week 3 closing capstone.** W2 ends on a capstone whiteboard. W3 ends on the Strategy & Vision Session CTA but has no "you can now do this end-to-end" summary mirroring it.

### Proposed re-order

```text
Open (frame the week)
  1. W3 Divider · Sell & Win
  2. Recap — Signals → DTOP (animated)        ← keep only this one recap
                                                 (drop the W2-capstone re-use)

Target (who & why)
  3. Who to Target
  4. Customer Footprint — Intro
  5. Footprint — One App  → One-App Whiteboard
  6. Footprint — Two Apps → Two-Apps Whiteboard
  7. Footprint — All Three + Platform → Whiteboard
  8. Footprint — Value Ladder
  9. Footprint — 3-Move Play

Run the call (structure first, then tactics)
 10. Discovery → Demo → Close (the arc)
 11. Discovery-Call Runbook                     ← MOVED UP from late W3
 12. Discovery Question Bank
 13. Persona Playbook
 14. Use Case Cheat Sheet
 15. Customer Outcomes

Win the room (objections + competitive)
 16. Objections
 17. Competitive Cheat Sheet

Close & next step
 18. Deal-Stage Next-Step Language
 19. Strategy & Vision Session
 20. NEW · W3 Capstone — "Your first 30 days"   ← mirrors W2 capstone
```

### New slide to add

**`SEW3Capstone` — "Your first 30 days as a rep"**
Single whiteboard slide mirroring `SEW2CapstoneWhiteboard`:
- One target account chosen using Who-to-Target criteria
- Discovery call run from the Runbook with 3 persona-tuned questions
- One use case picked from the cheat sheet
- One objection handled
- Close line from Deal-Stage Language
- Booked: Strategy & Vision Session
Rep's 60-second self-test: "name the account, the call, the use case, the objection, the next step."

### Narration updates required

- Drop the W3 capstone-recap narration script (`se-w3-capstone-recap`).
- Update Signals→DTOP narration's "Next" transition to point at Who to Target.
- Re-sequence the runbook narration to be the *structural* call template, with Question Bank / Persona / Use Case slides framed as "what you slot into each phase of the runbook."
- Add a short narration for the new W3 Capstone (5-part coach format per `mem://content/sales-enablement/coach-script-standard`).

---

## Part B — Narration-bar overflow fixes

The fixed glassmorphism narration bar at `bottom-0` is ~76 px tall. `PitchSlideContainer` already reserves `pb-24 sm:pb-28` (~112 px), so slides built inside it are safe *if their inner content respects the container's flex-1 area*. Problems are in:

1. **Slides that bypass the container's reserved padding** by using `h-full` + their own `pb-6` (e.g. `SEW3SignalsRecap` line 117: `... pt-2 pb-6`). The inner div eats into the container's bottom reserve.
2. **Slides with too much content for the safe area** (5+ tall rows, dense whiteboards): `SEPersonaPlaybook`, `SEDiscoveryQuestionBank`, `SEUseCaseCheatSheet`, `SEFootprintValueLadder`, `SEFootprintPlaybook`, `SEDiscoveryCallRunbook`, `SECompetitiveCheatSheet`, `SEObjections`, `SEStrategyVisionSession`.

### Fix approach (apply per slide as needed)

1. **Standardize inner padding.** Replace inner `pb-6` / `pb-4` with `pb-10 sm:pb-14` so content never sits inside the last 100 px of the slide. (Container already provides outer reserve; this adds a buffer for the bar's visual weight.)
2. **Audit each of the 9 dense slides above** by screenshotting at 1373×927 and 1920×1080. For each one that clips:
   - Reduce row count (e.g. Persona Playbook has 5 personas — convert to 2-column grid of 5 short cards instead of 5 stacked rows).
   - Promote pinpoint `text-[10px]` / `text-[11px]` text to readable sizes (≥ `text-xs` for body, `text-sm` for headers) per the slide typography contract — these are currently too small to project anyway.
   - Convert long single-page lists into 2-card grids that fit within ~820 px of vertical body space.
3. **Verify visually** by capturing post-fix screenshots of each touched slide.

### Files to touch

- `src/components/sales-enablement-slides/SEW3SignalsRecap.tsx` — bump `pb-6` → `pb-10`.
- `src/components/sales-enablement-slides/SEPersonaPlaybook.tsx` — convert 5 stacked rows to 2-col grid; raise text sizes.
- `src/components/sales-enablement-slides/SEDiscoveryQuestionBank.tsx` — verify grid fits; add bottom buffer.
- `src/components/sales-enablement-slides/SEUseCaseCheatSheet.tsx` — same.
- `src/components/sales-enablement-slides/SEFootprintValueLadder.tsx`, `SEFootprintPlaybook.tsx` — verify ladder/play card heights.
- `src/components/sales-enablement-slides/SECompetitiveCheatSheet.tsx`, `SEObjections.tsx` — same.
- `src/components/sales-enablement-slides/SEDiscoveryCallRunbook.tsx` — same.
- `src/components/sales-enablement-slides/SEStrategyVisionSession.tsx` — same.

### Files for Part A

- `src/pages/SalesEnablement.tsx` — re-order W3 slide entries; remove the `se-w3-capstone-recap` entry; add `se-w3-capstone` at the end.
- `src/data/salesEnablementNarration.ts` — delete `se-w3-capstone-recap`; update `se-w3-signals-recap` transition; re-sequence narrations to match new order; add `se-w3-capstone` script.
- `src/components/sales-enablement-slides/SEW3Capstone.tsx` — **new** slide (modeled on `SEW2CapstoneWhiteboard`).
- `mem://content/sales-enablement/week3-field-kit.md` — update the field-kit memory to reflect the new flow.

## Out of scope

- Week 1 and Week 2 content (only the W2 capstone re-use in W3 is touched).
- Audio re-generation (text changes only; voices regenerate on next play).
- The narration bar component itself (size/position stays).
