"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import {
  BILLING_YEARS,
  COMPARE_ROWS,
  PLANS,
  priceFor,
  type BillingYears,
} from "@/lib/content";
import { InrTicker } from "@/components/inr-ticker";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionHeading } from "@/components/section-heading";
import { useUi } from "@/components/ui-provider";
import { formatINR } from "@/lib/format";
import { ghostBtn, primaryBtn } from "@/lib/styles";

export function Pricing() {
  const [years, setYears] = useState<BillingYears>(1);
  const { openDemo } = useUi();

  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Transparent pricing"
          title="Starter, Growth, and Pro."
          body="Pre-sales launch rates for Classplus for Creators. Longer terms lower the yearly figure. Final commercials are confirmed on the demo."
        />
        <div
          className="inline-flex w-full rounded-full border border-white/10 bg-white/[0.04] p-1 sm:w-auto"
          role="group"
          aria-label="Billing term"
        >
          {BILLING_YEARS.map((option) => {
            const on = option === years;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={on}
                onClick={() => setYears(option)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                  on ? "bg-white text-obsidian" : "text-white/65 hover:text-white"
                }`}
              >
                {option} {option === 1 ? "Year" : "Years"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const priced = priceFor(plan.yearly, years);
          const popular = "popular" in plan && plan.popular;
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 backdrop-blur-2xl ${
                popular
                  ? "border-cyan-300/40 bg-white/[0.07] shadow-[0_30px_80px_-36px_rgba(37,99,235,0.85)] lg:-translate-y-3"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {popular ? (
                <span className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(90deg,#2563EB,#06B6D4)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Most chosen
                </span>
              ) : null}
              <h3 className="text-lg font-semibold tracking-[-0.03em]">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-white/60">
                {plan.audience}
              </p>
              <p className="mt-6 text-4xl font-semibold tracking-[-0.045em]">
                <InrTicker value={priced.perYear} />
              </p>
              <p className="mt-1 text-sm text-white/50">per year</p>
              <p className="mt-2 text-sm text-white/70">
                {formatINR(priced.total)} billed for {years}{" "}
                {years === 1 ? "year" : "years"}
                {priced.discount > 0
                  ? ` · save ${Math.round(priced.discount * 100)}%`
                  : ""}
              </p>
              <p className="text-xs text-white/40">
                About {formatINR(priced.monthly)} / month equivalent. GST extra.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
                    )}
                    <span className={feature.included ? "text-white/85" : "text-white/35"}>
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
              <MagneticButton
                className={`${popular ? primaryBtn : ghostBtn} mt-8 w-full`}
                onClick={() => openDemo(plan.name)}
              >
                Book {plan.name}
              </MagneticButton>
            </article>
          );
        })}
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="px-5 pt-5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Feature checks called out on every plan
          </caption>
          <thead>
            <tr className="text-white/50">
              <th scope="col" className="px-5 py-4 font-medium">
                Capability
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Starter
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Growth
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <th scope="row" className="px-5 py-4 font-medium text-white">
                  {row.label}
                </th>
                <Cell on={row.starter} />
                <Cell on={row.growth} />
                <Cell on={row.pro} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <td className="px-5 py-4">
      {on ? (
        <Check className="h-4 w-4 text-emerald-400" aria-label="Included" />
      ) : (
        <Minus className="h-4 w-4 text-white/25" aria-label="Not included" />
      )}
    </td>
  );
}
