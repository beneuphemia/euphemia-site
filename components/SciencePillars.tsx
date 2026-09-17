"use client";

import { Check } from "lucide-react";

export default function SciencePillars() {
  const pillars = [
    {
      id: "physics",
      tag: "First-Principles Physics",
      tagColor: "text-[#70A0FF] border-[#1B4FD8]/40 bg-[#1B4FD8]/10",
      accentColor: "#1B4FD8",
      title: "Grand Canonical Monte Carlo (GCMC)",
      description:
        "Conventional docking uses static receptor grids that treat water as uniform continuum dielectric or arbitrary empty space. Euphemia uses explicit GCMC/MD to insert, delete, and equilibrate water molecules at thermodynamic equilibrium.",
      points: [
        "Identifies occupied, displaceable, and structural water sites",
        "Calculates exact thermodynamic displacement free energy (ΔG)",
        "Captures cryptic pocket hydration inaccessible to dry crystal structures",
      ],
      badge: "Explicit Solvation",
    },
    {
      id: "ml",
      tag: "Neural Acceleration",
      tagColor: "text-[#E8C96A] border-[#C9A84C]/40 bg-[#C9A84C]/10",
      accentColor: "#C9A84C",
      title: "Solvation-Conditioned Machine Learning",
      description:
        "Pure machine learning models memorize ligand patterns and hallucinate binding poses when encountering novel chemical space. Euphemia uses physics as non-negotiable boundary conditions, utilizing neural potentials to scale throughput.",
      points: [
        "Trained on rigorous free energy surfaces rather than static PDB poses",
        "10,000x faster than all-atom brute force simulation",
        "Generalizes reliably to completely novel chemical matter and chemotypes",
      ],
      badge: "Physics-Guided ML",
    },
    {
      id: "truth",
      tag: "Experimental Truth",
      tagColor: "text-[#E74C3C] border-[#C03A2B]/40 bg-[#C03A2B]/10",
      accentColor: "#C03A2B",
      title: "Rigorous ΔΔG Benchmark Validation",
      description:
        "Computational predictions are only as valuable as their correlation with wet-lab reality. Every Euphemia calculation is calibrated against high-resolution crystallographic water networks and experimental binding free energies.",
      points: [
        "94% crystallographic water site recovery rate across 140+ complexes",
        "FEP+ validation with Mean Unsigned Error (MUE) < 0.76 kcal/mol",
        "Direct translation to synthesis prioritization and hit-to-lead triage",
      ],
      badge: "Sub-kcal/mol Rigor",
    },
  ];

  return (
    <section id="science" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#FAFBFF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1B4FD8]" />
            <span>Scientific Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFBFF] leading-[1.15]">
            Solvation is the decisive missing variable in drug discovery.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B91B0] leading-relaxed">
            Every drug binds in water. The displacement or retention of pocket water molecules accounts for up to 60% of total binding free energy. Euphemia makes this physics computable at campaign scale.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-panel glass-panel-hover rounded-md p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[0.68rem] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm border ${pillar.tagColor}`}
                  >
                    {pillar.tag}
                  </span>
                  <span className="text-[0.68rem] text-[#8B91B0] font-mono">{pillar.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#FAFBFF] tracking-tight pt-1">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#8B91B0] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-3 border-t border-white/[0.06]">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#D4D8EB]">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-[#C9A84C] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Subtle Bar */}
              <div
                className="w-full h-0.5 mt-6 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: pillar.accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
