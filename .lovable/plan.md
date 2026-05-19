
## Week 2 alignment audit

I cross-checked four sources of truth for Week 2 of the Sales Enablement Academy:

1. **Live deck** — `src/pages/SalesEnablement.tsx` (Week 2 = 14 slides between `se-week-2` and `se-week-3`)
2. **Learning goal & "up next"** — `weekProps.w2` in the same file
3. **Narration** — `src/data/salesEnablementNarration.ts`
4. **Academy module + quiz** — DB rows `academy_modules.m-w2` and `academy_questions` for that module

### What's already aligned

- All 14 Week 2 slides have narration entries (incl. the new `se-w2-capstone-whiteboard`).
- `weekProps.w2.upNext` and `learningGoal` match the slide order in the deck.
- Narration follows the 5-part coach-script standard, uses approved terminology ("Intelligence Layer", "Operational Data", no FOQA/FDM/ASAP, ~90% vs ~35% headline only on the Generic-AI slide).

### What's misaligned

**A. Academy module `m-w2.slide_ids` is stale** (DB). Currently:

```text
se-slide-4a, se-slide-4b, se-slide-4c,
se-slide-coanalyst, se-slide-insights, se-slide-automation,
se-slide-tiers-vs-ai, se-slide-mobile, se-slide-talktrack
```

Problems:
- Includes `se-slide-4a/4b/4c` (SafetyManager365 / ContentManager365 / TrainingManager365 deep dives) — those are no longer part of Week 2 in `SalesEnablement.tsx`.
- Missing 7 Week 2 slides: `se-week-2-overview`, `se-platform-insights-intelligence`, `se-platform-wide-intelligence-usecases`, `se-slide-coanalyst-usecases`, `se-slide-insights-usecases`, `se-slide-automation-usecases`, `se-slide-regmgmt`, `se-w2-capstone-whiteboard`.
- Result: when a rep opens the Academy lesson for Week 2, they see the old Core-Apps content, not the Capabilities flow that Weeks 2 actually teaches.

**B. Quiz tests the wrong content** (DB). All 5 questions test:
- SafetyManager365, ContentManager365, TrainingManager365 definitions (Core Apps — Week 1 / specialist playbooks, not Week 2)
- "How is **CoAnalyst** different…" — uses the legacy "CoAnalyst" name (memory: never use in user-facing copy; use "Intelligence Layer")
- One Mobile discovery question

None of the questions assess what Week 2 actually teaches: the platform map, the three platform-wide intelligence use cases, the Intelligence-Layer-vs-Generic-AI ~90/~35 headline, Recommendations vs Automation, Regulation Management as end-to-end proof, the capability talk track, or the DTOP-loop capstone.

## Proposed changes

### 1. Sync `academy_modules.m-w2.slide_ids` (DB migration)

Replace with the 14 live Week 2 slide ids in deck order:

```text
se-week-2-overview,
se-platform-insights-intelligence,
se-platform-wide-intelligence-usecases,
se-slide-coanalyst,
se-slide-coanalyst-usecases,
se-slide-insights,
se-slide-insights-usecases,
se-slide-automation,
se-slide-automation-usecases,
se-slide-tiers-vs-ai,
se-slide-regmgmt,
se-slide-mobile,
se-slide-talktrack,
se-w2-capstone-whiteboard
```

Also bump `estimated_minutes` from current value to match `weekProps.w2.estimatedMinutes` (16) and update `title` if needed to match deck wording.

**Note:** All 14 ids already exist in `SLIDE_REGISTRY` (`src/components/academy/slideRegistry.ts`) except the new ones added during the W2 refactor. I will verify and add any missing entries (likely `se-week-2-overview`, `se-platform-insights-intelligence`, `se-platform-wide-intelligence-usecases`, `se-slide-coanalyst-usecases`, `se-slide-insights-usecases`, `se-slide-automation-usecases`, `se-w2-capstone-whiteboard`) so the LessonScroller can render them.

### 2. Rewrite the Week 2 quiz (DB migration)

Delete the 5 stale questions and replace with 6 new questions that map 1:1 to Week 2 learning outcomes. All wording uses approved terminology ("Intelligence Layer", never "CoAnalyst"; "Recommended Actions" not autonomous; POC vs production dates honest).

| # | Tests | Right answer (b in every option set) |
|---|---|---|
| 1 | Platform map / four bands | "Three Core Apps, an Intelligence & Orchestration layer, one Unified Mobile shell, all wired by DTOP" |
| 2 | What only the platform-wide Intelligence & Insights layer can answer | "Cross-domain questions like 'are DG incidents linked to training gaps' — no single Core App can answer this" |
| 3 | Intelligence Layer vs Generic AI — the canonical headline | "~90% domain accuracy on aviation operational questions vs ~35% for generic AI on the same data" |
| 4 | Recommendations vs Automation positioning | "Insights surfaces patterns, Recommendations proposes prioritised next actions with evidence, Automation closes deterministic loops with a human in the loop" |
| 5 | Regulation Management as the end-to-end proof case | "When a regulator publishes a change, the platform identifies affected procedures and training, drafts redlines for human review, and pushes updates with auditable receipt" |
| 6 | DTOP capstone — the W2 one-sentence outcome | "One use case, every capability, one DTOP loop — closed in days, not weeks" |

Each question gets 4 options (a/b/c/d), `correct_key='b'` randomised by the quiz UI, and an `explanation` referencing the Week 2 slide it came from so reps see where to revise on a wrong answer.

### Out of scope

- No changes to slide components themselves (the deck is correct).
- No changes to narration (already aligned with the new flow).
- No changes to Weeks 1 or 3 content or quizzes.

### Technical details

- DB writes: single migration with one `UPDATE academy_modules` and a `DELETE`+`INSERT` on `academy_questions` for `module_id='m-w2'`.
- Code: only `src/components/academy/slideRegistry.ts` needs new entries for the Week 2 slides that aren't already registered.
- No type changes; `academy_modules.slide_ids` is a `text[]` and `academy_questions.options` is `jsonb` — both schema-compatible.
