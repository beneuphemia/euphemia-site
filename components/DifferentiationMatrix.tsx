"use client";

import { useState } from "react";
import { Check, ShieldAlert, Sparkles } from "lucide-react";

export default function DifferentiationMatrix() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("docking");

  const comparisonData = [
    {
      dimension: "Water Thermodynamics",
      euphemia: "Explicit GCMC/MD mapping of every displaceable vs. structural water (ΔG, ΔH, -TΔS)",
      docking: "Neglected or treated as uniform continuum dielectric; high false-positive rate",
      pureMl: "Black-box pattern matching; cannot calculate physical water entropy release",
      academicMd: "Explicit water, but takes months of manual simulation per target",
      schrodinger: "WaterMap add-on is slow, rigid, and decoupled from neural screening models",
    },
    {
      dimension: "Cryptic & Shallow Pockets",
      euphemia: "Uncovers cryptic binding sites driven by transient water network collapse",
      docking: "Fails on flat, shallow, or cryptic pockets (e.g. KRAS G12D, PPIs)",
      pureMl: "Hallucinates binding in non-existent or physically closed pockets",
      academicMd: "Capable in theory, but inaccessible for fast design cycles",
      schrodinger: "Requires extensive manual setup and custom parameterization",
    },
    {
      dimension: "Generalization to Novel Scaffolds",
      euphemia: "First-principles physics sets boundaries, enabling high accuracy on unseen chemotypes",
      docking: "High scoring noise; poor correlation with experimental affinity (R² ~0.3)",
      pureMl: "Severe performance cliff when departing from known patent training data",
      academicMd: "High accuracy, but throughput limited to ~5 compounds per week",
      schrodinger: "Reliable only within tight perturbation loops of identical scaffold series",
    },
    {
      dimension: "Throughput & Campaign Speed",
      euphemia: "10,000x faster than brute-force MD; 100+ FEP analog calculations per day",
      docking: "Fast (seconds), but outputs predominantly inert hits",
      pureMl: "Fast, but high rate of inert compounds in wet-lab validation",
      academicMd: "Extremely slow; unsuitable for active medicinal chemistry triage",
      schrodinger: "High compute cost; bottlenecked by expensive proprietary license seats",
    },
  ];

  const competitors = [
    { id: "docking", label: "vs. Standard Docking (Glide/AutoDock)" },
    { id: "pureMl", label: "vs. Pure AI / Black-Box ML" },
    { id: "academicMd", label: "vs. Academic Brute-Force MD" },
    { id: "schrodinger", label: "vs. Schrödinger / FEP+ General Suites" },
  ];

  return (
    <section id="comparison" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <span>Market Differentiation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
            Why Traditional Approaches Miss the Decisive Binding Signal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B91B0]">
            Comparing Euphemia against the legacy computational chemistry landscape.
          </p>
        </div>

        {/* Mobile Competitor Selector (Hidden on large screens) */}
        <div className="lg:hidden mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B91B0] mb-2">
            Select Comparison Alternative:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {competitors.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => setSelectedCompetitor(comp.id)}
                className={`p-2.5 text-xs text-left rounded-sm border transition-all cursor-pointer ${
                  selectedCompetitor === comp.id
                    ? "bg-[#1B4FD8] border-[#3B6EF5] text-[#FAFBFF] font-semibold"
                    : "bg-[#080A10] border-white/[0.08] text-[#8B91B0] hover:text-[#FAFBFF]"
                }`}
              >
                {comp.label.replace("vs. ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Card-by-Card View */}
        <div className="lg:hidden space-y-4">
          {comparisonData.map((row, idx) => (
            <div key={idx} className="glass-panel rounded-md p-4 sm:p-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C9A84C]">
                {row.dimension}
              </span>

              {/* Euphemia Box */}
              <div className="p-3 rounded-sm bg-[#121727] border border-[#1B4FD8]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FAFBFF] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Euphemia</span>
                </div>
                <p className="text-xs text-[#FAFBFF] leading-relaxed">
                  {row.euphemia}
                </p>
              </div>

              {/* Alternative Box */}
              <div className="p-3 rounded-sm bg-[#080A10]/60 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B91B0] mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C03A2B]" />
                  <span>
                    {competitors.find((c) => c.id === selectedCompetitor)?.label.replace("vs. ", "")}
                  </span>
                </div>
                <p className="text-xs text-[#8B91B0] leading-relaxed">
                  {row[selectedCompetitor as keyof typeof row]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Comprehensive Table (lg and above) */}
        <div className="hidden lg:block overflow-hidden rounded-md border border-white/[0.08] bg-[#0C0F1A] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#121727]">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#8B91B0] w-1/5">
                  Capability
                </th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#C9A84C] bg-[#1B4FD8]/15 border-x border-[#1B4FD8]/30 w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <span>Euphemia Platform</span>
                  </div>
                </th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#8B91B0] w-1/4">
                  Standard Docking / Pure AI
                </th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#8B91B0] w-1/4">
                  Legacy FEP / Academic MD
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-[#FAFBFF] align-top font-mono">
                    {row.dimension}
                  </td>
                  <td className="p-4 text-[#FAFBFF] bg-[#1B4FD8]/5 border-x border-[#1B4FD8]/20 align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{row.euphemia}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#8B91B0] align-top leading-relaxed">
                    <div className="space-y-1.5">
                      <div><strong className="text-[#D4D8EB]">Docking:</strong> {row.docking}</div>
                      <div><strong className="text-[#D4D8EB]">Pure ML:</strong> {row.pureMl}</div>
                    </div>
                  </td>
                  <td className="p-4 text-[#8B91B0] align-top leading-relaxed">
                    <div className="space-y-1.5">
                      <div><strong className="text-[#D4D8EB]">Academic MD:</strong> {row.academicMd}</div>
                      <div><strong className="text-[#D4D8EB]">Legacy FEP:</strong> {row.schrodinger}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
