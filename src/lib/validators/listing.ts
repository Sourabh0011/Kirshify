import { z } from "zod";
import type { ListingFilters } from "@/types/listing";

export const CROP_CATEGORIES = ["cereals", "pulses", "oilseeds", "vegetables", "fruits", "spices", "fibre", "others"] as const;
export const LISTING_SORTS = ["latest", "price-asc", "price-desc", "distance", "quantity"] as const;
export const QUALITY_GRADES = ["A", "B", "C"] as const;

const optionalNumber = z.coerce.number().nonnegative().optional().catch(undefined);
const truthy = z
  .union([z.boolean(), z.string()])
  .transform((v) => v === true || v === "1" || v === "true")
  .optional()
  .catch(undefined);

/**
 * Parses listing filters from URL search params or an API query string.
 * Invalid values fall back to defaults instead of throwing, so a bad link never breaks the page.
 */
export const listingQuerySchema = z.object({
  q: z.string().trim().max(80).optional().catch(undefined),
  category: z.enum(CROP_CATEGORIES).optional().catch(undefined),
  crop: z.string().trim().max(40).optional().catch(undefined),
  state: z.string().trim().max(40).optional().catch(undefined),
  location: z.string().trim().max(40).optional().catch(undefined),
  maxDistanceKm: optionalNumber,
  minPrice: optionalNumber,
  maxPrice: optionalNumber,
  verifiedOnly: truthy,
  sellerType: z.enum(["farmer", "fpo"]).optional().catch(undefined),
  sort: z.enum(LISTING_SORTS).default("latest").catch("latest"),
  page: z.coerce.number().int().min(1).default(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(8).catch(8),
});

export function parseListingFilters(input: Record<string, unknown>): ListingFilters {
  const parsed = listingQuerySchema.parse(input);
  return { ...parsed, q: parsed.q || undefined };
}

export const createListingSchema = z.object({
  cropSlug: z.string().min(1, "Select a crop"),
  variety: z.string().trim().max(60).optional(),
  grade: z.enum(QUALITY_GRADES, { error: "Select a quality grade" }),
  location: z.string().trim().min(2, "Enter your village or town").max(80),
  state: z.string().trim().min(2).max(40).default("Madhya Pradesh"),
  quantityQtl: z.coerce.number({ error: "Enter a quantity" }).positive("Quantity must be more than 0").max(100000),
  pricePerQtl: z.coerce.number({ error: "Enter a price" }).positive("Price must be more than 0").max(1000000),
  availableFrom: z.string().optional(),
  description: z.string().trim().max(500, "Keep it under 500 characters").optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;

export const createOfferSchema = z.object({
  listingId: z.string().min(1),
  pricePerQtl: z.coerce.number().positive("Enter your offer price"),
  quantityQtl: z.coerce.number().positive("Enter a quantity"),
  message: z.string().trim().max(300).optional(),
});

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
