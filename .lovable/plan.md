## Goal
A Week 2 **capstone whiteboard slide** that ties every capability covered in the week (Intelligence Layer, Insights, Recommendations, Automation, Unified Mobile) into **one end-to-end customer use case**, walked through the **DTOP** loop. Reaffirms both the capabilities and the new way of working.

## The use case (single thread, recognisable to ops audiences)

**"Unstable approach trend at MAD — closed in 5 days, end-to-end."**

A real-feeling operational scenario picked because it touches every capability naturally and is easy for a rep to recite.

```
[ DETECT ]            [ TRIGGER ]              [ ORCHESTRATE ]           [ PROVE ]
 blue                  amber                    violet                    emerald

 Operational Data      Intelligence Layer       Automation                Insights &
 + Generative AI       asks: "Where should      fires the play:           Intelligence:
 spot a rising trend   my attention be          • Draft OMA revision      • Trend curve
 of unstable           today?" → flags          • Notify training         flattens 38%
 approaches at MAD     MAD unstable             owners                    • Audit pack
 in the last 14 days   approach + recommends    • Open SafetyManager365   ready, cited
                       3 risk controls          risk-control review       to every step
                                                Unified Mobile pushes
                                                the revised procedure
                                                to crew devices, sync
                                                confirmed in 48h
```

## Slide structure

Reuses the whiteboard aesthetic from `SEDtopWhiteboardDrill.tsx` (cream board, hand-drawn SVG, 4 DTOP-coloured cells). Two-column layout:

**Left (col-span-7) — the whiteboard**
- 4 DTOP cells in canonical colours (D blue · T amber · O violet · P emerald), loop arrow back to Detect.
- Inside each cell: 1 line of plain-English what-happens + 1-2 capability chips ("Intelligence Layer", "Automation", "Unified Mobile", "Insights").
- A header tag above the board: **"One use case · every capability · one DTOP loop"** and a "5-day clock" mini-icon.

**Right (col-span-5) — the say-it script + capability legend**
- 4 numbered story beats (one per DTOP step), each ending with the capability name in bold — so the rep can recite the whole story in ~60 seconds.
- Below: a 5-chip capability legend (Intelligence Layer · Insights · Recommendations · Automation · Unified Mobile) each with the colour of the DTOP step where it shows up most.
- Footer pill: **"Drill this 3× — it's the W2 capstone."**

## Slide placement

Insert in `src/pages/SalesEnablement.tsx` as the **last W2 slide**, just before `se-week-3` divider, so it's the closing reaffirmation of Week 2:

```
... se-slide-mobile
    se-slide-talktrack
    se-w2-capstone-whiteboard   ← NEW
▸ se-week-3 ...
```

Label: `W2 · Capstone — One Use Case, Every Capability, One DTOP Loop`.

## Files

- **New** `src/components/sales-enablement-slides/SEW2CapstoneWhiteboard.tsx` — the slide (modelled on `SEDtopWhiteboardDrill.tsx`, ~150 LoC).
- `src/pages/SalesEnablement.tsx` — import + insert the slide entry.
- `src/data/salesEnablementNarration.ts` — add narration for `se-w2-capstone-whiteboard` following the 5-part Coach Script Standard (~45-60s): why this slide matters (the capstone), the core message ("one use case, every capability, one DTOP loop"), pain→value (fragmented tooling vs one loop closed in days), how to deliver it (point at each cell, name the capability, end on Prove), transition into Week 3.

## Out of scope

- No changes to other W2 slides or their narrations.
- No changes to DTOP colour mapping or capability naming (per memory).
- Pure new capstone — does not replace `SEDtopWhiteboardDrill` (which is the W1 mechanics drill); this is the W2 use-case-led version.

## One open question

Is **"Unstable approach trend at MAD"** the right capstone use case, or would you prefer one of:
- (a) **Procedure revision triggered by a new regulation** (showcases Regulation Management + Automation more strongly)
- (b) **Training engagement drop on Dangerous Goods** (showcases Recommendations + TrainingManager365 more strongly)
- (c) Stick with **Unstable approach at MAD** — the most multi-capability of the three.