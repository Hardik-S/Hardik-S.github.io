# Evidence Inventory - Personal Website v2

## 2026-05-16 feedback correction

- Review trigger: the PMO Decision Brief Builder read as too generic to define the portfolio's best work.
- Decision: the homepage best-four layer now leads with BioScript Workflow Prototype, Agent Permission Review Console, Picture This, and Wacky Chess Vision.
- Rejected approach: preserving PMO as lead because it has the only committed workflow screenshot. Visual availability is not sufficient evidence of flagship strength.
- Archive decision: the new complexity browser groups work by build depth instead of backdating or forcing thin early-year tabs. The visible buckets are Advanced, AI systems, Product, Operations, and Foundations.
- Feedback fixes: root phone/email literals were removed, Skills were grouped by depth, Projects became `Earlier work`, Agent Permission gained a source-only proof note, and Sustainability gained a concrete climate research artifact link.
- Resume decision: the site now links local public PDF artifacts under `files/`:
  - `files/Hardik_Shrestha_Product_Resume_2026-05.pdf`
  - `files/Hardik_Shrestha_Product_AI_Resume.pdf`
- Public-data note: both PDFs are intended public resume artifacts and may expose personal contact details and work history.

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
- Latest product resume (public)
  - URL: /files/Hardik_Shrestha_Product_Resume_2026-05.pdf
  - Verification date: 2026-05-16
  - Notes: copied from the Career workspace after subagent review; primary hero/footer resume link.
- Product + AI capability resume (public)
  - URL: /files/Hardik_Shrestha_Product_AI_Resume.pdf
  - Verification date: 2026-05-16
  - Notes: copied from the Career workspace after subagent review; recommended as the best general public-site fit.
- Legacy profile
  - URL: /legacy/
  - Verification date: 2026-05-15
  - Notes: legacy route check returned HTTP 200.

## Prior demotion notes from the PMO-led model

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
  - Status: promoted back into the best-four layer by the 2026-05-16 feedback correction.
  - Reason: stronger broad product signal than another synthetic decision workflow, especially when the top layer needs human product breadth.

## Superseded PMO-led selection rationale

The prior homepage flagship section was capped at four items. This section is retained as historical rationale, but the active root page now uses the newer best-four/complexity-browser model documented above:

- PMO Decision Brief Builder
  - Inclusion rationale: live product workflow that demonstrates prioritization, brief structure, and public deployment quality.
  - Presentation role: lead proof, because it is the clearest live deployment for product workflow, decision framing, and implementation in one artifact.
  - Visual treatment: committed public fixture screenshot at `images/work-pmo-decision-brief-builder.png`.
  - Media source: https://pmo-decision-brief-builder.vercel.app
  - Capture: 2026-05-15, 1280x720, 84,870 bytes.
  - Safety rationale: the visible screen is a public demo with fixture-only PMO notes and no private records, credentials, raw email addresses, or customer data.
- BioScript Housing Decision
  - Inclusion rationale: strongest public-safe bridge to current BioScript-facing decision-support work without exposing private workflow details.
  - Presentation role: supporting proof, kept close to the lead item for current decision-support relevance.
  - Visual treatment: generated proof map focused on criteria, tradeoffs, and handoff.
  - No-screenshot decision: public route screenshot was audited but not committed because the visible housing packet includes housing-specific decision details and listing imagery; the generated proof map keeps the public portfolio from widening the privacy surface.
  - Turn 49 re-audit: route returned HTTP 200 with title `BioScript Mississauga Housing Packet`; fresh 1280x720 screenshot inspection still showed housing-specific packet copy, location context, budget framing, and a listing-grid surface. No image was committed.
- Agent Permission Review Console
  - Inclusion rationale: AI governance and least-privilege review is a stronger current positioning signal than generic project breadth.
  - Presentation role: supporting proof, showing the AI governance angle without overstating production usage.
  - Visual treatment: generated proof map focused on request, scope, and approval.
  - No-screenshot decision: this remains a source-repository proof item, so a GitHub page screenshot would add visual weight without showing the actual workflow.
  - Turn 49 re-audit: `gh repo view` confirmed the repository is public, recently pushed, and has no homepage URL; keep the generated proof map until a public workflow screen is available.
