"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/content";
import { useUi } from "@/components/ui-provider";
import { fieldClass, primaryBtn } from "@/lib/styles";

type Errors = {
  name?: string;
  phone?: string;
  category?: string;
};

export function DemoModal() {
  const { demoOpen, closeDemo, plan } = useUi();
  if (!demoOpen) return null;
  return <DemoDialog plan={plan} onClose={closeDemo} />;
}

function DemoDialog({
  plan,
  onClose,
}: {
  plan: string | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Add the name we should ask for.";
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(digits)) {
      next.phone = "Use a 10-digit Indian mobile number.";
    }
    if (!category) next.category = "Pick the category you teach.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const entry = {
      name: name.trim(),
      phone: digits,
      category,
      plan,
      at: new Date().toISOString(),
    };
    const key = "cfc-demo-requests";
    let existing: unknown[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown;
      if (Array.isArray(parsed)) existing = parsed;
    } catch {
      existing = [];
    }
    localStorage.setItem(key, JSON.stringify([entry, ...existing].slice(0, 20)));
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close demo form"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1018]/90 p-6 shadow-[0_40px_120px_-40px_rgba(37,99,235,0.8)] backdrop-blur-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Free 1-on-1
            </p>
            <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Book a growth demo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Name, phone, and the subject you teach. Twenty minutes on your app, fees, and WhatsApp flow.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {plan ? (
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/75">
            Plan interest · {plan}
          </p>
        ) : null}

        {saved ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <p className="text-lg font-semibold text-emerald-400">You are on the list.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              A creator partner uses this number to lock a 20-minute demo. This preview keeps the request in your browser until a CRM is connected.
            </p>
            <button type="button" className={`${primaryBtn} mt-5`} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
            <label className="block">
              <span className="text-sm text-white/70">Name</span>
              <input
                className={`${fieldClass} mt-1.5`}
                value={name}
                autoComplete="name"
                onChange={(event) => setName(event.target.value)}
              />
              {errors.name ? (
                <span className="mt-1 block text-xs text-rose-300">{errors.name}</span>
              ) : null}
            </label>
            <label className="block">
              <span className="text-sm text-white/70">Phone number</span>
              <input
                className={`${fieldClass} mt-1.5`}
                value={phone}
                inputMode="tel"
                autoComplete="tel"
                placeholder="98XXXXXXXX"
                onChange={(event) => setPhone(event.target.value)}
              />
              {errors.phone ? (
                <span className="mt-1 block text-xs text-rose-300">{errors.phone}</span>
              ) : null}
            </label>
            <fieldset>
              <legend className="text-sm text-white/70">Category</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((item) => {
                  const on = category === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setCategory(item)}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        on
                          ? "border-transparent bg-cobalt text-white"
                          : "border-white/10 bg-white/[0.04] text-white/75"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              {errors.category ? (
                <span className="mt-2 block text-xs text-rose-300">{errors.category}</span>
              ) : null}
            </fieldset>
            <button type="submit" className={`${primaryBtn} w-full`}>
              Book Free 1-on-1 Growth Demo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
