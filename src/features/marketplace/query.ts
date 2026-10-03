import type { ListingFilters } from "@/types/listing";

/** Filter keys that are reflected in the marketplace URL. */
const KEYS = ["q", "category", "crop", "location", "maxDistanceKm", "minPrice", "maxPrice", "verifiedOnly", "sellerType", "sort", "page"] as const;

/**
 * Builds a marketplace URL from the current filters plus overrides.
 * Any change other than `page` resets pagination to the first page.
 */
export function marketplaceHref(current: ListingFilters, overrides: Partial<Record<keyof ListingFilters, string | number | boolean | undefined>> = {}) {
  const next: Record<string, unknown> = { ...current, ...overrides };
  if (!("page" in overrides)) delete next.page;

  const params = new URLSearchParams();
  for (const key of KEYS) {
    const value = next[key];
    if (value === undefined || value === null || value === "" || value === false) continue;
    if (key === "sort" && value === "latest") continue;
    if (key === "page" && Number(value) <= 1) continue;
    params.set(key, value === true ? "1" : String(value));
  }
  const qs = params.toString();
  return qs ? `/marketplace?${qs}` : "/marketplace";
}

export const priceRanges = [
  { value: "", label: "Any price" },
  { value: "0-2000", label: "Under ₹2,000/qtl" },
  { value: "2000-5000", label: "₹2,000 – ₹5,000/qtl" },
  { value: "5000-", label: "Above ₹5,000/qtl" },
];

export function priceRangeValue(f: ListingFilters): string {
  if (f.minPrice === undefined && f.maxPrice === undefined) return "";
  return `${f.minPrice ?? 0}-${f.maxPrice ?? ""}`;
}

export const distanceOptions = [
  { value: "", label: "Any distance" },
  { value: "50", label: "Within 50 km" },
  { value: "100", label: "Within 100 km" },
  { value: "150", label: "Within 150 km" },
  { value: "250", label: "Within 250 km" },
];

export const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "distance", label: "Nearest first" },
  { value: "quantity", label: "Largest quantity" },
];
