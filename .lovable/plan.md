
## Goal
Restructure `AppSidebar.tsx` so it mirrors the tidied Home page and is faster to scan, navigate, and collapse. Today's sidebar lists 13 flat items across three groups with stale entries (Executive Pitch v1, Value Deck) and the master Platform Playbook buried among reference tools.

## Proposed Structure (4 groups, clearer hierarchy)

```text
Home

PITCH DECKS                    (customer-facing)
  Executive Pitch              /pitch-executive-2     Rocket
  Operational Pitch            /pitch-operational     Briefcase
  Technical Deep-Dive          /pitch-technical       BookOpen

PLATFORM & CAPABILITIES        (NEW group — master + capability playbooks)
  Platform Playbook ★          /platform-playbook     Layers
  CoAnalyst                    /coanalyst             Brain
  Insights & Recs              /insights-playbook     Sparkles
  Automation                   /automation-playbook   Zap
  Unified Mobile               /mobile-playbook       Smartphone
  DTOP Operating Model         /dtop-playbook         Workflow

STRATEGY                       (internal narrative)
  Strategy Deck                /strategy              Presentation
  Content Strategy             /content-strategy      FileText

REFERENCE                      (tools & lookup)
  Personas                     /personas              Users
  Regulation Mgmt              /regulation-management ScrollText
  Line of Sight                /line-of-sight         Target
  Homepage Mockup              /homepage-mockup       Globe
```

## Key Improvements (industry best practices)
1. **Remove stale entries** — drop Executive Pitch v1 and Value Deck (already removed from Home).
2. **Promote the master** — Platform Playbook leads its own group with a subtle "★ Master" badge so it's instantly findable.
3. **Group by user intent**, not file type: "what I show customers" (Pitch), "what we sell" (Platform & Capabilities), "how we position" (Strategy), "what I look up" (Reference).
4. **Visual hierarchy** — keep existing uppercase tracked group labels; add a thin separator between groups (already supported via `SidebarSeparator`).
5. **Active state already works** via `NavLink` activeClassName — keep.
6. **Slide sub-nav** (existing behaviour when a deck registers slides) stays at the bottom, unchanged.
7. **Collapsible="icon"** stays — all groups already render icons, so the collapsed mini-rail remains usable.
8. **Tooltip on every button** when collapsed — already wired via `tooltip={item.title}`.
9. **Counts on hover** (optional, low-effort): add an optional `count` field (e.g. "13") rendered as a muted pill on the right of each row when expanded — helps users gauge deck length at a glance. Skip if it adds clutter.

## Files to Change (1 file)
- `src/components/AppSidebar.tsx` — restructure the three arrays into four (`pitchItems`, `platformItems`, `strategyItems`, `referenceItems`), update icon imports (drop unused `TrendingUp`-equivalents, keep all currently used), render four `<NavGroup>` blocks with separators, add a small "Master" indicator next to Platform Playbook.

No route, page, or `App.tsx` changes — all destinations already exist.

## Out of Scope
- Search/command palette (could be a follow-up using the existing `cmdk` `Command` component).
- Persisted "recently viewed" section.
- Reordering Home page (already done).
