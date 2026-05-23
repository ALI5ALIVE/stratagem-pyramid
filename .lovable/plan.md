## Goal

Stop the Field Kit PDF (`src/lib/fieldKitPdf.ts`) from running copy past the page footer on the per-slide Study Sheet and Coach Transcript pages.

## Root cause

1. **Study Sheet (`renderSlidePagePortrait`)** — only the final "Proof points" list passes `maxBottom: bodyBottom` to its renderer. The earlier blocks ("What's on screen", "Ideas to own", "Key terms") have no bottom clamp, so when the copy is long they draw straight through the footer line. The pre-block guard (`colY < bodyBottom - 60`) only decides whether the block *starts*; once started, the renderer keeps going.
2. **Helpers (`drawBulletList`, `drawNumberedList`, `drawLabelledList`)** — only `drawBulletList` supports `maxBottom`, and even there it only stops between items, never trims a single item's wrapped lines.
3. **Coach Transcript (`renderSlideTranscriptPage`)** — the page-break check is gated by `if (i > 0 && y + h > footerY - 14)`, so the *first* beat on a freshly-started page is never re-checked. A single tall beat (long quoted Say + LISTEN FOR) can overflow the footer.

## Changes (single file: `src/lib/fieldKitPdf.ts`)

### 1. Add bottom-clamp to all list renderers

Give `drawNumberedList` and `drawLabelledList` the same optional `maxBottom?: number` parameter that `drawBulletList` already has, and in all three:

- Before drawing each item, if `cy > maxBottom` stop.
- After computing wrapped `lines`, clip them so the item never extends past `maxBottom` (replace last visible line's tail with `…` when truncated, using `clipLines` plus a small width-based ellipsis pass on the final line).
- Return the actual consumed height so the caller's `colY` cursor stays in sync.

### 2. Use the clamp in the Study Sheet

In `renderSlidePagePortrait` pass `maxBottom: bodyBottom` to the column renderers for `whatsOn`, `ideas`, and `terms` (Proof points already has it). Same for the rail blocks where lists are used (`connects`).

For the rail (`drawBulletList` used for `connects` and `drawParagraph` for the prose blocks), add a `maxBottom: bodyBottom` pass-through, and add a guard in the rail loop: when `railY + estimated block height` would exceed `bodyBottom`, skip the remaining rail blocks (current code only checks `railY > bodyBottom - 24`).

### 3. Tighten the Coach Transcript page-break

In `renderSlideTranscriptPage`'s beat loop:

- Drop the `i > 0` part of the guard so every beat is checked: `if (y + h > footerY - 14) { drawFooter(...); startPage(true); ... }`.
- If a *single* beat measures taller than the full available page area (`footerY - (topMargin + 22) - 14`), shrink it before drawing: trim `b.sayLines` from the end until it fits, appending an "…" sentence so the rep knows there's more (continuation already handled by the page-break path for subsequent beats; this only applies to genuinely oversize single beats).

### 4. QA pass

1. Generate a representative Field Kit PDF via the existing app entry (don't add a new flow). The simplest reproducible path is to run a small Node script that imports `buildFieldKitPdf` (or whichever the exported builder is) against the existing sales-enablement data and writes to `/mnt/documents/field-kit-qa.pdf`.
2. Convert every page with `pdftoppm -jpeg -r 150 /mnt/documents/field-kit-qa.pdf /tmp/fk-qa/page` and inspect every page image for: text crossing the footer line, missing trailing copy, awkward truncation, lists with items chopped mid-line. Iterate fixes until a full pass is clean. Do not copy QA images to `/mnt/documents/`.

## Out of scope

- No copy edits to slide content or narration.
- No layout restructure beyond the clamp/page-break fixes.
- No changes to the Week overview, Welcome, Glossary, or other non-slide pages unless QA shows the same overflow there.
