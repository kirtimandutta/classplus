"use client";

import { useMemo, useState } from "react";
import { InrTicker } from "@/components/inr-ticker";
import { SectionHeading } from "@/components/section-heading";
import { formatFollowers, formatINR } from "@/lib/format";

const RATES = [0.01, 0.02, 0.03] as const;

function followersFromSlider(position: number) {
  const min = Math.log(1000);
  const max = Math.log(1_000_000);
  const raw = Math.exp(min + (position / 1000) * (max - min));
  if (raw < 10_000) return Math.round(raw / 100) * 100;
  if (raw < 100_000) return Math.round(raw / 500) * 500;
  return Math.min(1_000_000, Math.round(raw / 5_000) * 5_000);
}

function priceFromSlider(position: number) {
  const raw = 499 + (position / 1000) * (25_000 - 499);
  if (raw < 550) return 499;
  return Math.min(25_000, Math.round(raw / 100) * 100);
}

export function EarningsCalculator() {
  const [followerT, setFollowerT] = useState(233);
  const [priceT, setPriceT] = useState(61);
  const [rate, setRate] = useState<(typeof RATES)[number]>(0.02);

  const followers = followersFromSlider(followerT);
  const price = priceFromSlider(priceT);

  const model = useMemo(() => {
    const monthly = followers * rate * price;
    return {
      monthly,
      low: followers * 0.01 * price,
      high: followers * 0.03 * price,
      annual: monthly * 12,
    };
  }, [followers, price, rate]);

  return (
    <section id="earnings" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            eyebrow="Creator earnings calculator"
            title="A planning number, not a promise."
            body="Move the audience and the course price. Monthly revenue is followers times a 1% to 3% purchase rate times price. It assumes that slice of your current audience buys once this month."
          />

          <div className="mt-8 space-y-7 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-6">
            <SliderField
              id="followers"
              label="Number of Social Followers"
              display={formatFollowers(followers)}
              min={0}
              max={1000}
              value={followerT}
              minLabel="1k"
              maxLabel="1M"
              onChange={setFollowerT}
              valueText={`${formatFollowers(followers)} followers`}
            />
            <SliderField
              id="price"
              label="Course Price"
              display={formatINR(price)}
              min={0}
              max={1000}
              value={priceT}
              minLabel="₹499"
              maxLabel="₹25,000"
              onChange={setPriceT}
              valueText={formatINR(price)}
            />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Conversion rate
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {RATES.map((item) => {
                  const on = item === rate;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setRate(item)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors ${
                        on
                          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-400"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                      }`}
                    >
                      {Math.round(item * 100)}%
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Estimated this month
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
            <InrTicker value={model.monthly} />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Band at 1%–3%: {formatINR(model.low)} to {formatINR(model.high)}.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <Row label="Audience" value={formatFollowers(followers)} />
            <Row label="Buyers this month" value={formatFollowers(Math.round(followers * rate))} />
            <Row label="Course price" value={formatINR(price)} />
            <Row label="If the month repeated" value={formatINR(model.annual)} />
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-white/40">
            Illustrative model for planning a demo conversation. Results depend on offer, trust, and how often you sell.
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  id,
  label,
  display,
  min,
  max,
  value,
  minLabel,
  maxLabel,
  valueText,
  onChange,
}: {
  id: string;
  label: string;
  display: string;
  min: number;
  max: number;
  value: number;
  minLabel: string;
  maxLabel: string;
  valueText: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-white/80">
          {label}
        </label>
        <span className="text-sm font-semibold tabular-nums text-white">{display}</span>
      </div>
      <input
        id={id}
        className="revenue-slider mt-4"
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={valueText}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-2 flex justify-between text-[11px] text-white/40">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <dt className="text-white/50">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}
