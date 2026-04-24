## Rename Customer Pitch Decks to Short / Medium / Long with presentation timings

Relabel the three customer pitch deck cards so the lead identifier is duration-based (Short / Medium / Long), with the original product name as a subtitle and an estimated presentation time on each.

### New labels

| Card | New title | Subtitle (existing name) | Badge / timing |
|---|---|---|---|
| `/customer-overview` | **Short — Customer Overview** | 10 slides · sales-led narrative | **~15–20 min** |
| `/pitch-executive-2` (CEO Overview, just reinstated) | **Medium — CEO Overview** | Concise C-suite before/after | **~20–25 min** |
| `/pitch-executive-3` | **Medium — Executive Pitch** | Platform's strongest visuals — DTOP & architecture | **~30–35 min** |
| `/pitch-technical-v4` | **Long — Technical Deep Dive** | 4-layer architecture, full intelligence story | **~45–60 min** |

If the user wants strictly three (Short / Medium / Long, no duplicate "Medium"), confirm during QA — the safest read of the request is to keep all four currently-listed decks and tag them as above. Default below maps to the three originally referenced + CEO Overview retained from the previous step.

### Changes

**1. `src/pages/HomePage.tsx`**

Update the `pitchDecks` array entries:

- Customer Overview
  - `title`: `"Short — Customer Overview"`
  - `badge`: `"Short · ~15–20 min · 10 slides"`
- CEO Overview (`/pitch-executive-2`)
  - `title`: `"Medium — CEO Overview"`
  - `badge`: `"Medium · ~20–25 min · 11 slides"`
- Executive Pitch 3
  - `title`: `"Medium — Executive Pitch"`
  - `badge`: `"Medium · ~30–35 min · 20 slides"`
- Technical Deep Dive v4
  - `title`: `"Long — Technical Deep Dive"`
  - `badge`: `"Long · ~45–60 min · 30 slides"`

Descriptions remain unchanged from current copy.

**2. `src/components/AppSidebar.tsx`**

Update `pitchItems` `title` values to match (keeps URLs and icons unchanged):

- `"Short — Customer Overview"` → `/customer-overview`
- `"Medium — CEO Overview"` → `/pitch-executive-2`
- `"Medium — Executive Pitch"` → `/pitch-executive-3`
- `"Long — Technical Deep Dive"` → `/pitch-technical-v4`

### Files

**EDITED**
- `src/pages/HomePage.tsx`
- `src/components/AppSidebar.tsx`

**NOT TOUCHED**
- Routes, slide content, deck timings inside the decks themselves.

### QA

- Home Customer Pitch Decks section shows four cards prefixed Short / Medium / Medium / Long with the duration in the badge.
- Sidebar Pitch Decks group reflects the same titles in the same order.
- All links still navigate correctly.
