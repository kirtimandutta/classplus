"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { BRANDS, COURSE_TAGS, type BrandId, type CourseId } from "@/lib/content";

type CreatorContextValue = {
  name: string;
  setName: (name: string) => void;
  brandId: BrandId;
  setBrandId: (id: BrandId) => void;
  brand: (typeof BRANDS)[number];
  tagIds: CourseId[];
  toggleTag: (id: CourseId) => void;
  tags: (typeof COURSE_TAGS)[number][];
  platform: "ios" | "android";
  setPlatform: (platform: "ios" | "android") => void;
};

const CreatorContext = createContext<CreatorContextValue | null>(null);

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Aanya Mehta");
  const [brandId, setBrandId] = useState<BrandId>("indigo");
  const [tagIds, setTagIds] = useState<CourseId[]>(["upsc", "coding"]);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  const value = useMemo<CreatorContextValue>(() => {
    const brand = BRANDS.find((item) => item.id === brandId) ?? BRANDS[0];
    const tags = COURSE_TAGS.filter((tag) => tagIds.includes(tag.id));
    return {
      name,
      setName,
      brandId,
      setBrandId,
      brand,
      tagIds,
      toggleTag: (id) => {
        setTagIds((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        );
      },
      tags,
      platform,
      setPlatform,
    };
  }, [brandId, name, platform, tagIds]);

  return (
    <CreatorContext.Provider value={value}>{children}</CreatorContext.Provider>
  );
}

export function useCreator() {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error("useCreator must be used within CreatorProvider");
  }
  return context;
}
