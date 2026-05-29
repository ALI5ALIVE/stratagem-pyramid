
# Comply365-Branded PPTX for Medium + Long Executive Pitch

## What I extracted from the template
- **Palette**: black `#000000`, near-black `#121418`, charcoal `#2C2F37`/`#52555C`, white, primary blue `#0057FF`, deep blue `#005389`, cyan `#00BBC7`/`#0097A7`, magenta accent `#BA0081`, ice text `#C3CFE5`.
- **Type**: Arial (theme's Latin font) — safe everywhere.
- **Chrome**: dark background, `COMPLY365` wordmark bottom-left, small jet mark top-right, slide number bottom-right, thin blue accent bar on dividers, aircraft photo on title/section slides.
- **Layout families**: Title (photo right, headline left), Section divider (photo right, big headline left), Content (dark bg, eyebrow + title + columns), Closer/CTA, Stat/comparison.

## Scope (locked)
- Only the **Medium (16-slide)** and **Long (20-slide)** Executive Pitch PPTX exports change.
- All other deck exporters and all web slides remain untouched.
- Output is **fully editable native pptxgenjs shapes** — no slide-as-image. Only the wordmark, jet mark, and the existing platform-ecosystem PNG are embedded as images.
- Add a visible "Download Editable PowerPoint" button to the Medium and Long pitch title slides (button already wired via `pptxDeckId`; just needs `hidePdfExport` removed / a dedicated PPTX button surfaced — see step 4).

## Approach

### 1. Brand assets
- Pull `COMPLY365` wordmark and jet-mark PNG out of `/tmp/tpl_unpacked/ppt/media/` and save under `src/assets/brand/comply365/`:
  - `wordmark-white.png`, `jet-mark.png`, `cover-wing.jpg`, `divider-wing.jpg`.
- These are real template assets, so chrome will pixel-match the source deck.

### 2. New brand module — `src/exporters/pptx/comply365Brand.ts`
Exports:
- `BRAND = { colors: { bg:'121418', surface:'1B1E24', primary:'0057FF', deepBlue:'005389', cyan:'00BBC7', magenta:'BA0081', text:'FFFFFF', muted:'C3CFE5' }, fonts: { heading:'Arial', body:'Arial' } }`
- `defineComply365Masters(pptx)` — registers 4 slide masters via `pptx.defineSlideMaster(...)`:
  - `C365_COVER` — dark bg + cover-wing image right-half + wordmark footer + slide number.
  - `C365_DIVIDER` — dark bg + thin blue accent bar + wing image right + wordmark footer.
  - `C365_CONTENT` — dark bg, top eyebrow strip, wordmark footer, jet mark top-right, slide number.
  - `C365_CLOSER` — dark bg, large headline area, wordmark centered.
- Helper functions: `addCover(slide,{title,subtitle,presenter})`, `addDivider(slide,{eyebrow,title})`, `addContentHeader(slide,{eyebrow,title})`, `addCloser(slide,{headline,cta})`, plus color/layout constants (title x/y/w/h, body x/y/w/h, footer y).

### 3. Rewrite the builders
File: `src/exporters/pptx/buildExecutivePitch3Deck.ts` (already exports both `buildExecutivePitch3Deck` and `buildExecutivePitchMediumDeck`).
- Call `defineComply365Masters(pptx)` once.
- Iterate `execPitch3Slides` / `execPitchMediumSlides`; for each slide pick a master:
  - Title slide → `C365_COVER`
  - "Strategic Shift" / "Why Comply365" / phase openers → `C365_DIVIDER`
  - Everything else → `C365_CONTENT`
  - Closing → `C365_CLOSER`
- Re-build each slide's body with native shapes: `addText`, `addShape` (rounded-rect cards, pill chips, circles), `addTable` for roadmap, simple `addChart` only where the web version has a chart. Use brand color tokens for every fill/stroke/text color. Keep titles and copy identical to the web slides; only the visual chrome and layout grid change.
- Replace the current ad-hoc palette usage; do **not** touch `src/lib/pptxBrand.ts` (other decks still use it).

### 4. Download button surfacing
- Medium and Long title slides already pass `pptxDeckId` to the first slide with `hidePdfExport: true`. Confirm `DeckPPTXExportButton` renders on those title slides; if it's currently hidden alongside the PDF button, add it back as an always-visible export action so reps can grab the .pptx with one click.

### 5. QA loop (mandatory)
For each of the two decks:
1. Build → save → convert to PDF via `run_libreoffice.py` → `pdftoppm -r 150` per slide.
2. Read every JPG and check: overflow, low-contrast text, footer collisions, missing logo, wrong fonts, leftover placeholders, misaligned columns, accent bars under wrapped titles.
3. Fix → re-render affected slides → repeat until clean.
4. Run `markitdown` and grep for `xxxx|lorem|placeholder|click to edit` — must be empty.
5. Report findings in chat with before/after notes.

### 6. Memory
Add `mem://brand/pptx-template` with: template path, extracted color tokens, asset filenames, master layout coordinates — so future deck rebuilds reuse the same source of truth.

## Out of scope
- Customer Overview, Technical Deep Dive, AI Infographic exporters.
- Web slides, narration, copy edits.
- Shipping new font files (Arial is universal).
- Other PPTX downloads on the site.

## Deliverables
- `src/assets/brand/comply365/{wordmark-white.png, jet-mark.png, cover-wing.jpg, divider-wing.jpg}`
- `src/exporters/pptx/comply365Brand.ts` (new)
- Reworked `src/exporters/pptx/buildExecutivePitch3Deck.ts` (both variants)
- Visible "Download Editable PowerPoint" button on Medium + Long pitch title slides
- `mem://brand/pptx-template`
- QA report (issues found + fixes) in chat
