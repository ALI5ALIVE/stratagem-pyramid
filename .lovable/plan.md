

## Status check — PPTX export vs recent web updates

Short answer: **no, the PPTX export is partially behind the web version.** Here's the audit and the fix.

### What's already in the PPTX ✅

- Maturity Roadmap split into 2 slides (Curve & Behaviour + Results & Value).
- Logo proportions fixed (true 9.65:1 ratio) and light/dark variant logos plumbed through.
- Platform Snapshot, layer dividers, all core architecture/intelligence slides.

### What's missing in the PPTX ❌

The Regulation Management summary slide (`regulationSummarySpec` in `buildTechnicalDeck.ts`, lines 2640–2731) still uses the **old layout**: elevator-pitch banner → 3-problems × 3-pillars grid → footer. It does **not** include the DTOP overlay strip we added to the web slide (`TechSlideRegulationSummary.tsx`).

The data is already imported in the web component (`dtopMapping` from `regulationManagementPlaybook.ts`), but the PPTX builder doesn't import it or render it.

### Fix — bring PPTX into parity with the web slide

Edit one file: `src/exporters/pptx/buildTechnicalDeck.ts`

1. **Import `dtopMapping`** alongside the existing `regulationManagementPlaybook` imports (around line 44).
2. **Insert a 4-card DTOP strip** between the elevator-pitch banner and the problem/pillars columns, mirroring the web layout:
   - 4 equal cards across the full content width (~3.0" wide each, 0.95" tall).
   - Each card: coloured letter badge (`D`/`T`/`O`/`P`) using canonical DTOP hex tokens (sky `#0EA5E9`, amber `#F59E0B`, purple `#A855F7`, emerald `#10B981`) → step label → first sentence of `whatHappens`.
   - Use existing `addCard` + `addIconBadge` primitives — no new helpers.
3. **Trim the problem/pillar grid to 2+2** (matches the web slide change) so layout stays balanced. Replace `slice(0, 3)` with `slice(0, 2)` on both `rmPainPoints` and `rmValuePillars`, and recompute `rowH` over 2 rows.
4. **Recompute vertical math**: banner (1.15") + DTOP strip (0.95" + 0.2 gap) + columns + footer (0.55") all fit within `CONTENT_TOP → CONTENT_BOTTOM`.

### Files touched

**Edited**
- `src/exporters/pptx/buildTechnicalDeck.ts` — `regulationSummarySpec` only.

**Not touched**
- Any web slides (already correct).
- Any other PPTX spec.
- `pptxBrand.ts` (uses existing primitives).

### QA

After the change: build the Technical Deep Dive PPTX, render the Regulation Management slide to image at 150 DPI, and verify:
1. The 4 DTOP cards sit between the banner and the problem/pillar grid, evenly spaced.
2. Letter badges show the correct DTOP colours and don't collide with the step label.
3. Problem and pillar columns each show 2 cards, no clipping, balanced height.
4. Footer ("Full deep dive: Regulation Management Playbook →") still anchors above the page chrome.

### Out of scope

- No copy rewrites (uses existing `dtopMapping[].whatHappens` text from the playbook data).
- No new RM slides in the PPTX (the playbook itself isn't exported; only the summary slide is in the Tech deck).
- No changes to the maturity roadmap or logo work — those are already shipped correctly.

