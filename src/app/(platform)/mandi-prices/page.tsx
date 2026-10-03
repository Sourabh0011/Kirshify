import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { CropArt } from "@/components/ui/crop-art";
import { MandiFilters } from "@/features/mandi/components/mandi-filters";
import { MandiPriceTable } from "@/features/mandi/components/mandi-price-table";
import { PriceTrendCard } from "@/features/mandi/components/price-trend-card";
import { firstParam, formatDate, formatINR } from "@/lib/utils";
import { DEFAULT_MARKET, getAllTrends, getMandiPrices, getMarkets, getNearbyMandis } from "@/server/services/market.service";

export const metadata: Metadata = {
  title: "Mandi prices",
  description: "Live APMC mandi rates from Agmarknet. Compare markets and track price trends before you sell.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function MandiPricesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const markets = await getMarkets();
  const marketParam = firstParam(sp.market);
  const market = markets.some((m) => m.name === marketParam) ? marketParam! : DEFAULT_MARKET;

  const allPrices = await getMandiPrices({ market });
  const cropParam = firstParam(sp.crop);
  const crop = allPrices.some((p) => p.cropSlug === cropParam) ? cropParam : undefined;
  const prices = crop ? allPrices.filter((p) => p.cropSlug === crop) : allPrices;

  const trendParam = firstParam(sp.trend);
  const trendCrop = allPrices.find((p) => p.cropSlug === (trendParam ?? crop)) ?? allPrices[0];
  const [trends, nearby] = await Promise.all([getAllTrends(trendCrop.cropSlug, market), getNearbyMandis(trendCrop.cropSlug)]);

  const hrefFor = (slug: string) => {
    const params = new URLSearchParams();
    if (market !== DEFAULT_MARKET) params.set("market", market);
    if (crop) params.set("crop", crop);
    params.set("trend", slug);
    return `/mandi-prices?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-extrabold tracking-tight">Mandi prices</h1>
          <p className="text-muted">Live mandi rates from Agmarknet. Compare and make better decisions.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted">
          <Clock className="size-4" />
          Last updated {formatDate(trendCrop.updatedAt, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}
        </span>
      </header>

      <MandiFilters markets={markets.map((m) => m.name)} crops={allPrices.map((p) => ({ slug: p.cropSlug, name: p.cropName }))} market={market} crop={crop} />

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <MandiPriceTable prices={prices} selected={trendCrop.cropSlug} hrefFor={hrefFor} />
        <div className="flex flex-col gap-5">
          <PriceTrendCard cropName={trendCrop.cropName} trends={trends} />

          <section aria-labelledby="nearby-title" className="flex flex-col gap-3 rounded-3xl border border-line-soft bg-white p-5">
            <h2 id="nearby-title" className="font-extrabold">
              Nearby mandis · {trendCrop.cropName}
            </h2>
            <table className="w-full text-left text-[14.5px]">
              <thead className="text-xs font-extrabold tracking-wide text-muted uppercase">
                <tr className="border-b border-line-soft">
                  <th scope="col" className="py-2.5">Mandi</th>
                  <th scope="col" className="py-2.5 text-right">Distance</th>
                  <th scope="col" className="py-2.5 text-right">Modal (₹/qtl)</th>
                </tr>
              </thead>
              <tbody>
                {nearby.map((m) => (
                  <tr key={m.name} className="border-b border-line-soft last:border-0">
                    <th scope="row" className="py-3 font-bold">{m.name}</th>
                    <td className="py-3 text-right text-muted tabular-nums">{m.distanceKm} km</td>
                    <td className="py-3 text-right font-extrabold tabular-nums">{formatINR(m.avgPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-3xl bg-forest text-white">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-2/5 opacity-60 sm:block">
          <CropArt cropSlug={trendCrop.cropSlug} alt="" variant={7} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0F4D36_55%,rgb(15_77_54/0.2))] sm:block" />
        <div className="relative flex flex-col gap-3 p-6 sm:max-w-[60%] sm:p-8">
          <h2 className="text-xl font-extrabold">Compare with buyer offers</h2>
          <p className="text-on-dark">
            See how today&apos;s mandi price for {trendCrop.cropName.toLowerCase()} compares with direct buyer offers on Kirshify.
          </p>
          <Link href={`/marketplace?crop=${trendCrop.cropSlug}`} className={buttonClasses({ variant: "accent", className: "mt-1 self-start" })}>
            View offers <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
