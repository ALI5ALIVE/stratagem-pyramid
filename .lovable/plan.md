## Goal

The study notes today read like a generic concept brief — they don't track the actual narration a rep hears in the Academy. Rebuild the one-pager so that **each page is a structured breakdown of that slide's narration**: the script, parsed into ordered bullets, with the supporting facts, terminology, and proof attached to each beat.

A rep should be able to read the page and say: "this is exactly what I just listened to, expanded into the points I need to remember, with the proof points underneath."

## New one-pager shape (single A4 portrait)

```text
┌─────────────────────────────────────────────────────────────┐
│ COMPLY365 · ACADEMY            Week N · Slide nn/NN         │
│ 01 / SLIDE TITLE                                            │
│ ───                                                         │
│ THE NARRATION IN ONE LINE                                   │
│ Single sentence summary of the script (what this slide is   │
│ teaching the rep).                                          │
│                                                             │
│ KEY POINTS FROM THE NARRATION                               │
│ Ordered bullets that follow the 5-part script structure:    │
│   1. Why this slide matters                                 │
│      ↳ supporting detail (1–2 lines from the script)        │
│      ↳ proof / stat (with source) if the script cites one   │
│   2. The core message (verbatim line the rep must own)      │
│      ↳ supporting detail                                    │
│   3. Pain → Value pivot                                     │
│      ↳ the pain named                                       │
│      ↳ the value lever pulled                               │
│   4. How to deliver it (tone / what to point at / landmines)│
│      ↳ supporting detail                                    │
│   5. Transition into the next slide                         │
│                                                             │
│ ── hairline ──                                              │
│ TERMS ON THIS SLIDE       │  WATCH-OUT                      │
│ Term · short def          │  Forbidden language / common    │
│ Term · short def          │  misconception for this topic   │
│                           │                                 │
│ SUPPORTING FACTS          │  HOW THIS CONNECTS              │
│ • stat + source           │  Prev < … > Next                │
│ • stat + source           │  DTOP step · Core App           │
└─────────────────────────────────────────────────────────────┘
```

The page is dominated by **Key points from the narration** — that's the study material. Everything else (terms, facts, watch-out, connections) is supporting matter pinned underneath.

## Data model (`src/data/salesEnablementStudyNotes.ts`)

Replace `SlideOnePager` with a narration-derived shape:

```ts
export interface KeyPoint {
  /** The beat from the 5-part script — e.g. "Why this matters" */
  beat: "Why this matters" | "Core message" | "Pain → Value" | "How to deliver" | "Transition";
  /** The headline takeaway for this beat (≤ 18 words). */
  point: string;
  /** Supporting bullets — 1–3 lines of detail / verbatim phrasing / nuance. */
  support: string[];
  /** Optional proof line tied to this beat (with source in parens). */
  proof?: string;
}

export interface SlideOnePager {
  /** Single-sentence digest of the full narration. */
  narrationInOneLine: string;
  /** Ordered breakdown of the 5-part script. 3–5 entries. */
  keyPoints: KeyPoint[];
  /** Glossary entries scoped to this slide. */
  terms: StudyTerm[];
  /** Defensible facts not already attached to a beat. */
  facts: string[];
  /** Forbidden language or common misconception. */
  watchOut: string;
  /** Where this slide sits — DTOP step, Core App, prev/next slide. */
  connectsTo: string[];
}
```

`whyItMatters`, `keyIdeas`, `inOneSentence`, `checkYourself` are removed — they're either folded into `keyPoints[]` or dropped (the self-test wasn't what the user asked for; the narration breakdown replaces it).

## Builder logic

