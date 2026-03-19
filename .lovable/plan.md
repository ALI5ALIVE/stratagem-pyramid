

# Add CoAnalyst Reference to ops-slide-4 Narration

## Problem
The narration for ops-slide-4 ("DTOP + Platform") describes the three modules and the DTOP model but never mentions **CoAnalyst as the intelligence layer** connecting them. The slide itself has a "CoAnalyst — Intelligence Layer" card, and the narration should reference it to set up the next slide (ops-slide-5, "The Intelligence Layer").

## Fix

### File: `src/data/operationalPitchNarration.ts`

Update the `ops-slide-4` script to add a closing sentence about CoAnalyst after the three modules are described. Append something like:

> "And connecting all three is CoAnalyst — the intelligence layer. It's what transforms sixty-five thousand monthly data points into actionable insight. Let me show you how."

This bridges naturally into ops-slide-5 which dives deep into CoAnalyst's four intelligence tiers.

**One file, one string edit. No code or layout changes.**

