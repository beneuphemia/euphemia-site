# Science

## Rule

No scientific claim goes live without a reference. Every number, mechanism
statement, target case study, and benchmark figure on the site must trace to a
primary source (a paper DOI, a dataset, or an internal validation run).

## Where claims live

- Wording: `content/site.ts`.
- References: `REFERENCES.md`, which maps each claim to a reference slot.

## How to update science content

1. Edit the copy in `content/site.ts`.
2. Add or update the matching row in `REFERENCES.md` with the source.
3. If a claim cannot be sourced, remove it from `content/site.ts` rather than
   leaving it unreferenced.

## Website objects and where they come from

Each site element maps back to its component, its copy field, and its reference
row. Use this to trace any on-screen claim to a source.

| Site element | Component | Copy | Reference |
|---|---|---|---|
| Hero 3D cavity simulation | `components/HeroSimulation.tsx` | demo data in component | illustrative, to be validated |
| Hero background water field | `components/SolvationFieldAnimation.tsx` | none (decorative) | none |
| Hero stats (~10³ sites, GCMC, FEP+) | `app/page.tsx` | `site.hero.stats` | `REFERENCES.md` |
| Science pillars | `components/SciencePillars.tsx` | `site.science.pillars` | `REFERENCES.md` |
| Pipeline steps | `components/WorkflowPipeline.tsx` | `site.approach.steps` | `REFERENCES.md` |
| Target explorer cases | `components/InteractiveHydrationExplorer.tsx` | `site.explorer.targets` | `REFERENCES.md` |
| Benchmarks | `components/BenchmarksSection.tsx` | `site.benchmarks` | `REFERENCES.md` |
| Differentiation rows | `components/DifferentiationMatrix.tsx` | `site.differentiation.rows` | `REFERENCES.md` |

If a claim needs more than a one-line reference, link the `REFERENCES.md` row to a
longer science note (a notebook, an internal doc, or a paper summary) so the chain
is: site element → copy field → reference row → science source.

## Status

The simulations are illustrative demos. They are not yet validated against the
science; that is tracked work. Nothing scientific is final until a scientist signs
off the matching `REFERENCES.md` rows.
