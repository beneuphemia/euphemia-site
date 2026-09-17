# Science

Rule: **no scientific claim goes live without a reference in the table below.**
If a claim cannot be sourced, delete it from `content/site.ts` rather than
leaving it unreferenced.

To update science content:

1. Edit the wording in `content/site.ts`.
2. Fill or update the matching row below (a paper DOI, a dataset, or an internal
   validation run: commit/notebook path + date). Prefer primary sources.
3. Unsourced claim? Remove it from `content/site.ts`.

## Claims and references

The `Reference` column is for the CSO / science team to complete.

Legend:
- `CURRENT` = wording already live on the current site (baseline truth).
- `PROPOSED` = new wording from the redesign, pending CSO review.

| # | Claim on site | Where in `content/site.ts` | Status | Reference (to complete) |
|---|---|---|---|---|
| 1 | Binding-site water network determines whether a molecule displaces a costly water, inherits a favourable one, or misses the pocket | `science.body` | CURRENT | |
| 2 | GCMC/MD equilibrates explicit water networks at thermodynamic resolution (occupied, displaceable, structural sites) | `science.pillars[physics].body` | CURRENT | |
| 3 | Solvation-aware descriptors are trained on free-energy data; ML guided by physics, not replacing it | `science.pillars[ml].body` | CURRENT | |
| 4 | FEP benchmarks against crystallographic water positions and experimental affinities | `science.pillars[truth].body` | CURRENT | |
| 5 | Hero stat "~10³ water sites mapped" | `hero.stats[0]` | CURRENT | |
| 6 | Hero stat "GCMC grand canonical engine" | `hero.stats[1]` | CURRENT | |
| 7 | Hero stat "FEP+ rigorous ΔΔG" | `hero.stats[2]` | CURRENT | |
| 8 | Step 01: GCMC/MD produces a thermodynamic water map (occupancy + ΔG per site) | `approach.steps[0]` | CURRENT | |
| 9 | Step 02: ML scoring informed by water displacement thermodynamics | `approach.steps[1]` | CURRENT | |
| 10 | Step 03: FEP relative binding free energies, prioritised by tractability | `approach.steps[2]` | CURRENT | |
| 11 | "Water displacement ΔG as primary binding signal" (vs docking) | `differentiation.rows[0].right` | CURRENT | |
| 12 | "Physics-grounded generalisation to novel scaffolds" (vs pure ML) | `differentiation.rows[1].right` | CURRENT | |
| 13 | "Campaign-ready throughput with rigour maintained" (vs academic MD) | `differentiation.rows[2].right` | CURRENT | |
| 14 | "Water network analysis as the core differentiator" (vs Schrödinger/FEP+) | `differentiation.rows[3].right` | CURRENT | |
| 15 | KRAS G12D case study: PDB 7T47, 480 nM → 3.2 nM, water ΔG values | `explorer.targets[kras-g12d]` | PROPOSED | |
| 16 | CDK2 vs CDK1 case study: PDB 1HCK, 140 nM → 1.8 nM, water pentamer claim | `explorer.targets[cdk2-cdk1]` | PROPOSED | |
| 17 | BCL-2/BCL-xL case study: PDB 4AQ3, 620 nM → 7.4 nM, 85-fold selectivity | `explorer.targets[bcl2-ppi]` | PROPOSED | |
| 18 | Benchmark card: 0.74 kcal/mol MUE across 18 target campaigns | `benchmarks.cards[0]` | PROPOSED | |
| 19 | Benchmark card: R² = 0.89 vs ITC/SPR Kd | `benchmarks.cards[1]` | PROPOSED | |
| 20 | Benchmark card: 94.2% water site recovery (<1.0 Å) | `benchmarks.cards[2]` | PROPOSED | |
| 21 | Benchmark card: 10,000× sampling speedup (neural-accelerated GCMC) | `benchmarks.cards[3]` | PROPOSED | |
| 22 | FEP tab: Pearson r 0.94, TPR 88.5%, forcefields Amber14SB / OpenFF | `benchmarks.tabs[fep]` | PROPOSED | |
| 23 | Water tab: 0.68 Å RMSD, <4.1% false-positive waters, TIP4P | `benchmarks.tabs[water]` | PROPOSED | |
| 24 | Screening tab: EF 1% = 24.8 (Euphemia) vs 5.2 (docking), DUD-E | `benchmarks.tabs[screening]` | PROPOSED | |
| 25 | Hero overlay telemetry: hot waters +4.2 kcal, structural -5.4 kcal, displacement -2.8 kcal (>100× Kd) | `simulation.telemetry` | PROPOSED (illustrative demo) | |

## Trace a claim to its component

| Site element | Component | Copy |
|---|---|---|
| Hero 3D sim | `components/HeroSimulation.tsx` | demo data in component (illustrative) |
| Hero background | `components/SolvationFieldAnimation.tsx` | none (decorative) |
| Hero stats | `app/page.tsx` | `site.hero.stats` |
| Pillars | `components/SciencePillars.tsx` | `site.science.pillars` |
| Pipeline | `components/WorkflowPipeline.tsx` | `site.approach.steps` |
| Explorer cases | `components/InteractiveHydrationExplorer.tsx` | `site.explorer.targets` |
| Benchmarks | `components/BenchmarksSection.tsx` | `site.benchmarks` |
| Differentiation | `components/DifferentiationMatrix.tsx` | `site.differentiation.rows` |
