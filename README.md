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
- `docs/evidence-inventory.md` and `docs/public-safety.md` track proof policy and contact safety decisions.
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
- The flagship cards use structured text visuals (`visual.label` and `visual.cue`) instead of screenshots because no current project screenshot assets have been verified for public reuse in this repo.

## Evidence model

- Only `publicReady` payload entries are shown on the site.
- Each displayed item includes source metadata (`source.type`, `source.url`, `source.verifiedAt`).
- Unverified candidates are kept in `researchNeeds` until a verifiable source exists.
- `selectedWork` entries are also filtered by `publicReady`, so copy like section counts is intentionally copy-safe and should avoid hardcoded totals.
- Card-level source metadata now renders as a compact badge (`source:`) plus verified date for both evidence and selected-work entries.
- Renderer metadata uses plain ASCII separators so browser output and public logs stay stable across terminals and automation runs.
- Selected-work summary and evidence meta lines are generated from `meta` (`verifiedOn`, `verifiedBy`, `verifiedScope`) to keep the narrative in sync with this file.
- Current selected-work items are intentionally narrowed to four high-signal public repositories and deployments that reinforce the v2 positioning, rather than a full archive list.
- Broader verified work stays in `proofPoints` below the flagship section, while demoted or unverified candidates stay in `researchNeeds` with rationale.

## Contact and safety boundaries

- Contact actions in v2 are deterministic and recruiter-safe:
  - Hero `Contact` jumps to `#contact`.
  - Featured contact cards jump to the same in-page contact action list instead of opening an empty-recipient email compose window.
  - Contact section exposes GitHub, public resume, and LinkedIn actions.
- Legacy contact detail patterns and any historical exposure remain documented in `docs/public-safety.md`.
- Public-facing logs and docs should avoid raw local paths and direct contact literals; legacy-only contact text is acceptable only with a documented exception in `docs/public-safety.md`.

## Verification

From repo root:

```powershell
git status --short
git diff --check

python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json

powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\\scripts\\github-deploy-preflight.ps1" -TargetProject Hardik-S/hardik-s.github.io -AttemptsUsed 0
```

## Route behavior notes

- GitHub Pages and Vercel keep the same v2 root and `/legacy/` reachability for this checkout.
- Do not edit legacy contact details or legacy route behavior in site-behavior-focused turns unless explicitly requested.
