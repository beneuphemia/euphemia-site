"use client";

import { site } from "@/content/site";

const PILLAR_STYLES: Record<
  string,
  { tagColor: string; accentColor: string }
> = {
  physics: {
    tagColor: "text-[#70A0FF] border-[#1B4FD8]/40 bg-[#1B4FD8]/10",
    accentColor: "#1B4FD8",
  },
  ml: {
    tagColor: "text-[#E8C96A] border-[#C9A84C]/40 bg-[#C9A84C]/10",
    accentColor: "#C9A84C",
  },
  truth: {
    tagColor: "text-[#E74C3C] border-[#C03A2B]/40 bg-[#C03A2B]/10",
    accentColor: "#C03A2B",
  },
};

export default function SciencePillars() {
  const pillars = site.science.pillars;

  return (
    <section id="science" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C03A2B] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1B4FD8]" />
            <span>{site.science.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFBFF] leading-[1.15]">
            {site.science.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B91B0] leading-relaxed">
            {site.science.body}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const style = PILLAR_STYLES[pillar.id] ?? PILLAR_STYLES.physics;
            return (
              <div
                key={pillar.id}
                className="glass-panel glass-panel-hover rounded-md p-6 sm:p-8 flex flex-col justify-between relative group"
              >
                <div className="space-y-4">
                  {/* Header Tag */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[0.68rem] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm border ${style.tagColor}`}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#FAFBFF] tracking-tight pt-1">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#8B91B0] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                {/* Bottom Subtle Bar */}
                <div
                  className="w-full h-0.5 mt-6 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: style.accentColor }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
