"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLenis } from "@/lib/lenis-store";

type UiContextValue = {
  demoOpen: boolean;
  previewOpen: boolean;
  plan: string | null;
  openDemo: (plan?: string) => void;
  openPreview: () => void;
  closeDemo: () => void;
  closePreview: () => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  const value = useMemo<UiContextValue>(
    () => ({
      demoOpen,
      previewOpen,
      plan,
      openDemo: (nextPlan) => {
        setPlan(nextPlan ?? null);
        setPreviewOpen(false);
        setDemoOpen(true);
      },
      openPreview: () => {
        setDemoOpen(false);
        setPreviewOpen(true);
      },
      closeDemo: () => setDemoOpen(false),
      closePreview: () => setPreviewOpen(false),
    }),
    [demoOpen, plan, previewOpen],
  );

  useEffect(() => {
    if (!demoOpen && !previewOpen) return;
    getLenis()?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [demoOpen, previewOpen]);

  return (
    <UiContext.Provider value={value}>{children}</UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within UiProvider");
  }
  return context;
}
