![Website Preview](https://github.com/Hardik-S/Hardik-S.github.io/blob/master/images/website-preview.png)

# Hardik-S.github.io

This repository is the current home for Hardik's personal website (v2) with legacy continuity preserved.

## Current architecture

- `index.html` renders the v2 homepage.
- `legacy/index.html` preserves the prior site experience.
- `css/v2.css` provides the static visual system and responsive layout.
- `js/v2-content.js` renders evidence cards from JSON payloads.
- `js/v2-interactions.js` adds the small native hero interaction layer.
- `content/site-content.json` is the single source for evidence and selected-work links.
- `docs/evidence-inventory.md`, `docs/public-safety.md`, and `docs/handoff.md` track proof policy, contact safety decisions, and release-candidate handoff notes.
- `docs/review-backlog.md` keeps post-freeze review work separated into must-fix, nice-polish, and needs-new-evidence buckets so future turns do not restart broad redesign by default.
- `handoff/index.html` exposes the release handoff as a static public route for GitHub Pages and Vercel review.
- `state/director-plan.md` is the director surface for the next increment.
- `state/worker-log.md` records run-by-run implementation and verification evidence.

## Core behavior decisions

- A translucent top-right fixed `Legacy` button in `index.html` links to `/legacy/`.
- Legacy remains reachable through `/legacy/` while v2 surfaces current, evidence-backed proof.
- v2 content is static and source-driven; no build step exists in this repository.
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
- The release-polish pass adds public-safe title, description, canonical, Open Graph, and Twitter metadata that restate the already-visible v2 positioning without adding new claims.
- The Turn 46 recruiter-share pass replaces the stale legacy-era `images/website-preview.png` with a 1200x630 capture of the current v2 homepage. The preview is a screenshot of committed public page state with Hardik's name, portrait, proof-focus controls, and the top-right `Legacy` affordance visible; the rejected alternative was a separate generated graphic because that would add a second art direction and require a new public-safety review.
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
- Broader verified work stays in `proofPoints` below the flagship section, while demoted or unverified candidates stay in `researchNeeds` with rationale.

## Contact and safety boundaries

- Contact actions in v2 are deterministic and recruiter-safe:
  - Hero `Contact` jumps to `#contact`.
  - Featured contact cards jump to the same in-page contact action list instead of opening an empty-recipient email compose window.
  - Contact section exposes GitHub, public resume, and LinkedIn actions.
  - Contact copy asks reviewers to reference the most relevant flagship proof item instead of relying on an unverified direct email path or a generic form.
- Legacy contact detail patterns and any historical exposure remain documented in `docs/public-safety.md`.
- Public-facing logs and docs should avoid raw local paths and direct contact literals; legacy-only contact text is acceptable only with a documented exception in `docs/public-safety.md`.

## Verification

From repo root:

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
- Do not edit legacy contact details or legacy route behavior in site-behavior-focused turns unless explicitly requested.
