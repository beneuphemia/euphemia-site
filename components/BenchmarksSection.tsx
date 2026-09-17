"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function BenchmarksSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = site.benchmarks.tabs;
  const current = tabs[activeTab];

  return (
    <section
      id="benchmarks"
      className="py-20 sm:py-28 bg-[#0C0F1A] border-t border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <span>{site.benchmarks.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
            {site.benchmarks.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B91B0]">
            {site.benchmarks.body}
          </p>
        </div>

        {/* Top Proof Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {site.benchmarks.cards.map((card) => (
            <div
              key={card.label}
              className="p-5 rounded-sm bg-[#121727]/70 border border-white/[0.08] text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#FAFBFF]">
                {card.value}
                {card.unit ? (
                  <span className="text-xs text-[#8B91B0] font-sans"> {card.unit}</span>
                ) : null}
              </div>
              <div className="text-[0.68rem] uppercase font-mono tracking-wider text-[#C9A84C] mt-1.5">
                {card.label}
              </div>
              <div className="text-[0.72rem] text-[#8B91B0] mt-1">{card.note}</div>
            </div>
          ))}
        </div>

        {/* Interactive Benchmark Dossier */}
        <div className="glass-panel rounded-md p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-4 mb-6">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#1B4FD8] text-[#FAFBFF] shadow-sm font-semibold"
                    : "text-[#8B91B0] hover:text-[#FAFBFF] hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#FAFBFF]">{current.heading}</h4>
            <p className="text-sm text-[#8B91B0] leading-relaxed max-w-3xl">
              {current.body}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {current.items.map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-[#080A10] rounded-sm border border-white/[0.06]"
                >
                  <div className="text-xs uppercase font-mono text-[#8B91B0]">{item.label}</div>
                  <div className="text-xl font-bold font-mono text-[#FAFBFF] mt-1">
                    {item.value}
                  </div>
                  {item.note ? (
                    <div className="text-[0.72rem] text-[#8B91B0] mt-0.5">{item.note}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
