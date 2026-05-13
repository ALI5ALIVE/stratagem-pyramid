## Goal
Make narration pronounce "DTOP" letter-by-letter (D, T, O, P) instead of as the word "dee-top", across every voiced deck (Sales Enablement, Exec, Tech, Ops, Roadmap, CoAnalyst, Customer Overview, Line of Sight, Playbooks).

## Approach
Fix it once at the source of truth: the `elevenlabs-tts` edge function. It is called by every narration hook, so a single text-preprocessing step there handles every deck without touching scripts or UI copy.

Replace standalone occurrences of `DTOP` in the incoming `text` with `D-T-O-P` before sending to ElevenLabs. ElevenLabs Turbo v2.5 reliably reads hyphen-separated capitals as individual letters.

### Why edge function (not narration scripts)
- One change, every deck fixed (12+ hooks, 10+ narration data files).
- Keeps written scripts and on-screen UI labels showing "DTOP" (the brand term) untouched.
- New narration scripts written later inherit the fix automatically.

## Changes

**`supabase/functions/elevenlabs-tts/index.ts`** — add a small preprocessing step right after parsing the body:

```ts
// Pronounce brand acronym letter-by-letter
const processedText = text.replace(/\bDTOP\b/g, "D-T-O-P");
```

Then pass `processedText` (instead of `text`) into the ElevenLabs request body. Word-boundary regex ensures we don't mangle anything like "DTOPlaybook".

## Out of scope
- No changes to narration scripts in `src/data/*Narration.ts`.
- No changes to UI components (slides keep showing "DTOP" visually).
- No changes to other acronyms (CoAnalyst, SOP, DG, etc.) — only DTOP was reported.

## Acceptance
- Playing the M2 · DTOP slide (and any other slide that mentions DTOP) on /sales-enablement pronounces it as "D, T, O, P".
- Visual labels still read "DTOP".
- No new TypeScript or build errors; edge function redeploys automatically.
