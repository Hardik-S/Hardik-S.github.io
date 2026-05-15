![Website Preview](https://github.com/Hardik-S/Hardik-S.github.io/blob/master/images/website-preview.png)

# Hardik-S.github.io

This repository is the current home for Hardik’s personal website (v2) with legacy continuity preserved.

## Current architecture

- `index.html` renders the v2 homepage.
- `legacy/index.html` preserves the prior site experience.
- `css/v2.css` provides the static visual system and responsive layout.
- `js/v2-content.js` renders evidence cards from JSON payloads.
- `content/site-content.json` is the single source for evidence and selected-work links.
- `docs/evidence-inventory.md` and `docs/public-safety.md` track proof policy and contact safety decisions.
- `state/director-plan.md` is the director surface for the next increment.
- `state/worker-log.md` records run-by-run implementation and verification evidence.

## Core behavior decisions

- A translucent top-right fixed `Legacy` button in `index.html` links to `/legacy/`.
- Legacy remains reachable through `/legacy/` while v2 surfaces current, evidence-backed proof.
- v2 content is static and source-driven; no build step exists in this repository.

## Evidence model

- Only `publicReady` payload entries are shown on the site.
- Each displayed item includes source metadata (`source.type`, `source.url`, `source.verifiedAt`).
- Unverified candidates are kept in `researchNeeds` until a verifiable source exists.
- `selectedWork` entries are also filtered by `publicReady`, so copy like section counts is intentionally copy-safe and should avoid hardcoded totals.

## Contact and safety boundaries

- Contact actions in v2 are deterministic and recruiter-safe:
  - Hero `Contact` jumps to `#contact`.
  - Contact section exposes GitHub, public resume, and LinkedIn actions.
- Legacy contact detail patterns and any historical exposure remain documented in `docs/public-safety.md`.

## Verification

From repo root:

```powershell
git status --short
git diff --check

python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json

powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\hshre\.codex\scripts\github-deploy-preflight.ps1" -TargetProject Hardik-S/hardik-s.github.io -AttemptsUsed 0
```

## Route behavior notes

- GitHub Pages and Vercel keep the same v2 root and `/legacy/` reachability for this checkout.
- Do not edit legacy contact details or legacy route behavior in site-behavior-focused turns unless explicitly requested.
