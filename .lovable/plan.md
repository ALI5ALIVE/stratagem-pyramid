

# Rewrite Executive Pitch Narration — COO-Level, Under 4 Minutes

## Current State
The existing 8 scripts total ~2,100 words. At TTS pace (~160 wpm), that's ~13 minutes — far too long. Several slides meander, repeat points, and lack a clear COO thread.

## Design Principles
- **Target**: ~600 words total (~3:45 at TTS pace), leaving breathing room under 4 minutes
- **Voice**: Confident, direct, peer-level — speaking to someone who runs the operation
- **Thread**: "Your operation leaks value through disconnected signals. We close the loop."
- **Arc**: Hook (signals are leaking) → Cost (quantified pain) → Shift (industry is moving) → Mechanism (DTOP) → Platform (how it's built) → Intelligence (why ours is different) → Value (COO outcomes) → Close (next step)
- **COO lens**: Schedule protection, operational predictability, crew readiness, cost avoidance — not compliance jargon

## Revised Scripts (8 slides, ~75 words each)

### Slide 0 — Title (~12s)
"Your operation generates thousands of signals every day. Most never reach the right person in time. In four minutes, I'll show you how leading carriers are turning those signals into predictable operational performance — and what that's worth to your bottom line."

### Slide 1 — The $47M Problem (~30s)
"Forty-seven million dollars. That's what operational fragmentation costs a mid-size carrier every year. Not one catastrophic event — thousands of small disconnections. A go-around that wasn't prevented because training never saw the safety signal. An aircraft grounded because a compliance gap wasn't flagged. These aren't hypotheticals. They're line items hiding across your P&L. The carriers closing these gaps are fundamentally changing their cost structure."

### Slide 2 — The Shift (~25s)
"The industry is shifting from managing compliance to managing performance. Regulators now expect proof that when a signal was detected, the right action followed and the outcome improved. Your competitors who make this shift first don't just get safer — they get more predictable. Fewer disruptions, faster recovery, better crew readiness. For a COO, that's the difference between reacting to yesterday and controlling tomorrow."

### Slide 3 — The New Operating Model (~30s)
"We call it Detect, Trigger, Orchestrate, Prove. Detect — your systems listen continuously across FOQA, safety, and ops data. Trigger — the right workflow fires automatically, no email chains. Orchestrate — training, procedures, and compliance move together, not in sequence. Prove — every action logged, audit-ready by default. One example: a hard landing trend detected Tuesday, affected crews retrained by Thursday, repeat events down seventy-eight percent. That's the loop."

### Slide 4 — The Platform (~25s)
"This loop is powered by three applications working as one. Safety Manager detects the signals. Content Manager orchestrates the procedural response. Training Manager ensures crew readiness before the next event. And CoAnalyst — our intelligence layer — connects all three, transforming sixty-five thousand monthly data points into decisions you can act on. One platform. One version of truth."

### Slide 5 — Intelligence Layer (~25s)
"Here's why this matters. Generic AI gives you thirty-five percent accuracy on aviation queries. It can't distinguish a bird strike report from a bird strike trend. CoAnalyst delivers over ninety percent — trained on ten years of aviation operational data. That precision gap is the difference between intelligence that drives action and noise that wastes your safety team's time."

### Slide 6 — Line of Sight (~25s)
"Every signal connects to an outcome you own. Go-around trends detected and addressed within forty-eight hours — that's schedule protection. Procedure gaps closed before the audit — that's regulatory confidence. Crew retrained before the next rotation — that's operational readiness. For a mid-size carrier, the total cost avoidance exceeds forty million dollars annually. We can model this with your numbers."

### Slide 7 — Why Comply365 (~15s)
"Connected foundation — one version of truth. Embedded intelligence — built in aviation, not bolted on. Proof by default — always audit-ready. Let's schedule thirty minutes to map your operational signals to measurable outcomes."

## Total: ~580 words, ~3:40 at TTS pace

## Technical Change
Single file edit: `src/data/executivePitchNarration.ts` — replace all 8 `script` values with the revised copy above. Also update Slide 3 title from "How It Works — DTOP" to "The New Operating Model".

