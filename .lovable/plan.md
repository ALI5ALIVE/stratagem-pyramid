Bump the video cache-buster on the keynote page so browsers fetch the freshly uploaded file instead of the cached old one.

### Change
In `src/pages/keynote/SilosToSignalsKeynote.tsx`, update both references to `/keynote/silos-to-signals.mp4?v=2` → `/keynote/silos-to-signals.mp4?v=3`:
- the `<video src="...">` in the film act
- the "Download" anchor `href`

### What you do
Replace `public/keynote/silos-to-signals.mp4` with the new file (same filename). The `?v=3` query string forces browsers and CDNs to drop the cached copy.

### Out of scope
No script, layout, Remotion, or audio changes.