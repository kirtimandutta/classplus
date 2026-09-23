"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";
import { CreatorControls } from "@/components/creator-controls";
import { PhoneMockup } from "@/components/phone-mockup";
import { useCreator } from "@/components/creator-context";
import { useUi } from "@/components/ui-provider";

export function PreviewModal() {
  const { previewOpen, closePreview, openDemo } = useUi();
  const { name, brand, tags, platform } = useCreator();
  const titleId = useId();

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePreview, previewOpen]);

  if (!previewOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close app previewer"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closePreview}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0c1018]/92 p-5 shadow-[0_40px_120px_-40px_rgba(6,182,212,0.7)] backdrop-blur-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Live App Previewer
            </p>
            <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              See the home screen with your brand.
            </h2>
          </div>
          <button
            type="button"
            onClick={closePreview}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:justify-items-center">
          <PhoneMockup
            name={name}
            color={brand.hex}
            soft={brand.soft}
            tags={tags}
            platform={platform}
          />
          <div className="w-full">
            <CreatorControls compact />
            <button
              type="button"
              onClick={() => openDemo()}
              className="mt-6 text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
            >
              Book Free 1-on-1 Growth Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
