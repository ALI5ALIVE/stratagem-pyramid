## Plan: make the transcript stop reading like a wall of text

I’ll rebuild the PDF transcript page so it works like a sales rep rehearsal aid, not a dense script page.

### What will change

1. **Switch from paragraph beats to cue cards**
   - Each transcript page becomes a stack/grid of compact rehearsal cards.
   - Each card has only three scannable zones:
     - **Point**: what this part is trying to land.
     - **Say**: the exact words, broken into short 1–2 line chunks.
     - **Listen for**: the customer reaction or mistake to watch for.

2. **Break long “Say” text into phrase lines**
   - Instead of wrapping a full paragraph, the script will split on sentence boundaries and natural pauses.
   - Longer sentences will be broken with visible pause markers so reps can rehearse delivery.
   - This should look closer to a teleprompter card than prose.

3. **Add a left-side navigation rail**
   - A thin vertical rail shows beat numbers and category labels such as Anchor, Pain, Value, Bridge.
   - Reps can glance at the page and know where they are in the talk track.

4. **Use visual hierarchy more aggressively**
   - “Say” lines get larger type and more whitespace.
   - Stats, product names, and key phrases stay bold/highlighted.
   - Coaching notes become small side notes instead of competing with the script.

5. **Reduce density per page**
   - Fewer beats per page, bigger text, more breathing room.
   - If the transcript needs more than one page, it will paginate cleanly and keep cards intact.

6. **Keep scope limited**
   - Only update `src/lib/fieldKitPdf.ts`.
   - No changes to the slide content, narration source, app UI, or PDF download flow.

### Technical approach

- Replace the current beat rendering block with a **Cue Card** renderer.
- Add helpers to:
  - split script text into short delivery lines,
  - classify beats by cue prefix,
  - measure each card before drawing,
  - render highlighted tokens inside short lines.
- Preserve the existing jsPDF generation flow and transcript page insertion point.