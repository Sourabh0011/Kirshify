import "server-only";

import { advisoryTip, baseMandiPrices, DEFAULT_MARKET, MANDI_UPDATED_AT, markets, weatherSnapshot } from "@/server/data/market";
import type { AdvisoryTip, MandiPrice, WeatherSnapshot } from "@/types/market";

/**
 * Market data contract. Replace the mock implementation with clients for
 * Agmarknet (prices) and a weather provider — the services stay unchanged.
 */
export interface MarketRepository {
  listMarkets(): Promise<{ name: string; state: string; distanceKm: number }[]>;
  getPrices(market: string): Promise<MandiPrice[]>;
  getWeather(location?: string): Promise<WeatherSnapshot>;
  getAdvisoryTip(): Promise<AdvisoryTip>;
}

const roundTo10 = (n: number) => Math.round(n / 10) * 10;

class MockMarketRepository implements MarketRepository {
  async listMarkets() {
    return markets.map(({ name, state, distanceKm }) => ({ name, state, distanceKm }));
  }

  async getPrices(marketName: string) {
    const market = markets.find((m) => m.name === marketName) ?? markets.find((m) => m.name === DEFAULT_MARKET)!;
    return baseMandiPrices.map((p) => ({
      ...p,
      market: market.name,
      state: market.state,
      minPrice: roundTo10(p.minPrice * market.factor),
      maxPrice: roundTo10(p.maxPrice * market.factor),
      modalPrice: roundTo10(p.modalPrice * market.factor),
      updatedAt: MANDI_UPDATED_AT,
    }));
  }

  async getWeather() {
    return weatherSnapshot;
  }

  async getAdvisoryTip() {
    return advisoryTip;
  }
}

export const marketRepository: MarketRepository = new MockMarketRepository();
