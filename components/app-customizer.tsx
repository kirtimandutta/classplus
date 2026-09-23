"use client";

import { PhoneMockup } from "@/components/phone-mockup";
import { CreatorControls } from "@/components/creator-controls";
import { useCreator } from "@/components/creator-context";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function AppCustomizer() {
  const { name, brand, tags, platform } = useCreator();

  return (
    <section id="preview" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <PhoneMockup
            name={name}
            color={brand.hex}
            soft={brand.soft}
            tags={tags}
            platform={platform}
          />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Interactive app customizer"
            title="Dress the app in your name before the demo."
            body="Type a creator name, pick a brand color, and pin the courses you teach. The phone redraws as you go. Nothing here calls an external service."
          />
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6">
            <CreatorControls />
          </div>
        </div>
      </div>
    </section>
  );
}
