import "server-only";

import { getCrop } from "@/config/crops";
import { listingRepository } from "@/server/repositories/listing.repository";
import type { CreateListingInput, CreateOfferInput } from "@/lib/validators/listing";
import type { Listing, ListingFilters, ListingWithSeller, Offer, Paginated } from "@/types/listing";

const DEFAULT_SELLER_ID = "s1"; // TODO: replace with the signed-in user's id (Clerk) once auth is wired.

async function withSeller(listing: Listing): Promise<ListingWithSeller | null> {
  const seller = await listingRepository.findSellerById(listing.sellerId);
  return seller ? { ...listing, seller } : null;
}

function matches(listing: ListingWithSeller, f: ListingFilters): boolean {
  if (f.q) {
    const q = f.q.toLowerCase();
    const haystack = `${listing.cropName} ${listing.variety ?? ""} ${listing.location} ${listing.seller.name}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (f.category && listing.category !== f.category) return false;
  if (f.crop && listing.cropSlug !== f.crop) return false;
  if (f.state && listing.state !== f.state) return false;
  if (f.location && listing.location !== f.location) return false;
  if (f.maxDistanceKm && listing.distanceKm > f.maxDistanceKm) return false;
  if (f.minPrice && listing.pricePerQtl < f.minPrice) return false;
  if (f.maxPrice && listing.pricePerQtl > f.maxPrice) return false;
  if (f.verifiedOnly && !listing.verified) return false;
  if (f.sellerType && listing.seller.type !== f.sellerType) return false;
  return true;
}

const sorters: Record<NonNullable<ListingFilters["sort"]>, (a: Listing, b: Listing) => number> = {
  latest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  "price-asc": (a, b) => a.pricePerQtl - b.pricePerQtl,
  "price-desc": (a, b) => b.pricePerQtl - a.pricePerQtl,
  distance: (a, b) => a.distanceKm - b.distanceKm,
  quantity: (a, b) => b.quantityQtl - a.quantityQtl,
};

export async function getListings(filters: ListingFilters = {}): Promise<Paginated<ListingWithSeller>> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 8;
  const all = await listingRepository.findAll();
  const joined = (await Promise.all(all.map(withSeller))).filter((l): l is ListingWithSeller => l !== null);
  const filtered = joined.filter((l) => matches(l, filters)).sort(sorters[filters.sort ?? "latest"]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  return {
    items: filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    page: safePage,
    pageSize,
    total: filtered.length,
    totalPages,
  };
}

export async function getListingById(id: string): Promise<ListingWithSeller | null> {
  const listing = await listingRepository.findById(id);
  return listing ? withSeller(listing) : null;
}

export async function getSimilarListings(listing: Listing, limit = 3): Promise<ListingWithSeller[]> {
  const { items } = await getListings({ category: listing.category, pageSize: 48 });
  return items
    .filter((l) => l.id !== listing.id)
    .sort((a, b) => Number(b.cropSlug === listing.cropSlug) - Number(a.cropSlug === listing.cropSlug))
    .slice(0, limit);
}

export async function createListing(input: CreateListingInput, sellerId = DEFAULT_SELLER_ID): Promise<Listing> {
  const crop = getCrop(input.cropSlug);
  if (!crop) throw new Error(`Unknown crop: ${input.cropSlug}`);
  return listingRepository.create({
    cropSlug: crop.slug,
    cropName: crop.name,
    category: crop.category,
    variety: input.variety || undefined,
    quantityQtl: input.quantityQtl,
    pricePerQtl: input.pricePerQtl,
    grade: input.grade,
    location: input.location,
    state: input.state,
    distanceKm: 0,
    harvestDate: input.availableFrom || new Date().toISOString().slice(0, 10),
    availableFrom: input.availableFrom || undefined,
    description: input.description || undefined,
    images: [],
    sellerId,
    verified: false,
  });
}

export async function createOffer(input: CreateOfferInput): Promise<Offer | null> {
  const listing = await listingRepository.findById(input.listingId);
  if (!listing) return null;
  return listingRepository.createOffer(input);
}
