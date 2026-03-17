

# Recommendation: Executive Inbox Style for OpsSlide1 "Daily Reality"

## Why Inbox Wins

The target audience is operational leadership — people who live in their inbox. An inbox-style view creates immediate visceral recognition ("that's my morning") in a way a clean timeline cannot. It also reinforces the core problem narrative: chaos arriving from disconnected systems, all landing in one place with no coordination.

## Change to `src/components/ops-slides/OpsSlide1DailyReality.tsx`

Replace the left-column timeline with an **inbox panel** styled like a notification/email list:

- Each row is a "message" with: **urgency badge** (red Critical / amber Warning), **source system** tag (SMS, FOQA, Email, Spreadsheet), **subject line**, and **time stamp**
- Top of inbox shows an unread count badge: "5 unread · 3 systems · 0 linked"
- Subtle styling: `bg-card` background, `divide-y` between rows, monospace timestamps, hover highlight
- Bottom stat line: *"Same event. 3 systems. No connection."*

### Inbox Items (replacing current timeline)
| Time | Source | Subject | Urgency |
|------|--------|---------|---------|
| 06:15 | SMS | Hard landing report filed — runway 27L | 🔴 Critical |
| 08:30 | Ops Portal | Crew scheduling notice — no link to SMS report | 🟡 Warning |
| 10:00 | Email | Training team unaware — crew flies next sector | 🔴 Critical |
| 14:00 | Spreadsheet | Compliance requests evidence — 3 emails, 2 attachments | 🟡 Warning |
| 17:30 | SMS | Investigation opened — third duplicate entry for same event | 🟠 Escalation |

The right column (pain points) stays as-is — it already works well as the analytical counterpart to the emotional inbox.

## Files
- **Edit:** `src/components/ops-slides/OpsSlide1DailyReality.tsx` — replace timeline with inbox component, add `Mail`/`Inbox` icon imports

