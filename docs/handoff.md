# v2 Release Handoff

Last updated: 2026-05-16

## Release-candidate scope

This handoff covers the static v2 personal website in this repository. The release candidate keeps the old portfolio available at `/legacy/` through the fixed translucent `Legacy` button and uses the root route for the current evidence-backed portfolio.

2026-05-16 update: the root route has been reworked again as a full personal portfolio. It restores the legacy site sections, adds a working static contact form, removes visible helper/reviewer text from the homepage, and replaces the legacy external node-network dependency with a local cursor-reactive canvas.

2026-05-16 flagship correction: the root flagship section no longer leads with PMO Decision Brief Builder. The best-four layer now presents BioScript Workflow Prototype, Agent Permission Review Console, Picture This, and Wacky Chess Vision, followed by a native tabbed year browser with four items each for 2026, 2025, 2024, 2022-23, 2021, and 2020. Resume links now use committed local PDFs in `files/` instead of the old Drive link. Verify this correction by checking `#flagship` on desktop and mobile, clicking each year tab, and opening both resume links from the contact card.

## Architecture

- `index.html` is the current homepage and owns the page landmarks, skip link, Legacy button, hero, About, Experience, Flagship Work, Skills, Projects, Sustainability, and Contact sections.
- `legacy/index.html` preserves the prior site. Do not edit it during v2 polish unless the legacy route itself breaks.
- `css/flagship-rework.css` contains the active homepage visual system, responsive rules, contact form styling, and editorial section rhythm.
- `js/flagship-rework.js` owns the native typed identity line, cursor-reactive node network canvas, active nav state, and contact form status.
- `css/v2.css`, `js/v2-content.js`, and `js/v2-interactions.js` remain in the repository as prior-v2 implementation history; the current root page no longer references them.
- `content/site-content.json` is retained as the prior-v2 evidence record. The current root flagship/year-browser copy is static HTML in `index.html`.
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
- Turn 52 is a CSS-only portfolio-grade art-direction reset after the Director reopened visual work. It keeps the existing portrait, evidence JSON, project order, PMO media, and legacy continuity, but increases the editorial name scale, adds a subtle `HS` masthead mark, warms the ruled section bands, and gives cards a more personal portfolio frame. It explicitly rejects copied template code, generated hero graphics, new evidence claims, decorative orb/blob backgrounds, and a new route or content architecture.

The design borrows portfolio patterns such as a personal first viewport, curated project hierarchy, and visible contact action, but it does not copy template code or unverified assets.

## Interaction behavior

- The current root hero restores the legacy kinetic identity with a native typed line.
- The current root hero restores the legacy node-network idea as a local canvas (`#node-network`) that follows the cursor and disables itself for reduced-motion users.
- The contact form posts to the existing legacy Apps Script endpoint through a hidden iframe so static Vercel/GitHub Pages hosting can submit without a same-origin backend.
- The hero proof-focus text cycles through source-backed positioning lines and exposes a manual `Next focus` button.
- The hero working-mode signal uses native JavaScript to type through existing evidence-safe phrases. It remains static without JavaScript, exposes a stable accessible label, and stops animating for reduced-motion users.
- The hero also exposes a `Trace proof` action that scrolls to flagship work and asks the existing project spotlight controller to emphasize the matching card.
- Auto-rotation is disabled for users who prefer reduced motion.
- The flagship work section renders a native project spotlight controller after the JSON payload loads.
- Flagship cards are keyboard focusable and support arrow-key spotlight changes.
- The section rail updates as reviewers move through the page, while hash navigation remains usable if observer support is unavailable.
- These interactions are progressive enhancements; the core content remains readable without them.
- Turn 45 deliberately reused custom events, `scrollIntoView`, and the existing spotlight state instead of adding a tour overlay, carousel package, or animation library.
- Turn 53 makes the hero proof chips clickable focus controls and adds a pointer-responsive portrait tilt for users who have not requested reduced motion. The change is intentionally native JavaScript, keyboard-operable, and claim-neutral; it borrows the old site's sense of motion without restoring the legacy canvas, jQuery carousel, or typed-plugin stack.
- Turn 54 improves the flagship visual proof layer without adding media: the PMO screenshot and generated proof maps now show compact artifact/source/verified chips from the existing JSON metadata. This gives reviewers more context in the visual area while keeping the no-unverified-screenshot boundary intact.
- Turn 55 adds a small human story layer inside the existing first-scroll highlights section. The builder through-line makes the working style more legible to a cold reviewer while keeping the same project set, source links, media policy, contact path, and legacy continuity.
- Turn 56 closes the Turn 55 freshness gap before any new design work. It records that the builder-story source commit, the worker-log/freshness follow-up, GitHub Pages, and the Vercel alias were checked as a documentation-only release-health increment.
- The 2026-05-16 above-fold warmth pass brings the same working pattern into the hero as compact method chips and gives the hero a warmer editorial frame. It deliberately keeps the evidence payload, project ordering, PMO media boundary, contact policy, and `/legacy/` continuity unchanged.
- The Turn 57 native proof-path pass makes the hero method chips interactive without changing their claims: each chip remains a hash anchor, and JavaScript syncs the proof-focus text, selected-work spotlight, reduced-motion-aware scroll behavior, and manual-stop behavior for the rotating proof focus when available.
- The Turn 59 first-viewport rhythm pass is a CSS-only visual QA correction. It reduces hero height and spacing, hides the redundant proof-strip row now that method chips provide the direct proof path, and keeps the `Next focus` and `Trace proof` controls available.
- The Turn 60 case-study path pass adds a compact reviewer path to each flagship work card. The path tells reviewers how to inspect the public route or repository, keeps the same four selected projects and media policy, and avoids new metrics, screenshots, customer claims, or production-status claims.
- The Turn 61 native typed-signal pass restores a small amount of legacy-style motion without importing the old typed plugin or canvas stack. It changes only the hero signal layer and docs; evidence JSON, selected-work cards, media, routes, contact policy, and `/legacy/` remain unchanged.
- The earlier final sprint recruiter-trust pass avoided raw direct contact. The 2026-05-16 flagship rework supersedes that profile-only root boundary by restoring direct contact details and a static form.

