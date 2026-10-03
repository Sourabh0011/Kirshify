"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { CropArt } from "@/components/ui/crop-art";
import { cn } from "@/lib/utils";

const GENERATED_VIEWS = 5;

export function ListingGallery({ cropSlug, cropName, images }: { cropSlug: string; cropName: string; images: string[] }) {
  const count = images.length || GENERATED_VIEWS;
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className="flex flex-col gap-3" aria-roledescription="carousel" aria-label={`${cropName} photos`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage">
        <CropArt cropSlug={cropSlug} image={images[index]} variant={index} alt={`${cropName}, photo ${index + 1} of ${count}`} priority sizes="(min-width: 1024px) 40vw, 100vw" />
        <span className="absolute top-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-white">
          {index + 1}/{count}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line hover:border-forest">
          <ChevronLeft className="size-4" />
        </button>
        <div className="scrollbar-none flex flex-1 gap-2 overflow-x-auto">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:w-[72px]",
                i === index ? "border-forest" : "border-transparent opacity-80 hover:opacity-100",
              )}
            >
              <CropArt cropSlug={cropSlug} image={images[i]} variant={i} alt="" sizes="72px" />
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next photo" onClick={() => go(1)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line hover:border-forest">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
