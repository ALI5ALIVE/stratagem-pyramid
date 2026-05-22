## Goal

Reformat the three week intro slides (W1/W2/W3) so the "What you'll learn" block reads as a scannable, outcome-led checklist instead of a 70+ word run-on sentence. Visual hierarchy: title → tight intent line → 4–6 measurable outcomes → existing "up next" chips.

Affects only the week divider slides at the start of each week — not the per-slide narration or PDFs.

---

## Visual layout

```text
┌────────────────────────────────────────────────────────────┐
│ [Week 2] [Capabilities] [~16 min]                          │
│                                                            │
│ How the capabilities fit together                          │
│ The intent line — one sentence, the spine of the week.     │
│                                                            │
│ ┌── What you'll be able to do by the end of Week 2 ──────┐ │
│ │ ✓  Walk the Platform map end to end                    │ │
│ │ ✓  Position Insights & Intelligence as platform-wide   │ │
│ │ ✓  Defend ~90% domain vs ~35% generic AI               │ │
│ │ ✓  Anchor Regulation Management as end-to-end proof    │ │
│ │ ✓  Close the loop with Unified Mobile on-device        │ │
│ │ ✓  Tell the whole story as one DTOP loop in 60s        │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ Up next  [chip] [chip] [chip] …                            │
└────────────────────────────────────────────────────────────┘
```

Each outcome is verb-led, ≤ 9 words, one line. Six outcomes max per week so nothing wraps.

---

## Changes

### 1. `src/components/sales-enablement-slides/SEModuleDivider.tsx`

- Add `intent?: string` (one-line spine) and `outcomes?: string[]` props alongside the existing `learningGoal`. Keep `learningGoal` as a fallback so any caller that hasn't migrated still renders.
- Replace the single-paragraph "What you'll learn" block with:
  - An eyebrow `What you'll be able to do by the end of Week N`
  - A 2-column grid (md+) of outcomes, each with a small emerald `CheckCircle2` icon
  - On `<md`, collapses to a single column
  - Optional `intent` sentence sits between the title and the outcomes box at 16pt muted-foreground
- Keep the emerald border + soft fill so it still reads as the learning panel.
- If `outcomes` is empty, fall back to rendering `learningGoal` as today (no regression for other callers).

### 2. `src/pages/SalesEnablement.tsx` — `weekProps`

Replace the wall-of-text `learningGoal` for w1/w2/w3 with a short `intent` and an `outcomes` array. Proposed copy (mirrors today's content, broken into measurable verbs):

**W1 — Foundation**
- intent: `Set the scene, put the platform in plain English, and learn the operating loop that makes everything land.`
- outcomes:
  - `Explain why the market is shifting in one minute`
  - `Deliver the one-sentence platform pitch from memory`
  - `Walk the DTOP loop on a whiteboard, in order`
  - `Name the four signal sources behind Detect`
  - `Name the four capability bands in canonical order`
  - `Run the Week 1 recap as a talk track, not a slide read`

**W2 — Capabilities**
- intent: `Walk the platform map and prove why the Intelligence Layer beats generic AI.`
- outcomes:
  - `Walk the Platform map end to end`
  - `Position Insights & Intelligence as platform-wide`
  - `Tell the Intelligence stack: Insights → Recommendations → Automation`
  - `Defend the ~90% domain vs ~35% generic AI headline`
  - `Anchor Regulation Management as end-to-end proof`
  - `Close the loop with Unified Mobile on-device`
  - `Tell the whole story as one DTOP loop in 60 seconds`

**W3 — Sell & Win**
- intent: `Pick the account, run the call, handle the objections, book the Strategy & Vision Session.`
- outcomes:
  - `Pick high-propensity accounts to chase`
  - `Run a discovery call that surfaces the wedge`
  - `Pull the right discovery questions for the room`
  - `Read the persona and adapt on the fly`
  - `Handle the top 8 objections without flinching`
  - `Position against any competitor in the DTOP loop`
  - `Land the scripted next-step language every time`
  - `Put the 3-hour Strategy & Vision Session on the table`

(W3 has 8 outcomes — render in 2 columns so it still fits without a wall.)

### 3. Out of scope

- `salesEnablementNarration.ts` weekly narration scripts — untouched (those are spoken, paragraph form is fine there).
- `salesEnablementStudyNotes.ts` — untouched.
- Field-kit PDF — untouched.
- Per-slide divider props for any non-week modules — untouched (they use `learningGoal` and will keep working via the fallback path).

---

## Validation

1. Open `/sales-enablement` and step through the W1, W2, W3 divider slides at 1141×786 (current viewport) and at a narrower mobile width.
2. Confirm:
   - No paragraph wider than ~10 words on any outcome row.
   - No outcome wraps to a third line.
   - Title + intent + outcome panel + Up-next chips all fit on one screen without scrolling.
   - Emerald checklist icons render and align to the first line of each outcome.
3. Confirm any other module dividers that still pass `learningGoal` keep rendering exactly as before.
