# Public-safety note - v2 contact path

## Decision

- 2026-05-16 flagship rework changes the root v2 contact boundary:
  - The homepage now includes a direct contact form that posts to the same Google Apps Script endpoint preserved in the legacy site.
  - The homepage now exposes the same direct phone/email contact surface the user asked to restore from legacy.
  - This is an intentional public personal-data exposure in the already-public personal website repository, not an accidental leak.
  - Do not add additional contact channels, scheduler links, private profile URLs, or alternate recipients without a new explicit decision here.
- Turn 14 leaves v2 contact in a deliberately explicit route:
  - `Contact` in the hero links to the in-page `#contact` section.
  - Featured contact cards also route to `#contact` instead of using an empty-recipient email compose link.
  - The contact section exposes public, recruiter-safe pathways:
    - GitHub profile
    - Public resume artifact
    - LinkedIn profile
- Historical Turn 27 kept the prior v2 contact path profile-first:
  - The copy asks reviewers to reference a relevant flagship proof item.
  - No form endpoint, new raw email address, or private scheduling link is introduced.
  - This keeps the public page useful for hiring review while avoiding a new direct-contact exposure decision.
- No new direct email recipient was added to v2 contact links in this increment.
- Turn 32 metadata uses only public positioning already visible on the homepage: product-minded software builder, AI-enabled workflow tools, decision-support demos, and public source proof. It does not add employers, metrics, private project status, or new contact channels.
- The earlier final sprint recruiter-trust pass kept that profile-first boundary while adding a reviewer route. The 2026-05-16 flagship rework supersedes that root-page boundary by explicit request.

## Legacy continuity

- The historical `legacy/` route continues to preserve prior portfolio behavior and includes historical contact material.
- The top-right translucent `Legacy` button remains the documented transition back to the legacy page.

## Risk note

- The direct root contact surface is now intentionally restored. Future changes should treat it as personal data on a public site and avoid expanding it casually.
- If the Apps Script endpoint is replaced, prefer a same-origin Vercel Function with provider credentials in Vercel env vars; do not fake success in browser-only JavaScript.
- Any future additional direct contact address should use a documented allowlist/scope and include a preflight-level privacy review.

## Publication safety policy

- Public-facing state logs and docs should avoid raw local filesystem paths and new direct contact literals unless the item is an explicit root contact or legacy contact exception.
- Legacy contact literals in `legacy/index.html` remain allowed as documented historical content. Root contact literals are now also intentional because the current request restored the legacy contact surface.
- Open Graph and Twitter image metadata should continue to point only at committed public assets or verified public URLs.
- Turn 46 updates `images/website-preview.png` to a 1200x630 capture of the current committed v2 homepage. This is allowed because it contains only already-public homepage content, the existing portrait asset, profile-safe positioning copy, and the visible `Legacy` route affordance.
- The final sprint refreshes `images/website-preview.png` from the current homepage after the typed signal and contact reviewer route were present. This remains allowed under the same public-content rule and does not introduce a synthetic graphic or new claim surface.
- Do not replace the social preview with a synthetic or externally sourced graphic unless the source, ownership, visible text, dimensions, and publication rationale are documented here first.
- Selected-work visuals are generated from public JSON labels and cues. Do not replace them with screenshots until the capture source, visible data, image size, and reuse rationale are documented in `docs/evidence-inventory.md`.
- Turn 44 permits one exception: `images/work-pmo-decision-brief-builder.png` is allowed because it was captured from a public fixture-only PMO demo route, contains no private records or contact details, and has source URL, capture date, dimensions, file size, alt text, and safety rationale recorded in `content/site-content.json` and `docs/evidence-inventory.md`.
- The BioScript Housing Decision route remains public evidence, but its screenshot is intentionally excluded from this repository because the visible packet includes housing-specific decision details and listing imagery. Keep that card on a generated proof map unless a sanitized/owned preview is produced and documented.
- Turn 49 rechecked the non-PMO flagship media candidates and kept the same boundary: BioScript is public but too specific for a committed screenshot, while Agent Permission Review Console and Invoice Dispute Packet Builder have public source repositories but no public workflow screen beyond GitHub chrome. No new media asset was added.
