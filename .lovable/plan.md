

# Add CoAnalyst as 4th Product Module Card

## What You Want
- Remove the golden amber banner at the top
- Keep CoAuthor and CoTrainer as decorative labels on the outer ring (as they already are)
- Add a **4th product card** for "CoAnalyst" (styled like Safety/Content/Training cards) positioned on the inner ring
- Center hub stays as "COMPLY 365"

## Changes to `src/components/PlatformEcosystemDiagram.tsx`

### 1. Remove the amber banner and connection lines
- Delete the banner rect, text, and the 3 connection line paths with animated dots (lines 134-156)
- Remove unused banner variables (`bannerY`, `bannerH`, `bannerBottom`, `connectionLines`) and unused defs (`goldBannerGradient`, `goldBorderGradient`, `bannerGlow`, `arrowHeadGold`)
- Revert viewBox back to `0 0 400 400` and `cy` back to `200`

### 2. Add CoAnalyst as a 4th product in the `products` array
- Respace the 4 products evenly at 90-degree intervals (0, 90, 180, 270):
  - Content at 0 (top)
  - Training at 90 (right)
  - Safety at 180 (bottom) or 270 (left)
  - **CoAnalyst at 270** (or whichever position makes sense) — gold/amber color `hsl(45, 85%, 50%)`, subtitle "Intelligence"
- Update the arc arrows to connect all 4 products (4 arcs instead of 3), with a gold arrow gradient added for the CoAnalyst connections

### 3. Keep CoAuthor/CoTrainer as decorative labels
- Keep the `aiAssistants` array but remove CoAnalyst from it (since it's now a card)
- Position CoAuthor and CoTrainer on the outer ring between products

### 4. Update arc paths
- 4 products means 4 inter-product arc segments instead of 3, each spanning ~70 degrees with gaps

### Result
4 equal product cards on the inner ring: Safety, Content, Training, CoAnalyst — with CoAnalyst distinguished by its gold color. CoAuthor and CoTrainer remain as decorative text on the dark outer ring. Center hub stays COMPLY 365.

