

# Plan: Update Homepage Hero Copy

## File to Modify

### `src/pages/HomepageMockup.tsx`

**Lines 197-200** - Update the hero paragraph content:

**Current:**
```tsx
<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
  A connected, intelligent, and predictive platform.{" "}
  <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
</p>
```

**New:**
```tsx
<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
  Connect safety, content, and training into an intelligent operating platform.{" "}
  <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
</p>
```

## Copy Changes

| Part | Current | New |
|------|---------|-----|
| First sentence | "A connected, intelligent, and predictive platform." | "Connect safety, content, and training into an intelligent operating platform." |
| Second sentence | "Turn signals into orchestrated change and measurable outcomes." | No change |

## Notes

- Uses "content" instead of "procedures" per project terminology guidelines
- Simplified to "an intelligent operating platform" (removed "a connected,")
- Second sentence remains highlighted with `font-medium` styling

