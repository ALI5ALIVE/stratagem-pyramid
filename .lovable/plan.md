
## Customer-facing microsite: Strategy & Vision Session

A standalone, shareable page the sales team can send to a prospect/customer ahead of booking the complimentary 3-hour workshop. Customer-facing tone (no internal sales jargon), world-class visual feel, builds excitement so the customer wants to participate.

### Route & wiring
- Path: `/strategy-vision-session`
- New page: `src/pages/StrategyVisionSession.tsx`
- Registered in `src/App.tsx` (public route, no auth gate — must be shareable)
- `<title>`: "Strategy & Vision Session — Comply365"
- `<meta name="description">`: one-line customer-facing pitch (~150 chars)
- Reuses agenda/attendees/leave-behind data from `src/data/week3FieldKit.ts` — no duplication
- **Rep-facing content removed for the customer view**: no "rep talk track", no "who to target", no internal sales language

### Tone shift (internal slide → customer microsite)
The SE slide is written *to the rep*. The microsite is written *to the customer exec*. Rewrite labels accordingly:
- "Who should be in the room" stays (it's useful for the customer)
- "What they leave with" → "What you'll leave with"
- Agenda detail copy lightly reworded to remove rep-coaching tone

### Page structure (single scrolling dark page, Space Grotesk / Inter, Comply365 brand styling, max-w-6xl)

1. **Hero**
   - Eyebrow: "Complimentary · 3 hours · On-site or virtual"
   - H1: "The Strategy & Vision Session"
   - Sub: "Three hours that move the conversation from tickets and renewals to where your operation will be in twelve months."
   - Two pill stats: "3 hours" · "0 cost" · "Your team + ours"
   - Primary CTA: "Request a date" (mailto or anchor to form section)
   - Secondary CTA: "Download the agenda (PDF)" — links to existing field-kit PDF section or new lightweight one-pager (out of scope for v1; button can scroll to agenda)

2. **Why this session exists** — short narrative block
   - 2–3 short paragraphs framing the industry shift from prescriptive compliance to performance-based oversight, and why a strategic conversation (not a feature demo) is what unlocks the next 12 months.

3. **What makes it different** — 3 visual cards
   - "Not a demo" — strategy and architecture, not screen tours
   - "Your real use case" — we whiteboard one of *your* operational scenarios end-to-end
   - "A roadmap you can take to your board" — leave with a maturity snapshot and a 90-day "what's possible" view

4. **The 3-hour agenda** — hero visual
   - Visual vertical timeline using DTOP color coding (D blue · T amber · O violet · P emerald) for the relevant blocks
   - Each block: time pill, title, 1-line customer-facing detail
   - Break block visually softened (muted)
   - This is the centerpiece — large, scannable, designed to be screenshotted and forwarded

5. **The DTOP loop walkthrough preview** — visual
   - 4-step horizontal loop (Detect → Trigger → Orchestrate → Prove) with brief one-line description per step
   - Caption: "In hour three we walk one of *your* real use cases around this loop on a whiteboard."
   - Uses DTOP color tokens; visual is the hook

6. **The Operational Performance maturity curve** — visual
   - Simple L1 → L5 horizontal curve (reactive → predictive)
   - Customer's hypothetical "you are here" marker around L2/L3
   - "L4 predictive" highlighted as the destination the session maps toward
   - Caption: "We'll plot where you are today and what L4 looks like for your operation."

7. **Who should be in the room** — clean grid of role chips
   - Pulled from `visionSessionAttendees` minus the "Comply365 AE + SE" entry (replaced with "Comply365 strategist + solutions engineer")
   - Short framing line: "The room matters. This works best with decision-makers, not just operators."

8. **What you'll leave with** — 3 deliverable cards
   - One-page Operational Performance maturity snapshot
   - Candidate first DTOP use case, scoped
   - 90-day "what's possible" view
   - Each card with an icon and one supporting sentence

9. **Format & logistics** — small strip
   - Duration: 3 hours · Format: On-site or virtual · Cost: Complimentary · Prep required: ~30 min pre-call with your AE

10. **Customer quote / trust strip** (optional, uses existing trust-signal memory)
    - One short pull-quote treatment + 3-4 standardized customer logos/metrics from the trust-signals memory if available; otherwise a "trusted by safety-critical operators" statement strip

11. **Closing CTA**
    - Bold restatement: "Three hours. Your team. A roadmap to take to your board."
    - Button: "Request a date" (mailto link, e.g. `mailto:[email protected]?subject=Strategy %26 Vision Session`)
    - Sub-line: "Or talk to your Comply365 account lead."

### Visual & brand constraints honored
- Dark theme `bg-background text-foreground`, Space Grotesk headings, Inter body
- DTOP color tokens (D blue · T amber · O violet · P emerald) on agenda timeline and loop visual
- Comply365 brand — no spaces in product names (SafetyManager365, ContentManager365, TrainingManager365)
- Intelligence Layer terminology only (never "CoAnalyst")
- Locked terminology: "~90% domain accuracy at L4–5 vs ~35%" if quoted; no FOQA/FDM/ASAP
- No narration bar (this is a microsite, not a slide deck)
- Asymmetrical padding, generous whitespace, h-screen NOT required (long scrolling page is appropriate)

### Discoverability
- **No** nav entry, **no** homepage card — this is a link sales reps share manually
- Add a small "Customer-facing version" link on the existing SE Strategy & Vision Session slide (`SEStrategyVisionSession.tsx`) so reps can find/open the shareable URL from inside the enablement deck

### Out of scope (v1)
- No backend form (CTA is mailto for now)
- No PDF generation for the customer-facing agenda (existing field-kit PDF is rep-facing)
- No CMS — content is static in the page component, pulling from existing `week3FieldKit.ts` where it overlaps
- No i18n
- No auth/password gate (must be openly shareable)

### Files to create / edit
- **Create** `src/pages/StrategyVisionSession.tsx`
- **Edit** `src/App.tsx` — add route
- **Edit** `src/components/sales-enablement-slides/SEStrategyVisionSession.tsx` — add a small "Open customer-facing page →" link in the footer

### Memory updates after build
- New memory: `mem://content/strategy-vision-session-microsite` — describes the customer-facing page, tone rules, and that it pulls from `week3FieldKit.ts`
- Index update to reference it
