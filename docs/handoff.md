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

## Design direction

The current design intentionally moves away from a dark internal-dashboard feel and toward an editorial personal site:

- Portrait-led hero using the existing `images/me3.jpg` asset.
- Clear person-name headline with product and AI workflow positioning in supporting copy.
- Four flagship proof cards first, with broader evidence anchors below.
- Section-level color bands instead of nested card stacks.
- Recruiter-readable contact section that points to public profile surfaces.

The design borrows portfolio patterns such as a personal first viewport, curated project hierarchy, and visible contact action, but it does not copy template code or unverified assets.

## Interaction behavior

- The hero proof-focus text cycles through source-backed positioning lines and exposes a manual `Next focus` button.
- Auto-rotation is disabled for users who prefer reduced motion.
- The flagship work section renders a native project spotlight controller after the JSON payload loads.
- Flagship cards are keyboard focusable and support arrow-key spotlight changes.
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

## Routes to preserve

- `/` for v2 homepage.
- `/legacy/` for the prior site.
- `/content/site-content.json` for the evidence payload.
- `/docs/handoff.md` for this release handoff.

## Deployment notes

- GitHub Pages is expected to serve the repository root.
- Vercel deploys use the `hardik-s-github-io` project and the alias `https://hardik-s-github-io.vercel.app`.
- `.vercel/` is local deploy identity and is intentionally ignored by the committed `.gitignore`.
- The last automation runs hit Vercel's daily deployment quota, so source may be ahead of the Vercel alias until the quota resets and a production deploy succeeds.

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
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/docs/handoff.md

powershell -NoProfile -ExecutionPolicy Bypass -File "<CODEX_HOME>\scripts\codex-public-redaction-scan.ps1" -Path .
```

Expected redaction result: the full-repo scan may still report the documented legacy-only contact string in `legacy/index.html`; changed v2 files and docs should remain clean.

## Current caveats

- Vercel production deploy is quota-blocked until the free deployment window resets.
- GitHub Pages may lag immediately after push; recheck `/` and `/legacy/` before external review.
- The legacy page intentionally contains older content and should be evaluated as continuity, not as the v2 positioning surface.
