import "server-only";

import { seedListings } from "@/server/data/listings";
import { sellers } from "@/server/data/sellers";
import type { Listing, Offer, Seller } from "@/types/listing";

/**
 * Data-access contract for listings. The in-memory implementation below is for
 * local development; swap it for a MongoDB-backed one without touching services or UI.
 */
export interface ListingRepository {
  findAll(): Promise<Listing[]>;
  findById(id: string): Promise<Listing | null>;
  create(listing: Omit<Listing, "id" | "createdAt">): Promise<Listing>;
  findSellerById(id: string): Promise<Seller | null>;
  createOffer(offer: Omit<Offer, "id" | "createdAt" | "status">): Promise<Offer>;
}

class InMemoryListingRepository implements ListingRepository {
  private listings: Listing[];
  private offers: Offer[] = [];
  private nextId: number;

  constructor(seed: Listing[], private sellerRecords: Seller[]) {
    this.listings = [...seed];
    this.nextId = Math.max(...seed.map((l) => Number(l.id))) + 1;
  }

  async findAll() {
    return this.listings;
  }

  async findById(id: string) {
    return this.listings.find((l) => l.id === id) ?? null;
  }

  async create(listing: Omit<Listing, "id" | "createdAt">) {
    const record: Listing = { ...listing, id: String(this.nextId++), createdAt: new Date().toISOString() };
    this.listings.unshift(record);
    return record;
  }

  async findSellerById(id: string) {
    return this.sellerRecords.find((s) => s.id === id) ?? null;
  }

  async createOffer(offer: Omit<Offer, "id" | "createdAt" | "status">) {
    const record: Offer = {
      ...offer,
      id: `off_${this.offers.length + 1}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.offers.push(record);
    return record;
  }
}

// Keep one instance across hot reloads in development.
const globalForRepo = globalThis as unknown as { listingRepository?: ListingRepository };

export const listingRepository: ListingRepository =
  globalForRepo.listingRepository ?? new InMemoryListingRepository(seedListings, sellers);

if (process.env.NODE_ENV !== "production") globalForRepo.listingRepository = listingRepository;
