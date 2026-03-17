

# Reorder CoAnalyst Slides in Technical Pitch

## Current order (slides 4–9):
1. The Platform (4)
2. Safety Manager (4a)
3. Content Manager (4b)
4. Training Manager (4c)
5. DTOP Architecture (5)
6. **Capabilities (6)**
7. **CoAnalyst Intelligence (7)**
8. **Intelligence Tiers (8)**
9. **vs Generic AI (9)**

## New order:
Move CoAnalyst slides (7, 8, 9) to come right after the module slides (4c) and before Capabilities (6). DTOP stays before Capabilities.

1. The Platform (4)
2. Safety Manager (4a)
3. Content Manager (4b)
4. Training Manager (4c)
5. **CoAnalyst Intelligence (7)**
6. **Intelligence Tiers (8)**
7. **vs Generic AI (9)**
8. DTOP Architecture (5)
9. **Capabilities (6)**

## File change
**Edit:** `src/pages/TechnicalDeepDive.tsx` — reorder entries in the `slides` array (lines 37–41) to:
```
Training Manager 365 → CoAnalyst Intelligence → Intelligence Tiers → vs Generic AI → DTOP Architecture → Capabilities
```

No component file changes needed — just the array order.

