
## Sales Enablement Academy

Convert the existing single-scroll Sales Enablement deck into a structured **6-module learning portal**. Each module is a focused ~5-minute lesson built from the slides already in `SalesEnablement.tsx`, followed by a short multiple-choice **competency quiz** that the rep must pass to mark the module complete. All progress is tied to a logged-in user and visible to managers in an admin view.

The existing `/sales-enablement` deck is preserved as the "full presentation" view. The new portal lives at `/academy`.

---

### What the rep experiences

```
/academy                  → Module landing page (6 cards, progress ring per module)
/academy/m1               → Module 1 lesson view (focused subset of slides, ~5 min)
/academy/m1/quiz          → 5-question quiz, must score ≥80% to pass
/academy/m1/result        → Pass/fail, retry button, next module CTA
... m2 … m6
/academy/certificate      → Issued when all 6 modules passed
```

- Login required. Unauthenticated users redirected to `/auth` then back.
- Modules unlock sequentially (M2 unlocks once M1 passed). Override flag for managers.
- A persistent header strip shows: module N of 6 · est. 5 min · "Mark complete & take quiz".
- Quiz: 5 multiple-choice questions per module, randomized order, 80% pass mark, unlimited retries (each attempt logged).
- On full completion: simple printable certificate page with rep name + date.

### What the manager (owner role) experiences

- New `/academy/admin` page (gated by `has_role(uid,'owner')`).
- Table of all reviewers: name · modules passed (e.g. 4/6) · last activity · best score per module · attempts.
- Drill-down: per-rep timeline of attempts, per-module question-level pass rate (so managers can see which questions everyone fails — a signal the content needs work).

---

### The 6 modules (5 min each)

Built from slides already present in `SalesEnablement.tsx`. The existing `SEModuleDivider` content is repurposed as each module's intro card.

| # | Title | Lesson slides (reused) | Quiz focus |
|---|---|---|---|
| **M1** | Why this matters: the strategic shift | `TechSlide1StrategicShift`, `TechSlide2IndustryChallenge` | Industry pain, the shift from fragmentation to platform |
| **M2** | What the platform is, in plain English | `TechV4PlatformOverview`, `PFSlide9Value`, `SERecapSlide` | One-sentence pitch, the four capability bands |
| **M3** | How the capabilities fit together | The 8 capability slides + `SELayerTalkTrack` | Naming each capability, 60-second descriptions, discovery Qs |
| **M4** | How we sell it: before/after & maturity | `Slide4Transformation`, `Slide5MaturityCurve` | Before/after framing, where maturity fits the conversation |
| **M5** | Use cases & value through DTOP | `SlideUseCases`, Safety/Ops/Financial UCs, `TechSlideRegulationSummary`, `CustomerOutcomesSlide` | Pick the right UC for the pain, walk D→T→O→P with a metric |
| **M6** | Why we win | `SEObjections`, `TechSlideWhyComply`, `SEClosingForReps` | Top 5 objections, the 3 differentiators, first 7 days |

Each lesson view reuses the existing slide components in a vertical scroll-snap layout (same UX as today, scoped to that module's slides only).

---

### Quiz content (sample seed — first pass)

A starter set of ~30 questions (5 per module) is seeded into the database. Authoring pulls directly from the module learning goals already defined in `moduleProps` and from the playbook data files (`platformPlaybook.ts`, `dtopPlaybook.ts`, etc.). Example for M2:

> Q: Which is NOT one of the four capability bands of the platform?
> A) Core Apps  B) Intelligence & Orchestration  C) Unified Mobile  D) Data Warehouse ✗

Questions are stored in the database (not hardcoded) so they can be edited later without a deploy. An "edit quiz" view for owners is a fast follow — out of scope for this pass.

---

### Technical changes

#### 1. Database (new migration)

Three new tables:

- **`academy_modules`** — `id text PK` (e.g. `'m1'`), `module_number int`, `title text`, `learning_goal text`, `estimated_minutes int`, `slide_ids text[]`, `order_index int`, `created_at`. Seeded with the 6 modules above.
- **`academy_questions`** — `id uuid PK`, `module_id text FK → academy_modules`, `prompt text`, `options jsonb` (array of `{key, label}`), `correct_key text`, `explanation text`, `order_index int`. Seeded with 5 starter questions per module (30 total).
- **`academy_attempts`** — `id uuid PK`, `user_id uuid`, `module_id text`, `score int` (0–100), `passed boolean`, `answers jsonb` (`[{question_id, chosen_key, correct}]`), `started_at`, `completed_at`. One row per quiz attempt.

RLS:
- Reps: read own attempts; insert own attempts. Read all `academy_modules` and `academy_questions` (questions table excludes `correct_key` from the rep client by using a SECURITY DEFINER RPC `submit_quiz_attempt(module_id, answers jsonb)` — keys are evaluated server-side and never sent to the browser).
- Owners: select all attempts (for admin view), update modules/questions.

