<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# euph-site-agent

Rules for any agent (Copilot, Claude, or other) working in this repo. These
mirror the human rules in `README.md`; agents get no exceptions.

## PR and merge rules (hard rules)

- NEVER approve a PR. Approvals are human-only, and no one (human or agent)
  approves their own PR.
- NEVER merge to `main`. Go-live is one PR from `develop/develop` into `main`
  with 2 human approvals (Matt + Ben), merged by a human.
- NEVER enable auto-merge or auto-approve on any PR.
- Work happens on personal branches (`develop/matt`, `develop/ben`), PR'd into
  `develop/develop`. Agents may open PRs and push to the personal branch they
  are working on, nothing else.

## Repo rules

- All user-facing wording lives in `content/site.ts`. Never hardcode copy in
  components.
- Every scientific claim needs a reference row in `docs/science.md`. No
  reference, no claim: delete unsourced claims rather than leave them.
- The site simulations are illustrative demos, not validated science. Do not
  present their numbers as results.
- Do not invent references, benchmark numbers, or science claims. Leave
  reference slots blank for the CSO to fill.
- Avoid AI-writing tells in site copy: no em-dashes, no hype words
  ("unlock", "leverage", "seamless", "cutting-edge", "delve").
- Docs live in `docs/`; the GitHub wiki is a mirror synced by
  `scripts/sync-wiki.ps1` after merges to `main`. Never edit the wiki directly.
- Local-first: never push to a remote other than this repo's `origin`, and
  never force-push shared branches (`develop/develop`, `main`).
