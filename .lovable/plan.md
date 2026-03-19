

# Move CoAuthor to Outer Ring Position

## Problem
CoAuthor at angle 210 is very close to Content Manager at angle 240 (only 30 degrees apart), likely causing visual overlap or making it appear hidden. Both assistants technically render at the same radius (`outerRadius - 25 = 165`), but CoAuthor's proximity to the Content card makes it look like it's not on the outer ring.

## Change
In `src/components/PlatformEcosystemDiagram.tsx`, move CoAuthor's angle from `210` to `300` (10 o'clock position), giving it clear separation from all three product cards (Content at 240, Safety at 0, Training at 120). This mirrors CoTrainer's position on the opposite side of the diagram.

| Item | Current Angle | New Angle |
|------|--------------|-----------|
| CoAuthor | 210 | 300 |
| CoTrainer | 135 | 135 (unchanged) |

This places CoAuthor clearly in the upper-right area of the outer dark ring, well separated from any product cards.

