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

## How to verify locally

From repo root:

```powershell
python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
```