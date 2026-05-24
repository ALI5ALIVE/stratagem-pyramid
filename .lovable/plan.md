## Plan: update the rendered video narration to match the revised slide stats

### What I found
- The slide visuals were updated, but the video voiceover still comes from `remotion/public/audio/vo/act*.mp3`.
- The stale wording is hardcoded in `remotion/scripts/generate-audio.mjs`, especially Act 2:
  - “about sixty-five percent…”
  - “twenty-five to thirty-five billion dollars in avoidable annual exposure”
  - “five to seven days…”
- Re-rendering the video reused those old MP3 files, so the visuals changed but the audio did not.

### Implementation steps
1. Update the voiceover source text in `remotion/scripts/generate-audio.mjs`:
   - Act 2: replace the old 65% / avoidable exposure / 5–7 days narration with:
     - ~40% of operational reports without documented closure within 90 days
     - $25–35B as an industry-wide controllable-cost envelope, not Comply365 SAM
     - 2–4 weeks typical signal-to-decision time across operational silos
   - Act 5: add the “modelled, not measured / held lightly enough to revise” guardrail so the audio aligns with the new slide caption.
   - Keep pacing close to current durations so the VO remains synced to the Remotion act timings.

2. Regenerate the voiceover audio files:
   - Use the existing ElevenLabs generation script if the API key is available.
   - If the key is not available, pause and request the key instead of faking audio.

3. Re-render the final keynote video:
   - Run the existing Remotion render pipeline.
   - Copy the new render to `public/keynote/silos-to-signals.mp4`.

4. Update page cache busting:
   - Bump the keynote page video/download query string from `?v=3` to `?v=4` so viewers get the new video rather than a cached copy.
   - Also update the stale stat-sheet label from `65%` to the new stat set.

5. Verify the fix:
   - Confirm the source script no longer contains the stale Act 2 stats.
   - Confirm the MP3 files were regenerated after the script update.
   - Confirm the video file was re-rendered and referenced by the CEO keynote page.