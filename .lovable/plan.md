Spell out Madrid on first mention of the MAD airport code in the Week 2 Capstone slide and its narration, so mixed audiences understand the reference. Subsequent mentions stay as "MAD".

## Changes

**1. `src/components/sales-enablement-slides/SEW2CapstoneWhiteboard.tsx`**
- Subtitle: `Unstable approach trend at MAD` → `Unstable approach trend at Madrid (MAD)`
- Beat 1 say-it: `unstable approaches at MAD over the last 14 days` → `unstable approaches at Madrid (MAD) over the last 14 days`
- Beat 2 say-it: leave as `MAD unstable approach` (second mention)
- SVG Detect cell: `spotted at MAD · 14 days` → `spotted at Madrid (MAD) · 14d` (kept short to fit cell width)

**2. `src/data/salesEnablementNarration.ts` (`se-w2-capstone-whiteboard`)**
- First mention: `an unstable approach trend at MAD is Detected…` → `an unstable approach trend at Madrid — airport code MAD — is Detected…` (natural for TTS; spoken letters would otherwise read as "mad").

No other slides or data sources reference MAD, so scope is limited to these two files. No quiz, DB, or registry changes.