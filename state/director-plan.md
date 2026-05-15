# Worker Wally - Personal Website v2 Director Plan

Created 2026-05-15 for the run that had no existing local director plan.
Target repository: `Hardik-S/hardik-s.github.io`

## Working constraints

- Scope each turn to one coherent increment on `index.html`, `css/v2.css`, `js/v2-content.js`, `content/site-content.json`, or adjacent state docs.
- Preserve legacy reachability via the top-right translucent `Legacy` control and the `/legacy/` path.
- Keep all public statements evidence-backed and sourced from existing reachable links.
- Keep GitHub writes scoped to `Hardik-S` repo(s) only.
- Preserve unowned dirty paths (for example tool-generated artifacts) unless explicitly part of this turn.

## Turn 13 queue

- Turn 13A: selected-work narrative layer
  - Render a separate selected-work section from `content/site-content.json` using only public-ready entries.
  - Keep the Legacy button and `/legacy/` behavior unchanged.
- Turn 13B: narrative polish pass
  - Refine selected-work visual hierarchy after card-level feedback.

## Escalation notes

- If dirty-worktree or preflight blockers appear again, follow `codex-workflow-reliability` states and two-equivalent-failure cap before changing surface.

## Turn 29 queue

- Turn 29A: public handoff route
  - Add a browser-readable `/handoff/` route that mirrors the release-candidate handoff.
  - Keep the source Markdown handoff in `docs/handoff.md`.
  - Preserve the top-right Legacy button and `/legacy/` behavior unchanged.
