# DTOP in 90 Seconds — Explainer Video Render

Render the approved script `Explainer Video Script: DTOP in 90 Seconds` (asset `88f04ace…`) into a 100s MP4 using the existing Remotion project in `remotion/`, with synced ElevenLabs voiceover, on-brand motion graphics, and dark Comply365 styling.

## Approach

1. **New composition `dtop90`** registered in `remotion/src/Root.tsx` — 1920×1080, 30fps, ~3000 frames (100s, leaves headroom for the 7 scenes that total ~100s in the script).
2. **Seven scene components** under `remotion/src/scenes/dtop90/`, one per script scene, durations matching the script:
   - `S1_Scramble` (15s) — split-screen chaos vs clean loop, "The Scramble vs The Loop"
   - `S2_Detect` (10s) — signal pulse entering the loop, DETECT label
   - `S3_Trigger` (10s) — first domino tips, TRIGGER label
   - `S4_Orchestrate` (20s) — branching domino chain illuminating Notify/Update/Assign/Ground icons + Comply365/SafetyManager365/ContentManager365 lockups, ORCHESTRATE label
   - `S5_Prove` (15s) — final domino into slot, completed form with green check + signature, closed glowing circuit, PROVE label
   - `S6_DTOP` (20s) — closed loop pulls back, D-T-O-P letters reveal, chaotic wires fade to black, taglines
   - `S7_CTA` (10s) — Comply365 logo + "See Your DTOP Loop in Action" button (static end card, not interactive)
3. **Motion system** — reuse `PersistentBackground` tone; DTOP brand colors: D blue, T amber, O violet, P emerald, primary `#0066FF`, bg `hsl(222 47% 6%)`. Space Grotesk headings, Inter body via `@remotion/google-fonts`. Spring entrances (`{damping: 20, stiffness: 200}`), no CSS transitions. Domino chain built from staggered `interpolate` of rotation + drop-shadow.
4. **Voiceover** — generate 7 mp3 files at `remotion/public/audio/dtop90/sN.mp3` using ElevenLabs (voice `JBFqnCBsd6RMkjVDRZzb` — George, corporate male) via a one-off `scripts/generate-dtop90-vo.mjs` that hits the existing `elevenlabs-tts` edge function (or direct API with `ELEVENLABS_API_KEY` secret). Each scene `<Sequence>` mounts its `<Audio>` with a 12-frame offset so VO starts after the visual hook.
5. **Music bed** — reuse `public/audio/score.mp3` if present; otherwise omit. Duck to 0.16 during VO windows, same pattern as `MainVideo.tsx`.
6. **Render** — `cd remotion && node scripts/render-remotion.mjs` with the script updated to select composition id `dtop90` and write to `/mnt/documents/dtop-90-seconds.mp4`. Use `chromeMode: "chrome-for-testing"`, `muted: false` (audio needed), `concurrency: 1`.
7. **QA** — render stills at frames 30, 480, 1200, 2400, 2850 with `bunx remotion still` and inspect each before the full render. Re-render on visual issues.
8. **Deliver** — emit `<presentation-artifact path="dtop-90-seconds.mp4" mime_type="video/mp4">`.

## Files

- new `remotion/src/scenes/dtop90/S1_Scramble.tsx` … `S7_CTA.tsx`
- new `remotion/src/compositions/DTOP90.tsx` (composition wrapper + audio mux)
- new `remotion/scripts/generate-dtop90-vo.mjs`
- edit `remotion/src/Root.tsx` — add `<Composition id="dtop90" …>`
- edit `remotion/scripts/render-remotion.mjs` — accept composition id arg or duplicate for dtop90
- new `remotion/public/audio/dtop90/s1…s7.mp3` (generated)

## Open questions

1. **Voice** — George (corporate male, default) or a different ElevenLabs voice from the approved list?
2. **Music bed** — include the existing `score.mp3` ducked under VO, or VO-only?
3. **End card CTA** — keep the literal "See Your DTOP Loop in Action" button as a static graphic, or swap for "Book a demo · comply365.com"?
