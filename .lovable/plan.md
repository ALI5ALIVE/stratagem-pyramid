## Analysis: Discovery-Call Runbook — language & flow improvements

### The core issue you flagged

**Open block, "Say this":**
> "My goal today is to understand where **the loop breaks** for you operationally…"

"The loop" is internal Comply365 jargon (Detect → Trigger → Orchestrate → Prove, "closing the loop"). On a *first* call the customer has no shared definition for it — they'll either nod politely while confused, or mentally translate it as "is he talking about our SMS loop? feedback loop? PDCA?". Either way the rep has burned the opener on a phrase the buyer can't picture.

Same problem repeats in the **Discover** block:
> "…proof your last five actions **closed the loop** — how long?"

By minute 10–35 the rep has *just* framed DTOP, so "closed the loop" is slightly more defensible — but it's still shorthand. A regulator-facing buyer thinks in words like "evidence", "audit trail", "time-to-close", not "loop".

### Other weaknesses in the runbook

1. **Open is rep-centric, not buyer-centric.** "…then I'll know whether what we do is even relevant" makes the call about *us* qualifying *them*. Better discovery openers frame the value *to the buyer* of the next 30 minutes ("…so you walk away with a clear view of where you'd get leverage, even if it isn't us").

2. **Frame block uses unexplained DTOP acronym in the "Say this".** "Most operators we work with are great at Detect — the signals are there. Where it breaks is between Trigger and Prove." If the rep hasn't drawn DTOP on screen yet, "Trigger" and "Prove" land as empty labels. The script should either (a) name DTOP explicitly with a one-line gloss, or (b) use plain-English verbs ("great at spotting issues … breaks down between deciding what to change and proving it landed").

3. **Discover block stacks three questions in one "Say this" cell** separated by "…". Reps will read it as one breath. The cell should be reformatted as a bulleted list of 3 distinct asks, with the instruction "ask one, then go silent for 10 seconds."

4. **Qualify + Next step is solid** but "this side of [date]" is a UK-ism that confuses US buyers — replace with "before [date]".

5. **No "if they push back" branch.** A first-call runbook should give the rep one fallback line for the two most common derailments: "send me a deck first" and "we already have [competitor]". One extra micro-row would make this genuinely field-ready.

6. **Visual density.** All four rows are equal height, but Discover (25 of the 45 minutes) is the heart of the call. Giving it a visually larger row, or a "← 55% of the call lives here" marker, teaches the shape, not just the script.

### Proposed rewrites (verbatim, drop-in)

**Open → Say this:**
> "Thanks for the 30 minutes. My goal is simple — by the end of this call you'll know whether what we do is actually relevant to the problems on your plate, even if the answer is no. To get there I'd like to ask a few questions before I show anything. Fair?"

**Open → Do this:** add — *"Avoid jargon in the first 5 minutes. No 'loop', no 'DTOP', no 'closed-loop compliance'. Earn those words later."*

**Frame → Say this:**
> "Most operators we talk to are strong at *spotting* safety and compliance signals. Where it usually breaks down is the middle bit — deciding what to change, getting that change into manuals and training, and then *proving* to a regulator it actually reached the crew. Does that match what you see?"

**Discover → Say this** (reformat as three bullets, one at a time):
- "When a safety or compliance signal lands on your desk, what actually triggers a procedure or training change?"
- "From that decision to the crew flying or operating the new version — how long, realistically?"
- "If an auditor walked in tomorrow and asked for evidence that your last five corrective actions reached the front line, how long would it take you to produce it?"

**Qualify → Say this:** replace "this side of [date]" with "before [date]".

**New 5th micro-row — "If they push back":**
| 0 min, anytime | Handle | *Do:* Don't fight it. Trade. *Say:* "Happy to send a tailored deck — what's the one use case I should build it around?" / "Totally fair you have [competitor]. What's the one thing you wish it did that it doesn't?" |

### What I'd change in the slide component

Strictly content edits in `SEDiscoveryCallRunbook.tsx`:
- Rewrite the four `say:` strings as above.
- Append the "Avoid jargon" sentence to the Open `do:`.
- Convert Discover `say:` from a single string with "…" separators to an array of 3 questions; render as `<ul>` with `list-disc` so the rep sees three separate asks.
- Add a 5th `blocks[]` entry for the pushback row (neutral slate accent so it reads as a fallback, not part of the main arc).
- Give the Discover row `md:grid-rows-[1.4fr]` or a visible "55% of the call" tag in the time column to signal weight.
- Keep all DTOP / "loop" language **out** of the Open block; it's fine from Frame onward because the rep has just defined it.

No narration script changes needed unless you also want the voiceover updated — flag if so.

### Out of scope
- Audio re-generation
- Changes to other W3 slides
- Any backend / data changes