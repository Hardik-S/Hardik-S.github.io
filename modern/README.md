# Legacy Rebuild Notes

## Scope

Repository: `Hardik-S/Hardik-S.github.io`  
Selected in this run: `2026-05-11` legacy rebuilder automation.  
Path: `modern/`.

This surface is a separate modernized interface; legacy files (`index.html`, `css/`, `js/`, `contactform/`) were not modified.

## Old-to-new functionality map

- About
  - Old: about section with summary text and photo.
  - New: short about card with the same educational and role framing plus clearer readability.
- Experience
  - Old: chronological role cards in the main page.
  - New: timeline list built from the same role set and role outcomes in more compact cards.
- Skills
  - Old: animated/scrolling skills blocks.
  - New: grouped skill list with a text filter for faster discovery and screen-reader labels.
- Projects
  - Old: fixed three project cards with images and links.
  - New: card grid with interactive search and category filtering while preserving project set and links.
- Sustainability
  - Old: static sustainability section.
  - New: concise structured list with same initiatives and outcomes.
- Contact
  - Old: contact details + form posting to Google Apps Script.
  - New: direct contact channels preserved (email, phone, socials), plus copy-to-clipboard actions for faster outreach workflows.

## Extensions added

- Live project filtering by query and category.
- Sticky navigation and improved section affordances for keyboard users.
- Theme toggle (dark/light) with accessible state labels.
- Compact derived metrics in hero block (projects, roles, skills count).
- Graceful no-results messaging for empty project filters.

## Stack choices

- Kept simple static web stack to stay faithful to the original static site and avoid lock-step framework migration risk.
- No external JS frameworks introduced; everything in `modern/app.js`.
- No network runtime dependency in the rebuilt surface.

## Rejected approaches

- Full migration to React/Next.js was rejected for this increment to keep scope tight and preserve existing repo context.
- Keeping the legacy contact form backend was rejected for `modern/` because it introduces external script assumptions and is not required for content-preserving parity.

## Verification evidence (this run)

- `node --check modern/app.js` passed.
- `git diff --check` passed for changed files.
- Manual content parity check vs original README and top-level sections done: About, Experience, Skills, Projects, Sustainability, Contact retained.

## Deploy

- No Vercel deployment was executed this run.
- `Deploy URL`: none.

## Next improvement

- Add local screenshot/scroll-path smoke checks for the rebuilt page and optionally add Vercel static preview on next run.
