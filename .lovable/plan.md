## Goal
Bring `/platform` (`src/pages/PlatformOverview.tsx`) up to world-class B2B platform-page standard. Remove the premature "Outcomes by role" section, fix terminology, simplify, and reorder around the proven pattern: **Hero → Trust → What it is → How it works → Proof → Security → CTA**.

## Scope
- `src/pages/PlatformOverview.tsx` — restructure, rewrite section copy, remove sections.
- Reuse existing components: `TrustLogos`, `CustomerQuotes`, `StatSourceChip`, `BookWalkthroughDialog`, `PlatformArchitectureDiagramV4`, `PersonaTabs`.
- No backend, routing, or data-model changes.

## Change list

### A. Remove / replace
1. **Delete the `Outcomes` section entirely.** It's premature personalization with generic, sourceless metrics. The work it tries to do (role-based promises) is better handled by the homepage Personas section and by the Persona lens inside DTOP. Net result: shorter, sharper page.
2. **Remove `PersonaTabs` from the Hero.** Single CTA focus.
3. **Strip "Layer 1 / 2 / 3 / 4" eyebrow labels** from Foundation, Intelligence, Mobile, DTOP. Keep clean role-oriented eyebrows ("The Foundation", "The Intelligence Layer", "The Frontline", "The Operating Model").
4. **Rename "CoAnalyst — Recommended Actions"** in the Intelligence tile to **"Intelligence Layer — Recommended Actions"** to match the public-site terminology lock. Hero copy: replace "One intelligence layer (CoAnalyst)" with "One intelligence layer."

### B. Reorder sections
Current: Hero → Outcomes → Modules → DTOP → Mobile → Intelligence → Foundation → Integrations → Security → Why → CTA
**New:** Hero → **TrustLogos** → PlatformModules (overview) → **Foundation** → **DTOP** (with persona lens, the only place PersonaTabs lives) → Intelligence → Mobile → Integrations → Security → **CustomerQuotes** → Why It Works → CTA

Rationale: Anchor the *what you buy* (Foundation) before *how it acts* (DTOP / Intelligence / Mobile). Trust strip immediately under hero. Customer voice before the closing argument.

### C. Hero polish
- Tighten subheading: "One connected data model. One operating model. One intelligence layer. Built for regulated, operationally complex industries."
- Add inline trust micro-stat strip under CTAs: "550+ customers · ~2.5M users · 6 continents" (small, muted, single line).
- Keep both CTA buttons; keep "See it in the Medium Pitch" as secondary.

### D. Sticky nav update
Replace nav items to match new section order and labels:
`Platform · Foundation · DTOP · Intelligence · Mobile · Integrations · Security · Customers`
Drop `Outcomes` and `Why` from nav (Why becomes the closing argument, not a destination).

### E. Trust + proof additions
1. Insert `<TrustLogos />` directly under Hero (already exists, used on home).
2. Insert `<CustomerQuotes />` between Security and Why (already exists, used on home).
3. Add `StatSourceChip` to the CoAnalyst anchor metric ("~90% domain accuracy at L4–L5 vs ~35% generic AI") — it currently has italic text underneath, replace with chip for consistency with the home page treatment.

### F. CTA — add secondary path
Keep "Book a walkthrough" primary; add "See the Medium Pitch" (already there) and a third tertiary link "Download platform overview (PDF)" pointing to the existing executive pitch PDF export route, or hide if no asset is wired (verify before wiring).

### G. Out of scope
- New imagery, screenshots, or interactive demos (would need design + assets — flag as future work).
- Persona content rewrites in `personaConfig.ts`.
- Changes to home page, industry pages, or pitch decks.
- New routing, auth, or backend.

## Acceptance criteria
- `/platform` renders new order; no `Outcomes` section; no "Layer N" labels; no "CoAnalyst" string in Hero.
- TrustLogos visible immediately under hero; CustomerQuotes visible before Why.
- PersonaTabs appears exactly once on the page (inside DTOP).
- Sticky nav anchors all resolve to existing section ids.
- CoAnalyst metric card uses `StatSourceChip`.
- No TS or runtime errors; layout intact at 1415px (current viewport) and 375px.

## Future work (flagged, not in this plan)
- Real product screenshot in hero (replace gradient).
- Short looping demo video for DTOP scenario.
- Per-section "see it in the deck" deep-link CTAs.
