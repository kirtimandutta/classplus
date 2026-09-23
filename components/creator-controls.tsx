"use client";

import { BRANDS, COURSE_TAGS, type CourseId } from "@/lib/content";
import { useCreator } from "@/components/creator-context";

export function CreatorControls({ compact = false }: { compact?: boolean }) {
  const { name, setName, brandId, setBrandId, tagIds, toggleTag, platform, setPlatform } =
    useCreator();

  return (
    <div className={compact ? "space-y-5" : "space-y-7"}>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Creator name
        </span>
        <input
          value={name}
          maxLength={28}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/25"
          placeholder="Your academy name"
        />
      </label>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Store frame
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["ios", "android"] as const).map((item) => {
            const active = platform === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setPlatform(item)}
                className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-cyan-300/40 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.06]"
                }`}
              >
                {item === "ios" ? "iOS" : "Android"}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Brand color
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {BRANDS.map((brand) => {
            const active = brand.id === brandId;
            return (
              <button
                key={brand.id}
                type="button"
                aria-pressed={active}
                aria-label={brand.label}
                onClick={() => setBrandId(brand.id)}
                className={`grid h-11 w-11 place-items-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                  active ? "ring-2 ring-white ring-offset-2 ring-offset-[#06080F]" : ""
                }`}
                style={{ background: brand.hex }}
              >
                <span className="sr-only">{brand.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-white/55">
          {BRANDS.find((brand) => brand.id === brandId)?.label}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Course tags
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {COURSE_TAGS.map((tag) => {
            const active = tagIds.includes(tag.id as CourseId);
            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTag(tag.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-transparent text-white"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                }`}
                style={
                  active
                    ? {
                        background: BRANDS.find((brand) => brand.id === brandId)?.hex,
                      }
                    : undefined
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
