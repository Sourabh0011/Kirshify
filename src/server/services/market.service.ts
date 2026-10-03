import "server-only";

import { DEFAULT_MARKET } from "@/server/data/market";
import { marketRepository } from "@/server/repositories/market.repository";
import { seededRandom } from "@/lib/utils";
import type { MandiPrice, NearbyMandi, PricePoint, TrendRange } from "@/types/market";

export { DEFAULT_MARKET };

export async function getMarkets() {
  return marketRepository.listMarkets();
}

export async function getMandiPrices(options: { market?: string; crop?: string } = {}): Promise<MandiPrice[]> {
  const prices = await marketRepository.getPrices(options.market ?? DEFAULT_MARKET);
  return options.crop ? prices.filter((p) => p.cropSlug === options.crop) : prices;
}

export async function getMandiPrice(cropSlug: string, market = DEFAULT_MARKET): Promise<MandiPrice | null> {
  const prices = await marketRepository.getPrices(market);
  return prices.find((p) => p.cropSlug === cropSlug) ?? null;
}

export async function getNearbyMandis(cropSlug: string): Promise<NearbyMandi[]> {
  const markets = await marketRepository.listMarkets();
  const rows = await Promise.all(
    markets.map(async (m) => {
      const price = (await marketRepository.getPrices(m.name)).find((p) => p.cropSlug === cropSlug);
      return price ? { name: m.name, distanceKm: m.distanceKm, avgPrice: price.modalPrice } : null;
    }),
  );
  return rows.filter((r): r is NearbyMandi => r !== null).sort((a, b) => a.distanceKm - b.distanceKm);
}

const RANGE_POINTS: Record<TrendRange, { points: number; stepDays: number; volatility: number }> = {
  "7d": { points: 7, stepDays: 1, volatility: 0.012 },
  "30d": { points: 30, stepDays: 1, volatility: 0.015 },
  "3m": { points: 13, stepDays: 7, volatility: 0.03 },
  "1y": { points: 12, stepDays: 30, volatility: 0.05 },
};

/**
 * Mock price history ending at today's modal price. Deterministic per crop + range,
 * so server and client renders match. Replace with Agmarknet historical data.
 */
export async function getPriceTrend(cropSlug: string, range: TrendRange = "7d", market = DEFAULT_MARKET): Promise<PricePoint[]> {
  const current = await getMandiPrice(cropSlug, market);
  if (!current) return [];
  const { points, stepDays, volatility } = RANGE_POINTS[range];
  const rand = seededRandom(`${cropSlug}-${range}-${market}`);
  const today = new Date("2026-10-02T00:00:00+05:30");
  const series: PricePoint[] = [];
  let price = current.modalPrice;
  for (let i = 0; i < points; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * stepDays);
    series.unshift({ date: date.toISOString().slice(0, 10), price: Math.round(price) });
    // Walk backwards with a slight upward drift so the latest point is the highest trend.
    price = price * (1 - volatility * (rand() - 0.25));
  }
  return series;
}

export async function getAllTrends(cropSlug: string, market = DEFAULT_MARKET): Promise<Record<TrendRange, PricePoint[]>> {
  const ranges: TrendRange[] = ["7d", "30d", "3m", "1y"];
  const entries = await Promise.all(ranges.map(async (r) => [r, await getPriceTrend(cropSlug, r, market)] as const));
  return Object.fromEntries(entries) as Record<TrendRange, PricePoint[]>;
}

export async function getWeather() {
  return marketRepository.getWeather();
}

export async function getAdvisoryTip() {
  return marketRepository.getAdvisoryTip();
}
