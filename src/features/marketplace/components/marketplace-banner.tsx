import { Search } from "lucide-react";

import { CropArt } from "@/components/ui/crop-art";

/** Hero banner with a crop search. Plain GET form, so search works even before JS loads. */
export function MarketplaceBanner({ defaultQuery }: { defaultQuery?: string }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-deep text-white">
      <div aria-hidden="true" className="absolute inset-0 opacity-45">
        <CropArt cropSlug="wheat" alt="" variant={9} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#0A2E21_20%,rgb(10_46_33/0.55)_70%,rgb(10_46_33/0.2))]" />
      <div className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Buy direct. Support farmers.</h1>
          <p className="text-on-dark">Fresh produce, fair prices, no middlemen.</p>
        </div>
        <form action="/marketplace" method="get" role="search" className="flex w-full items-center rounded-full bg-white p-1.5 pl-5 text-ink lg:max-w-md">
          <label htmlFor="market-search" className="sr-only">
            Search crops
          </label>
          <input
            id="market-search"
            name="q"
            type="search"
            defaultValue={defaultQuery}
            placeholder="Search crops, e.g. rice, wheat, soybean…"
            className="min-h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle"
          />
          <button type="submit" aria-label="Search" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-white hover:bg-forest-700">
            <Search className="size-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
