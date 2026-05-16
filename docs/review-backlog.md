# v2 External Review Backlog

Last updated: 2026-05-15
Baseline source commit before this backlog note: `7c3d324fa8f7b4644adde39664602a067844498a`
Current final-share baseline: `23fce34a56aec3261c0eae3b0376b4a737a9262b`
Final share-packet baseline repaired by Turn 42 release-health reconciliation: `4b1161562e318d1fed61087ec5372b536ab4a1af`
Turn 47 release-QA baseline checked before freeze-note update: `89226320c8e8cbdb15f22ddd31b9de27a6401b7f`
Turn 51 release-QA reset baseline checked before this backlog note: `70e19ec9562dfbbd0203990e0dbbf7f107b1fadd`
Turn 52 visual shell baseline: recorded in `state/worker-log.md` after verification.

## Recommendation

Freeze the site for user review. The current v2 already has the main public-review requirements: a personal first viewport, visible `Legacy` continuity, four verified flagship proof items, profile-first contact actions, public release handoff notes, and static delivery on GitHub Pages plus the Vercel alias.

This backlog is intentionally a review filter, not a new redesign plan. Future work should only proceed if it fixes a verified release issue, adds public-safe proof, responds to user feedback, or repairs confirmed public freshness drift.

## Must fix before sharing

None identified in the current release-candidate evidence.

Decision rationale:
- The root, legacy, handoff, and evidence payload routes were already verified in the Turn 37 freeze run.
- Turn 47 rechecked root, legacy, handoff, content JSON, docs, preview image, CSS, and JS locally; GitHub Pages and the Vercel alias also returned 200 for the core public routes and cache-busted v2 assets.
- Turn 51 rechecked the current Turn 50 baseline locally and publicly. GitHub Pages and the Vercel alias both returned 200 for root, legacy, handoff, content JSON, docs handoff, cache-busted CSS, cache-busted JS, and the 752,937-byte preview image, so there is no freshness repair task open.
- The `Legacy` button is present on the v2 root and handoff route.
- The site does not expose a new raw email address, form endpoint, or private workflow data in v2.
- The full redaction scan caveat is limited to the documented legacy-only contact exception in `legacy/index.html`.

## Nice polish

- Social preview is no longer an open nice-polish item: Turn 46 regenerated `images/website-preview.png` as a 1200x630 public-safe capture of the current v2 homepage and updated the Open Graph dimensions.
- Selected-work mobile density is no longer an open nice-polish item unless a reviewer reports a concrete issue: Turn 48 tightened the narrow-screen PMO lead-proof rhythm without changing claims, media, or routing.
- Reviewer narrative tightening is no longer an open nice-polish item unless a reviewer reports confusion: Turn 50 shortened the hero, highlights, selected-work summaries, and contact guidance without adding new claims or changing evidence sources.
- Release QA/freeze reset is no longer an open nice-polish item unless a public surface becomes stale: Turn 51 confirmed GitHub Pages and the Vercel alias serve the current baseline without needing a manual deploy.
- Portfolio-grade art direction is no longer an open nice-polish item unless a reviewer reports a concrete visual issue: Turn 52 strengthens the existing static CSS shell with a larger editorial masthead, warmer ruled section bands, richer portrait treatment, and stronger card framing while preserving content, media, routes, and `Legacy` continuity.
- Replace or augment structured proof maps with real project screenshots only after source URL, privacy review, image size, and reuse rationale are documented. Turn 49 re-audited the current non-PMO flagships and found no safe media upgrade: BioScript remains too housing-specific for a committed screenshot, and the two repo-only projects have no public workflow screen beyond GitHub chrome.
- Add more native interaction only if it improves review comprehension without adding framework weight or reducing keyboard access. The active section rail and Turn 45 proof journey already cover this category; future interaction work should wait for reviewer feedback.
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
