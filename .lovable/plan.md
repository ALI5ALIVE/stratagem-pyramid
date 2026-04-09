

# Add "~2.5M Users" Trust Stat to Executive Pitch Title Slide

## Summary
Add a new trust stat "~2.5M Users" between "550+ Airlines" and "6 Continents" on the shared title slide used by both Executive Pitch decks.

## Change

### `src/components/exec-slides/ExecSlide0Title.tsx`

Update the `trustStats` array (lines 5-9) to insert a new entry:

```
const trustStats = [
  { icon: Plane, value: "550+", label: "Airlines Worldwide" },
  { icon: Users, value: "~2.5M", label: "Users" },
  { icon: Globe, value: "6", label: "Continents" },
];
```

The existing `Users` icon import is already present. The third stat ("Global / Aviation & AI Experts") is replaced since we now have a concrete user count which is more compelling for C-suite audiences.

**1 file modified.**

