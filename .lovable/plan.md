

# Fix Citation Tooltips

## Problem
The `Info` icon tooltips next to use case cost ranges don't display citations on hover. The `TooltipTrigger` uses `asChild` to pass ref/event handlers directly to the Lucide `Info` SVG component, but Lucide icons don't properly forward refs, so the tooltip never activates.

## Fix
Wrap the `Info` icon inside a `<span>` element within the `TooltipTrigger`, so the ref and event handlers attach to a real DOM element.

## Changes

### `src/components/slides/SlideLineOfSight.tsx` (lines 408-419)
Replace the current tooltip block:
- Remove `asChild` from `TooltipTrigger`
- OR keep `asChild` but wrap the `Info` icon in a `<span>` so the ref forwards correctly

The fix changes this:
```tsx
<TooltipTrigger asChild>
  <Info className="w-3 h-3 ..." />
</TooltipTrigger>
```

To this:
```tsx
<TooltipTrigger asChild>
  <span className="inline-flex">
    <Info className="w-3 h-3 ..." />
  </span>
</TooltipTrigger>
```

This is a one-line wrapper fix in a single file.

