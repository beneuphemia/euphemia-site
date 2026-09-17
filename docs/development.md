# Development

## Run

```bash
npm install
npm run dev                      # development
npm run build && npm run start   # production: http://localhost:3000
```

## Share

```bash
cloudflared tunnel --url http://localhost:3000
```

## Change stuff

- Wording: edit `content/site.ts`. Nothing else needed.
- Colors and fonts: CSS variables at the top of `app/globals.css`.
- Animations:
  - `components/HeroSimulation.tsx`: 3D cavity sim in the hero. Demo data sits at the top of the file.
  - `components/SolvationFieldAnimation.tsx`: full-page water background.
  - `components/InteractiveHydrationExplorer.tsx`: 2D hydration explorer. Target data in `content/site.ts`.
- Science: see [Science](science.md) for the claim-to-reference table.

## Wiki

After editing a docs page, sync the GitHub wiki:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-wiki.ps1
```
