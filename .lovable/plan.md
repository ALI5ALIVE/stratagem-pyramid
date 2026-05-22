## Goal

Reshape every slide one-pager so the three things the user asked for are the page — paraphrased transcript summary, the key questions to ask, and the objections they'll need to answer — while keeping the coach-card takeaways visible but secondary.

## New one-pager layout (A4 landscape, single page)

```text
┌─────────────────────────────────────────────────────────────────┐
│ Header: Comply365 · Sales Enablement Academy · Wk N / Slide X   │
├──────────────────────────────────────┬──────────────────────────┤
│  TITLE BAR (navy, slide # + title)   │  KEY QUESTIONS TO ASK    │
│  ─────────────────────────────────   │   1.  "….?"              │
│  THE CORE IDEA  (1 line)             │   2.  "….?"              │
│                                      │   3.  "….?"  (optional)  │
│  TEACHING SUMMARY                    │                          │
│   Paraphrased narration, 6–8 lines,  │  OBJECTIONS YOU'LL HEAR  │
│   tightened. The "study" anchor.     │   ▸ Pushback line        │
│                                      │     ↳ Approved response  │
│  COACH CHIPS (one-line, 4 across):   │   ▸ Pushback line        │
│   [Remember]·[Say]·[Watch]·[Bridge]  │     ↳ Approved response  │
├──────────────────────────────────────┴──────────────────────────┤
│ Footer: Time ~60–90s · Drill ☐☐☐☐☐ · Rep-facing                 │
└─────────────────────────────────────────────────────────────────┘
```

Why this shape:
- Left = **study side** (read once, internalise). Summary is the hero block, ~8.5pt, ~520 chars.
- Right = **in-meeting side** (glance at during a call). Questions on top, objections below — the two moves a rep actually does live.
- The original Remember/Say/Watch/Bridge cards stay as a colour-coded chip strip at the bottom of the left column, not a 2×2 — 4 short one-liners, one per chip, same accent colours so the existing colour story still reads.

## Content sourcing

**Teaching Summary** — already implemented via `paraphraseNarration()`. Expand its target length from 540 → ~620 chars now that the right column is doing the heavy lifting. Drop the "What to listen for" block (its job is now done by Key Questions).

**Key Questions to Ask** — new helper `extractDiscoveryQuestions(script, slideId)`:
1. Pull all quoted questions from the narration (`/['"]([^'".?]{15,140}\?)['"]/g`)
2. Also pull bare questions following "ask" / "discovery question" cues
3. Fall back to a small curated `SLIDE_DISCOVERY` map for ~15 slides where narration has none (already known: Week 3 discovery slides, Week 2 capability slides, persona playbook)
4. Cap at 3 questions, each ≤120 chars

**Objections + Responses** — new helper `getSlideObjections(slideId, weekId)`:
- Curated `SLIDE_OBJECTIONS` map for the slides where canonical pushback is known:
  - DTOP slides → "isn't this just workflow?" / "we have a CMS already"
  - Intelligence Layer slides → "we'll build it internally with GPT" / "how is this different from a generic LLM"
  - CoAnalyst / accuracy slides → "90% — prove it" / "what about data security & training on our data"
  - Mobile / Unified Mobile → "our crews already have iPads with X"
  - Strategy & Vision Session → "we're not ready for a workshop"
  - Footprint / pricing → "we only need one app today"
- Fallback to per-week generic objection (2 items) so every slide has something
- Each entry: `{ pushback: string, response: string }`, response always uses approved language, no banned terms, anchors to ~90% vs ~35%, locked customer outcomes, or "Operational Data" where relevant

Both new datasets live in a new file `src/data/salesEnablementSlideAids.ts` so they're easy to edit without touching the PDF renderer.

## Visual treatment

- Questions: brand-blue numbered chips (●1 ●2 ●3), question text in italic slate
- Objections: rose-tinted micro-card per item, pushback in bold slate prefixed with `▸`, response below prefixed with `↳` in emerald-tinted strip
- Coach chips strip: 4 colour-coded pills (amber / emerald / rose / sky) sized to fit one short line each
- Locked-term mini reminder removed from slide pages (lives on cover); foot rule kept

## Files to change

- `src/lib/fieldKitPdf.ts` — replace the slide-card layout; new helpers; remove the 2×2 + listen-for blocks; add Questions and Objections renderers; chip-strip renderer for coach cards
- `src/data/salesEnablementSlideAids.ts` *(new)* — `SLIDE_DISCOVERY: Record<string, string[]>` and `SLIDE_OBJECTIONS: Record<string, Array<{pushback, response}>>` plus per-week fallback sets
- Cover, week-at-a-glance, closing pages stay unchanged (already polished)

## Out of scope

- Editing narration scripts
- New per-slide content beyond questions + objections (no proof points, no persona chips this round — can be added later if needed)
- Per-slide PDFs