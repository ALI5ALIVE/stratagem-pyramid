

# Convert Regulation Management Playbook to Slide Deck Format

## Summary

Rebuild the Regulation Management playbook to match the CoAnalyst playbook format: full-screen snap-scroll slides, password gate, progress bar, slide counter, keyboard navigation, and sidebar slide list integration.

## Approach

Convert each of the 11 current sections into individual slide components using `SlideContainer`, then wrap them in the same deck shell pattern as `CoAnalystDeck.tsx`.

## Slides (11 total)

0. **Title Slide** — "Regulation Management" hero with tagline and scroll prompt
1. **Solution Overview** — Elevator pitch, narrative arc, key insight
2. **The Problem Today** — 6 pain point cards in grid
3. **Solution Positioning** — Role/audience/problem/unique value framework
4. **Value Pillars** — 5 pillar cards with icons and metrics
5. **How It Works** — 3-layer delivery model
6. **Use Cases & Scenarios** — Use case cards (no accordion — content fits slide)
7. **Persona Relevance** — 5 persona cards with tailored messages
8. **Commercial Model** — Pricing/packaging cards
9. **Objection Handling** — Objection/response grid
10. **Roadmap & Talking Points** — Phased timeline + discovery questions

## Changes

### 1. New slide components: `src/components/regmgmt-slides/`
Create 11 slide components (RMSlide0Title through RMSlide10Roadmap), each using `SlideContainer` with the existing data from `regulationManagementPlaybook.ts`. Same dense card-based layouts as the CoAnalyst slides.

### 2. Rewrite `src/pages/RegulationManagementPlaybook.tsx`
Replace the scrollable page with the CoAnalyst deck pattern:
- Password gate (same password `comply2025`, session key `rm-unlocked`)
- Full-screen snap-scroll container
- Progress bar, slide counter, keyboard navigation
- Sidebar slide list via `useSlideNavigation`
- No narration (can be added later)

### 3. No changes to data file
`src/data/regulationManagementPlaybook.ts` stays as-is — slide components import from it.

**11 new files, 1 file modified.**

