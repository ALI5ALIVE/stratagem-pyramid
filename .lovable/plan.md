## Goal
Align the Sales Enablement Academy with the deck's 3-week structure (Week 1 Foundation, Week 2 Capabilities, Week 3 Sell & Win). Today the deck is 3 weeks but the Academy is still 6 standalone modules with the now-forbidden "90-day pilot" wording.

## Target structure

```text
Week 1 · Foundation       (was M1 + M2)   — 15 slides-equivalent, ~10 min, 10 Qs
Week 2 · Capabilities     (was M3)        — 10 slides,            ~7 min,  5 Qs
Week 3 · Sell & Win       (was M4+M5+M6)  —  7 slides,            ~10 min, 15 Qs
```

The deck's `slides.tsx` already maps to these weeks via `weekProps`. We mirror that in the DB so Academy cards, lesson scroller, and quizzes match exactly.

## Database changes (migration)

Schema additions on `academy_modules`:
- `week_number int` (1–3) — drives ordering and labels.
- `accent_color text` — D-blue / O-violet / P-emerald for the three weeks (so cards visually match deck dividers).
- Keep `module_number` for backward-compat but stop relying on it; `order_index` becomes `week_number`.

Data migration — wrap in a single transaction:

1. Insert 3 new rows: `m-w1`, `m-w2`, `m-w3` with consolidated `title`, `learning_goal`, `estimated_minutes`, `slide_ids` taken from `weekProps` in `SalesEnablement.tsx`.
2. Re-point existing `academy_questions` to the new module ids: m1+m2 → m-w1, m3 → m-w2, m4+m5+m6 → m-w3. Renumber `order_index` so each new module has Qs 1..N.
3. Re-point existing `academy_attempts.module_id` to the new module ids (preserves user progress). A user who passed both M1 and M2 will be treated as having attempted w1; we'll set `passed = (m1.passed AND m2.passed)`, `best_score = min(m1.best_score, m2.best_score)` via a one-time UPDATE. Same logic for w2 (m3 only, straight copy) and w3 (m4+m5+m6 → min/AND).
4. Delete the 6 original rows from `academy_modules` last.

`get_module_quiz` and `submit_quiz_attempt` need no signature change — they already key on `module_id text`.

## Module 6 wording fix

Already handled by the consolidation: the new `m-w3.learning_goal` will read "By the end of Week 3 you can run discovery → demo → close, pick the right use case, handle the top objections, and end on a focused DTOP walkthrough on the customer's highest-cost use case." — no "pilot" language.

## Frontend changes

`src/pages/academy/AcademyHome.tsx`
- Header copy: "Six 5-minute modules" → "Three week-long modules. Watch each, then pass the quiz."
- Card label "Module {n}" → "Week {week_number} · {kicker}" (Foundation / Capabilities / Sell & Win).
- Use `accent_color` for the chip background.

`src/pages/academy/ModuleLesson.tsx`
- "Module {n} of 6" → "Week {week_number} of 3 · {kicker}".

`src/hooks/useAcademyProgress.ts`
- Extend `AcademyModule` type with `week_number`, `accent_color` (optional).
- `isModuleUnlocked` keeps the order_index gate logic.

`src/components/academy/slideRegistry.ts` — no change (slide ids unchanged).

`src/pages/academy/Certificate.tsx` — verify wording (will read after migration), update any "6 modules" copy to "3 weeks".

## Out of scope
- Quiz question content itself stays as written (15 Qs per week is fine; we can prune later if the user wants shorter weekly quizzes).
- The Sales Enablement deck (`/sales-enablement`) — already aligned to 3 weeks.
- Admin dashboard analytics — will keep working, just shows 3 modules instead of 6.

## Risks / notes
- Users mid-way through M2/M4/M5 will see their attempt history collapsed into the new week module. Their best week score is the **minimum** of the original module scores so we never claim they passed something they didn't.
- The consolidation is destructive on the 6 module rows but academy_attempts are preserved (just re-pointed), so the audit trail survives.

## Files touched
- New migration (schema + data)
- `src/hooks/useAcademyProgress.ts`
- `src/pages/academy/AcademyHome.tsx`
- `src/pages/academy/ModuleLesson.tsx`
- `src/pages/academy/Certificate.tsx` (if it hardcodes "6")
- `mem://content/sales-enablement/coach-script-standard.md` — note the Academy is now also 3 weeks in the DB.