A view `academy_progress_per_user` aggregates best score per (user, module) for fast admin rendering.

#### 2. Quiz delivery — server-graded

Critical: never send `correct_key` to the client. Pattern:

- Client fetches questions via RPC `get_module_quiz(module_id)` which returns `id`, `prompt`, `options` only.
- Client posts answers to RPC `submit_quiz_attempt(module_id, answers)` which:
  1. Loads `correct_key` server-side
  2. Computes score, passed (≥80%)
  3. Inserts row into `academy_attempts`
  4. Returns `{score, passed, per_question: [{id, correct, explanation}]}` so the result page can show what was right/wrong.

#### 3. New routes & pages

- `src/pages/academy/AcademyHome.tsx` — module grid with per-module status (locked/in-progress/passed), uses `academy_progress_per_user`.
- `src/pages/academy/ModuleLesson.tsx` — wraps a subset of existing slides in scroll-snap container (extracted shared layout from `SalesEnablement.tsx`).
- `src/pages/academy/ModuleQuiz.tsx` — fetches questions, renders one question at a time, posts to `submit_quiz_attempt`.
- `src/pages/academy/QuizResult.tsx` — pass/fail + per-question feedback + Retry / Next module CTAs.
- `src/pages/academy/Certificate.tsx` — printable summary when all 6 passed.
- `src/pages/academy/AdminDashboard.tsx` — owner-only table of users × modules with attempts drill-down.

All routes registered under `<Route path="/academy">` in `src/App.tsx` inside `<AppLayout>`. Auth guard wrapper component `RequireAuth` redirects to `/auth?next=…`.

#### 4. Sidebar + Home updates

- Sidebar **Sales Enablement** group gains a second item: **Academy** (`/academy`, `GraduationCap` icon). Existing "Sales Enablement Training" entry stays as the full deck.
- HomePage **Sales Enablement & Training** section gains an "Academy" card alongside the existing one.

#### 5. Shared lesson layout

Extract the scroll-snap container + keyboard nav from `SalesEnablement.tsx` into `src/components/academy/LessonScroller.tsx` so both the full deck and per-module lessons share the same UX. The existing `/sales-enablement` page is refactored to use it.

#### 6. Quiz UX details

- Single question per screen, 4 options (radio), Next button disabled until selection.
- Progress bar (Question 3 of 5).
- No back navigation mid-quiz (prevents look-ahead). Final review screen before submit.
- Result screen shows score, pass threshold (80%), per-question correct/incorrect with explanation, and either "Retry" (if failed) or "Next module" (if passed).
- Attempts are unlimited but every attempt is logged so managers see if someone retried 8 times.

#### 7. Admin analytics

`AdminDashboard.tsx` queries:
- `academy_progress_per_user` for the user × module matrix.
- `academy_attempts` aggregated for attempts-per-question pass rate (highlights questions everyone fails).

Simple table UI built from existing `Card` / `Table` shadcn components. CSV export button (client-side, no extra deps).

---

### Files

**NEW**
- `supabase/migrations/<timestamp>_academy.sql` — 3 tables + RLS + 2 RPCs + seed
- `src/pages/academy/AcademyHome.tsx`
- `src/pages/academy/ModuleLesson.tsx`
- `src/pages/academy/ModuleQuiz.tsx`
- `src/pages/academy/QuizResult.tsx`
- `src/pages/academy/Certificate.tsx`
- `src/pages/academy/AdminDashboard.tsx`
- `src/components/academy/LessonScroller.tsx`
- `src/components/academy/ModuleCard.tsx`
- `src/components/academy/RequireAuth.tsx`
- `src/hooks/useAcademyProgress.ts`

**EDITED**
- `src/App.tsx` (routes)
- `src/components/AppSidebar.tsx` (Academy item)
- `src/pages/HomePage.tsx` (Academy card)
- `src/pages/SalesEnablement.tsx` (use shared `LessonScroller`)

**NOT TOUCHED**
- Existing slide components, playbook data, `/auth`, `/review`.

---

### QA

- Logged-out user visiting `/academy` is redirected to `/auth` then back.
- Logged-in rep sees 6 module cards; only M1 unlocked initially.
- Completing M1 lesson → quiz → ≥80% unlocks M2; <80% allows immediate retry.
- `correct_key` is never present in any network response (verified in DevTools).
- Owner user sees `/academy/admin` link; reviewer does not.
- Admin table shows reviewer × 6-module grid with best scores and attempt counts.
- Refreshing mid-quiz does not double-count attempts (attempt row written only on submit).
- All 6 modules passed → certificate page renders with display name and date.

---

### Open question (please confirm before build)

**Pass mark:** Plan uses **80%** (4/5 correct per module). If you'd prefer 100% (must get all right) or 60% (3/5) say so and we'll adjust. We can also make it configurable per-module in the seed.

If happy with the above, approve and we'll implement.
