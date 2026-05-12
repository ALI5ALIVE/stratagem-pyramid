## Feedback summary

Kathrina (forwarding Yuval) flagged Question 9 in the Foundation quiz (module **m-w1**):

> "Approximately how large is the annual industry exposure we cite for the cost of fragmented operations?" — answer **$25–35B**.

Since the underlying $76.8M / industry-exposure slide was removed from the deck, Yuval couldn't reconcile the quiz with the slide. Kathrina's instruction: **remove the question from the quiz**.

## Change

Single DB delete via migration:

- Delete row `076da2e8-ae08-4c2b-b3e8-cb7e9bf4b8b3` from `public.academy_questions` (module `m-w1`).
- That leaves Foundation with the remaining questions; `get_module_quiz` will simply return one fewer item and the scroller/quiz pages already adapt to `total = questions.length`.

## Out of scope

- No slide/component edits (the source slide is already removed).
- No score/threshold changes — pass mark is a percentage, so the threshold still applies cleanly to the smaller question set.
- No changes to the other two m-w1 questions, which are still consistent with current slides.
