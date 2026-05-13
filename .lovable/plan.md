# Restructure `/comply365-home` to best-practice structure

Apply HubSpot-style home page anatomy: pain → unified platform picture → capabilities → wedge → proof → industry self-select → CTA.

## Scope

Single file: `src/pages/Comply365Home.tsx`, plus two new components and one deletion. No copy rewrites beyond what's needed for the new diagram and industry tiles. No changes to other pages, decks, or business logic.

## New section order

```text
1. Hero                       (existing — keep)
2. TrustLogos                 (existing — keep)
3. WhyNow                     (existing — moved up; problem first)
4. UnifiedPlatformDiagram     (NEW — replaces CustomerBenefits)
5. Platform (3 modules)       (existing — keep)
6. CoAnalystComparison        (existing — the wedge / what's new)
7. AnimatedDTOP               (existing — how it operates, after the wedge)
8. CustomerQuotes             (existing — keep)
9. IndustryTiles              (NEW — replaces Personas)
10. CTA                       (existing — keep)
11. HomeFooter                (existing — keep)
```

Compared to today: WhyNow moves up before the platform picture; `CustomerBenefits` is removed; `Personas` is replaced by `IndustryTiles`; a new `UnifiedPlatformDiagram` is added as the single canonical "how it fits together" visual.

## Components

### NEW — `src/components/home/UnifiedPlatformDiagram.tsx`
One canonical picture of the whole platform, layered bottom-up to match the architecture diagram already used on `/platform`:

- **Foundation** (bottom band): "One Connected Data Model" with a row of substrate chips (Content · Safety · Training · Operational Data)
- **Modules** (middle band): three tiles — ContentManager365, SafetyManager365, TrainingManager365 (icons from existing MODULES list pattern)
- **Intelligence Layer** (upper band): single pill labeled "Intelligence Layer · ~90% domain accuracy" with `StatSourceChip`
- **Mobile / Frontline** (right rail or top band): one chip "Mobile · Frontline"
- **DTOP wrap** (outer frame): four corner labels D · T · O · P using canonical colors (blue · amber · violet · emerald), visually wrapping the stack
- Single CTA link: "Explore the platform →" to `/platform`

Pure presentational, semantic tokens only. No new data sources.

### NEW — `src/components/home/IndustryTiles.tsx`
Three tiles linking to existing industry pages:

- Airlines → `/solutions/airlines`
- Defense → `/solutions/defense`
- Rail → `/solutions/rail`

Each tile: icon, industry name, one-line outcome hook, "See solution →". Reuse card styling from current `Platform` modules section for visual consistency.

### REMOVED
- `src/components/home/CustomerBenefits.tsx` (delete file)
- Personas section (the inline `Personas` component inside `Comply365Home.tsx`) — remove the component definition and its render; remove `PERSONAS` import

### EDITED — `src/pages/Comply365Home.tsx`
- Remove `CustomerBenefits` import + usage
- Remove inline `Personas` component + `PERSONAS` import + `Users` icon if unused
- Add `UnifiedPlatformDiagram` and `IndustryTiles` imports
- Reorder JSX in the page component to the new section order above

## Out of scope

- No changes to `/platform`, industry pages, decks, or navigation
- No copy rewrites in Hero, WhyNow, Platform modules, CoAnalystComparison, CustomerQuotes, or CTA
- No new routes, data, or backend
- No responsive redesign beyond standard tailwind grid behavior on the two new components

## Acceptance criteria

- Sections render in the order listed above at 1415px and 375px without clipping
- `CustomerBenefits.tsx` no longer exists; no import references remain
- Personas grid no longer renders on home; `/platform?role=…` deep links elsewhere are untouched
- New unified diagram renders as a single bordered card with Foundation, Modules, Intelligence, Mobile, and DTOP wrap visible
- Industry tiles link correctly to `/solutions/airlines`, `/solutions/defense`, `/solutions/rail`
- No TypeScript or build errors
