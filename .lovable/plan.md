

# Add Password Gate to CoAnalyst Playbook

## Approach
Add a simple client-side password gate directly in `CoAnalystDeck.tsx`. When the page loads, show a password input dialog. The deck only renders after the correct password is entered. Store the unlock state in `sessionStorage` so refreshing doesn't re-prompt during the same browser session.

## Change: `src/pages/CoAnalystDeck.tsx`
- Add a `const [unlocked, setUnlocked]` state (initialized from `sessionStorage`)
- Add a `const [password, setPassword]` state for the input
- Define the password as a constant (e.g., `"comply2025"`)
- If not unlocked, render a centered card with a password input and submit button instead of the deck
- On correct password, set `sessionStorage.setItem('ca-unlocked', 'true')` and flip state
- Show error message on wrong password
- The rest of the component remains unchanged, wrapped in the unlocked conditional

This is a simple client-side gate — not security-grade authentication, just a lightweight access barrier as requested "for the time being."

