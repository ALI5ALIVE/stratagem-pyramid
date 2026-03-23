

# Data & Citation Review — Line of Sight Calculator

## Current State

All cost calculations flow from 8 use cases in `lineOfSightData.ts`. Each has a `baseline × costMidpoint × annualisationFactor` formula. Citations exist in a `sourceCitations` record but are incomplete and some are vague. The "average carrier" defaults to a 50-aircraft, $500M fuel spend profile.

---

## Use Case Data Audit

| UC | Label | Baseline | Cost/Event | Annual Cost | Current Citation | Assessment |
|----|-------|----------|------------|-------------|-----------------|------------|
| uc1 | Go-Around Events | 12/mo | $5K–$25K | **$2.16M** | "EUROCONTROL delay cost reference values v4.1; airline fuel burn data" | **Weak** — EUROCONTROL v4.1 is real but doesn't specifically cover go-around fuel cost. Need IATA/FSF go-around study. 12/mo baseline needs fleet-size context. |
| uc2 | AOG & Unscheduled Maint. | 8 days/mo | $100K–$500K/day | **$28.8M** | "OxMaint Aviation Management Guide 2026; industry estimates $10K–$150K/hr" | **Problematic** — OxMaint is not a recognized industry source. $300K/day midpoint is reasonable for wide-body but high for a 50-aircraft carrier. 8 days/mo across a 50-aircraft fleet is plausible but should be framed. |
| uc3 | Flight Delays & OTP | 45 min/day | $80–$200/min | **$2.30M** | "EUROCONTROL Standard Inputs; A4A US Carrier Delay Costs 2024 ($100.76/min average)" | **Strong** — A4A figure is well-documented (Airlines for America, 2024). EUROCONTROL Standard Inputs is a real publication. 45 min/day is reasonable for a mid-size carrier. |
| uc4 | Human-Factor Fuel Variance | 3.2% | $800K–$3M/yr per % | **$6.4M** | "IATA Global Outlook for Air Transport 2024; scaled to carrier fuel spend" | **Moderate** — IATA GOAT is real but doesn't specifically break out human-factor fuel variance. 3.2% total variance is plausible (industry range 2–5%). The $2M/% midpoint needs explicit derivation from fuel spend. |
| uc5 | Crew & Passenger Injury | 4/quarter | $20K–$250K/incident | **$2.16M** | "Industry compensation and legal cost benchmarks" | **Weak** — No specific source named. Need FAA/OSHA injury cost data or airline-specific claims benchmarks. |
| uc6 | Regulatory Fines & Findings | 5/year | $50K–$2M/finding | **$2.0M** | "DOT/FAA Civil Penalty Guidelines 2024; EASA enforcement data" | **Strong** — FAA Civil Penalty Guidelines are published. EASA enforcement actions are public record. Range is defensible. |
| uc7 | Insurance Premium Escalation | 6% increase | $1M–$10M/yr | **$33.0M** | "WTW Airline Insurance Market Renewal Outlook Q4 2025" | **Moderate** — WTW (Willis Towers Watson) publishes these reports. But $5.5M midpoint assumes a large premium base. For a 50-aircraft carrier this may be high. |
| uc8 | Baggage Mishandling | 6.5/1000 pax | $100–$350/bag | **$17.6M** | "SITA Baggage IT Insights 2024 (6.3/1000 global average)" | **Strong baseline, weak cost** — SITA 6.3/1000 is real and published. But $225/bag × 6.5 × 12 = $17.6K/mo, not $17.6M. The annualisation assumes 1000 pax as the unit, but the calculation doesn't scale by actual passenger volume. **This may be a formula error.** |

### Total Annual Exposure: ~$94.4M (pre-fuel reframe)

---

## Critical Issues Found

### 1. UC8 Baggage — Likely Formula Error
`baseline=6.5 × costMidpoint=$225 × annualisationFactor=12 = $17,550/yr` — this is far too low unless the baseline represents thousands of bags. The `6.5` is "per 1,000 pax" but the formula treats it as a raw number. For a 20M pax/yr carrier: 6.5 × 20,000 × $225 = **$29.25M** — which means the current formula massively underestimates OR the baseline unit needs redefining. **Needs clarification.**

### 2. UC2 AOG — "OxMaint" is Not a Recognized Source
Replace with: "Oliver Wyman MRO Survey 2024; IATA Airline Maintenance Cost Report FY2023" — these are the standard industry references for maintenance cost benchmarks.

### 3. UC1 Go-Around — Citation Doesn't Match
EUROCONTROL delay costs don't cover go-around fuel burn specifically. Better sources: "Flight Safety Foundation Go-Around Safety Forum 2024; IATA Fuel Efficiency Gap Analysis."

### 4. UC5 Injuries — No Source
Add: "FAA Cabin Safety Injury Database; Bureau of Labor Statistics aviation sector injury costs 2023."

### 5. UC7 Insurance — Baseline Needs Fleet Scaling
$5.5M midpoint is reasonable for a 100+ aircraft fleet but high for 50 aircraft. The default profile should note this scales with fleet/premium base.

### 6. "Average Carrier" Profile
The default profile (50 aircraft, $500M fuel, 150 departures/day, 20M pax) loosely matches a **mid-size US carrier** (similar to JetBlue or Alaska Airlines scale). This is not cited anywhere. Should add a note: "Default profile approximates a mid-size carrier operating 50 narrowbody-equivalent aircraft. Source: A4A industry averages, ICAO Air Transport Statistics 2024."

---

## Recommendations

### A. Fix citations in `sourceCitations` (6 updates)
Replace vague or incorrect sources with specific, verifiable publications.

### B. Fix UC8 baggage calculation
Either redefine `baseline` to represent total monthly mishandled bags (e.g., `baseline: 10833` for 20M pax/yr carrier) or add passenger volume scaling into the formula.

### C. Add "average carrier" citation
Add a note to `defaultProfile` explaining the source and that numbers are illustrative.

### D. Add citation tooltips to slides
The calculator already shows `costPerEvent` strings. The slides that present cost totals (ExecSlide1, OpsSlide2, TechSlide2) should reference the methodology note.

---

## Proposed File Changes

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Update `sourceCitations` for uc1, uc2, uc5; fix uc8 formula or baseline; add `defaultProfileCitation` string; add methodology note |
| `src/components/exec-slides/ExecSlide1Problem.tsx` | Add small citation footnote |
| `src/components/ops-slides/OpsSlide2CostOfFragmentation.tsx` | Add citation footnote |
| `src/components/tech-slides/TechSlide2IndustryChallenge.tsx` | Add citation footnote |

**4 files modified.**

