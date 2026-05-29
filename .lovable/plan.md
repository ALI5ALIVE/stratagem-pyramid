## Goal

Give sellers a condensed Medium Pitch to practice with, and rename the current Medium Pitch to Long Pitch.

**New Medium Pitch** (drops Automation + Recommendations & Prescriptive Actions):

1. Title
2. Strategic Shift
3. Customer Outcomes
4. The Platform (Overview)
5. ▸ DTOP divider
6. DTOP — System of Work
7. ▸ Mobile divider
8. Unified Mobile
9. ▸ Intelligence Layer divider
10. Intelligence Layer (CoAnalyst)
11. Intelligence Layer vs Generic AI
12. ▸ Regulation Management divider
13. Regulation Management
14. ▸ 2026 Phased Roadmap divider
15. 2026 Phased Roadmap
16. Why Comply365

**Removed from Medium:** `exec3-slide-automation`, `exec3-slide-insights-summary` (Insights — Just Ask), `exec3-slide-insights` (Recommendations & Prescriptive Actions).

**Long Pitch** = today's `/pitch-executive-3` deck, unchanged in content. Only labels/filenames change to "Long".

## Changes

### 1. New condensed deck data
`src/data/execPitchMediumSlides.ts` (new) — re-exports the dividers from `execPitch3Slides.ts` and defines `execPitchMediumSlides` as the 16-slide array above, reusing the same slide components, IDs, and `buyerFocus` strings so narration and `practiceSlidePrompts` keep working for the surviving IDs.

### 2. New page
`src/pages/ExecutivePitchMedium.tsx` (new) — clone of `ExecutivePitch3.tsx` but imports `execPitchMediumSlides`, sets:
- `pptxDeckId: "executive-pitch-medium"`
- `pdfFilename: "Comply365-Executive-Pitch-Medium.pdf"`
- `deckLabel: "Executive Pitch · Medium"`

Reuses `useExec3PitchNarration` (narration entries for removed slide IDs simply won't fire).

### 3. Rename existing deck to Long
`src/pages/ExecutivePitch3.tsx` — change export config:
- `pptxDeckId: "executive-pitch-long"`
- `pdfFilename: "Comply365-Executive-Pitch-Long.pdf"`
- `deckLabel: "Executive Pitch · Long"`

### 4. Routing
`src/App.tsx` — add `<Route path="/pitch-executive-medium" element={<ExecutivePitchMedium />} />`. Keep `/pitch-executive-3` for the Long deck.

### 5. Sidebar
`src/components/AppSidebar.tsx` — replace the single "Medium — Executive Pitch" entry with two entries:
- `Medium — Executive Pitch` → `/pitch-executive-medium`
- `Long — Executive Pitch` → `/pitch-executive-3`

### 6. Home page
`src/pages/HomePage.tsx` — update the existing card to "Long — Executive Pitch" (`/pitch-executive-3`, badge "Long · ~30–35 min · 20 slides") and add a new "Medium — Executive Pitch" card (`/pitch-executive-medium`, badge "Medium · ~20–25 min · 16 slides").

### 7. PPTX exporter
`src/exporters/pptx/index.ts` — add a new deck key `executive-pitch-medium` (filename `Comply365-Executive-Pitch-Medium.pptx`, label `Executive Pitch · Medium`) and rename `executive-pitch-3` to filename `Comply365-Executive-Pitch-Long.pptx`, label `Executive Pitch · Long`.

`src/exporters/pptx/buildExecutivePitch3Deck.ts` — update `DECK_LABEL` and `pptx.title` to "Long". Add `buildExecutivePitchMediumDeck.ts` that imports `execPitchMediumSlides` and reuses the existing slide builders (or factor the shared body into a helper and call it from both).

Type union in `src/exporters/pptx/index.ts` adds `"executive-pitch-medium"`.

### 8. Practice Center
`src/data/practiceScenarios.ts` — point the existing 5 scenarios at the new Medium deck:
- `deckTitle: "Medium — Executive Pitch"` (unchanged label)
- `deckRoute: "/pitch-executive-medium"`

This is what sellers practice with, per the request. Optionally add a parallel set of Long scenarios — confirm with user before doing so (default: do not add, keep practice on Medium only).

`src/pages/PracticeCenter.tsx` — no logic change needed; the `dtop`/`mobile`/`intelligence` jump targets and `exec3-slide-insights-summary` override are gated by slide id and only fire if the id is present in the active deck.

### 9. Narration
`src/data/executivePitchNarration.ts` — leave as-is. Entries for removed IDs (`exec3-slide-automation`, `exec3-slide-insights-summary`, `exec3-slide-insights`) stay in the file but never resolve in the Medium deck because those slide IDs aren't rendered. The Long deck keeps full narration.

### 10. Memory
Update `mem://index.md` with a short note pointing at a new `mem://product/executive-pitch-decks` file describing Medium = 16 slides (no Automation, no Recommendations) and Long = full 20 slides. Existing pitch persona memory is unchanged.

## Out of scope

- No copy edits to surviving slides
- No changes to other decks (Operational, Technical, CoAnalyst, etc.)
- No new narration recordings — Medium uses the subset that already exists
- No PDF/PPTX visual redesign — just relabeling and a second deck definition

## Acceptance

- `/pitch-executive-medium` loads the 16-slide condensed deck with sidebar, narration, PDF, and PPTX export all working and labeled "Medium".
- `/pitch-executive-3` still loads the full deck, now labeled "Long" everywhere (sidebar, footer, PPTX filename, PDF filename, home card).
- Practice Center scenarios route to `/pitch-executive-medium` and run end-to-end.
- Home page shows both cards.
