# v2 Release Handoff

Last updated: 2026-05-15

## Release-candidate scope

This handoff covers the static v2 personal website in this repository. The release candidate keeps the old portfolio available at `/legacy/` through the fixed translucent `Legacy` button and uses the root route for the current evidence-backed portfolio.

## Architecture

- `index.html` is the v2 homepage and owns the page landmarks, skip links, Legacy button, hero, flagship work, evidence anchors, and contact section.
- `legacy/index.html` preserves the prior site. Do not edit it during v2 polish unless the legacy route itself breaks.
- `css/v2.css` contains the v2 visual system, responsive rules, focus states, section color bands, and interaction styling.
- `js/v2-content.js` renders public-ready evidence and selected-work cards from `content/site-content.json`.
- `js/v2-interactions.js` owns the native proof-focus switcher and project spotlight controller.
- `content/site-content.json` is the source of truth for displayed proof claims.
- `docs/evidence-inventory.md` records why proof items are included, demoted, or held for research.
- `docs/public-safety.md` records the contact and publication-safety decisions.
- The root document includes canonical, Open Graph, Twitter, theme-color, and description metadata. These tags intentionally restate existing public positioning instead of introducing new metrics, employers, or project-status claims.

## Design direction

The current design intentionally moves away from a dark internal-dashboard feel and toward an editorial personal site:

- Portrait-led hero using the existing `images/me3.jpg` asset.
- Clear person-name headline with product and AI workflow positioning in supporting copy.
- Four flagship proof cards first, with broader evidence anchors below.
- Section-level color bands instead of nested card stacks.
- Recruiter-readable contact section that points to public profile surfaces.
- Intrinsic hero-image dimensions and first-viewport preload are present to protect LCP and layout stability without adding a build step.
- Skip links remain hidden until focus and use explicit placement classes so keyboard users can move directly to highlights, flagship work, evidence, or contact.
- The section rail now highlights the active homepage section with native observer state and `aria-current`; this is intentionally a small progressive enhancement rather than a scroll-animation dependency.
- Turn 43 tightened the art direction without changing claims or routes: the homepage now uses a stronger editorial masthead, a slim accent rail, visible desktop positioning chips, warmer section bands, and more deliberate card depth. This borrows the review-friendly hierarchy of strong portfolio templates while keeping the static v2 source model.
- Turn 44 adds a single public-safe media upgrade: the PMO Decision Brief Builder lead card now uses a committed fixture-only screenshot, while BioScript and source-repo flagship items stay on generated proof maps with documented no-screenshot decisions.
- Turn 49 re-audits the remaining media candidates and keeps that boundary. BioScript is still a public proof route but exposes housing-specific packet context in screenshots, and the two source-repo flagship items still lack public workflow screens beyond GitHub repository pages.
- Turn 50 tightens the first two scrolls for reviewer comprehension: the hero, "What I bring" cards, selected-work summaries, and contact guidance are shorter, while the same verified project set, source links, media boundary, and Legacy affordance remain unchanged.

The design borrows portfolio patterns such as a personal first viewport, curated project hierarchy, and visible contact action, but it does not copy template code or unverified assets.

## Interaction behavior

- The hero proof-focus text cycles through source-backed positioning lines and exposes a manual `Next focus` button.
- The hero also exposes a `Trace proof` action that scrolls to flagship work and asks the existing project spotlight controller to emphasize the matching card.
- Auto-rotation is disabled for users who prefer reduced motion.
- The flagship work section renders a native project spotlight controller after the JSON payload loads.
- Flagship cards are keyboard focusable and support arrow-key spotlight changes.
- The section rail updates as reviewers move through the page, while hash navigation remains usable if observer support is unavailable.
- These interactions are progressive enhancements; the core content remains readable without them.
- Turn 45 deliberately reused custom events, `scrollIntoView`, and the existing spotlight state instead of adding a tour overlay, carousel package, or animation library.

## Evidence policy

