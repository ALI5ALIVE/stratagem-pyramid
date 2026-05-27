I’ll replace the direct PDF card link with an in-app document viewer route.

Plan:
1. Create a dedicated `AI Naming & Architecture Brief` page inside the Market Development area.
2. Embed the existing PDF inside that page so it stays within the Lovable app shell instead of opening a raw PDF/new browser context.
3. Change the Market Development card href from the PDF asset URL to the new internal route.
4. Add the new route to the Market Development routing block.
5. Keep a small fallback/download link on the viewer page in case a browser cannot render embedded PDFs.