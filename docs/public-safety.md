# Public-safety note - v2 contact path

## Decision

- Turn 14 leaves v2 contact in a deliberately explicit, non-placeholder route:
  - `Contact` in the hero links to the in-page `#contact` section.
  - Featured contact cards also route to `#contact` instead of using an empty-recipient `mailto:` link.
  - The contact section exposes public, recruiter-safe pathways:
    - GitHub profile
    - Public resume artifact
    - LinkedIn profile
- Turn 27 keeps the final contact path profile-first:
  - The copy asks reviewers to reference a relevant flagship proof item.
  - No form endpoint, new raw email address, or private scheduling link is introduced.
  - This keeps the public page useful for hiring review while avoiding a new direct-contact exposure decision.
- No new direct email recipient was added to v2 contact links in this increment.

## Legacy continuity

- The historical `legacy/` route continues to preserve prior portfolio behavior and includes historical contact material.
- The top-right translucent `Legacy` button remains the documented transition back to the legacy page.

## Risk note

- If and when a direct email path is added in v2, route it intentionally through a visible policy decision in this file first.
- Any future direct contact address should use a documented allowlist/scope and include a preflight-level privacy review.

## Publication safety policy

- Public-facing state logs and docs should avoid raw local filesystem paths and direct contact literals unless the item is an explicit legacy-only exception.
- Legacy contact literals in `legacy/index.html` remain allowed only as documented historical content and must stay confined to the legacy route.
