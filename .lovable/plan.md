

## Add expanded "Why DTOP exists" + "What DTOP is" content to the 1-pager PDF

### What's there today (`src/components/print/DTOPPrintablePage.tsx`)

1. Title + tagline
2. **Pipeline** — 4 D/T/O/P cards (hero)
3. **Why It Exists** — single big "$25–35B" stat + one-line label
4. **Proof** — 3 use case metrics
5. **What It Unlocks** — 4 value tiles
6. Footer

Missing: an explicit **definition** of DTOP, and the Why section omits the 6 specific problems from `whyDTOPExists.problems`.

### Plan

Edit only `src/components/print/DTOPPrintablePage.tsx`. Restructure into a tighter single-page A4-landscape layout:

1. **New "What DTOP Is" band** — directly under the title, before the pipeline:
   - One-sentence definition: *"DTOP is the closed-loop operating model that connects detection of operational signals to provable outcomes — across Safety, Content, and Training, in one continuous workflow."*
   - 3 short qualifier chips on the right: **Closed-loop** · **Cross-module** · **Auditable by design**

2. **Expand "Why It Exists"** — keep the $25–35B hero stat on the left, but on the right replace the single sentence with a compact 2×3 grid of the 6 problems from `whyDTOPExists.problems` (label in bold + 1-line detail in muted ink, ~9pt). Keeps the methodology footnote.

3. **Keep Pipeline, Proof, Value tiles, Footer** as-is — these are already the strongest blocks.

4. **Re-balance vertical rhythm** — reduce Pipeline card vertical padding by ~2px and tighten the Value tiles section so the new What/Why content fits without spilling. Page stays single-sheet A4 landscape.

### Files touched

- `src/components/print/DTOPPrintablePage.tsx` — additions + Why section restructure only.

### Not touched

- `dtopPlaybook.ts` — uses existing `whyDTOPExists.problems`, `heroTagline`, etc.
- `DTOPDownloadButton.tsx` — same component, same filename (`Comply365-DTOP-Operating-Model-Brief.pdf`).
- `printBrand.ts` — uses existing tokens.

### QA gate

After change, generate the PDF from the DTOP title slide and verify:
1. New "What DTOP Is" band renders below the title with definition + 3 qualifier chips.
2. "Why It Exists" shows $25–35B on the left and 6 problem cards on the right (2 rows × 3 cols).
3. Methodology footnote still present and legible.
4. Pipeline, Proof, Value, Footer still render — single page, no overflow.
5. Dark theme + Comply365 brand colors preserved (sky/amber/emerald/violet step accents).

### Out of scope

- Multi-page PDF.
- Copy rewrites of the 6 problems.
- Changes to any web slides or playbook data.

