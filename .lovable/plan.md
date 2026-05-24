## Plan to fix the voiceover overlap

### Issue
The regenerated narration files are longer than their assigned Remotion act windows:

```text
Act 2 VO starts at 16.0s and runs ~38.5s, ending ~1.5s into Act 3.
Act 5 VO starts at 103.0s and runs ~25.7s, ending ~2.2s into Act 6.
```

### Fix
1. **Shorten the voiceover source text for Act 2 and Act 5**
   - Keep the updated statistics.
   - Remove extra phrasing so each narration fits cleanly inside its act.
   - Preserve the CEO-keynote pacing and the guardrail language.

2. **Regenerate the affected MP3 narration files**
   - Regenerate Act 2 and Act 5 audio from the shortened script.
   - Re-check MP3 durations with `ffprobe` before rendering.

3. **Add a timing guardrail in Remotion**
   - Update `MainVideo.tsx` so each voiceover `<Sequence>` has a `durationInFrames` that ends before the next act’s voiceover begins.
   - This prevents future audio bleed even if a regenerated MP3 runs long.

4. **Re-render the keynote video**
   - Render a new `public/keynote/silos-to-signals.mp4` with the corrected audio.
   - Keep the existing slide visuals and updated statistics.

5. **Bump the page video cache version**
   - Update the keynote page video/download query string from `?v=4` to `?v=5` so the browser loads the corrected MP4.

6. **Verify**
   - Confirm Act 2 and Act 5 durations no longer exceed their windows.
   - Confirm no stale old stats exist in the narration script.
   - Confirm the final MP4 was re-rendered and referenced by the CEO keynote page.