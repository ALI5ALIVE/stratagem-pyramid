## Add Playbooks to the Sales Enablement Academy as Specialist Tracks

Extend the Academy from 3 weekly modules to a two-tier curriculum: a **Core track** (today's 3 weeks) and a new **Specialist track** of 7 self-paced playbooks, each with its own quiz and certificate. A **Master Certification** is awarded once everything is passed.

### Curriculum shape

```text
Sales Enablement Academy
├── Core curriculum (existing — gated, linear)
│   ├── Week 1 · Foundation         → Foundation cert
│   ├── Week 2 · Capabilities       → Capabilities cert
│   └── Week 3 · Sell & Win         → Core Sales Enablement Certificate
│
└── Specialist Playbooks (NEW — open from day one, any order)
    ├── Signals 101                 → Signals Specialist cert
    ├── DTOP Operating Model        → DTOP Specialist cert
    ├── Insights & Recommendations  → Insights Specialist cert
    ├── Automation                  → Automation Specialist cert
    ├── Unified Mobile App          → Mobile Specialist cert
    ├── The Platform                → Platform Specialist cert
    └── Regulation Management       → RegMgmt Specialist cert

→ Pass all 10 (3 core + 7 playbooks) = Master Sales Enablement Certification
```

### 1. Database changes (one migration)

**`academy_modules` — two new columns:**

- `track text NOT NULL DEFAULT 'core'` — `'core'` or `'specialist'`
- `specialty text NULL` — short slug used by certificate route (`signals`, `dtop`, `insights`, `automation`, `mobile`, `platform`, `regmgmt`)

Existing 3 rows stay `track = 'core'`, `specialty = NULL`.

**Seed 7 new specialist rows** with:

| id | specialty | title | slide_ids (already exist in playbook pages) | accent_color | pass_threshold |
|---|---|---|---|---|---|
| `m-signals` | signals | Signals 101 — what they are, how they fire | sig-title…sig-closing (11 slides) | amber | 80 |
| `m-dtop` | dtop | DTOP — Detect, Trigger, Orchestrate, Prove | dtop-title…dtop-closing | blue | 80 |
| `m-insights` | insights | Insights & Recommendations | ins-title…ins-closing | violet | 80 |
| `m-automation` | automation | Automation — closing the loop | au-title…au-closing | emerald | 80 |
| `m-mobile` | mobile | Unified Mobile App | mob-title…mob-closing | rose | 80 |
| `m-platform` | platform | The Platform deep dive | pf-title…pf-closing | primary | 80 |
| `m-regmgmt` | regmgmt | Regulation Management use case | rm-title…rm-closing | sky | 80 |

`order_index` 4–10. `week_number = NULL` (specialists aren't weeks). `kicker = 'Playbook'`.

**Seed `academy_questions` — 6 questions per playbook (42 total).** Each question targets the slide's coach point (definition, why-it-matters, key differentiator, objection handling, one-line message, discovery question). Owner can edit later via Admin dashboard. Authored to match the locked terminology rules already in memory.

### 2. Unlock logic (`useAcademyProgress.ts`)

`isModuleUnlocked` becomes track-aware:

- **Core modules** — keep current linear chain (Week 2 needs Week 1 passed, Week 3 needs Week 2 passed).
- **Specialist modules** — always unlocked. No gating.

Add helpers:

- `getCoreModules(modules)` / `getSpecialistModules(modules)`
- `hasMasterCert(modules, progress)` — true when every core + every specialist module is passed.
- `getEarnedCerts(modules, progress)` — list of `{ specialty, title, passed_at }` plus the implicit Core cert.

### 3. AcademyHome split

Top section unchanged: progress bar + 3 core week cards.

New section **"Specialist Playbooks"** below it:

- 7 cards in a 3-column grid using accent colors.
- Each card: Playbook badge (with accent), estimated minutes, learning goal, Passed / Not started / Best % chip.
- Buttons: **Start lesson** → `/academy/m-signals`, **Take quiz** → `/academy/m-signals/quiz`.
- A "Master Certification" banner above specialists shows progress (e.g. `3 / 7 playbooks passed`) and becomes a CTA once all 10 are complete.

### 4. Lesson rendering — slideRegistry expansion

`ModuleLesson.tsx` already renders any module by walking `slide_ids` through `SLIDE_REGISTRY`. We extend `SLIDE_REGISTRY` to include every playbook slide component (signals-slides, dtop-slides, insights-slides, automation-slides, mobile-slides, platform-slides, regulation-management-slides — all already exist). No new slide authoring required; we re-use the playbook decks.

Where the playbook pages today use anonymous slide IDs internally, we mirror those IDs into the registry. A short audit per playbook will lock in the canonical id list, then those arrays are seeded into `academy_modules.slide_ids`.

### 5. Quiz flow — already works, no changes

`ModuleQuiz.tsx` calls `get_module_quiz(_module_id)`. `submit_quiz_attempt(_module_id, _answers)` writes to `academy_attempts`. Both are module-agnostic — passing `m-signals` etc. just works once questions are seeded.

### 6. Certificates

`Certificate.tsx` becomes a hub:

- **Specialist certs** route: `/academy/certificate/:specialty` — same template, accent-coloured, names the playbook (e.g. *"Signals Specialist — Comply365 Sales Enablement Academy"*).
- **Core cert** route: `/academy/certificate/core` — current 3-week cert, retitled "Sales Enablement Certificate".
- **Master cert** route: `/academy/certificate/master` — premium variant (gold accent, seal mark), lists every track earned. Only renders if `hasMasterCert` is true; otherwise shows progress and what's left.
- `/academy/certificate` (current) becomes an index showing all earned certs as printable cards.

### 7. Admin dashboard

`AdminDashboard.tsx` already CRUDs modules and questions. We just add a track filter (Core / Specialist) and surface the new `specialty` field so quiz authors can edit playbook question banks.

### 8. Memory update

Append to `mem://content/sales-enablement/coach-script-standard`:

> **Specialist tracks (May 2026):** Academy is two-tier — Core (m-w1, m-w2, m-w3, linear) + Specialist Playbooks (m-signals, m-dtop, m-insights, m-automation, m-mobile, m-platform, m-regmgmt, open in any order). Master Certification awarded when all 10 are passed. Specialists re-use the existing playbook slide decks; no new lesson authoring — only quiz banks.

### Files touched

- `supabase/migrations/<new>.sql` — add columns, seed 7 specialist modules + 42 quiz questions.
- `src/hooks/useAcademyProgress.ts` — track-aware unlock + helper selectors.
- `src/components/academy/slideRegistry.ts` — register all playbook slide components.
- `src/pages/academy/AcademyHome.tsx` — two-section layout + master cert banner.
- `src/pages/academy/Certificate.tsx` — split into index / core / `:specialty` / master.
- `src/pages/academy/AdminDashboard.tsx` — track filter, specialty field.
- `src/App.tsx` — new certificate routes.
- `mem/content/sales-enablement/coach-script-standard.md` — append the rule above.

### Out of scope for this pass (call-outs)

- **Coach narration for playbook slides** — Academy will render the visual decks; written coach scripts in `salesEnablementNarration.ts` for each playbook slide are a follow-up. The framework supports it once authored.
- **Per-playbook recap/cheat-sheet slides** — not added; the existing playbook closing slides cover the talk track.
- **Importing existing reviewer comments onto specialist slides** — already works automatically because `slide_comments` is keyed by `slide_id`.

Roughly 3–4 hours of build work; the heaviest part is authoring 42 quiz questions to the locked terminology standard.
