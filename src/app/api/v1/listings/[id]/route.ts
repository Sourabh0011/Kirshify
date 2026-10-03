import type { NextRequest } from "next/server";

import { fail, ok } from "@/server/http";
import { getListingById } from "@/server/services/listing.service";

/** GET /api/v1/listings/:id */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  return listing ? ok(listing) : fail(404, "Listing not found");
}
