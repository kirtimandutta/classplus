"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  ChartLine,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Video,
  type LucideIcon,
} from "lucide-react";
import { POWERS } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const ICONS: Record<(typeof POWERS)[number]["id"], LucideIcon> = {
  app: Smartphone,
  stream: ShieldCheck,
  live: Video,
  tests: ClipboardCheck,
  whatsapp: MessageCircle,
  payouts: Banknote,
  analytics: ChartLine,
};

export function Superpowers() {
  const [selected, setSelected] = useState<(typeof POWERS)[number]["id"]>("app");
  const active = POWERS.find((power) => power.id === selected) ?? POWERS[0];
  const ActiveIcon = ICONS[active.id];

  return (
    <section id="superpowers" className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-16">
      <SectionHeading
        eyebrow="7 creator superpowers"
        title="The operating system behind the app icon."
        body="Pick a capability. The panel underneath is the same product your students would feel after launch day."
      />

      <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {POWERS.map((power, index) => {
          const Icon = ICONS[power.id];
          const on = power.id === selected;
          const featured = index === 0;
          return (
            <button
              key={power.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(power.id)}
              className={`rounded-3xl border p-5 text-left transition-[border-color,background-color,transform] hover:-translate-y-0.5 ${
                featured ? "sm:col-span-2 xl:col-span-2 xl:row-span-2" : ""
              } ${
                on
                  ? "border-cyan-300/40 bg-white/[0.07] shadow-[0_0_40px_-18px_rgba(6,182,212,0.9)]"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
              }`}
            >
              <span
                className={`grid place-items-center rounded-2xl bg-cobalt/15 text-cyan-200 ${
                  featured ? "h-12 w-12" : "h-10 w-10"
                }`}
              >
                <Icon className={featured ? "h-5 w-5" : "h-4 w-4"} />
              </span>
              <span
                className={`mt-4 block font-semibold tracking-[-0.03em] ${
                  featured ? "text-2xl" : "text-base"
                }`}
              >
                {power.title}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-white/60">
                {power.line}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)]">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.03em]">{active.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                {active.body}
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {active.points.map((point) => (
              <li
                key={point}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
              >
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
