

# Enrich the 3-Tier "Cost of Every Signal" Slide

## Slide Rename

- **Title**: "The Cost of Every Signal"
- **Subtitle**: "From operational event to boardroom impact — every signal has a price tag."

## What Changes (keeping the 3-tier layout)

### Tier 1: Executive Outcomes (top) — add dollar context

Currently shows stakeholder name + 2 metric labels. Enhance each card to also show a **tangible example sentence** that grounds the metric in reality.

| Stakeholder | Current | Added Detail |
|-------------|---------|-------------|
| CFO | "Fuel Cost Savings", "IrOps Cost Avoidance" | Add a one-liner: "1% fuel variance = $5M-$20M/yr" |
| CEO | "Brand & Reputation", "Regulatory Standing" | Add: "A single finding costs $50K-$2M" |
| COO | "On-Time Performance", "Fleet Readiness" | Add: "Each AOG day costs $100K-$500K" |

### Tier 2: Leading Measures (middle) — add direction context

Currently shows label + baseline + arrow. Enhance each card with a short "how" line explaining the operational lever.

| Measure | Added Detail |
|---------|-------------|
| Fuel Variance (3.2%) | "Flight data to targeted crew training" |
| Fleet Availability (91%) | "Compliance gaps caught before grounding" |
| OTP (78%) | "Procedural fixes before repeat delays" |
| Safety Recurrence (12%) | "Signal to corrective action, closed loop" |

### Tier 3: Use Cases (bottom) — add scenario context

Currently shows label + cost badge. Enhance each card with a short real-world scenario sentence.

| Use Case | Added Detail |
|----------|-------------|
| Go-Around Events ($5K-$25K) | "FOQA trend → 47 pilots retrained in 48hrs" |
| AOG & Maintenance ($100K-$500K/day) | "AD compliance gap caught before grounding" |
| Fuel Degradation (1% = $5M-$20M) | "Exceedance linked to specific crew & procedure" |
| Regulatory Fines ($50K-$2M) | "Reg change cascaded to every affected person" |

### Bottom Banner — unchanged

$40M+ total with Interactive Calculator CTA link stays as-is.

---

## Technical Details

### File: `src/components/sales-slides/SalesSlide8LineOfSight.tsx`

1. Update `title` prop to "The Cost of Every Signal" and `subtitle` to "From operational event to boardroom impact — every signal has a price tag."

2. Add a local mapping object for the enrichment data (stakeholder context lines, measure "how" descriptions, and use case scenario lines) rather than modifying the shared data file.

3. Tier 1 cards: after the existing metrics list, add a small italicised context line using the mapping.

4. Tier 2 cards: below the baseline+arrow row, add a `text-[8px]` "how" line from the mapping.

5. Tier 3 cards: below the cost badge, add a `text-[8px]` scenario line from the mapping.

6. Slight padding adjustments (`py-1.5` to `py-2` on Tier 2 cards) to accommodate the extra line without overflowing the slide.

### File: `src/data/salesDeckNarration.ts`

Update the `sales-slide-6` narration text to reference "the cost of every signal" framing and walk through one scenario before summarising the $40M opportunity.

### No changes to `src/data/lineOfSightData.ts` or `src/pages/SalesDeck.tsx`.

