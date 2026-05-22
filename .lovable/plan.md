## Make the transcript read like a story, not a list of fragments

**Problem:** The current beat cards split every sentence into short phrase chunks (~64 chars) on their own lines with extra leading. This was meant to aid scanning, but it chops natural prose into staccato fragments — the opposite of a smooth, easy-to-read teaching script.

**Fix:** Rewrite the "Say" body of each beat as flowing paragraphs — short, plain sentences set in comfortable body type with normal wrapping. Think children's-book pacing: simple sentences, generous line-height, gentle bolding for the words that matter, no visible breaks mid-thought.

### Changes (all in `src/lib/fieldKitPdf.ts`, transcript renderer)

1. **Replace `splitToPhrases` with `splitToSentences`**
   - Output is sentence-level paragraphs, not 64-char fragments.
   - Long sentences are gently rewritten as two sentences by splitting on `; ` / ` — ` / `: ` only when the sentence exceeds ~180 chars; commas are left alone so prose still breathes.
   - Each "paragraph" is one sentence that gets wrapped naturally to the card width.

2. **Rewrite the SAY rendering loop in `drawBeat`**
   - Use `pdf.splitTextToSize(sentence, innerW)` so each sentence flows across as many lines as it needs, wrapped on word boundaries.
   - Set body type to 10.5pt with 14pt leading (was 9.5/13 in phrase mode) — calm, readable, paragraph-style.
   - Add a 6pt gap between sentences (not between every line) so the eye sees paragraphs, not a list.
   - Keep token-aware bolding (`drawPhraseLine`) but apply it per wrapped line of the sentence, not per phrase, so highlights survive without breaking flow.

3. **Update `measureBeat`** to match: height is now `sentences.reduce((h, s) => h + wrapped(s).length * 14 + 6, 0)` instead of `phrases × phraseLeading + gap`.

4. **Soften the "point" line**
   - Drop the ALL-CAPS treatment (currently `.toUpperCase()`) — it shouts. Render the intent in sentence case, 9.5pt bold, muted color. Reads like a chapter subtitle, not a label.

5. **First-line lead-in (subtle)**
   - When a beat has a `quoted` verbatim line, render it as a single italicized opening sentence above the body ("*Say this:* "Real opening words.""), then continue with normal prose. Gives the rep an obvious anchor without a fragment-stack.

6. **Listen-for** stays as-is (already a clean footer row after the previous pass).

### Out of scope
- No changes to source narration scripts, the React app, study sheets, glossary, or closing drill.
- No font swap; just type scale + wrapping behavior.

### Validation
Regenerate the W1 kit, rasterize pages 4, 6, 8, 9, 12, 13, 16, 17 at 110dpi, and confirm:
- No sentence breaks mid-clause
- No card overflow / no clipped lines
- Paragraph rhythm visible (gaps between sentences > gaps within sentences)
- Page count within ±2 of current (35 pages)