- Invoice Dispute Packet Builder
  - Inclusion rationale: operations-facing decision support with clear packet-generation framing and public repository proof.
  - Presentation role: supporting proof, rounding out the operations packet-building narrative with public source evidence.
  - Visual treatment: generated proof map focused on facts, evidence, and response.
  - No-screenshot decision: this remains a source-repository proof item, so the generated proof map is more honest than a generic repository screenshot.
  - Turn 49 re-audit: `gh repo view` confirmed the repository is public and has no homepage URL; no screenshot was added because repository chrome would not prove the packet workflow.

Items not in this four-card layer remain available as proof anchors only when they are public-ready and verified.

## Source verification and notes

- JSON source updated in `content/site-content.json`:
  - `publicReady` remains `true` for all rendered items.
  - `source.type` and `source.verifiedAt` are populated for each anchor.
  - New deployments (PMO and BioScript) are marked as `deployment` source-type with HTTP 200 checks.
  - `selectedWork` is capped at four flagship records; additional verified links remain in `proofPoints`.
  - `visual` fields are structured public-safe cues, not claims of screenshot availability.
  - The selected-work renderer now turns `visual.cue` into visible step maps and labels each map from `source.type`; these visuals remain generated UI treatments, not product screenshots.
  - Turn 54 adds provenance chips to the visual area from `caseStudy.artifactType`, `source.type`, and `source.verifiedAt` or screenshot capture metadata. These chips are presentational proof context, not new evidence records.
  - `media` fields may override generated proof maps only after capture source, dimensions, file size, alt text, and safety rationale are recorded.
  - `caseStudy` fields add role, artifact type, proof, and review guidance for each flagship item. These fields are intentionally evaluative and source-linked, not metric claims.
  - `caseStudy.reviewPath` entries provide a compact reviewer sequence for each flagship. They are inspection guidance derived from the verified public route or repository, not new claims about usage, impact, employers, customers, or production state.
  - Rendering promotes the first selected-work item into a lead proof card and presents the remaining three as supporting proof cards. That hierarchy is layout-only and should be changed only after the JSON ordering is deliberately updated.

## Turn 60 case-study path pass

- Audit timestamp: 2026-05-16T05:20:00-04:00.
- Scope: make selected work feel like case studies by adding a `Reviewer path` sequence to each flagship card.
- Link checks: PMO Decision Brief Builder, BioScript Housing Decision, Agent Permission Review Console, and Invoice Dispute Packet Builder all returned HTTP 200 during this pass.
- Repository checks: `gh repo view` confirmed Agent Permission Review Console and Invoice Dispute Packet Builder are public `Hardik-S` repositories with no homepage URL, so their generated proof maps remain more honest than GitHub chrome screenshots.
- Media boundary: PMO Decision Brief Builder remains the only committed selected-work screenshot; BioScript remains on generated proof maps because the visible route still has housing-specific context, and the source-repo projects remain on generated proof maps until public workflow screens exist.
- Rejected approach: adding new screenshots or stronger outcome claims. The increment only changes review guidance, rendering, styling, and documentation around already verified public artifacts.

## Turn 54 visual provenance pass

- Audit timestamp: 2026-05-15T21:42:00-04:00.
- Scope: improve selected-work visual context without changing evidence copy, project order, links, media assets, or route behavior.
- PMO Decision Brief Builder still uses the only committed screenshot. The visual now pairs the fixture screenshot with artifact/source/verified chips from the already documented public deployment metadata.
- BioScript Housing Decision, Agent Permission Review Console, and Invoice Dispute Packet Builder still use generated proof maps. Each map now carries visible provenance chips so reviewers can distinguish deployment proof from source-repository proof without adding unsafe screenshots.
- Rejected approach: adding screenshots for the remaining three flagship items. The Turn 49 safety rationale still applies until a public-safe workflow screen is verified.

## Turn 49 media audit

- Audit timestamp: 2026-05-15T20:41:06-04:00.
- PMO Decision Brief Builder remains the only committed project screenshot because its public fixture route is already documented with source URL, dimensions, byte size, alt text, and safety rationale.
- BioScript Housing Decision remains a public proof link but not a committed media asset. The fresh screenshot candidate was rejected because visible content still includes a specific Mississauga housing packet, Ridgeway/Dunwin context, budget framing, and listing-grid treatment.
- Agent Permission Review Console and Invoice Dispute Packet Builder remain generated proof maps. Both repositories are public Hardik-S repos, but neither exposes a homepage URL, so screenshots would document GitHub repository chrome instead of the underlying workflow.
- The rejected broader approach was adding another visual just for variety. Media should be promoted only when it improves reviewer understanding and does not widen the privacy or claim surface.

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
