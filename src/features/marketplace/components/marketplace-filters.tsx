"use client";

import { BadgeCheck, ChevronDown, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { cropCategories } from "@/config/crops";
import { cn } from "@/lib/utils";
import type { ListingFilters } from "@/types/listing";

import { distanceOptions, marketplaceHref, priceRangeValue, priceRanges, sortOptions } from "../query";

function FilterSelect({ id, label, className, ...props }: React.ComponentProps<"select"> & { id: string; label: string }) {
  return (
    <span className={cn("relative shrink-0", className)}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="min-h-11 appearance-none rounded-xl border border-line bg-white pr-9 pl-3.5 text-sm font-semibold text-ink focus:border-forest focus:outline-none"
        {...props}
      />
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </span>
  );
}

interface MarketplaceFiltersProps {
  filters: ListingFilters;
  locations: string[];
  total: number;
}

export function MarketplaceFilters({ filters, locations, total }: MarketplaceFiltersProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function update(overrides: Parameters<typeof marketplaceHref>[1]) {
    startTransition(() => router.push(marketplaceHref(filters, overrides), { scroll: false }));
  }

  function setPriceRange(value: string) {
    if (!value) return update({ minPrice: undefined, maxPrice: undefined });
    const [min, max] = value.split("-");
    update({ minPrice: min ? Number(min) : undefined, maxPrice: max ? Number(max) : undefined });
  }

  const hasFilters = Boolean(
    filters.q || filters.category || filters.location || filters.maxDistanceKm || filters.minPrice !== undefined || filters.maxPrice || filters.verifiedOnly || filters.sellerType,
  );

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-line-soft bg-white p-3 sm:p-4">
      <div className="scrollbar-none -mx-3 flex items-center gap-2 overflow-x-auto px-3 sm:-mx-4 sm:flex-wrap sm:overflow-visible sm:px-4">
        <FilterSelect id="f-category" label="Crop category" value={filters.category ?? ""} onChange={(e) => update({ category: e.target.value || undefined })}>
          <option value="">All crops</option>
          {cropCategories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </FilterSelect>
        <FilterSelect id="f-location" label="Location" value={filters.location ?? ""} onChange={(e) => update({ location: e.target.value || undefined })}>
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </FilterSelect>
        <FilterSelect id="f-distance" label="Distance" value={filters.maxDistanceKm?.toString() ?? ""} onChange={(e) => update({ maxDistanceKm: e.target.value || undefined })}>
          {distanceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </FilterSelect>
        <FilterSelect id="f-price" label="Price range" value={priceRangeValue(filters)} onChange={(e) => setPriceRange(e.target.value)}>
          {priceRanges.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </FilterSelect>
        <FilterSelect id="f-seller" label="Seller type" value={filters.sellerType ?? ""} onChange={(e) => update({ sellerType: e.target.value || undefined })}>
          <option value="">Farmers &amp; FPOs</option>
          <option value="farmer">Direct from farmer</option>
          <option value="fpo">FPOs only</option>
        </FilterSelect>

        <button
          type="button"
          aria-pressed={!!filters.verifiedOnly}
          onClick={() => update({ verifiedOnly: !filters.verifiedOnly })}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-sm font-bold transition-colors",
            filters.verifiedOnly ? "border-forest bg-leaf-soft text-forest" : "border-line text-ink-soft hover:border-forest",
          )}
        >
          <BadgeCheck className="size-[18px]" />
          Verified only
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span aria-hidden="true" className="text-sm font-semibold whitespace-nowrap text-muted">Sort by</span>
          <FilterSelect id="f-sort" label="Sort by" value={filters.sort ?? "latest"} onChange={(e) => update({ sort: e.target.value })}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </FilterSelect>
        </div>
      </div>

      <div className="flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 px-1 text-sm" aria-live="polite">
        <span className="font-bold">
          {total} {total === 1 ? "listing" : "listings"}
          {filters.q && (
            <>
              {" "}for “<span className="text-forest">{filters.q}</span>”
            </>
          )}
        </span>
        {pending && (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <LoaderCircle className="size-4 animate-spin" /> Updating…
          </span>
        )}
        {hasFilters && (
          <button type="button" onClick={() => startTransition(() => router.push("/marketplace", { scroll: false }))} className="inline-flex min-h-8 items-center gap-1 font-bold text-forest hover:underline">
            <X className="size-4" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
