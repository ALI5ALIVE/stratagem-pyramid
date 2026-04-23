

## Reorder Tech Deep Dive opener + add Platform-style hero as new slide 1

### Changes

**1. Replace `TechSlideOpener` (position 0) with a new platform-hero opener**

Rebuild `src/components/tech-slides/TechSlideOpener.tsx` to mirror the Platform Playbook title slide (`PFSlide0Title`) content:

- Eyebrow (with `Layers` icon): **"The Operational Performance Platform"**
- Headline (two lines):
  - `One platform.`
  - `One operating model. One entry point.`
- Tagline: **"From fragmented operations to closed-loop performance."**
- Subtitle: **"Comply365 unifies content, training and safety into a single operational data foundation — activated by intelligence and automation, governed by DTOP, delivered through one trusted mobile shell."**
- Status pill (emerald, pulsing dot): **"Foundational platform · Live core · Intelligence & orchestration in active delivery"**

Use `SalesSlideContainer` with `id="tech-slide-opener"`, `showHeader={false}` so the hero is centred (matches the visual grammar of `TechSlide0Title`). Keep the existing `slideNumber` + narration prop pass-through.

**2. Move the "Why It Exists" content into a new slide between `tech-slide-3b-platform-snapshot` and `tech-slide-4`**

Wait — re-reading the request: the user says "before the *What the Platform Is — at a Glance* slide". That slide is `tech-slide-3b-platform-snapshot` (TechSlidePlatformSnapshot). So Why It Exists should sit immediately **before** Platform Snapshot.

Create a new component `src/components/tech-slides/TechSlideWhyExists.tsx` containing the current TechSlideOpener body (the 6-problem grid sourced from `whyItExists` in `platformPlaybook.ts`), with `id="tech-slide-why-exists"`, title "Why It Exists", subtitle = `whyItExists.headline`.

**3. Update `src/pages/TechnicalDeepDive.tsx` slide order**

New "Frame the problem" sequence at the top of the `slides` array:

```text
1. tech-slide-opener           (NEW hero — "The Operational Performance Platform")
2. tech-slide-0                (Title — "Operational Performance Platform" deep-dive)
3. tech-slide-1                (Strategic Shift)
4. tech-slide-2                (Industry Challenge)
5. tech-slide-why-exists       (MOVED — Why It Exists, 6-problem grid)
6. tech-slide-3b-platform-snapshot  (What the Platform Is — at a Glance)
7. tech-slide-4                (Platform Overview / architecture)
… rest unchanged
```

Update the imports + the `slides` array ordering. Sidebar labels:
- `tech-slide-opener` → `"Hero — Operational Performance Platform"`
- `tech-slide-why-exists` → `"Why It Exists"` (moved entry, replaces current opener position)

**4. Mirror the change in the PPTX exporter**

Update `src/exporters/pptx/buildTechnicalDeck.ts`:

- Rewrite `openerSpec` so it renders the new platform-hero (eyebrow + two-line headline + tagline + subtitle + emerald status pill) instead of the 6-problem grid.
- Add a new `whyExistsSpec` containing the 6-problem grid (the previous `openerSpec` body).
- In the `composed` array, place `whyExistsSpec` immediately before `platformSnapshotSpec`.

### Files touched

**Edited**
- `src/components/tech-slides/TechSlideOpener.tsx` — replace body with platform-hero content.
- `src/pages/TechnicalDeepDive.tsx` — import new `TechSlideWhyExists`, reorder `slides[]`.
- `src/exporters/pptx/buildTechnicalDeck.ts` — rewrite `openerSpec`, add `whyExistsSpec`, reorder.

**New**
- `src/components/tech-slides/TechSlideWhyExists.tsx` — moved Why It Exists 6-problem grid (the current opener body).

### Out of scope

- Platform Playbook (`PFSlide0Title` / `PFSlide1WhyExists`) is unchanged — only the Technical Deep Dive is re-shaped.
- No narration audio regeneration.
- No content edits to the 6 problem cards or the hero copy beyond what's quoted above.