## Evidence policy

- Only `publicReady: true` records from `content/site-content.json` render publicly.
- Each displayed proof item must include source type, source URL, and verified date.
- Unknown, stale, or private candidates stay in `researchNeeds`.
- Public copy must not invent metrics, employers, production status, collaborators, or private project details.
- Screenshot-like project visuals are intentionally structured text cues unless reusable public assets are verified. The current verified exception is the PMO Decision Brief Builder screenshot, captured from the public fixture demo and documented with source, size, dimensions, alt text, and safety rationale.
- The latest media audit explicitly rejected adding screenshots for variety alone. A new image should prove the workflow better than the generated proof map and must not widen the privacy, sourcing, or implied-status surface.

## Contact policy

The current root contact path is direct again:

- Hero `Contact` routes to `#contact`.
- Contact section links to phone, email, GitHub, and LinkedIn.
- Contact form posts to the existing legacy Google Apps Script endpoint.
- This intentionally restores the legacy contact surface and therefore exposes personal contact data on the public site.
- Any future expansion of direct contact channels should first update `docs/public-safety.md` with a clear policy decision.

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
- Turn 51 release QA reset checks the current Turn 50 baseline `70e19ec9562dfbbd0203990e0dbbf7f107b1fadd` without changing homepage content or assets. Local HTTP checks returned 200 for root, legacy, handoff, docs, content JSON, v2 CSS/JS, and the social preview image; CLI Playwright screenshots covered mobile root, tablet root, desktop root, selected-work mobile, contact mobile, and handoff mobile; the fixed translucent `Legacy` control stayed visible in inspected mobile views. A plain Node interaction probe was abandoned after two equivalent transient Playwright module-resolution failures, so this run used route checks plus rendered screenshot evidence instead of retrying that surface.
- Turn 51 public freshness checks returned HTTP 200 for GitHub Pages and the Vercel alias across root, legacy, handoff, content JSON, source handoff notes, cache-busted CSS, cache-busted JS, and the 752,937-byte social preview image. No manual Vercel deploy was needed because the alias already served the current baseline.
- Turn 52 keeps the Turn 51 release evidence intact while making the root page more portfolio-grade through CSS only. The top-right `Legacy` affordance, `/legacy/`, `/handoff/`, evidence payload, JavaScript interactions, selected-work media policy, and social preview file remain unchanged.
- Turn 53 adds native first-viewport interaction on top of the Turn 52 visual shell. The proof chips now switch the proof-focus line directly, and the hero portrait responds subtly to pointer movement when reduced motion is not requested; routes, evidence JSON, screenshots, and legacy continuity remain unchanged.
- Turn 54 keeps the Turn 53 interaction baseline and adds visual provenance chips to selected-work cards. It does not change project order, links, claims, screenshots, routes, contact policy, or `Legacy` continuity.
- Turn 55 keeps the Turn 54 proof baseline and adds the reviewer-facing builder through-line in the `What I bring` section. The pass is copy/layout only: no evidence JSON, project links, screenshots, route behavior, contact channel, or `Legacy` behavior changes.
- Turn 56 confirms Turn 55 closure rather than changing the homepage: source commit `e76f70e84cf19d204a3b31b8c85e193c3494b527`, worker-log/freshness commit `429063e3a23584efa5d4992f2ee01c139b97b546`, root/handoff/docs freshness, and automation-memory catch-up are the scope.
- The 2026-05-16 above-fold warmth pass implements the Director's next visual task after the closure note: the first viewport now exposes `Listen / Frame / Build / Document` directly in the hero and uses a warmer framed masthead treatment. No new content claims, media captures, route changes, or contact surfaces were added.
- The 2026-05-16 native proof-path pass implements the next Director interaction task after the warmth pass. The hero method chips now route reviewers through `#highlights`, `#selected-work`, and `#evidence-section`, with the selected-work spotlight bridged only as progressive enhancement.
- The 2026-05-16 generated-QA cleanup baseline verifies the target checkout at `1cef7bba1cf0baac672121d2d4688cf02e98da0f` had no retained generated QA folder, server logs, or dirty paths before future visual QA work. This handoff record deliberately does not change homepage layout, CSS, JavaScript, content JSON, media, contact policy, or `/legacy/` behavior.
- The 2026-05-16 first-viewport rhythm pass verifies the next visual baseline with fresh screenshots at 390x844, 768x1024, 1440x900, `#highlights`, and `#selected-work`. It changes only `css/v2.css` and documentation, leaving evidence JSON, JavaScript, media, routes, contact policy, and legacy continuity untouched.
- The 2026-05-16 case-study path pass verifies the four flagship links again, adds `caseStudy.reviewPath` guidance to the selected-work JSON, renders it as a compact reviewer sequence, and documents why no new media was promoted.
- The 2026-05-16 native typed-signal pass keeps Turn 60's case-study baseline intact while adding one reduced-motion-aware hero motion cue. The cue should be evaluated as personality and scan rhythm, not as a new proof claim.
- Recommendation: share `https://hardik-s.github.io/` for review. The Vercel alias is also healthy for this baseline, but GitHub Pages remains the canonical source-backed review URL. Do not change the site unless review feedback, public freshness drift, a resume/profile update, or newly verified public-safe project evidence appears.
- The final sprint release pass refreshes the 1200x630 social preview after the typed signal and reviewer route are visible. The preview remains a screenshot of the public homepage, not a generated graphic or new claim surface.

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
node --check js\flagship-rework.js
Get-Content content\site-content.json -Raw | ConvertFrom-Json

