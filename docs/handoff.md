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

The design borrows portfolio patterns such as a personal first viewport, curated project hierarchy, and visible contact action, but it does not copy template code or unverified assets.

## Interaction behavior

- The hero proof-focus text cycles through source-backed positioning lines and exposes a manual `Next focus` button.
- Auto-rotation is disabled for users who prefer reduced motion.
- The flagship work section renders a native project spotlight controller after the JSON payload loads.
- Flagship cards are keyboard focusable and support arrow-key spotlight changes.
- The section rail updates as reviewers move through the page, while hash navigation remains usable if observer support is unavailable.
- These interactions are progressive enhancements; the core content remains readable without them.

## Evidence policy

- Only `publicReady: true` records from `content/site-content.json` render publicly.
- Each displayed proof item must include source type, source URL, and verified date.
- Unknown, stale, or private candidates stay in `researchNeeds`.
- Public copy must not invent metrics, employers, production status, collaborators, or private project details.
- Screenshot-like project visuals are intentionally structured text cues until reusable public assets are verified.

## Contact policy

The v2 contact path is profile-first:

- Hero and featured contact actions route to `#contact`.
- Contact section links to GitHub, public resume, and LinkedIn.
- No new raw email address, form endpoint, or scheduling link is exposed in v2.
- Any future direct-contact change should first update `docs/public-safety.md` with a clear policy decision.

## Accessibility and metadata polish

- Page language, title, description, canonical URL, social-preview tags, landmarks, section labels, portrait alt text, and external-link `rel="noopener noreferrer"` attributes were reviewed in the release-polish pass.
- `prefers-reduced-motion` keeps native interactions available while suppressing transitions and animations for reduced-motion users.
- The social preview points to the committed `images/website-preview.png`; replace it only after a separately verified public-safe preview asset exists.

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
- Earlier automation runs hit Vercel's daily deployment quota, so manual CLI deploys should still respect the retry cap. The 2026-05-15 Turn 40 follow-up completed a manual production deploy after the alias lagged, and both public surfaces served the active-section rail assets afterward.

## Release freeze status

- Final share packet timestamp: 2026-05-15T19:04:01-04:00.
- Verified source baseline before this handoff refresh: `23fce34a56aec3261c0eae3b0376b4a737a9262b`.
- GitHub Pages review URL: `https://hardik-s.github.io/`.
- Vercel alias review URL: `https://hardik-s-github-io.vercel.app/`.
- Public route checks returned HTTP 200 for `/`, `/legacy/`, `/handoff/`, and `/content/site-content.json` on both GitHub Pages and the Vercel alias.
- Cache-busted public checks confirmed the Turn 40 active-section rail markers in `js/v2-interactions.js` and `css/v2.css` on both public surfaces.
- Rendered screenshots have been inspected at mobile, tablet, desktop, selected-work, contact, and handoff routes across the release-freeze and Turn 40 passes; the Legacy button remained visible and no first-viewport or flagship-work overlap was observed.
- Recommendation: share the current public URL for review. Do not change the site unless review feedback, public freshness drift, a resume/profile update, or newly verified public-safe project evidence appears.

## External review backlog

The active review backlog is intentionally short and lives in `docs/review-backlog.md`. It separates remaining work into `must fix before sharing`, `nice polish`, and `needs new verified evidence` so future turns do not restart broad redesign by default.

Current recommendation:

- Must fix before sharing: none identified from the current release-candidate evidence.
- Nice polish: custom social preview, verified real project screenshots, or one restrained native interaction only after review value is clear.
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

- Manual Vercel CLI deploys should not be retried inside the prior quota window without a fresh preflight, but the alias is currently fresh through the existing integration.
- GitHub Pages may lag immediately after future pushes; recheck `/`, `/legacy/`, `/handoff/`, and cache-busted v2 assets before external review.
- The legacy page intentionally contains older content and should be evaluated as continuity, not as the v2 positioning surface.

## Do not change unless

- A reviewer reports a concrete visual, accessibility, content, or route defect.
- A new public-safe project artifact is verified and materially improves the selected-work section.
- The user confirms a newer public resume, profile URL, or design direction.
- GitHub Pages or the Vercel alias becomes stale and needs a release-health repair.
