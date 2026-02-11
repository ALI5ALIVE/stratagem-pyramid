

# Add Airline Profile Setup to Line of Sight Calculator

## The Problem

Currently, the cost calculations use fixed midpoint values (e.g., $12,500 per go-around, $80,000 per AOG day). These are generic industry averages. A real sales conversation needs the prospect's own numbers -- fleet size, fuel spend, passenger volume -- to produce credible, airline-specific dollar outcomes.

## Solution: "Your Airline" Configuration Panel

Add a collapsible setup panel at the top of the page where users enter 4-5 simple inputs about their airline. These inputs then **scale** all the cost calculations throughout the page, making every dollar figure specific to that airline.

### Airline Profile Inputs

| Input | Label | Default | Unit | Why It Matters |
|-------|-------|---------|------|----------------|
| Fleet Size | Number of aircraft | 50 | aircraft | Scales AOG cost (lost revenue per aircraft), go-around frequency, maintenance events |
| Annual Fuel Spend | Total fuel budget | 500 | $M/year | Converts fuel variance % into real dollars (1% of $500M = $5M) |
| Daily Departures | Average flights per day | 150 | flights | Scales delay cost (more flights = more cascade), go-around frequency |
| Annual Passengers | Passengers per year | 20 | M pax | Scales baggage mishandling cost, injury frequency, passenger compensation |
| Average Revenue per Flight | Revenue per departure | 25,000 | $/flight | Scales AOG lost revenue and delay impact |

### How Scaling Works

Instead of using fixed `costMidpoint` values, the cost-per-event becomes a function of the airline profile. For example:

- **Fuel Degradation**: `fuelVariance% * annualFuelSpend` instead of fixed $12.5M per %
- **AOG**: `avgRevenuePerFlight * dailyDepartures / fleetSize` for lost revenue per AOG day
- **Baggage**: `costPerBag * (annualPassengers / 12 / 1000)` for monthly volume scaling
- **Delays**: `costPerMinute * dailyDepartures` for network-wide delay cost

The use case baselines also scale with fleet/volume (e.g., a 200-aircraft airline has more go-arounds than a 50-aircraft one).

## UI Layout

```text
+----------------------------------------------------------+
| YOUR AIRLINE                                    [Collapse]|
| Fleet: [50] aircraft  |  Fuel: [$500M]/yr                |
| Departures: [150]/day |  Passengers: [20M]/yr            |
| Revenue/flight: [$25K]                                    |
+----------------------------------------------------------+
|                                                           |
| [CFO] [CEO] [COO]  tabs...                               |
| Tier 1: Executive Outcomes (now with real $ values)       |
| Cost Banner: "Your estimated annual savings: $24.3M"      |
| Tier 2: Leading Measures                                  |
| Tier 3: Use Case Sliders (costs now airline-specific)     |
+----------------------------------------------------------+
```

### Airline Profile Panel Design
- Appears above the tabs as a compact, collapsible card
- Styled with a subtle gradient border to distinguish it as a configuration area
- Inputs use number fields (not sliders) for precise entry
- Includes preset buttons: **Regional** (25 aircraft), **Mid-Size** (80 aircraft), **Tier 1** (200 aircraft) for quick setup
- Collapsed state shows a summary line: "50 aircraft | $500M fuel | 150 flights/day | 20M pax/yr"

## Data Model Changes (`src/data/lineOfSightData.ts`)

### New Interface: `AirlineProfile`
```typescript
export interface AirlineProfile {
  fleetSize: number;
  annualFuelSpendM: number;    // in $M
  dailyDepartures: number;
  annualPassengersM: number;   // in millions
  revenuePerFlight: number;    // in $
}
```

### New: `defaultProfiles` presets
Three pre-built profiles (Regional, Mid-Size, Tier 1) for quick selection.

### Updated: `computeScaledCostMidpoint` function
Takes a use case and airline profile, returns a scaled cost-per-event value. Each use case has a scaling formula:
- uc1 (Go-arounds): scales with daily departures
- uc2 (AOG): scales with revenue per flight
- uc3 (Delays): scales with daily departures
- uc4 (Fuel): scales directly with annual fuel spend
- uc5 (Injuries): scales with annual passengers
- uc6 (Regulatory): fixed (doesn't scale much)
- uc7 (Insurance): scales with fleet size
- uc8 (Baggage): scales with annual passengers

### Updated: `computeUseCaseCostImpact`
Now accepts airline profile parameter and uses scaled cost instead of fixed midpoint.

## Component Changes (`src/components/slides/SlideLineOfSight.tsx`)

### New: `AirlineProfilePanel` section
- Collapsible panel with 5 number inputs
- 3 preset buttons (Regional / Mid-Size / Tier 1)
- Collapsed summary line
- State: `airlineProfile` stored in component state

### Updated: All cost calculations
- `computeUseCaseCostImpact` calls now pass airline profile
- Cost-per-event display on each use case card updates dynamically
- Total cost avoidance banner uses scaled values
- Executive outcome dollar metrics ($M) scale with airline size

## Files Changed

| File | Change |
|------|--------|
| `src/data/lineOfSightData.ts` | Add `AirlineProfile` interface, `defaultProfiles` presets, `computeScaledCostMidpoint` function, update `computeUseCaseCostImpact` signature |
| `src/components/slides/SlideLineOfSight.tsx` | Add airline profile panel with inputs and presets, pass profile through all cost calculations, update display strings |

## User Experience Flow

1. User lands on /line-of-sight, sees the airline profile panel open by default
2. They either type in their airline's numbers or click a preset (e.g., "Tier 1")
3. All dollar figures throughout the page immediately reflect their airline's scale
4. They adjust use case sliders to model improvements
5. The cost avoidance banner shows a credible, airline-specific savings figure
6. In a sales meeting, the rep enters the prospect's real numbers and the page becomes a live business case

