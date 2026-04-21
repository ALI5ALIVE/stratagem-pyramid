

## Diagram Label Rename

Update layer pill labels in `PlatformArchitectureDiagram.tsx` to align terminology with "System of record":

| Layer | Current label | New label |
|---|---|---|
| DTOP (top) | `Way of working` | `System of work` |
| Intelligence & Orchestration | `Action` | `System of action` |

Other layer labels unchanged (`Delivery`, `Substrate`, `System of record`).

Also update the DTOP layer's title text from `DTOP — The Way of Working` to `DTOP — The System of Work` so the title matches the right-side pill label.

The reading-guide panel in `PFSlide3Architecture.tsx` references "Action" and "Operating model" — update its "Action" eyebrow to "System of action" to stay consistent.

## Files touched

- Edit: `src/components/platform-slides/PlatformArchitectureDiagram.tsx` — 2 label strings + 1 title string.
- Edit: `src/components/platform-slides/PFSlide3Architecture.tsx` — 1 eyebrow string ("Action" → "System of action").

## Out of scope

- No color, layout, or ordering changes.
- No changes to ArchitectureLayerBadge (pill labels there are layer names, not role labels).

