# Development

## Run locally

```bash
npm install
npm run dev            # development server
# or production:
npm run build
npm run start          # http://localhost:3000
```

## Share via Cloudflare quick tunnel

```bash
npm run dev            # or: npm run build && npm run start
cloudflared tunnel --url http://localhost:3000
```

## Project layout

- `content/site.ts`: every user-facing word. Edit here to change copy.
- `app/theme.ts`: design tokens (colors, glows, type families).
- `app/globals.css`: CSS variables and global styles wired to the tokens.
- `app/page.tsx`, `app/layout.tsx`, `app/not-found.tsx`: app shell and page composition.
- `components/`: UI components (see below).
- `REFERENCES.md`: science claim-to-reference table.
- `docs/`: this wiki.

## Animations and simulations

- `components/HeroSimulation.tsx`: interactive 3D binding-cavity simulation in the
  hero. Canvas based. Drag to rotate, wheel or buttons to zoom, hover for
  tooltips. Three modes: ΔG Map, GCMC Trials, Ligand Pose. The coordinates and
  values are hardcoded demo data near the top of the file; they are illustrative,
  not validated science.
- `components/SolvationFieldAnimation.tsx`: fixed full-page background canvas of
  water dipoles joined by a hydrogen-bond lattice, with a cursor wake. Pauses when
  scrolled out of view. Purely decorative.
- `components/InteractiveHydrationExplorer.tsx`: 2D pocket hydration explorer with
  toggleable water sites and example targets (KRAS G12D, CDK2/CDK1, BCL-2). Target
  data comes from `content/site.ts` under `site.explorer.targets`.

## Design tokens

Colors are named in `app/theme.ts` and exposed as CSS variables in
`app/globals.css`: Physics Blue, ML Gold, Truth Crimson, Obsidian Inks, technical
mist accents. Change a token once to restyle the site.

## Updating copy

Edit `content/site.ts` only. Components read from it, so re-wording never requires
a component or layout change.

## Updating science

See [Science](science.md) and `REFERENCES.md`.
