"use client";

import { useState } from "react";
import { Database, Zap, Cpu } from "lucide-react";
import { site } from "@/content/site";

const STEP_ICONS = [Database, Zap, Cpu];

export default function WorkflowPipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = site.approach.steps;
  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <section
      id="approach"
      className="py-20 sm:py-28 bg-[#0C0F1A] border-y border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span>{site.approach.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
              {site.approach.headingA}
              <br />
              <span className="text-[#C9A84C]">{site.approach.headingB}</span>
            </h2>
          </div>
          <div className="text-sm text-[#8B91B0] max-w-md space-y-3">
            {site.approach.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Pipeline Navigation / Step Headers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
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
                <div className="text-sm font-semibold text-[#FAFBFF]">{step.title}</div>
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
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#C9A84C]">
              {steps[activeStep].number}
            </span>
            <span className="text-lg sm:text-2xl font-bold text-[#FAFBFF]">
              {steps[activeStep].title}
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#8B91B0] leading-relaxed pt-4 max-w-3xl">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </section>
  );
}
