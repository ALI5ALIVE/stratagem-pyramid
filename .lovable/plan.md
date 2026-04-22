
Fix the Technical Deep Dive PDF export by removing the comment/auth dependency from the off-screen export render.

### Root cause

The export pipeline now renders slides with `DeckProvider`, which makes `PitchSlideContainer`/`SlideContainer` think they are inside a live reviewable deck. That mounts `SlideCommentLayer`, and `SlideCommentLayer` immediately calls `useAuth()`.

In the export root there is no `AuthProvider`, so every exported slide that includes comments crashes with:

```text
useAuth must be used within AuthProvider
```

Because the crash happens inside the hidden export render, the PDF generation never completes.

### Implementation

#### 1. Update `src/components/DeckPDFExportButton.tsx`
Change the off-screen render tree so exported slides do **not** mount the comment system.

Build the export root as:

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

Key change:
- Remove `DeckProvider` from the export renderer.

Why this works:
- `useDeckId()` falls back to `undefined` when there is no provider.
- `PitchSlideContainer` and `SlideContainer` only render `SlideCommentLayer` when a deck id exists.
- No comment layer means no `useAuth()` call and no export crash.
- The PDF also becomes cleaner because the comment badge is not captured on each slide.

#### 2. Keep the existing export stability fixes already in place
Retain the current good parts of `DeckPDFExportButton`:
- fixed on-viewport hidden host
- double `requestAnimationFrame`
- `document.fonts.ready`
- `waitForImages`
- explicit `1920×1080` capture dimensions
- per-slide error isolation and warning placeholder pages

### Files

**Edited**
- `src/components/DeckPDFExportButton.tsx` — remove `DeckProvider` from the export render tree and any now-unused import.

### Verification

1. Open `/pitch-technical`.
2. Click **Download Deck PDF** on slide 0.
3. Confirm the toast progresses through all slides instead of hanging/failing immediately.
4. Confirm the PDF downloads successfully.
5. Open the PDF and verify:
   - slides render normally
   - no comment bubble appears in the export
   - no “Slide X failed to render” placeholders unless a slide has a separate issue
6. Confirm the preview no longer throws export-time `useAuth must be used within AuthProvider` errors.

### Out of scope

- No changes to the live comments experience in the preview.
- No redesign of the export button or slide layouts.
- No changes to persona/DTOP exporters.
