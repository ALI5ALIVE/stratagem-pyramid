## Goal

Reframe the slide one-pagers as **study notes**, not delivery scripts. These are internal Academy slides — the reader is a sales rep building knowledge. Each page should leave them genuinely smarter on the topic: what it is, why it matters, how it connects to the rest of the platform story, the facts and terminology they must own, and a self-check to prove they know it.

## What changes vs. the previous direction

| Was (delivery-focused) | Now (knowledge-focused) |
|---|---|
| "How to deliver in 4 steps" | "What you need to know" — concept explainer |
| Verbatim `say >` lines | Plain-English explanation in the rep's own voice |
| Discovery questions / objections on every page | Moved to a Week 3 sell-and-win appendix only |
| Anchor line ("say it like this") | Mental model / one-sentence definition |
| Whiteboard cue prominent | Optional, only on slides where the visual matters |

## New one-pager spec (single A4 portrait, study-note format)

```text
┌─────────────────────────────────────────────────────────────┐
│ COMPLY365 · SALES ENABLEMENT ACADEMY    Wk N · Slide nn/NN  │
│                                          Topic · Module     │
│                                                             │
│ 01 / SLIDE TITLE                                            │
│ ───                                                         │
│ IN ONE SENTENCE                                             │
│ The concept defined in plain English. The thing you must    │
│ be able to explain back from memory.                        │
│                                                             │
│ WHY IT MATTERS                                              │
│ 2–3 sentences: where this sits in the platform story, what  │
│ problem it solves, why a buyer cares.                       │
│                                                             │
│ ── LEFT 60% ──────────────  ── RIGHT 40% ─────────────────  │
│                                                             │
│ THE KEY IDEAS (3–4)          TERMS TO KNOW                  │
│ • Idea 1 — short paragraph    Term · short definition       │
│ • Idea 2 — short paragraph    Term · short definition       │
│ • Idea 3 — short paragraph    Term · short definition       │
│                                                             │
│ FACTS & PROOF                 WATCH-OUT                     │
│ • stat + source               Forbidden language / common   │
│ • stat + source               misconceptions for this topic │
│ • stat + source                                             │
│                              HOW THIS CONNECTS              │
│                              Prev slide < … > Next slide    │
│                              Links to: DTOP step, Core App  │
│                                                             │
│ ── hairline ──                                              │
│ CHECK YOURSELF                                              │
│ Three questions a rep must answer out loud before moving    │
│ on. No verbatim talk track — just diagnostic questions.     │
└─────────────────────────────────────────────────────────────┘
```

Hierarchy: **In one sentence → Why it matters → Key ideas → Terms / Facts / Watch-out → How it connects → Check yourself.** That's the learning arc.

## Data model (`src/data/salesEnablementLearningOutcomes.ts`)

Replace `SlideOnePager` with a study-note shape:

```ts
export interface StudyTerm { term: string; definition: string; }

export interface SlideOnePager {
  inOneSentence: string;        // the definition the rep must own
  whyItMatters: string;         // 2–3 sentences of context
  keyIdeas: string[];           // 3–4 concept paragraphs (≤ 30 words each)
  terms: StudyTerm[];           // 3–5 glossary entries scoped to this slide
  facts: string[];              // up to 3, each with source in parens
  watchOut: string;             // misconception or forbidden terminology
  connectsTo: string[];         // e.g. "DTOP · Detect", "Core App · SafetyManager365"
  checkYourself: string[];      // 3 diagnostic questions
}
```

Builder logic:

- `fromCurated(slideId)` — hand-written for every W1 / W2 / W3 slide. The narration script is the source of truth for `whyItMatters` and `keyIdeas`; coach-card and existing `SLIDE_LEARNING` data feed `inOneSentence` and `checkYourself`; `SLIDE_PROOFS` feeds `facts`; banned-terms / `repMistake` feed `watchOut`.
- `fromNarration(script, coachCard, week)` — only used as a safety net. Parses the narration for definitional sentences and numeric proof sentences; falls back to a week-level study note if a slide has neither curated nor narration data.
- Hard dedupe: a sentence used in `inOneSentence` or `whyItMatters` cannot reappear in `keyIdeas` or `facts`. Terms cannot duplicate sentences elsewhere on the page.

## Renderer changes (`src/lib/fieldKitPdf.ts`)

Rewrite `renderSlidePagePortrait` for the study-note layout above:

- Header keeps numeral-led title and metadata strip, but the strip carries **Topic** and **Module** instead of DTOP/Persona (those move into "How this connects").
- Drop the `say >` quote rule, the discovery column, and the "If they push back" block. Those are sell-and-win artefacts and don't belong on a knowledge-building page.
- Right column carries `TERMS TO KNOW`, `HOW THIS CONNECTS`, and `WATCH-OUT`.
- Left column carries `KEY IDEAS` (numbered) and `FACTS & PROOF` underneath.
- Footer becomes a hairline + `CHECK YOURSELF` row with three numbered questions (so the rep finishes the page on a self-test, not a marketing line).
- Restricted palette: `ink`, `brand`, `slate`, `muted`, `hairline`, `rose` for watch-out only.

## Appendix pages (per week)

- **Glossary appendix** — aggregates every `terms[]` entry across the week into a single A–Z reference, deduped.
- **Sell-and-win appendix (Week 3 only)** — moves the discovery questions + objection responses (currently on every page) into one consolidated page, since they only become relevant once a rep is selling, not while studying.
- Drop the current Coach's Sidebar and Whiteboard appendix; their data either moves on-page (watch-out, key ideas) or into the sell-and-win appendix (whiteboard cue).

## Per-week curation

Hand-write a `SlideOnePager` for every slide in `week1` / `week2` / `week3` of `salesEnablementCoachCards`. Source order:

1. Narration script → `inOneSentence`, `whyItMatters`, `keyIdeas`
2. Coach card `remember` / `watchOutFor` → `watchOut`, `checkYourself`
3. `SLIDE_PROOFS` / `SLIDE_META` → `facts`, `connectsTo`
4. Project terminology rules → `terms` (e.g. DTOP, Operational Data, Generative AI, BrandNumber names)

## QA pass

Generate W1, W2, W3 PDFs via `scripts/genpdf.ts`, render each page to JPEG with `pdftoppm -jpeg -r 150`, and inspect every page for:

1. **No echo** — `inOneSentence`, `whyItMatters`, each `keyIdeas` entry, each `facts` entry are textually distinct.
2. **Teaches something** — every block adds new information; no paraphrase loops.
3. **Voice rules** — BrandNumber spelling intact; no FOQA / FDM / ASAP / "CoAnalyst"; ROI figures only from approved proof set; `$25–35B` cited with Eurocontrol / IATA / SITA when used.
4. **Self-sufficient** — a rep who has never seen the slide could read the page and explain the concept.
5. **Layout** — A4 portrait, two-column balance holds, "Check yourself" never gets orphaned to a second page, no clipped text.
6. **Visual QA** — fix any issue, regenerate, re-inspect. Summarise issues found and fixes applied.

## Files to edit

- `src/data/salesEnablementLearningOutcomes.ts` — new study-note shape, curated entries for all W1–W3 slides, narration fallback.
- `src/lib/fieldKitPdf.ts` — rewrite `renderSlidePagePortrait`, replace appendix pages with Glossary (all weeks) + Sell-and-Win (W3 only).
- `scripts/genpdf.ts` — unchanged; confirm it still emits the three weekly PDFs for QA.

## Out of scope

- No changes to in-app Academy UI, narration audio, or coach card data. Field Kit PDF only.
