## Goal

Give every pitch deck a complete set of voice-over narration scripts that double as **sales-coach speaker notes** — so a rep can play them through the existing TTS bar to learn how a best-in-class seller delivers the deck, and read them on-screen while rehearsing.

## Coverage Audit

| Deck | Route | Narration today | Action |
|---|---|---|---|
| Short — Customer Overview | `/customer-overview` | None | **Add** narration + speaker-notes panel |
| CEO Overview (Exec Pitch 2) | `/pitch-executive-2` | `executivePitch2Narration.ts` ✅ | Per user instruction: **skip / leave as-is** |
| Medium — Executive Pitch | `/pitch-executive-3` | Partial (uses `executivePitchNarration.ts`) | **Fill gaps** + speaker-notes panel |
| Long — Technical Deep Dive | `/pitch-technical-v4` | `technicalPitchNarration.ts` (most slides) ✅ | **Fill missing v4 slides** + speaker-notes panel |
| Operational Pitch | `/pitch-operational` | `operationalPitchNarration.ts` ✅ | Add speaker-notes panel only |
| CoAnalyst Playbook | `/coanalyst` | `coanalystNarration.ts` ✅ | Add speaker-notes panel only |

## What "Sales-Coach Speaker Notes" Means

Each script is rewritten / authored to a single tight standard so it works **both** as audio and as on-screen rehearsal copy:

1. **Open with the slide's purpose** in one sentence ("This slide is where you anchor the cost of fragmentation…").
2. **Talk track** — what the rep actually says (60–120 sec per slide, conversational, first-person).
3. **Land the proof point** — the one stat or phrase the rep must not paraphrase (e.g. "~90% domain accuracy vs ~35% generic AI").
4. **Transition line** — the bridge into the next slide.

All scripts respect locked memory rules: no FOQA/FDM/ASAP, BrandNumber product naming, canonical DTOP color story, locked roadmap dates, canonical accuracy headline.

## Technical Changes

### 1. New / extended narration data files
- **`src/data/customerOverviewNarration.ts`** *(new)* — 10 slides for `/customer-overview`, IDs `co-slide-0` … `co-slide-9`, plus a `getCustomerOverviewNarration(slideId)` helper.
- **`src/data/executivePitchNarration.ts`** *(extend)* — add the missing slides for `/pitch-executive-3` (the medium deck reuses some IDs but currently only covers `exec-slide-0` … `exec-slide-7`; add IDs for the additional medium-deck slides like DTOP, 5-layer architecture, persona outcomes, why-us closer).
- **`src/data/technicalPitchNarration.ts`** *(extend)* — add narration for the v4-only slides not yet covered (`tech-v4-platform-overview`, `tech-v4-slide-4a/4b/4c`, `tech-v4-slide-5-dtop`, `tech-v4-slide-7-coanalyst`, `tech-v4-automation`, `tech-v4-insights`, `tech-v4-mobile`, `tech-v4-intelligence-substrate`, `tech-v4-tiers-vs-ai`).

### 2. New shared component: `SpeakerNotesPanel`
- **`src/components/shared/SpeakerNotesPanel.tsx`** *(new)*
  - Floating, collapsible panel (bottom-left, mirrors the narration bar's glassmorphism style — see `mem://ui/narration-control-bar`).
  - Props: `script: string`, `title: string`, `slideNumber?: number`.
  - Default: collapsed (just a "Speaker Notes" pill). Expanded: scrollable card showing the current slide's full script with the proof point highlighted.
  - Toggleable via keyboard (`N` key) and a button.
  - Hidden in print/PPTX export modes (uses existing `print:hidden` class pattern).

### 3. Wire panel into deck pages
- **`src/pages/CustomerOverview.tsx`** — add `SpeakerNotesPanel` driven by current slide + new hook `useCustomerOverviewNarration` (clone of `useOpsPitchNarration`).
- **`src/pages/ExecutivePitch3.tsx`** — add `SpeakerNotesPanel` reading from `executivePitchNarration`.
- **`src/pages/TechnicalDeepDiveV4.tsx`** — add `SpeakerNotesPanel` reading from `technicalPitchNarration`.
- **`src/pages/OperationalPitch.tsx`** — add `SpeakerNotesPanel` reading from `operationalPitchNarration`.
- **`src/pages/CoAnalystDeck.tsx`** — add `SpeakerNotesPanel` reading from `coanalystNarration`.

### 4. New hook
- **`src/hooks/useCustomerOverviewNarration.ts`** — same shape as `useOpsPitchNarration`, calls the existing `elevenlabs-tts` edge function, no backend changes needed.

### 5. No backend / DB / secrets changes
The existing `supabase/functions/elevenlabs-tts` function is reused as-is. `ELEVENLABS_API_KEY` is already configured. No migrations.

## Out of Scope (per user instruction)
- CEO Overview deck (`/pitch-executive-2`) — narration left untouched.
- No changes to Sales Enablement Academy modules (those have their own quiz-driven flow).
- No changes to playbook capability pages (Insights, Automation, Mobile, DTOP, Platform, Regulation Mgmt) — those are reference material, not pitch decks.

## Memory Updates
Add one new memory file:
- `mem://content/pitch-decks/speaker-notes-standard` — defines the 4-part script format (purpose / talk track / proof point / transition) and the rule that every pitch deck slide must have a matching narration entry.

## Acceptance Criteria
- Every slide on the four in-scope decks has both a TTS-playable script and a visible speaker-notes panel.
- All scripts comply with terminology, naming, color, accuracy and roadmap memory rules.
- Panel collapses cleanly, doesn't overlap the narration bar, and is hidden from PDF / PPTX exports.
- CEO Overview deck is unchanged.