python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/handoff/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/docs/handoff.md
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/css/flagship-rework.css
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/js/flagship-rework.js

npx --yes playwright screenshot --viewport-size=390,844 http://127.0.0.1:4173/ state/qa/turn32-mobile.png
npx --yes playwright screenshot --viewport-size=768,1024 http://127.0.0.1:4173/ state/qa/turn32-tablet.png
npx --yes playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4173/ state/qa/turn32-desktop.png

powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\scripts\codex-public-redaction-scan.ps1" -Path .
```

Expected redaction result: the full-repo scan may still report the documented legacy-only contact string in `legacy/index.html`; changed v2 files and docs should remain clean.

## Current caveats

- Manual Vercel CLI deploys previously hit quota during Turn 42 and Turn 45/46 follow-ups, so future manual deploys should still start with preflight and respect the two-equivalent-failures cap. Turn 47 did not need a manual deploy because the Vercel alias served the checked baseline during public freshness QA.
- Turn 51 did not need a manual Vercel deploy either; the existing Vercel alias and GitHub Pages both served the current Turn 50 baseline during freshness checks.
- Turn 54 remains within the existing media policy. New screenshots are still excluded unless source URL, privacy review, image size, alt text, and safety rationale are documented.
- Turn 55 remains within the existing evidence policy. Story copy should continue to describe working style and review flow, not unverifiable outcomes, employment status, production impact, or direct availability.
- Turn 56 remains a release-health record only. Future workers should treat it as closure evidence, not as a new design mandate.
- The above-fold warmth pass should be evaluated visually, not as new evidence. Future workers should not keep adding hero chips or stronger claims unless a reviewer says the first viewport is still unclear.
- The proof-path interaction should be evaluated as navigation clarity, not as new evidence. Future interaction work should not add overlays, blocking tours, or heavier runtime dependencies unless a reviewer reports that the current path is unclear.
- Generated QA artifacts should not linger across turns. The Turn 58G baseline found no untracked `state/director-qa/` folder or server logs, so later screenshot-driven turns should create new evidence, inspect it, then either remove it before commit or commit it with a clear retention rationale.
- The first-viewport rhythm pass should be treated as the final broad visual polish unless a reviewer identifies a concrete clipping, density, or hierarchy defect.
- The selected-work case-study path should be treated as review guidance, not new evidence. Future workers should not add screenshots, metrics, or stronger project status language unless a public-safe source is documented first.
- Recruiter trust and share surface should be treated as closed unless a reviewer reports confusion. The contact route now explains how to use selected work, resume, GitHub, and LinkedIn together, and the preview image reflects the current homepage.
- The typed-signal layer should stay small. Do not add a tour overlay, imported animation library, canvas effect, or new phrase set unless a reviewer reports that the current first viewport still feels static or unclear.
- GitHub Pages may lag immediately after future pushes; recheck `/`, `/legacy/`, `/handoff/`, and cache-busted v2 assets before external review.
- The legacy page intentionally contains older content and should be evaluated as continuity, not as the v2 positioning surface.

## Do not change unless

- A reviewer reports a concrete visual, accessibility, content, or route defect.
- A new public-safe project artifact is verified and materially improves the selected-work section.
- The user confirms a newer public resume, profile URL, or design direction.
- GitHub Pages or the Vercel alias becomes stale and needs a release-health repair.
