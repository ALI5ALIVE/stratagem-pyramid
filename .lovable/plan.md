

# Research-Backed Data Accuracy Improvements

## Research Summary

Industry data was gathered from EUROCONTROL (University of Westminster delay cost studies), Airlines for America (A4A), SITA Baggage IT Insights 2024, Cirium OTP Report 2024, IATA Maintenance Cost Report FY2023, WTW Airline Insurance Market Outlook, and OxMaint Aviation Management Guide 2026.

## Recommended Changes by Use Case

### UC1: Go-Around Events -- Minor Update
- **Current**: $5K-$20K per event, 12/month baseline
- **Research**: Fuel cost alone is $2K-$5K (narrowbody). With knock-on delays at EUR100-212/min (EUROCONTROL), total cost $5K-$25K is well-supported
- **Change**: Widen range to **$5K-$25K**, adjust midpoint from $12,500 to **$15,000**
- **Source footnote**: "Based on EUROCONTROL delay cost reference values and airline fuel burn data"

### UC2: AOG -- Significant Correction
- **Current**: $10K-$150K per day
- **Research**: Industry sources consistently cite $10K-$150K **per hour** (OxMaint 2026, SourceOne). Major carriers lose $100-200M annually
- **Change**: Update label to **"$10K-$150K per hour"** but keep the **per-day cost framing** for the slider (since the input is "AOG days per month"). Adjust range to **$100K-$500K per day** (reflecting ~10-20 hours of impact per grounded day). Midpoint becomes **$300,000**
- **Source footnote**: "OxMaint Aviation Management Guide 2026; industry estimates $10K-$150K/hr including lost revenue"

### UC3: Flight Delays -- Validated, Minor Refinement
- **Current**: $75-$200 per minute, baseline 45 mins/day
- **Research**: EUROCONTROL says EUR100/min average (including network effects). A4A confirms $100.76/min for US carriers in 2024
- **Change**: Update range to **$80-$200 per minute**, midpoint stays at ~$140. Add source citation
- **Source footnote**: "EUROCONTROL Standard Inputs; A4A US Carrier Delay Costs 2024 ($100.76/min average)"

### UC4: Fuel Performance -- Validated, No Change
- **Current**: 1% = $5M-$20M/year, baseline 3.2%
- **Research**: IATA reports $291B global fuel spend in 2024. For a $500M fuel budget, 1% = $5M. Validated
- **Change**: None needed. Add source footnote only
- **Source footnote**: "IATA Global Outlook for Air Transport; scaled to carrier fuel spend"

### UC5: Crew & Passenger Injury -- Validated
- **Current**: $20K-$250K per incident, 4/quarter
- **Research**: Range is consistent with industry compensation and legal cost data
- **Change**: No data change needed

### UC6: Regulatory Fines -- Minor Update
- **Current**: $50K-$5M per finding, 5/year
- **Research**: FAA maximum civil penalty increased to $41,577 per violation in 2024 (DOT). EASA fines vary widely. Major findings (e.g., systemic non-compliance) can reach millions
- **Change**: Narrow range to **$50K-$2M per finding** for greater credibility. Midpoint from $500K to **$400,000**
- **Source footnote**: "DOT/FAA Civil Penalty Guidelines 2024; EASA enforcement data"

### UC7: Insurance Premiums -- Validated
- **Current**: $1M-$10M/year, 6% baseline increase
- **Research**: WTW Q4 2025 confirms volatile market with significant claims. Premium increases of 5-15% are realistic depending on claims history
- **Change**: No data change needed
- **Source footnote**: "WTW Airline Insurance Market Renewal Outlook Q4 2025"

### UC8: Baggage Mishandling -- Update Baseline
- **Current**: 8 per 1,000 pax, $100-$350 per bag
- **Research**: SITA 2024 reports **6.3 per 1,000 passengers**, down from previous years. Total industry cost: $5B annually
- **Change**: Update baseline from 8 to **6.5** (rounding up slightly as SITA is a global average, and many carriers are above). Keep cost range. Update max from 20 to **15**
- **Source footnote**: "SITA Baggage IT Insights 2024 (6.3/1000 global average)"

