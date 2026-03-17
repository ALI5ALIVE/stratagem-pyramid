

# Amended Plan: CoAnalyst as Overarching Layer with Decorative Dots

## Change Summary
Modify `PlatformEcosystemDiagram.tsx` to:

1. **Expand viewBox** to `0 0 400 460`, shift diagram center down to `cy=240` to make room at top
2. **Add a golden/amber banner** at the top labeled only "CoAnalyst" — the overarching intelligence layer
3. **Keep CoAuthor, CoAnalyst, CoTrainer as decorative dots** on the outer ring (existing `aiAssistants` rendering stays, with small gold `✦` symbols and labels)
4. **Draw three connection lines** from the CoAnalyst banner down into the circular diagram, with animated gold dots flowing downward — showing CoAnalyst spanning all modules
5. **Remove** the four "AI-POWERED" curved text labels (redundant now that the banner communicates the same idea)

## Visual

```text
  ╔═══════════════════════════════╗
  ║     ✦  CoAnalyst             ║  ← Gold/amber banner, top
  ╚═══════════════════════════════╝
        │          │          │      ← Gold animated connection lines
        ▼          ▼          ▼
  ┌─────────────────────────────┐
  │  (dark outer ring)          │
  │  CoAuthor✦  CoAnalyst✦      │  ← Decorative dots stay on ring
  │  CoTrainer✦                 │
  │    ┌─────────────────┐      │
  │    │ Safety  Content  │     │  ← Inner ring + product cards
  │    │    COMPLY365     │     │
  │    │   Training       │     │
  │    └─────────────────┘      │
  └─────────────────────────────┘
```

## File to Edit
**`src/components/PlatformEcosystemDiagram.tsx`**

### Changes
- ViewBox: `0 0 400 460`
- Center: `cy` from `200` → `240`
- Add defs: gold banner gradient, gold arrow marker
- Add banner: rounded rect at `y=5`, `x=60`, `width=280`, `height=45`, with "CoAnalyst" text and `✦` symbol
- Add 3 vertical paths from banner bottom (`y=50`) to each product card position, with `animateMotion` gold dots
- Remove lines 166-219 (the four "AI-POWERED" curved text path defs and their `<text>` renderings)
- Keep lines 222-249 (aiAssistants decorative labels on outer ring) unchanged

