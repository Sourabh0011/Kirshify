import { MapPin, Search } from "lucide-react";

import { Select } from "@/components/ui/field";
import { buttonClasses } from "@/components/ui/button";

interface MandiFiltersProps {
  markets: string[];
  crops: { slug: string; name: string }[];
  market: string;
  crop?: string;
}

/** Plain GET form — works without JavaScript and keeps the URL shareable. */
export function MandiFilters({ markets, crops, market, crop }: MandiFiltersProps) {
  return (
    <form method="get" action="/mandi-prices" className="flex flex-col gap-3 rounded-3xl border border-line-soft bg-white p-3 sm:flex-row sm:items-center sm:p-4">
      <div className="relative sm:w-64">
        <label htmlFor="mandi-market" className="sr-only">
          Mandi
        </label>
        <MapPin aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-[18px] -translate-y-1/2 text-muted" />
        <Select id="mandi-market" name="market" defaultValue={market} className="pl-10">
          {markets.map((m) => (
            <option key={m} value={m}>
              {m}, MP
            </option>
          ))}
        </Select>
      </div>
      <div className="sm:w-64">
        <label htmlFor="mandi-crop" className="sr-only">
          Crop
        </label>
        <Select id="mandi-crop" name="crop" defaultValue={crop ?? ""}>
          <option value="">All crops</option>
          {crops.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      <button type="submit" className={buttonClasses({ className: "rounded-xl sm:ml-auto" })}>
        <Search className="size-[18px]" /> Get prices
      </button>
    </form>
  );
}
