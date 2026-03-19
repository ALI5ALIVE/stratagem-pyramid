

# Update Platform Ecosystem Diagram Labels

## Changes in `src/components/PlatformEcosystemDiagram.tsx`

### 1. Remove CoAnalyst from outer circle AI assistants
Remove the `coanalyst` entry from the `aiAssistants` array (line 50).

### 2. Swap Content Manager and Safety Manager positions
- Safety currently at angle 240 (top-left), Content at angle 0 (right)
- Swap their angles so Safety is at 0 and Content is at 240

### 3. Position CoAuthor on same level as CoTrainer
- CoTrainer is at angle 90 (bottom)
- CoAuthor is at angle 225
- Move CoAuthor to a symmetric position relative to CoTrainer — e.g. angle 270 (top) or keep both in the lower hemisphere at complementary positions (e.g. CoAuthor at 45, CoTrainer at 135) so they sit on the same horizontal level

Final `aiAssistants` array will have only 2 entries: CoAuthor and CoTrainer, positioned symmetrically.

