import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";

import { cn, formatNumber } from "@/lib/utils";
import type { MandiPrice } from "@/types/market";

interface MandiPriceTableProps {
  prices: MandiPrice[];
  selected: string;
  hrefFor: (cropSlug: string) => string;
}

export function MandiPriceTable({ prices, selected, hrefFor }: MandiPriceTableProps) {
  return (
    <section aria-labelledby="today-title" className="flex flex-col gap-3 rounded-3xl border border-line-soft bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="today-title" className="font-extrabold">
          Today&apos;s mandi prices
        </h2>
        <span className="text-[13px] text-muted">Tap a crop to see its trend</span>
      </div>
      <div className="relative -mx-4 overflow-x-auto sm:mx-0">
        <table className="w-full min-w-[520px] text-left text-[14.5px]">
          <caption className="sr-only">APMC prices in rupees per quintal</caption>
          <thead className="text-xs font-extrabold tracking-wide text-muted uppercase">
            <tr className="border-b border-line-soft">
              <th scope="col" className="px-4 py-3">Crop</th>
              <th scope="col" className="px-3 py-3 text-right">Min (₹/qtl)</th>
              <th scope="col" className="px-3 py-3 text-right">Max (₹/qtl)</th>
              <th scope="col" className="px-3 py-3 text-right">Modal (₹/qtl)</th>
              <th scope="col" className="px-4 py-3 text-right">Change</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => {
              const up = p.changePct >= 0;
              const active = p.cropSlug === selected;
              return (
                <tr key={p.cropSlug} className={cn("border-b border-line-soft last:border-0", active && "bg-sage")}>
                  <th scope="row" className="px-4 py-3.5 font-bold">
                    <Link href={hrefFor(p.cropSlug)} scroll={false} aria-current={active ? "true" : undefined} className="hover:text-forest hover:underline">
                      {p.cropName}
                    </Link>
                  </th>
                  <td className="px-3 py-3.5 text-right tabular-nums">{formatNumber(p.minPrice)}</td>
                  <td className="px-3 py-3.5 text-right tabular-nums">{formatNumber(p.maxPrice)}</td>
                  <td className="px-3 py-3.5 text-right font-extrabold tabular-nums">{formatNumber(p.modalPrice)}</td>
                  <td className={cn("px-4 py-3.5 text-right font-extrabold tabular-nums", up ? "text-forest" : "text-danger")}>
                    <span className="inline-flex items-center gap-0.5">
                      {up ? <ArrowUp className="size-3.5" aria-label="Up" /> : <ArrowDown className="size-3.5" aria-label="Down" />}
                      {Math.abs(p.changePct).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
