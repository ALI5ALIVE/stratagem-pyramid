## Goal

Fix three issues in Week 3 (Sales Enablement):
1. Several narration scripts announce the wrong "next slide" — the overview slides preceding each whiteboard drill skip straight to the slide after the drill, and a few other transitions point to the wrong cheat sheet.
2. Some whiteboard SVG diagrams have text overlapping other text/shapes.
3. The closing transitions need to lead cleanly from each scenario overview into its whiteboard drill (not jump ahead).

## Part 1 — Narration transition fixes (`src/data/salesEnablementNarration.ts`)

Actual Week 3 slide order vs. what each script announces as "next":

| Slide | Currently says "next…" | Actually next | Action |
|---|---|---|---|
| `se-discovery-to-close` | "use cases" | discovery question bank | Rewrite closing → lead into Discovery Question Bank |
| `se-footprint-single` | "two-app scenarios" | One-App **Whiteboard** | Rewrite → lead into the one-app whiteboard drill |
| `se-footprint-single-whiteboard` | "the two-app drill" | two-app **overview** | Adjust → "next we walk the two-app footprint, then draw it" |
| `se-footprint-two` | "all-three customers" | Two-Apps **Whiteboard** | Rewrite → lead into two-app whiteboard drill |
| `se-footprint-two-whiteboard` | "the all-three drill" | all-three **overview** | Adjust → lead into all-three overview, then drill |
| `se-footprint-all` | "the value ladder" | All-Three **Whiteboard** | Rewrite → lead into the all-three whiteboard drill |
| `se-footprint-playbook` | "Regulation Management" | `se-slide-outcomes` (Customer Outcomes) | Rewrite → lead into Customer Outcomes |
| `se-slide-outcomes` | "the three objections" | `se-competitive-cheatsheet` | **User's flagged bug** — rewrite → lead into Competitive Cheat Sheet |
| `se-slide-why` | "your enablement plan" | `se-practice-center-bridge` | Tighten → lead into Practice Center bridge |
| `se-slide-closing` | (no forward transition) | `se-strategy-vision-session` | Add transition → lead into Strategy & Vision Session offer |

All edits keep the 5-part Coach Script structure (Why / Core message / Pain→Value / Delivery / Transition) and respect locked memory rules (BrandNumber, ~90% vs ~35%, no FOQA/FDM/ASAP, no "90-day pilot", DTOP terminology).

## Part 2 — Whiteboard SVG overlap fixes

**`SEFootprintTwoWhiteboard.tsx`** — Intelligence band (y=30–70): "Intelligence Layer · Insights · Automation" runs to ~x≈300 and the "— across 2 lanes" italic starts at x=305 in the same line, which collides on render. Fix: widen the band, move the italic suffix to a second line *or* shorten the main label so they don't overlap. Also the half-loop row ("Detect → Trigger → Orchestrate (procedures)" at x=60, y=238 and "✗" at x=475 / "no Training → Prove partial" at x=500 y=248) sits very close to the arrow — bump the labels above the arrow and the X annotation to its own row to prevent collision at small viewport widths.

**`SEFootprintSingleWhiteboard.tsx`** — Inside the Safety lane (200px wide), the "+ Intelligence Layer / + Insights / + Automation" stack plus the italic "confined to this lane" at y=205 sits right on the lane bottom edge (y=210). Nudge the italic to y=200 and reduce font, or extend the Safety rect height from 160 to 180. The discovery-question box (y=300–360) sits below the lit/dark lanes but the "Circle the gap" ellipse (cx=465, cy=100, ry=70) extends from y=30 down to y=170 — fine — but the green caption "Circle = the sale…" at y=395 overlaps the bottom edge of the discovery-question rect (which ends at y=360). Move the caption to y=380 or shift the discovery-question box up.

**`SEFootprintAllThreeWhiteboard.tsx`** — Intelligence band text "Intelligence Layer · Insights · Automation · Mobile" at x=55 (fontSize 18) runs to roughly x≈470, colliding with "— scope, not new features" at x=450. Fix: shorten the main label (drop the bullet spacing) or push the italic suffix to x=500+ and/or smaller font. Also verify the closed-loop rect (y=245–335) doesn't clip the lane boxes ending at y=220 — there's 25px gap, OK.

After edits, take a preview screenshot of each whiteboard slide and visually verify no overlaps at the current 1200px viewport.

## Part 3 — QA

- Re-read all updated narration entries end-to-end to confirm every Week 3 script's closing line names the correct next slide title.
- Screenshot each of the three whiteboard slides post-fix; zoom into the affected regions to confirm no remaining overlap.

## Out of scope

- No changes to slide order, slide components other than the three whiteboard SVGs, narration voice/hook, or Week 1/Week 2 content.
- No new data in `week3FieldKit.ts`.
- Memory file update: append a short note to `mem/content/sales-enablement/week3-field-kit.md` documenting that every Week 3 closing transition is now slide-accurate (one line).
