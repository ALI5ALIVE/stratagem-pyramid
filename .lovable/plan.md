The video player on `/keynote/silos-to-signals.mp4` is already wired up correctly — the file in `public/keynote/silos-to-signals.mp4` is the freshly re-rendered 2-minute master with the 3-silo Act 2 fix. Two pieces of on-page copy still reference the old 90-second cut and need to be brought into line.

## Changes to `src/pages/keynote/SilosToSignalsKeynote.tsx`

1. Film card title: `From Silos to Signals — 1:30` → `From Silos to Signals — 2:00`.
2. Subhead under the film card: `Pain · Challenge · Turn · Insight · Value · Resolve` (keep — still accurate).
3. Add a small "Voiceover · Brian" / "Score · Hybrid orchestral" line under the title so viewers know audio is on by default.
4. Bust the browser cache on the video src and download href: append `?v=2` to `/keynote/silos-to-signals.mp4` in both the `<video src>` and the `<a href download>`, so anyone who previously loaded the 90s silent cut sees the new 2-minute audio version on refresh.

No other files change. The hero stat pill already says "2 min" so no edit needed there.
