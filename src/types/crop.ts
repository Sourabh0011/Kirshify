export type CropCategory =
  | "cereals"
  | "pulses"
  | "oilseeds"
  | "vegetables"
  | "fruits"
  | "spices"
  | "fibre"
  | "others";

/** Visual style for the generated crop artwork used until real photos are uploaded. */
export type CropArtShape = "seed" | "grain" | "round" | "fluff" | "pod";

export interface Crop {
  slug: string;
  name: string;
  /** Name in Hindi, for vernacular UI. */
  nameHi: string;
  category: CropCategory;
  art: {
    shape: CropArtShape;
    background: string;
    fill: string;
    shade: string;
  };
}
