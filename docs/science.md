# Science

Rule: no claim goes live without a reference in `REFERENCES.md`.

To update:

1. Edit `content/site.ts`.
2. Fill the matching row in `REFERENCES.md` (a DOI, a dataset, or an internal run).
3. If it cannot be sourced, delete it from `content/site.ts`.

## Trace a claim

| Site element | Component | Copy | Reference |
|---|---|---|---|
| Hero 3D sim | `components/HeroSimulation.tsx` | demo data | illustrative |
| Hero background | `components/SolvationFieldAnimation.tsx` | none | none |
| Hero stats | `app/page.tsx` | `site.hero.stats` | `REFERENCES.md` |
| Pillars | `components/SciencePillars.tsx` | `site.science.pillars` | `REFERENCES.md` |
| Pipeline | `components/WorkflowPipeline.tsx` | `site.approach.steps` | `REFERENCES.md` |
| Explorer cases | `components/InteractiveHydrationExplorer.tsx` | `site.explorer.targets` | `REFERENCES.md` |
| Benchmarks | `components/BenchmarksSection.tsx` | `site.benchmarks` | `REFERENCES.md` |
| Differentiation | `components/DifferentiationMatrix.tsx` | `site.differentiation.rows` | `REFERENCES.md` |
