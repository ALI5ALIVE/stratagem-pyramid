## Reorder Platform Capability Layers in Executive Pitch (Medium)

### New layer order
After the "The Platform" overview slide, the capability layers will be presented in this order:

1. **DTOP — The System of Work** (was 3rd)
2. **Unified Mobile** (was 2nd)
3. **Intelligence & Orchestration** (Automation → Insights & Recommendations → CoAnalyst → CoAnalyst vs Generic AI) (was 1st)

### Resulting deck flow
```text
Title
Strategic Shift
The Platform
▸ DTOP                          (divider)
DTOP — System of Work
▸ Mobile                        (divider)
Unified Mobile
▸ Intelligence Layer            (divider)
Automation
Insights & Recommendations
CoAnalyst
CoAnalyst vs Generic AI
Regulation Management
2026 Phased Roadmap
Customer Outcomes
Why Comply365
```

### Technical changes
- **`src/pages/ExecutivePitch3.tsx`**: reorder entries in the `slides` array so the DTOP divider + slide come first, Mobile divider + slide second, and the Intelligence divider + its 4 slides last (before Regulation Management). No id renames — slide ids stay stable so narration keys keep working.
- **`jumpTargets` on the Platform overview slide**: keep mapping `dtop → exec3-divider-dtop`, `mobile → exec3-divider-mobile`, `intelligence → exec3-divider-intelligence`, `core → exec3-divider-dtop` (updated to first layer). This preserves jump-from-overview behaviour with the new ordering.
- No changes to the slide components themselves, divider props, or narration data.
