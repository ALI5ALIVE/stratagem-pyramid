## Remove "Strategic Shift" slide from Executive Pitch (Medium)

### Change
In `src/pages/ExecutivePitch3.tsx`:
- Remove the slide entry `{ id: "exec3-slide-1", label: "Strategic Shift", component: TechSlide1StrategicShift }` from the `slides` array.
- Remove the now-unused import of `TechSlide1StrategicShift`.

### Notes
- Component file `src/components/tech-slides/TechSlide1StrategicShift.tsx` will be left in place (not deleted) in case it is referenced by exports/PPTX builders or reused elsewhere.
- The deck reorders automatically; subsequent slides shift up by one.
- Narration hook `useExec3PitchNarration` keys by slide id, so removing the entry simply means that id is no longer played — no narration data needs to change.
