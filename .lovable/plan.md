# Strategy & Vision Session microsite — review & upgrade plan

## What's working

- **Strong spine.** Hero → why → differentiators → agenda → DTOP loop → maturity curve → room → deliverables → logistics → CTA is the right narrative for an exec audience.
- **DTOP loop preview** and **maturity curve** are visually distinctive and reinforce the playbook language without feeling like a product demo.
- **Agenda timeline** with DTOP color coding is genuinely premium and scannable.
- **Tone** has shifted from internal coaching to customer-facing in most places.
- **Visual system** matches the rest of the brand (Space Grotesk/Inter, dark, DTOP tokens).

## What's holding it back from "world class"

1. **Hero works too hard, says too little.** "The Strategy & Vision Session" is a label, not a promise. The subline ("tickets and renewals") sounds like an internal sales objection, not a customer hook. No emotional pull, no contrast.
2. **No "what's in it for me" by role.** A CEO, COO, Head of Safety, and IT lead all read the same page today. They need a single card each that says *why this is worth 3 hours of your calendar*.
3. **No trust signals.** No logos, no quote, no facilitator credibility. A complimentary 3-hour exec session needs proof someone serious is in the room.
4. **"Most start here" L2 marker** is presumptuous — it pre-judges the customer before the session. Should be reframed as "where most of the industry sits" with a source, or removed.
5. **No "how to prepare"** block. Execs want to know what's expected of them before they say yes.
6. **No FAQ.** Common objections (Is this a sales pitch in disguise? Who facilitates? What happens with our data? What if we're not ready?) go unanswered.
7. **Agenda blocks lack an explicit "outcome"** line. Each block should end with "You leave this block with…".
8. **Closing CTA is single-channel** (mailto). No calendar link, no fallback, no urgency.
9. **No "Not for you if…" honesty block.** Counter-intuitively raises trust.

## Title / copy direction

Keep **"The Strategy & Vision Session"** as the product name — it's already used internally and on the slide. Don't rename it to "From silos to signals". But **use "From silos to signals" (or similar) as the eyebrow promise above the H1**, so the hero reads like:

```
Eyebrow:   FROM SILOS TO SIGNALS · COMPLIMENTARY · 3 HOURS
H1:        The Strategy & Vision Session
Subline:   Three hours with your leadership team to map where your
           operation sits today — and what predictive, performance-
           based oversight looks like for you in the next twelve months.
```

Other copy tightening:
- Remove "tickets and renewals" framing (internal-sounding).
- "It's the conversation your CEO, COO, and Head of Safety should be having together" → keep, but move to the persona band where it pays off.
- "Most start here" pill on the maturity curve → replace with neutral "Industry median (IATA, 2024)" or remove.
- "Not a vendor pitch" headline → keep, it's the single best objection-handler on the page.

## The improvement plan

### 1. Hero rewrite (no structural change)
- Add eyebrow promise line above the existing eyebrow ("From silos to signals").
- Rewrite subline (above).
- Add a small **third CTA**: "Download the 1-page overview (PDF)" using the existing fieldKitPdf hook — gives non-ready buyers a takeaway.

### 2. NEW — "What's in it for you" persona band (after differentiators, before agenda)
Four cards, one per persona, each with: role, icon, one-line promise, three concrete take-aways from the session.

| Persona | Promise | Take-aways |
|---|---|---|
| **CEO / Accountable Executive** | A board-ready view of where your operation sits vs. the industry shift to performance-based oversight. | Maturity snapshot · Competitive position · 12-month vision narrative |
| **COO / Head of Operations** | A concrete picture of what predictive operations unlock — and which use case to start with. | Candidate DTOP use case · Operational bottleneck map · Quick-win shortlist |
| **Head of Safety / Compliance** | A clear path from prescriptive compliance to evidence-led, regulator-ready performance. | Evidence model · Audit-readiness gaps · Regulator narrative |
| **CIO / Head of IT & Data** | Clarity on architecture, data substrate, and how the Intelligence Layer integrates — without rip-and-replace. | Data substrate review · Integration shape · Security & sovereignty Q&A |

Visual: 2×2 grid on desktop, single column on mobile, DTOP-colored accent per card, same card pattern as differentiators for consistency.

### 3. Trust strip (after persona band)
- Single horizontal band: "Run by Comply365 strategists who've led sessions with [N] operators across aviation, defense, and rail."
- 4–5 customer logos (or anonymized industry chips if logo permission is an issue — e.g. "Tier-1 European airline", "North American defense prime").
- One short pull-quote (placeholder until real one is approved).

### 4. Agenda — add an "outcome" line per block
Each non-break block gets a one-liner: *"You leave with: …"* — small text, accent color, under the existing detail.

### 5. Maturity curve — neutralize the "you are here"
- Replace the "Most start here" pill on L2 with a neutral "Industry median" label and a small source chip (StatSourceChip exists already).
- Keep the "destination" emerald marker on L4.

### 6. NEW — "How to prepare" block (before logistics)
Three small cards: 30-min pre-call · Two artifacts to bring (org chart + current ops KPI sheet) · One named exec sponsor.

### 7. NEW — FAQ block (before closing CTA)
Accordion or simple Q&A list, 5–6 items:
- Is this a sales pitch? *(No. Zero product demo. If a demo is useful afterwards, we book it separately.)*
- Who facilitates? *(Comply365 strategist + solutions engineer, named in the prep call.)*
- What happens with anything we share? *(Nothing leaves the room without your written approval. NDA available on request.)*
- What if we're early-stage / not ready to buy? *(Most attendees aren't. Half of sessions don't convert in-year.)*
- On-site or virtual — which works better? *(On-site for the whiteboard hour. Virtual works if calendars don't.)*
- Can we bring a partner / SI? *(Yes, if they're already in your operational stack.)*

### 8. NEW — "Not for you if…" honesty strip (small, between FAQ and CTA)
Three short lines:
- You're looking for a product demo (book one instead).
- You can't get an exec sponsor in the room.
- Your team isn't ready to discuss real operational data, even at high level.

### 9. Closing CTA — broaden channels
- Primary: "Request a date" (mailto, as today).
- Secondary: "Book directly on our calendar →" (placeholder link, easily swapped for Calendly/HubSpot later).
- Tertiary line stays: "Or speak to your Comply365 account lead."

### 10. Small polish
- Add `<title>` and meta description for SEO/share (currently inherits app default).
- Add an OG image (can reuse an existing brand asset).
- Add a subtle scroll-progress indicator at top — premium feel, low cost.

## Out of scope (v1)
- No backend form, no calendar integration wired up (placeholder link only).
- No real customer logos until permission is confirmed — ship with industry chips.
- No PDF generation for the customer overview — reuse the existing field-kit PDF or stub.
- No i18n.

## Files to touch
- `src/pages/StrategyVisionSession.tsx` — all the above (sectioned, no new routes).
- `src/data/week3FieldKit.ts` — only if we add per-block outcome strings to the agenda (additive, won't affect internal slide).
- `mem/content/strategy-vision-session-microsite.md` — append the persona-band + FAQ + trust strip decisions so future loops don't regress.

## Result
The page goes from "well-built brochure" to a **role-targeted, objection-handled, trust-anchored microsite** an exec will actually forward to their peer with one line: *"We should do this."*
