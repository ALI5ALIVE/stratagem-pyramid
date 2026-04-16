

# Remove Password Gates from All Playbooks

## Summary
Remove the client-side password login screens from all three playbook pages so they load directly without authentication.

## Changes (3 files)

### 1. `src/pages/DTOPPlaybook.tsx`
- Remove `GATE_PASSWORD`, `unlocked`, `password`, `error` state variables
- Remove `handlePasswordSubmit` function
- Remove the `if (!unlocked)` login card block
- Remove `Lock` icon import, `Card`/`CardHeader`/`CardTitle`/`CardContent`/`Input`/`Button` imports (if unused elsewhere)

### 2. `src/pages/CoAnalystDeck.tsx`
- Same removals as above

### 3. `src/pages/RegulationManagementPlaybook.tsx`
- Same removals as above

**3 files modified. No new files.**

