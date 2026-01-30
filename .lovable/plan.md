
# Plan: Fix Trust Signals for Homepage and Solution Pages

## Current Issue

| Page | Current Trust Signal | Problem |
|------|---------------------|---------|
| Homepage | "Trusted by 50+ airlines including 7 of the top 10 in North America" | **Too aviation-specific** - doesn't represent rail or defense |
| Solution Pages | *(none)* | **Missing entirely** - no trust signals on industry pages |

---

## Solution Overview

1. **Homepage**: Update trust bar to be cross-industry, mentioning all sectors served
2. **Solution Pages**: Add an `IndustryTrustBar` component with industry-specific trust signals

---

## Files to Create/Modify

### 1. Create `src/components/solutions/IndustryTrustBar.tsx` (NEW)

A reusable trust bar component that accepts industry-specific props:

```tsx
interface IndustryTrustBarProps {
  industry: string;
  primaryStat: string;
  primaryLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
  tertiaryStat?: string;
  tertiaryLabel?: string;
}

const IndustryTrustBar = ({
  industry,
  primaryStat,
  primaryLabel,
  secondaryStat,
  secondaryLabel,
  tertiaryStat = "99.9%",
  tertiaryLabel = "uptime",
}: IndustryTrustBarProps) => {
  return (
    <section className="py-6 border-y border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            <span className="font-semibold text-foreground">{primaryStat}</span> {primaryLabel}
          </p>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{secondaryStat}</strong> {secondaryLabel}</span>
            {tertiaryStat && (
              <>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline"><strong className="text-foreground">{tertiaryStat}</strong> {tertiaryLabel}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

### 2. Update `src/pages/HomepageMockup.tsx` (Lines 234-249)

Change from airlines-only to cross-industry:

**Current:**
```tsx
<span className="font-semibold text-foreground">Trusted by 50+ airlines</span> including 7 of the top 10 in North America
...
<span><strong className="text-foreground">500K+</strong> crew members</span>
```

**Updated:**
```tsx
<span className="font-semibold text-foreground">Trusted across aviation, rail, and defense</span> for mission-critical operations
...
<span><strong className="text-foreground">1M+</strong> frontline workers</span>
<span><strong className="text-foreground">99.9%</strong> uptime</span>
```

---

### 3. Update `src/pages/solutions/AirlinesPage.tsx`

Add the trust bar after the hero:

```tsx
import IndustryTrustBar from "@/components/solutions/IndustryTrustBar";

// After IndustryHero:
<IndustryTrustBar
  industry="Airlines"
  primaryStat="Trusted by 50+ airlines"
  primaryLabel="including 7 of the top 10 in North America"
  secondaryStat="500K+"
  secondaryLabel="crew members"
/>
```

---

### 4. Update `src/pages/solutions/DefensePage.tsx`

Add defense-specific trust signals:

```tsx
import IndustryTrustBar from "@/components/solutions/IndustryTrustBar";

// After IndustryHero:
<IndustryTrustBar
  industry="Defense"
  primaryStat="Trusted by military aviation"
  primaryLabel="across multiple allied nations"
  secondaryStat="100K+"
  secondaryLabel="qualified personnel"
/>
```

---

### 5. Update `src/pages/solutions/RailPage.tsx`

Add rail-specific trust signals:

```tsx
import IndustryTrustBar from "@/components/solutions/IndustryTrustBar";

// After IndustryHero:
<IndustryTrustBar
  industry="Rail"
  primaryStat="Trusted by rail operators"
  primaryLabel="for network-wide safety and compliance"
  secondaryStat="50K+"
  secondaryLabel="rail personnel"
/>
```

---

## Summary of Trust Signals

| Page | Primary Trust Signal | Secondary Stats |
|------|---------------------|-----------------|
| **Homepage** | "Trusted across aviation, rail, and defense" | 1M+ frontline workers, 99.9% uptime |
| **Airlines** | "Trusted by 50+ airlines" (7 of top 10 NA) | 500K+ crew members, 99.9% uptime |
| **Defense** | "Trusted by military aviation" (allied nations) | 100K+ qualified personnel, 99.9% uptime |
| **Rail** | "Trusted by rail operators" | 50K+ rail personnel, 99.9% uptime |

---

## Rationale

1. **Homepage broadening** - Reflects the platform's multi-industry positioning without over-indexing on aviation
2. **Industry-specific pages** - Each vertical gets tailored trust signals that resonate with that audience
3. **Consistent component** - `IndustryTrustBar` provides a reusable pattern for future industry pages
4. **Maintains credibility** - Aviation page keeps the strong "50+ airlines" stat while other industries get appropriate equivalents

