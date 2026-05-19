## Two minor fixes for the Sales Enablement · Capabilities week

### 1. Slide referencing "DG" — spell out Dangerous Goods on first use

File: `src/components/sales-enablement-slides/SEPlatformInsightsIntelligence.tsx` (lines 52–53)

Change the first mention so the acronym is defined inline, then keep the shorthand:

- Before: `3 stations show DG handling spikes … overdue DG recurrent training.`
- After:  `3 stations show Dangerous Goods (DG) handling spikes … overdue DG recurrent training.`

No other slides need changes — the sibling use-cases slide already says "Dangerous Goods" in full.

### 2. Fix "FOQA" pronunciation in the narration audio

The TTS engine is reading F‑O‑Q‑A letter-by-letter. We want it pronounced as one word ("Foe‑kuh", rhymes with Oprah).

Fix at the edge function level so every current and future narration benefits, mirroring the existing `DTOP → "D-T-O-P"` substitution.

File: `supabase/functions/elevenlabs-tts/index.ts`

Add a normaliser alongside the existing DTOP rule:

```ts
processedText = processedText.replace(/\bFOQA\b/g, "Foe-kuh");
```

(Optionally also `FDM → "F-D-M"` and `ASAP → "A-S-A-P"` if Paul ever wants them read as letters — leaving those out for now since he didn't ask.)

No narration script edits needed; the script text remains "FOQA" for readability, only the audio pronunciation changes.

### Verification
- Reload `/sales-enablement`, navigate to the Insights & Intelligence slide → confirm "Dangerous Goods (DG)" reads correctly.
- Play the Week 2 divider narration → confirm "FOQA" is now spoken as one word.
