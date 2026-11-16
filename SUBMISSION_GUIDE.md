# Anna Founding Builder Program & DoraHacks `#2349` Submission Guide — `AccessLens AI`

- **Target Handle / Slug**: `@jeffrey-graham/accesslens-ai` (`slug: "accesslens-ai"`)
- **Partner Developer Console**: `https://anna.partners/developer`
- **Hackathon Portal**: `https://dorahacks.io/hackathon/2349` ($80,000/month Founding Builder Pool)

---

## 1. Anna Developer Console (`anna.partners`) Deployment Pipeline

All files are pre-validated against Anna's `schema: 4` `AppManifest` (`extra="forbid"`), small-screen `min_size` baseline (`<= 1024x600`), and strict bundle CSP (`script-src 'self' <sdk-origin>`, zero inline scripts or `on*=` attributes).

1. **Create App (`POST /api/v1/developer/apps`)**:
   - Copy listing fields from [`anna-listing-metadata.json`](./anna-listing-metadata.json):
     - `name`: `AccessLens AI`
     - `slug`: `accesslens-ai`
     - `category`: `productivity`
     - `tagline`: `Transform dense medical, legal, financial & technical text into plain English, checklists, dyslexia studios, WCAG HTML repairs, narration & concept maps.`
2. **Upload Logo (`POST /api/v1/developer/apps/{app_id}/logo`)**:
   - Upload [`assets/app-logo.png`](./assets/app-logo.png) (`512x512` PNG, `101 KB` — well under the `2 MB` limit; auto-converted to `256x256` WebP on Anna's CDN).
   - Optional cover/screenshot: [`assets/architecture-preview.png`](./assets/architecture-preview.png) (`1280x720` PNG).
3. **Create Version `1.0.0` (`POST /api/v1/developer/apps/{app_id}/versions`)**:
   - Paste [`anna-app.manifest.json`](./anna-app.manifest.json) (`schema: 4`, 6 named UI views: `main`, `checklist`, `dyslexia_studio`, `html_repair`, `narration`, `concept_map`).
4. **Upload & Finalize Static SPA Bundle (`ui_bundle_status: "bundle_ready"`)**:
   - Archive ready in [`dist/accesslens-anna-ui-bundle.zip`](./dist/accesslens-anna-ui-bundle.zip) (`4` files: `index.html`, `assets/app.css`, `assets/app.js`, `assets/app-logo.png`).
   - Exact SHA-256 & byte-size `file_map` precomputed in [`dist/bundle-init-payload.json`](./dist/bundle-init-payload.json) for:
     1. `POST /api/v1/developer/apps/{app_id}/versions/{version_id}/bundle/init`
     2. `PUT` each file to `presigned_put_url` (or `POST` to `proxy_upload_url`)
     3. `POST /api/v1/developer/apps/{app_id}/versions/{version_id}/bundle/finalize` -> confirms `status: "bundle_ready"`.
5. **Submit for Review (`POST /api/v1/developer/apps/{app_id}/submit-review`)**:
   - Pins `v1.0.0` as `review_candidate_version` for admin approval (and Isabel's Founding Builder Program review!).
