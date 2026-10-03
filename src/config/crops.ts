import type { Crop, CropCategory } from "@/types/crop";

/**
 * Crop catalogue. In production this becomes a `crops` collection;
 * the `art` palette drives the generated artwork until real photos exist.
 */
export const crops: Crop[] = [
  { slug: "soybean", name: "Soybean", nameHi: "सोयाबीन", category: "oilseeds", art: { shape: "seed", background: "#7A5B24", fill: "#E4B95E", shade: "#B98B37" } },
  { slug: "basmati-rice", name: "Basmati Rice", nameHi: "बासमती चावल", category: "cereals", art: { shape: "grain", background: "#BDB39A", fill: "#F7F2E6", shade: "#DCD2BC" } },
  { slug: "onion", name: "Onion", nameHi: "प्याज़", category: "vegetables", art: { shape: "round", background: "#4E1A2C", fill: "#B5405F", shade: "#872C46" } },
  { slug: "cotton", name: "Cotton", nameHi: "कपास", category: "fibre", art: { shape: "fluff", background: "#56664A", fill: "#FFFFFF", shade: "#E4E2D8" } },
  { slug: "wheat", name: "Wheat", nameHi: "गेहूं", category: "cereals", art: { shape: "grain", background: "#86601E", fill: "#E5BA68", shade: "#C3903D" } },
  { slug: "tomato", name: "Tomato", nameHi: "टमाटर", category: "vegetables", art: { shape: "round", background: "#6E1A13", fill: "#E2432F", shade: "#B2301F" } },
  { slug: "chana", name: "Chana", nameHi: "चना", category: "pulses", art: { shape: "seed", background: "#705226", fill: "#D9A65B", shade: "#AE7E3B" } },
  { slug: "maize", name: "Maize", nameHi: "मक्का", category: "cereals", art: { shape: "seed", background: "#9C6206", fill: "#F7C338", shade: "#D99A16" } },
  { slug: "moong", name: "Moong", nameHi: "मूंग", category: "pulses", art: { shape: "seed", background: "#34501A", fill: "#80A43B", shade: "#5D7E28" } },
  { slug: "mustard", name: "Mustard", nameHi: "सरसों", category: "oilseeds", art: { shape: "seed", background: "#5E400F", fill: "#C9912B", shade: "#986819" } },
  { slug: "turmeric", name: "Turmeric", nameHi: "हल्दी", category: "spices", art: { shape: "pod", background: "#7C4304", fill: "#F0A21C", shade: "#C47A0E" } },
  { slug: "potato", name: "Potato", nameHi: "आलू", category: "vegetables", art: { shape: "round", background: "#5F482C", fill: "#D0A978", shade: "#A68357" } },
  { slug: "mango", name: "Mango", nameHi: "आम", category: "fruits", art: { shape: "round", background: "#41601A", fill: "#F2B233", shade: "#D78D1F" } },
  { slug: "groundnut", name: "Groundnut", nameHi: "मूंगफली", category: "oilseeds", art: { shape: "pod", background: "#6D4F32", fill: "#D9B68B", shade: "#B28B61" } },
  { slug: "paddy", name: "Paddy (Dhan)", nameHi: "धान", category: "cereals", art: { shape: "grain", background: "#7E6D24", fill: "#DBC35F", shade: "#B59D3E" } },
  { slug: "green-chilli", name: "Green Chilli", nameHi: "हरी मिर्च", category: "spices", art: { shape: "pod", background: "#26441A", fill: "#4F9B2F", shade: "#3A7A22" } },
];

export const cropCategories: { value: CropCategory; label: string }[] = [
  { value: "cereals", label: "Cereals" },
  { value: "pulses", label: "Pulses" },
  { value: "oilseeds", label: "Oilseeds" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "spices", label: "Spices" },
  { value: "fibre", label: "Fibre" },
  { value: "others", label: "Others" },
];

const cropsBySlug = new Map(crops.map((crop) => [crop.slug, crop]));

export function getCrop(slug: string): Crop | undefined {
  return cropsBySlug.get(slug);
}

export function getCategoryLabel(category: CropCategory): string {
  return cropCategories.find((c) => c.value === category)?.label ?? "Others";
}
