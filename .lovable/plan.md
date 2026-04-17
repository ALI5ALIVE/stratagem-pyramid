

# Unified Mobile App Playbook

## Summary
New playbook at `/mobile-playbook` mirroring the Automation & Insights pattern — 11 vertical snap slides, sidebar nav, branded title slide. Positions the Unified Mobile App as **one trusted mobile entry point** for frontline workers — Content, Training and Safety in the app they already use every shift.

## Narrative Arc (11 slides)
1. **Title** — "The Unified Mobile App" + tagline "One trusted mobile entry point for the frontline." POC/phased status badge.
2. **Why It Exists** — context shifting between apps, cognitive load, infrequent Training/Safety use, fragmented mobile footprint, separate deployments and approvals.
3. **What It Is** — Comply365 iOS shell (already in daily use via ContentManager365) extended to surface Training and Safety — like Uber/Snap mini-apps inside one trusted shell. One entry point, not a rebuild.
4. **How It Works** — 4-step flow: Single Shell → SSO → Surfaced Mini-Apps → Connected Workflows. Emphasis on iOS-first, SSO-required, standalone apps still exist.
5. **Use Case 1: Training in the Crew's Hand** (Phase 1 / Q2 2026) — surface TrainingManager365 Dashboard + Personal File inside the mobile app sidebar; online-only initial scope.
6. **Use Case 2: Safety Reporting in the Moment** (Phase 2 / Q4 2026) — surface SafetyManager365 reporting from the sidebar so crew can report an occurrence without leaving the app they already use.
7. **Use Case 3: Fully Unified Mobile Experience** (Phase 3 / 2027+) — common UI/UX, unified notifications, in-app navigation between procedures ↔ training ↔ safety, in-app automation/suggestions.
8. **Value Unlocked** — 5 pillars: Less Context Shifting, Lower Cognitive Load, Design at Scale, Simpler Deployment, Future Integration Potential. Plus internal value (one shell to evolve, lower training burden, simpler customer approval).
9. **Persona Messaging** — Flight/Cabin Crew, Head of Operations, Head of Training, Head of Safety, IT/Mobility Lead — what each cares about + opener.
10. **Why Only Comply365** — only vendor with a daily-use operational shell to extend; competitors offer separate Training and Safety apps. Contrast vs standalone apps / generic MDM / web wrappers.
11. **Talking Points & Close** — positioning line "From three apps a shift → one app every shift", elevator pitch, discovery questions, phased next steps.

## Key Messaging
- Primary positioning: *"One trusted mobile entry point for the frontline — Content, Training and Safety in the app they already use every shift."*
- Supporting: "Less context shifting. Less cognitive load. One way to deploy."
- Phased framing — Phase 1 Q2 2026 (Training, WIP) → Phase 2 Q4 2026 (Safety) → Phase 3 2027+ (fully unified).
- Honest constraints stated up front: iOS-first, SSO required, standalone apps still exist, UI/UX not fully aligned in early phases, ContentManager365 + TrainingManager365/SafetyManager365 customers only.
- Disclaimer: phased delivery, forward-looking (consistent with pitch-deck disclaimer memory).

## Files to Create / Modify
1. `src/data/mobilePlaybook.ts` — typed content arrays mirroring `automationPlaybook.ts` shape (heroEyebrow/Title/Tagline, whyItExists, elevatorPitch, howItWorksSteps, useCases, valuePillars, internalValue, personas, competitiveContrast, moatStatements, objections, talkingPoints, discoveryQuestions, nextSteps).
2. `src/components/mobile-slides/` — 11 slide components (`MOSlide0Title.tsx` … `MOSlide10Closing.tsx`) plus shared `MOUseCaseSlide.tsx`. Reuse `SlideContainer`, `SlideNarrationProps`, brand colors, lucide icons (`Smartphone`, `Layers`, `Bell`, `ShieldCheck`, `GraduationCap`, `Workflow`).
3. `src/pages/MobilePlaybook.tsx` — page shell mirroring `AutomationPlaybook.tsx` (snap scroll, keyboard nav, slide registration, no password gate).
4. `src/App.tsx` — register route `/mobile-playbook`.
5. `src/components/AppSidebar.tsx` — add "Unified Mobile" entry to `toolItems` with `Smartphone` icon.

## Design
- Dark theme, brand blue primary, follows `mem://ui/layout-standards`, `mem://design/template-style`, `mem://style/content-density`.
- Title slide mirrors `AUSlide0Title` hero pattern — phased-status badge ("Phase 1 WIP · Q2 2026"), no download button.
- Use case slides use the standardised vertical timeline (`mem://ui/use-case-timeline-standardization`) with 4 colored steps: Today (pain) → Surface (mini-app) → In-context Action → Outcome.
- Approved terminology only — "ContentManager365", "TrainingManager365", "SafetyManager365" with no spaces; no "FOQA/FDM".

## Out of Scope
- PDF 1-pager (can be added later)
- Narration audio
- Embedded interactive mobile mockup (can be added later — optional follow-up)

