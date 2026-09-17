"use client";

import { useState } from "react";

export default function BenchmarksSection() {
  const [activeTab, setActiveTab] = useState<"fep" | "water" | "screening">("fep");

  return (
    <section id="benchmarks" className="py-20 sm:py-28 bg-[#0C0F1A] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <span>Quantitative Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
            Validated Against Wet-Lab Affinity and Crystal Structures
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B91B0]">
            Biopharma partners and biotech investors require reproducible physical accuracy. We benchmark continuously against prospective experimental datasets.
          </p>
        </div>

        {/* Top Proof Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-sm bg-[#121727]/70 border border-white/[0.08] text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FAFBFF]">
              0.74 <span className="text-xs text-[#8B91B0] font-sans">kcal/mol</span>
            </div>
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-[#C9A84C] mt-1.5">
              Mean Unsigned Error (MUE)
            </div>
            <div className="text-[0.72rem] text-[#8B91B0] mt-1">Across 18 target campaigns</div>
          </div>

          <div className="p-5 rounded-sm bg-[#121727]/70 border border-white/[0.08] text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#3B6EF5]">
              R² = 0.89
            </div>
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-[#70A0FF] mt-1.5">
              Experimental Correlation
            </div>
            <div className="text-[0.72rem] text-[#8B91B0] mt-1">Calibrated vs ITC &amp; SPR Kd</div>
          </div>

          <div className="p-5 rounded-sm bg-[#121727]/70 border border-white/[0.08] text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FAFBFF]">
              94.2%
            </div>
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-[#C9A84C] mt-1.5">
              Water Site Recovery
            </div>
            <div className="text-[0.72rem] text-[#8B91B0] mt-1">&lt;1.0 Å of X-ray crystal waters</div>
          </div>

          <div className="p-5 rounded-sm bg-[#121727]/70 border border-white/[0.08] text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-[#E74C3C]">
              10,000×
            </div>
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-[#E74C3C] mt-1.5">
              Sampling Speedup
            </div>
            <div className="text-[0.72rem] text-[#8B91B0] mt-1">Neural-accelerated GCMC</div>
          </div>
        </div>

        {/* Interactive Benchmark Dossier */}
        <div className="glass-panel rounded-md p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("fep")}
              className={`px-4 py-2 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                activeTab === "fep"
                  ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                  : "text-[#8B91B0] hover:text-[#FAFBFF] hover:bg-white/5"
              }`}
            >
              FEP+ Affinity Prediction (ΔΔG)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("water")}
              className={`px-4 py-2 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                activeTab === "water"
                  ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                  : "text-[#8B91B0] hover:text-[#FAFBFF] hover:bg-white/5"
              }`}
            >
              Crystallographic Water Network Benchmark
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("screening")}
              className={`px-4 py-2 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                activeTab === "screening"
                  ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                  : "text-[#8B91B0] hover:text-[#FAFBFF] hover:bg-white/5"
              }`}
            >
              Virtual Screening Enrichment (EF 1%)
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "fep" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-lg font-bold text-[#FAFBFF]">
                  Prospective Blind Evaluation on 420+ Clinical &amp; Preclinical Analogs
                </h4>
                <p className="text-sm text-[#8B91B0] leading-relaxed">
                  Evaluated across kinases, nuclear receptors, proteases, and challenging protein-protein interactions. Euphemia accurately tracks subtle atomic changes (e.g. Me &rarr; Cl, F substitution, scaffold morphs) where standard docking produces pure noise.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-[#080A10] rounded-sm border border-white/[0.06]">
                    <div className="text-xs text-[#8B91B0]">Pearson r</div>
                    <div className="text-base font-bold font-mono text-[#C9A84C]">0.94</div>
                  </div>
                  <div className="p-3 bg-[#080A10] rounded-sm border border-white/[0.06]">
                    <div className="text-xs text-[#8B91B0]">True Positive Rate</div>
                    <div className="text-base font-bold font-mono text-[#FAFBFF]">88.5%</div>
                  </div>
                  <div className="p-3 bg-[#080A10] rounded-sm border border-white/[0.06]">
                    <div className="text-xs text-[#8B91B0]">Forcefield</div>
                    <div className="text-xs font-mono text-[#70A0FF] mt-0.5">Amber14SB / OpenFF</div>
                  </div>
                </div>
              </div>

              {/* Visual Correlation Mock Box */}
              <div className="lg:col-span-5 p-5 rounded-sm bg-[#080A10] border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8B91B0] mb-3">
                  <span>Computed ΔΔG vs Experimental ΔΔG</span>
                  <span className="text-[#C9A84C]">N = 428 compounds</span>
                </div>
                {/* SVG Scatter Plot representation */}
                <div className="relative h-48 w-full border-l border-b border-white/20 p-2">
                  {/* Diagonal Line of identity */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <line x1="10" y1="90" x2="90" y2="10" stroke="#1B4FD8" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Scatter dots */}
                      <circle cx="20" cy="80" r="2.5" fill="#C9A84C" />
                      <circle cx="26" cy="72" r="2.5" fill="#FAFBFF" />
                      <circle cx="34" cy="65" r="2.5" fill="#C9A84C" />
                      <circle cx="42" cy="58" r="2.5" fill="#FAFBFF" />
                      <circle cx="51" cy="48" r="2.5" fill="#C9A84C" />
                      <circle cx="58" cy="42" r="2.5" fill="#FAFBFF" />
                      <circle cx="68" cy="31" r="2.5" fill="#C9A84C" />
                      <circle cx="75" cy="24" r="2.5" fill="#FAFBFF" />
                      <circle cx="84" cy="18" r="2.5" fill="#C9A84C" />
                      {/* minor outliers */}
                      <circle cx="30" cy="62" r="2.5" fill="#8B91B0" />
                      <circle cx="62" cy="48" r="2.5" fill="#8B91B0" />
                    </svg>
                  </div>
                  <div className="absolute bottom-1 right-2 text-[0.62rem] font-mono text-[#8B91B0]">
                    Experimental ΔΔG (kcal/mol) &rarr;
                  </div>
                </div>
                <div className="flex items-center justify-between text-[0.65rem] font-mono text-[#8B91B0] pt-2">
                  <span>95% Confidence Interval: &plusmn;0.18 kcal/mol</span>
                  <span className="text-[#3B6EF5]">p &lt; 0.0001</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "water" && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#FAFBFF]">
                142 High-Resolution Protein-Ligand X-Ray Crystal Structures (&lt;1.5 Å)
              </h4>
              <p className="text-sm text-[#8B91B0] leading-relaxed max-w-3xl">
                Benchmarked against the PDBbind high-resolution crystal water dataset. Euphemia correctly identifies both tightly bound conserved structural waters (responsible for target selectivity) and displaced high-energy solvent positions with 94.2% spatial precision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#080A10] rounded-sm border border-white/[0.06]">
                  <div className="text-xs uppercase font-mono text-[#8B91B0]">Spatial Precision</div>
                  <div className="text-xl font-bold font-mono text-[#FAFBFF] mt-1">0.68 Å RMSD</div>
                  <div className="text-[0.72rem] text-[#8B91B0] mt-0.5">Average distance to crystallographic oxygen</div>
                </div>
                <div className="p-4 bg-[#080A10] rounded-sm border border-white/[0.06]">
                  <div className="text-xs uppercase font-mono text-[#8B91B0]">False Positive Waters</div>
                  <div className="text-xl font-bold font-mono text-[#C9A84C] mt-1">&lt; 4.1%</div>
                  <div className="text-[0.72rem] text-[#8B91B0] mt-0.5">Over-hydration artifact suppression</div>
                </div>
                <div className="p-4 bg-[#080A10] rounded-sm border border-white/[0.06]">
                  <div className="text-xs uppercase font-mono text-[#8B91B0]">Thermodynamic Calibration</div>
                  <div className="text-xl font-bold font-mono text-[#3B6EF5] mt-1">Explicit TIP4P</div>
                  <div className="text-[0.72rem] text-[#8B91B0] mt-0.5">Accurate bulk water chemical potential</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "screening" && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#FAFBFF]">
                Virtual Screening Enrichment: DUD-E Benchmark Comparison
              </h4>
              <p className="text-sm text-[#8B91B0] leading-relaxed max-w-3xl">
                When screening massive small-molecule libraries, standard docking ranks hundreds of inactive molecules at the top due to false electrostatic compliments in wet cavities. Solvation conditioning eliminates these false positives.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#080A10] rounded-sm border border-[#1B4FD8]/40">
                  <div className="text-xs font-mono uppercase text-[#70A0FF]">Euphemia Solvation-Conditioned ML</div>
                  <div className="text-2xl font-bold font-mono text-[#FAFBFF] mt-1">EF 1% = 24.8</div>
                  <p className="text-xs text-[#8B91B0] mt-1">
                    Filters out compounds that fail to liberate thermodynamically costly waters or break essential structural bridges.
                  </p>
                </div>
                <div className="p-4 bg-[#080A10] rounded-sm border border-white/[0.06]">
                  <div className="text-xs font-mono uppercase text-[#8B91B0]">Standard Docking (Glide / Vina)</div>
                  <div className="text-2xl font-bold font-mono text-[#8B91B0] mt-1">EF 1% = 5.2</div>
                  <p className="text-xs text-[#8B91B0] mt-1">
                    High decoy contamination; misses compounds relying on entropic solvent displacement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
