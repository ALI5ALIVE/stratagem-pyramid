## Extend "From Silos to Signals" → 2:00 with VO + Music

Rebuild the film at 120s (3600 frames @ 30fps), with a Brian-voiced ElevenLabs narration, a hybrid orchestral-electronic ElevenLabs music bed, and a re-timed 6-act arc that gives Acts 2 (Challenge) and 4 (Insight) the most room. Same dark visual system, same DTOP colour language — just longer, more breath, and now with audio.

---

### New timing (3600 frames, 120s)

```text
ACT 1  PAIN — The silent room          0:00–0:14   (420f)   slight grow
ACT 2  CHALLENGE — The silo era        0:14–0:44   (900f)   +10s, biggest expansion
ACT 3  TURN — Tuesday → Friday         0:44–1:00   (480f)   small grow
ACT 4  INSIGHT — Naming the new game   1:00–1:33   (990f)   +13s, biggest expansion
ACT 5  VALUE — From event to control   1:33–1:52   (570f)   +4s
ACT 6  RESOLVE — The master message    1:52–2:00   (240f)   +3s breath
                                       total       3600f
```

Acts 2 and 4 grow with extra beats — Act 2 adds a per-silo stat callout sequence (Safety, Ops, Tech, Compliance each get their own framed moment with one number), then collapses to the three master stats. Act 4 adds a per-letter dwell where each D/T/O/P fills the frame for ~3s with its verb + one sentence before resolving to the four-column summary.

### Voiceover script (~290 words, Brian, ~145 wpm)

```text
[Act 1 — 0:00]
Every operator runs on signals they'll never see.
A near-miss in the cockpit. A pattern in the data. A line in a regulation that just changed.
The signal is there. The system isn't listening.

[Act 2 — 0:14]
We built four silos to keep operations safe.
Safety. Operations. Technical. Compliance.
Each one is brilliant on its own. None of them talk.
About sixty-five percent of operational signals never make it home.
The industry carries twenty-five to thirty-five billion dollars in avoidable annual exposure.
And generic AI? It gets the domain right about thirty-five percent of the time.
This isn't a tooling problem. It's an architecture problem.

[Act 3 — 0:44]
Tuesday, six-fourteen.
A single safety signal blinks. Seen by one system. Acted on by none.
By Friday, it was an incident.

[Act 4 — 1:00]
So we named the new game. One operating model. Four moves.
Detect — see every signal, across every system, role and silo.
Trigger — turn that signal into an obligation the operation can act on.
Orchestrate — route the right work, to the right hands, at the right moment.
Prove — close the loop with auditable evidence of the outcome.
This is how a silo becomes a signal. And a signal becomes control.

[Act 5 — 1:33]
On the frontline. On the flight deck. In the control room.
The same operating model, threading every decision.
Domain accuracy lifts from around thirty-five percent — to roughly ninety, at levels four and five.
Not a faster silo. A different operation.

[Act 6 — 1:52]
From event. To control.
Comply365.
```

### Audio production

1. **Voiceover** — render via the existing `supabase/functions/elevenlabs-tts` edge function (already deployed, uses `ELEVENLABS_API_KEY`). One stitched MP3 per act using `previous_text`/`next_text` for prosody continuity, voice `nPczCjzI2devNBz1zQrb` (Brian), model `eleven_multilingual_v2`, settings tuned for narration (stability 0.55, similarity 0.8, style 0.35, speaker boost on, speed 1.0). Save to `remotion/public/audio/vo/act1.mp3` … `act6.mp3`.
2. **Music bed** — call ElevenLabs Music API directly from a one-off node script using `ELEVENLABS_API_KEY` from the sandbox env. Prompt: *"Two-minute hybrid orchestral-electronic score. Dawn-grey piano open, low pulse synth bed, strings entering at 0:45, full hybrid swell from 1:00 with subtle electronic percussion, triumphant release at 1:35, soft resolve at 1:52. Cinematic, restrained, Apple-keynote energy. No vocals."* Target 120s. Save to `remotion/public/audio/score.mp3`. Apply duck-style mix in Remotion: music at 0.35 volume baseline, drop to 0.18 under VO via per-act `volume` props.
3. **Mix in Remotion** — add `<Audio>` for each VO clip placed at the act's start frame, plus one full-length `<Audio src={staticFile('audio/score.mp3')} />` with a `volume` callback that returns 0.18 during VO ranges and 0.35 during silence (Acts 1 pre-line, Act 3 silence beat, Act 6 tail). Re-enable audio in render — remove `muted: true` and add `enforceAudioTrack: true` to `renderMedia`.

### Visual updates per act

- **Act 1 (420f)** — extend the heartbeat dot fade-in; add second sub-line "*The signal is there. The system isn't listening.*" appearing at frame 240.
- **Act 2 (900f)** — keep silo columns, but add a 4-beat stat sweep (one per silo, ~120f each) before the three master stats land. Each silo briefly highlights with a signal dot that hits the wall.
- **Act 3 (480f)** — same beats, longer breath after "By Friday, it was an incident." Add a 60-frame black hold.
- **Act 4 (990f)** — restructure as: 60f title → 4× 180f per-letter full-bleed dwell (each D/T/O/P fills the frame with the giant letter, verb, one sentence, swatch) → 210f resolve into the existing 4-column light-trace summary.
- **Act 5 (570f)** — extend counter tick from 35→90 over 180f; add three labelled scene chips (Frontline / Flight deck / Control room) that pulse in sequence with the light-trace.
- **Act 6 (240f)** — slower reveal of "From event to control." (90f), Comply365 mark holds 90f, fade 60f.

### File changes

- **Edit** `remotion/src/Root.tsx` — bump `durationInFrames` to 3600.
- **Edit** `remotion/src/MainVideo.tsx` — new durations, add VO `<Audio>` sequences + score `<Audio>` with dynamic volume.
- **Edit** all 6 `remotion/src/scenes/Act*.tsx` — re-timed and re-choreographed per above.
- **Edit** `remotion/scripts/render-remotion.mjs` — remove `muted: true`, add `enforceAudioTrack: true`.
- **Add** `remotion/scripts/generate-audio.mjs` — calls ElevenLabs TTS + Music APIs, writes MP3s into `remotion/public/audio/`.
- **Add** `remotion/public/audio/vo/act1.mp3` … `act6.mp3` and `remotion/public/audio/score.mp3` (generated artifacts, committed so re-renders don't need re-generation).
- **Re-render** `public/keynote/silos-to-signals.mp4` (replace existing 90s file).
- **No changes** to `src/pages/keynote/SilosToSignalsKeynote.tsx` — the `<video>` tag already streams the new file (poster frame may want bumping from 1800 → 2700, optional).

### Out of scope

- No sidebar/routing changes.
- No new entries in `marketDevelopmentAssets.ts`.
- No subtitle/caption track baked into the MP4 (can be added later if requested).