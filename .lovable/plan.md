

# Split Strategic Shift into Before & After Slides

## What's Changing

Replace the current `Slide1StrategicShift` (slide 1) with the "Before" half of the Strategy deck's `Slide2BeforeAfter`, and enhance the existing `Exec2Slide2After` (slide 2) with the "After" visual from the same source. This gives two focused slides matching the PDF direction.

## Changes

### 1. New: `src/components/exec2-slides/Exec2Slide1Before.tsx`
- Title: "The Strategic Shift" / subtitle: "Before — The operational reality we're transforming"
- Content extracted from the left half of `Slide2BeforeAfter`:
  - "The operational gap point tools can't close" header with 3 bullet points (from PDF: scattered signals, no automated trigger, manual coordination)
  - SVG fragmentation visual (3 disconnected silos: Safety 12K scattered, Content 8K orphaned, Training 45K manual)
  - 4 bullet points (disconnected, manual investigations, training not tied, evidence assembled late)
  - "DATA LOCKED — 65K+ data points managed manually" callout
- Uses `SalesSlideContainer` wrapper for pitch deck consistency

### 2. Modified: `src/components/exec2-slides/Exec2Slide2After.tsx`
- Add the "After" connected circles SVG visual (from right half of `Slide2BeforeAfter`) above the existing DTOP pipeline
- Shows 3 connected circles (Safety, Content, Training) with flow paths and "65K+ Connected" badge
- Keep existing category definition, DTOP steps, and illustrative outcomes below

### 3. Modified: `src/pages/ExecutivePitch2.tsx`
- Replace `Slide1StrategicShift` import with `Exec2Slide1Before`
- Update slides array entry at index 1: `{ id: "exec2-slide-1", label: "Before", component: Exec2Slide1Before }`

**1 new file, 2 modified files.**

