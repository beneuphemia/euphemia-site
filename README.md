# Euphemia: Marketing Site

**Stack:** Next.js 16 · TypeScript · Tailwind CSS
**Deploy:** Vercel (auto-deploy on push to `main`)

## Run locally

```bash
npm install
npm run dev          # development
npm run build
npm run start        # production: http://localhost:3000
```

## Share via Cloudflare

```bash
cloudflared tunnel --url http://localhost:3000
```

Prints a temporary `https://*.trycloudflare.com` URL.

## Where things live

- Copy (all wording): `content/site.ts`
- Science claims and references: [docs/science.md](docs/science.md)
- Design tokens (colors, fonts): `app/globals.css`
- Animations: `components/`
- Docs: `docs/`

## Git workflow

Branches: `main`, `develop/develop`, `develop/matt`, `develop/ben`.

1. Work on your branch (`develop/matt` or `develop/ben`), then open a PR into `develop/develop`.
2. The other person reviews and merges into `develop/develop`.
3. Go-live: one PR from `develop/develop` into `main`, both approve, a human merges. Vercel deploys it.
4. After merging to `main`, sync the GitHub wiki:

Review rules:

- PRs to `main` require 2 human approvals (Matt + Ben).
- Never approve your own PR: PRs to `develop/develop` are reviewed by the other person.
- No auto-approve or auto-merge, ever.
- Agents must not approve or merge PRs: see `AGENTS.md` (euph-site-agent).

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-wiki.ps1
```
