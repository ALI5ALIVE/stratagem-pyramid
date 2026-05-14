## Goal

Give reps **per-slide coaching prompts** in the Practice Center so they always have an opener, a few talking points, and sample questions to ask the AI buyer for whichever slide is on screen.

## Where it lives

In `/practice-center`, **inside the left column under the slide stage** (between the slide and the Prev/Next bar, OR as a slim collapsible panel directly beneath the Prev/Next bar).

A new compact card titled **"Prompts for this slide"** that updates as the rep navigates with arrows / Prev / Next. Default **collapsed** so it doesn't distract from delivery; one click expands it. Stays out of the right-hand transcript column so the live conversation isn't crowded.

## What to build

**1. New data file** `src/data/practiceSlidePrompts.ts`

```ts
export interface SlidePrompts {
  opener: string;              // one line the rep can say to land on the slide
  talkingPoints: string[];     // 2–3 short bullets (the message to land)
  buyerQuestions: string[];    // 2–3 questions the rep can ask the buyer to provoke engagement
}
export const practiceSlidePrompts: Record<string, SlidePrompts> = { ... };
```

Keyed by `slide.id` from `execPitch3Slides.ts`. Covers every non-transition slide:

| Slide id | Theme of prompts |
|---|---|
| `exec3-slide-0` | Title — opener line + a "set the room" question |
| `exec3-slide-1` | Strategic Shift — operational gap framing |
| `exec3-slide-outcomes` | Customer Outcomes — proof, named references |
| `exec3-slide-platform` | The Platform — point tools vs unified platform |
| `exec3-slide-dtop` | DTOP — Detect/Trigger/Orchestrate/Prove walkthrough |
| `exec3-slide-mobile` | Unified Mobile — adoption, offline, clicks-per-task |
| `exec3-slide-automation` | Automation — what's automated, human-in-loop boundary |
| `exec3-slide-insights-summary` | Insights · Just Ask — natural-language access |
| `exec3-slide-coanalyst` | CoAnalyst — 90% vs 35% accuracy framing |
| `exec3-slide-tiers-vs-ai` | CoAnalyst vs Generic AI — why generic fails |
| `exec3-slide-insights` | Recommendations & Prescriptive Actions — approval/audit/rollback |
| `exec3-slide-regulation` | Regulation Management — reg change → in-app update |
| `exec3-slide-roadmap-2026` | 2026 Roadmap — POC vs GA, locked dates |
| `exec3-slide-why` | Why Comply365 — three differentiators + next step |

Transition / divider slides (`isTransition: true`) skipped — show a small "Section divider — no prompts" hint.

Content tone: short, conversational, follows existing project terminology (DTOP, CoAnalyst 90% vs 35%, Detect→Trigger→Orchestrate→Prove). Buyer questions are designed to **make the AI buyer talk** so the rep can practise active discovery, not just monologue.

Example for `exec3-slide-coanalyst`:
- **opener**: "This is the slide that separates us from every generic AI demo you've seen this year."
- **talking points**:
  - "Domain-tuned on aviation taxonomy — ICAO, ASR, MOR — not the open web."
  - "~90% accuracy at L4–5 reasoning vs ~35% for generic models on the same prompts."
  - "Tenant-isolated — your operational data never trains anyone else's model."
- **buyer questions**:
  - "Where would you want to point CoAnalyst first — safety reports, ops data, or training records?"
  - "Who in your team is currently being asked to answer questions the data should answer?"
  - "If we benchmarked your current AI tool against CoAnalyst on five of your real questions, would that be useful?"

**2. Update** `src/pages/PracticeCenter.tsx`

- Import `practiceSlidePrompts`
- Add local state `const [promptsOpen, setPromptsOpen] = useState(false)`
- Below the slide-controls bar in the left card, add a collapsible region:
  - Header row with chevron, title "Prompts for this slide", and small slide label
  - When expanded:
    - **Opener** — one line in italic muted card
    - **Land these** — bulleted talking points
    - **Ask the buyer** — bulleted questions, each with a small **Copy** button (uses `navigator.clipboard.writeText`)
  - When current slide is a transition: collapsed body shows "Section divider — no prompts"
- Keyboard: keep arrow-key slide nav. No new shortcut needed.
- Styling: re-use existing `Card`, `Button`, semantic tokens (`text-muted-foreground`, `text-primary`, `border-border/40`). No new colors.

**3. No changes to**
- `practiceScenarios.ts`, `useRoleplaySession`, `buildAgentPrompt`, agent backend
- Slide components or `execPitch3Slides.ts`
- Right-column transcript / scorecard / checklist UI
- Auto-advance / silence-prompt logic

## Out of scope

- No backend changes, no DB tables, no edge function edits
- No per-persona prompt variants in v1 (one prompt set per slide; persona lens already tunes the buyer's reactions)
- No in-call popups or auto-spoken hints — rep opens the panel themselves

## Verification

- Open `/practice-center` → cycle through every slide with arrow keys → prompts panel updates each time
- Copy button on a buyer question writes to clipboard
- Transition slides show the "no prompts" hint instead of an empty card
- No layout shift on the slide stage; panel collapses cleanly
- No regressions in the live AI buyer flow (Start / Next / End / Score)
