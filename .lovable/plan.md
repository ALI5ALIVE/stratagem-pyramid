## Add Operational Performance Roadmap to Sales Enablement Foundation

The "Operational Performance Roadmap" is the maturity-curve slide rendered by `Slide5MaturityCurve` (used in Executive Pitch 2 as `exec2-slide-9` "Maturity Roadmap" and on `/maturity-curve` under the headline "The Operational Performance Roadmap"). It walks the five maturity stages from Fragmented & Reactive → Predictive & Self-Healing.

### Changes

**1. `src/pages/SalesEnablement.tsx`**
- Import `Slide5MaturityCurve` from `@/components/slides/Slide5MaturityCurve`.
- Insert a new Week 1 slide entry between `se-slide-value` and `se-slide-recap-m2`:
  ```
  { id: "se-slide-maturity-roadmap", label: "W1 · Operational Performance Roadmap", component: Slide5MaturityCurve },
  ```
- Update `weekProps.w1.upNext` to include "Operational Performance Roadmap" before "Recap talk track".
- Update `weekProps.w1.estimatedMinutes` from 14 → 17 (one extra ~3-min teaching slide).

**2. `src/data/salesEnablementNarration.ts`**
- Add a new entry `se-slide-maturity-roadmap` following the 5-part Coach Script Standard (Why → Core Message → Pain → Value pivot → How to deliver → Transition).
- Update the previous slide (`se-slide-value`) closing line so it bridges into the roadmap, not directly into the recap. New tail: *"Then bridge to the Operational Performance Roadmap — that's where they see themselves on the curve."*
- Keep `se-slide-recap-m2` as the slide AFTER the roadmap; no other narration files touched.

### Narration draft (new entry)

> **Week 1 · Operational Performance Roadmap.** Why this slide matters: every prospect already lives somewhere on this curve, and the fastest way to make the conversation real is to let them point at where they are. The core message: operational performance maturity is a five-stage journey — Fragmented and Reactive, Managed, Connected, Proactive, and Predictive and Self-Healing — and the platform is the only one built to move customers along the entire curve. The pain you're addressing: most operators are stuck somewhere between Stage 2 and Stage 3, paying for tools that promised Stage 4 but never delivered because the foundation was never connected. The value lever: this is the only roadmap where each stage builds on the one below it, because every stage runs on the same connected foundation closed by DTOP. Delivery tip — do not present the curve, navigate it. Show all five stages, then ask one question: which stage best describes you today, and which stage are you being asked to reach in the next twelve to eighteen months? Their answer is the scope of every follow-up conversation. Avoid promising Stage 5 capabilities — Predictive and Self-Healing is roadmap, not today. Transition: now we recap Week 1 in three sentences you can repeat from memory.

### Out of scope
- No changes to `Slide5MaturityCurve` itself (it's reused as-is, same as Exec Pitch 2).
- No exec-pitch / academy-DB / playbook changes.
- No layout or styling changes.

### Verification
- Sidebar shows new "W1 · Operational Performance Roadmap" entry between Value Unlocked and Recap.
- Title-pill slide count auto-updates (driven by `slides.length`).
- Pressing play on the new slide fetches the new narration via the existing `useSalesEnablementNarration` hook (no hook changes needed — it looks up by slide id).
- Week 1 `estimatedMinutes` reads 17 in the Foundation divider.
