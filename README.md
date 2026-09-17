# Euphemia: Marketing Site

Physics-based drug discovery. Water network and solvation modelling specialists.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS
**Deploy:** Vercel (auto-deploy on push to `main`)

## Run locally

```bash
npm install
npm run dev          # development
# or, production:
npm run build
npm run start        # http://localhost:3000
```

## Share with the team (Cloudflare quick tunnel)

Requires [`cloudflared`](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/).

```bash
# 1. start the site (dev or production build, see above)
npm run dev          # or: npm run build && npm run start

# 2. expose it with a temporary public URL
cloudflared tunnel --url http://localhost:3000
```

`cloudflared` prints a `https://<random>.trycloudflare.com` link to share. It is
ephemeral: it only lives while that command is running and has no uptime guarantee.
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

## Project layout

- `content/site.ts` — single source of truth for all website copy. To change wording, edit this file only.
- `app/theme.ts` — design tokens (colors, glows, type families).
- `app/globals.css` — CSS variables wired to the theme tokens.
- `components/` — UI components. The simulations and animations live in:
  - `HeroSimulation.tsx` — interactive 3D binding-cavity simulation (hero).
  - `SolvationFieldAnimation.tsx` — full-bleed solvation-field background animation (hero).
  - `InteractiveHydrationExplorer.tsx` — 2D pocket hydration explorer with example targets.

## Design system: color tokens

The palette (named in the redesign):

- **Physics Blue** `#1B4FD8` — physics, simulation
- **ML Gold** `#C9A84C` — machine learning
- **Truth Crimson** `#C03A2B` — truth, validation
- **Obsidian Inks** `#080A10` — backgrounds and surfaces
- **Technical mist accents** `#8B91B0` — secondary text

Motto: *veritas per aquam*

## Science accuracy

The simulations and animations in `components/` are currently illustrative demos,
not validated results. Before any number, target case study, or mechanism claim is
asserted publicly it must be backed by a real source. Track that in
[`REFERENCES.md`](./REFERENCES.md), which maps each on-site claim to its citation.
Status: pending scientific review.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo. Vercel detects Next.js automatically
4. Deploy. No environment variables required
