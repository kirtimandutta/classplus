"use client";

import type { CourseId } from "@/lib/content";

type Tag = {
  id: CourseId | string;
  label: string;
  meta: string;
  detail: string;
};

export function PhoneMockup({
  name,
  color,
  soft,
  tags,
  platform,
}: {
  name: string;
  color: string;
  soft: string;
  tags: Tag[];
  platform: "ios" | "android";
}) {
  const academy = name.trim() || "Your Academy";
  const initial = academy.charAt(0).toUpperCase();

  return (
    <div className="relative mx-auto w-[280px]">
      <div
        className="phone-glow pointer-events-none absolute -inset-10 rounded-full blur-3xl"
        style={{ background: color }}
      />
      <div className="relative rounded-[2.7rem] border border-white/15 bg-[#07090f] p-[10px] shadow-[0_40px_90px_-36px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <span className="absolute top-24 -left-[3px] h-7 w-[3px] rounded-l bg-white/25" />
        <span className="absolute top-36 -right-[3px] h-16 w-[3px] rounded-r bg-white/25" />
        <div className="relative h-[560px] overflow-hidden rounded-[2.15rem] bg-[#0c1018]">
          {platform === "ios" ? (
            <span className="absolute top-2.5 left-1/2 z-20 h-6 w-[92px] -translate-x-1/2 rounded-full bg-black" />
          ) : (
            <span className="absolute top-3 left-1/2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-black ring-2 ring-white/15" />
          )}

          <div className="flex items-center justify-between px-5 pt-3.5 text-[11px] font-semibold text-white/80">
            <span>9:41</span>
            <span className="tracking-widest">5G</span>
          </div>

          <div
            className="px-4 pt-5 pb-4 transition-colors duration-500"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, rgba(12,16,24,0) 100%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-2xl text-base font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
                style={{ background: color }}
              >
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold tracking-[-0.03em] text-white">
                  {academy}
                </p>
                <p className="truncate text-[11px] text-white/75">
                  {tags.length
                    ? tags.map((tag) => tag.label).join(" · ")
                    : "Add a course to begin"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-white/55 backdrop-blur-xl">
              Search your classroom
            </div>
          </div>

          <div className="px-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Continue
              </p>
              <span className="text-[10px] font-medium" style={{ color: soft }}>
                Anti-piracy on
              </span>
            </div>
            {tags.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 px-3 py-6 text-center text-xs text-white/45">
                Choose course tags to fill this library.
              </div>
            ) : (
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {tags.map((tag) => (
                  <article
                    key={tag.id}
                    className="w-[132px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div
                      className="mb-3 h-14 rounded-xl"
                      style={{
                        background: `linear-gradient(145deg, ${color}, #0c1018 80%)`,
                      }}
                    />
                    <p className="text-xs font-semibold text-white">{tag.label}</p>
                    <p className="mt-0.5 text-[10px] text-white/50">{tag.meta}</p>
                    <p className="mt-2 text-[10px]" style={{ color: soft }}>
                      {tag.detail}
                    </p>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Live today
                  </p>
                  <p className="mt-1 text-sm font-semibold">Evening batch</p>
                  <p className="text-[11px] text-white/50">7:30 PM · attendance on</p>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
                  style={{ background: color }}
                >
                  Join
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0c1018]/90 px-4 py-3 backdrop-blur-xl">
            <div className="grid grid-cols-4 text-center text-[10px] text-white/40">
              {["Home", "Learn", "Tests", "Inbox"].map((item, index) => (
                <span
                  key={item}
                  className={index === 0 ? "font-semibold" : undefined}
                  style={index === 0 ? { color: soft } : undefined}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
