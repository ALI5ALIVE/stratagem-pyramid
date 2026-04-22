

## Fix: Technical Deep Dive PDF export crashes on `useAuth`

### Root cause

The export renderer wraps each slide in `DeckProvider`. That makes `PitchSlideContainer` / `SlideContainer` mount `SlideCommentLayer`, which calls `useAuth()`. The off-screen export tree has no `AuthProvider`, so every slide throws `useAuth must be used within AuthProvider` and PDF generation never completes.

### Implementation

**Edit `src/components/DeckPDFExportButton.tsx`**

- Remove `DeckProvider` from the off-screen render tree.
- Remove the now-unused `DeckProvider` import.
- New export tree:

  ```tsx
  <BrowserRouter>
    <SidebarProvider>
      <SlideNavigationProvider>
        <div style={{ width: FRAME_W, height: FRAME_H, position: "relative" }}>
          <SlideComponent slideNumber={i} />
        </div>
      </SlideNavigationProvider>
    </SidebarProvider>
  </BrowserRouter>
  ```

Why this works: `useDeckId()` returns `undefined` without a provider; both slide containers only mount `SlideCommentLayer` when a deck id exists, so `useAuth()` is never called during export.

**Keep all existing stability fixes:**
- fixed on-viewport hidden host
- double `requestAnimationFrame` + `document.fonts.ready` + `waitForImages`
- explicit 1920×1080 capture dimensions
- per-slide try/catch with placeholder pages
- toast progress and final save/cleanup

### Verification

1. `/pitch-technical` → click **Download Deck PDF**.
2. Toast progresses through all 22 slides.
3. PDF downloads with all slides rendered, no comment badges, no "Slide X failed to render" placeholders.
4. No `useAuth must be used within AuthProvider` errors in console.

### Out of scope

- Live comments in preview (unchanged).
- Persona / DTOP exporters (unchanged).
- Slide layouts and export button UI (unchanged).

