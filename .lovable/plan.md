## Add a "What's a signal?" beat to `/comply365-home`

Insert a new section between **Hero** and **Stakes** that defines "signal" with concrete examples color-coded to DTOP. This grounds the rest of the page (Stakes numbers, Personas, DTOP ribbon, CoAnalyst headline) in a vocabulary the visitor already accepts.

---

### Placement

```text
Hero ▸ [NEW] Signals ▸ Stakes ▸ Personas ▸ Shift ▸ Platform ▸ Intelligence ▸ DTOP ▸ Trust ▸ CTA
```

---

### Section content

- **Eyebrow:** `Definition · The signal`
- **H2:** *"A signal is anything your operation is trying to tell you — before it becomes an incident."*
- **Sub-line:** *"They live in your manuals, your safety reports, your training records and your operational data. Most never make it into a decision."*
- **4 example tiles** (single row on desktop, 2×2 on mobile), each tile color-coded to map onto DTOP later:

| Color (DTOP step) | Example signal | Tag |
|---|---|---|
| Blue (Detect) | "A KPI drifts off-target" | Operational signal |
| Amber (Trigger) | "A manual revision is published" | Content signal |
| Violet (Orchestrate) | "A competency gap appears on a roster" | Training signal |
| Emerald (Prove) | "A safety observation is filed" | Safety signal |

Each tile shows: small dot in DTOP color · short example sentence · faint tag label underneath.

- **Closing line below the tiles:**
  *"Today, most of these signals die in a silo. The next sections show what that costs — and how DTOP turns them into action."*

---

### Implementation

- New `Signals` component inside `src/pages/Comply365Home.tsx` (no new file).
- Reuse Tailwind tokens already used elsewhere (`bg-card/20`, `border-border`, `font-display`, DTOP colors).
- Render between `<Hero />` and `<Stakes />` in the page composition.
- Add `id="signals"` so it can be deep-linked.
- No new icons, images or dependencies.

---

### Out of scope

- `/platform` page (definition not needed — buyers there already accept the premise).
- Hero copy changes.
- Tooltip on DTOP step (can be a follow-up if needed).
- Any animation work.
