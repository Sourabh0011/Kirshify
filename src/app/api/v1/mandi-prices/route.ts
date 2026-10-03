import type { NextRequest } from "next/server";

import { ok } from "@/server/http";
import { getMandiPrices, getPriceTrend } from "@/server/services/market.service";
import type { TrendRange } from "@/types/market";

const RANGES: TrendRange[] = ["7d", "30d", "3m", "1y"];

/** GET /api/v1/mandi-prices?market=Narsinghpur&crop=soybean&range=30d */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const market = params.get("market") ?? undefined;
  const crop = params.get("crop") ?? undefined;
  const rangeParam = params.get("range") as TrendRange | null;
  const range = rangeParam && RANGES.includes(rangeParam) ? rangeParam : "7d";

  const prices = await getMandiPrices({ market, crop });
  const trend = crop ? await getPriceTrend(crop, range, market) : undefined;
  return ok({ prices, trend });
}
