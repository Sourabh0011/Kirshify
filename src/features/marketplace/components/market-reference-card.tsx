import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";

import { AreaChart } from "@/components/ui/area-chart";
import { cn, formatINR } from "@/lib/utils";
import type { MandiPrice, PricePoint } from "@/types/market";

export function MarketReferenceCard({ mandi, trend, listingPrice }: { mandi: MandiPrice; trend: PricePoint[]; listingPrice: number }) {
  const first = trend[0]?.price ?? mandi.modalPrice;
  const weekChange = ((mandi.modalPrice - first) / first) * 100;
  const vsListing = ((listingPrice - mandi.modalPrice) / mandi.modalPrice) * 100;
  const up = weekChange >= 0;

  return (
    <section aria-label="Market reference price" className="flex flex-col gap-3 rounded-2xl border border-line-soft p-5">
      <h3 className="font-extrabold">Market reference price</h3>
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold">
          {formatINR(mandi.modalPrice)}
          <span className="text-sm font-semibold text-muted"> /qtl</span>
        </span>
        <span className="text-[13px] text-muted">APMC modal price · {mandi.market} mandi</span>
      </div>
      <AreaChart data={trend} height={90} compact ariaLabel={`${mandi.cropName} price over the last 7 days`} />
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] font-bold">
        <span className={cn("inline-flex items-center gap-1", up ? "text-forest" : "text-danger")}>
          {up ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
          {Math.abs(weekChange).toFixed(1)}% vs last week
        </span>
        <Link href={`/mandi-prices?trend=${mandi.cropSlug}`} className="text-forest hover:underline">
          Full trend
        </Link>
      </div>
      <p className="rounded-xl bg-mist px-3 py-2 text-[13px] text-ink-soft">
        This listing is{" "}
        <b>
          {Math.abs(vsListing).toFixed(1)}% {vsListing >= 0 ? "above" : "below"}
        </b>{" "}
        today&apos;s mandi rate.
      </p>
    </section>
  );
}
