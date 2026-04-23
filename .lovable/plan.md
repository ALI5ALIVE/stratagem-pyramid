

## Remove "Act" language + add "Journey Ahead" dividers for the two roadmaps

### 1. Strip "Act" comments and any user-visible "Act" language

The word "Act" only appears in three places:

- **`src/pages/TechnicalDeepDive.tsx`** — five `// Act N — …` source comments. These are dev-only but the plan says remove for clarity. Replace with neutral grouping comments (e.g. `// Frame the problem`, `// Architecture`, `// Intelligence & Orchestration`, `// Delivery & operating model`, `// Value & close`).
- **`src/exporters/pptx/buildTechnicalDeck.ts`** — section divider builder calls that pass titles like `"Act 3 — Intelligence & Orchestration"`. Drop the `Act N — ` prefix on every divider so the PPTX shows just the section name (e.g. `"Intelligence & Orchestration"`).
- **`src/data/technicalPitchNarration.ts`** — any narration line that says "in this act" → rewrite as "in this section" / "next we look at…".

After this pass, a global search for `\bAct\b` in tech-deck files returns zero hits.

### 2. Add two "Journey Ahead" divider slides

Reuse the existing `TechSlideLayerDivider` component pattern, but introduce a **lighter sibling** divider for non-architectural sections — `TechSlideJourneyDivider` — so we don't have to fake a "Layer N" badge for things that aren't platform layers.

New component **`src/components/tech-slides/TechSlideJourneyDivider.tsx`**:
- Eyebrow: `THE JOURNEY AHEAD` (in primary blue accent).
- Title: configurable (e.g. `Maturity Roadmap` or `2026 Use Case Roadmap`).
- Tagline: configurable one-liner.
- **No mini-stack** (this isn't an architecture layer) — instead a clean horizontal stepper showing: `Today → Near term → Long term` with the current focus pill lit.
- `Up next:` list of slides this section introduces.
- Same dark theme, brand chrome, narration-controlled play button.

Slot two instances into the deck **immediately before** the two roadmap slides:

| Position | Divider | Introduces |
|---|---|---|
| Before `tech-slide-14` | **The Journey Ahead — Maturity Roadmap** ("Where customers are today and how Comply365 moves them forward") | Maturity Roadmap |
| Before `tech-slide-15` | **The Journey Ahead — 2026 Use Case Roadmap** ("Phased delivery — each phase builds on proven value") | 2026 Roadmap |

Sidebar labels: `▸ Journey Ahead · Maturity` and `▸ Journey Ahead · 2026 Use Cases` so they visually group like the existing `▸ Layer N` items.

### 3. PPTX export mirror

In `src/exporters/pptx/buildTechnicalDeck.ts`:
- Remove `Act N — ` prefixes from every `addSectionDivider` call.
- Add two new native divider slides using a new `buildJourneyDivider` helper (same look as the layer dividers but with a horizontal stepper instead of the mini-stack), inserted at the matching positions in the export order.

### 4. Narration

Add two short ~10-second narration entries in `technicalPitchNarration.ts` for the new dividers: one framing the maturity journey, one framing the 2026 use-case roadmap.

### Files

**Created**
- `src/components/tech-slides/TechSlideJourneyDivider.tsx`

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — replace "Act" comments with neutral section headings; register the two new journey dividers; add their `journeyProps` config.
- `src/exporters/pptx/buildTechnicalDeck.ts` — drop `Act N — ` prefixes on all section dividers; add `buildJourneyDivider` helper; insert two journey divider slides in the export sequence.
- `src/data/technicalPitchNarration.ts` — rewrite any "act" wording; add narration for `tech-divider-journey-maturity` and `tech-divider-journey-2026`.

**Untouched**
- All architecture layer dividers (already correct).
- `TechSlideLayerDivider.tsx` (kept as-is for the 5 architecture layers).
- All other decks.

### Verification

1. `/pitch-technical` — global text search for "Act 1" / "Act 2" / etc. returns zero hits in the deck (sidebar, slides, narration captions).
2. Two new "The Journey Ahead" divider slides appear immediately before the Maturity Roadmap and 2026 Roadmap slides; sidebar shows them grouped with `▸ Journey Ahead · …`.
3. Download Editable PowerPoint — `.pptx` text search for "Act" returns zero hits; the two journey dividers render with the eyebrow + stepper + "Up next" list.
4. PDF QA: convert pptx → PDF → JPEGs at 150 dpi; visually confirm the two new dividers match the visual grammar of the existing layer dividers.

### Out of scope

- Other decks.
- Reordering the roadmap slides themselves.
- Changing the maturity/roadmap content.

