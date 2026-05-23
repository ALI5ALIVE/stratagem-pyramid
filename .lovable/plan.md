## From Silos to Signals — 90-second narrative film

A 90-second, 1920×1080 @ 30fps Remotion film with voiceover-ready beats, rendered to MP4, embedded into the keynote page as the official "hero film" referenced in Act 05.

---

### Story arc (90s, 6 acts, 2700 frames)

```text
ACT 1  PAIN — The silent room          0:00–0:15   (450f)
ACT 2  CHALLENGE — The silo era        0:15–0:35   (600f)
ACT 3  TURN — A signal is missed       0:35–0:50   (450f)
ACT 4  INSIGHT — Naming the new game   0:50–1:10   (600f)
ACT 5  VALUE — From event to control   1:10–1:25   (450f)
ACT 6  RESOLVE — The master message    1:25–1:30   (150f)
```

Beat-by-beat:

- **Act 1 / PAIN.** Black frame. Single line types in: *"Every operator runs on signals they'll never see."* Faint heartbeat pulse. Dawn-grey ambience.
- **Act 2 / CHALLENGE.** Four monolithic silo columns rise: Safety · Ops · Tech · Compliance. Tiny signal dots blink inside each, hit the walls, die. Stat overlays cut in: **~65% of signals never make it home · $25–35B annual exposure · ~35% generic-AI accuracy.**
- **Act 3 / TURN.** Tuesday-morning vignette. A single red signal dot pulses inside the Safety silo, then fades. Cut to a date stamp, then a single line: *"By Friday, it was an incident."* Silence beat.
- **Act 4 / INSIGHT.** Silo walls dissolve. Dots break free and braid into a single light-trace that threads through four full-bleed colour reveals — **D**etect (blue) → **T**rigger (amber) → **O**rchestrate (violet) → **P**rove (emerald). Each verb lands with its swatch.
- **Act 5 / VALUE.** Operation in concert: frontline, flight deck, control room, rail platform — shown as minimal SVG scenes with the light-trace continuing through them. Counter ticks: **~90% domain accuracy at L4–5** rises against a faded **~35%** baseline.
- **Act 6 / RESOLVE.** Trace resolves into the master message: *"From event to control."* Comply365 mark fades up. Hold 2s. Cut to black.

### Visual system

- Palette: hsl(222 47% 6%) background, off-white #F5F7FA type, DTOP accents (#3B82F6 / #F59E0B / #8B5CF6 / #10B981), one warm signal red #EF4444 reserved for Act 3.
- Type: Space Grotesk display (loaded via `@remotion/google-fonts/SpaceGrotesk`), Inter body (`@remotion/google-fonts/Inter`).
- Motion system: spring entrances `{ damping: 22, stiffness: 120 }`; ease-out cubic for type; light-trace driven by `strokeDashoffset` interpolation; persistent dust-particle layer at 6% opacity across all acts; subtle vignette.
- Transitions: `@remotion/transitions` — `fade` between Acts 1↔2 and 5↔6; `wipe` (from-left) for Act 3; `clockWipe` for Act 4 reveal; matched-element handoff for the light-trace into Acts 4–5.
- No backdrop-filter blur (sandbox constraint). Muted render (no audio track baked in — the keynote handles VO live).

### Project structure

```
remotion/
  package.json · tsconfig.json
  scripts/render-remotion.mjs
  src/
    index.ts
    Root.tsx                          // Composition id="main", 1920x1080, 30fps, 2700 frames
    MainVideo.tsx                     // Persistent layers + TransitionSeries
    components/
      PersistentBackground.tsx        // gradient + dust particles + vignette
      LightTrace.tsx                  // shared SVG path driven by frame
      DTOPSwatch.tsx                  // reusable letter+verb reveal
      StatCallout.tsx                 // big-number + label
    scenes/
      Act1_Pain.tsx
      Act2_Challenge.tsx
      Act3_Turn.tsx
      Act4_Insight.tsx
      Act5_Value.tsx
      Act6_Resolve.tsx
```

### Build + render

1. Scaffold `remotion/` per the video-creator skill (bun init, install remotion + transitions + google-fonts, fix the musl/gnu compositor + ffmpeg symlinks).
2. Implement all 6 scenes + persistent layers; all motion via `useCurrentFrame()` + `interpolate()`/`spring()`.
3. Spot-check key frames at 60, 600, 1200, 1800, 2400, 2650 with `bunx remotion still`.
4. Render to `/mnt/documents/silos-to-signals.mp4` via the programmatic `scripts/render-remotion.mjs` (chromeMode `chrome-for-testing`, `muted: true`, concurrency 1).
5. Copy the rendered MP4 into `public/keynote/silos-to-signals.mp4` so the keynote page can stream it.

### Page wiring

In `src/pages/keynote/SilosToSignalsKeynote.tsx`, replace the existing Act 05 "Hero film" play tile with an actual inline `<video>` element pointing at `/keynote/silos-to-signals.mp4` (poster from frame 1800), keeping the surrounding copy intact. Add a presentation-artifact link for download.

### Out of scope

- No audio/voiceover track (keynote VO is live).
- No changes to sidebar/routing.
- No new entries in `marketDevelopmentAssets.ts`.