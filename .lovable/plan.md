

# Add Two Missing Objections to CoAnalyst Playbook

## Problem
Two real-world sales objections are not covered:
1. **Data privacy/security** — airlines have AI policies restricting external AI; they need guarantees about data isolation
2. **Internal AI teams as complement** — safety teams hiring data scientists; need to reframe CoAnalyst as complementary, not competitive

## Changes

### 1. `src/components/coanalyst-slides/CASlide10ObjectionHandling.tsx`

Replace the current 6 objections with 8 (adding the two new ones, condensing text slightly on existing ones to fit the grid). The two new objections:

**New objection — Data Security:**
- Objection: "Our AI policy restricts external AI software"
- Response: Customer data is never used to train public AI models (OpenAI, Microsoft, or any third party). CoAnalyst operates within a secure, isolated AI pipeline — customer data is visible only to that customer, never shared across clients, and never leaves the controlled environment. We provide full transparency on our AI data architecture and infrastructure guarantees.

**New objection — Internal AI Teams:**
- Objection: "Our safety team is building their own AI models"
- Response: CoAnalyst complements internal AI projects, it doesn't compete with them. Every modern software platform embeds AI capabilities — CoAnalyst is the aviation-specific intelligence layer your internal team shouldn't have to rebuild. We've invested seven figures in domain-specific training across 4,000+ categories, and we ship new AI capabilities weekly. Your data science team's time is better spent on problems unique to your operation, not replicating what already exists at production scale.

To fit 8 cards in the 2-column grid, slightly reduce text size or padding on all cards.

### 2. `src/data/coanalystNarration.ts` — slideId 10

Update the narration script to include the two new objections in the spoken narrative, maintaining the pattern of "When they say X, respond Y."

### 3. `src/components/coanalyst-slides/CASlide8VsGenericAI.tsx`

Add a small "Data Security" callout card in the right column (replacing or adding below the quote block) to reinforce the data isolation message visually — e.g., a shield icon with "Your data stays yours. Never used to train external models."

**3 files changed. No routing or structural changes.**

