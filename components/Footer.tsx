"use client";

import { ShieldCheck, ArrowUp } from "lucide-react";

export default function Footer({ onOpenPartnerModal }: { onOpenPartnerModal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080A10] border-t border-white/[0.08] text-[#8B91B0] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center rounded-sm bg-[#121727] border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              </div>
              <span className="text-sm font-bold tracking-[0.16em] text-[#FAFBFF]">
                EUPHEMIA
              </span>
            </div>
            <p className="text-xs text-[#8B91B0] max-w-sm leading-relaxed">
              Computational drug discovery powered by rigorous molecular physics simulation and machine learning. Specialists in water network thermodynamics and cryptic pocket solvation.
            </p>
            <div className="flex items-center gap-2 text-[0.7rem] text-[#D4D8EB] pt-1">
              <span className="italic font-serif text-[#C9A84C]">veritas per aquam</span>
              <span>&middot;</span>
              <span>Truth through water</span>
            </div>
          </div>

          {/* Column 1: Science & Tech */}
          <div className="space-y-3">
            <div className="text-[0.7rem] font-mono uppercase tracking-wider text-[#FAFBFF]">
              Science
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#science" className="hover:text-[#FAFBFF] transition-colors">
                  Grand Canonical Monte Carlo
                </a>
              </li>
              <li>
                <a href="#explorer" className="hover:text-[#FAFBFF] transition-colors">
                  Target Hydration Atlas
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-[#FAFBFF] transition-colors">
                  FEP+ Validation Benchmarks
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-[#FAFBFF] transition-colors">
                  vs. Conventional Docking
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="text-[0.7rem] font-mono uppercase tracking-wider text-[#FAFBFF]">
              Capabilities
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#technology" className="hover:text-[#FAFBFF] transition-colors">
                  Cryptic Pocket Discovery
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#FAFBFF] transition-colors">
                  Kinase Isoform Selectivity
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#FAFBFF] transition-colors">
                  Fragment-to-Lead Expansion
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#FAFBFF] transition-colors">
                  Giga-scale Library Triage
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner & Contact */}
          <div className="space-y-3">
            <div className="text-[0.7rem] font-mono uppercase tracking-wider text-[#FAFBFF]">
              Engage
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenPartnerModal}
                  className="hover:text-[#FAFBFF] transition-colors text-left cursor-pointer"
                >
                  Schedule Target Pilot
                </button>
              </li>
              <li>
                <a href="mailto:info@euphemia.ai" className="hover:text-[#C9A84C] transition-colors">
                  info@euphemia.ai
                </a>
              </li>
              <li>
                <a href="mailto:matt@euphemia.ai" className="hover:text-[#C9A84C] transition-colors">
                  matt@euphemia.ai
                </a>
              </li>
              <li className="pt-2 text-[0.68rem] text-[#8B91B0]">
                Euphemia Ltd &middot; United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[0.7rem]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B4FD8]" />
            <span>Biopharma IP Protected &middot; Strict CDA Enforced &middot; Air-Gapped Compute Clusters</span>
          </div>

          <div className="flex items-center gap-4 text-[0.7rem]">
            <span>&copy; {new Date().getFullYear()} Euphemia Ltd. All rights reserved.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#FAFBFF] transition-colors p-1"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
