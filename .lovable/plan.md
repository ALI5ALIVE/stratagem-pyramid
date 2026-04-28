## Changes from Kathrina's email — Medium Pitch (`/pitch-executive-3`)

Slide numbering in our deck matches her numbering (footer 00–17). Slide 15 (Roadmap) is deferred — she'll send updates in the morning.

### 1. Slide 03 — The Platform (Intelligence layer order)

**File:** `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`

Reorder the three pillars inside the Intelligence & Orchestration block from:
`Insights & Intelligence · Recommendations & Prescriptive Actions · Automation`
to:
`Automation · Insights & Intelligence · Recommendations & Prescriptive Actions`

On the **Recommendations** card, prepend a small "Future Vision" tag above the title (amber/cyan badge styled like other meta labels) so it's clearly forward-looking.

### 2. Slide 06 — Insights & Recommendations

**File:** `src/components/tech-slides/v4/TechV4SlideInsights.tsx`

The slide title is already "Recommendations & Prescriptive Actions". Add a clearly visible "Future Vision" badge in the header area (next to or under the title) so the audience understands this capability is roadmap, not GA. Keep the worked example intact.

### 3. Slide 10 — Unified Mobile (relabel mini-apps)

**File:** `src/components/tech-slides/v4/TechV4SlideMobile.tsx`

In the phone mock on the left, rename the three mini-app rows:
- `Procedures` → `ContentManager365`
- `Training` → `TrainingManager365`
- `Safety` → `SafetyManager365`

Status lines and colors unchanged. (The right-hand pillars already reference the full product names.)

### 4. Slide 17 — Why Comply365 (strip stats + headings)

**File:** `src/components/tech-slides/TechSlideWhyComply.tsx`

- Change title from `Outcomes & Why Comply365` → `Why Comply365`
- Remove the blue subtitle (`Measured outcomes from carriers running on the platform — and the three things that make them possible`) — pass empty subtitle or remove the prop
- Remove the entire 4-stat outcomes strip (78% / 6 wks → 48 hrs / 5 days / 90% vs 35%) and its `outcomes` array + `StatSourceChip` import if no longer needed
- Also remove the bottom italic disclaimer about outcome figures (no longer relevant once stats are gone)
- **Keep:** the 3 differentiators (Connected Foundation / Domain-Trained Intelligence / Proof by Design) and the trust-signals row (550+ airlines · ~2.5M users · 6 continents)

### Slide 15 — Roadmap

No change today. Awaiting Kathrina's update in the morning.

### Out of scope (mentioned but not actioned)

Kathrina also notes the downloadable PPT currently exports the full Technical deck and needs to be amended to match this Medium pitch. Flagging only — we'll address after sign-off at her 4pm meeting.

---

### Files to edit

- `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx`
- `src/components/tech-slides/v4/TechV4SlideMobile.tsx`
- `src/components/tech-slides/TechSlideWhyComply.tsx`
