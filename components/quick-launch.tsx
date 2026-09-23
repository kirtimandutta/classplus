"use client";

import { ArrowRight, Smartphone } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { useUi } from "@/components/ui-provider";
import { ghostBtn, primaryBtn } from "@/lib/styles";

export function QuickLaunch() {
  const { openDemo, openPreview } = useUi();

  return (
    <section className="relative z-20 -mt-10 px-5 sm:px-8" aria-label="Quick launch">
      <Reveal>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_-36px_rgba(37,99,235,0.55)] backdrop-blur-2xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Docked launch bar
            </p>
            <p className="mt-2 max-w-md text-lg font-semibold tracking-[-0.03em] sm:text-xl">
              Two ways in. Preview the app, or book the working session.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <MagneticButton className={ghostBtn} onClick={openPreview}>
              <Smartphone className="h-4 w-4" />
              Live App Previewer
            </MagneticButton>
            <MagneticButton className={primaryBtn} onClick={() => openDemo()}>
              Book Free 1-on-1 Growth Demo
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
