## Goal

Rewrite the `se-discovery-question-bank` narration so it plays as a **two-voice walkthrough of the actual cards on the slide** — rep voice asks a question from the bank, customer voice gives a realistic answer (sometimes a "good" answer, more often a "red-flag" answer), rep briefly names what they just heard, then moves on.

Same two-voice pattern we just shipped on `se-discovery-call-runbook` (George = rep, Charlotte = customer). No infrastructure changes — the segments pipeline already supports this.

## Scope

One file, narration-only. No slide visual changes, no other slides touched.

### `src/data/salesEnablementNarration.ts` — replace the `se-discovery-question-bank` entry

- Keep `slideId`, `title`, `voiceId` (George) as-is.
- Rewrite `script` (used by the speaker-notes panel) as the same dialogue, prefixed `Rep:` / `Customer:`, so the transcript and audio match.
- Add a `segments` array alternating George (rep) and Charlotte (customer).

### Walkthrough structure (~2 min audio, 14–18 segments)

1. **Rep open** (George, one segment) — frame what the slide is and what we're about to do: "Let me walk you through how this plays in a real room. I'll pull one question per DTOP step, and you'll hear what a useful answer sounds like versus a red flag."
2. **Detect (D)** — Rep asks one question verbatim from the D card → Customer gives a red-flag style answer → Rep one-line read ("That's the red flag — they can't name where the signal lands. That's the wedge.").
3. **Trigger (T)** — Rep asks one T question → Customer gives a realistic answer with a number that exposes the gap ("Honestly, three to four weeks…") → Rep one-line read.
4. **Orchestrate (O)** — Rep asks one O question → Customer describes the manual stack ("Safety tool, then content, then the LMS — and a spreadsheet that someone owns…") → Rep one-line read.
5. **Prove (P)** — Rep asks the audit-evidence question → Customer admits it's a multi-day project → Rep one-line read (this is the "cheapest yes" line from the slide intent).
6. **Rep close** (George, one segment) — close the loop: "Four questions. Four red-flag answers. That's not a coincidence — that's the shape of the problem DTOP is built for. Pick four before every call, ask one, then shut up."

### Question selection (from `discoveryQuestionBank` in `src/data/week3FieldKit.ts`)

Use the questions already on the slide so the audio matches what the viewer is looking at:

- **D**: "When something goes wrong operationally, where is the very first place it's logged?"
- **T**: "How long, on average, from signal to a procedure update reaching the crew?"
- **O**: "Walk me through how a procedure change today reaches the right crew and gets paired with the right training."
- **P**: "If a regulator asked for proof your last five safety actions actually closed the loop, how long would that take?"

Customer answers map deliberately to the **red-flag** descriptor on each card so the rep's debrief line lands.

## Out of scope

- Slide visuals / card layout
- Any other slide's narration
- New voices, new TTS settings
- Edge function or hook changes (segments path already shipped)

## Risk

Same minor MP3-seam risk between segments as the runbook. Acceptable.
