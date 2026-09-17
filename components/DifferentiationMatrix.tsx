"use client";

import { Check, ShieldAlert, Sparkles } from "lucide-react";
import { site } from "@/content/site";

export default function DifferentiationMatrix() {
  const rows = site.differentiation.rows;

  return (
    <section id="comparison" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <span>{site.differentiation.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFBFF]">
            {site.differentiation.heading}
          </h2>
        </div>

        {/* Mobile Card-by-Card View */}
        <div className="lg:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="glass-panel rounded-md p-4 sm:p-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C9A84C]">
                {row.label}
              </span>

              {/* Euphemia Box */}
              <div className="p-3 rounded-sm bg-[#121727] border border-[#1B4FD8]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FAFBFF] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{site.brand.name}</span>
                </div>
                <p className="text-xs text-[#FAFBFF] leading-relaxed">{row.right}</p>
              </div>

              {/* Alternative Box */}
              <div className="p-3 rounded-sm bg-[#080A10]/60 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B91B0] mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C03A2B]" />
                  <span>{row.label.replace("vs. ", "")}</span>
                </div>
                <p className="text-xs text-[#8B91B0] leading-relaxed">{row.left}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (lg and above) */}
        <div className="hidden lg:block overflow-hidden rounded-md border border-white/[0.08] bg-[#0C0F1A] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#121727]">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#8B91B0] w-1/5">
                  Comparison
                </th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#8B91B0] w-2/5">
                  The Alternative
                </th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#C9A84C] bg-[#1B4FD8]/15 border-l border-[#1B4FD8]/30 w-2/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    <span>{site.brand.name}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs">
              {rows.map((row) => (
                <tr key={row.label} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-[#FAFBFF] align-top font-mono">
                    {row.label}
                  </td>
                  <td className="p-4 text-[#8B91B0] align-top leading-relaxed">
                    {row.left}
                  </td>
                  <td className="p-4 text-[#FAFBFF] bg-[#1B4FD8]/5 border-l border-[#1B4FD8]/20 align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{row.right}</span>
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
