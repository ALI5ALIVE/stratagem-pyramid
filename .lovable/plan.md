
# Plan: Align Industry Solution Page Hero Copy with Homepage Messaging

## Current Gap Analysis

| Element | Homepage (Correct) | Solution Pages (Current) |
|---------|-------------------|-------------------------|
| Headline | "The Operational Performance **Platform**" | "Operational Performance **for [Industry]**" |
| Scope line | "for Safety, Content, and Training" | *(missing)* |
| Subhead | "Connect safety, content, and training into an intelligent operating platform. **Turn signals into orchestrated change and measurable outcomes.**" | "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes." |

The solution pages need to follow the homepage's lead by:
1. Adding the "for Safety, Content, and Training" scope line
2. Restructuring the subhead to start with "Connect safety, content, and training..."
3. Keeping the industry-specific headline but making it clearer it's the *same platform*

---

## Files to Modify

### 1. `src/components/solutions/IndustryHero.tsx`

**Add scope line prop and display it between headline and subhead:**

```tsx
interface IndustryHeroProps {
  industry: string;
  headline: string;
  subhead: string;
  badgeText?: string;
  scopeLine?: string;  // NEW PROP
  ctaPrimary?: string;
  ctaSecondary?: string;
}

// In the JSX, add scope line display after h1:
<h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-2 leading-[1.1]">
  {headline}
</h1>

{/* NEW: Scope line anchoring Safety, Content, and Training */}
<p className="text-sm md:text-base text-primary font-medium mb-6">
  {scopeLine || "for Safety, Content, and Training"}
</p>

<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
  {subhead}
</p>
```

---

### 2. `src/pages/solutions/AirlinesPage.tsx`

**Update hero props to match homepage pattern:**

```tsx
<IndustryHero
  industry="Airlines"
  headline="The Operational Performance Platform"  // Match homepage
  badgeText="For Commercial Aviation"
  scopeLine="for Safety, Content, and Training"   // NEW
  subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for airlines."
/>
```

---

### 3. `src/pages/solutions/DefensePage.tsx`

**Update hero props:**

```tsx
<IndustryHero
  industry="Defense"
  headline="The Operational Performance Platform"  // Match homepage
  badgeText="For Military Aviation & Defense"
  scopeLine="for Safety, Content, and Training"   // NEW
  subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for defense operations."
/>
```

---

### 4. `src/pages/solutions/RailPage.tsx`

**Update hero props:**

```tsx
<IndustryHero
  industry="Rail"
  headline="The Operational Performance Platform"  // Match homepage
  badgeText="For Rail Operations"
  scopeLine="for Safety, Content, and Training"   // NEW
  subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for rail."
/>
```

---

## Messaging Alignment Summary

| Element | Homepage | Airlines | Defense | Rail |
|---------|----------|----------|---------|------|
| Headline | The Operational Performance Platform | The Operational Performance Platform | The Operational Performance Platform | The Operational Performance Platform |
| Scope line | for Safety, Content, and Training | for Safety, Content, and Training | for Safety, Content, and Training | for Safety, Content, and Training |
| Badge | For mission-critical, regulated operations | For Commercial Aviation | For Military Aviation & Defense | For Rail Operations |
| Subhead | Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes. | ...and measurable outcomes **for airlines**. | ...and measurable outcomes **for defense operations**. | ...and measurable outcomes **for rail**. |

---

## Rationale

1. **Consistent category positioning** - All pages now anchor "Operational Performance Platform" as the category name
2. **Scope clarity** - "for Safety, Content, and Training" appears prominently on every page, avoiding confusion with airline ops metrics (OTP, fuel burn)
3. **Industry differentiation** - The badge and subhead ending provide industry-specific context without fragmenting the core message
4. **Pattern from homepage** - The solution pages now follow the exact structure established on the homepage, just with industry-specific badges
