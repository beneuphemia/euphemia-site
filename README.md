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
- Science references: `REFERENCES.md`
- Design tokens: `app/theme.ts` and `app/globals.css`
- Animations: `components/`
- Docs: `docs/`

## Git workflow

Branches: `main`, `develop/develop`, `develop/matt`, `develop/ben`.

1. Work on your branch (`develop/matt` or `develop/ben`), then open a PR into `develop/develop`.
2. Review and merge into `develop/develop`.
3. Go-live: one PR from `develop/develop` into `main`, get both approvals, merge. Vercel deploys it.
4. After merging to `main`, sync the GitHub wiki:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-wiki.ps1
```
