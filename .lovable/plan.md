

# Redesign "Your Daily Reality" — Realistic Inbox + Horizontal Pain Points

## Changes to `src/components/ops-slides/OpsSlide1DailyReality.tsx`

### Layout
Replace `grid-cols-2` with vertical stack (`flex flex-col gap-4`). Inbox on top (full width), pain points as a horizontal strip below.

### Inbox redesign (top section)
- **Toolbar row**: Checkbox-all, refresh icon, search input, "Inbox (5)" with red unread badge
- **Table-like rows** with columns: checkbox, star icon, sender name, subject line (bold for unread), source system badge, urgency badge, timestamp
- Add `sender` field to each inbox item (e.g. "FOQA System", "Crew Scheduling", "Training Dept", "Compliance Officer", "Safety Board")
- Add `preview` snippet text under each subject
- Add `unread` boolean flag — unread rows get bold subject + slightly brighter background
- Styled as a proper email client panel with `bg-card` border, `divide-y` rows

### Data additions to `inboxItems`
```
sender: "FOQA System" / "Crew Scheduling" / "Training Dept" / "Compliance Officer" / "Safety Board"
preview: short snippet text
unread: true/false (first 3 unread, last 2 read)
```

### Pain points redesign (bottom section)
- Switch to `grid grid-cols-5 gap-3`
- Compact cards: icon centered on top, label below, stat/desc as tiny text
- Remove long descriptions, keep just the stat (e.g. "40% ignored", "3-week avg", "60% chasing")
- Header: "The Pattern" as a small label above the strip

### New imports
- Add `Star`, `RefreshCw`, `CheckSquare` from lucide-react

