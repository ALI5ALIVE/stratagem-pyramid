

# Narration Flow Review & Fixes

## Issues Found

### Executive Pitch (`executivePitchNarration.ts`)
1. **exec-slide-7 "Why Comply365"** — The script is just bullet points: "Connected foundation — one version of truth. Embedded intelligence — built in aviation, not bolted on..." No transition from the Line of Sight slide, no narrative wrap-up. Compared to the Ops deck's version (which is rich and detailed), this feels incomplete.
2. **exec-slide-6 → exec-slide-7** — slide-6 ends with "We can model this with your numbers" then slide-7 jumps straight to bullet points with no bridge.

### Operational Pitch (`operationalPitchNarration.ts`)
- Generally well-written with smooth transitions. No major gaps.
- Minor: **ops-slide-9 → ops-slide-10** — Outcomes ends with "Every decision, auditable" then Why Us starts with "Three things set Comply three six five apart" — could use a brief bridge.

### Technical Deep-Dive (`technicalPitchNarration.ts`)
The slide **presentation order** doesn't match the numeric IDs, creating transition problems:

Actual order: 0 → 1 → 2 → 3 → 4 → 4a → 4b → 4c → 7 → 8 → 5 → 10 → 11 → 12 → **15** → 13 → 14 → 16 → 17 → 18

3. **tech-slide-4c → tech-slide-7**: Training Manager already discusses CoAnalyst heavily, then slide-7 introduces CoAnalyst as if new. Needs a transition: "Now that you've seen CoAnalyst in action across each module, let me show you the architecture behind it."
4. **tech-slide-12 → tech-slide-15**: Financial Use Cases jumps to 2026 Roadmap with no bridge. Needs: "Those financial outcomes are just the beginning. Here's what's coming next."
5. **tech-slide-15 → tech-slide-13**: 2026 Roadmap to Line of Sight — no transition. Needs: "Every capability we've shown — current and future — connects to outcomes your board measures."
6. **tech-slide-17 "Why Comply365"**: Script is decent but starts cold. Needs a transition from Outcomes (slide-16).

## Changes

### File: `src/data/executivePitchNarration.ts`
- **Rewrite exec-slide-7** script to add a transition from the Line of Sight context, expand the three differentiators with brief supporting evidence (matching the depth of the ops version), and end with the discovery session CTA.
- **Add closing sentence to exec-slide-6** that bridges to the final slide: "So what makes us the right partner to deliver this?"

### File: `src/data/technicalPitchNarration.ts`
- **Rewrite tech-slide-7** opening to transition from the module deep-dives: "You've now seen CoAnalyst activate each module — safety, content, training. Let me show you the architecture that makes that possible."
- **Add bridge to tech-slide-12** ending or **rewrite tech-slide-15** opening to connect from financial use cases to the roadmap.
- **Rewrite tech-slide-13** opening to transition from the 2026 roadmap to the Line of Sight model.
- **Add transition to tech-slide-17** opening from the Outcomes slide.

### File: `src/data/operationalPitchNarration.ts`
- **Minor**: Add a brief bridge sentence to the end of ops-slide-9 leading into Why Comply365.

## Summary of Script Rewrites
| Deck | Slide | Issue | Fix |
|------|-------|-------|-----|
| Exec | slide-6 | No bridge to final slide | Add closing transition sentence |
| Exec | slide-7 | Too terse, no context | Full rewrite with transitions and evidence |
| Tech | slide-7 | Introduces CoAnalyst as new after module deep-dives | Rewrite opening as continuation |
| Tech | slide-15 | Cold start after Financial Use Cases | Add transition opening |
| Tech | slide-13 | Cold start after 2026 Roadmap | Add transition opening |
| Tech | slide-17 | No bridge from Outcomes | Add transition opening |
| Ops | slide-9 | Minor — no bridge to Why Us | Add closing transition sentence |

Three narration data files changed. No component or logic changes needed.

