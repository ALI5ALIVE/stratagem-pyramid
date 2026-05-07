## Add a Foundation section: 3 Systems of Record

A new dedicated section on `/platform` that gives **ContentManager365 · SafetyManager365 · TrainingManager365** the spotlight as the foundation layer the rest of the platform (DTOP, Intelligence, Mobile) is built on top of.

Currently the three modules are only mentioned as a single line inside the "Core Operational Apps" tile. They deserve their own beat — buyers (Heads of Content / Safety / Training) need to see "their" system named explicitly.

---

### Placement

Insert **between `PlatformModules` and `DTOPSection`**:

```text
StickyNav ▸ Hero ▸ Outcomes ▸ Platform Modules ▸ [NEW] Foundation ▸ DTOP ▸ Intelligence ▸ Mobile ▸ Integrations ▸ Security ▸ Why ▸ CTA
```

Add `{ id: "foundation", label: "Foundation" }` to the StickyNav between Platform and DTOP.

---

### Section design

- **Eyebrow:** `Foundation · Systems of Record`
- **H2:** *"Three systems of record. One connected data model."*
- **Sub-line:** *"Industry-grade systems for the work that has to be right — content authored once, safety closed-loop, training tied to operational reality. The substrate every other layer of the platform sits on."*

**3 detail cards** (equal-height grid, persona-tinted accents):

| Card | Color | Owner | One-liner | 3 capability bullets |
|---|---|---|---|---|
| **ContentManager365** | amber | Head of Content / Tech Pubs | *"Operational content as living, queryable knowledge."* | Authoring & revision control · Distribution & acknowledgements · Structured for AI & search |
| **SafetyManager365** | emerald | Head of Safety | *"From events to control — closed-loop safety."* | Reports, observations & investigations · Risk register & CAPA · Audit-ready evidence by default |
| **TrainingManager365** | violet | Head of Training | *"Competence wired to operational reality."* | Curricula, assignments & assessments · Competency & readiness state · Triggered by content & safety events |

Each card:
- Icon (BookOpen / ShieldCheck / GraduationCap) in module color
- "Owner: …" small chip at top
- Title + one-liner
- 3 capability bullets with check-icons in module color
- "System of record" footer chip

**Below the 3 cards** — a slim **"One Connected Data Model"** strip that names what makes them one platform:
- *Same record powers a manual revision, a safety event, a training assignment.*
- *Single taxonomy · single identity · single audit trail.*
- *No point integrations between them — they share a substrate.*

---

### Implementation

- New `Foundation` component inside `src/pages/PlatformOverview.tsx`.
- Reuse existing tokens (`bg-card/20`, `border-border`, `font-display`, amber/emerald/violet DTOP colors, `CheckCircle2` from lucide).
- `id="foundation"` on the section + add nav item.
- Slim down the duplicate "Core Operational Apps" tile in the existing `PlatformModules` grid: change its `desc` from listing the 3 system names to a one-liner that points down — *"Three systems of record — see the Foundation section below."* Keep the tile so the architecture map still has its 4 building blocks.

---

### Out of scope

- Module deep-dive pages.
- Editing the architecture diagram component.
- Home page changes — the foundation belongs on the product page.
