

## Use the real Comply365 logo, in correct proportion, across all downloads

### What's wrong today

| Asset | Logo source | Issue |
|---|---|---|
| DTOP PDF | none — typed `Comply` + `365` text | Not the real brand mark |
| Persona PDF | none — typed `Comply` + `365` text | Not the real brand mark |
| Tech Deck PPTX | `comply365-logo-white.png` (1920×199, ~9.65:1) | Drawn into a 1.1" × 0.32" box (~3.4:1) → **squashed horizontally**; also placed on light-variant slides where the white logo disappears |

There are three logo assets available:
- `comply365-logo-white.png` — 1920×199, transparent, **for dark backgrounds**
- `comply365-logo.png` — 124×13, **for light backgrounds**
- `comply365-icon.png` — 35×20, square-ish glyph (not the full wordmark)

### Fix

#### 1. PDFs: render the real logo image instead of typed text

**`src/components/print/DTOPPrintablePage.tsx`** and **`src/components/PersonaPrintablePage.tsx`**

Both PDFs render on the dark `C.darkPaper` background, so they should use `comply365-logo-white.png`.

- Import the logo: `import complyLogo from "@/assets/comply365-logo-white.png";`
- Replace the typed `Comply<span>365</span>` wordmark in the header with:
  ```tsx
  <img
    src={complyLogo}
    alt="Comply365"
    style={{ height: 18, width: "auto", display: "block" }}
  />
  ```
  (height 18 px × natural ratio 9.65 ≈ 174 px wide — clean, in proportion, sits next to the date on the right exactly like the typed wordmark does today). Drop the small blue square glyph (currently a "C" mark) since the real logo includes the brand mark.
- In the **footer**, keep the typed `© Comply365` line — that's body copy, not a logo placement, and the typed treatment matches the legal/footer convention used in the rest of the app.
- `html2canvas` already inlines images during PDF capture (used elsewhere for `complyLogo` in slides), so no exporter changes needed.

#### 2. PPTX: fix the squashed logo and use the right asset per variant

**`src/lib/pptxBrand.ts`** — `addBrandLogo(slide, logoBase64, variant)`

- Compute width from a fixed height using the wordmark's true aspect ratio (9.65:1) so the logo never stretches:
  ```ts
  const h = 0.32;             // inches — same height as today
  const w = h * 9.65;         // ≈ 3.09" — true wordmark width
  slide.addImage({ data: logoBase64, x: PPTX_BRAND.size.w - w - 0.4, y: 0.25, w, h });
  ```
- Today the box is 1.1 × 0.32 (3.4:1). The true asset is 9.65:1. The new box restores correct proportion. (3.09" wide is comfortable on a 13.33" slide and still leaves margin from any title text.)

**`src/exporters/pptx/buildTechnicalDeck.ts`**

- Import both assets:
  ```ts
  import logoUrlDark from "@/assets/comply365-logo-white.png";  // for dark slides
  import logoUrlLight from "@/assets/comply365-logo.png";        // for light slides
  ```
- Load both at the top of `buildTechnicalDeck`:
  ```ts
  const logo = await loadImageAsBase64(logoUrlDark).catch(() => "");
  const logoLight = await loadImageAsBase64(logoUrlLight).catch(() => "");
  ```
- Pass both into the per-slide context (extend the context type from `{ logo }` to `{ logo, logoLight }`).
- In the master chrome wrapper (`addBrandMaster` call), pass the variant-appropriate logo:
  ```ts
  const isLight = variant === "light";
  addBrandMaster(slide, { logo: isLight ? ctx.logoLight : ctx.logo, ... });
  ```
- Same swap inside `addSectionDivider` calls (currently always `dark`).
- Note: `comply365-logo.png` is only 124×13 px — sharp at 0.32" PPTX render height (≈ 30 px target). Acceptable. If we ever need higher fidelity for light slides we can swap in a higher-res light logo later, but the proportion fix is the priority.

#### 3. Other PDF/printable already in tree

`PrintablePage.tsx` (the legacy maturity-model multi-page PDF used by `DownloadButton.tsx`) currently renders no logo at all — out of scope for this change since the user specifically called out the DTOP and Persona downloads as the squashed/incorrect ones. Leave untouched.

### Files touched

**Edited**
- `src/components/print/DTOPPrintablePage.tsx` — swap typed wordmark for `comply365-logo-white.png` at proportional `h: 18px`.
- `src/components/PersonaPrintablePage.tsx` — same swap, same sizing.
- `src/lib/pptxBrand.ts` — `addBrandLogo` uses fixed height × true aspect ratio (9.65:1) instead of a hardcoded 1.1 × 0.32 box.
- `src/exporters/pptx/buildTechnicalDeck.ts` — load both light/dark logo assets, pass both through context, select per-variant inside chrome and section dividers.

**Not touched**
- `comply365-icon.png` (square glyph — not a wordmark; not used for these brand placements).
- `PrintablePage.tsx`, `DownloadButton.tsx`, `DeckPDFExportButton.tsx` — no logo logic to change.
- All slide components — they already use the white logo correctly via `<img>` (browser preserves aspect ratio with `w-auto`).

### QA

1. Generate DTOP PDF → verify the white wordmark appears top-left, sized at ~18 px tall, sharp, not stretched, sitting cleanly next to the date.
2. Generate Persona PDF → same check.
3. Build the Technical Deep Dive PPTX, convert to PDF, render slide images at 150 DPI, and inspect:
   - Dark slides show the white wordmark at correct ~3.1" × 0.32" proportion (not squashed).
   - Any light-variant slides (section dividers / hero) show the dark wordmark instead of an invisible white one.
   - Logo doesn't collide with title text on any slide (3.1" wide leaves > 9" of horizontal headroom on a 13.33" slide).

### Out of scope

- No new logo assets sourced — using only the three already in `src/assets/`.
- No changes to web slide logo placements (already correct).
- No copy or layout changes outside the logo placement itself.

