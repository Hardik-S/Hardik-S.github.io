![Website Preview](https://github.com/Hardik-S/Hardik-S.github.io/blob/master/images/website-preview.png)
# Hardik-S.github.io

This repository is the active home for Hardik's personal website.

## v2 shell and legacy preservation

- The root entrypoint `index.html` now hosts a clean v2 shell focused on a concise product/software profile.
- Legacy content is preserved in `legacy/index.html` and remains reachable via the translucent **Legacy** button in the top-right of the v2 homepage.
- v2 intentionally uses a minimal static implementation to avoid build complexity for this increment.

## Notes on evidence and scope

- Public project links in v2 are limited to currently reachable repos/links already present in the legacy site.
- No new unverified claims, metrics, or status statements were added in this turn.
- Remaining deeper content work (resume refresh, BioScript-specific case studies, and portfolio narrative depth) is intentionally deferred to later turns.

## Implementation summary

- Created `legacy/index.html` by moving the prior experience surface into a dedicated legacy route.
- Added `css/v2.css` for the v2 visual system.
- Added decision notes to the coordination worker-log during each automation run.
- Turn 2 evidence inventory step introduced a structured JSON evidence source plus a small renderer for public proof anchors in `index.html`.
- Added `data/site-content.json` and `js/v2-content.js` to keep v2 homepage claims tied to auditable links only.
- Turn 3 visual-system polish refined hierarchy, spacing, and responsive behavior on `/` while preserving `/legacy/`.

## Evidence model (v2 Turn 2)

- Public homepage content now points to verifiable artifacts only:
  - Hardik-S GitHub profile
  - Public repository references for Duck Duck Mallard and Picture This
  - Public resume artifact
  - Legacy route (`/legacy/`)
- New project claims are intentionally limited to links already validated as present in the public site context.
- Unverified "BioScript/prototype" copy has not been added publicly in this increment. Missing items are tracked in the director plan and state logs as research needs.

## Visual polish (Turn 3)

- Added a stronger v2 visual system with:
  - Layered non-overlapping background gradients for depth.
  - Reused translucent top-right `Legacy` control with explicit focus treatment.
  - `hero-signals` tags to communicate positioning without invented metrics.
  - Staggered card reveal animation and hover/focus affordances.
  - Responsive breakpoints tuned for 700px and 480px layouts.
- No copy or evidence claims were introduced in this turn; all public statements remain from verified links and previous v2 messaging.

## How to verify locally

From repo root:

```powershell
python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/data/site-content.json
```

## Turn 3 check command references

```powershell
git diff --check
Select-String -Path css/v2.css -Pattern '@media|max-width|Legacy|position: fixed|hero-signals'
```
