I reviewed the current `/customer-overview` deck and the shared numbering setup. The remaining issue is caused by reused slide components that still hardcode their original playbook number, so the deck-level `slideNumber={index}` does not always win. The clearest example in the current Customer Overview deck is `PFSlide9Value`, which always renders `09` even though it is slide 5 in this deck.

Plan to fix it:

1. Make reused slide components respect deck-level numbering
   - Update `PFSlide9Value` so it accepts `slideNumber?: number` and passes that value into the slide container instead of hardcoding `9`.
   - Preserve its existing standalone Platform Playbook behavior by defaulting to `9` only when no dynamic number is provided.

2. Harden the shared slide containers
   - Update `SlideContainer` to render `00` correctly when `slideNumber={0}` is provided. It currently uses a truthy check, so title slides numbered `0` can disappear.
   - Keep `PitchSlideContainer` behavior aligned, since it already supports `0` correctly.

3. Review the affected decks after the fix
   - Verify `/customer-overview` renders footer numbers in exact order:
     - 00 Title
     - 01 The Reality Today
     - 02 The Strategic Shift
     - 03 The Platform
     - 04 Before vs After
     - 05 The Value You Unlock
     - 06 Use Cases in Action
     - 07 Regulation Management
     - 08 Customer Outcomes
     - 09 Your Maturity Roadmap
     - 10 Your First 90 Days
   - Re-check the recently edited `/pitch-executive-3` sequence to confirm no reused component overrides the dynamic number there.
   - Re-check the main Strategy deck for the one remaining mismatch in narration props on the final slide while keeping visible numbering accurate.

Technical changes:

- `src/components/platform-slides/PFSlide9Value.tsx`
  - Destructure `slideNumber` from props.
  - Pass `slideNumber={slideNumber ?? 9}` to `SlideContainer`.

- `src/components/slides/SlideContainer.tsx`
  - Change the footer number guard from `slideNumber && ...` to `slideNumber !== undefined && ...`.

- Optional cleanup if confirmed during implementation:
  - Correct any remaining sequencing mismatch in `src/pages/SlideDeck.tsx` where slide number and narration index are out of sync for the conclusion slide.

No backend/database changes are needed.