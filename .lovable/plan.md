

# Plan: Consistency Updates with "Measurable Outcomes"

## Summary

Apply the key messaging statement consistently across the deck and homepage, using **"measurable outcomes"** instead of "audit-ready proof" as requested.

**Target Statement:** *"A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes."*

---

## Changes to Implement

### 1. Homepage Hero Section
**File:** `src/pages/HomepageMockup.tsx` (lines 234-237)

**Current:**
```tsx
<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
  Connect Safety, Content, and Training into one governed system.{" "}
  <span className="text-foreground font-medium">Turn operational signals into measurable outcomes.</span>
</p>
```

**New:**
```tsx
<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
  A connected, intelligent, and predictive platform.{" "}
  <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
</p>
```

---

### 2. Homepage "How It Works" Section
**File:** `src/pages/HomepageMockup.tsx` (lines 391-393)

**Current:**
```tsx
<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  When a signal is detected, the platform doesn't just log it — it closes the loop automatically.
</p>
```

**New:**
```tsx
<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  A connected, intelligent, and predictive operating layer — turning signals into orchestrated change and measurable outcomes.
</p>
```

---

### 3. Homepage CTA Section
**File:** `src/pages/HomepageMockup.tsx` (lines 592-594)

**Current:**
```tsx
<h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
  Ready to see connected operational performance?
</h2>
```

**New:**
```tsx
<h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
  Ready for a connected, intelligent, and predictive platform?
</h2>
```

---

### 4. Homepage Footer Tagline
**File:** `src/pages/HomepageMockup.tsx` (lines 645-647)

**Current:**
```tsx
<p className="text-sm text-muted-foreground mb-4">
  The Operational Performance Platform for aviation.
</p>
```

**New:**
```tsx
<p className="text-sm text-muted-foreground mb-4">
  A connected, intelligent, and predictive platform for aviation operations.
</p>
```

---

### 5. Slide 3 Operating Model Subtitle
**File:** `src/components/slides/Slide3OperatingModel.tsx` (lines 111-112)

**Current:**
```tsx
title="The Operational Intelligence Layer"
subtitle="Transforming operations from cost center to value driver"
```

**New:**
```tsx
title="The Operational Intelligence Layer"
subtitle="A connected, intelligent, and predictive platform turning signals into orchestrated change and measurable outcomes"
```

---

### 6. Slide 0 Title Page Description
**File:** `src/components/slides/Slide0Title.tsx` (lines 94-98)

**Current:**
```tsx
<p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
  From fragmented compliance tools to a connected platform 
  <br className="hidden sm:block" />
  that delivers <span className="text-primary font-medium">operational performance</span> at scale.
</p>
```

**New:**
```tsx
<p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
  A connected, intelligent, and predictive platform that turns 
  <br className="hidden sm:block" />
  signals into <span className="text-primary font-medium">orchestrated change and measurable outcomes.</span>
</p>
```

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/HomepageMockup.tsx` | 4 text updates (hero, how-it-works, CTA, footer) |
| `src/components/slides/Slide3OperatingModel.tsx` | 1 subtitle update |
| `src/components/slides/Slide0Title.tsx` | 1 description update |

---

## Result

After implementation:
- The key messaging appears consistently across title slide, operating model slide, and homepage
- "Connected, intelligent, and predictive" language is reinforced at every major touchpoint
- "Signals into orchestrated change and measurable outcomes" is the consistent outcome language
- Users encounter the same value proposition whether viewing the deck or website

