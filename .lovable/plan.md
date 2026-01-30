

# Plan: Fix Platform Ecosystem Diagram Arrows and AI-POWERED Text

## Summary

Fix two issues with the `PlatformEcosystemDiagram` component:
1. **Arrows cutting through center**: Change from Bezier curves to proper SVG arc paths that follow the circle
2. **AI-POWERED text cut off**: Adjust the viewBox and text path positions to ensure all content is visible

---

## Issue 1: Arrows Not Following the Circle

### Current Problem
The `getArrowPath` function creates a quadratic Bezier curve with a control point pulled toward the center:
```tsx
const controlRadius = radius * 0.6;  // Control point at 60% of radius
return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
```

This creates a chord-like path that cuts through the inner area rather than following the circular arc.

### Solution
Replace the Bezier curve with an SVG arc command (`A`) that follows the circumference:

```tsx
// Generate arc path that follows the circle between two angles
const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
  const start = getPosition(startAngle, radius);
  const end = getPosition(endAngle, radius);
  
  // Determine if we need the large arc (more than 180 degrees)
  const angleDiff = Math.abs(endAngle - startAngle);
  const largeArc = angleDiff > 180 ? 1 : 0;
  
  // Sweep direction (1 = clockwise, 0 = counter-clockwise)
  const sweep = endAngle > startAngle ? 1 : 0;
  
  // SVG Arc: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`;
};
```

---

## Issue 2: AI-POWERED Text Being Cut Off

### Current Problem
The viewBox is `0 0 400 400` with center at (200, 200). The AI-POWERED text paths are positioned at radius 165, meaning:
- Top text: `cy - 165 = 35` pixels from top
- The arc sweeps from `(100, 35)` to `(300, 35)` 

But the text has `letterSpacing="3"` which makes it wider, and part of it gets clipped by the viewBox edge.

### Solution
1. **Increase viewBox padding**: Change from `0 0 400 400` to `viewBox="-10 -10 420 420"` to add 10px margin on all sides
2. **Alternatively**, bring the AI-POWERED text paths slightly inward to radius ~160

I'll use the second approach to keep the viewBox clean:

```tsx
// Adjust radius for text paths from 165 to 158
<path
  id="aiPoweredTop"
  d={`M ${cx - 90} ${cy - 158} A 158 158 0 0 1 ${cx + 90} ${cy - 158}`}
  fill="none"
/>
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/PlatformEcosystemDiagram.tsx` | Replace Bezier arrow paths with arc paths; adjust AI-POWERED text path positions |

---

## Technical Changes

### 1. New Arc Path Function (replace lines 64-74)

```tsx
// Generate arc path that follows the circle between two angles
const getArcPath = (startAngle: number, endAngle: number, radius: number) => {
  const start = getPosition(startAngle, radius);
  const end = getPosition(endAngle, radius);
  
  // For our clockwise flow around the triangle, we use sweep=1
  // The arc should be less than 180 degrees, so largeArc=0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
};
```

### 2. Update AI-POWERED Text Paths (replace lines 170-189)

```tsx
{/* Curved text paths for AI-POWERED - brought slightly inward */}
<path
  id="aiPoweredTop"
  d={`M ${cx - 85} ${cy - 160} A 160 160 0 0 1 ${cx + 85} ${cy - 160}`}
  fill="none"
/>
<path
  id="aiPoweredBottom"
  d={`M ${cx + 85} ${cy + 160} A 160 160 0 0 1 ${cx - 85} ${cy + 160}`}
  fill="none"
/>
<path
  id="aiPoweredLeft"
  d={`M ${cx - 160} ${cy + 70} A 160 160 0 0 1 ${cx - 160} ${cy - 70}`}
  fill="none"
/>
<path
  id="aiPoweredRight"
  d={`M ${cx + 160} ${cy - 70} A 160 160 0 0 1 ${cx + 160} ${cy + 70}`}
  fill="none"
/>
```

### 3. Update Arrow Paths (lines 263-291)

Replace calls to `getArrowPath` with `getArcPath` and use a radius that sits between the product cards (around 95-100):

```tsx
{/* Safety -> Content (clockwise arc) */}
<path
  d={getArcPath(240 + 20, 360 - 20, 95)}
  fill="none"
  stroke="url(#pinkArrowGradient)"
  strokeWidth="3"
  strokeLinecap="round"
  markerEnd="url(#arrowHeadPink)"
/>

{/* Content -> Training */}
<path
  d={getArcPath(0 + 20, 120 - 20, 95)}
  fill="none"
  stroke="url(#blueArrowGradient)"
  strokeWidth="3"
  strokeLinecap="round"
  markerEnd="url(#arrowHeadBlue)"
/>

{/* Training -> Safety */}
<path
  d={getArcPath(120 + 20, 240 - 20, 95)}
  fill="none"
  stroke="url(#tealArrowGradient)"
  strokeWidth="3"
  strokeLinecap="round"
  markerEnd="url(#arrowHeadTeal)"
/>
```

### 4. Update Animated Dots (lines 293-316)

Update the animated dots to follow the same arc paths.

---

## Visual Result

Before:
```text
      Safety
         \
          \______ Content  (chord cuts through)
         /
      Training
```

After:
```text
      Safety
    ↘ (arc) ↘
              Content  (follows the circle)
    ↗ (arc) ↗
      Training
```

---

## Result

After implementation:
- All three connection arrows follow the circular arc between products
- "AI-POWERED" text labels are fully visible within the viewBox
- Animated dots follow the curved arc paths correctly
- The diagram looks polished and professional

