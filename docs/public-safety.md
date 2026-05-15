# Public-safety note - v2 contact path

## Decision

- Turn 14 leaves v2 contact in a deliberately explicit, non-placeholder route:
  - `Contact` in the hero links to the in-page `#contact` section.
  - The contact section exposes public, recruiter-safe pathways:
    - GitHub profile
    - Public resume artifact
    - LinkedIn profile
- No new direct email recipient was added to v2 contact links in this increment.

## Legacy continuity

- The historical `legacy/` route continues to preserve prior portfolio behavior and includes historical contact material.
- The top-right translucent `Legacy` button remains the documented transition back to the legacy page.

## Risk note

- If and when a direct email path is added in v2, route it intentionally through a visible policy decision in this file first.
- Any future direct contact address should use a documented allowlist/scope and include a preflight-level privacy review.
