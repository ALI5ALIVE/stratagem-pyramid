Add a "Download client package" button in the asset section of the Editorial Suite item detail that exports the approved brief plus the selected asset version as a single, client-ready file.

## Where
`src/components/editorial/ItemDetail.tsx` — asset toolbar (next to the existing "Download .md" button).

## Output
A single `.md` file, client-tone (no internal scoring/rubric noise):

```
# {Working title}

_{Quarter} · {Persona} · {Channel} · {Asset type}_

## Brief
- Angle: …
- Audience: …
- Core insight: …
- Key takeaways: …
- Proof points: …
- Distribution: …
- CTA / Tone / Length: …
- Sources: …

---

## Final copy (v{n})
{asset.body}
```

Filename: `{slugified-title}-client-package-v{version}.md`.

## Behaviour
- Enabled whenever an asset exists. If the active asset isn't `final`, prepend a small "Draft — not yet approved as final" note so shared files are honest.
- Pulls brief fields from current state (already loaded); no new fetches.
- Keep the existing "Download .md" (raw copy only) alongside it.

## Scope
Frontend only. No schema, edge function, or data changes.