

## Rename: "CoAnalyst" → "Insights & Intelligence" across the Technical Deep Dive

### Renaming rules

| Where | Old | New |
|---|---|---|
| Slide 8 (intelligence pipeline) | `CoAnalyst` | **Insights & Intelligence** |
| Slide 9 (recommendations) | `Insights & Recommendations` | **Recommendations & Prescriptive Actions on the Operational Performance Platform** |
| Inline body copy / pillars / quotes | `CoAnalyst` | **Insights & Intelligence** (or "the platform" where natural) |
| Architecture badge sublayer label | `CoAnalyst` | **Insights & Intelligence** |
| Roadmap items | `(CoAnalyst)` suffix | drop entirely |
| Tiers vs Generic AI table column | `CoAnalyst` | **Insights & Intelligence** |

Scope: **Technical Deep Dive deck only** (`/pitch-technical`) and its PPTX export. Other decks (Executive, Operational, CoAnalyst Playbook) are untouched.

### Files to edit

1. **`src/pages/TechnicalDeepDive.tsx`** — sidebar registry: `"CoAnalyst"` → `"Insights & Intelligence"`; `"Insights & Recommendations"` → `"Recommendations & Prescriptive Actions"` (short label for sidebar).

2. **`src/components/tech-slides/TechSlide7CoAnalyst.tsx`** —
   - Title → `Intelligence & Orchestration Layer — Insights & Intelligence`
   - Subtitle unchanged.
   - Master message attribution swapped from `CoAnalyst` to `Insights & Intelligence`.
   - Stat tile `90% CoAnalyst at Level 4–5` → `90% Insights & Intelligence at Level 4–5`.
   - `<ArchitectureLayerBadge sublayer="coanalyst">` → `sublayer="insights-intelligence"`.
   - Component file/export name kept (`TechSlide7CoAnalyst`) — internal only, never shown to user.

3. **`src/components/tech-slides/TechSlideInsights.tsx`** —
   - Title → `Recommendations & Prescriptive Actions on the Operational Performance Platform`
   - Subtitle → `From insight to prescriptive action — proactive signals across the platform`
   - Architecture badge sublayer changes to match new IDs.

4. **`src/components/tech-slides/ArchitectureLayerBadge.tsx`** — `Sublayer` type updated:
   - `"coanalyst"` → `"insights-intelligence"` (label `Insights & Intelligence`)
   - `"insights"` → `"recommendations"` (label `Recommendations & Prescriptive Actions`)
   - `"automation"` unchanged.
   - Update both consumers above.

5. **`src/components/tech-slides/TechSlide4Platform.tsx`** — Layer 3 description → `Insights & Intelligence · Recommendations & Prescriptive Actions · Automation.`

6. **`src/components/tech-slides/TechSlide4aSafetyManager.tsx`** —
   - `How CoAnalyst Activates Safety Data` → `How Insights & Intelligence Activates Safety Data`
   - Pattern Detection desc: `CoAnalyst identifies…` → `Insights & Intelligence identifies…`

7. **`src/components/tech-slides/TechSlide17WhyUs.tsx`** — Embedded Intelligence card: replace `CoAnalyst,` reference with `Insights & Intelligence,` in the differentiator list.

8. **`src/components/tech-slides/TechSlide15Roadmap2026.tsx`** —
   - `Safety report auto-categorisation (CoAnalyst)` → `Safety report auto-categorisation`
   - `CoAnalyst proactive pattern detection (smoke & fumes, fatigue)` → `Proactive pattern detection (smoke & fumes, fatigue)`

9. **`src/data/technicalPitchNarration.ts`** —
   - `tech-slide-coanalyst` script: replace `CoAnalyst` mentions with `Insights & Intelligence`; title field updated.
   - `tech-slide-insights` script: rewrite opening so it references `Insights & Intelligence answers questions; Recommendations & Prescriptive Actions go a step further…`; title updated.

10. **`src/exporters/pptx/buildTechnicalDeck.ts`** — mirror every change above:
    - Slide 8 builder: header eyebrow + title + master-message attribution + stat tile + closing quote (`"Generative AI reads reports. Insights & Intelligence understands aviation operations."`).
    - Slide 9 builder: title `Recommendations & Prescriptive Actions on the Operational Performance Platform` (shrink font size if it wraps awkwardly during QA).
    - Tiers vs Generic AI table column header `CoAnalyst` → `Insights & Intelligence`.
    - Platform Overview Layer 3 desc updated.
    - Roadmap items: drop `(CoAnalyst)` suffixes.
    - Section divider for Act 3: subtitle updated to `Insights & Intelligence, Recommendations & Prescriptive Actions, and Automation across the unified mobile shell.`
    - Why Comply differentiator copy updated.

### Verification

1. `/pitch-technical` — sidebar shows **Insights & Intelligence** and **Recommendations & Prescriptive Actions**, no `CoAnalyst`.
2. Scroll all 21 slides; DOM search for `CoAnalyst` returns zero hits in tech-slide components.
3. Click **Download Editable PowerPoint**, open the `.pptx`, search text — no occurrence of `CoAnalyst`. Confirm the longer slide-9 title fits without wrapping awkwardly.
4. PDF QA: convert pptx → PDF → JPEGs at 150 dpi, visually inspect slides 8, 9, Platform Overview, Tiers table, Why Us, and 2026 Roadmap; tighten font sizing if any overflow appears.

### Out of scope

- Other decks (Executive Pitch, Operational Pitch, CoAnalyst Playbook page, Platform Playbook). The standalone CoAnalyst Playbook keeps its name.
- Renaming the React component file `TechSlide7CoAnalyst.tsx` on disk — internal name only.
- Memory file updates — `CoAnalyst` brand still applies to the standalone playbook.

