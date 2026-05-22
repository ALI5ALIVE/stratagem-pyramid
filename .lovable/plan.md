## Goal
Dial back the AI Solutions treatment: keep chips prominent and colored, but harmonize with the dark slide and restore proper sizing/spacing so nothing overflows.

## Changes (PPTX only — `src/exporters/pptx/buildAIInfographicDeck.ts`)

### 1. Container — prominent but on-theme
- Remove the bright `C.primary` glow rectangle behind the column (too loud).
- Solutions column fill: back to `C.surface` (matches product columns) with a thicker `C.primary` border (1.5pt) and slightly larger radius (0.18). This keeps it on the dark slide while still reading as the hero.
- Header bar: keep `C.primary` fill + white "AI SOLUTIONS" title at 14pt (down from 16, with charSpacing 3), height 0.5 (down from 0.6). Keep the white underline accent but thinner (0.03).

### 2. Chips — colored, prominent, dark-mode native
- Drop the white chip background and the black shadow rect (they fight the dark slide).
- New chip style:
  - Fill: solution color at full saturation (`solutionColors[id].pptx`).
  - No border, radius 0.1.
  - Label: white (`FFFFFF`), 12pt bold, left-aligned with 0.2 inset.
  - Small white circle dot (0.18) on the left as a visual anchor.
- Restore original sizing so all 6 chips + "No AI" fit:
  - `solChipH = 0.5`, `solChipGap = 0.12`.
- "No AI" chip: `C.surfaceAlt` fill with dashed `C.muted` border, muted label — already contrasts, just resize to match new dims.

### 3. Product columns — restore original prominence parity
- Revert product column headers to `C.primary` fill with white 13pt bold title (undo the muted treatment from last round). They should look like peers of the solutions header but without the thick border + underline that mark Solutions as primary.
- Capability row labels: keep current size; restore bold weight for AI-enabled rows for readability.

### 4. Layout safety
- Recompute `cy` start (`gridTop + 0.15 + solHeaderH + 0.25`) and verify 6 chips at 0.5 + 0.12 gap + No-AI chip fit within `gridH` without overlap. If tight, reduce top padding after header to 0.2.

### 5. Keep unchanged
- 4-column grid, widths, arrow logic, legend, data, web route, `AICapabilitiesMatrix` component.

## QA
- Build PPTX → render slide to JPG via LibreOffice + pdftoppm.
- Verify: chips are colored and clearly the focal point against the dark slide; product columns still legible; nothing clips at column bottom; arrows still land on correct rows.
