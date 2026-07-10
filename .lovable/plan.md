Switch the "Client package" export from Markdown to a Word `.docx` file.

## Approach
- Add the `docx` npm package (browser-compatible).
- Replace `downloadClientPackage()` in `src/components/editorial/ItemDetail.tsx` to build a `Document` with:
  - Title (working title) as Heading 1
  - Meta line (quarter · persona · channel · asset type)
  - Optional "Draft — not yet approved as final" note when asset isn't final
  - **Brief** section (Heading 2) with labeled paragraphs / bulleted lists for angle, audience, core insight, takeaways, proof points, distribution, CTA/tone/length, success metric, sources
  - **Final copy (v{n})** section (Heading 2) — asset body split by blank lines into paragraphs; lines starting with `# `/`## `/`### ` become headings, `- ` become bullets
- Use `Packer.toBlob()` and trigger download as `{slug}-client-package-v{n}.docx`.
- Keep existing "Download .md" and "Copy" buttons unchanged.

## Scope
Frontend only. No backend, schema, or data changes.