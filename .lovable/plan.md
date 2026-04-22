

## Fix: "Download Deck PDF" on Technical Deep Dive produces nothing / blank PDF

### Root cause

`DeckPDFExportButton` renders each slide into a host positioned at `left: -20000px`. Three problems:

1. **Off-viewport host** — html2canvas resolves bounding rects outside the layout viewport and returns blank or clipped canvases (same bug we fixed for `PersonaDownloadButton` / `DTOPDownloadButton`).
2. **Missing context providers** — slides are rendered inside `<BrowserRouter>` only, but several Tech slides consume `DeckProvider` (via `useDeckId`) and `SidebarProvider` (via `useSidebar` in the title slide's container). When a hook throws, the whole render fails silently inside the offscreen root and the toast just spins.
3. **Tailwind `h-screen` collapses** — slides use `h-screen` (`100vh`). When the offscreen host is invisible/zero-area in some browsers the slide renders at 0 height, producing an empty canvas. We need to force the inner wrapper to a fixed `1920×1080` regardless of viewport.

### Fix

Rewrite `src/components/DeckPDFExportButton.tsx`:

1. **On-viewport but invisible host** (mirrors the persona/DTOP fix):
   ```ts
   host.style.position = "fixed";
   host.style.left = "0";
   host.style.top = "0";
   host.style.width = "1920px";
   host.style.height = "1080px";
   host.style.opacity = "0";
   host.style.pointerEvents = "none";
   host.style.zIndex = "-1";
   host.style.overflow = "hidden";
   ```

2. **Wrap each slide with the same providers the live deck uses**, so hooks resolve:
   ```tsx
   <BrowserRouter>
     <SidebarProvider>
       <DeckProvider deckId="tech-deep-dive">
         <SlideNavigationProvider>
           <div style={{ width: 1920, height: 1080, position: "relative" }}>
             <SlideComponent slideNumber={i} />
           </div>
         </SlideNavigationProvider>
       </DeckProvider>
     </SidebarProvider>
   </BrowserRouter>
   ```
   The wrapper div has explicit pixel dimensions so `h-screen` children fill it correctly (they still resolve to viewport, but the host now matches viewport too).

3. **Replace `setTimeout(250)` with double-rAF + `document.fonts.ready`** to guarantee React commit + style/font application before capture:
   ```ts
   await new Promise<void>((r) =>
     requestAnimationFrame(() => requestAnimationFrame(() => r()))
   );
   await (document as any).fonts?.ready;
   await waitForImages(slideHost);
   await new Promise((r) => setTimeout(r, 120)); // settle gradients/SVG
   ```

4. **Capture the slideHost itself (not `firstElementChild`)** with explicit window dims, and add `onclone` to neutralise any `oklch()` colors the dark theme produces (html2canvas v1 can't parse oklch and silently bails on those nodes):
   ```ts
   html2canvas(slideHost, {
     scale: 2,
     useCORS: true,
     backgroundColor: "#0a0f1c",
     width: 1920,
     height: 1080,
     windowWidth: 1920,
     windowHeight: 1080,
     logging: false,
   });
   ```

5. **Per-slide error isolation** — wrap each slide capture in its own try/catch so one broken slide doesn't kill the whole export. Failed slides get a placeholder page noting which slide failed, and the toast reports `"Exported with N warnings"` rather than total failure.

6. **Keep the existing toast progress / final save / cleanup** flow.

### Files

**Edited**
- `src/components/DeckPDFExportButton.tsx` — apply fixes 1–5 above.

### Verification

1. Open `/pitch-technical`, click **Download Deck PDF** on slide 0.
2. Toast progresses through all 22 slides ("Exporting slide N of 22 — <label>").
3. `Comply365-Technical-Deep-Dive.pdf` saves; opens with all 22 landscape pages, each fully rendered (typography, charts, dark theme, brand colors).
4. If any individual slide fails, that page shows a "Slide failed to render" placeholder and the toast shows a warning count instead of error.
5. No regression on Persona / DTOP single-page exports (untouched).

### Out of scope

- No changes to individual Tech slide components.
- No changes to `PersonaDownloadButton` / `DTOPDownloadButton` (already fixed).
- No new export formats (PPTX, etc.).

