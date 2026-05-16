![Website Preview](https://github.com/Hardik-S/Hardik-S.github.io/blob/master/images/website-preview.png)

# Hardik-S.github.io

This repository is the current home for Hardik's personal website (v2) with legacy continuity preserved.

## 2026-05-16 flagship-year browser correction

The flagship section was corrected after review feedback that the PMO Decision Brief Builder should not be presented as Hardik's best work.

- The current best-four layer now leads with BioScript Workflow Prototype, Agent Permission Review Console, Picture This, and Wacky Chess Vision.
- PMO Decision Brief Builder is no longer the lead identity proof. The rejected approach was keeping it on top because it had the cleanest screenshot; screenshot availability is not the same as flagship strength.
- A native year browser now gives reviewers an intuitive way to scan four strongest items by period: 2026, 2025, 2024, 2022-23, 2021, and 2020.
- The year browser intentionally mixes public repositories, live demos, and clearly named professional work where the older year has fewer repo-backed artifacts. It is an archive-navigation surface, not a claim that every item has equal public-source depth.
- Resume links now point to committed local PDFs under `files/`: the latest broad product resume and the stronger product + AI capability resume selected from the Career workspace.
- The primary hero resume button uses `files/Hardik_Shrestha_Product_Resume_2026-05.pdf` because the user asked for the latest resume. The contact card also exposes `files/Hardik_Shrestha_Product_AI_Resume.pdf` because the Career subagent found it to be the best general public-site fit.

## 2026-05-16 flagship rework

The root homepage was rebuilt as a fuller personal portfolio instead of the previous evidence-dashboard shell. The decision was to restore the legacy site's human sections and motion energy while keeping the old site available at `/legacy/`.

- `index.html` now renders static first-class sections for About, Experience, Flagship Work, Skills, Projects, Sustainability, and Contact.
- `css/flagship-rework.css` owns the new editorial visual system, responsive layout, contact form styling, and legacy-inspired section rhythm.
- `js/flagship-rework.js` owns the native typed identity line, cursor-reactive node network canvas, active navigation state, and contact form status.
- The old external S3/TweenLite node-network dependency was not restored. The replacement is local, vanilla JavaScript, reduced-motion-safe, and uses a unique `node-network` canvas.
- The old visible helper/reviewer scaffolding was removed from the root page. Source metadata, review paths, freshness lines, and evidence-loading helper text remain in historical docs and data files, not in the current homepage UI.
- The root contact form posts to the existing legacy Google Apps Script endpoint. This is the only send-capable contact endpoint available in this static repository without adding Vercel Function email-provider secrets.
- Direct phone/email contact details are visible on the root page because the requested legacy contact surface was restored. This is personal contact data in a public repository; keep it intentional and revisit privacy before adding more direct channels.

## Current architecture

- `index.html` renders the current root homepage.
- `legacy/index.html` preserves the prior site experience.
- `css/flagship-rework.css` provides the active root visual system and responsive layout.
- `js/flagship-rework.js` adds the native typed identity, cursor-reactive node network, active nav, and contact form status.
- `css/v2.css`, `js/v2-content.js`, and `js/v2-interactions.js` are retained as prior-v2 implementation history and may still be useful for comparison, but the root page no longer references them.
- `content/site-content.json` is retained as the prior-v2 evidence record. The current root flagship/year-browser presentation is static HTML in `index.html` because the latest correction deliberately moved faster than the old JSON renderer.
- `docs/evidence-inventory.md`, `docs/public-safety.md`, and `docs/handoff.md` track proof policy, contact safety decisions, and release-candidate handoff notes.
- `docs/review-backlog.md` keeps post-freeze review work separated into must-fix, nice-polish, and needs-new-evidence buckets so future turns do not restart broad redesign by default.
- `handoff/index.html` exposes the release handoff as a static public route for GitHub Pages and Vercel review.
- `state/director-plan.md` is the director surface for the next increment.
- `state/worker-log.md` records run-by-run implementation and verification evidence.

## Core behavior decisions

- A translucent top-right fixed `Legacy` button in `index.html` links to `/legacy/`.
- Legacy remains reachable through `/legacy/` while v2 surfaces current, evidence-backed proof.
- v2 content is static; no build step exists in this repository.
- `selected-work` is rendered as a four-card flagship layer so the homepage reads as a curated portfolio rather than a full evidence manifest.
- Skip links are intentionally hidden until keyboard focus so accessibility shortcuts remain available without creating a visible first-load overlay.
- The v2 hero uses the existing legacy portrait asset (`images/me3.jpg`) instead of a generated or stock visual. This keeps the first viewport personal, evidence-safe, and consistent with the legacy site while avoiding new unverified claims or assets.
- The hero H1 is the person name, with current product/AI positioning in supporting copy. This keeps the first viewport recruiter-readable and avoids turning the page into an internal evidence dashboard.
- The hero keeps only three high-value actions: selected work, public resume, and contact. Deeper route shortcuts remain available through section structure and skip links instead of crowding the first viewport.
- The hero proof-focus switcher is native JavaScript, uses verified focus themes already represented in `content/site-content.json`, and disables auto-rotation for `prefers-reduced-motion` users while keeping the manual button available.
- The hero `Trace proof` action turns the current proof-focus line into a short native proof journey: it scrolls to flagship work, spotlights the matching public proof card, and relies on the existing section rail state instead of adding a tour library. The rejected approach was an overlay walkthrough because the site needs fast reviewer scanning, not a blocking tutorial.
- The hero is split into intro, portrait, and action regions so mobile can show Hardik's name, portrait, actions, and Legacy continuity without cropping the portrait behind the control stack.
- The section rail below the hero borrows the old site's anchored navigation idea without restoring the heavier legacy navbar. It gives reviewers a fast path through the current v2 sections while keeping the fixed `Legacy` button as the only global control.
- The section rail marks the currently viewed homepage section with native `IntersectionObserver` state and an `aria-current` attribute. The rejected approach was a heavier scroll library; this site only needs a small progressive enhancement, and hash navigation remains the fallback.
- The first post-hero section is a recruiter-facing "What I bring" band instead of a generic link list. It describes product framing, implementation range, and evidence-first handoff because those are supported by the current public proof anchors.
- The Turn 50 narrative pass tightens hero, highlights, selected-work summaries, and contact guidance for a faster reviewer read. It deliberately keeps the same verified facts, project order, contact policy, media boundary, and `Legacy` continuity instead of adding new claims or a new information architecture.
- The flagship cards use structured text visuals (`visual.label` and `visual.cue`) instead of screenshots because no current project screenshot assets have been verified for public reuse in this repo.
- The public-safe project visual pass converts each selected-work `visual.cue` into a small generated proof map. This adds visual variety without implying a live screenshot, private product screen, or unverified artifact.
- The Turn 44 media pass promotes only the PMO Decision Brief Builder from generated proof map to a committed screenshot. The capture is from a public fixture-only demo route, is 1280x720, is 84,870 bytes, and is documented in `content/site-content.json`; BioScript and repo-only flagship items remain on generated proof maps until screenshot safety, source, and reuse rationale are equally clear.
- The Turn 49 media re-audit keeps BioScript, Agent Permission Review Console, and Invoice Dispute Packet Builder on generated proof maps. BioScript still exposes housing-specific packet details in the visible page, while the two source-repo projects have no homepage URLs and would only produce generic repository chrome if screenshotted.
- The flagship work section adds a native project spotlight controller after the evidence payload renders. Cards are keyboard-focusable, arrow-key scrubbable, and source their spotlight labels from the verified selected-work JSON instead of duplicate copy.
- The Turn 45 native interaction pass connects the hero focus control to the project spotlight with a custom event and a temporary visual emphasis state. This keeps JavaScript disabled behavior readable, keeps reduced-motion scroll behavior non-animated, and avoids a heavier animation or onboarding dependency.
- The flagship section now treats the first verified selected-work record as the lead proof and the remaining three as supporting proofs. This keeps hierarchy source-driven without inventing a new ranking claim, and the rejected approach was adding fresh project candidates before verifying stronger public evidence.
- Section-level color bands are implemented in CSS rather than as wrapper cards. This makes the hero, featured areas, flagship work, evidence anchors, and contact sections feel intentionally distinct while preserving the static HTML structure and avoiding a nested-card redesign.
- The final visual-personality pass uses editorial rails, a portrait-adjacent texture frame, and section-specific card tints instead of decorative orb backgrounds. The tradeoff is still restrained and static: no template assets, no new project claims, and no heavier runtime dependency.
- The Turn 43 art-direction pass keeps the same evidence model and routes while sharpening the site like a personal portfolio template: stronger masthead type, a clearer editorial accent rail, visible desktop positioning chips, warmer section contrast, and higher-card depth. The rejected alternatives were a new hero rewrite, copied template CSS, decorative blobs/orbs, and any content rewrite that would change evidence claims.
- The Turn 48 visual critique pass only tightens selected-work spacing on narrow screens. The rejected alternatives were another homepage redesign, new project copy, or new media; screenshot evidence showed the remaining issue was mobile rhythm around the PMO lead proof, not the evidence model.
- The Turn 50 copy pass reduces internal-process phrasing in the first two scrolls. The rejected alternative was adding stronger-sounding metrics, employer claims, availability language, or project status; those remain excluded unless verified by public source artifacts.
- The Turn 52 art-direction reset responds to the Director note that v2 still felt too much like an evidence dashboard. It keeps the same homepage HTML, evidence JSON, portrait asset, media boundary, project order, and `Legacy` route, but strengthens the CSS-only portfolio treatment with larger editorial name scale, ruled-band depth, a subtle `HS` masthead mark, warmer section contrast, and richer card framing. Rejected alternatives were copied template code, generated hero graphics, decorative orb/blob backgrounds, new claims, and another information-architecture rewrite.
- The Turn 53 native interaction pass converts the hero proof chips into direct focus controls and adds a subtle pointer-responsive portrait/proof-frame tilt for users without reduced-motion preferences. This borrows the legacy site's visible typed/filter/kinetic energy while rejecting new libraries, canvas effects, route changes, content claims, or anything that would block keyboard use.
- The Turn 54 flagship visual provenance pass adds compact artifact/source/verified chips inside selected-work visuals. This makes the generated proof maps and the PMO screenshot read more like public-review evidence while still using only existing JSON, source, and media metadata.
- The Turn 55 human story pass adds a compact builder through-line inside the first-scroll highlights area. It explains the current working pattern as listen, frame, build, and document, using only the already-visible evidence model and avoiding new metrics, employer claims, availability language, or project-status claims.
- The Turn 56 closure pass is intentionally documentation-only. It confirms the Turn 55 source commit `e76f70e84cf19d204a3b31b8c85e193c3494b527`, the follow-up log/freshness commit `429063e3a23584efa5d4992f2ee01c139b97b546`, and the public freshness state before any new visual work begins.
- The above-fold warmth pass brings the same `Listen / Frame / Build / Document` pattern into the hero as compact method chips and adds a warmer editorial hero frame in CSS. This changes first-scroll hierarchy only; it does not add evidence claims, routes, media, contact channels, or dependencies.
- The Turn 57 proof-path interaction converts the hero method chips into anchors that move reviewers through the current proof structure: highlights, selected work, and evidence. JavaScript enhances the anchors by syncing the hero proof focus and selected-work spotlight, stops auto-rotation after manual selection, and keeps the fallback as plain hash navigation.
- The Turn 58G generated-QA cleanup pass is intentionally documentation and log only. It confirms the target checkout started and ended clean at `1cef7bba1cf0baac672121d2d4688cf02e98da0f`, with no retained `state/director-qa/` folder or server logs, before any later visual work begins.
- The Turn 59 screenshot-driven rhythm pass is CSS-only. It compacts the hero frame, portrait, primary actions, proof-focus panel, and section rail so the first viewport shows the name, portrait, actions, proof path, and fixed `Legacy` affordance with less control-panel weight. The rejected alternatives were new copy, new media, a route change, or another interaction layer.
- The Turn 60 case-study path pass adds a reviewer-path sequence to each flagship card. This makes selected work read more like case studies while preserving the existing four-project set, PMO-only screenshot boundary, public source links, and `/legacy/` behavior. The rejected alternatives were adding new project screenshots, changing the project order, or claiming outcomes that are not source-verified.
- The Turn 61 native typed-signal pass adds a small hero working-mode line that cycles through existing evidence-safe phrases with native JavaScript. The static text remains visible without JavaScript, the animation stops for reduced-motion users, and the rejected alternatives were importing the old typed library, adding a canvas effect, or creating new project claims.
- The earlier final sprint recruiter-trust pass avoided raw direct contact. The 2026-05-16 flagship rework supersedes that profile-only root boundary by restoring direct contact details and a static form.
- The release-polish pass adds public-safe title, description, canonical, Open Graph, and Twitter metadata that restate the already-visible v2 positioning without adding new claims.
- The final sprint recruiter-share pass refreshes `images/website-preview.png` from the current v2 homepage after the hero typed signal and contact reviewer route were in place. The preview remains a screenshot of committed public page state with Hardik's name, portrait, proof-focus controls, and the top-right `Legacy` affordance visible; the rejected alternative was a separate generated graphic because that would add a second art direction and require a new public-safety review.
- The hero portrait declares intrinsic dimensions and is preloaded as the first-viewport image. This is a static performance and layout-stability safeguard, not a new visual asset or dependency.
- The first-viewport repair keeps the existing portrait-led structure but compacts the mobile proof-focus control and wraps the section rail into stable grid rows. The rejected alternative was another hero rewrite; screenshot QA showed the current identity, portrait, and actions were already working, while the remaining issue was control density and clipped rail affordances.
- Skip-link vertical positions use explicit classes instead of anchor-order selectors so future additions near the top of the body do not silently break keyboard focus placement.
- `.gitignore` intentionally ignores `.vercel/` so local deployment identity stays out of the public source while the documented Vercel project name and alias remain in handoff notes.
- `/handoff/` mirrors the durable release-handoff checklist in browser-friendly form because GitHub Pages does not reliably serve the Markdown handoff as a navigable site route.

## Evidence model

- Only `publicReady` payload entries are shown on the site.
- Each displayed item includes source metadata (`source.type`, `source.url`, `source.verifiedAt`).
- Unverified candidates are kept in `researchNeeds` until a verifiable source exists.
- `selectedWork` entries are also filtered by `publicReady`, so copy like section counts is intentionally copy-safe and should avoid hardcoded totals.
- Card-level source metadata now renders as a compact badge (`source:`) plus verified date for both evidence and selected-work entries.
- Renderer metadata uses plain ASCII separators so browser output and public logs stay stable across terminals and automation runs.
- Selected-work summary and evidence meta lines are generated from `meta` (`verifiedOn`, `verifiedBy`, `verifiedScope`) to keep the narrative in sync with this file.
- Current selected-work items are intentionally narrowed to four high-signal public repositories and deployments that reinforce the v2 positioning, rather than a full archive list.
- Selected-work case-study details use compact `caseStudy` fields (`role`, `artifactType`, `proof`, and `reviewFor`) so each flagship card explains how to evaluate the artifact without adding unverified metrics or employer claims.
- Selected-work visual maps are generated from `visual.label`, `visual.cue`, and `source.type`; they are not screenshot captures. The rejected approach for this pass was committing screenshots before verifying capture source, privacy review, and public-safe asset size.
- Selected-work `media` entries are allowed only when they include screenshot source URL, capture date, dimensions, file size, alt text, and safety rationale. The renderer falls back to the structured proof map whenever a media record is absent or incomplete.
- Selected-work visuals now show provenance chips from `caseStudy.artifactType`, `source.type`, and `source.verifiedAt` or screenshot capture metadata. This is a visual treatment of already-audited fields, not a new claim or screenshot promotion.
- Selected-work `caseStudy.reviewPath` entries are reviewer guidance derived from the same verified public artifacts. They should explain how to inspect the public route or repository, not assert metrics, production status, employer/customer usage, or private context.
- Broader verified work stays in `proofPoints` below the flagship section, while demoted or unverified candidates stay in `researchNeeds` with rationale.

## Contact and safety boundaries

- The root page now includes a working static contact form that posts to the legacy Apps Script endpoint.
- The root page also exposes direct phone and email contact details, plus GitHub and LinkedIn. This restores the legacy contact surface but widens the public personal-data surface compared with the previous profile-only v2 policy.
- Legacy contact detail patterns and the root reintroduction are documented in `docs/public-safety.md`.
- Public-facing logs and docs should still avoid adding new direct contact literals beyond the currently intentional root and legacy contact surfaces.

## Verification

From repo root:

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
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/css/flagship-rework.css
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/js/flagship-rework.js

powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\\scripts\\github-deploy-preflight.ps1" -TargetProject Hardik-S/hardik-s.github.io -AttemptsUsed 0
powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\\scripts\\codex-public-redaction-scan.ps1" -Path .
```

For release-candidate QA, use `docs/handoff.md` as the durable checklist and deployment caveat record.

## Route behavior notes

- GitHub Pages and Vercel keep the same v2 root and `/legacy/` reachability for this checkout.
- `/handoff/` is the public release-review route; `docs/handoff.md` remains the source handoff note.
- `docs/review-backlog.md` is the review filter for any post-freeze change; use it before adding new visual polish or proof claims.
- Turn 42 release-health reconciliation confirmed `https://hardik-s.github.io/` serves the latest source and `https://hardik-s-github-io.vercel.app/` serves the final share-packet site baseline after manual Vercel deployment `dpl_5zfX5deqYPAhmKsaJ5yRxjm7gGvT`. The later log-only Vercel deploy hit the daily quota cap, so use GitHub Pages for the freshest handoff docs until quota resets or the integration catches up.
- Turn 47 release QA confirmed the polished v2 baseline at `89226320c8e8cbdb15f22ddd31b9de27a6401b7f` before the freeze-note update: local routes, metadata, 1200x630 preview image, Browser interaction state, delayed selected-work screenshots, GitHub Pages, and the Vercel alias all checked clean. The full-repo redaction caveat remains only the documented legacy-only contact string in `legacy/index.html`.
- Turn 51 release QA reset confirmed the current Turn 50 narrative baseline at `70e19ec9562dfbbd0203990e0dbbf7f107b1fadd`: local routes returned 200 for root, legacy, handoff, docs, content JSON, v2 CSS/JS, and the 752,937-byte social preview; mobile screenshots showed the fixed `Legacy` button on root, selected-work, and handoff views; GitHub Pages and the Vercel alias both served fresh root, legacy, handoff, docs, JSON, CSS, JS, and preview-image assets. No manual Vercel deploy was needed.
- Turn 52 keeps the Turn 51 evidence baseline but reopens the visual shell for a CSS-only portfolio-grade art-direction pass. The expected review marker is the `Turn 52 art-direction reset` note in docs plus the `Turn 52 uses editorial ruled bands` CSS comment; no content payload, media asset, JavaScript behavior, or route changed.
- Turn 56 closes the Turn 55 builder-story increment before later visual work. It does not alter homepage layout, CSS, JavaScript, content JSON, media, contact policy, or legacy routing; it only records freshness evidence and the automation-memory catch-up requirement.
- The 2026-05-16 warmth pass implements the next Director visual task by making the first viewport more human: the hero now shows the working method directly, while `#highlights` remains the fuller explanation below. The rejected alternatives were a new hero section, a new image, or stronger unverifiable positioning copy.
- The 2026-05-16 native proof-path pass implements the next Director interaction task by making those hero method chips keyboard- and pointer-operable route controls. It rejects a tour overlay, animation library, new media, and new claims; the chip anchors stay useful when JavaScript is unavailable.
- The 2026-05-16 generated-QA cleanup baseline confirms there are no untracked QA screenshots, `state/director-qa/` captures, or server logs retained in the target checkout. Future screenshot-driven work should create fresh evidence from a clean baseline and either remove generated artifacts or document why they are committed.
- The 2026-05-16 first-viewport rhythm pass uses fresh mobile/tablet/desktop screenshots to keep the hero calmer without changing homepage claims, JSON evidence, JavaScript, social preview, contact policy, or `/legacy/` behavior.
- Do not edit legacy contact details or legacy route behavior in site-behavior-focused turns unless explicitly requested.
