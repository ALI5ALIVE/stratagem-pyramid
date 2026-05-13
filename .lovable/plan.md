## Goal
Reorder `/platform` sections to follow the architecture diagram: **Foundation at the bottom of the stack first, Operating Model (DTOP) wrapping everything at the end.**

## Change
Single file: `src/pages/PlatformOverview.tsx`.

### Section order
**Current:** Hero → TrustLogos → PlatformModules → Foundation → **DTOP** → Intelligence → Mobile → Integrations → Security → Customers → Why → CTA

**New:** Hero → TrustLogos → PlatformModules → **Foundation** → **Intelligence** → **Mobile** → **DTOP** → Integrations → Security → Customers → Why → CTA

Rationale: matches the architecture stack — systems of record (Foundation) → intelligence layer → frontline mobile → DTOP operating model wrapping the stack.

### Sticky nav order
Update `navItems` to mirror the new flow:
`Platform · Foundation · Intelligence · Mobile · DTOP · Integrations · Security · Customers`

## Out of scope
- No copy, styling, or component changes.
- No changes to home, industry pages, or decks.

## Acceptance
- DTOP renders directly before Integrations.
- Foundation renders directly after PlatformModules.
- Sticky nav order matches new section order; all anchors resolve.
- No layout regressions at 1415px or 375px.
