"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavigationProps {
  onOpenPartnerModal: () => void;
}

export default function Navigation({ onOpenPartnerModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Technology", href: "#technology" },
    { label: "Science", href: "#science" },
    { label: "Explorer", href: "#explorer" },
    { label: "Benchmarks", href: "#benchmarks" },
    { label: "Comparison", href: "#comparison" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080A10]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/40"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 rounded-sm"
            aria-label="Euphemia Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-sm bg-[#121727] border border-white/10 group-hover:border-[#C9A84C]/60 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#1B4FD8] animate-ping absolute opacity-75" />
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] relative z-10" />
              <div className="absolute inset-0 rounded-sm border border-[#1B4FD8]/40 scale-75 group-hover:scale-95 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-[1.05rem] font-bold tracking-[0.14em] text-[#FAFBFF] leading-none">
                EUPHEMIA
              </span>
              <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[#8B91B0] mt-0.5 font-medium">
                Physics &middot; Solvation
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.82rem] font-medium tracking-[0.08em] uppercase text-[#8B91B0] hover:text-[#FAFBFF] transition-colors relative py-1 focus:outline-none focus:text-[#FAFBFF]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenPartnerModal}
              className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.08em] uppercase font-semibold text-[#FAFBFF] bg-[#1B4FD8] hover:bg-[#3B6EF5] px-4 py-2.5 rounded-sm transition-all shadow-sm hover:shadow-[0_0_20px_rgba(27,79,216,0.35)] active:translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
            >
              <span>Schedule Pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger (min 44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-sm border border-white/10 text-[#FAFBFF] hover:bg-white/5 active:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-in fade-in duration-200">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-[#080A10]/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-x-0 top-[65px] bottom-0 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Partner Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121727] border border-[#C9A84C]/30 text-[0.75rem] text-[#E8C96A]">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Now Accepting Q2/Q3 2026 Partner Programs</span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 px-3 text-[1rem] font-medium tracking-[0.06em] text-[#FAFBFF] border-b border-white/[0.05] hover:bg-white/5 rounded-sm transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#8B91B0]" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Mobile Actions */}
            <div className="space-y-3 pt-8 pb-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-sm bg-[#1B4FD8] hover:bg-[#3B6EF5] text-[#FAFBFF] font-semibold text-[0.88rem] tracking-[0.06em] uppercase transition-all shadow-lg cursor-pointer"
              >
                <span>Request Target Hydration Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <a
                  href="mailto:info@euphemia.ai"
                  className="text-[0.8rem] text-[#8B91B0] hover:text-[#C9A84C] transition-colors"
                >
                  Direct Inquiry: info@euphemia.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
