

## Sales Enablement Title Slide — Remove "5 Layers" references

The title slide (`SESlide0Title`) and rep checklist (`SEClosingForReps`) still describe the deck as a 5-module course built around "The 5 Layers." After the recent restructure, the deck has 6 modules and the architecture is 4 capability bands (no layer numbers). This pass aligns the title agenda and rep checklist to the new structure.

### Changes

**1. `src/components/sales-enablement-slides/SESlide0Title.tsx`**

Update the `modules` array from 5 entries to 6, matching the live deck:

| # | Title | Desc |
|---|---|---|
| 1 | The Market Shift | Why this exists |
| 2 | What It Is | Plain-English pitch |
| 3 | The Capabilities | How it fits together |
| 4 | How We Sell It | Discovery → demo → close |
| 5 | Use Cases & DTOP | Value through Detect→Prove |
| 6 | Why We Win | Objections & next steps |

- Replace `"The 5 Layers"` → `"The Capabilities"`.
- Insert new M5 `"Use Cases & DTOP"` (icon: `Target` or reuse `Layers`; accent rose/cyan to differ from M6).
- Renumber Why We Win from M5 → M6 (keep rose accent or shift M6 to a new accent).
- Change grid from `md:grid-cols-5` → `md:grid-cols-6` so all six module cards fit on one row at desktop, with `md:grid-cols-3` fallback already covered by `grid-cols-1`.
- Update the header meta line `"24 slides · ~35 min"` to reflect the current count — recompute from `SalesEnablement.tsx` (likely ~28 slides · ~45 min; final number set when implementing).
- Imports: add an additional Lucide icon for the new M5 (e.g. `Target`).

**2. `src/components/sales-enablement-slides/SEClosingForReps.tsx`**

In the `checklist` array, replace:
- `"I can name the 5 layers and what each does in plain English"`  
  →  `"I can name the four capabilities (Core Apps, Intelligence & Orchestration, Mobile, DTOP) and what each does in plain English"`

Leave the rest of the checklist untouched.

### Files

**EDITED**
- `src/components/sales-enablement-slides/SESlide0Title.tsx`
- `src/components/sales-enablement-slides/SEClosingForReps.tsx`

**NOT TOUCHED**
- Module dividers (`SEModuleDivider` usage in `SalesEnablement.tsx`) — already updated in prior pass.
- All other SE slides, talk track, recap.
- v3/v4 tech decks, customer overview, executive decks.

### QA

- `/sales-enablement` title slide shows 6 module cards, no "5 Layers" wording, M5 reads "Use Cases & DTOP", M6 reads "Why We Win".
- Rep checklist at end of deck references "four capabilities" with the four band names, not "5 layers".
- Slide count/time in the eyebrow matches the actual deck length.

