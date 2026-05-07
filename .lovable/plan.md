## Audit: `/comply365-home` vs `/platform`

Both pages exist; they share the Medium-pitch DNA but currently duplicate ~60% of content and don't speak directly to the buyers (COO, Heads of Safety / Content / Training). Below is a UX critique, a clean role split, and a section-by-section rework so the two pages function as **a funnel** rather than two near-identical brochures.

---

### 1. What's overlapping today

| Theme | On `/comply365-home` | On `/platform` | Verdict |
|---|---|---|---|
| Today→Tomorrow shift | "Shift" section (full grid) | "Hero split" + "Shift table" (5 rows) | Triple coverage. Keep on Home only. |
| DTOP 4-step ribbon | `DTOP` section (4 cards) | `DTOPSection` (4 cards + scenario) | Keep teaser on Home, deep version on Platform. |
| Intelligence 90% vs 35% | Big hero stat | Inline tile + anchor metric strip | Keep emotional version on Home, technical breakdown on Platform. |
| Modules | 3 module cards | 4 module cards (incl. DTOP/Mobile) | Home = "what it is in one breath", Platform = "what's inside". |
| Trust (550+, 2.5M, 6) | `Trust` section + logos | `Why` section, footer trust strip | Keep logos+stats on Home; Platform shows technical proof. |
| Stakes / Outcomes | "Stakes" ($25–35B, 65%, days→min) | "Outcomes" (40%, 70%, 90%) | Different angles but feel duplicative — merge into one "value" thread. |

**Diagnosis:** `/platform` reads like a longer Home today. It needs to become a *product* page (modules, architecture, integrations, security, deployment), not a re-pitch.

---

### 2. Persona connection — currently weak

Neither page names the COO, Head of Safety, Head of Content, or Head of Training. Buyers can't find themselves. We'll fix this with:

- **Home**: a "Who this is for" strip with 4 persona cards (COO · Safety · Content · Training), each with the *one* problem we solve and a deep-link.
- **Platform**: persona tabs over the modules section so a Head of Safety lands on `?role=safety` and sees the SafetyManager365 + Recommended Actions + Audit Proof story first.

---

### 3. Reworked information architecture

```text
HOME  (emotional · 60-second pitch · funnel)
  Hero ▸ Stakes ▸ Personas ▸ Shift ▸ Platform-at-a-glance ▸
  Intelligence headline ▸ DTOP teaser ▸ Trust ▸ CTA
                              │
                              ▼
PLATFORM  (rational · what's inside · proof)
  StickyNav ▸ Hero (product framing, no Today/Tomorrow split) ▸
  Persona switcher ▸ Architecture diagram (already done) ▸
  Modules deep dive (Content / Safety / Training) ▸
  DTOP operating model (full + scenario) ▸
  Intelligence (Automation · Insights · CoAnalyst) ▸
  Unified Mobile ▸ Integrations & Data Model ▸
  Security / Compliance / Deployment ▸ Why It Works ▸ CTA
```

---

### 4. Section-by-section changes

#### `/comply365-home`
1. **Hero** — keep. Add a sub-line tying to personas: *"For the COO and the heads of Safety, Content and Training."* Replace the 4 colored DTOP dots with a one-line strap that previews DTOP, not just colors.
2. **Stakes** — keep, but reframe the 3rd card from "Days → minutes" to a **revenue/risk** angle (controllable cost reclaimed) — COO language.
3. **NEW: "Who this is for"** — 4 persona cards:
   - **COO** — "Operational performance is finally measurable." → `/platform?role=coo`
   - **Head of Safety** — "From events to control." → `/platform?role=safety`
   - **Head of Content** — "Manuals that act, not just read." → `/platform?role=content`
   - **Head of Training** — "Competence wired to operational reality." → `/platform?role=training`
