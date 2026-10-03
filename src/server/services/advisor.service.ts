import "server-only";

import { getMandiPrices } from "@/server/services/market.service";
import { formatINR } from "@/lib/utils";

export interface AdvisorReply {
  reply: string;
  language: "hi" | "en";
  source: "rules" | "llm";
}

/**
 * Placeholder advisor. Replace the body with a Google Gemini call (GEMINI_API_KEY)
 * — keep the signature so the chat widget and API route don't change.
 */
export async function getAdvisorReply(message: string): Promise<AdvisorReply> {
  const text = message.toLowerCase();
  const isHindi = /[ऀ-ॿ]/.test(message);

  if (/(price|rate|bhav|भाव|मंडी|mandi)/.test(text)) {
    const prices = await getMandiPrices();
    const hit = prices.find((p) => text.includes(p.cropName.toLowerCase().split(" ")[0])) ?? prices[0];
    return {
      reply: isHindi
        ? `आज ${hit.market} मंडी में ${hit.cropName} का भाव ${formatINR(hit.modalPrice)}/क्विंटल है।`
        : `Today's modal price for ${hit.cropName} at ${hit.market} mandi is ${formatINR(hit.modalPrice)}/qtl.`,
      language: isHindi ? "hi" : "en",
      source: "rules",
    };
  }

  if (/(blight|disease|spot|pest|रोग|कीट)/.test(text)) {
    return {
      reply: isHindi
        ? "पत्ती की फोटो स्कैन करें। अर्ली ब्लाइट हो तो नीम तेल का छिड़काव 3 दिन के अंतर पर करें।"
        : "Scan a photo of the leaf first. For early blight, spray neem oil at a 3-day interval and remove infected leaves.",
      language: isHindi ? "hi" : "en",
      source: "rules",
    };
  }

  if (/(harvest|rain|weather|कटाई|बारिश|मौसम)/.test(text)) {
    return {
      reply: isHindi
        ? "अगले 3 दिन बारिश की संभावना है — कटाई टालें और फसल को ढककर रखें।"
        : "Rain is likely over the next 3 days — delay the harvest and keep the crop covered.",
      language: isHindi ? "hi" : "en",
      source: "rules",
    };
  }

  return {
    reply: isHindi
      ? "मैं फसल देखभाल, कीट, खाद, मौसम और मंडी भाव में मदद कर सकता हूँ। अपना सवाल विस्तार से पूछें।"
      : "I can help with crop care, pests, fertiliser, weather and mandi prices. Tell me your crop and what you're seeing.",
    language: isHindi ? "hi" : "en",
    source: "rules",
  };
}
