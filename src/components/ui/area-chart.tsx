"use client";

import { useId, useMemo, useState } from "react";

import { cn, formatDate, formatINR, formatNumber } from "@/lib/utils";
import type { PricePoint } from "@/types/market";

interface AreaChartProps {
  data: PricePoint[];
  height?: number;
  /** Hide axes and labels for sparkline use. */
  compact?: boolean;
  unit?: string;
  showLatestBadge?: boolean;
  className?: string;
  ariaLabel: string;
}

/**
 * Lightweight responsive area chart (no chart library).
 * Shapes are drawn in a 0–100 viewBox; labels and markers are HTML so they never stretch.
 */
export function AreaChart({ data, height = 220, compact = false, unit = "/qtl", showLatestBadge = true, className, ariaLabel }: AreaChartProps) {
  const gradientId = useId();
  const [active, setActive] = useState<number | null>(null);

  const chart = useMemo(() => {
    if (data.length === 0) return null;
    const values = data.map((d) => d.price);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = max === min ? max * 0.05 : (max - min) * 0.18;
    const lo = min - pad;
    const hi = max + pad;
    const points = data.map((d, i) => ({
      x: data.length === 1 ? 50 : (i / (data.length - 1)) * 100,
      y: (1 - (d.price - lo) / (hi - lo)) * 100,
      ...d,
    }));
    const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    const area = `${line} L100,100 L0,100 Z`;
    const ticks = Array.from({ length: 4 }, (_, i) => {
      const value = hi - ((hi - lo) * (i + 0.5)) / 4;
      return { value, y: ((i + 0.5) / 4) * 100 };
    });
    const labelEvery = Math.max(1, Math.ceil(points.length / 6));
    const xLabels = points.filter((_, i) => i % labelEvery === 0 || i === points.length - 1);
    return { points, line, area, ticks, xLabels };
  }, [data]);

  if (!chart) {
    return <div className={cn("grid place-items-center text-sm text-muted", className)} style={{ height }}>No price history yet</div>;
  }

  const last = chart.points[chart.points.length - 1];
  const focus = active !== null ? chart.points[active] : null;

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setActive(Math.round(ratio * (chart!.points.length - 1)));
  }

  return (
    <figure className={cn("relative", !compact && "pl-12", className)} aria-label={ariaLabel}>
      <div
        className="relative touch-none"
        style={{ height }}
        onPointerMove={compact ? undefined : handlePointer}
        onPointerLeave={() => setActive(null)}
      >
        {!compact &&
          chart.ticks.map((t) => (
            <div key={t.y} className="absolute inset-x-0 border-t border-dashed border-line-soft" style={{ top: `${t.y}%` }}>
              <span className="absolute -left-12 -translate-y-1/2 text-[11px] font-semibold text-subtle">{formatNumber(t.value)}</span>
            </div>
          ))}

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0F4D36" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0F4D36" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={chart.area} fill={`url(#${gradientId})`} />
          <path d={chart.line} fill="none" stroke="#0F4D36" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

        {/* Latest point marker */}
        <span
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-forest shadow"
          style={{ left: `${last.x}%`, top: `${last.y}%` }}
        />
        {showLatestBadge && !compact && !focus && (
          <span
            className="absolute -translate-x-full -translate-y-[140%] rounded-lg bg-forest px-2.5 py-1 text-xs font-extrabold whitespace-nowrap text-white"
            style={{ left: `${last.x}%`, top: `${last.y}%` }}
          >
            {formatINR(last.price)}
            {unit}
          </span>
        )}

        {focus && (
          <>
            <span className="absolute inset-y-0 w-px bg-forest/30" style={{ left: `${focus.x}%` }} />
            <span
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-forest"
              style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
            />
            <span
              className={cn(
                "pointer-events-none absolute -translate-y-[130%] rounded-lg bg-ink px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg",
                focus.x > 70 ? "-translate-x-full" : focus.x < 30 ? "" : "-translate-x-1/2",
              )}
              style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
            >
              <span className="block font-extrabold">
                {formatINR(focus.price)}
                {unit}
              </span>
              <span className="text-on-dark-muted">{formatDate(focus.date, { day: "numeric", month: "short" })}</span>
            </span>
          </>
        )}
      </div>

      {!compact && (
        <div className="relative mt-2 h-4">
          {chart.xLabels.map((p) => (
            <span
              key={p.date}
              className="absolute -translate-x-1/2 text-[11px] font-semibold whitespace-nowrap text-subtle first:translate-x-0 last:-translate-x-full"
              style={{ left: `${p.x}%` }}
            >
              {formatDate(p.date, { day: "numeric", month: "short" })}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}
