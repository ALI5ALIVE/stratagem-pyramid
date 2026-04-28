## Goal

Apply Kathrina's tweaks across the Short Customer Overview, the Medium Pitch (Exec Pitch · Medium), and their PPTX exports.

## Changes

### 1. Customer Overview deck — reorder & removals (`src/pages/CustomerOverview.tsx`)

Current order (slides 0–9):
0 Title · 1 Reality Today · 2 Strategic Shift · 3 Platform · 4 Before vs After · 5 Value You Unlock · **6 Use Cases in Action** · 7 Regulation Mgmt · 8 Customer Outcomes · 9 Maturity Roadmap · 10 First 90 Days

Apply:
- **Remove Slide 6** "Use Cases in Action" (`co-slide-6` / `SlideUseCases`) — drop the import too.
- **Swap Slides 8 & 9** — i.e. swap "Customer Outcomes" and "Your Maturity Roadmap" so Maturity Roadmap comes before Customer Outcomes.
- **Remove Slide 10** "Your First 90 Days" (`co-slide-9` / `COClosingFirst90Days`) — drop the import too. (The `COClosingFirst90Days.tsx` file is only used here, so it becomes dead code; leave the file in place for now.)

New on-screen order (8 slides):
1. Title
2. The Reality Today
3. The Strategic Shift
4. The Platform
5. Before vs After
6. The Value You Unlock
7. Use Case — Regulation Management
8. Your Maturity Roadmap
9. Customer Outcomes  *(new closing slide)*

### 2. Customer Overview PPTX (`src/exporters/pptx/buildCustomerOverviewDeck.ts`)

Update the `composed` array to mirror the new on-screen order exactly:

```ts
const composed: SlideSpec[] = [
  coTitleSpec,                                     // 0 · Title
  byLabel("Industry Challenge"),                   // 1 · Reality Today
  byLabel("Strategic Shift"),                      // 2 · Strategic Shift
  byLabel("Platform Overview"),                    // 3 · The Platform
  transformationSpec,                              // 4 · Before vs After
  valuePillarsSpec,                                // 5 · Value You Unlock
  regulationSummarySpec,                           // 6 · Regulation Management
  byLabel("Maturity Roadmap · Curve & Behaviour"), // 7 · Maturity Roadmap
  customerOutcomesSpec,                            // 8 · Customer Outcomes (closer)
];
```

Remove the `byLabel("Use Cases")` and `co90DaysSpec` entries. Leave the `co90DaysSpec` definition in the file (harmless dead code) or delete it — preference is to delete to keep the file lean.

### 3. Fix the "JUMP" buttons on the Platform slide (Customer Overview + Exec Pitch · Medium)

The buttons in `src/components/tech-slides/v4/TechV4PlatformOverview.tsx` hardcode `tech-divider-*` IDs. Those IDs only exist on the **Tech Deep Dive** deck, so JUMP does nothing on Customer Overview (no dividers exist there) and Exec Pitch · Medium (uses `exec3-divider-*`).

Fix by making the targets context-aware:

- Add an optional `jumpTargets?: { dtop: string; mobile: string; intelligence: string; core: string }` prop to `TechV4PlatformOverview`. Default to the existing `tech-divider-*` IDs so Tech Deep Dive keeps working unchanged.
- In `src/pages/ExecutivePitch3.tsx`, pass `jumpTargets={{ dtop: "exec3-divider-dtop", mobile: "exec3-divider-mobile", intelligence: "exec3-divider-intelligence", core: "exec3-divider-intelligence" }}` to the platform slide entry. (Customer Overview has no `core` divider — point it at intelligence as a sensible fallback, or hide the Core jump for that deck — see below.)
- In `src/pages/CustomerOverview.tsx`, the deck has **no dividers at all** after the reorg. Two options:
  - **Preferred**: pass `jumpTargets={{}}` (empty) and have `TechV4PlatformOverview` render the items as plain non-clickable rows (no "jump" affordance) when no target resolves to an existing element.
  - Implementation: in the click handler, if `document.getElementById(target)` returns null, do nothing and hide the "jump ›" affordance for that row (computed once on mount via `useEffect` checking each target).

This single change fixes JUMP on both decks per Kathrina's note ("In Both the Short and the Medium Pitch the interactive bit … 'JUMP' is not working").

### 4. Why Comply365 subheading (Medium Pitch closing)

Edit `src/components/tech-slides/TechSlideWhyComply.tsx` to add a subtitle under the title:

> *Point solutions manage silos. Generic AI creates noise. We close the loop with the Comply365 Operational Performance Platform.*

Implementation:
- Pass `subtitle="Point solutions manage silos. Generic AI creates noise. We close the loop with the Comply365 Operational Performance Platform."` to `<SalesSlideContainer>`.
- Remove (or leave) the existing italic line at the bottom of the trust signals card — recommend removing the duplicate "Point solutions manage silos. Generic AI creates noise. We close the loop." line in the trust card to avoid repeating the message twice on one slide.

This change automatically flows through to the Tech Deep Dive deck too (which also uses this slide). If that's not desired, copy the slide into an Exec3-only variant — but the message is on-brand for both audiences, recommend keeping shared.

## Out of scope

- No narration script changes (Customer Overview narration entries for the removed slides will simply never trigger; the data file can be cleaned up later).
- No PDF export changes — the PDF exporter reads the on-screen `slides` array directly so it inherits the new order automatically.
- No changes to the Exec Pitch · Medium slide order (already correct from the prior task).

## Verification

1. `/customer-overview` — confirm 9 slides in the order above; "Use Cases in Action" and "Your First 90 Days" gone; Maturity Roadmap before Customer Outcomes.
2. On the Platform slide of `/customer-overview`, JUMP affordance is hidden (no dividers to jump to) and rows aren't clickable.
3. On the Platform slide of `/pitch-executive-3`, click each JUMP row → it scrolls to the matching `exec3-divider-*` slide.
4. On the Platform slide of `/technical-deep-dive-v4` (or wherever Tech Deep Dive lives), JUMP still works against `tech-divider-*` (regression check).
5. `/pitch-executive-3` final slide ("Why Comply365") shows the new subheading under the title.
6. Download Customer Overview PPTX → 9 slides, order matches UI, footer reads "Customer Overview".
7. Download Exec Pitch · Medium PPTX → Why Comply365 slide carries the new subtitle.
