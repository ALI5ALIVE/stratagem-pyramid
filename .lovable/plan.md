## Slide Numbering Audit — Findings

I reviewed slide numbering across the decks, with focus on the recently added/edited ones (Roadmap deck and Technical deck).

### Roadmap Deck (`/roadmap`) — issue found

The deck renders 22 slides in this order, and the on-screen "slide N" badge (driven by `slideNumber={index}`) is correct everywhere because it is computed from position.

However, the **use-case chip** on each use-case slide says "Use case 1"…"Use case 17" using a hardcoded `slideNumber` field on each entry in `roadmapUseCases.ts`. That count is right today (1 → 17 in delivery order), but it duplicates information and will silently drift if a use case is reordered, added, or removed.

Also worth tightening:
- The H1 2026 phase divider precedes use cases 1–6, H2 2026 precedes 7–11, 2027+ precedes 12–17. ✅ correct against the data.
- Title slide narration says "seventeen named use cases" — matches `roadmapUseCases.length` (17). ✅
- Closing slide uses `roadmapUseCases.length` dynamically. ✅
- Overview slide groups by phase dynamically. ✅

**Fix:** Make the per-use-case number derived, not hardcoded.

1. Remove the `slideNumber` field from each `RoadmapUseCase` entry (and from the interface).
2. In `RDUseCaseSlide.tsx`, replace the hardcoded `useCase.slideNumber` with the index computed from `roadmapUseCases.findIndex(u => u.id === useCase.id) + 1`, so the "Use case N" chip is always in sync with the delivery order in the data.
3. In `RoadmapDeck.tsx`, the sidebar label currently uses `${uc.slideNumber}. ${uc.title}` — switch to the same derived index.

### Technical Deck (`/technical-v4` and `/technical`) — no fix needed

- Slide IDs like `tech-slide-15` are stable identifiers, not positional. The displayed slide number in the play bar is positional (`slideNumber={index}`) and stays correct regardless of insertions.
- Recently edited "Slide 15 — 2026 Roadmap" still maps to id `tech-slide-15` and the narration entry `tech-slide-15` — consistent. ✅

### Other decks (Executive, Operational, CoAnalyst, Sales Enablement, Insights, Automation, Mobile, DTOP, RegMgmt, Content Strategy)

Spot-checked: all use positional `slideNumber={index}` from the parent page, and on-slide chips reference IDs (not hardcoded ordinal numbers). No drift. ✅

## Files to change

- `src/data/roadmapUseCases.ts` — remove `slideNumber` field + interface property.
- `src/components/roadmap-slides/RDUseCaseSlide.tsx` — derive the use-case number from array index.
- `src/pages/RoadmapDeck.tsx` — derive the sidebar label number from array index.

No changes to narration scripts or other decks are required — the audit confirms they're already accurate.
