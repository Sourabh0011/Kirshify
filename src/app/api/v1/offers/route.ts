import type { NextRequest } from "next/server";

import { createOfferSchema } from "@/lib/validators/listing";
import { fail, ok, validationError } from "@/server/http";
import { createOffer } from "@/server/services/listing.service";

/** POST /api/v1/offers — a buyer places an offer on a listing. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return fail(400, "Request body must be JSON");

  const parsed = createOfferSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const offer = await createOffer(parsed.data);
  return offer ? ok(offer, { status: 201 }) : fail(404, "Listing not found");
}
