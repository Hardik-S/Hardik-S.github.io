# Evidence Inventory - Personal Website v2

## Current audited proof points

All items below are currently rendered as public proof anchors:

- Hardik-S GitHub
  - URL: https://github.com/Hardik-S
  - Verification date: 2026-05-15
  - Notes: public and reachable from local route checks.
- Cloud Cost Decision Notebook
  - URL: https://github.com/Hardik-S/cloud-cost-decision-notebook
  - Verification date: 2026-05-15
  - Notes: public repo confirmed with recent maintenance.
- PMO Decision Brief Builder
  - URL: https://pmo-decision-brief-builder.vercel.app
  - Verification date: 2026-05-15
  - Notes: public deployment route returned HTTP 200.
- BioScript Housing Decision
  - URL: https://bioscript-housing-decision.vercel.app
  - Verification date: 2026-05-15
  - Notes: public deployment route returned HTTP 200.
- Agent Permission Review Console
  - URL: https://github.com/Hardik-S/agent-permission-review-console
  - Verification date: 2026-05-15
  - Notes: public repo confirmed.
- Ops Follow-Up Radar
  - URL: https://github.com/Hardik-S/ops-follow-up-radar
  - Verification date: 2026-05-15
  - Notes: public repo confirmed.
- Invoice Dispute Packet Builder
  - URL: https://github.com/Hardik-S/invoice-dispute-packet-builder
  - Verification date: 2026-05-15
  - Notes: public repo confirmed and added as operations evidence.
- Personal site source
  - URL: https://github.com/Hardik-S/hardik-s.github.io
  - Verification date: 2026-05-15
  - Notes: this v2 implementation and evidence payload are stored here.
- Resume (public)
  - URL: https://drive.google.com/file/d/1rbTC2hLoid0K8culdn1go-qfMCaq1WEd/view?usp=sharing
  - Verification date: 2026-05-15
  - Notes: public artifact in local checks.
- Legacy profile
  - URL: /legacy/
  - Verification date: 2026-05-15
  - Notes: legacy route check returned HTTP 200.

## Demoted from homepage proof rotation

- Cloud Cost Decision Notebook
  - URL: https://github.com/Hardik-S/cloud-cost-decision-notebook
  - Status: retained as proof anchor, demoted from flagship section
  - Reason: strong decision-model evidence, but the four-card flagship layer now prioritizes live product surfaces and current AI/workflow governance proof.
- Duck Duck Mallard
  - URL: https://github.com/Hardik-S/DuckDuckGo
  - Status: demoted
  - Reason: retained for archival context, no longer the strongest signal for current work.
- Ops Follow-Up Radar
  - URL: https://github.com/Hardik-S/ops-follow-up-radar
  - Status: retained as proof anchor, demoted from flagship section
  - Reason: useful operations proof, but overlaps with invoice and PMO operations narratives in a four-card section.
- Picture This
  - URL: https://github.com/Hardik-S/picturethisv2
  - Status: demoted
  - Reason: retained for archival context, lower priority than decision-support portfolio evidence.

## Flagship selection rationale

The homepage flagship section is intentionally capped at four items:

- PMO Decision Brief Builder
  - Inclusion rationale: live product workflow that demonstrates prioritization, brief structure, and public deployment quality.
  - Visual treatment: structured text cue, not a screenshot, because no verified screenshot asset is checked into the repo.
- BioScript Housing Decision
  - Inclusion rationale: strongest public-safe bridge to current BioScript-facing decision-support work without exposing private workflow details.
  - Visual treatment: structured text cue focused on criteria, tradeoffs, and handoff.
- Agent Permission Review Console
  - Inclusion rationale: AI governance and least-privilege review is a stronger current positioning signal than generic project breadth.
  - Visual treatment: structured text cue focused on request, scope, and approval.
- Invoice Dispute Packet Builder
  - Inclusion rationale: operations-facing decision support with clear packet-generation framing and public repository proof.
  - Visual treatment: structured text cue focused on facts, evidence, and response.

Items not in this four-card layer remain available as proof anchors only when they are public-ready and verified.

## Source verification and notes

- JSON source updated in `content/site-content.json`:
  - `publicReady` remains `true` for all rendered items.
  - `source.type` and `source.verifiedAt` are populated for each anchor.
  - New deployments (PMO and BioScript) are marked as `deployment` source-type with HTTP 200 checks.
  - `selectedWork` is capped at four flagship records; additional verified links remain in `proofPoints`.
  - `visual` fields are structured public-safe cues, not claims of screenshot availability.
  - `caseStudy` fields add role, artifact type, proof, and review guidance for each flagship item. These fields are intentionally evaluative and source-linked, not metric claims.

## Research backlog (not public claims)

- BioScript active product demos
  - Status: not-yet-verified
  - Reason: no direct source was verified in this turn for additional current BioScript artifacts.
  - Next action: add a verified source path + link before homepage publication.
- Portfolio post-2026-05-15 updates
  - Verification date: 2026-05-15
  - Status: needs-verification
  - Reason: not validated in this increment.
  - Next action: add only after a verifiable source exists.
- Current demo readiness scorecards
  - Status: needs-verification
  - Reason: no verifiable scorecard payload found during this run.
  - Next action: add only with accessible source links.

## Current action constraints

- Do not publish unverified claims on v2 homepage.
- Only render `publicReady` items in the primary evidence section.
- Preserve top-right translucent `Legacy` control and keep `/legacy/` accessible.
