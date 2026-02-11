

# Fix: Baggage & Passenger Misalignment Card Appearing Darker

## Root Cause

The "Baggage & Passenger Misalignment" (UC8) card appears faded/darker because it is not connected to the currently selected **CFO** tab. UC8 only impacts `lm6` (Passenger Experience Score), which feeds into **CEO** metrics -- not CFO metrics. The code intentionally dims disconnected use cases with `opacity-30` and a darker background (`bg-card/20`).

While this is a valid design choice for showing relevance per stakeholder, it makes the card look broken or invisible.

## Fix

Reduce the visual difference between connected and disconnected use cases. Instead of dropping to `opacity-30`, use a subtler dimming (`opacity-50`) and keep the background consistent. Add a small label on disconnected cards indicating which stakeholder tab they belong to, so users understand why they appear dimmed rather than thinking it is a bug.

## Changes

### File: `src/components/slides/SlideLineOfSight.tsx` (lines 353-358)

Change the disconnected card styling from:
```
isConnected ? "border-border/50 bg-card/40" : "border-border/20 bg-card/20 opacity-30"
```

To:
```
isConnected ? "border-border/50 bg-card/40" : "border-border/30 bg-card/30 opacity-50"
```

This keeps the visual hierarchy (connected cards are still more prominent) but prevents disconnected cards from looking broken or invisible.

