## Goal

Make every slide card in the Field Kit PDF (a) richer for learning and (b) strictly one page.

## Two changes

### 1. Add a paraphrased "Teaching Summary" + learning aids to each slide

Per-slide section order (top to bottom on one page):

1. **Header bar** — slide number + title (shrunk vs today)
2. **The core idea** — 1 line, brand-blue eyebrow (kept, tightened)
3. **Teaching Summary** *(new)* — 3–5 sentence paraphrase of the narration. Not verbatim. Written for the rep, explains *why this slide matters in the meeting* in plain coaching voice. Generated programmatically from the narration script with a deterministic paraphraser (rewrite first-person teaching cues like "you must internalise" → "the rep should internalise", strip filler, cap at ~520 chars, end on the value lever sentence).
4. **What to listen for** *(new, 2 micro-bullets)* — customer signals that mean this slide just landed (e.g. "they ask 'how does this connect to our SMS?'") — derived from the discovery question or pain in the narration when present; falls back to a generic per-week prompt if not.
5. **2×2 coach panels** — shrunk (see below)
6. **Footer micro-strip** *(new)* — "Time on slide: ~60–90s · Drill rating: ___/5" so the rep can self-score in the margin

### 2. Force single-page layout

- Page format: switch to **A4 landscape** so the 2×2 grid breathes and the summary block fits above it without overflow.
- Cap card body text at a deterministic max-line count and clip with an ellipsis (coach card fields are already capped at ~320 chars total, but render-side we'll enforce a max of 4 lines per panel).
- Auto font-size step-down: if a slide's title + summary block exceeds the available header zone, drop summary font from 10.5pt → 9.5pt and reduce line height before clipping.
- Recalculate panel height from *remaining* page height after header + summary + listen-for block — no fixed `Math.max(110, …)` floor; instead compute exactly so the 2×2 always lands above the footer with 24pt of breathing room.
- Page numbers + footer chrome stay the same.

## Helper additions in `src/lib/fieldKitPdf.ts`

- `paraphraseNarration(script: string): string` — deterministic rewrite:
  - drop opening "This slide matters because…" / "Why this matters:" / "The core message:" prefixes
  - convert second-person teaching ("you must", "your job") → third-person reference ("reps should", "the goal is")
  - strip filler ("when you deliver this", "slow down", "next slide")
  - join 3 most informative sentences (core message + pain + value lever), cap at 520 chars
- `extractListenFor(script: string, weekId): string[]` — pull the discovery question and the customer-signal sentence; fallback to per-week defaults if absent
- `drawSlideCard(...)` rewritten to layout: title bar (48pt) → core idea (38pt) → summary (variable) → listen-for (38pt) → 2×2 (remaining) → micro footer (16pt)
- Switch `new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" })`

## Files touched

- `src/lib/fieldKitPdf.ts` — only file changed
- No data files touched
- No UI changes outside the PDF

## Out of scope

- Editing narration content itself
- Adding new content to coach cards
- Changing cover / week-at-a-glance / closing pages (they already fit one page each)