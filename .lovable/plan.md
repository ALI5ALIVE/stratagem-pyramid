## Goal

Write the full 35–40 minute CEO keynote script for "From Silos to Signals" and surface it on the existing `/keynote/silos-to-signals` page so it can be read on-screen and downloaded.

## Script structure

One script, seven acts, matching the existing `acts` array in `SilosToSignalsKeynote.tsx`. Each act gets:

- **Stage direction** (one line, italic) — where the CEO is, tempo, lighting
- **Spoken script** (3–8 short paragraphs) — what the CEO actually says, written for the ear, not the page
- **Cue** (one line) — the screen/audio trigger that closes the act

Tone: confident, evidence-led, low-jargon. Master message lands twice — once at the end of Act 04 (Naming the new game) and once in the closing line of Act 07. No mention of "two named operators" in Act 06 — keep the focus on the intelligence layer (per prior correction). Stats used: ~65% lost signals, $25–35B exposure, ~90% vs ~35% accuracy framed as time-to-resolve and operating-model outcomes (per prior correction).

Approx word counts per act (≈140 wpm spoken):
- 01 Cold open · 2.5 min · ~350 w
- 02 Silo era · 4.5 min · ~630 w
- 03 Research · 6 min · ~840 w
- 04 Naming the new game · 5 min · ~700 w
- 05 Film · 2 min stage-silent intro · ~120 w
- 06 Intelligence layer · 10 min · ~1,400 w
- 07 Call to arms · 5 min · ~700 w

## Page changes (`src/pages/keynote/SilosToSignalsKeynote.tsx`)

1. **New data file** `src/data/silosToSignalsScript.ts` — typed export: `{ actId, stageDirection, paragraphs: string[], cue }[]`, one entry per act, keyed to existing `acts[].id`.
2. **New `ScriptBlock` component** inside the keynote page (or a sibling file `src/components/keynote/ScriptBlock.tsx`) — renders inside each `ActSection`, below the Beats card:
   - Header: "Spoken script" with mic icon, est. words + minutes
   - Stage direction in muted italic
   - Paragraphs in serif-leaning, larger leading for readability (`text-base leading-[1.75] text-foreground/90`)
   - Closing "Cue" line in uppercase tracking, accent color of the act
3. **Top-of-page "Full script" affordance** — add a single anchor button in the hero stat row area: "Read full script ↓" that smooth-scrolls to a new `#script` section *and* a "Print script" button that opens a print-styled view (reuse `window.print()` with a print stylesheet hiding everything except the script blocks).
4. **Downloads section** — wire the existing "Speaker script (PDF)" card to trigger the same `window.print()` action (browser → Save as PDF). No new PDF pipeline; keeps scope tight.

## Out of scope

- No changes to the Remotion video, audio, or VO files.
- No backend / DB / auth changes.
- No new routes.
- No regeneration of narration audio.

## Files touched

- **Add** `src/data/silosToSignalsScript.ts`
- **Add** `src/components/keynote/ScriptBlock.tsx`
- **Edit** `src/pages/keynote/SilosToSignalsKeynote.tsx` — import script data, render `<ScriptBlock>` inside each `ActSection`, add hero "Read full script" link, wire Downloads "Speaker script (PDF)" to `window.print()`, add print CSS (scoped `<style>` block or `@media print` in `src/index.css`).

Ready to draft the script and wire it in on approval.