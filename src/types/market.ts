export interface MandiPrice {
  cropSlug: string;
  cropName: string;
  market: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  /** Percentage change vs. previous trading day. */
  changePct: number;
  updatedAt: string;
}

export interface PricePoint {
  date: string; // ISO date
  price: number;
}

export type TrendRange = "7d" | "30d" | "3m" | "1y";

export interface NearbyMandi {
  name: string;
  distanceKm: number;
  avgPrice: number;
}

export interface WeatherSnapshot {
  location: string;
  temperatureC: number;
  condition: string;
  humidityPct: number;
  windKmh: number;
  rainChancePct: number;
  rainWindowDays: number;
  advisory: string;
  forecast: { day: string; tempC: number; condition: "sunny" | "cloudy" | "rain" }[];
}

export interface AdvisoryTip {
  language: "hi" | "mr" | "pa" | "en";
  text: string;
  translation: string;
}
