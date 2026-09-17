"use client";

import { useState } from "react";
import { ShieldCheck, Eye } from "lucide-react";
import { site } from "@/content/site";

export default function InteractiveHydrationExplorer() {
  const [selectedTargetId, setSelectedTargetId] = useState(
    site.explorer.targets[0].id
  );
  const [displacedWaters, setDisplacedWaters] = useState<Record<string, boolean>>({
    w2: true,
    w3: true,
  });

  const currentTarget =
    site.explorer.targets.find((t) => t.id === selectedTargetId) ??
    site.explorer.targets[0];

  const toggleWaterDisplacement = (waterId: string) => {
    setDisplacedWaters((prev) => ({
      ...prev,
      [waterId]: !prev[waterId],
    }));
  };

  // Calculate dynamic affinity boost based on selected water displacements
  const activeDisplaced = currentTarget.waters.filter((w) => displacedWaters[w.id]);
  const totalFreeEnergyBoost = activeDisplaced.reduce(
    (acc, w) => acc + (w.deltaG > 0 ? w.deltaG : 0),
    0
  );
  const calculatedAffinityGain =
    totalFreeEnergyBoost > 0 ? -totalFreeEnergyBoost : 0;
  const potencyMultiplier = Math.max(
    1,
    Math.round(Math.pow(10, totalFreeEnergyBoost / 1.4))
  );

  return (
    <div className="w-full rounded-md bg-[#0C0F1A] border border-white/[0.08] p-4 sm:p-7 shadow-2xl">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <span className="text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C]">
              {site.explorer.eyebrow}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#FAFBFF] tracking-tight">
            {site.explorer.heading}
          </h3>
          <p className="text-sm text-[#8B91B0] max-w-2xl mt-1">
            {site.explorer.body}
          </p>
        </div>

        {/* Target Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#080A10] p-1.5 rounded-sm border border-white/[0.06] self-start lg:self-auto">
          {site.explorer.targets.map((target) => (
            <button
              key={target.id}
              onClick={() => {
                setSelectedTargetId(target.id);
                const initial: Record<string, boolean> = {};
                target.waters.forEach((w) => {
                  if (w.role.includes("Displaceable")) initial[w.id] = true;
                });
                setDisplacedWaters(initial);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                selectedTargetId === target.id
                  ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                  : "text-[#8B91B0] hover:text-[#FAFBFF] hover:bg-white/5"
              }`}
            >
              {target.name.split(" ")[0]} ({target.pdbId})
            </button>
          ))}
        </div>
      </div>

      {/* Target Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: Target Context & 2D Pocket Hydration Map */}
        <div className="lg:col-span-7 space-y-5">
          {/* Target Summary Card */}
          <div className="p-4 rounded-sm bg-[#121727]/70 border border-white/[0.06]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-base font-semibold text-[#FAFBFF]">
                {currentTarget.name}
              </span>
              <span className="text-[0.68rem] px-2 py-0.5 rounded-sm bg-[#1B4FD8]/20 text-[#70A0FF] border border-[#1B4FD8]/30 font-mono">
                PDB: {currentTarget.pdbId}
              </span>
            </div>
            <p className="text-xs text-[#8B91B0] leading-relaxed">
              <strong className="text-[#D4D8EB]">Biophysical Challenge:</strong>{" "}
              {currentTarget.challenge}
            </p>
          </div>

          {/* 2D Interactive Binding Pocket Hydration Graphic */}
          <div className="p-4 rounded-sm bg-[#080A10] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-[#8B91B0] uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#3B6EF5]" />
                Pocket 2D Hydration Map
              </span>
              <span className="text-[0.68rem] text-[#C9A84C]">{site.explorer.hint}</span>
            </div>

            <div className="relative w-full h-44 rounded-sm bg-[#06080E] border border-white/[0.04] flex items-center justify-center overflow-hidden">
              {/* Pocket Cavity Background Silhouette */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <radialGradient id="pocketGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1B4FD8" stopOpacity="0.18" />
                    <stop offset="70%" stopColor="#1B4FD8" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#1B4FD8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path
                  d="M 15 20 Q 50 10 85 20 Q 90 60 75 85 Q 45 95 20 80 Z"
                  fill="url(#pocketGrad)"
                  stroke="rgba(59, 110, 245, 0.2)"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />

                {/* H-Bond connecting lines */}
                {currentTarget.waters.map((w, i) => {
                  const next =
                    currentTarget.waters[(i + 1) % currentTarget.waters.length];
                  return (
                    <line
                      key={`line-${w.id}-${next.id}`}
                      x1={w.coord.x}
                      y1={w.coord.y}
                      x2={next.coord.x}
                      y2={next.coord.y}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                  );
                })}
              </svg>

              {/* Water Nodes */}
              {currentTarget.waters.map((water) => {
                const isDisplaced = !!displacedWaters[water.id];
                const isDisplaceable = water.deltaG > 0;

                return (
                  <button
                    key={`node-${water.id}`}
                    type="button"
                    onClick={() => toggleWaterDisplacement(water.id)}
                    style={{ left: `${water.coord.x}%`, top: `${water.coord.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[0.65rem] font-bold transition-all ${
                        isDisplaced
                          ? "bg-[#C03A2B]/20 text-[#E74C3C] border-2 border-[#C03A2B] scale-110 shadow-lg shadow-[#C03A2B]/20"
                          : isDisplaceable
                          ? "bg-[#C9A84C] text-[#080A10] border-2 border-[#FAFBFF] hover:scale-110"
                          : "bg-[#1B4FD8] text-[#FAFBFF] border-2 border-[#3B6EF5] hover:scale-110"
                      }`}
                    >
                      {water.label.split(" ")[0]}
                    </div>
                    <span className="text-[0.62rem] font-mono mt-0.5 px-1 rounded bg-[#080A10]/90 text-[#D4D8EB] whitespace-nowrap">
                      {isDisplaced
                        ? "Displaced"
                        : `${water.deltaG > 0 ? "+" : ""}${water.deltaG} ΔG`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Water Sites Interactive Inspector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B91B0]">
                Binding-Pocket Water Network Breakdown
              </span>
              <span className="text-[0.7rem] text-[#C9A84C]">Click row to toggle state</span>
            </div>

            <div className="space-y-2">
              {currentTarget.waters.map((water) => {
                const isDisplaced = !!displacedWaters[water.id];
                const isDisplaceable = water.deltaG > 0;

                return (
                  <div
                    key={water.id}
                    onClick={() => toggleWaterDisplacement(water.id)}
                    className={`p-3 rounded-sm border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                      isDisplaced
                        ? "bg-[#C9A84C]/10 border-[#C9A84C]/40 shadow-sm"
                        : "bg-[#080A10]/60 border-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isDisplaced}
                        onChange={() => {}}
                        className="mt-0.5 sm:mt-0 w-4 h-4 rounded-sm accent-[#C9A84C] cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#FAFBFF]">
                            {water.label}
                          </span>
                          <span
                            className={`text-[0.62rem] px-1.5 py-0.2 rounded-sm font-mono ${
                              isDisplaceable
                                ? "bg-[#C03A2B]/20 text-[#E74C3C] border border-[#C03A2B]/30"
                                : "bg-[#1B4FD8]/20 text-[#70A0FF] border border-[#1B4FD8]/30"
                            }`}
                          >
                            {water.role}
                          </span>
                        </div>
                        <div className="text-[0.68rem] text-[#8B91B0] mt-0.5">
                          Occupancy: {(water.occupancy * 100).toFixed(0)}% &middot; ΔH:{" "}
                          {water.enthalpy > 0 ? "+" : ""}
                          {water.enthalpy} &middot; -TΔS: {water.entropy > 0 ? "+" : ""}
                          {water.entropy} kcal/mol
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right font-mono text-xs pl-7 sm:pl-0">
                      <div
                        className={
                          water.deltaG > 0
                            ? "text-[#E8C96A] font-bold"
                            : "text-[#70A0FF] font-semibold"
                        }
                      >
                        {water.deltaG > 0
                          ? `+${water.deltaG.toFixed(1)}`
                          : water.deltaG.toFixed(1)}{" "}
                        kcal/mol ΔG
                      </div>
                      <div className="text-[0.65rem] text-[#8B91B0]">
                        {isDisplaced ? "Displaced by Ligand" : "Occupied by H₂O"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Thermodynamic Readout & Benchmark */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Real-time Computed Affinity Card */}
          <div className="p-5 rounded-sm bg-gradient-to-b from-[#121727] to-[#0C0F1A] border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-full blur-2xl pointer-events-none" />

            <span className="text-[0.68rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C]">
              Computed Thermodynamic Outcome
            </span>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-white/[0.06]">
              <div>
                <div className="text-[0.68rem] uppercase text-[#8B91B0]">
                  Baseline Docking Kd
                </div>
                <div className="text-xl font-bold font-mono text-[#8B91B0] line-through mt-0.5">
                  {currentTarget.defaultKd}
                </div>
                <div className="text-[0.62rem] text-[#8B91B0]">Neglected solvation</div>
              </div>

              <div>
                <div className="text-[0.68rem] uppercase text-[#8B91B0]">
                  Euphemia Lead Kd
                </div>
                <div className="text-2xl font-bold font-mono text-[#C9A84C] mt-0.5">
                  {totalFreeEnergyBoost > 0
                    ? currentTarget.optimizedKd
                    : currentTarget.defaultKd}
                </div>
                <div className="text-[0.62rem] text-[#E8C96A] font-medium">
                  {totalFreeEnergyBoost > 0
                    ? `${potencyMultiplier}x potency jump`
                    : "No water displacement"}
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-sm bg-[#080A10]/80 border border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B91B0]">Binding Free Energy (ΔΔG):</span>
              <span className="text-[#FAFBFF] font-bold text-sm">
                {calculatedAffinityGain !== 0
                  ? `${calculatedAffinityGain.toFixed(1)} kcal/mol`
                  : "0.0 kcal/mol"}
              </span>
            </div>

            <p className="text-xs text-[#8B91B0] mt-3 leading-relaxed">
              <strong className="text-[#FAFBFF]">Biophysical Mechanism:</strong> Displacing
              entropic, high-energy water releases solvent molecules into bulk water,
              generating an entropic gain that directly translates into binding free energy.
            </p>
          </div>

          {/* Validation Comparison Box */}
          <div className="p-4 rounded-sm bg-[#080A10] border border-white/[0.06] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FAFBFF]">
              <ShieldCheck className="w-4 h-4 text-[#1B4FD8]" />
              <span>Wet-Lab Experimental Confirmation</span>
            </div>
            <p className="text-xs text-[#8B91B0] leading-relaxed">
              {currentTarget.euphemiaAdvantage}
            </p>
            <div className="flex items-center justify-between text-[0.68rem] text-[#8B91B0] pt-1 font-mono">
              <span>
                Simulation Wall-Clock: <strong className="text-[#FAFBFF]">4.2 mins</strong>
              </span>
              <span>
                FEP+ Correlation: <strong className="text-[#C9A84C]">R² = 0.89</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
