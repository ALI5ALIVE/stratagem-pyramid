## Why the current pages don't work

Looking at `renderSlidePagePortrait` and the data feeding it, three problems compound:

1. **There is no transcript summary anywhere.** The page shows Outcome → Core Idea → 3 Beats → Say-it-like-this. None of these tell the rep what the slide actually says when it plays. The rep can't walk into a call having "read the one-pager" and know the story.
2. **Blocks are synonyms of each other.** For slides without a hand-written `SLIDE_LEARNING` entry, `buildSlideLearningFromCoachCard` sets `outcome = cc.remember`, `coreIdea = cc.sayItLikeThis`, `sayLikeThis = cc.sayItLikeThis`. So Outcome, Core Idea and Say-it-like-this all read the same. That's most W2/W3 pages.
3. **No real "key takeaways".** The three teach-beats are written as instructional stage directions ("Put the pen in your hand…"), not as messages the buyer should walk away with.

## What the one-pager needs to be

A single page that lets a rep, five minutes before a call, get:

- The **slide in one breath** (what it says, what it shows).
- The **3 key messages** the buyer must hear.
- The **exact line** to say (one, not three).
- **Discovery questions** to ask after the slide.
- **Objections + responses** if they push back.
- A quiet footer with DTOP stage, persona, what it connects to, banned terms.

Everything that's coaching-about-coaching (rep mistakes, self-check tickboxes, whiteboard recipes, proof-point tables) stays in the two appendix pages already at the back. Slide pages stop trying to be both teaching guide and reference.

## New page structure (portrait A4, two columns)

```text
COMPLY365 · SALES ENABLEMENT ACADEMY        Week N · Slide NN of NN · DTOP · Persona
─────────────────────────────────────────────────────────────────────────────────────
01 / SLIDE TITLE IN CAPS
──── (rule)

WHAT THIS SLIDE DOES                          (full width, 12pt, slate)
2–3 sentence plain-English digest of the
narration. Reads like a teammate explaining
the slide, not transcript prose.

──────────────────────────────  (hairline)

LEFT COLUMN (60%)                             RIGHT COLUMN (40%)

THE 3 KEY MESSAGES                            DISCOVERY QUESTIONS
01  message one (10pt ink, 1 line title +     "Q1 verbatim…"
    1 short supporting clause)                "Q2 verbatim…"
02  message two                               "Q3 verbatim…"
03  message three
                                              ─────── (hairline)
SAY IT LIKE THIS
│ "One short, speakable line."  (pull-quote   IF THEY PUSH BACK
│ italic, 11pt, brand left rule)              Pushback 1 (bold)
                                              > Response 1
                                              Pushback 2 (bold)
                                              > Response 2
─────────────────────────────────────────────────────────────────────────────────────
CONNECTS TO  ...    BANNED HERE  ...                          (footer, 7pt muted)
```

## Data model changes — `salesEnablementLearningOutcomes.ts`

Rename and reshape `SlideLearning` to match what the new page renders. Drop fields that drove duplication; add the two fields the page is actually missing.

```ts
export interface SlideOnePager {
  summary: string;          // 2–3 sentences. "What this slide does."
  keyMessages: [string, string, string];  // 3 takeaways, buyer-facing
  sayLikeThis: string;      // one speakable line
}
```

- `outcome`, `coreIdea`, `teachBeats`, `repMistake`, `checkYourself` are removed from the slide-page data path. `repMistake` and `checkYourself` are kept where they still belong — in the existing Coach's Sidebar appendix (already reads from `SLIDE_MISTAKE` / its own data, no change needed).
- Curate `SLIDE_ONE_PAGER` entries for every slide in W1/W2/W3. Each `summary` is written fresh from the narration script (already in `salesEnablementNarration`) so it actually summarises what plays. Each `keyMessages[i]` is a distinct idea — no synonyms, no repeats of `sayLikeThis`.
- Replace `buildSlideLearningFromCoachCard` with `buildSlideOnePager(slideId, weekId, narration, coachCard)`. When a curated entry is missing, the fallback derives `summary` from the first 2 sentences of `narration.script` (sanitised, trimmed), `keyMessages` from `[coachCard.remember, coachCard.bridge, coachCard.watchOutFor]` deduped against `sayLikeThis`, and `sayLikeThis` from `coachCard.sayItLikeThis`. The dedup step is the fix for "every block says the same thing".

## Renderer changes — `fieldKitPdf.ts`

- Rewrite `renderSlidePagePortrait` to consume `SlideOnePager` and render the structure above. Same margins, same numeral-led title, same footer — the existing visual tokens are good, only the middle of the page changes.
- Drop the "Discovery Wedge / Follow-up" treatment on the right column. Render all available discovery questions as a clean list (up to 3), each as an italic quoted line.
- Drop the per-slide "Core Idea" header and the "Hook · Frame · Proof" stack.
- Footer, header, two appendix pages (`renderCoachSidebarPage`, `renderWhiteboardAppendixPage`) and Week-at-a-glance / Closing pages stay as they are. The Coach's Sidebar appendix continues to carry rep mistakes and self-check questions, so nothing is lost from the kit — it just moves off the per-slide page.
- Update the call site at line 703-726 to call `buildSlideOnePager(...)` and pass the new shape.

## Quality bar before delivery

- Generate a sample PDF for Week 1, 2, 3 via `scripts/genpdf.ts`, render with `pdftoppm`, and inspect every slide page to confirm: (a) the summary reads like a human briefing, not transcript scraps; (b) the 3 key messages are genuinely distinct from each other and from `sayLikeThis`; (c) discovery questions and objections fit the right column without clipping; (d) no Latin-1 boxes from stray glyphs.

## Files touched

- `src/data/salesEnablementLearningOutcomes.ts` — new `SlideOnePager` type, curated `SLIDE_ONE_PAGER` map, new fallback builder. Legacy exports removed.
- `src/lib/fieldKitPdf.ts` — rewrite `renderSlidePagePortrait`, update call site, remove now-unused imports.
- `scripts/genpdf.ts` — only if it needs the new export name.

## Open question

Curated `SLIDE_ONE_PAGER` entries for all ~30 slides is the work that makes this land. I'll write them from the existing narration scripts. **Do you want me to write all three weeks in one pass, or land Week 1 first for you to review the tone before I commit to W2 + W3?**
