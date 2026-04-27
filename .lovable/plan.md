## Slide Numbering Audit — All Decks

I audited every deck in the project. The summary:

### Decks already numbered correctly (no changes needed)

These pages pass `slideNumber={index}` from the page level, so numbering is always accurate even if slides are reordered:

- Executive Pitch (`/pitch-executive`) — `ExecutivePitch.tsx`
- Executive Pitch 2 (`/pitch-executive-2`) — `ExecutivePitch2.tsx`
- Executive Pitch 3 (`/pitch-executive-3`) — `ExecutivePitch3.tsx`
- Operational Pitch (`/pitch-operational`) — `OperationalPitch.tsx`
- Technical Deep Dive (`/pitch-technical`) — `TechnicalDeepDive.tsx`
- Technical Deep Dive V4 (`/pitch-technical-v4`) — `TechnicalDeepDiveV4.tsx`
- Customer Overview (`/customer-overview`) — `CustomerOverview.tsx`
- Sales Enablement (`/sales-enablement`) — `SalesEnablement.tsx`
- Roadmap Deck (`/roadmap`) — `RoadmapDeck.tsx` (fixed last turn)
- Content Strategy (`/content-strategy`) — hardcoded numbers happen to match positions
- Value Deck — uses dynamic `index`

### Playbook decks — currently accurate but fragile

DTOP, Insights, Mobile, Automation, Platform, Regulation Management, and CoAnalyst playbooks all hardcode `slideNumber={N}` inside each slide component. The numbers currently line up with the positional order (title slide unnumbered, then 1..N). They display correctly today. Recommendation: leave display unchanged — no user‑visible bug.

### Real numbering bugs (the only thing that needs fixing)

**`src/pages/SlideDeck.tsx`** (the main strategy deck at `/`) has duplicated and skipped numbers because hidden slides were removed but the imported components still hardcode their original numbers:

| Position | Component | Currently shows | Should show |
|---|---|---|---|
| 1 | `Slide0Title` | (none) | (none) |
| 2 | `Slide1StrategicShift` | 01 | 01 ✓ |
| 3 | `Slide2BeforeAfter` | 02 | 02 ✓ |
| 4 | `Slide3OperatingModel` | 03 | 03 ✓ |
| 5 | `SlideUseCases` | **05** | 04 |
| 6 | `Slide5Transformation` (file `Slide4Transformation`) | 05 | 05 ✓ |
| 7 | `Slide6ValuePyramid` (file `Slide4ValuePyramid`) | 06 | 06 ✓ |
| 8 | `Slide7MaturityCurve` (file `Slide5MaturityCurve`) | 07 | 07 ✓ |
| 9 | `SlideAIVision` | **16** | 08 |
| 10 | `Slide9Customers` (file `Slide7Customers`) | 10 | 09 |
| 11 | `SlideMessagingHouse` | **12** | 10 |
| 12 | `SlideCampaignIdeas` | **14** | 11 |
| 13 | `SlideMessagingContext` | **14** (duplicate) | 12 |
| 14 | `SlidePlatformExperience` | **15** | 13 |
| 15 | `SlideConclusion` | **15** (duplicate) | 14 |

Sidebar `id` labels (`slide-5`, `slide-7`, `slide-15`, etc.) are also out of order with their actual position.

### Proposed fix

Convert SlideDeck to the same dynamic pattern used by the other large decks:

1. In each affected slide component under `src/components/slides/` that is used by `SlideDeck.tsx`, accept an optional `slideNumber?: number` prop and forward it to `SlideContainer`/`SalesSlideContainer` (replacing the hardcoded literal). Components: `SlideUseCases`, `Slide4Transformation`, `Slide4ValuePyramid`, `Slide5MaturityCurve`, `Slide7Customers`, `SlideAIVision`, `SlideMessagingHouse`, `SlideCampaignIdeas`, `SlideMessagingContext`, `SlidePlatformExperience`, `SlideConclusion`. (Plus `Slide1StrategicShift`, `Slide2BeforeAfter`, `Slide3OperatingModel` for consistency.)
2. In `SlideDeck.tsx`, render slides with `slideNumber={index}` (title at index 0 stays unnumbered) so positional numbering is automatic and resilient to reorder/hide changes.
3. Update the `slides` array in `SlideDeck.tsx` to use sequential ids (`slide-0`..`slide-14`) so the sidebar order matches.

### Out of scope (left as‑is)

- Playbook decks (DTOP/IR/MO/AU/PF/RM/CoAnalyst): currently display correct numbers; no visible bug. Refactoring these would be a robustness‑only change and is not requested.
- Roadmap deck: already fixed in the previous turn.

After approval I will implement step 1–3 above and verify the slide numbers in the bottom‑right counter render 01..14 in order across `/`.