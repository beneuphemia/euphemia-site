"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";

export default function Footer({ onOpenPartnerModal }: { onOpenPartnerModal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080A10] border-t border-white/[0.08] text-[#8B91B0] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center rounded-sm bg-[#121727] border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              </div>
              <span className="text-sm font-bold tracking-[0.16em] text-[#FAFBFF]">
                {site.brand.name}
              </span>
            </div>
            <p className="text-xs text-[#8B91B0] max-w-sm leading-relaxed">
              {site.meta.description}
            </p>
            <div className="flex items-center gap-2 text-[0.7rem] text-[#D4D8EB] pt-1">
              <span className="italic font-serif text-[#C9A84C]">{site.brand.motto}</span>
              {site.brand.mottoTranslation ? (
                <>
                  <span>&middot;</span>
                  <span>{site.brand.mottoTranslation}</span>
                </>
              ) : null}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-3 md:text-right">
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
                  {site.hero.primaryCta}
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[0.7rem]">{site.brand.copyright}</span>

          <div className="flex items-center gap-4 text-[0.7rem]">
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
