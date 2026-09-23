"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { useUi } from "@/components/ui-provider";
import { primaryBtn } from "@/lib/styles";

const LINKS = [
  { href: "#preview", label: "App" },
  { href: "#superpowers", label: "Product" },
  { href: "#earnings", label: "Earnings" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const { openDemo } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 transition-colors sm:px-8 ${
          scrolled || open
            ? "border-b border-white/10 bg-obsidian/75 backdrop-blur-2xl"
            : "border-b border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-sm font-bold">
            C
          </span>
          <span className="text-sm font-semibold tracking-[-0.03em]">
            Classplus
            <span className="font-medium text-white/50"> for Creators</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton className={primaryBtn} onClick={() => openDemo()}>
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-white/10 bg-obsidian/95 px-5 py-4 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-2 py-2 text-sm text-white/80"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className={`${primaryBtn} mt-2`}
              onClick={() => {
                setOpen(false);
                openDemo();
              }}
            >
              Book a demo
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