- Only `publicReady: true` records from `content/site-content.json` render publicly.
- Each displayed proof item must include source type, source URL, and verified date.
- Unknown, stale, or private candidates stay in `researchNeeds`.
- Public copy must not invent metrics, employers, production status, collaborators, or private project details.
- Screenshot-like project visuals are intentionally structured text cues unless reusable public assets are verified. The current verified exception is the PMO Decision Brief Builder screenshot, captured from the public fixture demo and documented with source, size, dimensions, alt text, and safety rationale.
- The latest media audit explicitly rejected adding screenshots for variety alone. A new image should prove the workflow better than the generated proof map and must not widen the privacy, sourcing, or implied-status surface.

## Contact policy

The v2 contact path is profile-first:

- Hero and featured contact actions route to `#contact`.
- Contact section links to GitHub, public resume, and LinkedIn.
- No new raw email address, form endpoint, or scheduling link is exposed in v2.
- Any future direct-contact change should first update `docs/public-safety.md` with a clear policy decision.

## Accessibility and metadata polish

- Page language, title, description, canonical URL, social-preview tags, landmarks, section labels, portrait alt text, and external-link `rel="noopener noreferrer"` attributes were reviewed in the release-polish pass.
- `prefers-reduced-motion` keeps native interactions available while suppressing transitions and animations for reduced-motion users.
- The social preview points to the committed `images/website-preview.png`, regenerated in Turn 46 as a 1200x630 capture of the current v2 homepage. It shows the current name, portrait, proof-focus panel, and top-right `Legacy` access instead of the old legacy-era hero.

## Routes to preserve

- `/` for v2 homepage.
- `/legacy/` for the prior site.
- `/handoff/` for the public browser-readable release handoff.
- `/content/site-content.json` for the evidence payload.
- `/docs/handoff.md` for the source handoff note.

## Deployment notes

- GitHub Pages is expected to serve the repository root.
- Vercel deploys use the `hardik-s-github-io` project and the alias `https://hardik-s-github-io.vercel.app`.
- `.vercel/` is local deploy identity and is intentionally ignored by the committed `.gitignore`.
- Earlier automation runs hit Vercel's daily deployment quota, so manual CLI deploys should still respect the retry cap. The 2026-05-15 Turn 42 release-health check completed manual production deployment `dpl_5zfX5deqYPAhmKsaJ5yRxjm7gGvT`, and the alias `https://hardik-s-github-io.vercel.app` served the final share-packet handoff plus current v2 assets afterward. A later log-only deploy attempt for commit `96d656f6a298ca88603d281d3a7e9395557815b1` hit `api-deployments-free-per-day`, so GitHub Pages is the freshest documentation surface until quota reset or integration catch-up.

## Release freeze status