1. **`fromCurated(slideId)`** — hand-written for every W1/W2/W3 slide. The narration script in `salesEnablementNarration.ts` is the source of truth. Each script is already written in the 5-part Coach Script Standard (Why matters → Core message → Pain→Value → How to deliver → Transition), so the parser maps 1:1 onto `keyPoints[]`.
2. **`fromNarration(script, week)`** — safety-net fallback. Splits the script on signpost phrases ("Why this matters", "The core message", "The pain", "Deliver", "Transition" / "Next") and assigns each segment to the matching beat. Headline = first sentence; support = remaining sentences in that segment.
3. **Proof attachment** — facts from `SLIDE_PROOFS` are matched into beats where the topic overlaps (e.g. an accuracy stat lands on the "Core message" of the Intelligence Layer slide); leftovers land in the standalone `facts[]` block.
4. **Hard dedupe** — a sentence used in `narrationInOneLine` or a `point` cannot reappear in `support` or `facts`.

## Curation pass

Hand-write a `SlideOnePager` for **every slide** in W1/W2/W3. For each slide:

- Read the matching script in `salesEnablementNarration.ts`.
- Split it into the 5 beats; lift the headline sentence for each `point`; pull the remaining detail into `support[]`.
- Attach matching proofs from `SLIDE_PROOFS`; keep "How to deliver" beats verbatim where the script gives stage directions ("slow down", "point at the foundation first", "don't say AI").
- Pull terms from the shared `T` atom library; add slide-specific terms inline.
- Watch-out = banned terms or common reps' mistakes pulled from `salesEnablementCoachCards`.

## Renderer changes (`src/lib/fieldKitPdf.ts`)

Rewrite `renderSlidePagePortrait`:

- Header: numeral-led title + Week/Slide chip (unchanged).
- New dominant block: **KEY POINTS FROM THE NARRATION**. Each `KeyPoint` rendered as a numbered card:
  - Beat label (small, brand-coloured uppercase) + headline `point` (semibold).
  - `support[]` as indented hairline-prefixed lines.
  - `proof` (if present) rendered with a tiny "PROOF" tag and source in parens.
- Below a hairline: 2×2 grid — `TERMS` / `WATCH-OUT` on top row, `SUPPORTING FACTS` / `HOW THIS CONNECTS` underneath.
- Palette: `ink`, `brand`, `slate`, `muted`, `hairline`, `rose` for watch-out only.
- Drop the standalone "In one sentence", "Why it matters", "Key ideas", "Check yourself" blocks from the previous spec.

## Appendix pages

- **Glossary appendix** — same as before, aggregates `terms[]` across the week, deduped.
- **Sell-and-win appendix (W3 only)** — unchanged; consolidates discovery questions + objections.
- Coach's Sidebar and Whiteboard appendix stay dropped.

## QA pass

Regenerate W1/W2/W3 PDFs with `scripts/genpdf.ts`, render each page to JPEG with `pdftoppm -jpeg -r 150`, and check every page for:

1. **Tracks the script** — bullets are in the same order as the narration and faithfully cover all 5 beats.
2. **No echo** — no sentence appears twice on the page.
3. **Voice rules** — BrandNumber spelling, no FOQA/FDM/ASAP/"CoAnalyst", approved proof figures only, `$25–35B` cited with Eurocontrol/IATA/SITA when used.
4. **Layout** — A4 portrait holds; no orphaned beats; no clipped text; key-points block stays the visual centrepiece.
5. **Self-sufficient** — a rep who hears the script once can read the page and have the entire breakdown plus supporting facts.

Fix, regenerate, re-inspect; summarise issues found and fixes applied.

## Files to edit

- `src/data/salesEnablementStudyNotes.ts` — new `KeyPoint` + `SlideOnePager` shape, curated entries for all W1–W3 slides, narration-based fallback.
- `src/lib/fieldKitPdf.ts` — rewrite `renderSlidePagePortrait` for the key-points layout; keep Glossary + Sell-and-Win appendices.
- `scripts/genpdf.ts` — unchanged; used to drive QA.

## Out of scope

In-app Academy UI, narration audio, coach card data. Field Kit PDF only.
