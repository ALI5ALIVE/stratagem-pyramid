

# Create CoAnalyst Deck Narration

## Problem
The CoAnalyst deck (`/coanalyst`) currently uses `useSimpleNarration`, which reads narration scripts from `src/data/slideNarration.ts` — the **main deck's** narration. This means slides 0–14 of the CoAnalyst deck play narration written for the main positioning deck, which is completely wrong content.

## Plan

### 1. Create `src/data/coanalystNarration.ts`
A new narration data file with 15 scripts (slides 0–14), each written to match the actual CoAnalyst slide content:

| Slide | Title | Key Narrative Points |
|-------|-------|---------------------|
| 0 | Title | CoAnalyst as the intelligence layer; "From reports to intelligence, from events to control"; sets up the playbook |
| 1 | Executive Summary | Role within the platform; positioning as intelligence engine powering DTOP; proof points (90%+ accuracy, 60+ languages, 7-figure R&D) |
| 2 | The Intelligence Gap | Why operational modules alone aren't enough; fragmented data across domains; shift from compliance to performance-based oversight |
| 3 | Strategic Narrative | The 5-phase story: Today → Gap → Shift → CoAnalyst → Outcome |
| 4 | Product Positioning | Positioning framework (role, audience, problem, why now, unique value, proof points); differentiated positioning statement |
| 5 | Messaging Architecture | Master message + 5 pillars; "From Reports to Intelligence. From Events to Control." |
| 6 | How It Works | **Updated slide** — 4 intelligence tiers (Historical → Reactive → Proactive → Predictive) with minimal pipeline reference; CoAnalyst as the intelligence layer above operational systems |
| 7 | Business Outcomes | Measurable business value: time savings, precision, risk detection, cross-domain analysis |
| 8 | vs Generic AI | Capability comparison; accuracy by depth (90% vs 30–40% at level 4–5); build vs buy; hybrid AI architecture |
| 9 | Persona Messaging | 5 personas (Safety, Ops, M&E, Executives, Innovation); tailored care points and messages |
| 10 | Objection Handling | Strategic responses to common objections (generic AI, just analytics, build internally, etc.) |
| 11 | Taglines & Lines | Ready-to-use taglines, headlines, elevator pitches |
| 12 | Website Messaging | Product page copy: hero, value prop, how it works, differentiators, CTA |
| 13 | Visual Narrative | 7 concept designs for channels: industry shift, architecture, pipeline, maturity, comparison, outcomes, master architecture |
| 14 | Deck Structure | Recommended slide flow for positioning deck; final positioning recommendations |

### 2. Create `src/hooks/useCoAnalystNarration.ts`
A new hook that mirrors `useSimpleNarration` but imports from `coanalystNarration.ts` instead of `slideNarration.ts`. Same TTS integration via the `elevenlabs-tts` edge function.

### 3. Update `src/pages/CoAnalystDeck.tsx`
Replace `useSimpleNarration` import with `useCoAnalystNarration`.

## Technical Details
- Narration scripts will use phonetic guidance where needed (e.g., "Comply three six five", "Foqua")
- Voice ID stays the same (`JBFqnCBsd6RMkjVDRZzb` — George)
- Each script ~80–150 words targeting 30–60 seconds per slide
- Total deck narration ~12–15 minutes

