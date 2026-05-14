# Close the loop on Chris's enablement notes

Two remaining cleanups against `SalesEnablement.tsx` and the Week 1 narration.

## 1. Rename module labels to match the 3-week structure

In `src/pages/SalesEnablement.tsx`, every slide label currently uses `M1 …` through `M6 …`. Kathrina + Chris agreed modules should equal weeks (3, not 6). Rename the `label` strings on the existing slide entries so the sidebar reads:

- Week 1 slides (Strategic Shift through Recap): `W1 · …`
- Week 2 slides (Core Apps through Capability Talk Track): `W2 · …`
- Week 3 slides (Discovery through Your enablement plan): `W3 · …`

Also update the `kicker`/`moduleNumber` fields inside `weekProps` so `w1.moduleNumber = 1`, `w2.moduleNumber = 2`, `w3.moduleNumber = 3` (currently they read 2, 3, 4).

No slide IDs change — only display labels and divider numbering. The execPitch mapping pill keeps working because it's keyed on slide IDs.

## 2. Add a Signals teaching slide in Week 1

Chris and Kathrina both flagged Signals as core and wanted it covered early. Today the only Signals reference is one line in the Week 1 recap narration.

Add a new slide between `se-slide-dtop-whiteboard-runbook` and `se-slide-value`:

- `id: "se-slide-signals"` — label `W1 · The Six Signal Sources`
- Component: reuse the existing Signals overview slide from `src/components/signals-slides/` (pick the "what is signals / six sources" slide that already exists; if none fits cleanly, create a small new component `SESignalsPrimer.tsx` that lists the six sources — Safety Reports, Operational Data, Maintenance, Crew Logs, Regulatory, Audit — with a one-line explanation each, using the standard `PitchSlideContainer`).
- Add a matching narration entry in `src/data/salesEnablementNarration.ts` following the 5-part coach-script standard (why it matters, core message, value lever, delivery tip, transition).
- Trim the Signals reference out of the existing `se-slide-recap-m2` narration so we're not repeating it.

Slide count after the change becomes 28; the dynamic `slideCount` on the title pill picks this up automatically.

## Out of scope

- No content changes to Exec Pitch 3, Practice Center, or playbooks.
- No decision yet on whether the standalone Platform Playbook should be folded into other assets — flagging that back to Chris/Kathrina rather than acting unilaterally.

## Verification

- Open `/sales-enablement`, sidebar labels read W1/W2/W3 only.
- Title pill reads "28 slides · 3 weeks · ~50 min".
- Week 1 contains a dedicated Signals slide between the DTOP whiteboard runbook and Value Unlocked, with its own narration.
- Maps-to-Exec-Pitch-3 pill still appears on the original mapped slides.
