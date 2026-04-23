

## Final CoAnalyst cleanup + slide-9 title shortening

### 1. PlatformArchitectureDiagram (shared diagram used in Tech, Platform, and other decks)

In `src/components/platform-slides/PlatformArchitectureDiagram.tsx`, Layer 2 ("Intelligence & Orchestration Layer") still shows the old sub-capability tiles. Update them so they match the renamed sublayers:

| Tile | Old | New |
|---|---|---|
| 1 | `CoAnalyst` — "Ask anything in plain English" | **Insights & Intelligence** — "Ask anything in plain English" |
| 2 | `Insights & Rec.` — "Patterns + Recommended Actions" | **Recommendations & Prescriptive Actions** — "Patterns + prescriptive next steps" |
| 3 | `Automation` — unchanged | unchanged |

Tile 1 keeps the `Brain` icon; tile 2 keeps the `Sparkles` icon; tile 3 keeps `Zap`. Colours unchanged. Font sizing on tile 2 may need to drop to `text-[10px]` for the longer label so it doesn't wrap awkwardly inside the small card.

### 2. Slide 9 title shortened

In `src/components/tech-slides/TechSlideInsights.tsx`, change the title from
`Recommendations & Prescriptive Actions on the Operational Performance Platform`
→ **`Intelligence & Orchestration Layer — Recommendations & Prescriptive Actions`**

This matches the sibling Slide 8 pattern (`Intelligence & Orchestration Layer — Insights & Intelligence`). Subtitle unchanged.

### 3. PPTX export mirror (`src/exporters/pptx/buildTechnicalDeck.ts`)

- Slide 9 builder: title string updated to the new shorter form. The shorter title also fixes any wrapping/overflow risk from the previous QA note.
- Section divider for Act 3: subtitle already uses platform-centric language — no change needed.
- Sidebar short label in `src/pages/TechnicalDeepDive.tsx` stays as `"Recommendations & Prescriptive Actions"` (already correct, doesn't include the long suffix).

### Files

**Edited**
- `src/components/platform-slides/PlatformArchitectureDiagram.tsx` — rename tiles 1 and 2 in the Intelligence & Orchestration layer.
- `src/components/tech-slides/TechSlideInsights.tsx` — shorten Slide 9 title.
- `src/exporters/pptx/buildTechnicalDeck.ts` — mirror Slide 9 title in the PPTX builder.

**Untouched**
- All other tech-slide components (already cleaned in previous turn).
- Other decks that consume `PlatformArchitectureDiagram` will inherit the new tile names — desired since CoAnalyst should not appear on the platform architecture diagram anywhere.

### Verification

1. `/pitch-technical` → Slide 4 (Platform Overview) shows the architecture diagram with **Insights & Intelligence**, **Recommendations & Prescriptive Actions**, **Automation** in Layer 2. No "CoAnalyst" or "Insights & Rec." text.
2. Slide 9 header reads `Intelligence & Orchestration Layer — Recommendations & Prescriptive Actions`.
3. Download Editable PowerPoint → Slide 9 title fits cleanly on one line; architecture diagram references in PPTX are consistent.
4. Global DOM search for `CoAnalyst` on `/pitch-technical` returns zero hits.

### Out of scope

- The standalone CoAnalyst Playbook (`/coanalyst-deck`) — keeps its branding.
- Memory file updates.

