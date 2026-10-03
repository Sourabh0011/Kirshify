import type { CropCategory } from "./crop";

export type SellerType = "farmer" | "fpo";
export type QualityGrade = "A" | "B" | "C";

export interface Seller {
  id: string;
  name: string;
  type: SellerType;
  location: string;
  state: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  /** Stored in full; the UI masks it until the buyer asks to reveal it. */
  phone: string;
  verified: boolean;
}

export interface Listing {
  id: string;
  cropSlug: string;
  cropName: string;
  category: CropCategory;
  variety?: string;
  quantityQtl: number;
  pricePerQtl: number;
  grade: QualityGrade;
  location: string;
  state: string;
  distanceKm: number;
  harvestDate: string; // ISO date
  availableFrom?: string; // ISO date
  description?: string;
  /** Optional real photo URLs; generated crop art is shown when empty. */
  images: string[];
  sellerId: string;
  verified: boolean;
  createdAt: string; // ISO date-time
}

export interface ListingWithSeller extends Listing {
  seller: Seller;
}

export type ListingSort = "latest" | "price-asc" | "price-desc" | "distance" | "quantity";

export interface ListingFilters {
  q?: string;
  category?: CropCategory;
  crop?: string;
  state?: string;
  location?: string;
  maxDistanceKm?: number;
  minPrice?: number;
  maxPrice?: number;
  verifiedOnly?: boolean;
  sellerType?: SellerType;
  sort?: ListingSort;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface Offer {
  id: string;
  listingId: string;
  pricePerQtl: number;
  quantityQtl: number;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}