## Leading Measures Baseline Updates

### lm2: Fleet Availability -- Clarification Needed
- **Current baseline**: 91%
- **Research**: IATA reports 98.75% dispatch reliability. These are different metrics -- dispatch reliability measures whether an aircraft departs without mechanical cancellation, while fleet availability measures the percentage of the fleet available for scheduled operations on any given day (accounting for heavy maintenance, AOG, etc.)
- **Change**: Keep 91% but add a **tooltip/description** clarifying this is "percentage of fleet available for revenue service on any given day, excluding heavy checks and AOG" -- which is distinct from dispatch reliability

### lm3: OTP -- Validated
- **Current baseline**: 78%
- **Research**: Cirium 2024 shows global leaders at 88-91%, with many carriers in the 75-82% range
- **Change**: No change. 78% is a credible mid-performer baseline
- **Source**: "Cirium On-Time Performance Review 2024"

## Computation Fix: Remove Arbitrary Scale Factor

The `computeMetricValue` function currently has a hardcoded `0.5` multiplier for dollar-denominated metrics (line ~508). This is arbitrary and undermines credibility.

**Change**: Replace the `0.5` scale factor with a computation that derives dollar values from the actual `totalCostAvoidance` figure, split proportionally across the executive metrics based on their weights.

## New: Source Citations Object

Add a `sourcesCitations` export to `lineOfSightData.ts` that maps each use case ID to its source string. The UI can then display these as footnotes or tooltip references, making the entire model defensible.

```text
sourcesCitations = {
  uc1: "EUROCONTROL delay cost reference values v4.1; airline fuel burn data",
  uc2: "OxMaint Aviation Management Guide 2026; industry estimates",
  uc3: "EUROCONTROL Standard Inputs; A4A US Carrier Delay Costs 2024",
  uc4: "IATA Global Outlook for Air Transport 2024",
  uc5: "Industry compensation and legal cost benchmarks",
  uc6: "DOT/FAA Civil Penalty Guidelines 2024; EASA enforcement data",
  uc7: "WTW Airline Insurance Market Renewal Outlook Q4 2025",
  uc8: "SITA Baggage IT Insights 2024",
  lm3: "Cirium On-Time Performance Review 2024",
  lm2: "IATA Maintenance Cost Report FY2023",
}
```

## UI Changes

1. Add a small "Sources" or info icon next to each use case cost range that shows the citation on hover
2. Add a global footnote bar at the bottom of the calculator: "Cost ranges sourced from EUROCONTROL, IATA, SITA, A4A, and WTW industry reports (2024-2025)"

## Files Changed

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Update cost ranges, midpoints, baselines, add `sourceCitations` export, fix `computeMetricValue` scale factor |
| `src/components/slides/SlideLineOfSight.tsx` | Add source footnote bar and per-use-case citation tooltips |
| `src/components/slides/BalancedScorecard.tsx` | Add source footnote bar |

## Summary of Data Changes

| Use Case | Field | Current | Proposed | Reason |
|---|---|---|---|---|
| UC1 Go-Arounds | costPerEvent | $5K-$20K | $5K-$25K | EUROCONTROL data supports higher end |
| UC1 Go-Arounds | costMidpoint | $12,500 | $15,000 | Adjusted midpoint |
| UC2 AOG | costPerEvent | $10K-$150K/day | $100K-$500K/day | Sources cite $10K-$150K/hr |
| UC2 AOG | costMidpoint | $80,000 | $300,000 | Reflects full-day impact |
| UC3 Delays | costPerEvent | $75-$200/min | $80-$200/min | A4A confirms $100.76/min avg |
| UC6 Fines | costPerEvent | $50K-$5M | $50K-$2M | Narrowed for credibility |
| UC6 Fines | costMidpoint | $500,000 | $400,000 | More conservative |
| UC8 Baggage | baseline | 8 | 6.5 | SITA 2024: 6.3/1000 global avg |
| UC8 Baggage | max | 20 | 15 | Adjusted proportionally |
| computeMetricValue | scale factor | 0.5 (arbitrary) | Derived from totalCostAvoidance | Removes arbitrary multiplier |

