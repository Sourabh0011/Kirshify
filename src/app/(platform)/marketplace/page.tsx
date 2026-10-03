import { SearchX } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { CategoryTiles } from "@/features/marketplace/components/category-tiles";
import { ListingCard } from "@/features/marketplace/components/listing-card";
import { MarketplaceBanner } from "@/features/marketplace/components/marketplace-banner";
import { MarketplaceFilters } from "@/features/marketplace/components/marketplace-filters";
import { Pagination } from "@/features/marketplace/components/pagination";
import { parseListingFilters } from "@/lib/validators/listing";
import { firstParam } from "@/lib/utils";
import { getListings } from "@/server/services/listing.service";
import { getMarkets } from "@/server/services/market.service";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Buy crops directly from verified farmers and FPOs at transparent, mandi-linked prices.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function MarketplacePage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const filters = parseListingFilters(Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, firstParam(v)])));
  const [result, markets] = await Promise.all([getListings(filters), getMarkets()]);

  return (
    <div className="flex flex-col gap-5">
      <MarketplaceBanner defaultQuery={filters.q} />
      <MarketplaceFilters filters={filters} locations={markets.map((m) => m.name)} total={result.total} />
      <CategoryTiles filters={filters} />

      {result.items.length > 0 ? (
        <section aria-label="Listings" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {result.items.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} priority={i < 4} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-sage text-forest">
            <SearchX className="size-7" />
          </span>
          <h2 className="text-xl font-extrabold">No crops match these filters</h2>
          <p className="max-w-sm text-muted">Try a wider distance or a different category — new listings are added every day.</p>
          <ButtonLink href="/marketplace" variant="outline">
            Clear all filters
          </ButtonLink>
        </div>
      )}

      <Pagination filters={filters} page={result.page} totalPages={result.totalPages} />
    </div>
  );
}
