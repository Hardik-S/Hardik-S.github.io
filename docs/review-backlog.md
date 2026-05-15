# v2 External Review Backlog

Last updated: 2026-05-15
Baseline source commit before this backlog note: `7c3d324fa8f7b4644adde39664602a067844498a`

## Recommendation

Freeze the site for user review. The current v2 already has the main public-review requirements: a personal first viewport, visible `Legacy` continuity, four verified flagship proof items, profile-first contact actions, public release handoff notes, and static delivery on GitHub Pages plus the Vercel alias.

This backlog is intentionally a review filter, not a new redesign plan. Future work should only proceed if it fixes a verified release issue, adds public-safe proof, or responds to user feedback.

## Must fix before sharing

None identified in the current release-candidate evidence.

Decision rationale:
- The root, legacy, handoff, and evidence payload routes were already verified in the Turn 37 freeze run.
- The `Legacy` button is present on the v2 root and handoff route.
- The site does not expose a new raw email address, form endpoint, or private workflow data in v2.
- The full redaction scan caveat is limited to the documented legacy-only contact exception in `legacy/index.html`.

## Nice polish

- Create a new public-safe social preview image if the user wants stronger link-unfurl presentation. Reuse only committed, owned, or generated assets with documented dimensions and source.
- Replace or augment structured proof maps with real project screenshots only after source URL, privacy review, image size, and reuse rationale are documented.
- Add one restrained native interaction only if it improves review comprehension without adding framework weight or reducing keyboard access.
- Refresh resume/profile links after the user confirms a newer public artifact.

## Needs new verified evidence

- BioScript production or demo artifacts beyond the current public route should stay out of homepage copy until a safe public source is confirmed.
- Any project metric, employer/customer status, collaborator claim, or deployment status not visible from a public route or repository should remain excluded.
- Screenshot captures should not be committed if they contain private data, local paths, raw email addresses, credentials, or implied production metrics.

## Review rubric snapshot

- First impression: shareable. The root route presents Hardik by name with portrait-led positioning and clear actions.
- Identity: strong enough for review. The copy frames product-minded AI/workflow building without overstating credentials.
- Projects: strong enough for review. Four flagship items are curated and source-backed; broader anchors remain below.
- Recruiter credibility: strong enough for review. Resume, GitHub, LinkedIn, and public source proof are reachable.
- Technical craft: strong enough for review. Static source-driven rendering, JSON evidence payloads, native interactions, metadata, and route preservation are documented.
- Responsive/accessibility: release-ready based on prior screenshot and route checks; keep testing before any visual change.
- Performance: strong for a static no-build site. Future polish should not add heavy runtime dependencies.
- Legacy preservation: release-ready. `/legacy/` remains the continuity route and the top-right button is the global affordance.
- Documentation: strong. README, public-safety notes, handoff route, evidence inventory, and this backlog now define the operating boundary.

## Stop conditions

Do not continue open-ended polish unless one of these is true:

- A reviewer reports a concrete visual, accessibility, content, or route defect.
- A new public-safe project artifact is verified and materially improves the selected-work section.
- The user asks for a specific design direction after reviewing the current public URLs.
- Vercel or GitHub Pages freshness becomes stale and needs a release-health repair.

