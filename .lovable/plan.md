## Make the three week cards on the title slide clickable

Clicking each week card jumps to that week's divider slide (`se-week-1`, `se-week-2`, `se-week-3`).

### 1. `src/pages/SalesEnablement.tsx`
Pass a navigation callback only to the title slide:
```tsx
const extraProps = slide.id === "se-slide-0"
  ? {
      slideCount: slides.length,
      onJumpToWeek: (weekId: string) => {
        const idx = slides.findIndex((s) => s.id === weekId);
        if (idx >= 0) navigateToSlide(idx);
      },
    }
  : {};
```

### 2. `src/components/sales-enablement-slides/SESlide0Title.tsx`
- Add `weekId: "se-week-1" | "se-week-2" | "se-week-3"` to each entry in the `weeks` array.
- Add `onJumpToWeek?: (weekId: string) => void` to `Props`.
- Render each card as a `<button>` instead of a `<div>`, with `onClick={() => onJumpToWeek?.(w.weekId)}`, `type="button"`, `text-left`, and a hover state (e.g. `hover:bg-foreground/5 hover:border-{accent}/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`).
- Update the footer hint to read: "Click a week to jump in · ↓ / Space to advance · ↑ to go back · Sidebar for jump-to-slide".

No other files affected. Existing keyboard nav, sidebar, and narration continue to work.