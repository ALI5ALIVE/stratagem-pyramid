
# Week 3 — Frame the Audience, End with the Offer

Two new slides bookend Week 3 so reps open by knowing **who** to walk in on, and close with a **concrete, complimentary offer** they can put on the table.

## What changes

### 1. NEW opener — "Who to Target: High-Propensity Accounts"
First slide of Week 3, immediately after the Week 3 divider (before *Discovery → Demo → Close*).

Anchored on a single targeting axis: **existing Comply365 footprint**. The easiest, fastest, highest-win-rate motion is expanding inside customers who already trust one of the apps.

Slide content:
- **Headline:** "Start where we already have permission to talk."
- **Three propensity tiers** (visual ladder, reuses DTOP color tokens):
  - **Tier 1 — One app live, renewal in <12 months.** Highest propensity. Talk track: lift them out of the renewal conversation into the platform story.
  - **Tier 2 — Two apps live.** Already proved value twice. Talk track: show what the third app + Intelligence Layer unlocks.
  - **Tier 3 — Strategic / multi-BU customer.** Talk track: introduce the Operational Performance Roadmap and the half-day vision session (see closing slide).
- **"How to spot a Tier 1 today" checklist** (4–5 signals): renewal in window, named exec sponsor, recent audit/incident chatter, mobile/training gap, no AI vendor locked in yet.
- **What NOT to chase first** (small muted footer): cold prospects with no footprint, RFPs we didn't shape, single-app POCs against incumbents.
- **One-line bridge to next slide:** "Once you've picked the account, here's how the call runs →"

Narration follows the 5-part Coach Script Standard.

### 2. NEW closing offer — "The Strategy & Vision Session" (half-day, complimentary)
Replaces the *current* final slide position. The existing "Your First 30 Days" (`se-slide-closing`) stays in the deck but moves **one position earlier**, so the very last thing a rep sees in Week 3 is the offer they're meant to put in market.

Slide content:
- **Headline:** "The Strategy & Vision Session — a complimentary half-day workshop."
- **Positioning line:** "Lift the conversation out of tickets and renewals. Put the roadmap on the table."
- **Fixed 4-hour agenda** (visual timeline, on-site or virtual):
  - 0:00–0:30 — Where the industry is going (the shift, DTOP in plain English)
  - 0:30–1:15 — The platform story (one platform, three apps, Intelligence Layer)
  - 1:15–2:00 — Capabilities deep-dive tailored to their footprint
  - 2:00–2:15 — Break
  - 2:15–3:00 — The Operational Performance Roadmap — what L1→L5 looks like for them
  - 3:00–3:45 — Their DTOP loop — one of their real use cases walked end-to-end
  - 3:45–4:00 — Agreed next step
- **Who should be in the room** (chips): Exec sponsor, VP Safety/Ops, Training lead, IT/Data lead, our AE + SE.
- **What they leave with:** a one-page maturity snapshot, a candidate first DTOP use case, a 90-day "what's possible" view.
- **How to offer it (rep talk track, 3 lines):** acknowledge the day-to-day request → reframe to the strategic question → propose the session as the right venue.
- **CTA strip:** "Book it. Then go run your 30-day plan."

Narration follows the 5-part Coach Script Standard, ending on: *"This is the meeting that changes the conversation. Earn the right to run it, then run it."*

## Technical details

- **New components:**
  - `src/components/sales-enablement-slides/SEWhoToTarget.tsx`
  - `src/components/sales-enablement-slides/SEStrategyVisionSession.tsx`
  - Both wrap `PitchSlideContainer`, follow h-screen + asymmetrical padding, use semantic tokens only, and accept the standard `slideNarrationProps`.
- **Data:** extend `src/data/week3FieldKit.ts` with two new exports — `propensityTiers` and `visionSessionAgenda` — so future PDF/exporter work has one source.
- **Slide order in `src/pages/SalesEnablement.tsx`** (Week 3 only, changes shown):
  1. `se-week-3` (divider, unchanged)
  2. **`se-who-to-target` (NEW)** ← inserted here
  3. `se-discovery-to-close`
  4. … (rest of Week 3 unchanged through `se-practice-center-bridge`)
  5. `se-slide-closing` (Your First 30 Days — moved up one position)
  6. **`se-strategy-vision-session` (NEW — final slide)**
- **`weekProps.w3.upNext`** updated to list both new slides at the right positions; `estimatedMinutes` bumped from 42 → ~48.
- **Narration:** add two entries to `src/data/salesEnablementNarration.ts` keyed by the new slide IDs, both in 5-part Coach Script format.
- **Memory:** update `mem/content/sales-enablement/week3-field-kit.md` with new slide IDs, the new data exports, and the new slide-order list.
- **Constraints respected:** no FOQA/FDM/ASAP, BrandNumber naming, ~90% vs ~35% headline only where relevant, DTOP color tokens, locked roadmap dates, manual-start narration.

## Out of scope (deferred)

- Tier 2/Tier 3 targeting axes (industry triggers, AI mandates, trigger events) — can be a second targeting slide later if needed.
- Downloadable "Strategy & Vision Session" leave-behind PDF — data will be structured so an exporter can be added later.
- Re-recording Week 1/2 narration.
