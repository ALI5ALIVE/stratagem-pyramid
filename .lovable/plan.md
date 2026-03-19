

# Replace Hub Text: "COMPLY 365" → "CoAnalyst"

## Change
In `src/components/PlatformEcosystemDiagram.tsx`, replace the two hub text elements (lines 386-407) that currently read "COMPLY" and "365" with a single "CoAnalyst" label centered in the hub.

**Before:**
```
COMPLY
365
```

**After:**
```
CoAnalyst
```

- Single `<text>` element at center, white fill, ~12px font, bold
- Remove the second `<text>` element (the "365" line)

