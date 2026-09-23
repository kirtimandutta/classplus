"use client";

import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { useUi } from "@/components/ui-provider";
import { ghostBtn, primaryBtn } from "@/lib/styles";

export function Footer() {
  const { openDemo, openPreview } = useUi();

  return (
    <footer className="px-5 pt-8 pb-10 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-12 backdrop-blur-2xl sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Ready when you are
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.045em] sm:text-5xl sm:leading-[1.05]">
            Put your name on the home screen.
          </h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <MagneticButton className={primaryBtn} onClick={() => openDemo()}>
              Book Free 1-on-1 Growth Demo
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton className={ghostBtn} onClick={openPreview}>
              Live App Previewer
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Classplus for Creators · classplusforcreators.co</p>
        <p>Pre-sales experience. Earnings and fees shown here are planning figures.</p>
      </div>
    </footer>
  );
}
