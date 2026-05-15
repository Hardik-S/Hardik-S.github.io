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
- Added `content/site-content.json` and `js/v2-content.js` to keep v2 homepage claims tied to auditable links only.
- Turn 3 visual-system polish refined hierarchy, spacing, and responsive behavior on `/` while preserving `/legacy/`.

## Evidence model (v2 Turn 2)

- Public homepage content now points to verifiable artifacts only:
  - Hardik-S GitHub profile
  - Public repository references for Duck Duck Mallard and Picture This
  - Public repository reference for hardik-s.github.io (this site source)
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

## Turn 4 accessibility and safety pass

- Added `skip-link` and explicit main section labels:
  - `main` has `id="main-content"`.
  - `Featured areas`, `Evidence-backed anchors`, and `Get in touch` are explicitly labeled and keyboard-routable.
- Added non-visual labels for external/contact anchors where context is otherwise ambiguous.
- Preserved reduced-motion handling and improved focus visibility for primary controls.
- Hardened evidence rendering by replacing HTML-string assembly with DOM-node construction and skipping invalid data records in `content/site-content.json`.
- Kept legacy preservation unchanged (`legacy/index.html`) and did not refactor `/legacy/` paths for this increment.

## How to verify locally

From repo root:

```powershell
python -m http.server 4173
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json
```

## Turn 3 check command references

```powershell
git diff --check
Select-String -Path css/v2.css -Pattern '@media|max-width|Legacy|position: fixed|hero-signals'
```

### Turn 4 verification

```powershell
git diff --check
powershell -NoProfile -ExecutionPolicy Bypass -File "path\\to\\codex-public-redaction-scan.ps1" -Path .
```

### Turn 5 - Vercel deployment readiness

```powershell
vercel --version
```

- Added `vercel.json` with explicit legacy routing:
  - `/legacy` resolves to `/legacy/index.html`.
  - `/legacy/<path>` preserves legacy sub-route behavior for assets and assets-like files.
- Kept `trailingSlash: true` and `cleanUrls: false` to avoid unintended conversion of legacy paths.
- Deployment surface remains static and repository-local; no build step was introduced for this increment.
- Next step in this run sequence: run focused post-change checks, then push the scoped change set.

## Turn 6 - structural markup and documentation cleanup

- Removed a stray closing `</section>` from `index.html` to keep section hierarchy balanced and markup predictable.
- Corrected the evidence payload path in local verification commands to `content/site-content.json`.
- Left v2 mailto links as compose-window placeholders on this increment to keep public contact behavior unchanged until explicit direction arrives.



## Turn 7A evidence provenance layer
- Added meta metadata fields to content/site-content.json (erifiedOn, erifiedBy, source) to make v2 proof anchors auditable.
- Added #evidence-meta in index.html and rendered trusted verification metadata from the payload in js/v2-content.js.
- Kept the Legacy control and /legacy/ route unchanged.
- Added state/director-plan.md and state/worker-log.md for continued unbundled director-task execution.

## Turn 7B route and accessibility hardening
- Added in-page semantic anchors for `/highlights`, `#evidence-section`, and `#contact` to improve keyboard navigation.
- Added keyboard-only quick navigation links in the hero and quick-nav cluster for faster control discovery.
- Made evidence and contact sections explicitly tabbable targets (`tabindex="-1"`) for robust anchor focus behavior.
- Kept the Legacy button and legacy route behavior unchanged.

## Turn 7 - Verified current evidence research

- Added explicit evidence model fields in `content/site-content.json` so each public proof item is auditable:
  - `meta.evidencePolicy` and `meta.verifiedScope`
  - each proof item includes `publicReady` and `source` `{type,url,verifiedAt,notes}`
- Added `researchNeeds` in `content/site-content.json` for unverified candidate items and tracked each with `status`, `reason`, and `nextAction`.
- Added a backlog-tracking structure for unverified projects in `content/site-content.json` and `docs/evidence-inventory.md`; `Research backlog` is now documentation-only and no longer surfaced as a public section on the homepage.
- Added `docs/evidence-inventory.md` to track current proof scope and what remains to verify.
- Kept the translucent top-right `Legacy` control unchanged and ensured `/legacy/` remains preserved.
- This turn does not add public claims that are not currently verifiable in this environment.

### Turn 7 verification evidence

- `git status --short`
- `git diff --check`
- `python -m http.server 4173`
- `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/`
- `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/legacy/`
- `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/content/site-content.json`
- `Select-String -Path content/site-content.json,js/v2-content.js,README.md -Pattern 'source|researchNeeds|publicReady|BioScript'`

## Turn 9 evidence rendering safety

- Switched v2 evidence rendering to a strict `publicReady === true` filter so only auditable links appear.
- Added a visible evidence summary line that reports rendered count and whether non-public-ready items were withheld.
- Kept Legacy button and legacy route unchanged.
- Updated v2 renderer fail-safe behavior to show explicit fallback text when no public-ready proof points are available.

## Turn 11 evidence card source annotations

- Added source metadata rendering to each evidence card from `content/site-content.json`.
- Each card now shows `source type`, `verified` timestamp, and a direct source link when present.
- Kept all evidence claims tied to existing fields already tracked in `meta` and `proofPoints`; no new claims were introduced.
- Kept `Legacy` button behavior and `/legacy/` route unchanged.
