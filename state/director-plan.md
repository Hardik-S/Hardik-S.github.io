# Worker Wally - Personal Website v2 Director Plan

Created 2026-05-15 for the run that had no existing local director plan.
Target repository: `Hardik-S/hardik-s.github.io`

## Working constraints

- Scope each turn to one coherent increment on `index.html`, `css/v2.css`, `js/v2-content.js`, `content/site-content.json`, or adjacent state docs.
- Preserve legacy reachability via the top-right translucent `Legacy` control and the `/legacy/` path.
- Keep all public statements evidence-backed and sourced from existing reachable links.
- Keep GitHub writes scoped to `Hardik-S` repo(s) only.
- Preserve unowned dirty paths (for example tool-generated artifacts) unless explicitly part of this turn.

## Turn 7 queue

- Turn 7A: evidence provenance visibility
  - Add a visible, trusted metadata line from `content/site-content.json` indicating when evidence anchors were last verified.
  - Validate failure-safe behavior if the payload is unavailable.
  - Keep all existing v2 content, layout, and Legacy preservation unchanged.
- Turn 7B: route and accessibility hardening
  - Add additional semantic anchors for the main evidence block and verify keyboard flow to critical controls.

## Escalation notes

- If dirty-worktree or preflight blockers appear again, follow `codex-workflow-reliability` states and two-equivalent-failure cap before changing surface.
