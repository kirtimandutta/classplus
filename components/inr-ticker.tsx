"use client";

import { useEffect, useState } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { formatINR } from "@/lib/format";

export function InrTicker({ value }: { value: number }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 0.7,
  });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useMotionValueEvent(spring, "change", (next) => {
    setDisplay(Math.round(next));
  });

  return <span className="tabular-nums">{formatINR(display)}</span>;
}