- Final share packet timestamp: 2026-05-15T19:04:01-04:00.
- Verified source baseline before this handoff refresh: `23fce34a56aec3261c0eae3b0376b4a737a9262b`.
- Release-health reconciliation timestamp: 2026-05-15T19:16:54-04:00.
- Final share-packet baseline repaired by reconciliation: `4b1161562e318d1fed61087ec5372b536ab4a1af`.
- GitHub Pages review URL: `https://hardik-s.github.io/`.
- Vercel alias review URL: `https://hardik-s-github-io.vercel.app/`.
- Public route checks returned HTTP 200 for `/`, `/legacy/`, `/handoff/`, and `/content/site-content.json` on both GitHub Pages and the Vercel alias.
- Cache-busted public checks confirmed the Turn 40 active-section rail markers in `js/v2-interactions.js` and `css/v2.css` on both public surfaces.
- The Turn 42 deploy repaired the stale Vercel `/handoff/` route observed after the final share packet. The final log-only source commit is not manually redeployed to Vercel because the daily quota cap returned; this does not change homepage or legacy behavior.
- Rendered screenshots have been inspected at mobile, tablet, desktop, selected-work, contact, and handoff routes across the release-freeze and Turn 40 passes; the Legacy button remained visible and no first-viewport or flagship-work overlap was observed.
- Turn 46 regenerated the link-preview asset from the current v2 homepage and updated Open Graph dimensions to 1200x630. This keeps cold-share previews aligned with the actual review surface without adding a new claim, direct contact path, or unverified project image.
- Turn 47 release QA checked source baseline `89226320c8e8cbdb15f22ddd31b9de27a6401b7f` before this freeze-note update. Local route checks returned 200 for root, legacy, handoff, docs, content JSON, preview image, CSS, and JS; Browser interaction QA confirmed `Trace proof` adds `is-proof-journey` with no console errors; Playwright screenshots covered mobile, tablet, desktop, selected-work after JSON render delay, and contact.
- Turn 47 public checks returned 200 on both GitHub Pages and the Vercel alias for root, legacy, handoff, content JSON, cache-busted CSS, and cache-busted JS. The 1200x630 preview image remained present locally and is part of the public share surface.
- Turn 48 makes only a screenshot-driven mobile rhythm adjustment in the selected-work section: the spotlight, PMO media caption, rank chip, labels, and lead-card spacing are tighter on narrow screens. It intentionally does not change evidence copy, routes, media, or the top-right `Legacy` affordance.
- Turn 49 confirms there is no safe new media asset to add from the current non-PMO flagship set. The PMO screenshot remains the only committed selected-work media until a sanitized BioScript preview or an actual public workflow screen for the repo-only projects is verified.
- Turn 50 makes a copy-only narrative tightening pass. It keeps the H1 as `Hardik Shrestha`, removes harder-to-scan internal-process phrasing from the first two scrolls, and avoids new claims about metrics, employers, production impact, BioScript internals, or direct availability.
- Recommendation: share `https://hardik-s.github.io/` for review. The Vercel alias is also healthy for this baseline, but GitHub Pages remains the canonical source-backed review URL. Do not change the site unless review feedback, public freshness drift, a resume/profile update, or newly verified public-safe project evidence appears.

## External review backlog

The active review backlog is intentionally short and lives in `docs/review-backlog.md`. It separates remaining work into `must fix before sharing`, `nice polish`, and `needs new verified evidence` so future turns do not restart broad redesign by default.

Current recommendation:

- Must fix before sharing: none identified from the current release-candidate evidence.
- Nice polish: verified real project screenshots only after source URL, privacy review, image size, and reuse rationale are documented. Turn 49 found no safe new media upgrade in the current non-PMO flagship set. The social preview and restrained native interaction lanes are already covered by the current v2 baseline.
- Needs new verified evidence: BioScript artifacts, project screenshots, metrics, employer/customer status, and any new project claims must remain excluded until public-safe proof is documented.
- Default next action: share the current public URL for review, then act only on concrete feedback or newly verified evidence.

## Verification checklist

Run this from the repository root before treating the site as release-ready:

```powershell
git status --short
git diff --check
node --check js\v2-content.js
node --check js\v2-interactions.js
Get-Content content\site-content.json -Raw | ConvertFrom-Json

python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/handoff/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/docs/handoff.md

npx --yes playwright screenshot --viewport-size=390,844 http://127.0.0.1:4173/ state/qa/turn32-mobile.png
npx --yes playwright screenshot --viewport-size=768,1024 http://127.0.0.1:4173/ state/qa/turn32-tablet.png
npx --yes playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4173/ state/qa/turn32-desktop.png

powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\scripts\codex-public-redaction-scan.ps1" -Path .
```

Expected redaction result: the full-repo scan may still report the documented legacy-only contact string in `legacy/index.html`; changed v2 files and docs should remain clean.

## Current caveats

- Manual Vercel CLI deploys previously hit quota during Turn 42 and Turn 45/46 follow-ups, so future manual deploys should still start with preflight and respect the two-equivalent-failures cap. Turn 47 did not need a manual deploy because the Vercel alias served the checked baseline during public freshness QA.
- GitHub Pages may lag immediately after future pushes; recheck `/`, `/legacy/`, `/handoff/`, and cache-busted v2 assets before external review.
- The legacy page intentionally contains older content and should be evaluated as continuity, not as the v2 positioning surface.

## Do not change unless

- A reviewer reports a concrete visual, accessibility, content, or route defect.
- A new public-safe project artifact is verified and materially improves the selected-work section.
- The user confirms a newer public resume, profile URL, or design direction.
- GitHub Pages or the Vercel alias becomes stale and needs a release-health repair.
