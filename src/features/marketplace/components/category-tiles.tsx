import { Apple, Bean, Carrot, Flame, Nut, Shapes, Sprout, Wheat, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { cropCategories } from "@/config/crops";
import { cn } from "@/lib/utils";
import type { CropCategory } from "@/types/crop";
import type { ListingFilters } from "@/types/listing";

import { marketplaceHref } from "../query";

const categoryStyle: Record<CropCategory, { icon: LucideIcon; tone: string }> = {
  cereals: { icon: Wheat, tone: "bg-marigold-soft text-marigold-ink" },
  pulses: { icon: Bean, tone: "bg-rose-soft text-rose-ink" },
  oilseeds: { icon: Nut, tone: "bg-[#FBF3D5] text-[#6B5208]" },
  vegetables: { icon: Carrot, tone: "bg-[#FDE7E2] text-[#9A2B17]" },
  fruits: { icon: Apple, tone: "bg-leaf-soft text-forest" },
  spices: { icon: Flame, tone: "bg-[#FFE9D6] text-[#8A3B00]" },
  fibre: { icon: Sprout, tone: "bg-sky-soft text-sky-ink" },
  others: { icon: Shapes, tone: "bg-plum-soft text-plum-ink" },
};

export function CategoryTiles({ filters }: { filters: ListingFilters }) {
  return (
    <nav aria-label="Browse by category" className="scrollbar-none -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-2.5 sm:grid sm:grid-cols-4 lg:grid-cols-8">
        {cropCategories.map(({ value, label }) => {
          const { icon: Icon, tone } = categoryStyle[value];
          const active = filters.category === value;
          return (
            <li key={value} className="shrink-0">
              <Link
                href={marketplaceHref(filters, { category: active ? undefined : value })}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex min-h-24 w-24 flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-2 text-[13px] font-bold transition-colors sm:w-auto",
                  active ? "border-forest shadow-[0_0_0_1px_var(--color-forest)]" : "border-line-soft hover:border-forest",
                )}
              >
                <span className={cn("inline-flex size-11 items-center justify-center rounded-full", tone)}>
                  <Icon className="size-[22px]" strokeWidth={1.8} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
