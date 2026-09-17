"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { site } from "@/content/site";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    targetClass: site.modal.targetFamilies[0],
    targetNotes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoLink = `mailto:${site.contact.email}?subject=Euphemia%20Target%20Hydration%20Inquiry%20-%20${encodeURIComponent(
    formData.organization || "Biopharma Partner"
  )}&body=Name:%20${encodeURIComponent(formData.name)}%0AOrganization:%20${encodeURIComponent(
    formData.organization
  )}%0AEmail:%20${encodeURIComponent(formData.email)}%0ATarget%20Class:%20${encodeURIComponent(
    formData.targetClass
  )}%0ANotes:%20${encodeURIComponent(formData.targetNotes)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080A10]/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-md bg-[#0C0F1A] border border-white/[0.12] p-6 sm:p-8 shadow-2xl z-10 my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8B91B0] hover:text-[#FAFBFF] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1B4FD8]" />
              <span className="text-[0.7rem] font-mono uppercase tracking-widest text-[#70A0FF]">
                {site.modal.eyebrow}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAFBFF] tracking-tight">
              {site.modal.heading}
            </h3>
            <p className="text-xs sm:text-sm text-[#8B91B0] mt-1.5 leading-relaxed">
              {site.modal.body}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8B91B0] mb-1">
                    {site.modal.fields.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={site.modal.placeholders.name}
                    className="w-full px-3 py-2 text-sm rounded-sm bg-[#121727] border border-white/[0.08] text-[#FAFBFF] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8B91B0] mb-1">
                    {site.modal.fields.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={site.modal.placeholders.email}
                    className="w-full px-3 py-2 text-sm rounded-sm bg-[#121727] border border-white/[0.08] text-[#FAFBFF] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8B91B0] mb-1">
                    {site.modal.fields.organization} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder={site.modal.placeholders.organization}
                    className="w-full px-3 py-2 text-sm rounded-sm bg-[#121727] border border-white/[0.08] text-[#FAFBFF] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8B91B0] mb-1">
                    {site.modal.fields.targetFamily}
                  </label>
                  <select
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-sm bg-[#121727] border border-white/[0.08] text-[#FAFBFF] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  >
                    {site.modal.targetFamilies.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8B91B0] mb-1">
                  {site.modal.fields.targetNotes}
                </label>
                <textarea
                  rows={3}
                  value={formData.targetNotes}
                  onChange={(e) => setFormData({ ...formData, targetNotes: e.target.value })}
                  placeholder={site.modal.placeholders.targetNotes}
                  className="w-full px-3 py-2 text-sm rounded-sm bg-[#121727] border border-white/[0.08] text-[#FAFBFF] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>

              {/* Confidentiality Assurance */}
              <div className="flex items-center gap-2 text-xs text-[#8B91B0] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>{site.modal.assurance}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-sm bg-[#1B4FD8] hover:bg-[#3B6EF5] text-[#FAFBFF] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{site.modal.submit}</span>
                </button>
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm border border-white/[0.1] text-xs font-medium text-[#FAFBFF] hover:bg-white/5 transition-colors text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{site.modal.emailDirect}</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#FAFBFF]">{site.modal.successTitle}</h4>
            <p className="text-sm text-[#8B91B0] max-w-sm mx-auto">
              {site.modal.successBody.replace("{name}", formData.name || "Colleague")}
            </p>
            <div className="p-3 bg-[#121727] rounded-sm text-xs font-mono text-[#D4D8EB] max-w-xs mx-auto">
              Direct Contact: <span className="text-[#C9A84C]">{site.contact.email}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 rounded-sm bg-white/10 hover:bg-white/15 text-xs text-[#FAFBFF] transition-colors cursor-pointer"
            >
              {site.modal.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
