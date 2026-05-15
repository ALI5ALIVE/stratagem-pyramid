# Update "Where signals come from" slide + downstream consistency

Replace the 4 cards on the shared signal-sources slide with the user's new categories, and bring the DTOP whiteboard drill and Sales Enablement narration scripts into alignment so all references say "four signal sources" with the same names.

## 1. The slide (`SIGSlide3SignalSources.tsx` — used on Sales Enablement and Signals Playbook)

Replace the 4 current cards (Operations / Content / Safety / Training) with:

| # | Title | Color | Icon | Examples |
|---|---|---|---|---|
| 1 | **Regulation Signals** | sky | `BookCheck` | EASA / FAA / CAA / MoD / ORR rule changes · Airworthiness Directives · IOSA & ISARPs audit updates |
| 2 | **Anomalies** | amber | `AlertTriangle` | Operational data exceedances · Safety reports & near-misses · Audit findings & recurring non-conformities |
| 3 | **Operational Change Requests** | violet | `GitBranch` | Fleet, route & base changes · Procedure / manual revisions · Supplier, MRO & contract changes |
| 4 | **Micro, Macro & Geopolitical Influences** | emerald | `Globe2` | Weather systems & NOTAMs · Fuel pricing & supply shocks · Airspace closures & geopolitical events |

Slide copy:
- **Subtitle** → "Signals live across four very different worlds — regulation, anomalies, operational change, and the world outside. Most operators see them in silos. We connect them."
- **Bottom unlock paragraph** → "A regulation change should rewrite a manual. An anomaly should trigger an investigation and a training nudge. An operational change request should re-baseline both. A geopolitical shift should re-plan the schedule before the day starts. **DTOP** is how that actually happens."

## 2. DTOP whiteboard drill (`SEDtopWhiteboardDrill.tsx`)

- Replace the `signals` array `["Safety Reports", "Operational Data", "Maintenance", "Crew Logs", "Regulatory", "Audit"]` with the new four: `["Regulation", "Anomalies", "Op Change Requests", "Macro / Geo Influences"]`.
- Update Stroke 6 narration line: "These four are the signal sources we listen to."
- Update the SVG chip layout to fit 4 chips cleanly under the Detect box (was 6).

## 3. Whiteboard runbook (`SEDtopWhiteboardRunbook.tsx`)

- Stroke-6 reference and discovery question updated: "Which of these four signal sources is hardest for you to reach right now?"
- "6 signal chips" wording → "4 signal chips" wherever it appears.

## 4. Sales Enablement nav label (`SalesEnablement.tsx`)

- "W1 · The Six Signal Sources" → **"W1 · Signal Sources"**
- The intro paragraph that says "name the six signal sources behind Detect" → "name the four signal sources behind Detect".

## 5. Narration scripts (`src/data/salesEnablementNarration.ts`)

Three scripts need their "six signal sources" lists rewritten to the new four. Keep tone, length and teaching-format intact:

- **se-slide-signals** — rewrite the "Name them in this order" list to: Regulation, Anomalies, Operational Change Requests, Micro/Macro/Geopolitical Influences. Update the discovery question to "which of these four is hardest for you to act on today?"
- **se-slide-recap-m2** — change "six signal sources" → "four signal sources" and the names.
- **se-slide-dtop** + **se-slide-dtop-whiteboard** + **se-slide-dtop-whiteboard-runbook** — replace each enumeration of the old six names with the new four; replace "six signal chips" with "four signal chips".

Other narrations that say "DTOP" without enumerating the old six are left alone.

## Out of scope

- No changes to `/platform-mockup` Detect row.
- No new images.
- No re-recording of voice audio (script text only — re-generation handled by existing TTS flow on next play).
- No edits to other playbook narrations (`playbookNarrations.ts`, etc.) unless they enumerate the old six explicitly.

## Technical notes

- `signalSources` type in `signalsPlaybook.ts` keeps its shape; only the array contents change. `iconMap` in the slide is rekeyed to the new 4 titles.
- Add `BookCheck`, `AlertTriangle`, `GitBranch`, `Globe2` to the slide's `lucide-react` import; remove the now-unused `Plane`, `FileText`, `ShieldCheck`, `GraduationCap`.
- Whiteboard SVG: redistribute 4 chips across the same horizontal band — wider chips, larger font, balanced spacing.
