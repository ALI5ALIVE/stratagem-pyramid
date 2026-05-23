## New route: DTOP Packaging POV

Publish my analysis of the "rename capabilities around DTOP" proposal as a standalone, shareable page.

### Route
- Path: `/dtop-packaging-pov`
- Add a new page `src/pages/DtopPackagingPov.tsx`
- Register in `src/App.tsx` routes (lazy import, same pattern as other playbooks)
- Set `<title>` to "DTOP Packaging — Strategic POV | Comply365"

### Page structure (single scrolling page, dark theme, Space Grotesk/Inter, container styling matching `PositioningPlaybook`)

1. **Hero**
   - Eyebrow: "Strategic POV"
   - H1: "Packaging the Performance Platform around DTOP"
   - Sub: one-line framing + date stamp
   - Back link to `/positioning-playbook`

2. **The Proposal** — collapsed quote block of the original proposal (Detect/Trigger/Orchestrate/Prove definitions, 4 stated advantages). Rendered as a styled blockquote card so the reader sees what's being responded to.

3. **Verdict banner** — "Adopt it, with two adjustments." Highlighted card with the two adjustments stated up-front:
   - Keep Intelligence Layer as the horizontal capability powering all four modules
   - Sharpen Detect (leading) vs Prove (lagging) so they don't compete

4. **What's compelling** — 4 cards (Narrative coherence · Land-and-expand · Competitive moat · Analyst positioning), each with the one-paragraph rationale from my reply.

5. **Where to push back / refine** — 6 numbered sections, each with heading + body:
   1. "Trigger" is the weakest label (suggest "Trigger — Decide")
   2. Prove ≠ Insights (leading vs lagging framing)
   3. Intelligence Layer vs Trigger module (horizontal layer, vertical modules)
   4. Usage-based pricing — right idea, wrong metric (with the per-module value-metric table)
   5. Don't orphan the Core Apps (DTOP modules operate across SafetyManager365 / ContentManager365 / TrainingManager365)
   6. Migration risk (2–3 week content sweep across decks/playbooks/Practice Center)

6. **Proposed value metrics table** — clean 2-col table:
   | Module | Value metric |
   | Detect | Signals monitored / assets under coverage |
   | Trigger | Decisions rendered / recommended actions issued |
   | Orchestrate | Workflows executed / actions routed |
   | Prove | Outcomes attributed / audit packs generated |

7. **Capability map diagram** — simple CSS/flex diagram:
   ```text
   ┌──────────────────────────────────────────────┐
   │            Intelligence Layer                │  ← horizontal
   │   (90% domain accuracy at L4–5 vs 35%)       │
   └──────────────────────────────────────────────┘
        │         │           │           │
     Detect    Trigger    Orchestrate    Prove     ← vertical DTOP modules
        │         │           │           │
   ┌──────────────────────────────────────────────┐
   │  SafetyManager365 · ContentManager365 ·      │  ← Core Apps (system of record)
   │  TrainingManager365                          │
   └──────────────────────────────────────────────┘
   ```
   Built with Tailwind + DTOP color tokens (D blue · T amber · O violet · P emerald).

8. **Recommendation** — closing card restating the verdict + offer ("Next step: draft revised capability map as a one-pager").

### Discoverability
- Add a single card on `/positioning-playbook` Appendix section linking to the new POV page (additive — does not restructure existing playbook copy).
- No homepage card, no nav entry — this is a shareable internal POV link, not a published surface.

### Constraints honored
- Intelligence Layer terminology (never "CoAnalyst")
- Product names without spaces
- DTOP color tokens for module accents
- Dark theme, Space Grotesk headings, Inter body
- No new business logic; pure presentation page with static content

### Out of scope
- No rename of existing capabilities anywhere else in the app
- No changes to decks, sales enablement, or Practice Center
- No backend / data model changes
