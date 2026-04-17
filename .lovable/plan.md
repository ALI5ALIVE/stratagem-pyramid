
Tidy up the Home page (`src/pages/HomePage.tsx`) only. No route or sidebar changes.

## Changes to `src/pages/HomePage.tsx`

### Pitch Decks section (4 → 3 cards)
Remove **Executive Pitch** (`/pitch-executive`). Keep:
- Executive Pitch 2
- Operational Pitch
- Technical Deep-Dive

### Strategy & Positioning section (4 → 3 cards)
Remove **Value Deck** and **CoAnalyst Playbook** (CoAnalyst moves to Tools as a capability playbook). Keep:
- Strategy Deck
- Content Strategy

Wait — re-reading the request: "have strategy deck and content strategy in the strategy section and then all of the [rest] in tools section". So Strategy section keeps only **Strategy Deck** + **Content Strategy** (2 cards). Everything else (CoAnalyst, Value Deck removed entirely, etc.) moves to Tools.

Final Strategy section (2 cards):
- Strategy Deck
- Content Strategy

### Tools & Reference section
Remove: Value Deck (deleted entirely per user).
Add **CoAnalyst Playbook** card (moved from Strategy) with `Brain` icon, badge "15 slides".
Keep existing Tools cards in this order (Platform first as master):
1. Platform Playbook
2. CoAnalyst Playbook (newly moved here)
3. Persona Deep-Dive
4. Regulation Management
5. DTOP Operating Model
6. Insights & Recommendations
7. Automation
8. Unified Mobile App

### Grid
Pitch Decks grid: change `lg:grid-cols-4` → `lg:grid-cols-3` so 3 cards fill the row cleanly.
Strategy grid: change `lg:grid-cols-4` → `lg:grid-cols-2` (or keep 4 and let cards sit left — prefer `sm:grid-cols-2 lg:grid-cols-2` for balanced layout).
Tools grid: stays `lg:grid-cols-4`.

### Imports
Remove unused icons after cleanup: `Presentation`, `TrendingUp` no longer needed if Strategy Deck keeps `Presentation` — keep `Presentation`. Remove `TrendingUp` (was Value Deck only).
