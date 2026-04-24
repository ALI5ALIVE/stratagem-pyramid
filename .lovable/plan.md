

## Home page + sidebar reorganization

Reorder the Command Centre home page and the left sidebar so the three primary customer-facing decks lead, sales enablement follows, capabilities sit next, target-audience content gets its own section, and internal strategy/positioning drops to the bottom.

### New section order (HomePage + Sidebar)

| # | Section | Items |
|---|---|---|
| 1 | **Customer Pitch Decks** | Customer Overview · Executive Pitch 3 · Technical Deep Dive v4 |
| 2 | **Sales Enablement & Training** | Sales Enablement Training |
| 3 | **Capabilities** (renamed from "Tools & Reference") | Platform Playbook · CoAnalyst · Regulation Management · DTOP Operating Model · Insights & Recommendations · Automation · Unified Mobile App |
| 4 | **Target Audience** (NEW) | Persona Deep-Dive |
| 5 | **Strategy & Positioning** (moved to bottom) | Strategy Deck · Content Strategy |

Other existing decks (Executive Pitch [v2], Operational Pitch, Technical Deep-Dive [v3]) are removed from the home page top section to keep the customer-facing trio clean. They remain reachable via direct URL but are not surfaced. Confirm in QA — if user wants them retained, fold into a collapsed "Other decks" group at the bottom.

### Changes

**1. `src/pages/HomePage.tsx`**

- Rebuild the `pitchDecks` array to contain only: Customer Overview, Executive Pitch 3, Technical Deep Dive v4 (in that order).
- Remove Executive Pitch (v2), Operational Pitch, Technical Deep-Dive (v3) cards from "Customer Pitch Decks". 
- Keep "Sales Enablement & Training" section as-is, second.
- Rename "Tools & Reference" section heading to **"Capabilities"** with subtitle "Per-capability playbooks for the Operational Performance Platform". Remove the Persona Deep-Dive card from this grid.
- Add new section **"Target Audience"** with subtitle "Buyer personas, messaging and discovery questions" containing the Persona Deep-Dive card (and Line of Sight + Homepage Mockup if we want to keep them surfaced — confirmed kept under Capabilities; Personas moves alone into Target Audience).
- Move "Strategy & Positioning" section to the bottom of the page.
- Final render order in JSX: Pitch Decks → Sales Enablement → Capabilities → Target Audience → Strategy & Positioning.

**2. `src/components/AppSidebar.tsx`**

Reorder and rename groups to match home:

- **Pitch Decks** group: replace `pitchItems` with three entries — Customer Overview (`/customer-overview`, `Presentation`), Executive Pitch 3 (`/pitch-executive-3`, `Rocket`), Technical Deep Dive v4 (`/pitch-technical-v4`, `BookOpen`).
- **Sales Enablement** group (NEW between Pitch Decks and Capabilities): single item — Sales Enablement Training (`/sales-enablement`, `GraduationCap`).
- **Capabilities** group (renamed from "Platform & Capabilities"): keep existing platform items (Platform Playbook, CoAnalyst, Insights & Recs, Automation, Unified Mobile, DTOP Operating Model, Regulation Mgmt). Remove Personas from `referenceItems`.
- **Target Audience** group (NEW): Personas (`/personas`, `Users`).
- **Reference** group: remaining items — Line of Sight, Homepage Mockup.
- **Strategy** group: moved to the bottom — Strategy Deck, Content Strategy.
- **Collaboration** (Reviews) stays at the very bottom under Strategy.

Render order in `AppSidebar`: Home → Pitch Decks → Sales Enablement → Capabilities → Target Audience → Reference → Strategy → Collaboration → user/auth.

### Files

**EDITED**
- `src/pages/HomePage.tsx`
- `src/components/AppSidebar.tsx`

**NOT TOUCHED**
- Routing (`src/App.tsx`) — all URLs unchanged.
- Slide components, playbooks, persona data.
- `MainNavigation` (top header used on marketing pages, not the command centre).

### QA

- `/` shows sections in order: Customer Pitch Decks (3 cards) → Sales Enablement & Training → Capabilities (7 cards, no Personas) → Target Audience (Personas card) → Strategy & Positioning (2 cards).
- Sidebar groups in order: Home, Pitch Decks (3), Sales Enablement (1), Capabilities (7), Target Audience (1), Reference (2), Strategy (2), Collaboration.
- All deck links route correctly.
- No broken icon imports.

