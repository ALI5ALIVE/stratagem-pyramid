

# Plan: Update to "Connected, Intelligent, and Predictive Platform" Terminology

## Summary

Replace all instances of "intelligent operating system" with "connected, intelligent, and predictive platform" to align the messaging with the pyramid's maturity stages (Connected → Intelligent → Predictive).

---

## Files to Update

### 1. `src/components/slides/Slide1StrategicShift.tsx`

**Line 26 - Subtitle:**
- Current: `"From fragmented point tools to an intelligent operating system"`
- New: `"From fragmented point tools to a connected, intelligent, and predictive platform"`

**Lines 110-113 - Category Definition:**
- Current: `"Connects safety, procedures, and training into an intelligent operating system, turning signals into orchestrated change and audit-ready proof."`
- New: `"A connected, intelligent, and predictive platform that turns signals into orchestrated change and audit-ready proof."`

---

### 2. `src/components/slides/Slide2BeforeAfter.tsx`

**Line 270 - Unlike Callout:**
- Current: `"...Comply365 connects all three into an intelligent operating system, turning signals into orchestrated change and audit-ready proof."`
- New: `"...Comply365 connects all three into a connected, intelligent, and predictive platform — turning signals into orchestrated change and audit-ready proof."`

---

### 3. `src/components/slides/SlideMessagingHouse.tsx`

**Line 23 - Category Definition:**
- Current: `"Connects safety, content, and training into an intelligent operating system, turning signals into orchestrated change and audit-ready proof."`
- New: `"A connected, intelligent, and predictive platform that turns signals into orchestrated change and audit-ready proof."`

**Line 24 - Operating Model Label:**
- Current: `"Continuous Improvement Operating System"`
- New: `"Continuous Improvement Operating Model"`

---

### 4. `src/data/slideNarration.ts`

**Slide 0 (Title) - Line 16:**
- Current: `"...an intelligent operating system that connects safety, content, and training into one governed system."`
- New: `"...a connected, intelligent, and predictive platform that unifies safety, content, and training into one governed system."`

**Slide 1 (Strategic Shift) - Line 22:**
- Current: `"An intelligent operating system that connects safety, content, and training — turning operational signals into orchestrated change and audit-ready proof."`
- New: `"A connected, intelligent, and predictive platform that turns operational signals into orchestrated change and audit-ready proof."`

**Slide 11 (Category Name) - Line 82:**
- Current: `"...connecting Safety, Content, and Training into a governed operating system that turns signals into outcomes and proof."`
- New: `"...connecting Safety, Content, and Training into a connected, intelligent, and predictive platform that turns signals into outcomes and proof."`

**Slide 12 (Messaging House) - Line 88:**
- Current: `"An intelligent operating system that connects safety, content, and training — turning signals into orchestrated change and audit-ready proof."`
- New: `"A connected, intelligent, and predictive platform that turns signals into orchestrated change and audit-ready proof."`

---

## Technical Details

| File | Line(s) | Change Type |
|------|---------|-------------|
| `Slide1StrategicShift.tsx` | 26, 110-113 | Subtitle + body text |
| `Slide2BeforeAfter.tsx` | 270 | Unlike callout text |
| `SlideMessagingHouse.tsx` | 23, 24 | Category definition + operating model label |
| `slideNarration.ts` | 16, 22, 82, 88 | Voice narration scripts (4 slides) |

---

## Why This Terminology Works

The phrase "connected, intelligent, and predictive platform" directly maps to the pyramid's maturity stages:

| Pyramid Stage | Platform Attribute |
|---------------|-------------------|
| Stage 3: Connected Governance | **Connected** |
| Stage 4: Intelligent Operations | **Intelligent** |
| Stage 5: Predictive Operations | **Predictive** |

This creates narrative consistency between:
- The Strategic Shift slide's promise
- The Value Pyramid's maturity journey
- The Messaging House's positioning framework

---

## Result

After implementation:
- All visual slides will use "connected, intelligent, and predictive platform"
- All narration scripts will use consistent terminology
- The messaging aligns directly with the pyramid's maturity stages
- "Operating System" is fully replaced with "Platform" language

