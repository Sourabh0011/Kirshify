import type { AdvisoryTip, MandiPrice, WeatherSnapshot } from "@/types/market";

/** Markets supported by the mock price feed, with distance from the default user location. */
export const markets = [
  { name: "Narsinghpur", state: "Madhya Pradesh", distanceKm: 5, factor: 1 },
  { name: "Jabalpur", state: "Madhya Pradesh", distanceKm: 95, factor: 0.993 },
  { name: "Seoni", state: "Madhya Pradesh", distanceKm: 150, factor: 0.962 },
  { name: "Hoshangabad", state: "Madhya Pradesh", distanceKm: 160, factor: 0.978 },
  { name: "Betul", state: "Madhya Pradesh", distanceKm: 220, factor: 0.945 },
] as const;

export const DEFAULT_MARKET = "Narsinghpur";

/** Base APMC prices (₹/qtl) for the default market — replace with the Agmarknet feed. */
export const baseMandiPrices: Omit<MandiPrice, "market" | "state" | "updatedAt">[] = [
  { cropSlug: "soybean", cropName: "Soybean", minPrice: 3800, maxPrice: 4400, modalPrice: 4210, changePct: 2.1 },
  { cropSlug: "wheat", cropName: "Wheat", minPrice: 2100, maxPrice: 2650, modalPrice: 2340, changePct: 1.5 },
  { cropSlug: "paddy", cropName: "Paddy (Dhan)", minPrice: 1800, maxPrice: 2200, modalPrice: 1980, changePct: 0.8 },
  { cropSlug: "chana", cropName: "Chana", minPrice: 4800, maxPrice: 5600, modalPrice: 5200, changePct: -0.6 },
  { cropSlug: "onion", cropName: "Onion", minPrice: 1200, maxPrice: 1800, modalPrice: 1480, changePct: 1.2 },
  { cropSlug: "tomato", cropName: "Tomato", minPrice: 1000, maxPrice: 1600, modalPrice: 1350, changePct: 0.9 },
  { cropSlug: "basmati-rice", cropName: "Basmati Rice", minPrice: 2800, maxPrice: 3400, modalPrice: 3120, changePct: 0.4 },
  { cropSlug: "cotton", cropName: "Cotton", minPrice: 6400, maxPrice: 7200, modalPrice: 6900, changePct: -0.3 },
  { cropSlug: "maize", cropName: "Maize", minPrice: 1750, maxPrice: 2100, modalPrice: 1950, changePct: 0.6 },
  { cropSlug: "moong", cropName: "Moong", minPrice: 6900, maxPrice: 7800, modalPrice: 7400, changePct: 1.1 },
  { cropSlug: "mustard", cropName: "Mustard", minPrice: 5300, maxPrice: 5900, modalPrice: 5650, changePct: -0.2 },
  { cropSlug: "potato", cropName: "Potato", minPrice: 950, maxPrice: 1400, modalPrice: 1200, changePct: -1.1 },
];

export const MANDI_UPDATED_AT = "2026-10-02T10:24:00+05:30";

export const weatherSnapshot: WeatherSnapshot = {
  location: "Narsinghpur, MP",
  temperatureC: 28,
  condition: "Partly cloudy",
  humidityPct: 62,
  windKmh: 12,
  rainChancePct: 10,
  rainWindowDays: 3,
  advisory: "Ideal sowing window",
  forecast: [
    { day: "Mon", tempC: 29, condition: "sunny" },
    { day: "Tue", tempC: 27, condition: "cloudy" },
    { day: "Wed", tempC: 24, condition: "rain" },
    { day: "Thu", tempC: 23, condition: "rain" },
    { day: "Fri", tempC: 28, condition: "sunny" },
  ],
};

export const advisoryTip: AdvisoryTip = {
  language: "hi",
  text: "अगले 3 दिन बारिश की संभावना — कटाई टालें और फसल को सुरक्षित रखें।",
  translation: "Rain likely in the next 3 days — delay harvest and keep the crop covered.",
};
