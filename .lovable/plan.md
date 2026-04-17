

# Automation Capabilities Playbook

## Summary
A new playbook at `/automation-playbook` mirroring the Insights & Recommendations playbook pattern — 11 vertical snap slides, sidebar nav, branded title slide. Positions Prismatic-powered automation as the **Platform Orchestration Layer** beneath Comply365.

## Narrative Arc (11 slides)
1. **Title** — "Platform-wide Automation & Orchestration" + tagline "One automation layer across your entire operation."
2. **Why It Exists** — fragmented automation today: different toolsets per product, legacy/open-source/custom mix, inconsistent capabilities, high maintenance, limited scalability (e.g. Authoring Hub has it, Publishing Hub doesn't)
3. **What It Is** — modern no-code/low-code orchestration layer (Prismatic) handling triggers, events, workflows, APIs/webhooks, reusable connectors — embedded within Comply365
4. **How It Works** — 4-step flow: Event Trigger → Orchestration Layer → Workflow Execution → Connected Action (across products + 3rd party)
5. **Use Case 1: Training-Centric Automation** — TrainingManager365 events trigger workflows for customer production, migration, onboarding scenarios
6. **Use Case 2: Cross-Product Workflows** — Training ↔ Content ↔ Safety event-driven flows (e.g. new procedure published → training assignment → compliance check)
7. **Use Case 3: Third-Party Integration** — native connectors (Outlook, Teams, Slack) + customer data sources, no custom development
8. **Value Unlocked** — Internal (standardisation, faster delivery, reduced engineering, scale migration) + External (seamless integration, automation without complexity, faster time-to-value, future-ready platform)
9. **Persona Messaging** — CIO/CTO, Head of Training, Head of Operations, Integration Lead — what each cares about + opener
10. **Why Only Comply365** — embedded orchestration vs bespoke automation engines vs generic iPaaS bolt-ons; we retain control over data, execution, integration patterns
11. **Talking Points & Close** — positioning line "From product-specific automation → platform-wide orchestration", elevator pitch, discovery questions, next steps

## Key Messaging (per source doc)
- Primary positioning: *"One automation layer across your entire operation."*
- Supporting taglines: "Connect training, content, and safety workflows seamlessly" / "Integrate with your existing tools — without custom development" / "Automate operational processes at scale"
- Status: POC, completion April 2026 → foundation for **Platform Orchestration Layer**
- Key shift: product-specific automation → platform-wide orchestration; manual coordination → integrated event-driven workflows
- Disclaimer: position as POC / forward-looking (consistent with pitch-deck disclaimer memory)
- Note: do not mention "Prismatic" externally in customer-facing copy — refer to it as "embedded orchestration layer" / "third-party orchestration capability" only where internally relevant

## Files to Create
1. `src/data/automationPlaybook.ts` — typed content arrays (painPoints, howItWorksSteps, useCases, valueCategories, personaMessages, objections, talkingPoints, discoveryQuestions, competitorGaps) following the same shape as `insightsPlaybook.ts`
2. `src/components/automation-slides/` — 11 slide components (`AUSlide0Title.tsx` … `AUSlide10Closing.tsx`) plus shared `AUUseCaseSlide.tsx`, reusing `SlideContainer`, `SlideNarrationProps`, lucide icons, brand colors
3. `src/pages/AutomationPlaybook.tsx` — page shell mirroring `InsightsPlaybook.tsx` (snap scroll, keyboard nav, slide registration, no password gate)
4. `src/App.tsx` — register route `/automation-playbook`
5. `src/components/AppSidebar.tsx` — add "Automation" entry to `toolItems` (icon: `Workflow` already used by DTOP — use `Zap` or `GitBranch` instead)

## Design
- Dark theme, brand blue primary, follows existing `mem://ui/layout-standards` and `mem://design/template-style`
- Title slide mirrors `IRSlide0Title` hero pattern (no download button — no PDF asset yet)
- Use case slides use vertical timeline format per `mem://ui/use-case-timeline-standardization` (Trigger → Orchestrate → Execute → Outcome — 4 colored steps matching DTOP color coding)
- POC status badge on title slide
- Use approved terminology — no "FOQA/FDM"; use "Generative AI", "Operational Data" where relevant

## Out of Scope
- PDF 1-pager (can be added later)
- Narration audio
- Live workflow demo

