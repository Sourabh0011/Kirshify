"use client";

import { useState } from "react";

import { AreaChart } from "@/components/ui/area-chart";
import { cn } from "@/lib/utils";
import type { PricePoint, TrendRange } from "@/types/market";

const RANGES: { value: TrendRange; label: string }[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "3m", label: "3 Months" },
  { value: "1y", label: "1 Year" },
];

export function PriceTrendCard({ cropName, trends }: { cropName: string; trends: Record<TrendRange, PricePoint[]> }) {
  const [range, setRange] = useState<TrendRange>("7d");

  return (
    <section aria-labelledby="trend-title" className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
      <h2 id="trend-title" className="font-extrabold">
        Price trend · {cropName}
      </h2>
      <div role="tablist" aria-label="Time range" className="flex gap-1 rounded-xl bg-mist p-1">
        {RANGES.map((r) => (
          <button
            key={r.value}
            type="button"
            role="tab"
            aria-selected={range === r.value}
            onClick={() => setRange(r.value)}
            className={cn(
              "min-h-10 flex-1 rounded-lg text-[13px] font-bold transition-colors",
              range === r.value ? "bg-white text-forest shadow-sm" : "text-muted hover:text-ink",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
      <AreaChart data={trends[range]} height={200} ariaLabel={`${cropName} modal price, ${RANGES.find((r) => r.value === range)?.label}`} />
    </section>
  );
}
