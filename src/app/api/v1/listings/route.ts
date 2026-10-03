import type { NextRequest } from "next/server";

import { createListingSchema, parseListingFilters } from "@/lib/validators/listing";
import { fail, ok, searchParamsToObject, validationError } from "@/server/http";
import { createListing, getListings } from "@/server/services/listing.service";

/** GET /api/v1/listings?q=&category=&verifiedOnly=1&sort=price-asc&page=1 */
export async function GET(request: NextRequest) {
  const filters = parseListingFilters(searchParamsToObject(request.nextUrl.searchParams));
  return ok(await getListings(filters));
}

/** POST /api/v1/listings — create a crop listing. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return fail(400, "Request body must be JSON");

  const parsed = createListingSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  try {
    const listing = await createListing(parsed.data);
    return ok(listing, { status: 201 });
  } catch (error) {
    return fail(400, error instanceof Error ? error.message : "Could not create listing");
  }
}
