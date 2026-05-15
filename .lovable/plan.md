## Review of `/comply365-mockup`

### What's working
- Strong visual identity (dark theme, primary blue, Space Grotesk).
- Hero hook ("Operations runs on signals. Nobody acts on them.") is sharp.
- DTOP, Three Modules, Intelligence Layer, Difference grid all on-brand.

### Why it feels like the platform mockup
1. **System-first arc.** Sections 3–7 move *Platform → Modules → Intelligence Layer → DTOP → Mobile* — the same architectural narrative as `/platform-mockup`. Customers/outcomes only appear as a thin trust bar (logos) and a generic CTA band.
2. **No protagonist.** There is no named operator, no scenario, no "before/after a Tuesday morning" moment. The reader never sees themselves in the page.
3. **Outcomes are abstract.** "~90% accuracy", "audit-ready", "closed loop" — capability claims, not customer results ("$X recovered", "Y hours back per crew", "Z audit findings → 0").
4. **Repetition with the platform page.** The circular architecture diagram, Intelligence Layer headline, and DTOP card row are now nearly identical to `/platform-mockup`. The home page should *tease* the platform, not re-explain it.
5. **Pacing is uniform.** Every section is the same py-24 two-column or 3-card pattern. No editorial rhythm (pull-quote, full-bleed scenario, metric wall, customer story spread).

### Best-practice references we agreed to follow
- Brand/Template UI: dark theme `hsl(222 47% 6%)`, Space Grotesk + Inter, primary `#0066FF`.
- DTOP color discipline (D blue · T amber · O violet · P emerald) and asymmetrical, h-screen layouts.
- Trust signals memory: lead with defensible customer metrics (50+ operators, 1M+ frontline users, ~90% domain accuracy), not adjectives.
- Closing strategy memory: anchor on the three core differentiators (connected platform, Intelligence Layer, DTOP loop) — but as customer outcomes, not features.

### Proposed new narrative arc (storytelling, customer-led)

```text
1. HERO  — Problem the customer feels (keep current line, tighten)
2. CUSTOMER PROOF WALL  — logos + 3 hero outcome metrics (replaces thin trust bar)
3. A DAY IN THE OPERATION  — narrated scenario: "Tuesday, 06:42. A weak
   signal lands. Here's what happens next." Step-by-step with named roles
   (Ops Director, Safety Lead, Training Manager, Crew). Editorial layout,
   not a card grid.
4. CUSTOMER STORIES  — 3 short outcome cards, each with operator name,
   one-line situation, hard number ("Audit findings → 0", "11k crew
   re-current in 9 days", "$X recovered"), pull-quote.
5. WHY OPERATORS CHOOSE COMPLY365  — 3 outcomes (not features):
     • Faster to act on what matters
     • Evidence the regulator trusts
     • One platform, one ROI story
   Each with a customer micro-quote.
6. THE PLATFORM IN ONE GLANCE  — single compact module: circular diagram +
   one paragraph + "Explore the platform →". Replaces sections 3, 4, 5, 6
   of today. Stops competing with /platform-mockup.
7. WHERE THE WORK HAPPENS  — frontline image + one line (kept, tightened).
8. RESOURCES  — keep, but lead with a customer story, not a Q&A.
9. CLOSING CTA  — outcome-framed: "Turn the next signal into your next
   proof point."
```

Net effect: cut from 11 sections to 9, with **5 of 9 led by a customer or scenario** instead of 1 of 11 today.

### Editorial / craft moves
- **Add a full-bleed scenario spread** (section 3) with timestamps down the left rail and the DTOP color dots inline — uses the brand language without re-teaching it.
- **Promote one signature metric per customer story** at 6xl/7xl display weight — gives the page a "metric wall" beat the current page lacks.
- **Pull-quotes** in serif italic between sections to break the card cadence (an editorial rhythm trick used by Stripe, Linear, Anthropic).
- **Demote the architecture diagram** to a thumbnail-sized teaser. The full diagram lives on `/platform-mockup`.
- **Asymmetrical grids** on customer stories (12-col: 7/5, 5/7) instead of three equal cards, per layout-standards memory.

### Things to remove
- Duplicate Intelligence Layer headline + image (lives on `/platform-mockup`).
- DTOP 4-card row (tease only — DTOP dots already appear in hero).
- "An Operational Power Multiplier" 6-card feature wall — replace with the 3 outcomes section.

### Open questions for you before I build

1. **Customer stories — real or placeholder?**
   - (a) Use real names + numbers from the trust-signals memory (50+ operators, 1M+ frontline users, ~90% accuracy) and 2–3 named operator references you'll supply.
   - (b) Build with anonymized "Tier-1 European carrier" / "North American MRO" + indicative numbers, ready to swap in real names later.

2. **Scenario for section 3 — which one anchors the page?**
   - (a) QRH revision → 42 crews need recurrent (already in the hero peek).
   - (b) Dangerous Goods cluster → targeted retraining at 3 hubs (already used in tech deck worked example).
   - (c) Audit finding closed in <24h with full evidence trail.

3. **Visual hero of the page (replacing today's product-peek card):**
   - (a) Keep the Intelligence Layer chat card — it's strong, just move the supporting copy.
   - (b) Switch to a single huge customer outcome ("0 findings · 9 days · 11,000 crews") with the chat card demoted.
   - (c) Cinematic operations photograph (apron / cockpit) with overlay text.

4. **Length appetite:** keep it ~9 sections (recommended) or compress further to a tighter 6-section flagship?

Once you answer these I'll implement the rewrite as a single pass on `Comply365MockupHome.tsx` (no new routes, no new components beyond a `ScenarioStrip` and `CustomerStoryCard` if needed).