# Slide One-Pager Redesign — Learning-Outcome First

## The diagnosis

You're right on both counts.

**1. "Funny text"** — three real bugs in `fieldKitPdf.ts`:
- The Teaching Summary bullet renderer builds `"${lead} — ${body}"`, runs it through `splitTextToSize`, then tries to detect the lead with `firstLine.startsWith("${lead} — ")`. After wrap, that prefix is often broken across lines or stripped of its leading space, so the bold lead-in either prints twice (`Core — Core message...`), prints with a stray leading ` — `, or disappears entirely.
- The Verbatim Lift wraps text in `"..."` but the source script frequently already contains smart quotes (`"…"`) or em-dashes; helvetica core then renders those as the wrong glyph or a box.
- Proof points only sanitise three glyphs (`→ – " "`); other slides leak bullets (`•`), arrows (`↳`), or non-breaking spaces from the data files.

**2. "Not really teaching"** — structural, not cosmetic. Today the left column does one thing: it paraphrases the narration script. So the rep gets a watered-down version of what they were about to read anyway. There is no:
- explicit learning outcome ("by the end of this slide the rep can…")
- mental model / why-it-matters frame
- worked example
- check-for-understanding question
- common rep mistake (separate from common buyer pushback)

It reads like a transcript excerpt because that's exactly what it is.

## The fix: anchor every one-pager to a learning outcome

Yes — making each page outcome-led is the right move. It gives the rep a clear "I know I've got this when…" bar, and it gives every other block on the page a job (it either teaches the outcome, drills it, or proves it).

### New per-slide page anatomy

```text
┌─────────────────────────────────────────────────────────────────────┐
│ COMPLY365 · SALES ENABLEMENT ACADEMY      Wk N · Slide 03 of 12     │
├─────────────────────────────────────────────────────────────────────┤
│ [DTOP chip]  PERSONA: Exec · Ops    TIME ON SLIDE: 60–90s           │
├─────────────────────────────────────────────────────────────────────┤
│ SLIDE 03  ·  <Slide title>                                          │
├──────────────────────────────────┬──────────────────────────────────┤
│ LEARNING OUTCOME                 │ KEY QUESTIONS TO ASK             │
│ "By the end of this slide, the   │ 1. "..."                         │
│  rep can <verb> <object> so that │ 2. "..."                         │
│  <buyer outcome>."               │ 3. "..."                         │
│                                  │                                  │
│ THE CORE IDEA (1 sentence)       │ OBJECTIONS & APPROVED ANSWERS    │
│ <bold single line>               │ [pushback → response] × 2        │
│                                  │                                  │
│ HOW TO TEACH IT (3 beats)        │                                  │
│  1. Hook — <one line>            │                                  │
│  2. Frame — <one line>           │                                  │
│  3. Proof — <one line>           │                                  │
│                                  ├──────────────────────────────────┤
│ SAY IT LIKE THIS                 │ PROOF POINTS YOU CAN DROP        │
│ "<short, speakable line>"        │ · ...                            │
│                                  │ · ...                            │
│ WHITEBOARD / WHERE TO POINT      │ COMMON REP MISTAKE               │
│ <one diagrammatic instruction>   │ <what not to do, and why>        │
├──────────────────────────────────┴──────────────────────────────────┤
│ CHECK YOURSELF: <one question the rep should be able to answer>     │
└─────────────────────────────────────────────────────────────────────┘
```

Every block now has a clear job:
| Block | Job |
|---|---|
| Learning outcome | The bar — what "good" looks like for this slide |
| Core idea | The one sentence the rep must own |
| How to teach it | The 3-beat delivery recipe (replaces the transcript paraphrase) |
| Say it like this | A short, near-verbatim line the rep can actually speak |
| Whiteboard / where to point | The physical action that anchors the idea |
| Key questions | Discovery the rep can run *from* this slide |
| Objections | The pushbacks this slide triggers + approved answers |
| Proof points | Credibility drops |
| Common rep mistake | Self-coaching — distinct from buyer objection |
| Check yourself | One question per page that gates moving on |

## Scope of changes

### 1. New curated data layer — `src/data/salesEnablementLearningOutcomes.ts`
For each slide ID, a typed record:
```ts
{
  outcome: string;          // "By the end the rep can ..."
  coreIdea: string;         // one sentence, ≤140 chars
  teachBeats: [             // exactly 3
    { label: "Hook",  text: string },
    { label: "Frame", text: string },
    { label: "Proof", text: string },
  ];
  sayLikeThis: string;      // ≤160 chars, speakable
  repMistake: string;       // distinct from buyer objection
  checkYourself: string;    // one diagnostic question
}
```
With per-week fallbacks (same pattern as `WEEK_DISCOVERY_FALLBACK`) so slides without a hand-written entry still get a sensible page. I'll seed it with Week 1 fully hand-written (12 slides) and Weeks 2–3 using high-quality fallbacks the rep can still use; we can fill in per-slide entries as they get reviewed.

### 2. `fieldKitPdf.ts` — replace the left column
- Delete `paraphraseNarration`, `paraphraseNarrationBullets`, `extractVerbatimLift`, `extractCoreLine` (transcript-derived content is the root cause of the "not teaching" feel).
- New `renderLearningBlock`, `renderTeachBeats`, `renderSayLikeThis`, `renderCheckYourself` helpers that read from the curated data layer.
- Keep `drawAccentBlock`, `drawMetaStrip`, right-column rendering largely as-is.

### 3. Fix the rendering glitches
- Bold lead-in: render the lead and body as two separate `text()` calls (no concatenated em-dash through `splitTextToSize`); wrap body alone, indent wrapped lines.
- Global `sanitizeForHelvetica(str)` utility applied at every write site: maps `→ ↳ — – • " " ' ' …` and strips other non-Latin-1. Replaces the ad-hoc sanitisation in the proofs block.
- Verbatim lift removed (it was the worst offender for stray quotes); replaced by the curated `sayLikeThis` string which we control.

### 4. Cover page — small reinforcement
- Add a one-line note under "What you'll be able to do by Friday": *"Every slide one-pager is anchored to a single learning outcome — tick the Check Yourself line before you move on."*

## What stays the same
- Cover, Week-at-a-glance, Closing drill pages — untouched.
- Right column (Questions / Objections / Proofs / Common Mistake) — untouched structurally; just gets the sanitiser.
- Coach cards, narration data — untouched.
- Visual system (colours, fonts, chrome) — untouched.

## Verification
1. Generate Week 1 PDF, rasterise pages 3, 5, 9, 14 with `pdftoppm`.
2. Confirm: no stray `—`, no doubled lead-ins, no boxed glyphs in proofs/objections, learning-outcome block reads as a coaching brief not a transcript, every page ends with a Check Yourself line.
3. Re-check Week 2 and Week 3 with fallback content to confirm no slide page renders empty blocks.

## Open question
Should the **Common Rep Mistake** stay on the right column next to objections (current placement, framed as "while objections are buyer pushbacks, this is the rep's own pushback"), or move to the left column under the teach beats (framed as part of teaching the slide)? My recommendation: leave it on the right next to objections — it keeps the left column as a clean teach → drill flow.
