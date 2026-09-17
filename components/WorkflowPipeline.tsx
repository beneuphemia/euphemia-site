"use client";

import { useState } from "react";
import { Database, Zap, Cpu, Microscope, Activity } from "lucide-react";

export default function WorkflowPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Target Hydration & Cavity Mapping",
      subtitle: "Thermodynamic Water Profiling",
      duration: "1 - 2 Hours",
      statusText: "GCMC Equilibrium Achieved: 48 Waters Mapped",
      description:
        "Input a target PDB structure, cryo-EM density, or AlphaFold model. Euphemia runs Grand Canonical Monte Carlo (GCMC) and MD simulations to equilibrate all waters within the binding cleft, outputting a 3D thermodynamic hydration atlas.",
      metrics: [
        { label: "Water Sites Mapped", val: "Full Pocket Grid" },
        { label: "Resolution", val: "Sub-Ångström (0.8 Å)" },
        { label: "Output", val: "ΔG, ΔH, -TΔS per water" },
      ],
      icon: Database,
    },
    {
      number: "02",
      title: "Solvation-Aware Screening",
      subtitle: "Giga-scale Library Filtering",
      duration: "Minutes / Million",
      statusText: "Neural Potential Screening: 10M molecules/hour",
      description:
        "Screen commercially available or DNA-encoded libraries using neural potentials conditioned directly on the pocket's water displacement map. We prioritize compounds that displace thermodynamically unstable waters and preserve critical structural ones.",
      metrics: [
        { label: "Screening Capacity", val: "10⁸ Compounds" },
        { label: "False Positive Reduction", val: "68% vs Docking" },
        { label: "Enrichment Factor", val: "4.2x top 1%" },
      ],
      icon: Zap,
    },
    {
      number: "03",
      title: "FEP+ Lead Optimization",
      subtitle: "Sub-kcal/mol Relative Free Energy",
      duration: "4 - 8 Hours",
      statusText: "Alchemical Thermodynamic Integration: MUE 0.74 kcal",
      description:
        "High-priority chemical series undergo rigorous alchemical Free Energy Perturbation (FEP) calculations with explicit solvent. We predict relative binding affinity (ΔΔG) for analog modifications before any wet-lab chemistry takes place.",
      metrics: [
        { label: "Validation Accuracy", val: "MUE < 0.76 kcal/mol" },
        { label: "Correlation R²", val: "0.89 vs wet-lab" },
        { label: "Throughput", val: "100+ analogs/day" },
      ],
      icon: Cpu,
    },
    {
      number: "04",
      title: "Synthesis Prioritization & Assays",
      subtitle: "Experimental Campaign Execution",
      duration: "Biopharma Ready",
      statusText: "Clinical Candidate Profile: SPR Confirmed 1.8 nM",
      description:
        "We deliver a ranked synthesis matrix prioritized by predicted Kd, synthetic accessibility (SAScore), and patentability. Our biophysicists work hand-in-hand with your medicinal chemistry teams to confirm binding via SPR, ITC, and crystallography.",
      metrics: [
        { label: "Hit Rate", val: "32% in wet-lab assays" },
        { label: "Time-to-Lead", val: "3.5x Faster" },
        { label: "Synthesis Risk", val: "SAScore < 3.2 Prioritized" },
      ],
      icon: Microscope,
    },
  ];

  // Derived progress value without useEffect setState
  const progressPercent = (activeStep + 1) * 25;

  return (
    <section id="platform" className="py-20 sm:py-28 bg-[#0C0F1A] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span>Modular Discovery Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
              From Raw Crystal Structure to Optimized Clinical Lead
            </h2>
          </div>
          <p className="text-sm text-[#8B91B0] max-w-md">
            A continuous computational pipeline built for medicinal chemists who need decisive, physically grounded predictions on tight timelines.
          </p>
        </div>

        {/* Pipeline Navigation / Step Headers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-sm text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#141829] border-[#1B4FD8] shadow-lg shadow-[#1B4FD8]/10"
                    : "bg-[#080A10]/60 border-white/[0.06] hover:border-white/20 hover:bg-[#080A10]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-[#C9A84C]" : "text-[#8B91B0]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#3B6EF5]" : "text-[#8B91B0]"
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold text-[#FAFBFF] truncate">
                  {step.title}
                </div>
                <div className="text-[0.72rem] text-[#8B91B0] truncate mt-0.5">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pipeline Progress Indicator */}
        <div className="w-full bg-[#080A10] h-1.5 rounded-full overflow-hidden mb-8 border border-white/[0.04]">
          <div
            className="h-full bg-gradient-to-r from-[#1B4FD8] via-[#3B6EF5] to-[#C9A84C] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="glass-panel rounded-md p-6 sm:p-10 relative overflow-hidden bg-[#0F1322] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#C9A84C]">
                  {steps[activeStep].number}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-[#FAFBFF]">
                  {steps[activeStep].title}
                </span>
              </div>

              {/* Live Status Telemetry Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080A10] border border-white/[0.08] text-xs font-mono text-[#70A0FF]">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#3B6EF5]" />
                <span>{steps[activeStep].statusText}</span>
              </div>

              <p className="text-sm sm:text-base text-[#8B91B0] leading-relaxed pt-1">
                {steps[activeStep].description}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-[#E8C96A] font-mono">
                <span>Typical Wall-Clock Time:</span>
                <strong className="px-2.5 py-0.5 rounded-sm bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#FAFBFF]">
                  {steps[activeStep].duration}
                </strong>
              </div>
            </div>

            {/* Right Metrics Bento */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {steps[activeStep].metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-sm bg-[#080A10]/90 border border-white/[0.06] flex flex-col justify-between shadow-inner"
                >
                  <span className="text-[0.68rem] uppercase tracking-wider text-[#8B91B0]">
                    {m.label}
                  </span>
                  <span className="text-lg font-bold font-mono text-[#FAFBFF] mt-1">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
