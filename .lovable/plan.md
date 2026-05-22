## Field Kit PDF — page-by-page fix plan

After regenerating W1, W2 and W3 kits and inspecting all 120 pages, four real layout bugs are causing the "copy overruns the page" feel. Everything else (cover, study-sheet, glossary, closing drill) is rendering cleanly.

All fixes are in `src/lib/fieldKitPdf.ts`. No data or React changes.

### Bug 1 — Bold tokens add visible gaps inside words

Most visible. Every bolded token in transcript and study-sheet body copy renders with extra whitespace around it, e.g.

- `Comply365` → `Com p ly365`
- `DTOP` → `D T O P`
- `Unified Mobile` → `U n i fied M o b i le`
- header `Comply365 · Sales Enablement Academy` → `Com p ly365 · Sales Enab lem ent Academ y`

Cause: token-aware drawer (`drawSentence` / `wrapSentenceTokens` and the equivalent study-sheet helper) measures one token's width with the regular font, then switches to bold to draw the next, then measures the following whitespace with the new font. Width drift accumulates and the cursor advances past where the previous glyph actually ended.

Fix: in the token drawer, measure **each token's width using the font it will be drawn in** (set font, then call `getTextWidth`, then `pdf.text` at the current cursor, then advance cursor by exactly that width). Drop any added padding around bold runs. Apply the same fix to the header/footer drawers that bold the brand name.

### Bug 2 — Key terms wrap at the wrong indent

On study-sheet pages (e.g. W1 p5, W1 p13, W2 p15) the right column "Key terms" block renders each entry as `Term · definition…`. When the definition wraps, line 2 starts at the x-position right after `Term · `, producing a deep hanging indent that pushes text into / past the right margin (`…aviation knowledge graph…` ellipsis clip).

Fix: in the key-terms renderer, after drawing the bold term and the `·` separator, wrap the definition with `splitTextToSize(def, columnWidth)` and draw every wrapped line at the column's left margin (not at the post-term x). Optional: put a 4pt left-pad on continuation lines to visually tie them to the term, but never indent past the term itself.

### Bug 3 — Cover "Locked terminology" card overflows

Page 1 of every kit: the second column's `BrandNumber names · Comply365, SafetyManager365 (no spaces)` line runs off the right edge of the card and past the page-safe margin.

Fix: shorten the value to `Comply365, SafetyManager365` and move `(no spaces)` either onto a second line (small muted text) or drop it — the rule is already in the term. Also recompute the two-column split using `(cardWidth - gutter) / 2` and wrap each value with `splitTextToSize` so any future entry can't overflow.

### Bug 4 — Empty coach-beat bodies

W2 p16 beat 05 "How to land it." has only the LISTEN FOR footer and no body copy, leaving a card with a label and nothing else. A handful of other beats look the same.

Fix in `drawBeat`: if `beat.body` is empty/whitespace, fall back to the listen-for line as the body (and drop the LISTEN FOR footer), or skip the empty body entirely and tighten the card height in `measureBeat`. Don't render a card with no prose between the point and the footer.

### Validation

1. Re-run `bun run scripts/genpdf.ts`.
2. Rasterize W1/W2/W3 at 100dpi and inspect:
   - W1 pages 1, 5, 6, 13, 16, 30
   - W2 pages 1, 15, 16
   - W3 pages 1, 52
3. Confirm: no bold-token gaps, no key-terms text crossing the right margin, cover terminology fully inside the card, no empty beat bodies.
4. Page count within ±2 of current (W1 = 31, W2 = 37, W3 = 52).

### Out of scope

No copywriting changes, no font swap, no React/app changes, no narration script edits.