4. **Shift** — keep (Home is the right place for the emotional Today→Tomorrow).
5. **Platform** — slim from 3 module cards to a **single "one-platform" visual + 3 short module strap-lines**, each linking to its anchor on `/platform`. Removes duplication with the Platform page's deep grid.
6. **Intelligence** — keep (the 90% vs 35% headline is a Home-quality moment).
7. **DTOP** — convert from 4 full cards to a **4-step horizontal ribbon** (single-line each) + "See the full operating model →". This kills duplication with the Platform DTOP section.
8. **Trust** — keep; add 1 short customer quote from a COO/Head of Safety persona (placeholder ok).
9. **CTA** — keep, but split CTA: *"Book a walkthrough"* (primary) + *"Talk to a Safety / Content / Training specialist"* (secondary persona-routed mailto).

#### `/platform`
1. **Hero** — *Remove* the Today/Tomorrow split graphic (lives on Home). Replace right column with the architecture diagram preview (`PlatformArchitectureDiagramV4` already added). Sharpen H1 to a product line, e.g. *"The Operational Performance Platform — one connected data model for content, safety and training."*
2. **The Shift** — *Remove entirely.* It belongs on Home.
3. **Outcomes** — *Move down* and reframe as **"Outcomes by role"** with the 4 persona tabs (COO · Safety · Content · Training). Each tab swaps the 3 outcome cards & metrics. Reads from `?role=` URL param so Home deep-links land in the right tab.
4. **Platform Modules** — keep diagram + 4 cards. Add a **2-column "One Connected Data Model"** explainer below: the same record powers a manual revision, a safety event, a training assignment.
5. **DTOP** — keep full version with scenario; add a **role lens chip row** ("Show me as: COO · Safety · Content · Training") that highlights which step matters most for that role.
6. **Intelligence** — keep; tighten copy now that Home carries the headline. Add a small **"How it differs from generic AI"** comparison row (3 bullets).
7. **Unified Mobile** — keep.
8. **NEW: Integrations & Data Model** — short section: standard adaptors, OneRoster/SCORM, document ingestion, evidence export, API. This is what a CTO/COO wants on a platform page and is missing today.
9. **NEW: Security, Compliance & Deployment** — short trust strip: regulated-industry posture, residency, RBAC, audit, deployment models. Currently absent and a deal-blocker for COOs.
10. **Why It Works** — keep; demote trust stats since Home owns them.
11. **CTA** — keep; route the "Book" mailto with a `?subject=` carrying the active persona.

---

### 5. Web-design best practices applied

- **One job per page**: Home = convince + route; Platform = explain + de-risk.
- **Progressive disclosure**: each section on Home ends with a *single* deep-link into the matching Platform anchor (no duplicate explanations).
- **Persona scent**: named buyers visible above the fold on Home, persona tabs on Platform — visitors see themselves within 5 seconds.
- **Hierarchy**: every section has eyebrow → H2 → 1-line sub → visual → proof, consistently.
- **Reduced cognitive load**: kill the Hero split + Shift table on Platform; collapse the DTOP grid on Home into a ribbon.
- **Semantic anchors**: `#personas`, `#platform`, `#dtop`, `#intelligence`, `#mobile`, `#integrations`, `#security` for Platform; meaningful `<h1>/<h2>` and alt text.
- **Performance**: no new heavy assets; reuse `PlatformArchitectureDiagramV4` and existing icons.
- **Accessibility**: persona switcher must be `role="tablist"` with keyboard support; color-only DTOP markers paired with letter labels (already done).
- **Conversion**: every section gives the user one next action; primary CTA repeats at hero, after Intelligence, and at footer.

---

### 6. What ships in build phase

- Edit `src/pages/Comply365Home.tsx`: add Personas section, slim Platform & DTOP, add COO sub-headline, secondary CTA.
- Edit `src/pages/PlatformOverview.tsx`: remove Hero split + Shift section, add persona tabs over Outcomes & DTOP, add Integrations and Security sections, tighten Intelligence copy.
- New small component `PersonaTabs` (URL-synced via `?role=`) reused on both pages.
- No backend, no schema, no new assets.

---

### 7. Out of scope

- Industry pages (`/solutions/*`).
- Medium pitch slides themselves.
- Customer logo SVGs (placeholders stay).
- Live forms / CRM integration (mailto only).
