# Euphemia — Marketing Site

Physics-based drug discovery. Water network and solvation modelling specialists.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS  
**Deploy:** Vercel (auto-deploy on push to `main`)

## Local dev

```bash
npm install
npm run dev
```

## Run a production build locally

```bash
npm install
npm run build
npm run start
```

Serves at http://localhost:3000.

## Share locally with a Cloudflare quick tunnel

Requires [`cloudflared`](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/) installed.

```bash
# 1. start the site (dev or production build — see above)
npm run dev          # or: npm run build && npm run start

# 2. expose it with a temporary public URL
cloudflared tunnel --url http://localhost:3000
```

`cloudflared` prints a `https://<random>.trycloudflare.com` link to share. It is
ephemeral — it only lives while that command is running and has no uptime guarantee.
For a stable link use a named tunnel or a Vercel preview deploy.

## Compare two versions side by side

Run each version on its own port, then tunnel each one separately:

```bash
# integrated (develop/develop)
npm run build && npm run start          # http://localhost:3000
cloudflared tunnel --url http://localhost:3000

# Gemini redesign (develop/redesign1, or the euphemia-site1 repo)
npx next start <dir> -p 3001 -H 0.0.0.0 # http://localhost:3001
cloudflared tunnel --url http://localhost:3001
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo — Vercel detects Next.js automatically
4. Deploy — no environment variables required

## Brand

- **Blue** `#1B4FD8` — physics, simulation
- **Gold** `#C9A84C` — machine learning
- **Red** `#C03A2B` — truth, validation
- Motto: *veritas per aquam*
# euphemia-site
