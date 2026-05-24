## Problem

VO audio is longer than scene length in two acts (30fps):

| Act | Scene length | VO ends at | Overrun |
|-----|-------------|-----------|---------|
| 1 | 15.0s | 14.3s | ok |
| 2 | 32.0s | **34.9s** | **+3.0s** |
| 3 | 16.0s | 10.6s | ok |
| 4 | 32.0s | 32.2s | +0.2s (borderline) |
| 5 | 20.0s | **22.5s** | **+2.5s** |
| 6 | 5.0s | 4.4s | ok |

Act 2 and Act 5 VO bleeds visibly into the next scene; Act 4 is on the edge.

## Fix

Extend the scene durations so each VO finishes with ≥1s tail before the next act starts. Only `remotion/src/MainVideo.tsx` changes — VO offsets stay at 30 frames (1s), VO files unchanged, music ducking windows recompute from the ACTS array automatically.

New per-scene frames @30fps:

- Act 1: 450 (unchanged)
- Act 2: 960 → **1110** (+150f / +5s, gives ~2s tail after VO)
- Act 3: 480 (unchanged)
- Act 4: 960 → **1020** (+60f / +2s, restores ~2s tail)
- Act 5: 600 → **720** (+120f / +4s, gives ~1.5s tail)
- Act 6: 150 (unchanged)

New total: 3780 frames (126s) vs current 3600 (120s).

## Files

- `remotion/src/MainVideo.tsx`
  - Update the `ACTS` array `start`/`dur` values to the new offsets above.
  - Update the matching `<Series.Sequence durationInFrames={…}>` props for Act 2, Act 4, Act 5.
  - Update the score envelope keyframes (`[0, 60, 3540, 3600]` → `[0, 60, 3720, 3780]`) so the music tail still fades out at the very end.
- `remotion/src/Root.tsx` — bump composition `durationInFrames` from 3600 to 3780.

No scene component, VO script, or audio file changes. After patching, re-render with `node remotion/scripts/render-remotion.mjs` (no audio regeneration needed).