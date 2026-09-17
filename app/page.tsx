"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSimulation from "@/components/HeroSimulation";
import SolvationFieldAnimation from "@/components/SolvationFieldAnimation";
import InteractiveHydrationExplorer from "@/components/InteractiveHydrationExplorer";
import SciencePillars from "@/components/SciencePillars";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import BenchmarksSection from "@/components/BenchmarksSection";
import DifferentiationMatrix from "@/components/DifferentiationMatrix";
import PartnershipModal from "@/components/PartnershipModal";
import Footer from "@/components/Footer";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/content/site";

export default function Home() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const openModal = () => setPartnerModalOpen(true);

  return (
    <div className="min-h-screen bg-[#080A10] text-[#FAFBFF] selection:bg-[#C9A84C]/25 selection:text-[#FAFBFF]">
      {/* Full-page solvation field background */}
      <SolvationFieldAnimation />

      {/* Top Fixed Navigation */}
      <Navigation onOpenPartnerModal={openModal} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden tech-grid-bg">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B4FD8]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#C9A84C]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Mission & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono tracking-widest text-[#E8C96A] uppercase animate-float-up delay-100">
                <span className="w-2 h-2 rounded-full bg-[#1B4FD8] animate-ping" />
                <span>{site.hero.eyebrow}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#FAFBFF] leading-[1.08] animate-float-up delay-200">
                {site.hero.headlineA}{" "}
                <span className="gold-shimmer block mt-1">{site.hero.headlineB}</span>
              </h1>

              {/* Body Copy */}
              <p className="text-base sm:text-lg text-[#8B91B0] leading-relaxed max-w-xl animate-float-up delay-300">
                {site.hero.body}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 animate-float-up delay-500">
                <a
                  href={site.hero.primaryCtaHref}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#1B4FD8] hover:bg-[#3B6EF5] text-[#FAFBFF] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#1B4FD8]/25 hover:shadow-[#3B6EF5]/40 active:translate-y-0.5"
                >
                  <span>{site.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={site.hero.secondaryCtaHref}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-white/[0.12] hover:border-white/30 bg-[#0C0F1A]/80 hover:bg-[#121727] text-[#FAFBFF] font-medium text-xs tracking-wider uppercase transition-all text-center"
                >
                  <span>{site.hero.secondaryCta}</span>
                </a>
              </div>

              {/* Proof Strip */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 animate-float-up delay-700">
                {site.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[0.65rem] font-mono uppercase text-[#8B91B0] tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Solvation Physics Simulation */}
            <div className="lg:col-span-6 animate-float-up delay-300">
              <HeroSimulation />
            </div>
          </div>
        </div>
      </section>

      {/* Target Explorer Section */}
      <section id="explorer" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveHydrationExplorer />
        </div>
      </section>

      {/* Scientific Pillars (Physics, ML, Ground Truth) */}
      <SciencePillars />

      {/* Discovery Pipeline Workflow */}
      <WorkflowPipeline />

      {/* Quantitative Benchmarks */}
      <BenchmarksSection />

      {/* Market Differentiation Matrix */}
      <DifferentiationMatrix />

      {/* Partner & Contact Section */}
      <section
        id="contact"
        className="py-20 sm:py-28 bg-[#0C0F1A] border-t border-white/[0.06] relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121727] border border-white/[0.08] text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#C03A2B]">
            <span className="w-2 h-2 rounded-full bg-[#C03A2B]" />
            <span>{site.contact.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFBFF]">
            {site.contact.heading}
          </h2>

          <p className="text-base sm:text-lg text-[#8B91B0] leading-relaxed max-w-2xl mx-auto">
            {site.contact.body}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={openModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-[#1B4FD8] hover:bg-[#3B6EF5] text-[#FAFBFF] font-semibold text-xs tracking-wider uppercase transition-all shadow-xl shadow-[#1B4FD8]/30 cursor-pointer"
            >
              <span>{site.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`mailto:${site.contact.email}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-sm border border-white/[0.12] hover:border-white/30 text-xs font-medium text-[#FAFBFF] hover:bg-white/5 transition-all text-center"
            >
              <Mail className="w-4 h-4 text-[#C9A84C]" />
              <span>{site.contact.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer onOpenPartnerModal={openModal} />

      {/* Partnership Intake Modal */}
      <PartnershipModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />
    </div>
  );
}
